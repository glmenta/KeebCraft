from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment (db.Model):
    __tablename__='comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    build_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('keeb_builds.id')), nullable=False)
    comment = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='comments')
    build = db.relationship('KeebBuild', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'build_id': self.build_id,
            'comment': self.comment
        }
