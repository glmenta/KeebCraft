from flask.cli import AppGroup
from .users import seed_users, undo_users
from .parts import seed_parts, undo_parts
from .build_parts import seed_build_parts, undo_build_parts
from .fav_builds import seed_favorite_builds, undo_favorite_builds
from .keeb_builds import seed_keeb_builds, undo_keeb_builds
from .favorites import seed_favorites, undo_favorites
from .images import seed_build_images, undo_build_images, seed_user_images, undo_user_images, seed_parts_images, undo_parts_images
from .part_types import seed_part_types, undo_part_types
from .comments import seed_comments, undo_comments
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        db.session.execute(f'TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.parts RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.build_parts RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.keeb_builds RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.user_images RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.part_images RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.build_images RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.part_types RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.favorite_builds RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;')
        undo_users()
    seed_users()
    seed_part_types()
    seed_parts()
    seed_keeb_builds()
    seed_build_parts()
    seed_favorite_builds()
    seed_favorites()
    seed_comments()
    seed_build_images()
    seed_user_images()
    seed_parts_images()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_parts()
    undo_build_parts()
    undo_favorite_builds()
    undo_keeb_builds()
    undo_favorites()
    undo_comments()
    undo_build_images()
    undo_user_images()
    undo_parts_images()
    undo_part_types()
    # Add other undo functions here
