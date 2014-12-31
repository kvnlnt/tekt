"""
:synopsis: Pages controller
"""

from flask import Blueprint
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from tekt.tektonik import tektonik
from tekt import forms

blueprint = Blueprint('pages', __name__, template_folder='templates')


@blueprint.route('/')
def list_pages():

    """ get list of pages """

    records = tektonik.list_pages()['result']
    return render_template("pages/list.html", pages=records, section='pages')


@blueprint.route('/create', methods=['GET', 'POST'])
def create_page():

    """ create a page """

    form = forms.PageForm(request.form)
    if request.method == 'POST':
        new_record = tektonik.create_page(request.form)
        is_valid = forms.is_valid(form, new_record)
        if is_valid:
            return redirect(url_for('.list_pages'))
    return render_template("pages/create.html", form=form, section='pages')


@blueprint.route('/<int:id>')
def read_page(id):

    """ read a page """

    record = tektonik.read_page(id)['result']
    return render_template("pages/read.html", page=record, section='pages')


@blueprint.route('/<int:id>/update', methods=['GET', 'POST'])
def update_page(id):

    """ edit a page """

    record = tektonik.read_page(id)['result']
    form = forms.PageForm(request.form, data=record)

    if request.method == 'POST':
        form = forms.PageForm(request.form)
        update_record = tektonik.update_page(request.form, id)
        is_valid = forms.is_valid(form, update_record)
        if is_valid:
            return redirect(url_for('.read_page', id=id))

    template = "pages/update.html"
    return render_template(template, form=form, page=record, section='pages')


@blueprint.route('/<int:id>/delete')
def delete_page(id):

    """ delete a page """

    tektonik.delete_page(id)
    return redirect(url_for('.list_pages'))
