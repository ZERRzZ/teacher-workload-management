const express = require('express')

const register = require('../middleware/register')

// 创建子路由
const registerRouter = express.Router()

registerRouter.get('/registers', (req, res) => {
  res.render('register.html')
})

registerRouter.post('/registers', [register.find, register.insert])

module.exports = registerRouter