var nodemailer = require('nodemailer');
const ss1 = "<html><body><div style='width:100%;height:auto;line-height:30px;'>";
const ss2 = "<h1 style='padding-left: 25%;'>来自Simple评教</h1></br>";
const ss3 = "<p style='margin-left:10px;'>&nbsp;&nbsp;您正在使用<b>Simple评教</b>小程序的帐号<b>密码重置</b>服务，请在35分钟内使用此验证码：</br><div style='text-align:center'><b><a>";
const ss4 = "</div></body><footer style='width:100%;height:auto;line-height:30px'>";
const ss5 = "<p style='text-align:right'>Simple评教</p></footer></html>";
 
var transporter = nodemailer.createTransport({
  service: 'qq',
  host: 'smtp.qq.com',
  secure: true,
  port: 465,
  auth: {
      user: 'username',		//这里用的qq邮箱，所以此处密码应为授权码，具体操作以及其他邮箱请自行搜索。
      pass: 'password'
  }
});
 
exports.send = function(code, distuser) {
  let sendStr = ss1 + ss2 + ss3 + code + "</a></b></div></p>" + ss4 + ss5;
  mailOptions = {
      from: '"Simple 评教" <user>', // login user must equel to this user
      to: distuser,
      subject: '验证码',
      text: 'text', 
      html: sendStr
  };
 
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }
      console.log('Message sent: ' + info);
  });
}