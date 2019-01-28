#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import random
import string

def gen_random_string(num):
    return ''.join(random.sample(string.digits, num))
