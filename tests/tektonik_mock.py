from mock import MagicMock
from tekt import tektonik


class TektonikMock():

    def mock(self):

        tektonik.list_properties = MagicMock(side_effect=self.properties)
        tektonik.create_property = MagicMock(side_effect=self.create_property)
        tektonik.read_property = MagicMock(side_effect=self.read_property)
        tektonik.update_property = MagicMock(side_effect=self.update_property)
        tektonik.delete_property = MagicMock(side_effect=self.delete_property)

    properties = """{
        "result": [
            {
                "id": 3,
                "property": "music.kevinlint.com"
            },
            {
                "id": 4,
                "property": "art.kevinlint.com"
            },
            {
                "id": 5,
                "property": "kevinlint.com"
            }
        ]
    }"""

    create_property = """{
        "result": {
            "message": "Property successfully added",
            "record": {
                "id": 13,
                "property": "kevinlint4.com"
            }
        }
    }"""

    read_property = """{
        "result": {
            "id": 3,
            "property": "music.kevinlint.com"
        }
    }"""

    update_property = """{
        "result": {
            "id": 3,
            "property": "updated"
        }
    }"""

    delete_property = """{
        "result": {
            "id": 3,
            "property": "kevinlint.com"
        }
    }"""

tektonik_mock = TektonikMock()
