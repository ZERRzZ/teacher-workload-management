const mongoose = require('mongoose')

const timetableSchma = new mongoose.Schema({
  name: String,
  user: String,
  type: String,
  class: Number,
  time: Number,
  number: Number,
  msg: String
})

const Timetable = mongoose.model('timetables', timetableSchma)

module.exports = Timetable