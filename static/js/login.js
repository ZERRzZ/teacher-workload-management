let login = document.getElementById('login')

login.addEventListener('click', () => {
  let user = document.querySelector('[name="user"]')
  let pass = document.querySelector('[name="pass"]')

  let params = `user=${user.value}&pass=${pass.value}`
  const ajax = new XMLHttpRequest()

  ajax.open("get", `/tokens?${params}`, true)
  // ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded")
  ajax.onload = () => {
    if (ajax.status == 200) {
      if (ajax.responseText == '[]') {
        alert('登陆失败')
      } else {
        // 将个人信息的数据转换成js对象
        let data = JSON.parse(ajax.responseText)
        // 当管理员登录时, 进入管理员页面
        if (data[0].user == 'root') {
          location = '/roots'
        } else {
          // date 是时间，设置cookie存在的时间
          let date = new Date()
          date = new Date(date.setDate(date.getDate() + 7))
          document.cookie = `user=${data[0].user}; expires=${date}; path=/`
          alert('登录成功')
          location = "/"
        }
      }
    }
  }
  ajax.send()
})