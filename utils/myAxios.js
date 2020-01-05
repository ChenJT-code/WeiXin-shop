const baseUrl = 'https://api.zbztb.cn/api/public/v1/'

// params 传入的参数
export const myAxios = (params) => {

    // 显示加载提示框
    wx.showLoading({
        title: '加载中',
    });

    //函数内部返回promise实例
    return new Promise((resolve, reject) => {

        wx.request({
            //解构所有参数
            ...params,
            //把原本的url变成跟路径+目标路径
            url: baseUrl + params.url,
            //成功
            success: res => {
                resolve(res.data.message);
            },
            //失败
            fail: err => {
                reject(err);
            },
            //完成-不管成功还·是失败都触发
            complete: () => {
                // 隐藏提示框
                wx.hideLoading();
                // 请求完毕，下拉刷新结束
                wx.stopPullDownRefresh();
                // 请求完毕，关闭导航栏小菊花
                wx.hideNavigationBarLoading();
            }
        })

    })
    // PS：小程序支持两种方式导出：
    //  1. export 
    //  2. module.exports

}