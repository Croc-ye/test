#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .test_base import BaseTest
from server import app

class ApiTest(BaseTest):
    def setUp(self):
        super().setUp()
        self.client = app.test_client()
        app.config["Testing"] = True

    def tearDown(self):
        super().tearDown()
