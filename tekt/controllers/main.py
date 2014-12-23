"""
:synopsis: Main Blueprint and controller
"""

from flask import Blueprint
from flask import render_template


blueprint = Blueprint('main', __name__, template_folder='templates')


@blueprint.route('/')
def dashboard():

    """ home page """

    return render_template("dashboard.html")
