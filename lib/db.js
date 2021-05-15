const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://@cluster0.aazni.mongodb.net/sadanya?retryWrites=true&w=majority", {
  user: 'sadanya',
  pass: 'lMQJe1YlzQ40AIty',
  useUnifiedTopology: true, // 处理警告
  useNewUrlParser: true  // 处理警告
})
.then(() => console.log("mongoDB connected!"))
.catch((err) => console.log(err))

// 创建 teacher 相关的实例
let teacherSchma = new mongoose.Schema({
  user: String,
  pass: String,
  gender: String,
  tel: String
})
let Teacher = mongoose.model('teachers', teacherSchma)

// 创建 timetable 相关实例
let timetableSchma = new mongoose.Schema({
  name: String,
  user: String,
  type: String,
  class: Number,
  time: Number,
  number: Number,
  msg: String
})
let Timetable = mongoose.model('timetables', timetableSchma)

// 创建 workloads 相关实例
let workloadSchma = new mongoose.Schema({
  user: String,
  type: String,
  name: String,
  class: Number,
  time: Number,
  number: Number,
  k: Number,
  workload: Number,
  msg: String
})
let Workload = mongoose.model('workloads', workloadSchma)

// 创建 ks 相关实例
let kSchma = new mongoose.Schema({
  type: String,
  class: Number,
  k: Number
})
let K = mongoose.model('ks', kSchma)

// 对数据库增删改查的具体实现
// 更新 workloads 数据库
let updateWorkload = (filter, update) => {
  return new Promise((resolve, reject) => {
    Workload.updateOne(filter, update, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = {
  Teacher,
  Timetable,
  Workload,
  K,
  updateWorkload
}