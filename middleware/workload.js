const Model = require('../model/model')
const Workload = require('../model/workload')
const K = require('../model/k')

module.exports = {

  insert(req, res, next) {
    let { type, name, cclass, time, number, k, workload, msg } = req.body
    let user = req.cookies.user
    Model.insert(Workload, {user, type, name, class: cclass, time, number, k, workload, msg}).then((data) => {
      console.log(`插入的工作量：${data}`);
      res.send('插入成功')
      next()
    }).catch((err) => {
      console.log(err);
      res.send('插入失败')
      next()
    })
  },

  // 根据课程表的 name 和 type 查询 k, 并插入或更新工作量
  insertByTimetable(req, res, next) {
    let user = req.cookies.user
    req.timetables.forEach((v) => {
      let cclass = v.class
      let {type, name, number, time, msg} = v
      Model.find(K, {class: cclass, type}).then((data) => {
        console.log(`查到的合班系数：${data}`);
        req.k = data[0].k
        let workload 
        switch (type) {
          case '理论课':
            workload = Number(time) * Number(req.k)
            break;
          case '课程设计':
            workload = Number(time) * Number(req.k)
            break;
          case '实习':
            workload = Number(number) * Number(req.k)
            break;
          case '毕业设计':
            workload = Number(number) * 20
            break;
          default: res.send('课程类型不符合')
            break;
        }
        Model.find(Workload, {user, name, type}).then(data => {
          if(data.length == 0) {
            Model.insert(Workload, {user, type, name, class: cclass, time, number, k: req.k, workload, msg}).then((data) => {
              console.log(`插入的工作量是：${data}`);
            }).catch(err => console.log(err))
          } else {
            Model.updateOne(Workload, {class: cclass, time, number, k: req.k, workload, msg}).then(data => {
              console.log(`更新的工作量是：${data}`);
            }).catch(err => console.log(err))
          }
        })
      }).catch((err) => console.log(err))
    })
    next()
  }

}