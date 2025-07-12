from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    andrew = User(
        username='andrew', email='andrew@aa.io', password='andrewpassword')
    ashley = User(
        username='ashley', email='ashley@aa.io', password='ashleypassword')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='bobbiepassword')
    calvin = User(
        username='calvin', email='calvin@aa.io', password='calvinpassword')
    chloe = User(
        username='chloe', email='chloe@aa.io', password='chloepassword')
    cho = User(
        username='cho', email='cho@aa.io', password='chopassword')
    david = User(
        username='david', email='david@aa.io', password='davidpassword')
    ellie = User(
        username='ellie', email='ellie@aa.io', password='elliepassword')
    emily = User(
        username='emily', email='emily@aa.io', password='emilypassword')
    gene = User(
        username='gene', email='gene@aa.io', password='genepassword')
    geo = User(
        username='geo', email='geo@aa.io', password='geopassword')
    gina = User(
        username='gina', email='gina@aa.io', password='ginapassword')
    joseph = User(
        username='joseph', email='joseph@aa.io', password='josephpassword')
    joshua = User(
        username='joshua', email='joshua@aa.io', password='joshuapassword')
    joyce = User(
        username='joyce', email='joyce@aa.io', password='joycepassword')
    justin = User(
        username='justin', email='justin@aa.io', password='justinpassword')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='marniepassword')
    may = User(
        username='may', email='may@aa.io', password='maypassword')
    yoori = User(
        username='yoori', email='yoori@aa.io', password='yooripassword')

    db.session.add(demo)
    db.session.add(andrew)
    db.session.add(ashley)
    db.session.add(bobbie)
    db.session.add(calvin)
    db.session.add(cho)
    db.session.add(chloe)
    db.session.add(david)
    db.session.add(ellie)
    db.session.add(emily)
    db.session.add(gene)
    db.session.add(geo)
    db.session.add(gina)
    db.session.add(joseph)
    db.session.add(joshua)
    db.session.add(joyce)
    db.session.add(justin)
    db.session.add(marnie)
    db.session.add(may)
    db.session.add(yoori)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
