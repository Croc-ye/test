#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .db_base import Database
from lib.logger import log
from lib.errors.expection import ArgsError, DatabaseError

class UserDAO:
    Table = 'user'

    @classmethod
    def load_or_create(cls, username, password) -> 'truple':
        if cls.user_exist(username):
            log.info('user {} exist, loading user....'.format(username))
            return cls.load(username, password)
        else:
            log.info('user {} not exist, create user....'.format(username))
            return cls.create(username, password)

    @classmethod
    def load(cls, username, password) -> 'User':
        sql = 'select id, username, avatar, password from %s where username="%s"' % (cls.Table, username)
        results = Database.execute(sql)
        if password != results[0][3]:
            raise ArgsError("unmatch password")
        return cls.create_dict_by_result(results[0])

    @classmethod
    def create(cls, username, password) -> 'User':
        Database.execute('insert into %s(username, password) values("%s", "%s")' % (cls.Table, username, password))
        return cls.load(username, password)

    @classmethod 
    def user_exist(cls, username) -> 'boolean':
        result = Database.execute('select id from %s where username="%s"' % (cls.Table, username))
        return result is not None and len(result) == 1
    
    @classmethod
    def create_dict_by_result(cls, result) -> 'User':
        if result:
            return {
                "id": result[0],
                "username": result[1],
                "avatar": result[2],
                "password": result[3],
            }
        else:
            raise ArgsError("No such user")

    @classmethod
    def by_id(cls, user_id) -> 'User':
        sql = 'select id, username, avatar, password from %s where id="%s"' % (cls.Table, user_id)
        results = Database.execute(sql)
        return cls.create_dict_by_result(results[0])
    
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
        sql = 'select id, username, avatar, password from %s where username="%s"' % (cls.Table, username)
        results = Database.execute(sql)
        return cls.create_dict_by_result(results[0])

    @classmethod
    def delete_by_user_id(cls, user_id) -> 'boolean':
        sql = 'delete from %s where id = %d' % (cls.Table, user_id)
        result = Database.execute(sql)
        return result is ()

    @classmethod
    def update_user_info(cls, user_id, username, password, avatar) -> 'bool':
        sql = 'select id, username, password, avatar from %s where id = %d' % (cls.Table, user_id)
        result = list(Database.execute(sql)[0])
        if len(result) != 4:
            raise DatabaseError('select user info fail')
        if username:
            result[1] = username
        if password:
            result[2] = password
        if avatar:
            result[3] = avatar
        update_user_info_sql = 'update %s set username="%s", password="%s", avatar="%s" where id=%d' % (cls.Table, result[1], result[2], result[3], result[0])
        update_result = Database.execute(update_user_info_sql)
        if update_result is ():
            return True
        else: 
            raise DatabaseError('update user info fail')

    @classmethod
    def friend_user(cls, user_id):
        sql = 'select id, username, avatar from %s' % (cls.Table)
        results = Database.execute(sql)
        final_result = []
        for result in results:
            final_result.append({
                "id": result[0],
                "username": result[1],
                "avatar": result[2],
            })
        return final_result
