const express = require('express')

const teacher = require('../middleware/teacher')

// 创建子路由
const teacherRouter = express.Router()

// 中括号里也可以使用中间件
teacherRouter.get('/teachers', [teacher.find], (req, res) => { 
  res.render('teacher.html', req.teachers)
})

teacherRouter.put('/teachers', [teacher.updateOne])

module.exports = teacherRouter