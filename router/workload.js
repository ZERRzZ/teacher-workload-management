const express = require('express')

const workload = require('../middleware/workload')

const workloadRouter = express.Router()

workloadRouter.get('/workloads', (req, res) => {
  res.render('workload.html', {user: req.cookies.user})
})

workloadRouter.post('/workloads', workload.insert)

module.exports = workloadRouter