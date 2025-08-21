from .db import db, environment, SCHEMA, add_prefix_for_prod

website_tags = db.Table(
  'website_tags',
  db.metadata,
  db.Column('website_id', db.Integer, db.ForeignKey(add_prefix_for_prod('websites.id')), primary_key=True),
  db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True),
  schema=SCHEMA if environment == "production" else None
)
