#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .user import User
from .storage.database.comment_dao import CommentDAO
from lib.logger import log
from lib.errors.expection import ArgsError, DatabaseError
from .storage.cache.redis import Redis
import json

class Comment:

    def __init__(self, id, user, comment):
        self.id = id
        self.user = user
        self.comment = comment

    @classmethod
    def converDataToCommentObj(cls, result):
        return cls(
            id=result.get("id"),
            user=User.by_id(result.get("user_id")),
            comment=result.get("comment"),
        )

    @classmethod
    def insert_comment(cls, user_id, content) -> 'int':
        return CommentDAO.insert_comment(user_id, content)

    @classmethod
    def by_id(cls, comment_id) -> 'Comment':
        result = CommentDAO.select_comment_by_id(comment_id)
        return cls.converDataToCommentObj(result)

    @classmethod
    def get_one_blog_comment(cls, comment_list: str) -> 'Comment list':
        comment_list = comment_list[:-1].split(",")
        results = CommentDAO.get_one_blog_comment(comment_list)
        final_result = []
        for result in reversed(results):
            final_result.append(cls.converDataToCommentObj(result))
        return final_result

    @classmethod
    def latest_comment(cls, username):
        latest_comment_id_list = Redis.get_latest_comment(username)
        final_result = []
        for comment_dict in reversed(latest_comment_id_list):
            comment_obj = cls.get_one_blog_comment("{},".format(comment_dict.get("comment_id")))[0]
            result = {
                "username": comment_obj.user.username,
                "comment": comment_obj.comment,
                "user_blog_id": comment_dict.get("user_blog_id"),
            }
            final_result.append(result)
        return final_result

    def to_json(self):
        return {
            "user": self.user.to_json(),
            "comment": self.comment,
        }
