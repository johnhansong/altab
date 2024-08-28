from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Website

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



@website_routes.route('/')
@login_required
def get_websites_by_user():
  user_id = current_user.id

  user_sites = Website.query.filter_by(user_id=user_id).all()
  if not user_sites:
    return {'errors': {'message': 'No websites uploaded by this user'}}, 404

  return {'websites': [site.to_dict() for site in user_sites]}, 200
