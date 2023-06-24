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
    parts = Part.query.all()
def new_keeb():
    form = KeebForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.name.data
        case = form.case.data
        size = form.size.data
        keycaps = form.keycaps.data
        switches = form.switches.data
        stabilizers = form.stabilizers.data
        keeb_info = form.keeb_info.data

        new_keeb = KeebBuild(
            user_id=current_user.id,
            name=name,
            case=case,
            size=size,
            keycaps=keycaps,
            switches=switches,
            stabilizers=stabilizers,
            keeb_info=keeb_info,
        )

        db.session.add(new_keeb)
        db.session.commit()

        img_url = form.img_url.data
        keeb_id = new_keeb.id
        new_image = BuildImage(
            build_id = keeb_id,
            url = img_url
        )
        db.session.add(new_image)
        db.session.commit()

        return jsonify(new_keeb.to_dict()), 201
    else:
        return jsonify(form.errors), 400
