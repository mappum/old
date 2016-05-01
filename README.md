# no-new

[![npm version](https://img.shields.io/npm/v/no-new.svg)](https://www.npmjs.com/package/no-new)

**Make the 'new' keyword optional for ES6 classes**

`no-new`

## Usage

`npm install no-new`

```js
var nonew = require('no-new')

class Class {
  // ...
}

module.exports = nonew(Class)
```

## Rationale

With ES5 "constructor" functions, a common pattern is to make the `new` keyword optional by doing something like the following:
```js
function Foo () {
  if (!(this instanceof Foo)) return new Foo()
  // do constructor stuff
}
```

Recently, ES6 introduced classes to replace constructor functions. However, if these classes are instantiated without `new`, an error is thrown: `TypeError: Class constructor Foo cannot be invoked without 'new'`. This module makes `new` optional, even for these ES6 classes.

## Credit

Thank you to Sorella in ##javascript (Freenode) for the clean solution.
