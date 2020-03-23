// pages/userchild/userchild.js
import {
    $wuxToast
} from '../../wudist/index'
Page({
    data: {
        number: '9787115335524',
        options: {
            // number: true,
            // prefix: true,
            // color: 'black',
            // debug: false,
        }
    },
    onLoad: function(options) {
        var that = this
        var card_id = options.id
        console.log(card_id, options.id, options)
        wx.request({
            url: 'http://localhost:8000/get_VisitCard_info/',
            data: {
                'id': card_id
            },
            success(res) {
                that.setData(res.data)
            }
        })
    },
    remove_vicitcard() {
        var that = this
        var card_id = that.data.id
        wx.getStorage({
            key: 'openid',
            success(res) {
                var openid = res.data
                wx.request({
                    url: 'http://localhost:8000/remove_VisitCard/',
                    data: {
                        'card_id': card_id,
                        'openid': openid
                    },
                    success(res) {
                        $wuxToast('#wux-toast').show({
                            type: 'success',
                            duration: 1500,
                            color: '#fff',
                            text: '移除成功',
                            success(res) {
                                wx.switchTab({
                                    url: '/pages/userson/userson',
                                    success: function(e) {
                                        var page = getCurrentPages().pop();
                                        if (page == undefined || page == null) return;
                                        page.onLoad();
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})