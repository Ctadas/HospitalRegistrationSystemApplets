import {
    $wuxToast
} from '../../wudist/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    pay_success(res){
        $wuxToast('#wux-toast').show({
            type: 'success',
            duration: 1500,
            color: '#fff',
            text: '支付成功',
            success(res) {
                wx.switchTab({
                    url: '/pages/index/index',
                    success: function (e) { }
                })
            }

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var visitcard_id = options.card_id
        wx.request({
            url: 'http://localhost:8000/get_payment',
            data: { 'visit_cardid': visitcard_id },
            success(res) {
                for(var i in res.data){
                    var total = 0
                    for(var index in res.data[i].payment_item){
                        total += res.data[i].payment_item[index].price
                    }
                    res.data[i]['total'] = total
                }
                console.log(res.data)
                that.setData({
                    payment_list: res.data,
                })

            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})