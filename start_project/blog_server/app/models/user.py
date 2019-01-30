#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from models.storage.database.user_dao import UserDAO
from lib.logger import log
from lib.errors.expection import ArgsError, DatabaseError

class User:
    Table = 'user'
    def __init__(self, id='-1', username='', avatar='', password=''):
        self.id = id
        self.username = username
        self.avatar = avatar
        self.password = password

    @classmethod
    def converDataToUserObj(cls, result):
        return cls(
            id=result.get("id"),
            username=result.get("username"),
            avatar=result.get("avatar"),
            password=result.get("password"),
        )

    @classmethod
    def load_or_create(cls, username, password) -> 'User':
        result = UserDAO.load_or_create(username, password)
        return cls.converDataToUserObj(result)

    @classmethod
    def load(cls, username, password) -> 'User':
        result = UserDAO.load(username, password)
        return cls.converDataToUserObj(result)

    @classmethod
    def create(cls, username, password) -> 'User':
        result = UserDAO.create(username, password)
        return cls.converDataToUserObj(result)

    @classmethod 
    def user_exist(cls, username) -> 'bool':
        return UserDAO.user_exist(username)
    
    @classmethod
    def by_id(cls, id) -> 'User':
        result = UserDAO.by_id(id)
        return cls.converDataToUserObj(result)
    
    @classmethod
    def get_user_id_by_username(cls, username) -> 'int':
        return UserDAO.get_user_id_by_username(username)

    @classmethod
    def by_username(cls, username) -> 'User':
        result = UserDAO.by_username(username)
        return cls.converDataToUserObj(result)  

    @classmethod
    def delete_by_user_id(cls, id) -> 'boolean':
        return UserDAO.delete_by_user_id(id)

    def friend_user(self):
        results = UserDAO.friend_user(self.id)
        final_result = []
        for result in results:
            final_result.append(
                User.converDataToUserObj(result)
            )
        return final_result

    def update_user_info(self):
        return UserDAO.update_user_info(self.id, self.username, "", self.avatar)

    def to_json(self):
        return {
            'username': self.username,
            'avatar': self.avatar
        }
