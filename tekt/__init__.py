#! ../env/bin/python
import os

from flask import Flask
from tekt.controllers.main import blueprint as main_blueprint
from tekt.controllers.properties import blueprint as properties_blueprint
from tekt.controllers.paths import blueprint as paths_blueprint
from tekt.controllers.pages import blueprint as pages_blueprint
from tekt.tektonik import tektonik


def create_app(object_name, env="prod"):
    """
    An flask application factory, as explained here:
    http://flask.pocoo.org/docs/patterns/appfactories/

    Arguments:
        object_name: the python path of the config object,
                     e.g. ark.settings.ProdConfig

        env: The name of the current environment, e.g. prod or dev
    """

    app = Flask(__name__)

    app.config.from_object(object_name)
    app.config['ENV'] = env

    # register tektonik
    tektonik.init_app(app)

    # register our blueprints
    app.register_blueprint(main_blueprint, url_prefix='/')
    app.register_blueprint(properties_blueprint, url_prefix='/properties')
    app.register_blueprint(paths_blueprint, url_prefix='/paths')
    app.register_blueprint(pages_blueprint, url_prefix='/pages')

    return app

if __name__ == '__main__':
    # Import the config for the proper environment using the
    # shell var APPNAME_ENV
    env = os.environ.get('APPNAME_ENV', 'prod')
    app = create_app('tekt.settings.%sConfig' % env.capitalize(), env=env)

    app.run()
