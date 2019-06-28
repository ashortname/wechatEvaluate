//配置服务器
const express = require('express');
const path = require('path');
const app = express();
const https = require('https');
const config = require('./config');
const httpsServer = https.createServer(config.credentials, app);
const bodyParser = require("body-parser");
//引用数据库操作
const sqlOpt = require('./sql');
//用于获取时间
const moment = require('moment');
//验证码字典
const rand_arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//发送邮件
const mailer = require("./mailer");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//静态网页
app.use(express.static(path.join(__dirname, './static')));

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  next();
});

/*************************
*	处理用户登录
*************************/
app.post('/stulogin', function(req, res){
	var id = req.body.id;
	var pass = req.body.pass;	
	sqlOpt.stulogin(id, pass, function(data){
		res.status(200).end(JSON.stringify(data));				
		switch(data.logStatu)
		{
			case 'yes':
				//res.status(200).end(JSON.stringify(data));
				console.log('IP [%s] User %s login Successful at %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'));
				break;
			case 'no':
				//res.status(200).end(JSON.stringify(data));
				console.log('IP [%s] User %s login Failed at %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'));
				break;
			case 'error':
			default:
				break;
		}
	});
});

/*************************
*	处理用户登录 教师
*************************/
app.post('/tchlogin', function(req, res){
	var id = req.body.id;
	var pass = req.body.pass;	
	sqlOpt.tchlogin(id, pass, function(data){
		res.status(200).end(JSON.stringify(data));
		switch(data.logStatu)
		{
			case 'yes':
				//res.status(200).end('yes');
				console.log('IP [%s] User %s login Successful at %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'));
				break;
			case 'no':
				//res.status(200).end('no');
				console.log('IP [%s] User %s login Failed at %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'));
				break;
			case 'error':
			default:
				break;
		}
	});
});

/****************************
*	注册-学生注册
*	传参：name, pass, id
****************************/
app.post('/stuReg', function(req, res){
	var name = req.body.name;
	var pass = req.body.pass;
	var id = req.body.id;
	
	sqlOpt.getUserInfo(1, id, function(regg){
		if(regg == 'no')
		{
			console.log('IP [%s] User %s:%s registed Failed at %s', getIP(req), id, name, moment().format('YYYY-MM-DD HH:mm:ss'));
			res.status(200).end('exist');
		}else{
			sqlOpt.addStu(req.body, function(data){
			//console.log(data);
			if(data > 0)
			{
				console.log('IP [%s] User %s:%s registed Successful at %s', getIP(req), id, name, moment().format('YYYY-MM-DD HH:mm:ss'));
				res.status(200).end('yes');
				sqlOpt.insertPJ(id);
			}
			else
			{
				console.log('IP [%s] User %s:%s registed Failed at %s', getIP(req), id, name, moment().format('YYYY-MM-DD HH:mm:ss'));
				res.status(200).end('no');
			}
	});
		}
	});	
});

/****************************
*	注册-教师注册
*	传参：name, pass, id
****************************/
app.post('/tchReg', function(req, res){
	var name = req.body.name;
	var pass = req.body.pass;
	var id = req.body.id;
	
	sqlOpt.getUserInfo(0, id, function(regg){
		if(regg == 'no')
		{
			console.log('IP [%s] User %s:%s registed Failed at %s', getIP(req), id, name, moment().format('YYYY-MM-DD HH:mm:ss'));
			res.status(200).end('exist');
		}else{
			sqlOpt.addTch(req.body, function(data){
			//console.log(data);
			if(data > 0)
			{
				console.log('IP [%s] User %s:%s registed Successful at %s', getIP(req), id, name, moment().format('YYYY-MM-DD HH:mm:ss'));
				res.status(200).end('yes');
			}
			else
			{
				console.log('IP [%s] User %s:%s registed Failed at %s', getIP(req), id, name, moment().format('YYYY-MM-DD HH:mm:ss'));
				res.status(200).end('no');
			}
	});
		}
	});	
});

/***********************
*	获取评教信息
*	参数：学生id
************************/
app.get('/pjInfo', function(req, res){
	var id = req.query.id;
	res.header("Content-Type", "application/json;charset=utf-8");
	sqlOpt.getPjInfo(id, function(data){
		res.status(200).end(JSON.stringify(data));
		console.log('IP [%s] Query user %s pj at %s with data: %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'), JSON.stringify(data));
	});
});

/***********************
*	获取评教信息
*	参数：教师id
************************/
app.get('/pjTchInfo', function(req, res){
	var id = req.query.id;
	res.header("Content-Type", "application/json;charset=utf-8");
	sqlOpt.getTchPjInfo(id, function(data){
		res.status(200).end(JSON.stringify(data));
		console.log('IP [%s] Query user %s pj at %s with data: %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'), JSON.stringify(data));
	});
});

/***********************
*  更新密码：学生
***********************/
app.post('/sturepass', function(req, res){
	var id = req.body.id;
	var pass = req.body.pass;
	var newpass = req.body.pass_new;
	sqlOpt.stulogin(id, pass, function(data){
		if(data.logStatu == 'yes')
		{
			sqlOpt.upStuPas(id, newpass, function(data){
				if(data > 0)
				{
					res.status(200).end('yes');
					console.log('IP [%s] User %s change password Successful at %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'));
				}					
				else
				{
					res.status(200).end('no');
					console.log('IP [%s] User %s change password Faild at %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'));
				}
			});
		}
		else{
			res.status(200).end('error');
			console.log('IP [%s] User %s change password Faild at %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'));
		}
	});
	
});

