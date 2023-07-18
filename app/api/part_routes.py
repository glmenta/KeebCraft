from flask import Blueprint, redirect, url_for, render_template, jsonify, request, current_app
from flask_login import login_required, current_user, logout_user
from ..models.images import PartImage
from ..forms.keeb_form import KeebForm
from ..models.db import db
from ..models.keeb_builds import BuildPart
from ..models.parts import Part, PartType
from ..forms.part_form import PartForm, EditPartForm
import os
from urllib.parse import urlparse, urlsplit

part_routes = Blueprint('parts', __name__)
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
    filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@part_routes.route('/', methods=['GET'])
def get_all_parts():
    parts = Part.query.all()
    return {
        "Parts": [part.to_dict() for part in parts]
    }

@part_routes.route('/current', methods=['GET'])
@login_required
def get_current_parts():
    parts = Part.query.filter(Part.user_id == current_user.id).all()
    return {
        "Parts": [part.to_dict() for part in parts]
    }

@part_routes.route('/<int:id>', methods=['GET'])
def get_part(id):
    part = Part.query.get(id)
    if (part):
        image = PartImage.query.filter(PartImage.part_id == id).all()

        res = {
            "id": part.id,
            "user_id": part.user_id,
            "type_id": part.type_id,
            "name": part.name,
            "description": part.description,
            "images": [image.to_dict() for image in image]
        }

        return jsonify(res), 200

    else:
        res = {
            "message": "Part could not be found.",
            "statusCode": 404
        }
        return jsonify(res), 404

@part_routes.route('/types', methods=['GET'])
def get_all_part_types():
    part_types = PartType.query.all()
    res = [part_type.to_dict() for part_type in part_types]
    return jsonify(res), 200

@part_routes.route('/type/<int:id>', methods=['GET'])
def get_part_by_type(id):
    part_type = PartType.query.get(id)
    if not part_type:
        res = {
            "message": "Type does not exist.",
            "statusCode": 404
        }
        return jsonify(res), 404

    parts = Part.query.filter_by(type_id=id).all()
    images = PartImage.query.filter(PartImage.part_id.in_([part.id for part in parts])).all()

    res = {
        "parts": []
    }

    for part in parts:
        part_images = [image.to_dict() for image in images if image.part_id == part.id]
        part_data = {
            "id": part.id,
            "user_id": part.user_id,
            "type_id": part.type_id,
            "name": part.name,
            "description": part.description,
            "images": part_images
        }
        res["parts"].append(part_data)

    return jsonify(res), 200

@part_routes.route('/new', methods=['GET', 'POST'])
@login_required
def new_part():
    data = request.get_json()
    form = PartForm(data=data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        part = Part(
            name=form.name.data,
            description=form.description.data,
            type_id=form.type_id.data,
            user_id=current_user.id
        )

        db.session.add(part)
        db.session.commit()
        part_img_url = form.part_img.data

        if part_img_url:
            url_path = urlsplit(part_img_url).path
            _, ext = os.path.splitext(url_path)
            if ext.lower() not in ['.jpg', '.jpeg', '.png']:
                return jsonify(errors='Invalid image format'), 400
            # if not allowed_file(part_img_url):
            #     return jsonify({"error": "Invalid image file type. Please use jpg, jpeg, png or gif"}), 400

            new_img = PartImage(
                part_id=part.id,
                url=part_img_url
            )
            db.session.add(new_img)
            db.session.commit()

            return jsonify(part.to_dict()), 201
        else:
            return jsonify(part.to_dict()), 201
    else:
        return jsonify(form.errors), 400


@part_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_part(id):
    existing_part = Part.query.get(id)

    if existing_part and current_user.id == existing_part.user_id:
        form = EditPartForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            existing_part.name = form.name.data
            existing_part.description = form.description.data
            existing_part.type_id = form.type_id.data

            part_img_url = form.part_img.data

            if part_img_url:
                url_path = urlsplit(part_img_url).path
                _, ext = os.path.splitext(url_path)
                if ext.lower() not in ['.jpg', '.jpeg', '.png']:
                    return jsonify(errors='Invalid image format'), 400
                # if not allowed_file(part_img_url):
                #     return jsonify({"error": "Invalid image file type. Please use jpg, jpeg, png or gif"}), 400

                existing_img = PartImage.query.filter_by(part_id=id).first()

                if existing_img:
                    existing_img.url = part_img_url
                else:
                    new_img = PartImage(
                        part_id=existing_part.id,
                        url=part_img_url
                    )
                    db.session.add(new_img)

            db.session.commit()

            return jsonify(existing_part.to_dict()), 200
        else:
            return jsonify(form.errors), 400
    else:
        return jsonify({'message': 'Unauthorized'}), 401


@part_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_part(id):
    current_app.logger.info('Attempting to delete part with id %s', id)

    existing_part = Part.query.filter_by(id=id, user_id=current_user.id).first()
    if existing_part:
        BuildPart.query.filter_by(part_id=id).delete()
        PartImage.query.filter_by(part_id=id).delete()
        db.session.delete(existing_part)
        db.session.commit()
        res = {
            "id": existing_part.id,
            "message": "Deleted",
            "statusCode": 200
        }
        current_app.logger.info('Successfully deleted part with id %s', id)
        return jsonify(res), 200
    else:
        res = {
            "message": "Part could not be found.",
            "statusCode": 404
        }
        current_app.logger.warning('Could not find part with id %s', id)
        return jsonify(res), 404
