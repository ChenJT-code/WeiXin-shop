// pages/pay/index.js
Page({
  data: {
    address: {},
    cartList: [],
    totalPrice: 0,
  },

  // 当显示页面的时候
  onShow(){
    this.setData({
      // 每次显示后获取最新本地存储数据，并更新到 data 中
      address: wx.getStorageSync('address') || {},
      cartList: wx.getStorageSync('cartList') || [],
    });
    // 每次显示页面都要触发一次
    this.computedCartData();
  },

  // 封装一个计算总价格的函数
  computedCartData(){
    //解构data中的购物车数据
    const { cartList } = this.data;
    // 总价格
    let totalPrice = 0;
    cartList.forEach(v=>{
      if(v.goods_selected){
        //总金额
        totalPrice += v.goods_price * v.goods_count;
      }
    });
    
   
   // 计算总价格，全选状态，并更新 cartList 页面数据 和 cartList 本地存储数据
    // 更新数据分两部分：页面数据和本地存储数据
    // 更新页面数据
    this.setData({
      totalPrice,
    })
      // 更新本地存储数据
      wx.setStorageSync('cartList', cartList);
  }
})