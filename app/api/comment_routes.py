from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models.comments import Comment
from .. import db
import json
from ..forms.comment_form import EditCommentForm, CommentForm
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

#update Comment
@comment_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_comment(id):
    comment = Comment.query.get(id)
    print('this is comment from backend',comment)
    if comment is None:
        return jsonify({'error': 'Comment not found'}), 404
    if comment.user_id != current_user.id:
        return jsonify({'error': 'You are not allowed to update this comment'}), 401
    data_string =request.data
    data = json.loads(data_string)
    print('raw data', request.data)
    print('this is comment from frontend',data)
    if data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    comment_text = data.get('comment')
    if comment_text is None:
        return jsonify({'error': 'Comment field missing in JSON data'}), 400
    comment.comment = comment_text
    db.session.commit()
    return jsonify(comment.to_dict()), 200


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
