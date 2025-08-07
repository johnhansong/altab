from app.models import db, Website, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_website_tags():
  #TAGS
  productivity = Tag.query.filter_by(name="Productivity").first()
  searchAndDiscovery = Tag.query.filter_by(name="Search & Discovery").first()
  education = Tag.query.filter_by(name="Education").first()
  creativity = Tag.query.filter_by(name="Creativity").first()
  finance = Tag.query.filter_by(name="Finance").first()
  techTools = Tag.query.filter_by(name="Tech Tools").first()
  news = Tag.query.filter_by(name="News").first()
  wellBeing = Tag.query.filter_by(name="Well Being").first()
  utilities = Tag.query.filter_by(name="Utilities").first()
  aiTools = Tag.query.filter_by(name="AI Tools").first()
  artAndDesign = Tag.query.filter_by(name="Art & Design").first()
  apis = Tag.query.filter_by(name="APIs").first()
  budgeting = Tag.query.filter_by(name="Budgeting").first()
  blogging = Tag.query.filter_by(name="Blogging").first()
  browserExtensions = Tag.query.filter_by(name="Browser Extensions").first()
  coding = Tag.query.filter_by(name="Coding").first()
  calendars = Tag.query.filter_by(name="Calendars").first()
  crypto = Tag.query.filter_by(name="Crypto & Blockchain").first()
  databases = Tag.query.filter_by(name="Databases").first()
  design = Tag.query.filter_by(name="Design").first()
  devops = Tag.query.filter_by(name="DevOps").first()
  ecommerce = Tag.query.filter_by(name="E-commerce").first()
  email = Tag.query.filter_by(name="Email").first()
  fonts = Tag.query.filter_by(name="Fonts").first()
  freelancing = Tag.query.filter_by(name="Freelancing").first()
  free = Tag.query.filter_by(name="Free").first()
  games = Tag.query.filter_by(name="Games").first()
  graphicDesign = Tag.query.filter_by(name="Graphic Design").first()
  google = Tag.query.filter_by(name="Google").first()
  health = Tag.query.filter_by(name="Health").first()
  hosting = Tag.query.filter_by(name="Hosting").first()
  htmlcss = Tag.query.filter_by(name="HTML/CSS").first()

  #WEBSITES
  muscle_wiki = Website.query.filter_by(name="Muscle Wiki").first()
  notion = Website.query.filter_by(name="Notion").first()
  retro_games = Website.query.filter_by(name="Play Retro Games").first()

  #relationships
  muscle_wiki.tags.extend([productivity, education, health])
  notion.tags.extend([productivity, aiTools])
  retro_games.tags.extend([games, free])

  db.session.commit()


def undo_website_tags():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.website_tags RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM website_tags"))
  db.session.commit()
