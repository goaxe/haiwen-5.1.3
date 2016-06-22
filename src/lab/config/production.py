# -*- coding: UTF-8 -*-
from .default import Config

class ProductionConfig(Config):
     DEBUG = True

     SQLALCHEMY_DATABASE_URI = "mysql://root:hpcgrid3102@localhost/lab"

     SEAFILE_API_URL = 'http://10.0.2.4:8000/repo/history/'
     HOST_URI = '10.0.2.4'
     SITE_DOMIAN = 'http://10.0.2.4:7000/'

     CCNET_CONF_DIR = '/home/axe/haiwen/conf'
     SEAFILE_CONF_DIR = '/home/axe/haiwen/seafile-data'
     DEFAULT_DIR = '/home/axe/haiwen/seafile-data'
     SEASERVER_PY_PACKAGE = '/home/axe/haiwen/seafile-server-5.1.2/seafile/lib64/python2.6/site-packages'
     SEAFILE_DB = 'mysql://root:hpcgrid3102@localhost/seafile-db'

#     SEAHUB_DB = 'mysql://root:root@localhost/morphweb-db'
#     SEAFILE_API_URL = 'https://192.168.1.101/repo/history/'
#     HOST_URI = '192.168.1.101'
#     SITE_DOMAIN = "http://192.168.0.101:5000/"



