# -*- coding: UTF-8 -*-
from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from web import create_app
from web.models import db

PORT = 5000

# os.environ['MODE'] = 'PRODUCTION'
app = create_app()
manager = Manager(app)

migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)

@manager.command
def run():
    app.run(port=PORT)

@manager.command
def ser():
    app.run(host='192.168.1.31', port=PORT)

@manager.command
def createdb():
    db.drop_all()
    db.create_all()

if __name__ == "__main__":
    manager.run()
