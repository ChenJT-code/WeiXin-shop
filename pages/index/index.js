//index.js

Page({
  data: {
    // 轮播图数据
    swiperImgs: [],
    // 导航菜单数据
    navList:[],
    // 楼层数据
    floorData:[]
  },

  // 生命周期函数 监听页面加载
  onLoad() {
    // 获取轮播图数据
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: res => {
        // console.log(res)
        this.setData({
          swiperImgs: res.data.message
        })
      }
    }),
      // 获取分类菜单数据
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success:res=>{
        // console.log(res)
        this.setData({
          navList:res.data.message
        })
      }
    }),
    // 获取楼层数据
      wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
        success: res => {
          // console.log(res)
          this.setData({
            floorData:res.data.message
          })
        }
      })
  }
})