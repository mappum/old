'use strict'

const assign = require('object-assign')

const _super = Symbol('super')

function defineStatics(WrapperClass, Class) {
  if (!Class) return;
  Object.getOwnPropertyNames(Class)
    .map(function (prop) {
      return [prop, Object.getOwnPropertyDescriptor(Class, prop)]
    })
    .filter(function ([prop, descriptor]) {
      return prop !== 'arguments' && prop !== 'caller' &&
        typeof Class[prop] === 'function' ||
        typeof descriptor.get === 'function' ||
        typeof descriptor.set === 'function'
    })
    .forEach(function ([prop, descriptor]) {
      Object.defineProperty(WrapperClass, prop, descriptor)
    })

  defineStatics(WrapperClass, Object.getPrototypeOf(Class))
}

function old (Class) {
  function WrapperClass (...args) {
    return new Class(...args)
  }
  assign(WrapperClass, Class)
  WrapperClass.prototype = assign({}, Class.prototype)
  WrapperClass.prototype[_super] = Class

  defineStatics(WrapperClass, Class)

  return WrapperClass
}

old.unwrap = function (WrapperClass) {
  return WrapperClass.prototype[_super] || WrapperClass
}

module.exports = old
