#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .db_base import Database
from .user import User
from logger.logger import log
from errors.expection import ArgsError, UnknownError
from redis.redis import Redis

class Blog:
    Table = 'blog'
    def __init__(self, user_blog_id, title, content, comment, love):
        self.user_blog_id = user_blog_id
        self.title = title
        self.content = content
        self.comment = comment
        self.love = love

    @classmethod
    def write_blog(cls, user_id, title, content) -> 'boolean':
        user_blog_id = Redis.get_user_blog_id(user_id)
        sql = 'insert into %s(user_id, user_blog_id, title, content) values(%d, %d, "%s", "%s")' % (cls.Table, user_id, int(user_blog_id), title, content)
        result = Database.execute(sql)
        if result is ():
            return cls(user_blog_id, "", "", "", "")
        else:
            raise UnknownError('write_blog error')

    @classmethod
    def get_blog(cls, username, user_blog_id):
        user_id = User.get_user_id_by_username(username)
        sql = 'select title, content, comment, love from %s where user_id=%d and user_blog_id=%d' % (cls.Table, user_id, int(user_blog_id))
        result = Database.execute(sql)
        # TODO: Redis to make sure result_len = 1
        if result is not None and len(result) == 1:
            return cls("", result[0][0], result[0][1], result[0][2], result[0][3])
        else:
            raise ArgsError('no such blog')

    @classmethod
    def get_all_blog(cls, username) -> 'truple':
        user_id = User.get_user_id_by_username(username)
        sql = 'select user_blog_id, title, content, comment, love from %s where user_id=%d order by user_blog_id desc' % (cls.Table, user_id)
        results = Database.execute(sql)
        final_result = []
        for result in results:
            final_result.append(cls(
                user_blog_id=result[0],
                title=result[1],
                content=result[2],
                comment=result[3],
                love=result[4],
            ))

        return final_result

    def to_json(self):
        return {
            "user_blog_id": self.user_blog_id,
            "title": self.title,
            "content": self.content,
            "comment": self.comment,
            "love": self.love,
        }
