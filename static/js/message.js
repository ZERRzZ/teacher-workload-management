let save = document.getElementById('save')

save.addEventListener('click', () => {
  let message = document.getElementById("message")
  const formdata = new FormData(message)
  const ajax = new XMLHttpRequest()
  ajax.open('post', '/updateMessages/', true)
  ajax.onload = () => {
    if (ajax.status === 200) {
      alert(ajax.responseText)
    }
  }
  ajax.send(formdata)
})