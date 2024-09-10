from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
  __tablename__ = "reviews"

  if environment == "production":
    __table_args__ = {"schema": SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  website_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('websites.id')), nullable=False)
  title = db.Column(db.String, nullable=False)
  rating = db.Column(db.Integer, nullable=False)
  review = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

  #relationships
  user = db.relationship('User', back_populates='reviews')
  website = db.relationship('Website', back_populates='reviews')


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'website_id': self.website_id,
      'title': self.title,
      'rating': self.rating,
      'review': self.review,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
