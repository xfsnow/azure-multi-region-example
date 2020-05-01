const express = require('express')
const app = express()

app.get('/', (req,res) => {
  res.render('index.pug', {
    WEBSITE_HOSTNAME: process.env.WEBSITE_HOSTNAME,
    WEBSITE_RESOURCE_GROUP: process.env.WEBSITE_RESOURCE_GROUP,
    WEBSITE_OWNER_NAME: process.env.WEBSITE_OWNER_NAME,
  })
})

app.listen(process.env.PORT || 3000)