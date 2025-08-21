from flask.cli import AppGroup
from .reviews import seed_reviews, undo_reviews
from .tags import seed_tags, undo_tags
from .users import seed_users, undo_users
from .websites import seed_websites, undo_websites
from .website_tags import seed_website_tags, undo_website_tags
import sys

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    print("Running Seeder...")
    if environment == 'production':
        print("Undoing Production Data...")
        # Before seeding in production, you want to run the seed undo
        # command, which will truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_websites()
        undo_reviews()
        undo_tags()
        undo_website_tags()

    print("Seeding Data...")
    seed_users()
    seed_websites()
    seed_reviews()
    seed_tags()
    seed_website_tags()
    print("Done Seeding")
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_websites()
    undo_reviews()
    undo_tags()
    undo_website_tags()
    # Add other undo functions here
