# -*- coding: UTF-8 -*-

from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from web import create_app
from web.models import db
import os

PORT = 7000

os.environ['MODE'] = 'PRODUCTION'
app = create_app()
manager = Manager(app)

migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)

@manager.command
def run():
    app.run(port = PORT)

@manager.command
def ser():
    app.run(host = '192.168.1.201', port = PORT)

@manager.command
def createdb():
    print 'createdb'
    print app.config.get('SQLALCHEMY_DATABASE_URI')
    db.drop_all()
    db.create_all()

if __name__ == '__main__':
    manager.run()

