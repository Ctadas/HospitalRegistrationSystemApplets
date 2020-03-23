// pages/userson/userson.js
var common = require('../common/common.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    touserchild: function() {
        wx.navigateTo({
            url: '/pages/userchild/userchild'
        })
    },
    topast: function() {
        wx.navigateTo({
            url: '/pages/past/past'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        wx.checkSession({
            success(res) {
                wx.getSetting({
                    success(res) {
                        common.get_use_info(that)
                        wx.getStorage({
                            key: 'openid',
                            success(res) {
                                wx.request({
                                    url: 'http://localhost:8000/get_VisitCard/',
                                    data: {
                                        'openid': res.data
                                    },
                                    success(res) {
                                        that.setData({
                                            visit_card_list: res.data
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            },
            fail(res) {
                wx.redirectTo({
                    url: "/pages/login/login?back=/pages/userson/userson&&type=switchTab",
                    }
                )
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
})