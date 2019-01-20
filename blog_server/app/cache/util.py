#!/usr/bin/env python3
# -*- coding: utf-8 -*-

def format_user_blog_id_key(user_id: int) -> 'str':
    return "REDIS_USER_BLOG_ID_KEY:{}".format(str(user_id))

def format_user_avatar_key(user_id: int) -> 'str':
    return "REDIS_USER_AVATAR_KEY:{}".format(str(user_id))
