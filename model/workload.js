const mongoose = require('mongoose')

const workloadSchma = new mongoose.Schema({
  type: String,
  class: Number,
  k: Number
})

const Workload = mongoose.model('workloads', workloadSchma)

module.exports = Workload