// pages/address/address.js
Page({
  data:{
    phone: '',
    userName: '',
    address: '',
    code: '',
    toastHidden: true,
    toastText: ''
  },
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
  listenUser:function(e){
    var that = this
    that.data.userName = e.detail.value
    console.log(that.data.userName)
  },
  listenPhone:function(e){
    var that = this
    that.data.phone = e.detail.value
    console.log(that.data.userName)
  },
  listenAddress:function(e){
    var that = this
    that.data.code = e.detail.value
  },
  addAddress:function(){
    var that = this
    
    if(that.data.userName == ''){
      that.setData({
        toastHidden: false,
        toastText: '名字不能为空'
      }),
      setTimeout(function(){
        that.setData({
          toastHidden: true,
          toastText: ''
        })
      }, 2000)
    }
    else if(that.data.phone == ''){
      that.setData({
        toastHidden: false,
        toastText: '手机号不能为空'
      }),
      setTimeout(function(){
        that.setData({
          toastHidden: true,
          toastText: ''
        })
      }, 2000)
    }
    else if(that.data.address == ''){
      that.setData({
        toastHidden: false,
        toastText: '详细地址不能为空'
      }),
      setTimeout(function(){
        that.setData({
          toastHidden: true,
          toastText: ''
        })
      }, 2000)
    }
    else if(that.data.code == ''){
      that.setData({
        toastHidden: false,
        toastText: '邮政编码不能为空'
      }),
      setTimeout(function(){
        that.setData({
          toastHidden: true,
          toastText: ''
        })
      }, 2000)
    }
    else{
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
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
  }
})