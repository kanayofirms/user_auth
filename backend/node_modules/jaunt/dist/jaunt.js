!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jaunt=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var isInt = require('numero').isInt;
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
  var len = path.length-1; // second-last key
  while (++i < len) {
    var key = trimKey(path[i]);
    if (!(key in o)) {
      // current `key` does not exist; set it to either [] or {} by looking at `nextKey`
      var nextKey = trimKey(path[i+1]);
      o[key] = isInt(nextKey) ? [] : {};
    }
    o = o[key];
  }

  // `o` is the
  o[trimKey(path[len])] = val;

  // return the original `obj`
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
    if ((check.isObject(obj) || check.isArray(obj)) && key in obj) {
      obj = obj[key];
      continue;
    }
    // it must be that `path` is invalid; exit
    return undefined;
  }
  return obj;

};

},{"cheque":2,"numero":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var _parseFloat = (function() {

  var memo = {};

  return function(x) {

    var type = typeof x;

    if (type != 'string') {
      // check that `x` is a number type
      if (type == 'number' && isFinite(x)) {
        return x;
      }
      return null;
    }

    // lookup `x` in `memo`
    if (x in memo) {
      return memo[x];
    }

    // normalise `x`
    var str = x.trim().toLowerCase();

    // check if `x` has a minus sign
    var sign = 1;
    if (str[0] == '-') {
      sign = -1;
      str = str.slice(1);
    }

    // parse `x` into a number
    var parsed;
    if (str.indexOf('0x') == 0) { // hexadecimal
      parsed = parseInt(str.slice(2), 16);
    } else if (str[0] === '0' && str.length > 1) { // octal
      parsed = parseInt(str.slice(1), 8);
    } else { // decimal or float
      parsed = parseFloat(str);
    }

    if (parsed == parsed && isFinite(str)) {
      parsed = sign * parsed;
      memo[x] = parsed; // save result to `memo`
      return parsed;
    }
    return null;

  };

})();

var isFloat = function(x) {
  return _parseFloat(x) !== null;
};

var _parseInt = function(x) {

  var parsed = _parseFloat(x);

  if (parsed !== null && parsed % 1 == 0) {
    return parsed;
  }
  return null;

};

var isInt = function(x) {
  return _parseInt(x) !== null;
};

module.exports = {

  isFloat: isFloat,
  parseFloat: _parseFloat,
  isInt: isInt,
  isInteger: isInt,
  parseInt: _parseInt,
  parseInteger: _parseInt

};

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jaGVxdWUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbnVtZXJvL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNJbnQgPSByZXF1aXJlKCdudW1lcm8nKS5pc0ludDtcbnZhciBjaGVjayA9IHJlcXVpcmUoJ2NoZXF1ZScpO1xuXG52YXIgdHJpbUtleSA9IGZ1bmN0aW9uKGtleSkge1xuICByZXR1cm4gY2hlY2suaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXk7XG59O1xuXG52YXIgcGFyc2VQYXRoID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gY2hlY2suaXNTdHJpbmcocGF0aCkgPyBwYXRoLnNwbGl0KCcuJykgOiBbXS5jb25jYXQocGF0aCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5zZXQgPSBmdW5jdGlvbihvYmosIHBhdGgsIHZhbCkge1xuXG4gIC8vIG5vcm1hbGlzZSBgcGF0aGAgdG8gYW4gYXJyYXlcbiAgcGF0aCA9IHBhcnNlUGF0aChwYXRoKTtcblxuICAvLyB0cmF2ZXJzZSBgb2JqYCB1c2luZyBgcGF0aGAgKHVwIHRvIHRoZSBzZWNvbmQtbGFzdCBrZXkpLCB1cGRhdGluZyBgb2AgYWxvbmcgdGhlIHdheVxuICB2YXIgbyA9IG9iajtcbiAgdmFyIGkgPSAtMTtcbiAgdmFyIGxlbiA9IHBhdGgubGVuZ3RoLTE7IC8vIHNlY29uZC1sYXN0IGtleVxuICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgdmFyIGtleSA9IHRyaW1LZXkocGF0aFtpXSk7XG4gICAgaWYgKCEoa2V5IGluIG8pKSB7XG4gICAgICAvLyBjdXJyZW50IGBrZXlgIGRvZXMgbm90IGV4aXN0OyBzZXQgaXQgdG8gZWl0aGVyIFtdIG9yIHt9IGJ5IGxvb2tpbmcgYXQgYG5leHRLZXlgXG4gICAgICB2YXIgbmV4dEtleSA9IHRyaW1LZXkocGF0aFtpKzFdKTtcbiAgICAgIG9ba2V5XSA9IGlzSW50KG5leHRLZXkpID8gW10gOiB7fTtcbiAgICB9XG4gICAgbyA9IG9ba2V5XTtcbiAgfVxuXG4gIC8vIGBvYCBpcyB0aGVcbiAgb1t0cmltS2V5KHBhdGhbbGVuXSldID0gdmFsO1xuXG4gIC8vIHJldHVybiB0aGUgb3JpZ2luYWwgYG9iamBcbiAgcmV0dXJuIG9iajtcblxufTtcblxubW9kdWxlLmV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24ob2JqLCBwYXRoKSB7XG5cbiAgLy8gbm9ybWFsaXNlIGBwYXRoYCB0byBhbiBhcnJheVxuICBwYXRoID0gcGFyc2VQYXRoKHBhdGgpO1xuICB2YXIgbGVuID0gcGF0aC5sZW5ndGg7XG5cbiAgLy8gZXhpdCBpZiBlbXB0eSBgcGF0aGBcbiAgaWYgKCFsZW4pIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gdHJhdmVyc2UgYG9iamAgdXNpbmcgYHBhdGhgLCB1cGRhdGluZyBgb2JqYCBhbG9uZyB0aGUgd2F5XG4gIHZhciBpID0gLTE7XG4gIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICB2YXIga2V5ID0gdHJpbUtleShwYXRoW2ldKTtcbiAgICAvLyB1cGRhdGUgYG9iamBcbiAgICBpZiAoKGNoZWNrLmlzT2JqZWN0KG9iaikgfHwgY2hlY2suaXNBcnJheShvYmopKSAmJiBrZXkgaW4gb2JqKSB7XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICAvLyBpdCBtdXN0IGJlIHRoYXQgYHBhdGhgIGlzIGludmFsaWQ7IGV4aXRcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBvYmo7XG5cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0ludCA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09ICdudW1iZXInICYmIHggJSAxID09PSAwO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT0gJ3VuZGVmaW5lZCc7XG4gIH0sXG5cbiAgaXNOdWxsOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggPT09IG51bGw7XG4gIH0sXG5cbiAgaXNCb29sZWFuOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggPT09IHRydWUgfHwgeCA9PT0gZmFsc2U7XG4gIH0sXG5cbiAgaXNGbG9hdDogZnVuY3Rpb24oeCkgeyAvLyBhbiBpbnRlZ2VyIGlzIGFsc28gYSBmbG9hdFxuICAgIHJldHVybiB0eXBlb2YgeCA9PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh4KTtcbiAgfSxcblxuICBpc0ludDogaXNJbnQsXG4gIGlzSW50ZWdlcjogaXNJbnQsXG5cbiAgaXNTdHJpbmc6IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT0gJ3N0cmluZyc7XG4gIH0sXG5cbiAgaXNOYU46IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4geCAhPSB4O1xuICB9LFxuXG4gIGlzT2JqZWN0OiBmdW5jdGlvbih4KSB7IC8vIGEgXCJwbGFpblwiIG9iamVjdFxuICAgIHJldHVybiB0eXBlb2YgeCA9PSAnb2JqZWN0JyAmJiAhIXggJiYgeC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICB9LFxuXG4gIGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfSxcblxuICBpc0Z1bmN0aW9uOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09ICdmdW5jdGlvbic7XG4gIH1cblxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9wYXJzZUZsb2F0ID0gKGZ1bmN0aW9uKCkge1xuXG4gIHZhciBtZW1vID0ge307XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcblxuICAgIHZhciB0eXBlID0gdHlwZW9mIHg7XG5cbiAgICBpZiAodHlwZSAhPSAnc3RyaW5nJykge1xuICAgICAgLy8gY2hlY2sgdGhhdCBgeGAgaXMgYSBudW1iZXIgdHlwZVxuICAgICAgaWYgKHR5cGUgPT0gJ251bWJlcicgJiYgaXNGaW5pdGUoeCkpIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBsb29rdXAgYHhgIGluIGBtZW1vYFxuICAgIGlmICh4IGluIG1lbW8pIHtcbiAgICAgIHJldHVybiBtZW1vW3hdO1xuICAgIH1cblxuICAgIC8vIG5vcm1hbGlzZSBgeGBcbiAgICB2YXIgc3RyID0geC50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIGNoZWNrIGlmIGB4YCBoYXMgYSBtaW51cyBzaWduXG4gICAgdmFyIHNpZ24gPSAxO1xuICAgIGlmIChzdHJbMF0gPT0gJy0nKSB7XG4gICAgICBzaWduID0gLTE7XG4gICAgICBzdHIgPSBzdHIuc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgLy8gcGFyc2UgYHhgIGludG8gYSBudW1iZXJcbiAgICB2YXIgcGFyc2VkO1xuICAgIGlmIChzdHIuaW5kZXhPZignMHgnKSA9PSAwKSB7IC8vIGhleGFkZWNpbWFsXG4gICAgICBwYXJzZWQgPSBwYXJzZUludChzdHIuc2xpY2UoMiksIDE2KTtcbiAgICB9IGVsc2UgaWYgKHN0clswXSA9PT0gJzAnICYmIHN0ci5sZW5ndGggPiAxKSB7IC8vIG9jdGFsXG4gICAgICBwYXJzZWQgPSBwYXJzZUludChzdHIuc2xpY2UoMSksIDgpO1xuICAgIH0gZWxzZSB7IC8vIGRlY2ltYWwgb3IgZmxvYXRcbiAgICAgIHBhcnNlZCA9IHBhcnNlRmxvYXQoc3RyKTtcbiAgICB9XG5cbiAgICBpZiAocGFyc2VkID09IHBhcnNlZCAmJiBpc0Zpbml0ZShzdHIpKSB7XG4gICAgICBwYXJzZWQgPSBzaWduICogcGFyc2VkO1xuICAgICAgbWVtb1t4XSA9IHBhcnNlZDsgLy8gc2F2ZSByZXN1bHQgdG8gYG1lbW9gXG4gICAgICByZXR1cm4gcGFyc2VkO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcblxuICB9O1xuXG59KSgpO1xuXG52YXIgaXNGbG9hdCA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIF9wYXJzZUZsb2F0KHgpICE9PSBudWxsO1xufTtcblxudmFyIF9wYXJzZUludCA9IGZ1bmN0aW9uKHgpIHtcblxuICB2YXIgcGFyc2VkID0gX3BhcnNlRmxvYXQoeCk7XG5cbiAgaWYgKHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgJSAxID09IDApIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG4gIHJldHVybiBudWxsO1xuXG59O1xuXG52YXIgaXNJbnQgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiBfcGFyc2VJbnQoeCkgIT09IG51bGw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBpc0Zsb2F0OiBpc0Zsb2F0LFxuICBwYXJzZUZsb2F0OiBfcGFyc2VGbG9hdCxcbiAgaXNJbnQ6IGlzSW50LFxuICBpc0ludGVnZXI6IGlzSW50LFxuICBwYXJzZUludDogX3BhcnNlSW50LFxuICBwYXJzZUludGVnZXI6IF9wYXJzZUludFxuXG59O1xuIl19
