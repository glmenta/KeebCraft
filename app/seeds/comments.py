from app.models.comments import db, environment, SCHEMA, Comment

def seed_comments():
    user_one_linear_build = Comment(
        user_id=1,
        build_id=1,
        comment='This is a linear build'
    )
    user_one_tactile_build = Comment(
        user_id=1,
        build_id=2,
        comment='This is a tactile build'
    )
    user_two_clicky_build = Comment(
        user_id=2,
        build_id=3,
        comment='This is a clicky build'
    )
    user_three_linear_build = Comment(
        user_id=3,
        build_id=1,
        comment='This is a linear build'
    )

    db.session.add(user_one_linear_build)
    db.session.add(user_one_tactile_build)
    db.session.add(user_two_clicky_build)
    db.session.add(user_three_linear_build)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")
