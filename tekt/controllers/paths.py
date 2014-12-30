"""
:synopsis: Paths controller
"""

from flask import Blueprint
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from tekt.tektonik import tektonik
from tekt import forms

blueprint = Blueprint('paths', __name__, template_folder='templates')


@blueprint.route('/')
def list_paths():

    """ get list of paths """

    records = tektonik.list_paths()['result']
    return render_template("paths/list.html", paths=records)


@blueprint.route('/create', methods=['GET', 'POST'])
def create_path():

    """ create a path """

    form = forms.PathFormFactory(request)
    if request.method == 'POST':
        new_record = tektonik.create_path(request.form)
        is_valid = forms.is_valid(form, new_record)
        if is_valid:
            return redirect(url_for('.list_paths'))
    return render_template("paths/create.html", form=form)


@blueprint.route('/<int:id>', methods=['GET', 'POST'])
def read_path(id):

    """ read a path and add page to path """

    record = tektonik.read_path(id)['result']
    data = {'path_id': id}
    form = forms.PathPageForm(request.form, data=data)

    if request.method == 'POST':
        new_record = tektonik.create_path_page(request.form)
        is_valid = forms.is_valid(form, new_record)
        if is_valid:
            return redirect(url_for('.read_path', id=id))

    return render_template("paths/read.html", path=record, form=form)


@blueprint.route('/<int:id>/remove/<int:path_page_id>', methods=['GET'])
def remove_page_from_path(id, path_page_id):

    """ remove a page from a path """

    tektonik.delete_path_page(path_page_id)
    return redirect(url_for('.read_path', id=id))


@blueprint.route('/<int:id>/update', methods=['GET', 'POST'])
def update_path(id):

    """ edit a path """

    record = tektonik.read_path(id)['result']
    form = forms.PathFormFactory(request, data=record)

    if request.method == 'POST':
        form = forms.PathFormFactory(request)
        update_record = tektonik.update_path(request.form, id)
        is_valid = forms.is_valid(form, update_record)
        if is_valid:
            return redirect(url_for('.read_path', id=id))

    template = "paths/update.html"
    return render_template(template, form=form, path=record)


@blueprint.route('/<int:id>/delete')
def delete_path(id):

    """ delete a path """

    tektonik.delete_path(id)
    return redirect(url_for('.list_paths'))
