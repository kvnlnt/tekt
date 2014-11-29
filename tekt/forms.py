from flask.ext.wtf import Form
from wtforms.fields import StringField
from wtforms.fields import SelectField
from wtforms.fields import HiddenField
from wtforms.validators import Required
from tekt.validators import Unique
from tekt.models import PropertyModel
from tekt.models import PathModel


class PropertyForm(Form):
    form = HiddenField('form', default='PropertyForm')
    property = StringField(
        'property',
        validators=[
            Required(message='Property is required'),
            Unique(PropertyModel, ['property'])
        ])


class PathForm(Form):

    form = HiddenField('form', default='PathForm')
    path = StringField(
        'path',
        validators=[
            Required(),
            Unique(PathModel, ['path', 'property_id'])
        ])
    property_id = SelectField(u'Property', coerce=int)


class PathFormForProperty(Form):

    form = HiddenField('form', default='PathForm')
    path = StringField(
        'path',
        validators=[
            Required(),
            Unique(PathModel, ['path', 'property_id'])
        ])
    property_id = HiddenField(u'Property')


class PathPageForm(Form):
    form = HiddenField('form', default='PathPageForm')
    path = HiddenField('path', validators=[Required()])
    page = SelectField(u'Page', coerce=int)


class PageForm(Form):
    form = HiddenField('form', default='PageForm')
    page = StringField('page', validators=[Required()])
