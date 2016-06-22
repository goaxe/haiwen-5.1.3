# -*- coding: UTF-8 -*-

from flask import Blueprint, current_app, render_template, request, jsonify, flash, g, abort, redirect, url_for
from ..forms import DepartmentForm, UserForm, ModifyUserForm
from ..models import db, Department, User, UserInfo
from ..utils.permissions import require_admin, require_user, require_client
from ..utils import get_server_info
from datetime import datetime

bp = Blueprint('account', __name__)

@bp.route('/accounts')
def accounts():
    pass

@bp.route('/change_pwd')
def change_pwd():
    pass

@bp.route('/manage', methods=['GET', 'POST'])
@require_admin
def manage():
    department_form = DepartmentForm()
    if department_form.validate_on_submit():
        name = department_form.name.data
        dp = Department(name=name)
        db.session.add(dp)
        db.session.commit()
    departments = Department.query
    return render_template('admin/manage.html', page_name='manage_dp', department_form=department_form, departments=departments)


@bp.route('/del_department', methods=['POST'])
@require_admin
def del_department():
    did = request.form.get('did', None, int)
    dp = Department.query.filter_by(id = did).first()
    if not dp:
        return jsonify({'status': 'error', 'message': '删除失败'})
    db.session.delete(dp)
    db.session.commit()
    return jsonify({'status': 'ok', 'did': did})



@bp.route('/user_manage', defaults={'page': 1})
@bp.route('/user_manage/<int:page>')
@require_admin
def user_manage(page):
    per = 10
    users = User.query
    for u in users:
        get_server_info.set_user_repo_and_ip(u.email)
    pages = User.query.paginate(page, per, False)
    return render_template('admin/user_manage.html', pages=pages, page_name='manage_user')


@bp.route('/add_user', methods = ['GET', 'POST'])
@require_admin
def add_user():
    title = '添加用户'
    form = UserForm()
    form.depart_id.choices = [(0, '请选择')]
    form.depart_id.choices.extend([(d.id, d.name) for d in Department.query])
    if form.validate_on_submit():
        user = User()
        user.name = form.name.data
        user.password = form.password.data
        user.hash_pwd()
        user.email = form.email.data
        user.contact = form.contact.data
        user.role = form.role.data
        user.ip = form.ip.data
        user.department_id = form.depart_id.data
        info = UserInfo(user=user)
        db.session.add(user)
        db.session.add(info)
        db.session.commit()
        flash('添加成功')
        form.data.clear()
    return render_template('admin/add_user.html', form=form, title=title)

@bp.route('/modify_pwd')
@require_user
def modify_pwd():
    new_pwd = ''
    return render_template('admin/modify_psw.html')


@bp.route('/modify_user_info/<int:uid>', methods=['GET', 'POST'])
@require_admin
def modify_user_info(uid):
    title = '修改信息'
    user = User.query.get_or_404(uid)
    if g.user.role != 'admin' and g.user.id != uid:
        abort(404)
    form = ModifyUserForm()
    form.depart_id.choices = [(0, '请选择')]
    form.depart_id.choices.extend([(d.id, d.name) for d in Department.query])
    if request.method == 'GET':
        form.name.data = user.name
        form.email.data = user.email
        form.ip.data = user.ip
        form.role.data = user.role
        form.contact.data = user.contact
        form.depart_id.data = user.department_id
    if form.validate_on_submit():
        user.name = form.name.data
        if form.password.data:
            user.password = form.password.data
            user.hash_pwd()
            user.renew_at = datetime.now()
        user.role = form.role.data
        user.contact = form.contact.data
        user.email = form.email.data
        user.department_id = form.depart_id.data
        user.ip = form.ip.data
        db.session.commit()
        flash('修改成功')
        if g.user.role == 'admin':
            return redirect(url_for('account.user_manage'))
        return redirect(url_for('site.index'))
    return render_template('admin/add_user.html', form=form, title=title)





@bp.route('/delete_user', methods=['POST'])
def delete_user():
    uid = request.form.get('uid', None, int)
    user = User.query.filter_by(id=uid).first()
    map(db.session.delete, user.userInfo)
    if not user:
        return jsonify({'status': 'error', 'message': '删除失败'})
    if user.id == g.user.id:
        return jsonify({'status': 'error', 'message': '不能删除自己的管理员账号'})
    db.session.delete(user)
    db.session.commit()
    return jsonify({'status': 'ok', 'uid': uid})
