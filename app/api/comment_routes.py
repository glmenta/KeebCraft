from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models.comments import Comment
from .. import db

comment_routes = Blueprint('comments', __name__)

#Get All Comments
@comment_routes.route('/', methods=['GET'])
def get_comment():
    comments = Comment.query.all()
    comments_list = [comment.to_dict() for comment in comments]
    return jsonify({"all_comments": comments_list})

#Get Comment by ID
@comment_routes.route('/<int:id>', methods=['GET'])
def get_comment_by_id(id):
    comment = Comment.query.get(id)
    if comment is None:
        return jsonify({'error': 'Comment not found'}), 404
    return comment.to_dict()

#Delete Comment
@comment_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment is None:
        return jsonify({'error': 'Comment not found'}), 404
    if comment.user_id != current_user.id:
        return jsonify({'error': 'You are not allowed to delete this comment'}), 401

    db.session.delete(comment)
    db.session.commit()

    return jsonify({'message': 'Comment deleted'}), 200
