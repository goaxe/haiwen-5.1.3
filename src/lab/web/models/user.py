# -*- coding: UTF-8 -*-

from werkzeug import security
from ._base import db
from datetime import datetime, timedelta
import time

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(200))
    email= db.Column(db.String(50))
    ip = db.Column(db.String(200))
    contact = db.Column(db.String(50))
    avatar= db.Column(db.String(200))
    role = db.Column(db.Enum('client', 'admin'))
    is_active = db.Column(db.Boolean, default = True)
    renew_at = db.Column(db.DateTime, default = datetime.now())
    create_at = db.Column(db.DateTime, default = datetime.now())
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'))
    department = db.relationship('Department', backref = db.backref('users', lazy = 'dynamic'))

    def __repr__(self):
        return '<User %s>' % self.name

    def hash_pwd(self):
        self.password = security.generate_password_hash(self.password)

    def check_pwd(self, password):
        return security.check_password_hash(self.password, password)
    def check_renew(self, days = 30):
        if self.renew_at + timedelta(days) < datetime.now():
            return False
        return True

    def get_expire_day(self):
        if self.role == 'client':
            return 30 - (datetime.now() - self.renew_at).days
        else:
            return None

class UploadSpeed(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    uid = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref = db.backref('uploadSpeed', lazy = 'dynamic'))
    time_stamp = db.Column(db.Integer)
    speed = db.Column(db.Integer)

class UploadStatus(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    uid = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref = db.backref('uploadStatus', lazy = 'dynamic'))
    repo_id = db.Column(db.String(200))
    rate = db.Column(db.Integer)
    percent = db.Column(db.Integer)
    desc = db.Column(db.String(200))
    status = db.Column(db.Boolean, default = True)
    finish = db.Column(db.Boolean, default = True)
    update_time = db.Column(db.DateTime, default = datetime.now())

class DiskStatus(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    uid = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref = db.backref('diskStatus', lazy = 'dynamic'))
    total = db.Column(db.BigInteger, default = 0)
    used = db.Column(db.BigInteger, default = 0)
    update_time = db.Column(db.DateTime, default = datetime.now())

class Department(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), unique = True)

class UserInfo(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    uid = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref = db.backref('userInfo', lazy = 'dynamic'))
    repo_id = db.Column(db.String(200))
    repo_name = db.Column(db.String(200))
    log_path = db.Column(db.String(200))



