#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from models.storage.database.user_dao import UserDAO
from lib.logger.logger import log
from lib.errors.expection import ArgsError, DatabaseError

class User:
    Table = 'user'
    def __init__(self, user_id='-1', username='', avatar=''):
        super()
        self.user_id = user_id
        self.username = username
        self.avatar = avatar

    @classmethod
    def load_or_create(cls, username, password) -> 'User':
        result = UserDAO.load_or_create(username, password)
        return cls(user_id=result[0], username=result[1], avatar=result[2])

    @classmethod
    def load(cls, username, password) -> 'User':
        result = UserDAO.load(username, password)
        return cls(user_id=result[0], username=result[1], avatar=result[2])

    @classmethod
    def create(cls, username, password) -> 'User':
        result = UserDAO.create(username, password)
        return cls(user_id=result[0], username=result[1], avatar=result[2])        

    @classmethod 
    def user_exist(cls, username) -> 'bool':
        return UserDAO.user_exist(username)
    
    @classmethod
    def by_id(cls, user_id) -> 'User':
        result = UserDAO.by_id(user_id)
        return cls(user_id=result[0], username=result[1], avatar=result[2])
    
    @classmethod
    def get_user_id_by_username(cls, username) -> 'int':
        return UserDAO.get_user_id_by_username(username)

    @classmethod
    def by_username(cls, username) -> 'User':
        result = UserDAO.by_username(username)
        return cls(user_id=result[0], username=result[1], avatar=result[2])    

    @classmethod
    def delete_by_user_id(cls, user_id) -> 'boolean':
        return UserDAO.delete_by_user_id(user_id)

    def friend_user(self):
        results = UserDAO.friend_user(self.user_id)
        final_result = []
        for result in results:
            final_result.append(
                User(user_id = result[0], username = result[1], avatar = result[2])
            )
        return final_result

    def update_user_info(self):
        return UserDAO.update_user_info(self.user_id, self.username, "", self.avatar)

    def to_json(self):
        return {
            'username': self.username,
            'avatar': self.avatar
        }
