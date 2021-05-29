const Model = require('../model/model')
const Teacher = require('../model/teacher')
const User = require('../model/user')

module.exports = {

  find(req, res, next) {
    let { user, pass } = req.query
    if (user == 'root') {
      Model.find(User, { user, pass }).then((data) => {
        console.log(`管理员登陆: ${data}`)
        res.send(data)
        next()
      }).catch((err) => {
        console.log(err)
        next()
      })
    } else {
      Model.find(Teacher, { user, pass }).then((data) => {
        console.log(`登陆信息: ${data}`)
        res.send(data)
        next()
      }).catch((err) => {
        console.log(err)
        next()
      })
    }
  }

}