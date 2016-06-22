# -*- coding: UTF-8 -*-
from .default import Config

class DevelopmentConfig(Config):

    DEBUG = True
    # SQLALCHEMY_DATABASE_URI = "mysql://root:@localhost/lab"

     # db
    MCNET_DB = 'sqlite:///%s/db/mcnet.db' % Config.PROJECT_PATH
    MFILE_DB = 'sqlite:///%s/db/morphfile.db' % Config.PROJECT_PATH

    # other config
    DEFAULT_CCNET_CONF_DIR = '/usr/haiwen/ccnet'
    SEAFILE_CONF_DIR = '/usr/haiwen/seafile-data'
    DEFAULT_DIR = '/usr/haiwen/seafile-data'
    SEASERVER_PY_PACKAGE = '/usr/haiwen/seafile-server-3.1.7/seafile/lib64/python2.6/site-packages'

    SEAHUB_DB = 'sqlite:///G:/py/lab/db/seahub.db'
    SEAFILE_DB = 'sqlite:///G:/py/lab/db/seafile.db'