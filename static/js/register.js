let submit = document.querySelector('[value="提交"]')
let user = document.querySelector('[name="user"]')
let password = document.querySelector('[name="password"]')

submit.addEventListener('click', () => {
  let params = `?user=${user.value}&password=${password.value}`
  const ajax = new XMLHttpRequest()
  ajax.open('get', '/logons' + params, true)
  ajax.onload = () => {
    if (ajax.status == 200) {
      alert(ajax.responseText)
      if (ajax.responseText === '注册成功!') {
        location = "/logins"
      }
    }
  }
  ajax.send()
})

