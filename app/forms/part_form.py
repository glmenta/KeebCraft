from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, FileField
from flask_wtf.file import FileRequired, FileAllowed
from wtforms.validators import DataRequired
from app.models import PartType

class PartForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description')
    type_id = SelectField('Type', coerce=int, validators=[DataRequired()])
    part_img = StringField('Image URL')
    submit = SubmitField('Submit')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.type_id.choices = [(part_type.id, part_type.type) for part_type in PartType.query.all()]

class EditPartForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description')
    type_id = SelectField('Type', coerce=int, validators=[DataRequired()])
    part_img = StringField('part_img')
    update = SubmitField('Update')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.type_id.choices = [(part_type.id, part_type.type) for part_type in PartType.query.all()]
