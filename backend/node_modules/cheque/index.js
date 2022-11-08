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
