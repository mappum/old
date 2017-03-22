const tap = require('tap')
const old = require('../src')


OldString = old(String)
OldBoolean = old(Boolean)
OldNumber = old(Number)
OldDate = old(Date)


tap.test('String without new', function (t) {
  t.equal(typeof OldString('foo'), 'string')
  t.equal(OldString('foo'), 'foo')
  t.end()
})


tap.test('String with new', function (t) {
  t.equal(typeof new OldString('foo'), 'object')
  t.equal(new OldString('foo').valueOf(), 'foo')
  t.end()
})


tap.test('Boolean without new', function (t) {
  t.equal(typeof OldBoolean(true), 'boolean')
  t.equal(OldBoolean(true), true)
  t.end()
})


tap.test('String with new', function (t) {
  t.equal(typeof new OldBoolean(true), 'object')
  t.equal(new OldBoolean(true).valueOf(), true)
  t.end()
})


tap.test('Number without new', function (t) {
  t.equal(typeof OldNumber(12), 'number')
  t.equal(OldNumber(12), 12)
  t.end()
})


tap.test('Number with new', function (t) {
  t.equal(typeof new OldNumber(12), 'object')
  t.equal(new OldNumber(12).valueOf(), 12)
  t.end()
})


tap.test('Date without new', function (t) {
  const date = new OldDate()
  t.equal(typeof OldDate(date), 'string')
  t.equal(OldDate(date), date.toString())
  t.end()
})


tap.test('Date with new', function (t) {
  const date = new Date()
  t.equal(typeof new OldDate(date), 'object')
  t.equal(new OldDate(date).getTime(), date.getTime())
  t.end()
})


tap.test('extended built-in object', (t) => {
  class MyString extends String {}
  const Wrapped = old(MyString)
  t.equal(typeof new Wrapped('foo'), 'object')
  t.equal(typeof Wrapped('foo'), 'string');
  t.end()
})

