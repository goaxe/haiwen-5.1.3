# -*- coding: UTF-8 -*-

from config import load_config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

def get_user_ip(email):
    morphweb_db = load_config().MORPHWEB_DB
    engine = create_engine(morphweb_db)
    DB_Session = sessionmaker(bind = engine)
    session = DB_Session()
    ret = session.execute("select last_login_ip from api2_tokenv2 where user = :email order by last_accessed desc limit 1", {'email': email})
    for t in ret:
        return t[0]

def get_user_repo(email):
    seafile_db = load_config().SEAFILE_DB
    engine = create_engine(seafile_db)
    DB_Session = sessionmaker(bind = engine)
    session = DB_Session()
    ret = session.execute("select repo_id from RepoOwner where owner_id = :email limit 1", {'email': email})
    for  t in ret:
        return t[0]


    

