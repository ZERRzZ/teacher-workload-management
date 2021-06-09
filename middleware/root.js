const Model = require('../model/model')
const K = require('../model/k')
const Workload = require('../model/workload')

module.exports = {

  find(req, res, next) {
    Model.find(K).then((data) => {
      req.ks = data
      console.log(`查询合班系数: ${data}`)
      next()
    }).catch((err) => {
      console.log(err)
      next()
    })
  },

  findAllWorkload(req, res, next) {
    Model.find(Workload).then((data) => {
      req.workloads = data
      console.log(`所有工作量: ${data}`);
      next()
    }).catch((err) => {
      console.log(err);
      next()
    })
  },

  findOne(req, res, next) {
    let type = req.params.type
    Model.find(K, { type }).then(data => {
      req.k = data[0]
      console.log(req.k)
      next()
    })
  },

  updateOne(req, res, next) {
    const {type, aging, origin } = req.body
    console.log(req.body)
    Model.updateOne(K, { type }, { aging, origin }).then(data => {
      console.log(data)
      res.send('更新成功!')
      next()
    }).catch(err => {
      console.log(err)
      res.send('更新失败!')
      next()
    })
  }
}