# -*- coding: UTF-8 -*-

from flask import current_app
from datetime import datetime
from ..models import db, User, DiskStatus, UserInfo
import traceback
import StringIO


def set_user_repo_and_ip(username):
    try:
        ip = _get_user_id(username)
        repo_id = _get_repo_id(username)
        user = User.query.filter(User.email == username).first()
        if  ip:
            user.ip = ip
        if repo_id:
            info = UserInfo.query.filter(UserInfo.uid == user.id).first()
            if not info:
                info = UserInfo(user = user)
            info.repo_id = repo_id
            db.session.add(info)
        db.session.commit()
    except Exception:
        _trace_except()

def get_server_disk(username):
    try:
        return _get_quota(username)
    except Exception:
        _trace_except()
        return None, None

def _get_quota(username):
    try:
        import server_info as server_api
        return server_api.get_quota_usage(username)
    except Exception:
        _trace_except()
        return None, None

def _get_user_id(username):
    try:
        from read_user_ip import get_user_ip
        return get_user_ip(username)
    except Exception:
        _trace_except()
        return None
        
def _get_repo_id(username):
    try:
        from read_user_ip import get_user_repo
        return get_user_repo(username)
    except Exception:
        _trace_except()
        return None



def _trace_except():
    fp = StringIO.StringIO()
    traceback.print_exc(file = fp)
    error = fp.getvalue()
    print error
    current_app.logger.error(error)
