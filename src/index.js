module.exports = function (Class) {
  function WrappedClass (...args) {
    return new Class(...args)
  }
  Object.assign(WrappedClass, Class)
  WrappedClass.prototype = Class.prototype
  return WrappedClass
}
