#!/usr/bin/env python
# -*- coding: utf-8 -*-

# __author__ = 'yaphetsglhf'

from . import api
from ..models import db, Order, Category
import logging
from flask import request, jsonify
import time


@api.route('/test')
def get_result():
    res = Category.query.filter_by(id=1).first()
    logging.debug(res)
    return jsonify({
        "code": "success"
    })


# 横幅图片
@api.route('/swipers')
def get_swipers_images():
    return jsonify([
        {"id": 1, "url": "http://resource.kid17.com/hellopeach/app/static/pics/banners/swiper01.png"},
        {"id": 2, "url": "http://resource.kid17.com/hellopeach/app/static/pics/banners/swiper02.png"},
        {"id": 3, "url": "http://resource.kid17.com/hellopeach/app/static/pics/banners/swiper03.png"}
    ])


# 商品种类
@api.route('/brands')
def get_brands():
    product_lists = []
    res = Category.query.filter_by(is_del=0).all()

    for i in res:
        product = {"id": i.id, "url": i.cover_pic, "intro": i.name, "price": i.price}
        product_lists.append(product)

    return jsonify(product_lists)


# 商品详情页
@api.route('/goods')
def get_goods_detail():
    goods_id = request.args.get('id')
    logging.debug(goods_id)

    res = Category.query.filter_by(id=goods_id).first()
    swiper_pic = []

    for i in res.swiper_pic.split(','):
        swiper_pic.append({'surl': i})

    goods_detail = {
        "id": res.id,
        "intro": res.name,
        "price": res.price,
        "left": res.left,
        "swiperUrls": swiper_pic,
        "detail_pic": res.detail_pic
    }

    return jsonify(goods_detail)


# 获取购物车
@api.route('/cart', methods=['POST'])
def cart():
    create_time = int(time.time())
    order_id = str(create_time)
    data = request.get_json()
    this_order = Order(category_id=data['category_id'],
                       type=data['type'],
                       amount=data['amount'],
                       create_time=create_time,
                       order_id=order_id)

    res = Category.query.filter_by(id=data['category_id']).first()

    # 添加入订单后还剩多少
    Category.query.filter_by(id=data['category_id']).update({'left': res.left - data['amount']})

    db.session.add(this_order)
    db.session.commit()
    db.session.close()

    oid = Order.query.filter_by(order_id=order_id).first()
    print oid

    return jsonify({
        "code": "success",
        "data": {
            "orderId": oid.id
        }
    })


# 订单页
@api.route('/order')
def order():
    oid = request.args.get('id')
    uid = request.args.get('user_id')
    print oid
    this_order = Order.query.filter_by(id=oid).first()
    this_category = Category.query.filter_by(id=this_order.category_id).first()

    all_price = int(this_category.price) * int(this_order.amount)
    postage = 20
    real_price = all_price + postage

    # # 1表示没有地址,0表示有地址
    # if (this_order.address_id is None) or (this_order.address_id == ''):
    #     address_status = 1
    # else:
    #     address_status = 0

    return jsonify({
        "code": "success",
        "data": {
            "orderId": oid,
            "buyCount": this_order.amount,
            "name": this_category.name,
            "price": this_category.price,
            "thumbnail": this_category.cover_pic,
            "allPrice": all_price,
            "postage": postage,
            "realPrice": real_price
        }
    })
