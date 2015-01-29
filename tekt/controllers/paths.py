"""
:synopsis: Paths controller
"""

from flask import Blueprint
from flask import flash
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from tekt import forms
from tekt.tektonik import tektonik

blueprint = Blueprint('paths', __name__, template_folder='templates')


@blueprint.route('/')
def list_paths():

    """ get list of paths """

    paths = tektonik.list_paths()
    records = paths['result']
    metadata = paths['metadata']
    return render_template(
        "paths/list.html",
        paths=records,
        metadata=metadata,
        section='paths')


@blueprint.route('/create', methods=['GET', 'POST'])
def create_path():

    """ create a path """

    form = forms.path_form_factory(request)
    if request.method == 'POST':
        new_record = tektonik.create_path(request.form)
        is_valid = forms.is_valid(form, new_record)
        if is_valid:
            flash(
                "Awesome! You just created a new path",
                "praise")
            return redirect(url_for('.list_paths'))
        else:
            flash(
                "Whoops, something went wrong...try again",
                "alarm")
    return render_template("paths/create.html", form=form, section='paths')


@blueprint.route('/<int:id>', methods=['GET', 'POST'])
def read_path(id):

    """ read a path and add page to path """

    record = tektonik.read_path(id)['result']

    return render_template(
        "paths/read.html",
        path=record,
        section='paths')


@blueprint.route('/<int:id>/pages', methods=['GET', 'POST'])
def pages(id):

    """ view and add pages """

    record = tektonik.read_path(id)['result']
    data = {'path_id': id, 'page_id': 0}
    form = forms.PathPageForm(request.form, data=data)

    if request.method == 'POST':
        new_record = tektonik.create_path_page(request.form)
        is_valid = forms.is_valid(
            form,
            new_record,
            {'page_id': 'page_selector'}
        )
        if is_valid:
            flash(
                "Good job. You just added a page to this path.",
                "praise")
            return redirect(url_for('.pages', id=id))
        else:
            flash(
                'Looks like there was an error trying to add your page',
                'alarm')

    return render_template(
        'paths/pages.html',
        path=record,
        form=form
    )


@blueprint.route('/<int:id>/remove/<int:path_page_id>', methods=['GET'])
def remove_page(id, path_page_id):

    """ remove a page from a path """

    tektonik.delete_path_page(path_page_id)
    flash("Page removed from path", "warn")
    return redirect(url_for('.pages', id=id))


@blueprint.route('/<int:id>/update', methods=['GET', 'POST'])
def update_path(id):

    """ edit a path """

    record = tektonik.read_path(id)['result']
    path_form = forms.path_form_factory(request, data=record)
    delete_form = forms.DeletePageForm(phrase=record['path'])

    if request.method == 'POST':
        form = forms.path_form_factory(request)
        update_record = tektonik.update_path(request.form, id)
        is_valid = forms.is_valid(form, update_record)
        if is_valid:
            flash(
                "You just updated the settings for this path",
                "inform")
            return redirect(url_for('.read_path', id=id))
        else:
            flash(
                "Uh oh, looks like something needs to be fixed...",
                "alarm")

    template = "paths/update.html"
    return render_template(
        template,
        path_form=path_form,
        path=record,
        delete_form=delete_form,
        section='paths')


@blueprint.route('/<int:id>/delete', methods=['POST'])
def delete_path(id):

    """ delete a path """

    confirmed = request.form['phrase'] == request.form['confirm']

    if confirmed:
        message = "The path <strong>" + \
            request.form['phrase'] + "</strong> was deleted"
        flash(message, "inform")
        tektonik.delete_path(id)
        return redirect(url_for('.list_paths'))
    else:
        flash("Confirmation failed. Path was not deleted", "alarm")
        return redirect(url_for('.read_path', id=id))
