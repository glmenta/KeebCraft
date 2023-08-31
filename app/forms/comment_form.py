from flask_wtf import FlaskForm
from wtforms import StringField, HiddenField, SubmitField

class CommentForm(FlaskForm):
    comment = StringField('Comment')
    build_id = HiddenField('build_id')
    submit = SubmitField('Submit')

class EditCommentForm(FlaskForm):
    comment = StringField('Comment')
    # build_id = HiddenField('build_id')
    submit = SubmitField('Submit')
