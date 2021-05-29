const express = require('express')

const login = require('../middleware/login')

// 创建子路由
const loginRouter = express.Router()

// 中括号里也可以使用中间件
loginRouter.get('/logins', (req, res) => { 
  res.render('login.html')
})

loginRouter.get('/tokens', [login.find])


module.exports = loginRouter