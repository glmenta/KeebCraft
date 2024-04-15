from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class UserImage (db.Model):
    __tablename__ = 'user_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    url = db.Column(db.String(999), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='user_images')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'url': self.url
        }

class PartImage (db.Model):
    __tablename__ = 'part_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    part_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('parts.id')), nullable=False)
    url = db.Column(db.String(999), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    parts = db.relationship('Part', back_populates='part_images')

    def to_dict(self):
        return {
            'id': self.id,
            'part_id': self.part_id,
            'url': self.url
        }

class BuildImage (db.Model):
    __tablename__ = 'build_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    build_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('keeb_builds.id')), nullable=False)
    url = db.Column(db.String(999), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    build = db.relationship('KeebBuild', back_populates='build_images')

    def to_dict(self):
        return {
            'id': self.id,
            'build_id': self.build_id,
            'url': self.url
        }
