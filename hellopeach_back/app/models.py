#!usr/bin/env python
# -*- coding: utf-8 -*-

from sqlalchemy import BigInteger, Column, DateTime, Index, Integer, Numeric, String, Text, text, Boolean
from . import db


class Order(db.Model):
    __tablename__ = 'order'

    id = Column(Integer, primary_key=True)
    category_id = Column(Integer)
    amount = Column(Integer)
    is_del = Column(Integer)
    type = Column(Integer)
    address_id = Column(String(256))
    create_time = Column(Integer)
    order_id = Column(String(20))
    user_id = Column(Integer)

    def __repr__(self):
        return '<Order (%r, %r, %r, %r, %r, %r, %r, %r, %r)>' % \
               (self.id, self.category_id, self.amount, self.is_del, self.type, self.address_id,
                self.create_time, self.order_id, self.user_id)


class Category(db.Model):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True)
    name = Column(String(128))
    price = Column(Integer)
    is_del = Column(Integer, server_default=text("'0'"))
    left = Column(Integer)
    cover_pic = Column(String(128))
    swiper_pic = Column(String(1000))
    detail_pic = Column(String(128))

    def __repr__(self):
        return '<Category (%r, %r, %r, %r, %r, %r, %r, %r)>' % (
            self.id, self.name, self.price, self.is_del, self.left, self.cover_pic, self.swiper_pic, self.detail_pic)


class Address(db.Model):
    __tablename__ = 'address'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    name = Column(String(64))
    phone = Column(String(11))
    specific = Column(String(128))
    postcode = Column(String(6))
    is_del = Column(Integer)

    def __repr__(self):
        return '<Address (%r, %r, %r, %r, %r, %r, %r)>' % (
            self.id, self.user_id, self.name, self.phone, self.specific, self.postcode, self.is_del
        )


class User(db.Model):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(64))
    is_del = Column(Integer)

    def __repr__(self):
        return '<User (%r, %r, %r)>' % (self.id, self.name, self.is_del)