from flask import Blueprint, redirect, url_for, render_template, jsonify, request
from flask_login import login_required, current_user, logout_user
from ..models.images import PartImage
from ..forms.keeb_form import KeebForm
from ..models.db import db
from ..models.parts import Part, PartType
import json

part_routes = Blueprint('parts', __name__)

@part_routes.route('/', methods=['GET'])
def get_all_parts():
    parts = Part.query.all()
    return {
        "Parts": [part.to_dict() for part in parts]
    }

@part_routes.route('/current', methods=['GET'])
@login_required
def get_current_parts():
    parts = Part.query.filter(Part.user_id == current_user.id).all()
    return {
        "Parts": [part.to_dict() for part in parts]
    }

@part_routes.route('/<int:id>', methods=['GET'])
def get_part(id):
    part = Part.query.get(id)
    if (part):
        image = PartImage.query.filter(PartImage.part_id == id).all()

@part_routes.route('/type/<int:id>', methods=['GET'])
def get_part_by_type(id):
    type = PartType.query.get(id)
    part = Part.query.filter(Part.part_type_id == id).all()
    if (part):
        image = PartImage.query.filter(PartImage.part_id == id).all()
