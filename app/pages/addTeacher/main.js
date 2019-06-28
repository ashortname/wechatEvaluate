// pages/addTeacher/main.js
var util = require('../../utils/util.js');

Page({
  data: {
    sex: ["男", "女"],
    position: ['院长', '教授', '讲师', '辅导员'],
    userInfoData: {
      name:'',
      id:'',
      age:'',
      sex:'',
      zw:'',
      pass:''
    },
    confrimPas: '',
    iname: '',
    iid: '',
    iage: '',
    ipwd: '',
    icof: '',
    ishowWarn: false,
    warnContent: '',
  },
  bindPickerPosition: function (e) {
    var temp = this.data.userInfoData;
    temp.zw = this.data.position[e.detail.value];
    this.setData({
        userInfoData: temp
    });
  },
  bindPickerSex: function (e) {
    var temp = this.data.userInfoData;
    temp.sex = this.data.sex[e.detail.value];
    this.setData({
      userInfoData: temp
    });
  },
  bindInputName : function(e){
    var temp = this.data.userInfoData;
    temp.name = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if (util.tName(temp.name)) {
      this.setData({
        userInfoData: temp,
        iname: '',
        ishowWarn: false,
        warnContent: ''
      });
    } else {
      this.setData({
        iname: 'warn',
        ishowWarn: true,
        warnContent: '姓名格式不对!仅支持2-8个汉字或英文！'
      });
    }     
  },
  bindInputAge: function (e) {
    var temp = this.data.userInfoData;
    temp.age = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if (util.tAge(temp.age)) {
      this.setData({
        iage: '',
        userInfoData: temp,
        ishowWarn: false,
        warnContent: ''
      });
    } else {
      this.setData({
        iage: 'warn',
        ishowWarn: true,
        warnContent: '请正确输入年龄！'
      });
    }
  },
  bindInputID: function (e) {
    var temp = this.data.userInfoData;
    temp.id = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if (util.tId(temp.id)) {
      this.setData({
        iid: '',
        userInfoData: temp,
        ishowWarn: false,
        warnContent: ''
      });
    } else {
      this.setData({
        iid: 'warn',
        ishowWarn: true,
        warnContent: '工号格式不对， 仅支持4-12位数字！'
      });
    }
  },
  bindInputPas: function (e) {
    var temp = this.data.userInfoData;
    temp.pass = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if (util.tPwd(temp.pass)) {
      this.setData({
        ipwd: '',
        userInfoData: temp,
        ishowWarn: false,
        warnContent: ''
      });
    } else {
      this.setData({
        ipwd: 'warn',
        ishowWarn: true,
        warnContent: '检测到非法字符！仅支持6-12位英文字母、数字、下划线等'
      });
    }
  },
  bindInputPasConfirm: function (e) {    
    this.setData({
      confrimPas: e.detail.value.replace(/(^\s*)|(\s*$)/g, "")
    });
  },
  saveClick : function(){
    var that = this;
    var _info = this.data.userInfoData;
    var _con = this.data.confrimPas;
    for (var key in _info) {
      if (typeof _info[key] == 'undefined' || _info[key] == null || _info[key] == "") {
        wx.showModal({
          title: '提示',
          content: '请输入完整信息！'
        });
        return;
      }
    }
    if( _con != _info.pass)
    {
      wx.showModal({
        title: '提示',
        content: '两次密码不一致！'
      });
      this.setData({
        icof: 'warn'
      });
      return;
    } else {
      this.setData({
        icof: ''
      });
    }
    wx.showLoading({
      title: '注册中...',
    });
    wx.request({
      url: 'url',
      data: _info,
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data == 'yes')
        {
          wx.showModal({
            title: '注册',
            content: '注册成功！'
          });
          wx.navigateTo({
            url: '../login/main',
          });
        }         
        else if (res.data == 'exist') {
          wx.showModal({
            title: '注册',
            content: '该用户ID' + _info.id + '已存在！'
          });
        }
        else {
          wx.showModal({
            title: '注册',
            content: '注册失败！'
          });
        }     
      },
      fail: function (res) {
        wx.showModal({
          title: '注册',
          content: '注册出错！'
        });
      },
      complete: function (res) {
        wx.hideLoading();
       },
    })
  }
})