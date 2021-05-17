const express = require('express')

const result = require('../middleware/result')

const resultRouter = express.Router()

resultRouter.get('/results', [result.find], (req, res) => {
  res.render('result.html', {data: req.workloads, user: req.cookies.user})
})

resultRouter.delete('/results/:name', [result.deleteOne])

resultRouter.get('/results/:name', [result.findOne], (req, res) => {
  res.render('show-result.html', {data: req.workload})
})

resultRouter.put('/results', [result.updateOne])

module.exports = resultRouter