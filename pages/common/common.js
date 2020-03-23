function toLogin(that) {
    var isSuccess = false
    return new Promise(function(resolve, reject) {
        wx.login({
            success(res) {
                if (res.code) {
                    wx.request({
                        url: 'http://127.0.0.1:8000/getLoginCode',
                        data: {
                            code: res.code
                        },
                        success(res) {
                            wx.setStorage({
                                key: 'openid',
                                data: res.data.data,
                            })
                            isSuccess = true
                            resolve(isSuccess)
                        }
                    })
                }
            }
        })
    })

}

function check_login(that) {
    wx.checkSession({
        success(res) {
            wx.getSetting({
                success(res) {
                    get_use_info(that)
                }
            })
        },
        fail(res) {
            toLogin(that)
        }
    })
}

function get_use_info(that) {
    wx.getUserInfo({
        withCredentials: true,
        lang: 'zh_CN',
        success: function(res) {
            res.userInfo['isLogin'] = true
            that.setData(res.userInfo)
        },

    })
}

module.exports = {
    check_login: check_login,
    toLogin: toLogin,
    get_use_info: get_use_info
}