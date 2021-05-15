const mongoose = require('mongoose')

const userSchma = new mongoose.Schema({
  user: String,
  pass: String
})

const User = mongoose.model('users', userSchma)

module.exports = User