from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users_data = [
        {'username': 'Demo', 'email': 'demo@aa.io', 'password': 'password'},
        {'username': 'andrew', 'email': 'andrew@aa.io', 'password': 'andrewpassword'},
        {'username': 'ashley', 'email': 'ashley@aa.io', 'password': 'ashleypassword'},
        {'username': 'bobbie', 'email': 'bobbie@aa.io', 'password': 'bobbiepassword'},
        {'username': 'calvin', 'email': 'calvin@aa.io', 'password': 'calvinpassword'},
        {'username': 'chloe', 'email': 'chloe@aa.io', 'password': 'chloepassword'},
        {'username': 'cho', 'email': 'cho@aa.io', 'password': 'chopassword'},
        {'username': 'david', 'email': 'david@aa.io', 'password': 'davidpassword'},
        {'username': 'ellie', 'email': 'ellie@aa.io', 'password': 'elliepassword'},
        {'username': 'emily', 'email': 'emily@aa.io', 'password': 'emilypassword'},
        {'username': 'gene', 'email': 'gene@aa.io', 'password': 'genepassword'},
        {'username': 'geo', 'email': 'geo@aa.io', 'password': 'geopassword'},
        {'username': 'gina', 'email': 'gina@aa.io', 'password': 'ginapassword'},
        {'username': 'joseph', 'email': 'joseph@aa.io', 'password': 'josephpassword'},
        {'username': 'joshua', 'email': 'joshua@aa.io', 'password': 'joshuapassword'},
        {'username': 'joyce', 'email': 'joyce@aa.io', 'password': 'joycepassword'},
        {'username': 'justin', 'email': 'justin@aa.io', 'password': 'justinpassword'},
        {'username': 'marnie', 'email': 'marnie@aa.io', 'password': 'marniepassword'},
        {'username': 'may', 'email': 'may@aa.io', 'password': 'maypassword'},
        {'username': 'yoori', 'email': 'yoori@aa.io', 'password': 'yooripassword'},
    ]

    for data in users_data:
        exists = User.query.filter(
            (User.username == data['username']) | (User.email == data['email'])
        ).first()

        if not exists:
            user = User(
                username=data['username'],
                email=data['email'],
                password=data['password']
            )
            db.session.add(user)
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
