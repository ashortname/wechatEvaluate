const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const getScore = function(num)
{
  var score = 0;
  switch(num)
  {
    case '0':
      score = 20;
      break;
    case '1':
      score = 15;
      break;
    case '2':
      score = 10;
      break;
    case '3':
      score = 5;
      break;
  }
  return score;
}

const tname = function(ss)
{
  var res_name = /^[\u4e00-\u9fa5a-z_]{2,8}$/g;
  return (res_name.test(ss));
}

const tsex = function(ss)
{
  //匹配性别
  var res_sex = /^\u7537$/;
  var res_sex2 = /^\u5973$/
  return (res_sex.test(ss) || res_sex2.test(ss));
}

const tid = function (ss) {
  //匹配学号：4-12位数字
  var res_id = /^\d{4,12}$/
  return res_id.test(ss);
}

const tclass = function(ss)
{
  //匹配班级
  var res_class = /^[\u4e00-\u9fa5]+[\w-:]+$/;
  return res_class.test(ss);
}

const tage = function (ss) {
  //匹配年龄
  var res_age = /^\d{1,3}$/
  return res_age.test(ss);
}

const tpwd = function (ss) {
  //匹配密码
  var res_pass = /^[\w-:;,.]{6,12}$/;
  return res_pass.test(ss);
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  countScore: getScore,
  tName: tname,
  tAge: tage,
  tClass: tclass,
  tId: tid,
  tSex: tsex,
  tPwd: tpwd
}
