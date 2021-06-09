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
    req.timetables.forEach( v => {
      let {type, name, number, time, msg} = v
      console.log(type, name, number, time, v.class);
      Model.find(K, {type}).then((data) => {
        console.log(data[0]);
        let k = Number(data[0].origin) * ( 1 + Number(data[0].aging) * Number(v.class))
        console.log(k)
        let workload 
        switch (type) {
          case '理论课':
            workload = Number(time) * Number(k)
            break;
          case '课程设计':
            workload = Number(time) * 15 * Number(k)
            break;
          case '市外实习':
            workload = Number(time) * 8 * Number(k)
            break;
          case '市内实习':
            workload = Number(time) * 4 * Number(k)
            break;
          case '校内实习':
            workload = Number(time) * 3 * Number(k)
            break;
          case '毕业设计':
            workload = Number(number) * Number(k)
            break;
          default: res.send('课程类型不符合')
            break;
        }
        workload = Number(workload.toFixed(2))
        console.log(workload)
        Model.find(Workload, {user, name, type}).then(data => {
          if(data.length == 0) {
            Model.insert(Workload, {user, type, name, class: v.class, time, number, k, workload, msg}).then((data) => {
              console.log(`插入的工作量是`);
              console.log(data)
            }).catch(err => console.log(err))
          } else {
            Model.updateOne(Workload, { user, type, name }, {class: v.class, time, number, k, workload, msg})
          }
        })
      }).catch((err) => console.log(err))
    })
    next()
  }

}