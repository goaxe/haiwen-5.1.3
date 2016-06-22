# -*- coding: UTF-8 -*-

import os

def load_config():
    mode = os.environ.get('MODE')
    try:
        if mode == 'PRODUCTION':
            from .production import ProductionConfig
            print 'load PRODUCTION mode'
            return ProductionConfig
        else:
            from .development import DevelopmentConfig
            print 'load DEVELOPMENT mode'
            return DevelopmentConfig
    except ImportError:
        from .default import Config
        return Config
