from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField
from wtforms.validators import DataRequired, Length, Optional

class TagForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired()])
  description = StringField("Description", validators=[Optional(), Length(max=350)])
  website_ids = SelectMultipleField("Websites", coerce=int, validators=[Optional()])

