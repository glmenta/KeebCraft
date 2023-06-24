from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class KeebForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    case = StringField('case', validators=[DataRequired()])
    size = StringField('size')
    keycaps = StringField('keycaps', validators=[DataRequired()])
    switches = StringField('switches', validators=[DataRequired()])
    stabilizers = StringField('stabilizers', validators=[DataRequired()])
    keeb_info = StringField('keeb_info', validators=[DataRequired()])
    img_url = StringField('img_url')
    submit = SubmitField('Submit')
