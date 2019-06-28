var util = require('../../utils/util.js');

Page({
  data: {
    regInfo: {
        name: '',
        id: '',
        pass: '',
        sex: '',
        age: '',
        _class: ''
    },
    confirm_pas: '',
    iname:'',
    iid:'',
    iclass:'',
    isex:'',
    iage:'',
    ipwd:'',
    icof:'',
    ishowWarn: false,
    warnContent: 'sss',
  },
  bindInputName : function(e){  
      var temp = this.data.regInfo;
      temp.name = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
      if(util.tName(temp.name))
      {
        this.setData({
          regInfo: temp,
          iname:'',
          ishowWarn: false,
          warnContent: ''
        });
      }else{
        this.setData({
          iname:'warn',    
          ishowWarn: true,
          warnContent: '姓名格式不对!仅支持2-8个汉字或英文！'
        });
      }     
  },
  bindInputNum: function (e) {
    var temp = this.data.regInfo;
    temp.id = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if (util.tId(temp.id)) {
      this.setData({
        iid:'',
        regInfo: temp,
        ishowWarn: false,
        warnContent: ''
      });
    } else {
      this.setData({
        iid: 'warn',
        ishowWarn: true,
        warnContent: '学号格式不对， 仅支持4-12位数字！'
      });
    }
  },
  bindInputClass: function (e) {
    var temp = this.data.regInfo;
    temp._class = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if (util.tClass(temp._class)) {
      this.setData({
        iclass: '',
        regInfo: temp,
        ishowWarn: false,
        warnContent: ''
      });
    } else {
      this.setData({
        iclass: 'warn',
        ishowWarn: true,
        warnContent: '班级格式不对，请以中文开头！如：计算机1901'
      });
    }
  },
  bindInputSex: function (e) {
    var temp = this.data.regInfo;
    temp.sex = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if (util.tSex(temp.sex)) {
      this.setData({
        isex: '',
        regInfo: temp,
        ishowWarn: false,
        warnContent: ''
      });
    } else {
      this.setData({
        isex: 'warn',
        ishowWarn: true,
        warnContent: '请正确输入性别！'
      });
    }
  },
  bindInputAge: function (e) {
    var temp = this.data.regInfo;
    temp.age = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if (util.tAge(temp.age)) {
      this.setData({
        iage: '',
        regInfo: temp,
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
  bindInputPas: function (e) {
    var temp = this.data.regInfo;
    temp.pass = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    if (util.tPwd(temp.pass)) {
      this.setData({
        ipwd: '',
        regInfo: temp,
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
      confirm_pas: e.detail.value.replace(/(^\s*)|(\s*$)/g, "")
    });
  },
  loginBtnClick : function(){
    var that = this;
    var _info = this.data.regInfo;
    var _conP = this.data.confirm_pas;
    for(var key in _info)
    {
      if (typeof _info[key] == 'undefined' || _info[key] == null || _info[key] == "")
        {
          wx.showModal({
            title: '提示',
            content: '请输入完整信息！'
          });
          return;
        }
    }
    if (_conP != _info.pass)
    {
      wx.showModal({
        title: '提示',
        content: '两次密码不一致，请重新输入！',        
      });
      this.setData({
        icof: 'warn'
      });
      return;
    }else{
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
        success: function(res) {
          if(res.data == 'yes')
          {
            wx.showModal({
              title: '注册',
              content: '注册成功！'
            });
            wx.navigateTo({
              url: '../login/main',
            });
          }
          else if (res.data == 'exist')
          {
            wx.showModal({
              title: '注册',
              content: '该用户ID'+ _info.id +'已存在！'
            }); 
          }
          else{
            wx.showModal({
              title: '注册',
              content: '注册失败！'
            }); 
          }                 
        },
        fail: function(res) {
          wx.showModal({
            title: '注册',
            content: '连接出错！'
          });
        },
        complete: function(res) {
          wx.hideLoading();
        },
      })        
  }
})