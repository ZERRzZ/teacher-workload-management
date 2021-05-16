const mongoose = require('mongoose')

const kSchma = new mongoose.Schema({
  type: String,
  class: Number,
  k: Number
})

const K = mongoose.model('ks', kSchma)

module.exports = K