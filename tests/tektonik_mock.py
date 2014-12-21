class TektonikMock():

    def init(self, tektonik):
        tektonik.list_properties = self.list_properties
        tektonik.create_property = self.create_property
        tektonik.read_property = self.read_property
        tektonik.update_property = self.update_property
        tektonik.delete_property = self.delete_property

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


tektonik_mock = TektonikMock()
