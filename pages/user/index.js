const app =  getApp();

Page({
  data:{
    userInfo:{},
    token:""
  },
  onShow(){
     this.setData({
       userInfo: wx.getStorageSync("userInfo") || {},
       token: wx.getStorageSync("token") || ""
     })
  },
  //获取用户信息
  getToken(event){
   console.log(event);
   const { encryptedData,iv,rawData,signature,userInfo } = event.detail;
  wx.login({
    success: (result)=>{
      console.log(result);
      const { code } = result;

      app.myAxios({
        url:'users/wxlogin',
        method:'post',
        data:{
          encryptedData,
          iv,
          rawData,
          signature,
          code
        }
      }).then(res=>{
        if(res){
          wx.setStorageSync('token', res.token);
          wx.setStorageSync('userInfo', userInfo );
          this.setData({
            token: wx.getStorageSync("token"),
            userInfo
          })
          wx.showToast({
            title: '登陆成功',
            icon: 'none',
          });
        }else{
          wx.showToast({
            title: '登陆失败，请重试',
            icon: 'none',
          });
        }
      })
    },

  });

  },

  data: {

  }

})