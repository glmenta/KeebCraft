from app.models.keeb_builds import db, KeebBuild, environment, SCHEMA
from sqlalchemy.sql import text

def seed_keeb_builds():
    linear_demo = KeebBuild(
        user_id=1,
        name='Linear Demo',
        case='FreeBird 60',
        size='60%',
        keycaps='PBT Resonance',
        switches='Lekker',
        stabilizers='Stock Stabs',
        plate='Aluminum',
        keeb_info='Linear Build; Amazing Gaming Keyboard',
    )
    tactile_demo = KeebBuild(
        user_id=2,
        name='Tactile Demo',
        case='Keychron C1',
        size='85%',
        keycaps='Stock Keycaps',
        switches='Holy Pandas',
        stabilizers='Durock Stabs',
        plate='Brass',
        keeb_info='Tactile Build; Great Tactile Keyboard',
    )
    clicky_demo = KeebBuild(
        user_id=3,
        name='Clicky Demo',
        case='GMMK Pro',
        size='75%',
        keycaps='GMK Olive',
        switches='Kailh Box Jade',
        stabilizers='C3 Equalz Stabs',
        plate='Polycarbonate',
        keeb_info='Clicky Build; Loud But Enjoyable Keyboard',
    )


    db.session.add(linear_demo)
    db.session.add(tactile_demo)
    db.session.add(clicky_demo)
    db.session.commit()

def undo_keeb_builds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.keeb_builds RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM keeb_builds"))
    db.session.commit()
