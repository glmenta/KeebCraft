from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class FavoriteBuild(db.Model):
    __tablename__='favorite_builds'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    build_id = db.Column(db.Integer, db.ForeignKey('keeb_builds.id'), nullable=False)
    favorite_id = db.Column(db.Integer, db.ForeignKey('favorites.id'), nullable=False)

    build = db.relationship('KeebBuild', back_populates='favorite_builds')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'build_id': self.build_id,
            'favorite_id': self.favorite_id
        }

class Favorite (db.Model):
    __tablename__='favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
