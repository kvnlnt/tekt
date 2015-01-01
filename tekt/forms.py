from wtforms import Form
from wtforms import TextField
from wtforms import HiddenField
from wtforms import SelectField
from wtforms import SelectMultipleField
from tekt.tektonik import tektonik


def is_valid(form, record):

    """ Check if record has any errors, if so add to wtform object """

    has_errors = 'errors' in record

    if has_errors:
        for field in record['errors']:
            field_errors = list()
            for error in record['errors'][field]:
                field_errors.append(error)
            form[field].errors = tuple(field_errors)

    # toggle flag
    return not has_errors


descriptions = {
    'property': 'Example: www.mywebsite.com',
    'path': 'Example: /some/page',
    'page': 'Example: aboutus',
    'page_selector': 'Select a page'
}


class PropertyForm(Form):

    id = HiddenField('id')
    property = TextField('Property', description=descriptions['property'])


class PathForm(Form):

    id = HiddenField(u'id')
    path = TextField(u'Path', description=descriptions['path'])
    property_id = SelectField(
        u'Property',
        description=descriptions['property'],
        default=(0))
    pages = SelectMultipleField(
        u'Pages',
        default=(0))


class PathPageForm(Form):

    id = HiddenField(u'id')
    path_id = HiddenField(u'path_id')
    page_id = TextField(
        'Page',
        description=descriptions['page_selector'])


def PathFormFactory(request, data=None):

    form = PathForm(request.form, data=data)
    properties = tektonik.list_properties()['result']
    properties_choices = [(p['id'], p['property']) for p in properties]
    properties_choices.insert(0, (0, ''))
    form.property_id.choices = properties_choices
    return form


class PageForm(Form):

    id = HiddenField(u'id')
    page = TextField(u'Page', description=descriptions['page'])
