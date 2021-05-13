let dels = document.querySelectorAll('input[value="删除"]')

// 为工作量结果页面的所有删除按钮添加点击事件
dels.forEach((v) => {
  v.addEventListener('click', (e) => {
    if (prompt("确认删除？") === null) return

    let name = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    const ajax = new XMLHttpRequest()
    ajax.open('delete', '/results/' + name, true)
    ajax.onload = function() {
      if (ajax.status == 200) {
        alert(ajax.responseText)
        location = "/results"
      }
    }
    ajax.send()
  })
})

let mods = document.querySelectorAll('input[value="修改"]')

// 为工作量结果页面的所有修改按钮添加点击事件
mods.forEach((v) => {
  v.addEventListener('click', (e) => {
    let name = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    location = `/results/${name}`
  })
})