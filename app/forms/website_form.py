from flask_wtf import FlaskForm
from flask_wtf.file import FileRequired, FileAllowed
from wtforms import StringField, FileField, SubmitField
from wtforms.validators import DataRequired, Optional
from app.utils.awsS3 import ALLOWED_EXTENSIONS

class WebsiteForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  link = StringField('Link', validators=[DataRequired()])
  description = StringField('Description', validators=[DataRequired()])
  preview_img = FileField('Preview Img', validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
