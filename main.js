const express = require('express')
const req = require('request')
const app = express()

// TODO 添加服务端处理获取客户端 IP
app.get('/', (req,res) => {

  var clientIp = req.headers['x-forwarded-for'] || 
  req.socket.remoteAddress || 
  req.socket.remoteAddress ||
  (req.socket.socket ? req.socket.socket.remoteAddress : null);

  res.render('index.pug', {
    Client_IP: clientIp,
    WEBSITE_HOSTNAME: process.env.WEBSITE_HOSTNAME,
    WEBSITE_RESOURCE_GROUP: process.env.WEBSITE_RESOURCE_GROUP,
    WEBSITE_OWNER_NAME: process.env.WEBSITE_OWNER_NAME,
  })
})

app.listen(process.env.PORT || 3000)