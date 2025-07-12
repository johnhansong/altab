from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tag, Website, db
from app.forms import TagForm

tag_routes = Blueprint('tag', __name__)

#GET ALL TAGS
@tag_routes.route('/')
def get_all_tags():
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
    "Tag": tag.name,
    "Websites": [website.to_dict() for website in tag.websites]
  }, 200

#POST/Create new Tag
@tag_routes.route('/', methods=['POST'])
@login_required
def post_tag():
  form = TagForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  form.website_ids.choices = Website.query.with_entities(Website.id, Website.name).all()

  if form.validate_on_submit():
    existing_tag = Tag.query.filter_by(name=form.name.data).first()
    if existing_tag:
      return {'errors': {'message': 'Tag already exists'}}, 409

    new_tag = Tag(
      name=form.name.data,
      description=form.description.data,
    )

    website_ids = form.website_ids.data
    if website_ids:
      websites = Website.query.filter(Website.id.in_(website_ids)).all()
      new_tag.websites.extend(websites)

    db.session.add(new_tag)
    db.session.commit()
    return new_tag.to_dict(), 201

  return {'errors': form.errors}, 400


#Add Website to a Tag
@tag_routes.route('/<int:tag_id>/websites/<int:website_id>', methods=['POST'])
@login_required
def add_website_to_tag(tag_id, website_id):
  tag = Tag.query.get(tag_id)
  if not tag:
    return {"errors": {"message": "tag not found"}}, 404

  website = Website.query.get(website_id)
  if not website:
    return {"errors": {"message": "Website not found"}}, 404

  if website in tag.websites:
    return {'tag': tag.name,
            'websites': [w.to_dict() for w in tag.websites]}, 200

  tag.websites.append(website)
  db.session.commit()

  return {'tag': tag.name,
          'websites': [w.to_dict() for w in tag.websites]}, 201

#REMOVE a Website from Tag
@tag_routes.route('/<int:tag_id>/websites/<int:website_id>', methods=['DELETE'])
@login_required
def remove_website_from_tag(tag_id, website_id):
  tag = Tag.query.get(tag_id)
  if not tag:
    return {'errors': {'message': 'Tag not found'}}, 404

  website = Website.query.get(website_id)
  if not website:
    return {'errors': {'message': 'Website not found'}}, 404

  if website.user_id != current_user.id:
    return {'errors': {'message': 'Forbidden'}}, 403

  if website not in tag.websites:
    return {'errors': {'message': 'Website not found in tag'}}, 400

  tag.websites.remove(website)
  db.session.commit()
  return {
    'tag': tag.to_dict(),
    'message': 'Website removed from tag'
    }, 200

#DELETE a Tag
@tag_routes.route('/<int:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
  doomed_tag = Tag.query.get(tag_id)
  if not doomed_tag:
    return {'errors': {'message': 'Tag not found or not authorized'}}, 404

  db.session.delete(doomed_tag)
  db.session.commit()

  return {'message': 'Tag successfully deleted'}, 200
