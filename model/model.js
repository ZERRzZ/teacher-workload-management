const Link = require("./link")

module.exports = class Model extends Link {
  
  // 更新符合条件的一项
  static updateOne(model, filter, update) {
    return new Promise((resolve, reject) => {
      this.connection()
      model.updateOne(filter, update, (err, data) => {
        if (err) reject(err)
        else resolve(data)
        this.disconnect()
      })
    })
  }

  // 查询符合条件所有项
  static find(model, filter) {
    return new Promise((resolve, reject) => {
      this.connection()
      model.find(filter, (err, data) => {
        if (err) reject(err)
        else resolve(data)
        this.disconnect()
      })
    })
  }

  // 删除符合条件的一项
  static deleteOne(model, filter) {
    return new Promise((resolve, reject) => {
      this.connection()
      model.deleteOne(filter, (err, data) => {
        if (err) reject(err)
        else resolve(data)
        this.disconnect()
      })
    })
  }

  // 新增一项
  static insert(model, insert) {
    return new Promise((resolve, reject) => {
      this.connection()
      new model(insert).save((err, data) => {
        if (err) reject(err)
        else resolve(data)
        this.disconnect()
      })
    })
  }
  
}