// pages/category/index.js

Page({
  data: {
    // 分类页数据  从本地中获取
    fenLei: wx.getStorageSync('fenLei') || [],
    fenLei2: wx.getStorageSync('fenLei2') || [],
    activeIndex:0
  },
  changeIndex(event){
  //  console.log(event)
    const { index } = event.currentTarget.dataset;
    // 小程序更新数据用 this.setData({ })
    this.setData({
      activeIndex: index,
      fenLei2: this.data.fenLei[index].children
    })
  },
  onLoad() {
    if (this.data.fenLei.length === 0) {
      wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/categories',
        success: res => {
          const fenLei = res.data.message;
          const fenLei2 = res.data.message[0].children;
          // 存进本地存储
          wx.setStorageSync('fenLei', fenLei)
          wx.setStorageSync('fenLei2', fenLei2)
          this.setData({
            fenLei,
            fenLei2
          })
        }
      })
    }
  }
})