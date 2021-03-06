#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .db_base import Database
from .user_dao import UserDAO
from lib.logger import log
from lib.errors.expection import ArgsError, DatabaseError
import json

class CommentDAO:
    Table = 'comment'

    @classmethod
    def insert_comment(cls, user_id, content) -> 'int':
        sql = "insert into %s(user_id, comment) values(%d, '%s')" % (cls.Table, user_id, content)
        Database.execute(sql)
        last_insert_id = Database.get_last_insert_id()
        return last_insert_id

    @classmethod
    def select_comment_by_id(cls, comment_id):
        sql = 'select id, user_id, comment from %s where id=%d' % (cls.Table, int(comment_id))
        result = Database.execute(sql)
        if result is ():
            raise ArgsError('no such comment')
        return {
            "id": result[0][0],
            "user_id": result[0][1],
            "comment": json.loads(result[0][2]),
        }

    @classmethod
    def get_one_blog_comment(cls, comment_list: str):
        result = []
        for comment_id in comment_list:
            comment = cls.select_comment_by_id(comment_id)
            result.append(comment)
        return result
