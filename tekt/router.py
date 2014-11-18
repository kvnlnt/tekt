"""
:synopsis: Main blueprint router and controller
"""

from resource import Properties
from resource import Registry
from flask import Blueprint
from flask import render_template
from flask import request

router = Blueprint('router', __name__, template_folder='templates')


# Ajax Proxy
@router.route('/load/<string:resource>(<string:args>)')
def load_with_args(resource, args):
    """ loads resources """
    resource = Registry[resource](args)
    return render_template(resource['template'], **resource['data'])


@router.route('/load/<string:resource>')
def load(resource):
    """ loads resources """
    resource = Registry[resource]()
    return render_template(resource['template'], **resource['data'])


@router.route('/exec/<string:resource>(<string:args>)')
def execute_with_args(resource, args):
    """ loads resources """
    resource = Registry[resource](args)
    return resource


@router.route('/exec/<string:resource>')
def execute(resource):
    """ loads resources """
    resource = Registry[resource]()
    return resource


@router.route('/')
def dashboard():
    """ home page """
    return render_template("pages/dashboard.html")


@router.route('/properties')
def properties():
    """ get list of properties """
    return render_template("properties/pages/list.html")


@router.route('/properties/create', methods=['GET', 'POST'])
def properties_create():
    """ create a new property """
    return render_template("properties/pages/create.html")


@router.route('/properties/<string:id>')
def properties_read(id):
    """ get a single property """
    return render_template("properties/pages/read.html", id=id)


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
