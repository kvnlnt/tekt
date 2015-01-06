class TektonikMock():

    def init(self, tektonik):

        # properties
        tektonik.list_properties = self.list_properties
        tektonik.create_property = self.create_property
        tektonik.read_property = self.read_property
        tektonik.update_property = self.update_property
        tektonik.delete_property = self.delete_property

        # paths
        tektonik.list_paths = self.list_paths
        tektonik.create_path = self.create_path
        tektonik.read_path = self.read_path
        tektonik.update_path = self.update_path
        tektonik.delete_path = self.delete_path

        # pages
        tektonik.list_pages = self.list_pages
        tektonik.create_page = self.create_page
        tektonik.read_page = self.read_page
        tektonik.update_page = self.update_page
        tektonik.delete_page = self.delete_page

    def list_properties(self):
        result = {
            "result": [
                {
                    "id": 1,
                    "property": "1.test.com"
                },
                {
                    "id": 2,
                    "property": "2.test.com"
                },
                {
                    "id": 3,
                    "property": "3.test.com"
                }
            ]
        }
        return result

    def create_property(self, record):
        result = {
            "result": {
                "message": "Property successfully added",
                "record": {
                    "id": 1,
                    "property": "1.test.com"
                }
            }
        }
        return result

    def read_property(self, id):
        result = {
            "result": {
                "id": 1,
                "property": "1.test.com"
            }
        }
        return result

    def update_property(self, record, id):
        result = {
            "result": {
                "id": 1,
                "property": "1.test-updated.com"
            }
        }
        return result

    def delete_property(self, id):
        result = {
            "result": {
                "id": 1,
                "property": "1.test.com"
            }
        }
        return result

    def list_paths(self):
        result = {
            "result": [
                {
                    "id": 1,
                    "path": "/one",
                    "property_id": 1,
                    "property": {
                        "id": 1,
                        "property": "test1.com"
                    }
                },
                {
                    "id": 2,
                    "path": "/two",
                    "property_id": 2,
                    "property": {
                        "id": 2,
                        "property": "test2.com"
                    }
                },
                {
                    "id": 3,
                    "path": "/three",
                    "property_id": 3,
                    "property": {
                        "id": 3,
                        "property": "test3.com"
                    }
                },
            ]
        }
        return result

    def create_path(self, record):
        result = {
            "result": {
                "message": "Property successfully added",
                "record": {
                    "id": 1,
                    "path": "/four",
                    "property_id": 1
                }
            }
        }
        return result

    def read_path(self, id):
        result = {
            "result": {
                "id": 1,
                "path": "1.test.com",
                "property_id": 1,
                "property": {
                    "id": 1,
                    "property": "test1.com"
                }
            }
        }
        return result

    def update_path(self, record, id):
        result = {
            "result": {
                "id": 1,
                "path": "1.test-upda",
                "property_id": 1,
                "property": {
                    "id": 1,
                    "property": "test1.com"
                }
            }
        }
        return result

    def delete_path(self, id):
        result = {
            "result": {
                "id": 1,
                "path": "/one"
            }
        }
        return result

    def list_pages(self):
        result = {
            "result": [
                {
                    "id": 1,
                    "page": "page one",
                    "paths": [
                        {
                            "id": 1,
                            "path": "/one"
                        },
                        {
                            "id": 2,
                            "path": "/two"
                        }
                    ]
                },
                {
                    "id": 2,
                    "page": "page one",
                    "paths": [
                        {
                            "id": 1,
                            "path": "/one"
                        },
                        {
                            "id": 2,
                            "path": "/two"
                        }
                    ]
                },
                {
                    "id": 3,
                    "page": "page one",
                    "paths": [
                        {
                            "id": 1,
                            "path": "/one"
                        },
                        {
                            "id": 2,
                            "path": "/two"
                        }
                    ]
                },
            ]
        }
        return result

    def create_page(self, record):
        result = {
            "result": {
                "message": "Page successfully added",
                "record": {
                    "id": 1,
                    "page": "newpage",
                    "paths": []
                }
            }
        }
        return result

    def read_page(self, id):
        result = {
            "result": {
                "id": 1,
                "page": "newpage",
                "paths": [
                    {
                        "id": 1,
                        "path": "/one"
                    },
                    {
                        "id": 2,
                        "path": "/two"
                    }
                ]
            }
        }
        return result

    def update_page(self, record, id):
        result = {
            "result": {
                "id": 1,
                "page": "updated",
                "paths": [
                    {
                        "id": 1,
                        "path": "/one"
                    },
                    {
                        "id": 2,
                        "path": "/two"
                    }
                ]
            }
        }
        return result

    def delete_page(self, id):
        result = {
            "result": {
                "id": 1,
                "page": "newpage",
                "paths": []
            }
        }
        return result


tektonik_mock = TektonikMock()
