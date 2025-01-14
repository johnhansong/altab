from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class TagForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired()])
  description = StringField("Description", validators=[DataRequired(), Length(max=350)])
