let save = document.getElementById('save')

save.addEventListener('click', () => {
  let message = document.getElementById("message")
  const formdata = new FormData(message)
  const ajax = new XMLHttpRequest()

  ajax.open('put', '/teachers', true)
  ajax.onload = () => {
    if (ajax.status === 200) {
      alert(ajax.responseText)
      location = '/teachers'
    }
  }
  ajax.send(formdata)
})