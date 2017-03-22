const tap = require('tap')
const old = require('../src')


OldString = old(String)
OldBoolean = old(Boolean)
OldNumber = old(Number)
OldDate = old(Date)


tap.test('String without new', function (t) {
  t.equal(typeof String('foo'), 'string')
  t.equal(String('foo'), 'foo')
  t.end()
})


tap.test('String with new', function (t) {
  t.equal(typeof new String('foo'), 'object')
  t.equal(new String('foo').valueOf(), 'foo')
  t.end()
})


tap.test('Boolean without new', function (t) {
  t.equal(typeof Boolean(true), 'boolean')
  t.equal(Boolean(true), true)
  t.end()
})


tap.test('String with new', function (t) {
  t.equal(typeof new Boolean(true), 'object')
  t.equal(new Boolean(true).valueOf(), true)
  t.end()
})


tap.test('Number without new', function (t) {
  t.equal(typeof Number(12), 'number')
  t.equal(Number(12), 12)
  t.end()
})


tap.test('Number with new', function (t) {
  t.equal(typeof new Number(12), 'object')
  t.equal(new Number(12).valueOf(), 12)
  t.end()
})


tap.test('Date without new', function (t) {
  const date = new Date()
  t.equal(typeof Date(date), 'string')
  t.equal(Date(date), date.toString())
  t.end()
})


tap.test('Date with new', function (t) {
  const date = new Date()
  t.equal(typeof new Date(date), 'object')
  t.equal(new Date(date).getTime(), date.getTime())
  t.end()
})


tap.test('extended built-in object', (t) => {
  class MyString extends String {}
  const Wrapped = old(MyString)
  t.equal(typeof new Wrapped('foo'), 'object')
  t.equal(typeof Wrapped('foo'), 'string');
  t.end()
})

