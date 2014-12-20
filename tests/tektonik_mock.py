class TektonikMock():

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
            "id": 5,
            "property": "kevinlint.com"
        }
    }"""

tektonik_mock = TektonikMock()
