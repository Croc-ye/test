#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .user import User
from .storage.database.comment_dao import CommentDAO
from lib.logger.logger import log
from lib.errors.expection import ArgsError, DatabaseError
import json

class Comment:

    def __init__(self, user, comment):
        super()
        self.user = user
        self.comment = comment

    @classmethod
    def insert_comment(cls, user_id, content) -> 'int':
        return CommentDAO.insert_comment(user_id, content)

    @classmethod
    def by_id(cls, comment_id) -> 'Comment':
        result = CommentDAO.by_id(comment_id)
        return cls(result[0], result[1])

    @classmethod
    def get_comment(cls, comment_list: str) -> 'Comment list':
        comment_list = comment_list[:-1].split(",")
        results = CommentDAO.get_comment(comment_list)
        final_result = []
        for result in results:
            final_result.append(cls(
                user=User.by_id(result[0]),
                comment=result[1]
            ))
        return final_result

    def to_json(self):
        return {
            "user": self.user.to_json(),
            "comment": json.loads(self.comment),
        }
