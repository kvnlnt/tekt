from flask.ext.wtf import Form
from wtforms.fields import StringField
from wtforms.fields import SelectField
from wtforms.fields import HiddenField
from wtforms.validators import Required


class PropertyForm(Form):
    form = HiddenField('form', default='PropertyForm')
    property = StringField('property', validators=[Required()])


class PropertyPathForm(Form):
    form = HiddenField('form', default='PropertyPathForm')
    path = StringField('path', validators=[Required()])
    property = HiddenField(u'Property')


class PathForm(Form):
    form = HiddenField('form', default='PathForm')
    path = StringField('path', validators=[Required()])
    property = SelectField(u'Property', coerce=int)


class PathPageForm(Form):
    form = HiddenField('form', default='PathPageForm')
    path = HiddenField('path', validators=[Required()])
    page = SelectField(u'Page', coerce=int)


class PageForm(Form):
    form = HiddenField('form', default='PageForm')
    page = StringField('page', validators=[Required()])
