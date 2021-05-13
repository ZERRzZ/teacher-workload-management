let save = document.getElementById("save")

save.addEventListener('click', () => {
  const params = new FormData(document.getElementById('form'))
  const ajax = new XMLHttpRequest()
  ajax.open('post', '/workloads', true)
  ajax.onload = function() {
    if (ajax.status == 200) {
      alert(ajax.responseText)
      location = "/results"
    }
  }
  ajax.send(params)
})