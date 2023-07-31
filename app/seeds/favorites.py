from app.models.favorites import db, environment, SCHEMA, Favorite
from sqlalchemy.sql import text

def seed_favorites():
    user_one_favorite_list = Favorite(
        user_id=1,
        name = 'User One Favorites'
    )
    user_two_favorite_list = Favorite(
        user_id=2,
        name = 'User Two Favorites'
    )
    user_three_favorite_list = Favorite(
        user_id=3,
        name = 'User Three Favorites'
    )

    db.session.add(user_one_favorite_list)
    db.session.add(user_two_favorite_list)
    db.session.add(user_three_favorite_list)
    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))
    db.session.commit()
