#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import g, session, make_response, request
import functools
from logger.logger import log
from errors.expection import ArgsError

"""
    load user from cookies
"""
def parse_user():
    def decorator(func):
        @functools.wraps(func)
        def wrapper_func(*args, **kwargs):
            user_id = session.get('user_id')
            if user_id:
                g.user_id = user_id
            else:
                raise ArgsError('Require login')
            return func(*args, **kwargs)
        return wrapper_func
    return decorator

"""
    set Access-Control-Allow
"""
def parse_access(allow_origin = "*", allow_methods = "PUT,GET,POST,DELETE,OPTIONS", allow_headers = "Referer,Accept,Origin,User-Agent,Content-Type"):
    def decorator(func):
        @functools.wraps(func)
        def wrapper_func(*args, **kwargs):
            resp = make_response(func(*args, **kwargs))
            resp.headers['Access-Control-Allow-Origin'] = request.headers.get('Origin')
            resp.headers['Access-Control-Allow-Methods'] = allow_methods
            resp.headers['Access-Control-Allow-Headers'] = allow_headers
            resp.headers['Access-Control-Allow-Credentials'] = "true" # allow send cookies
            return resp
        return wrapper_func
    return decorator

"""
    parse args from request
"""
def parse_args(args_name=[]):
    def decorator(func):
        @functools.wraps(func)
        def wrapper_func(*args, **kwargs):
            g.args = {}
            for value in args_name:
                if request.form.get(value) and request.args.get(value):
                    raise ArgsError('Require diff args name from post and get, args: {}'.format(value))
                g.args[value] = request.args.get(value) or request.form.get(value)
                if not g.args[value]:
                    raise ArgsError('Require args {}'.format(value))
            return func(*args, **kwargs)
        return wrapper_func
    return decorator
