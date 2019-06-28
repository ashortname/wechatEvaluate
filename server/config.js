var fs = require('fs');
//Https SSL 配置
var privateKey = fs.readFileSync('*.key', 'utf8');
var certificate = fs.readFileSync('*.crt', 'utf8');
exports.credentials = {
	key : privateKey, 
	cert : certificate
	};

//数据库配置
exports.SQLInfo = {
	host     : 'ip',
	user     : 'username',
	password : 'password',
	database : 'dataBase'
};