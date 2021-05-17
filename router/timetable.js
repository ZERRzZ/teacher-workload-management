const express = require('express')

const timetable = require('../middleware/timetable')
const workload = require('../middleware/workload')

const timetableRouter = express.Router()

// 查询所有课程表, 并以此插入工作量
timetableRouter.get('/timetables', [timetable.find, workload.insertByTimetable], (req, res) => {
  res.render('timetable.html', {data: req.timetables, user: req.cookies.user})
})

timetableRouter.post('/timetables', [timetable.insert])

timetableRouter.get('/timetables/:name', [timetable.findOne], (req, res) => {
  res.render('showTimetable.html', {data: req.timetable})
})

timetableRouter.put('/timetables', [timetable.update])

timetableRouter.delete('/timetables/:name', [timetable.deleteOne])

module.exports = timetableRouter