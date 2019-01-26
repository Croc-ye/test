#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys

class logger():
    def __init__(self):
        pass
    
    def info(self, msg):
        print(msg, file=sys.stdout)

    def error(self, msg):
        print(msg, file=sys.stderr)

log = logger()
