var config = require('../../config.js')
var app = getApp()
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        animationData: {},
        modalStatus: 0,
        buyCount: 1,
        toastHidden: true,
        toastText: '',
        detailInfo: ''
    },
    onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var page_id = options.id
    app.globalData.pageId = page_id
    this.getGoodsList(page_id)
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
    getGoodsList:function(page_id){
        var that = this
        wx.request({
          url: config.GOODS_URL + page_id,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            that.setData({
                detailInfo: res.data
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

    putInCart:function(){
        var that = this
        var animation = wx.createAnimation({
          duration: 400,
          timingFunction: 'linear', 
          delay: 0,
          transformOrigin: '50% 50% 0'
        })
        that.animation = animation
        animation.step()
        that.setData({
            modalStatus: 1,
            animationDate: animation.export()
        })
    },

    buyNow:function(){
        var that = this
        var animation = wx.createAnimation({
          duration: 400,
          timingFunction: 'linear',
          delay: 0,
          transformOrigin: '50% 50% 0'
        })
        that.animation = animation
        animation.step()
        that.setData({
            modalStatus: 2,
            animationData: animation.export()
        })
    },

    putInCart_2:function(){
        // console.log(app.globalData.pageId)
        var that = this
        var buyCount = that.data.buyCount   
        var left_acount = that.data.detailInfo.left

        if(left_acount <= 0){
            that.setData({
                toastHidden: false,
                toastText: '不好意思，售完啦'
            }),
            setTimeout(function(){
                that.setData({
                    toastHidden: true,
                    toastText: '',
                    buyCount: 1
                })
            }, 2000)
        }
        else{
            wx.request({
                url: config.BASE_URL + 'cart',
                data: {
                    'amount': buyCount,
                    'type': 1,
                    'category_id': app.globalData.pageId
                },
                method: 'POST',
                success: function(res){
                that.backToDetail()
                },
                fail: function() {
                // fail
                },
                complete: function() {
                //   console.log("sss")
                    that.setData({
                        toastHidden: false,
                        toastText: "加入购物车成功",
                        buyCount: 1
                    }),
                    setTimeout(function(){
                        that.setData({
                            toastHidden: true,
                            toastText: ""
                        })
                    }, 2000)
                }
            })
        }
    },

    buyNow_2:function(){
        var that = this
        var buyCount = that.data.buyCount
        var left_acount = that.data.detailInfo.left

        if(left_acount <= 0){
            that.setData({
                toastHidden: false,
                toastText: '不好意思，售完啦'
            }),
            setTimeout(function(){
                that.setData({
                    toastHidden: true,
                    toastText: '',
                    buyCount: 1
                })
            }, 2000)
        }
        else{
            wx.request({
                url: config.BASE_URL + 'cart',
                data: {
                    'amount': buyCount,
                    'type': 2,
                    'category_id': app.globalData.pageId
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function(res){
                    console.log(res)
                    app.globalData.orderId = res.data.data.orderId
                },
                fail: function() {
                // fail
                },
                complete: function() {
                // complete
                }
            }),

            wx.navigateTo({
              url: '../order/order',
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
    },

    buyCountAdd:function(e){
        var that = this
        var leftCount = e.currentTarget.dataset.left_acount
        var buyCount = that.data.buyCount

        console.log("leftCount", leftCount)
        if(buyCount == leftCount || leftCount <= 0){
            that.setData({
                toastHidden: false,
                toastText: "购买数量不能超过库存"
            }),
            setTimeout(function(){
                that.setData({
                    toastHidden: true,
                    toastText: ''
                })
            }, 2000)
        }
        else{
            that.setData({
            buyCount: buyCount + 1
        })
        }
    },

    buyCountMinus:function(e){
        var that = this
        var buyCount = that.data.buyCount

        if(buyCount == 1){
            that.setData({
                toastHidden: false,
                toastText: "购买数量不能少于1"
            }),
            setTimeout(function(){
                that.setData({
                    toastHidden: true,
                    toastText: ''
                })
            }, 2000)
        }
        else{
            that.setData({
                buyCount: buyCount - 1
            })
        }
    },

    backToDetail:function(){
        var that = this
        var animation = wx.createAnimation({
          duration: 400,
          timingFunction: 'linear',
          delay: 0,
          transformOrigin: '50% 50% 0'
        })
        that.animation = animation
        animation.translateY(0).step()
        that.setData({
            modalStatus: 0,
            animationData: animation.export()
        })
    }
})