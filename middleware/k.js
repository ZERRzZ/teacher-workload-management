const Model = require('../model/model')
const K = require('../model/k')

module.exports = {

  find(req, res, next) {
    Model.find(K).then((data) => {
      req.ks = data
      console.log(`查询合班系数: ${data}`)
      next()
    }).catch((err) => {
      console.log(err)
      next()
    })
  }

}