"""
:synopsis: Pages controller
"""

from flask import Blueprint
from tekt.messaging import pages as messaging
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
            messaging.flash(messaging.create_page_success)
            return redirect(url_for('.list_pages'))
        else:
            messaging.flash(messaging.create_page_error)
    return render_template("pages/create.html", form=form, section='pages')


@blueprint.route('/<int:id>')
def read_page(id):

    """ read a page """

    record = tektonik.read_page(id)['result']
    return render_template("pages/read.html", page=record, section='pages')


@blueprint.route('/<int:id>/paths', methods=['GET', 'POST'])
def path_schedule(id):

    """ view and add pages """

    # record = tektonik.read_path(id)['result']
    # data = {'path_id': id, 'page_id': 0}
    # form = forms.PathPageForm(request.form, data=data)

    # if request.method == 'POST':
    #     new_record = tektonik.create_path_page(request.form)
    #     is_valid = forms.is_valid(
    #         form,
    #         new_record,
    #         {'page_id': 'page_selector'}
    #     )
    #     if is_valid:
    #         messaging.flash(messaging.page_schedule_success)
    #         return redirect(url_for('.page_schedule', id=id))
    #     else:
    #         messaging.flash(messaging.page_schedule_error)

    # return render_template(
    #     'paths/page_schedule.html',
    #     path=record,
    #     form=form,
    #     section='paths'
    # )


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
            messaging.flash(messaging.update_page_success)
            return redirect(url_for('.read_page', id=id))
        else:
            messaging.flash(messaging.update_page_error)

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
        messaging.flash(
            messaging.delete_page_success,
            phrase=request.form['phrase'])
        tektonik.delete_page(id)
        return redirect(url_for('.list_pages'))
    else:
        messaging.flash(messaging.delete_page_error)
        return redirect(url_for('.read_page', id=id))
