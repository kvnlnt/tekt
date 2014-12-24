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

    def teardown(self):

        # destroy session and tables
        print "TESTING COMPLETE"

    def test_paths(self):

        endpoint = '/paths'
        response = self.app.get(endpoint)
        assert response.status_code == 200

    # def test_create_path(self):

    #     endpoint = '/paths/create'
    #     response = self.app.get(endpoint)
    #     assert response.status_code == 200
    #     data = {"path": 'test.path'}
    #     response = self.app.post(endpoint, data=data, follow_redirects=True)
    #     assert response.status_code == 200

    # def test_read_path(self):

    #     endpoint = '/paths/1'
    #     response = self.app.get(endpoint)
    #     assert response.status_code == 200

    # def test_update_path(self):

    #     endpoint = '/paths/1/update'
    #     response = self.app.get(endpoint)
    #     assert response.status_code == 200
    #     data = {"id": 3, "path": "updated"}
    #     response = self.app.post(endpoint, data=data, follow_redirects=True)
    #     assert response.status_code == 200

    # def test_delete_path(self):

    #     endpoint = '/paths/1/delete'
    #     response = self.app.get(endpoint)
    #     assert response.status_code == 302
