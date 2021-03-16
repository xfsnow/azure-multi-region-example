const express = require('express')
const http = require("http")
const request = require('request')
const app = express()

const IP_API = 'http://ip-api.com/json/' //?lang=zh-CN

/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
   clientIp = req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      req.connection.socket.remoteAddress;
  // clientIp = '139.162.86.234:16772'
  // 上述获得的 IP 还可能带端口，裁掉
   arr = clientIp.toString().split(':');
   return arr[0];
};

// TODO 添加服务端处理获取客户端 IP
app.get('/', (req,res) => {
  var clientIp = getClientIP(req)
  var Client_Address = '未知地点'
  console.log(clientIp);
  var url = IP_API + clientIp + '?lang=zh-CN'
  console.log(url)
  request(url, function(err, response, body){
  //err 当前接口请求错误信息
  //response 一般使用statusCode来获取接口的http的执行状态
  //body 当前接口response返回的具体数据 返回的是一个jsonString类型的数据 
  //需要通过JSON.parse(body)来转换
  if(!err && response.statusCode == 200){
      //todoJSON.parse(body)
      var data = JSON.parse(body);
      console.log(data) 
      Client_Address = data.country+' '+data.city
  }
  res.render('index.pug', {
    Client_IP: clientIp,
    Client_Address: Client_Address,
    WEBSITE_HOSTNAME: process.env.WEBSITE_HOSTNAME,
    WEBSITE_RESOURCE_GROUP: process.env.WEBSITE_RESOURCE_GROUP,
    WEBSITE_OWNER_NAME: process.env.WEBSITE_OWNER_NAME,
    })
  })
})

// 指定 IPv4 格式，这样后续获取到的客户端IP地址才是 IPv4 格式的
var server = app.listen(process.env.PORT || 3000, '0.0.0.0',function () {
  var host = server.address().address
  var port = server.address().port
  console.log('服务启动...')
})