�         ���    -*-
from tasks import sendmail
from celery_test import add

print sendmail.delay(dict(to='celery@python.org'))

print add.delay(3, 5)