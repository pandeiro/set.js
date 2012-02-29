#!/usr/bin/env node

/**
 * set.test.js
 * -----------
 * To run:
 *     chmod +x set.test.js
 *     ./set.test.js
 */

// Augment Array.prototype with an equals method
Array.prototype.equals = function(arr) {
  if (this == arr) return true;

  if (this.length !== arr.length) {
    return false;
  }

  for (var i = 0, l = arr.length; i < l; i++) {
    if (this[i] &&
	Object.prototype.toString.call( this[i] ) === '[object Array]') {
      if (!this[i].equals(arr[i])) {
        return false;
      } else {
        continue;
      }
    }

    if (this[i] !== arr[i]) {
      return false;
    }
  }

  return true;
}

var set = require('./set.js');

var tests = []
var pr = function(arr) { return "["+arr+"]"; };

var assert = function(a, b) {
  a = a.sort(); b = b.sort();
  var r = a.equals(b);
  tests.push(r);
  if (!r) console.log(
    "TEST #"+tests.length+" FAILED: "+pr(a)+" does not equal "+pr(b)
  );
}

// Tests
assert(set.new(1, 2, 3),
       [1, 2, 3]);
assert(set.new(1, 1, 1),
       [1]);
assert(set.new(),
       []);
assert(set.new('a', 1, '1'),
       ['a', 1]);
assert(set.new(true, false),
       ['true', 'false']);
assert(set.new([1, 2], ["1", "2"], ["1", 2]),
       ['[1,2]', '["1","2"]', '["1",2]']);

assert(set.union([1, 2, 3], [3, 4, 5]),
       [1, 2, 3, 4, 5]);
assert(set.union([], []),
       []);
assert(set.union(1, 2, 3),
       [1, 2, 3]);
assert(set.union(-1, -2, 0, 0),
       [-1, -2, 0]);
assert(set.union([Math.sin(50)], [-0.2623748537039287]),
       [-0.26237485370392877, -0.2623748537039287]);

assert(set.intersection([1, 2, 3, 4, 5], [1, 3, 5]),
       [1, 3, 5]);
assert(set.intersection([1, 2], [3, 4], [5, 6]),
       []);
assert(set.intersection([2]),
       []);
assert(set.intersection(['a', 'b'], ['a', 'B']),
       ['a']);

assert(set.complement([1, 2, 3], [1]),
       [2, 3]);
assert(set.complement([1], [1, 2, 3]),
       []);
assert(set.complement(['abc', 'abc '], [' abc']),
       ['abc', 'abc ']);

assert(set.difference([1, 2, 3], [3, 4, 5]),
       [1, 2, 4, 5]);
assert(set.difference([1, 2, 3], [3, 4, 5]),
       set.union(set.complement([1, 2, 3], [3, 4, 5]),
		 set.complement([3, 4, 5], [1, 2, 3])));



// Wrap
var total = tests.length;
var passed = tests.filter(function(t) { return !!t; }).length;

console.log("RESULT: "+passed+" of "+total+" tests passed.");
  

