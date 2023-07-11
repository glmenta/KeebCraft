from flask import Blueprint, redirect, url_for, render_template, jsonify, request
from flask_login import login_required, current_user, logout_user
from ..models.keeb_builds import KeebBuild
from ..models.images import BuildImage
from ..models.comments import Comment
from ..forms.keeb_form import KeebForm
from ..models.db import db
from ..models.parts import Part, PartType
import json

keeb_builds_routes = Blueprint('keebs', __name__)

#view all keebs
@keeb_builds_routes.route('/', methods=['GET'])
def get_all_keebs():
    keebs = KeebBuild.query.all()
    return {
        "Keebs": [keeb.to_dict() for keeb in keebs]
    }


#view keebs by current user
@keeb_builds_routes.route('/current', methods=['GET'])
def get_current_keebs():
    keebs = KeebBuild.query.filter(KeebBuild.user_id == current_user.id).all()
    return {
        "Keebs": [keeb.to_dict() for keeb in keebs]
    }

#view keeb by id
#this route still does not work
@keeb_builds_routes.route('/<int:id>', methods=['GET'])
def get_keeb(id):
    keeb = KeebBuild.query.get(id)
    if (keeb):
        image = BuildImage.query.filter(BuildImage.build_id == id).all()
        comment = Comment.query.filter(Comment.build_id == id).all()

        res = {
            "id": keeb.id,
            "user_id": keeb.user_id,
            "name": keeb.name,
            "case": keeb.case,
            "size": keeb.size,
            "keycaps": keeb.keycaps,
            "switches": keeb.switches,
            "plate": keeb.plate,
            "stabilizers": keeb.stabilizers,
            "keeb_info": keeb.keeb_info,
            "images": [image.to_dict() for image in image],
            "comments": [comment.to_dict() for comment in comment]
        }
        return jsonify(res), 200

    else:
        res = {
            "message": "Keeb could not be found.",
            "statusCode": 404
        }
        return jsonify(res), 404

@keeb_builds_routes.route('/new', methods=['GET', 'POST'])
@login_required
def new_keeb_parts():
    if request.method == 'GET':
        parts = Part.query.all()
        return jsonify(parts=[part.to_dict() for part in parts])

    if request.method == 'POST':
        data = request.get_json()
        form = KeebForm(data=data)
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            selected_parts = [
                form.case.data,
                form.keycaps.data,
                form.switches.data,
                form.stabilizers.data,
                form.plate.data
            ]

            existing_parts = Part.query.filter(Part.name.in_(selected_parts)).all()

            if len(existing_parts) == len(selected_parts):
                new_keeb = KeebBuild(
                    user_id=current_user.id,
                    name=form.name.data,
                    size=form.size.data,
                    case=form.case.data,
                    keycaps=form.keycaps.data,
                    switches=form.switches.data,
                    stabilizers=form.stabilizers.data,
                    plate=form.plate.data if form.plate.data else None,
                    keeb_info=form.keeb_info.data,
                )

                db.session.add(new_keeb)
                db.session.commit()

                img_url = form.img_url.data

                if img_url:
                    new_image = BuildImage(
                        build_id=new_keeb.id,
                        url=img_url
                    )
                    db.session.add(new_image)
                    db.session.commit()

                return jsonify(new_keeb.to_dict()), 201
            else:
                return jsonify(errors='Invalid parts selected'), 400
        else:
            return jsonify(form.errors), 400

@keeb_builds_routes.route('/<int:id>/edit', methods=['GET','PUT'])
@login_required
def update_keeb(id):
    if request.method == 'GET':
        parts = Part.query.all()
        return jsonify(parts=[part.to_dict() for part in parts])

    keeb = KeebBuild.query.get(id)
    if not keeb or keeb.user_id != current_user.id:
        return jsonify(errors='Keeb build not found or user not authorized'), 404

    if request.method in ['PUT']:
        data = request.get_json()
        form = KeebForm(data=data)
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            selected_parts = [
                form.case.data,
                form.keycaps.data,
                form.switches.data,
                form.stabilizers.data
            ]

            existing_parts = Part.query.filter(Part.name.in_(selected_parts)).all()

            if len(existing_parts) == len(selected_parts):
                keeb.name = form.name.data
                keeb.size = form.size.data
                keeb.case = form.case.data
                keeb.keycaps = form.keycaps.data
                keeb.switches = form.switches.data
                keeb.stabilizers = form.stabilizers.data
                keeb.plate = form.plate.data if form.plate.data else None
                keeb.keeb_info = form.keeb_info.data

                db.session.commit()

                img_url = form.img_url.data

                if img_url:
                    image = BuildImage.query.filter_by(build_id=keeb.id).first()

                    if image:
                        image.url = img_url
                    else:
                        new_image = BuildImage(
                            build_id=keeb.id,
                            url=img_url
                        )
                        db.session.add(new_image)

                    db.session.commit()

                return jsonify(keeb.to_dict()), 200
            else:
                return jsonify(errors='Invalid parts selected'), 400
        else:
            return jsonify(form.errors), 400
@keeb_builds_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_keeb(id):
    keeb = KeebBuild.query.get(id)
    if keeb and keeb.user_id == current_user.id:
        BuildImage.query.filter_by(build_id=id).delete()
        db.session.delete(keeb)
        db.session.commit()
        res = {
            "id": keeb.id,
            "message": "Deleted",
            "statusCode": 200
        }
        return jsonify(res), 200
    else:
        res = {
            "message": "Keeb could not be found.",
            "statusCode": 404
        }
        return jsonify(res), 404
