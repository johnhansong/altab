from app.models import db, Website, environment, SCHEMA
from sqlalchemy.sql import text

def seed_websites():
  site_1 = Website(
    name='Muscle Wiki', user_id=1, link='https://musclewiki.com',
    description='A website to help you work out. Identify desired muscle groups and find instant guides',
    preview_img='')
  site_2 = Website(
    name='Temporary Email', user_id=1, link='https://temp-mail.org/en/',
    description='If you need a temporary email for any reason, use this site to obtain and receive emails with a temporary email address!',
    preview_img='')
  site_3 = Website(
    name='Just the Recipe', user_id=1, link='https://www.justtherecipe.com/',
    description='Get your recipe without any of the fluff, popups, ads, or life stories',
    preview_img='')
  site_4 = Website(
    name='McBroken', user_id=1, link='https://mcbroken.com/',
    description="Check if a Mc Donald's ice cream machine is broken before getting there",
    preview_img='')

  db.session.add(site_1)
  db.session.add(site_2)
  db.session.add(site_3)
  db.session.add(site_4)
  db.session.commit()


def undo_websites():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.websites RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM websites"))

  db.session.commit()
