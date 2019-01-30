#!/usr/bin/env python3
# -*- coding: utf-8 -*-

def format_user_blog_id_key(user_id: int) -> 'str':
    return "REDIS_USER_BLOG_ID_KEY:{}".format(str(user_id))

def format_user_love_value_key(user_id: int, username: str, user_blog_id: int) -> 'str':
    return "REDIS_USER_LOVE_BLOG_KEY:{}:{}:{}".format(str(user_id), username, str(user_blog_id))

def format_latest_comment_key(username: str) -> 'str':
    return "REDIS_LATEST_COMMENT_KEY:{}".format(username)
