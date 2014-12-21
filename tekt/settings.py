class Config(object):
    DEBUG = False
    SECRET_KEY = 'secret key'
    TESTING = False
    TEKTONIK = "http://127.0.0.1:5001/"


class ProdConfig(Config):
    CACHE_TYPE = 'simple'


class TestConfig(Config):
    DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    CACHE_TYPE = 'null'
    TESTING = True


class DevConfig(Config):
    DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    CACHE_TYPE = 'null'
