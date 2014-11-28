from wtforms.validators import ValidationError


class Unique(object):

    """ validator that checks field uniqueness """

    def __init__(self, model, fields, message=None):
        self.model = model
        self.fields = fields
        if not message:
            message = fields[0].capitalize() + u' already exists'
        self.message = message

    def __call__(self, form, field):

        fields = set(self.fields).intersection(form.data.keys())
        kwargs = {}
        for field in fields:
            kwargs[field] = form[field].data
        check = self.model.query.filter_by(**kwargs).first()
        if check:
            raise ValidationError(self.message)
