var test = require('tape');
var check = require('..');

test('alias', function(t) {

  t.equal(check.isInt, check.isInteger);

  t.end();

});
