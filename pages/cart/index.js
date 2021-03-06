// pages/cart/index.js
Page({
  data: {
    address: {},
    cartList: [],
    totalPrice: 0,
    totalCount:0,
    checkAll:false
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

  // 计数器加减号事件
  changeCount(event){
   console.log(event);
   //解构事件的参数
   const { index, number } = event.currentTarget.dataset;
   //解构购物车数组
   const { cartList } = this.data;

   //如果点击的是减号，并且当前数量为1
   if(number === -1 && cartList[index].goods_count === 1){
      //模态对话框
      wx.showModal({
        title: '是否删除该商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#DC143C',
        confirmText: '确定',
        confirmColor: '#DC143C',
        // PS: 模态提示框，不管点击确定还是取消都触发 success
        success:(result)=>{
          if (result.confirm) {
            // console.log('用户点击确定')
            cartList.splice(index,1);
            // 重新计算总价格，全选状态，并更新 cartList 页面数据 和 cartList 本地存储数据
           this.computedCartData();
          } else if (result.cancel) {
            console.log('用户点击取消')
          }
        }
      })
   }else{
     //当前商品累加
     cartList[index].goods_count += number;
     // 重新计算总价格，全选状态，并更新 cartList 页面数据 和 cartList 本地存储数据
     this.computedCartData();
   }
  },

  //列表项的选择按钮点击
  changeCheck(event){
    // console.log(event);
    //解构事件的参数
    const { index } = event.currentTarget.dataset;
    // 解构购物车的数组
    const { cartList } = this.data;
    // 通过索引值找到数据，把自己取反
    cartList[index].goods_selected = !cartList[index].goods_selected;
    this.computedCartData();
  },
 
  // 全选按钮点击事件
  changeCheckAll(){
    let { checkAll,cartList } = this.data;
    checkAll = !checkAll;
    // console.log(checkAll);
    // 购物车列表的选中状态和全选保持一致
    cartList.forEach(v=>{
      v.goods_selected = checkAll
    });
     // 重新计算总价格，全选状态，并更新 cartList 页面数据 和 cartList 本地存储数据
     this.computedCartData();
  },


  // 封装一个计算总价格的函数
  computedCartData(){
    //解构data中的购物车数据
    const { cartList } = this.data;
    // 总价格
    let totalPrice = 0;
    // 选中件数
    let totalCount = 0;
    cartList.forEach(v=>{
      if(v.goods_selected){
        //总金额
        totalPrice += v.goods_price * v.goods_count;
        //选中件数
        totalCount++;
      }
    });
    
   
   // 计算总价格，全选状态，并更新 cartList 页面数据 和 cartList 本地存储数据
    // 更新数据分两部分：页面数据和本地存储数据
    // 更新页面数据
    this.setData({
      totalPrice,
      totalCount,
      // 购物车数据视图更新
      cartList,
      // 全选状态，购物条数 和 选中的数量比较，相对返回 true 全选，不相等反之
      checkAll: cartList.length === totalCount
    })
      // 更新本地存储数据
      wx.setStorageSync('cartList', cartList);
  },




  //获取用户地址信息
  getAddress(){
    // 小程序提供的获取收货地址的API
   wx.chooseAddress({
     success: (result)=>{
      //  console.log(result);
     // 从成功的回调函数中提取关键信息
     const {cityName,countyName,detailInfo,nationalCode,postalCode,provinceName,telNumber,userName} = result;
     // 构建一个新的对象
     const address = {
      cityName,
      countyName,
      detailInfo,
      nationalCode,
      postalCode,
      provinceName,
      telNumber,
      userName,
      // 额外拼接了一个新的字符串
      addressDetail:`${provinceName}${cityName}${countyName}${detailInfo}`
    }
      // 把地址信息保存到本地存储
      wx.setStorageSync('address', address);
      // 更新页面数据
      this.setData({
        address 
      });
     },
      // 如果用户拒绝了授权，只会触发调用失败的回调函数
     fail: (err)=>{
      wx.showToast({
        title: '你取消了地址选择',
        icon: 'none'
      });
     },
   });
   }
})