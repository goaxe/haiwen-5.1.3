# -*- coding: UTF-8 -*-

from datetime import datetime

def none_fill(text):
    if not text:
        text = '没有填写'
    return text

def time_filter(time):
    if isinstance(time, datetime):
        time = time.strftime('%Y年%m月%d日 %H点%M分%S秒')
        return time
    return '无法显示时间'

def quota_filter(used):
    if used < 1024:
        return str(int(used)) + 'b'
    used /= 1024
    if used < 1024:
        return str(round(used, 2)) + 'kb'
    used /= 1024
    if used < 1024:
        return str(round(used, 2)) + 'MB'
    used /= 1024
    return str(round(used, 2)) + 'GB'
    




