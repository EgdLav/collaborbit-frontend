export function notify(message : string, type = 'info') {
  const id = crypto.randomUUID()

  const el = document.createElement('div') as HTMLDivElement
  el.id = id
  el.className = `notification notification-${type}`
  el.innerHTML = message

  document.body.appendChild(el)

  setTimeout(() => {
    el.classList.add('active')
    setTimeout(() => {
      el.classList.remove('active')
      setTimeout(() => {
        el.remove()
      }, 100)
    }, 3000)
  }, 100)
}
