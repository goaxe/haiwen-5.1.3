# -*- coding: UTF-8 -*-
from flask import Blueprint, request, jsonify, g, current_app
from web import csrf
import os
from ..models import db, UploadStatus, DiskStatus, User, UploadSpeed, UserInfo
from datetime import datetime, timedelta
import time

bp = Blueprint('api', __name__)


@csrf.exempt
@bp.route('/push_upload_status', methods=['POST'])
def push_upload_status():
    # rate = -1 percent = 0 代表同步准备中
    # rate = 0 percent = -1 代表传输失败
    # rate = -1 percent = -1 代表传输完成
    # finish 表示是否显示进度条，status 表示传输是否成功
    email = request.form.get('email')
    repo_id = request.form.get('repo_id')
    rate = request.form.get('rate', 0, int)
    percent = request.form.get('percent', 0, int)
    desc = request.form.get('status')
    usr = User.query.filter_by(email=email).first()
    current_app.logger.info('send upload status' + str(desc))
    if not usr:
        return jsonify({'status': 'error'})
    userInfo = UserInfo.query.filter(UserInfo.uid == usr.id).first()
    if not userInfo:
        userInfo = UserInfo(user=usr)
    userInfo.repo_id = repo_id
    db.session.add(userInfo)
    status = True
    finish = True
    td = datetime.now()
    if rate >= 0 and percent >= 0: #显示进度条
        finish = False
    elif rate == -1 and percent == 0: #显示进度条
        finish = False
        rate = 0
    elif rate == 0 and percent == -1:
        status = False
    elif rate == -1 and percent == -1:
        desc = td.strftime("%Y-%m-%d %H:%M:%S")
    task = UploadStatus.query.filter(UploadStatus.uid == usr.id, UploadStatus.repo_id == repo_id,
                UploadStatus.finish == False).order_by(UploadStatus.update_time.desc()).first()
    if finish: # 传输完成
        if not task: #不再重复写记录
            task = UploadStatus.query.filter(UploadStatus.finish == False)
            map(db.session.delete, task)
            return jsonify({'status': 'ok'})
    else:
        if not task:
            task = UploadStatus(user=usr)
    task.repo_id = repo_id
    task.rate = rate
    task.desc = desc
    task.percent = percent
    task.finish = finish
    task.status = status
    current_app.logger.info('send upload status:' + str(task.desc) + str(percent) + '%' + str(rate))
    db.session.add(task)
    db.session.commit()
    return jsonify({'status': 'ok'})

@csrf.exempt
@bp.route('/push_upload_speed', methods=['POST'])
def push_upload_speed():
    email = request.form.get('email')
    usr = User.query.filter_by(email=email).first()
    # print ip
    if not usr:
        current_app.logger.info('send upload status:' + '该邮箱没有注册')
        return jsonify({'status': 'error', 'message': '该邮箱没有注册'})
    speed = request.form.get('speed')
    t = request.form.get('time', 0, int)
    if t == 0:
        t = time.mktime(datetime.now().timetuple())
    # print t, speed, ip
    # current_app.logger.info('send upload status:' + str(speed))
    status = UploadSpeed(user=usr, time_stamp=t, speed=speed)
    db.session.add(status)
    db.session.commit()
    return jsonify({'status': 'ok'})


@csrf.exempt
@bp.route('/push_disk_status', methods=['POST'])
def push_disk_status():
    """
    上传本地磁盘使用情况,参数列表：
    1.uid:
    2.used:已使用多少G
    3.datetime:设置日期
    4.total:总量
    """
    # ad = request.remote_addr
    # print ad
    email = request.form.get('email')
    # print ip
    usr = User.query.filter_by(email=email).first()
    if not usr:
        print u'该ip尚未绑定用户'
        return jsonify({'status': 'error', 'message': '该邮箱没有注册'})
    used = request.form.get('used', 0, float)
    total = request.form.get('total', 0, float)
    d = DiskStatus(user=usr, used=used, total=total)
    db.session.add(d)
    db.session.commit()
    return "success" + str(usr.id)


@csrf.exempt
@bp.route('/send_log', methods=['POST'])
def send_log():
    email = request.form.get('email')
    usr = User.query.filter_by(email=email).first()
    if not usr:
        print u'该ip尚未绑定用户'
        return jsonify({'status': 'error', 'message': '该邮箱没有注册'})
    name = request.form.get('name')
    files = request.files.get('log')
    current_app.logger.info('write log file:' + name)
    try:
        SAVE_DIR = current_app.config.get('UPLOADS_DEST') + str(usr.id) +'/'
        if not os.path.exists(SAVE_DIR):
            os.mkdir(SAVE_DIR)
        file_name = SAVE_DIR + name
        files.save(file_name)
    except Exception, e:
        print e.args, e.message
    # print SAVE_DIR
    # logs.save(files, folder='logs', name=name)
    return "success" + str(usr.id)


@csrf.exempt
@bp.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    psw = request.form.get('psw')
    user = User.query.filter(User.email == email).first()
    if not user:
        return jsonify({'result': False, 'msg': '该用户不存在'})
    if user.check_psw(psw):
        if not user.check_renew():
            return jsonify({'result': False, 'msg': '你的账号已经超过30天没修改密码，请联系管理员修改密码'})
        renew = user.renew_at.strftime("%Y-%m-%d %H:%M:%S")
        return jsonify({'result': True, 'msg': '登陆成功', 'psw': user.password, 'renew': renew, 'ip': user.ip})
    else:
        return jsonify({'result': False, 'msg': '密码错误'})


@csrf.exempt
@bp.route('/modify_psw', methods=['POST'])
def modify_psw():
    email = request.form.get('email')
    psw = request.form.get('psw')
    if not email or not psw:
        return jsonify({'result': False, 'msg': '邮箱和密码不能为空'})
    user = User.query.filter(User.email == email).first()
    if not user:
        return jsonify({'result': False, 'msg': '该用户不存在'})
    user.password = psw
    user.hash_psw()
    user.renew_at = datetime.now()
    db.session.commit()
    return jsonify({'result': True, 'msg': '修改成功'})

@bp.route('/renew')
def renew():
    email = request.args.get('email')
    days = request.args.get('days', 31, int)
    user = User.query.filter(User.email == email).first()
    if not user:
        user = User(email=email)
    user.renew_at = datetime.now() - timedelta(days)
    db.session.add(user)
    db.session.commit()
    return '修改成功'#
