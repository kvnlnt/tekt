import requests
import json


url = "http://127.0.0.1:5001/v1_0/"
headers = {'content-type': 'application/json'}


def list_properties():

    endpoint = url + "properties"
    req = requests.get(endpoint, headers=headers)
    resp = json.loads(req.text)
    return resp


def create_property(property):

    endpoint = url + "properties"
    data = json.dumps(property)
    req = requests.post(endpoint, headers=headers, data=data)
    resp = json.loads(req.text)
    return resp


def read_property(id):

    endpoint = url + "properties/" + str(id)
    req = requests.get(endpoint, headers=headers)
    resp = json.loads(req.text)
    return resp


def delete_property(id):

    endpoint = url + "properties/" + str(id)
    req = requests.delete(endpoint, headers=headers)
    resp = json.loads(req.text)
    return resp
