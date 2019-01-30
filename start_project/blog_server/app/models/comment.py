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
        results = CommentDAO.get_one_blog_comment(comment_list)
        final_result = []
        for result in results:
            final_result.append(cls.converDataToCommentObj(result))
        return final_result

    @classmethod
    def latest_comment(cls, username):
        latest_comment_obj_list = Redis.get_latest_comment_id_list(username)
        comment_id_list = []
        user_blog_id_list = []
        for comment_dict in reversed(latest_comment_obj_list):
            comment_id_list.append(comment_dict.get("comment_id"))
            user_blog_id_list.append(comment_dict.get("user_blog_id"))

        comments = cls.get_one_blog_comment(comment_id_list)
        final_result = []
        for idx in range(0, len(comments)):
            result = {
                "username": comments[idx].user.username,
                "comment": comments[idx].comment,
                "user_blog_id": user_blog_id_list[idx],
            }
            final_result.append(result)
        return final_result

    def to_json(self):
        return {
            "user": self.user.to_json(),
            "comment": self.comment,
        }
