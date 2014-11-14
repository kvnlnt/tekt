"""
:synopsis: Main blueprint router and controller
"""

from flask import Blueprint, render_template
from parts import properties_list as properties_list_part
from parts import properties_read as properties_read_part


pages = Blueprint('pages', __name__, template_folder='templates')


@pages.route('/')
def dashboard():
    """ home page """
    return render_template("pages/dashboard.html")


@pages.route('/properties')
def properties():
    """ get list of properties """
    return render_template(
        "pages/properties.html",
        view='list',
        properties_list=properties_list_part()
    )


@pages.route('/properties/<string:id>')
def properties_read(id):
    """ get a single property """
    return render_template(
        "pages/properties.html",
        view='read',
        properties_read=properties_read_part(id)
    )
