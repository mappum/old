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

  Object.getOwnPropertyNames(Class)
    .map(prop => [prop, Object.getOwnPropertyDescriptor(Class, prop)])
    .filter(([prop, descriptor]) => {
      return typeof Class[prop] === 'function' ||
             typeof descriptor.get === 'function' ||
             typeof descriptor.set === 'function'
    })
    .forEach(([prop, descriptor]) => {
      Object.defineProperty(WrapperClass, prop, descriptor);
    });

  return WrapperClass
}

old.unwrap = function (WrapperClass) {
  return WrapperClass.prototype[_super] || WrapperClass
}

module.exports = old
