# -*- coding: UTF-8 -*-
import time
from flask import Flask
from celery import Celery

# http://docs.celeryproject.org/en/latest/getting-started/first-steps-with-celery.html

app = Flask(__name__)
app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
)

def make_celery(app):
    celery = Celery(__name__, broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    TaskBase = celery.Task
    class ContextTask(TaskBase):
        abstract = True
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = ContextTask
    return celery

my_celery = make_celery(app)

@my_celery.task
def add(x, y):
    return x + y
