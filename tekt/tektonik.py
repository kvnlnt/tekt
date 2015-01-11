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

    def list_paths(self):

        endpoint = self.url + "paths"
        req = requests.get(endpoint, headers=self.headers)
        resp = json.loads(req.text)
        return resp

    def create_path(self, record):

        endpoint = self.url + "paths"
        data = json.dumps(record)
        req = requests.post(endpoint, headers=self.headers, data=data)
        resp = json.loads(req.text)
        return resp

    def create_path_page(self, record):

        endpoint = self.url + "path_pages"
        data = json.dumps(record)
        req = requests.post(endpoint, headers=self.headers, data=data)
        resp = json.loads(req.text)
        return resp

    def read_path(self, id):

        endpoint = self.url + "paths/" + str(id)
        req = requests.get(endpoint, headers=self.headers)
        resp = json.loads(req.text)
        return resp

    def update_path(self, record, id):

        endpoint = self.url + "paths/" + str(id)
        data = json.dumps(record)
        req = requests.put(endpoint, headers=self.headers, data=data)
        resp = json.loads(req.text)
        return resp

    def delete_path(self, id):

        endpoint = self.url + "paths/" + str(id)
        req = requests.delete(endpoint, headers=self.headers)
        resp = json.loads(req.text)
        return resp

    def delete_path_page(self, id):

        endpoint = self.url + "path_pages/" + str(id)
        req = requests.delete(endpoint, headers=self.headers)
        resp = json.loads(req.text)
        return resp

    def list_pages(self):

        endpoint = self.url + "pages"
        req = requests.get(endpoint, headers=self.headers)
        resp = json.loads(req.text)
        return resp

    def search_pages(self, term):

        endpoint = self.url + "pages/search"
        data = json.dumps(term)
        req = requests.post(endpoint, headers=self.headers, data=data)
        resp = json.loads(req.text)
        return resp

    def create_page(self, record):

        endpoint = self.url + "pages"
        data = json.dumps(record)
        req = requests.post(endpoint, headers=self.headers, data=data)
        resp = json.loads(req.text)
        return resp

    def read_page(self, id):

        endpoint = self.url + "pages/" + str(id)
        req = requests.get(endpoint, headers=self.headers)
        resp = json.loads(req.text)
        return resp

    def update_page(self, record, id):

        endpoint = self.url + "pages/" + str(id)
        data = json.dumps(record)
        req = requests.put(endpoint, headers=self.headers, data=data)
        resp = json.loads(req.text)
        return resp

    def delete_page(self, id):

        endpoint = self.url + "pages/" + str(id)
        req = requests.delete(endpoint, headers=self.headers)
        resp = json.loads(req.text)
        return resp

tektonik = Tektonik()
