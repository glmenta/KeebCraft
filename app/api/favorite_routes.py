from ..models.favorites import FavoriteBuild, Favorite
from ..models.keeb_builds import KeebBuild
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .. import db
from ..forms.favorite_form import FavoriteForm

favorite_routes = Blueprint('favorites', __name__)

#Get All Favorite Lists
@favorite_routes.route('/', methods=['GET'])
def get_favorites():
    favorites = Favorite.query.all()
    favorites_list = [favorite.to_dict() for favorite in favorites]
    return jsonify({"all_favorites": favorites_list})

#Get Builds by Favorite List
@favorite_routes.route('/<int:id>/builds', methods=['GET'])
def get_builds_by_favorite(id):
    favorite = Favorite.query.get(id)
    if favorite is None:
        return jsonify({"error": "Favorites List not found"}), 404

    favorite_builds = [{"favorite_build": fb.to_dict(), "build": fb.build.to_dict()} for fb in favorite.favorite_builds]

    return {
        "Favorite Builds": favorite_builds
    }

#Get Favorite List by Favorite Id
@favorite_routes.route('/<int:favorite_id>', methods=['GET'])
def get_favorite_by_id(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if favorite is None:
        return jsonify({"error": "Favorites List not found"}), 404

    return {
        "FavoriteList": favorite.to_dict()
    }

#Get Build by Favorite List
@favorite_routes.route('/<int:id>/builds/<int:build_id>', methods=['GET'])
def get_build_by_favorite(id, build_id):
    favorite = Favorite.query.get(id)

    if favorite is None:
        return jsonify({"error": "Favorites List not found"}), 404

    favorite_build = [fb for fb in favorite.favorite_builds if fb.build_id == build_id]

    if not favorite_build:
        return jsonify({"error": "Build not found in Favorites List"}), 404

    return {
        "Build": favorite_build[0].build.to_dict()
    }

#Create Favorite List
@favorite_routes.route('/new', methods=['GET', 'POST'])
@login_required
def favorite():
    if request.method == 'GET':
        builds = KeebBuild.query.all()
        return jsonify(builds=[build.to_dict() for build in builds])

    if request.method == 'POST':
        data = request.get_json()
        form = FavoriteForm(data=data)
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            selected_build = form.builds.data

            existing_build = KeebBuild.query.filter_by(id=selected_build).first()

            if existing_build:
                new_favorite = Favorite(
                    user_id=current_user.id,
                    name=form.name.data
                )
                db.session.add(new_favorite)
                db.session.commit()

                new_favorite_build = FavoriteBuild(
                    user_id=current_user.id,
                    build_id=existing_build.id,
                    favorite_id=new_favorite.id
                )
                db.session.add(new_favorite_build)
                db.session.commit()

                return jsonify(new_favorite.to_dict()), 201

            else:
                return jsonify(errors='Invalid build selected'), 400

        else:
            return jsonify(form.errors), 400

#Add Build To Favorite
@favorite_routes.route('/<int:favorite_id>/add', methods=['POST'])
@login_required
def add_to_favorite(favorite_id):
    data = request.get_json()
    build_id = data.get('build_id')

    existing_build = KeebBuild.query.filter_by(id=build_id).first()

    if not existing_build:
        return jsonify(errors='Invalid build selected'), 400

    existing_favorite = Favorite.query.filter(Favorite.id == favorite_id).first()
    if not existing_favorite:
        return jsonify(errors='Invalid favorite ID'), 400

    existing_favorite_build = FavoriteBuild.query.filter_by(favorite_id=favorite_id, build_id=build_id).first()
    if existing_favorite_build:
        return jsonify(errors='Build is already in the favorite'), 400

    new_favorite_build = FavoriteBuild(
        user_id=current_user.id,
        build_id=build_id,
        favorite_id=favorite_id
    )
    db.session.add(new_favorite_build)
    db.session.commit()

    return jsonify(new_favorite_build.to_dict()), 201

@favorite_routes.route('/<int:favorite_id>/remove/<int:build_id>', methods=['DELETE'])
@login_required
def remove_from_favorite(favorite_id, build_id):
    existing_favorite = Favorite.query.filter(Favorite.id == favorite_id).first()
    if not existing_favorite:
        return jsonify(errors='Invalid favorite ID'), 400

    if existing_favorite.user_id != current_user.id:
        return jsonify(errors='Permission denied'), 403

    existing_favorite_build = FavoriteBuild.query.filter_by(favorite_id=favorite_id, build_id=build_id).first()
    if not existing_favorite_build:
        return jsonify(errors='Build not found in the favorite'), 404

    db.session.delete(existing_favorite_build)
    db.session.commit()

    return jsonify(success='Build removed from favorite'), 200

@favorite_routes.route('/<int:favorite_id>/remove', methods=['DELETE'])
@login_required
def remove_favorite_list(favorite_id):
    existing_favorite = Favorite.query.filter(Favorite.id == favorite_id).first()
    if not existing_favorite:
        return jsonify(errors='Invalid favorite ID'), 400

    if existing_favorite.user_id != current_user.id:
        return jsonify(errors='Permission denied'), 403

    favorite_builds = FavoriteBuild.query.filter(FavoriteBuild.favorite_id == favorite_id).all()
    for fb in favorite_builds:
        db.session.delete(fb)

    db.session.delete(existing_favorite)
    db.session.commit()

    return jsonify(success='Favorite list removed'), 200
