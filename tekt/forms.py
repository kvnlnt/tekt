from wtforms import Form, TextField


def validate(form, record):

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


class PropertyForm(Form):

    property = TextField('property')
