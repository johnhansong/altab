from app.models import db, Website, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_website_tags():
  #TAGS
  productivity = Tag.query.filter_by(name="Productivity").first()
  education = Tag.query.filter_by(name="Education").first()

  #WEBSITES
  muscle_wiki = Website.query.filter_by(name="Muscle Wiki").first()
  notion = Website.query.filter_by(name="Notion").first()

  #relationships
  muscle_wiki.tags.extend([productivity, education])
  notion.tags.append(productivity)

  db.session.commit()


def undo_website_tags():
  db.session.execute(text("DELETE FROM website_tags"))
  db.session.commit()
