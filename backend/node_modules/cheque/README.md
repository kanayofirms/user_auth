# Cheque.js [![npm Version](http://img.shields.io/npm/v/cheque.svg?style=flat)](https://www.npmjs.org/package/cheque) [![Build Status](https://img.shields.io/travis/yuanqing/cheque.svg?style=flat)](https://travis-ci.org/yuanqing/cheque) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/cheque.svg?style=flat)](https://coveralls.io/r/yuanqing/cheque)

> Type checking, for when you only use JavaScript&rsquo;s [Good Parts](https://youtu.be/hQVTIJBZook).

## API

```js
'use strict';

var isInt = function(x) {
  return typeof x == 'number' && x % 1 === 0;
};

module.exports = {

  isUndefined: function(x) {
    return typeof x == 'undefined';
  },

  isNull: function(x) {
    return x === null;
  },

  isBoolean: function(x) {
    return x === true || x === false;
  },

  isFloat: function(x) { // an integer is also a float
    return typeof x == 'number' && isFinite(x);
  },

  isInt: isInt,
  isInteger: isInt,

  isString: function(x) {
    return typeof x == 'string';
  },

  isNaN: function(x) {
    return x != x;
  },

  isObject: function(x) { // a "plain" object
    return typeof x == 'object' && !!x && x.constructor === Object;
  },

  isArray: Array.isArray || function(x) {
    return Object.prototype.toString.call(x) == '[object Array]';
  },

  isFunction: function(x) {
    return typeof x == 'function';
  }

};
```

You must *not* do terrible things like:
```js
var boo = new Boolean(true);
var bad = new Number(42);
var noo = new String('foo');
```

Instead, do:
```js
var yay = true;
var god = 42;
var yes = 'foo';
```

[There are lots of tests.](https://github.com/yuanqing/cheque/blob/master/test)

## Installation

Install via [npm](https://www.npmjs.org/):

```bash
$ npm i --save cheque
```

## Changelog

- 0.2.0
  - Add polyfill for `Array.isArray`
- 0.1.0
  - Initial release

## License

[MIT license](https://github.com/yuanqing/cheque/blob/master/LICENSE)
