"""
:synopsis: Main blueprint router and controller
"""

from flask import Blueprint
from flask import render_template

router = Blueprint('router', __name__, template_folder='templates')


@router.route('/')
def dashboard():
    """ home page """
    return render_template("pages/dashboard.html")


@router.route('/properties')
def properties():
    """ get list of properties """
    return render_template("properties/pages/list.html")
