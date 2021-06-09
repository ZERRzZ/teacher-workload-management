// 首页子应用
const express = require('express')

const root = require('../middleware/root')

const rootRouter = express.Router()

// 访问 / 时，展示登录页面, cookie有值时，则展示主页面
rootRouter.get('/roots', (req, res) => {
  res.render('root.html')
})

rootRouter.get('/roots/ks', [root.find], (req, res) => {
  res.render('root-k.html', { data: req.ks })
})

rootRouter.get('/roots/workloads', [root.findAllWorkload], (req, res) => {
  res.render('root-workload.html', { data: req.workloads })
})

rootRouter.get('/roots/:type', [root.findOne], (req, res) => {
  res.render('root-k-update.html', { data: req.k })
})

rootRouter.put('/roots/ks', [root.updateOne])

rootRouter.get('/rootsworkloads/:name',[root.findAllWorkload], (req, res) => {
  res.render('show-result.html', { data: req.workloads[0] })
})

module.exports = rootRouter