from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired
from app.models import Part

class KeebForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    case = SelectField('case', validators=[DataRequired()], coerce=int)
    size = SelectField('size', coerce=int)
    keycaps = SelectField('keycaps', validators=[DataRequired()], coerce=int)
    switches = SelectField('switches', validators=[DataRequired()], coerce=int)
    stabilizers = SelectField('stabilizers', validators=[DataRequired()], coerce=int)
    keeb_info = StringField('keeb_info', validators=[DataRequired()])
    img_url = StringField('img_url')
    submit = SubmitField('Submit')

    def __init__(self, *args, **kwargs):
        super(KeebForm, self).__init__(*args, **kwargs)
        self.populate_select_fields()

    def populate_select_fields(self):
        self.case.choices = [(part.id, part.name) for part in Part.query.all()]
        self.size.choices = [(part.id, part.name) for part in Part.query.all()]
        self.keycaps.choices = [(part.id, part.name) for part in Part.query.all()]
        self.switches.choices = [(part.id, part.name) for part in Part.query.all()]
        self.stabilizers.choices = [(part.id, part.name) for part in Part.query.all()]
