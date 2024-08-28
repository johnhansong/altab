from .db import db, environment, SCHEMA, add_prefix_for_prod

class Website(db.Model):
  __tablename__ = 'websites'

  if environment == "production":
    __table_args__ = {"schema": SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  link = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=False)
  preview_img = db.Column(db.String)
  created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())



  #relationships
  user = db.relationship('User', back_populates='websites')


  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'user_id': self.user_id,
      'link': self.link,
      'description': self.description,
      'preview_img': self.preview_img,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
