'use strict'

const assign = require('object-assign')

const _super = Symbol('super')

function old (Class) {
  function WrapperClass (...args) {
    return new Class(...args)
  }
  assign(WrapperClass, Class)
  WrapperClass.prototype = assign({}, Class.prototype)
  WrapperClass.prototype[_super] = Class
  return WrapperClass
}

old.unwrap = function (WrapperClass) {
  return WrapperClass.prototype[_super] || WrapperClass
}

module.exports = old
