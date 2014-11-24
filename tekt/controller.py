"""
:synopsis: Main blueprint router and controller
"""

from flask import Blueprint
from flask import render_template

controller = Blueprint('router', __name__, template_folder='templates')


@controller.route('/')
def dashboard():
    """ home page """
    return render_template("properties/pages/list.html")


@controller.route('/properties')
def list_properties():
    """ get list of properties """
    return render_template("properties/pages/list.html")


@controller.route('/properties/<int:id>')
def edit_property(id):
    """ edit a property """
    return render_template("properties/pages/edit.html")
