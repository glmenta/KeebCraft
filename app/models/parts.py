from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class PartType(db.Model):
    __tablename__ = 'part_types'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))

    parts = db.relationship('Part', back_populates='types')

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type
        }

class Part(db.Model):
    __tablename__ = 'parts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type_id = db.Column(db.Integer, db.ForeignKey('part_types.id'), nullable=False)
    name = db.Column(db.String(50))
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='parts')
    types = db.relationship('PartType', back_populates='parts')
    part_images = db.relationship('PartImage', back_populates='parts', cascade='all, delete-orphan', passive_deletes=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'type_id': self.type_id,
            'name': self.name,
            'description': self.description
        }
