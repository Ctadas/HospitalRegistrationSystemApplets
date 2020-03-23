var localhost = 'http://localhost:8000'
Page({
  data: {
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8000/news_list/',
      method:'GET',
      success(res) {
        var res_data = res.data
        for(var index in res_data){
          res_data[index].image = localhost + res_data[index].image
        }
        that.setData(
          {
            news_list: res_data
          }
        )
      }
    })
    wx.request({
      url: 'http://localhost:8000/carousel_map_list/',
      method: 'GET',
      success(res) {
        var res_data = res.data
        var return_list = []
        for(var index in res_data){
          return_list.push(localhost + res_data[index].image)
        }
        that.setData(
          {
            imgUrls: return_list,
            indicatorDots: true,
            interval: 3000,
            duration: 500,
            circular: true,
            autoplay: true,
          }
        )
      }
    })
  }
})