const express = require("express")
const ejs = require("ejs")
const path = require("path")
const cookieParser = require("cookie-parser")
const fileupload = require("express-fileupload")

const {loginRouter, registerRouter, indexRouter, teacherRouter, timetableRouter, kRouter, workloadRouter, resultRouter, rootRouter} = require('./router/router')

const app = express()

// 静态资源
app.use(express.static(path.join(__dirname, "static")))

// 模板引擎
// 设置 html 后缀文件引用模板引擎
app.set("view engine", "html")
// 将默认文件夹设置成自定义文件夹
app.set("views", path.join(__dirname, 'static', 'html'))
// 将后缀名为 html 的文件用 ejs.renderFile 渲染
app.engine('html', ejs.renderFile)

// 中间件的启用
// 当请求数据是表单数据时，解析请求体中的数据
app.use(express.urlencoded())
// 解析并获取 cookie
app.use(cookieParser())
// 解析请求头是 multipart/form-data 即文件上传时的请求体参数
app.use(fileupload())

// 调用各个子路由
app.use([loginRouter, registerRouter, indexRouter, teacherRouter, timetableRouter, kRouter, workloadRouter, resultRouter, rootRouter])

app.listen(8888, () => console.log("start success! http://localhost:8888"))