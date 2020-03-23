// pages/past/past.js
import {
    $wuxSelect
} from '../../wudist/index'
import {
    $wuxToast
} from '../../wudist/index'


const isTel = (value) => !/^1[34578]\d{9}$/.test(value)
Page({
    data: {
        id_type: '1',
        id_type_show: '大陆二代居民身份证',
        tel_error:false
    },
    tel_change(res) {
        console.log(isTel(res.detail.value))
        this.setData({
            tel_error: isTel(res.detail.value),
        })
    },
    tel_error(res) {
        wx.showModal({
            title: '请输入正确的手机号码',
            showCancel: !1,
        })
    },
    onClick1() {
        $wuxSelect('#wux-select1').open({
            cellPrefixCls: 'test',
            value: '1',
            options: [{
                    title: '大陆二代居民身份证',
                    value: '1',
                },
                {
                    title: '港澳居民身份证',
                    value: '2',
                },
                {
                    title: '台湾居民身份证',
                    value: '3',
                },
                {
                    title: '军官证',
                    value: '4',
                },
            ],
            onConfirm: (value, index, options) => {
                console.log('onConfirm', value, index, options)
                if (index !== -1) {
                    this.setData({
                        id_type: value,
                        title1: options[index].title,
                    })
                }
            },
        })
    },
    formSubmit(e) {
        console.log(e.detail.value)
        var visit_card = e.detail.value
        if (visit_card.real_name.length == 0) {
            wx.showModal({
                title: '姓名为必填项',
                showCancel: !1,
            })
        }
        else if (visit_card.telphone.length == 0) {
            wx.showModal({
                title: '手机为必填项',
                showCancel: !1,
            })
        } else if (visit_card.id_card.length == 0) {
            wx.showModal({
                title: '身份证为必填项',
                showCancel: !1,
            })
        }
        else{
            var data = {}
            data['visit_card'] = e.detail.value
            wx.getStorage({
                key: 'openid',
                success(res) {
                    data['user_openid'] = res.data
                    wx.request({
                        url: 'http://localhost:8000/add_VisitCard/',
                        data: data,
                        method: 'POST',
                        dataType: 'json',
                        success(res) {
                            $wuxToast('#wux-toast').show({
                                type: 'success',
                                duration: 1500,
                                color: '#fff',
                                text: '已完成',
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
                        },
                        fail(res) {
                            console.log(res)
                        }
                    })
                }
            })
        }

    },
})