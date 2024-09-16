from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Website, Review, db
from app.forms import WebsiteForm, ReviewForm

website_routes = Blueprint('sites', __name__)

@website_routes.route('/')
def get_websites():
  """Get all websites"""
  websites = Website.query.all()
  return {'websites': [site.to_dict() for site in websites]}, 200



@website_routes.route('/<int:website_id>')
def get_website_details(website_id):
  """Get the details for one website"""
  website = Website.query.get(website_id)

  if not website:
    return {'errors': {'message': 'No websites available'}}, 404

  return {'website': website.to_dict()}, 200

# @website_routes.route('/')
# @login_required
# def get_websites_by_user():
  """"""
#   user_id = current_user.id

#   user_sites = Website.query.filter_by(user_id=user_id).all()
#   if not user_sites:
#     return {'errors': {'message': 'No websites uploaded by this user'}}, 404

#   return {'websites': [site.to_dict() for site in user_sites]}, 200


@website_routes.route('/', methods=['POST'])
@login_required
def post_website():
  """Create New Website """
  form = WebsiteForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_site = Website(
      user_id = current_user.id,
      name=form.name.data,
      link=form.link.data,
      description=form.description.data,
      preview_img=form.preview_img.data
    )

    db.session.add(new_site)
    db.session.commit()

    return new_site.to_dict(), 201

  return {'errors': form.errors}, 400



@website_routes.route('/<int:website_id>', methods=['PUT'])
@login_required
def update_site(website_id):
  site_to_update = Website.query.filter(Website.id == website_id).first()

  if not site_to_update:
    return {'errors': {'message': 'Website not found'}}, 404
  if site_to_update.user_id != current_user.id:
    return {'errors': {'message': 'Unauthorized'}}, 401

  form = WebsiteForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    site_to_update.user_id = current_user.id
    site_to_update.name=form.name.data
    site_to_update.link=form.link.data
    site_to_update.description=form.description.data
    site_to_update.preview_img=form.preview_img.data

    db.session.commit()
    return site_to_update.to_dict(), 201

  return {'errors': form.errors}, 400

@website_routes.route('/<int:website_id>', methods=['DELETE'])
@login_required
def delete_website(website_id):
  doomed_site = Website.query.get(website_id)

  if not doomed_site:
    return {'errors': {'message': 'Website not found'}}, 404
  if doomed_site.user_id != current_user.id:
    return {'errors': {'message': 'Unauthorized'}}, 401

  db.session.delete(doomed_site)
  db.session.commit()

  return {'message': 'Website deleted successfully'}





#review routes
@website_routes.route('<int:website_id>/reviews')
def site_reviews(website_id):
  """GET all reviews for a website"""
  site_reviews = Review.query.filter_by(website_id=website_id).all()

  if not site_reviews:
    return {'errors': {'message': 'No reviews found'}}, 404

  return {'reviews': [review.to_dict() for review in site_reviews]}, 200


@website_routes.route('<int:website_id>/review', methods=["POST"])
@login_required
def post_review(website_id):
  """Create review for a website"""

  curr_site = Website.query.get(website_id)
  if not curr_site:
    return {'errors': {'message': 'Website not found'}}, 404

  review_exists = Review.query.filter_by(user_id=current_user.id, website_id=website_id).first()
  if review_exists:
    return {'error': {'message': 'There is an existing review for this website.'}}, 400

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_review = Review(
      user_id=current_user.id,
      website_id=website_id,
      title=form.title.data,
      rating=form.rating.data,
      review=form.review.data
    )

    db.session.add(new_review)
    db.session.commit()
    return new_review.to_dict(), 201

  return form.errors, 401
