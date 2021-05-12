let logout = document.getElementById('logout')

logout.addEventListener('click', () => {
  document.cookie = `user=sadanya; expires=${new Date(2000)}; path=/`
})