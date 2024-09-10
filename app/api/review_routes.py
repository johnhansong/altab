from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('review', __name__)

@review_routes.route('/current')
@login_required
def get_user_reviews():
  """GET all reviews for a logged in user"""
  user_reviews = Review.query.filter_by(user_id=current_user.id).all()
  print("userId", current_user.id)
  print(user_reviews)

  if not user_reviews:
    return {'errors': {'message': 'No reviews yet'}}, 404

  return {'reviews': [review.to_dict() for review in user_reviews]}, 200


@review_routes.route("/<int:review_id>", methods=["PUT"])
@login_required
def update_review(review_id):
  """Update a review based on its id"""

  review_to_update = Review.query.get(review_id)

  if not review_to_update:
    return {'errors': {'message': 'Review not found'}}, 404

  if review_to_update.user_id != current_user.id:
    return {'errors': {'message': 'Unauthorized'}}, 401

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    review_to_update.title=form.data["title"]
    review_to_update.review=form.data["review"]
    review_to_update.rating=form.data["rating"]

    db.session.commit()
    return review_to_update.to_dict(), 201

  return form.errors, 401


@review_routes.route('<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
  """Delete a review by ID"""
  doomed_review = Review.query.filter_by(id=review_id, user_id=current_user.id).first()
  if not doomed_review:
    return {'errors': {'message': 'Review not found or not authorized'}}, 404

  db.session.delete(doomed_review)
  db.session.commit()
  return {'message': 'Review successfully deleted'}, 200
