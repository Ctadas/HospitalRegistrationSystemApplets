import { $wuxCalendar } from '../../wudist/index'

Page({
  data: {
    value1: [],
    value2: [],
    value3: [],
    value4: [],
  },
  openCalendar1() {
    $wuxCalendar().open({
      value: this.data.value1,
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          value1: displayValues,
        })
      },
    })
  }
  
})