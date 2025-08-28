from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import func
from app.models import Tag, Website, db
from app.forms import TagForm

tag_routes = Blueprint('tag', __name__)

def website_summary(site):
  return {'id': site.id, 'name': site.name, 'link': site.link, 'preview_img': site.preview_img}

#GET ALL TAGS
@tag_routes.route('/')
def get_all_tags():
  tags = Tag.query.all()
  return {'tags': [tag.to_dict(include_websites=True) for tag in tags]}, 200

#GET Websites by TAG
@tag_routes.route('/<int:tag_id>')
def get_websites_by_tag(tag_id):
  """Get a list of Websites by tag"""
  tag = Tag.query.get(tag_id)
  if not tag:
    return {"errors": {'message': "Tag not found"}}, 404

  return {
    "Tag": tag.name,
    "Websites": [website_summary(site) for site in tag.websites]
  }, 200

#POST/Create new Tag
@tag_routes.route('/', methods=['POST'])
@login_required
def post_tag():
  form = TagForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  form.website_ids.choices = (
    Website.query.with_entities(Website.id, Website.name)
      .filter_by(user_id=current_user.id)
      .all()
  )

  if not form.validate_on_submit():
    print("TagForm errors:", form.errors)
    return {'errors': form.errors}, 400

  name = (form.name.data or "").strip()

  existing_tag = Tag.query.filter(func.lower(Tag.name) == func.lower(name)).first()
  if existing_tag:
    return {'errors': {'message': 'Tag already exists'}}, 409

  new_tag = Tag(
    name = name,
    description = form.description.data or ''
  )

  website_ids = list(set(form.website_ids.data or []))
  if website_ids:
    websites = Website.query.filter(
      Website.id.in_(website_ids),
      Website.user_id == current_user.id
    ).all()
    if len(websites) != len(website_ids):
      return {'errors': {'website_ids': 'One or more websites are invalid'}},
    new_tag.websites.extend(websites)

  db.session.add(new_tag)
  db.session.commit()
  return new_tag.to_dict(), 201


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

  if website.user_id != current_user.id:
    return {'errors': {'message': 'Forbidden'}}, 403

  created = False
  if website not in tag.websites:
    tag.websites.append(website)
    db.session.commit()
    created = True

  return tag.to_dict(include_websites=True), 201 if created else 200

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
    'tag': tag.to_dict(include_websites=True),
    'message': 'Website removed from tag'
    }, 200

#DELETE a Tag
@tag_routes.route('/<int:tag_id>', methods=['DELETE'])
@login_required
def delete_tag(tag_id):
  doomed_tag = Tag.query.get(tag_id)
  if not doomed_tag:
    return {'errors': {'message': 'Tag not found or not authorized'}}, 404

  if doomed_tag.websites:
    return {'errors': {'message': 'Cannot delete tag that is in use'}}, 403

  db.session.delete(doomed_tag)
  db.session.commit()

  return {'message': 'Tag successfully deleted'}, 200
