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

        switch_parts = Part.query.filter(Part.type_id == switch_id).all() if Part.query.filter(Part.type_id == switch_id).first() else []
        case_parts = Part.query.filter(Part.type_id == case_id).all() if Part.query.filter(Part.type_id == case_id).first() else []
        keycap_parts = Part.query.filter(Part.type_id == keycap_id).all() if Part.query.filter(Part.type_id == keycap_id).first() else []
        stab_parts = Part.query.filter(Part.type_id == stab_id).all() if Part.query.filter(Part.type_id == stab_id).first() else []
        plate_parts = Part.query.filter(Part.type_id == plate_id).all() if Part.query.filter(Part.type_id == plate_id).first() else []

        self.case.choices = [(part.name, part.name) for part in case_parts]
        self.plate.choices = [(part.name, part.name) for part in plate_parts]
        self.keycaps.choices = [(part.name, part.name) for part in keycap_parts]
        self.switches.choices = [(part.name, part.name) for part in switch_parts]
        self.stabilizers.choices = [(part.name, part.name) for part in stab_parts]
