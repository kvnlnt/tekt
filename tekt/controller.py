"""
:synopsis: Main blueprint router and controller
"""

from flask import Blueprint
from flask import render_template
from flask import redirect
from flask import request
from flask import url_for
from tektonik import tektonik
import forms

controller = Blueprint('router', __name__, template_folder='templates')


@controller.route('/')
def dashboard():
    """ home page """
    return render_template("dashboard.html")


@controller.route('/properties')
def properties():
    """ get list of properties """
    records = tektonik.list_properties()['result']
    return render_template("properties.html", properties=records)


@controller.route('/properties/create', methods=['GET', 'POST'])
def create_property():
    """ create a property """
    form = forms.PropertyForm(request.form)
    if request.method == 'POST':
        new_record = tektonik.create_property(request.form)
        is_valid = forms.is_valid(form, new_record)
        if is_valid:
            return redirect(url_for('.properties'))
    return render_template("properties-create.html", form=form)


@controller.route('/properties/<int:id>')
def read_property(id):
    """ read a property """
    record = tektonik.read_property(id)['result']
    return render_template("properties-read.html", property=record)


@controller.route('/properties/<int:id>/update', methods=['GET', 'POST'])
def update_property(id):
    """ edit a property """

    record = tektonik.read_property(id)['result']
    form = forms.PropertyForm(request.form, data=record)

    # if request.method == 'POST':
    #     form = forms.PropertyForm(request.form)
    #     update_record = tektonik.update_property(request.form, id)
    #     is_valid = forms.is_valid(form, update_record)
    #     if is_valid:
    #         return redirect(url_for('.properties'))

    template = "properties-update.html"
    return render_template(template, form=form, property=record)


@controller.route('/properties/<int:id>/delete')
def delete_property(id):
    """ delete a property """
    tektonik.delete_property(id)
    return redirect(url_for('.properties'))
