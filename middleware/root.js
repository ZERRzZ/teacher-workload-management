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
  }
}