// pages/login/login.js
var common = require('../common/common.js')

Page({
    bindGetUserInfo: function(e) {
        var that = this
        if (e.detail.userInfo) {
            common.toLogin().then((res) => {
                var jump_type = that.data.type
                if (jump_type == 'switchTab'){
                    wx.switchTab({
                        url: that.data.back_url,
                        success: function (e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.onLoad();
                        }
                    })
                }else{
                    wx.navigateTo({
                        url: that.data.back_url,
                        success: function (e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.onLoad();
                        }
                    })
                }
                
            })
        }else{
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    }
                }
            })
        
        }
    },
    back(res){
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    onLoad: function(options) {
        if (options != undefined) {
            var back_url = options.back
            var jump_type = options.type
            this.setData({
                back_url: back_url,
                type: jump_type
            })
        }
    }
})