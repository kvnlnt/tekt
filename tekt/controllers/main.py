"""
:synopsis: Main Blueprint and controller
"""

from flask import Blueprint
from flask import render_template
from tekt import forms
from flask import request
from tekt.tektonik import tektonik


blueprint = Blueprint('main', __name__, template_folder='templates')


@blueprint.route('')
def home():

    """ home page """

    form = forms.SignInForm(request.form)
    return render_template("home.html", form=form)


@blueprint.route('dashboard')
def dashboard():

    """ dashboard """

    properties = tektonik.list_properties()['result']
    return render_template(
        "dashboard.html",
        properties=properties,
        section='dashboard')


@blueprint.route('primers')
def primers():

    """ Help tutorials """

    return render_template("primers.html", section='primers')
