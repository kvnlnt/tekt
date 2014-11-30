"""
:synopsis: Main blueprint router and controller
"""
from flask import Blueprint
from flask import render_template
from flask import redirect
from flask import url_for
from tekt.models import db
from tekt.queries import PropertyQuery
from tekt.forms import PathForm
from tekt.forms import PathFormForProperty
from tekt.forms import PageForm
from tekt.forms import PathPageForm
from tekt.models import PropertyModel
from tekt.models import PathModel
from tekt.models import PathPageModel
from tekt.models import PageModel

controller = Blueprint('controller', __name__, template_folder='templates')


@controller.route('/')
@controller.route('/dashboard')
def dashboard():
    """ dashboard page """
    return render_template("dashboard.html")


@controller.route('/properties', methods=['GET', 'POST'])
def list_properties():
    """ properties list """

    properties = db.engine.execute(PropertyQuery.list())
    return render_template("properties.html", properties=properties)


@controller.route('/properties/<int:id>', methods=['GET', 'POST'])
def read_update_property(id):
    """ Show a property """

    form = PathFormForProperty()
    if form.validate_on_submit():
        record = PathModel(
            path=form.path.data,
            property_id=form.property_id.data)
        db.session.add(record)
        db.session.commit()

    property = PropertyModel.query.get(id)
    form.property_id.data = property.id

    return render_template("property.html",
                           property=property,
                           form=form)


@controller.route('/properties/<int:id>/delete', methods=['GET'])
def delete_property(id):
    """ Delete a property """

    db.engine.executemany(PropertyQuery.delete(), id=id)
    return redirect(url_for('.list_properties'))


@controller.route('/paths', methods=['GET', 'POST'])
def list_paths():
    """ properties list """

    form = PathForm()
    form.property_id.choices = [(p.id, p.property)
                                for p in PropertyModel.query.all()]
    if form.validate_on_submit():
        record = PathModel(
            path=form.path.data, property_id=form.property_id.data)
        db.session.add(record)
        db.session.commit()

    paths = PathModel.query.all()
    return render_template("paths.html", form=form, paths=paths)


@controller.route('/paths/<int:id>', methods=['GET', 'POST'])
def read_path(id):
    """ Show a path """

    path = PathModel.query.get(id)
    path_pages = PathPageModel.query.filter_by(path_id=path.id)
    form = PathPageForm()
    form.path.data = path.id
    form.page.choices = [(p.id, p.page)
                         for p in PageModel.query.all()]

    if form.validate_on_submit():
        record = PathPageModel(path_id=form.path.data,
                               page_id=form.page.data)
        db.session.add(record)
        db.session.commit()

    return render_template(
        "path.html",
        path=path,
        form=form,
        path_pages=path_pages
    )


@controller.route('/paths/<int:id>/delete', methods=['GET'])
def delete_path(id):
    """ Delete a path """

    path = PathModel.query.get(id)
    db.session.delete(path)
    db.session.commit()
    return redirect(url_for('.list_paths'))


@controller.route('/pages', methods=['GET', 'POST'])
def list_pages():
    """ properties list """

    form = PageForm()
    if form.validate_on_submit():
        record = PageModel(page=form.page.data)
        db.session.add(record)
        db.session.commit()

    pages = PageModel.query.all()
    return render_template("pages.html", form=form, pages=pages)


@controller.route('/pages/<int:id>', methods=['GET'])
def read_page(id):
    """ Show a page """

    page = PageModel.query.get(id)
    return render_template("page.html", page=page)


@controller.route('/pages/<int:id>/delete', methods=['GET'])
def delete_page(id):
    """ Delete a page """

    page = PageModel.query.get(id)
    db.session.delete(page)
    db.session.commit()
    return redirect(url_for('.list_pages'))
