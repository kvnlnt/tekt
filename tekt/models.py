from flask.ext.sqlalchemy import SQLAlchemy

# create instance of sqlalchemy
db = SQLAlchemy()


class PropertyModel(db.Model):

    """ Property model. """

    __tablename__ = 'properties'
    id = db.Column(db.Integer, primary_key=True)
    property = db.Column(db.String(100), unique=True)
    paths = db.relationship('PathModel', backref='property', cascade='delete')


class PathPageModel(db.Model):

    """ Path to Page model. """

    __tablename__ = 'path_pages'
    id = db.Column(db.Integer, primary_key=True)
    path_id = db.Column(db.Integer, db.ForeignKey('paths.id'))
    page_id = db.Column(db.Integer, db.ForeignKey('pages.id'))
    effective_date = db.Column(db.DateTime)
    expiration_date = db.Column(db.DateTime)
    page = db.relationship("PageModel", backref="path_page")


class PathModel(db.Model):

    """ Path model """

    __tablename__ = 'paths'
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(100))
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'))
    pages = db.relationship("PathPageModel", backref="path", cascade='delete')


class PageModel(db.Model):

    """ Page model """

    __tablename__ = 'pages'
    id = db.Column(db.Integer, primary_key=True)
    page = db.Column(db.String(100))
