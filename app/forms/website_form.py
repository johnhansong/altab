from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class WebsiteForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  link = StringField('Link', validators=[DataRequired()])
  description = StringField('Description', validators=[DataRequired()])
  preview_img = StringField('Preview Img')
