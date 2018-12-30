import 'colors'

const _log = console.log
console.info = message => {
  _log(message.green)
}

console.error = message => {
  _log(message.red)
}

// console.log = message => {
//   _log(message.blue)
// }

console.warn = message => {
  _log(message.yellow)
}

export default console
