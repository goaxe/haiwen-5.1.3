# -*- coding: UTF-8 -*-
import os

class Config(object):

    DEBUG = True
    SECRET_KEY = "lab_local"
    PERMANENT_SESSION_LIFETIME = 3600 * 24 * 7
    USING_SSL = False

    PROJECT_PATH = (os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) + '\\').replace('\\', '/')

    SITE_DOMAIN = "http://localhost:5000"

    SQLALCHEMY_DATABASE_URI = "sqlite:///%s/db/lab_local.db" % PROJECT_PATH

    HOST_STRING = "root@182.92.160.85"
    HOST_URI = "192.168.1.105"

    UPLOADS_DEFAULT_DEST = PROJECT_PATH + 'uploads'
    UPLOADS_DEFAULT_URL = 'http://localhost'
    UPLOADS_DEST = PROJECT_PATH + 'uploads/logs/'


    SEAFILE_API_URL = 'http://www.surica.cn/repo/history/'

    MOERPH_CLIENT_DATA = '/home/morph-client/我的文件库'
    MORPH_LOG_DIR = 'C:/Users/Administrator/mcnet/logs/'
    REMOTE_HOST_URI = 'http://localhost:7000/'