# -*- coding: UTF-8 -*-
from flask import Blueprint, render_template, jsonify, g, request, current_app
from ..models import User, DiskStatus, db, UploadStatus, UploadSpeed, UserInfo
from ..utils.permissions import require_user
from ..utils import get_morph_info
from datetime import datetime, timedelta
import json
import time

bp = Blueprint('status', __name__)


@bp.route('/test')
def test():
    ip = request.remote_addr
    return ip

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
    finishFiles = UploadStatus.query.filter(UploadStatus.uid == uid, UploadStatus.finish == True)\
        .group_by(UploadStatus.file_id).order_by(UploadStatus.current.desc()).paginate(page, per, False)
    uploadStatus = []
    # print len(uploads.all())
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
    return render_template('status/uploads.html', finishFiles=finishFiles,
                           uploadStatus=json.dumps(uploadStatus))

@bp.route('/repo', defaults={'page': 1})
@bp.route('/repo/<int:page>')
@require_user
def repo(page):
    uid = g.user.id
    suc = UploadStatus.query.filter(UploadStatus.uid == uid, UploadStatus.finish == True, UploadStatus.status == True).\
        order_by(UploadStatus.update_time.desc())
    now = UploadStatus.query.filter(UploadStatus.uid == uid, UploadStatus.finish == False, UploadStatus.status == True).\
        order_by(UploadStatus.update_time.desc()).first()
    userInfo = UserInfo.query.filter(UserInfo.uid == uid).first()
    repo_url = None
    if userInfo and userInfo.repo_id:
        repo_url = current_app.config.get('SEAFILE_API_URL')
        repo_url += userInfo.repo_id
    count = 0
    if suc:
        count += suc.count()
    failed = UploadStatus.query.filter(UploadStatus.uid == uid, UploadStatus.finish == True, UploadStatus.status == False).\
        order_by(UploadStatus.update_time.desc())
    if failed:
        count += failed.count()
    suc = suc.paginate(page, 15, False)
    failed = failed.paginate(page, 15, False)
    return render_template('status/repo_status.html', repo_url=repo_url, count=count, cur=uid, failed=failed, suc=suc, now=now)


@bp.route('/upload_speed')
@require_user
def upload_speed():
    uid = g.user.id
    start = request.args.get('start', "")
    end = request.args.get('end', "")
    if not end:
        end_date = time.mktime(datetime.now().timetuple())
    else:
        end_date = datetime.strptime(end, "%Y-%m-%d %H:%M")
        end_date = time.mktime(end_date.timetuple())
    if not start:
        start_date = end_date - 5 * 24 * 3600
    else:
        start_date = datetime.strptime(start, "%Y-%m-%d %H:%M")
        start_date = time.mktime(start_date.timetuple())
    # print uid, start,start_date, end, end_date
    status = UploadSpeed.query.filter(UploadSpeed.time_stamp < int(end_date), UploadSpeed.uid == uid,
                                       UploadSpeed.time_stamp > int(start_date)).group_by(UploadSpeed.time_stamp).order_by(UploadSpeed.time_stamp.asc())
    data = []
    for s in status:
        t = s.time_stamp
        data.append([t * 1000, s.speed])
    return render_template('status/upload_speed.html', data=json.dumps(data), uid=uid,
                           start=start, end=end)


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
    client_info = get_morph_info.get_disk_usage()
    client_cur = []
    ct = None
    cu = None
    if client_info:
        ct = client_info['total']
        cu = client_info['used']
        client_cur = [
            ['剩余空间', round(client_info['free'] / (1 << 30), 2)],
            ['已使用的空间', round(client_info['used'] / (1 << 30), 2)]]
    return render_template('/status/disk.html', client_cur=json.dumps(client_cur),
                           client_total=ct, client_used =cu)