#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from config import config
from .util import format_user_blog_id_key, format_user_love_value_key
from lib.errors.expection import CacheError
import redis, time
from lib.errors.expection import CacheError
from lib.logger.logger import log

def connect_redis():
    connect_time = 5
    while connect_time:
        try:
            pool = redis.ConnectionPool(host=config.REDIS.HOST, port=config.REDIS.PROT, db=0)
            return pool
        except BaseException as e:
            log.error(str(e))
            log.error('connect redis fail, try it in 3 second....')
            time.sleep(3) # in second
        connect_time -= 1
    raise CacheError('can not connect redis')

pool = connect_redis()

class Redis:
    def __init__(self):
        pass

    @classmethod
    def get_redis_conn(cls):
        try:
            conn = redis.Redis(connection_pool=pool)
            return conn
        except BaseException as e:
            log.error(str(e))
            raise CacheError('can not get conn from redis pool')

    @classmethod
    def get_user_blog_id(cls, user_id):
        key = format_user_blog_id_key(user_id)
        conn = cls.get_redis_conn()
        redis_result = conn.incr(key)
        if redis_result == 1:
            redis_result = int(time.time())
            conn.set(key, redis_result)
        return redis_result

    @classmethod
    def get_user_love_value(cls, user_id, username, user_blog_id):
        key = format_user_love_value_key(user_id, username, user_blog_id)
        conn = cls.get_redis_conn()
        redis_result = conn.get(key)
        if redis_result:
            conn.delete(key)
            return -1
        else:
            conn.set(key, "True")
            return 1
