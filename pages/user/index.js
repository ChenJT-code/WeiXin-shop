const app = getApp();
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({
  data: {
    userInfo: {},
    token: ""
  },
  onShow() {
    this.setData({
      userInfo: wx.getStorageSync("userInfo") || {},
      token: wx.getStorageSync("token") || ""
    })
  },

  // 分治思想 - 每个功能封装一个独立的函数，分而治之。
  // 获取 code
  getCode() {
    return new Promise((resolve, reject) => {
      // 调用 wx.login() 获取 code, code 发给后端，后端再发给微信服务器。
      wx.login({
        success: result => {
          resolve(result.code);
        }
      })
    })
  },

  //API调用
  sendUserData(obj) {
    return app.myAxios({
      url: 'users/wxlogin',
      method: 'post',
      data: obj
    })
  },

  //获取用户信息
  async getToken(event) {
    //  console.log(event);
    const {
      encryptedData,
      iv,
      rawData,
      signature,
      userInfo
    } = event.detail;

    const code = await this.getCode();
    const res = await this.sendUserData({
      encryptedData,
      iv,
      rawData,
      signature,
      code
    });
    //  debugger;
    // 如果 res 有数据，说明登录成功
    if (res) {
      // 把 token 保存到本地
      wx.setStorageSync('token', res.token);
      // 把用户信息也保存到本地
      wx.setStorageSync('userInfo', userInfo);
       // 更新页面数据
      this.setData({
        token: wx.getStorageSync("token"),
        userInfo
      })
      // 提示用户登录成功
      wx.showToast({
        title: '登陆成功',
        icon: 'none',
      });
      // 登录失败，后台返回 null，走 else 逻辑
    } else {
       // 提示用户登录失败
      wx.showToast({
        title: '登陆失败，请重试',
        icon: 'none',
      });
    }
  },


  //获取用户信息
  // getToken(event){
  // //  console.log(event);
  //  const { encryptedData,iv,rawData,signature,userInfo } = event.detail;
  // wx.login({
  //   success: (result)=>{
  //     // console.log(result);
  //     const { code } = result;

  //     app.myAxios({
  //       url:'users/wxlogin',
  //       method:'post',
  //       data:{
  //         encryptedData,
  //         iv,
  //         rawData,
  //         signature,
  //         code
  //       }
  //     }).then(res=>{
  //       if(res){
  //         wx.setStorageSync('token', res.token);
  //         wx.setStorageSync('userInfo', userInfo );
  //         this.setData({
  //           token: wx.getStorageSync("token"),
  //           userInfo
  //         })
  //         wx.showToast({
  //           title: '登陆成功',
  //           icon: 'none',
  //         });
  //       }else{
  //         wx.showToast({
  //           title: '登陆失败，请重试',
  //           icon: 'none',
  //         });
  //       }
  //     })
  //   },

  // });

  // },

})