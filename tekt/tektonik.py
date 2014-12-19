import requests
import json


url = "http://127.0.0.1:5001/v1_0/"


def list_properties():

    endpoint = url + "properties"
    headers = {'content-type': 'application/json'}
    req = requests.get(endpoint, headers=headers)
    resp = json.loads(req.text)
    return resp


def create_property(property):

    endpoint = url + "properties"
    headers = {'content-type': 'application/json'}
    data = json.dumps(property)
    req = requests.post(endpoint, headers=headers, data=data)
    resp = json.loads(req.text)
    return resp
