const Model = require('../model/model')
const Teacher = require('../model/teacher')

module.exports = {

  find(req, res, next) {
    let {user, pass} = req.query
    Model.find(Teacher, {user, pass}).then((data) => {
      console.log(`登陆信息: ${data}`)
      res.send(data)
      next()
    }).catch((err) => {
      console.log(err)
      next()
    })
  }

}