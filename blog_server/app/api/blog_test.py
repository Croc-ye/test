#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import unittest

import os, sys
lib_path = os.path.abspath(os.path.join('./app')) # python3 app/api/user_test.py
sys.path.append(lib_path)

from testing.api import ApiTest
from testing.database import DatabaseTest
from testing.util import gen_random_string

from db.models.user import User

class BlogTest(ApiTest, DatabaseTest):
    mock_blog = {
        "title": gen_random_string(10),
        "content": gen_random_string(10),
    }

    def setUp(self):
        super().setUp()

    def tearDown(self):
        super().tearDown()

    def test_write_blog(self):
        """ Test /blog/write_blog/ """
        with self.client.session_transaction() as session:
            user = User.load_or_create("test_username_1", "test_password_1")
            session['user_id'] = user.user_id
        response = self.client.post(
                    '/blog/write_blog/',
                    content_type='multipart/form-data',
                    data={
                        "title": self.mock_blog.get("title"),
                        "content": self.mock_blog.get("content"),
                    },
        )
        self.assertEqual(response.status_code, 200)
        get_blog = self.client.get(
                    '/blog/get_blog/test_username_1/{}'.format(response.get_json().get("user_blog_id"))
        )
        self.assertEqual(get_blog.status_code, 200)
        self.assertEqual(get_blog.get_json().get("title"), self.mock_blog.get("title"))
        self.assertEqual(get_blog.get_json().get("content"), self.mock_blog.get("content"))

if __name__ == '__main__':
    unittest.main()
