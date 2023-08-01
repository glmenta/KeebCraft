from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models.keeb_builds import KeebBuild
from app.models.parts import Part
from app.models.comments import Comment
from app.models.favorites import Favorite, FavoriteBuild
user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/keebs', methods=['GET'])
@login_required
def get_user_keebs(id):
    user = User.query.get(id)

    if user is None:
        return jsonify({"error": "User not found"}), 404

    keeb_builds = KeebBuild.query.filter(KeebBuild.user_id == user.id).all()


    return {
        "Keebs": [keeb.to_dict() for keeb in keeb_builds]
    }

@user_routes.route('/<int:id>/parts', methods=['GET'])
@login_required
def get_user_parts(id):
    user = User.query.get(id)

    if user is None:
        return jsonify({"error": "User not found"}), 404

    parts = Part.query.filter(Part.user_id == user.id).all()

    return {
        "Parts": [part.to_dict() for part in parts]
    }

@user_routes.route('/<int:id>/comments', methods=['GET'])
def get_user_comments(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    else:
        comments = Comment.query.filter(Comment.user_id == user.id).all()
        if len(comments) == 0:
            return jsonify({"error": "User has no comments"}), 200
        else:
            return jsonify ({
                "Comments": [comment.to_dict() for comment in comments]
            }), 200

@user_routes.route('/<int:id>/favorites', methods=['GET'])
def get_user_favorites(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    else:
        favorites = Favorite.query.filter(Favorite.user_id == user.id).all()
        if len(favorites) == 0:
            return jsonify({"error": "User has no favorites"}), 200
        else:
            return jsonify ({
                "Favorites": [favorite.to_dict() for favorite in favorites]
            }), 200
