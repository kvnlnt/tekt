"""
:synopsis: Main blueprint router and controller
"""

from flask import Blueprint
from flask import render_template

controller = Blueprint('router', __name__, template_folder='templates')


@controller.route('/')
def dashboard():
    """ home page """
    return render_template("pages/properties.html")


@controller.route('/properties')
def properties():
    """ get list of properties """
    return render_template("pages/properties.html")
