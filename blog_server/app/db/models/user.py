#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .db_base import Database
from logger.logger import log
from errors.expection import ArgsError, DatabaseError

class User:
    Table = 'user'
    def __init__(self, user_id='-1', username='', avatar=''):
        super()
        self.user_id = user_id
        self.username = username
        self.avatar = avatar

    @classmethod
    def load_or_create(cls, username, password) -> 'User':
        if cls.user_exist(username):
            log.info('user {} exist, loading user....'.format(username))
            return cls.load(username, password)
        else:
            log.info('user {} not exist, create user....'.format(username))
            return cls.create(username, password)

    @classmethod
    def load(cls, username, password) -> 'User':
        sql = 'select id, username, avatar, password from %s where username="%s"' % (cls.Table, username)
        result = Database.execute(sql)
        if password != result[0][3]:
            raise ArgsError("unmatch password")
        return cls.converResultToUser(result)

    @classmethod
    def create(cls, username, password) -> 'User':
        Database.execute('insert into %s(username, password) values("%s", "%s")' % (cls.Table, username, password))
        return cls.load(username, password)

    @classmethod 
    def user_exist(cls, username) -> 'boolean':
        result = Database.execute('select id from %s where username="%s"' % (cls.Table, username))
        return result is not None and len(result) == 1
    
    @classmethod
    def converResultToUser(cls, result) -> 'User':
        if result is not None and len(result) == 1:
            return cls(user_id=result[0][0], username=result[0][1], avatar=result[0][2])
        else:
            raise ArgsError("No such user")

    @classmethod
    def by_id(cls, user_id) -> 'User':
        sql = 'select id, username, avatar from %s where id="%s"' % (cls.Table, user_id)
        result = Database.execute(sql)
        return cls.converResultToUser(result)
    
    @classmethod
    def get_user_id_by_username(cls, username):
        sql = 'select id from %s where username = "%s"' % (cls.Table, username)
        result = Database.execute(sql)
        if result is not None and len(result) == 1:
            return result[0][0]
        else:
            raise ArgsError("No such user")

    @classmethod
    def by_username(cls, username) -> 'User':
        sql = 'select id, username, avatar from %s where username="%s"' % (cls.Table, username)
        result = Database.execute(sql)
        return cls.converResultToUser(result)

    @classmethod
    def delete_by_user_id(cls, user_id) -> 'boolean':
        sql = 'delete from %s where id = %d' % (cls.Table, user_id)
        result = Database.execute(sql)
        return result is ()



    def to_json(self):
        return {
            'username': self.username,
            'avatar': self.avatar
        }
