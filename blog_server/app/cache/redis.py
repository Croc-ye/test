#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from config import config
from .util import format_user_blog_id_key
from errors.expection import CacheError
import redis, time
from errors.expection import CacheError
from logger.logger import log

def connect_redis():
    connect_time = 5
    while connect_time:
        try:
            pool = redis.ConnectionPool(host=config.REDIS.HOST, port=config.REDIS.PROT, db=0)
            return pool
        except BaseException as e:
            log.error(str(e))
            log.error('connect redis fail')
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
            log.info(id(pool))
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
