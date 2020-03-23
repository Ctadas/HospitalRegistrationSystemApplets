// pages/number/number.js
import {
    $wuxCalendar
} from '../../wudist/index'
import {
    $wuxToast
} from '../../wudist/index'

function next_steps(that) {
    var current = that.data.current + 1
    that.setData({
        current: current
    })
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
        'doctor_show': false,
    },
    //选择时间函数
    visit_date() {
        const now = new Date()
        const minDate = now.setDate(now.getDate() - 1)
        const maxDate = now.setDate(now.getDate() + 7)
        $wuxCalendar().open({
            minDate,
            maxDate,
            onChange: (values, displayValues) => {
                var that = this
                that.setData({
                    visit_date: displayValues,
                })
                if (displayValues.length != 0) {
                    wx.request({
                        url: 'http://localhost:8000/get_shift/',
                        data: {
                            'visit_date': displayValues[0]
                        },
                        success(res) {
                            console.log(res.data)
                            if (res.data.length == 0) {
                                that.setData({
                                    'doctor_show': false,
                                    'show_doctors': []
                                })
                            } else {
                                wx.request({
                                    url: 'http://localhost:8000/get_doctor_visits_number',
                                    data: {
                                        'id_list': res.data[0].doctor_duty,
                                        'visit_time': displayValues[0]
                                    },
                                    success(visit_number) {
                                        console.log(visit_number)
                                        var doctor_duty_list = res.data[0].doctor_duty
                                        var doctors_list = that.data.doctors_list
                                        var show_doctors = []
                                        for (var department in doctors_list) {
                                            if (department == that.data.department) {
                                                for (var index in doctors_list[department]) {
                                                    if (doctor_duty_list.indexOf(doctors_list[department][index].id) != -1) {
                                                        doctors_list[department][index]['visit_number'] = visit_number.data[doctors_list[department][index].id]
                                                        show_doctors.push(doctors_list[department][index])
                                                    }
                                                }
                                            }
                                        }
                                        console.log(show_doctors)
                                        that.setData({
                                            'doctor_show': true,
                                            'show_doctors': show_doctors
                                        })
                                    }
                                })

                            }

                        }
                    })
                }

            },
        })
    },
    radio_change(res) {
        this.setData({
            visit_card_radio: res.detail.value,
            // visitcard_id: res.currentTarget.dataset.cardid,
            // visicard_name: res.currentTarget.dataset.cardname
        })
    },
    formSubmit(res) {
        var that = this
        if (res.detail.value['radio_form']) {
            var data = res.detail.value['radio_form']
            var visitcard_id = data.split(',')[0]
            var visicard_name = data.split(',')[1]
            that.setData({
                visitcard_id: visitcard_id,
                visicard_name: visicard_name
            })
            next_steps(this)
        } else {
            $wuxToast().show({
                type: 'forbidden',
                duration: 1000,
                color: '#fff',
                text: '请选择就诊卡',
            })
        }
    },
    //选择就诊卡函数
    to_complete(res) {
        if (this.data.current == 2) {
            this.setData({
                visitcard_id: res.currentTarget.dataset.cardid,
                visicard_name: res.currentTarget.dataset.cardname
            })
        }
        next_steps(this)
    },
    //医生详情函数
    to_doctor_info(res){
        var that = this
        var doctors_list = that.data.doctors_list
        var doctor_id = res.currentTarget.dataset.doctorid
        var department_name = that.data.department
        var doctor_info 
        for (var index in doctors_list[department_name]){
            if (doctors_list[department_name][index].id == doctor_id){
                doctor_info = doctors_list[department_name][index]
                break;
            }
        };
        if (doctor_info.visit_number == 0){
            $wuxToast('#wux-toast').show({
                type: 'success',
                duration: 1500,
                color: '#fff',
                text: '该医生已经没有可预约号'
            })
        }else{
            that.setData({
                doctor_info: doctor_info,
                doctor: res.currentTarget.dataset.doctor,
                doctor_id: res.currentTarget.dataset.doctorid
            })
            next_steps(this);
        }
    },
    //选择医生函数
    to_visitcard(res) {
        var that = this
        wx.getStorage({
            key: 'openid',
            success(res) {
                wx.request({
                    url: 'http://localhost:8000/get_VisitCard/',
                    data: {
                        'openid': res.data
                    },
                    success(res) {
                        console.log(res.data)
                        that.setData({
                            visit_card_list: res.data
                        })
                        console.log(that.data.visit_card_list)
                    }
                })
            }
        })

        next_steps(this)
    },
    //选择科室函数
    to_doctor(res) {
        if (this.data.current == 0) {
            this.setData({
                department: res.currentTarget.dataset.department,
                show_doctors:[],
                visit_date:''

            })
        }
        next_steps(this)
    },
    //返回按钮函数
    back_btn() {
        var current = this.data.current - 1
        this.setData({
            current: current
        })
    },
    submit() {
        var that = this
        var department_name = that.data.department
        var date = that.data.visit_date[0]
        var visitcard_id = that.data.visitcard_id
        var doctor_id = that.data.doctor_id
        wx.getStorage({
            key: 'openid',
            success(res) {
                wx.request({
                    url: 'http://localhost:8000/commit_registered_record/',
                    method: 'post',
                    data: {
                        'openid': res.data,
                        'department_name': department_name,
                        'date': date,
                        'visitcard_id': visitcard_id,
                        'doctor_id': doctor_id
                    },
                    success(res) {
                        $wuxToast('#wux-toast').show({
                            type: 'success',
                            duration: 1500,
                            color: '#fff',
                            text: '预约成功',
                            success(res) {
                                wx.switchTab({
                                    url: '/pages/index/index',
                                    success: function(e) {}
                                })
                            }

                        })
                    }
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
                that.setData({
                    current: 0,
                    visit_date: '',
                    visitcard_id: '',
                    visicard_name: '',
                    department: '',
                    doctor: '',
                    show_doctors: false,
                    visit_card_radio: ''
                })
                wx.request({
                    url: 'http://localhost:8000/get_department_info/',
                    success(res) {
                        var res_data = res.data
                        var department_list = {}
                        var doctors_list = {}
                        for (var index in res_data) {
                            doctors_list[res_data[index].name] = res_data[index].doctors
                            if (department_list[res_data[index].category] == undefined) {
                                department_list[res_data[index].category] = []
                                department_list[res_data[index].category].push({
                                    'id': res_data[index].id,
                                    'name': res_data[index].name
                                })
                            } else {
                                department_list[res_data[index].category].push({
                                    'id': res_data[index].id,
                                    'name': res_data[index].name
                                })
                            }
                        }
                        that.setData({
                            department_list: department_list,
                            doctors_list: doctors_list
                        })
                    }
                })
            },
            fail(res) {
                wx.redirectTo({
                    url: "/pages/login/login?back=/pages/number/number&&type=switchTab",
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
        var that = this
        wx.checkSession({
            success(res) {
                that.onLoad()
            }
        })
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