// pages/password/main.js
var app = getApp();
var util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
      pass_old:'',
      pass_new:'',
      pass_Confirm:'',
      ishowWarn:false,
      showContent: ''
  },
  inputOld: function(e){
    var temp = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if(util.tPwd(temp))
    {
      this.setData({
        pass_old: temp,
        ishowWarn: false,
        showContent: ''
      });
    }else{
      this.setData({        
        ishowWarn: true,
        showContent: '检测到非法字符！仅支持6-12为英文字母、数字、下划线'
      });
    }  
  },
  inputNew: function (e) {
    var temp = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if (util.tPwd(temp)) {
      this.setData({
        pass_new: temp,
        ishowWarn: false,
        showContent: ''
      });
    } else {
      this.setData({
        ishowWarn: true,
        showContent: '检测到非法字符！仅支持6-12为英文字母、数字、下划线'
      });
    }  
  },
  inputConfirm: function (e) {
    var temp = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if (util.tPwd(temp)) {
      this.setData({
        pass_Confirm: temp,
        ishowWarn: false,
        showContent: ''
      });
    } else {
      this.setData({
        ishowWarn: true,
        showContent: '检测到非法字符！仅支持6-12为英文字母、数字、下划线'
      });
    }  
  },
  btnConfirm: function()
  {
    var _old = this.data.pass_old;
    var _new = this.data.pass_new;
    var _con = this.data.pass_Confirm;
    var _id = app.globalData.cUser.id;    
    if(_old == "" || _new == "" || _con == "")
    {
      wx.showModal({
        title: '修改密码',
        content: '请正确输入信息！',
      });
      return;
    }
    if( _new != _con)
    {
      wx.showModal({
        title: '修改密码',
        content: '两次密码不一致！',
      });
      return;
    }
    if( _new == _old)
    {
      wx.showModal({
        title: '修改密码',
        content: '新旧密码一致！',
      });
    }
    let optSet = '';
    if (app.globalData.cUser.role == 'stu')
      optSet = '/sturepass';
    else
      optSet = '/tchrepass';
    wx.showLoading({
      title: '正在提交...',
    });
    wx.request({
      url: 'baseUrl' + optSet,
      data: {
        id: _id,
        pass : _old,
        pass_new : _new
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        switch(res.data)
        {
          case "yes" :
            wx.showModal({
              title: '修改密码',
              content: '修改成功！',
            });
            wx.navigateBack({
              delta: 1
            });
            break;
          case "no":
            wx.showModal({
              title: '修改密码',
              content: '修改失败！',
            });
            break;
          case "error":
            wx.showModal({
              title: '修改密码',
              content: '原始密码错误，请仔细检查！',
            });
            break;
        }
      },
      fail: function(res) {
        wx.showModal({
          title: '修改密码',
          content: '连接错误！',
        })
      },
      complete: function(res) {
        wx.hideLoading();
      },
    })
  }
})