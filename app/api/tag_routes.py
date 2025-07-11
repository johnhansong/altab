from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tag, Website, db
from app.forms import TagForm

tag_routes = Blueprint('tag', __name__)

@tag_routes.route('/')
def get_all_tags():
  """Get all tags"""
  tags = Tag.query.all()
  return {'tags': [tag.to_dict() for tag in tags]}, 200

#GET Websites by TAG
@tag_routes.route('/<int:tag_id>')
def get_websites_by_tag(tag_id):
  """Get a list of Websites by tag"""
  tag = Tag.query.get(tag_id)
  if not tag:
    return {"errors": {'message': "Tag not found"}}, 404

  return {
    "Tag": tag.to_dict(),
    "Websites": [website.to_dict() for website in tag.websites]
  }, 200

#POST/Create new Tag
@tag_routes.route('/', methods=['POST'])
@login_required
def post_tag():
  form = TagForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_tag = Tag(
      name=form.name.data,
      description=form.description.data,
    )

    db.session.add(new_tag)
    db.session.commit()

    return new_tag.to_dict(), 201

  return {'Errors': form.errors}, 400


@tag_routes.route('/<int:tag_id>/websites', methods=['POST'])
def add_website_to_tag(tag_id):
  tag = Tag.query.get(tag_id)
  if not tag:
    return {"errors": {"message": "tag not found"}}, 404

  data = request.get_json()

  website_id = data.get('website_id')
  if not website_id:
    return {"errors": {"message": "Website ID not found"}}, 400

  website = Website.query.get(website_id)
  if not website:
    return {"errors": {"message": "Website not found"}}, 404

  if website in tag.websites:
    return {"errors": {"message": "Website already tagged"}}, 409

  tag.websites.append(website)
  db.session.commit()

  return {"message": "Website added to tag successfully"}, 201
