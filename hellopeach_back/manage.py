#!/usr/bin/env python
# -*- coding:utf-8 -*-

# __author__ = 'yaphetsglhf'

from app import create_app
from flask_script import Manager, Server


# Note: 几个要改的数据库,manage.py config.py里面的mongodb, iBook_zip 里面的mysql地址

# 初始化app
myapp = create_app('localhost')
# manager = Manager(myapp)
# manager.add_command('runserver', Server(host='0.0.0.0'))

if __name__ == '__main__':
    myapp.run()   # python manager.py runserver  Manager(app)方法 详见https://my.oschina.net/lijsf/blog/158828
