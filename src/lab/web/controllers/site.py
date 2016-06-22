# -*- coding: UTF-8 -*-

from flask import Blueprint, render_template, redirect, url_for, g, flash, request, make_response, Response
from werkzeug import security
from ..models import db, User, Department
from ..forms import LoginForm, ModifyUserForm, ModifyPwd
from ..utils.account import signin_user, signout_user
from ..utils.permissions import require_user
from ..utils.get_server_info import set_user_repo_and_ip

from datetime import datetime
import os

bp = Blueprint('site', __name__)

@bp.route('/', methods=['GET'], defaults={'page': 1})
@bp.route('/<int:page>')
@require_user
def index(page):
    uid = request.args.get('uid')
    if not uid or g.user.role != 'admin':
        uid = g.user.id
    departs = Department.query
    per = 10
    pages = User.query.filter(User.role == 'client').paginate(page, per, False)
    return render_template('site/index.html', departs=departs, pages=pages, cur=uid)

@bp.route('/tt')
def tt():
    return 'tt'

@bp.route('/view_log')
def view_log():
    return 'view_log'

@bp.route('/download_log')
def download_log():
    return 'download_log'

@bp.route('/db')
def db_test():
    user = User.query.filter(User.email == 'admin@qq.com').first()
    if not user:
        user = User(name = u'管理员', email = 'admin@qq.com', password = '123456', role = 'admin')
    user.password = '123456'
    user.hash_pwd()
    db.session.add(user)
    db.session.commit()
    return '用户人数: %d' % User.query.count()

@bp.route('/test')
def test():
    return 'test'

@bp.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        signin_user(form.user, form.permanent.data)
        days = form.user.get_expire_day()
        set_user_repo_and_ip(form.email.data)
        if 0 < days < 10:
            flash('你的账号还有%d天过期，请尽快修改密码' % days)
        else:
            flash('登陆成功')
        return redirect(url_for('site.index'))

    return render_template('site/login.html', form = form, hide_nav = True)
    

@bp.route('/logout')
def logout():
    if g.user:
        flash('退出')
        signout_user()
    return redirect(url_for('site.index'))

@bp.route('/modify_pwd', methods=['GET', 'POST'])
@require_user
def modify_psw():
    uid = request.args.get('uid')
    modify_form = ModifyPwd()
    if modify_form.validate_on_submit():
        user = User.query.get_or_404(uid)
        user.password = modify_form.password
        user.hash_pwd()
        user.renew_at = datetime.now()
        db.session.commit()
        flash('修改成功，新密码有效期是30天！')
        return redirect(url_for('site.index'))
    return render_template('site/modify_psw.html', modify_form=modify_form, cur = uid)



