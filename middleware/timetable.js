const Model = require('../model/model')
const Timetable = require('../model/timetable')

module.exports = {

  // 查询所有课程表
  find(req, res, next) {
    let user = req.cookies.user
    Model.find(Timetable, {user}).then((data) => {
      req.timetables = data
      console.log(`课程表信息：${data}`)
      next()
    }).catch((err) => {
      console.log(err)
      next()
    })
  },

  // 添加课程表
  insert(req, res, next) {
    let user = req.cookies.user
    let {name, type, cclass, number, time, msg} = req.body
    Model.insert(Timetable, {user, name, type, class: cclass, number, time, msg}).then((data) => {
      console.log(`添加的课程表：${data}`);
      res.send('添加成功')
      next()
    }).catch((err) => {
      console.log(err);
      res.send('添加失败')
      next()
    })
  },

  // 查询单个课程表
  findOne(req, res, next) {
    let name = req.params.name
    let user = req.cookies.user
    Model.find(Timetable, {user, name}).then((data) => {
      console.log(`查询到的单个课程表：${data[0]}`);
      req.timetable = data[0]
      next()
    }).catch((err) => {
      console.log(err);
      next()
    })
  },

  // 更新课程表
  update(req, res, next) {
    let {name, type, cclass, number, time, msg} = req.body
    let user = req.cookies.user
    Model.updateOne(Timetable, {user, name}, {type, class: cclass, number, time, msg}).then((data) => {
      console.log(`更新的课程表：${data}`)
      res.send('添加成功')
      next()
    }).catch((err) => {
      console.log(err);
      res.send('添加失败')
      next()
    })
  },

  // 删除课程表
  deleteOne(req, res, next) {
    let user = req.cookies.user
    let name = req.params.name
    console.log(user, name);
    Model.deleteOne(Timetable, {user, name}).then((data) => {
      console.log(`删除的数据：${data}`);
      res.send('删除成功')
      next()
    }).catch((err) => {
      console.log(err)
      res.send('删除失败')
      next()
    })
  }

}