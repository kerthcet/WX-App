//index.js
//获取应用实例
var config = require('../../config.js')
var app = getApp()

Page({
    data: {
       indicatorDots: true,
       vertical: false,
       autoplay: true,
       interval: 3000,
       duration: 1000,
       imageUrls: ''
    },

    swiperChange: function(){
    },

    onLoad: function(){
        var that = this

        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

        wx.request({
          url: config.BASE_URL + 'swipers',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'Accept': 'application/json'
          }, // 设置请求的 header
          success: function(res){
            that.setData({
                imageUrls: res.data
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })

        wx.request({
          url: config.BASE_URL + 'brands',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'Accept': 'application/json'
          }, // 设置请求的 header
          success: function(res){
            that.setData({
                brandUrls: res.data
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    toDetails:function(e){
        var id = e.currentTarget.id

        wx.navigateTo({
            // url: '../details/details',
          url: '../details/details?id=' + id,
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
})