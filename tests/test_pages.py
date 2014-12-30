#! ../env/bin/python
# -*- coding: utf-8 -*-
from tekt import create_app
from tekt import tektonik
from tektonik_mock import tektonik_mock


class TestController:

    def setup(self):

        # get app test config
        app = create_app('tekt.settings.TestConfig', env='dev')

        # register tektonik
        tektonik.init_app(app)

        # patch tektonik calls
        tektonik_mock.init(tektonik)

        # test client
        self.app = app.test_client()

        # url prefix
        self.prefix = '/pages/'

    def teardown(self):

        # destroy session and tables
        print "TESTING COMPLETE"

    def test_pages(self):

        response = self.app.get(self.prefix)
        assert response.status_code == 200

    def test_create_page(self):

        endpoint = self.prefix + 'create'
        response = self.app.get(endpoint)
        assert response.status_code == 200
        data = {"page": "test.page"}
        response = self.app.post(endpoint, data=data, follow_redirects=True)
        assert response.status_code == 200

    def test_read_page(self):

        endpoint = self.prefix + '1'
        response = self.app.get(endpoint)
        assert response.status_code == 200

    def test_update_page(self):

        endpoint = self.prefix + '1/update'
        response = self.app.get(endpoint)
        assert response.status_code == 200
        data = {"id": 1, "page": "updated"}
        response = self.app.post(endpoint, data=data, follow_redirects=True)
        assert response.status_code == 200

    def test_delete_page(self):

        endpoint = self.prefix + '1/delete'
        response = self.app.get(endpoint)
        assert response.status_code == 302
