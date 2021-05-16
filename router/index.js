// 首页子应用
const express = require('express')

const indexRouter = express.Router()

// 访问 / 时，展示登录页面, cookie有值时，则展示主页面
indexRouter.get('/', (req, res) => {
  if (!req.cookies.user) res.render('login.html')
  else res.render('index.html', {user: req.cookies.user})
})

module.exports = indexRouter