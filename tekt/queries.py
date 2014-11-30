from sqlalchemy.sql import text


class PropertyQuery(object):

    @staticmethod
    def list():
        return text("""
            SELECT  prop.id,
                    prop.property,
                    (SELECT count(id)
                     FROM paths
                     WHERE property_id = prop.id) as paths
            FROM    properties prop, paths path
            GROUP   BY prop.id;
        """)

    @staticmethod
    def delete():
        return text("""
            BEGIN;
            DELETE from properties WHERE id = :id
            DELETE from paths WHERE property_id = :id
            COMMIT;
        """)
