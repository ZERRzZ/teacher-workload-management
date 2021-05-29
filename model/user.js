const mongoose = require('mongoose')

const userSchma = new mongoose.Schema({
  user: String,
  pass: String
})

const User = mongoose.model('roots', userSchma)

module.exports = User