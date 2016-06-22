# -*- coding: UTF-8 -*-

import os

class Config(object):
    DEBUG = True
    SECRET_KEY = 'lab'
    PERMANET_SESSION_LIFETIME = 3600 * 24 *7
    USING_SSL = False

    PROJECT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///%s/db/lab.db' % PROJECT_PATH
    
    #upload
    UPLOADS_DEFAULT_DEST = PROJECT_PATH + 'uploads/'
    UPLOADS_DEFAULT_URL = 'http://localhost'
    UPLOADS_DEFAULT_LOG = PROJECT_PATH + 'uploads/logs/'

    #db
    MCNET_DB = 'sqlite:///%s/db/mcnet.db' % PROJECT_PATH
    MFILE_DB = 'sqlite:///%s/db/morphfile.db' % PROJECT_PATH

