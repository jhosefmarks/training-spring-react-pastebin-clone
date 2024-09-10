export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const downloadTextAsFile = (filename, text) => {
  let element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
