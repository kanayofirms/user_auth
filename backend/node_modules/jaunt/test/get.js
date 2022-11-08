'use strict';

var test = require('tape');
var get = require('..').get;

var arr = [
  ['foo', 'bar'],
  'baz'
];

var obj = {
  foo: {
    bar: [
      { baz: 'Hello' },
      { qux: ['World'] }
    ]
  }
};

test('get the value for a valid `path` (integer or string)', function(t) {

  t.equal(get(arr, 0), arr[0]);
  t.equal(get(arr, '0'), arr[0]);
  t.equal(get(arr, '0.1'), arr[0][1]);
  t.equal(get(arr, '1.0'), arr[1]);
  t.equal(get(arr, ' 1 . 0 '), arr[1]);
  t.equal(get(arr, '0.0.0'), arr[0][0]);

  t.equal(get(obj, 'foo'), obj.foo);
  t.equal(get(obj, 'foo.bar'), obj.foo.bar);
  t.equal(get(obj, 'foo.bar.0'), obj.foo.bar[0]);
  t.equal(get(obj, ' foo . bar . 0 '), obj.foo.bar[0]);
  t.equal(get(obj, 'foo.bar.0.baz'), obj.foo.bar[0].baz);
  t.equal(get(obj, 'foo.bar.0.baz.0'), obj.foo.bar[0].baz);
  t.equal(get(obj, 'foo.bar.1.qux.0'), obj.foo.bar[1].qux[0]);
  t.equal(get(obj, 'foo.bar.1.qux.0.0'), obj.foo.bar[1].qux[0]);

  t.end();

});

test('get the value for a valid `path` (array)', function(t) {

  t.equal(get(arr, [ 0 ]), arr[0]);
  t.equal(get(arr, [ '0' ]), arr[0]);
  t.equal(get(arr, [ 0, 1 ]), arr[0][1]);
  t.equal(get(arr, [ 0, '1' ]), arr[0][1]);
  t.equal(get(arr, [ '1', 0 ]), arr[1]);
  t.equal(get(arr, [ ' 1 ', ' 0 ' ]), arr[1]);
  t.equal(get(arr, [ 0, 0, 0 ]), arr[0][0]);

  t.equal(get(obj, [ 'foo' ]), obj.foo);
  t.equal(get(obj, [ 'foo', 'bar' ]), obj.foo.bar);
  t.equal(get(obj, [ 'foo', 'bar', 0 ]), obj.foo.bar[0]);
  t.equal(get(obj, [ 'foo', 'bar', '0' ]), obj.foo.bar[0]);
  t.equal(get(obj, [ ' foo ', ' bar ', ' 0 ' ]), obj.foo.bar[0]);
  t.equal(get(obj, [ 'foo', 'bar', 0, 'baz' ]), obj.foo.bar[0].baz);
  t.equal(get(obj, [ 'foo', 'bar', '0', 'baz', 0 ]), obj.foo.bar[0].baz);
  t.equal(get(obj, [ 'foo', 'bar', '1', 'qux', '0' ]), obj.foo.bar[1].qux[0]);
  t.equal(get(obj, [ 'foo', 'bar', '1', 'qux', 0, '0' ]), obj.foo.bar[1].qux[0]);

  t.end();

});

test('returns `undefined` if `path` is invalid', function(t) {

  t.equal(get(arr, -1), undefined);
  t.equal(get(arr, 2), undefined);
  t.equal(get(arr, '1.0.0'), undefined);
  t.equal(get(arr, 'invalid'), undefined);

  t.equal(get(obj, []), undefined);
  t.equal(get(obj, ''), undefined);
  t.equal(get(obj, 0), undefined);
  t.equal(get(obj, 'invalid'), undefined);
  t.equal(get(obj, 'foo.0'), undefined);
  t.equal(get(obj, 'foo.bar.2'), undefined);
  t.equal(get(obj, 'foo.bar.0.baz.invalid'), undefined);
  t.equal(get(obj, 'foo.bar.0.baz.0.invalid'), undefined);

  t.end();

});
