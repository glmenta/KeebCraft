from app.models.keeb_builds import db,BuildPart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_build_parts():
    # linear
    linear_switch = BuildPart(
        build_id=1,
        part_id=1,
    )
    tactile_switch = BuildPart(
        build_id=2,
        part_id=2,
    )
    clicky_switch = BuildPart(
        build_id=3,
        part_id=3,
    )
    linear_case = BuildPart(
        build_id=1,
        part_id=4,
    )
    tactile_case = BuildPart(
        build_id=2,
        part_id=5,
    )
    clicky_case = BuildPart(
        build_id=3,
        part_id=6,
    )
    linear_keycaps = BuildPart(
        build_id=1,
        part_id=7,
    )
    tactile_keycaps = BuildPart(
        build_id=2,
        part_id=8,
    )
    clicky_keycaps = BuildPart(
        build_id=3,
        part_id=9,
    )
    linear_stabs = BuildPart(
        build_id=1,
        part_id=10,
    )
    tactile_stabs = BuildPart(
        build_id=2,
        part_id=11,
    )
    clicky_stabs = BuildPart(
        build_id=3,
        part_id=12,
    )
    linear_plate = BuildPart(
        build_id=1,
        part_id=13,
    )
    tactile_plate = BuildPart(
        build_id=2,
        part_id=14,
    )
    clicky_plate = BuildPart(
        build_id=3,
        part_id=15,
    )

    db.session.add(linear_switch)
    db.session.add(tactile_switch)
    db.session.add(clicky_switch)
    db.session.add(linear_case)
    db.session.add(tactile_case)
    db.session.add(clicky_case)
    db.session.add(linear_keycaps)
    db.session.add(tactile_keycaps)
    db.session.add(clicky_keycaps)
    db.session.add(linear_stabs)
    db.session.add(tactile_stabs)
    db.session.add(clicky_stabs)
    db.session.add(linear_plate)
    db.session.add(tactile_plate)
    db.session.add(clicky_plate)
    db.session.commit()

def undo_build_parts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.build_parts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM build_parts"))
    db.session.commit()
