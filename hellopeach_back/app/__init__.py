#!/usr/bin/evn python
# -*- coding: utf-8 -*-

# __author__ = 'yaphetsglhf'

from flask import Flask
import logging
import sys
from flask_sqlalchemy import SQLAlchemy

sys.path.append('..')
from config import LogConfig
from config import config


# 日志初始化 debug用来调试,info用来输出信息,error记录错误,调试完毕,json里面将debug改为info
LogConfig.log_init()
db = SQLAlchemy()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)   # 继承的静态方法,区别于flask自带init_app方法,用于扩展。作用详见https://segmentfault.com/q/1010000003050323

    db.init_app(app)

    logging.debug("self init_app function")

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    return app