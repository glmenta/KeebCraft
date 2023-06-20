from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Part(db.Model):
    __tablename__ = 'parts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type_id = db.Column(db.Integer, db.ForeignKey('types.id'), nullable=False)
    name = db.Column(db.String(50))
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='parts')
    types = db.relationship('Type', back_populates='parts')
    comments = db.relationship('Comment', back_populates='part', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'type_id': self.type_id,
            'name': self.name,
            'description': self.description
        }
