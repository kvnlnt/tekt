"""
:synopsis: Main Blueprint and controller
"""

from flask import Blueprint
from flask import render_template
from tekt.tektonik import tektonik


blueprint = Blueprint('main', __name__, template_folder='templates')


@blueprint.route('/')
def dashboard():

    """ home page """

    properties = tektonik.list_properties()['result']
    return render_template("dashboard.html", properties=properties)
