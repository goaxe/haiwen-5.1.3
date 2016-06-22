# -*- coding: UTF-8 -*-
from flask import current_app
from flask_wtf import Form
from wtforms import TextField, RadioField, SelectField, PasswordField, BooleanField
from wtforms.validators import DataRequired, InputRequired, Email
from ..models import db, User
from datetime import datetime
import requests
import json


class LoginForm(Form):
    """
    label validators descriptions
    """
    password = PasswordField('', validators=[DataRequired('密码不能为空')], description='密码')
    permanent = BooleanField('一周内自动登录')

    def validate_password(self, field):
        user = User.query.first()
        if not user:
            raise ValueError('账号不存在，请联系管理员')
        self.user = user
        ret = {'result': True, 'msg': '登陆失败'}
        try:
            remote_adr = current_app.config.get('REMOTE_HOST_URI')
            r = requests.post(remote_adr + 'api/login', data={
                'email': user.email,
                'psw': field.data
            })
            ret = json.loads(r.text)
            if ret['result']:
                user.password = ret['psw']
                user.ip = ret['ip']
                user.renew_at = datetime.strptime(ret['renew'], "%Y-%m-%d %H:%M:%S")
                db.session.commit()
            self.user = user
            if not ret['result']:
                raise ValueError(ret['msg'])
        except Exception, e:
            # 登陆
            if not ret['result']:
                raise ValueError(ret['msg'])
            # print ('连接容灾中心的认证服务器失败，请联系管理员！' + str(e.args[0]))
            print user.check_psw(field.data), user.check_renew()
            if user.check_psw(field.data) and user.check_renew():
                return True
            else:
                raise ValueError('密码输入错误')




class UserForm(Form):
    name = TextField('用户名', validators=[DataRequired('用户名不能为空')])
    email = TextField('邮箱', validators=[Email('无效的邮箱')])
    password = PasswordField('密码',  validators=[DataRequired('密码不能为空')])
    confirm_psw = PasswordField('确认密码', validators=[DataRequired('请确认密码')])
    contact = TextField('联系方式')
    ip = TextField('ip地址')
    role = RadioField('身份', choices=[('admin', '管理员'), ('client', '普通用户')],
                      validators=[InputRequired('请选择身份')], default='client')
    depart_id = SelectField('选择部门', coerce=int, validators=[DataRequired('请选择部门')])

    def validate_email(self, field):
        user = User.query.filter(User.email == field.data).first()
        if user:
            raise ValueError('该邮箱已经被使用')

    def validate_password(self, field):
        if field.data != self.confirm_psw.data:
            raise ValueError('两次输入的密码不一致')
        if len(field.data) < 5:
            raise ValueError('密码长度不能少于5位')

class ModifyUserForm(UserForm):
    password = PasswordField('密码', )
    confirm_psw = PasswordField('确认密码', )

    def __init__(self):
        super(UserForm, self).__init__()

    def validate_email(self, field):
        pass

    def validate_password(self, field):
        if field.data:
            super(ModifyUserForm, self).validate_password(field)

class ModifyPsw(Form):
    password = PasswordField('密码', validators=[DataRequired('密码不能为空')])
    confirm_psw = PasswordField('确认密码', validators=[DataRequired('请确认密码')])

    def validate_password(self, field):
        if field.data != self.confirm_psw.data:
            raise ValueError('两次输入的密码不一致')
        if len(field.data) < 6:
            raise ValueError('密码长度不能少于6位')
