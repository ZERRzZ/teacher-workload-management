let quit = document.getElementById('quit')
quit.addEventListener('click', () => {
  location = '/timetables/'
})

let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
  const content = new FormData(document.getElementById('content'))
  const ajax = new XMLHttpRequest()
  ajax.open('put', '/timetables/', true)
  ajax.onload = () => {
    if (ajax.status == 200) {
      alert(ajax.responseText)
      location = '/timetables'
    }
  }
  ajax.send(content)
})