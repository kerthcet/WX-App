var config = require('../../config.js')
var app = getApp()

// pages/order/order.js
Page({
  data:{
    orderInfo: ''
  },
  onLoad:function(options){
    console.log("orderId" ,app.globalData.orderId)
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: config.ORDER_URL + app.globalData.orderId,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        that.setData({
          orderInf: res.data.data
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
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  addAddress:function(){
    wx.navigateTo({
      url: '../address/address',
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