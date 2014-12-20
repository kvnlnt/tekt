#! ../env/bin/python
# -*- coding: utf-8 -*-
from tekt import create_app
import requests
from mock import MagicMock
from tektonik_mock import tektonik_mock


class TestController:

    def setup(self):

        # get app test config
        app = create_app('tekt.settings.TestConfig', env='dev')

        # create test app
        self.app = app.test_client()

    def teardown(self):

        # destroy session and tables
        print "TESTING COMPLETE"

    def mock_request(self, stub='', method='GET'):

        def get_mock(*args, **kwargs):
            if method is 'GET':
                response = requests.get.return_value
            if method is 'POST':
                response = requests.post.return_value
            if method is 'PUT':
                response = requests.put.return_value
            if method is 'DELETE':
                response = requests.delete.return_value
            response.text = stub
            return response

        if method is 'GET':
            requests.get = MagicMock(side_effect=get_mock)
        if method is 'POST':
            requests.post = MagicMock(side_effect=get_mock)
        if method is 'PUT':
            requests.put = MagicMock(side_effect=get_mock)
        if method is 'DELETE':
            requests.delete = MagicMock(side_effect=get_mock)

    def test_dashboard(self):
        endpoint = '/'
        response = self.app.get(endpoint)
        assert response.status_code == 200

    def test_properties(self):

        self.mock_request(stub=tektonik_mock.properties)
        endpoint = '/properties'
        response = self.app.get(endpoint)
        assert response.status_code == 200

    def test_create_property(self):
        endpoint = '/properties/create'
        response = self.app.get(endpoint)
        assert response.status_code == 200
        self.mock_request(stub=tektonik_mock.create_property, method='POST')
        data = {"property": 'test.property'}
        response = self.app.post(endpoint, data=data, follow_redirects=True)
        assert response.status_code == 200

    def test_read_property(self):
        self.mock_request(stub=tektonik_mock.read_property)
        endpoint = '/properties/1'
        response = self.app.get(endpoint)
        assert response.status_code == 200

    def test_update_property(self):
        endpoint = '/properties/create'
        response = self.app.get(endpoint)
        assert response.status_code == 200
        self.mock_request(stub=tektonik_mock.update_property, method='PUT')
        data = {"id": 1, "property": "updated"}
        response = self.app.post(endpoint, data=data, follow_redirects=True)
        assert response.status_code == 200

    def test_delete_property(self):
        self.mock_request(stub=tektonik_mock.delete_property, method='DELETE')
        endpoint = '/properties/1/delete'
        response = self.app.get(endpoint)
        assert response.status_code == 302
