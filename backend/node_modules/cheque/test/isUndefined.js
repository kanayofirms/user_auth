var test = require('tape');
var fn = require('..').isUndefined;

test('isUndefined', function(t) {

  // undefined
  t.ok(fn(undefined), 'undefined');

  // null
  t.notOk(fn(null), 'null');

  // boolean
  t.notOk(fn(true), 'true');
  t.notOk(fn(false), 'false');

  // numbers
  t.notOk(fn(0), 'number 0');
  t.notOk(fn(1), 'number 1');
  t.notOk(fn(-1), 'number -1');
  t.notOk(fn(42), 'number decimal');
  t.notOk(fn(-42), 'number negative decimal');
  t.notOk(fn(052), 'number octal');
  t.notOk(fn(-052), 'number negative octal');
  t.notOk(fn(0x2a), 'number hex');
  t.notOk(fn(-0x2a), 'number negative hex');
  t.notOk(fn(3.14), 'number float');
  t.notOk(fn(-3.14), 'number negative float');
  t.notOk(fn(3e14), 'number exponent');
  t.notOk(fn(-3e14), 'number negative exponent');
  t.notOk(fn(Number.MIN_VALUE), Number.MIN_VALUE, 'Number.MIN_VALUE');
  t.notOk(fn(Number.MAX_VALUE), Number.MAX_VALUE, 'Number.MAX_VALUE');

  // infinity
  t.notOk(fn(Infinity), 'infinity');
  t.notOk(fn(-Infinity), 'negative infinity');

  // NaN
  t.notOk(fn(NaN), 'NaN');

  // string
  t.notOk(fn(''), 'string empty');
  t.notOk(fn(' '), 'string whitespace');
  t.notOk(fn('foo'), 'string word');
  t.notOk(fn('0'), 'string zero');

  // plain object
  t.notOk(fn({ foo: 'bar' }), 'plain object non-empty');
  t.notOk(fn({}), 'plain object empty');
  t.notOk(fn(Object.create({})), 'plain object empty');

  // built-in object
  t.notOk(fn(Object.create(Date)), 'object inherited');
  t.notOk(fn(new Date()), 'object, new Date');
  t.notOk(fn(new Boolean(true)), 'object, new Boolean');
  t.notOk(fn(new Number(42)), 'object, new Number');
  t.notOk(fn(new String('foo')), 'object, new String');

  // array
  t.notOk(fn([]), 'array, empty');
  t.notOk(fn(['foo']), 'array, non-empty');

  // function
  t.notOk(fn(function() {}), 'function, new');
  t.notOk(fn(Date), 'function, built-in');

  t.end();

});
