onload = function() {
  let cloak = this.document.getElementById('cloak')
  cloak.style.display = "block"
}

let quit = document.getElementById('quit')
quit.addEventListener('click', () => {
  setTimeout(() => {
    location = '/timetables'
  }, 300)
  let content = document.getElementById('content')
  content.classList.add('rotate-out')
})

// 点击提交发送 /timetables put 请求，更新课程表
let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
  const content = new FormData(document.getElementById('content'))
  const ajax = new XMLHttpRequest()
  ajax.open('put', '/timetables', true)
  ajax.onload = () => {
    if (ajax.status == 200) {
      alert(ajax.responseText)
      location = '/timetables'
    }
  }
  ajax.send(content)
})