#! ../env/bin/python
# -*- coding: utf-8 -*-
from tekt import create_app


class TestController:

    def setup(self):

        # get app test config
        app = create_app('tekt.settings.TestConfig', env='dev')

        # create test app
        self.app = app.test_client()

    def teardown(self):

        # destroy session and tables
        print "done"

    def test_properties(self):
        endpoint = '/'
        response = self.app.get(endpoint)
        assert response.status_code == 200
