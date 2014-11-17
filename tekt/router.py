"""
:synopsis: Main blueprint router and controller
"""

from resource import Properties
from flask import Blueprint
from flask import render_template
from flask import request

router = Blueprint('router', __name__, template_folder='templates')


@router.route('/load/<string:resource>.<string:method>')
def load(resource, method):
    """ loads resources """
    resource = getattr(globals()[resource](), method)()
    return render_template(resource['template'], **resource['data'])


@router.route('/')
def dashboard():
    """ home page """
    return render_template("pages/dashboard.html")


@router.route('/properties')
def properties():
    """ get list of properties """
    return render_template(
        "properties/pages/list.html",
        records=Properties.list()
    )


@router.route('/properties/create', methods=['GET', 'POST'])
def properties_create():
    """ create a new property """
    if request.method == 'GET':
        return render_template(
            "properties/pages/create.html",
            view='create'
        )
    elif request.method == 'POST':
        return Properties.create(request.form)


@router.route('/properties/<string:id>')
def properties_read(id):
    """ get a single property """
    return render_template(
        "pages/properties.html",
        view='read',
        record=Properties.read(id)
    )


@router.route('/properties/<string:id>/update', methods=['GET', 'POST'])
def properties_update(id):
    """ edit a property """
    if request.method == 'GET':
        return render_template(
            "pages/properties.html",
            view='update',
            record=Properties.read(id)
        )
    elif request.method == 'POST':
        return Properties.update(id, request.form)


@router.route('/properties/<string:id>/delete', methods=['GET', 'POST'])
def properties_delete(id):
    """ delete a property """
    if request.method == 'GET':
        return render_template(
            "pages/properties.html",
            view='delete',
            record=Properties.read(id)
        )
    elif request.method == 'POST':
        id = request.form['id']
        return Properties.delete(id)
