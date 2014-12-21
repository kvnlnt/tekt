import json
import requests


class Tektonik:

    def init_app(self, app):

        self.url = app.config['TEKTONIK']
        self.headers = {'content-type': 'application/json'}

    def list_properties(self):

        endpoint = self.url + "properties"
        req = requests.get(endpoint, headers=self.headers)
        resp = json.loads(req.text)
        return resp

    def create_property(self, record):

        endpoint = self.url + "properties"
        data = json.dumps(record)
        req = requests.post(endpoint, headers=self.headers, data=data)
        resp = json.loads(req.text)
        return resp

    def read_property(self, id):

        endpoint = self.url + "properties/" + str(id)
        req = requests.get(endpoint, headers=self.headers)
        resp = json.loads(req.text)
        return resp

    def update_property(self, record, id):

        endpoint = self.url + "properties/" + str(id)
        data = json.dumps(record)
        req = requests.put(endpoint, headers=self.headers, data=data)
        resp = json.loads(req.text)
        return resp

    def delete_property(self, id):

        endpoint = self.url + "properties/" + str(id)
        req = requests.delete(endpoint, headers=self.headers)
        resp = json.loads(req.text)
        return resp

tektonik = Tektonik()
