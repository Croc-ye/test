#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from testing.util import gen_random_string

class Redis:
    def __init__(self):
        pass

    @classmethod
    def get_user_blog_id(self, user_id):
        return gen_random_string(5)
