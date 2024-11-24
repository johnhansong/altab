from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tag, db

tag_routes = Blueprint('tag', __name__)

@tag_routes.route('/')
def get_all_tags():
  "Get all tags"
  return Tag.query.all()


