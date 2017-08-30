#!/usr/bin/env python
# -*- coding: utf-8 -*-

# __author__ = 'yaphetsglhf'

from flask import Blueprint

api = Blueprint('api', __name__)

from . import views