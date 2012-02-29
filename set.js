/**
 * set.js
 * ------
 * A quick-and-dirty implementation of sets using JavaScript object keys and
 * returning arrays that works in Node.js and in all browsers.
 *
 * Numbers are preserved but all other datatypes are converted to strings (a
 * (limitation of this implementation).
 *
 * https://github.com/pandeiro/set.js
 */
 
(function() {

  // Implement Array.prototype.indexOf if not already present:
  // developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
  if (!Array.prototype.indexOf) {  
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {  
      "use strict";  
      if (this == null) {  
        throw new TypeError();  
      }  
      var t = Object(this);  
      var len = t.length >>> 0;  
      if (len === 0) {  
        return -1;  
      }  
      var n = 0;  
      if (arguments.length > 0) {  
        n = Number(arguments[1]);  
        if (n != n) { // shortcut for verifying if it's NaN  
          n = 0;  
        } else if (n != 0 && n != Infinity && n != -Infinity) {  
          n = (n > 0 || -1) * Math.floor(Math.abs(n));  
        }  
      }  
      if (n >= len) {  
        return -1;  
      }  
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);  
      for (; k < len; k++) {  
        if (k in t && t[k] === searchElement) {  
          return k;  
        }  
      }  
      return -1;  
    }  
  }  

  var set = {

    // Create a new set
    // @params: any primitives or objects; objects and functions get
    //          converted to strings
    // @returns: Array
    new: function() {
      var args = Array.prototype.slice.call(arguments);
      var o = {}, s = [];
      for (var i = 0, l = args.length; i < l; i++) {
	var k;
	switch (typeof args[i]) {
	case 'function':
	  k = args[i].toString(); break;
	case 'object':
	  k = JSON.stringify(args[i]); break;
	default:
	  k = args[i];
	}
	o[k] = true; 
      }
      for (var k in o) {
	if (o.hasOwnProperty(k)) {
	  if (!isNaN(k * 1)) k = k * 1;
	  s.push(k);
	}
      }
      return s;
    },

    // Return the union of two or more objects
    // @params: Array1 .. Arrayn OR Object1 .. Objectn
    // @returns: Array
    union: function() {
      var args = Array.prototype.slice.call(arguments);
      var t = [];
      for (var i = 0, l = args.length; i < l; i++) {
	if (typeof args[i] === 'object' && args[i].length > -1) {
	  t = t.concat(args[i]);
	} else {
	  t = t.concat([args[i]]);
	}
      }
      return set.new.apply(null, t);
    },

    // Return the intersection of two or more sets
    // @params: Array1 .. Arrayn
    // @returns: Array
    intersection: function() {
      var args = Array.prototype.slice.call(arguments);
      var t = [];
      if (args.length < 2) return t;
      for (var i = 0, l = args[0].length; i < l; i++) {
	for (var ii = 1, ll = args.length; ii < ll; ii++) {
	  if (args[ii].indexOf(args[0][i]) > -1) t.push(args[0][i]);
	}
      }
      return set.new.apply(null, t);
    },

    // Return the relative complement (set-theoretic difference) of two or
    // more sets
    // @params: Array1 .. Arrayn
    // @returns: Array
    complement: function() {
      var args = Array.prototype.slice.call(arguments);
      var t = [], inter;
      if (args.length === 0) return t;
      if (args.length === 1) {
	if (typeof args[0] === 'object' && args[0].length !== 'undefined') {
	  return args[0];
	} else {
	  return [args[0]];
	}
      }
      inter = set.intersection.apply(null, args);
      for (var i = 0, l = args[0].length; i < l; i++) {
	if (inter.indexOf(args[0][i]) === -1) t.push(args[0][i]);
      }
      return t;
    },

    // Return the symmetric difference of two or more sets
    // @params: Array1 .. Arrayn
    // @returns: Array
    difference: function() {
      var args = Array.prototype.slice.call(arguments);
      if (args.length < 2)
	throw new Error("set.difference needs multiple arguments");
      var diff = function(a, b) {
	return set.union(set.complement(a, b), set.complement(b, a));
      };
      var curr = args[0];
      for (var i = 1, l = args.length; i < l; i++) {
	curr = diff(curr, args[i]);
      }
      return curr;
    }

  }


  // Export for Node.js or attach to window in browser
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = set;
  } else {
    root.set = set;
  }
  
}());