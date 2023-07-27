from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired
from app.models.keeb_builds import KeebBuild

class FavoriteForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    builds = SelectField('Builds', coerce=int, validators=[DataRequired()])
    submit = SubmitField('Submit')
