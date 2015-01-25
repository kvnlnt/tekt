"""
:synopsis: Pages controller
"""

from flask import Blueprint
from flask import flash
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

    pages = tektonik.list_pages()
    records = pages['result']
    metadata = pages['metadata']
    return render_template(
        "pages/list.html",
        pages=records,
        metadata=metadata,
        section='pages')


@blueprint.route('/search', methods=['GET', 'POST'])
def search_pages():

    """ get list of pages """

    form = forms.PageSearchForm(request.form)
    if request.method == 'GET':
        records = tektonik.list_pages()['result']

    if request.method == 'POST':
        term = {'page': request.form['term']}
        records = tektonik.search_pages(term)['result']

    return render_template("pages/search.html", pages=records, form=form)


@blueprint.route('/create', methods=['GET', 'POST'])
def create_page():

    """ create a page """

    form = forms.PageForm(request.form)
    if request.method == 'POST':
        new_record = tektonik.create_page(request.form)
        is_valid = forms.is_valid(form, new_record)
        if is_valid:
            flash(
                "Success! You just created a new page",
                "praise")
            return redirect(url_for('.list_pages'))
        else:
            flash(
                "Oops! You might of missed something...",
                "alarm")
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
    delete_form = forms.DeletePageForm(phrase=record['page'])

    if request.method == 'POST':
        form = forms.PageForm(request.form)
        update_record = tektonik.update_page(request.form, id)
        is_valid = forms.is_valid(form, update_record)
        if is_valid:
            flash(
                "Page settings were updated.",
                "inform")
            return redirect(url_for('.read_page', id=id))
        else:
            flash(
                "Uh oh...looks like there were some errors",
                "alarm")

    template = "pages/update.html"
    return render_template(
        template,
        form=form,
        delete_form=delete_form,
        page=record,
        section='pages')


@blueprint.route('/<int:id>/delete', methods=['POST'])
def delete_page(id):

    """ delete a page """

    confirmed = request.form['phrase'] == request.form['confirm']

    if confirmed:
        flash("Page deleted", "inform")
        tektonik.delete_page(id)
    else:
        flash("Page deletion failed. Confirmation failed.", "alarm")

    return redirect(url_for('.list_pages'))
