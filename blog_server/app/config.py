#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
from logger.logger import log

class db_config():
    USER = os.getenv('MYSQL_ROOT_USER', default = 'root')
    PASSWORD = os.getenv('MYSQL_ROOT_PASSWORD', default = 'root')
    DATABASE = os.getenv('MYSQL_DATABASE', default = 'dev')
    HOST = os.getenv('DB_HOST', default = '172.18.0.2')

class blog_server_config():
    SECRET_KEY = os.getenv('SECRET_KEY', default = 'no_secret')
    JSON_AS_ASCII = os.getenv('JSON_AS_ASCII', default = False)
    JSON_SORT_KEYS = os.getenv('JSON_SORT_KEYS', default = True)
    SESSION_COOKIE_HTTPONLY = os.getenv('SESSION_COOKIE_HTTPONLY', default = True)

    DB = db_config()

config = blog_server_config()
