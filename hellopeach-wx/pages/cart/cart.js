// pages/cart/cart.js
var app=getApp()

Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  toHomepage:function(){
    console.log("to homepage")
    wx.switchTab({
      url: '../index/index',
      success: function(res){
        // console.log("1")
        // success
      },
      fail: function() {
        // console.log('2')
        // fail
      },
      complete: function() {
        // console.log('3')
        // complete
      }
    })
  }
})