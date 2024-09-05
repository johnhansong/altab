from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db

review_routes = Blueprint('review', __name__)

@review_routes.route('/current')
@login_required
def get_user_reviews():
  """GET all reviews for a single site"""
  user_reviews = Review.query.filter_by(website_id=current_user.id).all()

  if not user_reviews:
    return {'errors': {'message': 'No reviews yet'}}, 404

  return {'reviews': [review.to_dict() for review in user_reviews]}, 200
