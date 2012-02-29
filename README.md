# Set.js

A very _simple and limited_ implementation of sets in JavaScript based on a chapter
in [Programming in Lua](http://www.lua.org/pil/11.5.html). It uses the uniqueness of
Object keys to ensure uniqueness and converts all values except Numbers to Strings.

Implements the following set operations:
Union, Intersection, Relative Complement, and Symmetric Difference

Works in Node.js or all browsers >=IE6

## Usage:

    var set = require('./set.js');

    var s1 = set.new(1, 2, 3, 4, 5, 6, 7, 8);
    var s2 = set.new(2, 4, 6, 8, 10, 12, 14, 16);
    var s3 = set.new(3, 6, 9, 12, 15, 18, 21, 24);

    set.union(s1, s2, s3);
    //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 21, 24]

    set.intersection(s1, s2, s3);
    //=> [2, 3, 4, 6, 8]

    set.complement(s2, s1);
    //=> [10, 12, 14, 16]

    set.difference(s1, s2, s3);
    // [1, 5, 6, 7, 9, 10, 14, 15, 16, 18, 21, 24]

