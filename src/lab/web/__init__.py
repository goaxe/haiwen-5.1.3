# -*- coding: UTF-8 -*-

from flask import Flask, g, request, url_for
from flask_wtf.csrf import CsrfProtect
from config import load_config
from .utils.account import get_current_user
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

csrf = CsrfProtect()

def create_app():
    app = Flask(__name__)
    cfg = load_config()
    app.config.from_object(cfg)

    register_routes(app)
    register_db(app)
    register_logger(app)
    register_jinja(app)
    csrf.init_app(app)

    @app.before_request
    def before_request():
        g.user = get_current_user()


    return app

def register_logger(app):
    import logging
    from logging.handlers import RotatingFileHandler

    rfh = RotatingFileHandler('%s/lab.log' % app.config.get('PROJECT_PATH'), 'a', 1 * 1024 * 1024, 10)
    rfh.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s %(levelname)sL: %(message)s [in %(pathname)s:%(lineno)d]')
    rfh.setFormatter(formatter)
    app.logger.addHandler(rfh)


def register_routes(app):
    from .controllers import site, account, status, api
    app.register_blueprint(site.bp, url_prefix = '')
    app.register_blueprint(account.bp, url_prefix = '/account')
    app.register_blueprint(status.bp, url_prefix = '/status')
    app.register_blueprint(api.bp, url_prefix = '/api')



def register_db(app):
    from .models import db
    db.init_app(app)

def register_jinja(app):
    from .utils import filter
    app.jinja_env.filters['none_fill'] = filter.none_fill
    app.jinja_env.filters['time_filter'] = filter.time_filter
    app.jinja_env.filters['quota_filter'] = filter.quota_filter

    @app.context_processor
    def inject_vars():
        return dict(g_site_domain = load_config().SITE_DOMIAN)

    from jinja2 import Markup

    def url_for_other_page(page, key='page', params=None):
        view_args = request.view_args.copy()
        args = request.args.copy().to_dict()
        combined_args = dict(view_args.items() + args.items())
        combined_args[key] = page
        if params:
            combined_args.update(params)
        return url_for(request.endpoint, **combined_args)

    def static(filename):
        return url_for('static', filename=filename)

    def link(path):
        return Markup("<link rel='stylesheet' href='%s'/>" % static(path))

    def script(path):
        return Markup("<script type='text/javascript' src='%s'></script>" % static(path))

    app.jinja_env.globals['static'] = static
    app.jinja_env.globals['link'] = link
    app.jinja_env.globals['script'] = script
    app.jinja_env.globals['url_for_other_page'] = url_for_other_page


