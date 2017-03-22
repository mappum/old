const tap = require('tap')
const old = require('../src')


class Foo {
  static set foo(str) {
    this.str = str;
  }
  static get foo() {
    return this.str
  }
  static bar() {
    return 'bar';
  }
}

const OldFoo = old(Foo)


tap.test('static function', function (t) {
  t.equal(typeof OldFoo.bar, 'function')
  t.equal(OldFoo.bar(), 'bar')
  t.end()
})


tap.test('static getter and setter', function (t) {
  t.equal(typeof OldFoo.foo, 'undefined')
  OldFoo.foo = 'foo'
  t.equal(OldFoo.foo, 'foo')
  t.end()
})