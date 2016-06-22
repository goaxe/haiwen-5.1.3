# -*- coding: UTF-8 -*-
from functools import wraps
from flask import g, redirect, url_for, flash

def require_user(func):

    @wraps(func)
    def decorator(*args, **kwargs):
        if not g.user:
            flash('请登录')
            return redirect(url_for('site.login'))
        return func(*args, **kwargs)

    return decorator


def require_client(func):

    @wraps(func)
    def decorator(*args, **kwargs):
        if not g.user or g.user.role != 'client':
            flash('权限不够')
            return redirect(url_for('site.login'))
        return func(*args, **kwargs)

    return decorator


def require_admin(func):

    @wraps(func)
    def decorator(*args, **kwargs):
        if not g.user or g.user.role != 'admin':
            flash('权限不够')
            return redirect(url_for('site.login'))
        return func(*args, **kwargs)

    return decorator

