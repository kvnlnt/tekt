"""
:synopsis: Main blueprint router and controller
"""

from flask import Blueprint
from flask import render_template

controller = Blueprint('router', __name__, template_folder='templates')


@controller.route('/')
def dashboard():
    """ home page """
    return render_template("pages/dashboard.html")


@controller.route('/properties/')
def list_properties():
    """ get list of properties """
    return render_template("properties/pages/list.html")


@controller.route('/properties/<int:id>')
def update_property(id):
    """ edit a property """
    return render_template("properties/pages/update.html", id=id)


@controller.route('/paths/')
def list_paths():
    """ get list of paths """
    return render_template("paths/pages/list.html")


@controller.route('/pages/')
def list_pages():
    """ get list of paths """
    return render_template("pages/pages/list.html")


@controller.route('/parts/')
def list_parts():
    """ get list of paths """
    return render_template("parts/pages/list.html")


@controller.route('/pieces/')
def list_pieces():
    """ get list of pieces """
    return render_template("pieces/pages/list.html")
