from .db import db, environment, SCHEMA, add_prefix_for_prod
from .association_tables import website_tags

class Tag(db.Model):
  __tablename__ = "tags"

  if environment == "production":
    __table_args__ = {"schema": SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False, unique=True)
  description = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

  #relationships
  websites = db.relationship(
    'Website',
    secondary=website_tags,
    back_populates='tags'
  )

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'websites': [website.to_dict() for website in self.websites],
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }

  """
    __repr__ is used to define the "official" string representation of an object.
    Eg. printing a model instance may return something like <Tag object at 0x4f28347cdab350>
      with __repr__ you're able to return something more useful such as <Tag id=5 name='productivity>

    Provides easier debugging, cleaner logging output, and better dev experience in shells or Flask CLI
  """
  def __repr__(self):
    return f"<Website id={self.id} url='{self.url}'>"
