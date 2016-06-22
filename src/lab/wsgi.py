# -*- coding: UTF-8 -*-

import os
from web import create_app
from werkzeug.debug import DebuggedApplication

os.environ['MODE'] = 'PRODUCTION'

app = create_app()

app.wsgi_app = DebuggedApplication(app.wsgi_app, True)
host = app.config.get('HOST_URI')
app.run(host = host, port = 7000)