/***********************
*  更新密码：教师
***********************/
app.post('/tchrepass', function(req, res){
	var id = req.body.id;
	var pass = req.body.pass;
	var newpass = req.body.pass_new;
	sqlOpt.tchlogin(id, pass, function(data){
		if(data.logStatu == 'yes')
		{
			sqlOpt.upTchPas(id, newpass, function(data){
				if(data > 0)
				{
					res.status(200).end('yes');
					console.log('IP [%s] User %s change password Successful at %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'));
				}					
				else
				{
					res.status(200).end('no');
					console.log('IP [%s] User %s change password Faild at %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'));
				}
			});
		}
		else{
			res.status(200).end('error');
			console.log('IP [%s] User %s change password Faild at %s', getIP(req), id, moment().format('YYYY-MM-DD HH:mm:ss'));
		}
	});
	
});

/**********************
*	评教
**********************/
app.post('/pjUp', function(req, res){
	sqlOpt.upPjInfo(req.body, function(data){
		if(data > 0)
		{
			res.status(200).end('yes');
			console.log('IP [%s] User %s pj Successful at %s with data [%s]', getIP(req), req.body.sid, moment().format('YYYY-MM-DD HH:mm:ss'), JSON.stringify(req.body));
		}else{
			res.status(200).end('no');
			console.log('IP [%s] User %s pj Failed at %s with data [%s]', getIP(req), req.body.sid, moment().format('YYYY-MM-DD HH:mm:ss'), JSON.stringify(req.body));
		}
	});
});

/*********************
*	忘记密码
*********************/
app.post('/getFCode', function(req, res){
	console.log("User %s apply reset password with mail %s", req.body.acc, req.body.mail);	
	//学生账号
	if(req.body.isStu)
	{
		sqlOpt.getUserInfo(1, req.body.acc, function(regg){
			if(regg == 'yes')
			{
				res.status(200).end("noex");
			}
			else{
				//删除
				sqlOpt.delCode(req.body.acc);
				//插入
				var code = getCode();
				sqlOpt.insertCode(req.body.acc, code, moment().format('YYYY-MM-DD HH:mm:ss'), function(data){
					//发送邮件
					mailer.send(code, req.body.mail);
					res.status(200).end('yes');
				});
			}
		});
	}
	else
	{
		sqlOpt.getUserInfo(0, req.body.acc, function(regg){
			if(regg == 'yes')
			{
				res.status(200).end("noex");
			}
			else{
				//删除
				sqlOpt.delCode(req.body.acc);
				//插入
				var code = getCode();
				sqlOpt.insertCode(req.body.acc, code, moment().format('YYYY-MM-DD HH:mm:ss'), function(data){
					//发送邮件
					mailer.send(code, req.body.mail);
					res.status(200).end('yes');
				});
			}
		});
	}
});

/*********************
*	重置密码
*********************/
app.post('/resetPwd', function(req, res){
	var id = req.body.acc;
	var pass = req.body.pass;
	var code = req.body.code;
	var isStu = req.body.isStu;

	//更改密码
	sqlOpt.getCode(id, function(data){
		if(data == '-2')
			res.status(200).end('error');
		else if(data == '-1')
			res.status(200).end('no');
		else if(code != data)
			res.status(200).end('wrong');
		else{
			if(isStu)
			{
				sqlOpt.getUserInfo(1, req.body.acc, function(regg){
					if(regg == 'yes')
					{
						res.status(200).end('noex');
					}
					else{
						sqlOpt.upStuPas(id, pass, function(data){
							res.status(200).end('yes');
						});
					}
					
					//清码
					//删除
					sqlOpt.delCode(id);
				});
			}				
			else
			{
				sqlOpt.getUserInfo(0, req.body.acc, function(regg){
					if(regg == 'yes')
					{
						res.status(200).end('noex');
					}else{
						sqlOpt.upTchPas(id, pass, function(data){
							res.status(200).end('yes');
						});
					}
					//清码
					//删除
					sqlOpt.delCode(id);
				});
			}				
		}
	});
});

/*********************
*	其他函数
*********************/
//获取ip
function getIP(req)
{
	let api = req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null) || req.headers['x-forwarded-for']; // x-forwarded-for容易被伪造
    if (api.indexOf('::ffff:') !== -1) {
        api = api.substring(7);
    }
    return api;
}

//生成随机码
function getCode()
{
	var code = "";
	for(var i=0; i<4; i++){
        pos = Math.round(Math.random() * (rand_arr.length-1));
        code += rand_arr[pos];
    }
	return code;
}

/**********************
*
*	程序入口
*
**********************/
//开启监听
try{
	httpsServer.listen(443, function(){
	console.log("\n\n--------------------------------------------------------");
	console.log('Server start at %s', moment().format('YYYY-MM-DD HH:mm:ss'));
});
}catch(ex){
	console.log(ex.message);
}
