"""
:synopsis: Main blueprint router and controller
"""

from flask import Blueprint, render_template


main = Blueprint('main', __name__, template_folder='templates')


@main.route('/')
def dashboard():
    """ home page """
    return render_template("pages/dashboard.html")


@main.route('/properties')
def properties():
    """ home page """
    return render_template("pages/properties.html")
