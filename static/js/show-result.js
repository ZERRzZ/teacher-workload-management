let submit = document.getElementById("submit")
let quit = document.getElementById("quit")

onload = function() {
  let cloak = this.document.getElementById("cloak")
  cloak.style.display = 'block'
}

quit.addEventListener("click", () => {
  setTimeout(() => {
    location = "/results"
  })
  let content = document.getElementById('content')
  content.classList.add("rotate-out")
})

submit.addEventListener('click', () => {
  const content = new FormData(document.getElementById('content'))
  const ajax = new XMLHttpRequest()
  ajax.open('put', '/results', true)
  ajax.onload = () => {
    if (ajax.status == 200) {
      alert(ajax.responseText)
      location = '/results'
    }
  }
  ajax.send(content)
})