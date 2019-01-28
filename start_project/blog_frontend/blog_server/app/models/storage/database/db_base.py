#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import threading
import pymysql, time
from config import config
from lib.logger import log
from lib.errors.expection import DatabaseError

def connect_database():
    connect_time = 5
    while connect_time:
        try:
            db = pymysql.connect(user=config.DB.USER, \
                                 password=config.DB.PASSWORD, \
                                 database=config.DB.DATABASE, \
                                 host=config.DB.HOST)
            return db
        except BaseException as e:
            log.error(str(e))
            log.error('connect database fail, try it in 3 second....')
            time.sleep(3) # in second
        connect_time -= 1
    raise DatabaseError('can not connect database')

global_db = connect_database()
threadLock = threading.Lock()

class Database:
    def __init__(self):
        pass

    @classmethod
    def execute(self, sql):
        threadLock.acquire()
        log.info('execute sql: {}'.format(sql))
        try:
            cursor = global_db.cursor()
            cursor.execute(sql)
            result = cursor.fetchall()
            global_db.commit()
            cursor.close()
            return result
        except BaseException as e:
            log.error(str(e))
            global_db.rollback()
            raise DatabaseError("internal database error")
        finally:
            threadLock.release()
 
    @classmethod
    def get_last_insert_id(cls):
        return cls.execute('select @@IDENTITY')[0][0];
