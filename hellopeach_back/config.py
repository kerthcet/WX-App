#!/usr/bin/env python
# -*- coding:utf-8 -*-

# __author__ = 'yaphetsglhf'

import logging.config
import os
import json


class LogConfig(object):
    json_path = os.path.dirname(os.path.abspath(__file__)) + '/logging.json'

    @staticmethod
    def log_init(
            default_path=json_path,
            default_level=logging.INFO,
            env_key='LOG_CFG'):

        path = default_path
        value = os.getenv(env_key, None)

        if value:
            path = value

        if os.path.exists(path):
            with open(path, 'rt') as f:
                cfg = json.load(f)
            logging.config.dictConfig(cfg)
        else:
            logging.basicConfig(level=default_level)


class Config(object):
    SECRET_KEY = 'iPeachglhf'
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    # 自己定义的方法,只是没有写具体方法
    @staticmethod
    def init_app(app):
        pass


class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = ''


class OfficialConfig(Config):
    pass


class LocalhostConfig(Config):
    SQLALCHEMY_DATABASE_URI = ''

config = {'test': TestConfig,
          'official': OfficialConfig,
          'localhost': LocalhostConfig
          }
