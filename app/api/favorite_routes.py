from ..models.favorites import FavoriteBuild, Favorite
from ..models.keeb_builds import KeebBuild
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .. import db

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

#Create Favorite
@favorite_routes.route('/new', methods=['GET', 'POST'])
def create_favorite():
    pass
