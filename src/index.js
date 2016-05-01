module.exports = function (Class) {
  function WrappedClass (...args) {
    return new Class(...args)
  }
  Object.assign(WrappedClass, Class)
  WrappedClass.prototype = Class.prototype
  return WrappedClass
}

var nonew = require('./'); class C { constructor (a) { this.a = a }; foo (a) { return this.a + a } }
