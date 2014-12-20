import json
import requests


class Tektonik:
    def init_app(self, app):
        self.url = app.config['TEKTONIK']
        self.headers = {'content-type': 'application/json'}

tektonik = Tektonik()


def list_properties():

    endpoint = tektonik.url + "properties"
    req = requests.get(endpoint, headers=tektonik.headers)
    resp = json.loads(req.text)
    return resp


def create_property(record):

    endpoint = tektonik.url + "properties"
    data = json.dumps(record)
    req = requests.post(endpoint, headers=tektonik.headers, data=data)
    resp = json.loads(req.text)
    return resp


def read_property(id):

    endpoint = tektonik.url + "properties/" + str(id)
    req = requests.get(endpoint, headers=tektonik.headers)
    resp = json.loads(req.text)
    return resp


def update_property(record, id):

    endpoint = tektonik.url + "properties/" + str(id)
    data = json.dumps(record)
    req = requests.put(endpoint, headers=tektonik.headers, data=data)
    resp = json.loads(req.text)
    return resp


def delete_property(id):

    endpoint = tektonik.url + "properties/" + str(id)
    req = requests.delete(endpoint, headers=tektonik.headers)
    resp = json.loads(req.text)
    return resp
