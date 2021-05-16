const express = require('express')

const teacher = require('../middleware/teacher')

// 创建子路由
const teacherRouter = express.Router()

// 使用中间件,匹配所有路径
// teacherRouter.use(teacher.find)

// 中括号里使用中间件
teacherRouter.get('/teachers', [teacher.find], (req, res) => { 
  res.render('teacher.html', req.teachers)
})

teacherRouter.put('/teachers', [teacher.updateOne])

module.exports = teacherRouter