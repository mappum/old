module.exports = function (Class) {
  return function (...args) {
    return new Class(...args)
  }
}
