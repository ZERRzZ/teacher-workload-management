let add = document.getElementById('add')

add.addEventListener('click', () => {
  let cloak = document.getElementById('cloak')
  cloak.style.display = 'block'

  let quit = document.getElementById('quit')
  quit.addEventListener('click', () => {
    cloak.style.display = 'none'
  })

  let submit = document.getElementById('submit')
  submit.addEventListener('click', () => {
    const content = new FormData(document.getElementById('content'))
    const ajax = new XMLHttpRequest()
    ajax.open('post', '/timetables/', true)
    ajax.onload = () => {
      if (ajax.status == 200) {
        alert(ajax.responseText)
        location = '/timetables'
      }
    }
    ajax.send(content)
  })
})

let mods = document.querySelectorAll('input[value="修改"]')
mods.forEach((v) => {
  v.addEventListener('click', (e) => {
    let name = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    location = '/timetables/' + name
  })
})

let dels = document.querySelectorAll('input[value="删除"]')
dels.forEach((v) => {
  v.addEventListener('click', (e) => {
    console.log("" === null);
    if (prompt("确认删除？") === null) return

    let name = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
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
