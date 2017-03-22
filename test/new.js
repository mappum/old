const tap = require('tap')
const old = require('../src')

class Foo {
}

const OldFoo = old(Foo)

tap.test('instantiation with new', function (t) {
  t.equal(typeof new OldFoo(), 'object')
  t.end()
})


tap.test('instantiation without new', function (t) {
  t.equal(typeof OldFoo(), 'object')
  t.end()
})


tap.test('instanceof', function (t) {
  t.ok(new OldFoo() instanceof Foo)
  t.ok(OldFoo() instanceof Foo)
  t.end()
})