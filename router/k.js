const express = require('express')

const k = require('../middleware/k')

const kRouter = express.Router()

kRouter.get('/ks', [k.find], (req, res) => {
  res.render('k.html', {data: req.ks, user: req.cookies.user})
})

module.exports = kRouter