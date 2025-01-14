from .db import db, environment, SCHEMA, add_prefix_for_prod

class Tag(db.Model):
  __tablename__ = "tags"

  if environment == "production":
    __table_args__ = {"schema": SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, default=db.func.current_timestamp())

  #relationships


  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
