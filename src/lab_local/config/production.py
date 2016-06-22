# -*- coding: UTF-8 -*-

from .default import Config

class ProductionConfig(Config):
     HOST_URI = '127.0.0.1' 
     SITE_DOMAIN = "http://127.0.0.1:5000/"

     SEAFILE_API_URL = 'http://10.0.2.4:8000/repo/history/'

#     REMOTE_HOST_URI = 'http://192.168.1.101:5000'
     MORPH_LOG_DIR = '/root/.ccnet/logs'
     MORPH_DATA_DIR = '/root/Seafile/My Library'
