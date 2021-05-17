let add = document.getElementById('add')

add.addEventListener('click', () => {
  let cloak = document.getElementById('cloak')
  cloak.style.display = 'block'

  let quit = document.getElementById('quit')
  quit.addEventListener('click', () => {
    setTimeout(() => {
      content.classList.remove("rotate-out")
      cloak.style.display = 'none'
    }, 300)
    let content = document.getElementById('content')
    content.classList.add("rotate-out")
  })

  // 点击提交发送 /timetables post 请求, 添加课程表
  let submit = document.getElementById('submit')
  submit.addEventListener('click', () => {
    const content = new FormData(document.getElementById('content'))
    const ajax = new XMLHttpRequest()
    ajax.open('post', '/timetables', true)
    ajax.onload = () => {
      if (ajax.status == 200) {
        alert(ajax.responseText)
        location = '/timetables'
      }
    }
    ajax.send(content)
  })
})

// 点击修改发送 /timetables/:name 请求，跳转到单个课程表页面
let mods = document.querySelectorAll('input[value="修改"]')
mods.forEach((v) => {
  v.addEventListener('click', (e) => {
    let name = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    location = '/timetables/' + name
  })
})

// 点解删除发送 /timetables delete 请求，删除课程表
let dels = document.querySelectorAll('input[value="删除"]')
dels.forEach((v) => {
  v.addEventListener('click', (e) => {
    if (prompt("确认删除？") === null) return

    let name = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    const ajax = new XMLHttpRequest()
    ajax.open('delete', '/timetables/' + name, true)
    ajax.onload = () => {
      if (ajax.status == 200) {
        alert(ajax.responseText)
        location = '/timetables'
      }
    }
    ajax.send()
  })
})
