import requests
import json

from flask import current_app


class Properties:

    @staticmethod
    def list():
        endpoint = current_app.config['TEKTONIK'] + '/properties'
        response = requests.get(endpoint).content
        payload = json.loads(response)
        return {
            'template': 'properties/parts/list.html',
            'data': {'records': payload}
        }

    @staticmethod
    def create(form):
        endpoint = current_app.config['TEKTONIK'] + '/properties'
        data = {'property': form['property']}
        response = requests.post(endpoint, data=data).content
        return response

    @staticmethod
    def read(id):
        endpoint = current_app.config['TEKTONIK'] + '/properties/' + id
        response = requests.get(endpoint).content
        payload = json.loads(response)
        return payload

    @staticmethod
    def update(id, form):
        endpoint = current_app.config['TEKTONIK'] + '/properties/' + id
        data = {'id': id, 'property': form['property']}
        response = requests.put(endpoint, data=data).content
        return response

    @staticmethod
    def delete(id):
        endpoint = current_app.config['TEKTONIK'] + '/properties/' + id
        response = requests.delete(endpoint).content
        return response
