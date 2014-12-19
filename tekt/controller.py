"""
:synopsis: Main blueprint router and controller
"""

from flask import Blueprint
from flask import render_template
from flask import request
import forms
import tektonik

controller = Blueprint('router', __name__, template_folder='templates')


@controller.route('/')
def dashboard():
    """ home page """
    return render_template("dashboard.html")


@controller.route('/properties/')
def properties():
    """ get list of properties """
    properties = tektonik.list_properties()
    return render_template("properties.html", properties=properties)


@controller.route('/properties/create', methods=['GET', 'POST'])
def create_property():
    """ create a property """
    form = forms.PropertyForm()
    if request.method == 'POST':
        record = tektonik.create_property(request.form)
        forms.error_check(form, record)
    return render_template("properties-create.html", form=form)


@controller.route('/properties/<int:id>')
def read_property(id):
    """ read a property """
    return render_template("properties-read.html", id=id)


@controller.route('/properties/<int:id>/update')
def update_property(id):
    """ edit a property """
    return render_template("properties-update.html", id=id)


@controller.route('/properties/<int:id>/delete')
def delete_property(id):
    """ delete a property """
    return render_template("properties-delete.html", id=id)
