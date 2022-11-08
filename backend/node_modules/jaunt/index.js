'use strict';

var parseInteger = require('numero').parseInteger;
var check = require('cheque');

var trimKey = function(key) {
  return check.isString(key) ? key.trim() : key;
};

var parsePath = function(path) {
  return check.isString(path) ? path.split('.') : [].concat(path);
};

module.exports.set = function(obj, path, val) {

  // normalise `path` to an array
  path = parsePath(path);

  // traverse `obj` using `path` (up to the second-last key), updating `o` along the way
  var o = obj;
  var i = -1;
  var len = path.length-1;
  while (++i < len) {
    var key = trimKey(path[i]);
    if (!(key in o)) {
      // current `key` does not exist; set it to either [] or {} by looking at `nextKey`
      var nextKey = trimKey(path[i+1]);
      o[key] = parseInteger(nextKey) !== null ? [] : {};
    }
    o = o[key];
  }

  // finally set the `val`
  o[trimKey(path[len])] = val;

  return obj;

};

module.exports.get = function(obj, path) {

  // normalise `path` to an array
  path = parsePath(path);
  var len = path.length;

  // exit if empty `path`
  if (!len) {
    return undefined;
  }

  // traverse `obj` using `path`, updating `obj` along the way
  var i = -1;
  while (++i < len) {
    var key = trimKey(path[i]);
    // update `obj`
    if ((check.isObject(obj) || check.isArray(obj))) {
      if (key in obj) {
        obj = obj[key];
        continue;
      }
    } else if (i === len-1 && (key === 0 || key === '0')) {
      // here, `obj` is neither object nor array; if we are at the last key in `path`,
      // allow a trailing '0' eg. get({ foo: 'bar' }, 'foo.0') => 'bar'
      break;
    }
    return undefined;
  }

  return obj;

};
