# -*- coding: UTF-8 -*-

from flask import session, request
from ..models import User

def signin_user(user, permanent):
    session.permanent = permanent
    session['role'] = user.role
    session['user_id'] = user.id

def signout_user():
    if 'user_id' in session:
        session.pop('user_id', None)
    if 'role' in session:
        session.pop('role', None)

def get_current_user():
    if not 'user_id' in session:
        return None
    user = User.query.filter_by(id = session['user_id']).first()
    if not user:
        signout_user()
        return None
    return user
