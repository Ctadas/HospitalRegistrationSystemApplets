// pages/registered_record/registered_record.js
import {
    $wuxToast
} from '../../wudist/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show_info: false
    },
    radio_change(res) {
        this.setData({
            visit_card_radio: res.detail.value,
        })
    },
    // formSubmit(res) {
    //     var that = this
    //     if (res.detail.value['visit_card_id']) {
    //         var visitcard_id = res.detail.value['visit_card_id']
    //         wx.navigateTo({
    //             url: '/pages/registered_record_info/registered_record_info?card_id=' + visitcard_id,
    //         })
    //     } else {
    //         $wuxToast().show({
    //             type: 'forbidden',
    //             duration: 1000,
    //             color: '#fff',
    //             text: '请选择就诊卡',
    //         })
    //     }
    // },
    to_registered_record(res) {
        var that = this
        var visit_cardid = res.currentTarget.dataset.cardid
        wx.request({
            url: 'http://localhost:8000/get_registered_record',
            data: {
                'visit_cardid': visit_cardid
            },
            success(res) {
                that.setData({
                    registered_record_list: res.data,
                    show_info: true
                })

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        wx.checkSession({
            success(res) {
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
            },
            fail(res) {
                wx.redirectTo({
                    url: "/pages/login/login?back=/pages/registered_record/registered_record&&type=navigateTo",
                })
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

    }
})