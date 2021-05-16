const Model = require('../model/model')
const Teacher = require('../model/teacher')

module.exports = {

  // 查询教师信息
  find(req, res, next) {
    let user = req.cookies.user
    Model.find(Teacher, {user}).then(data => {
      console.log(`查询教师信息: ${data}`);
      req.teachers = data[0]
      next()
    }).catch(err => {
      console.log(err)
      next()
    }) 
  },

  // 更新教师信息
  updateOne(req, res, next) {
    let user = req.cookies.user
    let {gender, tel} = req.body
    Model.updateOne(Teacher, {user}, {gender, tel}).then(data => {
      console.log(`更新教师信息: ${data}`);
      res.send('保存成功!')
      next()
    }).catch((err) => {
      console.log(err)
      res.send('保存失败!')
      next()
    })
  }

}