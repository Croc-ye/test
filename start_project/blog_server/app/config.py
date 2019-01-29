#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from lib.logger import log

class db_config():
    USER = os.getenv('MYSQL_ROOT_USER', default = 'root')
    PASSWORD = os.getenv('MYSQL_ROOT_PASSWORD', default = 'root')
    DATABASE = os.getenv('MYSQL_DATABASE', default = 'dev')
    HOST = os.getenv('DB_HOST', default = '172.18.0.3')

class redis_config():
    PROT = os.getenv('REDIS_PROT', default = '6379')
    HOST = os.getenv('REDIS_HOST', default = '172.18.0.2')

class blog_server_config():
    SECRET_KEY = os.getenv('SECRET_KEY', default = 'no_secret')
    JSON_AS_ASCII = os.getenv('JSON_AS_ASCII', default = False)
    JSON_SORT_KEYS = os.getenv('JSON_SORT_KEYS', default = True)
    SESSION_COOKIE_HTTPONLY = os.getenv('SESSION_COOKIE_HTTPONLY', default = True)

    DB = db_config()
    REDIS = redis_config()

config = blog_server_config()
