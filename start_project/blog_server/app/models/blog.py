#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from lib.logger.logger import log
from lib.errors.expection import ArgsError, UnknownError
from .storage.cache.redis import Redis
from .storage.database.blog_dao import BlogDAO
import json

class Blog:
    def __init__(self, user_blog_id, title=None, content=None, comment=None, love=None, create_time=None):
        self.user_blog_id = user_blog_id
        self.title = title
        self.content = content
        self.comment = comment
        self.love = love
        self.create_time = str(create_time)

    @classmethod
    def write_blog(cls, user_id, title, content) -> 'Blog':
        user_blog_id = BlogDAO.write_blog(user_id, title, content)
        return cls(user_blog_id)

    @classmethod
    def get_blog(cls, username, user_blog_id) -> 'Blog':
        result = BlogDAO.get_blog(username, user_blog_id)
        return cls("", result[0], result[1], result[2], result[3], result[4])

    @classmethod
    def get_all_blog(cls, username) -> 'Blog truple':
        results = BlogDAO.get_all_blog(username)
        final_result = []
        for result in results:
            final_result.append(cls(
                user_blog_id = result[0],
                title = result[1],
                content = result[2],
                comment = result[3],
                love = result[4],
                create_time = result[5],
            ))
        return final_result

    @classmethod
    def get_max_blog_id_by_user_id(cls, user_id) -> 'int':
        return BlogDAO.get_max_blog_id_by_user_id(user_id)

    @classmethod
    def delete_by_user_blod_id(cls, user_id, user_blog_id) -> 'bool':
        return BlogDAO.delete_by_user_blod_id(user_id, user_blog_id)

    @classmethod
    def add_comment_for_blog(cls, username, user_blog_id, comment_id) -> 'bool':
        return BlogDAO.add_comment_for_blog(username, user_blog_id, comment_id)

    @classmethod
    def love_blog(cls, user_id, username, user_blog_id) -> 'int':
        value = Redis.get_user_love_value(user_id, username, user_blog_id)
        if BlogDAO.love_blog(username, user_blog_id, value):
            return value
        else:
            raise UnknownError('love article error')

    @classmethod
    def search_blog(cls, username, search_key_word):
        results = BlogDAO.search_blog(username, search_key_word)
        final_result = []
        for result in results:
            final_result.append(cls(user_blog_id=result[0], title=result[1], content=result[2], comment=result[3], love=result[4]))
        return final_result

    def to_json(self):
        return {
            "user_blog_id": self.user_blog_id,
            "title": json.loads(self.title) if self.title else self.title,
            "content": json.loads(self.content) if self.content else self.content,
            "comment": self.comment,
            "love": self.love,
            "create_time": self.create_time,
        }
