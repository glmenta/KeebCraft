from flask import Blueprint, redirect, url_for, render_template, jsonify, request
from flask_login import login_required, current_user, logout_user
from ..models.keeb_builds import KeebBuild, BuildPart
from ..models.images import BuildImage
from ..models.comments import Comment
from ..forms.keeb_form import KeebForm
from ..models.db import db
from ..models.favorites import FavoriteBuild
from ..models.parts import Part, PartType
from ..forms.comment_form import CommentForm
import os
from urllib.parse import urlparse, urlsplit

from .aws import (if_allowed_image, file_unique_name, upload_S3, create_presigned_url)

keeb_builds_routes = Blueprint('keebs', __name__)

#view all keebs
@keeb_builds_routes.route('/', methods=['GET'])
def get_all_keebs():
    keebs = KeebBuild.query.all()
    for keeb in keebs:
        if keeb.build_images:
            parsed_img_url = keeb.build_images[0].url.rsplit('/', 1)[-1]
            presigned_img_url = create_presigned_url(parsed_img_url)
            keeb.build_images[0].url = presigned_img_url

    return {
        "Keebs": [keeb.to_dict() for keeb in keebs]
    }


#view keebs by current user
@keeb_builds_routes.route('/current', methods=['GET'])
def get_current_keebs():
    keebs = KeebBuild.query.filter(KeebBuild.user_id == current_user.id).all()
    for keeb in keebs:
        if keeb.build_images:
            parsed_img_url = keeb.build_images[0].url.rsplit('/', 1)[-1]
            presigned_img_url = create_presigned_url(parsed_img_url)
            keeb.build_images[0].url = presigned_img_url
    return {
        "Keebs": [keeb.to_dict() for keeb in keebs]
    }

#view keeb by id
@keeb_builds_routes.route('/<int:id>', methods=['GET'])
def get_keeb(id):
    keeb = KeebBuild.query.get(id)
    if (keeb):
        image = BuildImage.query.filter(BuildImage.build_id == id).all()
        comment = Comment.query.filter(Comment.build_id == id).all()

        parsed_img_url = image[0].url.rsplit('/', 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)

        res = {
            "id": keeb.id,
            "user_id": keeb.user_id,
            "name": keeb.name,
            "case": keeb.case,
            "keycaps": keeb.keycaps,
            "switches": keeb.switches,
            "plate": keeb.plate,
            "stabilizers": keeb.stabilizers,
            "keeb_info": keeb.keeb_info,
            # "images": [image.to_dict() for image in image],
            "images": presigned_img_url,
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
        print('this is from the route', request.get_json())
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
                    url_path = urlsplit(img_url).path
                    _, ext = os.path.splitext(url_path)
                    if ext.lower() not in ['.jpg', '.jpeg', '.png']:
                        return jsonify(errors='Invalid image format'), 400

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
@keeb_builds_routes.route('/upload-image', methods=['POST'])
@login_required
def upload_keeb_image():
    if "image" not in request.files:
        return jsonify(errors="No image provided"), 400

    image = request.files["image"]

    if not image or image.filename == "":
        return jsonify(errors="No image provided"), 400

    if not if_allowed_image(image.filename):
        return jsonify(errors="Invalid image format"), 400

    image.filename = file_unique_name(image.filename)
    img_upload = upload_S3(image)

    if "url" not in img_upload:
        return jsonify(errors="Image upload failed"), 400

    img_url = img_upload["url"]

    return {
        "img_url": img_url
    }, 201

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
        keeb_id = keeb.id
        FavoriteBuild.query.filter_by(build_id=id).delete()
        BuildImage.query.filter_by(build_id=id).delete()
        BuildPart.query.filter_by(build_id=id).delete()
        db.session.delete(keeb)
        db.session.commit()
        res = {
            "id": keeb_id,
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

@keeb_builds_routes.route('/<int:id>/comments', methods=['GET'])
def get_comments(id):
    keeb = KeebBuild.query.get(id)
    if keeb:
        comments = Comment.query.filter(Comment.build_id == id).all()
        return jsonify(comments=[comment.to_dict() for comment in comments])
    else:
        res = {
            "message": "Keeb could not be found.",
            "statusCode": 404
        }
        return jsonify(res), 404

@keeb_builds_routes.route('/<int:id>/comments/new', methods=['POST'])
@login_required
def new_comment(id):
    keeb = KeebBuild.query.get(id)
    if keeb:
        data = request.get_json()
        form = CommentForm(data=data)
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            comment = Comment(
                user_id=current_user.id,
                build_id=id,
                comment=form.comment.data
            )
            db.session.add(comment)
            db.session.commit()
            return jsonify(comment.to_dict()), 201
        else:
            return jsonify({'errors': form.errors}), 400
    else:
        res = {
            "message": "Keeb could not be found.",
        }
        return jsonify(res), 404
