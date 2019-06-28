//加密密钥
const key = 'your key';
const cons = require('crypto');

//加密
exports.aesCrypto = function(data)
{
	//创建一个加了秘钥的暗号
   const cipher =  cons.createCipher('aes192', key);
   //将暗号转换成十六进制
   var aes = cipher.update(data, 'utf-8', 'hex');
   aes+=cipher.final('hex');
   return aes;
};

//解密
exports.aesDecrypto = function(data)
{
	const dcipher = cons.createDecipher('aes192', key);
    var daes = dcipher.update(data, 'hex', 'utf-8');
    daes+=dcipher.final('utf-8');
    return daes;
};