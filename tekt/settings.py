class Config(object):
    DEBUG = False
    SECRET_KEY = 'secret key'


class ProdConfig(Config):
    CACHE_TYPE = 'simple'
    TEKTONIK = 'http://TEKTONIK'


class TestConfig(Config):
    DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    CACHE_TYPE = 'null'
    TEKTONIK = 'http://127.0.0.1:5001'


class DevConfig(Config):
    DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    CACHE_TYPE = 'null'
    TEKTONIK = 'http://127.0.0.1:5001'
