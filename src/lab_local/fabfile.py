# -*- coding: UTF-8 -*-

from fabric.api import run, env, cd, prefix, shell_env, local
from config import load_config
import os

config = load_config()


def init():
    env.host_string = config.HOST_STRING
    with cd('/usr/www/lab'):
        run('git reset --hard HEAD')
        run('git pull -f')
        with prefix('source /usr/www/env/bin/activate'), shell_env(MODE='PRODUCTION'):
            run('pip install -r requirements.txt')
            run('python manager.py createdb')
            run('python manager.py db init')
        run('supervisorctl restart lab')


def deploy():
    env.host_string = config.HOST_STRING
    with cd('/usr/www/lab'):
        run('git reset --hard HEAD')
        run('git pull -f')
        with prefix('source /usr/www/env/bin/activate'), shell_env(MODE='PRODUCTION'):
            run('pip install -r requirements.txt')
            run('python manage.py db upgrade')
        run('supervisorctl restart lab')

# 166.111.131.62
def test():
    env.host_string = 'root@166.111.131.62'
    env.password = 'hpcgrid'
    with cd('/usr/web/lab'):
        run('git reset --hard HEAD')
        run('git pull -f')
        with prefix('source /usr/web/env/bin/activate'), shell_env(MODE='PRODUCTION'):
            run('pip install -r requirements.txt')
            # run('python manage.py db upgrade')
        run('supervisorctl restart lab')

def fix():
    """fix config"""
    with cd('/usr/www/lab'):
        local('rm -rf /etc/nginx/sites-available/lab.conf')
        local('cp deploy/nginx.conf /etc/nginx/sites-available/lab.conf')

def restart():
    """重启"""
    env.host_string = config.HOST_STRING
    run('supervisorctl restart lab')