from flask import current_app
import requests
import json


def properties_list():
    endpoint = current_app.config['TEKTONIK'] + '/properties'
    result = requests.get(endpoint).content
    payload = json.loads(result)
    return payload


def properties_read(id):
    endpoint = current_app.config['TEKTONIK'] + '/properties/' + id
    result = requests.get(endpoint).content
    payload = json.loads(result)
    return payload
