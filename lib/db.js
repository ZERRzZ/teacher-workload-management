const mongoose = require('mongoose')
// 连接数据库
mongoose.connect("mongodb://localhost/sadanya", {
  user: 'root',
  pass: '12345',
  authSource: 'admin',
  useUnifiedTopology: true, // 处理警告
  useNewUrlParser: true  // 处理警告
})
// 判定是否连接成功
mongoose.connection.on('connected', () => console.log("database connected succeed!"))
mongoose.connection.on('error', (error) => console.log(error))

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
  number: Number,
  time: Number
})
let Timetable = mongoose.model('timetables', timetableSchma)

// 创建 workloads 相关实例
let workloadSchma = new mongoose.Schema({
  user: String,
  type: String,
  name: String,
  time: Number,
  number: Number,
  k: Number,
  workload: Number
})
let Workload = mongoose.model('workloads', workloadSchma)

module.exports = {
  Teacher,
  Timetable,
  Workload
}