const mongoose = require('mongoose')

const workloadSchma = new mongoose.Schema({
  user: String,
  type: String,
  name: String,
  class: Number,
  time: Number,
  number: Number,
  k: Number,
  workload: Number,
  msg: String
})

const Workload = mongoose.model('workloads', workloadSchma)

module.exports = Workload