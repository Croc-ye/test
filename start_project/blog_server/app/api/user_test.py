#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import unittest

import os, sys
lib_path = os.path.abspath(os.path.join('./app')) # python3 app/api/user_test.py
sys.path.append(lib_path)

from testing.api import ApiTest
from testing.database import DatabaseTest
from testing.util import gen_random_string

from models.user import User

class UserTest(ApiTest, DatabaseTest):
    mock_user = {
        "username": gen_random_string(10),
        "password": gen_random_string(10),
    }

    def setUp(self):
        super().setUp()
        u = User.load_or_create(self.mock_user.get("username"), self.mock_user.get("password"))
        self.user_id = u.id

    def tearDown(self):
        super().tearDown()
        User.delete_by_user_id(self.user_id)

    def test_login(self):
        """ Test /user/login/ """
        response = self.client.post(
                    '/user/login/',
                    content_type='multipart/form-data',
                    data={
                        "username": self.mock_user.get("username"),
                        "password": self.mock_user.get("password"),
                    },
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json().get("username"), self.mock_user.get("username"))

    def test_user_info(self):
        """ Test /user/info/<username>/ """
        response = self.client.get('/user/info/{}/'.format(self.mock_user.get("username")))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json().get('username'), self.mock_user.get("username"))

    def test_delete(self):
        """ Test /user/delete/ """
        with self.client.session_transaction() as session:
            user = User.load_or_create("test_username_1", "test_password_1")
            session['user_id'] = user.id
        response = self.client.get('/user/delete/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json().get("success"), "user alerady delete")

if __name__ == '__main__':
    unittest.main()
