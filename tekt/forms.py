from wtforms import Form
from wtforms import TextField
from wtforms import HiddenField
from wtforms import SelectField
from wtforms import SelectMultipleField
from wtforms import BooleanField
from wtforms_components import DateTimeField
from tekt.tektonik import tektonik


def is_valid(form, record, reassign={}):

    """
        Check if record has any errors, if so add to wtform object
        reassign - dict of fields who's errors should be reassigned
        to another field
    """

    has_errors = 'errors' in record

    if has_errors:
        for field in record['errors']:
            field_errors = list()
            for error in record['errors'][field]:
                field_errors.append(error)
            form[field].errors = tuple(field_errors)
            if field in reassign:
                reassign_field = reassign[field]
                form[reassign_field].errors = tuple(field_errors)

    # toggle flag
    return not has_errors


descriptions = {
    'effective_date_selector': 'the date & time the path will start ' +
                               'showing this page',
    'expiration_date_selector': 'the date & time the path will stop ' +
                                'showing this page',
    'property': 'this is the web address of your website',
    'property_delete': 'Enter property name and press confirm to delete',
    'path': 'this is a path on your website',
    'path_page': 'If selected, all other pages for this path will be disabled',
    'path_delete': 'Enter path name and press confirm to delete',
    'page': 'this is an internal reference name of your page',
    'page_delete': 'Enter page name and press confirm to delete',
    'page_selector': 'Click to search',
    'page_search': 'Enter page name'
}


class SignInForm(Form):
    username = TextField('Username')
    password = TextField('Password')


class PropertyForm(Form):

    id = HiddenField('id')
    property = TextField('Property', description=descriptions['property'])


class DeletePropertyForm(Form):

    phrase = HiddenField(u'phrase')
    confirm = TextField(
        u'confirm',
        description=descriptions['property_delete'])


class PathForm(Form):

    id = HiddenField(u'id')
    path = TextField(u'Path', description=descriptions['path'])
    property_id = SelectField(
        u'Property',
        description=descriptions['property'],
        default=(0),
        choices=[])
    pages = SelectMultipleField(
        u'Pages',
        default=(0))


class DeletePathForm(Form):

    phrase = HiddenField(u'phrase')
    confirm = TextField(
        u'confirm',
        description=descriptions['path_delete'])


def path_form_factory(request, data=None):

    form = PathForm(request.form, data=data)
    properties = tektonik.list_properties()['result']
    property_choices = [(p['id'], p['property']) for p in properties]
    # property_choices.insert(0, (0, ''))
    form.property_id.choices = property_choices
    return form


class PathPageForm(Form):

    id = HiddenField(u'id')
    path_id = HiddenField(u'path_id')
    page_id = HiddenField(u'page_id')
    is_persistent = BooleanField(
        u'Show Forever',
        description=descriptions['path_page'])
    page_selector = TextField(
        u'Page',
        description=descriptions['page_selector'])
    effective_date = DateTimeField(
        u'Effective Date & Time',
        description=descriptions['effective_date_selector'])
    expiration_date = DateTimeField(
        u'Expiration Date & Time',
        description=descriptions['expiration_date_selector'])


class PageForm(Form):

    id = HiddenField(u'id')
    page = TextField(u'Page', description=descriptions['page'])


class DeletePageForm(Form):

    phrase = HiddenField(u'phrase')
    confirm = TextField(
        u'confirm',
        description=descriptions['page_delete'])


class PageSearchForm(Form):
    term = TextField(u'Page', description=descriptions['page_search'])
