"""
:synopsis: Properties controller
"""

from flask import Blueprint
from tekt.messaging import properties as messaging
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from tekt import forms
from tekt.tektonik import tektonik


blueprint = Blueprint('properties', __name__, template_folder='templates')


@blueprint.route('/')
def list_properties():

    """ get list of properties """
    properites = tektonik.list_properties()
    records = properites['result']
    metadata = properites['metadata']
    return render_template(
        "properties/list.html",
        properties=records,
        metadata=metadata,
        section='properties')


@blueprint.route('/create', methods=['GET', 'POST'])
def create_property():

    """ create a property """

    form = forms.PropertyForm(request.form)
    if request.method == 'POST':
        new_record = tektonik.create_property(request.form)
        is_valid = forms.is_valid(form, new_record)
        if is_valid:
            messaging.flash(messaging.create_property_success)
            return redirect(url_for('.list_properties'))
        else:
            messaging.flash(messaging.create_property_error)
    return render_template(
        "properties/create.html",
        form=form,
        section='properties')


@blueprint.route('/<int:id>')
def read_property(id):

    """ read a property """

    record = tektonik.read_property(id)['result']
    return render_template(
        "properties/read.html",
        property=record,
        section='properties')


@blueprint.route('/<int:id>/update', methods=['GET', 'POST'])
def update_property(id):

    """ edit a property """

    record = tektonik.read_property(id)['result']
    form = forms.PropertyForm(request.form, data=record)
    delete_form = forms.DeletePropertyForm(phrase=record['property'])

    if request.method == 'POST':
        form = forms.PropertyForm(request.form)
        update_record = tektonik.update_property(request.form, id)
        is_valid = forms.is_valid(form, update_record)
        if is_valid:
            messaging.flash(messaging.update_property_success)
            return redirect(url_for('.read_property', id=id))
        else:
            messaging.flash(messaging.update_property_error)

    template = "properties/update.html"
    return render_template(
        template,
        form=form,
        delete_form=delete_form,
        property=record,
        section='properties')


@blueprint.route('/<int:id>/delete', methods=['POST'])
def delete_property(id):

    """ delete a property """

    confirmed = request.form['phrase'] == request.form['confirm']

    if confirmed:
        messaging.flash(
            messaging.delete_property_success,
            phrase=request.form['phrase'])
        tektonik.delete_property(id)
        return redirect(url_for('.list_properties'))
    else:
        messaging.flash(messaging.delete_property_error)
        return redirect(url_for('.read_property', id=id))
