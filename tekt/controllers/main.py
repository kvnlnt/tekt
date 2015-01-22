"""
:synopsis: Main Blueprint and controller
"""

from flask import Blueprint
from flask import g
from flask import render_template
from tekt import forms
from flask import request
from flask import current_app
from tekt.tektonik import tektonik


blueprint = Blueprint('main', __name__, template_folder='templates')


@blueprint.before_app_request
def before_app_request():

    """ Manage and generate global template vars """

    g.template = {}
    g.template['menu-toggle'] = 'collapsed' \
        if request.cookies.get('TEKT-menu-toggle') == 'true' else ''
    g.template['menu-toggle-button'] = 'fa-chevron-right' \
        if request.cookies.get('TEKT-menu-toggle') == 'true' \
        else 'fa-chevron-left'


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


@blueprint.route('patterns')
def patterns():

    """ Pattern library """

    import pykss
    libs = pykss.Parser(
        current_app.root_path + '/static/styles/libs', '.scss')
    elements = pykss.Parser(
        current_app.root_path + '/static/styles/elements', '.scss')
    components = pykss.Parser(
        current_app.root_path + '/static/styles/components', '.scss')
    compositions = pykss.Parser(
        current_app.root_path + '/static/styles/compositions', '.scss')

    return render_template(
        "patterns.html",
        elements=elements,
        libs=libs,
        components=components,
        compositions=compositions)
