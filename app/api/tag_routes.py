from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tag, Website, db
from app.forms import TagForm

tag_routes = Blueprint('tag', __name__)

@tag_routes.route('/')
def get_all_tags():
  "Get all tags"
  return Tag.query.all()


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

  return {'errors': form.errors}, 400
