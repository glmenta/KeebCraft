from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired
from app.models import Part

class KeebForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    case = SelectField('case', validators=[DataRequired()])
    size = StringField('size')
    keycaps = SelectField('keycaps', validators=[DataRequired()])
    switches = SelectField('switches', validators=[DataRequired()])
    plate = SelectField('plate', validators=[DataRequired()])
    stabilizers = SelectField('stabilizers', validators=[DataRequired()])
    keeb_info = StringField('keeb_info', validators=[DataRequired()])
    img_url = StringField('img_url')
    submit = SubmitField('Submit')

    def __init__(self, *args, **kwargs):
        super(KeebForm, self).__init__(*args, **kwargs)
        self.populate_select_fields()

    def populate_select_fields(self):
        switch_id = 1
        case_id = 2
        keycap_id = 3
        stab_id = 4
        plate_id = 5

        switch_parts = Part.query.filter(Part.type_id == switch_id).all()
        case_parts = Part.query.filter(Part.type_id == case_id).all()
        keycap_parts = Part.query.filter(Part.type_id == keycap_id).all()
        stab_parts = Part.query.filter(Part.type_id == stab_id).all()
        plate_parts = Part.query.filter(Part.type_id == plate_id).all()

        self.case.choices = [(str(part.id), part.name) for part in case_parts]
        self.plate.choices = [(str(part.id), part.name) for part in plate_parts]
        self.keycaps.choices = [(str(part.id), part.name) for part in keycap_parts]
        self.switches.choices = [(str(part.id), part.name) for part in switch_parts]
        self.stabilizers.choices = [(str(part.id), part.name) for part in stab_parts]
