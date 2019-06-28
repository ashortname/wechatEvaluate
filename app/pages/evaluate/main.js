// pages/evaluate/main.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      _role:'',
      hasData: false,
      pjdatas: {},
      isSTU: false   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isSTU: app.globalData.cUser.isSTU
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.showLoading({
      title: '正在获取数据...',
    });
    let opt = '';
    if (this.data.isSTU)
      opt = 'pjInfo';
    else
      opt = 'pjTchInfo';
    wx.request({
      url: 'baseUrl' + opt + '?id=' + app.globalData.cUser.id,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.length == 0)
          return;
        that.setData({
          pjdatas: res.data,
          hasData: true
        });
      },
      fail: function (res) {
        wx.showModal({
          title: '错误',
          content: '获取数据失败！',
        });
      },
      complete: function (res) {
        wx.hideLoading();
      },
    }); 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})