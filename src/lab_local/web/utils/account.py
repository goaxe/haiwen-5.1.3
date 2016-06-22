# -*- coding: UTF-8 -*-
from flask import session, request, redirect, current_app
from ..models import User
import requests
import json

def signin_user(user, permanent):
    print permanent
    session.permanent = permanent
    session['user_id'] = user.id


def signout_user():
    if 'user_id' in session:
        session.pop('user_id', None)


def get_current_user():
    if not 'user_id' in session:
        return None
    user = User.query.filter_by(id=session['user_id']).first()
    if not user:
        signout_user()
        return None
    return user


def change_psw(email, psw):
    remote_adr = current_app.config.get('REMOTE_HOST_URI')
    try:
        r = requests.post(remote_adr + 'api/modify_psw', data={
            'email': email,
            'psw': psw
        })
        ret = json.loads(r.text)
        return ret['result']
    except Exception, e:
        current_app.logger.error(e.args[0])
        return False