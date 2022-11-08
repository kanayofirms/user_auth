# Jaunt.js [![npm Version](http://img.shields.io/npm/v/jaunt.svg?style=flat)](https://www.npmjs.org/package/jaunt) [![Build Status](https://img.shields.io/travis/yuanqing/jaunt.svg?style=flat)](https://travis-ci.org/yuanqing/jaunt) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/jaunt.svg?style=flat)](https://coveralls.io/r/yuanqing/jaunt)

> Get or set a value in an object/array using a dot-delimited string or array of keys.

## API

### jaunt.get(obj, path)

Returns the value in `obj` corresponding to `path`. Returns `undefined` if `path` does not exist.

- `obj` &mdash; An object or array.
- `path` &mdash; A dot-delimited string of keys, or an array of keys.

```js
var obj = {
  foo: {
    bar: ['Hello', 'World'],
    baz: 'Goodbye'
  }
};

jaunt.get(obj, 'foo.bar'); //=> ['Hello', 'World']
jaunt.get(obj, 'foo.baz'); //=> 'Goodbye'

jaunt.get(obj, 'foo.bar.0'); //=> 'Hello'
jaunt.get(obj, 'foo.baz.0'); //=> 'Goodbye'

jaunt.get(obj, ['foo', 'bar', 0]); //=> 'World'
jaunt.get(obj, ['foo', 'baz', 0]); //=> 'Goodbye'

jaunt.get(obj, 'invalid'); //=> undefined
```

There can be a trailing &ldquo;0&rdquo; in `path` if it corresponds to a leaf node. So, in the example above, the paths `foo.baz` and `foo.baz.0` are equivalent.

### jaunt.set(obj, path, val)

Sets the element corresponding to `path` in the `obj` to the specified `val`. Any &ldquo;intermediate&rdquo; elements in the path will be created if they do not exist. Returns the modified `obj`.

- `obj` &mdash; An object or array.
- `path` &mdash; A dot-delimited string of keys, or an array of keys.
- `val` &mdash; The value to set the element corresponding to `path`.

```js
var obj = {
  foo: {
    bar: ['Hello', 'World']
  }
};

jaunt.set(obj, 'foo.bar.0', 'Hola');
/* =>
 * {
 *   foo: {
 *     bar: ['Hola', 'World']
 *   }
 * }
 */

jaunt.set(obj, 'baz', 'Shiny!');
/* =>
 * {
 *   foo: {
 *     bar: ['Hola', 'World']
 *   },
 *   baz: 'Shiny!'
 * }
 */
```

## Installation

Install via [npm](https://www.npmjs.org/):

```bash
$ npm i --save jaunt
```

Install via [bower](http://bower.io/):

```bash
$ bower i --save yuanqing/jaunt
```

To use Jaunt in the browser, include [the minified script](https://github.com/yuanqing/jaunt/blob/master/dist/jaunt.min.js) in your HTML:

```html
<body>
  <!-- ... -->
  <script src="path/to/dist/jaunt.min.js"></script>
  <script>
    // jaunt available here
  </script>
</body>
```

## Changelog

- 1.3.0
  - Allow trailing &ldquo;0&rdquo; in `path` for the `get` method
- 1.2.0
  - Migrate tests to [tape](https://github.com/substack/tape)
- 1.1.3
  - Expose module for use in the browser
  - Add minified version of the module
  - Add bower.json
- 1.0.0
  - Initial release

## License

[MIT license](https://github.com/yuanqing/jaunt/blob/master/LICENSE)
