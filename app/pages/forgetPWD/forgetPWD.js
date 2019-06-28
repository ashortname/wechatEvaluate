// pages/forgetPWD/forgetPWD.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      icontp: '',
      showWarn: false,
      macc: '',
      mmail: '',
      pass: '',
      code: '',
      isStu: true,
      canBtn: false,
      showTick: '获取验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  input_mail : function(e)
  {
    // 检测邮箱号格式
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(reg.test(e.detail.value))
    {
      this.setData({
        icontp: '',
        showWarn: false,
        mmail: e.detail.value
      });
      return;
    }
    this.setData({
      icontp: 'warn',
      showWarn: true
    });
  },
  input_id: function(e)
  {
    this.setData({
      macc: e.detail.value
    });
  },
  input_pass: function (e) {
    this.setData({
      pass: e.detail.value
    });
  },
  input_code: function (e) {
    this.setData({
      code: e.detail.value
    });
  },
  clickYZM: function()
  {
    var that = this;
    if(this.data.showWarn || this.data.macc == '' || this.data.mmail == '')
    {
      wx.showToast({
        title: '请填写必要信息！',
        duration: 2000
      })
      return;
    }
    //设置不可用
    this.setData({
      canBtn: true
    });
    var _tick = 60;
    //定时可用
    // var timeOut = setTimeout(function () {
    //   that.setData({
    //     canBtn: false
    //   })
    // }, 60000);
    var _timerInter = setInterval(function(){
          _tick--;
          that.setData({
              showTick: '重新获取' + _tick + 's'
          });
          if(_tick <= 0)
          {
            clearInterval(_timerInter);
            _tick = 60;
            that.setData({
              canBtn: false,
              showTick: '获取验证码'
            });
          }
    }, 1000);
    wx.showLoading({
      title: '正在请求...',
    });
    //请求数据
    wx.request({
      url: 'baseUrl/getFCode',
      data: {
        acc: that.data.macc,
        mail: that.data.mmail,
        isStu: that.data.isStu
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data == 'noex')
        {
          wx.showModal({
            title: '警告',
            content: '用户：' + that.data.macc + '不存在',
          });
        }
        else{
          wx.showToast({
            title: '请注意在邮箱查收',
            duration: 2000
          });
        }       
      },
      fail: function(res) {
        wx.showModal({
          title: '警告',
          content: '连接错误！',
        });
      },
      complete: function(res) {
        wx.hideLoading();
      },
    });
  },
  schecked: function(e)
  {
    this.setData({
      isStu: e.detail.value
    });
  },
  btnclick: function()
  {
    var that = this;
    var _acc = this.data.macc;
    var _mail = this.data.mmail;
    var _pass = this.data.pass;
    var _code = this.data.code;

    if (_acc == '' || _mail == '' || _pass == '' || _code == '')
    {
      wx.showModal({
        title: '警告',
        content: '请输入完整信息！',
      });
      return;
    }
    if(!util.tPwd(_pass))
    {
      wx.showModal({
        title: '警告',
        content: '密码仅支持6-12位英文字母、数字和下划线！',
      });
      return;
    }
    if(!util.tId(_acc))
    {
      wx.showModal({
        title: '警告',
        content: '学工号格式仅支持4-12位数字',
      });
      return;
    }
    wx.showModal({
      title: '提示',
      content: '请仔细对照信息，确认无误，尤其是账号类型！确认提交？',
      success: function(res) {
        if(res.confirm)
        {
          wx.showLoading({
            title: '正在提交...',
          });
          wx.request({
            url: 'baseUrl/resetPwd',
            data: {
              acc: _acc,
              mail: _mail,
              pass: _pass,
              code: _code,
              isStu: that.data.isStu
            },
            header: {},
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              console.log(res.data);
              if (res.data == 'yes') {
                wx.redirectTo({
                  url: '../login/main'
                });
              }
              else if(res.data == 'wrong')
              {
                wx.showModal({
                  title: '提示',
                  content: '验证码错误！',
                });
              }
              else if(res.data == 'no')
              {
                wx.showModal({
                  title: '提示',
                  content: '没找到！',
                });
              } else if (res.data == 'noex')
              {
                wx.showModal({
                  title: '提示',
                  content: '学/工号：' + _acc + '不存在！',
                });
              }
              else{
                wx.showModal({
                  title: '提示',
                  content: '内部错误！',
                });
              }
            },
            fail: function (res) {
              wx.showModal({
                title: '提示',
                content: '提交失败！',
              })
            },
            complete: function (res) {
              wx.hideLoading();
            },
          });
        }
      },
    })
  }
})