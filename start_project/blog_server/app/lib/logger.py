#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
from config import config
import time
from flask import g, request
import logging.handlers

class Logger:
    def __init__(self):
        self.info_logger = self.get_logger('INFO')
        self.error_logger = self.get_logger('ERROR')

    def get_logger(self, logger_name):
        handler = logging.handlers.TimedRotatingFileHandler(
                        config.LOGGER.CONFIG[logger_name]['log_file'],
                        interval=config.LOGGER.CONFIG[logger_name]['interval'],
                        when=config.LOGGER.CONFIG[logger_name]['when'],
                        backupCount=config.LOGGER.CONFIG[logger_name]['backup_count'],
                        encoding=config.LOGGER.CONFIG[logger_name]['encoding']
                    )
        formatter = logging.Formatter(config.LOGGER.CONFIG[logger_name]['formatter'])
        handler.setFormatter(formatter)
        logger = logging.getLogger(config.LOGGER.CONFIG[logger_name]['logger_name'])
        logger.addHandler(handler)
        logger.setLevel(logging.DEBUG)
        return logger

    def info(self, msg):
        self.info_logger.info(msg)

    def error(self, msg):
        self.error_logger.error(msg)

log = Logger()


def start_request():
    log.info("{}: {}".format(str(request.method), str(request.path)))
    log.info("GET参数：" + str(request.args))
    log.info("POST参数：" + str(request.form))
    g.request_start_time = time.time()

def finish_request(respone):
    log.info("total use time: %.3f\n" % (time.time() - g.request_start_time))
    return respone
