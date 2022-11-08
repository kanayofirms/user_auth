'use strict';

var test = require('tape');
var set = require('..').set;

test('returns the `obj`', function(t) {

  var obj = {};
  t.equal(set(obj, 'foo', 'bar'), obj);
  t.looseEqual(set(obj, 'foo', 'bar'), { foo: 'bar' });

  var arr = [];
  t.equal(set(arr, 0, 'foo'), arr);
  t.looseEqual(arr, ['foo']);

  t.end();

});

test('sets the value at `path` (integer or string) to the specified `val`', function(t) {

  t.looseEqual(set({}, 'foo', 'baz'), { foo: 'baz' });
  t.looseEqual(set({ foo: 'bar' }, 'foo', 'baz'), { foo: 'baz' });
  t.looseEqual(set({}, 'foo.bar', 'qux'), { foo: { bar: 'qux' } });
  t.looseEqual(set({ foo: { bar: 'baz' } }, 'foo.bar', 'qux'), { foo: { bar: 'qux' } });

  t.looseEqual(set([], 0, 'foo'), ['foo']);
  t.looseEqual(set([], '1', 'foo'), [ , 'foo']);
  t.looseEqual(set([], '0.1', 'foo'), [[ , 'foo']]);

  t.looseEqual(set({}, 'foo.0', 'bar'), { foo: ['bar'] });
  t.looseEqual(set([], '0.foo', 'bar'), [{ foo: 'bar' }]);

  t.looseEqual(set({}, 'foo.0.bar', 'baz'), { foo: [ { bar: 'baz' } ] });
  t.looseEqual(set({}, ' foo . 0 . bar ', 'baz'), { foo: [ { bar: 'baz' } ] });

  t.end();

});

test('sets the value at `path` (array) to the specified `val`', function(t) {

  t.looseEqual(set({}, ['foo'], 'baz'), { foo: 'baz' });
  t.looseEqual(set({ foo: 'bar' }, ['foo'], 'baz'), { foo: 'baz' });
  t.looseEqual(set({}, ['foo', 'bar'], 'qux'), { foo: { bar: 'qux' } });
  t.looseEqual(set({ foo: { bar: 'baz' } }, ['foo', 'bar'], 'qux'), { foo: { bar: 'qux' } });

  t.looseEqual(set([], [0], 'foo'), ['foo']);
  t.looseEqual(set([], ['1'], 'foo'), [ , 'foo']);
  t.looseEqual(set([], [0, 1], 'foo'), [[ , 'foo']]);
  t.looseEqual(set([], ['0', '1'], 'foo'), [[ , 'foo']]);

  t.looseEqual(set({}, ['foo', 0], 'bar'), { foo: ['bar'] });
  t.looseEqual(set([], [0, 'foo'], 'bar'), [{ foo: 'bar' }]);

  t.looseEqual(set({}, ['foo', 0, 'bar'], 'baz'), { foo: [ { bar: 'baz' } ] });
  t.looseEqual(set({}, [' foo ', ' 0 ', ' bar '], 'baz'), { foo: [ { bar: 'baz' } ] });

  t.end();

});
