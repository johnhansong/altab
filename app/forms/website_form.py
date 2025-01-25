from flask_wtf import FlaskForm
from flask_wtf.file import FileRequired, FileAllowed
from wtforms import StringField, FileField, SubmitField
from wtforms.validators import DataRequired
from app.utils.awsS3 import ALLOWED_EXTENSIONS

class WebsiteForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  link = FileField('Link', validators=[DataRequired()])
  description = StringField('Description', validators=[DataRequired()])
  preview_img = StringField('Preview Img', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
