from flask import flash


class Messaging:

    def flash(self, obj, **kwargs):
        message = '<span>' + obj.get('message', '') \
            .format(**kwargs) + '</span>'
        buttons = '<span>' + obj.get('buttons', '') \
            .format(**kwargs) + '</span>'
        flash(message + buttons, obj.get('type', ''))
        return message

    def new(self, _type='', message='', buttons=''):
        return {
            'type': _type,
            'message': message,
            'buttons': buttons
        }


class Properties(Messaging):

    def __init__(self):

        self.create_property_success = self.new(
            _type='praise',
            message="Success. Property created.")

        self.create_property_error = self.new(
            _type='alarm',
            message="Error. Property not created.")

        self.update_property_success = self.new(
            _type='praise',
            message="Success. Property was updated.")

        self.update_property_error = self.new(
            _type='alarm',
            message="Error. Property was not updated.")

        self.delete_property_success = self.new(
            _type='praise',
            message="The property <strong>{phrase}</strong> was deleted")

        self.delete_property_error = self.new(
            _type='alarm',
            message="Error. Property was not deleted.")

properties = Properties()


class Paths(Messaging):

    def __init__(self):

        self.create_path_success = self.new(
            _type='praise',
            message="Success. Path created.")

        self.create_path_error = self.new(
            _type='alarm',
            message="Error. Path not created.")

        self.page_schedule_success = self.new(
            _type='praise',
            message="Success. Page added.")

        self.page_schedule_error = self.new(
            _type='alarm',
            message="Error. Page was not added",
            buttons='<button tekt-scroller="target=add_page" '
                    'class="alarm link inverse">errors</button>')

        self.remove_page_success = self.new(
            _type='praise',
            message='Success. Page was removed.')

        self.update_path_success = self.new(
            _type='praise',
            message="Success. Path was updated.")

        self.update_path_error = self.new(
            _type='alarm',
            message="Error. Path was not updated.")

        self.delete_path_success = self.new(
            _type='praise',
            message="The path <strong>{phrase}</strong> was deleted")

        self.delete_path_error = self.new(
            _type='alarm',
            message="Error. Path was not deleted.")

paths = Paths()


class Pages(Messaging):

    def __init__(self):

        self.create_page_success = self.new(
            _type='praise',
            message="Success. Page created.")

        self.create_page_error = self.new(
            _type='alarm',
            message="Error. Page not created.")

        self.remove_path_success = self.new(
            _type='praise',
            message='Success. Path was removed.')

        self.update_page_success = self.new(
            _type='praise',
            message="Success. Page was updated.")

        self.update_page_error = self.new(
            _type='alarm',
            message="Error. Page was not updated.")

        self.delete_page_success = self.new(
            _type='praise',
            message="The page <strong>{phrase}</strong> was deleted")

        self.delete_page_error = self.new(
            _type='alarm',
            message="Error. Page was not deleted.")

pages = Pages()
