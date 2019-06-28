// pages/login/main.js
var app = getApp();

Page({
  data: {
    pageActive: true,
    adminInfo: {
      number: '',
      password: ''
    },
    userInfo: {
      number: '',
      password: '',
      loginType: '1',//0教师登录1学生登录
    },
    type: [
      { name: "教师", state: false },
      { name: "学生", state: true }
    ]
  }, 
  loginType: function (e) {//登陆类型
    var that = this;
    var loginType = e.detail.value;
    var type = that.data.type;
    var userInfo = that.data.userInfo;
    type.forEach(function (e) {
      e.state = false;
    })
    type[loginType].state = true;
    userInfo.loginType = loginType;
    that.setData({
      type: type,
      userInfo: userInfo
    })
  },
  input_id:function(e)
  {
    var user = this.data.userInfo;
    user.number = e.detail.value;
      this.setData({
        userInfo:user
      });
  },
  input_pass: function(e){
    var user = this.data.userInfo;
    user.password = e.detail.value;
    this.setData({
      userInfo: user
    });
  },
  go_forgetPWD : function()
  {
      wx.navigateTo({
        url: '../forgetPWD/forgetPWD',
      });
  },
  mlogin: function(e){
    var that = this;
    var tplogin = '';
    wx.showLoading({
      title: '正在登录...',      
    });
    console.log(that.data.userInfo.loginType);
    if (that.data.userInfo.loginType == 1)
      tplogin = 'stuLogin';
    else
      tplogin = 'tchLogin';
    wx.request({
      url: 'baseUrl' + tplogin,
      data: {
        id:that.data.userInfo.number,
        pass:that.data.userInfo.password
      },
      header: {
        'Content-Type':'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.logStatu == 'yes')
        {
          wx.reLaunch({
            url: '../evaluate/main',
          });
          app.globalData.cUser = res.data;
        }else{
          wx.showModal({
            title: '登录',
            content: '密码或账号错误！'
          });
        }       
      },
      fail: function(res) {
        wx.showModal({
          title: '登录',
          content: '登陆失败！'
        });
      },
      complete: function(res) {
        wx.hideLoading();       
      }
    });
  },
  mregist : function(){
    switch(this.data.userInfo.loginType)
    {
      case '1':
        wx.navigateTo({
          url: '../addStudent/main',
        });
        break;
      case '0':
        wx.navigateTo({
          url: '../addTeacher/main',
        });
        break;
      default:
        wx.showModal({
          title: '注册',
          content: '请选择注册角色！'
        });
        break;
    }
  }
})