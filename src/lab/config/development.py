# -*- coding: UTF-8 -*-

from .default import Config

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql://root@localhost/lab'

    #db
    MCNET_DB = 'sqlite:///%s/db/mcnet.db' % Config.PROJECT_PATH
    MFILE_DB = 'sqlite:///%s/db/morphfile.db' % Config.PROJECT_PATH


