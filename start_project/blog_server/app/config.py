#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

class DBConfig:
    USER = os.getenv('MYSQL_ROOT_USER', default = 'root')
    PASSWORD = os.getenv('MYSQL_ROOT_PASSWORD', default = 'root')
    DATABASE = os.getenv('MYSQL_DATABASE', default = 'dev')
    HOST = os.getenv('DB_HOST', default = '192.18.0.3')

class RedisConfig:
    PROT = os.getenv('REDIS_PROT', default = '6379')
    HOST = os.getenv('REDIS_HOST', default = '192.18.0.5')

class LoggerConfig:
    LOG_BASE_DIR = '/log/application/'
    LOG_FILES = {
        'error': os.path.join(LOG_BASE_DIR, 'error.log'),
        'info': os.path.join(LOG_BASE_DIR, 'info.log'),
    }
    CONFIG = {
        'ERROR': {
            'logger_name': 'ERROR_LOG',
            'log_file': LOG_FILES.get("error"),
            'lever': 'DEBUG',

            'formatter': '%(asctime)s - %(levelname)s - %(funcName)s \n%(message)s',

            'backup_count': 7,
            'encoding': 'utf-8',
            'when': 'midnight',
            'interval': 1,
            'filemode': 'a',
        },
        'INFO': {
            'logger_name': 'info_log',
            'log_file': LOG_FILES.get("info"),
            'lever': 'DEBUG',

            'formatter': '%(asctime)s - %(levelname)s - %(funcName)s \n%(message)s',

            'backup_count': 7,
            'encoding': 'utf-8',
            'when': 'midnight',
            'interval': 1,
            'filemode': 'a',
        }
    }

class BlogServerConfig:
    SECRET_KEY = os.getenv('SECRET_KEY', default = 'no_secret')
    JSON_AS_ASCII = os.getenv('JSON_AS_ASCII', default = False)
    JSON_SORT_KEYS = os.getenv('JSON_SORT_KEYS', default = True)
    SESSION_COOKIE_HTTPONLY = os.getenv('SESSION_COOKIE_HTTPONLY', default = True)

    DB = DBConfig()
    REDIS = RedisConfig()
    LOGGER = LoggerConfig()

config = BlogServerConfig()
