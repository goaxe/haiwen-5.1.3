# -*- coding: UTF-8 -*-

from flask import Blueprint, render_template, jsonify, g, request, current_app
from ..models import  Department, User, DiskStatus, db, UploadStatus, UploadSpeed, UserInfo
from ..utils.permissions import require_user
from ..utils import get_server_info
from datetime import datetime, timedelta
import json
import time
import math


bp = Blueprint('status', __name__)

@bp.route('/test')
def test():
    ip = request.remote_addr

@bp.route('/uploads', defaults={'page': 1})
@bp.route('/uploads/<int:page>')
@require_user
def uploads(page):
    uid = request.args.get('uid', None, int)
    if not uid:
        uid = g.user.id
    uploads = UploadStatus.query.filter(UploadStatus.uid == uid, UploadStatus.finish == False).\
        group_by(UploadStatus.file_id)
    per = 10
    finishFiles = UploadStatus.query.filter(UploadStatus.uid == uid, UploadStatus.finish == True).\
        group_by(UploadStatus.file_id).order_by(UploadStatus.current.desc()).paginate(page, per, False)
    uploadStatus = []
    for u in uploads:
        up = {
            'tid': u.id,
            'file_id': u.file_id,
            'file_name': u.file_name,
            'total': u.total,
            'speed': u.speed,
            'cur': u.current,
            'update_time': u.update_time.strftime("%Y-%m-%d %H:%I:%S")

        }
        uploadStatus.append(up)
    departs = Department.query
    return render_template('status/uploads.html', departs=departs, finishFiles=finishFiles,
                           uploadStatus=json.dumps(uploadStatus))

@bp.route('/repo', defaults={'page': 1})
@bp.route('/repo/<int:page>')
@require_user
def repo(page):
    uid = request.args.get('uid', None, int)
    if not uid or g.user.role != 'admin':
        uid = g.user.id
    suc = UploadStatus.query.filter(UploadStatus.uid == uid, UploadStatus.finish == True, UploadStatus.status == True).\
        order_by(UploadStatus.update_time.desc())
    now = UploadStatus.query.filter(UploadStatus.uid == uid, UploadStatus.finish == False, UploadStatus.status == True)
    userInfo = UserInfo.query.filter(UserInfo.uid == uid).first()
    repo_url = None
    if userInfo and userInfo.repo_id:
        repo_url = current_app.config.get('MORPHFILE_API_URL')
        repo_url += userInfo.repo_id
    departs = Department.query
    count = 0
    if suc:
        count += suc.count()
    failed = UploadStatus.query.filter(UploadStatus.uid == uid, UploadStatus.finish == True,
                                       UploadStatus.status == False).order_by(UploadStatus.update_time.desc())
    if failed:
        count += failed.count()
    suc = suc.paginate(page, 15, False)
    failed = failed.paginate(page, 15, False)
    cur = uid
    return render_template('status/repo_status.html', cur=cur, repo_url=repo_url, departs=departs, count=count,
                           failed=failed, suc=suc, now=now)


@bp.route('/upload_speed', defaults={'page': 1})
@bp.route('/upload_speed/<int:page>')
@require_user
def upload_speed(page):
    #  uid = request.args.get('uid', None, int)
    #  if not uid or g.user.role != 'admin': # 非管理员用户只能看到自己的
    #      uid = g.user.id
    # # departs = Department.query
