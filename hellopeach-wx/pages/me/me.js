var app  = getApp()
Page({
    data: {
        userInfo: {}
    },
    
    onLoad: function(){
        var that = this
        app.getUserInfo(function(userInfo){
            that.setData({
                userInfo: userInfo
            })
        })
    },
    jumpQuestion:function(){
        wx.navigateTo({
          url: '../questions/questions',
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
    },
    jumpAddress:function(){
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