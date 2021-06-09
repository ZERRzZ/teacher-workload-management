const mongoose = require('mongoose')

module.exports = class Link {

  // 连接数据库
  static connection() {
    // // 连接云端数据库
    // mongoose.connect("mongodb+srv://@cluster0.aazni.mongodb.net/sadanya?retryWrites=true&w=majority", {
    //   user: 'sadanya',
    //   pass: 'lMQJe1YlzQ40AIty',
    //   useUnifiedTopology: true, // 处理警告
    //   useNewUrlParser: true  // 处理警告
    // }).then(() => {
    //   console.log("mongoDB connected!")
    // }).catch((err) => console.log(err))

    // 连接本地数据库
    mongoose.connect("mongodb://localhost/sadanya", {
      user: 'root',
      pass: '12345',
      authSource: 'admin',
      useUnifiedTopology: true, // 处理警告
      useNewUrlParser: true  // 处理警告
    })
    // .then(() => console.log('mongoDB connected!'))
    .catch((err) => console.log(err))
  }

  // 关闭数据库
  static disconnect() {
    // mongoose.disconnect().then(() => {
    //   console.log("mongoDB disconnected!")
    // }).catch((err) => console.log(err))
  }

}