#    total = User.query.count()
    total = int(math.ceil(float(User.query.count()) / 2.0))

    users = User.query[(page - 1) * 2 :(page) * 2]
    mydate = []
    mydata = []
    for user in users:
        uid = user.id
        su, st = get_server_info.get_server_disk(user.email)
        user.su = su
        user.st = st
        user.sv = round(su / st, 2) * 100
        status = UploadStatus.query.filter(UploadStatus.uid == uid, UploadStatus.finish==False, UploadStatus.status == True).\
        order_by(UploadStatus.update_time.desc()).first()
        if not status:
            user.speed = 0
            user.percent = 100
        else:
            user.speed = status.rate
            user.percent = status.percent
        early = UploadSpeed.query.filter(UploadSpeed.uid == uid).order_by(UploadSpeed.time_stamp.asc()).first()
        latest = UploadSpeed.query.filter(UploadSpeed.uid == uid).order_by(UploadSpeed.time_stamp.desc()).first()
        start = request.args.get('start', "")
        end = request.args.get('end', "")
        if not end:
            end_date = time.mktime(datetime.now().timetuple())
        else:
            end_date = datetime.strptime(end, "%Y-%m-%d %H:%M")
            end_date = time.mktime(end_date.timetuple())
            if latest and end_date < latest.time_stamp:
                end_date = latest.time_stamp
        if not start:
            start_date = end_date - 1 * 24 * 3600
        else:
            start_date = datetime.strptime(start, "%Y-%m-%d %H:%M")
            start_date = time.mktime(start_date.timetuple())
            if early and start_date < early.time_stamp:
                start_date = early.time_stamp
    # print uid, start,start_date, end, end_date
        status = UploadSpeed.query.filter(UploadSpeed.time_stamp < int(end_date), UploadSpeed.uid == uid,
                                       UploadSpeed.time_stamp > int(start_date)).group_by(UploadSpeed.time_stamp).order_by(UploadSpeed.time_stamp.asc())
        data = []
        for s in status:
            t = s.time_stamp
            data.append([t * 1000, s.speed])
            mydate.append(t * 1000)
            mydata.append(s.speed)
        user.data = json.dumps(data)
        user.mydate = json.dumps(mydate)
        user.mydata = json.dumps(mydata)

    from config import load_config
    moose_url = load_config().MOOSE_MONITOR_URL
    ganglia_url = load_config().GANGLIA_URL
    print(total, "total")

    return render_template('status/upload_speed.html', users=users,
                           start=start, end=end, page=page, moose_url=moose_url, ganglia_url=ganglia_url, total=total)


@bp.route('/current_speed', methods=['POST'])
def current_speed():
    uid = request.form.get('uid')
    speed = UploadStatus.query.filter(UploadStatus.uid == uid, UploadStatus.finish==False, UploadStatus.status == True).\
        order_by(UploadStatus.update_time.desc()).first()
    if not speed:
        return jsonify({'status': 'finish', 'message': '传输完成'})
    return jsonify({'status': 'ok', 'rate': speed.rate, 'percent': speed.percent, 'desc': speed.desc})

@bp.route('/file', methods=['POST'])
@require_user
def file():
    fid = request.form.get('tid', -1, int)
    u = UploadStatus.query.get_or_404(fid)
    data = {
        'tid': u.id,
        'cur': u.current,
        'speed': u.speed,
        'file_name': u.file_name,
        'total': u.total
    }
    return json.dumps(data)


@bp.route('/disk')
@require_user
def disk():
    print('===============*************')
    uid = request.args.get('uid', None, int)
    if not uid or g.user.role != 'admin': # 非管理员用户只能看到自己的
        uid = g.user.id
    user = User.query.get_or_404(uid)
    su, st = get_server_info.get_server_disk(user.email)
    departs = Department.query
    # status = DiskStatus.query.filter(DiskStatus.uid == uid)
    # client_info = status.order_by(DiskStatus.update_time.desc()).first()
    current_app.logger.info("su:" + str(su) + " st:" + str(st))
    client_cur = []
    server_cur = []
    ct = None
    cu = None
    # if client_info:
    #     ct = client_info.total
    #     cu = client_info.used
    #     client_cur = [
    #         ['剩余空间', round((client_info.total - client_info.used) / (1 << 30), 2)],
    #         ['已使用的空间', round(client_info.used / (1 << 30), 2)]]
    if st:
        server_cur = [
            ['剩余空间', round((st - su) / (1 << 30), 2)],
            ['已使用的空间', round(su / (1 << 30), 2)]]
    return render_template('/status/disk.html', departs=departs, uid=uid, client_cur=json.dumps(client_cur),
                           client_total=ct, client_used =cu, server_cur=json.dumps(server_cur), server_total=st, server_used=su)#


