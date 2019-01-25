(function () {
var table = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var noop = function () {
  };
  var noarg = function (f) {
    return function () {
      return f();
    };
  };
  var compose = function (fa, fb) {
    return function () {
      return fa(fb.apply(null, arguments));
    };
  };
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var identity = function (x) {
    return x;
  };
  var tripleEquals = function (a, b) {
    return a === b;
  };
  var curry = function (f) {
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
      return !f.apply(null, arguments);
    };
  };
  var die = function (msg) {
    return function () {
      throw new Error(msg);
    };
  };
  var apply = function (f) {
    return f();
  };
  var call = function (f) {
    f();
  };
  var never$1 = constant(false);
  var always$1 = constant(true);
  var $_51ccyzjhjcgfo560 = {
    noop: noop,
    noarg: noarg,
    compose: compose,
    constant: constant,
    identity: identity,
    tripleEquals: tripleEquals,
    curry: curry,
    not: not,
    die: die,
    apply: apply,
    call: call,
    never: never$1,
    always: always$1
  };

  var never = $_51ccyzjhjcgfo560.never;
  var always = $_51ccyzjhjcgfo560.always;
  var none = function () {
    return NONE;
  };
  var NONE = function () {
    var eq = function (o) {
      return o.isNone();
    };
    var call = function (thunk) {
      return thunk();
    };
    var id = function (n) {
      return n;
    };
    var noop = function () {
    };
    var me = {
      fold: function (n, s) {
        return n();
      },
      is: never,
      isSome: never,
      isNone: always,
      getOr: id,
      getOrThunk: call,
      getOrDie: function (msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      or: id,
      orThunk: call,
      map: none,
      ap: none,
      each: noop,
      bind: none,
      flatten: none,
      exists: never,
      forall: always,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: $_51ccyzjhjcgfo560.constant('none()')
    };
    if (Object.freeze)
      Object.freeze(me);
    return me;
  }();
  var some = function (a) {
    var constant_a = function () {
      return a;
    };
    var self = function () {
      return me;
    };
    var map = function (f) {
      return some(f(a));
    };
    var bind = function (f) {
      return f(a);
    };
    var me = {
      fold: function (n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always,
      isNone: never,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      or: self,
      orThunk: self,
      map: map,
      ap: function (optfab) {
        return optfab.fold(none, function (fab) {
          return some(fab(a));
        });
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      flatten: constant_a,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never, function (b) {
          return elementEq(a, b);
        });
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return 'some(' + a + ')';
      }
    };
    return me;
  };
  var from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  var $_ch5dzyjgjcgfo55s = {
    some: some,
    none: none,
    from: from
  };

  var rawIndexOf = function () {
    var pIndexOf = Array.prototype.indexOf;
    var fastIndex = function (xs, x) {
      return pIndexOf.call(xs, x);
    };
    var slowIndex = function (xs, x) {
      return slowIndexOf(xs, x);
    };
    return pIndexOf === undefined ? slowIndex : fastIndex;
  }();
  var indexOf = function (xs, x) {
    var r = rawIndexOf(xs, x);
    return r === -1 ? $_ch5dzyjgjcgfo55s.none() : $_ch5dzyjgjcgfo55s.some(r);
  };
  var contains = function (xs, x) {
    return rawIndexOf(xs, x) > -1;
  };
  var exists = function (xs, pred) {
    return findIndex(xs, pred).isSome();
  };
  var range = function (num, f) {
    var r = [];
    for (var i = 0; i < num; i++) {
      r.push(f(i));
    }
    return r;
  };
  var chunk = function (array, size) {
    var r = [];
    for (var i = 0; i < array.length; i += size) {
      var s = array.slice(i, i + size);
      r.push(s);
    }
    return r;
  };
  var map = function (xs, f) {
    var len = xs.length;
    var r = new Array(len);
    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i, xs);
    }
    return r;
  };
  var each = function (xs, f) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var eachr = function (xs, f) {
    for (var i = xs.length - 1; i >= 0; i--) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var partition = function (xs, pred) {
    var pass = [];
    var fail = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      var arr = pred(x, i, xs) ? pass : fail;
      arr.push(x);
    }
    return {
      pass: pass,
      fail: fail
    };
  };
  var filter = function (xs, pred) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        r.push(x);
      }
    }
    return r;
  };
  var groupBy = function (xs, f) {
    if (xs.length === 0) {
      return [];
    } else {
      var wasType = f(xs[0]);
      var r = [];
      var group = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        var type = f(x);
        if (type !== wasType) {
          r.push(group);
          group = [];
        }
        wasType = type;
        group.push(x);
      }
      if (group.length !== 0) {
        r.push(group);
      }
      return r;
    }
  };
  var foldr = function (xs, f, acc) {
    eachr(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var foldl = function (xs, f, acc) {
    each(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var find = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_ch5dzyjgjcgfo55s.some(x);
      }
    }
    return $_ch5dzyjgjcgfo55s.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_ch5dzyjgjcgfo55s.some(i);
      }
    }
    return $_ch5dzyjgjcgfo55s.none();
  };
  var slowIndexOf = function (xs, x) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (xs[i] === x) {
        return i;
      }
    }
    return -1;
  };
  var push = Array.prototype.push;
  var flatten = function (xs) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (!Array.prototype.isPrototypeOf(xs[i]))
        throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
      push.apply(r, xs[i]);
    }
    return r;
  };
  var bind = function (xs, f) {
    var output = map(xs, f);
    return flatten(output);
  };
  var forall = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      var x = xs[i];
      if (pred(x, i, xs) !== true) {
        return false;
      }
    }
    return true;
  };
  var equal = function (a1, a2) {
    return a1.length === a2.length && forall(a1, function (x, i) {
      return x === a2[i];
    });
  };
  var slice = Array.prototype.slice;
  var reverse = function (xs) {
    var r = slice.call(xs, 0);
    r.reverse();
    return r;
  };
  var difference = function (a1, a2) {
    return filter(a1, function (x) {
      return !contains(a2, x);
    });
  };
  var mapToObject = function (xs, f) {
    var r = {};
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      r[String(x)] = f(x, i);
    }
    return r;
  };
  var pure = function (x) {
    return [x];
  };
  var sort = function (xs, comparator) {
    var copy = slice.call(xs, 0);
    copy.sort(comparator);
    return copy;
  };
  var head = function (xs) {
    return xs.length === 0 ? $_ch5dzyjgjcgfo55s.none() : $_ch5dzyjgjcgfo55s.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? $_ch5dzyjgjcgfo55s.none() : $_ch5dzyjgjcgfo55s.some(xs[xs.length - 1]);
  };
  var $_epd2qyjfjcgfo55m = {
    map: map,
    each: each,
    eachr: eachr,
    partition: partition,
    filter: filter,
    groupBy: groupBy,
    indexOf: indexOf,
    foldr: foldr,
    foldl: foldl,
    find: find,
    findIndex: findIndex,
    flatten: flatten,
    bind: bind,
    forall: forall,
    exists: exists,
    contains: contains,
    equal: equal,
    reverse: reverse,
    chunk: chunk,
    difference: difference,
    mapToObject: mapToObject,
    pure: pure,
    sort: sort,
    range: range,
    head: head,
    last: last
  };

  var keys = function () {
    var fastKeys = Object.keys;
    var slowKeys = function (o) {
      var r = [];
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          r.push(i);
        }
      }
      return r;
    };
    return fastKeys === undefined ? slowKeys : fastKeys;
  }();
  var each$1 = function (obj, f) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      f(x, i, obj);
    }
  };
  var objectMap = function (obj, f) {
    return tupleMap(obj, function (x, i, obj) {
      return {
        k: i,
        v: f(x, i, obj)
      };
    });
  };
  var tupleMap = function (obj, f) {
    var r = {};
    each$1(obj, function (x, i) {
      var tuple = f(x, i, obj);
      r[tuple.k] = tuple.v;
    });
    return r;
  };
  var bifilter = function (obj, pred) {
    var t = {};
    var f = {};
    each$1(obj, function (x, i) {
      var branch = pred(x, i) ? t : f;
      branch[i] = x;
    });
    return {
      t: t,
      f: f
    };
  };
  var mapToArray = function (obj, f) {
    var r = [];
    each$1(obj, function (value, name) {
      r.push(f(value, name));
    });
    return r;
  };
  var find$1 = function (obj, pred) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      if (pred(x, i, obj)) {
        return $_ch5dzyjgjcgfo55s.some(x);
      }
    }
    return $_ch5dzyjgjcgfo55s.none();
  };
  var values = function (obj) {
    return mapToArray(obj, function (v) {
      return v;
    });
  };
  var size = function (obj) {
    return values(obj).length;
  };
  var $_9lvqaqjjjcgfo578 = {
    bifilter: bifilter,
    each: each$1,
    map: objectMap,
    mapToArray: mapToArray,
    tupleMap: tupleMap,
    find: find$1,
    keys: keys,
    values: values,
    size: size
  };

  var Immutable = function () {
    var fields = arguments;
    return function () {
      var values = new Array(arguments.length);
      for (var i = 0; i < values.length; i++)
        values[i] = arguments[i];
      if (fields.length !== values.length)
        throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
      var struct = {};
      $_epd2qyjfjcgfo55m.each(fields, function (name, i) {
        struct[name] = $_51ccyzjhjcgfo560.constant(values[i]);
      });
      return struct;
    };
  };

  var typeOf = function (x) {
    if (x === null)
      return 'null';
    var t = typeof x;
    if (t === 'object' && Array.prototype.isPrototypeOf(x))
      return 'array';
    if (t === 'object' && String.prototype.isPrototypeOf(x))
      return 'string';
    return t;
  };
  var isType = function (type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };
  var $_9ccf2jojcgfo57o = {
    isString: isType('string'),
    isObject: isType('object'),
    isArray: isType('array'),
    isNull: isType('null'),
    isBoolean: isType('boolean'),
    isUndefined: isType('undefined'),
    isFunction: isType('function'),
    isNumber: isType('number')
  };

  var sort$1 = function (arr) {
    return arr.slice(0).sort();
  };
  var reqMessage = function (required, keys) {
    throw new Error('All required keys (' + sort$1(required).join(', ') + ') were not specified. Specified keys were: ' + sort$1(keys).join(', ') + '.');
  };
  var unsuppMessage = function (unsupported) {
    throw new Error('Unsupported keys for object: ' + sort$1(unsupported).join(', '));
  };
  var validateStrArr = function (label, array) {
    if (!$_9ccf2jojcgfo57o.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_epd2qyjfjcgfo55m.each(array, function (a) {
      if (!$_9ccf2jojcgfo57o.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_epd2qyjfjcgfo55m.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_5zbw28jnjcgfo57l = {
    sort: sort$1,
    reqMessage: reqMessage,
    unsuppMessage: unsuppMessage,
    validateStrArr: validateStrArr,
    invalidTypeMessage: invalidTypeMessage,
    checkDupes: checkDupes
  };

  var MixedBag = function (required, optional) {
    var everything = required.concat(optional);
    if (everything.length === 0)
      throw new Error('You must specify at least one required or optional field.');
    $_5zbw28jnjcgfo57l.validateStrArr('required', required);
    $_5zbw28jnjcgfo57l.validateStrArr('optional', optional);
    $_5zbw28jnjcgfo57l.checkDupes(everything);
    return function (obj) {
      var keys = $_9lvqaqjjjcgfo578.keys(obj);
      var allReqd = $_epd2qyjfjcgfo55m.forall(required, function (req) {
        return $_epd2qyjfjcgfo55m.contains(keys, req);
      });
      if (!allReqd)
        $_5zbw28jnjcgfo57l.reqMessage(required, keys);
      var unsupported = $_epd2qyjfjcgfo55m.filter(keys, function (key) {
        return !$_epd2qyjfjcgfo55m.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_5zbw28jnjcgfo57l.unsuppMessage(unsupported);
      var r = {};
      $_epd2qyjfjcgfo55m.each(required, function (req) {
        r[req] = $_51ccyzjhjcgfo560.constant(obj[req]);
      });
      $_epd2qyjfjcgfo55m.each(optional, function (opt) {
        r[opt] = $_51ccyzjhjcgfo560.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? $_ch5dzyjgjcgfo55s.some(obj[opt]) : $_ch5dzyjgjcgfo55s.none());
      });
      return r;
    };
  };

  var $_6w2qyfjkjcgfo57c = {
    immutable: Immutable,
    immutableBag: MixedBag
  };

  var dimensions = $_6w2qyfjkjcgfo57c.immutable('width', 'height');
  var grid = $_6w2qyfjkjcgfo57c.immutable('rows', 'columns');
  var address = $_6w2qyfjkjcgfo57c.immutable('row', 'column');
  var coords = $_6w2qyfjkjcgfo57c.immutable('x', 'y');
  var detail = $_6w2qyfjkjcgfo57c.immutable('element', 'rowspan', 'colspan');
  var detailnew = $_6w2qyfjkjcgfo57c.immutable('element', 'rowspan', 'colspan', 'isNew');
  var extended = $_6w2qyfjkjcgfo57c.immutable('element', 'rowspan', 'colspan', 'row', 'column');
  var rowdata = $_6w2qyfjkjcgfo57c.immutable('element', 'cells', 'section');
  var elementnew = $_6w2qyfjkjcgfo57c.immutable('element', 'isNew');
  var rowdatanew = $_6w2qyfjkjcgfo57c.immutable('element', 'cells', 'section', 'isNew');
  var rowcells = $_6w2qyfjkjcgfo57c.immutable('cells', 'section');
  var rowdetails = $_6w2qyfjkjcgfo57c.immutable('details', 'section');
  var bounds = $_6w2qyfjkjcgfo57c.immutable('startRow', 'startCol', 'finishRow', 'finishCol');
  var $_78xe8wjqjcgfo589 = {
    dimensions: dimensions,
    grid: grid,
    address: address,
    coords: coords,
    extended: extended,
    detail: detail,
    detailnew: detailnew,
    rowdata: rowdata,
    elementnew: elementnew,
    rowdatanew: rowdatanew,
    rowcells: rowcells,
    rowdetails: rowdetails,
    bounds: bounds
  };

  var fromHtml = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    if (!div.hasChildNodes() || div.childNodes.length > 1) {
      console.error('HTML does not have a single root node', html);
      throw 'HTML must have a single root node';
    }
    return fromDom(div.childNodes[0]);
  };
  var fromTag = function (tag, scope) {
    var doc = scope || document;
    var node = doc.createElement(tag);
    return fromDom(node);
  };
  var fromText = function (text, scope) {
    var doc = scope || document;
    var node = doc.createTextNode(text);
    return fromDom(node);
  };
  var fromDom = function (node) {
    if (node === null || node === undefined)
      throw new Error('Node cannot be null or undefined');
    return { dom: $_51ccyzjhjcgfo560.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return $_ch5dzyjgjcgfo55s.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_epp4kejujcgfo5a8 = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_9vjw76jvjcgfo5ah = {
    ATTRIBUTE: 2,
    CDATA_SECTION: 4,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    ELEMENT: 1,
    TEXT: 3,
    PROCESSING_INSTRUCTION: 7,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    NOTATION: 12
  };

  var ELEMENT = $_9vjw76jvjcgfo5ah.ELEMENT;
  var DOCUMENT = $_9vjw76jvjcgfo5ah.DOCUMENT;
  var is = function (element, selector) {
    var elem = element.dom();
    if (elem.nodeType !== ELEMENT)
      return false;
    else if (elem.matches !== undefined)
      return elem.matches(selector);
    else if (elem.msMatchesSelector !== undefined)
      return elem.msMatchesSelector(selector);
    else if (elem.webkitMatchesSelector !== undefined)
      return elem.webkitMatchesSelector(selector);
    else if (elem.mozMatchesSelector !== undefined)
      return elem.mozMatchesSelector(selector);
    else
      throw new Error('Browser lacks native selectors');
  };
  var bypassSelector = function (dom) {
    return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT || dom.childElementCount === 0;
  };
  var all = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? [] : $_epd2qyjfjcgfo55m.map(base.querySelectorAll(selector), $_epp4kejujcgfo5a8.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? $_ch5dzyjgjcgfo55s.none() : $_ch5dzyjgjcgfo55s.from(base.querySelector(selector)).map($_epp4kejujcgfo5a8.fromDom);
  };
  var $_4p0ah3jtjcgfo59y = {
    all: all,
    is: is,
    one: one
  };

  var toArray = function (target, f) {
    var r = [];
    var recurse = function (e) {
      r.push(e);
      return f(e);
    };
    var cur = f(target);
    do {
      cur = cur.bind(recurse);
    } while (cur.isSome());
    return r;
  };
  var $_4nt6oajxjcgfo5b4 = { toArray: toArray };

  var global = typeof window !== 'undefined' ? window : Function('return this;')();

  var path = function (parts, scope) {
    var o = scope !== undefined && scope !== null ? scope : global;
    for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
      o = o[parts[i]];
    return o;
  };
  var resolve = function (p, scope) {
    var parts = p.split('.');
    return path(parts, scope);
  };
  var step = function (o, part) {
    if (o[part] === undefined || o[part] === null)
      o[part] = {};
    return o[part];
  };
  var forge = function (parts, target) {
    var o = target !== undefined ? target : global;
    for (var i = 0; i < parts.length; ++i)
      o = step(o, parts[i]);
    return o;
  };
  var namespace = function (name, target) {
    var parts = name.split('.');
    return forge(parts, target);
  };
  var $_dfumbjk1jcgfo5bz = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_dfumbjk1jcgfo5bz.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_e4n0u3k0jcgfo5bt = { getOrDie: getOrDie };

  var node = function () {
    var f = $_e4n0u3k0jcgfo5bt.getOrDie('Node');
    return f;
  };
  var compareDocumentPosition = function (a, b, match) {
    return (a.compareDocumentPosition(b) & match) !== 0;
  };
  var documentPositionPreceding = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
  };
  var documentPositionContainedBy = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
  };
  var $_83jx06jzjcgfo5br = {
    documentPositionPreceding: documentPositionPreceding,
    documentPositionContainedBy: documentPositionContainedBy
  };

  var cached = function (f) {
    var called = false;
    var r;
    return function () {
      if (!called) {
        called = true;
        r = f.apply(null, arguments);
      }
      return r;
    };
  };
  var $_75hcuik4jcgfo5ca = { cached: cached };

  var firstMatch = function (regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
      var x = regexes[i];
      if (x.test(s))
        return x;
    }
    return undefined;
  };
  var find$2 = function (regexes, agent) {
    var r = firstMatch(regexes, agent);
    if (!r)
      return {
        major: 0,
        minor: 0
      };
    var group = function (i) {
      return Number(agent.replace(r, '$' + i));
    };
    return nu$1(group(1), group(2));
  };
  var detect$2 = function (versionRegexes, agent) {
    var cleanedAgent = String(agent).toLowerCase();
    if (versionRegexes.length === 0)
      return unknown$1();
    return find$2(versionRegexes, cleanedAgent);
  };
  var unknown$1 = function () {
    return nu$1(0, 0);
  };
  var nu$1 = function (major, minor) {
    return {
      major: major,
      minor: minor
    };
  };
  var $_77o38wk7jcgfo5cp = {
    nu: nu$1,
    detect: detect$2,
    unknown: unknown$1
  };

  var edge = 'Edge';
  var chrome = 'Chrome';
  var ie = 'IE';
  var opera = 'Opera';
  var firefox = 'Firefox';
  var safari = 'Safari';
  var isBrowser = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown = function () {
    return nu({
      current: undefined,
      version: $_77o38wk7jcgfo5cp.unknown()
    });
  };
  var nu = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isEdge: isBrowser(edge, current),
      isChrome: isBrowser(chrome, current),
      isIE: isBrowser(ie, current),
      isOpera: isBrowser(opera, current),
      isFirefox: isBrowser(firefox, current),
      isSafari: isBrowser(safari, current)
    };
  };
  var $_ho15xk6jcgfo5ce = {
    unknown: unknown,
    nu: nu,
    edge: $_51ccyzjhjcgfo560.constant(edge),
    chrome: $_51ccyzjhjcgfo560.constant(chrome),
    ie: $_51ccyzjhjcgfo560.constant(ie),
    opera: $_51ccyzjhjcgfo560.constant(opera),
    firefox: $_51ccyzjhjcgfo560.constant(firefox),
    safari: $_51ccyzjhjcgfo560.constant(safari)
  };

  var windows = 'Windows';
  var ios = 'iOS';
  var android = 'Android';
  var linux = 'Linux';
  var osx = 'OSX';
  var solaris = 'Solaris';
  var freebsd = 'FreeBSD';
  var isOS = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown$2 = function () {
    return nu$2({
      current: undefined,
      version: $_77o38wk7jcgfo5cp.unknown()
    });
  };
  var nu$2 = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isWindows: isOS(windows, current),
      isiOS: isOS(ios, current),
      isAndroid: isOS(android, current),
      isOSX: isOS(osx, current),
      isLinux: isOS(linux, current),
      isSolaris: isOS(solaris, current),
      isFreeBSD: isOS(freebsd, current)
    };
  };
  var $_d9uhuak8jcgfo5cs = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_51ccyzjhjcgfo560.constant(windows),
    ios: $_51ccyzjhjcgfo560.constant(ios),
    android: $_51ccyzjhjcgfo560.constant(android),
    linux: $_51ccyzjhjcgfo560.constant(linux),
    osx: $_51ccyzjhjcgfo560.constant(osx),
    solaris: $_51ccyzjhjcgfo560.constant(solaris),
    freebsd: $_51ccyzjhjcgfo560.constant(freebsd)
  };

  var DeviceType = function (os, browser, userAgent) {
    var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
    var isiPhone = os.isiOS() && !isiPad;
    var isAndroid3 = os.isAndroid() && os.version.major === 3;
    var isAndroid4 = os.isAndroid() && os.version.major === 4;
    var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
    var isTouch = os.isiOS() || os.isAndroid();
    var isPhone = isTouch && !isTablet;
    var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
    return {
      isiPad: $_51ccyzjhjcgfo560.constant(isiPad),
      isiPhone: $_51ccyzjhjcgfo560.constant(isiPhone),
      isTablet: $_51ccyzjhjcgfo560.constant(isTablet),
      isPhone: $_51ccyzjhjcgfo560.constant(isPhone),
      isTouch: $_51ccyzjhjcgfo560.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_51ccyzjhjcgfo560.constant(iOSwebview)
    };
  };

  var detect$3 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_epd2qyjfjcgfo55m.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$3(browsers, userAgent).map(function (browser) {
      var version = $_77o38wk7jcgfo5cp.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$3(oses, userAgent).map(function (os) {
      var version = $_77o38wk7jcgfo5cp.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_bsdjuqkajcgfo5d3 = {
    detectBrowser: detectBrowser,
    detectOs: detectOs
  };

  var addToStart = function (str, prefix) {
    return prefix + str;
  };
  var addToEnd = function (str, suffix) {
    return str + suffix;
  };
  var removeFromStart = function (str, numChars) {
    return str.substring(numChars);
  };
  var removeFromEnd = function (str, numChars) {
    return str.substring(0, str.length - numChars);
  };
  var $_7w8691kdjcgfo5dn = {
    addToStart: addToStart,
    addToEnd: addToEnd,
    removeFromStart: removeFromStart,
    removeFromEnd: removeFromEnd
  };

  var first = function (str, count) {
    return str.substr(0, count);
  };
  var last$1 = function (str, count) {
    return str.substr(str.length - count, str.length);
  };
  var head$1 = function (str) {
    return str === '' ? $_ch5dzyjgjcgfo55s.none() : $_ch5dzyjgjcgfo55s.some(str.substr(0, 1));
  };
  var tail = function (str) {
    return str === '' ? $_ch5dzyjgjcgfo55s.none() : $_ch5dzyjgjcgfo55s.some(str.substring(1));
  };
  var $_duez2dkejcgfo5dp = {
    first: first,
    last: last$1,
    head: head$1,
    tail: tail
  };

  var checkRange = function (str, substr, start) {
    if (substr === '')
      return true;
    if (str.length < substr.length)
      return false;
    var x = str.substr(start, start + substr.length);
    return x === substr;
  };
  var supplant = function (str, obj) {
    var isStringOrNumber = function (a) {
      var t = typeof a;
      return t === 'string' || t === 'number';
    };
    return str.replace(/\${([^{}]*)}/g, function (a, b) {
      var value = obj[b];
      return isStringOrNumber(value) ? value : a;
    });
  };
  var removeLeading = function (str, prefix) {
    return startsWith(str, prefix) ? $_7w8691kdjcgfo5dn.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_7w8691kdjcgfo5dn.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_7w8691kdjcgfo5dn.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_7w8691kdjcgfo5dn.addToEnd(str, prefix);
  };
  var contains$2 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_duez2dkejcgfo5dp.head(str).bind(function (head) {
      return $_duez2dkejcgfo5dp.tail(str).map(function (tail) {
        return head.toUpperCase() + tail;
      });
    }).getOr(str);
  };
  var startsWith = function (str, prefix) {
    return checkRange(str, prefix, 0);
  };
  var endsWith = function (str, suffix) {
    return checkRange(str, suffix, str.length - suffix.length);
  };
  var trim = function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  };
  var lTrim = function (str) {
    return str.replace(/^\s+/g, '');
  };
  var rTrim = function (str) {
    return str.replace(/\s+$/g, '');
  };
  var $_g6xy1okcjcgfo5dk = {
    supplant: supplant,
    startsWith: startsWith,
    removeLeading: removeLeading,
    removeTrailing: removeTrailing,
    ensureLeading: ensureLeading,
    ensureTrailing: ensureTrailing,
    endsWith: endsWith,
    contains: contains$2,
    trim: trim,
    lTrim: lTrim,
    rTrim: rTrim,
    capitalize: capitalize
  };

  var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
  var checkContains = function (target) {
    return function (uastring) {
      return $_g6xy1okcjcgfo5dk.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_g6xy1okcjcgfo5dk.contains(uastring, 'edge/') && $_g6xy1okcjcgfo5dk.contains(uastring, 'chrome') && $_g6xy1okcjcgfo5dk.contains(uastring, 'safari') && $_g6xy1okcjcgfo5dk.contains(uastring, 'applewebkit');
        return monstrosity;
      }
    },
    {
      name: 'Chrome',
      versionRegexes: [
        /.*?chrome\/([0-9]+)\.([0-9]+).*/,
        normalVersionRegex
      ],
      search: function (uastring) {
        return $_g6xy1okcjcgfo5dk.contains(uastring, 'chrome') && !$_g6xy1okcjcgfo5dk.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_g6xy1okcjcgfo5dk.contains(uastring, 'msie') || $_g6xy1okcjcgfo5dk.contains(uastring, 'trident');
      }
    },
    {
      name: 'Opera',
      versionRegexes: [
        normalVersionRegex,
        /.*?opera\/([0-9]+)\.([0-9]+).*/
      ],
      search: checkContains('opera')
    },
    {
      name: 'Firefox',
      versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
      search: checkContains('firefox')
    },
    {
      name: 'Safari',
      versionRegexes: [
        normalVersionRegex,
        /.*?cpu os ([0-9]+)_([0-9]+).*/
      ],
      search: function (uastring) {
        return ($_g6xy1okcjcgfo5dk.contains(uastring, 'safari') || $_g6xy1okcjcgfo5dk.contains(uastring, 'mobile/')) && $_g6xy1okcjcgfo5dk.contains(uastring, 'applewebkit');
      }
    }
  ];
  var oses = [
    {
      name: 'Windows',
      search: checkContains('win'),
      versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'iOS',
      search: function (uastring) {
        return $_g6xy1okcjcgfo5dk.contains(uastring, 'iphone') || $_g6xy1okcjcgfo5dk.contains(uastring, 'ipad');
      },
      versionRegexes: [
        /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
        /.*cpu os ([0-9]+)_([0-9]+).*/,
        /.*cpu iphone os ([0-9]+)_([0-9]+).*/
      ]
    },
    {
      name: 'Android',
      search: checkContains('android'),
      versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'OSX',
      search: checkContains('os x'),
      versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
    },
    {
      name: 'Linux',
      search: checkContains('linux'),
      versionRegexes: []
    },
    {
      name: 'Solaris',
      search: checkContains('sunos'),
      versionRegexes: []
    },
    {
      name: 'FreeBSD',
      search: checkContains('freebsd'),
      versionRegexes: []
    }
  ];
  var $_6vrry9kbjcgfo5d9 = {
    browsers: $_51ccyzjhjcgfo560.constant(browsers),
    oses: $_51ccyzjhjcgfo560.constant(oses)
  };

  var detect$1 = function (userAgent) {
    var browsers = $_6vrry9kbjcgfo5d9.browsers();
    var oses = $_6vrry9kbjcgfo5d9.oses();
    var browser = $_bsdjuqkajcgfo5d3.detectBrowser(browsers, userAgent).fold($_ho15xk6jcgfo5ce.unknown, $_ho15xk6jcgfo5ce.nu);
    var os = $_bsdjuqkajcgfo5d3.detectOs(oses, userAgent).fold($_d9uhuak8jcgfo5cs.unknown, $_d9uhuak8jcgfo5cs.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_cgkhqtk5jcgfo5cc = { detect: detect$1 };

  var detect = $_75hcuik4jcgfo5ca.cached(function () {
    var userAgent = navigator.userAgent;
    return $_cgkhqtk5jcgfo5cc.detect(userAgent);
  });
  var $_1x7x33k3jcgfo5c3 = { detect: detect };

  var eq = function (e1, e2) {
    return e1.dom() === e2.dom();
  };
  var isEqualNode = function (e1, e2) {
    return e1.dom().isEqualNode(e2.dom());
  };
  var member = function (element, elements) {
    return $_epd2qyjfjcgfo55m.exists(elements, $_51ccyzjhjcgfo560.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_83jx06jzjcgfo5br.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_1x7x33k3jcgfo5c3.detect().browser;
  var contains$1 = browser.isIE() ? ieContains : regularContains;
  var $_1miv10jyjcgfo5b7 = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$1,
    is: $_4p0ah3jtjcgfo59y.is
  };

  var owner = function (element) {
    return $_epp4kejujcgfo5a8.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_epp4kejujcgfo5a8.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_epp4kejujcgfo5a8.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return $_ch5dzyjgjcgfo55s.from(dom.parentNode).map($_epp4kejujcgfo5a8.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_epd2qyjfjcgfo55m.findIndex(kin, function (elem) {
        return $_1miv10jyjcgfo5b7.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_9ccf2jojcgfo57o.isFunction(isRoot) ? isRoot : $_51ccyzjhjcgfo560.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_epp4kejujcgfo5a8.fromDom(rawParent);
      ret.push(parent);
      if (stop(parent) === true)
        break;
      else
        dom = rawParent;
    }
    return ret;
  };
  var siblings = function (element) {
    var filterSelf = function (elements) {
      return $_epd2qyjfjcgfo55m.filter(elements, function (x) {
        return !$_1miv10jyjcgfo5b7.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return $_ch5dzyjgjcgfo55s.from(dom.offsetParent).map($_epp4kejujcgfo5a8.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return $_ch5dzyjgjcgfo55s.from(dom.previousSibling).map($_epp4kejujcgfo5a8.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return $_ch5dzyjgjcgfo55s.from(dom.nextSibling).map($_epp4kejujcgfo5a8.fromDom);
  };
  var prevSiblings = function (element) {
    return $_epd2qyjfjcgfo55m.reverse($_4nt6oajxjcgfo5b4.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_4nt6oajxjcgfo5b4.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_epd2qyjfjcgfo55m.map(dom.childNodes, $_epp4kejujcgfo5a8.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return $_ch5dzyjgjcgfo55s.from(children[index]).map($_epp4kejujcgfo5a8.fromDom);
  };
  var firstChild = function (element) {
    return child(element, 0);
  };
  var lastChild = function (element) {
    return child(element, element.dom().childNodes.length - 1);
  };
  var childNodesCount = function (element) {
    return element.dom().childNodes.length;
  };
  var hasChildNodes = function (element) {
    return element.dom().hasChildNodes();
  };
  var spot = $_6w2qyfjkjcgfo57c.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_4k5ag6jwjcgfo5aj = {
    owner: owner,
    defaultView: defaultView,
    documentElement: documentElement,
    parent: parent,
    findIndex: findIndex$1,
    parents: parents,
    siblings: siblings,
    prevSibling: prevSibling,
    offsetParent: offsetParent,
    prevSiblings: prevSiblings,
    nextSibling: nextSibling,
    nextSiblings: nextSiblings,
    children: children,
    child: child,
    firstChild: firstChild,
    lastChild: lastChild,
    childNodesCount: childNodesCount,
    hasChildNodes: hasChildNodes,
    leaf: leaf
  };

  var firstLayer = function (scope, selector) {
    return filterFirstLayer(scope, selector, $_51ccyzjhjcgfo560.constant(true));
  };
  var filterFirstLayer = function (scope, selector, predicate) {
    return $_epd2qyjfjcgfo55m.bind($_4k5ag6jwjcgfo5aj.children(scope), function (x) {
      return $_4p0ah3jtjcgfo59y.is(x, selector) ? predicate(x) ? [x] : [] : filterFirstLayer(x, selector, predicate);
    });
  };
  var $_g27y74jsjcgfo59h = {
    firstLayer: firstLayer,
    filterFirstLayer: filterFirstLayer
  };

  var name = function (element) {
    var r = element.dom().nodeName;
    return r.toLowerCase();
  };
  var type = function (element) {
    return element.dom().nodeType;
  };
  var value = function (element) {
    return element.dom().nodeValue;
  };
  var isType$1 = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
    return type(element) === $_9vjw76jvjcgfo5ah.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_9vjw76jvjcgfo5ah.ELEMENT);
  var isText = isType$1($_9vjw76jvjcgfo5ah.TEXT);
  var isDocument = isType$1($_9vjw76jvjcgfo5ah.DOCUMENT);
  var $_4zgqn9kgjcgfo5e6 = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var rawSet = function (dom, key, value) {
    if ($_9ccf2jojcgfo57o.isString(value) || $_9ccf2jojcgfo57o.isBoolean(value) || $_9ccf2jojcgfo57o.isNumber(value)) {
      dom.setAttribute(key, value + '');
    } else {
      console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
      throw new Error('Attribute value was not simple');
    }
  };
  var set = function (element, key, value) {
    rawSet(element.dom(), key, value);
  };
  var setAll = function (element, attrs) {
    var dom = element.dom();
    $_9lvqaqjjjcgfo578.each(attrs, function (v, k) {
      rawSet(dom, k, v);
    });
  };
  var get = function (element, key) {
    var v = element.dom().getAttribute(key);
    return v === null ? undefined : v;
  };
  var has = function (element, key) {
    var dom = element.dom();
    return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
  };
  var remove = function (element, key) {
    element.dom().removeAttribute(key);
  };
  var hasNone = function (element) {
    var attrs = element.dom().attributes;
    return attrs === undefined || attrs === null || attrs.length === 0;
  };
  var clone = function (element) {
    return $_epd2qyjfjcgfo55m.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has(source, attr) && !has(destination, attr))
      set(destination, attr, get(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_4zgqn9kgjcgfo5e6.isElement(source) || !$_4zgqn9kgjcgfo5e6.isElement(destination))
      return;
    $_epd2qyjfjcgfo55m.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_fo5ow8kfjcgfo5ds = {
    clone: clone,
    set: set,
    setAll: setAll,
    get: get,
    has: has,
    remove: remove,
    hasNone: hasNone,
    transfer: transfer
  };

  var inBody = function (element) {
    var dom = $_4zgqn9kgjcgfo5e6.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_75hcuik4jcgfo5ca.cached(function () {
    return getBody($_epp4kejujcgfo5a8.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_epp4kejujcgfo5a8.fromDom(body);
  };
  var $_45wfmkjjcgfo5ei = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var all$2 = function (predicate) {
    return descendants$1($_45wfmkjjcgfo5ei.body(), predicate);
  };
  var ancestors$1 = function (scope, predicate, isRoot) {
    return $_epd2qyjfjcgfo55m.filter($_4k5ag6jwjcgfo5aj.parents(scope, isRoot), predicate);
  };
  var siblings$2 = function (scope, predicate) {
    return $_epd2qyjfjcgfo55m.filter($_4k5ag6jwjcgfo5aj.siblings(scope), predicate);
  };
  var children$2 = function (scope, predicate) {
    return $_epd2qyjfjcgfo55m.filter($_4k5ag6jwjcgfo5aj.children(scope), predicate);
  };
  var descendants$1 = function (scope, predicate) {
    var result = [];
    $_epd2qyjfjcgfo55m.each($_4k5ag6jwjcgfo5aj.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants$1(x, predicate));
    });
    return result;
  };
  var $_7jzv25kijcgfo5ec = {
    all: all$2,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  var all$1 = function (selector) {
    return $_4p0ah3jtjcgfo59y.all(selector);
  };
  var ancestors = function (scope, selector, isRoot) {
    return $_7jzv25kijcgfo5ec.ancestors(scope, function (e) {
      return $_4p0ah3jtjcgfo59y.is(e, selector);
    }, isRoot);
  };
  var siblings$1 = function (scope, selector) {
    return $_7jzv25kijcgfo5ec.siblings(scope, function (e) {
      return $_4p0ah3jtjcgfo59y.is(e, selector);
    });
  };
  var children$1 = function (scope, selector) {
    return $_7jzv25kijcgfo5ec.children(scope, function (e) {
      return $_4p0ah3jtjcgfo59y.is(e, selector);
    });
  };
  var descendants = function (scope, selector) {
    return $_4p0ah3jtjcgfo59y.all(selector, scope);
  };
  var $_cc9vyekhjcgfo5e9 = {
    all: all$1,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var ClosestOrAncestor = function (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? $_ch5dzyjgjcgfo55s.some(scope) : $_9ccf2jojcgfo57o.isFunction(isRoot) && isRoot(scope) ? $_ch5dzyjgjcgfo55s.none() : ancestor(scope, a, isRoot);
  };

  var first$2 = function (predicate) {
    return descendant$1($_45wfmkjjcgfo5ei.body(), predicate);
  };
  var ancestor$1 = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_9ccf2jojcgfo57o.isFunction(isRoot) ? isRoot : $_51ccyzjhjcgfo560.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_epp4kejujcgfo5a8.fromDom(element);
      if (predicate(el))
        return $_ch5dzyjgjcgfo55s.some(el);
      else if (stop(el))
        break;
    }
    return $_ch5dzyjgjcgfo55s.none();
  };
  var closest$1 = function (scope, predicate, isRoot) {
    var is = function (scope) {
      return predicate(scope);
    };
    return ClosestOrAncestor(is, ancestor$1, scope, predicate, isRoot);
  };
  var sibling$1 = function (scope, predicate) {
    var element = scope.dom();
    if (!element.parentNode)
      return $_ch5dzyjgjcgfo55s.none();
    return child$2($_epp4kejujcgfo5a8.fromDom(element.parentNode), function (x) {
      return !$_1miv10jyjcgfo5b7.eq(scope, x) && predicate(x);
    });
  };
  var child$2 = function (scope, predicate) {
    var result = $_epd2qyjfjcgfo55m.find(scope.dom().childNodes, $_51ccyzjhjcgfo560.compose(predicate, $_epp4kejujcgfo5a8.fromDom));
    return result.map($_epp4kejujcgfo5a8.fromDom);
  };
  var descendant$1 = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_epp4kejujcgfo5a8.fromDom(element.childNodes[i])))
          return $_ch5dzyjgjcgfo55s.some($_epp4kejujcgfo5a8.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return $_ch5dzyjgjcgfo55s.none();
    };
    return descend(scope.dom());
  };
  var $_398i33kljcgfo5er = {
    first: first$2,
    ancestor: ancestor$1,
    closest: closest$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1
  };

  var first$1 = function (selector) {
    return $_4p0ah3jtjcgfo59y.one(selector);
  };
  var ancestor = function (scope, selector, isRoot) {
    return $_398i33kljcgfo5er.ancestor(scope, function (e) {
      return $_4p0ah3jtjcgfo59y.is(e, selector);
    }, isRoot);
  };
  var sibling = function (scope, selector) {
    return $_398i33kljcgfo5er.sibling(scope, function (e) {
      return $_4p0ah3jtjcgfo59y.is(e, selector);
    });
  };
  var child$1 = function (scope, selector) {
    return $_398i33kljcgfo5er.child(scope, function (e) {
      return $_4p0ah3jtjcgfo59y.is(e, selector);
    });
  };
  var descendant = function (scope, selector) {
    return $_4p0ah3jtjcgfo59y.one(selector, scope);
  };
  var closest = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_4p0ah3jtjcgfo59y.is, ancestor, scope, selector, isRoot);
  };
  var $_b13w5vkkjcgfo5eo = {
    first: first$1,
    ancestor: ancestor,
    sibling: sibling,
    child: child$1,
    descendant: descendant,
    closest: closest
  };

  var lookup = function (tags, element, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : $_51ccyzjhjcgfo560.constant(false);
    if (isRoot(element))
      return $_ch5dzyjgjcgfo55s.none();
    if ($_epd2qyjfjcgfo55m.contains(tags, $_4zgqn9kgjcgfo5e6.name(element)))
      return $_ch5dzyjgjcgfo55s.some(element);
    var isRootOrUpperTable = function (element) {
      return $_4p0ah3jtjcgfo59y.is(element, 'table') || isRoot(element);
    };
    return $_b13w5vkkjcgfo5eo.ancestor(element, tags.join(','), isRootOrUpperTable);
  };
  var cell = function (element, isRoot) {
    return lookup([
      'td',
      'th'
    ], element, isRoot);
  };
  var cells = function (ancestor) {
    return $_g27y74jsjcgfo59h.firstLayer(ancestor, 'th,td');
  };
  var notCell = function (element, isRoot) {
    return lookup([
      'caption',
      'tr',
      'tbody',
      'tfoot',
      'thead'
    ], element, isRoot);
  };
  var neighbours = function (selector, element) {
    return $_4k5ag6jwjcgfo5aj.parent(element).map(function (parent) {
      return $_cc9vyekhjcgfo5e9.children(parent, selector);
    });
  };
  var neighbourCells = $_51ccyzjhjcgfo560.curry(neighbours, 'th,td');
  var neighbourRows = $_51ccyzjhjcgfo560.curry(neighbours, 'tr');
  var firstCell = function (ancestor) {
    return $_b13w5vkkjcgfo5eo.descendant(ancestor, 'th,td');
  };
  var table = function (element, isRoot) {
    return $_b13w5vkkjcgfo5eo.closest(element, 'table', isRoot);
  };
  var row = function (element, isRoot) {
    return lookup(['tr'], element, isRoot);
  };
  var rows = function (ancestor) {
    return $_g27y74jsjcgfo59h.firstLayer(ancestor, 'tr');
  };
  var attr = function (element, property) {
    return parseInt($_fo5ow8kfjcgfo5ds.get(element, property), 10);
  };
  var grid$1 = function (element, rowProp, colProp) {
    var rows = attr(element, rowProp);
    var cols = attr(element, colProp);
    return $_78xe8wjqjcgfo589.grid(rows, cols);
  };
  var $_7pxq74jrjcgfo58f = {
    cell: cell,
    firstCell: firstCell,
    cells: cells,
    neighbourCells: neighbourCells,
    table: table,
    row: row,
    rows: rows,
    notCell: notCell,
    neighbourRows: neighbourRows,
    attr: attr,
    grid: grid$1
  };

  var fromTable = function (table) {
    var rows = $_7pxq74jrjcgfo58f.rows(table);
    return $_epd2qyjfjcgfo55m.map(rows, function (row) {
      var element = row;
      var parent = $_4k5ag6jwjcgfo5aj.parent(element);
      var parentSection = parent.bind(function (parent) {
        var parentName = $_4zgqn9kgjcgfo5e6.name(parent);
        return parentName === 'tfoot' || parentName === 'thead' || parentName === 'tbody' ? parentName : 'tbody';
      });
      var cells = $_epd2qyjfjcgfo55m.map($_7pxq74jrjcgfo58f.cells(row), function (cell) {
        var rowspan = $_fo5ow8kfjcgfo5ds.has(cell, 'rowspan') ? parseInt($_fo5ow8kfjcgfo5ds.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_fo5ow8kfjcgfo5ds.has(cell, 'colspan') ? parseInt($_fo5ow8kfjcgfo5ds.get(cell, 'colspan'), 10) : 1;
        return $_78xe8wjqjcgfo589.detail(cell, rowspan, colspan);
      });
      return $_78xe8wjqjcgfo589.rowdata(element, cells, parentSection);
    });
  };
  var fromPastedRows = function (rows, example) {
    return $_epd2qyjfjcgfo55m.map(rows, function (row) {
      var cells = $_epd2qyjfjcgfo55m.map($_7pxq74jrjcgfo58f.cells(row), function (cell) {
        var rowspan = $_fo5ow8kfjcgfo5ds.has(cell, 'rowspan') ? parseInt($_fo5ow8kfjcgfo5ds.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_fo5ow8kfjcgfo5ds.has(cell, 'colspan') ? parseInt($_fo5ow8kfjcgfo5ds.get(cell, 'colspan'), 10) : 1;
        return $_78xe8wjqjcgfo589.detail(cell, rowspan, colspan);
      });
      return $_78xe8wjqjcgfo589.rowdata(row, cells, example.section());
    });
  };
  var $_fk3v3bjpjcgfo57r = {
    fromTable: fromTable,
    fromPastedRows: fromPastedRows
  };

  var key = function (row, column) {
    return row + ',' + column;
  };
  var getAt = function (warehouse, row, column) {
    var raw = warehouse.access()[key(row, column)];
    return raw !== undefined ? $_ch5dzyjgjcgfo55s.some(raw) : $_ch5dzyjgjcgfo55s.none();
  };
  var findItem = function (warehouse, item, comparator) {
    var filtered = filterItems(warehouse, function (detail) {
      return comparator(item, detail.element());
    });
    return filtered.length > 0 ? $_ch5dzyjgjcgfo55s.some(filtered[0]) : $_ch5dzyjgjcgfo55s.none();
  };
  var filterItems = function (warehouse, predicate) {
    var all = $_epd2qyjfjcgfo55m.bind(warehouse.all(), function (r) {
      return r.cells();
    });
    return $_epd2qyjfjcgfo55m.filter(all, predicate);
  };
  var generate = function (list) {
    var access = {};
    var cells = [];
    var maxRows = list.length;
    var maxColumns = 0;
    $_epd2qyjfjcgfo55m.each(list, function (details, r) {
      var currentRow = [];
      $_epd2qyjfjcgfo55m.each(details.cells(), function (detail, c) {
        var start = 0;
        while (access[key(r, start)] !== undefined) {
          start++;
        }
        var current = $_78xe8wjqjcgfo589.extended(detail.element(), detail.rowspan(), detail.colspan(), r, start);
        for (var i = 0; i < detail.colspan(); i++) {
          for (var j = 0; j < detail.rowspan(); j++) {
            var cr = r + j;
            var cc = start + i;
            var newpos = key(cr, cc);
            access[newpos] = current;
            maxColumns = Math.max(maxColumns, cc + 1);
          }
        }
        currentRow.push(current);
      });
      cells.push($_78xe8wjqjcgfo589.rowdata(details.element(), currentRow, details.section()));
    });
    var grid = $_78xe8wjqjcgfo589.grid(maxRows, maxColumns);
    return {
      grid: $_51ccyzjhjcgfo560.constant(grid),
      access: $_51ccyzjhjcgfo560.constant(access),
      all: $_51ccyzjhjcgfo560.constant(cells)
    };
  };
  var justCells = function (warehouse) {
    var rows = $_epd2qyjfjcgfo55m.map(warehouse.all(), function (w) {
      return w.cells();
    });
    return $_epd2qyjfjcgfo55m.flatten(rows);
  };
  var $_akt2xrknjcgfo5fk = {
    generate: generate,
    getAt: getAt,
    findItem: findItem,
    filterItems: filterItems,
    justCells: justCells
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_9vrqa1kpjcgfo5gi = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_9ccf2jojcgfo57o.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_9vrqa1kpjcgfo5gi.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_9vrqa1kpjcgfo5gi.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$1 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_9lvqaqjjjcgfo578.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_9lvqaqjjjcgfo578.each(css, function (v, k) {
      v.fold(function () {
        internalRemove(dom, k);
      }, function (value) {
        internalSet(dom, k, value);
      });
    });
  };
  var get$1 = function (element, property) {
    var dom = element.dom();
    var styles = window.getComputedStyle(dom);
    var r = styles.getPropertyValue(property);
    var v = r === '' && !$_45wfmkjjcgfo5ei.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_9vrqa1kpjcgfo5gi.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
  };
  var getRaw = function (element, property) {
    var dom = element.dom();
    var raw = getUnsafeProperty(dom, property);
    return $_ch5dzyjgjcgfo55s.from(raw).filter(function (r) {
      return r.length > 0;
    });
  };
  var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom();
    if ($_9vrqa1kpjcgfo5gi.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_epp4kejujcgfo5a8.fromTag(tag);
    set$1(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$1 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_fo5ow8kfjcgfo5ds.has(element, 'style') && $_g6xy1okcjcgfo5dk.trim($_fo5ow8kfjcgfo5ds.get(element, 'style')) === '') {
      $_fo5ow8kfjcgfo5ds.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_fo5ow8kfjcgfo5ds.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_fo5ow8kfjcgfo5ds.remove : $_fo5ow8kfjcgfo5ds.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_9vrqa1kpjcgfo5gi.isSupported(sourceDom) && $_9vrqa1kpjcgfo5gi.isSupported(targetDom)) {
      targetDom.style.cssText = sourceDom.style.cssText;
    }
  };
  var reflow = function (e) {
    return e.dom().offsetWidth;
  };
  var transferOne$1 = function (source, destination, style) {
    getRaw(source, style).each(function (value) {
      if (getRaw(destination, style).isNone())
        set$1(destination, style, value);
    });
  };
  var transfer$1 = function (source, destination, styles) {
    if (!$_4zgqn9kgjcgfo5e6.isElement(source) || !$_4zgqn9kgjcgfo5e6.isElement(destination))
      return;
    $_epd2qyjfjcgfo55m.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_6vnepekojcgfo5fy = {
    copy: copy,
    set: set$1,
    preserve: preserve,
    setAll: setAll$1,
    setOptions: setOptions,
    remove: remove$1,
    get: get$1,
    getRaw: getRaw,
    getAllRaw: getAllRaw,
    isValidValue: isValidValue,
    reflow: reflow,
    transfer: transfer$1
  };

  var before = function (marker, element) {
    var parent = $_4k5ag6jwjcgfo5aj.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_4k5ag6jwjcgfo5aj.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_4k5ag6jwjcgfo5aj.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_4k5ag6jwjcgfo5aj.firstChild(parent);
    firstChild.fold(function () {
      append(parent, element);
    }, function (v) {
      parent.dom().insertBefore(element.dom(), v.dom());
    });
  };
  var append = function (parent, element) {
    parent.dom().appendChild(element.dom());
  };
  var appendAt = function (parent, element, index) {
    $_4k5ag6jwjcgfo5aj.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_9fuysnkqjcgfo5gl = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap
  };

  var before$1 = function (marker, elements) {
    $_epd2qyjfjcgfo55m.each(elements, function (x) {
      $_9fuysnkqjcgfo5gl.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_epd2qyjfjcgfo55m.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_9fuysnkqjcgfo5gl.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_epd2qyjfjcgfo55m.each(elements.slice().reverse(), function (x) {
      $_9fuysnkqjcgfo5gl.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_epd2qyjfjcgfo55m.each(elements, function (x) {
      $_9fuysnkqjcgfo5gl.append(parent, x);
    });
  };
  var $_f1hd40ksjcgfo5gv = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_epd2qyjfjcgfo55m.each($_4k5ag6jwjcgfo5aj.children(element), function (rogue) {
      remove$2(rogue);
    });
  };
  var remove$2 = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_4k5ag6jwjcgfo5aj.children(wrapper);
    if (children.length > 0)
      $_f1hd40ksjcgfo5gv.before(wrapper, children);
    remove$2(wrapper);
  };
  var $_9z98yykrjcgfo5go = {
    empty: empty,
    remove: remove$2,
    unwrap: unwrap
  };

  var stats = $_6w2qyfjkjcgfo57c.immutable('minRow', 'minCol', 'maxRow', 'maxCol');
  var findSelectedStats = function (house, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    var minRow = totalRows;
    var minCol = totalColumns;
    var maxRow = 0;
    var maxCol = 0;
    $_9lvqaqjjjcgfo578.each(house.access(), function (detail) {
      if (isSelected(detail)) {
        var startRow = detail.row();
        var endRow = startRow + detail.rowspan() - 1;
        var startCol = detail.column();
        var endCol = startCol + detail.colspan() - 1;
        if (startRow < minRow)
          minRow = startRow;
        else if (endRow > maxRow)
          maxRow = endRow;
        if (startCol < minCol)
          minCol = startCol;
        else if (endCol > maxCol)
          maxCol = endCol;
      }
    });
    return stats(minRow, minCol, maxRow, maxCol);
  };
  var makeCell = function (list, seenSelected, rowIndex) {
    var row = list[rowIndex].element();
    var td = $_epp4kejujcgfo5a8.fromTag('td');
    $_9fuysnkqjcgfo5gl.append(td, $_epp4kejujcgfo5a8.fromTag('br'));
    var f = seenSelected ? $_9fuysnkqjcgfo5gl.append : $_9fuysnkqjcgfo5gl.prepend;
    f(row, td);
  };
  var fillInGaps = function (list, house, stats, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    for (var i = 0; i < totalRows; i++) {
      var seenSelected = false;
      for (var j = 0; j < totalColumns; j++) {
        if (!(i < stats.minRow() || i > stats.maxRow() || j < stats.minCol() || j > stats.maxCol())) {
          var needCell = $_akt2xrknjcgfo5fk.getAt(house, i, j).filter(isSelected).isNone();
          if (needCell)
            makeCell(list, seenSelected, i);
          else
            seenSelected = true;
        }
      }
    }
  };
  var clean = function (table, stats) {
    var emptyRows = $_epd2qyjfjcgfo55m.filter($_g27y74jsjcgfo59h.firstLayer(table, 'tr'), function (row) {
      return row.dom().childElementCount === 0;
    });
    $_epd2qyjfjcgfo55m.each(emptyRows, $_9z98yykrjcgfo5go.remove);
    if (stats.minCol() === stats.maxCol() || stats.minRow() === stats.maxRow()) {
      $_epd2qyjfjcgfo55m.each($_g27y74jsjcgfo59h.firstLayer(table, 'th,td'), function (cell) {
        $_fo5ow8kfjcgfo5ds.remove(cell, 'rowspan');
        $_fo5ow8kfjcgfo5ds.remove(cell, 'colspan');
      });
    }
    $_fo5ow8kfjcgfo5ds.remove(table, 'width');
    $_fo5ow8kfjcgfo5ds.remove(table, 'height');
    $_6vnepekojcgfo5fy.remove(table, 'width');
    $_6vnepekojcgfo5fy.remove(table, 'height');
  };
  var extract = function (table, selectedSelector) {
    var isSelected = function (detail) {
      return $_4p0ah3jtjcgfo59y.is(detail.element(), selectedSelector);
    };
    var list = $_fk3v3bjpjcgfo57r.fromTable(table);
    var house = $_akt2xrknjcgfo5fk.generate(list);
    var stats = findSelectedStats(house, isSelected);
    var selector = 'th:not(' + selectedSelector + ')' + ',td:not(' + selectedSelector + ')';
    var unselectedCells = $_g27y74jsjcgfo59h.filterFirstLayer(table, 'th,td', function (cell) {
      return $_4p0ah3jtjcgfo59y.is(cell, selector);
    });
    $_epd2qyjfjcgfo55m.each(unselectedCells, $_9z98yykrjcgfo5go.remove);
    fillInGaps(list, house, stats, isSelected);
    clean(table, stats);
    return table;
  };
  var $_3siofpjijcgfo565 = { extract: extract };

  var clone$1 = function (original, deep) {
    return $_epp4kejujcgfo5a8.fromDom(original.dom().cloneNode(deep));
  };
  var shallow = function (original) {
    return clone$1(original, false);
  };
  var deep = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_epp4kejujcgfo5a8.fromTag(tag);
    var attributes = $_fo5ow8kfjcgfo5ds.clone(original);
    $_fo5ow8kfjcgfo5ds.setAll(nu, attributes);
    return nu;
  };
  var copy$1 = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_4k5ag6jwjcgfo5aj.children(deep(original));
    $_f1hd40ksjcgfo5gv.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_9fuysnkqjcgfo5gl.before(original, nu);
    var children = $_4k5ag6jwjcgfo5aj.children(original);
    $_f1hd40ksjcgfo5gv.append(nu, children);
    $_9z98yykrjcgfo5go.remove(original);
    return nu;
  };
  var $_bj8wkfkujcgfo5ia = {
    shallow: shallow,
    shallowAs: shallowAs,
    deep: deep,
    copy: copy$1,
    mutate: mutate
  };

  var NodeValue = function (is, name) {
    var get = function (element) {
      if (!is(element))
        throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
      return getOption(element).getOr('');
    };
    var getOptionIE10 = function (element) {
      try {
        return getOptionSafe(element);
      } catch (e) {
        return $_ch5dzyjgjcgfo55s.none();
      }
    };
    var getOptionSafe = function (element) {
      return is(element) ? $_ch5dzyjgjcgfo55s.from(element.dom().nodeValue) : $_ch5dzyjgjcgfo55s.none();
    };
    var browser = $_1x7x33k3jcgfo5c3.detect().browser;
    var getOption = browser.isIE() && browser.version.major === 10 ? getOptionIE10 : getOptionSafe;
    var set = function (element, value) {
      if (!is(element))
        throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
      element.dom().nodeValue = value;
    };
    return {
      get: get,
      getOption: getOption,
      set: set
    };
  };

  var api = NodeValue($_4zgqn9kgjcgfo5e6.isText, 'text');
  var get$2 = function (element) {
    return api.get(element);
  };
  var getOption = function (element) {
    return api.getOption(element);
  };
  var set$2 = function (element, value) {
    api.set(element, value);
  };
  var $_cjrygqkxjcgfo5it = {
    get: get$2,
    getOption: getOption,
    set: set$2
  };

  var getEnd = function (element) {
    return $_4zgqn9kgjcgfo5e6.name(element) === 'img' ? 1 : $_cjrygqkxjcgfo5it.getOption(element).fold(function () {
      return $_4k5ag6jwjcgfo5aj.children(element).length;
    }, function (v) {
      return v.length;
    });
  };
  var isEnd = function (element, offset) {
    return getEnd(element) === offset;
  };
  var isStart = function (element, offset) {
    return offset === 0;
  };
  var NBSP = '\xA0';
  var isTextNodeWithCursorPosition = function (el) {
    return $_cjrygqkxjcgfo5it.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_epd2qyjfjcgfo55m.contains(elementsWithCursorPosition, $_4zgqn9kgjcgfo5e6.name(elem));
  };
  var $_cadeickwjcgfo5in = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var first$3 = function (element) {
    return $_398i33kljcgfo5er.descendant(element, $_cadeickwjcgfo5in.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_cadeickwjcgfo5in.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_4k5ag6jwjcgfo5aj.children(element);
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (predicate(child))
          return $_ch5dzyjgjcgfo55s.some(child);
        var res = descend(child);
        if (res.isSome())
          return res;
      }
      return $_ch5dzyjgjcgfo55s.none();
    };
    return descend(scope);
  };
  var $_bwsvmpkvjcgfo5ih = {
    first: first$3,
    last: last$2
  };

  var cell$1 = function () {
    var td = $_epp4kejujcgfo5a8.fromTag('td');
    $_9fuysnkqjcgfo5gl.append(td, $_epp4kejujcgfo5a8.fromTag('br'));
    return td;
  };
  var replace = function (cell, tag, attrs) {
    var replica = $_bj8wkfkujcgfo5ia.copy(cell, tag);
    $_9lvqaqjjjcgfo578.each(attrs, function (v, k) {
      if (v === null)
        $_fo5ow8kfjcgfo5ds.remove(replica, k);
      else
        $_fo5ow8kfjcgfo5ds.set(replica, k, v);
    });
    return replica;
  };
  var pasteReplace = function (cellContent) {
    return cellContent;
  };
  var newRow = function (doc) {
    return function () {
      return $_epp4kejujcgfo5a8.fromTag('tr', doc.dom());
    };
  };
  var cloneFormats = function (oldCell, newCell, formats) {
    var first = $_bwsvmpkvjcgfo5ih.first(oldCell);
    return first.map(function (firstText) {
      var formatSelector = formats.join(',');
      var parents = $_cc9vyekhjcgfo5e9.ancestors(firstText, formatSelector, function (element) {
        return $_1miv10jyjcgfo5b7.eq(element, oldCell);
      });
      return $_epd2qyjfjcgfo55m.foldr(parents, function (last, parent) {
        var clonedFormat = $_bj8wkfkujcgfo5ia.shallow(parent);
        $_9fuysnkqjcgfo5gl.append(last, clonedFormat);
        return clonedFormat;
      }, newCell);
    }).getOr(newCell);
  };
  var cellOperations = function (mutate, doc, formatsToClone) {
    var newCell = function (prev) {
      var doc = $_4k5ag6jwjcgfo5aj.owner(prev.element());
      var td = $_epp4kejujcgfo5a8.fromTag($_4zgqn9kgjcgfo5e6.name(prev.element()), doc.dom());
      var formats = formatsToClone.getOr([
        'strong',
        'em',
        'b',
        'i',
        'span',
        'font',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'div'
      ]);
      var lastNode = formats.length > 0 ? cloneFormats(prev.element(), td, formats) : td;
      $_9fuysnkqjcgfo5gl.append(lastNode, $_epp4kejujcgfo5a8.fromTag('br'));
      $_6vnepekojcgfo5fy.copy(prev.element(), td);
      $_6vnepekojcgfo5fy.remove(td, 'height');
      if (prev.colspan() !== 1)
        $_6vnepekojcgfo5fy.remove(prev.element(), 'width');
      mutate(prev.element(), td);
      return td;
    };
    return {
      row: newRow(doc),
      cell: newCell,
      replace: replace,
      gap: cell$1
    };
  };
  var paste = function (doc) {
    return {
      row: newRow(doc),
      cell: cell$1,
      replace: pasteReplace,
      gap: cell$1
    };
  };
  var $_5ayu0hktjcgfo5h3 = {
    cellOperations: cellOperations,
    paste: paste
  };

  var fromHtml$1 = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    return $_4k5ag6jwjcgfo5aj.children($_epp4kejujcgfo5a8.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_epd2qyjfjcgfo55m.map(tags, function (x) {
      return $_epp4kejujcgfo5a8.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_epd2qyjfjcgfo55m.map(texts, function (x) {
      return $_epp4kejujcgfo5a8.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_epd2qyjfjcgfo55m.map(nodes, $_epp4kejujcgfo5a8.fromDom);
  };
  var $_eice81kzjcgfo5j5 = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
  };

  var TagBoundaries = [
    'body',
    'p',
    'div',
    'article',
    'aside',
    'figcaption',
    'figure',
    'footer',
    'header',
    'nav',
    'section',
    'ol',
    'ul',
    'li',
    'table',
    'thead',
    'tbody',
    'tfoot',
    'caption',
    'tr',
    'td',
    'th',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'pre',
    'address'
  ];

  var DomUniverse = function () {
    var clone = function (element) {
      return $_epp4kejujcgfo5a8.fromDom(element.dom().cloneNode(false));
    };
    var isBoundary = function (element) {
      if (!$_4zgqn9kgjcgfo5e6.isElement(element))
        return false;
      if ($_4zgqn9kgjcgfo5e6.name(element) === 'body')
        return true;
      return $_epd2qyjfjcgfo55m.contains(TagBoundaries, $_4zgqn9kgjcgfo5e6.name(element));
    };
    var isEmptyTag = function (element) {
      if (!$_4zgqn9kgjcgfo5e6.isElement(element))
        return false;
      return $_epd2qyjfjcgfo55m.contains([
        'br',
        'img',
        'hr',
        'input'
      ], $_4zgqn9kgjcgfo5e6.name(element));
    };
    var comparePosition = function (element, other) {
      return element.dom().compareDocumentPosition(other.dom());
    };
    var copyAttributesTo = function (source, destination) {
      var as = $_fo5ow8kfjcgfo5ds.clone(source);
      $_fo5ow8kfjcgfo5ds.setAll(destination, as);
    };
    return {
      up: $_51ccyzjhjcgfo560.constant({
        selector: $_b13w5vkkjcgfo5eo.ancestor,
        closest: $_b13w5vkkjcgfo5eo.closest,
        predicate: $_398i33kljcgfo5er.ancestor,
        all: $_4k5ag6jwjcgfo5aj.parents
      }),
      down: $_51ccyzjhjcgfo560.constant({
        selector: $_cc9vyekhjcgfo5e9.descendants,
        predicate: $_7jzv25kijcgfo5ec.descendants
      }),
      styles: $_51ccyzjhjcgfo560.constant({
        get: $_6vnepekojcgfo5fy.get,
        getRaw: $_6vnepekojcgfo5fy.getRaw,
        set: $_6vnepekojcgfo5fy.set,
        remove: $_6vnepekojcgfo5fy.remove
      }),
      attrs: $_51ccyzjhjcgfo560.constant({
        get: $_fo5ow8kfjcgfo5ds.get,
        set: $_fo5ow8kfjcgfo5ds.set,
        remove: $_fo5ow8kfjcgfo5ds.remove,
        copyTo: copyAttributesTo
      }),
      insert: $_51ccyzjhjcgfo560.constant({
        before: $_9fuysnkqjcgfo5gl.before,
        after: $_9fuysnkqjcgfo5gl.after,
        afterAll: $_f1hd40ksjcgfo5gv.after,
        append: $_9fuysnkqjcgfo5gl.append,
        appendAll: $_f1hd40ksjcgfo5gv.append,
        prepend: $_9fuysnkqjcgfo5gl.prepend,
        wrap: $_9fuysnkqjcgfo5gl.wrap
      }),
      remove: $_51ccyzjhjcgfo560.constant({
        unwrap: $_9z98yykrjcgfo5go.unwrap,
        remove: $_9z98yykrjcgfo5go.remove
      }),
      create: $_51ccyzjhjcgfo560.constant({
        nu: $_epp4kejujcgfo5a8.fromTag,
        clone: clone,
        text: $_epp4kejujcgfo5a8.fromText
      }),
      query: $_51ccyzjhjcgfo560.constant({
        comparePosition: comparePosition,
        prevSibling: $_4k5ag6jwjcgfo5aj.prevSibling,
        nextSibling: $_4k5ag6jwjcgfo5aj.nextSibling
      }),
      property: $_51ccyzjhjcgfo560.constant({
        children: $_4k5ag6jwjcgfo5aj.children,
        name: $_4zgqn9kgjcgfo5e6.name,
        parent: $_4k5ag6jwjcgfo5aj.parent,
        isText: $_4zgqn9kgjcgfo5e6.isText,
        isComment: $_4zgqn9kgjcgfo5e6.isComment,
        isElement: $_4zgqn9kgjcgfo5e6.isElement,
        getText: $_cjrygqkxjcgfo5it.get,
        setText: $_cjrygqkxjcgfo5it.set,
        isBoundary: isBoundary,
        isEmptyTag: isEmptyTag
      }),
      eq: $_1miv10jyjcgfo5b7.eq,
      is: $_1miv10jyjcgfo5b7.is
    };
  };

  var leftRight = $_6w2qyfjkjcgfo57c.immutable('left', 'right');
  var bisect = function (universe, parent, child) {
    var children = universe.property().children(parent);
    var index = $_epd2qyjfjcgfo55m.findIndex(children, $_51ccyzjhjcgfo560.curry(universe.eq, child));
    return index.map(function (ind) {
      return {
        before: $_51ccyzjhjcgfo560.constant(children.slice(0, ind)),
        after: $_51ccyzjhjcgfo560.constant(children.slice(ind + 1))
      };
    });
  };
  var breakToRight$2 = function (universe, parent, child) {
    return bisect(universe, parent, child).map(function (parts) {
      var second = universe.create().clone(parent);
      universe.insert().appendAll(second, parts.after());
      universe.insert().after(parent, second);
      return leftRight(parent, second);
    });
  };
  var breakToLeft$2 = function (universe, parent, child) {
    return bisect(universe, parent, child).map(function (parts) {
      var prior = universe.create().clone(parent);
      universe.insert().appendAll(prior, parts.before().concat([child]));
      universe.insert().appendAll(parent, parts.after());
      universe.insert().before(parent, prior);
      return leftRight(prior, parent);
    });
  };
  var breakPath$2 = function (universe, item, isTop, breaker) {
    var result = $_6w2qyfjkjcgfo57c.immutable('first', 'second', 'splits');
    var next = function (child, group, splits) {
      var fallback = result(child, $_ch5dzyjgjcgfo55s.none(), splits);
      if (isTop(child))
        return result(child, group, splits);
      else {
        return universe.property().parent(child).bind(function (parent) {
          return breaker(universe, parent, child).map(function (breakage) {
            var extra = [{
                first: breakage.left,
                second: breakage.right
              }];
            var nextChild = isTop(parent) ? parent : breakage.left();
            return next(nextChild, $_ch5dzyjgjcgfo55s.some(breakage.right()), splits.concat(extra));
          }).getOr(fallback);
        });
      }
    };
    return next(item, $_ch5dzyjgjcgfo55s.none(), []);
  };
  var $_345397l8jcgfo5nq = {
    breakToLeft: breakToLeft$2,
    breakToRight: breakToRight$2,
    breakPath: breakPath$2
  };

  var all$3 = function (universe, look, elements, f) {
    var head = elements[0];
    var tail = elements.slice(1);
    return f(universe, look, head, tail);
  };
  var oneAll = function (universe, look, elements) {
    return elements.length > 0 ? all$3(universe, look, elements, unsafeOne) : $_ch5dzyjgjcgfo55s.none();
  };
  var unsafeOne = function (universe, look, head, tail) {
    var start = look(universe, head);
    return $_epd2qyjfjcgfo55m.foldr(tail, function (b, a) {
      var current = look(universe, a);
      return commonElement(universe, b, current);
    }, start);
  };
  var commonElement = function (universe, start, end) {
    return start.bind(function (s) {
      return end.filter($_51ccyzjhjcgfo560.curry(universe.eq, s));
    });
  };
  var $_9tbx6el9jcgfo5o5 = { oneAll: oneAll };

  var eq$1 = function (universe, item) {
    return $_51ccyzjhjcgfo560.curry(universe.eq, item);
  };
  var unsafeSubset = function (universe, common, ps1, ps2) {
    var children = universe.property().children(common);
    if (universe.eq(common, ps1[0]))
      return $_ch5dzyjgjcgfo55s.some([ps1[0]]);
    if (universe.eq(common, ps2[0]))
      return $_ch5dzyjgjcgfo55s.some([ps2[0]]);
    var finder = function (ps) {
      var topDown = $_epd2qyjfjcgfo55m.reverse(ps);
      var index = $_epd2qyjfjcgfo55m.findIndex(topDown, eq$1(universe, common)).getOr(-1);
      var item = index < topDown.length - 1 ? topDown[index + 1] : topDown[index];
      return $_epd2qyjfjcgfo55m.findIndex(children, eq$1(universe, item));
    };
    var startIndex = finder(ps1);
    var endIndex = finder(ps2);
    return startIndex.bind(function (sIndex) {
      return endIndex.map(function (eIndex) {
        var first = Math.min(sIndex, eIndex);
        var last = Math.max(sIndex, eIndex);
        return children.slice(first, last + 1);
      });
    });
  };
  var ancestors$4 = function (universe, start, end, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : $_51ccyzjhjcgfo560.constant(false);
    var ps1 = [start].concat(universe.up().all(start));
    var ps2 = [end].concat(universe.up().all(end));
    var prune = function (path) {
      var index = $_epd2qyjfjcgfo55m.findIndex(path, isRoot);
      return index.fold(function () {
        return path;
      }, function (ind) {
        return path.slice(0, ind + 1);
      });
    };
    var pruned1 = prune(ps1);
    var pruned2 = prune(ps2);
    var shared = $_epd2qyjfjcgfo55m.find(pruned1, function (x) {
      return $_epd2qyjfjcgfo55m.exists(pruned2, eq$1(universe, x));
    });
    return {
      firstpath: $_51ccyzjhjcgfo560.constant(pruned1),
      secondpath: $_51ccyzjhjcgfo560.constant(pruned2),
      shared: $_51ccyzjhjcgfo560.constant(shared)
    };
  };
  var subset$2 = function (universe, start, end) {
    var ancs = ancestors$4(universe, start, end);
    return ancs.shared().bind(function (shared) {
      return unsafeSubset(universe, shared, ancs.firstpath(), ancs.secondpath());
    });
  };
  var $_a5i7i0lajcgfo5oi = {
    subset: subset$2,
    ancestors: ancestors$4
  };

  var sharedOne$1 = function (universe, look, elements) {
    return $_9tbx6el9jcgfo5o5.oneAll(universe, look, elements);
  };
  var subset$1 = function (universe, start, finish) {
    return $_a5i7i0lajcgfo5oi.subset(universe, start, finish);
  };
  var ancestors$3 = function (universe, start, finish, _isRoot) {
    return $_a5i7i0lajcgfo5oi.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$1 = function (universe, parent, child) {
    return $_345397l8jcgfo5nq.breakToLeft(universe, parent, child);
  };
  var breakToRight$1 = function (universe, parent, child) {
    return $_345397l8jcgfo5nq.breakToRight(universe, parent, child);
  };
  var breakPath$1 = function (universe, child, isTop, breaker) {
    return $_345397l8jcgfo5nq.breakPath(universe, child, isTop, breaker);
  };
  var $_6rbbpdl7jcgfo5no = {
    sharedOne: sharedOne$1,
    subset: subset$1,
    ancestors: ancestors$3,
    breakToLeft: breakToLeft$1,
    breakToRight: breakToRight$1,
    breakPath: breakPath$1
  };

  var universe = DomUniverse();
  var sharedOne = function (look, elements) {
    return $_6rbbpdl7jcgfo5no.sharedOne(universe, function (universe, element) {
      return look(element);
    }, elements);
  };
  var subset = function (start, finish) {
    return $_6rbbpdl7jcgfo5no.subset(universe, start, finish);
  };
  var ancestors$2 = function (start, finish, _isRoot) {
    return $_6rbbpdl7jcgfo5no.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft = function (parent, child) {
    return $_6rbbpdl7jcgfo5no.breakToLeft(universe, parent, child);
  };
  var breakToRight = function (parent, child) {
    return $_6rbbpdl7jcgfo5no.breakToRight(universe, parent, child);
  };
  var breakPath = function (child, isTop, breaker) {
    return $_6rbbpdl7jcgfo5no.breakPath(universe, child, isTop, function (u, p, c) {
      return breaker(p, c);
    });
  };
  var $_ethu47l4jcgfo5lo = {
    sharedOne: sharedOne,
    subset: subset,
    ancestors: ancestors$2,
    breakToLeft: breakToLeft,
    breakToRight: breakToRight,
    breakPath: breakPath
  };

  var inSelection = function (bounds, detail) {
    var leftEdge = detail.column();
    var rightEdge = detail.column() + detail.colspan() - 1;
    var topEdge = detail.row();
    var bottomEdge = detail.row() + detail.rowspan() - 1;
    return leftEdge <= bounds.finishCol() && rightEdge >= bounds.startCol() && (topEdge <= bounds.finishRow() && bottomEdge >= bounds.startRow());
  };
  var isWithin = function (bounds, detail) {
    return detail.column() >= bounds.startCol() && detail.column() + detail.colspan() - 1 <= bounds.finishCol() && detail.row() >= bounds.startRow() && detail.row() + detail.rowspan() - 1 <= bounds.finishRow();
  };
  var isRectangular = function (warehouse, bounds) {
    var isRect = true;
    var detailIsWithin = $_51ccyzjhjcgfo560.curry(isWithin, bounds);
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        isRect = isRect && $_akt2xrknjcgfo5fk.getAt(warehouse, i, j).exists(detailIsWithin);
      }
    }
    return isRect ? $_ch5dzyjgjcgfo55s.some(bounds) : $_ch5dzyjgjcgfo55s.none();
  };
  var $_9ylx84ldjcgfo5pg = {
    inSelection: inSelection,
    isWithin: isWithin,
    isRectangular: isRectangular
  };

  var getBounds = function (detailA, detailB) {
    return $_78xe8wjqjcgfo589.bounds(Math.min(detailA.row(), detailB.row()), Math.min(detailA.column(), detailB.column()), Math.max(detailA.row() + detailA.rowspan() - 1, detailB.row() + detailB.rowspan() - 1), Math.max(detailA.column() + detailA.colspan() - 1, detailB.column() + detailB.colspan() - 1));
  };
  var getAnyBox = function (warehouse, startCell, finishCell) {
    var startCoords = $_akt2xrknjcgfo5fk.findItem(warehouse, startCell, $_1miv10jyjcgfo5b7.eq);
    var finishCoords = $_akt2xrknjcgfo5fk.findItem(warehouse, finishCell, $_1miv10jyjcgfo5b7.eq);
    return startCoords.bind(function (sc) {
      return finishCoords.map(function (fc) {
        return getBounds(sc, fc);
      });
    });
  };
  var getBox$1 = function (warehouse, startCell, finishCell) {
    return getAnyBox(warehouse, startCell, finishCell).bind(function (bounds) {
      return $_9ylx84ldjcgfo5pg.isRectangular(warehouse, bounds);
    });
  };
  var $_8hbitplejcgfo5pp = {
    getAnyBox: getAnyBox,
    getBox: getBox$1
  };

  var moveBy$1 = function (warehouse, cell, row, column) {
    return $_akt2xrknjcgfo5fk.findItem(warehouse, cell, $_1miv10jyjcgfo5b7.eq).bind(function (detail) {
      var startRow = row > 0 ? detail.row() + detail.rowspan() - 1 : detail.row();
      var startCol = column > 0 ? detail.column() + detail.colspan() - 1 : detail.column();
      var dest = $_akt2xrknjcgfo5fk.getAt(warehouse, startRow + row, startCol + column);
      return dest.map(function (d) {
        return d.element();
      });
    });
  };
  var intercepts$1 = function (warehouse, start, finish) {
    return $_8hbitplejcgfo5pp.getAnyBox(warehouse, start, finish).map(function (bounds) {
      var inside = $_akt2xrknjcgfo5fk.filterItems(warehouse, $_51ccyzjhjcgfo560.curry($_9ylx84ldjcgfo5pg.inSelection, bounds));
      return $_epd2qyjfjcgfo55m.map(inside, function (detail) {
        return detail.element();
      });
    });
  };
  var parentCell = function (warehouse, innerCell) {
    var isContainedBy = function (c1, c2) {
      return $_1miv10jyjcgfo5b7.contains(c2, c1);
    };
    return $_akt2xrknjcgfo5fk.findItem(warehouse, innerCell, isContainedBy).bind(function (detail) {
      return detail.element();
    });
  };
  var $_g7oswylcjcgfo5p3 = {
    moveBy: moveBy$1,
    intercepts: intercepts$1,
    parentCell: parentCell
  };

  var moveBy = function (cell, deltaRow, deltaColumn) {
    return $_7pxq74jrjcgfo58f.table(cell).bind(function (table) {
      var warehouse = getWarehouse(table);
      return $_g7oswylcjcgfo5p3.moveBy(warehouse, cell, deltaRow, deltaColumn);
    });
  };
  var intercepts = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_g7oswylcjcgfo5p3.intercepts(warehouse, first, last);
  };
  var nestedIntercepts = function (table, first, firstTable, last, lastTable) {
    var warehouse = getWarehouse(table);
    var startCell = $_1miv10jyjcgfo5b7.eq(table, firstTable) ? first : $_g7oswylcjcgfo5p3.parentCell(warehouse, first);
    var lastCell = $_1miv10jyjcgfo5b7.eq(table, lastTable) ? last : $_g7oswylcjcgfo5p3.parentCell(warehouse, last);
    return $_g7oswylcjcgfo5p3.intercepts(warehouse, startCell, lastCell);
  };
  var getBox = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_8hbitplejcgfo5pp.getBox(warehouse, first, last);
  };
  var getWarehouse = function (table) {
    var list = $_fk3v3bjpjcgfo57r.fromTable(table);
    return $_akt2xrknjcgfo5fk.generate(list);
  };
  var $_1e6txjlbjcgfo5ox = {
    moveBy: moveBy,
    intercepts: intercepts,
    nestedIntercepts: nestedIntercepts,
    getBox: getBox
  };

  var lookupTable = function (container, isRoot) {
    return $_b13w5vkkjcgfo5eo.ancestor(container, 'table');
  };
  var identified = $_6w2qyfjkjcgfo57c.immutableBag([
    'boxes',
    'start',
    'finish'
  ], []);
  var identify = function (start, finish, isRoot) {
    var getIsRoot = function (rootTable) {
      return function (element) {
        return isRoot(element) || $_1miv10jyjcgfo5b7.eq(element, rootTable);
      };
    };
    if ($_1miv10jyjcgfo5b7.eq(start, finish)) {
      return $_ch5dzyjgjcgfo55s.some(identified({
        boxes: $_ch5dzyjgjcgfo55s.some([start]),
        start: start,
        finish: finish
      }));
    } else {
      return lookupTable(start, isRoot).bind(function (startTable) {
        return lookupTable(finish, isRoot).bind(function (finishTable) {
          if ($_1miv10jyjcgfo5b7.eq(startTable, finishTable)) {
            return $_ch5dzyjgjcgfo55s.some(identified({
              boxes: $_1e6txjlbjcgfo5ox.intercepts(startTable, start, finish),
              start: start,
              finish: finish
            }));
          } else if ($_1miv10jyjcgfo5b7.contains(startTable, finishTable)) {
            var ancestorCells = $_cc9vyekhjcgfo5e9.ancestors(finish, 'td,th', getIsRoot(startTable));
            var finishCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : finish;
            return $_ch5dzyjgjcgfo55s.some(identified({
              boxes: $_1e6txjlbjcgfo5ox.nestedIntercepts(startTable, start, startTable, finish, finishTable),
              start: start,
              finish: finishCell
            }));
          } else if ($_1miv10jyjcgfo5b7.contains(finishTable, startTable)) {
            var ancestorCells = $_cc9vyekhjcgfo5e9.ancestors(start, 'td,th', getIsRoot(finishTable));
            var startCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : start;
            return $_ch5dzyjgjcgfo55s.some(identified({
              boxes: $_1e6txjlbjcgfo5ox.nestedIntercepts(finishTable, start, startTable, finish, finishTable),
              start: start,
              finish: startCell
            }));
          } else {
            return $_ethu47l4jcgfo5lo.ancestors(start, finish).shared().bind(function (lca) {
              return $_b13w5vkkjcgfo5eo.closest(lca, 'table', isRoot).bind(function (lcaTable) {
                var finishAncestorCells = $_cc9vyekhjcgfo5e9.ancestors(finish, 'td,th', getIsRoot(lcaTable));
                var finishCell = finishAncestorCells.length > 0 ? finishAncestorCells[finishAncestorCells.length - 1] : finish;
                var startAncestorCells = $_cc9vyekhjcgfo5e9.ancestors(start, 'td,th', getIsRoot(lcaTable));
                var startCell = startAncestorCells.length > 0 ? startAncestorCells[startAncestorCells.length - 1] : start;
                return $_ch5dzyjgjcgfo55s.some(identified({
                  boxes: $_1e6txjlbjcgfo5ox.nestedIntercepts(lcaTable, start, startTable, finish, finishTable),
                  start: startCell,
                  finish: finishCell
                }));
              });
            });
          }
        });
      });
    }
  };
  var retrieve$1 = function (container, selector) {
    var sels = $_cc9vyekhjcgfo5e9.descendants(container, selector);
    return sels.length > 0 ? $_ch5dzyjgjcgfo55s.some(sels) : $_ch5dzyjgjcgfo55s.none();
  };
  var getLast = function (boxes, lastSelectedSelector) {
    return $_epd2qyjfjcgfo55m.find(boxes, function (box) {
      return $_4p0ah3jtjcgfo59y.is(box, lastSelectedSelector);
    });
  };
  var getEdges = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_b13w5vkkjcgfo5eo.descendant(container, firstSelectedSelector).bind(function (first) {
      return $_b13w5vkkjcgfo5eo.descendant(container, lastSelectedSelector).bind(function (last) {
        return $_ethu47l4jcgfo5lo.sharedOne(lookupTable, [
          first,
          last
        ]).map(function (tbl) {
          return {
            first: $_51ccyzjhjcgfo560.constant(first),
            last: $_51ccyzjhjcgfo560.constant(last),
            table: $_51ccyzjhjcgfo560.constant(tbl)
          };
        });
      });
    });
  };
  var expandTo = function (finish, firstSelectedSelector) {
    return $_b13w5vkkjcgfo5eo.ancestor(finish, 'table').bind(function (table) {
      return $_b13w5vkkjcgfo5eo.descendant(table, firstSelectedSelector).bind(function (start) {
        return identify(start, finish).bind(function (identified) {
          return identified.boxes().map(function (boxes) {
            return {
              boxes: $_51ccyzjhjcgfo560.constant(boxes),
              start: $_51ccyzjhjcgfo560.constant(identified.start()),
              finish: $_51ccyzjhjcgfo560.constant(identified.finish())
            };
          });
        });
      });
    });
  };
  var shiftSelection = function (boxes, deltaRow, deltaColumn, firstSelectedSelector, lastSelectedSelector) {
    return getLast(boxes, lastSelectedSelector).bind(function (last) {
      return $_1e6txjlbjcgfo5ox.moveBy(last, deltaRow, deltaColumn).bind(function (finish) {
        return expandTo(finish, firstSelectedSelector);
      });
    });
  };
  var $_8xfrr4l3jcgfo5ki = {
    identify: identify,
    retrieve: retrieve$1,
    shiftSelection: shiftSelection,
    getEdges: getEdges
  };

  var retrieve = function (container, selector) {
    return $_8xfrr4l3jcgfo5ki.retrieve(container, selector);
  };
  var retrieveBox = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_8xfrr4l3jcgfo5ki.getEdges(container, firstSelectedSelector, lastSelectedSelector).bind(function (edges) {
      var isRoot = function (ancestor) {
        return $_1miv10jyjcgfo5b7.eq(container, ancestor);
      };
      var firstAncestor = $_b13w5vkkjcgfo5eo.ancestor(edges.first(), 'thead,tfoot,tbody,table', isRoot);
      var lastAncestor = $_b13w5vkkjcgfo5eo.ancestor(edges.last(), 'thead,tfoot,tbody,table', isRoot);
      return firstAncestor.bind(function (fA) {
        return lastAncestor.bind(function (lA) {
          return $_1miv10jyjcgfo5b7.eq(fA, lA) ? $_1e6txjlbjcgfo5ox.getBox(edges.table(), edges.first(), edges.last()) : $_ch5dzyjgjcgfo55s.none();
        });
      });
    });
  };
  var $_9igzwul2jcgfo5k2 = {
    retrieve: retrieve,
    retrieveBox: retrieveBox
  };

  var selected = 'data-mce-selected';
  var selectedSelector = 'td[' + selected + '],th[' + selected + ']';
  var attributeSelector = '[' + selected + ']';
  var firstSelected = 'data-mce-first-selected';
  var firstSelectedSelector = 'td[' + firstSelected + '],th[' + firstSelected + ']';
  var lastSelected = 'data-mce-last-selected';
  var lastSelectedSelector = 'td[' + lastSelected + '],th[' + lastSelected + ']';
  var $_1c8x42lfjcgfo5py = {
    selected: $_51ccyzjhjcgfo560.constant(selected),
    selectedSelector: $_51ccyzjhjcgfo560.constant(selectedSelector),
    attributeSelector: $_51ccyzjhjcgfo560.constant(attributeSelector),
    firstSelected: $_51ccyzjhjcgfo560.constant(firstSelected),
    firstSelectedSelector: $_51ccyzjhjcgfo560.constant(firstSelectedSelector),
    lastSelected: $_51ccyzjhjcgfo560.constant(lastSelected),
    lastSelectedSelector: $_51ccyzjhjcgfo560.constant(lastSelectedSelector)
  };

  var generate$1 = function (cases) {
    if (!$_9ccf2jojcgfo57o.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_epd2qyjfjcgfo55m.each(cases, function (acase, count) {
      var keys = $_9lvqaqjjjcgfo578.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_9ccf2jojcgfo57o.isArray(value)) {
        throw new Error('case arguments must be an array');
      }
      constructors.push(key);
      adt[key] = function () {
        var argLength = arguments.length;
        if (argLength !== value.length) {
          throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
        }
        var args = new Array(argLength);
        for (var i = 0; i < args.length; i++)
          args[i] = arguments[i];
        var match = function (branches) {
          var branchKeys = $_9lvqaqjjjcgfo578.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_epd2qyjfjcgfo55m.forall(constructors, function (reqKey) {
            return $_epd2qyjfjcgfo55m.contains(branchKeys, reqKey);
          });
          if (!allReqd)
            throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
          return branches[key].apply(null, args);
        };
        return {
          fold: function () {
            if (arguments.length !== cases.length) {
              throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + arguments.length);
            }
            var target = arguments[count];
            return target.apply(null, args);
          },
          match: match,
          log: function (label) {
            console.log(label, {
              constructors: constructors,
              constructor: key,
              params: args
            });
          }
        };
      };
    });
    return adt;
  };
  var $_bmrdjblhjcgfo5qb = { generate: generate$1 };

  var type$1 = $_bmrdjblhjcgfo5qb.generate([
    { none: [] },
    { multiple: ['elements'] },
    { single: ['selection'] }
  ]);
  var cata = function (subject, onNone, onMultiple, onSingle) {
    return subject.fold(onNone, onMultiple, onSingle);
  };
  var $_cby7dklgjcgfo5q4 = {
    cata: cata,
    none: type$1.none,
    multiple: type$1.multiple,
    single: type$1.single
  };

  var selection = function (cell, selections) {
    return $_cby7dklgjcgfo5q4.cata(selections.get(), $_51ccyzjhjcgfo560.constant([]), $_51ccyzjhjcgfo560.identity, $_51ccyzjhjcgfo560.constant([cell]));
  };
  var unmergable = function (cell, selections) {
    var hasSpan = function (elem) {
      return $_fo5ow8kfjcgfo5ds.has(elem, 'rowspan') && parseInt($_fo5ow8kfjcgfo5ds.get(elem, 'rowspan'), 10) > 1 || $_fo5ow8kfjcgfo5ds.has(elem, 'colspan') && parseInt($_fo5ow8kfjcgfo5ds.get(elem, 'colspan'), 10) > 1;
    };
    var candidates = selection(cell, selections);
    return candidates.length > 0 && $_epd2qyjfjcgfo55m.forall(candidates, hasSpan) ? $_ch5dzyjgjcgfo55s.some(candidates) : $_ch5dzyjgjcgfo55s.none();
  };
  var mergable = function (table, selections) {
    return $_cby7dklgjcgfo5q4.cata(selections.get(), $_ch5dzyjgjcgfo55s.none, function (cells, _env) {
      if (cells.length === 0) {
        return $_ch5dzyjgjcgfo55s.none();
      }
      return $_9igzwul2jcgfo5k2.retrieveBox(table, $_1c8x42lfjcgfo5py.firstSelectedSelector(), $_1c8x42lfjcgfo5py.lastSelectedSelector()).bind(function (bounds) {
        return cells.length > 1 ? $_ch5dzyjgjcgfo55s.some({
          bounds: $_51ccyzjhjcgfo560.constant(bounds),
          cells: $_51ccyzjhjcgfo560.constant(cells)
        }) : $_ch5dzyjgjcgfo55s.none();
      });
    }, $_ch5dzyjgjcgfo55s.none);
  };
  var $_cgxiu8l1jcgfo5jk = {
    mergable: mergable,
    unmergable: unmergable,
    selection: selection
  };

  var noMenu = function (cell) {
    return {
      element: $_51ccyzjhjcgfo560.constant(cell),
      mergable: $_ch5dzyjgjcgfo55s.none,
      unmergable: $_ch5dzyjgjcgfo55s.none,
      selection: $_51ccyzjhjcgfo560.constant([cell])
    };
  };
  var forMenu = function (selections, table, cell) {
    return {
      element: $_51ccyzjhjcgfo560.constant(cell),
      mergable: $_51ccyzjhjcgfo560.constant($_cgxiu8l1jcgfo5jk.mergable(table, selections)),
      unmergable: $_51ccyzjhjcgfo560.constant($_cgxiu8l1jcgfo5jk.unmergable(cell, selections)),
      selection: $_51ccyzjhjcgfo560.constant($_cgxiu8l1jcgfo5jk.selection(cell, selections))
    };
  };
  var notCell$1 = function (element) {
    return noMenu(element);
  };
  var paste$1 = $_6w2qyfjkjcgfo57c.immutable('element', 'clipboard', 'generators');
  var pasteRows = function (selections, table, cell, clipboard, generators) {
    return {
      element: $_51ccyzjhjcgfo560.constant(cell),
      mergable: $_ch5dzyjgjcgfo55s.none,
      unmergable: $_ch5dzyjgjcgfo55s.none,
      selection: $_51ccyzjhjcgfo560.constant($_cgxiu8l1jcgfo5jk.selection(cell, selections)),
      clipboard: $_51ccyzjhjcgfo560.constant(clipboard),
      generators: $_51ccyzjhjcgfo560.constant(generators)
    };
  };
  var $_i3neol0jcgfo5jb = {
    noMenu: noMenu,
    forMenu: forMenu,
    notCell: notCell$1,
    paste: paste$1,
    pasteRows: pasteRows
  };

  var extractSelected = function (cells) {
    return $_7pxq74jrjcgfo58f.table(cells[0]).map($_bj8wkfkujcgfo5ia.deep).map(function (replica) {
      return [$_3siofpjijcgfo565.extract(replica, $_1c8x42lfjcgfo5py.attributeSelector())];
    });
  };
  var serializeElement = function (editor, elm) {
    return editor.selection.serializer.serialize(elm.dom(), {});
  };
  var registerEvents = function (editor, selections, actions, cellSelection) {
    editor.on('BeforeGetContent', function (e) {
      var multiCellContext = function (cells) {
        e.preventDefault();
        extractSelected(cells).each(function (elements) {
          e.content = $_epd2qyjfjcgfo55m.map(elements, function (elm) {
            return serializeElement(editor, elm);
          }).join('');
        });
      };
      if (e.selection === true) {
        $_cby7dklgjcgfo5q4.cata(selections.get(), $_51ccyzjhjcgfo560.noop, multiCellContext, $_51ccyzjhjcgfo560.noop);
      }
    });
    editor.on('BeforeSetContent', function (e) {
      if (e.selection === true && e.paste === true) {
        var cellOpt = $_ch5dzyjgjcgfo55s.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        cellOpt.each(function (domCell) {
          var cell = $_epp4kejujcgfo5a8.fromDom(domCell);
          var table = $_7pxq74jrjcgfo58f.table(cell);
          table.bind(function (table) {
            var elements = $_epd2qyjfjcgfo55m.filter($_eice81kzjcgfo5j5.fromHtml(e.content), function (content) {
              return $_4zgqn9kgjcgfo5e6.name(content) !== 'meta';
            });
            if (elements.length === 1 && $_4zgqn9kgjcgfo5e6.name(elements[0]) === 'table') {
              e.preventDefault();
              var doc = $_epp4kejujcgfo5a8.fromDom(editor.getDoc());
              var generators = $_5ayu0hktjcgfo5h3.paste(doc);
              var targets = $_i3neol0jcgfo5jb.paste(cell, elements[0], generators);
              actions.pasteCells(table, targets).each(function (rng) {
                editor.selection.setRng(rng);
                editor.focus();
                cellSelection.clear(table);
              });
            }
          });
        });
      }
    });
  };
  var $_5rvw7bjejcgfo54d = { registerEvents: registerEvents };

  var makeTable = function () {
    return $_epp4kejujcgfo5a8.fromTag('table');
  };
  var tableBody = function () {
    return $_epp4kejujcgfo5a8.fromTag('tbody');
  };
  var tableRow = function () {
    return $_epp4kejujcgfo5a8.fromTag('tr');
  };
  var tableHeaderCell = function () {
    return $_epp4kejujcgfo5a8.fromTag('th');
  };
  var tableCell = function () {
    return $_epp4kejujcgfo5a8.fromTag('td');
  };
  var render = function (rows, columns, rowHeaders, columnHeaders) {
    var table = makeTable();
    $_6vnepekojcgfo5fy.setAll(table, {
      'border-collapse': 'collapse',
      width: '100%'
    });
    $_fo5ow8kfjcgfo5ds.set(table, 'border', '1');
    var tbody = tableBody();
    $_9fuysnkqjcgfo5gl.append(table, tbody);
    var trs = [];
    for (var i = 0; i < rows; i++) {
      var tr = tableRow();
      for (var j = 0; j < columns; j++) {
        var td = i < rowHeaders || j < columnHeaders ? tableHeaderCell() : tableCell();
        if (j < columnHeaders) {
          $_fo5ow8kfjcgfo5ds.set(td, 'scope', 'row');
        }
        if (i < rowHeaders) {
          $_fo5ow8kfjcgfo5ds.set(td, 'scope', 'col');
        }
        $_9fuysnkqjcgfo5gl.append(td, $_epp4kejujcgfo5a8.fromTag('br'));
        $_6vnepekojcgfo5fy.set(td, 'width', 100 / columns + '%');
        $_9fuysnkqjcgfo5gl.append(tr, td);
      }
      trs.push(tr);
    }
    $_f1hd40ksjcgfo5gv.append(tbody, trs);
    return table;
  };
  var $_acpdr9lkjcgfo5qy = { render: render };

  var $_4mu4ymljjcgfo5qw = { render: $_acpdr9lkjcgfo5qy.render };

  var get$3 = function (element) {
    return element.dom().innerHTML;
  };
  var set$3 = function (element, content) {
    var owner = $_4k5ag6jwjcgfo5aj.owner(element);
    var docDom = owner.dom();
    var fragment = $_epp4kejujcgfo5a8.fromDom(docDom.createDocumentFragment());
    var contentElements = $_eice81kzjcgfo5j5.fromHtml(content, docDom);
    $_f1hd40ksjcgfo5gv.append(fragment, contentElements);
    $_9z98yykrjcgfo5go.empty(element);
    $_9fuysnkqjcgfo5gl.append(element, fragment);
  };
  var getOuter = function (element) {
    var container = $_epp4kejujcgfo5a8.fromTag('div');
    var clone = $_epp4kejujcgfo5a8.fromDom(element.dom().cloneNode(true));
    $_9fuysnkqjcgfo5gl.append(container, clone);
    return get$3(container);
  };
  var $_92ltyslljcgfo5rh = {
    get: get$3,
    set: set$3,
    getOuter: getOuter
  };

  var placeCaretInCell = function (editor, cell) {
    editor.selection.select(cell.dom(), true);
    editor.selection.collapse(true);
  };
  var selectFirstCellInTable = function (editor, tableElm) {
    $_b13w5vkkjcgfo5eo.descendant(tableElm, 'td,th').each($_51ccyzjhjcgfo560.curry(placeCaretInCell, editor));
  };
  var insert = function (editor, columns, rows) {
    var tableElm;
    var renderedHtml = $_4mu4ymljjcgfo5qw.render(rows, columns, 0, 0);
    $_fo5ow8kfjcgfo5ds.set(renderedHtml, 'id', '__mce');
    var html = $_92ltyslljcgfo5rh.getOuter(renderedHtml);
    editor.insertContent(html);
    tableElm = editor.dom.get('__mce');
    editor.dom.setAttrib(tableElm, 'id', null);
    editor.$('tr', tableElm).each(function (index, row) {
      editor.fire('newrow', { node: row });
      editor.$('th,td', row).each(function (index, cell) {
        editor.fire('newcell', { node: cell });
      });
    });
    editor.dom.setAttribs(tableElm, editor.settings.table_default_attributes || {});
    editor.dom.setStyles(tableElm, editor.settings.table_default_styles || {});
    selectFirstCellInTable(editor, $_epp4kejujcgfo5a8.fromDom(tableElm));
    return tableElm;
  };
  var $_8x421vlijcgfo5qe = { insert: insert };

  var Dimension = function (name, getOffset) {
    var set = function (element, h) {
      if (!$_9ccf2jojcgfo57o.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_9vrqa1kpjcgfo5gi.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_6vnepekojcgfo5fy.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_epd2qyjfjcgfo55m.foldl(properties, function (acc, property) {
        var val = $_6vnepekojcgfo5fy.get(element, property);
        var value = val === undefined ? 0 : parseInt(val, 10);
        return isNaN(value) ? acc : acc + value;
      }, 0);
    };
    var max = function (element, value, properties) {
      var cumulativeInclusions = aggregate(element, properties);
      var absoluteMax = value > cumulativeInclusions ? value - cumulativeInclusions : 0;
      return absoluteMax;
    };
    return {
      set: set,
      get: get,
      getOuter: getOuter,
      aggregate: aggregate,
      max: max
    };
  };

  var api$1 = Dimension('height', function (element) {
    return $_45wfmkjjcgfo5ei.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
  });
  var set$4 = function (element, h) {
    api$1.set(element, h);
  };
  var get$5 = function (element) {
    return api$1.get(element);
  };
  var getOuter$1 = function (element) {
    return api$1.getOuter(element);
  };
  var setMax = function (element, value) {
    var inclusions = [
      'margin-top',
      'border-top-width',
      'padding-top',
      'padding-bottom',
      'border-bottom-width',
      'margin-bottom'
    ];
    var absMax = api$1.max(element, value, inclusions);
    $_6vnepekojcgfo5fy.set(element, 'max-height', absMax + 'px');
  };
  var $_5f87mrlqjcgfo5u1 = {
    set: set$4,
    get: get$5,
    getOuter: getOuter$1,
    setMax: setMax
  };

  var api$2 = Dimension('width', function (element) {
    return element.dom().offsetWidth;
  });
  var set$5 = function (element, h) {
    api$2.set(element, h);
  };
  var get$6 = function (element) {
    return api$2.get(element);
  };
  var getOuter$2 = function (element) {
    return api$2.getOuter(element);
  };
  var setMax$1 = function (element, value) {
    var inclusions = [
      'margin-left',
      'border-left-width',
      'padding-left',
      'padding-right',
      'border-right-width',
      'margin-right'
    ];
    var absMax = api$2.max(element, value, inclusions);
    $_6vnepekojcgfo5fy.set(element, 'max-width', absMax + 'px');
  };
  var $_5r9oetlsjcgfo5uc = {
    set: set$5,
    get: get$6,
    getOuter: getOuter$2,
    setMax: setMax$1
  };

  var platform = $_1x7x33k3jcgfo5c3.detect();
  var needManualCalc = function () {
    return platform.browser.isIE() || platform.browser.isEdge();
  };
  var toNumber = function (px, fallback) {
    var num = parseFloat(px);
    return isNaN(num) ? fallback : num;
  };
  var getProp = function (elm, name, fallback) {
    return toNumber($_6vnepekojcgfo5fy.get(elm, name), fallback);
  };
  var getCalculatedHeight = function (cell) {
    var paddingTop = getProp(cell, 'padding-top', 0);
    var paddingBottom = getProp(cell, 'padding-bottom', 0);
    var borderTop = getProp(cell, 'border-top-width', 0);
    var borderBottom = getProp(cell, 'border-bottom-width', 0);
    var height = cell.dom().getBoundingClientRect().height;
    var boxSizing = $_6vnepekojcgfo5fy.get(cell, 'box-sizing');
    var borders = borderTop + borderBottom;
    return boxSizing === 'border-box' ? height : height - paddingTop - paddingBottom - borders;
  };
  var getWidth = function (cell) {
    return getProp(cell, 'width', $_5r9oetlsjcgfo5uc.get(cell));
  };
  var getHeight$1 = function (cell) {
    return needManualCalc() ? getCalculatedHeight(cell) : getProp(cell, 'height', $_5f87mrlqjcgfo5u1.get(cell));
  };
  var $_ccxnkwlpjcgfo5tm = {
    getWidth: getWidth,
    getHeight: getHeight$1
  };

  var genericSizeRegex = /(\d+(\.\d+)?)(\w|%)*/;
  var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
  var pixelBasedSizeRegex = /(\d+(\.\d+)?)px|em/;
  var setPixelWidth = function (cell, amount) {
    $_6vnepekojcgfo5fy.set(cell, 'width', amount + 'px');
  };
  var setPercentageWidth = function (cell, amount) {
    $_6vnepekojcgfo5fy.set(cell, 'width', amount + '%');
  };
  var setHeight = function (cell, amount) {
    $_6vnepekojcgfo5fy.set(cell, 'height', amount + 'px');
  };
  var getHeightValue = function (cell) {
    return $_6vnepekojcgfo5fy.getRaw(cell, 'height').getOrThunk(function () {
      return $_ccxnkwlpjcgfo5tm.getHeight(cell) + 'px';
    });
  };
  var convert = function (cell, number, getter, setter) {
    var newSize = $_7pxq74jrjcgfo58f.table(cell).map(function (table) {
      var total = getter(table);
      return Math.floor(number / 100 * total);
    }).getOr(number);
    setter(cell, newSize);
    return newSize;
  };
  var normalizePixelSize = function (value, cell, getter, setter) {
    var number = parseInt(value, 10);
    return $_g6xy1okcjcgfo5dk.endsWith(value, '%') && $_4zgqn9kgjcgfo5e6.name(cell) !== 'table' ? convert(cell, number, getter, setter) : number;
  };
  var getTotalHeight = function (cell) {
    var value = getHeightValue(cell);
    if (!value)
      return $_5f87mrlqjcgfo5u1.get(cell);
    return normalizePixelSize(value, cell, $_5f87mrlqjcgfo5u1.get, setHeight);
  };
  var get$4 = function (cell, type, f) {
    var v = f(cell);
    var span = getSpan(cell, type);
    return v / span;
  };
  var getSpan = function (cell, type) {
    return $_fo5ow8kfjcgfo5ds.has(cell, type) ? parseInt($_fo5ow8kfjcgfo5ds.get(cell, type), 10) : 1;
  };
  var getRawWidth = function (element) {
    var cssWidth = $_6vnepekojcgfo5fy.getRaw(element, 'width');
    return cssWidth.fold(function () {
      return $_ch5dzyjgjcgfo55s.from($_fo5ow8kfjcgfo5ds.get(element, 'width'));
    }, function (width) {
      return $_ch5dzyjgjcgfo55s.some(width);
    });
  };
  var normalizePercentageWidth = function (cellWidth, tableSize) {
    return cellWidth / tableSize.pixelWidth() * 100;
  };
  var choosePercentageSize = function (element, width, tableSize) {
    if (percentageBasedSizeRegex.test(width)) {
      var percentMatch = percentageBasedSizeRegex.exec(width);
      return parseFloat(percentMatch[1]);
    } else {
      var fallbackWidth = $_5r9oetlsjcgfo5uc.get(element);
      var intWidth = parseInt(fallbackWidth, 10);
      return normalizePercentageWidth(intWidth, tableSize);
    }
  };
  var getPercentageWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_5r9oetlsjcgfo5uc.get(cell);
      var intWidth = parseInt(width, 10);
      return normalizePercentageWidth(intWidth, tableSize);
    }, function (width) {
      return choosePercentageSize(cell, width, tableSize);
    });
  };
  var normalizePixelWidth = function (cellWidth, tableSize) {
    return cellWidth / 100 * tableSize.pixelWidth();
  };
  var choosePixelSize = function (element, width, tableSize) {
    if (pixelBasedSizeRegex.test(width)) {
      var pixelMatch = pixelBasedSizeRegex.exec(width);
      return parseInt(pixelMatch[1], 10);
    } else if (percentageBasedSizeRegex.test(width)) {
      var percentMatch = percentageBasedSizeRegex.exec(width);
      var floatWidth = parseFloat(percentMatch[1]);
      return normalizePixelWidth(floatWidth, tableSize);
    } else {
      var fallbackWidth = $_5r9oetlsjcgfo5uc.get(element);
      return parseInt(fallbackWidth, 10);
    }
  };
  var getPixelWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_5r9oetlsjcgfo5uc.get(cell);
      var intWidth = parseInt(width, 10);
      return intWidth;
    }, function (width) {
      return choosePixelSize(cell, width, tableSize);
    });
  };
  var getHeight = function (cell) {
    return get$4(cell, 'rowspan', getTotalHeight);
  };
  var getGenericWidth = function (cell) {
    var width = getRawWidth(cell);
    return width.bind(function (width) {
      if (genericSizeRegex.test(width)) {
        var match = genericSizeRegex.exec(width);
        return $_ch5dzyjgjcgfo55s.some({
          width: $_51ccyzjhjcgfo560.constant(match[1]),
          unit: $_51ccyzjhjcgfo560.constant(match[3])
        });
      } else {
        return $_ch5dzyjgjcgfo55s.none();
      }
    });
  };
  var setGenericWidth = function (cell, amount, unit) {
    $_6vnepekojcgfo5fy.set(cell, 'width', amount + unit);
  };
  var $_7s0dsmlojcgfo5sq = {
    percentageBasedSizeRegex: $_51ccyzjhjcgfo560.constant(percentageBasedSizeRegex),
    pixelBasedSizeRegex: $_51ccyzjhjcgfo560.constant(pixelBasedSizeRegex),
    setPixelWidth: setPixelWidth,
    setPercentageWidth: setPercentageWidth,
    setHeight: setHeight,
    getPixelWidth: getPixelWidth,
    getPercentageWidth: getPercentageWidth,
    getGenericWidth: getGenericWidth,
    setGenericWidth: setGenericWidth,
    getHeight: getHeight,
    getRawWidth: getRawWidth
  };

  var halve = function (main, other) {
    var width = $_7s0dsmlojcgfo5sq.getGenericWidth(main);
    width.each(function (width) {
      var newWidth = width.width() / 2;
      $_7s0dsmlojcgfo5sq.setGenericWidth(main, newWidth, width.unit());
      $_7s0dsmlojcgfo5sq.setGenericWidth(other, newWidth, width.unit());
    });
  };
  var $_aaq39flnjcgfo5sm = { halve: halve };

  var attached = function (element, scope) {
    var doc = scope || $_epp4kejujcgfo5a8.fromDom(document.documentElement);
    return $_398i33kljcgfo5er.ancestor(element, $_51ccyzjhjcgfo560.curry($_1miv10jyjcgfo5b7.eq, doc)).isSome();
  };
  var windowOf = function (element) {
    var dom = element.dom();
    if (dom === dom.window)
      return element;
    return $_4zgqn9kgjcgfo5e6.isDocument(element) ? dom.defaultView || dom.parentWindow : null;
  };
  var $_2pmeu3lxjcgfo5vd = {
    attached: attached,
    windowOf: windowOf
  };

  var r = function (left, top) {
    var translate = function (x, y) {
      return r(left + x, top + y);
    };
    return {
      left: $_51ccyzjhjcgfo560.constant(left),
      top: $_51ccyzjhjcgfo560.constant(top),
      translate: translate
    };
  };

  var boxPosition = function (dom) {
    var box = dom.getBoundingClientRect();
    return r(box.left, box.top);
  };
  var firstDefinedOrZero = function (a, b) {
    return a !== undefined ? a : b !== undefined ? b : 0;
  };
  var absolute = function (element) {
    var doc = element.dom().ownerDocument;
    var body = doc.body;
    var win = $_2pmeu3lxjcgfo5vd.windowOf($_epp4kejujcgfo5a8.fromDom(doc));
    var html = doc.documentElement;
    var scrollTop = firstDefinedOrZero(win.pageYOffset, html.scrollTop);
    var scrollLeft = firstDefinedOrZero(win.pageXOffset, html.scrollLeft);
    var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
    var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
    return viewport(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
  };
  var relative = function (element) {
    var dom = element.dom();
    return r(dom.offsetLeft, dom.offsetTop);
  };
  var viewport = function (element) {
    var dom = element.dom();
    var doc = dom.ownerDocument;
    var body = doc.body;
    var html = $_epp4kejujcgfo5a8.fromDom(doc.documentElement);
    if (body === dom)
      return r(body.offsetLeft, body.offsetTop);
    if (!$_2pmeu3lxjcgfo5vd.attached(element, html))
      return r(0, 0);
    return boxPosition(dom);
  };
  var $_d1l3b5lwjcgfo5vb = {
    absolute: absolute,
    relative: relative,
    viewport: viewport
  };

  var rowInfo = $_6w2qyfjkjcgfo57c.immutable('row', 'y');
  var colInfo = $_6w2qyfjkjcgfo57c.immutable('col', 'x');
  var rtlEdge = function (cell) {
    var pos = $_d1l3b5lwjcgfo5vb.absolute(cell);
    return pos.left() + $_5r9oetlsjcgfo5uc.getOuter(cell);
  };
  var ltrEdge = function (cell) {
    return $_d1l3b5lwjcgfo5vb.absolute(cell).left();
  };
  var getLeftEdge = function (index, cell) {
    return colInfo(index, ltrEdge(cell));
  };
  var getRightEdge = function (index, cell) {
    return colInfo(index, rtlEdge(cell));
  };
  var getTop = function (cell) {
    return $_d1l3b5lwjcgfo5vb.absolute(cell).top();
  };
  var getTopEdge = function (index, cell) {
    return rowInfo(index, getTop(cell));
  };
  var getBottomEdge = function (index, cell) {
    return rowInfo(index, getTop(cell) + $_5f87mrlqjcgfo5u1.getOuter(cell));
  };
  var findPositions = function (getInnerEdge, getOuterEdge, array) {
    if (array.length === 0)
      return [];
    var lines = $_epd2qyjfjcgfo55m.map(array.slice(1), function (cellOption, index) {
      return cellOption.map(function (cell) {
        return getInnerEdge(index, cell);
      });
    });
    var lastLine = array[array.length - 1].map(function (cell) {
      return getOuterEdge(array.length - 1, cell);
    });
    return lines.concat([lastLine]);
  };
  var negate = function (step, _table) {
    return -step;
  };
  var height = {
    delta: $_51ccyzjhjcgfo560.identity,
    positions: $_51ccyzjhjcgfo560.curry(findPositions, getTopEdge, getBottomEdge),
    edge: getTop
  };
  var ltr = {
    delta: $_51ccyzjhjcgfo560.identity,
    edge: ltrEdge,
    positions: $_51ccyzjhjcgfo560.curry(findPositions, getLeftEdge, getRightEdge)
  };
  var rtl = {
    delta: negate,
    edge: rtlEdge,
    positions: $_51ccyzjhjcgfo560.curry(findPositions, getRightEdge, getLeftEdge)
  };
  var $_f2292ulvjcgfo5uj = {
    height: height,
    rtl: rtl,
    ltr: ltr
  };

  var $_c330dilujcgfo5uh = {
    ltr: $_f2292ulvjcgfo5uj.ltr,
    rtl: $_f2292ulvjcgfo5uj.rtl
  };

  var TableDirection = function (directionAt) {
    var auto = function (table) {
      return directionAt(table).isRtl() ? $_c330dilujcgfo5uh.rtl : $_c330dilujcgfo5uh.ltr;
    };
    var delta = function (amount, table) {
      return auto(table).delta(amount, table);
    };
    var positions = function (cols, table) {
      return auto(table).positions(cols, table);
    };
    var edge = function (cell) {
      return auto(cell).edge(cell);
    };
    return {
      delta: delta,
      edge: edge,
      positions: positions
    };
  };

  var getGridSize = function (table) {
    var input = $_fk3v3bjpjcgfo57r.fromTable(table);
    var warehouse = $_akt2xrknjcgfo5fk.generate(input);
    return warehouse.grid();
  };
  var $_g89pfylzjcgfo5vp = { getGridSize: getGridSize };

  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };

  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: $_9ccf2jojcgfo57o.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_5zbw28jnjcgfo57l.validateStrArr('required', required);
    $_5zbw28jnjcgfo57l.checkDupes(required);
    return function (obj) {
      var keys = $_9lvqaqjjjcgfo578.keys(obj);
      var allReqd = $_epd2qyjfjcgfo55m.forall(required, function (req) {
        return $_epd2qyjfjcgfo55m.contains(keys, req);
      });
      if (!allReqd)
        $_5zbw28jnjcgfo57l.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_epd2qyjfjcgfo55m.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_5zbw28jnjcgfo57l.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_epd2qyjfjcgfo55m.filter(keys, function (key) {
      return !$_epd2qyjfjcgfo55m.contains(required, key);
    });
    if (unsupported.length > 0)
      $_5zbw28jnjcgfo57l.unsuppMessage(unsupported);
  };
  var allowExtra = $_51ccyzjhjcgfo560.noop;
  var $_9zengqm3jcgfo5x8 = {
    exactly: $_51ccyzjhjcgfo560.curry(base, handleExact),
    ensure: $_51ccyzjhjcgfo560.curry(base, allowExtra),
    ensureWith: $_51ccyzjhjcgfo560.curry(baseWith, allowExtra)
  };

  var elementToData = function (element) {
    var colspan = $_fo5ow8kfjcgfo5ds.has(element, 'colspan') ? parseInt($_fo5ow8kfjcgfo5ds.get(element, 'colspan'), 10) : 1;
    var rowspan = $_fo5ow8kfjcgfo5ds.has(element, 'rowspan') ? parseInt($_fo5ow8kfjcgfo5ds.get(element, 'rowspan'), 10) : 1;
    return {
      element: $_51ccyzjhjcgfo560.constant(element),
      colspan: $_51ccyzjhjcgfo560.constant(colspan),
      rowspan: $_51ccyzjhjcgfo560.constant(rowspan)
    };
  };
  var modification = function (generators, _toData) {
    contract(generators);
    var position = Cell($_ch5dzyjgjcgfo55s.none());
    var toData = _toData !== undefined ? _toData : elementToData;
    var nu = function (data) {
      return generators.cell(data);
    };
    var nuFrom = function (element) {
      var data = toData(element);
      return nu(data);
    };
    var add = function (element) {
      var replacement = nuFrom(element);
      if (position.get().isNone())
        position.set($_ch5dzyjgjcgfo55s.some(replacement));
      recent = $_ch5dzyjgjcgfo55s.some({
        item: element,
        replacement: replacement
      });
      return replacement;
    };
    var recent = $_ch5dzyjgjcgfo55s.none();
    var getOrInit = function (element, comparator) {
      return recent.fold(function () {
        return add(element);
      }, function (p) {
        return comparator(element, p.item) ? p.replacement : add(element);
      });
    };
    return {
      getOrInit: getOrInit,
      cursor: position.get
    };
  };
  var transform = function (scope, tag) {
    return function (generators) {
      var position = Cell($_ch5dzyjgjcgfo55s.none());
      contract(generators);
      var list = [];
      var find = function (element, comparator) {
        return $_epd2qyjfjcgfo55m.find(list, function (x) {
          return comparator(x.item, element);
        });
      };
      var makeNew = function (element) {
        var cell = generators.replace(element, tag, { scope: scope });
        list.push({
          item: element,
          sub: cell
        });
        if (position.get().isNone())
          position.set($_ch5dzyjgjcgfo55s.some(cell));
        return cell;
      };
      var replaceOrInit = function (element, comparator) {
        return find(element, comparator).fold(function () {
          return makeNew(element);
        }, function (p) {
          return comparator(element, p.item) ? p.sub : makeNew(element);
        });
      };
      return {
        replaceOrInit: replaceOrInit,
        cursor: position.get
      };
    };
  };
  var merging = function (generators) {
    contract(generators);
    var position = Cell($_ch5dzyjgjcgfo55s.none());
    var combine = function (cell) {
      if (position.get().isNone())
        position.set($_ch5dzyjgjcgfo55s.some(cell));
      return function () {
        var raw = generators.cell({
          element: $_51ccyzjhjcgfo560.constant(cell),
          colspan: $_51ccyzjhjcgfo560.constant(1),
          rowspan: $_51ccyzjhjcgfo560.constant(1)
        });
        $_6vnepekojcgfo5fy.remove(raw, 'width');
        $_6vnepekojcgfo5fy.remove(cell, 'width');
        return raw;
      };
    };
    return {
      combine: combine,
      cursor: position.get
    };
  };
  var contract = $_9zengqm3jcgfo5x8.exactly([
    'cell',
    'row',
    'replace',
    'gap'
  ]);
  var $_eotvzmm1jcgfo5wf = {
    modification: modification,
    transform: transform,
    merging: merging
  };

  var blockList = [
    'body',
    'p',
    'div',
    'article',
    'aside',
    'figcaption',
    'figure',
    'footer',
    'header',
    'nav',
    'section',
    'ol',
    'ul',
    'table',
    'thead',
    'tfoot',
    'tbody',
    'caption',
    'tr',
    'td',
    'th',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'pre',
    'address'
  ];
  var isList$1 = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_epd2qyjfjcgfo55m.contains([
      'ol',
      'ul'
    ], tagName);
  };
  var isBlock$1 = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_epd2qyjfjcgfo55m.contains(blockList, tagName);
  };
  var isFormatting$1 = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_epd2qyjfjcgfo55m.contains([
      'address',
      'pre',
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isHeading$1 = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_epd2qyjfjcgfo55m.contains([
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isContainer$1 = function (universe, item) {
    return $_epd2qyjfjcgfo55m.contains([
      'div',
      'li',
      'td',
      'th',
      'blockquote',
      'body',
      'caption'
    ], universe.property().name(item));
  };
  var isEmptyTag$1 = function (universe, item) {
    return $_epd2qyjfjcgfo55m.contains([
      'br',
      'img',
      'hr',
      'input'
    ], universe.property().name(item));
  };
  var isFrame$1 = function (universe, item) {
    return universe.property().name(item) === 'iframe';
  };
  var isInline$1 = function (universe, item) {
    return !(isBlock$1(universe, item) || isEmptyTag$1(universe, item)) && universe.property().name(item) !== 'li';
  };
  var $_evq9lem6jcgfo5ym = {
    isBlock: isBlock$1,
    isList: isList$1,
    isFormatting: isFormatting$1,
    isHeading: isHeading$1,
    isContainer: isContainer$1,
    isEmptyTag: isEmptyTag$1,
    isFrame: isFrame$1,
    isInline: isInline$1
  };

  var universe$1 = DomUniverse();
  var isBlock = function (element) {
    return $_evq9lem6jcgfo5ym.isBlock(universe$1, element);
  };
  var isList = function (element) {
    return $_evq9lem6jcgfo5ym.isList(universe$1, element);
  };
  var isFormatting = function (element) {
    return $_evq9lem6jcgfo5ym.isFormatting(universe$1, element);
  };
  var isHeading = function (element) {
    return $_evq9lem6jcgfo5ym.isHeading(universe$1, element);
  };
  var isContainer = function (element) {
    return $_evq9lem6jcgfo5ym.isContainer(universe$1, element);
  };
  var isEmptyTag = function (element) {
    return $_evq9lem6jcgfo5ym.isEmptyTag(universe$1, element);
  };
  var isFrame = function (element) {
    return $_evq9lem6jcgfo5ym.isFrame(universe$1, element);
  };
  var isInline = function (element) {
    return $_evq9lem6jcgfo5ym.isInline(universe$1, element);
  };
  var $_dbp7im5jcgfo5yg = {
    isBlock: isBlock,
    isList: isList,
    isFormatting: isFormatting,
    isHeading: isHeading,
    isContainer: isContainer,
    isEmptyTag: isEmptyTag,
    isFrame: isFrame,
    isInline: isInline
  };

  var merge = function (cells) {
    var isBr = function (el) {
      return $_4zgqn9kgjcgfo5e6.name(el) === 'br';
    };
    var advancedBr = function (children) {
      return $_epd2qyjfjcgfo55m.forall(children, function (c) {
        return isBr(c) || $_4zgqn9kgjcgfo5e6.isText(c) && $_cjrygqkxjcgfo5it.get(c).trim().length === 0;
      });
    };
    var isListItem = function (el) {
      return $_4zgqn9kgjcgfo5e6.name(el) === 'li' || $_398i33kljcgfo5er.ancestor(el, $_dbp7im5jcgfo5yg.isList).isSome();
    };
    var siblingIsBlock = function (el) {
      return $_4k5ag6jwjcgfo5aj.nextSibling(el).map(function (rightSibling) {
        if ($_dbp7im5jcgfo5yg.isBlock(rightSibling))
          return true;
        if ($_dbp7im5jcgfo5yg.isEmptyTag(rightSibling)) {
          return $_4zgqn9kgjcgfo5e6.name(rightSibling) === 'img' ? false : true;
        }
      }).getOr(false);
    };
    var markCell = function (cell) {
      return $_bwsvmpkvjcgfo5ih.last(cell).bind(function (rightEdge) {
        var rightSiblingIsBlock = siblingIsBlock(rightEdge);
        return $_4k5ag6jwjcgfo5aj.parent(rightEdge).map(function (parent) {
          return rightSiblingIsBlock === true || isListItem(parent) || isBr(rightEdge) || $_dbp7im5jcgfo5yg.isBlock(parent) && !$_1miv10jyjcgfo5b7.eq(cell, parent) ? [] : [$_epp4kejujcgfo5a8.fromTag('br')];
        });
      }).getOr([]);
    };
    var markContent = function () {
      var content = $_epd2qyjfjcgfo55m.bind(cells, function (cell) {
        var children = $_4k5ag6jwjcgfo5aj.children(cell);
        return advancedBr(children) ? [] : children.concat(markCell(cell));
      });
      return content.length === 0 ? [$_epp4kejujcgfo5a8.fromTag('br')] : content;
    };
    var contents = markContent();
    $_9z98yykrjcgfo5go.empty(cells[0]);
    $_f1hd40ksjcgfo5gv.append(cells[0], contents);
  };
  var $_7t2pvsm4jcgfo5xf = { merge: merge };

  var shallow$1 = function (old, nu) {
    return nu;
  };
  var deep$1 = function (old, nu) {
    var bothObjects = $_9ccf2jojcgfo57o.isObject(old) && $_9ccf2jojcgfo57o.isObject(nu);
    return bothObjects ? deepMerge(old, nu) : nu;
  };
  var baseMerge = function (merger) {
    return function () {
      var objects = new Array(arguments.length);
      for (var i = 0; i < objects.length; i++)
        objects[i] = arguments[i];
      if (objects.length === 0)
        throw new Error('Can\'t merge zero objects');
      var ret = {};
      for (var j = 0; j < objects.length; j++) {
        var curObject = objects[j];
        for (var key in curObject)
          if (curObject.hasOwnProperty(key)) {
            ret[key] = merger(ret[key], curObject[key]);
          }
      }
      return ret;
    };
  };
  var deepMerge = baseMerge(deep$1);
  var merge$1 = baseMerge(shallow$1);
  var $_1q2omim8jcgfo5zk = {
    deepMerge: deepMerge,
    merge: merge$1
  };

  var cat = function (arr) {
    var r = [];
    var push = function (x) {
      r.push(x);
    };
    for (var i = 0; i < arr.length; i++) {
      arr[i].each(push);
    }
    return r;
  };
  var findMap = function (arr, f) {
    for (var i = 0; i < arr.length; i++) {
      var r = f(arr[i], i);
      if (r.isSome()) {
        return r;
      }
    }
    return $_ch5dzyjgjcgfo55s.none();
  };
  var liftN = function (arr, f) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (x.isSome()) {
        r.push(x.getOrDie());
      } else {
        return $_ch5dzyjgjcgfo55s.none();
      }
    }
    return $_ch5dzyjgjcgfo55s.some(f.apply(null, r));
  };
  var $_x980jm9jcgfo5zn = {
    cat: cat,
    findMap: findMap,
    liftN: liftN
  };

  var addCell = function (gridRow, index, cell) {
    var cells = gridRow.cells();
    var before = cells.slice(0, index);
    var after = cells.slice(index);
    var newCells = before.concat([cell]).concat(after);
    return setCells(gridRow, newCells);
  };
  var mutateCell = function (gridRow, index, cell) {
    var cells = gridRow.cells();
    cells[index] = cell;
  };
  var setCells = function (gridRow, cells) {
    return $_78xe8wjqjcgfo589.rowcells(cells, gridRow.section());
  };
  var mapCells = function (gridRow, f) {
    var cells = gridRow.cells();
    var r = $_epd2qyjfjcgfo55m.map(cells, f);
    return $_78xe8wjqjcgfo589.rowcells(r, gridRow.section());
  };
  var getCell = function (gridRow, index) {
    return gridRow.cells()[index];
  };
  var getCellElement = function (gridRow, index) {
    return getCell(gridRow, index).element();
  };
  var cellLength = function (gridRow) {
    return gridRow.cells().length;
  };
  var $_2ui618mcjcgfo60b = {
    addCell: addCell,
    setCells: setCells,
    mutateCell: mutateCell,
    getCell: getCell,
    getCellElement: getCellElement,
    mapCells: mapCells,
    cellLength: cellLength
  };

  var getColumn = function (grid, index) {
    return $_epd2qyjfjcgfo55m.map(grid, function (row) {
      return $_2ui618mcjcgfo60b.getCell(row, index);
    });
  };
  var getRow = function (grid, index) {
    return grid[index];
  };
  var findDiff = function (xs, comp) {
    if (xs.length === 0)
      return 0;
    var first = xs[0];
    var index = $_epd2qyjfjcgfo55m.findIndex(xs, function (x) {
      return !comp(first.element(), x.element());
    });
    return index.fold(function () {
      return xs.length;
    }, function (ind) {
      return ind;
    });
  };
  var subgrid = function (grid, row, column, comparator) {
    var restOfRow = getRow(grid, row).cells().slice(column);
    var endColIndex = findDiff(restOfRow, comparator);
    var restOfColumn = getColumn(grid, column).slice(row);
    var endRowIndex = findDiff(restOfColumn, comparator);
    return {
      colspan: $_51ccyzjhjcgfo560.constant(endColIndex),
      rowspan: $_51ccyzjhjcgfo560.constant(endRowIndex)
    };
  };
  var $_igkl5mbjcgfo5zy = { subgrid: subgrid };

  var toDetails = function (grid, comparator) {
    var seen = $_epd2qyjfjcgfo55m.map(grid, function (row, ri) {
      return $_epd2qyjfjcgfo55m.map(row.cells(), function (col, ci) {
        return false;
      });
    });
    var updateSeen = function (ri, ci, rowspan, colspan) {
      for (var r = ri; r < ri + rowspan; r++) {
        for (var c = ci; c < ci + colspan; c++) {
          seen[r][c] = true;
        }
      }
    };
    return $_epd2qyjfjcgfo55m.map(grid, function (row, ri) {
      var details = $_epd2qyjfjcgfo55m.bind(row.cells(), function (cell, ci) {
        if (seen[ri][ci] === false) {
          var result = $_igkl5mbjcgfo5zy.subgrid(grid, ri, ci, comparator);
          updateSeen(ri, ci, result.rowspan(), result.colspan());
          return [$_78xe8wjqjcgfo589.detailnew(cell.element(), result.rowspan(), result.colspan(), cell.isNew())];
        } else {
          return [];
        }
      });
      return $_78xe8wjqjcgfo589.rowdetails(details, row.section());
    });
  };
  var toGrid = function (warehouse, generators, isNew) {
    var grid = [];
    for (var i = 0; i < warehouse.grid().rows(); i++) {
      var rowCells = [];
      for (var j = 0; j < warehouse.grid().columns(); j++) {
        var element = $_akt2xrknjcgfo5fk.getAt(warehouse, i, j).map(function (item) {
          return $_78xe8wjqjcgfo589.elementnew(item.element(), isNew);
        }).getOrThunk(function () {
          return $_78xe8wjqjcgfo589.elementnew(generators.gap(), true);
        });
        rowCells.push(element);
      }
      var row = $_78xe8wjqjcgfo589.rowcells(rowCells, warehouse.all()[i].section());
      grid.push(row);
    }
    return grid;
  };
  var $_6ghsxrmajcgfo5zq = {
    toDetails: toDetails,
    toGrid: toGrid
  };

  var setIfNot = function (element, property, value, ignore) {
    if (value === ignore)
      $_fo5ow8kfjcgfo5ds.remove(element, property);
    else
      $_fo5ow8kfjcgfo5ds.set(element, property, value);
  };
  var render$1 = function (table, grid) {
    var newRows = [];
    var newCells = [];
    var renderSection = function (gridSection, sectionName) {
      var section = $_b13w5vkkjcgfo5eo.child(table, sectionName).getOrThunk(function () {
        var tb = $_epp4kejujcgfo5a8.fromTag(sectionName, $_4k5ag6jwjcgfo5aj.owner(table).dom());
        $_9fuysnkqjcgfo5gl.append(table, tb);
        return tb;
      });
      $_9z98yykrjcgfo5go.empty(section);
      var rows = $_epd2qyjfjcgfo55m.map(gridSection, function (row) {
        if (row.isNew()) {
          newRows.push(row.element());
        }
        var tr = row.element();
        $_9z98yykrjcgfo5go.empty(tr);
        $_epd2qyjfjcgfo55m.each(row.cells(), function (cell) {
          if (cell.isNew()) {
            newCells.push(cell.element());
          }
          setIfNot(cell.element(), 'colspan', cell.colspan(), 1);
          setIfNot(cell.element(), 'rowspan', cell.rowspan(), 1);
          $_9fuysnkqjcgfo5gl.append(tr, cell.element());
        });
        return tr;
      });
      $_f1hd40ksjcgfo5gv.append(section, rows);
    };
    var removeSection = function (sectionName) {
      $_b13w5vkkjcgfo5eo.child(table, sectionName).bind($_9z98yykrjcgfo5go.remove);
    };
    var renderOrRemoveSection = function (gridSection, sectionName) {
      if (gridSection.length > 0) {
        renderSection(gridSection, sectionName);
      } else {
        removeSection(sectionName);
      }
    };
    var headSection = [];
    var bodySection = [];
    var footSection = [];
    $_epd2qyjfjcgfo55m.each(grid, function (row) {
      switch (row.section()) {
      case 'thead':
        headSection.push(row);
        break;
      case 'tbody':
        bodySection.push(row);
        break;
      case 'tfoot':
        footSection.push(row);
        break;
      }
    });
    renderOrRemoveSection(headSection, 'thead');
    renderOrRemoveSection(bodySection, 'tbody');
    renderOrRemoveSection(footSection, 'tfoot');
    return {
      newRows: $_51ccyzjhjcgfo560.constant(newRows),
      newCells: $_51ccyzjhjcgfo560.constant(newCells)
    };
  };
  var copy$2 = function (grid) {
    var rows = $_epd2qyjfjcgfo55m.map(grid, function (row) {
      var tr = $_bj8wkfkujcgfo5ia.shallow(row.element());
      $_epd2qyjfjcgfo55m.each(row.cells(), function (cell) {
        var clonedCell = $_bj8wkfkujcgfo5ia.deep(cell.element());
        setIfNot(clonedCell, 'colspan', cell.colspan(), 1);
        setIfNot(clonedCell, 'rowspan', cell.rowspan(), 1);
        $_9fuysnkqjcgfo5gl.append(tr, clonedCell);
      });
      return tr;
    });
    return rows;
  };
  var $_42fmbimdjcgfo60h = {
    render: render$1,
    copy: copy$2
  };

  var repeat = function (repititions, f) {
    var r = [];
    for (var i = 0; i < repititions; i++) {
      r.push(f(i));
    }
    return r;
  };
  var range$1 = function (start, end) {
    var r = [];
    for (var i = start; i < end; i++) {
      r.push(i);
    }
    return r;
  };
  var unique = function (xs, comparator) {
    var result = [];
    $_epd2qyjfjcgfo55m.each(xs, function (x, i) {
      if (i < xs.length - 1 && !comparator(x, xs[i + 1])) {
        result.push(x);
      } else if (i === xs.length - 1) {
        result.push(x);
      }
    });
    return result;
  };
  var deduce = function (xs, index) {
    if (index < 0 || index >= xs.length - 1)
      return $_ch5dzyjgjcgfo55s.none();
    var current = xs[index].fold(function () {
      var rest = $_epd2qyjfjcgfo55m.reverse(xs.slice(0, index));
      return $_x980jm9jcgfo5zn.findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (c) {
      return $_ch5dzyjgjcgfo55s.some({
        value: c,
        delta: 0
      });
    });
    var next = xs[index + 1].fold(function () {
      var rest = xs.slice(index + 1);
      return $_x980jm9jcgfo5zn.findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (n) {
      return $_ch5dzyjgjcgfo55s.some({
        value: n,
        delta: 1
      });
    });
    return current.bind(function (c) {
      return next.map(function (n) {
        var extras = n.delta + c.delta;
        return Math.abs(n.value - c.value) / extras;
      });
    });
  };
  var $_armk12mgjcgfo62n = {
    repeat: repeat,
    range: range$1,
    unique: unique,
    deduce: deduce
  };

  var columns = function (warehouse) {
    var grid = warehouse.grid();
    var cols = $_armk12mgjcgfo62n.range(0, grid.columns());
    var rows = $_armk12mgjcgfo62n.range(0, grid.rows());
    return $_epd2qyjfjcgfo55m.map(cols, function (col) {
      var getBlock = function () {
        return $_epd2qyjfjcgfo55m.bind(rows, function (r) {
          return $_akt2xrknjcgfo5fk.getAt(warehouse, r, col).filter(function (detail) {
            return detail.column() === col;
          }).fold($_51ccyzjhjcgfo560.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.colspan() === 1;
      };
      var getFallback = function () {
        return $_akt2xrknjcgfo5fk.getAt(warehouse, 0, col);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var decide = function (getBlock, isSingle, getFallback) {
    var inBlock = getBlock();
    var singleInBlock = $_epd2qyjfjcgfo55m.find(inBlock, isSingle);
    var detailOption = singleInBlock.orThunk(function () {
      return $_ch5dzyjgjcgfo55s.from(inBlock[0]).orThunk(getFallback);
    });
    return detailOption.map(function (detail) {
      return detail.element();
    });
  };
  var rows$1 = function (warehouse) {
    var grid = warehouse.grid();
    var rows = $_armk12mgjcgfo62n.range(0, grid.rows());
    var cols = $_armk12mgjcgfo62n.range(0, grid.columns());
    return $_epd2qyjfjcgfo55m.map(rows, function (row) {
      var getBlock = function () {
        return $_epd2qyjfjcgfo55m.bind(cols, function (c) {
          return $_akt2xrknjcgfo5fk.getAt(warehouse, row, c).filter(function (detail) {
            return detail.row() === row;
          }).fold($_51ccyzjhjcgfo560.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.rowspan() === 1;
      };
      var getFallback = function () {
        return $_akt2xrknjcgfo5fk.getAt(warehouse, row, 0);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var $_3ofvaamfjcgfo62b = {
    columns: columns,
    rows: rows$1
  };

  var col = function (column, x, y, w, h) {
    var blocker = $_epp4kejujcgfo5a8.fromTag('div');
    $_6vnepekojcgfo5fy.setAll(blocker, {
      position: 'absolute',
      left: x - w / 2 + 'px',
      top: y + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_fo5ow8kfjcgfo5ds.setAll(blocker, {
      'data-column': column,
      'role': 'presentation'
    });
    return blocker;
  };
  var row$1 = function (row, x, y, w, h) {
    var blocker = $_epp4kejujcgfo5a8.fromTag('div');
    $_6vnepekojcgfo5fy.setAll(blocker, {
      position: 'absolute',
      left: x + 'px',
      top: y - h / 2 + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_fo5ow8kfjcgfo5ds.setAll(blocker, {
      'data-row': row,
      'role': 'presentation'
    });
    return blocker;
  };
  var $_fe1l1xmhjcgfo633 = {
    col: col,
    row: row$1
  };

  var css = function (namespace) {
    var dashNamespace = namespace.replace(/\./g, '-');
    var resolve = function (str) {
      return dashNamespace + '-' + str;
    };
    return { resolve: resolve };
  };
  var $_f9fld6mjjcgfo63l = { css: css };

  var styles = $_f9fld6mjjcgfo63l.css('ephox-snooker');
  var $_5iklfpmijcgfo63f = { resolve: styles.resolve };

  var Toggler = function (turnOff, turnOn, initial) {
    var active = initial || false;
    var on = function () {
      turnOn();
      active = true;
    };
    var off = function () {
      turnOff();
      active = false;
    };
    var toggle = function () {
      var f = active ? off : on;
      f();
    };
    var isOn = function () {
      return active;
    };
    return {
      on: on,
      off: off,
      toggle: toggle,
      isOn: isOn
    };
  };

  var read = function (element, attr) {
    var value = $_fo5ow8kfjcgfo5ds.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add$2 = function (element, attr, id) {
    var old = read(element, attr);
    var nu = old.concat([id]);
    $_fo5ow8kfjcgfo5ds.set(element, attr, nu.join(' '));
  };
  var remove$5 = function (element, attr, id) {
    var nu = $_epd2qyjfjcgfo55m.filter(read(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_fo5ow8kfjcgfo5ds.set(element, attr, nu.join(' '));
    else
      $_fo5ow8kfjcgfo5ds.remove(element, attr);
  };
  var $_28wlxpmnjcgfo63y = {
    read: read,
    add: add$2,
    remove: remove$5
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$7 = function (element) {
    return $_28wlxpmnjcgfo63y.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_28wlxpmnjcgfo63y.add(element, 'class', clazz);
  };
  var remove$4 = function (element, clazz) {
    return $_28wlxpmnjcgfo63y.remove(element, 'class', clazz);
  };
  var toggle$1 = function (element, clazz) {
    if ($_epd2qyjfjcgfo55m.contains(get$7(element), clazz)) {
      remove$4(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_b7xddtmmjcgfo63t = {
    get: get$7,
    add: add$1,
    remove: remove$4,
    toggle: toggle$1,
    supports: supports
  };

  var add = function (element, clazz) {
    if ($_b7xddtmmjcgfo63t.supports(element))
      element.dom().classList.add(clazz);
    else
      $_b7xddtmmjcgfo63t.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_b7xddtmmjcgfo63t.supports(element) ? element.dom().classList : $_b7xddtmmjcgfo63t.get(element);
    if (classList.length === 0) {
      $_fo5ow8kfjcgfo5ds.remove(element, 'class');
    }
  };
  var remove$3 = function (element, clazz) {
    if ($_b7xddtmmjcgfo63t.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_b7xddtmmjcgfo63t.remove(element, clazz);
    cleanClass(element);
  };
  var toggle = function (element, clazz) {
    return $_b7xddtmmjcgfo63t.supports(element) ? element.dom().classList.toggle(clazz) : $_b7xddtmmjcgfo63t.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_b7xddtmmjcgfo63t.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_b7xddtmmjcgfo63t.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_b7xddtmmjcgfo63t.add(element, clazz);
    };
    return Toggler(off, on, has$1(element, clazz));
  };
  var has$1 = function (element, clazz) {
    return $_b7xddtmmjcgfo63t.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_18cpvgmkjcgfo63o = {
    add: add,
    remove: remove$3,
    toggle: toggle,
    toggler: toggler,
    has: has$1
  };

  var resizeBar = $_5iklfpmijcgfo63f.resolve('resizer-bar');
  var resizeRowBar = $_5iklfpmijcgfo63f.resolve('resizer-rows');
  var resizeColBar = $_5iklfpmijcgfo63f.resolve('resizer-cols');
  var BAR_THICKNESS = 7;
  var clear = function (wire) {
    var previous = $_cc9vyekhjcgfo5e9.descendants(wire.parent(), '.' + resizeBar);
    $_epd2qyjfjcgfo55m.each(previous, $_9z98yykrjcgfo5go.remove);
  };
  var drawBar = function (wire, positions, create) {
    var origin = wire.origin();
    $_epd2qyjfjcgfo55m.each(positions, function (cpOption, i) {
      cpOption.each(function (cp) {
        var bar = create(origin, cp);
        $_18cpvgmkjcgfo63o.add(bar, resizeBar);
        $_9fuysnkqjcgfo5gl.append(wire.parent(), bar);
      });
    });
  };
  var refreshCol = function (wire, colPositions, position, tableHeight) {
    drawBar(wire, colPositions, function (origin, cp) {
      var colBar = $_fe1l1xmhjcgfo633.col(cp.col(), cp.x() - origin.left(), position.top() - origin.top(), BAR_THICKNESS, tableHeight);
      $_18cpvgmkjcgfo63o.add(colBar, resizeColBar);
      return colBar;
    });
  };
  var refreshRow = function (wire, rowPositions, position, tableWidth) {
    drawBar(wire, rowPositions, function (origin, cp) {
      var rowBar = $_fe1l1xmhjcgfo633.row(cp.row(), position.left() - origin.left(), cp.y() - origin.top(), tableWidth, BAR_THICKNESS);
      $_18cpvgmkjcgfo63o.add(rowBar, resizeRowBar);
      return rowBar;
    });
  };
  var refreshGrid = function (wire, table, rows, cols, hdirection, vdirection) {
    var position = $_d1l3b5lwjcgfo5vb.absolute(table);
    var rowPositions = rows.length > 0 ? hdirection.positions(rows, table) : [];
    refreshRow(wire, rowPositions, position, $_5r9oetlsjcgfo5uc.getOuter(table));
    var colPositions = cols.length > 0 ? vdirection.positions(cols, table) : [];
    refreshCol(wire, colPositions, position, $_5f87mrlqjcgfo5u1.getOuter(table));
  };
  var refresh = function (wire, table, hdirection, vdirection) {
    clear(wire);
    var list = $_fk3v3bjpjcgfo57r.fromTable(table);
    var warehouse = $_akt2xrknjcgfo5fk.generate(list);
    var rows = $_3ofvaamfjcgfo62b.rows(warehouse);
    var cols = $_3ofvaamfjcgfo62b.columns(warehouse);
    refreshGrid(wire, table, rows, cols, hdirection, vdirection);
  };
  var each$2 = function (wire, f) {
    var bars = $_cc9vyekhjcgfo5e9.descendants(wire.parent(), '.' + resizeBar);
    $_epd2qyjfjcgfo55m.each(bars, f);
  };
  var hide = function (wire) {
    each$2(wire, function (bar) {
      $_6vnepekojcgfo5fy.set(bar, 'display', 'none');
    });
  };
  var show = function (wire) {
    each$2(wire, function (bar) {
      $_6vnepekojcgfo5fy.set(bar, 'display', 'block');
    });
  };
  var isRowBar = function (element) {
    return $_18cpvgmkjcgfo63o.has(element, resizeRowBar);
  };
  var isColBar = function (element) {
    return $_18cpvgmkjcgfo63o.has(element, resizeColBar);
  };
  var $_bp4qrbmejcgfo61f = {
    refresh: refresh,
    hide: hide,
    show: show,
    destroy: clear,
    isRowBar: isRowBar,
    isColBar: isColBar
  };

  var fromWarehouse = function (warehouse, generators) {
    return $_6ghsxrmajcgfo5zq.toGrid(warehouse, generators, false);
  };
  var deriveRows = function (rendered, generators) {
    var findRow = function (details) {
      var rowOfCells = $_x980jm9jcgfo5zn.findMap(details, function (detail) {
        return $_4k5ag6jwjcgfo5aj.parent(detail.element()).map(function (row) {
          var isNew = $_4k5ag6jwjcgfo5aj.parent(row).isNone();
          return $_78xe8wjqjcgfo589.elementnew(row, isNew);
        });
      });
      return rowOfCells.getOrThunk(function () {
        return $_78xe8wjqjcgfo589.elementnew(generators.row(), true);
      });
    };
    return $_epd2qyjfjcgfo55m.map(rendered, function (details) {
      var row = findRow(details.details());
      return $_78xe8wjqjcgfo589.rowdatanew(row.element(), details.details(), details.section(), row.isNew());
    });
  };
  var toDetailList = function (grid, generators) {
    var rendered = $_6ghsxrmajcgfo5zq.toDetails(grid, $_1miv10jyjcgfo5b7.eq);
    return deriveRows(rendered, generators);
  };
  var findInWarehouse = function (warehouse, element) {
    var all = $_epd2qyjfjcgfo55m.flatten($_epd2qyjfjcgfo55m.map(warehouse.all(), function (r) {
      return r.cells();
    }));
    return $_epd2qyjfjcgfo55m.find(all, function (e) {
      return $_1miv10jyjcgfo5b7.eq(element, e.element());
    });
  };
  var run = function (operation, extract, adjustment, postAction, genWrappers) {
    return function (wire, table, target, generators, direction) {
      var input = $_fk3v3bjpjcgfo57r.fromTable(table);
      var warehouse = $_akt2xrknjcgfo5fk.generate(input);
      var output = extract(warehouse, target).map(function (info) {
        var model = fromWarehouse(warehouse, generators);
        var result = operation(model, info, $_1miv10jyjcgfo5b7.eq, genWrappers(generators));
        var grid = toDetailList(result.grid(), generators);
        return {
          grid: $_51ccyzjhjcgfo560.constant(grid),
          cursor: result.cursor
        };
      });
      return output.fold(function () {
        return $_ch5dzyjgjcgfo55s.none();
      }, function (out) {
        var newElements = $_42fmbimdjcgfo60h.render(table, out.grid());
        adjustment(table, out.grid(), direction);
        postAction(table);
        $_bp4qrbmejcgfo61f.refresh(wire, table, $_f2292ulvjcgfo5uj.height, direction);
        return $_ch5dzyjgjcgfo55s.some({
          cursor: out.cursor,
          newRows: newElements.newRows,
          newCells: newElements.newCells
        });
      });
    };
  };
  var onCell = function (warehouse, target) {
    return $_7pxq74jrjcgfo58f.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell);
    });
  };
  var onPaste = function (warehouse, target) {
    return $_7pxq74jrjcgfo58f.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell).map(function (details) {
        return $_1q2omim8jcgfo5zk.merge(details, {
          generators: target.generators,
          clipboard: target.clipboard
        });
      });
    });
  };
  var onPasteRows = function (warehouse, target) {
    var details = $_epd2qyjfjcgfo55m.map(target.selection(), function (cell) {
      return $_7pxq74jrjcgfo58f.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_x980jm9jcgfo5zn.cat(details);
    return cells.length > 0 ? $_ch5dzyjgjcgfo55s.some($_1q2omim8jcgfo5zk.merge({ cells: cells }, {
      generators: target.generators,
      clipboard: target.clipboard
    })) : $_ch5dzyjgjcgfo55s.none();
  };
  var onMergable = function (warehouse, target) {
    return target.mergable();
  };
  var onUnmergable = function (warehouse, target) {
    return target.unmergable();
  };
  var onCells = function (warehouse, target) {
    var details = $_epd2qyjfjcgfo55m.map(target.selection(), function (cell) {
      return $_7pxq74jrjcgfo58f.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_x980jm9jcgfo5zn.cat(details);
    return cells.length > 0 ? $_ch5dzyjgjcgfo55s.some(cells) : $_ch5dzyjgjcgfo55s.none();
  };
  var $_7s3ap8m7jcgfo5yt = {
    run: run,
    toDetailList: toDetailList,
    onCell: onCell,
    onCells: onCells,
    onPaste: onPaste,
    onPasteRows: onPasteRows,
    onMergable: onMergable,
    onUnmergable: onUnmergable
  };

  var value$1 = function (o) {
    var is = function (v) {
      return o === v;
    };
    var or = function (opt) {
      return value$1(o);
    };
    var orThunk = function (f) {
      return value$1(o);
    };
    var map = function (f) {
      return value$1(f(o));
    };
    var each = function (f) {
      f(o);
    };
    var bind = function (f) {
      return f(o);
    };
    var fold = function (_, onValue) {
      return onValue(o);
    };
    var exists = function (f) {
      return f(o);
    };
    var forall = function (f) {
      return f(o);
    };
    var toOption = function () {
      return $_ch5dzyjgjcgfo55s.some(o);
    };
    return {
      is: is,
      isValue: $_51ccyzjhjcgfo560.constant(true),
      isError: $_51ccyzjhjcgfo560.constant(false),
      getOr: $_51ccyzjhjcgfo560.constant(o),
      getOrThunk: $_51ccyzjhjcgfo560.constant(o),
      getOrDie: $_51ccyzjhjcgfo560.constant(o),
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: each,
      bind: bind,
      exists: exists,
      forall: forall,
      toOption: toOption
    };
  };
  var error = function (message) {
    var getOrThunk = function (f) {
      return f();
    };
    var getOrDie = function () {
      return $_51ccyzjhjcgfo560.die(message)();
    };
    var or = function (opt) {
      return opt;
    };
    var orThunk = function (f) {
      return f();
    };
    var map = function (f) {
      return error(message);
    };
    var bind = function (f) {
      return error(message);
    };
    var fold = function (onError, _) {
      return onError(message);
    };
    return {
      is: $_51ccyzjhjcgfo560.constant(false),
      isValue: $_51ccyzjhjcgfo560.constant(false),
      isError: $_51ccyzjhjcgfo560.constant(true),
      getOr: $_51ccyzjhjcgfo560.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_51ccyzjhjcgfo560.noop,
      bind: bind,
      exists: $_51ccyzjhjcgfo560.constant(false),
      forall: $_51ccyzjhjcgfo560.constant(true),
      toOption: $_ch5dzyjgjcgfo55s.none
    };
  };
  var $_g1onwamqjcgfo64p = {
    value: value$1,
    error: error
  };

  var measure = function (startAddress, gridA, gridB) {
    if (startAddress.row() >= gridA.length || startAddress.column() > $_2ui618mcjcgfo60b.cellLength(gridA[0]))
      return $_g1onwamqjcgfo64p.error('invalid start address out of table bounds, row: ' + startAddress.row() + ', column: ' + startAddress.column());
    var rowRemainder = gridA.slice(startAddress.row());
    var colRemainder = rowRemainder[0].cells().slice(startAddress.column());
    var colRequired = $_2ui618mcjcgfo60b.cellLength(gridB[0]);
    var rowRequired = gridB.length;
    return $_g1onwamqjcgfo64p.value({
      rowDelta: $_51ccyzjhjcgfo560.constant(rowRemainder.length - rowRequired),
      colDelta: $_51ccyzjhjcgfo560.constant(colRemainder.length - colRequired)
    });
  };
  var measureWidth = function (gridA, gridB) {
    var colLengthA = $_2ui618mcjcgfo60b.cellLength(gridA[0]);
    var colLengthB = $_2ui618mcjcgfo60b.cellLength(gridB[0]);
    return {
      rowDelta: $_51ccyzjhjcgfo560.constant(0),
      colDelta: $_51ccyzjhjcgfo560.constant(colLengthA - colLengthB)
    };
  };
  var fill = function (cells, generator) {
    return $_epd2qyjfjcgfo55m.map(cells, function () {
      return $_78xe8wjqjcgfo589.elementnew(generator.cell(), true);
    });
  };
  var rowFill = function (grid, amount, generator) {
    return grid.concat($_armk12mgjcgfo62n.repeat(amount, function (_row) {
      return $_2ui618mcjcgfo60b.setCells(grid[grid.length - 1], fill(grid[grid.length - 1].cells(), generator));
    }));
  };
  var colFill = function (grid, amount, generator) {
    return $_epd2qyjfjcgfo55m.map(grid, function (row) {
      return $_2ui618mcjcgfo60b.setCells(row, row.cells().concat(fill($_armk12mgjcgfo62n.range(0, amount), generator)));
    });
  };
  var tailor = function (gridA, delta, generator) {
    var fillCols = delta.colDelta() < 0 ? colFill : $_51ccyzjhjcgfo560.identity;
    var fillRows = delta.rowDelta() < 0 ? rowFill : $_51ccyzjhjcgfo560.identity;
    var modifiedCols = fillCols(gridA, Math.abs(delta.colDelta()), generator);
    var tailoredGrid = fillRows(modifiedCols, Math.abs(delta.rowDelta()), generator);
    return tailoredGrid;
  };
  var $_6us129mpjcgfo64b = {
    measure: measure,
    measureWidth: measureWidth,
    tailor: tailor
  };

  var merge$3 = function (grid, bounds, comparator, substitution) {
    if (grid.length === 0)
      return grid;
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        $_2ui618mcjcgfo60b.mutateCell(grid[i], j, $_78xe8wjqjcgfo589.elementnew(substitution(), false));
      }
    }
    return grid;
  };
  var unmerge = function (grid, target, comparator, substitution) {
    var first = true;
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < $_2ui618mcjcgfo60b.cellLength(grid[0]); j++) {
        var current = $_2ui618mcjcgfo60b.getCellElement(grid[i], j);
        var isToReplace = comparator(current, target);
        if (isToReplace === true && first === false) {
          $_2ui618mcjcgfo60b.mutateCell(grid[i], j, $_78xe8wjqjcgfo589.elementnew(substitution(), true));
        } else if (isToReplace === true) {
          first = false;
        }
      }
    }
    return grid;
  };
  var uniqueCells = function (row, comparator) {
    return $_epd2qyjfjcgfo55m.foldl(row, function (rest, cell) {
      return $_epd2qyjfjcgfo55m.exists(rest, function (currentCell) {
        return comparator(currentCell.element(), cell.element());
      }) ? rest : rest.concat([cell]);
    }, []);
  };
  var splitRows = function (grid, index, comparator, substitution) {
    if (index > 0 && index < grid.length) {
      var rowPrevCells = grid[index - 1].cells();
      var cells = uniqueCells(rowPrevCells, comparator);
      $_epd2qyjfjcgfo55m.each(cells, function (cell) {
        var replacement = $_ch5dzyjgjcgfo55s.none();
        for (var i = index; i < grid.length; i++) {
          for (var j = 0; j < $_2ui618mcjcgfo60b.cellLength(grid[0]); j++) {
            var current = grid[i].cells()[j];
            var isToReplace = comparator(current.element(), cell.element());
            if (isToReplace) {
              if (replacement.isNone()) {
                replacement = $_ch5dzyjgjcgfo55s.some(substitution());
              }
              replacement.each(function (sub) {
                $_2ui618mcjcgfo60b.mutateCell(grid[i], j, $_78xe8wjqjcgfo589.elementnew(sub, true));
              });
            }
          }
        }
      });
    }
    return grid;
  };
  var $_e9wgutmrjcgfo64s = {
    merge: merge$3,
    unmerge: unmerge,
    splitRows: splitRows
  };

  var isSpanning = function (grid, row, col, comparator) {
    var candidate = $_2ui618mcjcgfo60b.getCell(grid[row], col);
    var matching = $_51ccyzjhjcgfo560.curry(comparator, candidate.element());
    var currentRow = grid[row];
    return grid.length > 1 && $_2ui618mcjcgfo60b.cellLength(currentRow) > 1 && (col > 0 && matching($_2ui618mcjcgfo60b.getCellElement(currentRow, col - 1)) || col < currentRow.length - 1 && matching($_2ui618mcjcgfo60b.getCellElement(currentRow, col + 1)) || row > 0 && matching($_2ui618mcjcgfo60b.getCellElement(grid[row - 1], col)) || row < grid.length - 1 && matching($_2ui618mcjcgfo60b.getCellElement(grid[row + 1], col)));
  };
  var mergeTables = function (startAddress, gridA, gridB, generator, comparator) {
    var startRow = startAddress.row();
    var startCol = startAddress.column();
    var mergeHeight = gridB.length;
    var mergeWidth = $_2ui618mcjcgfo60b.cellLength(gridB[0]);
    var endRow = startRow + mergeHeight;
    var endCol = startCol + mergeWidth;
    for (var r = startRow; r < endRow; r++) {
      for (var c = startCol; c < endCol; c++) {
        if (isSpanning(gridA, r, c, comparator)) {
          $_e9wgutmrjcgfo64s.unmerge(gridA, $_2ui618mcjcgfo60b.getCellElement(gridA[r], c), comparator, generator.cell);
        }
        var newCell = $_2ui618mcjcgfo60b.getCellElement(gridB[r - startRow], c - startCol);
        var replacement = generator.replace(newCell);
        $_2ui618mcjcgfo60b.mutateCell(gridA[r], c, $_78xe8wjqjcgfo589.elementnew(replacement, true));
      }
    }
    return gridA;
  };
  var merge$2 = function (startAddress, gridA, gridB, generator, comparator) {
    var result = $_6us129mpjcgfo64b.measure(startAddress, gridA, gridB);
    return result.map(function (delta) {
      var fittedGrid = $_6us129mpjcgfo64b.tailor(gridA, delta, generator);
      return mergeTables(startAddress, fittedGrid, gridB, generator, comparator);
    });
  };
  var insert$1 = function (index, gridA, gridB, generator, comparator) {
    $_e9wgutmrjcgfo64s.splitRows(gridA, index, comparator, generator.cell);
    var delta = $_6us129mpjcgfo64b.measureWidth(gridB, gridA);
    var fittedNewGrid = $_6us129mpjcgfo64b.tailor(gridB, delta, generator);
    var secondDelta = $_6us129mpjcgfo64b.measureWidth(gridA, fittedNewGrid);
    var fittedOldGrid = $_6us129mpjcgfo64b.tailor(gridA, secondDelta, generator);
    return fittedOldGrid.slice(0, index).concat(fittedNewGrid).concat(fittedOldGrid.slice(index, fittedOldGrid.length));
  };
  var $_6pkc15mojcgfo645 = {
    merge: merge$2,
    insert: insert$1
  };

  var insertRowAt = function (grid, index, example, comparator, substitution) {
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_2ui618mcjcgfo60b.mapCells(grid[example], function (ex, c) {
      var withinSpan = index > 0 && index < grid.length && comparator($_2ui618mcjcgfo60b.getCellElement(grid[index - 1], c), $_2ui618mcjcgfo60b.getCellElement(grid[index], c));
      var ret = withinSpan ? $_2ui618mcjcgfo60b.getCell(grid[index], c) : $_78xe8wjqjcgfo589.elementnew(substitution(ex.element(), comparator), true);
      return ret;
    });
    return before.concat([between]).concat(after);
  };
  var insertColumnAt = function (grid, index, example, comparator, substitution) {
    return $_epd2qyjfjcgfo55m.map(grid, function (row) {
      var withinSpan = index > 0 && index < $_2ui618mcjcgfo60b.cellLength(row) && comparator($_2ui618mcjcgfo60b.getCellElement(row, index - 1), $_2ui618mcjcgfo60b.getCellElement(row, index));
      var sub = withinSpan ? $_2ui618mcjcgfo60b.getCell(row, index) : $_78xe8wjqjcgfo589.elementnew(substitution($_2ui618mcjcgfo60b.getCellElement(row, example), comparator), true);
      return $_2ui618mcjcgfo60b.addCell(row, index, sub);
    });
  };
  var splitCellIntoColumns$1 = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleCol + 1;
    return $_epd2qyjfjcgfo55m.map(grid, function (row, i) {
      var isTargetCell = i === exampleRow;
      var sub = isTargetCell ? $_78xe8wjqjcgfo589.elementnew(substitution($_2ui618mcjcgfo60b.getCellElement(row, exampleCol), comparator), true) : $_2ui618mcjcgfo60b.getCell(row, exampleCol);
      return $_2ui618mcjcgfo60b.addCell(row, index, sub);
    });
  };
  var splitCellIntoRows$1 = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleRow + 1;
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_2ui618mcjcgfo60b.mapCells(grid[exampleRow], function (ex, i) {
      var isTargetCell = i === exampleCol;
      return isTargetCell ? $_78xe8wjqjcgfo589.elementnew(substitution(ex.element(), comparator), true) : ex;
    });
    return before.concat([between]).concat(after);
  };
  var deleteColumnsAt = function (grid, start, finish) {
    var rows = $_epd2qyjfjcgfo55m.map(grid, function (row) {
      var cells = row.cells().slice(0, start).concat(row.cells().slice(finish + 1));
      return $_78xe8wjqjcgfo589.rowcells(cells, row.section());
    });
    return $_epd2qyjfjcgfo55m.filter(rows, function (row) {
      return row.cells().length > 0;
    });
  };
  var deleteRowsAt = function (grid, start, finish) {
    return grid.slice(0, start).concat(grid.slice(finish + 1));
  };
  var $_5mj7qqmsjcgfo652 = {
    insertRowAt: insertRowAt,
    insertColumnAt: insertColumnAt,
    splitCellIntoColumns: splitCellIntoColumns$1,
    splitCellIntoRows: splitCellIntoRows$1,
    deleteRowsAt: deleteRowsAt,
    deleteColumnsAt: deleteColumnsAt
  };

  var replaceIn = function (grid, targets, comparator, substitution) {
    var isTarget = function (cell) {
      return $_epd2qyjfjcgfo55m.exists(targets, function (target) {
        return comparator(cell.element(), target.element());
      });
    };
    return $_epd2qyjfjcgfo55m.map(grid, function (row) {
      return $_2ui618mcjcgfo60b.mapCells(row, function (cell) {
        return isTarget(cell) ? $_78xe8wjqjcgfo589.elementnew(substitution(cell.element(), comparator), true) : cell;
      });
    });
  };
  var notStartRow = function (grid, rowIndex, colIndex, comparator) {
    return $_2ui618mcjcgfo60b.getCellElement(grid[rowIndex], colIndex) !== undefined && (rowIndex > 0 && comparator($_2ui618mcjcgfo60b.getCellElement(grid[rowIndex - 1], colIndex), $_2ui618mcjcgfo60b.getCellElement(grid[rowIndex], colIndex)));
  };
  var notStartColumn = function (row, index, comparator) {
    return index > 0 && comparator($_2ui618mcjcgfo60b.getCellElement(row, index - 1), $_2ui618mcjcgfo60b.getCellElement(row, index));
  };
  var replaceColumn = function (grid, index, comparator, substitution) {
    var targets = $_epd2qyjfjcgfo55m.bind(grid, function (row, i) {
      var alreadyAdded = notStartRow(grid, i, index, comparator) || notStartColumn(row, index, comparator);
      return alreadyAdded ? [] : [$_2ui618mcjcgfo60b.getCell(row, index)];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var replaceRow = function (grid, index, comparator, substitution) {
    var targetRow = grid[index];
    var targets = $_epd2qyjfjcgfo55m.bind(targetRow.cells(), function (item, i) {
      var alreadyAdded = notStartRow(grid, index, i, comparator) || notStartColumn(targetRow, i, comparator);
      return alreadyAdded ? [] : [item];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var $_8j69lymtjcgfo659 = {
    replaceColumn: replaceColumn,
    replaceRow: replaceRow
  };

  var none$1 = function () {
    return folder(function (n, o, l, m, r) {
      return n();
    });
  };
  var only = function (index) {
    return folder(function (n, o, l, m, r) {
      return o(index);
    });
  };
  var left = function (index, next) {
    return folder(function (n, o, l, m, r) {
      return l(index, next);
    });
  };
  var middle = function (prev, index, next) {
    return folder(function (n, o, l, m, r) {
      return m(prev, index, next);
    });
  };
  var right = function (prev, index) {
    return folder(function (n, o, l, m, r) {
      return r(prev, index);
    });
  };
  var folder = function (fold) {
    return { fold: fold };
  };
  var $_bbtdjamwjcgfo660 = {
    none: none$1,
    only: only,
    left: left,
    middle: middle,
    right: right
  };

  var neighbours$1 = function (input, index) {
    if (input.length === 0)
      return $_bbtdjamwjcgfo660.none();
    if (input.length === 1)
      return $_bbtdjamwjcgfo660.only(0);
    if (index === 0)
      return $_bbtdjamwjcgfo660.left(0, 1);
    if (index === input.length - 1)
      return $_bbtdjamwjcgfo660.right(index - 1, index);
    if (index > 0 && index < input.length - 1)
      return $_bbtdjamwjcgfo660.middle(index - 1, index, index + 1);
    return $_bbtdjamwjcgfo660.none();
  };
  var determine = function (input, column, step, tableSize) {
    var result = input.slice(0);
    var context = neighbours$1(input, column);
    var zero = function (array) {
      return $_epd2qyjfjcgfo55m.map(array, $_51ccyzjhjcgfo560.constant(0));
    };
    var onNone = $_51ccyzjhjcgfo560.constant(zero(result));
    var onOnly = function (index) {
      return tableSize.singleColumnWidth(result[index], step);
    };
    var onChange = function (index, next) {
      if (step >= 0) {
        var newNext = Math.max(tableSize.minCellWidth(), result[next] - step);
        return zero(result.slice(0, index)).concat([
          step,
          newNext - result[next]
        ]).concat(zero(result.slice(next + 1)));
      } else {
        var newThis = Math.max(tableSize.minCellWidth(), result[index] + step);
        var diffx = result[index] - newThis;
        return zero(result.slice(0, index)).concat([
          newThis - result[index],
          diffx
        ]).concat(zero(result.slice(next + 1)));
      }
    };
    var onLeft = onChange;
    var onMiddle = function (prev, index, next) {
      return onChange(index, next);
    };
    var onRight = function (prev, index) {
      if (step >= 0) {
        return zero(result.slice(0, index)).concat([step]);
      } else {
        var size = Math.max(tableSize.minCellWidth(), result[index] + step);
        return zero(result.slice(0, index)).concat([size - result[index]]);
      }
    };
    return context.fold(onNone, onOnly, onLeft, onMiddle, onRight);
  };
  var $_7zeqm2mvjcgfo65r = { determine: determine };

  var getSpan$1 = function (cell, type) {
    return $_fo5ow8kfjcgfo5ds.has(cell, type) && parseInt($_fo5ow8kfjcgfo5ds.get(cell, type), 10) > 1;
  };
  var hasColspan = function (cell) {
    return getSpan$1(cell, 'colspan');
  };
  var hasRowspan = function (cell) {
    return getSpan$1(cell, 'rowspan');
  };
  var getInt = function (element, property) {
    return parseInt($_6vnepekojcgfo5fy.get(element, property), 10);
  };
  var $_agj76gmyjcgfo66h = {
    hasColspan: hasColspan,
    hasRowspan: hasRowspan,
    minWidth: $_51ccyzjhjcgfo560.constant(10),
    minHeight: $_51ccyzjhjcgfo560.constant(10),
    getInt: getInt
  };

  var getRaw$1 = function (cell, property, getter) {
    return $_6vnepekojcgfo5fy.getRaw(cell, property).fold(function () {
      return getter(cell) + 'px';
    }, function (raw) {
      return raw;
    });
  };
  var getRawW = function (cell) {
    return getRaw$1(cell, 'width', $_7s0dsmlojcgfo5sq.getPixelWidth);
  };
  var getRawH = function (cell) {
    return getRaw$1(cell, 'height', $_7s0dsmlojcgfo5sq.getHeight);
  };
  var getWidthFrom = function (warehouse, direction, getWidth, fallback, tableSize) {
    var columns = $_3ofvaamfjcgfo62b.columns(warehouse);
    var backups = $_epd2qyjfjcgfo55m.map(columns, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_epd2qyjfjcgfo55m.map(columns, function (cellOption, c) {
      var columnCell = cellOption.filter($_51ccyzjhjcgfo560.not($_agj76gmyjcgfo66h.hasColspan));
      return columnCell.fold(function () {
        var deduced = $_armk12mgjcgfo62n.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getWidth(cell, tableSize);
      });
    });
  };
  var getDeduced = function (deduced) {
    return deduced.map(function (d) {
      return d + 'px';
    }).getOr('');
  };
  var getRawWidths = function (warehouse, direction) {
    return getWidthFrom(warehouse, direction, getRawW, getDeduced);
  };
  var getPercentageWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_7s0dsmlojcgfo5sq.getPercentageWidth, function (deduced) {
      return deduced.fold(function () {
        return tableSize.minCellWidth();
      }, function (cellWidth) {
        return cellWidth / tableSize.pixelWidth() * 100;
      });
    }, tableSize);
  };
  var getPixelWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_7s0dsmlojcgfo5sq.getPixelWidth, function (deduced) {
      return deduced.getOrThunk(tableSize.minCellWidth);
    }, tableSize);
  };
  var getHeightFrom = function (warehouse, direction, getHeight, fallback) {
    var rows = $_3ofvaamfjcgfo62b.rows(warehouse);
    var backups = $_epd2qyjfjcgfo55m.map(rows, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_epd2qyjfjcgfo55m.map(rows, function (cellOption, c) {
      var rowCell = cellOption.filter($_51ccyzjhjcgfo560.not($_agj76gmyjcgfo66h.hasRowspan));
      return rowCell.fold(function () {
        var deduced = $_armk12mgjcgfo62n.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getHeight(cell);
      });
    });
  };
  var getPixelHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, $_7s0dsmlojcgfo5sq.getHeight, function (deduced) {
      return deduced.getOrThunk($_agj76gmyjcgfo66h.minHeight);
    });
  };
  var getRawHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, getRawH, getDeduced);
  };
  var $_9i473vmxjcgfo663 = {
    getRawWidths: getRawWidths,
    getPixelWidths: getPixelWidths,
    getPercentageWidths: getPercentageWidths,
    getPixelHeights: getPixelHeights,
    getRawHeights: getRawHeights
  };

  var total = function (start, end, measures) {
    var r = 0;
    for (var i = start; i < end; i++) {
      r += measures[i] !== undefined ? measures[i] : 0;
    }
    return r;
  };
  var recalculateWidth = function (warehouse, widths) {
    var all = $_akt2xrknjcgfo5fk.justCells(warehouse);
    return $_epd2qyjfjcgfo55m.map(all, function (cell) {
      var width = total(cell.column(), cell.column() + cell.colspan(), widths);
      return {
        element: cell.element,
        width: $_51ccyzjhjcgfo560.constant(width),
        colspan: cell.colspan
      };
    });
  };
  var recalculateHeight = function (warehouse, heights) {
    var all = $_akt2xrknjcgfo5fk.justCells(warehouse);
    return $_epd2qyjfjcgfo55m.map(all, function (cell) {
      var height = total(cell.row(), cell.row() + cell.rowspan(), heights);
      return {
        element: cell.element,
        height: $_51ccyzjhjcgfo560.constant(height),
        rowspan: cell.rowspan
      };
    });
  };
  var matchRowHeight = function (warehouse, heights) {
    return $_epd2qyjfjcgfo55m.map(warehouse.all(), function (row, i) {
      return {
        element: row.element,
        height: $_51ccyzjhjcgfo560.constant(heights[i])
      };
    });
  };
  var $_azi6v0mzjcgfo66t = {
    recalculateWidth: recalculateWidth,
    recalculateHeight: recalculateHeight,
    matchRowHeight: matchRowHeight
  };

  var percentageSize = function (width, element) {
    var floatWidth = parseFloat(width);
    var pixelWidth = $_5r9oetlsjcgfo5uc.get(element);
    var getCellDelta = function (delta) {
      return delta / pixelWidth * 100;
    };
    var singleColumnWidth = function (width, _delta) {
      return [100 - width];
    };
    var minCellWidth = function () {
      return $_agj76gmyjcgfo66h.minWidth() / pixelWidth * 100;
    };
    var setTableWidth = function (table, _newWidths, delta) {
      var total = floatWidth + delta;
      $_7s0dsmlojcgfo5sq.setPercentageWidth(table, total);
    };
    return {
      width: $_51ccyzjhjcgfo560.constant(floatWidth),
      pixelWidth: $_51ccyzjhjcgfo560.constant(pixelWidth),
      getWidths: $_9i473vmxjcgfo663.getPercentageWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: minCellWidth,
      setElementWidth: $_7s0dsmlojcgfo5sq.setPercentageWidth,
      setTableWidth: setTableWidth
    };
  };
  var pixelSize = function (width) {
    var intWidth = parseInt(width, 10);
    var getCellDelta = $_51ccyzjhjcgfo560.identity;
    var singleColumnWidth = function (width, delta) {
      var newNext = Math.max($_agj76gmyjcgfo66h.minWidth(), width + delta);
      return [newNext - width];
    };
    var setTableWidth = function (table, newWidths, _delta) {
      var total = $_epd2qyjfjcgfo55m.foldr(newWidths, function (b, a) {
        return b + a;
      }, 0);
      $_7s0dsmlojcgfo5sq.setPixelWidth(table, total);
    };
    return {
      width: $_51ccyzjhjcgfo560.constant(intWidth),
      pixelWidth: $_51ccyzjhjcgfo560.constant(intWidth),
      getWidths: $_9i473vmxjcgfo663.getPixelWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: $_agj76gmyjcgfo66h.minWidth,
      setElementWidth: $_7s0dsmlojcgfo5sq.setPixelWidth,
      setTableWidth: setTableWidth
    };
  };
  var chooseSize = function (element, width) {
    if ($_7s0dsmlojcgfo5sq.percentageBasedSizeRegex().test(width)) {
      var percentMatch = $_7s0dsmlojcgfo5sq.percentageBasedSizeRegex().exec(width);
      return percentageSize(percentMatch[1], element);
    } else if ($_7s0dsmlojcgfo5sq.pixelBasedSizeRegex().test(width)) {
      var pixelMatch = $_7s0dsmlojcgfo5sq.pixelBasedSizeRegex().exec(width);
      return pixelSize(pixelMatch[1]);
    } else {
      var fallbackWidth = $_5r9oetlsjcgfo5uc.get(element);
      return pixelSize(fallbackWidth);
    }
  };
  var getTableSize = function (element) {
    var width = $_7s0dsmlojcgfo5sq.getRawWidth(element);
    return width.fold(function () {
      var fallbackWidth = $_5r9oetlsjcgfo5uc.get(element);
      return pixelSize(fallbackWidth);
    }, function (width) {
      return chooseSize(element, width);
    });
  };
  var $_dhnoygn0jcgfo673 = { getTableSize: getTableSize };

  var getWarehouse$1 = function (list) {
    return $_akt2xrknjcgfo5fk.generate(list);
  };
  var sumUp = function (newSize) {
    return $_epd2qyjfjcgfo55m.foldr(newSize, function (b, a) {
      return b + a;
    }, 0);
  };
  var getTableWarehouse = function (table) {
    var list = $_fk3v3bjpjcgfo57r.fromTable(table);
    return getWarehouse$1(list);
  };
  var adjustWidth = function (table, delta, index, direction) {
    var tableSize = $_dhnoygn0jcgfo673.getTableSize(table);
    var step = tableSize.getCellDelta(delta);
    var warehouse = getTableWarehouse(table);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var deltas = $_7zeqm2mvjcgfo65r.determine(widths, index, step, tableSize);
    var newWidths = $_epd2qyjfjcgfo55m.map(deltas, function (dx, i) {
      return dx + widths[i];
    });
    var newSizes = $_azi6v0mzjcgfo66t.recalculateWidth(warehouse, newWidths);
    $_epd2qyjfjcgfo55m.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    if (index === warehouse.grid().columns() - 1) {
      tableSize.setTableWidth(table, newWidths, step);
    }
  };
  var adjustHeight = function (table, delta, index, direction) {
    var warehouse = getTableWarehouse(table);
    var heights = $_9i473vmxjcgfo663.getPixelHeights(warehouse, direction);
    var newHeights = $_epd2qyjfjcgfo55m.map(heights, function (dy, i) {
      return index === i ? Math.max(delta + dy, $_agj76gmyjcgfo66h.minHeight()) : dy;
    });
    var newCellSizes = $_azi6v0mzjcgfo66t.recalculateHeight(warehouse, newHeights);
    var newRowSizes = $_azi6v0mzjcgfo66t.matchRowHeight(warehouse, newHeights);
    $_epd2qyjfjcgfo55m.each(newRowSizes, function (row) {
      $_7s0dsmlojcgfo5sq.setHeight(row.element(), row.height());
    });
    $_epd2qyjfjcgfo55m.each(newCellSizes, function (cell) {
      $_7s0dsmlojcgfo5sq.setHeight(cell.element(), cell.height());
    });
    var total = sumUp(newHeights);
    $_7s0dsmlojcgfo5sq.setHeight(table, total);
  };
  var adjustWidthTo = function (table, list, direction) {
    var tableSize = $_dhnoygn0jcgfo673.getTableSize(table);
    var warehouse = getWarehouse$1(list);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var newSizes = $_azi6v0mzjcgfo66t.recalculateWidth(warehouse, widths);
    $_epd2qyjfjcgfo55m.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    var total = $_epd2qyjfjcgfo55m.foldr(widths, function (b, a) {
      return a + b;
    }, 0);
    if (newSizes.length > 0) {
      tableSize.setElementWidth(table, total);
    }
  };
  var $_4gbrhmujcgfo65g = {
    adjustWidth: adjustWidth,
    adjustHeight: adjustHeight,
    adjustWidthTo: adjustWidthTo
  };

  var prune = function (table) {
    var cells = $_7pxq74jrjcgfo58f.cells(table);
    if (cells.length === 0)
      $_9z98yykrjcgfo5go.remove(table);
  };
  var outcome = $_6w2qyfjkjcgfo57c.immutable('grid', 'cursor');
  var elementFromGrid = function (grid, row, column) {
    return findIn(grid, row, column).orThunk(function () {
      return findIn(grid, 0, 0);
    });
  };
  var findIn = function (grid, row, column) {
    return $_ch5dzyjgjcgfo55s.from(grid[row]).bind(function (r) {
      return $_ch5dzyjgjcgfo55s.from(r.cells()[column]).bind(function (c) {
        return $_ch5dzyjgjcgfo55s.from(c.element());
      });
    });
  };
  var bundle = function (grid, row, column) {
    return outcome(grid, findIn(grid, row, column));
  };
  var uniqueRows = function (details) {
    return $_epd2qyjfjcgfo55m.foldl(details, function (rest, detail) {
      return $_epd2qyjfjcgfo55m.exists(rest, function (currentDetail) {
        return currentDetail.row() === detail.row();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.row() - detailB.row();
    });
  };
  var uniqueColumns = function (details) {
    return $_epd2qyjfjcgfo55m.foldl(details, function (rest, detail) {
      return $_epd2qyjfjcgfo55m.exists(rest, function (currentDetail) {
        return currentDetail.column() === detail.column();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.column() - detailB.column();
    });
  };
  var insertRowBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row();
    var newGrid = $_5mj7qqmsjcgfo652.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsBefore = function (grid, details, comparator, genWrappers) {
    var example = details[0].row();
    var targetIndex = details[0].row();
    var rows = uniqueRows(details);
    var newGrid = $_epd2qyjfjcgfo55m.foldl(rows, function (newGrid, _row) {
      return $_5mj7qqmsjcgfo652.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertRowAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row() + detail.rowspan();
    var newGrid = $_5mj7qqmsjcgfo652.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsAfter = function (grid, details, comparator, genWrappers) {
    var rows = uniqueRows(details);
    var example = rows[rows.length - 1].row();
    var targetIndex = rows[rows.length - 1].row() + rows[rows.length - 1].rowspan();
    var newGrid = $_epd2qyjfjcgfo55m.foldl(rows, function (newGrid, _row) {
      return $_5mj7qqmsjcgfo652.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertColumnBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column();
    var newGrid = $_5mj7qqmsjcgfo652.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsBefore = function (grid, details, comparator, genWrappers) {
    var columns = uniqueColumns(details);
    var example = columns[0].column();
    var targetIndex = columns[0].column();
    var newGrid = $_epd2qyjfjcgfo55m.foldl(columns, function (newGrid, _row) {
      return $_5mj7qqmsjcgfo652.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var insertColumnAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column() + detail.colspan();
    var newGrid = $_5mj7qqmsjcgfo652.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsAfter = function (grid, details, comparator, genWrappers) {
    var example = details[details.length - 1].column();
    var targetIndex = details[details.length - 1].column() + details[details.length - 1].colspan();
    var columns = uniqueColumns(details);
    var newGrid = $_epd2qyjfjcgfo55m.foldl(columns, function (newGrid, _row) {
      return $_5mj7qqmsjcgfo652.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var makeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_8j69lymtjcgfo659.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var makeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_8j69lymtjcgfo659.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_8j69lymtjcgfo659.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_8j69lymtjcgfo659.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoColumns = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_5mj7qqmsjcgfo652.splitCellIntoColumns(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoRows = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_5mj7qqmsjcgfo652.splitCellIntoRows(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var eraseColumns = function (grid, details, comparator, _genWrappers) {
    var columns = uniqueColumns(details);
    var newGrid = $_5mj7qqmsjcgfo652.deleteColumnsAt(grid, columns[0].column(), columns[columns.length - 1].column());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var eraseRows = function (grid, details, comparator, _genWrappers) {
    var rows = uniqueRows(details);
    var newGrid = $_5mj7qqmsjcgfo652.deleteRowsAt(grid, rows[0].row(), rows[rows.length - 1].row());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var mergeCells = function (grid, mergable, comparator, _genWrappers) {
    var cells = mergable.cells();
    $_7t2pvsm4jcgfo5xf.merge(cells);
    var newGrid = $_e9wgutmrjcgfo64s.merge(grid, mergable.bounds(), comparator, $_51ccyzjhjcgfo560.constant(cells[0]));
    return outcome(newGrid, $_ch5dzyjgjcgfo55s.from(cells[0]));
  };
  var unmergeCells = function (grid, unmergable, comparator, genWrappers) {
    var newGrid = $_epd2qyjfjcgfo55m.foldr(unmergable, function (b, cell) {
      return $_e9wgutmrjcgfo64s.unmerge(b, cell, comparator, genWrappers.combine(cell));
    }, grid);
    return outcome(newGrid, $_ch5dzyjgjcgfo55s.from(unmergable[0]));
  };
  var pasteCells = function (grid, pasteDetails, comparator, genWrappers) {
    var gridify = function (table, generators) {
      var list = $_fk3v3bjpjcgfo57r.fromTable(table);
      var wh = $_akt2xrknjcgfo5fk.generate(list);
      return $_6ghsxrmajcgfo5zq.toGrid(wh, generators, true);
    };
    var gridB = gridify(pasteDetails.clipboard(), pasteDetails.generators());
    var startAddress = $_78xe8wjqjcgfo589.address(pasteDetails.row(), pasteDetails.column());
    var mergedGrid = $_6pkc15mojcgfo645.merge(startAddress, grid, gridB, pasteDetails.generators(), comparator);
    return mergedGrid.fold(function () {
      return outcome(grid, $_ch5dzyjgjcgfo55s.some(pasteDetails.element()));
    }, function (nuGrid) {
      var cursor = elementFromGrid(nuGrid, pasteDetails.row(), pasteDetails.column());
      return outcome(nuGrid, cursor);
    });
  };
  var gridifyRows = function (rows, generators, example) {
    var pasteDetails = $_fk3v3bjpjcgfo57r.fromPastedRows(rows, example);
    var wh = $_akt2xrknjcgfo5fk.generate(pasteDetails);
    return $_6ghsxrmajcgfo5zq.toGrid(wh, generators, true);
  };
  var pasteRowsBefore = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[0].row();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_6pkc15mojcgfo645.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var pasteRowsAfter = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[pasteDetails.cells.length - 1].row() + pasteDetails.cells[pasteDetails.cells.length - 1].rowspan();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_6pkc15mojcgfo645.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var resize = $_4gbrhmujcgfo65g.adjustWidthTo;
  var $_e1pmw2m0jcgfo5vs = {
    insertRowBefore: $_7s3ap8m7jcgfo5yt.run(insertRowBefore, $_7s3ap8m7jcgfo5yt.onCell, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    insertRowsBefore: $_7s3ap8m7jcgfo5yt.run(insertRowsBefore, $_7s3ap8m7jcgfo5yt.onCells, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    insertRowAfter: $_7s3ap8m7jcgfo5yt.run(insertRowAfter, $_7s3ap8m7jcgfo5yt.onCell, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    insertRowsAfter: $_7s3ap8m7jcgfo5yt.run(insertRowsAfter, $_7s3ap8m7jcgfo5yt.onCells, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    insertColumnBefore: $_7s3ap8m7jcgfo5yt.run(insertColumnBefore, $_7s3ap8m7jcgfo5yt.onCell, resize, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    insertColumnsBefore: $_7s3ap8m7jcgfo5yt.run(insertColumnsBefore, $_7s3ap8m7jcgfo5yt.onCells, resize, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    insertColumnAfter: $_7s3ap8m7jcgfo5yt.run(insertColumnAfter, $_7s3ap8m7jcgfo5yt.onCell, resize, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    insertColumnsAfter: $_7s3ap8m7jcgfo5yt.run(insertColumnsAfter, $_7s3ap8m7jcgfo5yt.onCells, resize, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    splitCellIntoColumns: $_7s3ap8m7jcgfo5yt.run(splitCellIntoColumns, $_7s3ap8m7jcgfo5yt.onCell, resize, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    splitCellIntoRows: $_7s3ap8m7jcgfo5yt.run(splitCellIntoRows, $_7s3ap8m7jcgfo5yt.onCell, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    eraseColumns: $_7s3ap8m7jcgfo5yt.run(eraseColumns, $_7s3ap8m7jcgfo5yt.onCells, resize, prune, $_eotvzmm1jcgfo5wf.modification),
    eraseRows: $_7s3ap8m7jcgfo5yt.run(eraseRows, $_7s3ap8m7jcgfo5yt.onCells, $_51ccyzjhjcgfo560.noop, prune, $_eotvzmm1jcgfo5wf.modification),
    makeColumnHeader: $_7s3ap8m7jcgfo5yt.run(makeColumnHeader, $_7s3ap8m7jcgfo5yt.onCell, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.transform('row', 'th')),
    unmakeColumnHeader: $_7s3ap8m7jcgfo5yt.run(unmakeColumnHeader, $_7s3ap8m7jcgfo5yt.onCell, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.transform(null, 'td')),
    makeRowHeader: $_7s3ap8m7jcgfo5yt.run(makeRowHeader, $_7s3ap8m7jcgfo5yt.onCell, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.transform('col', 'th')),
    unmakeRowHeader: $_7s3ap8m7jcgfo5yt.run(unmakeRowHeader, $_7s3ap8m7jcgfo5yt.onCell, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.transform(null, 'td')),
    mergeCells: $_7s3ap8m7jcgfo5yt.run(mergeCells, $_7s3ap8m7jcgfo5yt.onMergable, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.merging),
    unmergeCells: $_7s3ap8m7jcgfo5yt.run(unmergeCells, $_7s3ap8m7jcgfo5yt.onUnmergable, resize, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.merging),
    pasteCells: $_7s3ap8m7jcgfo5yt.run(pasteCells, $_7s3ap8m7jcgfo5yt.onPaste, resize, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    pasteRowsBefore: $_7s3ap8m7jcgfo5yt.run(pasteRowsBefore, $_7s3ap8m7jcgfo5yt.onPasteRows, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification),
    pasteRowsAfter: $_7s3ap8m7jcgfo5yt.run(pasteRowsAfter, $_7s3ap8m7jcgfo5yt.onPasteRows, $_51ccyzjhjcgfo560.noop, $_51ccyzjhjcgfo560.noop, $_eotvzmm1jcgfo5wf.modification)
  };

  var getBody$1 = function (editor) {
    return $_epp4kejujcgfo5a8.fromDom(editor.getBody());
  };
  var getIsRoot = function (editor) {
    return function (element) {
      return $_1miv10jyjcgfo5b7.eq(element, getBody$1(editor));
    };
  };
  var removePxSuffix = function (size) {
    return size ? size.replace(/px$/, '') : '';
  };
  var addSizeSuffix = function (size) {
    if (/^[0-9]+$/.test(size)) {
      size += 'px';
    }
    return size;
  };
  var $_4uo12an1jcgfo67g = {
    getBody: getBody$1,
    getIsRoot: getIsRoot,
    addSizeSuffix: addSizeSuffix,
    removePxSuffix: removePxSuffix
  };

  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_6vnepekojcgfo5fy.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_79ol2un3jcgfo67v = {
    onDirection: onDirection,
    getDirection: getDirection
  };

  var ltr$1 = { isRtl: $_51ccyzjhjcgfo560.constant(false) };
  var rtl$1 = { isRtl: $_51ccyzjhjcgfo560.constant(true) };
  var directionAt = function (element) {
    var dir = $_79ol2un3jcgfo67v.getDirection(element);
    return dir === 'rtl' ? rtl$1 : ltr$1;
  };
  var $_67pjjwn2jcgfo67n = { directionAt: directionAt };

  var TableActions = function (editor, lazyWire) {
    var isTableBody = function (editor) {
      return $_4zgqn9kgjcgfo5e6.name($_4uo12an1jcgfo67g.getBody(editor)) === 'table';
    };
    var lastRowGuard = function (table) {
      var size = $_g89pfylzjcgfo5vp.getGridSize(table);
      return isTableBody(editor) === false || size.rows() > 1;
    };
    var lastColumnGuard = function (table) {
      var size = $_g89pfylzjcgfo5vp.getGridSize(table);
      return isTableBody(editor) === false || size.columns() > 1;
    };
    var fireNewRow = function (node) {
      editor.fire('newrow', { node: node.dom() });
      return node.dom();
    };
    var fireNewCell = function (node) {
      editor.fire('newcell', { node: node.dom() });
      return node.dom();
    };
    var cloneFormatsArray;
    if (editor.settings.table_clone_elements !== false) {
      if (typeof editor.settings.table_clone_elements === 'string') {
        cloneFormatsArray = editor.settings.table_clone_elements.split(/[ ,]/);
      } else if (Array.isArray(editor.settings.table_clone_elements)) {
        cloneFormatsArray = editor.settings.table_clone_elements;
      }
    }
    var cloneFormats = $_ch5dzyjgjcgfo55s.from(cloneFormatsArray);
    var execute = function (operation, guard, mutate, lazyWire) {
      return function (table, target) {
        var dataStyleCells = $_cc9vyekhjcgfo5e9.descendants(table, 'td[data-mce-style],th[data-mce-style]');
        $_epd2qyjfjcgfo55m.each(dataStyleCells, function (cell) {
          $_fo5ow8kfjcgfo5ds.remove(cell, 'data-mce-style');
        });
        var wire = lazyWire();
        var doc = $_epp4kejujcgfo5a8.fromDom(editor.getDoc());
        var direction = TableDirection($_67pjjwn2jcgfo67n.directionAt);
        var generators = $_5ayu0hktjcgfo5h3.cellOperations(mutate, doc, cloneFormats);
        return guard(table) ? operation(wire, table, target, generators, direction).bind(function (result) {
          $_epd2qyjfjcgfo55m.each(result.newRows(), function (row) {
            fireNewRow(row);
          });
          $_epd2qyjfjcgfo55m.each(result.newCells(), function (cell) {
            fireNewCell(cell);
          });
          return result.cursor().map(function (cell) {
            var rng = editor.dom.createRng();
            rng.setStart(cell.dom(), 0);
            rng.setEnd(cell.dom(), 0);
            return rng;
          });
        }) : $_ch5dzyjgjcgfo55s.none();
      };
    };
    var deleteRow = execute($_e1pmw2m0jcgfo5vs.eraseRows, lastRowGuard, $_51ccyzjhjcgfo560.noop, lazyWire);
    var deleteColumn = execute($_e1pmw2m0jcgfo5vs.eraseColumns, lastColumnGuard, $_51ccyzjhjcgfo560.noop, lazyWire);
    var insertRowsBefore = execute($_e1pmw2m0jcgfo5vs.insertRowsBefore, $_51ccyzjhjcgfo560.always, $_51ccyzjhjcgfo560.noop, lazyWire);
    var insertRowsAfter = execute($_e1pmw2m0jcgfo5vs.insertRowsAfter, $_51ccyzjhjcgfo560.always, $_51ccyzjhjcgfo560.noop, lazyWire);
    var insertColumnsBefore = execute($_e1pmw2m0jcgfo5vs.insertColumnsBefore, $_51ccyzjhjcgfo560.always, $_aaq39flnjcgfo5sm.halve, lazyWire);
    var insertColumnsAfter = execute($_e1pmw2m0jcgfo5vs.insertColumnsAfter, $_51ccyzjhjcgfo560.always, $_aaq39flnjcgfo5sm.halve, lazyWire);
    var mergeCells = execute($_e1pmw2m0jcgfo5vs.mergeCells, $_51ccyzjhjcgfo560.always, $_51ccyzjhjcgfo560.noop, lazyWire);
    var unmergeCells = execute($_e1pmw2m0jcgfo5vs.unmergeCells, $_51ccyzjhjcgfo560.always, $_51ccyzjhjcgfo560.noop, lazyWire);
    var pasteRowsBefore = execute($_e1pmw2m0jcgfo5vs.pasteRowsBefore, $_51ccyzjhjcgfo560.always, $_51ccyzjhjcgfo560.noop, lazyWire);
    var pasteRowsAfter = execute($_e1pmw2m0jcgfo5vs.pasteRowsAfter, $_51ccyzjhjcgfo560.always, $_51ccyzjhjcgfo560.noop, lazyWire);
    var pasteCells = execute($_e1pmw2m0jcgfo5vs.pasteCells, $_51ccyzjhjcgfo560.always, $_51ccyzjhjcgfo560.noop, lazyWire);
    return {
      deleteRow: deleteRow,
      deleteColumn: deleteColumn,
      insertRowsBefore: insertRowsBefore,
      insertRowsAfter: insertRowsAfter,
      insertColumnsBefore: insertColumnsBefore,
      insertColumnsAfter: insertColumnsAfter,
      mergeCells: mergeCells,
      unmergeCells: unmergeCells,
      pasteRowsBefore: pasteRowsBefore,
      pasteRowsAfter: pasteRowsAfter,
      pasteCells: pasteCells
    };
  };

  var copyRows = function (table, target, generators) {
    var list = $_fk3v3bjpjcgfo57r.fromTable(table);
    var house = $_akt2xrknjcgfo5fk.generate(list);
    var details = $_7s3ap8m7jcgfo5yt.onCells(house, target);
    return details.map(function (selectedCells) {
      var grid = $_6ghsxrmajcgfo5zq.toGrid(house, generators, false);
      var slicedGrid = grid.slice(selectedCells[0].row(), selectedCells[selectedCells.length - 1].row() + selectedCells[selectedCells.length - 1].rowspan());
      var slicedDetails = $_7s3ap8m7jcgfo5yt.toDetailList(slicedGrid, generators);
      return $_42fmbimdjcgfo60h.copy(slicedDetails);
    });
  };
  var $_1itrr8n5jcgfo68t = { copyRows: copyRows };

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var getTDTHOverallStyle = function (dom, elm, name) {
    var cells = dom.select('td,th', elm);
    var firstChildStyle;
    var checkChildren = function (firstChildStyle, elms) {
      for (var i = 0; i < elms.length; i++) {
        var currentStyle = dom.getStyle(elms[i], name);
        if (typeof firstChildStyle === 'undefined') {
          firstChildStyle = currentStyle;
        }
        if (firstChildStyle !== currentStyle) {
          return '';
        }
      }
      return firstChildStyle;
    };
    firstChildStyle = checkChildren(firstChildStyle, cells);
    return firstChildStyle;
  };
  var applyAlign = function (editor, elm, name) {
    if (name) {
      editor.formatter.apply('align' + name, {}, elm);
    }
  };
  var applyVAlign = function (editor, elm, name) {
    if (name) {
      editor.formatter.apply('valign' + name, {}, elm);
    }
  };
  var unApplyAlign = function (editor, elm) {
    Tools.each('left center right'.split(' '), function (name) {
      editor.formatter.remove('align' + name, {}, elm);
    });
  };
  var unApplyVAlign = function (editor, elm) {
    Tools.each('top middle bottom'.split(' '), function (name) {
      editor.formatter.remove('valign' + name, {}, elm);
    });
  };
  var $_2cyg2in9jcgfo696 = {
    applyAlign: applyAlign,
    applyVAlign: applyVAlign,
    unApplyAlign: unApplyAlign,
    unApplyVAlign: unApplyVAlign,
    getTDTHOverallStyle: getTDTHOverallStyle
  };

  var buildListItems = function (inputList, itemCallback, startItems) {
    var appendItems = function (values, output) {
      output = output || [];
      Tools.each(values, function (item) {
        var menuItem = { text: item.text || item.title };
        if (item.menu) {
          menuItem.menu = appendItems(item.menu);
        } else {
          menuItem.value = item.value;
          if (itemCallback) {
            itemCallback(menuItem);
          }
        }
        output.push(menuItem);
      });
      return output;
    };
    return appendItems(inputList, startItems || []);
  };
  var updateStyleField = function (editor, evt) {
    var dom = editor.dom;
    var rootControl = evt.control.rootControl;
    var data = rootControl.toJSON();
    var css = dom.parseStyle(data.style);
    if (evt.control.name() === 'style') {
      rootControl.find('#borderStyle').value(css['border-style'] || '')[0].fire('select');
      rootControl.find('#borderColor').value(css['border-color'] || '')[0].fire('change');
      rootControl.find('#backgroundColor').value(css['background-color'] || '')[0].fire('change');
      rootControl.find('#width').value(css.width || '').fire('change');
      rootControl.find('#height').value(css.height || '').fire('change');
    } else {
      css['border-style'] = data.borderStyle;
      css['border-color'] = data.borderColor;
      css['background-color'] = data.backgroundColor;
      css.width = data.width ? $_4uo12an1jcgfo67g.addSizeSuffix(data.width) : '';
      css.height = data.height ? $_4uo12an1jcgfo67g.addSizeSuffix(data.height) : '';
    }
    rootControl.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
  };
  var extractAdvancedStyles = function (dom, elm) {
    var css = dom.parseStyle(dom.getAttrib(elm, 'style'));
    var data = {};
    if (css['border-style']) {
      data.borderStyle = css['border-style'];
    }
    if (css['border-color']) {
      data.borderColor = css['border-color'];
    }
    if (css['background-color']) {
      data.backgroundColor = css['background-color'];
    }
    data.style = dom.serializeStyle(css);
    return data;
  };
  var createStyleForm = function (editor) {
    var createColorPickAction = function () {
      var colorPickerCallback = editor.settings.color_picker_callback;
      if (colorPickerCallback) {
        return function (evt) {
          return colorPickerCallback.call(editor, function (value) {
            evt.control.value(value).fire('change');
          }, evt.control.value());
        };
      }
    };
    return {
      title: 'Advanced',
      type: 'form',
      defaults: { onchange: $_51ccyzjhjcgfo560.curry(updateStyleField, editor) },
      items: [
        {
          label: 'Style',
          name: 'style',
          type: 'textbox'
        },
        {
          type: 'form',
          padding: 0,
          formItemDefaults: {
            layout: 'grid',
            alignH: [
              'start',
              'right'
            ]
          },
          defaults: { size: 7 },
          items: [
            {
              label: 'Border style',
              type: 'listbox',
              name: 'borderStyle',
              width: 90,
              onselect: $_51ccyzjhjcgfo560.curry(updateStyleField, editor),
              values: [
                {
                  text: 'Select...',
                  value: ''
                },
                {
                  text: 'Solid',
                  value: 'solid'
                },
                {
                  text: 'Dotted',
                  value: 'dotted'
                },
                {
                  text: 'Dashed',
                  value: 'dashed'
                },
                {
                  text: 'Double',
                  value: 'double'
                },
                {
                  text: 'Groove',
                  value: 'groove'
                },
                {
                  text: 'Ridge',
                  value: 'ridge'
                },
                {
                  text: 'Inset',
                  value: 'inset'
                },
                {
                  text: 'Outset',
                  value: 'outset'
                },
                {
                  text: 'None',
                  value: 'none'
                },
                {
                  text: 'Hidden',
                  value: 'hidden'
                }
              ]
            },
            {
              label: 'Border color',
              type: 'colorbox',
              name: 'borderColor',
              onaction: createColorPickAction()
            },
            {
              label: 'Background color',
              type: 'colorbox',
              name: 'backgroundColor',
              onaction: createColorPickAction()
            }
          ]
        }
      ]
    };
  };
  var $_7s87jynajcgfo699 = {
    createStyleForm: createStyleForm,
    buildListItems: buildListItems,
    updateStyleField: updateStyleField,
    extractAdvancedStyles: extractAdvancedStyles
  };

  function styleTDTH(dom, elm, name, value) {
    if (elm.tagName === 'TD' || elm.tagName === 'TH') {
      dom.setStyle(elm, name, value);
    } else {
      if (elm.children) {
        for (var i = 0; i < elm.children.length; i++) {
          styleTDTH(dom, elm.children[i], name, value);
        }
      }
    }
  }
  var extractDataFromElement = function (editor, tableElm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(tableElm, 'width') || dom.getAttrib(tableElm, 'width'),
      height: dom.getStyle(tableElm, 'height') || dom.getAttrib(tableElm, 'height'),
      cellspacing: dom.getStyle(tableElm, 'border-spacing') || dom.getAttrib(tableElm, 'cellspacing'),
      cellpadding: dom.getAttrib(tableElm, 'data-mce-cell-padding') || dom.getAttrib(tableElm, 'cellpadding') || $_2cyg2in9jcgfo696.getTDTHOverallStyle(editor.dom, tableElm, 'padding'),
      border: dom.getAttrib(tableElm, 'data-mce-border') || dom.getAttrib(tableElm, 'border') || $_2cyg2in9jcgfo696.getTDTHOverallStyle(editor.dom, tableElm, 'border'),
      borderColor: dom.getAttrib(tableElm, 'data-mce-border-color'),
      caption: !!dom.select('caption', tableElm)[0],
      class: dom.getAttrib(tableElm, 'class')
    };
    Tools.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(tableElm, 'align' + name)) {
        data.align = name;
      }
    });
    if (editor.settings.table_advtab !== false) {
      Tools.extend(data, $_7s87jynajcgfo699.extractAdvancedStyles(dom, tableElm));
    }
    return data;
  };
  var applyDataToElement = function (editor, tableElm, data) {
    var dom = editor.dom;
    var attrs = {};
    var styles = {};
    attrs.class = data.class;
    styles.height = $_4uo12an1jcgfo67g.addSizeSuffix(data.height);
    if (dom.getAttrib(tableElm, 'width') && !editor.settings.table_style_by_css) {
      attrs.width = $_4uo12an1jcgfo67g.removePxSuffix(data.width);
    } else {
      styles.width = $_4uo12an1jcgfo67g.addSizeSuffix(data.width);
    }
    if (editor.settings.table_style_by_css) {
      styles['border-width'] = $_4uo12an1jcgfo67g.addSizeSuffix(data.border);
      styles['border-spacing'] = $_4uo12an1jcgfo67g.addSizeSuffix(data.cellspacing);
      Tools.extend(attrs, {
        'data-mce-border-color': data.borderColor,
        'data-mce-cell-padding': data.cellpadding,
        'data-mce-border': data.border
      });
    } else {
      Tools.extend(attrs, {
        border: data.border,
        cellpadding: data.cellpadding,
        cellspacing: data.cellspacing
      });
    }
    if (editor.settings.table_style_by_css) {
      if (tableElm.children) {
        for (var i = 0; i < tableElm.children.length; i++) {
          styleTDTH(dom, tableElm.children[i], {
            'border-width': $_4uo12an1jcgfo67g.addSizeSuffix(data.border),
            'border-color': data.borderColor,
            'padding': $_4uo12an1jcgfo67g.addSizeSuffix(data.cellpadding)
          });
        }
      }
    }
    if (data.style) {
      Tools.extend(styles, dom.parseStyle(data.style));
    } else {
      styles = Tools.extend({}, dom.parseStyle(dom.getAttrib(tableElm, 'style')), styles);
    }
    attrs.style = dom.serializeStyle(styles);
    dom.setAttribs(tableElm, attrs);
  };
  var onSubmitTableForm = function (editor, tableElm, evt) {
    var dom = editor.dom;
    var captionElm;
    var data;
    $_7s87jynajcgfo699.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    if (data.class === false) {
      delete data.class;
    }
    editor.undoManager.transact(function () {
      if (!tableElm) {
        tableElm = $_8x421vlijcgfo5qe.insert(editor, data.cols || 1, data.rows || 1);
      }
      applyDataToElement(editor, tableElm, data);
      captionElm = dom.select('caption', tableElm)[0];
      if (captionElm && !data.caption) {
        dom.remove(captionElm);
      }
      if (!captionElm && data.caption) {
        captionElm = dom.create('caption');
        captionElm.innerHTML = !Env.ie ? '<br data-mce-bogus="1"/>' : '\xA0';
        tableElm.insertBefore(captionElm, tableElm.firstChild);
      }
      $_2cyg2in9jcgfo696.unApplyAlign(editor, tableElm);
      if (data.align) {
        $_2cyg2in9jcgfo696.applyAlign(editor, tableElm, data.align);
      }
      editor.focus();
      editor.addVisual();
    });
  };
  var open = function (editor, isProps) {
    var dom = editor.dom;
    var tableElm, colsCtrl, rowsCtrl, classListCtrl, data = {}, generalTableForm;
    if (isProps === true) {
      tableElm = dom.getParent(editor.selection.getStart(), 'table');
      if (tableElm) {
        data = extractDataFromElement(editor, tableElm);
      }
    } else {
      colsCtrl = {
        label: 'Cols',
        name: 'cols'
      };
      rowsCtrl = {
        label: 'Rows',
        name: 'rows'
      };
    }
    if (editor.settings.table_class_list) {
      if (data.class) {
        data.class = data.class.replace(/\s*mce\-item\-table\s*/g, '');
      }
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_7s87jynajcgfo699.buildListItems(editor.settings.table_class_list, function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'table',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    generalTableForm = {
      type: 'form',
      layout: 'flex',
      direction: 'column',
      labelGapCalc: 'children',
      padding: 0,
      items: [
        {
          type: 'form',
          labelGapCalc: false,
          padding: 0,
          layout: 'grid',
          columns: 2,
          defaults: {
            type: 'textbox',
            maxWidth: 50
          },
          items: editor.settings.table_appearance_options !== false ? [
            colsCtrl,
            rowsCtrl,
            {
              label: 'Width',
              name: 'width',
              onchange: $_51ccyzjhjcgfo560.curry($_7s87jynajcgfo699.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_51ccyzjhjcgfo560.curry($_7s87jynajcgfo699.updateStyleField, editor)
            },
            {
              label: 'Cell spacing',
              name: 'cellspacing'
            },
            {
              label: 'Cell padding',
              name: 'cellpadding'
            },
            {
              label: 'Border',
              name: 'border'
            },
            {
              label: 'Caption',
              name: 'caption',
              type: 'checkbox'
            }
          ] : [
            colsCtrl,
            rowsCtrl,
            {
              label: 'Width',
              name: 'width',
              onchange: $_51ccyzjhjcgfo560.curry($_7s87jynajcgfo699.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_51ccyzjhjcgfo560.curry($_7s87jynajcgfo699.updateStyleField, editor)
            }
          ]
        },
        {
          label: 'Alignment',
          name: 'align',
          type: 'listbox',
          text: 'None',
          values: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        },
        classListCtrl
      ]
    };
    if (editor.settings.table_advtab !== false) {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        bodyType: 'tabpanel',
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalTableForm
          },
          $_7s87jynajcgfo699.createStyleForm(editor)
        ],
        onsubmit: $_51ccyzjhjcgfo560.curry(onSubmitTableForm, editor, tableElm)
      });
    } else {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        body: generalTableForm,
        onsubmit: $_51ccyzjhjcgfo560.curry(onSubmitTableForm, editor, tableElm)
      });
    }
  };
  var $_7bzu6wn7jcgfo68x = { open: open };

  var extractDataFromElement$1 = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class')
    };
    data.type = elm.parentNode.nodeName.toLowerCase();
    Tools.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    if (editor.settings.table_row_advtab !== false) {
      Tools.extend(data, $_7s87jynajcgfo699.extractAdvancedStyles(dom, elm));
    }
    return data;
  };
  var switchRowType = function (dom, rowElm, toType) {
    var tableElm = dom.getParent(rowElm, 'table');
    var oldParentElm = rowElm.parentNode;
    var parentElm = dom.select(toType, tableElm)[0];
    if (!parentElm) {
      parentElm = dom.create(toType);
      if (tableElm.firstChild) {
        if (tableElm.firstChild.nodeName === 'CAPTION') {
          dom.insertAfter(parentElm, tableElm.firstChild);
        } else {
          tableElm.insertBefore(parentElm, tableElm.firstChild);
        }
      } else {
        tableElm.appendChild(parentElm);
      }
    }
    parentElm.appendChild(rowElm);
    if (!oldParentElm.hasChildNodes()) {
      dom.remove(oldParentElm);
    }
  };
  function onSubmitRowForm(editor, rows, evt) {
    var dom = editor.dom;
    var data;
    function setAttrib(elm, name, value) {
      if (value) {
        dom.setAttrib(elm, name, value);
      }
    }
    function setStyle(elm, name, value) {
      if (value) {
        dom.setStyle(elm, name, value);
      }
    }
    $_7s87jynajcgfo699.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      Tools.each(rows, function (rowElm) {
        setAttrib(rowElm, 'scope', data.scope);
        setAttrib(rowElm, 'style', data.style);
        setAttrib(rowElm, 'class', data.class);
        setStyle(rowElm, 'height', $_4uo12an1jcgfo67g.addSizeSuffix(data.height));
        if (data.type !== rowElm.parentNode.nodeName.toLowerCase()) {
          switchRowType(editor.dom, rowElm, data.type);
        }
        if (rows.length === 1) {
          $_2cyg2in9jcgfo696.unApplyAlign(editor, rowElm);
        }
        if (data.align) {
          $_2cyg2in9jcgfo696.applyAlign(editor, rowElm, data.align);
        }
      });
      editor.focus();
    });
  }
  var open$1 = function (editor) {
    var dom = editor.dom;
    var tableElm, cellElm, rowElm, classListCtrl, data;
    var rows = [];
    var generalRowForm;
    tableElm = editor.dom.getParent(editor.selection.getStart(), 'table');
    cellElm = editor.dom.getParent(editor.selection.getStart(), 'td,th');
    Tools.each(tableElm.rows, function (row) {
      Tools.each(row.cells, function (cell) {
        if (dom.getAttrib(cell, 'data-mce-selected') || cell === cellElm) {
          rows.push(row);
          return false;
        }
      });
    });
    rowElm = rows[0];
    if (!rowElm) {
      return;
    }
    if (rows.length > 1) {
      data = {
        height: '',
        scope: '',
        class: '',
        align: '',
        type: rowElm.parentNode.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement$1(editor, rowElm);
    }
    if (editor.settings.table_row_class_list) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_7s87jynajcgfo699.buildListItems(editor.settings.table_row_class_list, function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'tr',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    generalRowForm = {
      type: 'form',
      columns: 2,
      padding: 0,
      defaults: { type: 'textbox' },
      items: [
        {
          type: 'listbox',
          name: 'type',
          label: 'Row type',
          text: 'Header',
          maxWidth: null,
          values: [
            {
              text: 'Header',
              value: 'thead'
            },
            {
              text: 'Body',
              value: 'tbody'
            },
            {
              text: 'Footer',
              value: 'tfoot'
            }
          ]
        },
        {
          type: 'listbox',
          name: 'align',
          label: 'Alignment',
          text: 'None',
          maxWidth: null,
          values: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        },
        {
          label: 'Height',
          name: 'height'
        },
        classListCtrl
      ]
    };
    if (editor.settings.table_row_advtab !== false) {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        bodyType: 'tabpanel',
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalRowForm
          },
          $_7s87jynajcgfo699.createStyleForm(dom)
        ],
        onsubmit: $_51ccyzjhjcgfo560.curry(onSubmitRowForm, editor, rows)
      });
    } else {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        body: generalRowForm,
        onsubmit: $_51ccyzjhjcgfo560.curry(onSubmitRowForm, editor, rows)
      });
    }
  };
  var $_7mvmu8nbjcgfo69g = { open: open$1 };

  var updateStyles = function (elm, cssText) {
    elm.style.cssText += ';' + cssText;
  };
  var extractDataFromElement$2 = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class')
    };
    data.type = elm.nodeName.toLowerCase();
    Tools.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    Tools.each('top middle bottom'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'valign' + name)) {
        data.valign = name;
      }
    });
    if (editor.settings.table_cell_advtab !== false) {
      Tools.extend(data, $_7s87jynajcgfo699.extractAdvancedStyles(dom, elm));
    }
    return data;
  };
  var onSubmitCellForm = function (editor, cells, evt) {
    var dom = editor.dom;
    var data;
    function setAttrib(elm, name, value) {
      if (value) {
        dom.setAttrib(elm, name, value);
      }
    }
    function setStyle(elm, name, value) {
      if (value) {
        dom.setStyle(elm, name, value);
      }
    }
    $_7s87jynajcgfo699.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      Tools.each(cells, function (cellElm) {
        setAttrib(cellElm, 'scope', data.scope);
        if (cells.length === 1) {
          setAttrib(cellElm, 'style', data.style);
        } else {
          updateStyles(cellElm, data.style);
        }
        setAttrib(cellElm, 'class', data.class);
        setStyle(cellElm, 'width', $_4uo12an1jcgfo67g.addSizeSuffix(data.width));
        setStyle(cellElm, 'height', $_4uo12an1jcgfo67g.addSizeSuffix(data.height));
        if (data.type && cellElm.nodeName.toLowerCase() !== data.type) {
          cellElm = dom.rename(cellElm, data.type);
        }
        if (cells.length === 1) {
          $_2cyg2in9jcgfo696.unApplyAlign(editor, cellElm);
          $_2cyg2in9jcgfo696.unApplyVAlign(editor, cellElm);
        }
        if (data.align) {
          $_2cyg2in9jcgfo696.applyAlign(editor, cellElm, data.align);
        }
        if (data.valign) {
          $_2cyg2in9jcgfo696.applyVAlign(editor, cellElm, data.valign);
        }
      });
      editor.focus();
    });
  };
  var open$2 = function (editor) {
    var cellElm, data, classListCtrl, cells = [];
    cells = editor.dom.select('td[data-mce-selected],th[data-mce-selected]');
    cellElm = editor.dom.getParent(editor.selection.getStart(), 'td,th');
    if (!cells.length && cellElm) {
      cells.push(cellElm);
    }
    cellElm = cellElm || cells[0];
    if (!cellElm) {
      return;
    }
    if (cells.length > 1) {
      data = {
        width: '',
        height: '',
        scope: '',
        class: '',
        align: '',
        style: '',
        type: cellElm.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement$2(editor, cellElm);
    }
    if (editor.settings.table_cell_class_list) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_7s87jynajcgfo699.buildListItems(editor.settings.table_cell_class_list, function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'td',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    var generalCellForm = {
      type: 'form',
      layout: 'flex',
      direction: 'column',
      labelGapCalc: 'children',
      padding: 0,
      items: [
        {
          type: 'form',
          layout: 'grid',
          columns: 2,
          labelGapCalc: false,
          padding: 0,
          defaults: {
            type: 'textbox',
            maxWidth: 50
          },
          items: [
            {
              label: 'Width',
              name: 'width',
              onchange: $_51ccyzjhjcgfo560.curry($_7s87jynajcgfo699.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_51ccyzjhjcgfo560.curry($_7s87jynajcgfo699.updateStyleField, editor)
            },
            {
              label: 'Cell type',
              name: 'type',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'Cell',
                  value: 'td'
                },
                {
                  text: 'Header cell',
                  value: 'th'
                }
              ]
            },
            {
              label: 'Scope',
              name: 'scope',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Row',
                  value: 'row'
                },
                {
                  text: 'Column',
                  value: 'col'
                },
                {
                  text: 'Row group',
                  value: 'rowgroup'
                },
                {
                  text: 'Column group',
                  value: 'colgroup'
                }
              ]
            },
            {
              label: 'H Align',
              name: 'align',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Left',
                  value: 'left'
                },
                {
                  text: 'Center',
                  value: 'center'
                },
                {
                  text: 'Right',
                  value: 'right'
                }
              ]
            },
            {
              label: 'V Align',
              name: 'valign',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Top',
                  value: 'top'
                },
                {
                  text: 'Middle',
                  value: 'middle'
                },
                {
                  text: 'Bottom',
                  value: 'bottom'
                }
              ]
            }
          ]
        },
        classListCtrl
      ]
    };
    if (editor.settings.table_cell_advtab !== false) {
      editor.windowManager.open({
        title: 'Cell properties',
        bodyType: 'tabpanel',
        data: data,
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalCellForm
          },
          $_7s87jynajcgfo699.createStyleForm(editor)
        ],
        onsubmit: $_51ccyzjhjcgfo560.curry(onSubmitCellForm, editor, cells)
      });
    } else {
      editor.windowManager.open({
        title: 'Cell properties',
        data: data,
        body: generalCellForm,
        onsubmit: $_51ccyzjhjcgfo560.curry(onSubmitCellForm, editor, cells)
      });
    }
  };
  var $_99wq8zncjcgfo69n = { open: open$2 };

  var each$3 = Tools.each;
  var clipboardRows = $_ch5dzyjgjcgfo55s.none();
  var getClipboardRows = function () {
    return clipboardRows.fold(function () {
      return;
    }, function (rows) {
      return $_epd2qyjfjcgfo55m.map(rows, function (row) {
        return row.dom();
      });
    });
  };
  var setClipboardRows = function (rows) {
    var sugarRows = $_epd2qyjfjcgfo55m.map(rows, $_epp4kejujcgfo5a8.fromDom);
    clipboardRows = $_ch5dzyjgjcgfo55s.from(sugarRows);
  };
  var registerCommands = function (editor, actions, cellSelection, selections) {
    var isRoot = $_4uo12an1jcgfo67g.getIsRoot(editor);
    var eraseTable = function () {
      var cell = $_epp4kejujcgfo5a8.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
      var table = $_7pxq74jrjcgfo58f.table(cell, isRoot);
      table.filter($_51ccyzjhjcgfo560.not(isRoot)).each(function (table) {
        var cursor = $_epp4kejujcgfo5a8.fromText('');
        $_9fuysnkqjcgfo5gl.after(table, cursor);
        $_9z98yykrjcgfo5go.remove(table);
        var rng = editor.dom.createRng();
        rng.setStart(cursor.dom(), 0);
        rng.setEnd(cursor.dom(), 0);
        editor.selection.setRng(rng);
      });
    };
    var getSelectionStartCell = function () {
      return $_epp4kejujcgfo5a8.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
    };
    var getTableFromCell = function (cell) {
      return $_7pxq74jrjcgfo58f.table(cell, isRoot);
    };
    var actOnSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      table.each(function (table) {
        var targets = $_i3neol0jcgfo5jb.forMenu(selections, table, cell);
        execute(table, targets).each(function (rng) {
          editor.selection.setRng(rng);
          editor.focus();
          cellSelection.clear(table);
        });
      });
    };
    var copyRowSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      return table.bind(function (table) {
        var doc = $_epp4kejujcgfo5a8.fromDom(editor.getDoc());
        var targets = $_i3neol0jcgfo5jb.forMenu(selections, table, cell);
        var generators = $_5ayu0hktjcgfo5h3.cellOperations($_51ccyzjhjcgfo560.noop, doc, $_ch5dzyjgjcgfo55s.none());
        return $_1itrr8n5jcgfo68t.copyRows(table, targets, generators);
      });
    };
    var pasteOnSelection = function (execute) {
      clipboardRows.each(function (rows) {
        var clonedRows = $_epd2qyjfjcgfo55m.map(rows, function (row) {
          return $_bj8wkfkujcgfo5ia.deep(row);
        });
        var cell = getSelectionStartCell();
        var table = getTableFromCell(cell);
        table.bind(function (table) {
          var doc = $_epp4kejujcgfo5a8.fromDom(editor.getDoc());
          var generators = $_5ayu0hktjcgfo5h3.paste(doc);
          var targets = $_i3neol0jcgfo5jb.pasteRows(selections, table, cell, clonedRows, generators);
          execute(table, targets).each(function (rng) {
            editor.selection.setRng(rng);
            editor.focus();
            cellSelection.clear(table);
          });
        });
      });
    };
    each$3({
      mceTableSplitCells: function () {
        actOnSelection(actions.unmergeCells);
      },
      mceTableMergeCells: function () {
        actOnSelection(actions.mergeCells);
      },
      mceTableInsertRowBefore: function () {
        actOnSelection(actions.insertRowsBefore);
      },
      mceTableInsertRowAfter: function () {
        actOnSelection(actions.insertRowsAfter);
      },
      mceTableInsertColBefore: function () {
        actOnSelection(actions.insertColumnsBefore);
      },
      mceTableInsertColAfter: function () {
        actOnSelection(actions.insertColumnsAfter);
      },
      mceTableDeleteCol: function () {
        actOnSelection(actions.deleteColumn);
      },
      mceTableDeleteRow: function () {
        actOnSelection(actions.deleteRow);
      },
      mceTableCutRow: function (grid) {
        clipboardRows = copyRowSelection();
        actOnSelection(actions.deleteRow);
      },
      mceTableCopyRow: function (grid) {
        clipboardRows = copyRowSelection();
      },
      mceTablePasteRowBefore: function (grid) {
        pasteOnSelection(actions.pasteRowsBefore);
      },
      mceTablePasteRowAfter: function (grid) {
        pasteOnSelection(actions.pasteRowsAfter);
      },
      mceTableDelete: eraseTable
    }, function (func, name) {
      editor.addCommand(name, func);
    });
    each$3({
      mceInsertTable: $_51ccyzjhjcgfo560.curry($_7bzu6wn7jcgfo68x.open, editor),
      mceTableProps: $_51ccyzjhjcgfo560.curry($_7bzu6wn7jcgfo68x.open, editor, true),
      mceTableRowProps: $_51ccyzjhjcgfo560.curry($_7mvmu8nbjcgfo69g.open, editor),
      mceTableCellProps: $_51ccyzjhjcgfo560.curry($_99wq8zncjcgfo69n.open, editor)
    }, function (func, name) {
      editor.addCommand(name, function (ui, val) {
        func(val);
      });
    });
  };
  var $_4koqxhn4jcgfo67y = {
    registerCommands: registerCommands,
    getClipboardRows: getClipboardRows,
    setClipboardRows: setClipboardRows
  };

  var only$1 = function (element) {
    var parent = $_ch5dzyjgjcgfo55s.from(element.dom().documentElement).map($_epp4kejujcgfo5a8.fromDom).getOr(element);
    return {
      parent: $_51ccyzjhjcgfo560.constant(parent),
      view: $_51ccyzjhjcgfo560.constant(element),
      origin: $_51ccyzjhjcgfo560.constant(r(0, 0))
    };
  };
  var detached = function (editable, chrome) {
    var origin = $_51ccyzjhjcgfo560.curry($_d1l3b5lwjcgfo5vb.absolute, chrome);
    return {
      parent: $_51ccyzjhjcgfo560.constant(chrome),
      view: $_51ccyzjhjcgfo560.constant(editable),
      origin: origin
    };
  };
  var body$1 = function (editable, chrome) {
    return {
      parent: $_51ccyzjhjcgfo560.constant(chrome),
      view: $_51ccyzjhjcgfo560.constant(editable),
      origin: $_51ccyzjhjcgfo560.constant(r(0, 0))
    };
  };
  var $_ex2i02nejcgfo6al = {
    only: only$1,
    detached: detached,
    body: body$1
  };

  var Event = function (fields) {
    var struct = $_6w2qyfjkjcgfo57c.immutable.apply(null, fields);
    var handlers = [];
    var bind = function (handler) {
      if (handler === undefined) {
        throw 'Event bind error: undefined handler';
      }
      handlers.push(handler);
    };
    var unbind = function (handler) {
      handlers = $_epd2qyjfjcgfo55m.filter(handlers, function (h) {
        return h !== handler;
      });
    };
    var trigger = function () {
      var event = struct.apply(null, arguments);
      $_epd2qyjfjcgfo55m.each(handlers, function (handler) {
        handler(event);
      });
    };
    return {
      bind: bind,
      unbind: unbind,
      trigger: trigger
    };
  };

  var create = function (typeDefs) {
    var registry = $_9lvqaqjjjcgfo578.map(typeDefs, function (event) {
      return {
        bind: event.bind,
        unbind: event.unbind
      };
    });
    var trigger = $_9lvqaqjjjcgfo578.map(typeDefs, function (event) {
      return event.trigger;
    });
    return {
      registry: registry,
      trigger: trigger
    };
  };
  var $_vcrpanhjcgfo6bq = { create: create };

  var mode = $_9zengqm3jcgfo5x8.exactly([
    'compare',
    'extract',
    'mutate',
    'sink'
  ]);
  var sink$1 = $_9zengqm3jcgfo5x8.exactly([
    'element',
    'start',
    'stop',
    'destroy'
  ]);
  var api$3 = $_9zengqm3jcgfo5x8.exactly([
    'forceDrop',
    'drop',
    'move',
    'delayDrop'
  ]);
  var $_bjfzvznljcgfo6e0 = {
    mode: mode,
    sink: sink$1,
    api: api$3
  };

  var styles$1 = $_f9fld6mjjcgfo63l.css('ephox-dragster');
  var $_97q65lnnjcgfo6eq = { resolve: styles$1.resolve };

  var Blocker = function (options) {
    var settings = $_1q2omim8jcgfo5zk.merge({ 'layerClass': $_97q65lnnjcgfo6eq.resolve('blocker') }, options);
    var div = $_epp4kejujcgfo5a8.fromTag('div');
    $_fo5ow8kfjcgfo5ds.set(div, 'role', 'presentation');
    $_6vnepekojcgfo5fy.setAll(div, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%'
    });
    $_18cpvgmkjcgfo63o.add(div, $_97q65lnnjcgfo6eq.resolve('blocker'));
    $_18cpvgmkjcgfo63o.add(div, settings.layerClass);
    var element = function () {
      return div;
    };
    var destroy = function () {
      $_9z98yykrjcgfo5go.remove(div);
    };
    return {
      element: element,
      destroy: destroy
    };
  };

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_51ccyzjhjcgfo560.constant(target),
      'x': $_51ccyzjhjcgfo560.constant(x),
      'y': $_51ccyzjhjcgfo560.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_51ccyzjhjcgfo560.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_epp4kejujcgfo5a8.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_51ccyzjhjcgfo560.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_51ccyzjhjcgfo560.curry(unbind, element, event, wrapped, useCapture) };
  };
  var bind$2 = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, false);
  };
  var capture$1 = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, true);
  };
  var unbind = function (element, event, handler, useCapture) {
    element.dom().removeEventListener(event, handler, useCapture);
  };
  var $_3o85i1npjcgfo6f2 = {
    bind: bind$2,
    capture: capture$1
  };

  var filter$1 = $_51ccyzjhjcgfo560.constant(true);
  var bind$1 = function (element, event, handler) {
    return $_3o85i1npjcgfo6f2.bind(element, event, filter$1, handler);
  };
  var capture = function (element, event, handler) {
    return $_3o85i1npjcgfo6f2.capture(element, event, filter$1, handler);
  };
  var $_4y6wehnojcgfo6ex = {
    bind: bind$1,
    capture: capture
  };

  var compare = function (old, nu) {
    return r(nu.left() - old.left(), nu.top() - old.top());
  };
  var extract$1 = function (event) {
    return $_ch5dzyjgjcgfo55s.some(r(event.x(), event.y()));
  };
  var mutate$1 = function (mutation, info) {
    mutation.mutate(info.left(), info.top());
  };
  var sink = function (dragApi, settings) {
    var blocker = Blocker(settings);
    var mdown = $_4y6wehnojcgfo6ex.bind(blocker.element(), 'mousedown', dragApi.forceDrop);
    var mup = $_4y6wehnojcgfo6ex.bind(blocker.element(), 'mouseup', dragApi.drop);
    var mmove = $_4y6wehnojcgfo6ex.bind(blocker.element(), 'mousemove', dragApi.move);
    var mout = $_4y6wehnojcgfo6ex.bind(blocker.element(), 'mouseout', dragApi.delayDrop);
    var destroy = function () {
      blocker.destroy();
      mup.unbind();
      mmove.unbind();
      mout.unbind();
      mdown.unbind();
    };
    var start = function (parent) {
      $_9fuysnkqjcgfo5gl.append(parent, blocker.element());
    };
    var stop = function () {
      $_9z98yykrjcgfo5go.remove(blocker.element());
    };
    return $_bjfzvznljcgfo6e0.sink({
      element: blocker.element,
      start: start,
      stop: stop,
      destroy: destroy
    });
  };
  var MouseDrag = $_bjfzvznljcgfo6e0.mode({
    compare: compare,
    extract: extract$1,
    sink: sink,
    mutate: mutate$1
  });

  var InDrag = function () {
    var previous = $_ch5dzyjgjcgfo55s.none();
    var reset = function () {
      previous = $_ch5dzyjgjcgfo55s.none();
    };
    var update = function (mode, nu) {
      var result = previous.map(function (old) {
        return mode.compare(old, nu);
      });
      previous = $_ch5dzyjgjcgfo55s.some(nu);
      return result;
    };
    var onEvent = function (event, mode) {
      var dataOption = mode.extract(event);
      dataOption.each(function (data) {
        var offset = update(mode, data);
        offset.each(function (d) {
          events.trigger.move(d);
        });
      });
    };
    var events = $_vcrpanhjcgfo6bq.create({ move: Event(['info']) });
    return {
      onEvent: onEvent,
      reset: reset,
      events: events.registry
    };
  };

  var NoDrag = function (anchor) {
    var onEvent = function (event, mode) {
    };
    return {
      onEvent: onEvent,
      reset: $_51ccyzjhjcgfo560.noop
    };
  };

  var Movement = function () {
    var noDragState = NoDrag();
    var inDragState = InDrag();
    var dragState = noDragState;
    var on = function () {
      dragState.reset();
      dragState = inDragState;
    };
    var off = function () {
      dragState.reset();
      dragState = noDragState;
    };
    var onEvent = function (event, mode) {
      dragState.onEvent(event, mode);
    };
    var isOn = function () {
      return dragState === inDragState;
    };
    return {
      on: on,
      off: off,
      isOn: isOn,
      onEvent: onEvent,
      events: inDragState.events
    };
  };

  var adaptable = function (fn, rate) {
    var timer = null;
    var args = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
        args = null;
      }
    };
    var throttle = function () {
      args = arguments;
      if (timer === null) {
        timer = setTimeout(function () {
          fn.apply(null, args);
          timer = null;
          args = null;
        }, rate);
      }
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var first$4 = function (fn, rate) {
    var timer = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    var throttle = function () {
      var args = arguments;
      if (timer === null) {
        timer = setTimeout(function () {
          fn.apply(null, args);
          timer = null;
          args = null;
        }, rate);
      }
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var last$3 = function (fn, rate) {
    var timer = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    var throttle = function () {
      var args = arguments;
      if (timer !== null)
        clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(null, args);
        timer = null;
        args = null;
      }, rate);
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var $_fta7m9nujcgfo6g4 = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var setup = function (mutation, mode, settings) {
    var active = false;
    var events = $_vcrpanhjcgfo6bq.create({
      start: Event([]),
      stop: Event([])
    });
    var movement = Movement();
    var drop = function () {
      sink.stop();
      if (movement.isOn()) {
        movement.off();
        events.trigger.stop();
      }
    };
    var throttledDrop = $_fta7m9nujcgfo6g4.last(drop, 200);
    var go = function (parent) {
      sink.start(parent);
      movement.on();
      events.trigger.start();
    };
    var mousemove = function (event, ui) {
      throttledDrop.cancel();
      movement.onEvent(event, mode);
    };
    movement.events.move.bind(function (event) {
      mode.mutate(mutation, event.info());
    });
    var on = function () {
      active = true;
    };
    var off = function () {
      active = false;
    };
    var runIfActive = function (f) {
      return function () {
        var args = Array.prototype.slice.call(arguments, 0);
        if (active) {
          return f.apply(null, args);
        }
      };
    };
    var sink = mode.sink($_bjfzvznljcgfo6e0.api({
      forceDrop: drop,
      drop: runIfActive(drop),
      move: runIfActive(mousemove),
      delayDrop: runIfActive(throttledDrop.throttle)
    }), settings);
    var destroy = function () {
      sink.destroy();
    };
    return {
      element: sink.element,
      go: go,
      on: on,
      off: off,
      destroy: destroy,
      events: events.registry
    };
  };
  var $_d5ouznnqjcgfo6f8 = { setup: setup };

  var transform$1 = function (mutation, options) {
    var settings = options !== undefined ? options : {};
    var mode = settings.mode !== undefined ? settings.mode : MouseDrag;
    return $_d5ouznnqjcgfo6f8.setup(mutation, mode, options);
  };
  var $_cm0r5njjcgfo6db = { transform: transform$1 };

  var Mutation = function () {
    var events = $_vcrpanhjcgfo6bq.create({
      'drag': Event([
        'xDelta',
        'yDelta'
      ])
    });
    var mutate = function (x, y) {
      events.trigger.drag(x, y);
    };
    return {
      mutate: mutate,
      events: events.registry
    };
  };

  var BarMutation = function () {
    var events = $_vcrpanhjcgfo6bq.create({
      drag: Event([
        'xDelta',
        'yDelta',
        'target'
      ])
    });
    var target = $_ch5dzyjgjcgfo55s.none();
    var delegate = Mutation();
    delegate.events.drag.bind(function (event) {
      target.each(function (t) {
        events.trigger.drag(event.xDelta(), event.yDelta(), t);
      });
    });
    var assign = function (t) {
      target = $_ch5dzyjgjcgfo55s.some(t);
    };
    var get = function () {
      return target;
    };
    return {
      assign: assign,
      get: get,
      mutate: delegate.mutate,
      events: events.registry
    };
  };

  var any = function (selector) {
    return $_b13w5vkkjcgfo5eo.first(selector).isSome();
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_b13w5vkkjcgfo5eo.ancestor(scope, selector, isRoot).isSome();
  };
  var sibling$2 = function (scope, selector) {
    return $_b13w5vkkjcgfo5eo.sibling(scope, selector).isSome();
  };
  var child$3 = function (scope, selector) {
    return $_b13w5vkkjcgfo5eo.child(scope, selector).isSome();
  };
  var descendant$2 = function (scope, selector) {
    return $_b13w5vkkjcgfo5eo.descendant(scope, selector).isSome();
  };
  var closest$2 = function (scope, selector, isRoot) {
    return $_b13w5vkkjcgfo5eo.closest(scope, selector, isRoot).isSome();
  };
  var $_f6ivfonxjcgfo6gu = {
    any: any,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var resizeBarDragging = $_5iklfpmijcgfo63f.resolve('resizer-bar-dragging');
  var BarManager = function (wire, direction, hdirection) {
    var mutation = BarMutation();
    var resizing = $_cm0r5njjcgfo6db.transform(mutation, {});
    var hoverTable = $_ch5dzyjgjcgfo55s.none();
    var getResizer = function (element, type) {
      return $_ch5dzyjgjcgfo55s.from($_fo5ow8kfjcgfo5ds.get(element, type));
    };
    mutation.events.drag.bind(function (event) {
      getResizer(event.target(), 'data-row').each(function (_dataRow) {
        var currentRow = $_agj76gmyjcgfo66h.getInt(event.target(), 'top');
        $_6vnepekojcgfo5fy.set(event.target(), 'top', currentRow + event.yDelta() + 'px');
      });
      getResizer(event.target(), 'data-column').each(function (_dataCol) {
        var currentCol = $_agj76gmyjcgfo66h.getInt(event.target(), 'left');
        $_6vnepekojcgfo5fy.set(event.target(), 'left', currentCol + event.xDelta() + 'px');
      });
    });
    var getDelta = function (target, direction) {
      var newX = $_agj76gmyjcgfo66h.getInt(target, direction);
      var oldX = parseInt($_fo5ow8kfjcgfo5ds.get(target, 'data-initial-' + direction), 10);
      return newX - oldX;
    };
    resizing.events.stop.bind(function () {
      mutation.get().each(function (target) {
        hoverTable.each(function (table) {
          getResizer(target, 'data-row').each(function (row) {
            var delta = getDelta(target, 'top');
            $_fo5ow8kfjcgfo5ds.remove(target, 'data-initial-top');
            events.trigger.adjustHeight(table, delta, parseInt(row, 10));
          });
          getResizer(target, 'data-column').each(function (column) {
            var delta = getDelta(target, 'left');
            $_fo5ow8kfjcgfo5ds.remove(target, 'data-initial-left');
            events.trigger.adjustWidth(table, delta, parseInt(column, 10));
          });
          $_bp4qrbmejcgfo61f.refresh(wire, table, hdirection, direction);
        });
      });
    });
    var handler = function (target, direction) {
      events.trigger.startAdjust();
      mutation.assign(target);
      $_fo5ow8kfjcgfo5ds.set(target, 'data-initial-' + direction, parseInt($_6vnepekojcgfo5fy.get(target, direction), 10));
      $_18cpvgmkjcgfo63o.add(target, resizeBarDragging);
      $_6vnepekojcgfo5fy.set(target, 'opacity', '0.2');
      resizing.go(wire.parent());
    };
    var mousedown = $_4y6wehnojcgfo6ex.bind(wire.parent(), 'mousedown', function (event) {
      if ($_bp4qrbmejcgfo61f.isRowBar(event.target()))
        handler(event.target(), 'top');
      if ($_bp4qrbmejcgfo61f.isColBar(event.target()))
        handler(event.target(), 'left');
    });
    var isRoot = function (e) {
      return $_1miv10jyjcgfo5b7.eq(e, wire.view());
    };
    var mouseover = $_4y6wehnojcgfo6ex.bind(wire.view(), 'mouseover', function (event) {
      if ($_4zgqn9kgjcgfo5e6.name(event.target()) === 'table' || $_f6ivfonxjcgfo6gu.ancestor(event.target(), 'table', isRoot)) {
        hoverTable = $_4zgqn9kgjcgfo5e6.name(event.target()) === 'table' ? $_ch5dzyjgjcgfo55s.some(event.target()) : $_b13w5vkkjcgfo5eo.ancestor(event.target(), 'table', isRoot);
        hoverTable.each(function (ht) {
          $_bp4qrbmejcgfo61f.refresh(wire, ht, hdirection, direction);
        });
      } else if ($_45wfmkjjcgfo5ei.inBody(event.target())) {
        $_bp4qrbmejcgfo61f.destroy(wire);
      }
    });
    var destroy = function () {
      mousedown.unbind();
      mouseover.unbind();
      resizing.destroy();
      $_bp4qrbmejcgfo61f.destroy(wire);
    };
    var refresh = function (tbl) {
      $_bp4qrbmejcgfo61f.refresh(wire, tbl, hdirection, direction);
    };
    var events = $_vcrpanhjcgfo6bq.create({
      adjustHeight: Event([
        'table',
        'delta',
        'row'
      ]),
      adjustWidth: Event([
        'table',
        'delta',
        'column'
      ]),
      startAdjust: Event([])
    });
    return {
      destroy: destroy,
      refresh: refresh,
      on: resizing.on,
      off: resizing.off,
      hideBars: $_51ccyzjhjcgfo560.curry($_bp4qrbmejcgfo61f.hide, wire),
      showBars: $_51ccyzjhjcgfo560.curry($_bp4qrbmejcgfo61f.show, wire),
      events: events.registry
    };
  };

  var TableResize = function (wire, vdirection) {
    var hdirection = $_f2292ulvjcgfo5uj.height;
    var manager = BarManager(wire, vdirection, hdirection);
    var events = $_vcrpanhjcgfo6bq.create({
      beforeResize: Event(['table']),
      afterResize: Event(['table']),
      startDrag: Event([])
    });
    manager.events.adjustHeight.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = hdirection.delta(event.delta(), event.table());
      $_4gbrhmujcgfo65g.adjustHeight(event.table(), delta, event.row(), hdirection);
      events.trigger.afterResize(event.table());
    });
    manager.events.startAdjust.bind(function (event) {
      events.trigger.startDrag();
    });
    manager.events.adjustWidth.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = vdirection.delta(event.delta(), event.table());
      $_4gbrhmujcgfo65g.adjustWidth(event.table(), delta, event.column(), vdirection);
      events.trigger.afterResize(event.table());
    });
    return {
      on: manager.on,
      off: manager.off,
      hideBars: manager.hideBars,
      showBars: manager.showBars,
      destroy: manager.destroy,
      events: events.registry
    };
  };

  var createContainer = function () {
    var container = $_epp4kejujcgfo5a8.fromTag('div');
    $_6vnepekojcgfo5fy.setAll(container, {
      position: 'static',
      height: '0',
      width: '0',
      padding: '0',
      margin: '0',
      border: '0'
    });
    $_9fuysnkqjcgfo5gl.append($_45wfmkjjcgfo5ei.body(), container);
    return container;
  };
  var get$8 = function (editor, container) {
    return editor.inline ? $_ex2i02nejcgfo6al.body($_4uo12an1jcgfo67g.getBody(editor), createContainer()) : $_ex2i02nejcgfo6al.only($_epp4kejujcgfo5a8.fromDom(editor.getDoc()));
  };
  var remove$6 = function (editor, wire) {
    if (editor.inline) {
      $_9z98yykrjcgfo5go.remove(wire.parent());
    }
  };
  var $_89gwu5nyjcgfo6gx = {
    get: get$8,
    remove: remove$6
  };

  var ResizeHandler = function (editor) {
    var selectionRng = $_ch5dzyjgjcgfo55s.none();
    var resize = $_ch5dzyjgjcgfo55s.none();
    var wire = $_ch5dzyjgjcgfo55s.none();
    var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
    var startW, startRawW;
    var isTable = function (elm) {
      return elm.nodeName === 'TABLE';
    };
    var getRawWidth = function (elm) {
      return editor.dom.getStyle(elm, 'width') || editor.dom.getAttrib(elm, 'width');
    };
    var lazyResize = function () {
      return resize;
    };
    var lazyWire = function () {
      return wire.getOr($_ex2i02nejcgfo6al.only($_epp4kejujcgfo5a8.fromDom(editor.getBody())));
    };
    var destroy = function () {
      resize.each(function (sz) {
        sz.destroy();
      });
      wire.each(function (w) {
        $_89gwu5nyjcgfo6gx.remove(editor, w);
      });
    };
    editor.on('init', function () {
      var direction = TableDirection($_67pjjwn2jcgfo67n.directionAt);
      var rawWire = $_89gwu5nyjcgfo6gx.get(editor);
      wire = $_ch5dzyjgjcgfo55s.some(rawWire);
      if (editor.settings.object_resizing && editor.settings.table_resize_bars !== false && (editor.settings.object_resizing === true || editor.settings.object_resizing === 'table')) {
        var sz = TableResize(rawWire, direction);
        sz.on();
        sz.events.startDrag.bind(function (event) {
          selectionRng = $_ch5dzyjgjcgfo55s.some(editor.selection.getRng());
        });
        sz.events.afterResize.bind(function (event) {
          var table = event.table();
          var dataStyleCells = $_cc9vyekhjcgfo5e9.descendants(table, 'td[data-mce-style],th[data-mce-style]');
          $_epd2qyjfjcgfo55m.each(dataStyleCells, function (cell) {
            $_fo5ow8kfjcgfo5ds.remove(cell, 'data-mce-style');
          });
          selectionRng.each(function (rng) {
            editor.selection.setRng(rng);
            editor.focus();
          });
          editor.undoManager.add();
        });
        resize = $_ch5dzyjgjcgfo55s.some(sz);
      }
    });
    editor.on('ObjectResizeStart', function (e) {
      if (isTable(e.target)) {
        startW = e.width;
        startRawW = getRawWidth(e.target);
      }
    });
    editor.on('ObjectResized', function (e) {
      if (isTable(e.target)) {
        var table = e.target;
        if (percentageBasedSizeRegex.test(startRawW)) {
          var percentW = parseFloat(percentageBasedSizeRegex.exec(startRawW)[1]);
          var targetPercentW = e.width * percentW / startW;
          editor.dom.setStyle(table, 'width', targetPercentW + '%');
        } else {
          var newCellSizes_1 = [];
          Tools.each(table.rows, function (row) {
            Tools.each(row.cells, function (cell) {
              var width = editor.dom.getStyle(cell, 'width', true);
              newCellSizes_1.push({
                cell: cell,
                width: width
              });
            });
          });
          Tools.each(newCellSizes_1, function (newCellSize) {
            editor.dom.setStyle(newCellSize.cell, 'width', newCellSize.width);
            editor.dom.setAttrib(newCellSize.cell, 'width', null);
          });
        }
      }
    });
    return {
      lazyResize: lazyResize,
      lazyWire: lazyWire,
      destroy: destroy
    };
  };

  var none$2 = function (current) {
    return folder$1(function (n, f, m, l) {
      return n(current);
    });
  };
  var first$5 = function (current) {
    return folder$1(function (n, f, m, l) {
      return f(current);
    });
  };
  var middle$1 = function (current, target) {
    return folder$1(function (n, f, m, l) {
      return m(current, target);
    });
  };
  var last$4 = function (current) {
    return folder$1(function (n, f, m, l) {
      return l(current);
    });
  };
  var folder$1 = function (fold) {
    return { fold: fold };
  };
  var $_eaigbbo1jcgfo6il = {
    none: none$2,
    first: first$5,
    middle: middle$1,
    last: last$4
  };

  var detect$4 = function (current, isRoot) {
    return $_7pxq74jrjcgfo58f.table(current, isRoot).bind(function (table) {
      var all = $_7pxq74jrjcgfo58f.cells(table);
      var index = $_epd2qyjfjcgfo55m.findIndex(all, function (x) {
        return $_1miv10jyjcgfo5b7.eq(current, x);
      });
      return index.map(function (ind) {
        return {
          index: $_51ccyzjhjcgfo560.constant(ind),
          all: $_51ccyzjhjcgfo560.constant(all)
        };
      });
    });
  };
  var next = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_eaigbbo1jcgfo6il.none(current);
    }, function (info) {
      return info.index() + 1 < info.all().length ? $_eaigbbo1jcgfo6il.middle(current, info.all()[info.index() + 1]) : $_eaigbbo1jcgfo6il.last(current);
    });
  };
  var prev = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_eaigbbo1jcgfo6il.none();
    }, function (info) {
      return info.index() - 1 >= 0 ? $_eaigbbo1jcgfo6il.middle(current, info.all()[info.index() - 1]) : $_eaigbbo1jcgfo6il.first(current);
    });
  };
  var $_6rak9ho0jcgfo6ia = {
    next: next,
    prev: prev
  };

  var adt = $_bmrdjblhjcgfo5qb.generate([
    { 'before': ['element'] },
    {
      'on': [
        'element',
        'offset'
      ]
    },
    { after: ['element'] }
  ]);
  var cata$1 = function (subject, onBefore, onOn, onAfter) {
    return subject.fold(onBefore, onOn, onAfter);
  };
  var getStart$1 = function (situ) {
    return situ.fold($_51ccyzjhjcgfo560.identity, $_51ccyzjhjcgfo560.identity, $_51ccyzjhjcgfo560.identity);
  };
  var $_geowewo3jcgfo6iy = {
    before: adt.before,
    on: adt.on,
    after: adt.after,
    cata: cata$1,
    getStart: getStart$1
  };

  var type$2 = $_bmrdjblhjcgfo5qb.generate([
    { domRange: ['rng'] },
    {
      relative: [
        'startSitu',
        'finishSitu'
      ]
    },
    {
      exact: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var range$2 = $_6w2qyfjkjcgfo57c.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$2.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_epp4kejujcgfo5a8.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_geowewo3jcgfo6iy.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart(selection);
    return $_4k5ag6jwjcgfo5aj.defaultView(start);
  };
  var $_fbzsxho2jcgfo6io = {
    domRange: type$2.domRange,
    relative: type$2.relative,
    exact: type$2.exact,
    exactFromRange: exactFromRange,
    range: range$2,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_4k5ag6jwjcgfo5aj.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_epp4kejujcgfo5a8.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_1miv10jyjcgfo5b7.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_7qvepno5jcgfo6jj = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_epd2qyjfjcgfo55m.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_epp4kejujcgfo5a8.fromDom(fragment);
  };
  var $_56q7zo6jcgfo6jm = { fromElements: fromElements };

  var selectNodeContents = function (win, element) {
    var rng = win.document.createRange();
    selectNodeContentsUsing(rng, element);
    return rng;
  };
  var selectNodeContentsUsing = function (rng, element) {
    rng.selectNodeContents(element.dom());
  };
  var isWithin$1 = function (outerRange, innerRange) {
    return innerRange.compareBoundaryPoints(outerRange.END_TO_START, outerRange) < 1 && innerRange.compareBoundaryPoints(outerRange.START_TO_END, outerRange) > -1;
  };
  var create$1 = function (win) {
    return win.document.createRange();
  };
  var setStart = function (rng, situ) {
    situ.fold(function (e) {
      rng.setStartBefore(e.dom());
    }, function (e, o) {
      rng.setStart(e.dom(), o);
    }, function (e) {
      rng.setStartAfter(e.dom());
    });
  };
  var setFinish = function (rng, situ) {
    situ.fold(function (e) {
      rng.setEndBefore(e.dom());
    }, function (e, o) {
      rng.setEnd(e.dom(), o);
    }, function (e) {
      rng.setEndAfter(e.dom());
    });
  };
  var replaceWith = function (rng, fragment) {
    deleteContents(rng);
    rng.insertNode(fragment.dom());
  };
  var relativeToNative = function (win, startSitu, finishSitu) {
    var range = win.document.createRange();
    setStart(range, startSitu);
    setFinish(range, finishSitu);
    return range;
  };
  var exactToNative = function (win, start, soffset, finish, foffset) {
    var rng = win.document.createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var deleteContents = function (rng) {
    rng.deleteContents();
  };
  var cloneFragment = function (rng) {
    var fragment = rng.cloneContents();
    return $_epp4kejujcgfo5a8.fromDom(fragment);
  };
  var toRect = function (rect) {
    return {
      left: $_51ccyzjhjcgfo560.constant(rect.left),
      top: $_51ccyzjhjcgfo560.constant(rect.top),
      right: $_51ccyzjhjcgfo560.constant(rect.right),
      bottom: $_51ccyzjhjcgfo560.constant(rect.bottom),
      width: $_51ccyzjhjcgfo560.constant(rect.width),
      height: $_51ccyzjhjcgfo560.constant(rect.height)
    };
  };
  var getFirstRect$1 = function (rng) {
    var rects = rng.getClientRects();
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_ch5dzyjgjcgfo55s.some(rect).map(toRect) : $_ch5dzyjgjcgfo55s.none();
  };
  var getBounds$2 = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_ch5dzyjgjcgfo55s.some(rect).map(toRect) : $_ch5dzyjgjcgfo55s.none();
  };
  var toString = function (rng) {
    return rng.toString();
  };
  var $_8bed0co7jcgfo6js = {
    create: create$1,
    replaceWith: replaceWith,
    selectNodeContents: selectNodeContents,
    selectNodeContentsUsing: selectNodeContentsUsing,
    relativeToNative: relativeToNative,
    exactToNative: exactToNative,
    deleteContents: deleteContents,
    cloneFragment: cloneFragment,
    getFirstRect: getFirstRect$1,
    getBounds: getBounds$2,
    isWithin: isWithin$1,
    toString: toString
  };

  var adt$1 = $_bmrdjblhjcgfo5qb.generate([
    {
      ltr: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    },
    {
      rtl: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var fromRange = function (win, type, range) {
    return type($_epp4kejujcgfo5a8.fromDom(range.startContainer), range.startOffset, $_epp4kejujcgfo5a8.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_51ccyzjhjcgfo560.constant(rng),
          rtl: $_ch5dzyjgjcgfo55s.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_75hcuik4jcgfo5ca.cached(function () {
            return $_8bed0co7jcgfo6js.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_75hcuik4jcgfo5ca.cached(function () {
            return $_ch5dzyjgjcgfo55s.some($_8bed0co7jcgfo6js.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_75hcuik4jcgfo5ca.cached(function () {
            return $_8bed0co7jcgfo6js.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_75hcuik4jcgfo5ca.cached(function () {
            return $_ch5dzyjgjcgfo55s.some($_8bed0co7jcgfo6js.exactToNative(win, finish, foffset, start, soffset));
          })
        };
      }
    });
  };
  var doDiagnose = function (win, ranges) {
    var rng = ranges.ltr();
    if (rng.collapsed) {
      var reversed = ranges.rtl().filter(function (rev) {
        return rev.collapsed === false;
      });
      return reversed.map(function (rev) {
        return adt$1.rtl($_epp4kejujcgfo5a8.fromDom(rev.endContainer), rev.endOffset, $_epp4kejujcgfo5a8.fromDom(rev.startContainer), rev.startOffset);
      }).getOrThunk(function () {
        return fromRange(win, adt$1.ltr, rng);
      });
    } else {
      return fromRange(win, adt$1.ltr, rng);
    }
  };
  var diagnose = function (win, selection) {
    var ranges = getRanges(win, selection);
    return doDiagnose(win, ranges);
  };
  var asLtrRange = function (win, selection) {
    var diagnosis = diagnose(win, selection);
    return diagnosis.match({
      ltr: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(start.dom(), soffset);
        rng.setEnd(finish.dom(), foffset);
        return rng;
      },
      rtl: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(finish.dom(), foffset);
        rng.setEnd(start.dom(), soffset);
        return rng;
      }
    });
  };
  var $_fj2csko8jcgfo6k3 = {
    ltr: adt$1.ltr,
    rtl: adt$1.rtl,
    diagnose: diagnose,
    asLtrRange: asLtrRange
  };

  var searchForPoint = function (rectForOffset, x, y, maxX, length) {
    if (length === 0)
      return 0;
    else if (x === maxX)
      return length - 1;
    var xDelta = maxX;
    for (var i = 1; i < length; i++) {
      var rect = rectForOffset(i);
      var curDeltaX = Math.abs(x - rect.left);
      if (y > rect.bottom) {
      } else if (y < rect.top || curDeltaX > xDelta) {
        return i - 1;
      } else {
        xDelta = curDeltaX;
      }
    }
    return 0;
  };
  var inRect = function (rect, x, y) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };
  var $_1blihtobjcgfo6l1 = {
    inRect: inRect,
    searchForPoint: searchForPoint
  };

  var locateOffset = function (doc, textnode, x, y, rect) {
    var rangeForOffset = function (offset) {
      var r = doc.dom().createRange();
      r.setStart(textnode.dom(), offset);
      r.collapse(true);
      return r;
    };
    var rectForOffset = function (offset) {
      var r = rangeForOffset(offset);
      return r.getBoundingClientRect();
    };
    var length = $_cjrygqkxjcgfo5it.get(textnode).length;
    var offset = $_1blihtobjcgfo6l1.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate$1 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_x980jm9jcgfo5zn.findMap(rects, function (rect) {
      return $_1blihtobjcgfo6l1.inRect(rect, x, y) ? $_ch5dzyjgjcgfo55s.some(rect) : $_ch5dzyjgjcgfo55s.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_fxxvxqocjcgfo6l4 = { locate: locate$1 };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_4k5ag6jwjcgfo5aj.children(node);
    return $_x980jm9jcgfo5zn.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_1blihtobjcgfo6l1.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : $_ch5dzyjgjcgfo55s.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_4zgqn9kgjcgfo5e6.isText(node) ? $_fxxvxqocjcgfo6l4.locate : searchInChildren;
    return locator(doc, node, x, y);
  };
  var locate = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return locateNode(doc, node, boundedX, boundedY);
  };
  var $_2q1p5eoajcgfo6kt = { locate: locate };

  var COLLAPSE_TO_LEFT = true;
  var COLLAPSE_TO_RIGHT = false;
  var getCollapseDirection = function (rect, x) {
    return x - rect.left < rect.right - x ? COLLAPSE_TO_LEFT : COLLAPSE_TO_RIGHT;
  };
  var createCollapsedNode = function (doc, target, collapseDirection) {
    var r = doc.dom().createRange();
    r.selectNode(target.dom());
    r.collapse(collapseDirection);
    return r;
  };
  var locateInElement = function (doc, node, x) {
    var cursorRange = doc.dom().createRange();
    cursorRange.selectNode(node.dom());
    var rect = cursorRange.getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_bwsvmpkvjcgfo5ih.first : $_bwsvmpkvjcgfo5ih.last;
    return f(node).map(function (target) {
      return createCollapsedNode(doc, target, collapseDirection);
    });
  };
  var locateInEmpty = function (doc, node, x) {
    var rect = node.dom().getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    return $_ch5dzyjgjcgfo55s.some(createCollapsedNode(doc, node, collapseDirection));
  };
  var search = function (doc, node, x) {
    var f = $_4k5ag6jwjcgfo5aj.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_fb1uamodjcgfo6le = { search: search };

  var caretPositionFromPoint = function (doc, x, y) {
    return $_ch5dzyjgjcgfo55s.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
      if (pos.offsetNode === null)
        return $_ch5dzyjgjcgfo55s.none();
      var r = doc.dom().createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse();
      return $_ch5dzyjgjcgfo55s.some(r);
    });
  };
  var caretRangeFromPoint = function (doc, x, y) {
    return $_ch5dzyjgjcgfo55s.from(doc.dom().caretRangeFromPoint(x, y));
  };
  var searchTextNodes = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return $_2q1p5eoajcgfo6kt.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_epp4kejujcgfo5a8.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_fb1uamodjcgfo6le.search(doc, elem, x);
      };
      return $_4k5ag6jwjcgfo5aj.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_epp4kejujcgfo5a8.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_fbzsxho2jcgfo6io.range($_epp4kejujcgfo5a8.fromDom(rng.startContainer), rng.startOffset, $_epp4kejujcgfo5a8.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_4lqseo9jcgfo6km = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_8bed0co7jcgfo6js.create(win);
    var self = $_4p0ah3jtjcgfo59y.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_cc9vyekhjcgfo5e9.descendants(ancestor, selector));
    return $_epd2qyjfjcgfo55m.filter(elements, function (elem) {
      $_8bed0co7jcgfo6js.selectNodeContentsUsing(innerRange, elem);
      return $_8bed0co7jcgfo6js.isWithin(outerRange, innerRange);
    });
  };
  var find$3 = function (win, selection, selector) {
    var outerRange = $_fj2csko8jcgfo6k3.asLtrRange(win, selection);
    var ancestor = $_epp4kejujcgfo5a8.fromDom(outerRange.commonAncestorContainer);
    return $_4zgqn9kgjcgfo5e6.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_3jz7wqoejcgfo6lk = { find: find$3 };

  var beforeSpecial = function (element, offset) {
    var name = $_4zgqn9kgjcgfo5e6.name(element);
    if ('input' === name)
      return $_geowewo3jcgfo6iy.after(element);
    else if (!$_epd2qyjfjcgfo55m.contains([
        'br',
        'img'
      ], name))
      return $_geowewo3jcgfo6iy.on(element, offset);
    else
      return offset === 0 ? $_geowewo3jcgfo6iy.before(element) : $_geowewo3jcgfo6iy.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_geowewo3jcgfo6iy.before, beforeSpecial, $_geowewo3jcgfo6iy.after);
    var finish = finishSitu.fold($_geowewo3jcgfo6iy.before, beforeSpecial, $_geowewo3jcgfo6iy.after);
    return $_fbzsxho2jcgfo6io.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_fbzsxho2jcgfo6io.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_epp4kejujcgfo5a8.fromDom(rng.startContainer);
        var finish = $_epp4kejujcgfo5a8.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_bancglofjcgfo6lq = {
    beforeSpecial: beforeSpecial,
    preprocess: preprocess,
    preprocessRelative: preprocessRelative,
    preprocessExact: preprocessExact
  };

  var doSetNativeRange = function (win, rng) {
    $_ch5dzyjgjcgfo55s.from(win.getSelection()).each(function (selection) {
      selection.removeAllRanges();
      selection.addRange(rng);
    });
  };
  var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = $_8bed0co7jcgfo6js.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_3jz7wqoejcgfo6lk.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_fj2csko8jcgfo6k3.diagnose(win, relative).match({
      ltr: function (start, soffset, finish, foffset) {
        doSetRange(win, start, soffset, finish, foffset);
      },
      rtl: function (start, soffset, finish, foffset) {
        var selection = win.getSelection();
        if (selection.extend) {
          selection.collapse(start.dom(), soffset);
          selection.extend(finish.dom(), foffset);
        } else {
          doSetRange(win, finish, foffset, start, soffset);
        }
      }
    });
  };
  var setExact = function (win, start, soffset, finish, foffset) {
    var relative = $_bancglofjcgfo6lq.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_bancglofjcgfo6lq.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_fbzsxho2jcgfo6io.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_8bed0co7jcgfo6js.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_bancglofjcgfo6lq.preprocess(selection);
    return $_fj2csko8jcgfo6k3.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return $_ch5dzyjgjcgfo55s.some($_fbzsxho2jcgfo6io.range($_epp4kejujcgfo5a8.fromDom(firstRng.startContainer), firstRng.startOffset, $_epp4kejujcgfo5a8.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return $_ch5dzyjgjcgfo55s.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_epp4kejujcgfo5a8.fromDom(selection.anchorNode);
    var focusNode = $_epp4kejujcgfo5a8.fromDom(selection.focusNode);
    return $_7qvepno5jcgfo6jj.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? $_ch5dzyjgjcgfo55s.some($_fbzsxho2jcgfo6io.range($_epp4kejujcgfo5a8.fromDom(selection.anchorNode), selection.anchorOffset, $_epp4kejujcgfo5a8.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_8bed0co7jcgfo6js.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_8bed0co7jcgfo6js.selectNodeContents(win, element);
    return $_fbzsxho2jcgfo6io.range($_epp4kejujcgfo5a8.fromDom(rng.startContainer), rng.startOffset, $_epp4kejujcgfo5a8.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : $_ch5dzyjgjcgfo55s.none();
  };
  var get$9 = function (win) {
    return getExact(win).map(function (range) {
      return $_fbzsxho2jcgfo6io.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect = function (win, selection) {
    var rng = $_fj2csko8jcgfo6k3.asLtrRange(win, selection);
    return $_8bed0co7jcgfo6js.getFirstRect(rng);
  };
  var getBounds$1 = function (win, selection) {
    var rng = $_fj2csko8jcgfo6k3.asLtrRange(win, selection);
    return $_8bed0co7jcgfo6js.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_4lqseo9jcgfo6km.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_fj2csko8jcgfo6k3.asLtrRange(win, selection);
    return $_8bed0co7jcgfo6js.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$2 = function (win, selection) {
    var rng = $_fj2csko8jcgfo6k3.asLtrRange(win, selection);
    return $_8bed0co7jcgfo6js.cloneFragment(rng);
  };
  var replace$1 = function (win, selection, elements) {
    var rng = $_fj2csko8jcgfo6k3.asLtrRange(win, selection);
    var fragment = $_56q7zo6jcgfo6jm.fromElements(elements, win.document);
    $_8bed0co7jcgfo6js.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_fj2csko8jcgfo6k3.asLtrRange(win, selection);
    $_8bed0co7jcgfo6js.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_1miv10jyjcgfo5b7.eq(start, finish) && soffset === foffset;
  };
  var $_fbbzdvo4jcgfo6j7 = {
    setExact: setExact,
    getExact: getExact,
    get: get$9,
    setRelative: setRelative,
    toNative: toNative,
    setToElement: setToElement,
    clear: clear$1,
    clone: clone$2,
    replace: replace$1,
    deleteAt: deleteAt,
    forElement: forElement,
    getFirstRect: getFirstRect,
    getBounds: getBounds$1,
    getAtPoint: getAtPoint,
    findWithin: findWithin,
    getAsString: getAsString,
    isCollapsed: isCollapsed
  };

  var VK = tinymce.util.Tools.resolve('tinymce.util.VK');

  var forward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_6rak9ho0jcgfo6ia.next(cell), lazyWire);
  };
  var backward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_6rak9ho0jcgfo6ia.prev(cell), lazyWire);
  };
  var getCellFirstCursorPosition = function (editor, cell) {
    var selection = $_fbzsxho2jcgfo6io.exact(cell, 0, cell, 0);
    return $_fbbzdvo4jcgfo6j7.toNative(selection);
  };
  var getNewRowCursorPosition = function (editor, table) {
    var rows = $_cc9vyekhjcgfo5e9.descendants(table, 'tr');
    return $_epd2qyjfjcgfo55m.last(rows).bind(function (last) {
      return $_b13w5vkkjcgfo5eo.descendant(last, 'td,th').map(function (first) {
        return getCellFirstCursorPosition(editor, first);
      });
    });
  };
  var go = function (editor, isRoot, cell, actions, lazyWire) {
    return cell.fold($_ch5dzyjgjcgfo55s.none, $_ch5dzyjgjcgfo55s.none, function (current, next) {
      return $_bwsvmpkvjcgfo5ih.first(next).map(function (cell) {
        return getCellFirstCursorPosition(editor, cell);
      });
    }, function (current) {
      return $_7pxq74jrjcgfo58f.table(current, isRoot).bind(function (table) {
        var targets = $_i3neol0jcgfo5jb.noMenu(current);
        editor.undoManager.transact(function () {
          actions.insertRowsAfter(table, targets);
        });
        return getNewRowCursorPosition(editor, table);
      });
    });
  };
  var rootElements = [
    'table',
    'li',
    'dl'
  ];
  var handle$1 = function (event, editor, actions, lazyWire) {
    if (event.keyCode === VK.TAB) {
      var body_1 = $_4uo12an1jcgfo67g.getBody(editor);
      var isRoot_1 = function (element) {
        var name = $_4zgqn9kgjcgfo5e6.name(element);
        return $_1miv10jyjcgfo5b7.eq(element, body_1) || $_epd2qyjfjcgfo55m.contains(rootElements, name);
      };
      var rng = editor.selection.getRng();
      if (rng.collapsed) {
        var start = $_epp4kejujcgfo5a8.fromDom(rng.startContainer);
        $_7pxq74jrjcgfo58f.cell(start, isRoot_1).each(function (cell) {
          event.preventDefault();
          var navigation = event.shiftKey ? backward : forward;
          var rng = navigation(editor, isRoot_1, cell, actions, lazyWire);
          rng.each(function (range) {
            editor.selection.setRng(range);
          });
        });
      }
    }
  };
  var $_e0rtlknzjcgfo6hd = { handle: handle$1 };

  var response = $_6w2qyfjkjcgfo57c.immutable('selection', 'kill');
  var $_8677ndojjcgfo6nx = { response: response };

  var isKey = function (key) {
    return function (keycode) {
      return keycode === key;
    };
  };
  var isUp = isKey(38);
  var isDown = isKey(40);
  var isNavigation = function (keycode) {
    return keycode >= 37 && keycode <= 40;
  };
  var $_416maxokjcgfo6o2 = {
    ltr: {
      isBackward: isKey(37),
      isForward: isKey(39)
    },
    rtl: {
      isBackward: isKey(39),
      isForward: isKey(37)
    },
    isUp: isUp,
    isDown: isDown,
    isNavigation: isNavigation
  };

  var convertToRange = function (win, selection) {
    var rng = $_fj2csko8jcgfo6k3.asLtrRange(win, selection);
    return {
      start: $_51ccyzjhjcgfo560.constant($_epp4kejujcgfo5a8.fromDom(rng.startContainer)),
      soffset: $_51ccyzjhjcgfo560.constant(rng.startOffset),
      finish: $_51ccyzjhjcgfo560.constant($_epp4kejujcgfo5a8.fromDom(rng.endContainer)),
      foffset: $_51ccyzjhjcgfo560.constant(rng.endOffset)
    };
  };
  var makeSitus = function (start, soffset, finish, foffset) {
    return {
      start: $_51ccyzjhjcgfo560.constant($_geowewo3jcgfo6iy.on(start, soffset)),
      finish: $_51ccyzjhjcgfo560.constant($_geowewo3jcgfo6iy.on(finish, foffset))
    };
  };
  var $_b7pmniomjcgfo6oy = {
    convertToRange: convertToRange,
    makeSitus: makeSitus
  };

  var isSafari = $_1x7x33k3jcgfo5c3.detect().browser.isSafari();
  var get$10 = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
    var y = doc.body.scrollTop || doc.documentElement.scrollTop;
    return r(x, y);
  };
  var to = function (x, y, _doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var win = doc.defaultView;
    win.scrollTo(x, y);
  };
  var by = function (x, y, _doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var win = doc.defaultView;
    win.scrollBy(x, y);
  };
  var setToElement$1 = function (win, element) {
    var pos = $_d1l3b5lwjcgfo5vb.absolute(element);
    var doc = $_epp4kejujcgfo5a8.fromDom(win.document);
    to(pos.left(), pos.top(), doc);
  };
  var preserve$1 = function (doc, f) {
    var before = get$10(doc);
    f();
    var after = get$10(doc);
    if (before.top() !== after.top() || before.left() !== after.left()) {
      to(before.left(), before.top(), doc);
    }
  };
  var capture$2 = function (doc) {
    var previous = $_ch5dzyjgjcgfo55s.none();
    var save = function () {
      previous = $_ch5dzyjgjcgfo55s.some(get$10(doc));
    };
    var restore = function () {
      previous.each(function (p) {
        to(p.left(), p.top(), doc);
      });
    };
    save();
    return {
      save: save,
      restore: restore
    };
  };
  var intoView = function (element, alignToTop) {
    if (isSafari && $_9ccf2jojcgfo57o.isFunction(element.dom().scrollIntoViewIfNeeded)) {
      element.dom().scrollIntoViewIfNeeded(false);
    } else {
      element.dom().scrollIntoView(alignToTop);
    }
  };
  var intoViewIfNeeded = function (element, container) {
    var containerBox = container.dom().getBoundingClientRect();
    var elementBox = element.dom().getBoundingClientRect();
    if (elementBox.top < containerBox.top) {
      intoView(element, true);
    } else if (elementBox.bottom > containerBox.bottom) {
      intoView(element, false);
    }
  };
  var scrollBarWidth = function () {
    var scrollDiv = $_epp4kejujcgfo5a8.fromHtml('<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;"></div>');
    $_9fuysnkqjcgfo5gl.after($_45wfmkjjcgfo5ei.body(), scrollDiv);
    var w = scrollDiv.dom().offsetWidth - scrollDiv.dom().clientWidth;
    $_9z98yykrjcgfo5go.remove(scrollDiv);
    return w;
  };
  var $_bgquj6onjcgfo6pg = {
    get: get$10,
    to: to,
    by: by,
    preserve: preserve$1,
    capture: capture$2,
    intoView: intoView,
    intoViewIfNeeded: intoViewIfNeeded,
    setToElement: setToElement$1,
    scrollBarWidth: scrollBarWidth
  };

  var WindowBridge = function (win) {
    var elementFromPoint = function (x, y) {
      return $_ch5dzyjgjcgfo55s.from(win.document.elementFromPoint(x, y)).map($_epp4kejujcgfo5a8.fromDom);
    };
    var getRect = function (element) {
      return element.dom().getBoundingClientRect();
    };
    var getRangedRect = function (start, soffset, finish, foffset) {
      var sel = $_fbzsxho2jcgfo6io.exact(start, soffset, finish, foffset);
      return $_fbbzdvo4jcgfo6j7.getFirstRect(win, sel).map(function (structRect) {
        return $_9lvqaqjjjcgfo578.map(structRect, $_51ccyzjhjcgfo560.apply);
      });
    };
    var getSelection = function () {
      return $_fbbzdvo4jcgfo6j7.get(win).map(function (exactAdt) {
        return $_b7pmniomjcgfo6oy.convertToRange(win, exactAdt);
      });
    };
    var fromSitus = function (situs) {
      var relative = $_fbzsxho2jcgfo6io.relative(situs.start(), situs.finish());
      return $_b7pmniomjcgfo6oy.convertToRange(win, relative);
    };
    var situsFromPoint = function (x, y) {
      return $_fbbzdvo4jcgfo6j7.getAtPoint(win, x, y).map(function (exact) {
        return {
          start: $_51ccyzjhjcgfo560.constant($_geowewo3jcgfo6iy.on(exact.start(), exact.soffset())),
          finish: $_51ccyzjhjcgfo560.constant($_geowewo3jcgfo6iy.on(exact.finish(), exact.foffset()))
        };
      });
    };
    var clearSelection = function () {
      $_fbbzdvo4jcgfo6j7.clear(win);
    };
    var selectContents = function (element) {
      $_fbbzdvo4jcgfo6j7.setToElement(win, element);
    };
    var setSelection = function (sel) {
      $_fbbzdvo4jcgfo6j7.setExact(win, sel.start(), sel.soffset(), sel.finish(), sel.foffset());
    };
    var setRelativeSelection = function (start, finish) {
      $_fbbzdvo4jcgfo6j7.setRelative(win, start, finish);
    };
    var getInnerHeight = function () {
      return win.innerHeight;
    };
    var getScrollY = function () {
      var pos = $_bgquj6onjcgfo6pg.get($_epp4kejujcgfo5a8.fromDom(win.document));
      return pos.top();
    };
    var scrollBy = function (x, y) {
      $_bgquj6onjcgfo6pg.by(x, y, $_epp4kejujcgfo5a8.fromDom(win.document));
    };
    return {
      elementFromPoint: elementFromPoint,
      getRect: getRect,
      getRangedRect: getRangedRect,
      getSelection: getSelection,
      fromSitus: fromSitus,
      situsFromPoint: situsFromPoint,
      clearSelection: clearSelection,
      setSelection: setSelection,
      setRelativeSelection: setRelativeSelection,
      selectContents: selectContents,
      getInnerHeight: getInnerHeight,
      getScrollY: getScrollY,
      scrollBy: scrollBy
    };
  };

  var sync = function (container, isRoot, start, soffset, finish, foffset, selectRange) {
    if (!($_1miv10jyjcgfo5b7.eq(start, finish) && soffset === foffset)) {
      return $_b13w5vkkjcgfo5eo.closest(start, 'td,th', isRoot).bind(function (s) {
        return $_b13w5vkkjcgfo5eo.closest(finish, 'td,th', isRoot).bind(function (f) {
          return detect$5(container, isRoot, s, f, selectRange);
        });
      });
    } else {
      return $_ch5dzyjgjcgfo55s.none();
    }
  };
  var detect$5 = function (container, isRoot, start, finish, selectRange) {
    if (!$_1miv10jyjcgfo5b7.eq(start, finish)) {
      return $_8xfrr4l3jcgfo5ki.identify(start, finish, isRoot).bind(function (cellSel) {
        var boxes = cellSel.boxes().getOr([]);
        if (boxes.length > 0) {
          selectRange(container, boxes, cellSel.start(), cellSel.finish());
          return $_ch5dzyjgjcgfo55s.some($_8677ndojjcgfo6nx.response($_ch5dzyjgjcgfo55s.some($_b7pmniomjcgfo6oy.makeSitus(start, 0, start, $_cadeickwjcgfo5in.getEnd(start))), true));
        } else {
          return $_ch5dzyjgjcgfo55s.none();
        }
      });
    }
  };
  var update = function (rows, columns, container, selected, annotations) {
    var updateSelection = function (newSels) {
      annotations.clear(container);
      annotations.selectRange(container, newSels.boxes(), newSels.start(), newSels.finish());
      return newSels.boxes();
    };
    return $_8xfrr4l3jcgfo5ki.shiftSelection(selected, rows, columns, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(updateSelection);
  };
  var $_6syexzoojcgfo6pu = {
    sync: sync,
    detect: detect$5,
    update: update
  };

  var nu$3 = $_6w2qyfjkjcgfo57c.immutableBag([
    'left',
    'top',
    'right',
    'bottom'
  ], []);
  var moveDown = function (caret, amount) {
    return nu$3({
      left: caret.left(),
      top: caret.top() + amount,
      right: caret.right(),
      bottom: caret.bottom() + amount
    });
  };
  var moveUp = function (caret, amount) {
    return nu$3({
      left: caret.left(),
      top: caret.top() - amount,
      right: caret.right(),
      bottom: caret.bottom() - amount
    });
  };
  var moveBottomTo = function (caret, bottom) {
    var height = caret.bottom() - caret.top();
    return nu$3({
      left: caret.left(),
      top: bottom - height,
      right: caret.right(),
      bottom: bottom
    });
  };
  var moveTopTo = function (caret, top) {
    var height = caret.bottom() - caret.top();
    return nu$3({
      left: caret.left(),
      top: top,
      right: caret.right(),
      bottom: top + height
    });
  };
  var translate = function (caret, xDelta, yDelta) {
    return nu$3({
      left: caret.left() + xDelta,
      top: caret.top() + yDelta,
      right: caret.right() + xDelta,
      bottom: caret.bottom() + yDelta
    });
  };
  var getTop$1 = function (caret) {
    return caret.top();
  };
  var getBottom = function (caret) {
    return caret.bottom();
  };
  var toString$1 = function (caret) {
    return '(' + caret.left() + ', ' + caret.top() + ') -> (' + caret.right() + ', ' + caret.bottom() + ')';
  };
  var $_5zs7kporjcgfo6s0 = {
    nu: nu$3,
    moveUp: moveUp,
    moveDown: moveDown,
    moveBottomTo: moveBottomTo,
    moveTopTo: moveTopTo,
    getTop: getTop$1,
    getBottom: getBottom,
    translate: translate,
    toString: toString$1
  };

  var getPartialBox = function (bridge, element, offset) {
    if (offset >= 0 && offset < $_cadeickwjcgfo5in.getEnd(element))
      return bridge.getRangedRect(element, offset, element, offset + 1);
    else if (offset > 0)
      return bridge.getRangedRect(element, offset - 1, element, offset);
    return $_ch5dzyjgjcgfo55s.none();
  };
  var toCaret = function (rect) {
    return $_5zs7kporjcgfo6s0.nu({
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom
    });
  };
  var getElemBox = function (bridge, element) {
    return $_ch5dzyjgjcgfo55s.some(bridge.getRect(element));
  };
  var getBoxAt = function (bridge, element, offset) {
    if ($_4zgqn9kgjcgfo5e6.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_4zgqn9kgjcgfo5e6.isText(element))
      return getPartialBox(bridge, element, offset).map(toCaret);
    else
      return $_ch5dzyjgjcgfo55s.none();
  };
  var getEntireBox = function (bridge, element) {
    if ($_4zgqn9kgjcgfo5e6.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_4zgqn9kgjcgfo5e6.isText(element))
      return bridge.getRangedRect(element, 0, element, $_cadeickwjcgfo5in.getEnd(element)).map(toCaret);
    else
      return $_ch5dzyjgjcgfo55s.none();
  };
  var $_ddqht0osjcgfo6sb = {
    getBoxAt: getBoxAt,
    getEntireBox: getEntireBox
  };

  var traverse = $_6w2qyfjkjcgfo57c.immutable('item', 'mode');
  var backtrack = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : sidestep;
    return universe.property().parent(item).map(function (p) {
      return traverse(p, transition);
    });
  };
  var sidestep = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : advance;
    return direction.sibling(universe, item).map(function (p) {
      return traverse(p, transition);
    });
  };
  var advance = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : advance;
    var children = universe.property().children(item);
    var result = direction.first(children);
    return result.map(function (r) {
      return traverse(r, transition);
    });
  };
  var successors = [
    {
      current: backtrack,
      next: sidestep,
      fallback: $_ch5dzyjgjcgfo55s.none()
    },
    {
      current: sidestep,
      next: advance,
      fallback: $_ch5dzyjgjcgfo55s.some(backtrack)
    },
    {
      current: advance,
      next: advance,
      fallback: $_ch5dzyjgjcgfo55s.some(sidestep)
    }
  ];
  var go$1 = function (universe, item, mode, direction, rules) {
    var rules = rules !== undefined ? rules : successors;
    var ruleOpt = $_epd2qyjfjcgfo55m.find(rules, function (succ) {
      return succ.current === mode;
    });
    return ruleOpt.bind(function (rule) {
      return rule.current(universe, item, direction, rule.next).orThunk(function () {
        return rule.fallback.bind(function (fb) {
          return go$1(universe, item, fb, direction);
        });
      });
    });
  };
  var $_9ediazoxjcgfo6tx = {
    backtrack: backtrack,
    sidestep: sidestep,
    advance: advance,
    go: go$1
  };

  var left$2 = function () {
    var sibling = function (universe, item) {
      return universe.query().prevSibling(item);
    };
    var first = function (children) {
      return children.length > 0 ? $_ch5dzyjgjcgfo55s.some(children[children.length - 1]) : $_ch5dzyjgjcgfo55s.none();
    };
    return {
      sibling: sibling,
      first: first
    };
  };
  var right$2 = function () {
    var sibling = function (universe, item) {
      return universe.query().nextSibling(item);
    };
    var first = function (children) {
      return children.length > 0 ? $_ch5dzyjgjcgfo55s.some(children[0]) : $_ch5dzyjgjcgfo55s.none();
    };
    return {
      sibling: sibling,
      first: first
    };
  };
  var $_2h66jhoyjcgfo6ua = {
    left: left$2,
    right: right$2
  };

  var hone = function (universe, item, predicate, mode, direction, isRoot) {
    var next = $_9ediazoxjcgfo6tx.go(universe, item, mode, direction);
    return next.bind(function (n) {
      if (isRoot(n.item()))
        return $_ch5dzyjgjcgfo55s.none();
      else
        return predicate(n.item()) ? $_ch5dzyjgjcgfo55s.some(n.item()) : hone(universe, n.item(), predicate, n.mode(), direction, isRoot);
    });
  };
  var left$1 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_9ediazoxjcgfo6tx.sidestep, $_2h66jhoyjcgfo6ua.left(), isRoot);
  };
  var right$1 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_9ediazoxjcgfo6tx.sidestep, $_2h66jhoyjcgfo6ua.right(), isRoot);
  };
  var $_d0eb1nowjcgfo6ts = {
    left: left$1,
    right: right$1
  };

  var isLeaf = function (universe, element) {
    return universe.property().children(element).length === 0;
  };
  var before$3 = function (universe, item, isRoot) {
    return seekLeft$1(universe, item, $_51ccyzjhjcgfo560.curry(isLeaf, universe), isRoot);
  };
  var after$4 = function (universe, item, isRoot) {
    return seekRight$1(universe, item, $_51ccyzjhjcgfo560.curry(isLeaf, universe), isRoot);
  };
  var seekLeft$1 = function (universe, item, predicate, isRoot) {
    return $_d0eb1nowjcgfo6ts.left(universe, item, predicate, isRoot);
  };
  var seekRight$1 = function (universe, item, predicate, isRoot) {
    return $_d0eb1nowjcgfo6ts.right(universe, item, predicate, isRoot);
  };
  var walkers$1 = function () {
    return {
      left: $_2h66jhoyjcgfo6ua.left,
      right: $_2h66jhoyjcgfo6ua.right
    };
  };
  var walk$1 = function (universe, item, mode, direction, _rules) {
    return $_9ediazoxjcgfo6tx.go(universe, item, mode, direction, _rules);
  };
  var $_3wepq2ovjcgfo6tm = {
    before: before$3,
    after: after$4,
    seekLeft: seekLeft$1,
    seekRight: seekRight$1,
    walkers: walkers$1,
    walk: walk$1,
    backtrack: $_9ediazoxjcgfo6tx.backtrack,
    sidestep: $_9ediazoxjcgfo6tx.sidestep,
    advance: $_9ediazoxjcgfo6tx.advance
  };

  var universe$2 = DomUniverse();
  var gather = function (element, prune, transform) {
    return $_3wepq2ovjcgfo6tm.gather(universe$2, element, prune, transform);
  };
  var before$2 = function (element, isRoot) {
    return $_3wepq2ovjcgfo6tm.before(universe$2, element, isRoot);
  };
  var after$3 = function (element, isRoot) {
    return $_3wepq2ovjcgfo6tm.after(universe$2, element, isRoot);
  };
  var seekLeft = function (element, predicate, isRoot) {
    return $_3wepq2ovjcgfo6tm.seekLeft(universe$2, element, predicate, isRoot);
  };
  var seekRight = function (element, predicate, isRoot) {
    return $_3wepq2ovjcgfo6tm.seekRight(universe$2, element, predicate, isRoot);
  };
  var walkers = function () {
    return $_3wepq2ovjcgfo6tm.walkers();
  };
  var walk = function (item, mode, direction, _rules) {
    return $_3wepq2ovjcgfo6tm.walk(universe$2, item, mode, direction, _rules);
  };
  var $_ew6geoujcgfo6tg = {
    gather: gather,
    before: before$2,
    after: after$3,
    seekLeft: seekLeft,
    seekRight: seekRight,
    walkers: walkers,
    walk: walk
  };

  var JUMP_SIZE = 5;
  var NUM_RETRIES = 100;
  var adt$2 = $_bmrdjblhjcgfo5qb.generate([
    { 'none': [] },
    { 'retry': ['caret'] }
  ]);
  var isOutside = function (caret, box) {
    return caret.left() < box.left() || Math.abs(box.right() - caret.left()) < 1 || caret.left() > box.right();
  };
  var inOutsideBlock = function (bridge, element, caret) {
    return $_398i33kljcgfo5er.closest(element, $_dbp7im5jcgfo5yg.isBlock).fold($_51ccyzjhjcgfo560.constant(false), function (cell) {
      return $_ddqht0osjcgfo6sb.getEntireBox(bridge, cell).exists(function (box) {
        return isOutside(caret, box);
      });
    });
  };
  var adjustDown = function (bridge, element, guessBox, original, caret) {
    var lowerCaret = $_5zs7kporjcgfo6s0.moveDown(caret, JUMP_SIZE);
    if (Math.abs(guessBox.bottom() - original.bottom()) < 1)
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() > caret.bottom())
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() === caret.bottom())
      return adt$2.retry($_5zs7kporjcgfo6s0.moveDown(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_5zs7kporjcgfo6s0.translate(lowerCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var adjustUp = function (bridge, element, guessBox, original, caret) {
    var higherCaret = $_5zs7kporjcgfo6s0.moveUp(caret, JUMP_SIZE);
    if (Math.abs(guessBox.top() - original.top()) < 1)
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() < caret.top())
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() === caret.top())
      return adt$2.retry($_5zs7kporjcgfo6s0.moveUp(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_5zs7kporjcgfo6s0.translate(higherCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var upMovement = {
    point: $_5zs7kporjcgfo6s0.getTop,
    adjuster: adjustUp,
    move: $_5zs7kporjcgfo6s0.moveUp,
    gather: $_ew6geoujcgfo6tg.before
  };
  var downMovement = {
    point: $_5zs7kporjcgfo6s0.getBottom,
    adjuster: adjustDown,
    move: $_5zs7kporjcgfo6s0.moveDown,
    gather: $_ew6geoujcgfo6tg.after
  };
  var isAtTable = function (bridge, x, y) {
    return bridge.elementFromPoint(x, y).filter(function (elm) {
      return $_4zgqn9kgjcgfo5e6.name(elm) === 'table';
    }).isSome();
  };
  var adjustForTable = function (bridge, movement, original, caret, numRetries) {
    return adjustTil(bridge, movement, original, movement.move(caret, JUMP_SIZE), numRetries);
  };
  var adjustTil = function (bridge, movement, original, caret, numRetries) {
    if (numRetries === 0)
      return $_ch5dzyjgjcgfo55s.some(caret);
    if (isAtTable(bridge, caret.left(), movement.point(caret)))
      return adjustForTable(bridge, movement, original, caret, numRetries - 1);
    return bridge.situsFromPoint(caret.left(), movement.point(caret)).bind(function (guess) {
      return guess.start().fold($_ch5dzyjgjcgfo55s.none, function (element, offset) {
        return $_ddqht0osjcgfo6sb.getEntireBox(bridge, element, offset).bind(function (guessBox) {
          return movement.adjuster(bridge, element, guessBox, original, caret).fold($_ch5dzyjgjcgfo55s.none, function (newCaret) {
            return adjustTil(bridge, movement, original, newCaret, numRetries - 1);
          });
        }).orThunk(function () {
          return $_ch5dzyjgjcgfo55s.some(caret);
        });
      }, $_ch5dzyjgjcgfo55s.none);
    });
  };
  var ieTryDown = function (bridge, caret) {
    return bridge.situsFromPoint(caret.left(), caret.bottom() + JUMP_SIZE);
  };
  var ieTryUp = function (bridge, caret) {
    return bridge.situsFromPoint(caret.left(), caret.top() - JUMP_SIZE);
  };
  var checkScroll = function (movement, adjusted, bridge) {
    if (movement.point(adjusted) > bridge.getInnerHeight())
      return $_ch5dzyjgjcgfo55s.some(movement.point(adjusted) - bridge.getInnerHeight());
    else if (movement.point(adjusted) < 0)
      return $_ch5dzyjgjcgfo55s.some(-movement.point(adjusted));
    else
      return $_ch5dzyjgjcgfo55s.none();
  };
  var retry = function (movement, bridge, caret) {
    var moved = movement.move(caret, JUMP_SIZE);
    var adjusted = adjustTil(bridge, movement, caret, moved, NUM_RETRIES).getOr(moved);
    return checkScroll(movement, adjusted, bridge).fold(function () {
      return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted));
    }, function (delta) {
      bridge.scrollBy(0, delta);
      return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted) - delta);
    });
  };
  var $_6gw50iotjcgfo6sp = {
    tryUp: $_51ccyzjhjcgfo560.curry(retry, upMovement),
    tryDown: $_51ccyzjhjcgfo560.curry(retry, downMovement),
    ieTryUp: ieTryUp,
    ieTryDown: ieTryDown,
    getJumpSize: $_51ccyzjhjcgfo560.constant(JUMP_SIZE)
  };

  var adt$3 = $_bmrdjblhjcgfo5qb.generate([
    { 'none': ['message'] },
    { 'success': [] },
    { 'failedUp': ['cell'] },
    { 'failedDown': ['cell'] }
  ]);
  var isOverlapping = function (bridge, before, after) {
    var beforeBounds = bridge.getRect(before);
    var afterBounds = bridge.getRect(after);
    return afterBounds.right > beforeBounds.left && afterBounds.left < beforeBounds.right;
  };
  var verify = function (bridge, before, beforeOffset, after, afterOffset, failure, isRoot) {
    return $_b13w5vkkjcgfo5eo.closest(after, 'td,th', isRoot).bind(function (afterCell) {
      return $_b13w5vkkjcgfo5eo.closest(before, 'td,th', isRoot).map(function (beforeCell) {
        if (!$_1miv10jyjcgfo5b7.eq(afterCell, beforeCell)) {
          return $_ethu47l4jcgfo5lo.sharedOne(isRow, [
            afterCell,
            beforeCell
          ]).fold(function () {
            return isOverlapping(bridge, beforeCell, afterCell) ? adt$3.success() : failure(beforeCell);
          }, function (sharedRow) {
            return failure(beforeCell);
          });
        } else {
          return $_1miv10jyjcgfo5b7.eq(after, afterCell) && $_cadeickwjcgfo5in.getEnd(afterCell) === afterOffset ? failure(beforeCell) : adt$3.none('in same cell');
        }
      });
    }).getOr(adt$3.none('default'));
  };
  var isRow = function (elem) {
    return $_b13w5vkkjcgfo5eo.closest(elem, 'tr');
  };
  var cata$2 = function (subject, onNone, onSuccess, onFailedUp, onFailedDown) {
    return subject.fold(onNone, onSuccess, onFailedUp, onFailedDown);
  };
  var $_8dnijhozjcgfo6uh = {
    verify: verify,
    cata: cata$2,
    adt: adt$3
  };

  var point = $_6w2qyfjkjcgfo57c.immutable('element', 'offset');
  var delta = $_6w2qyfjkjcgfo57c.immutable('element', 'deltaOffset');
  var range$3 = $_6w2qyfjkjcgfo57c.immutable('element', 'start', 'finish');
  var points = $_6w2qyfjkjcgfo57c.immutable('begin', 'end');
  var text = $_6w2qyfjkjcgfo57c.immutable('element', 'text');
  var $_dw85ytp1jcgfo6vx = {
    point: point,
    delta: delta,
    range: range$3,
    points: points,
    text: text
  };

  var inAncestor = $_6w2qyfjkjcgfo57c.immutable('ancestor', 'descendants', 'element', 'index');
  var inParent = $_6w2qyfjkjcgfo57c.immutable('parent', 'children', 'element', 'index');
  var childOf = function (element, ancestor) {
    return $_398i33kljcgfo5er.closest(element, function (elem) {
      return $_4k5ag6jwjcgfo5aj.parent(elem).exists(function (parent) {
        return $_1miv10jyjcgfo5b7.eq(parent, ancestor);
      });
    });
  };
  var indexInParent = function (element) {
    return $_4k5ag6jwjcgfo5aj.parent(element).bind(function (parent) {
      var children = $_4k5ag6jwjcgfo5aj.children(parent);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var indexOf$1 = function (elements, element) {
    return $_epd2qyjfjcgfo55m.findIndex(elements, $_51ccyzjhjcgfo560.curry($_1miv10jyjcgfo5b7.eq, element));
  };
  var selectorsInParent = function (element, selector) {
    return $_4k5ag6jwjcgfo5aj.parent(element).bind(function (parent) {
      var children = $_cc9vyekhjcgfo5e9.children(parent, selector);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var descendantsInAncestor = function (element, ancestorSelector, descendantSelector) {
    return $_b13w5vkkjcgfo5eo.closest(element, ancestorSelector).bind(function (ancestor) {
      var descendants = $_cc9vyekhjcgfo5e9.descendants(ancestor, descendantSelector);
      return indexOf$1(descendants, element).map(function (index) {
        return inAncestor(ancestor, descendants, element, index);
      });
    });
  };
  var $_2omh3rp2jcgfo6w4 = {
    childOf: childOf,
    indexOf: indexOf$1,
    indexInParent: indexInParent,
    selectorsInParent: selectorsInParent,
    descendantsInAncestor: descendantsInAncestor
  };

  var isBr = function (elem) {
    return $_4zgqn9kgjcgfo5e6.name(elem) === 'br';
  };
  var gatherer = function (cand, gather, isRoot) {
    return gather(cand, isRoot).bind(function (target) {
      return $_4zgqn9kgjcgfo5e6.isText(target) && $_cjrygqkxjcgfo5it.get(target).trim().length === 0 ? gatherer(target, gather, isRoot) : $_ch5dzyjgjcgfo55s.some(target);
    });
  };
  var handleBr = function (isRoot, element, direction) {
    return direction.traverse(element).orThunk(function () {
      return gatherer(element, direction.gather, isRoot);
    }).map(direction.relative);
  };
  var findBr = function (element, offset) {
    return $_4k5ag6jwjcgfo5aj.child(element, offset).filter(isBr).orThunk(function () {
      return $_4k5ag6jwjcgfo5aj.child(element, offset - 1).filter(isBr);
    });
  };
  var handleParent = function (isRoot, element, offset, direction) {
    return findBr(element, offset).bind(function (br) {
      return direction.traverse(br).fold(function () {
        return gatherer(br, direction.gather, isRoot).map(direction.relative);
      }, function (adjacent) {
        return $_2omh3rp2jcgfo6w4.indexInParent(adjacent).map(function (info) {
          return $_geowewo3jcgfo6iy.on(info.parent(), info.index());
        });
      });
    });
  };
  var tryBr = function (isRoot, element, offset, direction) {
    var target = isBr(element) ? handleBr(isRoot, element, direction) : handleParent(isRoot, element, offset, direction);
    return target.map(function (tgt) {
      return {
        start: $_51ccyzjhjcgfo560.constant(tgt),
        finish: $_51ccyzjhjcgfo560.constant(tgt)
      };
    });
  };
  var process = function (analysis) {
    return $_8dnijhozjcgfo6uh.cata(analysis, function (message) {
      return $_ch5dzyjgjcgfo55s.none('BR ADT: none');
    }, function () {
      return $_ch5dzyjgjcgfo55s.none();
    }, function (cell) {
      return $_ch5dzyjgjcgfo55s.some($_dw85ytp1jcgfo6vx.point(cell, 0));
    }, function (cell) {
      return $_ch5dzyjgjcgfo55s.some($_dw85ytp1jcgfo6vx.point(cell, $_cadeickwjcgfo5in.getEnd(cell)));
    });
  };
  var $_fwnrjvp0jcgfo6uz = {
    tryBr: tryBr,
    process: process
  };

  var MAX_RETRIES = 20;
  var platform$1 = $_1x7x33k3jcgfo5c3.detect();
  var findSpot = function (bridge, isRoot, direction) {
    return bridge.getSelection().bind(function (sel) {
      return $_fwnrjvp0jcgfo6uz.tryBr(isRoot, sel.finish(), sel.foffset(), direction).fold(function () {
        return $_ch5dzyjgjcgfo55s.some($_dw85ytp1jcgfo6vx.point(sel.finish(), sel.foffset()));
      }, function (brNeighbour) {
        var range = bridge.fromSitus(brNeighbour);
        var analysis = $_8dnijhozjcgfo6uh.verify(bridge, sel.finish(), sel.foffset(), range.finish(), range.foffset(), direction.failure, isRoot);
        return $_fwnrjvp0jcgfo6uz.process(analysis);
      });
    });
  };
  var scan = function (bridge, isRoot, element, offset, direction, numRetries) {
    if (numRetries === 0)
      return $_ch5dzyjgjcgfo55s.none();
    return tryCursor(bridge, isRoot, element, offset, direction).bind(function (situs) {
      var range = bridge.fromSitus(situs);
      var analysis = $_8dnijhozjcgfo6uh.verify(bridge, element, offset, range.finish(), range.foffset(), direction.failure, isRoot);
      return $_8dnijhozjcgfo6uh.cata(analysis, function () {
        return $_ch5dzyjgjcgfo55s.none();
      }, function () {
        return $_ch5dzyjgjcgfo55s.some(situs);
      }, function (cell) {
        if ($_1miv10jyjcgfo5b7.eq(element, cell) && offset === 0)
          return tryAgain(bridge, element, offset, $_5zs7kporjcgfo6s0.moveUp, direction);
        else
          return scan(bridge, isRoot, cell, 0, direction, numRetries - 1);
      }, function (cell) {
        if ($_1miv10jyjcgfo5b7.eq(element, cell) && offset === $_cadeickwjcgfo5in.getEnd(cell))
          return tryAgain(bridge, element, offset, $_5zs7kporjcgfo6s0.moveDown, direction);
        else
          return scan(bridge, isRoot, cell, $_cadeickwjcgfo5in.getEnd(cell), direction, numRetries - 1);
      });
    });
  };
  var tryAgain = function (bridge, element, offset, move, direction) {
    return $_ddqht0osjcgfo6sb.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, move(box, $_6gw50iotjcgfo6sp.getJumpSize()));
    });
  };
  var tryAt = function (bridge, direction, box) {
    if (platform$1.browser.isChrome() || platform$1.browser.isSafari() || platform$1.browser.isFirefox() || platform$1.browser.isEdge())
      return direction.otherRetry(bridge, box);
    else if (platform$1.browser.isIE())
      return direction.ieRetry(bridge, box);
    else
      return $_ch5dzyjgjcgfo55s.none();
  };
  var tryCursor = function (bridge, isRoot, element, offset, direction) {
    return $_ddqht0osjcgfo6sb.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, box);
    });
  };
  var handle$2 = function (bridge, isRoot, direction) {
    return findSpot(bridge, isRoot, direction).bind(function (spot) {
      return scan(bridge, isRoot, spot.element(), spot.offset(), direction, MAX_RETRIES).map(bridge.fromSitus);
    });
  };
  var $_15iq8ooqjcgfo6rf = { handle: handle$2 };

  var any$1 = function (predicate) {
    return $_398i33kljcgfo5er.first(predicate).isSome();
  };
  var ancestor$3 = function (scope, predicate, isRoot) {
    return $_398i33kljcgfo5er.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest$3 = function (scope, predicate, isRoot) {
    return $_398i33kljcgfo5er.closest(scope, predicate, isRoot).isSome();
  };
  var sibling$3 = function (scope, predicate) {
    return $_398i33kljcgfo5er.sibling(scope, predicate).isSome();
  };
  var child$4 = function (scope, predicate) {
    return $_398i33kljcgfo5er.child(scope, predicate).isSome();
  };
  var descendant$3 = function (scope, predicate) {
    return $_398i33kljcgfo5er.descendant(scope, predicate).isSome();
  };
  var $_a50bhxp3jcgfo6wi = {
    any: any$1,
    ancestor: ancestor$3,
    closest: closest$3,
    sibling: sibling$3,
    child: child$4,
    descendant: descendant$3
  };

  var detection = $_1x7x33k3jcgfo5c3.detect();
  var inSameTable = function (elem, table) {
    return $_a50bhxp3jcgfo6wi.ancestor(elem, function (e) {
      return $_4k5ag6jwjcgfo5aj.parent(e).exists(function (p) {
        return $_1miv10jyjcgfo5b7.eq(p, table);
      });
    });
  };
  var simulate = function (bridge, isRoot, direction, initial, anchor) {
    return $_b13w5vkkjcgfo5eo.closest(initial, 'td,th', isRoot).bind(function (start) {
      return $_b13w5vkkjcgfo5eo.closest(start, 'table', isRoot).bind(function (table) {
        if (!inSameTable(anchor, table))
          return $_ch5dzyjgjcgfo55s.none();
        return $_15iq8ooqjcgfo6rf.handle(bridge, isRoot, direction).bind(function (range) {
          return $_b13w5vkkjcgfo5eo.closest(range.finish(), 'td,th', isRoot).map(function (finish) {
            return {
              start: $_51ccyzjhjcgfo560.constant(start),
              finish: $_51ccyzjhjcgfo560.constant(finish),
              range: $_51ccyzjhjcgfo560.constant(range)
            };
          });
        });
      });
    });
  };
  var navigate = function (bridge, isRoot, direction, initial, anchor, precheck) {
    if (detection.browser.isIE()) {
      return $_ch5dzyjgjcgfo55s.none();
    } else {
      return precheck(initial, isRoot).orThunk(function () {
        return simulate(bridge, isRoot, direction, initial, anchor).map(function (info) {
          var range = info.range();
          return $_8677ndojjcgfo6nx.response($_ch5dzyjgjcgfo55s.some($_b7pmniomjcgfo6oy.makeSitus(range.start(), range.soffset(), range.finish(), range.foffset())), true);
        });
      });
    }
  };
  var firstUpCheck = function (initial, isRoot) {
    return $_b13w5vkkjcgfo5eo.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_b13w5vkkjcgfo5eo.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_cc9vyekhjcgfo5e9.descendants(table, 'tr');
        if ($_1miv10jyjcgfo5b7.eq(startRow, rows[0])) {
          return $_ew6geoujcgfo6tg.seekLeft(table, function (element) {
            return $_bwsvmpkvjcgfo5ih.last(element).isSome();
          }, isRoot).map(function (last) {
            var lastOffset = $_cadeickwjcgfo5in.getEnd(last);
            return $_8677ndojjcgfo6nx.response($_ch5dzyjgjcgfo55s.some($_b7pmniomjcgfo6oy.makeSitus(last, lastOffset, last, lastOffset)), true);
          });
        } else {
          return $_ch5dzyjgjcgfo55s.none();
        }
      });
    });
  };
  var lastDownCheck = function (initial, isRoot) {
    return $_b13w5vkkjcgfo5eo.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_b13w5vkkjcgfo5eo.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_cc9vyekhjcgfo5e9.descendants(table, 'tr');
        if ($_1miv10jyjcgfo5b7.eq(startRow, rows[rows.length - 1])) {
          return $_ew6geoujcgfo6tg.seekRight(table, function (element) {
            return $_bwsvmpkvjcgfo5ih.first(element).isSome();
          }, isRoot).map(function (first) {
            return $_8677ndojjcgfo6nx.response($_ch5dzyjgjcgfo55s.some($_b7pmniomjcgfo6oy.makeSitus(first, 0, first, 0)), true);
          });
        } else {
          return $_ch5dzyjgjcgfo55s.none();
        }
      });
    });
  };
  var select = function (bridge, container, isRoot, direction, initial, anchor, selectRange) {
    return simulate(bridge, isRoot, direction, initial, anchor).bind(function (info) {
      return $_6syexzoojcgfo6pu.detect(container, isRoot, info.start(), info.finish(), selectRange);
    });
  };
  var $_7w2qadopjcgfo6qa = {
    navigate: navigate,
    select: select,
    firstUpCheck: firstUpCheck,
    lastDownCheck: lastDownCheck
  };

  var findCell = function (target, isRoot) {
    return $_b13w5vkkjcgfo5eo.closest(target, 'td,th', isRoot);
  };
  var MouseSelection = function (bridge, container, isRoot, annotations) {
    var cursor = $_ch5dzyjgjcgfo55s.none();
    var clearState = function () {
      cursor = $_ch5dzyjgjcgfo55s.none();
    };
    var mousedown = function (event) {
      annotations.clear(container);
      cursor = findCell(event.target(), isRoot);
    };
    var mouseover = function (event) {
      cursor.each(function (start) {
        annotations.clear(container);
        findCell(event.target(), isRoot).each(function (finish) {
          $_8xfrr4l3jcgfo5ki.identify(start, finish, isRoot).each(function (cellSel) {
            var boxes = cellSel.boxes().getOr([]);
            if (boxes.length > 1 || boxes.length === 1 && !$_1miv10jyjcgfo5b7.eq(start, finish)) {
              annotations.selectRange(container, boxes, cellSel.start(), cellSel.finish());
              bridge.selectContents(finish);
            }
          });
        });
      });
    };
    var mouseup = function () {
      cursor.each(clearState);
    };
    return {
      mousedown: mousedown,
      mouseover: mouseover,
      mouseup: mouseup
    };
  };

  var $_g7x7vap5jcgfo6wy = {
    down: {
      traverse: $_4k5ag6jwjcgfo5aj.nextSibling,
      gather: $_ew6geoujcgfo6tg.after,
      relative: $_geowewo3jcgfo6iy.before,
      otherRetry: $_6gw50iotjcgfo6sp.tryDown,
      ieRetry: $_6gw50iotjcgfo6sp.ieTryDown,
      failure: $_8dnijhozjcgfo6uh.adt.failedDown
    },
    up: {
      traverse: $_4k5ag6jwjcgfo5aj.prevSibling,
      gather: $_ew6geoujcgfo6tg.before,
      relative: $_geowewo3jcgfo6iy.before,
      otherRetry: $_6gw50iotjcgfo6sp.tryUp,
      ieRetry: $_6gw50iotjcgfo6sp.ieTryUp,
      failure: $_8dnijhozjcgfo6uh.adt.failedUp
    }
  };

  var rc = $_6w2qyfjkjcgfo57c.immutable('rows', 'cols');
  var mouse = function (win, container, isRoot, annotations) {
    var bridge = WindowBridge(win);
    var handlers = MouseSelection(bridge, container, isRoot, annotations);
    return {
      mousedown: handlers.mousedown,
      mouseover: handlers.mouseover,
      mouseup: handlers.mouseup
    };
  };
  var keyboard = function (win, container, isRoot, annotations) {
    var bridge = WindowBridge(win);
    var clearToNavigate = function () {
      annotations.clear(container);
      return $_ch5dzyjgjcgfo55s.none();
    };
    var keydown = function (event, start, soffset, finish, foffset, direction) {
      var keycode = event.raw().which;
      var shiftKey = event.raw().shiftKey === true;
      var handler = $_8xfrr4l3jcgfo5ki.retrieve(container, annotations.selectedSelector()).fold(function () {
        if ($_416maxokjcgfo6o2.isDown(keycode) && shiftKey) {
          return $_51ccyzjhjcgfo560.curry($_7w2qadopjcgfo6qa.select, bridge, container, isRoot, $_g7x7vap5jcgfo6wy.down, finish, start, annotations.selectRange);
        } else if ($_416maxokjcgfo6o2.isUp(keycode) && shiftKey) {
          return $_51ccyzjhjcgfo560.curry($_7w2qadopjcgfo6qa.select, bridge, container, isRoot, $_g7x7vap5jcgfo6wy.up, finish, start, annotations.selectRange);
        } else if ($_416maxokjcgfo6o2.isDown(keycode)) {
          return $_51ccyzjhjcgfo560.curry($_7w2qadopjcgfo6qa.navigate, bridge, isRoot, $_g7x7vap5jcgfo6wy.down, finish, start, $_7w2qadopjcgfo6qa.lastDownCheck);
        } else if ($_416maxokjcgfo6o2.isUp(keycode)) {
          return $_51ccyzjhjcgfo560.curry($_7w2qadopjcgfo6qa.navigate, bridge, isRoot, $_g7x7vap5jcgfo6wy.up, finish, start, $_7w2qadopjcgfo6qa.firstUpCheck);
        } else {
          return $_ch5dzyjgjcgfo55s.none;
        }
      }, function (selected) {
        var update = function (attempts) {
          return function () {
            var navigation = $_x980jm9jcgfo5zn.findMap(attempts, function (delta) {
              return $_6syexzoojcgfo6pu.update(delta.rows(), delta.cols(), container, selected, annotations);
            });
            return navigation.fold(function () {
              return $_8xfrr4l3jcgfo5ki.getEdges(container, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(function (edges) {
                var relative = $_416maxokjcgfo6o2.isDown(keycode) || direction.isForward(keycode) ? $_geowewo3jcgfo6iy.after : $_geowewo3jcgfo6iy.before;
                bridge.setRelativeSelection($_geowewo3jcgfo6iy.on(edges.first(), 0), relative(edges.table()));
                annotations.clear(container);
                return $_8677ndojjcgfo6nx.response($_ch5dzyjgjcgfo55s.none(), true);
              });
            }, function (_) {
              return $_ch5dzyjgjcgfo55s.some($_8677ndojjcgfo6nx.response($_ch5dzyjgjcgfo55s.none(), true));
            });
          };
        };
        if ($_416maxokjcgfo6o2.isDown(keycode) && shiftKey)
          return update([rc(+1, 0)]);
        else if ($_416maxokjcgfo6o2.isUp(keycode) && shiftKey)
          return update([rc(-1, 0)]);
        else if (direction.isBackward(keycode) && shiftKey)
          return update([
            rc(0, -1),
            rc(-1, 0)
          ]);
        else if (direction.isForward(keycode) && shiftKey)
          return update([
            rc(0, +1),
            rc(+1, 0)
          ]);
        else if ($_416maxokjcgfo6o2.isNavigation(keycode) && shiftKey === false)
          return clearToNavigate;
        else
          return $_ch5dzyjgjcgfo55s.none;
      });
      return handler();
    };
    var keyup = function (event, start, soffset, finish, foffset) {
      return $_8xfrr4l3jcgfo5ki.retrieve(container, annotations.selectedSelector()).fold(function () {
        var keycode = event.raw().which;
        var shiftKey = event.raw().shiftKey === true;
        if (shiftKey === false)
          return $_ch5dzyjgjcgfo55s.none();
        if ($_416maxokjcgfo6o2.isNavigation(keycode))
          return $_6syexzoojcgfo6pu.sync(container, isRoot, start, soffset, finish, foffset, annotations.selectRange);
        else
          return $_ch5dzyjgjcgfo55s.none();
      }, $_ch5dzyjgjcgfo55s.none);
    };
    return {
      keydown: keydown,
      keyup: keyup
    };
  };
  var $_a343tsoijcgfo6nc = {
    mouse: mouse,
    keyboard: keyboard
  };

  var add$3 = function (element, classes) {
    $_epd2qyjfjcgfo55m.each(classes, function (x) {
      $_18cpvgmkjcgfo63o.add(element, x);
    });
  };
  var remove$7 = function (element, classes) {
    $_epd2qyjfjcgfo55m.each(classes, function (x) {
      $_18cpvgmkjcgfo63o.remove(element, x);
    });
  };
  var toggle$2 = function (element, classes) {
    $_epd2qyjfjcgfo55m.each(classes, function (x) {
      $_18cpvgmkjcgfo63o.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_epd2qyjfjcgfo55m.forall(classes, function (clazz) {
      return $_18cpvgmkjcgfo63o.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_epd2qyjfjcgfo55m.exists(classes, function (clazz) {
      return $_18cpvgmkjcgfo63o.has(element, clazz);
    });
  };
  var getNative = function (element) {
    var classList = element.dom().classList;
    var r = new Array(classList.length);
    for (var i = 0; i < classList.length; i++) {
      r[i] = classList.item(i);
    }
    return r;
  };
  var get$11 = function (element) {
    return $_b7xddtmmjcgfo63t.supports(element) ? getNative(element) : $_b7xddtmmjcgfo63t.get(element);
  };
  var $_9coy5ip8jcgfo6xv = {
    add: add$3,
    remove: remove$7,
    toggle: toggle$2,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$11
  };

  var addClass = function (clazz) {
    return function (element) {
      $_18cpvgmkjcgfo63o.add(element, clazz);
    };
  };
  var removeClass = function (clazz) {
    return function (element) {
      $_18cpvgmkjcgfo63o.remove(element, clazz);
    };
  };
  var removeClasses = function (classes) {
    return function (element) {
      $_9coy5ip8jcgfo6xv.remove(element, classes);
    };
  };
  var hasClass = function (clazz) {
    return function (element) {
      return $_18cpvgmkjcgfo63o.has(element, clazz);
    };
  };
  var $_b2exqsp7jcgfo6xt = {
    addClass: addClass,
    removeClass: removeClass,
    removeClasses: removeClasses,
    hasClass: hasClass
  };

  var byClass = function (ephemera) {
    var addSelectionClass = $_b2exqsp7jcgfo6xt.addClass(ephemera.selected());
    var removeSelectionClasses = $_b2exqsp7jcgfo6xt.removeClasses([
      ephemera.selected(),
      ephemera.lastSelected(),
      ephemera.firstSelected()
    ]);
    var clear = function (container) {
      var sels = $_cc9vyekhjcgfo5e9.descendants(container, ephemera.selectedSelector());
      $_epd2qyjfjcgfo55m.each(sels, removeSelectionClasses);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_epd2qyjfjcgfo55m.each(cells, addSelectionClass);
      $_18cpvgmkjcgfo63o.add(start, ephemera.firstSelected());
      $_18cpvgmkjcgfo63o.add(finish, ephemera.lastSelected());
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var byAttr = function (ephemera) {
    var removeSelectionAttributes = function (element) {
      $_fo5ow8kfjcgfo5ds.remove(element, ephemera.selected());
      $_fo5ow8kfjcgfo5ds.remove(element, ephemera.firstSelected());
      $_fo5ow8kfjcgfo5ds.remove(element, ephemera.lastSelected());
    };
    var addSelectionAttribute = function (element) {
      $_fo5ow8kfjcgfo5ds.set(element, ephemera.selected(), '1');
    };
    var clear = function (container) {
      var sels = $_cc9vyekhjcgfo5e9.descendants(container, ephemera.selectedSelector());
      $_epd2qyjfjcgfo55m.each(sels, removeSelectionAttributes);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_epd2qyjfjcgfo55m.each(cells, addSelectionAttribute);
      $_fo5ow8kfjcgfo5ds.set(start, ephemera.firstSelected(), '1');
      $_fo5ow8kfjcgfo5ds.set(finish, ephemera.lastSelected(), '1');
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var $_6r9ximp6jcgfo6xa = {
    byClass: byClass,
    byAttr: byAttr
  };

  var CellSelection$1 = function (editor, lazyResize) {
    var handlerStruct = $_6w2qyfjkjcgfo57c.immutableBag([
      'mousedown',
      'mouseover',
      'mouseup',
      'keyup',
      'keydown'
    ], []);
    var handlers = $_ch5dzyjgjcgfo55s.none();
    var annotations = $_6r9ximp6jcgfo6xa.byAttr($_1c8x42lfjcgfo5py);
    editor.on('init', function (e) {
      var win = editor.getWin();
      var body = $_4uo12an1jcgfo67g.getBody(editor);
      var isRoot = $_4uo12an1jcgfo67g.getIsRoot(editor);
      var syncSelection = function () {
        var sel = editor.selection;
        var start = $_epp4kejujcgfo5a8.fromDom(sel.getStart());
        var end = $_epp4kejujcgfo5a8.fromDom(sel.getEnd());
        var startTable = $_7pxq74jrjcgfo58f.table(start);
        var endTable = $_7pxq74jrjcgfo58f.table(end);
        var sameTable = startTable.bind(function (tableStart) {
          return endTable.bind(function (tableEnd) {
            return $_1miv10jyjcgfo5b7.eq(tableStart, tableEnd) ? $_ch5dzyjgjcgfo55s.some(true) : $_ch5dzyjgjcgfo55s.none();
          });
        });
        sameTable.fold(function () {
          annotations.clear(body);
        }, $_51ccyzjhjcgfo560.noop);
      };
      var mouseHandlers = $_a343tsoijcgfo6nc.mouse(win, body, isRoot, annotations);
      var keyHandlers = $_a343tsoijcgfo6nc.keyboard(win, body, isRoot, annotations);
      var handleResponse = function (event, response) {
        if (response.kill()) {
          event.kill();
        }
        response.selection().each(function (ns) {
          var relative = $_fbzsxho2jcgfo6io.relative(ns.start(), ns.finish());
          var rng = $_fj2csko8jcgfo6k3.asLtrRange(win, relative);
          editor.selection.setRng(rng);
        });
      };
      var keyup = function (event) {
        var wrappedEvent = wrapEvent(event);
        if (wrappedEvent.raw().shiftKey && $_416maxokjcgfo6o2.isNavigation(wrappedEvent.raw().which)) {
          var rng = editor.selection.getRng();
          var start = $_epp4kejujcgfo5a8.fromDom(rng.startContainer);
          var end = $_epp4kejujcgfo5a8.fromDom(rng.endContainer);
          keyHandlers.keyup(wrappedEvent, start, rng.startOffset, end, rng.endOffset).each(function (response) {
            handleResponse(wrappedEvent, response);
          });
        }
      };
      var checkLast = function (last) {
        return !$_fo5ow8kfjcgfo5ds.has(last, 'data-mce-bogus') && $_4zgqn9kgjcgfo5e6.name(last) !== 'br' && !($_4zgqn9kgjcgfo5e6.isText(last) && $_cjrygqkxjcgfo5it.get(last).length === 0);
      };
      var getLast = function () {
        var body = $_epp4kejujcgfo5a8.fromDom(editor.getBody());
        var lastChild = $_4k5ag6jwjcgfo5aj.lastChild(body);
        var getPrevLast = function (last) {
          return $_4k5ag6jwjcgfo5aj.prevSibling(last).bind(function (prevLast) {
            return checkLast(prevLast) ? $_ch5dzyjgjcgfo55s.some(prevLast) : getPrevLast(prevLast);
          });
        };
        return lastChild.bind(function (last) {
          return checkLast(last) ? $_ch5dzyjgjcgfo55s.some(last) : getPrevLast(last);
        });
      };
      var keydown = function (event) {
        var wrappedEvent = wrapEvent(event);
        lazyResize().each(function (resize) {
          resize.hideBars();
        });
        if (event.which === 40) {
          getLast().each(function (last) {
            if ($_4zgqn9kgjcgfo5e6.name(last) === 'table') {
              if (editor.settings.forced_root_block) {
                editor.dom.add(editor.getBody(), editor.settings.forced_root_block, editor.settings.forced_root_block_attrs, '<br/>');
              } else {
                editor.dom.add(editor.getBody(), 'br');
              }
            }
          });
        }
        var rng = editor.selection.getRng();
        var startContainer = $_epp4kejujcgfo5a8.fromDom(editor.selection.getStart());
        var start = $_epp4kejujcgfo5a8.fromDom(rng.startContainer);
        var end = $_epp4kejujcgfo5a8.fromDom(rng.endContainer);
        var direction = $_67pjjwn2jcgfo67n.directionAt(startContainer).isRtl() ? $_416maxokjcgfo6o2.rtl : $_416maxokjcgfo6o2.ltr;
        keyHandlers.keydown(wrappedEvent, start, rng.startOffset, end, rng.endOffset, direction).each(function (response) {
          handleResponse(wrappedEvent, response);
        });
        lazyResize().each(function (resize) {
          resize.showBars();
        });
      };
      var wrapEvent = function (event) {
        var target = $_epp4kejujcgfo5a8.fromDom(event.target);
        var stop = function () {
          event.stopPropagation();
        };
        var prevent = function () {
          event.preventDefault();
        };
        var kill = $_51ccyzjhjcgfo560.compose(prevent, stop);
        return {
          target: $_51ccyzjhjcgfo560.constant(target),
          x: $_51ccyzjhjcgfo560.constant(event.x),
          y: $_51ccyzjhjcgfo560.constant(event.y),
          stop: stop,
          prevent: prevent,
          kill: kill,
          raw: $_51ccyzjhjcgfo560.constant(event)
        };
      };
      var isLeftMouse = function (raw) {
        return raw.button === 0;
      };
      var isLeftButtonPressed = function (raw) {
        if (raw.buttons === undefined) {
          return true;
        }
        return (raw.buttons & 1) !== 0;
      };
      var mouseDown = function (e) {
        if (isLeftMouse(e)) {
          mouseHandlers.mousedown(wrapEvent(e));
        }
      };
      var mouseOver = function (e) {
        if (isLeftButtonPressed(e)) {
          mouseHandlers.mouseover(wrapEvent(e));
        }
      };
      var mouseUp = function (e) {
        if (isLeftMouse) {
          mouseHandlers.mouseup(wrapEvent(e));
        }
      };
      editor.on('mousedown', mouseDown);
      editor.on('mouseover', mouseOver);
      editor.on('mouseup', mouseUp);
      editor.on('keyup', keyup);
      editor.on('keydown', keydown);
      editor.on('nodechange', syncSelection);
      handlers = $_ch5dzyjgjcgfo55s.some(handlerStruct({
        mousedown: mouseDown,
        mouseover: mouseOver,
        mouseup: mouseUp,
        keyup: keyup,
        keydown: keydown
      }));
    });
    var destroy = function () {
      handlers.each(function (handlers) {
      });
    };
    return {
      clear: annotations.clear,
      destroy: destroy
    };
  };

  var Selections = function (editor) {
    var get = function () {
      var body = $_4uo12an1jcgfo67g.getBody(editor);
      return $_9igzwul2jcgfo5k2.retrieve(body, $_1c8x42lfjcgfo5py.selectedSelector()).fold(function () {
        if (editor.selection.getStart() === undefined) {
          return $_cby7dklgjcgfo5q4.none();
        } else {
          return $_cby7dklgjcgfo5q4.single(editor.selection);
        }
      }, function (cells) {
        return $_cby7dklgjcgfo5q4.multiple(cells);
      });
    };
    return { get: get };
  };

  var each$4 = Tools.each;
  var addButtons = function (editor) {
    var menuItems = [];
    each$4('inserttable tableprops deletetable | cell row column'.split(' '), function (name) {
      if (name === '|') {
        menuItems.push({ text: '-' });
      } else {
        menuItems.push(editor.menuItems[name]);
      }
    });
    editor.addButton('table', {
      type: 'menubutton',
      title: 'Table',
      menu: menuItems
    });
    function cmd(command) {
      return function () {
        editor.execCommand(command);
      };
    }
    editor.addButton('tableprops', {
      title: 'Table properties',
      onclick: $_51ccyzjhjcgfo560.curry($_7bzu6wn7jcgfo68x.open, editor, true),
      icon: 'table'
    });
    editor.addButton('tabledelete', {
      title: 'Delete table',
      onclick: cmd('mceTableDelete')
    });
    editor.addButton('tablecellprops', {
      title: 'Cell properties',
      onclick: cmd('mceTableCellProps')
    });
    editor.addButton('tablemergecells', {
      title: 'Merge cells',
      onclick: cmd('mceTableMergeCells')
    });
    editor.addButton('tablesplitcells', {
      title: 'Split cell',
      onclick: cmd('mceTableSplitCells')
    });
    editor.addButton('tableinsertrowbefore', {
      title: 'Insert row before',
      onclick: cmd('mceTableInsertRowBefore')
    });
    editor.addButton('tableinsertrowafter', {
      title: 'Insert row after',
      onclick: cmd('mceTableInsertRowAfter')
    });
    editor.addButton('tabledeleterow', {
      title: 'Delete row',
      onclick: cmd('mceTableDeleteRow')
    });
    editor.addButton('tablerowprops', {
      title: 'Row properties',
      onclick: cmd('mceTableRowProps')
    });
    editor.addButton('tablecutrow', {
      title: 'Cut row',
      onclick: cmd('mceTableCutRow')
    });
    editor.addButton('tablecopyrow', {
      title: 'Copy row',
      onclick: cmd('mceTableCopyRow')
    });
    editor.addButton('tablepasterowbefore', {
      title: 'Paste row before',
      onclick: cmd('mceTablePasteRowBefore')
    });
    editor.addButton('tablepasterowafter', {
      title: 'Paste row after',
      onclick: cmd('mceTablePasteRowAfter')
    });
    editor.addButton('tableinsertcolbefore', {
      title: 'Insert column before',
      onclick: cmd('mceTableInsertColBefore')
    });
    editor.addButton('tableinsertcolafter', {
      title: 'Insert column after',
      onclick: cmd('mceTableInsertColAfter')
    });
    editor.addButton('tabledeletecol', {
      title: 'Delete column',
      onclick: cmd('mceTableDeleteCol')
    });
  };
  var addToolbars = function (editor) {
    var isTable = function (table) {
      var selectorMatched = editor.dom.is(table, 'table') && editor.getBody().contains(table);
      return selectorMatched;
    };
    var toolbarItems = editor.settings.table_toolbar;
    if (toolbarItems === '' || toolbarItems === false) {
      return;
    }
    if (!toolbarItems) {
      toolbarItems = 'tableprops tabledelete | ' + 'tableinsertrowbefore tableinsertrowafter tabledeleterow | ' + 'tableinsertcolbefore tableinsertcolafter tabledeletecol';
    }
    editor.addContextToolbar(isTable, toolbarItems);
  };
  var $_2yd8y8pajcgfo6yb = {
    addButtons: addButtons,
    addToolbars: addToolbars
  };

  var addMenuItems = function (editor, selections) {
    var targets = $_ch5dzyjgjcgfo55s.none();
    var tableCtrls = [];
    var cellCtrls = [];
    var mergeCtrls = [];
    var unmergeCtrls = [];
    var noTargetDisable = function (ctrl) {
      ctrl.disabled(true);
    };
    var ctrlEnable = function (ctrl) {
      ctrl.disabled(false);
    };
    var pushTable = function () {
      var self = this;
      tableCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        ctrlEnable(self);
      });
    };
    var pushCell = function () {
      var self = this;
      cellCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        ctrlEnable(self);
      });
    };
    var pushMerge = function () {
      var self = this;
      mergeCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        self.disabled(targets.mergable().isNone());
      });
    };
    var pushUnmerge = function () {
      var self = this;
      unmergeCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        self.disabled(targets.unmergable().isNone());
      });
    };
    var setDisabledCtrls = function () {
      targets.fold(function () {
        $_epd2qyjfjcgfo55m.each(tableCtrls, noTargetDisable);
        $_epd2qyjfjcgfo55m.each(cellCtrls, noTargetDisable);
        $_epd2qyjfjcgfo55m.each(mergeCtrls, noTargetDisable);
        $_epd2qyjfjcgfo55m.each(unmergeCtrls, noTargetDisable);
      }, function (targets) {
        $_epd2qyjfjcgfo55m.each(tableCtrls, ctrlEnable);
        $_epd2qyjfjcgfo55m.each(cellCtrls, ctrlEnable);
        $_epd2qyjfjcgfo55m.each(mergeCtrls, function (mergeCtrl) {
          mergeCtrl.disabled(targets.mergable().isNone());
        });
        $_epd2qyjfjcgfo55m.each(unmergeCtrls, function (unmergeCtrl) {
          unmergeCtrl.disabled(targets.unmergable().isNone());
        });
      });
    };
    editor.on('init', function () {
      editor.on('nodechange', function (e) {
        var cellOpt = $_ch5dzyjgjcgfo55s.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        targets = cellOpt.bind(function (cellDom) {
          var cell = $_epp4kejujcgfo5a8.fromDom(cellDom);
          var table = $_7pxq74jrjcgfo58f.table(cell);
          return table.map(function (table) {
            return $_i3neol0jcgfo5jb.forMenu(selections, table, cell);
          });
        });
        setDisabledCtrls();
      });
    });
    var generateTableGrid = function () {
      var html = '';
      html = '<table role="grid" class="mce-grid mce-grid-border" aria-readonly="true">';
      for (var y = 0; y < 10; y++) {
        html += '<tr>';
        for (var x = 0; x < 10; x++) {
          html += '<td role="gridcell" tabindex="-1"><a id="mcegrid' + (y * 10 + x) + '" href="#" ' + 'data-mce-x="' + x + '" data-mce-y="' + y + '"></a></td>';
        }
        html += '</tr>';
      }
      html += '</table>';
      html += '<div class="mce-text-center" role="presentation">1 x 1</div>';
      return html;
    };
    var selectGrid = function (editor, tx, ty, control) {
      var table = control.getEl().getElementsByTagName('table')[0];
      var x, y, focusCell, cell, active;
      var rtl = control.isRtl() || control.parent().rel === 'tl-tr';
      table.nextSibling.innerHTML = tx + 1 + ' x ' + (ty + 1);
      if (rtl) {
        tx = 9 - tx;
      }
      for (y = 0; y < 10; y++) {
        for (x = 0; x < 10; x++) {
          cell = table.rows[y].childNodes[x].firstChild;
          active = (rtl ? x >= tx : x <= tx) && y <= ty;
          editor.dom.toggleClass(cell, 'mce-active', active);
          if (active) {
            focusCell = cell;
          }
        }
      }
      return focusCell.parentNode;
    };
    var insertTable = editor.settings.table_grid === false ? {
      text: 'Table',
      icon: 'table',
      context: 'table',
      onclick: $_51ccyzjhjcgfo560.curry($_7bzu6wn7jcgfo68x.open, editor)
    } : {
      text: 'Table',
      icon: 'table',
      context: 'table',
      ariaHideMenu: true,
      onclick: function (e) {
        if (e.aria) {
          this.parent().hideAll();
          e.stopImmediatePropagation();
          $_7bzu6wn7jcgfo68x.open(editor);
        }
      },
      onshow: function () {
        selectGrid(editor, 0, 0, this.menu.items()[0]);
      },
      onhide: function () {
        var elements = this.menu.items()[0].getEl().getElementsByTagName('a');
        editor.dom.removeClass(elements, 'mce-active');
        editor.dom.addClass(elements[0], 'mce-active');
      },
      menu: [{
          type: 'container',
          html: generateTableGrid(),
          onPostRender: function () {
            this.lastX = this.lastY = 0;
          },
          onmousemove: function (e) {
            var target = e.target;
            var x, y;
            if (target.tagName.toUpperCase() === 'A') {
              x = parseInt(target.getAttribute('data-mce-x'), 10);
              y = parseInt(target.getAttribute('data-mce-y'), 10);
              if (this.isRtl() || this.parent().rel === 'tl-tr') {
                x = 9 - x;
              }
              if (x !== this.lastX || y !== this.lastY) {
                selectGrid(editor, x, y, e.control);
                this.lastX = x;
                this.lastY = y;
              }
            }
          },
          onclick: function (e) {
            var self = this;
            if (e.target.tagName.toUpperCase() === 'A') {
              e.preventDefault();
              e.stopPropagation();
              self.parent().cancel();
              editor.undoManager.transact(function () {
                $_8x421vlijcgfo5qe.insert(editor, self.lastX + 1, self.lastY + 1);
              });
              editor.addVisual();
            }
          }
        }]
    };
    function cmd(command) {
      return function () {
        editor.execCommand(command);
      };
    }
    var tableProperties = {
      text: 'Table properties',
      context: 'table',
      onPostRender: pushTable,
      onclick: $_51ccyzjhjcgfo560.curry($_7bzu6wn7jcgfo68x.open, editor, true)
    };
    var deleteTable = {
      text: 'Delete table',
      context: 'table',
      onPostRender: pushTable,
      cmd: 'mceTableDelete'
    };
    var row = {
      text: 'Row',
      context: 'table',
      menu: [
        {
          text: 'Insert row before',
          onclick: cmd('mceTableInsertRowBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Insert row after',
          onclick: cmd('mceTableInsertRowAfter'),
          onPostRender: pushCell
        },
        {
          text: 'Delete row',
          onclick: cmd('mceTableDeleteRow'),
          onPostRender: pushCell
        },
        {
          text: 'Row properties',
          onclick: cmd('mceTableRowProps'),
          onPostRender: pushCell
        },
        { text: '-' },
        {
          text: 'Cut row',
          onclick: cmd('mceTableCutRow'),
          onPostRender: pushCell
        },
        {
          text: 'Copy row',
          onclick: cmd('mceTableCopyRow'),
          onPostRender: pushCell
        },
        {
          text: 'Paste row before',
          onclick: cmd('mceTablePasteRowBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Paste row after',
          onclick: cmd('mceTablePasteRowAfter'),
          onPostRender: pushCell
        }
      ]
    };
    var column = {
      text: 'Column',
      context: 'table',
      menu: [
        {
          text: 'Insert column before',
          onclick: cmd('mceTableInsertColBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Insert column after',
          onclick: cmd('mceTableInsertColAfter'),
          onPostRender: pushCell
        },
        {
          text: 'Delete column',
          onclick: cmd('mceTableDeleteCol'),
          onPostRender: pushCell
        }
      ]
    };
    var cell = {
      separator: 'before',
      text: 'Cell',
      context: 'table',
      menu: [
        {
          text: 'Cell properties',
          onclick: cmd('mceTableCellProps'),
          onPostRender: pushCell
        },
        {
          text: 'Merge cells',
          onclick: cmd('mceTableMergeCells'),
          onPostRender: pushMerge
        },
        {
          text: 'Split cell',
          onclick: cmd('mceTableSplitCells'),
          onPostRender: pushUnmerge
        }
      ]
    };
    editor.addMenuItem('inserttable', insertTable);
    editor.addMenuItem('tableprops', tableProperties);
    editor.addMenuItem('deletetable', deleteTable);
    editor.addMenuItem('row', row);
    editor.addMenuItem('column', column);
    editor.addMenuItem('cell', cell);
  };
  var $_8vbkpspbjcgfo6yh = { addMenuItems: addMenuItems };

  function Plugin(editor) {
    var self = this;
    var resizeHandler = ResizeHandler(editor);
    var cellSelection = CellSelection$1(editor, resizeHandler.lazyResize);
    var actions = TableActions(editor, resizeHandler.lazyWire);
    var selections = Selections(editor);
    $_4koqxhn4jcgfo67y.registerCommands(editor, actions, cellSelection, selections);
    $_5rvw7bjejcgfo54d.registerEvents(editor, selections, actions, cellSelection);
    $_8vbkpspbjcgfo6yh.addMenuItems(editor, selections);
    $_2yd8y8pajcgfo6yb.addButtons(editor);
    $_2yd8y8pajcgfo6yb.addToolbars(editor);
    editor.on('PreInit', function () {
      editor.serializer.addTempAttr($_1c8x42lfjcgfo5py.firstSelected());
      editor.serializer.addTempAttr($_1c8x42lfjcgfo5py.lastSelected());
    });
    if (editor.settings.table_tab_navigation !== false) {
      editor.on('keydown', function (e) {
        $_e0rtlknzjcgfo6hd.handle(e, editor, actions, resizeHandler.lazyWire);
      });
    }
    editor.on('remove', function () {
      resizeHandler.destroy();
      cellSelection.destroy();
    });
    self.insertTable = function (columns, rows) {
      return $_8x421vlijcgfo5qe.insert(editor, columns, rows);
    };
    self.setClipboardRows = $_4koqxhn4jcgfo67y.setClipboardRows;
    self.getClipboardRows = $_4koqxhn4jcgfo67y.getClipboardRows;
  }
  PluginManager.add('table', Plugin);
  var Plugin$1 = function () {
  };

  return Plugin$1;

}());
})()
