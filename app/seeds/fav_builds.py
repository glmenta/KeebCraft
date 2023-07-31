from app.models.favorites import db, FavoriteBuild, environment, SCHEMA
from sqlalchemy.sql import text
# from .favorites import seed_favorites

def seed_favorite_builds():
    # seed_favorites()
    user_one_linear_build = FavoriteBuild(
        user_id=1,
        build_id=1,
        favorite_id=1,
    )
    user_one_tactile_build = FavoriteBuild(
        user_id=1,
        build_id=2,
        favorite_id=2,
    )
    user_two_clicky_build = FavoriteBuild(
        user_id=2,
        build_id=3,
        favorite_id=3,
    )
    user_three_linear_build = FavoriteBuild(
        user_id=3,
        build_id=1,
        favorite_id=4,
    )

    db.session.add(user_one_linear_build)
    db.session.add(user_one_tactile_build)
    db.session.add(user_two_clicky_build)
    db.session.add(user_three_linear_build)
    db.session.commit()

def undo_favorite_builds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorite_builds RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorite_builds"))
    db.session.commit()
