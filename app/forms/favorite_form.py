from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired
from app.models.keeb_builds import KeebBuild

class FavoriteForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    builds = SelectField('Builds', coerce=int, validators=[DataRequired()])
    submit = SubmitField('Submit')

    def __init__(self, *args, **kwargs):
        super(FavoriteForm, self).__init__(*args, **kwargs)
        self.populate_select_fields()

    def populate_select_fields(self):
        self.builds.choices = [(build.id, build.name) for build in KeebBuild.query.all()]
