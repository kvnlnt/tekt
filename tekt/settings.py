class Config(object):
    DEBUG = False
    SECRET_KEY = 'secret key'


class ProdConfig(Config):
    CACHE_TYPE = 'simple'


class TestConfig(Config):
    DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    CACHE_TYPE = 'null'


class DevConfig(Config):
    DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    CACHE_TYPE = 'null'
