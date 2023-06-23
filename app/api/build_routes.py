from flask import Blueprint, redirect, url_for, render_template, jsonify, request
from flask_login import login_required, current_user, logout_user
from ..models.keeb_builds import KeebBuild
import json

keeb_builds_routes = Blueprint('keebs', __name__)

#view all keebs
@keeb_builds_routes.route('/', methods=['GET'])
def get_all_keebs():
    keebs = KeebBuild.query.all()
    return {
        "Keebs": [keeb.to_dict() for keeb in keebs]
    }
