const Model = require('../model/model')
const Workload = require('../model/workload')

module.exports = {

  find(req, res, next) {
    let user = req.cookies.user
    Model.find(Workload, {user}).then((data) => {
      req.workloads = data
      console.log(`查询的工作量：${data}`)
      next()
    }).catch((err) => {
      console.log(err);
      next()
    })
  },

  deleteOne(req, res, next) {
    let user = req.cookies.user
    let name = req.params.name
    Model.deleteOne(Workload, {user, name}).then((data) => {
      console.log(`删除的工作量：${data}`);
      res.send('删除成功')
      next()
    }).catch((err) => {
      console.log(err);
      res.send('删除失败')
      next()
    })
  },

  findOne(req, res, next) {
    let user = req.cookies.user
    let name = req.params.name
    Model.find(Workload, {user, name}).then((data) => {
      console.log(`查询到的工作量：${data[0]}`);
      req.workload = data[0]
      next()
    }).catch((err) => {
      console.log(err);
      next()
    })
  },

  updateOne(req, res, next) {
    let user = req.cookies.user
    let { type, name, cclass, time, number, k, workload, msg } = req.body
    Model.updateOne(Workload, {user, name}, {type, cclass, time, number, k, workload, msg}).then((data) => {
      console.log(`更新的工作量：${data}`);
      res.send('更新成功')
      next()
    }).catch((err) => {
      console.log(err);
      res.send('更新失败')
      next()
    })
  }

}