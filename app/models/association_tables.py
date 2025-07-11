from .db import db

website_tags = db.Table(
  'website_tags',
  db.Column('website_id', db.Integer, db.ForeignKey('websites.id'), primary_key=True),
  db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)

