import os
from web import create_app
from werkzeug.debug import DebuggedApplication

os.environ['MODE'] = 'PRODUCTION'

app = create_app()
# http://stackoverflow.com/questions/10364854/flask-debug-true-does-not-work-when-going-through-uwsgi
app.wsgi_app = DebuggedApplication(app.wsgi_app, True)
host = app.config.get('HOST_URI')
app.run(host=host)
