var assign = require('object-assign')

module.exports = function (Class) {
  function WrappedClass (...args) {
    return new Class(...args)
  }
  assign(WrappedClass, Class)
  WrappedClass.prototype = Class.prototype
  return WrappedClass
}
