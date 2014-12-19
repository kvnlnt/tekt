from wtforms import Form, TextField


def error_check(form, record):

    """ Check if record has any errors, if so add to form """

    if 'errors' in record:
        # loop fields
        for field in record['errors']:
            # collect errors
            field_errors = list()
            # loop errors
            for error in record['errors'][field]:
                # add to error collection
                field_errors.append(error)

        # attach field errors
        form[field].errors = tuple(field_errors)


class PropertyForm(Form):

    property = TextField('property')
