// pages/goods_list/index.js
const app = getApp();
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    // 商品列表
    leiBiao:[],
    // 商品分页
    pagenum:1,
    // 请求一次的数量
    pagesize:10,
    // 总条数
    total:0
  },

  async onLoad(options){
    let {pagenum,pagesize}=this.data;
    const res = await app.myAxios({ 
      url:'goods/search',
      data:{
        ...options,
        pagenum,
        pagesize
      }
    });
    // console.log(res);


    this.setData({
      leiBiao:res.goods,
      total:res.total
    });
  },
   // 下拉事件
   onPullDownRefresh(){
    //  console.log(this);
        // 把商品数组清空，把页码重新变成 1
        this.setData({
          goods:[],
          pagenum:1
        });
        // 重新调用一下 onLoad，重新加载
        this.onLoad();
   }
})