from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
  demo_review_1 = Review(
    user_id=1, website_id=1, rating=4,
    review="Lorem ipsum odor amet, consectetuer adipiscing elit. Lectus at varius ultricies elementum montes suscipit himenaeos. Amalesuada potenti quis suscipit lectus dapibus."
  )
  demo_review_2 = Review(
    user_id=1, website_id=2, rating=4,
    review="Nostra neque etiam egestas ultrices et pellentesque. Venenatis platea ad facilisi interdum nullam. Feugiat quis ante porta suscipit, orci himenaeos varius."
  )
  demo_review_3 = Review(
    user_id=1, website_id=3, rating=4,
    review="Dui nascetur rutrum aliquam class curabitur accumsan commodo ridiculus. Amet felis est orci ultrices penatibus."
  )
  demo_review_4 = Review(
    user_id=1, website_id=4, rating=4,
    review="Penatibus tellus tortor nisl, ultrices ultrices erat fermentum. Malesuada fermentum dui non eget magna quam."
  )


  demo_review_5 = Review(
    user_id=2, website_id=4, rating=5,
    review="Lorem ipsum odor amet, consectetuer adipiscing elit. Lectus at varius ultricies elementum montes suscipit himenaeos. Amalesuada potenti quis suscipit lectus dapibus."
  )
  demo_review_6 = Review(
    user_id=2, website_id=3, rating=5,
    review="Nostra neque etiam egestas ultrices et pellentesque. Venenatis platea ad facilisi interdum nullam. Feugiat quis ante porta suscipit, orci himenaeos varius."
  )
  demo_review_7 = Review(
    user_id=2, website_id=2, rating=5,
    review="Dui nascetur rutrum aliquam class curabitur accumsan commodo ridiculus. Amet felis est orci ultrices penatibus."
  )
  demo_review_8 = Review(
    user_id=2, website_id=1, rating=5,
    review="Penatibus tellus tortor nisl, ultrices ultrices erat fermentum. Malesuada fermentum dui non eget magna quam."
  )


  demo_review_9 = Review(
    user_id=3, website_id=1, rating=1,
    review="Nostra neque etiam egestas ultrices et pellentesque. Venenatis platea ad facilisi interdum nullam. Feugiat quis ante porta suscipit, orci himenaeos varius."
  )
  demo_review_10 = Review(
    user_id=3, website_id=2, rating=1,
    review="Lorem ipsum odor amet, consectetuer adipiscing elit. Lectus at varius ultricies elementum montes suscipit himenaeos. Amalesuada potenti quis suscipit lectus dapibus."
  )
  demo_review_11 = Review(
    user_id=3, website_id=3, rating=1,
    review="Penatibus tellus tortor nisl, ultrices ultrices erat fermentum. Malesuada fermentum dui non eget magna quam."
  )
  demo_review_12 = Review(
    user_id=3, website_id=4, rating=1,
    review="Dui nascetur rutrum aliquam class curabitur accumsan commodo ridiculus. Amet felis est orci ultrices penatibus."
  )


  demo_review_13 = Review(
    user_id=4, website_id=4, rating=3,
    review="Nostra neque etiam egestas ultrices et pellentesque. Venenatis platea ad facilisi interdum nullam. Feugiat quis ante porta suscipit, orci himenaeos varius."
  )
  demo_review_14 = Review(
    user_id=4, website_id=3, rating=3,
    review="Lorem ipsum odor amet, consectetuer adipiscing elit. Lectus at varius ultricies elementum montes suscipit himenaeos. Amalesuada potenti quis suscipit lectus dapibus."
  )
  demo_review_15 = Review(
    user_id=4, website_id=2, rating=3,
    review="Penatibus tellus tortor nisl, ultrices ultrices erat fermentum. Malesuada fermentum dui non eget magna quam."
  )
  demo_review_16 = Review(
    user_id=4, website_id=1, rating=3,
    review="Dui nascetur rutrum aliquam class curabitur accumsan commodo ridiculus. Amet felis est orci ultrices penatibus."
  )


  db.session.add(demo_review_1)
  db.session.add(demo_review_2)
  db.session.add(demo_review_3)
  db.session.add(demo_review_4)
  db.session.add(demo_review_5)
  db.session.add(demo_review_6)
  db.session.add(demo_review_7)
  db.session.add(demo_review_8)
  db.session.add(demo_review_9)
  db.session.add(demo_review_10)
  db.session.add(demo_review_11)
  db.session.add(demo_review_12)
  db.session.add(demo_review_13)
  db.session.add(demo_review_14)
  db.session.add(demo_review_15)
  db.session.add(demo_review_16)
  db.session.commit()




def undo_reviews():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM reviews"))

  db.session.commit()
