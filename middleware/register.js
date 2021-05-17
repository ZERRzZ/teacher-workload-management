const Model = require('../model/model')
const Teacher = require('../model/teacher')

module.exports = {

  find(req, res, next) {
    let user = req.query.user
    Model.find(Teacher, {user}).then((data) => {
      console.log(`查找到的数据：${data}`);
      req.register = data
      next()
    }).catch((err) => {
      console.log(err);
      res.send('注册失败, 未知错误')
      next()
    })
  },

  insert(req, res, next) {
    let {user, pass} = req.query
    if (req.register.length == 0) {
      Model.insert(Teacher, {user, pass}).then((data) => {
        console.log(`插入的用户：${data}`);
        res.send('注册成功')
        next()
      }).catch((err) => {
        console.log(err);
        res.send('注册失败，未知错误')
        next()
      })
    } else {
      res.send('用户已存在')
      next()
    }
  }

}