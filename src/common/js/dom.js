export function hasClass (el, oldClass) {
  let reg = new RegExp('(^|\\s)' + oldClass + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass (el, oldClass) {
  if (hasClass(el, oldClass)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(oldClass)
  el.className = newClass.join(' ')
}
