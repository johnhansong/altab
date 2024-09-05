from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, Length, NumberRange

class ReviewForm(FlaskForm):
  rating = FloatField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
  review = StringField('Review', validators=[DataRequired(), Length(max=300)])
