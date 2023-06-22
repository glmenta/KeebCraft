from app.models.parts import db, PartType, environment, SCHEMA
from sqlalchemy.sql import text

def seed_part_types():
    SwitchType = PartType(
        type='Switch',
    )
    CaseType = PartType(
        type='Case',
    )
    KeycapsType = PartType(
        type='Keycaps',
    )
    StabsType = PartType(
        type='Stabs',
    )
    PlateType = PartType(
        type='Plate',
    )


    db.session.add(SwitchType)
    db.session.add(CaseType)
    db.session.add(KeycapsType)
    db.session.add(StabsType)
    db.session.add(PlateType)
    db.session.commit()

def undo_part_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.part_types RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM part_types"))
    db.session.commit()
