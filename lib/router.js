const express = require("express")
const handle = require("./handle")

const router = express.Router()

// 访问 / 时，展示登录页面, cookie有值时，则展示主页面
router.get("/", (req, res) => {
  if (!req.cookies.user) res.render('login.html')
  else res.render('index.html', {user: req.cookies.user})
})

// 访问 /logins，展示登录页面
router.get("/logins", (req, res) => {
  res.render('login.html')
})

// 访问 /registers, 展示注册页面
router.get("registers/", (req, res) => {
  res.render('register.html')
})

// 访问 /tokens，处理登录请求
router.post("/tokens", (req, res) => {
  handle.tokens(req, res)
})

// 访问 /logons, 处理注册请求
router.get("/logons", (req, res) => {
  handle.logons(req, res)
})

// 访问 /teachers，展示个人信息页面
router.get("/teachers", (req, res) => {
  handle.getMessage(req, res)
})

// 访问 /updateMessages，更新个人信息处理
router.post("/updateMessages", (req, res) => {
  handle.updateMessage(req, res)
})

// 访问 /timetables,展示课程表页面
router.get("/timetables", (req, res) => {
  handle.getTimetable(req, res)
})

// 访问 /timetables/:id 展示单个页面
router.get("/timetables/:name", (req, res) => {
  handle.getTimetableByName(req, res)
})

// 访问 /timetables post, 增添课程表
router.post("/timetables", (req, res) => {
  handle.insertTimetable(req, res)
})

// 访问 /timetables/put, 更新课程表
router.put("/timetables", (req, res) => {
  handle.updateTimetable(req, res)
})

// 访问 /timetables delete, 删除课程表
router.delete("/timetables/:name", (req, res) => {
  handle.deleteTimetable(req, res)
})

// 访问 /ks 查询所有合班系数
router.get("/ks", (req, res) => {
  handle.getAllK(req, res)
})

// 访问 /workloads get, 展示工作量录入界面
router.get("/workloads", (req, res) => {
  handle.showWorkload(req, res)
})

// 访问 /workloads post, 插入工作量
router.post("/workloads", (req, res) => {
  handle.insertWorkload(req, res)
})

// 访问 /results get, 查询所有工作量结果
router.get("/results", (req, res) => {
  handle.getworkload(req, res)
})

// 访问 /results/name get, 查询单个工作量结果
router.get("/results/:name", (req, res) => {
  handle.getWorkloadByName(req, res)
})

// 访问 /results put, 更新工作量
router.put("/results", (req, res) => {
  handle.updateWorkload(req, res)
})

// 访问 /results/:name delete, 删除所选工作量
router.delete("/results/:name", (req, res) => {
  handle.deleteWorkload(req, res)
})

module.exports = router