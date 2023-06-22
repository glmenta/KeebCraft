from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class BuildPart(db.Model):
    __tablename__ = 'build_parts'

    id = db.Column(db.Integer, primary_key=True)
    build_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('keeb_builds.id')), nullable=False)
    part_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('parts.id')), nullable=False)

    build = db.relationship('KeebBuild', back_populates='build_parts')
    part = db.relationship('Part', back_populates='build_parts')

    def to_dict(self):
        return {
            'id': self.id,
            'build_id': self.build_id,
            'part_id': self.part_id,
            'part': self.part.to_dict()
        }

class KeebBuild(db.Model):
    __tablename__ = 'keeb_builds'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50))
    case = db.Column(db.String(50))
    size = db.Column(db.String(50))
    keycaps = db.Column(db.String(50))
    switches = db.Column(db.String(50))
    stabilizers = db.Column(db.String(50))
    plate = db.Column(db.String(50))
    keeb_info = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    user = db.relationship('User', back_populates='keeb_builds')
    build_parts = db.relationship('BuildPart', back_populates='build')
    build_images = db.relationship('BuildImage', back_populates='build', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='build', cascade='all, delete-orphan')
    favorite_builds = db.relationship('FavoriteBuild', back_populates='build')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'case': self.case,
            'size': self.size,
            'keycaps': self.keycaps,
            'switches': self.switches,
            'stabilizers': self.stabilizers,
            'pcb': self.pcb,
            'keeb_info': self.keeb_info,
        }
