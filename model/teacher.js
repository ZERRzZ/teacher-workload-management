const mongoose = require('mongoose')

const teacherSchma = new mongoose.Schema({
  user: String,
  pass: String,
  gender: String,
  tel: String
})

const Teacher = mongoose.model('teachers', teacherSchma)

module.exports = Teacher