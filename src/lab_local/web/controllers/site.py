# -*- coding: UTF-8 -*-

from flask import Blueprint, current_app, render_template, redirect, url_for, g, flash, \
    request, make_response, Response
from ..models import db, User
from ..forms.account import LoginForm
from ..utils.account import signin_user, signout_user, change_psw
from ..utils.permissions import require_user
from ..forms.account import ModifyPsw
from werkzeug import security
import os

bp = Blueprint('site', __name__)

@bp.route('/', methods=['GET'])
@require_user
def index():
    files = []
    root = current_app.config.get('MORPH_LOG_DIR')
    if not os.path.exists(root):
        return render_template('site/index.html', files=files)
    items = os.listdir(root)
    for t in items:
        pt = root + t
        # print pt
        # 忽略隐藏文件或者文件夹
        if t.startswith('.') or os.path.isdir(pt):
            # print root + t
            continue
        files.append(t)
    return render_template('site/index.html', files=files), 200

@bp.route('/tt')
def tt():
    c = request.cookies.get('tt')
    print c
    r = Response()
    r.set_cookie('tt', '123')
    return r

@bp.route('/view_log')
def view_log():
    file_name = request.args.get('file_name')
    config = current_app.config
    root = current_app.config.get('MORPH_LOG_DIR') + '/'
    pt = root + file_name
    if not os.path.exists(pt):
        return "文件不存在"
    with open(pt, 'r') as f:
        content = f.read()
    response = make_response(content)
    response.headers['Content-Type'] = 'text/plain; charset=utf-8'
    return response

@bp.route('/download_log')
def download_log():
    file_name = request.args.get('file_name')
    root = current_app.config.get('MORPH_LOG_DIR') + '/'
    pt = root + file_name
    if not os.path.exists(pt):
        return "文件不存在"
    with open(pt, 'r') as f:
        content = f.read()
    response = make_response(content)
    response.headers['Content-Type'] = 'application/octet-stream'
    response.headers['Content-Disposition'] = 'attachment; filename=' + file_name
    return response

@bp.route('/db')
def db_test():
    email = request.args.get('email')
    user = User.query
    map(db.session.delete, user)
    user = User(email=email, password='123456')
    user.hash_psw()
    db.session.add(user)
    db.session.commit()
    return '用户人数:%d' % User.query.count()

@bp.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        signin_user(form.user, form.permanent.data)
        days = form.user.get_expire_day()
        # print days
        if 0 < days < 10:
            flash('你的账号还有%d天就过期，请尽快修改密码' % days)
        else:
            flash('登陆成功')
        return redirect(url_for('site.index'))
    return render_template('site/login.html', form=form, hide_nav=True)

@bp.route('/logout')
def logout():
    if g.user:
        flash('退出')
        signout_user()
    return redirect(url_for('site.index'))

@bp.route('/modify_psw', methods=['GET', 'POST'])
def modify_psw():
    modify_form = ModifyPsw()
    if modify_form.validate_on_submit():
        ret = change_psw(g.user.email, modify_form.password.data)
        user = User.query.first()
        user.password = modify_form.password.data
        user.hash_psw()
        db.session.commit()
        if ret:
            flash('修改成功，你的新密码有效期是30天！')
        else:
            flash('修改密码失败，请联系管理员!')
        return redirect(url_for('site.index'))
    return render_template('site/modify_psw.html', modify_form=modify_form)
