from app.models.parts import db, Part, environment, SCHEMA
from sqlalchemy.sql import text

def seed_parts():
    LekkerSwitch = Part(
        name='Lekker Switches',
        description='Linear switches',
        user_id=1,
        type_id=1
    )
    HolyPandaSwitch = Part(
        name='Holy Panda Switches',
        description='Tactile switches',
        user_id=1,
        type_id=1
    )
    BoxJadeSwitch = Part(
        name='Kailh Box Jade Switches',
        description='Clicky switches',
        user_id=1,
        type_id=1
    )


    db.session.add(LekkerSwitch)
    db.session.add(HolyPandaSwitch)
    db.session.add(BoxJadeSwitch)
    db.session.commit()

def undo_parts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.parts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM parts"))
    db.session.commit()
