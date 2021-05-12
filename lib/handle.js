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

// 处理课程表展示的请求
function getTimetable(req, res) {
  let user = req.cookies.user
  db.Timetable.find({'user': user}, (err, data) => {
    res.render('timetable.html', { data, user })
    let workarr = []
    data.forEach((v) => {
      let obj = {
        user: v.user,
        type: v.type,
        name: v.name,
        time: v.time,
        number: v.number,
        k: 1 + 0.1 * parseInt((v.number / 30)),
      }
      obj.workload = Number((obj.time * obj.k).toFixed(2))
      workarr.push(obj)
    })
    workarr.forEach((v) => {
      db.Workload.findOne({'name': v.name}, (err, data) => {
        if (data) return
        else {
          new db.Workload({
            user: v.user,
            type: v.type,
            name: v.name,
            time: v.time,
            number: v.number,
            k: v.k,
            workload: v.workload
          }).save((err, data) => {
            if (err) console.log(err);
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
    res.render('showTimetable.html', data)
  })
}

// 增加课程表的请求
function insertTimetable(req, res) {
  let user = req.cookies.user
  new db.Timetable({
    name: req.body.name,
    user: user,
    type: req.body.type,
    number: Number(req.body.number),
    time: Number(req.body.time)
  }).save((err, data) => {
    if (err) res.send("插入失败")
    else {
      res.send("插入成功")
      // new db.Workload({
      //   user: data.user,
      //   type: data.type,
      //   name: data.name,
      //   time: data.time,
      //   number: data.number,
      //   k: 1 + 0.1 * parseInt((v.number / 30)),
      //   workload: this.time * this.k
      // }).save((err, data) => {
      //   if (err) console.log(err);
      // })
    }
  })
}

// 更新课程表的请求
function updateTimetable(req, res) {
  let {name, type, number, time} = req.body
  db.Timetable.updateOne({'name': name}, {'type': type, 'number': number, 'time': time}, (err, data) => {
    console.log(data);
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

// 展示所有工作量的请求
function getworkload(req, res) {
  let user = req.cookies.user
  db.Workload.find({user}, (err, data) => {
    res.render('result.html', { data, user })
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
  getworkload
}