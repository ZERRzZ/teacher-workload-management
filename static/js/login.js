let user = document.querySelector('[name="user"]')
let pass = document.querySelector('[name="pass"]')
let login = document.getElementById('login')

login.addEventListener('click', () => {
  let params = `user=${user.value}&pass=${pass.value}`
  const ajax = new XMLHttpRequest()
  ajax.open("post", "/tokens/", true)
  ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded")
  ajax.onload = () => {
    if (ajax.status == 200) {
      if (ajax.responseText == '[]') {
        alert('登陆失败！')
      } else {
        // 将个人信息的数据转换成js对象
        let data = JSON.parse(ajax.responseText)
        // date 是时间，设置cookie存在的时间
        let date = new Date()
        date = new Date(date.setDate(date.getDate() + 7))
        document.cookie = `user=${data[0].user}; expires=${date}; path=/`
        location = "/"
      }
    }
  }
  ajax.send(params)
})

function cookieDate() {
  let date = new Date()
  date = new Date(date.setDate(date.getDate() + 7))
  console.log(date);
}