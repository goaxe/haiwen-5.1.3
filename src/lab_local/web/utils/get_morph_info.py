# -*- coding: UTF-8 -*-
from flask import current_app
import traceback
import StringIO
from datetime import datetime
from flask import current_app
from ..models import db, User, DiskStatus, UserInfo
import os

def get_disk_usage():
    """Get free/used/total space info for a filesystem

    :param path: Any dirent on the filesystem
    :returns: A dict containing:

             :free: How much space is free (in bytes)
             :used: How much space is used (in bytes)
             :total: How big the filesystem is (in bytes)
    """
    try:
        path = current_app.config.get('MORPH_DATA_DIR')
        hddinfo = os.statvfs(path)
        total = hddinfo.f_frsize * hddinfo.f_blocks
        free = hddinfo.f_frsize * hddinfo.f_bavail
        used = hddinfo.f_frsize * (hddinfo.f_blocks - hddinfo.f_bfree)
        return {'total': int(float(total)),
                'free': int(float(free)),
                'used': int(float(used))}
    except Exception:
        _trace_except()

def _trace_except():
    fp = StringIO.StringIO()
    traceback.print_exc(file=fp)
    error = fp.getvalue()
    print error
    current_app.logger.error(error)
