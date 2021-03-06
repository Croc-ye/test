#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .db_base import Database
from .user_dao import UserDAO
from lib.logger import log
from lib.errors.expection import ArgsError, UnknownError
from ..cache.redis import Redis
import json

class BlogDAO:
    Table = 'blog'
    @classmethod
    def write_blog(cls, user_id, title, content) -> 'int':
        user_blog_id = Redis.get_user_blog_id(user_id)
        sql = "insert into %s(user_id, user_blog_id, title, content) values(%d, %d, '%s', '%s')" % (cls.Table, user_id, user_blog_id, title, content)
        result = Database.execute(sql)
        if result is ():
            return user_blog_id
        else:
            raise UnknownError('write_blog error')

    @classmethod
    def get_blog(cls, username, user_blog_id) -> 'truple':
        user_id = UserDAO.get_user_id_by_username(username)
        sql = 'select title, content, comment, love, create_time from %s where user_id=%d and user_blog_id=%d' % (cls.Table, user_id, user_blog_id)
        results = Database.execute(sql)
        if results is not None and len(results) == 1:
            return {
                "title": json.loads(results[0][0]),
                "content": json.loads(results[0][1]),
                "comment": results[0][2],
                "love": results[0][3],
                "create_time": results[0][4],
            }
        else:
            raise ArgsError('no such blog')

    @classmethod
    def get_all_blog(cls, username) -> 'truple':
        user_id = UserDAO.get_user_id_by_username(username)
        sql = 'select user_blog_id, title, content, comment, love, create_time from %s where user_id=%d order by user_blog_id desc' % (cls.Table, user_id)
        results = Database.execute(sql)
        final_result = []
        for result in results:
            final_result.append({
                "user_blog_id": result[0],
                "title": json.loads(result[1]),
                "content": json.loads(result[2]),
                "comment": result[3],
                "love": result[4],
                "create_time": result[5],
            })
        return final_result

    @classmethod
    def get_max_blog_id_by_user_id(cls, user_id):
        sql = 'select max(user_blog_id) from %s where user_id="%s"' % (cls.Table, user_id)
        reduslt = Database.execute(sql)
        if result is not None and len(result) == 1:
            return result[0][0]
        else:
            return 0

    @classmethod
    def delete_by_user_blod_id(cls, user_id, user_blog_id):
        sql = 'delete from %s where user_id = %d and user_blog_id = %d' % (cls.Table, user_id, user_blog_id)
        result = Database.execute(sql)
        return result is ()

    @classmethod
    def add_comment_for_blog(cls, username, user_blog_id, comment_id):
        user_id = UserDAO.get_user_id_by_username(username)
        sql = 'select comment from %s where user_id=%d and user_blog_id=%d' % (cls.Table, user_id, user_blog_id)
        result = Database.execute(sql)
        if result is ():
            raise ArgsError('no such blog can comment')
        comment = result[0][0] or ""
        comment += "{},".format(comment_id)
        sql = 'update %s set comment="%s" where user_id=%d and user_blog_id=%d' % (cls.Table, comment, user_id, user_blog_id)
        result = Database.execute(sql)
        return result is ()

    @classmethod
    def love_blog(cls, username, user_blog_id, value):
        user_id = UserDAO.get_user_id_by_username(username)
        sql = 'update %s set love=love+"%d" where user_id=%d and user_blog_id=%d' % (cls.Table, value, user_id, user_blog_id)
        result = Database.execute(sql)
        return result is ()

    @classmethod
    def search_blog(cls, username, search_key_word):
        user_id = UserDAO.get_user_id_by_username(username)
        sql = 'select user_blog_id, title, content, comment, love, create_time, user_id from %s where user_id=%d and title like "%%%s%%" order by create_time desc limit 10' % (cls.Table, user_id, search_key_word)
        results = Database.execute(sql)
        final_result = []
        for result in results:
            final_result.append({
                "user_blog_id": result[0],
                "title": json.loads(result[1]),
                "content": json.loads(result[2]),
                "comment": result[3],
                "love": result[4],
                "create_time": result[5],
                "user_id": result[6],
            })
        return final_result

    @classmethod
    def latest_blogs(cls):
        sql = 'select user_blog_id, title, content, comment, love, create_time, user_id from %s order by create_time desc limit 10' % (cls.Table)
        results = Database.execute(sql)
        final_result = []
        for result in results:
            final_result.append({
                "user_blog_id": result[0],
                "title": json.loads(result[1]),
                "content": json.loads(result[2]),
                "comment": result[3],
                "love": result[4],
                "create_time": result[5],
                "user_id": result[6],
            })
        return final_result
