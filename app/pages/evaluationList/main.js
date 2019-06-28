var app = getApp();
var util = require("../../utils/util.js");

Page({
  data: {
    items: [
      { name: '0', value: '优'},//20
      { name: '1', value: '良' },//15
      { name: '2', value: '及格' },//10
      { name: '3', value: '不及格' },//5
    ],
    checked:[
      0,0,0,0,0
    ],
    commitData: {
      cid: '',
      sid: '',
      tid: '',
      score: 0,
      chk: 1,
      comment: '未输入意见'
    }
  },
  onLoad: function(options)
  {
    var _info = this.data.commitData;
    var that = this;
    _info.tid = options.tid;
    _info.cid = options.cid;
    _info.sid = app.globalData.cUser.id;
    this.setData({
      isSTU: app.globalData.cUser.isSTU,
      commitData: _info
    });
  },
  radioChange: function (e) {
    var _info = this.data.commitData;
    var _chk = this.data.checked;
    _chk[parseInt(e.target.dataset.iid)] = util.countScore(e.detail.value);
    _info.score = 0;
    for(var ss in _chk)
    {
      _info.score += _chk[ss];
    }
    this.setData({
      commitData: _info,
      checked: _chk
    })
  },
  inputComment: function(e){
    var _info = this.data.commitData;
    if(e.detail.value == '' || e.detail.value == null)
    {
      return;
    }
    _info.comment = e.detail.value;
    this.setData({
        commitData: _info
    });
  },
  btnCommit: function()
  {
    var _info = this.data.commitData;
    var _chk = this.data.checked;
    var that = this;
    for(var num in _chk)
    {
      if (_chk[num] == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择全部评分项！',
        });
        return;
      }
    }
    wx.showModal({
      title: '提示',
      content: '评教结果一经提交将不能再做修改，确定提交吗？',
      success: function(res) {
        if(res.confirm)
        {
          wx.showLoading({
            title: '正在提交...'
          });
          wx.request({
            url: 'url',
            data: _info,
            header: {},
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              if (res.data == 'yes') {
                wx.navigateBack({
                  delta: 1
                });
              } else {
                wx.showModal({
                  title: '提示',
                  content: '提交失败！',
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
        else{

        }
      },
      fail: function(res) {},
      complete: function(res) {},
    });
  }
})