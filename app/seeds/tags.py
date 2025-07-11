from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
  demo_tag_1 = Tag(
    name="Productivity", description="To-do lists, calendars, and automation tools."
  )
  demo_tag_2 = Tag(
    name="Search & Discovery", description="Search engines, databases, aggregators (e.g. Google, DuckDuckGo, Wolfram Alpha)"
  )
  demo_tag_3 = Tag(
    name="Education", description="Education, resources, textbooks, and more"
  )
  demo_tag_4 = Tag(
    name="Creativity", description="Tools that assist in bringing your creativity to life"
  )
  demo_tag_5 = Tag(
    name="Finance", description="Finance, Budgeting, Stocks, etc."
  )
  demo_tag_6 = Tag(
    name="Tech Tools", description="Web services that help you build, deploy, and automate"
  )
  demo_tag_7 = Tag(
    name="News", description="Sites that keep you informed or give you a platform to publish"
  )
  demo_tag_8 = Tag(
    name="Well Being", description="Digital companions for a healthier, calmer life"
  )
  demo_tag_9 = Tag(
    name="Utilities", description="Small but mighty tools that solve everyday hassles"
  )
  # demo_tag_10 = Tag(
  #   name="", description=""
  # )

  # demo_tag_NUMBER = Tag(
  #   name="", description=""
  # )

  db.session.add(demo_tag_1)
  db.session.add(demo_tag_2)
  db.session.add(demo_tag_3)
  db.session.add(demo_tag_4)
  db.session.add(demo_tag_5)
  db.session.add(demo_tag_6)
  db.session.add(demo_tag_7)
  db.session.add(demo_tag_8)
  db.session.add(demo_tag_9)
  db.session.commit()

def undo_tags():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM tags"))

  db.session.commit()
