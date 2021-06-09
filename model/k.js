const mongoose = require('mongoose')

const kSchma = new mongoose.Schema({
  type: String,
  aging: Number,
  origin: Number
})

const K = mongoose.model('ks', kSchma)

module.exports = K