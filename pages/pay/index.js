// pages/pay/index.js
const app = getApp();
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    address: {},
    cartList: [],
    totalPrice: 0,
  },

  //创建订单API的调用
  createOrder() {
    const {
      cartList,
      address,
      totalPrice
    } = this.data;
    // !!! goods 参数要注意格式，过滤出选中的商品，map 映射成新的数据
    const goods = cartList.filter(v => v.goods_selected).map(v => {
      return {
        goods_id: v.goods_id,
        goods_number: v.goods_count,
        goods_price: v.goods_price
      }
    });

    //发送数据到服务器
    return app.myAxios({
      url: 'my/orders/create',
      method: 'post',
      data: {
        order_price: totalPrice,
        consignee_addr: address.addressDetail,
        goods
      }
    })
  },
  async pay(){
    const res = await this.createOrder();
    console.log(res)
  },

  // 当显示页面的时候
  onShow() {
    this.setData({
      // 每次显示后获取最新本地存储数据，并更新到 data 中
      address: wx.getStorageSync('address') || {},
      cartList: wx.getStorageSync('cartList') || [],
    });
    // 每次显示页面都要触发一次
    this.computedCartData();
  },

  // 封装一个计算总价格的函数
  computedCartData() {
    //解构data中的购物车数据
    const {
      cartList
    } = this.data;
    // 总价格
    let totalPrice = 0;
    cartList.forEach(v => {
      if (v.goods_selected) {
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