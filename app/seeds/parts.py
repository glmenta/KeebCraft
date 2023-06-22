from app.models.parts import db, Part, environment, SCHEMA
from sqlalchemy.sql import text

def seed_parts():
    LekkerSwitch = Part(
        name='Lekker',
        description='Linear switches',
        user_id=1,
        type_id=1
    )
    HolyPandaSwitch = Part(
        name='Holy Pandas',
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
    SmallCase = Part(
        name='FreeBird 60',
        description='60% Case',
        user_id=1,
        type_id=2
    )
    MediumCase = Part(
        name='GMMK Pro',
        description='75% Case',
        user_id=1,
        type_id=2
    )
    LargeCase = Part(
        name='Keychron C1',
        description='85% Case',
        user_id=1,
        type_id=2
    )
    StockABSKeycaps = Part(
        name='Stock Keycaps',
        description='Standard ABS Keycaps',
        user_id=1,
        type_id=3
    )
    PBTResonanceKeycaps = Part(
        name='PBT Resonance',
        description='PBT Resonance Keycaps',
        user_id=1,
        type_id=3
    )
    GMKOliveKeycaps = Part(
        name='GMK Olive',
        description='GMK Olive Keycaps',
        user_id=1,
        type_id=3
    )
    StockStabs = Part(
        name='Stock Stabs',
        description='Standard Stock Stabs',
        user_id=1,
        type_id=4
    )
    DurockStabs = Part(
        name='Durock Stabs',
        description='Durock Stabs',
        user_id=1,
        type_id=4
    )
    C3EqualzStabs = Part(
        name='C3 Equalz Stabs',
        description='C3 Equalz Stabs',
        user_id=1,
        type_id=4
    )
    AluminumPlate = Part(
        name='Aluminum',
        description='Aluminum',
        user_id=1,
        type_id=5
    )
    BrassPlate = Part(
        name='Brass',
        description='Brass',
        user_id=1,
        type_id=5
    )
    PolycarbonatePlate = Part(
        name='Polycarbonate',
        description='Polycarbonate',
        user_id=1,
        type_id=5
    )
    db.session.add(LekkerSwitch)
    db.session.add(HolyPandaSwitch)
    db.session.add(BoxJadeSwitch)
    db.session.add(SmallCase)
    db.session.add(MediumCase)
    db.session.add(LargeCase)
    db.session.add(StockABSKeycaps)
    db.session.add(PBTResonanceKeycaps)
    db.session.add(GMKOliveKeycaps)
    db.session.add(StockStabs)
    db.session.add(DurockStabs)
    db.session.add(C3EqualzStabs)
    db.session.add(AluminumPlate)
    db.session.add(BrassPlate)
    db.session.add(PolycarbonatePlate)
    db.session.commit()

def undo_parts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.parts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM parts"))
    db.session.commit()
