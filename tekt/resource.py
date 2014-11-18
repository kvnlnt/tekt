import requests
import json

from flask import current_app


class Properties:

    @staticmethod
    def list():
        payload = Properties.list_data()
        template = 'properties/parts/list.html'
        return {'template': template, 'data': {'records': payload}}

    @staticmethod
    def list_data():
        endpoint = current_app.config['TEKTONIK'] + '/properties'
        response = requests.get(endpoint).content
        payload = json.loads(response)
        return payload

    @staticmethod
    def create(form):
        endpoint = current_app.config['TEKTONIK'] + '/properties'
        data = {'property': form['property']}
        response = requests.post(endpoint, data=data).content
        return response

    @staticmethod
    def create_form():
        template = 'properties/parts/form.html'
        return {'template': template, 'data':{}}

    @staticmethod
    def read(id):
        endpoint = current_app.config['TEKTONIK'] + '/properties/' + id
        response = requests.get(endpoint).content
        payload = json.loads(response)
        return {
            'template': 'properties/parts/read.html',
            'data': {'record': payload}
        }

    @staticmethod
    def update(id, form):
        endpoint = current_app.config['TEKTONIK'] + '/properties/' + id
        data = {'id': id, 'property': form['property']}
        response = requests.put(endpoint, data=data).content
        return response

    @staticmethod
    def delete(id):
        endpoint = current_app.config['TEKTONIK'] + '/properties/' + id
        payload = requests.delete(endpoint).content
        return payload

# Register all resources
Registry = {
    'Properties.list': Properties.list,
    'Properties.create_form': Properties.create_form,
    'Properties.read': Properties.read,
    'Properties.delete': Properties.delete
}
