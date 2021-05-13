const db = require("./db")

// 处理登录请求
function tokens(req, res) {
  let user = req.body.user
  let pass = req.body.pass
  db.Teacher.find({$and: [{'user': user}, {'pass': pass}]}).exec((err, data) => {
    // 返回整个从数据库里得到的数据
    res.send(data)
  })
}

// 处理注册请求
function logons(req, res) {
  let user = req.query.user
  let pass = req.query.password
  // 查找数据库里有没有重复的名字
  db.Teacher.find({'user': user}).exec((err, data) => {
    // 判断是否在数据库找的到重复的名字
    if(data.length !== 0 ) {
      res.send('用户名已存在！')
      return
    }
    // 用户名没有重复时，存入数据库
    let teachers = new db.Teacher({
      user: user,
      pass: pass
    })
    teachers.save((err, data) => {
      if (err) res.send(err)
      else res.send('注册成功!')
    })
  })
}

// 处理个人信息展示的请求
function getMessage(req, res) {
  let user = req.cookies.user
  db.Teacher.find({'user': user}).exec((err, data) => {
    res.render('message.html', data[0])
  })
}

// 处理个人信息更新的请求
function updateMessage(req, res) {
  let user = req.cookies.user
  let gender = req.body.gender
  let tel = req.body.tel
  db.Teacher.updateOne({'user': user}, {'gender': gender, 'tel': tel}, (err, data) => {
    if (data) res.send("保存成功！")
    else res.send("保存失败！")
  })
}

// 查询所有课程表，并且插入相关的工作量
function getTimetable(req, res) {
  let user = req.cookies.user
  db.Timetable.find({'user': user}, (err, data) => {
    res.render('timetable.html', { data, user })
    // 循环课程表，开始向工作量表中增加数据
    data.forEach((v) => {
      db.Workload.findOne({ name: v.name, type: v.type }, (err, cdata) => {
        // 当 name 和 type 重复时更新
        if (cdata) {
          // 根据 type 和 class 查询得到 k 值
          db.K.find({ type: v.type, class: v.class }, (err, kdata) => {
            db.Workload.updateOne({ name: v.name, type: v.type }, {
              class: v.class,
              time: v.time,
              number: v.number,
              k: kdata[0].k,
              worklaod: Number((v.time * kdata[0].k).toFixed(2)),
              msg: v.msg
            }, (err, data) => { })
          })
        } else { 
          // 当 name 和 type 不重复时插入
          // 根据 type 和 class 查询得到 k 值
          db.K.find({ type: v.type, class: v.class }, (err, kdata) => {
            new db.Workload({
              user: user,
              type: v.type,
              name: v.name,
              class: v.class,
              time: v.time,
              number: v.number,
              k: kdata[0].k,
              workload: Number((v.time * kdata[0].k).toFixed(2)),
              msg: v.msg
            }).save()
          })
        }
      })
    })
  })
}

// 查询单个课程表
function getTimetableByName(req, res) {
  let name = req.params.name
  db.Timetable.findOne({'name': name}, (err, data) => {
    res.render('showTimetable.html', { data })
  })
}

// 增加课程表的请求
function insertTimetable(req, res) {
  let user = req.cookies.user
  new db.Timetable({
    name: req.body.name,
    user: user,
    type: req.body.type,
    class: req.body.class,
    number: Number(req.body.number),
    time: Number(req.body.time),
    msg: req.body.msg
  }).save((err, data) => {
    if (err) res.send("插入失败")
    else {
      res.send("插入成功")
    }
  })
}

// 更新课程表的请求
function updateTimetable(req, res) {
  db.Timetable.updateOne({'name': req.body.name }, {
    'type': req.body.type, 
    'class': req.body.class,
    'number': req.body.number, 
    'time': req.body.time,
    'msg': req.body.msg
  }, (err, data) => {
    if (data.nModified >= 0) res.send("修改成功！")
    else res.send("修改失败！")
  })
}

// 删除课程表的请求
function deleteTimetable(req, res) {
  let name = req.params.name
  db.Timetable.deleteOne({ name }, (err, data) => {
    if (data.deletedCount >= 0) res.send("删除成功")
    else res.send("删除失败")
  })
}

// 查询所有合班系数
function getAllK(req, res) {
  let user = req.cookies.user
  db.K.find({}, (err, data) => {
    res.render("k.html", { data, user })
  })
}

// 展示工作量录入页面
function showWorkload(req, res) {
  let user = req.cookies.user
  res.render("workload.html", { user })
}

// 插入工作量
function insertWorkload(req, res) {
  if (req.body.cname == '') {
    res.send("工作量名称不能为空")
    return
  }
  let user = req.cookies.user
  let { type, cname, cclass, time, number, k, msg } = req.body
  new db.Workload({ 
    user, 
    type, 
    name: cname, 
    class: cclass, 
    time, 
    number, 
    k, 
    workload: Number((k * time).toFixed(2)), 
    msg 
  }).save((err) => {
    if (err) res.send("插入失败")
    else res.send("插入成功")
  })
}

// 展示所有工作量的请求
function getworkload(req, res) {
  let user = req.cookies.user
  db.Workload.find({user}, (err, data) => {
    res.render('result.html', { data, user })
  })
}

// 查询单个工作量
function getWorkloadByName(req, res) {
  let name = req.params.name
  db.Workload.findOne({ name }, (err, data) => {
    res.render("show-result.html", { data })
  })
}

// 更新工作量
function updateWorkload(req, res) {
  console.log(req.body);
  let { type, name, cclass, time, number, k, workload, msg } = req.body
  db.updateWorkload({ name }, { type, cclass, time, number, k, workload, msg }).then((data) => {
    res.send("修改成功")
  }).catch((err) => {
    res.send("修改失败")
    console.log(err);
  })
} 

// 删除所选工作量
function deleteWorkload(req, res) {
  let name = req.params.name
  db.Workload.deleteOne({ name }, (err, data) => {
    if (data.deletedCount >= 0) res.send("删除成功")
    else res.send("删除失败")
  })
}

module.exports = {
  tokens,
  logons,
  getMessage,
  updateMessage,
  getTimetable,
  insertTimetable,
  getTimetableByName,
  updateTimetable,
  deleteTimetable,
  getAllK,
  showWorkload,
  insertWorkload,
  getworkload,
  deleteWorkload,
  getWorkloadByName,
  updateWorkload
}