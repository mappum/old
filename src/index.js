'use strict'
const assign = require('object-assign')

const _super = Symbol('super')


const builtIn = { String, Boolean, Date, Number }


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


function construct (Class, isConstructor, args) {
  if (isConstructor) {
    return new Class(...args)
  } else {
    const prototype = Class.prototype
    if (prototype instanceof builtIn.String ||
      prototype instanceof builtIn.Number ||
      prototype instanceof builtIn.Boolean) {
      return new Class(...args).valueOf()
    } else if (prototype instanceof builtIn.Date) {
      return new Class(...args).toString()
    } else {
      return new Class(...args)
    }
  }
}

function old (Class) {
  function WrapperClass (...args) {
    let isConstructor = false;
    if (this instanceof WrapperClass && !this._constructed) {
      isConstructor = true;
      this._constructed = true;
    }
    return construct(Class, isConstructor, args)
  }
  assign(WrapperClass, Class)
  WrapperClass.prototype = assign({}, Class.prototype)
  WrapperClass.prototype[_super] = Class
  Object.defineProperty(WrapperClass, 'name', { value: Class.name })

  defineStatics(WrapperClass, Class)

  return WrapperClass
}

old.unwrap = function (WrapperClass) {
  return WrapperClass.prototype[_super] || WrapperClass
}

module.exports = old
