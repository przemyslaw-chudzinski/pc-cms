(function () {
var mobile = (function () {
  'use strict';

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
  var $_ee1z6xwajcgfo8qa = {
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

  var never = $_ee1z6xwajcgfo8qa.never;
  var always = $_ee1z6xwajcgfo8qa.always;
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
      toString: $_ee1z6xwajcgfo8qa.constant('none()')
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
  var $_d7fxouw9jcgfo8q5 = {
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
    return r === -1 ? $_d7fxouw9jcgfo8q5.none() : $_d7fxouw9jcgfo8q5.some(r);
  };
  var contains$1 = function (xs, x) {
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
        return $_d7fxouw9jcgfo8q5.some(x);
      }
    }
    return $_d7fxouw9jcgfo8q5.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_d7fxouw9jcgfo8q5.some(i);
      }
    }
    return $_d7fxouw9jcgfo8q5.none();
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
      return !contains$1(a2, x);
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
    return xs.length === 0 ? $_d7fxouw9jcgfo8q5.none() : $_d7fxouw9jcgfo8q5.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? $_d7fxouw9jcgfo8q5.none() : $_d7fxouw9jcgfo8q5.some(xs[xs.length - 1]);
  };
  var $_3h0i9zw8jcgfo8px = {
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
    contains: contains$1,
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
  var $_5dcs3gwdjcgfo8qm = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_5dcs3gwdjcgfo8qm.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_6t1mpcwcjcgfo8qg = { getOrDie: getOrDie };

  var node = function () {
    var f = $_6t1mpcwcjcgfo8qg.getOrDie('Node');
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
  var $_97vq7awbjcgfo8qe = {
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
  var $_1u8x7pwgjcgfo8r0 = { cached: cached };

  var firstMatch = function (regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
      var x = regexes[i];
      if (x.test(s))
        return x;
    }
    return undefined;
  };
  var find$1 = function (regexes, agent) {
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
    return find$1(versionRegexes, cleanedAgent);
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
  var $_c04sf6wjjcgfo8ra = {
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
      version: $_c04sf6wjjcgfo8ra.unknown()
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
  var $_ahsclcwijcgfo8r4 = {
    unknown: unknown,
    nu: nu,
    edge: $_ee1z6xwajcgfo8qa.constant(edge),
    chrome: $_ee1z6xwajcgfo8qa.constant(chrome),
    ie: $_ee1z6xwajcgfo8qa.constant(ie),
    opera: $_ee1z6xwajcgfo8qa.constant(opera),
    firefox: $_ee1z6xwajcgfo8qa.constant(firefox),
    safari: $_ee1z6xwajcgfo8qa.constant(safari)
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
      version: $_c04sf6wjjcgfo8ra.unknown()
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
  var $_ct81mswkjcgfo8rc = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_ee1z6xwajcgfo8qa.constant(windows),
    ios: $_ee1z6xwajcgfo8qa.constant(ios),
    android: $_ee1z6xwajcgfo8qa.constant(android),
    linux: $_ee1z6xwajcgfo8qa.constant(linux),
    osx: $_ee1z6xwajcgfo8qa.constant(osx),
    solaris: $_ee1z6xwajcgfo8qa.constant(solaris),
    freebsd: $_ee1z6xwajcgfo8qa.constant(freebsd)
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
      isiPad: $_ee1z6xwajcgfo8qa.constant(isiPad),
      isiPhone: $_ee1z6xwajcgfo8qa.constant(isiPhone),
      isTablet: $_ee1z6xwajcgfo8qa.constant(isTablet),
      isPhone: $_ee1z6xwajcgfo8qa.constant(isPhone),
      isTouch: $_ee1z6xwajcgfo8qa.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_ee1z6xwajcgfo8qa.constant(iOSwebview)
    };
  };

  var detect$3 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_3h0i9zw8jcgfo8px.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$3(browsers, userAgent).map(function (browser) {
      var version = $_c04sf6wjjcgfo8ra.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$3(oses, userAgent).map(function (os) {
      var version = $_c04sf6wjjcgfo8ra.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_8a4vmbwmjcgfo8rp = {
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
  var $_3dw8yawpjcgfo8s8 = {
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
    return str === '' ? $_d7fxouw9jcgfo8q5.none() : $_d7fxouw9jcgfo8q5.some(str.substr(0, 1));
  };
  var tail = function (str) {
    return str === '' ? $_d7fxouw9jcgfo8q5.none() : $_d7fxouw9jcgfo8q5.some(str.substring(1));
  };
  var $_4ekt1ewqjcgfo8sa = {
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
    return startsWith(str, prefix) ? $_3dw8yawpjcgfo8s8.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_3dw8yawpjcgfo8s8.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_3dw8yawpjcgfo8s8.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_3dw8yawpjcgfo8s8.addToEnd(str, prefix);
  };
  var contains$2 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_4ekt1ewqjcgfo8sa.head(str).bind(function (head) {
      return $_4ekt1ewqjcgfo8sa.tail(str).map(function (tail) {
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
  var $_g18n9xwojcgfo8s5 = {
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
      return $_g18n9xwojcgfo8s5.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_g18n9xwojcgfo8s5.contains(uastring, 'edge/') && $_g18n9xwojcgfo8s5.contains(uastring, 'chrome') && $_g18n9xwojcgfo8s5.contains(uastring, 'safari') && $_g18n9xwojcgfo8s5.contains(uastring, 'applewebkit');
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
        return $_g18n9xwojcgfo8s5.contains(uastring, 'chrome') && !$_g18n9xwojcgfo8s5.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_g18n9xwojcgfo8s5.contains(uastring, 'msie') || $_g18n9xwojcgfo8s5.contains(uastring, 'trident');
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
        return ($_g18n9xwojcgfo8s5.contains(uastring, 'safari') || $_g18n9xwojcgfo8s5.contains(uastring, 'mobile/')) && $_g18n9xwojcgfo8s5.contains(uastring, 'applewebkit');
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
        return $_g18n9xwojcgfo8s5.contains(uastring, 'iphone') || $_g18n9xwojcgfo8s5.contains(uastring, 'ipad');
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
  var $_3397duwnjcgfo8rv = {
    browsers: $_ee1z6xwajcgfo8qa.constant(browsers),
    oses: $_ee1z6xwajcgfo8qa.constant(oses)
  };

  var detect$1 = function (userAgent) {
    var browsers = $_3397duwnjcgfo8rv.browsers();
    var oses = $_3397duwnjcgfo8rv.oses();
    var browser = $_8a4vmbwmjcgfo8rp.detectBrowser(browsers, userAgent).fold($_ahsclcwijcgfo8r4.unknown, $_ahsclcwijcgfo8r4.nu);
    var os = $_8a4vmbwmjcgfo8rp.detectOs(oses, userAgent).fold($_ct81mswkjcgfo8rc.unknown, $_ct81mswkjcgfo8rc.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_9km11iwhjcgfo8r2 = { detect: detect$1 };

  var detect = $_1u8x7pwgjcgfo8r0.cached(function () {
    var userAgent = navigator.userAgent;
    return $_9km11iwhjcgfo8r2.detect(userAgent);
  });
  var $_6o4pdywfjcgfo8qq = { detect: detect };

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
    return { dom: $_ee1z6xwajcgfo8qa.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return $_d7fxouw9jcgfo8q5.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_6rcvbhwsjcgfo8sm = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_6r0crwwtjcgfo8sv = {
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

  var ELEMENT = $_6r0crwwtjcgfo8sv.ELEMENT;
  var DOCUMENT = $_6r0crwwtjcgfo8sv.DOCUMENT;
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
    return bypassSelector(base) ? [] : $_3h0i9zw8jcgfo8px.map(base.querySelectorAll(selector), $_6rcvbhwsjcgfo8sm.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? $_d7fxouw9jcgfo8q5.none() : $_d7fxouw9jcgfo8q5.from(base.querySelector(selector)).map($_6rcvbhwsjcgfo8sm.fromDom);
  };
  var $_dk3rx9wrjcgfo8sc = {
    all: all,
    is: is,
    one: one
  };

  var eq = function (e1, e2) {
    return e1.dom() === e2.dom();
  };
  var isEqualNode = function (e1, e2) {
    return e1.dom().isEqualNode(e2.dom());
  };
  var member = function (element, elements) {
    return $_3h0i9zw8jcgfo8px.exists(elements, $_ee1z6xwajcgfo8qa.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_97vq7awbjcgfo8qe.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_6o4pdywfjcgfo8qq.detect().browser;
  var contains = browser.isIE() ? ieContains : regularContains;
  var $_8prpzjw7jcgfo8p9 = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains,
    is: $_dk3rx9wrjcgfo8sc.is
  };

  var isSource = function (component, simulatedEvent) {
    return $_8prpzjw7jcgfo8p9.eq(component.element(), simulatedEvent.event().target());
  };
  var $_40w9y6w6jcgfo8p1 = { isSource: isSource };

  var $_8bjxvowwjcgfo8tj = {
    contextmenu: $_ee1z6xwajcgfo8qa.constant('contextmenu'),
    touchstart: $_ee1z6xwajcgfo8qa.constant('touchstart'),
    touchmove: $_ee1z6xwajcgfo8qa.constant('touchmove'),
    touchend: $_ee1z6xwajcgfo8qa.constant('touchend'),
    gesturestart: $_ee1z6xwajcgfo8qa.constant('gesturestart'),
    mousedown: $_ee1z6xwajcgfo8qa.constant('mousedown'),
    mousemove: $_ee1z6xwajcgfo8qa.constant('mousemove'),
    mouseout: $_ee1z6xwajcgfo8qa.constant('mouseout'),
    mouseup: $_ee1z6xwajcgfo8qa.constant('mouseup'),
    mouseover: $_ee1z6xwajcgfo8qa.constant('mouseover'),
    focusin: $_ee1z6xwajcgfo8qa.constant('focusin'),
    keydown: $_ee1z6xwajcgfo8qa.constant('keydown'),
    input: $_ee1z6xwajcgfo8qa.constant('input'),
    change: $_ee1z6xwajcgfo8qa.constant('change'),
    focus: $_ee1z6xwajcgfo8qa.constant('focus'),
    click: $_ee1z6xwajcgfo8qa.constant('click'),
    transitionend: $_ee1z6xwajcgfo8qa.constant('transitionend'),
    selectstart: $_ee1z6xwajcgfo8qa.constant('selectstart')
  };

  var alloy = { tap: $_ee1z6xwajcgfo8qa.constant('alloy.tap') };
  var $_1snegiwvjcgfo8tb = {
    focus: $_ee1z6xwajcgfo8qa.constant('alloy.focus'),
    postBlur: $_ee1z6xwajcgfo8qa.constant('alloy.blur.post'),
    receive: $_ee1z6xwajcgfo8qa.constant('alloy.receive'),
    execute: $_ee1z6xwajcgfo8qa.constant('alloy.execute'),
    focusItem: $_ee1z6xwajcgfo8qa.constant('alloy.focus.item'),
    tap: alloy.tap,
    tapOrClick: $_6o4pdywfjcgfo8qq.detect().deviceType.isTouch() ? alloy.tap : $_8bjxvowwjcgfo8tj.click,
    longpress: $_ee1z6xwajcgfo8qa.constant('alloy.longpress'),
    sandboxClose: $_ee1z6xwajcgfo8qa.constant('alloy.sandbox.close'),
    systemInit: $_ee1z6xwajcgfo8qa.constant('alloy.system.init'),
    windowScroll: $_ee1z6xwajcgfo8qa.constant('alloy.system.scroll'),
    attachedToDom: $_ee1z6xwajcgfo8qa.constant('alloy.system.attached'),
    detachedFromDom: $_ee1z6xwajcgfo8qa.constant('alloy.system.detached'),
    changeTab: $_ee1z6xwajcgfo8qa.constant('alloy.change.tab'),
    dismissTab: $_ee1z6xwajcgfo8qa.constant('alloy.dismiss.tab')
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
  var $_eregpvwyjcgfo8ts = {
    isString: isType('string'),
    isObject: isType('object'),
    isArray: isType('array'),
    isNull: isType('null'),
    isBoolean: isType('boolean'),
    isUndefined: isType('undefined'),
    isFunction: isType('function'),
    isNumber: isType('number')
  };

  var shallow = function (old, nu) {
    return nu;
  };
  var deep = function (old, nu) {
    var bothObjects = $_eregpvwyjcgfo8ts.isObject(old) && $_eregpvwyjcgfo8ts.isObject(nu);
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
  var deepMerge = baseMerge(deep);
  var merge = baseMerge(shallow);
  var $_au1coewxjcgfo8tp = {
    deepMerge: deepMerge,
    merge: merge
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
  var find$2 = function (obj, pred) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      if (pred(x, i, obj)) {
        return $_d7fxouw9jcgfo8q5.some(x);
      }
    }
    return $_d7fxouw9jcgfo8q5.none();
  };
  var values = function (obj) {
    return mapToArray(obj, function (v) {
      return v;
    });
  };
  var size = function (obj) {
    return values(obj).length;
  };
  var $_a7hrnswzjcgfo8tz = {
    bifilter: bifilter,
    each: each$1,
    map: objectMap,
    mapToArray: mapToArray,
    tupleMap: tupleMap,
    find: find$2,
    keys: keys,
    values: values,
    size: size
  };

  var emit = function (component, event) {
    dispatchWith(component, component.element(), event, {});
  };
  var emitWith = function (component, event, properties) {
    dispatchWith(component, component.element(), event, properties);
  };
  var emitExecute = function (component) {
    emit(component, $_1snegiwvjcgfo8tb.execute());
  };
  var dispatch = function (component, target, event) {
    dispatchWith(component, target, event, {});
  };
  var dispatchWith = function (component, target, event, properties) {
    var data = $_au1coewxjcgfo8tp.deepMerge({ target: target }, properties);
    component.getSystem().triggerEvent(event, target, $_a7hrnswzjcgfo8tz.map(data, $_ee1z6xwajcgfo8qa.constant));
  };
  var dispatchEvent = function (component, target, event, simulatedEvent) {
    component.getSystem().triggerEvent(event, target, simulatedEvent.event());
  };
  var dispatchFocus = function (component, target) {
    component.getSystem().triggerFocus(target, component.element());
  };
  var $_4x498fwujcgfo8sy = {
    emit: emit,
    emitWith: emitWith,
    emitExecute: emitExecute,
    dispatch: dispatch,
    dispatchWith: dispatchWith,
    dispatchEvent: dispatchEvent,
    dispatchFocus: dispatchFocus
  };

  var generate = function (cases) {
    if (!$_eregpvwyjcgfo8ts.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_3h0i9zw8jcgfo8px.each(cases, function (acase, count) {
      var keys = $_a7hrnswzjcgfo8tz.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_eregpvwyjcgfo8ts.isArray(value)) {
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
          var branchKeys = $_a7hrnswzjcgfo8tz.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_3h0i9zw8jcgfo8px.forall(constructors, function (reqKey) {
            return $_3h0i9zw8jcgfo8px.contains(branchKeys, reqKey);
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
  var $_eqsftbx3jcgfo8vg = { generate: generate };

  var adt = $_eqsftbx3jcgfo8vg.generate([
    { strict: [] },
    { defaultedThunk: ['fallbackThunk'] },
    { asOption: [] },
    { asDefaultedOptionThunk: ['fallbackThunk'] },
    { mergeWithThunk: ['baseThunk'] }
  ]);
  var defaulted$1 = function (fallback) {
    return adt.defaultedThunk($_ee1z6xwajcgfo8qa.constant(fallback));
  };
  var asDefaultedOption = function (fallback) {
    return adt.asDefaultedOptionThunk($_ee1z6xwajcgfo8qa.constant(fallback));
  };
  var mergeWith = function (base) {
    return adt.mergeWithThunk($_ee1z6xwajcgfo8qa.constant(base));
  };
  var $_d0l63jx2jcgfo8v5 = {
    strict: adt.strict,
    asOption: adt.asOption,
    defaulted: defaulted$1,
    defaultedThunk: adt.defaultedThunk,
    asDefaultedOption: asDefaultedOption,
    asDefaultedOptionThunk: adt.asDefaultedOptionThunk,
    mergeWith: mergeWith,
    mergeWithThunk: adt.mergeWithThunk
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
      return $_d7fxouw9jcgfo8q5.some(o);
    };
    return {
      is: is,
      isValue: $_ee1z6xwajcgfo8qa.constant(true),
      isError: $_ee1z6xwajcgfo8qa.constant(false),
      getOr: $_ee1z6xwajcgfo8qa.constant(o),
      getOrThunk: $_ee1z6xwajcgfo8qa.constant(o),
      getOrDie: $_ee1z6xwajcgfo8qa.constant(o),
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
      return $_ee1z6xwajcgfo8qa.die(message)();
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
      is: $_ee1z6xwajcgfo8qa.constant(false),
      isValue: $_ee1z6xwajcgfo8qa.constant(false),
      isError: $_ee1z6xwajcgfo8qa.constant(true),
      getOr: $_ee1z6xwajcgfo8qa.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_ee1z6xwajcgfo8qa.noop,
      bind: bind,
      exists: $_ee1z6xwajcgfo8qa.constant(false),
      forall: $_ee1z6xwajcgfo8qa.constant(true),
      toOption: $_d7fxouw9jcgfo8q5.none
    };
  };
  var $_eyzbemx7jcgfo8x7 = {
    value: value$1,
    error: error
  };

  var comparison = $_eqsftbx3jcgfo8vg.generate([
    {
      bothErrors: [
        'error1',
        'error2'
      ]
    },
    {
      firstError: [
        'error1',
        'value2'
      ]
    },
    {
      secondError: [
        'value1',
        'error2'
      ]
    },
    {
      bothValues: [
        'value1',
        'value2'
      ]
    }
  ]);
  var partition$1 = function (results) {
    var errors = [];
    var values = [];
    $_3h0i9zw8jcgfo8px.each(results, function (result) {
      result.fold(function (err) {
        errors.push(err);
      }, function (value) {
        values.push(value);
      });
    });
    return {
      errors: errors,
      values: values
    };
  };
  var compare = function (result1, result2) {
    return result1.fold(function (err1) {
      return result2.fold(function (err2) {
        return comparison.bothErrors(err1, err2);
      }, function (val2) {
        return comparison.firstError(err1, val2);
      });
    }, function (val1) {
      return result2.fold(function (err2) {
        return comparison.secondError(val1, err2);
      }, function (val2) {
        return comparison.bothValues(val1, val2);
      });
    });
  };
  var $_fkpp1nx8jcgfo8xa = {
    partition: partition$1,
    compare: compare
  };

  var mergeValues = function (values, base) {
    return $_eyzbemx7jcgfo8x7.value($_au1coewxjcgfo8tp.deepMerge.apply(undefined, [base].concat(values)));
  };
  var mergeErrors = function (errors) {
    return $_ee1z6xwajcgfo8qa.compose($_eyzbemx7jcgfo8x7.error, $_3h0i9zw8jcgfo8px.flatten)(errors);
  };
  var consolidateObj = function (objects, base) {
    var partitions = $_fkpp1nx8jcgfo8xa.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : mergeValues(partitions.values, base);
  };
  var consolidateArr = function (objects) {
    var partitions = $_fkpp1nx8jcgfo8xa.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : $_eyzbemx7jcgfo8x7.value(partitions.values);
  };
  var $_cb7bbvx6jcgfo8wi = {
    consolidateObj: consolidateObj,
    consolidateArr: consolidateArr
  };

  var narrow$1 = function (obj, fields) {
    var r = {};
    $_3h0i9zw8jcgfo8px.each(fields, function (field) {
      if (obj[field] !== undefined && obj.hasOwnProperty(field))
        r[field] = obj[field];
    });
    return r;
  };
  var indexOnKey$1 = function (array, key) {
    var obj = {};
    $_3h0i9zw8jcgfo8px.each(array, function (a) {
      var keyValue = a[key];
      obj[keyValue] = a;
    });
    return obj;
  };
  var exclude$1 = function (obj, fields) {
    var r = {};
    $_a7hrnswzjcgfo8tz.each(obj, function (v, k) {
      if (!$_3h0i9zw8jcgfo8px.contains(fields, k)) {
        r[k] = v;
      }
    });
    return r;
  };
  var $_fyy490x9jcgfo8xd = {
    narrow: narrow$1,
    exclude: exclude$1,
    indexOnKey: indexOnKey$1
  };

  var readOpt$1 = function (key) {
    return function (obj) {
      return obj.hasOwnProperty(key) ? $_d7fxouw9jcgfo8q5.from(obj[key]) : $_d7fxouw9jcgfo8q5.none();
    };
  };
  var readOr$1 = function (key, fallback) {
    return function (obj) {
      return readOpt$1(key)(obj).getOr(fallback);
    };
  };
  var readOptFrom$1 = function (obj, key) {
    return readOpt$1(key)(obj);
  };
  var hasKey$1 = function (obj, key) {
    return obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null;
  };
  var $_cwlherxajcgfo8xl = {
    readOpt: readOpt$1,
    readOr: readOr$1,
    readOptFrom: readOptFrom$1,
    hasKey: hasKey$1
  };

  var wrap$1 = function (key, value) {
    var r = {};
    r[key] = value;
    return r;
  };
  var wrapAll$1 = function (keyvalues) {
    var r = {};
    $_3h0i9zw8jcgfo8px.each(keyvalues, function (kv) {
      r[kv.key] = kv.value;
    });
    return r;
  };
  var $_9vlctaxbjcgfo8xq = {
    wrap: wrap$1,
    wrapAll: wrapAll$1
  };

  var narrow = function (obj, fields) {
    return $_fyy490x9jcgfo8xd.narrow(obj, fields);
  };
  var exclude = function (obj, fields) {
    return $_fyy490x9jcgfo8xd.exclude(obj, fields);
  };
  var readOpt = function (key) {
    return $_cwlherxajcgfo8xl.readOpt(key);
  };
  var readOr = function (key, fallback) {
    return $_cwlherxajcgfo8xl.readOr(key, fallback);
  };
  var readOptFrom = function (obj, key) {
    return $_cwlherxajcgfo8xl.readOptFrom(obj, key);
  };
  var wrap = function (key, value) {
    return $_9vlctaxbjcgfo8xq.wrap(key, value);
  };
  var wrapAll = function (keyvalues) {
    return $_9vlctaxbjcgfo8xq.wrapAll(keyvalues);
  };
  var indexOnKey = function (array, key) {
    return $_fyy490x9jcgfo8xd.indexOnKey(array, key);
  };
  var consolidate = function (objs, base) {
    return $_cb7bbvx6jcgfo8wi.consolidateObj(objs, base);
  };
  var hasKey = function (obj, key) {
    return $_cwlherxajcgfo8xl.hasKey(obj, key);
  };
  var $_8fkfzex5jcgfo8wf = {
    narrow: narrow,
    exclude: exclude,
    readOpt: readOpt,
    readOr: readOr,
    readOptFrom: readOptFrom,
    wrap: wrap,
    wrapAll: wrapAll,
    indexOnKey: indexOnKey,
    hasKey: hasKey,
    consolidate: consolidate
  };

  var json = function () {
    return $_6t1mpcwcjcgfo8qg.getOrDie('JSON');
  };
  var parse = function (obj) {
    return json().parse(obj);
  };
  var stringify = function (obj, replacer, space) {
    return json().stringify(obj, replacer, space);
  };
  var $_8pq9zfxejcgfo8yf = {
    parse: parse,
    stringify: stringify
  };

  var formatObj = function (input) {
    return $_eregpvwyjcgfo8ts.isObject(input) && $_a7hrnswzjcgfo8tz.keys(input).length > 100 ? ' removed due to size' : $_8pq9zfxejcgfo8yf.stringify(input, null, 2);
  };
  var formatErrors = function (errors) {
    var es = errors.length > 10 ? errors.slice(0, 10).concat([{
        path: [],
        getErrorInfo: function () {
          return '... (only showing first ten failures)';
        }
      }]) : errors;
    return $_3h0i9zw8jcgfo8px.map(es, function (e) {
      return 'Failed path: (' + e.path.join(' > ') + ')\n' + e.getErrorInfo();
    });
  };
  var $_az43y3xdjcgfo8y1 = {
    formatObj: formatObj,
    formatErrors: formatErrors
  };

  var nu$4 = function (path, getErrorInfo) {
    return $_eyzbemx7jcgfo8x7.error([{
        path: path,
        getErrorInfo: getErrorInfo
      }]);
  };
  var missingStrict = function (path, key, obj) {
    return nu$4(path, function () {
      return 'Could not find valid *strict* value for "' + key + '" in ' + $_az43y3xdjcgfo8y1.formatObj(obj);
    });
  };
  var missingKey = function (path, key) {
    return nu$4(path, function () {
      return 'Choice schema did not contain choice key: "' + key + '"';
    });
  };
  var missingBranch = function (path, branches, branch) {
    return nu$4(path, function () {
      return 'The chosen schema: "' + branch + '" did not exist in branches: ' + $_az43y3xdjcgfo8y1.formatObj(branches);
    });
  };
  var unsupportedFields = function (path, unsupported) {
    return nu$4(path, function () {
      return 'There are unsupported fields: [' + unsupported.join(', ') + '] specified';
    });
  };
  var custom = function (path, err) {
    return nu$4(path, function () {
      return err;
    });
  };
  var toString = function (error) {
    return 'Failed path: (' + error.path.join(' > ') + ')\n' + error.getErrorInfo();
  };
  var $_6s9dfaxcjcgfo8xw = {
    missingStrict: missingStrict,
    missingKey: missingKey,
    missingBranch: missingBranch,
    unsupportedFields: unsupportedFields,
    custom: custom,
    toString: toString
  };

  var typeAdt = $_eqsftbx3jcgfo8vg.generate([
    {
      setOf: [
        'validator',
        'valueType'
      ]
    },
    { arrOf: ['valueType'] },
    { objOf: ['fields'] },
    { itemOf: ['validator'] },
    {
      choiceOf: [
        'key',
        'branches'
      ]
    }
  ]);
  var fieldAdt = $_eqsftbx3jcgfo8vg.generate([
    {
      field: [
        'name',
        'presence',
        'type'
      ]
    },
    { state: ['name'] }
  ]);
  var $_g2hidpxfjcgfo8yh = {
    typeAdt: typeAdt,
    fieldAdt: fieldAdt
  };

  var adt$1 = $_eqsftbx3jcgfo8vg.generate([
    {
      field: [
        'key',
        'okey',
        'presence',
        'prop'
      ]
    },
    {
      state: [
        'okey',
        'instantiator'
      ]
    }
  ]);
  var output = function (okey, value) {
    return adt$1.state(okey, $_ee1z6xwajcgfo8qa.constant(value));
  };
  var snapshot = function (okey) {
    return adt$1.state(okey, $_ee1z6xwajcgfo8qa.identity);
  };
  var strictAccess = function (path, obj, key) {
    return $_cwlherxajcgfo8xl.readOptFrom(obj, key).fold(function () {
      return $_6s9dfaxcjcgfo8xw.missingStrict(path, key, obj);
    }, $_eyzbemx7jcgfo8x7.value);
  };
  var fallbackAccess = function (obj, key, fallbackThunk) {
    var v = $_cwlherxajcgfo8xl.readOptFrom(obj, key).fold(function () {
      return fallbackThunk(obj);
    }, $_ee1z6xwajcgfo8qa.identity);
    return $_eyzbemx7jcgfo8x7.value(v);
  };
  var optionAccess = function (obj, key) {
    return $_eyzbemx7jcgfo8x7.value($_cwlherxajcgfo8xl.readOptFrom(obj, key));
  };
  var optionDefaultedAccess = function (obj, key, fallback) {
    var opt = $_cwlherxajcgfo8xl.readOptFrom(obj, key).map(function (val) {
      return val === true ? fallback(obj) : val;
    });
    return $_eyzbemx7jcgfo8x7.value(opt);
  };
  var cExtractOne = function (path, obj, field, strength) {
    return field.fold(function (key, okey, presence, prop) {
      var bundle = function (av) {
        return prop.extract(path.concat([key]), strength, av).map(function (res) {
          return $_9vlctaxbjcgfo8xq.wrap(okey, strength(res));
        });
      };
      var bundleAsOption = function (optValue) {
        return optValue.fold(function () {
          var outcome = $_9vlctaxbjcgfo8xq.wrap(okey, strength($_d7fxouw9jcgfo8q5.none()));
          return $_eyzbemx7jcgfo8x7.value(outcome);
        }, function (ov) {
          return prop.extract(path.concat([key]), strength, ov).map(function (res) {
            return $_9vlctaxbjcgfo8xq.wrap(okey, strength($_d7fxouw9jcgfo8q5.some(res)));
          });
        });
      };
      return function () {
        return presence.fold(function () {
          return strictAccess(path, obj, key).bind(bundle);
        }, function (fallbackThunk) {
          return fallbackAccess(obj, key, fallbackThunk).bind(bundle);
        }, function () {
          return optionAccess(obj, key).bind(bundleAsOption);
        }, function (fallbackThunk) {
          return optionDefaultedAccess(obj, key, fallbackThunk).bind(bundleAsOption);
        }, function (baseThunk) {
          var base = baseThunk(obj);
          return fallbackAccess(obj, key, $_ee1z6xwajcgfo8qa.constant({})).map(function (v) {
            return $_au1coewxjcgfo8tp.deepMerge(base, v);
          }).bind(bundle);
        });
      }();
    }, function (okey, instantiator) {
      var state = instantiator(obj);
      return $_eyzbemx7jcgfo8x7.value($_9vlctaxbjcgfo8xq.wrap(okey, strength(state)));
    });
  };
  var cExtract = function (path, obj, fields, strength) {
    var results = $_3h0i9zw8jcgfo8px.map(fields, function (field) {
      return cExtractOne(path, obj, field, strength);
    });
    return $_cb7bbvx6jcgfo8wi.consolidateObj(results, {});
  };
  var value = function (validator) {
    var extract = function (path, strength, val) {
      return validator(val).fold(function (err) {
        return $_6s9dfaxcjcgfo8xw.custom(path, err);
      }, $_eyzbemx7jcgfo8x7.value);
    };
    var toString = function () {
      return 'val';
    };
    var toDsl = function () {
      return $_g2hidpxfjcgfo8yh.typeAdt.itemOf(validator);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var getSetKeys = function (obj) {
    var keys = $_a7hrnswzjcgfo8tz.keys(obj);
    return $_3h0i9zw8jcgfo8px.filter(keys, function (k) {
      return $_8fkfzex5jcgfo8wf.hasKey(obj, k);
    });
  };
  var objOnly = function (fields) {
    var delegate = obj(fields);
    var fieldNames = $_3h0i9zw8jcgfo8px.foldr(fields, function (acc, f) {
      return f.fold(function (key) {
        return $_au1coewxjcgfo8tp.deepMerge(acc, $_8fkfzex5jcgfo8wf.wrap(key, true));
      }, $_ee1z6xwajcgfo8qa.constant(acc));
    }, {});
    var extract = function (path, strength, o) {
      var keys = $_eregpvwyjcgfo8ts.isBoolean(o) ? [] : getSetKeys(o);
      var extra = $_3h0i9zw8jcgfo8px.filter(keys, function (k) {
        return !$_8fkfzex5jcgfo8wf.hasKey(fieldNames, k);
      });
      return extra.length === 0 ? delegate.extract(path, strength, o) : $_6s9dfaxcjcgfo8xw.unsupportedFields(path, extra);
    };
    return {
      extract: extract,
      toString: delegate.toString,
      toDsl: delegate.toDsl
    };
  };
  var obj = function (fields) {
    var extract = function (path, strength, o) {
      return cExtract(path, o, fields, strength);
    };
    var toString = function () {
      var fieldStrings = $_3h0i9zw8jcgfo8px.map(fields, function (field) {
        return field.fold(function (key, okey, presence, prop) {
          return key + ' -> ' + prop.toString();
        }, function (okey, instantiator) {
          return 'state(' + okey + ')';
        });
      });
      return 'obj{\n' + fieldStrings.join('\n') + '}';
    };
    var toDsl = function () {
      return $_g2hidpxfjcgfo8yh.typeAdt.objOf($_3h0i9zw8jcgfo8px.map(fields, function (f) {
        return f.fold(function (key, okey, presence, prop) {
          return $_g2hidpxfjcgfo8yh.fieldAdt.field(key, presence, prop);
        }, function (okey, instantiator) {
          return $_g2hidpxfjcgfo8yh.fieldAdt.state(okey);
        });
      }));
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var arr = function (prop) {
    var extract = function (path, strength, array) {
      var results = $_3h0i9zw8jcgfo8px.map(array, function (a, i) {
        return prop.extract(path.concat(['[' + i + ']']), strength, a);
      });
      return $_cb7bbvx6jcgfo8wi.consolidateArr(results);
    };
    var toString = function () {
      return 'array(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_g2hidpxfjcgfo8yh.typeAdt.arrOf(prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var setOf = function (validator, prop) {
    var validateKeys = function (path, keys) {
      return arr(value(validator)).extract(path, $_ee1z6xwajcgfo8qa.identity, keys);
    };
    var extract = function (path, strength, o) {
      var keys = $_a7hrnswzjcgfo8tz.keys(o);
      return validateKeys(path, keys).bind(function (validKeys) {
        var schema = $_3h0i9zw8jcgfo8px.map(validKeys, function (vk) {
          return adt$1.field(vk, vk, $_d0l63jx2jcgfo8v5.strict(), prop);
        });
        return obj(schema).extract(path, strength, o);
      });
    };
    var toString = function () {
      return 'setOf(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_g2hidpxfjcgfo8yh.typeAdt.setOf(validator, prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var anyValue = value($_eyzbemx7jcgfo8x7.value);
  var arrOfObj = $_ee1z6xwajcgfo8qa.compose(arr, obj);
  var $_9egm1gx4jcgfo8vl = {
    anyValue: $_ee1z6xwajcgfo8qa.constant(anyValue),
    value: value,
    obj: obj,
    objOnly: objOnly,
    arr: arr,
    setOf: setOf,
    arrOfObj: arrOfObj,
    state: adt$1.state,
    field: adt$1.field,
    output: output,
    snapshot: snapshot
  };

  var strict = function (key) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.strict(), $_9egm1gx4jcgfo8vl.anyValue());
  };
  var strictOf = function (key, schema) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.strict(), schema);
  };
  var strictFunction = function (key) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.strict(), $_9egm1gx4jcgfo8vl.value(function (f) {
      return $_eregpvwyjcgfo8ts.isFunction(f) ? $_eyzbemx7jcgfo8x7.value(f) : $_eyzbemx7jcgfo8x7.error('Not a function');
    }));
  };
  var forbid = function (key, message) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.asOption(), $_9egm1gx4jcgfo8vl.value(function (v) {
      return $_eyzbemx7jcgfo8x7.error('The field: ' + key + ' is forbidden. ' + message);
    }));
  };
  var strictArrayOf = function (key, prop) {
    return strictOf(key, prop);
  };
  var strictObjOf = function (key, objSchema) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.strict(), $_9egm1gx4jcgfo8vl.obj(objSchema));
  };
  var strictArrayOfObj = function (key, objFields) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.strict(), $_9egm1gx4jcgfo8vl.arrOfObj(objFields));
  };
  var option = function (key) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.asOption(), $_9egm1gx4jcgfo8vl.anyValue());
  };
  var optionOf = function (key, schema) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.asOption(), schema);
  };
  var optionObjOf = function (key, objSchema) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.asOption(), $_9egm1gx4jcgfo8vl.obj(objSchema));
  };
  var optionObjOfOnly = function (key, objSchema) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.asOption(), $_9egm1gx4jcgfo8vl.objOnly(objSchema));
  };
  var defaulted = function (key, fallback) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.defaulted(fallback), $_9egm1gx4jcgfo8vl.anyValue());
  };
  var defaultedOf = function (key, fallback, schema) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.defaulted(fallback), schema);
  };
  var defaultedObjOf = function (key, fallback, objSchema) {
    return $_9egm1gx4jcgfo8vl.field(key, key, $_d0l63jx2jcgfo8v5.defaulted(fallback), $_9egm1gx4jcgfo8vl.obj(objSchema));
  };
  var field = function (key, okey, presence, prop) {
    return $_9egm1gx4jcgfo8vl.field(key, okey, presence, prop);
  };
  var state = function (okey, instantiator) {
    return $_9egm1gx4jcgfo8vl.state(okey, instantiator);
  };
  var $_6inazsx1jcgfo8uu = {
    strict: strict,
    strictOf: strictOf,
    strictObjOf: strictObjOf,
    strictArrayOf: strictArrayOf,
    strictArrayOfObj: strictArrayOfObj,
    strictFunction: strictFunction,
    forbid: forbid,
    option: option,
    optionOf: optionOf,
    optionObjOf: optionObjOf,
    optionObjOfOnly: optionObjOfOnly,
    defaulted: defaulted,
    defaultedOf: defaultedOf,
    defaultedObjOf: defaultedObjOf,
    field: field,
    state: state
  };

  var chooseFrom = function (path, strength, input, branches, ch) {
    var fields = $_8fkfzex5jcgfo8wf.readOptFrom(branches, ch);
    return fields.fold(function () {
      return $_6s9dfaxcjcgfo8xw.missingBranch(path, branches, ch);
    }, function (fs) {
      return $_9egm1gx4jcgfo8vl.obj(fs).extract(path.concat(['branch: ' + ch]), strength, input);
    });
  };
  var choose$1 = function (key, branches) {
    var extract = function (path, strength, input) {
      var choice = $_8fkfzex5jcgfo8wf.readOptFrom(input, key);
      return choice.fold(function () {
        return $_6s9dfaxcjcgfo8xw.missingKey(path, key);
      }, function (chosen) {
        return chooseFrom(path, strength, input, branches, chosen);
      });
    };
    var toString = function () {
      return 'chooseOn(' + key + '). Possible values: ' + $_a7hrnswzjcgfo8tz.keys(branches);
    };
    var toDsl = function () {
      return $_g2hidpxfjcgfo8yh.typeAdt.choiceOf(key, branches);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var $_f4lqguxhjcgfo8yv = { choose: choose$1 };

  var anyValue$1 = $_9egm1gx4jcgfo8vl.value($_eyzbemx7jcgfo8x7.value);
  var arrOfObj$1 = function (objFields) {
    return $_9egm1gx4jcgfo8vl.arrOfObj(objFields);
  };
  var arrOfVal = function () {
    return $_9egm1gx4jcgfo8vl.arr(anyValue$1);
  };
  var arrOf = $_9egm1gx4jcgfo8vl.arr;
  var objOf = $_9egm1gx4jcgfo8vl.obj;
  var objOfOnly = $_9egm1gx4jcgfo8vl.objOnly;
  var setOf$1 = $_9egm1gx4jcgfo8vl.setOf;
  var valueOf = function (validator) {
    return $_9egm1gx4jcgfo8vl.value(validator);
  };
  var extract = function (label, prop, strength, obj) {
    return prop.extract([label], strength, obj).fold(function (errs) {
      return $_eyzbemx7jcgfo8x7.error({
        input: obj,
        errors: errs
      });
    }, $_eyzbemx7jcgfo8x7.value);
  };
  var asStruct = function (label, prop, obj) {
    return extract(label, prop, $_ee1z6xwajcgfo8qa.constant, obj);
  };
  var asRaw = function (label, prop, obj) {
    return extract(label, prop, $_ee1z6xwajcgfo8qa.identity, obj);
  };
  var getOrDie$1 = function (extraction) {
    return extraction.fold(function (errInfo) {
      throw new Error(formatError(errInfo));
    }, $_ee1z6xwajcgfo8qa.identity);
  };
  var asRawOrDie = function (label, prop, obj) {
    return getOrDie$1(asRaw(label, prop, obj));
  };
  var asStructOrDie = function (label, prop, obj) {
    return getOrDie$1(asStruct(label, prop, obj));
  };
  var formatError = function (errInfo) {
    return 'Errors: \n' + $_az43y3xdjcgfo8y1.formatErrors(errInfo.errors) + '\n\nInput object: ' + $_az43y3xdjcgfo8y1.formatObj(errInfo.input);
  };
  var choose = function (key, branches) {
    return $_f4lqguxhjcgfo8yv.choose(key, branches);
  };
  var $_783jrjxgjcgfo8yn = {
    anyValue: $_ee1z6xwajcgfo8qa.constant(anyValue$1),
    arrOfObj: arrOfObj$1,
    arrOf: arrOf,
    arrOfVal: arrOfVal,
    valueOf: valueOf,
    setOf: setOf$1,
    objOf: objOf,
    objOfOnly: objOfOnly,
    asStruct: asStruct,
    asRaw: asRaw,
    asStructOrDie: asStructOrDie,
    asRawOrDie: asRawOrDie,
    getOrDie: getOrDie$1,
    formatError: formatError,
    choose: choose
  };

  var nu$3 = function (parts) {
    if (!$_8fkfzex5jcgfo8wf.hasKey(parts, 'can') && !$_8fkfzex5jcgfo8wf.hasKey(parts, 'abort') && !$_8fkfzex5jcgfo8wf.hasKey(parts, 'run'))
      throw new Error('EventHandler defined by: ' + $_8pq9zfxejcgfo8yf.stringify(parts, null, 2) + ' does not have can, abort, or run!');
    return $_783jrjxgjcgfo8yn.asRawOrDie('Extracting event.handler', $_783jrjxgjcgfo8yn.objOfOnly([
      $_6inazsx1jcgfo8uu.defaulted('can', $_ee1z6xwajcgfo8qa.constant(true)),
      $_6inazsx1jcgfo8uu.defaulted('abort', $_ee1z6xwajcgfo8qa.constant(false)),
      $_6inazsx1jcgfo8uu.defaulted('run', $_ee1z6xwajcgfo8qa.noop)
    ]), parts);
  };
  var all$1 = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_3h0i9zw8jcgfo8px.foldl(handlers, function (acc, handler) {
        return acc && f(handler).apply(undefined, args);
      }, true);
    };
  };
  var any = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_3h0i9zw8jcgfo8px.foldl(handlers, function (acc, handler) {
        return acc || f(handler).apply(undefined, args);
      }, false);
    };
  };
  var read = function (handler) {
    return $_eregpvwyjcgfo8ts.isFunction(handler) ? {
      can: $_ee1z6xwajcgfo8qa.constant(true),
      abort: $_ee1z6xwajcgfo8qa.constant(false),
      run: handler
    } : handler;
  };
  var fuse = function (handlers) {
    var can = all$1(handlers, function (handler) {
      return handler.can;
    });
    var abort = any(handlers, function (handler) {
      return handler.abort;
    });
    var run = function () {
      var args = Array.prototype.slice.call(arguments, 0);
      $_3h0i9zw8jcgfo8px.each(handlers, function (handler) {
        handler.run.apply(undefined, args);
      });
    };
    return nu$3({
      can: can,
      abort: abort,
      run: run
    });
  };
  var $_bfrqsvx0jcgfo8u3 = {
    read: read,
    fuse: fuse,
    nu: nu$3
  };

  var derive$1 = $_8fkfzex5jcgfo8wf.wrapAll;
  var abort = function (name, predicate) {
    return {
      key: name,
      value: $_bfrqsvx0jcgfo8u3.nu({ abort: predicate })
    };
  };
  var can = function (name, predicate) {
    return {
      key: name,
      value: $_bfrqsvx0jcgfo8u3.nu({ can: predicate })
    };
  };
  var preventDefault = function (name) {
    return {
      key: name,
      value: $_bfrqsvx0jcgfo8u3.nu({
        run: function (component, simulatedEvent) {
          simulatedEvent.event().prevent();
        }
      })
    };
  };
  var run = function (name, handler) {
    return {
      key: name,
      value: $_bfrqsvx0jcgfo8u3.nu({ run: handler })
    };
  };
  var runActionExtra = function (name, action, extra) {
    return {
      key: name,
      value: $_bfrqsvx0jcgfo8u3.nu({
        run: function (component) {
          action.apply(undefined, [component].concat(extra));
        }
      })
    };
  };
  var runOnName = function (name) {
    return function (handler) {
      return run(name, handler);
    };
  };
  var runOnSourceName = function (name) {
    return function (handler) {
      return {
        key: name,
        value: $_bfrqsvx0jcgfo8u3.nu({
          run: function (component, simulatedEvent) {
            if ($_40w9y6w6jcgfo8p1.isSource(component, simulatedEvent))
              handler(component, simulatedEvent);
          }
        })
      };
    };
  };
  var redirectToUid = function (name, uid) {
    return run(name, function (component, simulatedEvent) {
      component.getSystem().getByUid(uid).each(function (redirectee) {
        $_4x498fwujcgfo8sy.dispatchEvent(redirectee, redirectee.element(), name, simulatedEvent);
      });
    });
  };
  var redirectToPart = function (name, detail, partName) {
    var uid = detail.partUids()[partName];
    return redirectToUid(name, uid);
  };
  var runWithTarget = function (name, f) {
    return run(name, function (component, simulatedEvent) {
      component.getSystem().getByDom(simulatedEvent.event().target()).each(function (target) {
        f(component, target, simulatedEvent);
      });
    });
  };
  var cutter = function (name) {
    return run(name, function (component, simulatedEvent) {
      simulatedEvent.cut();
    });
  };
  var stopper = function (name) {
    return run(name, function (component, simulatedEvent) {
      simulatedEvent.stop();
    });
  };
  var $_de0ow7w5jcgfo8ot = {
    derive: derive$1,
    run: run,
    preventDefault: preventDefault,
    runActionExtra: runActionExtra,
    runOnAttached: runOnSourceName($_1snegiwvjcgfo8tb.attachedToDom()),
    runOnDetached: runOnSourceName($_1snegiwvjcgfo8tb.detachedFromDom()),
    runOnInit: runOnSourceName($_1snegiwvjcgfo8tb.systemInit()),
    runOnExecute: runOnName($_1snegiwvjcgfo8tb.execute()),
    redirectToUid: redirectToUid,
    redirectToPart: redirectToPart,
    runWithTarget: runWithTarget,
    abort: abort,
    can: can,
    cutter: cutter,
    stopper: stopper
  };

  var markAsBehaviourApi = function (f, apiName, apiFunction) {
    return f;
  };
  var markAsExtraApi = function (f, extraName) {
    return f;
  };
  var markAsSketchApi = function (f, apiFunction) {
    return f;
  };
  var getAnnotation = $_d7fxouw9jcgfo8q5.none;
  var $_2xvwuwxijcgfo8z2 = {
    markAsBehaviourApi: markAsBehaviourApi,
    markAsExtraApi: markAsExtraApi,
    markAsSketchApi: markAsSketchApi,
    getAnnotation: getAnnotation
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
      $_3h0i9zw8jcgfo8px.each(fields, function (name, i) {
        struct[name] = $_ee1z6xwajcgfo8qa.constant(values[i]);
      });
      return struct;
    };
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
    if (!$_eregpvwyjcgfo8ts.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_3h0i9zw8jcgfo8px.each(array, function (a) {
      if (!$_eregpvwyjcgfo8ts.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_3h0i9zw8jcgfo8px.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_g3f90cxojcgfo90b = {
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
    $_g3f90cxojcgfo90b.validateStrArr('required', required);
    $_g3f90cxojcgfo90b.validateStrArr('optional', optional);
    $_g3f90cxojcgfo90b.checkDupes(everything);
    return function (obj) {
      var keys = $_a7hrnswzjcgfo8tz.keys(obj);
      var allReqd = $_3h0i9zw8jcgfo8px.forall(required, function (req) {
        return $_3h0i9zw8jcgfo8px.contains(keys, req);
      });
      if (!allReqd)
        $_g3f90cxojcgfo90b.reqMessage(required, keys);
      var unsupported = $_3h0i9zw8jcgfo8px.filter(keys, function (key) {
        return !$_3h0i9zw8jcgfo8px.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_g3f90cxojcgfo90b.unsuppMessage(unsupported);
      var r = {};
      $_3h0i9zw8jcgfo8px.each(required, function (req) {
        r[req] = $_ee1z6xwajcgfo8qa.constant(obj[req]);
      });
      $_3h0i9zw8jcgfo8px.each(optional, function (opt) {
        r[opt] = $_ee1z6xwajcgfo8qa.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? $_d7fxouw9jcgfo8q5.some(obj[opt]) : $_d7fxouw9jcgfo8q5.none());
      });
      return r;
    };
  };

  var $_catt2ixljcgfo904 = {
    immutable: Immutable,
    immutableBag: MixedBag
  };

  var nu$6 = $_catt2ixljcgfo904.immutableBag(['tag'], [
    'classes',
    'attributes',
    'styles',
    'value',
    'innerHtml',
    'domChildren',
    'defChildren'
  ]);
  var defToStr = function (defn) {
    var raw = defToRaw(defn);
    return $_8pq9zfxejcgfo8yf.stringify(raw, null, 2);
  };
  var defToRaw = function (defn) {
    return {
      tag: defn.tag(),
      classes: defn.classes().getOr([]),
      attributes: defn.attributes().getOr({}),
      styles: defn.styles().getOr({}),
      value: defn.value().getOr('<none>'),
      innerHtml: defn.innerHtml().getOr('<none>'),
      defChildren: defn.defChildren().getOr('<none>'),
      domChildren: defn.domChildren().fold(function () {
        return '<none>';
      }, function (children) {
        return children.length === 0 ? '0 children, but still specified' : String(children.length);
      })
    };
  };
  var $_5eg0fdxkjcgfo8zw = {
    nu: nu$6,
    defToStr: defToStr,
    defToRaw: defToRaw
  };

  var fields = [
    'classes',
    'attributes',
    'styles',
    'value',
    'innerHtml',
    'defChildren',
    'domChildren'
  ];
  var nu$5 = $_catt2ixljcgfo904.immutableBag([], fields);
  var derive$2 = function (settings) {
    var r = {};
    var keys = $_a7hrnswzjcgfo8tz.keys(settings);
    $_3h0i9zw8jcgfo8px.each(keys, function (key) {
      settings[key].each(function (v) {
        r[key] = v;
      });
    });
    return nu$5(r);
  };
  var modToStr = function (mod) {
    var raw = modToRaw(mod);
    return $_8pq9zfxejcgfo8yf.stringify(raw, null, 2);
  };
  var modToRaw = function (mod) {
    return {
      classes: mod.classes().getOr('<none>'),
      attributes: mod.attributes().getOr('<none>'),
      styles: mod.styles().getOr('<none>'),
      value: mod.value().getOr('<none>'),
      innerHtml: mod.innerHtml().getOr('<none>'),
      defChildren: mod.defChildren().getOr('<none>'),
      domChildren: mod.domChildren().fold(function () {
        return '<none>';
      }, function (children) {
        return children.length === 0 ? '0 children, but still specified' : String(children.length);
      })
    };
  };
  var clashingOptArrays = function (key, oArr1, oArr2) {
    return oArr1.fold(function () {
      return oArr2.fold(function () {
        return {};
      }, function (arr2) {
        return $_8fkfzex5jcgfo8wf.wrap(key, arr2);
      });
    }, function (arr1) {
      return oArr2.fold(function () {
        return $_8fkfzex5jcgfo8wf.wrap(key, arr1);
      }, function (arr2) {
        return $_8fkfzex5jcgfo8wf.wrap(key, arr2);
      });
    });
  };
  var merge$1 = function (defnA, mod) {
    var raw = $_au1coewxjcgfo8tp.deepMerge({
      tag: defnA.tag(),
      classes: mod.classes().getOr([]).concat(defnA.classes().getOr([])),
      attributes: $_au1coewxjcgfo8tp.merge(defnA.attributes().getOr({}), mod.attributes().getOr({})),
      styles: $_au1coewxjcgfo8tp.merge(defnA.styles().getOr({}), mod.styles().getOr({}))
    }, mod.innerHtml().or(defnA.innerHtml()).map(function (innerHtml) {
      return $_8fkfzex5jcgfo8wf.wrap('innerHtml', innerHtml);
    }).getOr({}), clashingOptArrays('domChildren', mod.domChildren(), defnA.domChildren()), clashingOptArrays('defChildren', mod.defChildren(), defnA.defChildren()), mod.value().or(defnA.value()).map(function (value) {
      return $_8fkfzex5jcgfo8wf.wrap('value', value);
    }).getOr({}));
    return $_5eg0fdxkjcgfo8zw.nu(raw);
  };
  var $_5jneh4xjjcgfo8z7 = {
    nu: nu$5,
    derive: derive$2,
    merge: merge$1,
    modToStr: modToStr,
    modToRaw: modToRaw
  };

  var executeEvent = function (bConfig, bState, executor) {
    return $_de0ow7w5jcgfo8ot.runOnExecute(function (component) {
      executor(component, bConfig, bState);
    });
  };
  var loadEvent = function (bConfig, bState, f) {
    return $_de0ow7w5jcgfo8ot.runOnInit(function (component, simulatedEvent) {
      f(component, bConfig, bState);
    });
  };
  var create$1 = function (schema, name, active, apis, extra, state) {
    var configSchema = $_783jrjxgjcgfo8yn.objOfOnly(schema);
    var schemaSchema = $_6inazsx1jcgfo8uu.optionObjOf(name, [$_6inazsx1jcgfo8uu.optionObjOfOnly('config', schema)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var createModes$1 = function (modes, name, active, apis, extra, state) {
    var configSchema = modes;
    var schemaSchema = $_6inazsx1jcgfo8uu.optionObjOf(name, [$_6inazsx1jcgfo8uu.optionOf('config', modes)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var wrapApi = function (bName, apiFunction, apiName) {
    var f = function (component) {
      var args = arguments;
      return component.config({ name: $_ee1z6xwajcgfo8qa.constant(bName) }).fold(function () {
        throw new Error('We could not find any behaviour configuration for: ' + bName + '. Using API: ' + apiName);
      }, function (info) {
        var rest = Array.prototype.slice.call(args, 1);
        return apiFunction.apply(undefined, [
          component,
          info.config,
          info.state
        ].concat(rest));
      });
    };
    return $_2xvwuwxijcgfo8z2.markAsBehaviourApi(f, apiName, apiFunction);
  };
  var revokeBehaviour = function (name) {
    return {
      key: name,
      value: undefined
    };
  };
  var doCreate = function (configSchema, schemaSchema, name, active, apis, extra, state) {
    var getConfig = function (info) {
      return $_8fkfzex5jcgfo8wf.hasKey(info, name) ? info[name]() : $_d7fxouw9jcgfo8q5.none();
    };
    var wrappedApis = $_a7hrnswzjcgfo8tz.map(apis, function (apiF, apiName) {
      return wrapApi(name, apiF, apiName);
    });
    var wrappedExtra = $_a7hrnswzjcgfo8tz.map(extra, function (extraF, extraName) {
      return $_2xvwuwxijcgfo8z2.markAsExtraApi(extraF, extraName);
    });
    var me = $_au1coewxjcgfo8tp.deepMerge(wrappedExtra, wrappedApis, {
      revoke: $_ee1z6xwajcgfo8qa.curry(revokeBehaviour, name),
      config: function (spec) {
        var prepared = $_783jrjxgjcgfo8yn.asStructOrDie(name + '-config', configSchema, spec);
        return {
          key: name,
          value: {
            config: prepared,
            me: me,
            configAsRaw: $_1u8x7pwgjcgfo8r0.cached(function () {
              return $_783jrjxgjcgfo8yn.asRawOrDie(name + '-config', configSchema, spec);
            }),
            initialConfig: spec,
            state: state
          }
        };
      },
      schema: function () {
        return schemaSchema;
      },
      exhibit: function (info, base) {
        return getConfig(info).bind(function (behaviourInfo) {
          return $_8fkfzex5jcgfo8wf.readOptFrom(active, 'exhibit').map(function (exhibitor) {
            return exhibitor(base, behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr($_5jneh4xjjcgfo8z7.nu({}));
      },
      name: function () {
        return name;
      },
      handlers: function (info) {
        return getConfig(info).bind(function (behaviourInfo) {
          return $_8fkfzex5jcgfo8wf.readOptFrom(active, 'events').map(function (events) {
            return events(behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr({});
      }
    });
    return me;
  };
  var $_7cgou0w4jcgfo8nu = {
    executeEvent: executeEvent,
    loadEvent: loadEvent,
    create: create$1,
    createModes: createModes$1
  };

  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: $_eregpvwyjcgfo8ts.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_g3f90cxojcgfo90b.validateStrArr('required', required);
    $_g3f90cxojcgfo90b.checkDupes(required);
    return function (obj) {
      var keys = $_a7hrnswzjcgfo8tz.keys(obj);
      var allReqd = $_3h0i9zw8jcgfo8px.forall(required, function (req) {
        return $_3h0i9zw8jcgfo8px.contains(keys, req);
      });
      if (!allReqd)
        $_g3f90cxojcgfo90b.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_3h0i9zw8jcgfo8px.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_g3f90cxojcgfo90b.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_3h0i9zw8jcgfo8px.filter(keys, function (key) {
      return !$_3h0i9zw8jcgfo8px.contains(required, key);
    });
    if (unsupported.length > 0)
      $_g3f90cxojcgfo90b.unsuppMessage(unsupported);
  };
  var allowExtra = $_ee1z6xwajcgfo8qa.noop;
  var $_fwzqphxrjcgfo90n = {
    exactly: $_ee1z6xwajcgfo8qa.curry(base, handleExact),
    ensure: $_ee1z6xwajcgfo8qa.curry(base, allowExtra),
    ensureWith: $_ee1z6xwajcgfo8qa.curry(baseWith, allowExtra)
  };

  var BehaviourState = $_fwzqphxrjcgfo90n.ensure(['readState']);

  var init = function () {
    return BehaviourState({
      readState: function () {
        return 'No State required';
      }
    });
  };
  var $_bjozj5xpjcgfo90f = { init: init };

  var derive = function (capabilities) {
    return $_8fkfzex5jcgfo8wf.wrapAll(capabilities);
  };
  var simpleSchema = $_783jrjxgjcgfo8yn.objOfOnly([
    $_6inazsx1jcgfo8uu.strict('fields'),
    $_6inazsx1jcgfo8uu.strict('name'),
    $_6inazsx1jcgfo8uu.defaulted('active', {}),
    $_6inazsx1jcgfo8uu.defaulted('apis', {}),
    $_6inazsx1jcgfo8uu.defaulted('extra', {}),
    $_6inazsx1jcgfo8uu.defaulted('state', $_bjozj5xpjcgfo90f)
  ]);
  var create = function (data) {
    var value = $_783jrjxgjcgfo8yn.asRawOrDie('Creating behaviour: ' + data.name, simpleSchema, data);
    return $_7cgou0w4jcgfo8nu.create(value.fields, value.name, value.active, value.apis, value.extra, value.state);
  };
  var modeSchema = $_783jrjxgjcgfo8yn.objOfOnly([
    $_6inazsx1jcgfo8uu.strict('branchKey'),
    $_6inazsx1jcgfo8uu.strict('branches'),
    $_6inazsx1jcgfo8uu.strict('name'),
    $_6inazsx1jcgfo8uu.defaulted('active', {}),
    $_6inazsx1jcgfo8uu.defaulted('apis', {}),
    $_6inazsx1jcgfo8uu.defaulted('extra', {}),
    $_6inazsx1jcgfo8uu.defaulted('state', $_bjozj5xpjcgfo90f)
  ]);
  var createModes = function (data) {
    var value = $_783jrjxgjcgfo8yn.asRawOrDie('Creating behaviour: ' + data.name, modeSchema, data);
    return $_7cgou0w4jcgfo8nu.createModes($_783jrjxgjcgfo8yn.choose(value.branchKey, value.branches), value.name, value.active, value.apis, value.extra, value.state);
  };
  var $_395jq4w3jcgfo8n1 = {
    derive: derive,
    revoke: $_ee1z6xwajcgfo8qa.constant(undefined),
    noActive: $_ee1z6xwajcgfo8qa.constant({}),
    noApis: $_ee1z6xwajcgfo8qa.constant({}),
    noExtra: $_ee1z6xwajcgfo8qa.constant({}),
    noState: $_ee1z6xwajcgfo8qa.constant($_bjozj5xpjcgfo90f),
    create: create,
    createModes: createModes
  };

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

  var name = function (element) {
    var r = element.dom().nodeName;
    return r.toLowerCase();
  };
  var type = function (element) {
    return element.dom().nodeType;
  };
  var value$2 = function (element) {
    return element.dom().nodeValue;
  };
  var isType$1 = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
    return type(element) === $_6r0crwwtjcgfo8sv.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_6r0crwwtjcgfo8sv.ELEMENT);
  var isText = isType$1($_6r0crwwtjcgfo8sv.TEXT);
  var isDocument = isType$1($_6r0crwwtjcgfo8sv.DOCUMENT);
  var $_bmv0faxwjcgfo91e = {
    name: name,
    type: type,
    value: value$2,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var rawSet = function (dom, key, value) {
    if ($_eregpvwyjcgfo8ts.isString(value) || $_eregpvwyjcgfo8ts.isBoolean(value) || $_eregpvwyjcgfo8ts.isNumber(value)) {
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
    $_a7hrnswzjcgfo8tz.each(attrs, function (v, k) {
      rawSet(dom, k, v);
    });
  };
  var get = function (element, key) {
    var v = element.dom().getAttribute(key);
    return v === null ? undefined : v;
  };
  var has$1 = function (element, key) {
    var dom = element.dom();
    return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
  };
  var remove$1 = function (element, key) {
    element.dom().removeAttribute(key);
  };
  var hasNone = function (element) {
    var attrs = element.dom().attributes;
    return attrs === undefined || attrs === null || attrs.length === 0;
  };
  var clone = function (element) {
    return $_3h0i9zw8jcgfo8px.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has$1(source, attr) && !has$1(destination, attr))
      set(destination, attr, get(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_bmv0faxwjcgfo91e.isElement(source) || !$_bmv0faxwjcgfo91e.isElement(destination))
      return;
    $_3h0i9zw8jcgfo8px.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_8ut06dxvjcgfo912 = {
    clone: clone,
    set: set,
    setAll: setAll,
    get: get,
    has: has$1,
    remove: remove$1,
    hasNone: hasNone,
    transfer: transfer
  };

  var read$1 = function (element, attr) {
    var value = $_8ut06dxvjcgfo912.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add$2 = function (element, attr, id) {
    var old = read$1(element, attr);
    var nu = old.concat([id]);
    $_8ut06dxvjcgfo912.set(element, attr, nu.join(' '));
  };
  var remove$3 = function (element, attr, id) {
    var nu = $_3h0i9zw8jcgfo8px.filter(read$1(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_8ut06dxvjcgfo912.set(element, attr, nu.join(' '));
    else
      $_8ut06dxvjcgfo912.remove(element, attr);
  };
  var $_1p77x8xyjcgfo91l = {
    read: read$1,
    add: add$2,
    remove: remove$3
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$1 = function (element) {
    return $_1p77x8xyjcgfo91l.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_1p77x8xyjcgfo91l.add(element, 'class', clazz);
  };
  var remove$2 = function (element, clazz) {
    return $_1p77x8xyjcgfo91l.remove(element, 'class', clazz);
  };
  var toggle$1 = function (element, clazz) {
    if ($_3h0i9zw8jcgfo8px.contains(get$1(element), clazz)) {
      remove$2(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_d7qymxxxjcgfo91g = {
    get: get$1,
    add: add$1,
    remove: remove$2,
    toggle: toggle$1,
    supports: supports
  };

  var add = function (element, clazz) {
    if ($_d7qymxxxjcgfo91g.supports(element))
      element.dom().classList.add(clazz);
    else
      $_d7qymxxxjcgfo91g.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_d7qymxxxjcgfo91g.supports(element) ? element.dom().classList : $_d7qymxxxjcgfo91g.get(element);
    if (classList.length === 0) {
      $_8ut06dxvjcgfo912.remove(element, 'class');
    }
  };
  var remove = function (element, clazz) {
    if ($_d7qymxxxjcgfo91g.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_d7qymxxxjcgfo91g.remove(element, clazz);
    cleanClass(element);
  };
  var toggle = function (element, clazz) {
    return $_d7qymxxxjcgfo91g.supports(element) ? element.dom().classList.toggle(clazz) : $_d7qymxxxjcgfo91g.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_d7qymxxxjcgfo91g.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_d7qymxxxjcgfo91g.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_d7qymxxxjcgfo91g.add(element, clazz);
    };
    return Toggler(off, on, has(element, clazz));
  };
  var has = function (element, clazz) {
    return $_d7qymxxxjcgfo91g.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_4ub0gextjcgfo90x = {
    add: add,
    remove: remove,
    toggle: toggle,
    toggler: toggler,
    has: has
  };

  var swap = function (element, addCls, removeCls) {
    $_4ub0gextjcgfo90x.remove(element, removeCls);
    $_4ub0gextjcgfo90x.add(element, addCls);
  };
  var toAlpha = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.alpha(), swapConfig.omega());
  };
  var toOmega = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.omega(), swapConfig.alpha());
  };
  var clear = function (component, swapConfig, swapState) {
    $_4ub0gextjcgfo90x.remove(component.element(), swapConfig.alpha());
    $_4ub0gextjcgfo90x.remove(component.element(), swapConfig.omega());
  };
  var isAlpha = function (component, swapConfig, swapState) {
    return $_4ub0gextjcgfo90x.has(component.element(), swapConfig.alpha());
  };
  var isOmega = function (component, swapConfig, swapState) {
    return $_4ub0gextjcgfo90x.has(component.element(), swapConfig.omega());
  };
  var $_797c8fxsjcgfo90q = {
    toAlpha: toAlpha,
    toOmega: toOmega,
    isAlpha: isAlpha,
    isOmega: isOmega,
    clear: clear
  };

  var SwapSchema = [
    $_6inazsx1jcgfo8uu.strict('alpha'),
    $_6inazsx1jcgfo8uu.strict('omega')
  ];

  var Swapping = $_395jq4w3jcgfo8n1.create({
    fields: SwapSchema,
    name: 'swapping',
    apis: $_797c8fxsjcgfo90q
  });

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
  var $_6k5cg1y3jcgfo93f = { toArray: toArray };

  var owner = function (element) {
    return $_6rcvbhwsjcgfo8sm.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_6rcvbhwsjcgfo8sm.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_6rcvbhwsjcgfo8sm.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return $_d7fxouw9jcgfo8q5.from(dom.parentNode).map($_6rcvbhwsjcgfo8sm.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_3h0i9zw8jcgfo8px.findIndex(kin, function (elem) {
        return $_8prpzjw7jcgfo8p9.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_eregpvwyjcgfo8ts.isFunction(isRoot) ? isRoot : $_ee1z6xwajcgfo8qa.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_6rcvbhwsjcgfo8sm.fromDom(rawParent);
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
      return $_3h0i9zw8jcgfo8px.filter(elements, function (x) {
        return !$_8prpzjw7jcgfo8p9.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return $_d7fxouw9jcgfo8q5.from(dom.offsetParent).map($_6rcvbhwsjcgfo8sm.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return $_d7fxouw9jcgfo8q5.from(dom.previousSibling).map($_6rcvbhwsjcgfo8sm.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return $_d7fxouw9jcgfo8q5.from(dom.nextSibling).map($_6rcvbhwsjcgfo8sm.fromDom);
  };
  var prevSiblings = function (element) {
    return $_3h0i9zw8jcgfo8px.reverse($_6k5cg1y3jcgfo93f.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_6k5cg1y3jcgfo93f.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_3h0i9zw8jcgfo8px.map(dom.childNodes, $_6rcvbhwsjcgfo8sm.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return $_d7fxouw9jcgfo8q5.from(children[index]).map($_6rcvbhwsjcgfo8sm.fromDom);
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
  var spot = $_catt2ixljcgfo904.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_dd88k4y2jcgfo92t = {
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

  var before = function (marker, element) {
    var parent = $_dd88k4y2jcgfo92t.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_dd88k4y2jcgfo92t.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_dd88k4y2jcgfo92t.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_dd88k4y2jcgfo92t.firstChild(parent);
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
    $_dd88k4y2jcgfo92t.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap$2 = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_5ypytwy1jcgfo92q = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap$2
  };

  var before$1 = function (marker, elements) {
    $_3h0i9zw8jcgfo8px.each(elements, function (x) {
      $_5ypytwy1jcgfo92q.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_3h0i9zw8jcgfo8px.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_5ypytwy1jcgfo92q.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_3h0i9zw8jcgfo8px.each(elements.slice().reverse(), function (x) {
      $_5ypytwy1jcgfo92q.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_3h0i9zw8jcgfo8px.each(elements, function (x) {
      $_5ypytwy1jcgfo92q.append(parent, x);
    });
  };
  var $_979fusy5jcgfo93m = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_3h0i9zw8jcgfo8px.each($_dd88k4y2jcgfo92t.children(element), function (rogue) {
      remove$4(rogue);
    });
  };
  var remove$4 = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_dd88k4y2jcgfo92t.children(wrapper);
    if (children.length > 0)
      $_979fusy5jcgfo93m.before(wrapper, children);
    remove$4(wrapper);
  };
  var $_anj8kky4jcgfo93h = {
    empty: empty,
    remove: remove$4,
    unwrap: unwrap
  };

  var inBody = function (element) {
    var dom = $_bmv0faxwjcgfo91e.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_1u8x7pwgjcgfo8r0.cached(function () {
    return getBody($_6rcvbhwsjcgfo8sm.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_6rcvbhwsjcgfo8sm.fromDom(body);
  };
  var $_g9a7hjy6jcgfo93s = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var fireDetaching = function (component) {
    $_4x498fwujcgfo8sy.emit(component, $_1snegiwvjcgfo8tb.detachedFromDom());
    var children = component.components();
    $_3h0i9zw8jcgfo8px.each(children, fireDetaching);
  };
  var fireAttaching = function (component) {
    var children = component.components();
    $_3h0i9zw8jcgfo8px.each(children, fireAttaching);
    $_4x498fwujcgfo8sy.emit(component, $_1snegiwvjcgfo8tb.attachedToDom());
  };
  var attach = function (parent, child) {
    attachWith(parent, child, $_5ypytwy1jcgfo92q.append);
  };
  var attachWith = function (parent, child, insertion) {
    parent.getSystem().addToWorld(child);
    insertion(parent.element(), child.element());
    if ($_g9a7hjy6jcgfo93s.inBody(parent.element()))
      fireAttaching(child);
    parent.syncComponents();
  };
  var doDetach = function (component) {
    fireDetaching(component);
    $_anj8kky4jcgfo93h.remove(component.element());
    component.getSystem().removeFromWorld(component);
  };
  var detach = function (component) {
    var parent = $_dd88k4y2jcgfo92t.parent(component.element()).bind(function (p) {
      return component.getSystem().getByDom(p).fold($_d7fxouw9jcgfo8q5.none, $_d7fxouw9jcgfo8q5.some);
    });
    doDetach(component);
    parent.each(function (p) {
      p.syncComponents();
    });
  };
  var detachChildren = function (component) {
    var subs = component.components();
    $_3h0i9zw8jcgfo8px.each(subs, doDetach);
    $_anj8kky4jcgfo93h.empty(component.element());
    component.syncComponents();
  };
  var attachSystem = function (element, guiSystem) {
    $_5ypytwy1jcgfo92q.append(element, guiSystem.element());
    var children = $_dd88k4y2jcgfo92t.children(guiSystem.element());
    $_3h0i9zw8jcgfo8px.each(children, function (child) {
      guiSystem.getByDom(child).each(fireAttaching);
    });
  };
  var detachSystem = function (guiSystem) {
    var children = $_dd88k4y2jcgfo92t.children(guiSystem.element());
    $_3h0i9zw8jcgfo8px.each(children, function (child) {
      guiSystem.getByDom(child).each(fireDetaching);
    });
    $_anj8kky4jcgfo93h.remove(guiSystem.element());
  };
  var $_bi57h5y0jcgfo91w = {
    attach: attach,
    attachWith: attachWith,
    detach: detach,
    detachChildren: detachChildren,
    attachSystem: attachSystem,
    detachSystem: detachSystem
  };

  var fromHtml$1 = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    return $_dd88k4y2jcgfo92t.children($_6rcvbhwsjcgfo8sm.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_3h0i9zw8jcgfo8px.map(tags, function (x) {
      return $_6rcvbhwsjcgfo8sm.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_3h0i9zw8jcgfo8px.map(texts, function (x) {
      return $_6rcvbhwsjcgfo8sm.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_3h0i9zw8jcgfo8px.map(nodes, $_6rcvbhwsjcgfo8sm.fromDom);
  };
  var $_egzwymybjcgfo94w = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
  };

  var get$2 = function (element) {
    return element.dom().innerHTML;
  };
  var set$1 = function (element, content) {
    var owner = $_dd88k4y2jcgfo92t.owner(element);
    var docDom = owner.dom();
    var fragment = $_6rcvbhwsjcgfo8sm.fromDom(docDom.createDocumentFragment());
    var contentElements = $_egzwymybjcgfo94w.fromHtml(content, docDom);
    $_979fusy5jcgfo93m.append(fragment, contentElements);
    $_anj8kky4jcgfo93h.empty(element);
    $_5ypytwy1jcgfo92q.append(element, fragment);
  };
  var getOuter = function (element) {
    var container = $_6rcvbhwsjcgfo8sm.fromTag('div');
    var clone = $_6rcvbhwsjcgfo8sm.fromDom(element.dom().cloneNode(true));
    $_5ypytwy1jcgfo92q.append(container, clone);
    return get$2(container);
  };
  var $_8dqis5yajcgfo94u = {
    get: get$2,
    set: set$1,
    getOuter: getOuter
  };

  var clone$1 = function (original, deep) {
    return $_6rcvbhwsjcgfo8sm.fromDom(original.dom().cloneNode(deep));
  };
  var shallow$1 = function (original) {
    return clone$1(original, false);
  };
  var deep$1 = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_6rcvbhwsjcgfo8sm.fromTag(tag);
    var attributes = $_8ut06dxvjcgfo912.clone(original);
    $_8ut06dxvjcgfo912.setAll(nu, attributes);
    return nu;
  };
  var copy = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_dd88k4y2jcgfo92t.children(deep$1(original));
    $_979fusy5jcgfo93m.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_5ypytwy1jcgfo92q.before(original, nu);
    var children = $_dd88k4y2jcgfo92t.children(original);
    $_979fusy5jcgfo93m.append(nu, children);
    $_anj8kky4jcgfo93h.remove(original);
    return nu;
  };
  var $_27tgfxycjcgfo956 = {
    shallow: shallow$1,
    shallowAs: shallowAs,
    deep: deep$1,
    copy: copy,
    mutate: mutate
  };

  var getHtml = function (element) {
    var clone = $_27tgfxycjcgfo956.shallow(element);
    return $_8dqis5yajcgfo94u.getOuter(clone);
  };
  var $_5edf8gy9jcgfo94k = { getHtml: getHtml };

  var element = function (elem) {
    return $_5edf8gy9jcgfo94k.getHtml(elem);
  };
  var $_5b4pz8y8jcgfo94i = { element: element };

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
    return $_d7fxouw9jcgfo8q5.none();
  };
  var liftN = function (arr, f) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (x.isSome()) {
        r.push(x.getOrDie());
      } else {
        return $_d7fxouw9jcgfo8q5.none();
      }
    }
    return $_d7fxouw9jcgfo8q5.some(f.apply(null, r));
  };
  var $_czjvbsydjcgfo959 = {
    cat: cat,
    findMap: findMap,
    liftN: liftN
  };

  var unknown$3 = 'unknown';
  var debugging = true;
  var CHROME_INSPECTOR_GLOBAL = '__CHROME_INSPECTOR_CONNECTION_TO_ALLOY__';
  var eventsMonitored = [];
  var path$1 = [
    'alloy/data/Fields',
    'alloy/debugging/Debugging'
  ];
  var getTrace = function () {
    if (debugging === false)
      return unknown$3;
    var err = new Error();
    if (err.stack !== undefined) {
      var lines = err.stack.split('\n');
      return $_3h0i9zw8jcgfo8px.find(lines, function (line) {
        return line.indexOf('alloy') > 0 && !$_3h0i9zw8jcgfo8px.exists(path$1, function (p) {
          return line.indexOf(p) > -1;
        });
      }).getOr(unknown$3);
    } else {
      return unknown$3;
    }
  };
  var logHandler = function (label, handlerName, trace) {
  };
  var ignoreEvent = {
    logEventCut: $_ee1z6xwajcgfo8qa.noop,
    logEventStopped: $_ee1z6xwajcgfo8qa.noop,
    logNoParent: $_ee1z6xwajcgfo8qa.noop,
    logEventNoHandlers: $_ee1z6xwajcgfo8qa.noop,
    logEventResponse: $_ee1z6xwajcgfo8qa.noop,
    write: $_ee1z6xwajcgfo8qa.noop
  };
  var monitorEvent = function (eventName, initialTarget, f) {
    var logger = debugging && (eventsMonitored === '*' || $_3h0i9zw8jcgfo8px.contains(eventsMonitored, eventName)) ? function () {
      var sequence = [];
      return {
        logEventCut: function (name, target, purpose) {
          sequence.push({
            outcome: 'cut',
            target: target,
            purpose: purpose
          });
        },
        logEventStopped: function (name, target, purpose) {
          sequence.push({
            outcome: 'stopped',
            target: target,
            purpose: purpose
          });
        },
        logNoParent: function (name, target, purpose) {
          sequence.push({
            outcome: 'no-parent',
            target: target,
            purpose: purpose
          });
        },
        logEventNoHandlers: function (name, target) {
          sequence.push({
            outcome: 'no-handlers-left',
            target: target
          });
        },
        logEventResponse: function (name, target, purpose) {
          sequence.push({
            outcome: 'response',
            purpose: purpose,
            target: target
          });
        },
        write: function () {
          if ($_3h0i9zw8jcgfo8px.contains([
              'mousemove',
              'mouseover',
              'mouseout',
              $_1snegiwvjcgfo8tb.systemInit()
            ], eventName))
            return;
          console.log(eventName, {
            event: eventName,
            target: initialTarget.dom(),
            sequence: $_3h0i9zw8jcgfo8px.map(sequence, function (s) {
              if (!$_3h0i9zw8jcgfo8px.contains([
                  'cut',
                  'stopped',
                  'response'
                ], s.outcome))
                return s.outcome;
              else
                return '{' + s.purpose + '} ' + s.outcome + ' at (' + $_5b4pz8y8jcgfo94i.element(s.target) + ')';
            })
          });
        }
      };
    }() : ignoreEvent;
    var output = f(logger);
    logger.write();
    return output;
  };
  var inspectorInfo = function (comp) {
    var go = function (c) {
      var cSpec = c.spec();
      return {
        '(original.spec)': cSpec,
        '(dom.ref)': c.element().dom(),
        '(element)': $_5b4pz8y8jcgfo94i.element(c.element()),
        '(initComponents)': $_3h0i9zw8jcgfo8px.map(cSpec.components !== undefined ? cSpec.components : [], go),
        '(components)': $_3h0i9zw8jcgfo8px.map(c.components(), go),
        '(bound.events)': $_a7hrnswzjcgfo8tz.mapToArray(c.events(), function (v, k) {
          return [k];
        }).join(', '),
        '(behaviours)': cSpec.behaviours !== undefined ? $_a7hrnswzjcgfo8tz.map(cSpec.behaviours, function (v, k) {
          return v === undefined ? '--revoked--' : {
            config: v.configAsRaw(),
            'original-config': v.initialConfig,
            state: c.readState(k)
          };
        }) : 'none'
      };
    };
    return go(comp);
  };
  var getOrInitConnection = function () {
    if (window[CHROME_INSPECTOR_GLOBAL] !== undefined)
      return window[CHROME_INSPECTOR_GLOBAL];
    else {
      window[CHROME_INSPECTOR_GLOBAL] = {
        systems: {},
        lookup: function (uid) {
          var systems = window[CHROME_INSPECTOR_GLOBAL].systems;
          var connections = $_a7hrnswzjcgfo8tz.keys(systems);
          return $_czjvbsydjcgfo959.findMap(connections, function (conn) {
            var connGui = systems[conn];
            return connGui.getByUid(uid).toOption().map(function (comp) {
              return $_8fkfzex5jcgfo8wf.wrap($_5b4pz8y8jcgfo94i.element(comp.element()), inspectorInfo(comp));
            });
          });
        }
      };
      return window[CHROME_INSPECTOR_GLOBAL];
    }
  };
  var registerInspector = function (name, gui) {
    var connection = getOrInitConnection();
    connection.systems[name] = gui;
  };
  var $_8jyrjqy7jcgfo93y = {
    logHandler: logHandler,
    noLogger: $_ee1z6xwajcgfo8qa.constant(ignoreEvent),
    getTrace: getTrace,
    monitorEvent: monitorEvent,
    isDebugging: $_ee1z6xwajcgfo8qa.constant(debugging),
    registerInspector: registerInspector
  };

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

  var ClosestOrAncestor = function (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? $_d7fxouw9jcgfo8q5.some(scope) : $_eregpvwyjcgfo8ts.isFunction(isRoot) && isRoot(scope) ? $_d7fxouw9jcgfo8q5.none() : ancestor(scope, a, isRoot);
  };

  var first$1 = function (predicate) {
    return descendant$1($_g9a7hjy6jcgfo93s.body(), predicate);
  };
  var ancestor$1 = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_eregpvwyjcgfo8ts.isFunction(isRoot) ? isRoot : $_ee1z6xwajcgfo8qa.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_6rcvbhwsjcgfo8sm.fromDom(element);
      if (predicate(el))
        return $_d7fxouw9jcgfo8q5.some(el);
      else if (stop(el))
        break;
    }
    return $_d7fxouw9jcgfo8q5.none();
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
      return $_d7fxouw9jcgfo8q5.none();
    return child$2($_6rcvbhwsjcgfo8sm.fromDom(element.parentNode), function (x) {
      return !$_8prpzjw7jcgfo8p9.eq(scope, x) && predicate(x);
    });
  };
  var child$2 = function (scope, predicate) {
    var result = $_3h0i9zw8jcgfo8px.find(scope.dom().childNodes, $_ee1z6xwajcgfo8qa.compose(predicate, $_6rcvbhwsjcgfo8sm.fromDom));
    return result.map($_6rcvbhwsjcgfo8sm.fromDom);
  };
  var descendant$1 = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_6rcvbhwsjcgfo8sm.fromDom(element.childNodes[i])))
          return $_d7fxouw9jcgfo8q5.some($_6rcvbhwsjcgfo8sm.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return $_d7fxouw9jcgfo8q5.none();
    };
    return descend(scope.dom());
  };
  var $_d45jk3yhjcgfo95p = {
    first: first$1,
    ancestor: ancestor$1,
    closest: closest$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1
  };

  var any$1 = function (predicate) {
    return $_d45jk3yhjcgfo95p.first(predicate).isSome();
  };
  var ancestor = function (scope, predicate, isRoot) {
    return $_d45jk3yhjcgfo95p.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest = function (scope, predicate, isRoot) {
    return $_d45jk3yhjcgfo95p.closest(scope, predicate, isRoot).isSome();
  };
  var sibling = function (scope, predicate) {
    return $_d45jk3yhjcgfo95p.sibling(scope, predicate).isSome();
  };
  var child$1 = function (scope, predicate) {
    return $_d45jk3yhjcgfo95p.child(scope, predicate).isSome();
  };
  var descendant = function (scope, predicate) {
    return $_d45jk3yhjcgfo95p.descendant(scope, predicate).isSome();
  };
  var $_3aw8gyygjcgfo95n = {
    any: any$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var focus = function (element) {
    element.dom().focus();
  };
  var blur = function (element) {
    element.dom().blur();
  };
  var hasFocus = function (element) {
    var doc = $_dd88k4y2jcgfo92t.owner(element).dom();
    return element.dom() === doc.activeElement;
  };
  var active = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    return $_d7fxouw9jcgfo8q5.from(doc.activeElement).map($_6rcvbhwsjcgfo8sm.fromDom);
  };
  var focusInside = function (element) {
    var doc = $_dd88k4y2jcgfo92t.owner(element);
    var inside = active(doc).filter(function (a) {
      return $_3aw8gyygjcgfo95n.closest(a, $_ee1z6xwajcgfo8qa.curry($_8prpzjw7jcgfo8p9.eq, element));
    });
    inside.fold(function () {
      focus(element);
    }, $_ee1z6xwajcgfo8qa.noop);
  };
  var search = function (element) {
    return active($_dd88k4y2jcgfo92t.owner(element)).filter(function (e) {
      return element.dom().contains(e.dom());
    });
  };
  var $_evqgdsyfjcgfo95e = {
    hasFocus: hasFocus,
    focus: focus,
    blur: blur,
    active: active,
    search: search,
    focusInside: focusInside
  };

  var ThemeManager = tinymce.util.Tools.resolve('tinymce.ThemeManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var openLink = function (target) {
    var link = document.createElement('a');
    link.target = '_blank';
    link.href = target.href;
    link.rel = 'noreferrer noopener';
    var nuEvt = document.createEvent('MouseEvents');
    nuEvt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    document.body.appendChild(link);
    link.dispatchEvent(nuEvt);
    document.body.removeChild(link);
  };
  var $_bryrcvyljcgfo96f = { openLink: openLink };

  var isSkinDisabled = function (editor) {
    return editor.settings.skin === false;
  };
  var $_ewohrgymjcgfo96g = { isSkinDisabled: isSkinDisabled };

  var formatChanged = 'formatChanged';
  var orientationChanged = 'orientationChanged';
  var dropupDismissed = 'dropupDismissed';
  var $_1wsj8mynjcgfo96i = {
    formatChanged: $_ee1z6xwajcgfo8qa.constant(formatChanged),
    orientationChanged: $_ee1z6xwajcgfo8qa.constant(orientationChanged),
    dropupDismissed: $_ee1z6xwajcgfo8qa.constant(dropupDismissed)
  };

  var chooseChannels = function (channels, message) {
    return message.universal() ? channels : $_3h0i9zw8jcgfo8px.filter(channels, function (ch) {
      return $_3h0i9zw8jcgfo8px.contains(message.channels(), ch);
    });
  };
  var events = function (receiveConfig) {
    return $_de0ow7w5jcgfo8ot.derive([$_de0ow7w5jcgfo8ot.run($_1snegiwvjcgfo8tb.receive(), function (component, message) {
        var channelMap = receiveConfig.channels();
        var channels = $_a7hrnswzjcgfo8tz.keys(channelMap);
        var targetChannels = chooseChannels(channels, message);
        $_3h0i9zw8jcgfo8px.each(targetChannels, function (ch) {
          var channelInfo = channelMap[ch]();
          var channelSchema = channelInfo.schema();
          var data = $_783jrjxgjcgfo8yn.asStructOrDie('channel[' + ch + '] data\nReceiver: ' + $_5b4pz8y8jcgfo94i.element(component.element()), channelSchema, message.data());
          channelInfo.onReceive()(component, data);
        });
      })]);
  };
  var $_a8kzhayqjcgfo97b = { events: events };

  var menuFields = [
    $_6inazsx1jcgfo8uu.strict('menu'),
    $_6inazsx1jcgfo8uu.strict('selectedMenu')
  ];
  var itemFields = [
    $_6inazsx1jcgfo8uu.strict('item'),
    $_6inazsx1jcgfo8uu.strict('selectedItem')
  ];
  var schema = $_783jrjxgjcgfo8yn.objOfOnly(itemFields.concat(menuFields));
  var itemSchema = $_783jrjxgjcgfo8yn.objOfOnly(itemFields);
  var $_8ue4tuytjcgfo98r = {
    menuFields: $_ee1z6xwajcgfo8qa.constant(menuFields),
    itemFields: $_ee1z6xwajcgfo8qa.constant(itemFields),
    schema: $_ee1z6xwajcgfo8qa.constant(schema),
    itemSchema: $_ee1z6xwajcgfo8qa.constant(itemSchema)
  };

  var initSize = $_6inazsx1jcgfo8uu.strictObjOf('initSize', [
    $_6inazsx1jcgfo8uu.strict('numColumns'),
    $_6inazsx1jcgfo8uu.strict('numRows')
  ]);
  var itemMarkers = function () {
    return $_6inazsx1jcgfo8uu.strictOf('markers', $_8ue4tuytjcgfo98r.itemSchema());
  };
  var menuMarkers = function () {
    return $_6inazsx1jcgfo8uu.strictOf('markers', $_8ue4tuytjcgfo98r.schema());
  };
  var tieredMenuMarkers = function () {
    return $_6inazsx1jcgfo8uu.strictObjOf('markers', [$_6inazsx1jcgfo8uu.strict('backgroundMenu')].concat($_8ue4tuytjcgfo98r.menuFields()).concat($_8ue4tuytjcgfo98r.itemFields()));
  };
  var markers = function (required) {
    return $_6inazsx1jcgfo8uu.strictObjOf('markers', $_3h0i9zw8jcgfo8px.map(required, $_6inazsx1jcgfo8uu.strict));
  };
  var onPresenceHandler = function (label, fieldName, presence) {
    var trace = $_8jyrjqy7jcgfo93y.getTrace();
    return $_6inazsx1jcgfo8uu.field(fieldName, fieldName, presence, $_783jrjxgjcgfo8yn.valueOf(function (f) {
      return $_eyzbemx7jcgfo8x7.value(function () {
        $_8jyrjqy7jcgfo93y.logHandler(label, fieldName, trace);
        return f.apply(undefined, arguments);
      });
    }));
  };
  var onHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_d0l63jx2jcgfo8v5.defaulted($_ee1z6xwajcgfo8qa.noop));
  };
  var onKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_d0l63jx2jcgfo8v5.defaulted($_d7fxouw9jcgfo8q5.none));
  };
  var onStrictHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_d0l63jx2jcgfo8v5.strict());
  };
  var onStrictKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_d0l63jx2jcgfo8v5.strict());
  };
  var output$1 = function (name, value) {
    return $_6inazsx1jcgfo8uu.state(name, $_ee1z6xwajcgfo8qa.constant(value));
  };
  var snapshot$1 = function (name) {
    return $_6inazsx1jcgfo8uu.state(name, $_ee1z6xwajcgfo8qa.identity);
  };
  var $_dkk53lysjcgfo983 = {
    initSize: $_ee1z6xwajcgfo8qa.constant(initSize),
    itemMarkers: itemMarkers,
    menuMarkers: menuMarkers,
    tieredMenuMarkers: tieredMenuMarkers,
    markers: markers,
    onHandler: onHandler,
    onKeyboardHandler: onKeyboardHandler,
    onStrictHandler: onStrictHandler,
    onStrictKeyboardHandler: onStrictKeyboardHandler,
    output: output$1,
    snapshot: snapshot$1
  };

  var ReceivingSchema = [$_6inazsx1jcgfo8uu.strictOf('channels', $_783jrjxgjcgfo8yn.setOf($_eyzbemx7jcgfo8x7.value, $_783jrjxgjcgfo8yn.objOfOnly([
      $_dkk53lysjcgfo983.onStrictHandler('onReceive'),
      $_6inazsx1jcgfo8uu.defaulted('schema', $_783jrjxgjcgfo8yn.anyValue())
    ])))];

  var Receiving = $_395jq4w3jcgfo8n1.create({
    fields: ReceivingSchema,
    name: 'receiving',
    active: $_a8kzhayqjcgfo97b
  });

  var updateAriaState = function (component, toggleConfig) {
    var pressed = isOn(component, toggleConfig);
    var ariaInfo = toggleConfig.aria();
    ariaInfo.update()(component, ariaInfo, pressed);
  };
  var toggle$2 = function (component, toggleConfig, toggleState) {
    $_4ub0gextjcgfo90x.toggle(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var on = function (component, toggleConfig, toggleState) {
    $_4ub0gextjcgfo90x.add(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var off = function (component, toggleConfig, toggleState) {
    $_4ub0gextjcgfo90x.remove(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var isOn = function (component, toggleConfig) {
    return $_4ub0gextjcgfo90x.has(component.element(), toggleConfig.toggleClass());
  };
  var onLoad = function (component, toggleConfig, toggleState) {
    var api = toggleConfig.selected() ? on : off;
    api(component, toggleConfig, toggleState);
  };
  var $_9qkprlywjcgfo99b = {
    onLoad: onLoad,
    toggle: toggle$2,
    isOn: isOn,
    on: on,
    off: off
  };

  var exhibit = function (base, toggleConfig, toggleState) {
    return $_5jneh4xjjcgfo8z7.nu({});
  };
  var events$1 = function (toggleConfig, toggleState) {
    var execute = $_7cgou0w4jcgfo8nu.executeEvent(toggleConfig, toggleState, $_9qkprlywjcgfo99b.toggle);
    var load = $_7cgou0w4jcgfo8nu.loadEvent(toggleConfig, toggleState, $_9qkprlywjcgfo99b.onLoad);
    return $_de0ow7w5jcgfo8ot.derive($_3h0i9zw8jcgfo8px.flatten([
      toggleConfig.toggleOnExecute() ? [execute] : [],
      [load]
    ]));
  };
  var $_g10xmtyvjcgfo996 = {
    exhibit: exhibit,
    events: events$1
  };

  var updatePressed = function (component, ariaInfo, status) {
    $_8ut06dxvjcgfo912.set(component.element(), 'aria-pressed', status);
    if (ariaInfo.syncWithExpanded())
      updateExpanded(component, ariaInfo, status);
  };
  var updateSelected = function (component, ariaInfo, status) {
    $_8ut06dxvjcgfo912.set(component.element(), 'aria-selected', status);
  };
  var updateChecked = function (component, ariaInfo, status) {
    $_8ut06dxvjcgfo912.set(component.element(), 'aria-checked', status);
  };
  var updateExpanded = function (component, ariaInfo, status) {
    $_8ut06dxvjcgfo912.set(component.element(), 'aria-expanded', status);
  };
  var tagAttributes = {
    button: ['aria-pressed'],
    'input:checkbox': ['aria-checked']
  };
  var roleAttributes = {
    'button': ['aria-pressed'],
    'listbox': [
      'aria-pressed',
      'aria-expanded'
    ],
    'menuitemcheckbox': ['aria-checked']
  };
  var detectFromTag = function (component) {
    var elem = component.element();
    var rawTag = $_bmv0faxwjcgfo91e.name(elem);
    var suffix = rawTag === 'input' && $_8ut06dxvjcgfo912.has(elem, 'type') ? ':' + $_8ut06dxvjcgfo912.get(elem, 'type') : '';
    return $_8fkfzex5jcgfo8wf.readOptFrom(tagAttributes, rawTag + suffix);
  };
  var detectFromRole = function (component) {
    var elem = component.element();
    if (!$_8ut06dxvjcgfo912.has(elem, 'role'))
      return $_d7fxouw9jcgfo8q5.none();
    else {
      var role = $_8ut06dxvjcgfo912.get(elem, 'role');
      return $_8fkfzex5jcgfo8wf.readOptFrom(roleAttributes, role);
    }
  };
  var updateAuto = function (component, ariaInfo, status) {
    var attributes = detectFromRole(component).orThunk(function () {
      return detectFromTag(component);
    }).getOr([]);
    $_3h0i9zw8jcgfo8px.each(attributes, function (attr) {
      $_8ut06dxvjcgfo912.set(component.element(), attr, status);
    });
  };
  var $_11co16yyjcgfo99t = {
    updatePressed: updatePressed,
    updateSelected: updateSelected,
    updateChecked: updateChecked,
    updateExpanded: updateExpanded,
    updateAuto: updateAuto
  };

  var ToggleSchema = [
    $_6inazsx1jcgfo8uu.defaulted('selected', false),
    $_6inazsx1jcgfo8uu.strict('toggleClass'),
    $_6inazsx1jcgfo8uu.defaulted('toggleOnExecute', true),
    $_6inazsx1jcgfo8uu.defaultedOf('aria', { mode: 'none' }, $_783jrjxgjcgfo8yn.choose('mode', {
      'pressed': [
        $_6inazsx1jcgfo8uu.defaulted('syncWithExpanded', false),
        $_dkk53lysjcgfo983.output('update', $_11co16yyjcgfo99t.updatePressed)
      ],
      'checked': [$_dkk53lysjcgfo983.output('update', $_11co16yyjcgfo99t.updateChecked)],
      'expanded': [$_dkk53lysjcgfo983.output('update', $_11co16yyjcgfo99t.updateExpanded)],
      'selected': [$_dkk53lysjcgfo983.output('update', $_11co16yyjcgfo99t.updateSelected)],
      'none': [$_dkk53lysjcgfo983.output('update', $_ee1z6xwajcgfo8qa.noop)]
    }))
  ];

  var Toggling = $_395jq4w3jcgfo8n1.create({
    fields: ToggleSchema,
    name: 'toggling',
    active: $_g10xmtyvjcgfo996,
    apis: $_9qkprlywjcgfo99b
  });

  var format = function (command, update) {
    return Receiving.config({
      channels: $_8fkfzex5jcgfo8wf.wrap($_1wsj8mynjcgfo96i.formatChanged(), {
        onReceive: function (button, data) {
          if (data.command === command) {
            update(button, data.state);
          }
        }
      })
    });
  };
  var orientation = function (onReceive) {
    return Receiving.config({ channels: $_8fkfzex5jcgfo8wf.wrap($_1wsj8mynjcgfo96i.orientationChanged(), { onReceive: onReceive }) });
  };
  var receive = function (channel, onReceive) {
    return {
      key: channel,
      value: { onReceive: onReceive }
    };
  };
  var $_82uzw2yzjcgfo9ad = {
    format: format,
    orientation: orientation,
    receive: receive
  };

  var prefix = 'tinymce-mobile';
  var resolve$1 = function (p) {
    return prefix + '-' + p;
  };
  var $_3eky7iz0jcgfo9aj = {
    resolve: resolve$1,
    prefix: $_ee1z6xwajcgfo8qa.constant(prefix)
  };

  var exhibit$1 = function (base, unselectConfig) {
    return $_5jneh4xjjcgfo8z7.nu({
      styles: {
        '-webkit-user-select': 'none',
        'user-select': 'none',
        '-ms-user-select': 'none',
        '-moz-user-select': '-moz-none'
      },
      attributes: { 'unselectable': 'on' }
    });
  };
  var events$2 = function (unselectConfig) {
    return $_de0ow7w5jcgfo8ot.derive([$_de0ow7w5jcgfo8ot.abort($_8bjxvowwjcgfo8tj.selectstart(), $_ee1z6xwajcgfo8qa.constant(true))]);
  };
  var $_3azlpiz3jcgfo9b9 = {
    events: events$2,
    exhibit: exhibit$1
  };

  var Unselecting = $_395jq4w3jcgfo8n1.create({
    fields: [],
    name: 'unselecting',
    active: $_3azlpiz3jcgfo9b9
  });

  var focus$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_evqgdsyfjcgfo95e.focus(component.element());
      focusConfig.onFocus()(component);
    }
  };
  var blur$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_evqgdsyfjcgfo95e.blur(component.element());
    }
  };
  var isFocused = function (component) {
    return $_evqgdsyfjcgfo95e.hasFocus(component.element());
  };
  var $_3a7edrz7jcgfo9bv = {
    focus: focus$1,
    blur: blur$1,
    isFocused: isFocused
  };

  var exhibit$2 = function (base, focusConfig) {
    if (focusConfig.ignore())
      return $_5jneh4xjjcgfo8z7.nu({});
    else
      return $_5jneh4xjjcgfo8z7.nu({ attributes: { 'tabindex': '-1' } });
  };
  var events$3 = function (focusConfig) {
    return $_de0ow7w5jcgfo8ot.derive([$_de0ow7w5jcgfo8ot.run($_1snegiwvjcgfo8tb.focus(), function (component, simulatedEvent) {
        $_3a7edrz7jcgfo9bv.focus(component, focusConfig);
        simulatedEvent.stop();
      })]);
  };
  var $_91nre8z6jcgfo9bt = {
    exhibit: exhibit$2,
    events: events$3
  };

  var FocusSchema = [
    $_dkk53lysjcgfo983.onHandler('onFocus'),
    $_6inazsx1jcgfo8uu.defaulted('ignore', false)
  ];

  var Focusing = $_395jq4w3jcgfo8n1.create({
    fields: FocusSchema,
    name: 'focusing',
    active: $_91nre8z6jcgfo9bt,
    apis: $_3a7edrz7jcgfo9bv
  });

  var $_aqtpkrzdjcgfo9dh = {
    BACKSPACE: $_ee1z6xwajcgfo8qa.constant([8]),
    TAB: $_ee1z6xwajcgfo8qa.constant([9]),
    ENTER: $_ee1z6xwajcgfo8qa.constant([13]),
    SHIFT: $_ee1z6xwajcgfo8qa.constant([16]),
    CTRL: $_ee1z6xwajcgfo8qa.constant([17]),
    ALT: $_ee1z6xwajcgfo8qa.constant([18]),
    CAPSLOCK: $_ee1z6xwajcgfo8qa.constant([20]),
    ESCAPE: $_ee1z6xwajcgfo8qa.constant([27]),
    SPACE: $_ee1z6xwajcgfo8qa.constant([32]),
    PAGEUP: $_ee1z6xwajcgfo8qa.constant([33]),
    PAGEDOWN: $_ee1z6xwajcgfo8qa.constant([34]),
    END: $_ee1z6xwajcgfo8qa.constant([35]),
    HOME: $_ee1z6xwajcgfo8qa.constant([36]),
    LEFT: $_ee1z6xwajcgfo8qa.constant([37]),
    UP: $_ee1z6xwajcgfo8qa.constant([38]),
    RIGHT: $_ee1z6xwajcgfo8qa.constant([39]),
    DOWN: $_ee1z6xwajcgfo8qa.constant([40]),
    INSERT: $_ee1z6xwajcgfo8qa.constant([45]),
    DEL: $_ee1z6xwajcgfo8qa.constant([46]),
    META: $_ee1z6xwajcgfo8qa.constant([
      91,
      93,
      224
    ]),
    F10: $_ee1z6xwajcgfo8qa.constant([121])
  };

  var cycleBy = function (value, delta, min, max) {
    var r = value + delta;
    if (r > max)
      return min;
    else
      return r < min ? max : r;
  };
  var cap = function (value, min, max) {
    if (value <= min)
      return min;
    else
      return value >= max ? max : value;
  };
  var $_8tjyx4zijcgfo9f1 = {
    cycleBy: cycleBy,
    cap: cap
  };

  var all$3 = function (predicate) {
    return descendants$1($_g9a7hjy6jcgfo93s.body(), predicate);
  };
  var ancestors$1 = function (scope, predicate, isRoot) {
    return $_3h0i9zw8jcgfo8px.filter($_dd88k4y2jcgfo92t.parents(scope, isRoot), predicate);
  };
  var siblings$2 = function (scope, predicate) {
    return $_3h0i9zw8jcgfo8px.filter($_dd88k4y2jcgfo92t.siblings(scope), predicate);
  };
  var children$2 = function (scope, predicate) {
    return $_3h0i9zw8jcgfo8px.filter($_dd88k4y2jcgfo92t.children(scope), predicate);
  };
  var descendants$1 = function (scope, predicate) {
    var result = [];
    $_3h0i9zw8jcgfo8px.each($_dd88k4y2jcgfo92t.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants$1(x, predicate));
    });
    return result;
  };
  var $_aqbyvvzkjcgfo9f7 = {
    all: all$3,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  var all$2 = function (selector) {
    return $_dk3rx9wrjcgfo8sc.all(selector);
  };
  var ancestors = function (scope, selector, isRoot) {
    return $_aqbyvvzkjcgfo9f7.ancestors(scope, function (e) {
      return $_dk3rx9wrjcgfo8sc.is(e, selector);
    }, isRoot);
  };
  var siblings$1 = function (scope, selector) {
    return $_aqbyvvzkjcgfo9f7.siblings(scope, function (e) {
      return $_dk3rx9wrjcgfo8sc.is(e, selector);
    });
  };
  var children$1 = function (scope, selector) {
    return $_aqbyvvzkjcgfo9f7.children(scope, function (e) {
      return $_dk3rx9wrjcgfo8sc.is(e, selector);
    });
  };
  var descendants = function (scope, selector) {
    return $_dk3rx9wrjcgfo8sc.all(selector, scope);
  };
  var $_fk8w0mzjjcgfo9f4 = {
    all: all$2,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var first$2 = function (selector) {
    return $_dk3rx9wrjcgfo8sc.one(selector);
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_d45jk3yhjcgfo95p.ancestor(scope, function (e) {
      return $_dk3rx9wrjcgfo8sc.is(e, selector);
    }, isRoot);
  };
  var sibling$2 = function (scope, selector) {
    return $_d45jk3yhjcgfo95p.sibling(scope, function (e) {
      return $_dk3rx9wrjcgfo8sc.is(e, selector);
    });
  };
  var child$3 = function (scope, selector) {
    return $_d45jk3yhjcgfo95p.child(scope, function (e) {
      return $_dk3rx9wrjcgfo8sc.is(e, selector);
    });
  };
  var descendant$2 = function (scope, selector) {
    return $_dk3rx9wrjcgfo8sc.one(selector, scope);
  };
  var closest$2 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_dk3rx9wrjcgfo8sc.is, ancestor$2, scope, selector, isRoot);
  };
  var $_dka7lkzljcgfo9fe = {
    first: first$2,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var dehighlightAll = function (component, hConfig, hState) {
    var highlighted = $_fk8w0mzjjcgfo9f4.descendants(component.element(), '.' + hConfig.highlightClass());
    $_3h0i9zw8jcgfo8px.each(highlighted, function (h) {
      $_4ub0gextjcgfo90x.remove(h, hConfig.highlightClass());
      component.getSystem().getByDom(h).each(function (target) {
        hConfig.onDehighlight()(component, target);
      });
    });
  };
  var dehighlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    $_4ub0gextjcgfo90x.remove(target.element(), hConfig.highlightClass());
    if (wasHighlighted)
      hConfig.onDehighlight()(component, target);
  };
  var highlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    dehighlightAll(component, hConfig, hState);
    $_4ub0gextjcgfo90x.add(target.element(), hConfig.highlightClass());
    if (!wasHighlighted)
      hConfig.onHighlight()(component, target);
  };
  var highlightFirst = function (component, hConfig, hState) {
    getFirst(component, hConfig, hState).each(function (firstComp) {
      highlight(component, hConfig, hState, firstComp);
    });
  };
  var highlightLast = function (component, hConfig, hState) {
    getLast(component, hConfig, hState).each(function (lastComp) {
      highlight(component, hConfig, hState, lastComp);
    });
  };
  var highlightAt = function (component, hConfig, hState, index) {
    getByIndex(component, hConfig, hState, index).fold(function (err) {
      throw new Error(err);
    }, function (firstComp) {
      highlight(component, hConfig, hState, firstComp);
    });
  };
  var highlightBy = function (component, hConfig, hState, predicate) {
    var items = $_fk8w0mzjjcgfo9f4.descendants(component.element(), '.' + hConfig.itemClass());
    var itemComps = $_czjvbsydjcgfo959.cat($_3h0i9zw8jcgfo8px.map(items, function (i) {
      return component.getSystem().getByDom(i).toOption();
    }));
    var targetComp = $_3h0i9zw8jcgfo8px.find(itemComps, predicate);
    targetComp.each(function (c) {
      highlight(component, hConfig, hState, c);
    });
  };
  var isHighlighted = function (component, hConfig, hState, queryTarget) {
    return $_4ub0gextjcgfo90x.has(queryTarget.element(), hConfig.highlightClass());
  };
  var getHighlighted = function (component, hConfig, hState) {
    return $_dka7lkzljcgfo9fe.descendant(component.element(), '.' + hConfig.highlightClass()).bind(component.getSystem().getByDom);
  };
  var getByIndex = function (component, hConfig, hState, index) {
    var items = $_fk8w0mzjjcgfo9f4.descendants(component.element(), '.' + hConfig.itemClass());
    return $_d7fxouw9jcgfo8q5.from(items[index]).fold(function () {
      return $_eyzbemx7jcgfo8x7.error('No element found with index ' + index);
    }, component.getSystem().getByDom);
  };
  var getFirst = function (component, hConfig, hState) {
    return $_dka7lkzljcgfo9fe.descendant(component.element(), '.' + hConfig.itemClass()).bind(component.getSystem().getByDom);
  };
  var getLast = function (component, hConfig, hState) {
    var items = $_fk8w0mzjjcgfo9f4.descendants(component.element(), '.' + hConfig.itemClass());
    var last = items.length > 0 ? $_d7fxouw9jcgfo8q5.some(items[items.length - 1]) : $_d7fxouw9jcgfo8q5.none();
    return last.bind(component.getSystem().getByDom);
  };
  var getDelta = function (component, hConfig, hState, delta) {
    var items = $_fk8w0mzjjcgfo9f4.descendants(component.element(), '.' + hConfig.itemClass());
    var current = $_3h0i9zw8jcgfo8px.findIndex(items, function (item) {
      return $_4ub0gextjcgfo90x.has(item, hConfig.highlightClass());
    });
    return current.bind(function (selected) {
      var dest = $_8tjyx4zijcgfo9f1.cycleBy(selected, delta, 0, items.length - 1);
      return component.getSystem().getByDom(items[dest]);
    });
  };
  var getPrevious = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, -1);
  };
  var getNext = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, +1);
  };
  var $_ejzg5yzhjcgfo9ea = {
    dehighlightAll: dehighlightAll,
    dehighlight: dehighlight,
    highlight: highlight,
    highlightFirst: highlightFirst,
    highlightLast: highlightLast,
    highlightAt: highlightAt,
    highlightBy: highlightBy,
    isHighlighted: isHighlighted,
    getHighlighted: getHighlighted,
    getFirst: getFirst,
    getLast: getLast,
    getPrevious: getPrevious,
    getNext: getNext
  };

  var HighlightSchema = [
    $_6inazsx1jcgfo8uu.strict('highlightClass'),
    $_6inazsx1jcgfo8uu.strict('itemClass'),
    $_dkk53lysjcgfo983.onHandler('onHighlight'),
    $_dkk53lysjcgfo983.onHandler('onDehighlight')
  ];

  var Highlighting = $_395jq4w3jcgfo8n1.create({
    fields: HighlightSchema,
    name: 'highlighting',
    apis: $_ejzg5yzhjcgfo9ea
  });

  var dom = function () {
    var get = function (component) {
      return $_evqgdsyfjcgfo95e.search(component.element());
    };
    var set = function (component, focusee) {
      component.getSystem().triggerFocus(focusee, component.element());
    };
    return {
      get: get,
      set: set
    };
  };
  var highlights = function () {
    var get = function (component) {
      return Highlighting.getHighlighted(component).map(function (item) {
        return item.element();
      });
    };
    var set = function (component, element) {
      component.getSystem().getByDom(element).fold($_ee1z6xwajcgfo8qa.noop, function (item) {
        Highlighting.highlight(component, item);
      });
    };
    return {
      get: get,
      set: set
    };
  };
  var $_bs0cyuzfjcgfo9dz = {
    dom: dom,
    highlights: highlights
  };

  var inSet = function (keys) {
    return function (event) {
      return $_3h0i9zw8jcgfo8px.contains(keys, event.raw().which);
    };
  };
  var and = function (preds) {
    return function (event) {
      return $_3h0i9zw8jcgfo8px.forall(preds, function (pred) {
        return pred(event);
      });
    };
  };
  var is$1 = function (key) {
    return function (event) {
      return event.raw().which === key;
    };
  };
  var isShift = function (event) {
    return event.raw().shiftKey === true;
  };
  var isControl = function (event) {
    return event.raw().ctrlKey === true;
  };
  var $_2cq9j3zojcgfo9fu = {
    inSet: inSet,
    and: and,
    is: is$1,
    isShift: isShift,
    isNotShift: $_ee1z6xwajcgfo8qa.not(isShift),
    isControl: isControl,
    isNotControl: $_ee1z6xwajcgfo8qa.not(isControl)
  };

  var basic = function (key, action) {
    return {
      matches: $_2cq9j3zojcgfo9fu.is(key),
      classification: action
    };
  };
  var rule = function (matches, action) {
    return {
      matches: matches,
      classification: action
    };
  };
  var choose$2 = function (transitions, event) {
    var transition = $_3h0i9zw8jcgfo8px.find(transitions, function (t) {
      return t.matches(event);
    });
    return transition.map(function (t) {
      return t.classification;
    });
  };
  var $_5aie1hznjcgfo9fo = {
    basic: basic,
    rule: rule,
    choose: choose$2
  };

  var typical = function (infoSchema, stateInit, getRules, getEvents, getApis, optFocusIn) {
    var schema = function () {
      return infoSchema.concat([
        $_6inazsx1jcgfo8uu.defaulted('focusManager', $_bs0cyuzfjcgfo9dz.dom()),
        $_dkk53lysjcgfo983.output('handler', me),
        $_dkk53lysjcgfo983.output('state', stateInit)
      ]);
    };
    var processKey = function (component, simulatedEvent, keyingConfig, keyingState) {
      var rules = getRules(component, simulatedEvent, keyingConfig, keyingState);
      return $_5aie1hznjcgfo9fo.choose(rules, simulatedEvent.event()).bind(function (rule) {
        return rule(component, simulatedEvent, keyingConfig, keyingState);
      });
    };
    var toEvents = function (keyingConfig, keyingState) {
      var otherEvents = getEvents(keyingConfig, keyingState);
      var keyEvents = $_de0ow7w5jcgfo8ot.derive(optFocusIn.map(function (focusIn) {
        return $_de0ow7w5jcgfo8ot.run($_1snegiwvjcgfo8tb.focus(), function (component, simulatedEvent) {
          focusIn(component, keyingConfig, keyingState, simulatedEvent);
          simulatedEvent.stop();
        });
      }).toArray().concat([$_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.keydown(), function (component, simulatedEvent) {
          processKey(component, simulatedEvent, keyingConfig, keyingState).each(function (_) {
            simulatedEvent.stop();
          });
        })]));
      return $_au1coewxjcgfo8tp.deepMerge(otherEvents, keyEvents);
    };
    var me = {
      schema: schema,
      processKey: processKey,
      toEvents: toEvents,
      toApis: getApis
    };
    return me;
  };
  var $_ejtielzejcgfo9dn = { typical: typical };

  var cyclePrev = function (values, index, predicate) {
    var before = $_3h0i9zw8jcgfo8px.reverse(values.slice(0, index));
    var after = $_3h0i9zw8jcgfo8px.reverse(values.slice(index + 1));
    return $_3h0i9zw8jcgfo8px.find(before.concat(after), predicate);
  };
  var tryPrev = function (values, index, predicate) {
    var before = $_3h0i9zw8jcgfo8px.reverse(values.slice(0, index));
    return $_3h0i9zw8jcgfo8px.find(before, predicate);
  };
  var cycleNext = function (values, index, predicate) {
    var before = values.slice(0, index);
    var after = values.slice(index + 1);
    return $_3h0i9zw8jcgfo8px.find(after.concat(before), predicate);
  };
  var tryNext = function (values, index, predicate) {
    var after = values.slice(index + 1);
    return $_3h0i9zw8jcgfo8px.find(after, predicate);
  };
  var $_eg67zfzpjcgfo9g4 = {
    cyclePrev: cyclePrev,
    cycleNext: cycleNext,
    tryPrev: tryPrev,
    tryNext: tryNext
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_bso0uxzsjcgfo9h4 = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_eregpvwyjcgfo8ts.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_bso0uxzsjcgfo9h4.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_bso0uxzsjcgfo9h4.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$3 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_a7hrnswzjcgfo8tz.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_a7hrnswzjcgfo8tz.each(css, function (v, k) {
      v.fold(function () {
        internalRemove(dom, k);
      }, function (value) {
        internalSet(dom, k, value);
      });
    });
  };
  var get$4 = function (element, property) {
    var dom = element.dom();
    var styles = window.getComputedStyle(dom);
    var r = styles.getPropertyValue(property);
    var v = r === '' && !$_g9a7hjy6jcgfo93s.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_bso0uxzsjcgfo9h4.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
  };
  var getRaw = function (element, property) {
    var dom = element.dom();
    var raw = getUnsafeProperty(dom, property);
    return $_d7fxouw9jcgfo8q5.from(raw).filter(function (r) {
      return r.length > 0;
    });
  };
  var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom();
    if ($_bso0uxzsjcgfo9h4.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_6rcvbhwsjcgfo8sm.fromTag(tag);
    set$3(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$5 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_8ut06dxvjcgfo912.has(element, 'style') && $_g18n9xwojcgfo8s5.trim($_8ut06dxvjcgfo912.get(element, 'style')) === '') {
      $_8ut06dxvjcgfo912.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_8ut06dxvjcgfo912.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_8ut06dxvjcgfo912.remove : $_8ut06dxvjcgfo912.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy$1 = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_bso0uxzsjcgfo9h4.isSupported(sourceDom) && $_bso0uxzsjcgfo9h4.isSupported(targetDom)) {
      targetDom.style.cssText = sourceDom.style.cssText;
    }
  };
  var reflow = function (e) {
    return e.dom().offsetWidth;
  };
  var transferOne$1 = function (source, destination, style) {
    getRaw(source, style).each(function (value) {
      if (getRaw(destination, style).isNone())
        set$3(destination, style, value);
    });
  };
  var transfer$1 = function (source, destination, styles) {
    if (!$_bmv0faxwjcgfo91e.isElement(source) || !$_bmv0faxwjcgfo91e.isElement(destination))
      return;
    $_3h0i9zw8jcgfo8px.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_9qule1zrjcgfo9ge = {
    copy: copy$1,
    set: set$3,
    preserve: preserve,
    setAll: setAll$1,
    setOptions: setOptions,
    remove: remove$5,
    get: get$4,
    getRaw: getRaw,
    getAllRaw: getAllRaw,
    isValidValue: isValidValue,
    reflow: reflow,
    transfer: transfer$1
  };

  var Dimension = function (name, getOffset) {
    var set = function (element, h) {
      if (!$_eregpvwyjcgfo8ts.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_bso0uxzsjcgfo9h4.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_9qule1zrjcgfo9ge.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_3h0i9zw8jcgfo8px.foldl(properties, function (acc, property) {
        var val = $_9qule1zrjcgfo9ge.get(element, property);
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

  var api = Dimension('height', function (element) {
    return $_g9a7hjy6jcgfo93s.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
  });
  var set$2 = function (element, h) {
    api.set(element, h);
  };
  var get$3 = function (element) {
    return api.get(element);
  };
  var getOuter$1 = function (element) {
    return api.getOuter(element);
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
    var absMax = api.max(element, value, inclusions);
    $_9qule1zrjcgfo9ge.set(element, 'max-height', absMax + 'px');
  };
  var $_3rfbmazqjcgfo9gb = {
    set: set$2,
    get: get$3,
    getOuter: getOuter$1,
    setMax: setMax
  };

  var create$2 = function (cyclicField) {
    var schema = [
      $_6inazsx1jcgfo8uu.option('onEscape'),
      $_6inazsx1jcgfo8uu.option('onEnter'),
      $_6inazsx1jcgfo8uu.defaulted('selector', '[data-alloy-tabstop="true"]'),
      $_6inazsx1jcgfo8uu.defaulted('firstTabstop', 0),
      $_6inazsx1jcgfo8uu.defaulted('useTabstopAt', $_ee1z6xwajcgfo8qa.constant(true)),
      $_6inazsx1jcgfo8uu.option('visibilitySelector')
    ].concat([cyclicField]);
    var isVisible = function (tabbingConfig, element) {
      var target = tabbingConfig.visibilitySelector().bind(function (sel) {
        return $_dka7lkzljcgfo9fe.closest(element, sel);
      }).getOr(element);
      return $_3rfbmazqjcgfo9gb.get(target) > 0;
    };
    var findInitial = function (component, tabbingConfig) {
      var tabstops = $_fk8w0mzjjcgfo9f4.descendants(component.element(), tabbingConfig.selector());
      var visibles = $_3h0i9zw8jcgfo8px.filter(tabstops, function (elem) {
        return isVisible(tabbingConfig, elem);
      });
      return $_d7fxouw9jcgfo8q5.from(visibles[tabbingConfig.firstTabstop()]);
    };
    var findCurrent = function (component, tabbingConfig) {
      return tabbingConfig.focusManager().get(component).bind(function (elem) {
        return $_dka7lkzljcgfo9fe.closest(elem, tabbingConfig.selector());
      });
    };
    var isTabstop = function (tabbingConfig, element) {
      return isVisible(tabbingConfig, element) && tabbingConfig.useTabstopAt()(element);
    };
    var focusIn = function (component, tabbingConfig, tabbingState) {
      findInitial(component, tabbingConfig).each(function (target) {
        tabbingConfig.focusManager().set(component, target);
      });
    };
    var goFromTabstop = function (component, tabstops, stopIndex, tabbingConfig, cycle) {
      return cycle(tabstops, stopIndex, function (elem) {
        return isTabstop(tabbingConfig, elem);
      }).fold(function () {
        return tabbingConfig.cyclic() ? $_d7fxouw9jcgfo8q5.some(true) : $_d7fxouw9jcgfo8q5.none();
      }, function (target) {
        tabbingConfig.focusManager().set(component, target);
        return $_d7fxouw9jcgfo8q5.some(true);
      });
    };
    var go = function (component, simulatedEvent, tabbingConfig, cycle) {
      var tabstops = $_fk8w0mzjjcgfo9f4.descendants(component.element(), tabbingConfig.selector());
      return findCurrent(component, tabbingConfig).bind(function (tabstop) {
        var optStopIndex = $_3h0i9zw8jcgfo8px.findIndex(tabstops, $_ee1z6xwajcgfo8qa.curry($_8prpzjw7jcgfo8p9.eq, tabstop));
        return optStopIndex.bind(function (stopIndex) {
          return goFromTabstop(component, tabstops, stopIndex, tabbingConfig, cycle);
        });
      });
    };
    var goBackwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_eg67zfzpjcgfo9g4.cyclePrev : $_eg67zfzpjcgfo9g4.tryPrev;
      return go(component, simulatedEvent, tabbingConfig, navigate);
    };
    var goForwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_eg67zfzpjcgfo9g4.cycleNext : $_eg67zfzpjcgfo9g4.tryNext;
      return go(component, simulatedEvent, tabbingConfig, navigate);
    };
    var execute = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      return tabbingConfig.onEnter().bind(function (f) {
        return f(component, simulatedEvent);
      });
    };
    var exit = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      return tabbingConfig.onEscape().bind(function (f) {
        return f(component, simulatedEvent);
      });
    };
    var getRules = $_ee1z6xwajcgfo8qa.constant([
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.and([
        $_2cq9j3zojcgfo9fu.isShift,
        $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.TAB())
      ]), goBackwards),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.TAB()), goForwards),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.ESCAPE()), exit),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.and([
        $_2cq9j3zojcgfo9fu.isNotShift,
        $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.ENTER())
      ]), execute)
    ]);
    var getEvents = $_ee1z6xwajcgfo8qa.constant({});
    var getApis = $_ee1z6xwajcgfo8qa.constant({});
    return $_ejtielzejcgfo9dn.typical(schema, $_bjozj5xpjcgfo90f.init, getRules, getEvents, getApis, $_d7fxouw9jcgfo8q5.some(focusIn));
  };
  var $_brels6zcjcgfo9cn = { create: create$2 };

  var AcyclicType = $_brels6zcjcgfo9cn.create($_6inazsx1jcgfo8uu.state('cyclic', $_ee1z6xwajcgfo8qa.constant(false)));

  var CyclicType = $_brels6zcjcgfo9cn.create($_6inazsx1jcgfo8uu.state('cyclic', $_ee1z6xwajcgfo8qa.constant(true)));

  var inside = function (target) {
    return $_bmv0faxwjcgfo91e.name(target) === 'input' && $_8ut06dxvjcgfo912.get(target, 'type') !== 'radio' || $_bmv0faxwjcgfo91e.name(target) === 'textarea';
  };
  var $_3604zdzwjcgfo9i3 = { inside: inside };

  var doDefaultExecute = function (component, simulatedEvent, focused) {
    $_4x498fwujcgfo8sy.dispatch(component, focused, $_1snegiwvjcgfo8tb.execute());
    return $_d7fxouw9jcgfo8q5.some(true);
  };
  var defaultExecute = function (component, simulatedEvent, focused) {
    return $_3604zdzwjcgfo9i3.inside(focused) && $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.SPACE())(simulatedEvent.event()) ? $_d7fxouw9jcgfo8q5.none() : doDefaultExecute(component, simulatedEvent, focused);
  };
  var $_4t0zmuzxjcgfo9ic = { defaultExecute: defaultExecute };

  var schema$1 = [
    $_6inazsx1jcgfo8uu.defaulted('execute', $_4t0zmuzxjcgfo9ic.defaultExecute),
    $_6inazsx1jcgfo8uu.defaulted('useSpace', false),
    $_6inazsx1jcgfo8uu.defaulted('useEnter', true),
    $_6inazsx1jcgfo8uu.defaulted('useControlEnter', false),
    $_6inazsx1jcgfo8uu.defaulted('useDown', false)
  ];
  var execute = function (component, simulatedEvent, executeConfig, executeState) {
    return executeConfig.execute()(component, simulatedEvent, component.element());
  };
  var getRules = function (component, simulatedEvent, executeConfig, executeState) {
    var spaceExec = executeConfig.useSpace() && !$_3604zdzwjcgfo9i3.inside(component.element()) ? $_aqtpkrzdjcgfo9dh.SPACE() : [];
    var enterExec = executeConfig.useEnter() ? $_aqtpkrzdjcgfo9dh.ENTER() : [];
    var downExec = executeConfig.useDown() ? $_aqtpkrzdjcgfo9dh.DOWN() : [];
    var execKeys = spaceExec.concat(enterExec).concat(downExec);
    return [$_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet(execKeys), execute)].concat(executeConfig.useControlEnter() ? [$_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.and([
        $_2cq9j3zojcgfo9fu.isControl,
        $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.ENTER())
      ]), execute)] : []);
  };
  var getEvents = $_ee1z6xwajcgfo8qa.constant({});
  var getApis = $_ee1z6xwajcgfo8qa.constant({});
  var ExecutionType = $_ejtielzejcgfo9dn.typical(schema$1, $_bjozj5xpjcgfo90f.init, getRules, getEvents, getApis, $_d7fxouw9jcgfo8q5.none());

  var flatgrid = function (spec) {
    var dimensions = Cell($_d7fxouw9jcgfo8q5.none());
    var setGridSize = function (numRows, numColumns) {
      dimensions.set($_d7fxouw9jcgfo8q5.some({
        numRows: $_ee1z6xwajcgfo8qa.constant(numRows),
        numColumns: $_ee1z6xwajcgfo8qa.constant(numColumns)
      }));
    };
    var getNumRows = function () {
      return dimensions.get().map(function (d) {
        return d.numRows();
      });
    };
    var getNumColumns = function () {
      return dimensions.get().map(function (d) {
        return d.numColumns();
      });
    };
    return BehaviourState({
      readState: $_ee1z6xwajcgfo8qa.constant({}),
      setGridSize: setGridSize,
      getNumRows: getNumRows,
      getNumColumns: getNumColumns
    });
  };
  var init$1 = function (spec) {
    return spec.state()(spec);
  };
  var $_6cefkxzzjcgfo9iz = {
    flatgrid: flatgrid,
    init: init$1
  };

  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_9qule1zrjcgfo9ge.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_54w39k101jcgfo9jk = {
    onDirection: onDirection,
    getDirection: getDirection
  };

  var useH = function (movement) {
    return function (component, simulatedEvent, config, state) {
      var move = movement(component.element());
      return use(move, component, simulatedEvent, config, state);
    };
  };
  var west = function (moveLeft, moveRight) {
    var movement = $_54w39k101jcgfo9jk.onDirection(moveLeft, moveRight);
    return useH(movement);
  };
  var east = function (moveLeft, moveRight) {
    var movement = $_54w39k101jcgfo9jk.onDirection(moveRight, moveLeft);
    return useH(movement);
  };
  var useV = function (move) {
    return function (component, simulatedEvent, config, state) {
      return use(move, component, simulatedEvent, config, state);
    };
  };
  var use = function (move, component, simulatedEvent, config, state) {
    var outcome = config.focusManager().get(component).bind(function (focused) {
      return move(component.element(), focused, config, state);
    });
    return outcome.map(function (newFocus) {
      config.focusManager().set(component, newFocus);
      return true;
    });
  };
  var $_djdf9t100jcgfo9jd = {
    east: east,
    west: west,
    north: useV,
    south: useV,
    move: useV
  };

  var indexInfo = $_catt2ixljcgfo904.immutableBag([
    'index',
    'candidates'
  ], []);
  var locate = function (candidates, predicate) {
    return $_3h0i9zw8jcgfo8px.findIndex(candidates, predicate).map(function (index) {
      return indexInfo({
        index: index,
        candidates: candidates
      });
    });
  };
  var $_2yzt1z103jcgfo9kb = { locate: locate };

  var visibilityToggler = function (element, property, hiddenValue, visibleValue) {
    var initial = $_9qule1zrjcgfo9ge.get(element, property);
    if (initial === undefined)
      initial = '';
    var value = initial === hiddenValue ? visibleValue : hiddenValue;
    var off = $_ee1z6xwajcgfo8qa.curry($_9qule1zrjcgfo9ge.set, element, property, initial);
    var on = $_ee1z6xwajcgfo8qa.curry($_9qule1zrjcgfo9ge.set, element, property, value);
    return Toggler(off, on, false);
  };
  var toggler$1 = function (element) {
    return visibilityToggler(element, 'visibility', 'hidden', 'visible');
  };
  var displayToggler = function (element, value) {
    return visibilityToggler(element, 'display', 'none', value);
  };
  var isHidden = function (dom) {
    return dom.offsetWidth <= 0 && dom.offsetHeight <= 0;
  };
  var isVisible = function (element) {
    var dom = element.dom();
    return !isHidden(dom);
  };
  var $_7zmrcj104jcgfo9kk = {
    toggler: toggler$1,
    displayToggler: displayToggler,
    isVisible: isVisible
  };

  var locateVisible = function (container, current, selector) {
    var filter = $_7zmrcj104jcgfo9kk.isVisible;
    return locateIn(container, current, selector, filter);
  };
  var locateIn = function (container, current, selector, filter) {
    var predicate = $_ee1z6xwajcgfo8qa.curry($_8prpzjw7jcgfo8p9.eq, current);
    var candidates = $_fk8w0mzjjcgfo9f4.descendants(container, selector);
    var visible = $_3h0i9zw8jcgfo8px.filter(candidates, $_7zmrcj104jcgfo9kk.isVisible);
    return $_2yzt1z103jcgfo9kb.locate(visible, predicate);
  };
  var findIndex$2 = function (elements, target) {
    return $_3h0i9zw8jcgfo8px.findIndex(elements, function (elem) {
      return $_8prpzjw7jcgfo8p9.eq(target, elem);
    });
  };
  var $_3bec71102jcgfo9jn = {
    locateVisible: locateVisible,
    locateIn: locateIn,
    findIndex: findIndex$2
  };

  var withGrid = function (values, index, numCols, f) {
    var oldRow = Math.floor(index / numCols);
    var oldColumn = index % numCols;
    return f(oldRow, oldColumn).bind(function (address) {
      var newIndex = address.row() * numCols + address.column();
      return newIndex >= 0 && newIndex < values.length ? $_d7fxouw9jcgfo8q5.some(values[newIndex]) : $_d7fxouw9jcgfo8q5.none();
    });
  };
  var cycleHorizontal = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var onLastRow = oldRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - oldRow * numCols : numCols;
      var newColumn = $_8tjyx4zijcgfo9f1.cycleBy(oldColumn, delta, 0, colsInRow - 1);
      return $_d7fxouw9jcgfo8q5.some({
        row: $_ee1z6xwajcgfo8qa.constant(oldRow),
        column: $_ee1z6xwajcgfo8qa.constant(newColumn)
      });
    });
  };
  var cycleVertical = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var newRow = $_8tjyx4zijcgfo9f1.cycleBy(oldRow, delta, 0, numRows - 1);
      var onLastRow = newRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - newRow * numCols : numCols;
      var newCol = $_8tjyx4zijcgfo9f1.cap(oldColumn, 0, colsInRow - 1);
      return $_d7fxouw9jcgfo8q5.some({
        row: $_ee1z6xwajcgfo8qa.constant(newRow),
        column: $_ee1z6xwajcgfo8qa.constant(newCol)
      });
    });
  };
  var cycleRight = function (values, index, numRows, numCols) {
    return cycleHorizontal(values, index, numRows, numCols, +1);
  };
  var cycleLeft = function (values, index, numRows, numCols) {
    return cycleHorizontal(values, index, numRows, numCols, -1);
  };
  var cycleUp = function (values, index, numRows, numCols) {
    return cycleVertical(values, index, numRows, numCols, -1);
  };
  var cycleDown = function (values, index, numRows, numCols) {
    return cycleVertical(values, index, numRows, numCols, +1);
  };
  var $_21361b105jcgfo9kr = {
    cycleDown: cycleDown,
    cycleUp: cycleUp,
    cycleLeft: cycleLeft,
    cycleRight: cycleRight
  };

  var schema$2 = [
    $_6inazsx1jcgfo8uu.strict('selector'),
    $_6inazsx1jcgfo8uu.defaulted('execute', $_4t0zmuzxjcgfo9ic.defaultExecute),
    $_dkk53lysjcgfo983.onKeyboardHandler('onEscape'),
    $_6inazsx1jcgfo8uu.defaulted('captureTab', false),
    $_dkk53lysjcgfo983.initSize()
  ];
  var focusIn = function (component, gridConfig, gridState) {
    $_dka7lkzljcgfo9fe.descendant(component.element(), gridConfig.selector()).each(function (first) {
      gridConfig.focusManager().set(component, first);
    });
  };
  var findCurrent = function (component, gridConfig) {
    return gridConfig.focusManager().get(component).bind(function (elem) {
      return $_dka7lkzljcgfo9fe.closest(elem, gridConfig.selector());
    });
  };
  var execute$1 = function (component, simulatedEvent, gridConfig, gridState) {
    return findCurrent(component, gridConfig).bind(function (focused) {
      return gridConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var doMove = function (cycle) {
    return function (element, focused, gridConfig, gridState) {
      return $_3bec71102jcgfo9jn.locateVisible(element, focused, gridConfig.selector()).bind(function (identified) {
        return cycle(identified.candidates(), identified.index(), gridState.getNumRows().getOr(gridConfig.initSize().numRows()), gridState.getNumColumns().getOr(gridConfig.initSize().numColumns()));
      });
    };
  };
  var handleTab = function (component, simulatedEvent, gridConfig, gridState) {
    return gridConfig.captureTab() ? $_d7fxouw9jcgfo8q5.some(true) : $_d7fxouw9jcgfo8q5.none();
  };
  var doEscape = function (component, simulatedEvent, gridConfig, gridState) {
    return gridConfig.onEscape()(component, simulatedEvent);
  };
  var moveLeft = doMove($_21361b105jcgfo9kr.cycleLeft);
  var moveRight = doMove($_21361b105jcgfo9kr.cycleRight);
  var moveNorth = doMove($_21361b105jcgfo9kr.cycleUp);
  var moveSouth = doMove($_21361b105jcgfo9kr.cycleDown);
  var getRules$1 = $_ee1z6xwajcgfo8qa.constant([
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.LEFT()), $_djdf9t100jcgfo9jd.west(moveLeft, moveRight)),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.RIGHT()), $_djdf9t100jcgfo9jd.east(moveLeft, moveRight)),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.UP()), $_djdf9t100jcgfo9jd.north(moveNorth)),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.DOWN()), $_djdf9t100jcgfo9jd.south(moveSouth)),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.and([
      $_2cq9j3zojcgfo9fu.isShift,
      $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.TAB())
    ]), handleTab),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.and([
      $_2cq9j3zojcgfo9fu.isNotShift,
      $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.TAB())
    ]), handleTab),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.ESCAPE()), doEscape),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.SPACE().concat($_aqtpkrzdjcgfo9dh.ENTER())), execute$1)
  ]);
  var getEvents$1 = $_ee1z6xwajcgfo8qa.constant({});
  var getApis$1 = {};
  var FlatgridType = $_ejtielzejcgfo9dn.typical(schema$2, $_6cefkxzzjcgfo9iz.flatgrid, getRules$1, getEvents$1, getApis$1, $_d7fxouw9jcgfo8q5.some(focusIn));

  var horizontal = function (container, selector, current, delta) {
    return $_3bec71102jcgfo9jn.locateVisible(container, current, selector, $_ee1z6xwajcgfo8qa.constant(true)).bind(function (identified) {
      var index = identified.index();
      var candidates = identified.candidates();
      var newIndex = $_8tjyx4zijcgfo9f1.cycleBy(index, delta, 0, candidates.length - 1);
      return $_d7fxouw9jcgfo8q5.from(candidates[newIndex]);
    });
  };
  var $_k93ff107jcgfo9li = { horizontal: horizontal };

  var schema$3 = [
    $_6inazsx1jcgfo8uu.strict('selector'),
    $_6inazsx1jcgfo8uu.defaulted('getInitial', $_d7fxouw9jcgfo8q5.none),
    $_6inazsx1jcgfo8uu.defaulted('execute', $_4t0zmuzxjcgfo9ic.defaultExecute),
    $_6inazsx1jcgfo8uu.defaulted('executeOnMove', false)
  ];
  var findCurrent$1 = function (component, flowConfig) {
    return flowConfig.focusManager().get(component).bind(function (elem) {
      return $_dka7lkzljcgfo9fe.closest(elem, flowConfig.selector());
    });
  };
  var execute$2 = function (component, simulatedEvent, flowConfig) {
    return findCurrent$1(component, flowConfig).bind(function (focused) {
      return flowConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$1 = function (component, flowConfig) {
    flowConfig.getInitial()(component).or($_dka7lkzljcgfo9fe.descendant(component.element(), flowConfig.selector())).each(function (first) {
      flowConfig.focusManager().set(component, first);
    });
  };
  var moveLeft$1 = function (element, focused, info) {
    return $_k93ff107jcgfo9li.horizontal(element, info.selector(), focused, -1);
  };
  var moveRight$1 = function (element, focused, info) {
    return $_k93ff107jcgfo9li.horizontal(element, info.selector(), focused, +1);
  };
  var doMove$1 = function (movement) {
    return function (component, simulatedEvent, flowConfig) {
      return movement(component, simulatedEvent, flowConfig).bind(function () {
        return flowConfig.executeOnMove() ? execute$2(component, simulatedEvent, flowConfig) : $_d7fxouw9jcgfo8q5.some(true);
      });
    };
  };
  var getRules$2 = function (_) {
    return [
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.LEFT().concat($_aqtpkrzdjcgfo9dh.UP())), doMove$1($_djdf9t100jcgfo9jd.west(moveLeft$1, moveRight$1))),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.RIGHT().concat($_aqtpkrzdjcgfo9dh.DOWN())), doMove$1($_djdf9t100jcgfo9jd.east(moveLeft$1, moveRight$1))),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.ENTER()), execute$2),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.SPACE()), execute$2)
    ];
  };
  var getEvents$2 = $_ee1z6xwajcgfo8qa.constant({});
  var getApis$2 = $_ee1z6xwajcgfo8qa.constant({});
  var FlowType = $_ejtielzejcgfo9dn.typical(schema$3, $_bjozj5xpjcgfo90f.init, getRules$2, getEvents$2, getApis$2, $_d7fxouw9jcgfo8q5.some(focusIn$1));

  var outcome = $_catt2ixljcgfo904.immutableBag([
    'rowIndex',
    'columnIndex',
    'cell'
  ], []);
  var toCell = function (matrix, rowIndex, columnIndex) {
    return $_d7fxouw9jcgfo8q5.from(matrix[rowIndex]).bind(function (row) {
      return $_d7fxouw9jcgfo8q5.from(row[columnIndex]).map(function (cell) {
        return outcome({
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          cell: cell
        });
      });
    });
  };
  var cycleHorizontal$1 = function (matrix, rowIndex, startCol, deltaCol) {
    var row = matrix[rowIndex];
    var colsInRow = row.length;
    var newColIndex = $_8tjyx4zijcgfo9f1.cycleBy(startCol, deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var cycleVertical$1 = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_8tjyx4zijcgfo9f1.cycleBy(startRow, deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_8tjyx4zijcgfo9f1.cap(colIndex, 0, colsInNextRow - 1);
    return toCell(matrix, nextRowIndex, nextColIndex);
  };
  var moveHorizontal = function (matrix, rowIndex, startCol, deltaCol) {
    var row = matrix[rowIndex];
    var colsInRow = row.length;
    var newColIndex = $_8tjyx4zijcgfo9f1.cap(startCol + deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var moveVertical = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_8tjyx4zijcgfo9f1.cap(startRow + deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_8tjyx4zijcgfo9f1.cap(colIndex, 0, colsInNextRow - 1);
    return toCell(matrix, nextRowIndex, nextColIndex);
  };
  var cycleRight$1 = function (matrix, startRow, startCol) {
    return cycleHorizontal$1(matrix, startRow, startCol, +1);
  };
  var cycleLeft$1 = function (matrix, startRow, startCol) {
    return cycleHorizontal$1(matrix, startRow, startCol, -1);
  };
  var cycleUp$1 = function (matrix, startRow, startCol) {
    return cycleVertical$1(matrix, startCol, startRow, -1);
  };
  var cycleDown$1 = function (matrix, startRow, startCol) {
    return cycleVertical$1(matrix, startCol, startRow, +1);
  };
  var moveLeft$3 = function (matrix, startRow, startCol) {
    return moveHorizontal(matrix, startRow, startCol, -1);
  };
  var moveRight$3 = function (matrix, startRow, startCol) {
    return moveHorizontal(matrix, startRow, startCol, +1);
  };
  var moveUp = function (matrix, startRow, startCol) {
    return moveVertical(matrix, startCol, startRow, -1);
  };
  var moveDown = function (matrix, startRow, startCol) {
    return moveVertical(matrix, startCol, startRow, +1);
  };
  var $_3yh8h1109jcgfo9mh = {
    cycleRight: cycleRight$1,
    cycleLeft: cycleLeft$1,
    cycleUp: cycleUp$1,
    cycleDown: cycleDown$1,
    moveLeft: moveLeft$3,
    moveRight: moveRight$3,
    moveUp: moveUp,
    moveDown: moveDown
  };

  var schema$4 = [
    $_6inazsx1jcgfo8uu.strictObjOf('selectors', [
      $_6inazsx1jcgfo8uu.strict('row'),
      $_6inazsx1jcgfo8uu.strict('cell')
    ]),
    $_6inazsx1jcgfo8uu.defaulted('cycles', true),
    $_6inazsx1jcgfo8uu.defaulted('previousSelector', $_d7fxouw9jcgfo8q5.none),
    $_6inazsx1jcgfo8uu.defaulted('execute', $_4t0zmuzxjcgfo9ic.defaultExecute)
  ];
  var focusIn$2 = function (component, matrixConfig) {
    var focused = matrixConfig.previousSelector()(component).orThunk(function () {
      var selectors = matrixConfig.selectors();
      return $_dka7lkzljcgfo9fe.descendant(component.element(), selectors.cell());
    });
    focused.each(function (cell) {
      matrixConfig.focusManager().set(component, cell);
    });
  };
  var execute$3 = function (component, simulatedEvent, matrixConfig) {
    return $_evqgdsyfjcgfo95e.search(component.element()).bind(function (focused) {
      return matrixConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var toMatrix = function (rows, matrixConfig) {
    return $_3h0i9zw8jcgfo8px.map(rows, function (row) {
      return $_fk8w0mzjjcgfo9f4.descendants(row, matrixConfig.selectors().cell());
    });
  };
  var doMove$2 = function (ifCycle, ifMove) {
    return function (element, focused, matrixConfig) {
      var move = matrixConfig.cycles() ? ifCycle : ifMove;
      return $_dka7lkzljcgfo9fe.closest(focused, matrixConfig.selectors().row()).bind(function (inRow) {
        var cellsInRow = $_fk8w0mzjjcgfo9f4.descendants(inRow, matrixConfig.selectors().cell());
        return $_3bec71102jcgfo9jn.findIndex(cellsInRow, focused).bind(function (colIndex) {
          var allRows = $_fk8w0mzjjcgfo9f4.descendants(element, matrixConfig.selectors().row());
          return $_3bec71102jcgfo9jn.findIndex(allRows, inRow).bind(function (rowIndex) {
            var matrix = toMatrix(allRows, matrixConfig);
            return move(matrix, rowIndex, colIndex).map(function (next) {
              return next.cell();
            });
          });
        });
      });
    };
  };
  var moveLeft$2 = doMove$2($_3yh8h1109jcgfo9mh.cycleLeft, $_3yh8h1109jcgfo9mh.moveLeft);
  var moveRight$2 = doMove$2($_3yh8h1109jcgfo9mh.cycleRight, $_3yh8h1109jcgfo9mh.moveRight);
  var moveNorth$1 = doMove$2($_3yh8h1109jcgfo9mh.cycleUp, $_3yh8h1109jcgfo9mh.moveUp);
  var moveSouth$1 = doMove$2($_3yh8h1109jcgfo9mh.cycleDown, $_3yh8h1109jcgfo9mh.moveDown);
  var getRules$3 = $_ee1z6xwajcgfo8qa.constant([
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.LEFT()), $_djdf9t100jcgfo9jd.west(moveLeft$2, moveRight$2)),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.RIGHT()), $_djdf9t100jcgfo9jd.east(moveLeft$2, moveRight$2)),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.UP()), $_djdf9t100jcgfo9jd.north(moveNorth$1)),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.DOWN()), $_djdf9t100jcgfo9jd.south(moveSouth$1)),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.SPACE().concat($_aqtpkrzdjcgfo9dh.ENTER())), execute$3)
  ]);
  var getEvents$3 = $_ee1z6xwajcgfo8qa.constant({});
  var getApis$3 = $_ee1z6xwajcgfo8qa.constant({});
  var MatrixType = $_ejtielzejcgfo9dn.typical(schema$4, $_bjozj5xpjcgfo90f.init, getRules$3, getEvents$3, getApis$3, $_d7fxouw9jcgfo8q5.some(focusIn$2));

  var schema$5 = [
    $_6inazsx1jcgfo8uu.strict('selector'),
    $_6inazsx1jcgfo8uu.defaulted('execute', $_4t0zmuzxjcgfo9ic.defaultExecute),
    $_6inazsx1jcgfo8uu.defaulted('moveOnTab', false)
  ];
  var execute$4 = function (component, simulatedEvent, menuConfig) {
    return menuConfig.focusManager().get(component).bind(function (focused) {
      return menuConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$3 = function (component, menuConfig, simulatedEvent) {
    $_dka7lkzljcgfo9fe.descendant(component.element(), menuConfig.selector()).each(function (first) {
      menuConfig.focusManager().set(component, first);
    });
  };
  var moveUp$1 = function (element, focused, info) {
    return $_k93ff107jcgfo9li.horizontal(element, info.selector(), focused, -1);
  };
  var moveDown$1 = function (element, focused, info) {
    return $_k93ff107jcgfo9li.horizontal(element, info.selector(), focused, +1);
  };
  var fireShiftTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_djdf9t100jcgfo9jd.move(moveUp$1)(component, simulatedEvent, menuConfig) : $_d7fxouw9jcgfo8q5.none();
  };
  var fireTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_djdf9t100jcgfo9jd.move(moveDown$1)(component, simulatedEvent, menuConfig) : $_d7fxouw9jcgfo8q5.none();
  };
  var getRules$4 = $_ee1z6xwajcgfo8qa.constant([
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.UP()), $_djdf9t100jcgfo9jd.move(moveUp$1)),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.DOWN()), $_djdf9t100jcgfo9jd.move(moveDown$1)),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.and([
      $_2cq9j3zojcgfo9fu.isShift,
      $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.TAB())
    ]), fireShiftTab),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.and([
      $_2cq9j3zojcgfo9fu.isNotShift,
      $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.TAB())
    ]), fireTab),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.ENTER()), execute$4),
    $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.SPACE()), execute$4)
  ]);
  var getEvents$4 = $_ee1z6xwajcgfo8qa.constant({});
  var getApis$4 = $_ee1z6xwajcgfo8qa.constant({});
  var MenuType = $_ejtielzejcgfo9dn.typical(schema$5, $_bjozj5xpjcgfo90f.init, getRules$4, getEvents$4, getApis$4, $_d7fxouw9jcgfo8q5.some(focusIn$3));

  var schema$6 = [
    $_dkk53lysjcgfo983.onKeyboardHandler('onSpace'),
    $_dkk53lysjcgfo983.onKeyboardHandler('onEnter'),
    $_dkk53lysjcgfo983.onKeyboardHandler('onShiftEnter'),
    $_dkk53lysjcgfo983.onKeyboardHandler('onLeft'),
    $_dkk53lysjcgfo983.onKeyboardHandler('onRight'),
    $_dkk53lysjcgfo983.onKeyboardHandler('onTab'),
    $_dkk53lysjcgfo983.onKeyboardHandler('onShiftTab'),
    $_dkk53lysjcgfo983.onKeyboardHandler('onUp'),
    $_dkk53lysjcgfo983.onKeyboardHandler('onDown'),
    $_dkk53lysjcgfo983.onKeyboardHandler('onEscape'),
    $_6inazsx1jcgfo8uu.option('focusIn')
  ];
  var getRules$5 = function (component, simulatedEvent, executeInfo) {
    return [
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.SPACE()), executeInfo.onSpace()),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.and([
        $_2cq9j3zojcgfo9fu.isNotShift,
        $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.ENTER())
      ]), executeInfo.onEnter()),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.and([
        $_2cq9j3zojcgfo9fu.isShift,
        $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.ENTER())
      ]), executeInfo.onShiftEnter()),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.and([
        $_2cq9j3zojcgfo9fu.isShift,
        $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.TAB())
      ]), executeInfo.onShiftTab()),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.and([
        $_2cq9j3zojcgfo9fu.isNotShift,
        $_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.TAB())
      ]), executeInfo.onTab()),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.UP()), executeInfo.onUp()),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.DOWN()), executeInfo.onDown()),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.LEFT()), executeInfo.onLeft()),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.RIGHT()), executeInfo.onRight()),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.SPACE()), executeInfo.onSpace()),
      $_5aie1hznjcgfo9fo.rule($_2cq9j3zojcgfo9fu.inSet($_aqtpkrzdjcgfo9dh.ESCAPE()), executeInfo.onEscape())
    ];
  };
  var focusIn$4 = function (component, executeInfo) {
    return executeInfo.focusIn().bind(function (f) {
      return f(component, executeInfo);
    });
  };
  var getEvents$5 = $_ee1z6xwajcgfo8qa.constant({});
  var getApis$5 = $_ee1z6xwajcgfo8qa.constant({});
  var SpecialType = $_ejtielzejcgfo9dn.typical(schema$6, $_bjozj5xpjcgfo90f.init, getRules$5, getEvents$5, getApis$5, $_d7fxouw9jcgfo8q5.some(focusIn$4));

  var $_7bj4sbzajcgfo9cc = {
    acyclic: AcyclicType.schema(),
    cyclic: CyclicType.schema(),
    flow: FlowType.schema(),
    flatgrid: FlatgridType.schema(),
    matrix: MatrixType.schema(),
    execution: ExecutionType.schema(),
    menu: MenuType.schema(),
    special: SpecialType.schema()
  };

  var Keying = $_395jq4w3jcgfo8n1.createModes({
    branchKey: 'mode',
    branches: $_7bj4sbzajcgfo9cc,
    name: 'keying',
    active: {
      events: function (keyingConfig, keyingState) {
        var handler = keyingConfig.handler();
        return handler.toEvents(keyingConfig, keyingState);
      }
    },
    apis: {
      focusIn: function (component) {
        component.getSystem().triggerFocus(component.element(), component.element());
      },
      setGridSize: function (component, keyConfig, keyState, numRows, numColumns) {
        if (!$_8fkfzex5jcgfo8wf.hasKey(keyState, 'setGridSize')) {
          console.error('Layout does not support setGridSize');
        } else {
          keyState.setGridSize(numRows, numColumns);
        }
      }
    },
    state: $_6cefkxzzjcgfo9iz
  });

  var field$1 = function (name, forbidden) {
    return $_6inazsx1jcgfo8uu.defaultedObjOf(name, {}, $_3h0i9zw8jcgfo8px.map(forbidden, function (f) {
      return $_6inazsx1jcgfo8uu.forbid(f.name(), 'Cannot configure ' + f.name() + ' for ' + name);
    }).concat([$_6inazsx1jcgfo8uu.state('dump', $_ee1z6xwajcgfo8qa.identity)]));
  };
  var get$5 = function (data) {
    return data.dump();
  };
  var $_70kbdh10cjcgfo9nm = {
    field: field$1,
    get: get$5
  };

  var unique = 0;
  var generate$1 = function (prefix) {
    var date = new Date();
    var time = date.getTime();
    var random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
  };
  var $_gcx8v510fjcgfo9ox = { generate: generate$1 };

  var premadeTag = $_gcx8v510fjcgfo9ox.generate('alloy-premade');
  var apiConfig = $_gcx8v510fjcgfo9ox.generate('api');
  var premade = function (comp) {
    return $_8fkfzex5jcgfo8wf.wrap(premadeTag, comp);
  };
  var getPremade = function (spec) {
    return $_8fkfzex5jcgfo8wf.readOptFrom(spec, premadeTag);
  };
  var makeApi = function (f) {
    return $_2xvwuwxijcgfo8z2.markAsSketchApi(function (component) {
      var args = Array.prototype.slice.call(arguments, 0);
      var spi = component.config(apiConfig);
      return f.apply(undefined, [spi].concat(args));
    }, f);
  };
  var $_c7yo6t10ejcgfo9oj = {
    apiConfig: $_ee1z6xwajcgfo8qa.constant(apiConfig),
    makeApi: makeApi,
    premade: premade,
    getPremade: getPremade
  };

  var adt$2 = $_eqsftbx3jcgfo8vg.generate([
    { required: ['data'] },
    { external: ['data'] },
    { optional: ['data'] },
    { group: ['data'] }
  ]);
  var fFactory = $_6inazsx1jcgfo8uu.defaulted('factory', { sketch: $_ee1z6xwajcgfo8qa.identity });
  var fSchema = $_6inazsx1jcgfo8uu.defaulted('schema', []);
  var fName = $_6inazsx1jcgfo8uu.strict('name');
  var fPname = $_6inazsx1jcgfo8uu.field('pname', 'pname', $_d0l63jx2jcgfo8v5.defaultedThunk(function (typeSpec) {
    return '<alloy.' + $_gcx8v510fjcgfo9ox.generate(typeSpec.name) + '>';
  }), $_783jrjxgjcgfo8yn.anyValue());
  var fDefaults = $_6inazsx1jcgfo8uu.defaulted('defaults', $_ee1z6xwajcgfo8qa.constant({}));
  var fOverrides = $_6inazsx1jcgfo8uu.defaulted('overrides', $_ee1z6xwajcgfo8qa.constant({}));
  var requiredSpec = $_783jrjxgjcgfo8yn.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var externalSpec = $_783jrjxgjcgfo8yn.objOf([
    fFactory,
    fSchema,
    fName,
    fDefaults,
    fOverrides
  ]);
  var optionalSpec = $_783jrjxgjcgfo8yn.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var groupSpec = $_783jrjxgjcgfo8yn.objOf([
    fFactory,
    fSchema,
    fName,
    $_6inazsx1jcgfo8uu.strict('unit'),
    fPname,
    fDefaults,
    fOverrides
  ]);
  var asNamedPart = function (part) {
    return part.fold($_d7fxouw9jcgfo8q5.some, $_d7fxouw9jcgfo8q5.none, $_d7fxouw9jcgfo8q5.some, $_d7fxouw9jcgfo8q5.some);
  };
  var name$1 = function (part) {
    var get = function (data) {
      return data.name();
    };
    return part.fold(get, get, get, get);
  };
  var asCommon = function (part) {
    return part.fold($_ee1z6xwajcgfo8qa.identity, $_ee1z6xwajcgfo8qa.identity, $_ee1z6xwajcgfo8qa.identity, $_ee1z6xwajcgfo8qa.identity);
  };
  var convert = function (adtConstructor, partSpec) {
    return function (spec) {
      var data = $_783jrjxgjcgfo8yn.asStructOrDie('Converting part type', partSpec, spec);
      return adtConstructor(data);
    };
  };
  var $_cdrten10jjcgfo9qn = {
    required: convert(adt$2.required, requiredSpec),
    external: convert(adt$2.external, externalSpec),
    optional: convert(adt$2.optional, optionalSpec),
    group: convert(adt$2.group, groupSpec),
    asNamedPart: asNamedPart,
    name: name$1,
    asCommon: asCommon,
    original: $_ee1z6xwajcgfo8qa.constant('entirety')
  };

  var placeholder = 'placeholder';
  var adt$3 = $_eqsftbx3jcgfo8vg.generate([
    {
      single: [
        'required',
        'valueThunk'
      ]
    },
    {
      multiple: [
        'required',
        'valueThunks'
      ]
    }
  ]);
  var isSubstitute = function (uiType) {
    return $_3h0i9zw8jcgfo8px.contains([placeholder], uiType);
  };
  var subPlaceholder = function (owner, detail, compSpec, placeholders) {
    if (owner.exists(function (o) {
        return o !== compSpec.owner;
      }))
      return adt$3.single(true, $_ee1z6xwajcgfo8qa.constant(compSpec));
    return $_8fkfzex5jcgfo8wf.readOptFrom(placeholders, compSpec.name).fold(function () {
      throw new Error('Unknown placeholder component: ' + compSpec.name + '\nKnown: [' + $_a7hrnswzjcgfo8tz.keys(placeholders) + ']\nNamespace: ' + owner.getOr('none') + '\nSpec: ' + $_8pq9zfxejcgfo8yf.stringify(compSpec, null, 2));
    }, function (newSpec) {
      return newSpec.replace();
    });
  };
  var scan = function (owner, detail, compSpec, placeholders) {
    if (compSpec.uiType === placeholder)
      return subPlaceholder(owner, detail, compSpec, placeholders);
    else
      return adt$3.single(false, $_ee1z6xwajcgfo8qa.constant(compSpec));
  };
  var substitute = function (owner, detail, compSpec, placeholders) {
    var base = scan(owner, detail, compSpec, placeholders);
    return base.fold(function (req, valueThunk) {
      var value = valueThunk(detail, compSpec.config, compSpec.validated);
      var childSpecs = $_8fkfzex5jcgfo8wf.readOptFrom(value, 'components').getOr([]);
      var substituted = $_3h0i9zw8jcgfo8px.bind(childSpecs, function (c) {
        return substitute(owner, detail, c, placeholders);
      });
      return [$_au1coewxjcgfo8tp.deepMerge(value, { components: substituted })];
    }, function (req, valuesThunk) {
      var values = valuesThunk(detail, compSpec.config, compSpec.validated);
      return values;
    });
  };
  var substituteAll = function (owner, detail, components, placeholders) {
    return $_3h0i9zw8jcgfo8px.bind(components, function (c) {
      return substitute(owner, detail, c, placeholders);
    });
  };
  var oneReplace = function (label, replacements) {
    var called = false;
    var used = function () {
      return called;
    };
    var replace = function () {
      if (called === true)
        throw new Error('Trying to use the same placeholder more than once: ' + label);
      called = true;
      return replacements;
    };
    var required = function () {
      return replacements.fold(function (req, _) {
        return req;
      }, function (req, _) {
        return req;
      });
    };
    return {
      name: $_ee1z6xwajcgfo8qa.constant(label),
      required: required,
      used: used,
      replace: replace
    };
  };
  var substitutePlaces = function (owner, detail, components, placeholders) {
    var ps = $_a7hrnswzjcgfo8tz.map(placeholders, function (ph, name) {
      return oneReplace(name, ph);
    });
    var outcome = substituteAll(owner, detail, components, ps);
    $_a7hrnswzjcgfo8tz.each(ps, function (p) {
      if (p.used() === false && p.required()) {
        throw new Error('Placeholder: ' + p.name() + ' was not found in components list\nNamespace: ' + owner.getOr('none') + '\nComponents: ' + $_8pq9zfxejcgfo8yf.stringify(detail.components(), null, 2));
      }
    });
    return outcome;
  };
  var singleReplace = function (detail, p) {
    var replacement = p;
    return replacement.fold(function (req, valueThunk) {
      return [valueThunk(detail)];
    }, function (req, valuesThunk) {
      return valuesThunk(detail);
    });
  };
  var $_png1f10kjcgfo9rb = {
    single: adt$3.single,
    multiple: adt$3.multiple,
    isSubstitute: isSubstitute,
    placeholder: $_ee1z6xwajcgfo8qa.constant(placeholder),
    substituteAll: substituteAll,
    substitutePlaces: substitutePlaces,
    singleReplace: singleReplace
  };

  var combine = function (detail, data, partSpec, partValidated) {
    var spec = partSpec;
    return $_au1coewxjcgfo8tp.deepMerge(data.defaults()(detail, partSpec, partValidated), partSpec, { uid: detail.partUids()[data.name()] }, data.overrides()(detail, partSpec, partValidated), { 'debug.sketcher': $_8fkfzex5jcgfo8wf.wrap('part-' + data.name(), spec) });
  };
  var subs = function (owner, detail, parts) {
    var internals = {};
    var externals = {};
    $_3h0i9zw8jcgfo8px.each(parts, function (part) {
      part.fold(function (data) {
        internals[data.pname()] = $_png1f10kjcgfo9rb.single(true, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        var partSpec = detail.parts()[data.name()]();
        externals[data.name()] = $_ee1z6xwajcgfo8qa.constant(combine(detail, data, partSpec[$_cdrten10jjcgfo9qn.original()]()));
      }, function (data) {
        internals[data.pname()] = $_png1f10kjcgfo9rb.single(false, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        internals[data.pname()] = $_png1f10kjcgfo9rb.multiple(true, function (detail, _partSpec, _partValidated) {
          var units = detail[data.name()]();
          return $_3h0i9zw8jcgfo8px.map(units, function (u) {
            return data.factory().sketch($_au1coewxjcgfo8tp.deepMerge(data.defaults()(detail, u), u, data.overrides()(detail, u)));
          });
        });
      });
    });
    return {
      internals: $_ee1z6xwajcgfo8qa.constant(internals),
      externals: $_ee1z6xwajcgfo8qa.constant(externals)
    };
  };
  var $_477jg210ijcgfo9q9 = { subs: subs };

  var generate$2 = function (owner, parts) {
    var r = {};
    $_3h0i9zw8jcgfo8px.each(parts, function (part) {
      $_cdrten10jjcgfo9qn.asNamedPart(part).each(function (np) {
        var g = doGenerateOne(owner, np.pname());
        r[np.name()] = function (config) {
          var validated = $_783jrjxgjcgfo8yn.asRawOrDie('Part: ' + np.name() + ' in ' + owner, $_783jrjxgjcgfo8yn.objOf(np.schema()), config);
          return $_au1coewxjcgfo8tp.deepMerge(g, {
            config: config,
            validated: validated
          });
        };
      });
    });
    return r;
  };
  var doGenerateOne = function (owner, pname) {
    return {
      uiType: $_png1f10kjcgfo9rb.placeholder(),
      owner: owner,
      name: pname
    };
  };
  var generateOne = function (owner, pname, config) {
    return {
      uiType: $_png1f10kjcgfo9rb.placeholder(),
      owner: owner,
      name: pname,
      config: config,
      validated: {}
    };
  };
  var schemas = function (parts) {
    return $_3h0i9zw8jcgfo8px.bind(parts, function (part) {
      return part.fold($_d7fxouw9jcgfo8q5.none, $_d7fxouw9jcgfo8q5.some, $_d7fxouw9jcgfo8q5.none, $_d7fxouw9jcgfo8q5.none).map(function (data) {
        return $_6inazsx1jcgfo8uu.strictObjOf(data.name(), data.schema().concat([$_dkk53lysjcgfo983.snapshot($_cdrten10jjcgfo9qn.original())]));
      }).toArray();
    });
  };
  var names = function (parts) {
    return $_3h0i9zw8jcgfo8px.map(parts, $_cdrten10jjcgfo9qn.name);
  };
  var substitutes = function (owner, detail, parts) {
    return $_477jg210ijcgfo9q9.subs(owner, detail, parts);
  };
  var components = function (owner, detail, internals) {
    return $_png1f10kjcgfo9rb.substitutePlaces($_d7fxouw9jcgfo8q5.some(owner), detail, detail.components(), internals);
  };
  var getPart = function (component, detail, partKey) {
    var uid = detail.partUids()[partKey];
    return component.getSystem().getByUid(uid).toOption();
  };
  var getPartOrDie = function (component, detail, partKey) {
    return getPart(component, detail, partKey).getOrDie('Could not find part: ' + partKey);
  };
  var getParts = function (component, detail, partKeys) {
    var r = {};
    var uids = detail.partUids();
    var system = component.getSystem();
    $_3h0i9zw8jcgfo8px.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]);
    });
    return $_a7hrnswzjcgfo8tz.map(r, $_ee1z6xwajcgfo8qa.constant);
  };
  var getAllParts = function (component, detail) {
    var system = component.getSystem();
    return $_a7hrnswzjcgfo8tz.map(detail.partUids(), function (pUid, k) {
      return $_ee1z6xwajcgfo8qa.constant(system.getByUid(pUid));
    });
  };
  var getPartsOrDie = function (component, detail, partKeys) {
    var r = {};
    var uids = detail.partUids();
    var system = component.getSystem();
    $_3h0i9zw8jcgfo8px.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]).getOrDie();
    });
    return $_a7hrnswzjcgfo8tz.map(r, $_ee1z6xwajcgfo8qa.constant);
  };
  var defaultUids = function (baseUid, partTypes) {
    var partNames = names(partTypes);
    return $_8fkfzex5jcgfo8wf.wrapAll($_3h0i9zw8jcgfo8px.map(partNames, function (pn) {
      return {
        key: pn,
        value: baseUid + '-' + pn
      };
    }));
  };
  var defaultUidsSchema = function (partTypes) {
    return $_6inazsx1jcgfo8uu.field('partUids', 'partUids', $_d0l63jx2jcgfo8v5.mergeWithThunk(function (spec) {
      return defaultUids(spec.uid, partTypes);
    }), $_783jrjxgjcgfo8yn.anyValue());
  };
  var $_15kt8q10hjcgfo9pa = {
    generate: generate$2,
    generateOne: generateOne,
    schemas: schemas,
    names: names,
    substitutes: substitutes,
    components: components,
    defaultUids: defaultUids,
    defaultUidsSchema: defaultUidsSchema,
    getAllParts: getAllParts,
    getPart: getPart,
    getPartOrDie: getPartOrDie,
    getParts: getParts,
    getPartsOrDie: getPartsOrDie
  };

  var prefix$2 = 'alloy-id-';
  var idAttr$1 = 'data-alloy-id';
  var $_a3vcbb10mjcgfo9sn = {
    prefix: $_ee1z6xwajcgfo8qa.constant(prefix$2),
    idAttr: $_ee1z6xwajcgfo8qa.constant(idAttr$1)
  };

  var prefix$1 = $_a3vcbb10mjcgfo9sn.prefix();
  var idAttr = $_a3vcbb10mjcgfo9sn.idAttr();
  var write = function (label, elem) {
    var id = $_gcx8v510fjcgfo9ox.generate(prefix$1 + label);
    $_8ut06dxvjcgfo912.set(elem, idAttr, id);
    return id;
  };
  var writeOnly = function (elem, uid) {
    $_8ut06dxvjcgfo912.set(elem, idAttr, uid);
  };
  var read$2 = function (elem) {
    var id = $_bmv0faxwjcgfo91e.isElement(elem) ? $_8ut06dxvjcgfo912.get(elem, idAttr) : null;
    return $_d7fxouw9jcgfo8q5.from(id);
  };
  var find$3 = function (container, id) {
    return $_dka7lkzljcgfo9fe.descendant(container, id);
  };
  var generate$3 = function (prefix) {
    return $_gcx8v510fjcgfo9ox.generate(prefix);
  };
  var revoke = function (elem) {
    $_8ut06dxvjcgfo912.remove(elem, idAttr);
  };
  var $_77g8b110ljcgfo9s0 = {
    revoke: revoke,
    write: write,
    writeOnly: writeOnly,
    read: read$2,
    find: find$3,
    generate: generate$3,
    attribute: $_ee1z6xwajcgfo8qa.constant(idAttr)
  };

  var getPartsSchema = function (partNames, _optPartNames, _owner) {
    var owner = _owner !== undefined ? _owner : 'Unknown owner';
    var fallbackThunk = function () {
      return [$_dkk53lysjcgfo983.output('partUids', {})];
    };
    var optPartNames = _optPartNames !== undefined ? _optPartNames : fallbackThunk();
    if (partNames.length === 0 && optPartNames.length === 0)
      return fallbackThunk();
    var partsSchema = $_6inazsx1jcgfo8uu.strictObjOf('parts', $_3h0i9zw8jcgfo8px.flatten([
      $_3h0i9zw8jcgfo8px.map(partNames, $_6inazsx1jcgfo8uu.strict),
      $_3h0i9zw8jcgfo8px.map(optPartNames, function (optPart) {
        return $_6inazsx1jcgfo8uu.defaulted(optPart, $_png1f10kjcgfo9rb.single(false, function () {
          throw new Error('The optional part: ' + optPart + ' was not specified in the config, but it was used in components');
        }));
      })
    ]));
    var partUidsSchema = $_6inazsx1jcgfo8uu.state('partUids', function (spec) {
      if (!$_8fkfzex5jcgfo8wf.hasKey(spec, 'parts')) {
        throw new Error('Part uid definition for owner: ' + owner + ' requires "parts"\nExpected parts: ' + partNames.join(', ') + '\nSpec: ' + $_8pq9zfxejcgfo8yf.stringify(spec, null, 2));
      }
      var uids = $_a7hrnswzjcgfo8tz.map(spec.parts, function (v, k) {
        return $_8fkfzex5jcgfo8wf.readOptFrom(v, 'uid').getOrThunk(function () {
          return spec.uid + '-' + k;
        });
      });
      return uids;
    });
    return [
      partsSchema,
      partUidsSchema
    ];
  };
  var base$1 = function (label, partSchemas, partUidsSchemas, spec) {
    var ps = partSchemas.length > 0 ? [$_6inazsx1jcgfo8uu.strictObjOf('parts', partSchemas)] : [];
    return ps.concat([
      $_6inazsx1jcgfo8uu.strict('uid'),
      $_6inazsx1jcgfo8uu.defaulted('dom', {}),
      $_6inazsx1jcgfo8uu.defaulted('components', []),
      $_dkk53lysjcgfo983.snapshot('originalSpec'),
      $_6inazsx1jcgfo8uu.defaulted('debug.sketcher', {})
    ]).concat(partUidsSchemas);
  };
  var asRawOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, spec, partUidsSchemas);
    return $_783jrjxgjcgfo8yn.asRawOrDie(label + ' [SpecSchema]', $_783jrjxgjcgfo8yn.objOfOnly(baseS.concat(schema)), spec);
  };
  var asStructOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, partUidsSchemas, spec);
    return $_783jrjxgjcgfo8yn.asStructOrDie(label + ' [SpecSchema]', $_783jrjxgjcgfo8yn.objOfOnly(baseS.concat(schema)), spec);
  };
  var extend = function (builder, original, nu) {
    var newSpec = $_au1coewxjcgfo8tp.deepMerge(original, nu);
    return builder(newSpec);
  };
  var addBehaviours = function (original, behaviours) {
    return $_au1coewxjcgfo8tp.deepMerge(original, behaviours);
  };
  var $_7v0dx110njcgfo9ss = {
    asRawOrDie: asRawOrDie$1,
    asStructOrDie: asStructOrDie$1,
    addBehaviours: addBehaviours,
    getPartsSchema: getPartsSchema,
    extend: extend
  };

  var single$1 = function (owner, schema, factory, spec) {
    var specWithUid = supplyUid(spec);
    var detail = $_7v0dx110njcgfo9ss.asStructOrDie(owner, schema, specWithUid, [], []);
    return $_au1coewxjcgfo8tp.deepMerge(factory(detail, specWithUid), { 'debug.sketcher': $_8fkfzex5jcgfo8wf.wrap(owner, spec) });
  };
  var composite$1 = function (owner, schema, partTypes, factory, spec) {
    var specWithUid = supplyUid(spec);
    var partSchemas = $_15kt8q10hjcgfo9pa.schemas(partTypes);
    var partUidsSchema = $_15kt8q10hjcgfo9pa.defaultUidsSchema(partTypes);
    var detail = $_7v0dx110njcgfo9ss.asStructOrDie(owner, schema, specWithUid, partSchemas, [partUidsSchema]);
    var subs = $_15kt8q10hjcgfo9pa.substitutes(owner, detail, partTypes);
    var components = $_15kt8q10hjcgfo9pa.components(owner, detail, subs.internals());
    return $_au1coewxjcgfo8tp.deepMerge(factory(detail, components, specWithUid, subs.externals()), { 'debug.sketcher': $_8fkfzex5jcgfo8wf.wrap(owner, spec) });
  };
  var supplyUid = function (spec) {
    return $_au1coewxjcgfo8tp.deepMerge({ uid: $_77g8b110ljcgfo9s0.generate('uid') }, spec);
  };
  var $_dhvo4c10gjcgfo9p0 = {
    supplyUid: supplyUid,
    single: single$1,
    composite: composite$1
  };

  var singleSchema = $_783jrjxgjcgfo8yn.objOfOnly([
    $_6inazsx1jcgfo8uu.strict('name'),
    $_6inazsx1jcgfo8uu.strict('factory'),
    $_6inazsx1jcgfo8uu.strict('configFields'),
    $_6inazsx1jcgfo8uu.defaulted('apis', {}),
    $_6inazsx1jcgfo8uu.defaulted('extraApis', {})
  ]);
  var compositeSchema = $_783jrjxgjcgfo8yn.objOfOnly([
    $_6inazsx1jcgfo8uu.strict('name'),
    $_6inazsx1jcgfo8uu.strict('factory'),
    $_6inazsx1jcgfo8uu.strict('configFields'),
    $_6inazsx1jcgfo8uu.strict('partFields'),
    $_6inazsx1jcgfo8uu.defaulted('apis', {}),
    $_6inazsx1jcgfo8uu.defaulted('extraApis', {})
  ]);
  var single = function (rawConfig) {
    var config = $_783jrjxgjcgfo8yn.asRawOrDie('Sketcher for ' + rawConfig.name, singleSchema, rawConfig);
    var sketch = function (spec) {
      return $_dhvo4c10gjcgfo9p0.single(config.name, config.configFields, config.factory, spec);
    };
    var apis = $_a7hrnswzjcgfo8tz.map(config.apis, $_c7yo6t10ejcgfo9oj.makeApi);
    var extraApis = $_a7hrnswzjcgfo8tz.map(config.extraApis, function (f, k) {
      return $_2xvwuwxijcgfo8z2.markAsExtraApi(f, k);
    });
    return $_au1coewxjcgfo8tp.deepMerge({
      name: $_ee1z6xwajcgfo8qa.constant(config.name),
      partFields: $_ee1z6xwajcgfo8qa.constant([]),
      configFields: $_ee1z6xwajcgfo8qa.constant(config.configFields),
      sketch: sketch
    }, apis, extraApis);
  };
  var composite = function (rawConfig) {
    var config = $_783jrjxgjcgfo8yn.asRawOrDie('Sketcher for ' + rawConfig.name, compositeSchema, rawConfig);
    var sketch = function (spec) {
      return $_dhvo4c10gjcgfo9p0.composite(config.name, config.configFields, config.partFields, config.factory, spec);
    };
    var parts = $_15kt8q10hjcgfo9pa.generate(config.name, config.partFields);
    var apis = $_a7hrnswzjcgfo8tz.map(config.apis, $_c7yo6t10ejcgfo9oj.makeApi);
    var extraApis = $_a7hrnswzjcgfo8tz.map(config.extraApis, function (f, k) {
      return $_2xvwuwxijcgfo8z2.markAsExtraApi(f, k);
    });
    return $_au1coewxjcgfo8tp.deepMerge({
      name: $_ee1z6xwajcgfo8qa.constant(config.name),
      partFields: $_ee1z6xwajcgfo8qa.constant(config.partFields),
      configFields: $_ee1z6xwajcgfo8qa.constant(config.configFields),
      sketch: sketch,
      parts: $_ee1z6xwajcgfo8qa.constant(parts)
    }, apis, extraApis);
  };
  var $_8307zi10djcgfo9nz = {
    single: single,
    composite: composite
  };

  var events$4 = function (optAction) {
    var executeHandler = function (action) {
      return $_de0ow7w5jcgfo8ot.run($_1snegiwvjcgfo8tb.execute(), function (component, simulatedEvent) {
        action(component);
        simulatedEvent.stop();
      });
    };
    var onClick = function (component, simulatedEvent) {
      simulatedEvent.stop();
      $_4x498fwujcgfo8sy.emitExecute(component);
    };
    var onMousedown = function (component, simulatedEvent) {
      simulatedEvent.cut();
    };
    var pointerEvents = $_6o4pdywfjcgfo8qq.detect().deviceType.isTouch() ? [$_de0ow7w5jcgfo8ot.run($_1snegiwvjcgfo8tb.tap(), onClick)] : [
      $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.click(), onClick),
      $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.mousedown(), onMousedown)
    ];
    return $_de0ow7w5jcgfo8ot.derive($_3h0i9zw8jcgfo8px.flatten([
      optAction.map(executeHandler).toArray(),
      pointerEvents
    ]));
  };
  var $_9cebe310ojcgfo9ti = { events: events$4 };

  var factory = function (detail, spec) {
    var events = $_9cebe310ojcgfo9ti.events(detail.action());
    var optType = $_8fkfzex5jcgfo8wf.readOptFrom(detail.dom(), 'attributes').bind($_8fkfzex5jcgfo8wf.readOpt('type'));
    var optTag = $_8fkfzex5jcgfo8wf.readOptFrom(detail.dom(), 'tag');
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: detail.components(),
      events: events,
      behaviours: $_au1coewxjcgfo8tp.deepMerge($_395jq4w3jcgfo8n1.derive([
        Focusing.config({}),
        Keying.config({
          mode: 'execution',
          useSpace: true,
          useEnter: true
        })
      ]), $_70kbdh10cjcgfo9nm.get(detail.buttonBehaviours())),
      domModification: {
        attributes: $_au1coewxjcgfo8tp.deepMerge(optType.fold(function () {
          return optTag.is('button') ? { type: 'button' } : {};
        }, function (t) {
          return {};
        }), { role: detail.role().getOr('button') })
      },
      eventOrder: detail.eventOrder()
    };
  };
  var Button = $_8307zi10djcgfo9nz.single({
    name: 'Button',
    factory: factory,
    configFields: [
      $_6inazsx1jcgfo8uu.defaulted('uid', undefined),
      $_6inazsx1jcgfo8uu.strict('dom'),
      $_6inazsx1jcgfo8uu.defaulted('components', []),
      $_70kbdh10cjcgfo9nm.field('buttonBehaviours', [
        Focusing,
        Keying
      ]),
      $_6inazsx1jcgfo8uu.option('action'),
      $_6inazsx1jcgfo8uu.option('role'),
      $_6inazsx1jcgfo8uu.defaulted('eventOrder', {})
    ]
  });

  var getAttrs = function (elem) {
    var attributes = elem.dom().attributes !== undefined ? elem.dom().attributes : [];
    return $_3h0i9zw8jcgfo8px.foldl(attributes, function (b, attr) {
      if (attr.name === 'class')
        return b;
      else
        return $_au1coewxjcgfo8tp.deepMerge(b, $_8fkfzex5jcgfo8wf.wrap(attr.name, attr.value));
    }, {});
  };
  var getClasses = function (elem) {
    return Array.prototype.slice.call(elem.dom().classList, 0);
  };
  var fromHtml$2 = function (html) {
    var elem = $_6rcvbhwsjcgfo8sm.fromHtml(html);
    var children = $_dd88k4y2jcgfo92t.children(elem);
    var attrs = getAttrs(elem);
    var classes = getClasses(elem);
    var contents = children.length === 0 ? {} : { innerHtml: $_8dqis5yajcgfo94u.get(elem) };
    return $_au1coewxjcgfo8tp.deepMerge({
      tag: $_bmv0faxwjcgfo91e.name(elem),
      classes: classes,
      attributes: attrs
    }, contents);
  };
  var sketch = function (sketcher, html, config) {
    return sketcher.sketch($_au1coewxjcgfo8tp.deepMerge({ dom: fromHtml$2(html) }, config));
  };
  var $_botiuj10qjcgfo9tz = {
    fromHtml: fromHtml$2,
    sketch: sketch
  };

  var dom$1 = function (rawHtml) {
    var html = $_g18n9xwojcgfo8s5.supplant(rawHtml, { prefix: $_3eky7iz0jcgfo9aj.prefix() });
    return $_botiuj10qjcgfo9tz.fromHtml(html);
  };
  var spec = function (rawHtml) {
    var sDom = dom$1(rawHtml);
    return { dom: sDom };
  };
  var $_3l4nzn10pjcgfo9tr = {
    dom: dom$1,
    spec: spec
  };

  var forToolbarCommand = function (editor, command) {
    return forToolbar(command, function () {
      editor.execCommand(command);
    }, {});
  };
  var getToggleBehaviours = function (command) {
    return $_395jq4w3jcgfo8n1.derive([
      Toggling.config({
        toggleClass: $_3eky7iz0jcgfo9aj.resolve('toolbar-button-selected'),
        toggleOnExecute: false,
        aria: { mode: 'pressed' }
      }),
      $_82uzw2yzjcgfo9ad.format(command, function (button, status) {
        var toggle = status ? Toggling.on : Toggling.off;
        toggle(button);
      })
    ]);
  };
  var forToolbarStateCommand = function (editor, command) {
    var extraBehaviours = getToggleBehaviours(command);
    return forToolbar(command, function () {
      editor.execCommand(command);
    }, extraBehaviours);
  };
  var forToolbarStateAction = function (editor, clazz, command, action) {
    var extraBehaviours = getToggleBehaviours(command);
    return forToolbar(clazz, action, extraBehaviours);
  };
  var forToolbar = function (clazz, action, extraBehaviours) {
    return Button.sketch({
      dom: $_3l4nzn10pjcgfo9tr.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-' + clazz + ' ${prefix}-icon"></span>'),
      action: action,
      buttonBehaviours: $_au1coewxjcgfo8tp.deepMerge($_395jq4w3jcgfo8n1.derive([Unselecting.config({})]), extraBehaviours)
    });
  };
  var $_16du12z1jcgfo9ar = {
    forToolbar: forToolbar,
    forToolbarCommand: forToolbarCommand,
    forToolbarStateAction: forToolbarStateAction,
    forToolbarStateCommand: forToolbarStateCommand
  };

  var reduceBy = function (value, min, max, step) {
    if (value < min)
      return value;
    else if (value > max)
      return max;
    else if (value === min)
      return min - 1;
    else
      return Math.max(min, value - step);
  };
  var increaseBy = function (value, min, max, step) {
    if (value > max)
      return value;
    else if (value < min)
      return min;
    else if (value === max)
      return max + 1;
    else
      return Math.min(max, value + step);
  };
  var capValue = function (value, min, max) {
    return Math.max(min, Math.min(max, value));
  };
  var snapValueOfX = function (bounds, value, min, max, step, snapStart) {
    return snapStart.fold(function () {
      var initValue = value - min;
      var extraValue = Math.round(initValue / step) * step;
      return capValue(min + extraValue, min - 1, max + 1);
    }, function (start) {
      var remainder = (value - start) % step;
      var adjustment = Math.round(remainder / step);
      var rawSteps = Math.floor((value - start) / step);
      var maxSteps = Math.floor((max - start) / step);
      var numSteps = Math.min(maxSteps, rawSteps + adjustment);
      var r = start + numSteps * step;
      return Math.max(start, r);
    });
  };
  var findValueOfX = function (bounds, min, max, xValue, step, snapToGrid, snapStart) {
    var range = max - min;
    if (xValue < bounds.left)
      return min - 1;
    else if (xValue > bounds.right)
      return max + 1;
    else {
      var xOffset = Math.min(bounds.right, Math.max(xValue, bounds.left)) - bounds.left;
      var newValue = capValue(xOffset / bounds.width * range + min, min - 1, max + 1);
      var roundedValue = Math.round(newValue);
      return snapToGrid && newValue >= min && newValue <= max ? snapValueOfX(bounds, newValue, min, max, step, snapStart) : roundedValue;
    }
  };
  var $_evb52910vjcgfo9w5 = {
    reduceBy: reduceBy,
    increaseBy: increaseBy,
    findValueOfX: findValueOfX
  };

  var changeEvent = 'slider.change.value';
  var isTouch$1 = $_6o4pdywfjcgfo8qq.detect().deviceType.isTouch();
  var getEventSource = function (simulatedEvent) {
    var evt = simulatedEvent.event().raw();
    if (isTouch$1 && evt.touches !== undefined && evt.touches.length === 1)
      return $_d7fxouw9jcgfo8q5.some(evt.touches[0]);
    else if (isTouch$1 && evt.touches !== undefined)
      return $_d7fxouw9jcgfo8q5.none();
    else if (!isTouch$1 && evt.clientX !== undefined)
      return $_d7fxouw9jcgfo8q5.some(evt);
    else
      return $_d7fxouw9jcgfo8q5.none();
  };
  var getEventX = function (simulatedEvent) {
    var spot = getEventSource(simulatedEvent);
    return spot.map(function (s) {
      return s.clientX;
    });
  };
  var fireChange = function (component, value) {
    $_4x498fwujcgfo8sy.emitWith(component, changeEvent, { value: value });
  };
  var moveRightFromLedge = function (ledge, detail) {
    fireChange(ledge, detail.min());
  };
  var moveLeftFromRedge = function (redge, detail) {
    fireChange(redge, detail.max());
  };
  var setToRedge = function (redge, detail) {
    fireChange(redge, detail.max() + 1);
  };
  var setToLedge = function (ledge, detail) {
    fireChange(ledge, detail.min() - 1);
  };
  var setToX = function (spectrum, spectrumBounds, detail, xValue) {
    var value = $_evb52910vjcgfo9w5.findValueOfX(spectrumBounds, detail.min(), detail.max(), xValue, detail.stepSize(), detail.snapToGrid(), detail.snapStart());
    fireChange(spectrum, value);
  };
  var setXFromEvent = function (spectrum, detail, spectrumBounds, simulatedEvent) {
    return getEventX(simulatedEvent).map(function (xValue) {
      setToX(spectrum, spectrumBounds, detail, xValue);
      return xValue;
    });
  };
  var moveLeft$4 = function (spectrum, detail) {
    var newValue = $_evb52910vjcgfo9w5.reduceBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var moveRight$4 = function (spectrum, detail) {
    var newValue = $_evb52910vjcgfo9w5.increaseBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var $_65n6i010ujcgfo9vs = {
    setXFromEvent: setXFromEvent,
    setToLedge: setToLedge,
    setToRedge: setToRedge,
    moveLeftFromRedge: moveLeftFromRedge,
    moveRightFromLedge: moveRightFromLedge,
    moveLeft: moveLeft$4,
    moveRight: moveRight$4,
    changeEvent: $_ee1z6xwajcgfo8qa.constant(changeEvent)
  };

  var platform = $_6o4pdywfjcgfo8qq.detect();
  var isTouch = platform.deviceType.isTouch();
  var edgePart = function (name, action) {
    return $_cdrten10jjcgfo9qn.optional({
      name: '' + name + '-edge',
      overrides: function (detail) {
        var touchEvents = $_de0ow7w5jcgfo8ot.derive([$_de0ow7w5jcgfo8ot.runActionExtra($_8bjxvowwjcgfo8tj.touchstart(), action, [detail])]);
        var mouseEvents = $_de0ow7w5jcgfo8ot.derive([
          $_de0ow7w5jcgfo8ot.runActionExtra($_8bjxvowwjcgfo8tj.mousedown(), action, [detail]),
          $_de0ow7w5jcgfo8ot.runActionExtra($_8bjxvowwjcgfo8tj.mousemove(), function (l, det) {
            if (det.mouseIsDown().get())
              action(l, det);
          }, [detail])
        ]);
        return { events: isTouch ? touchEvents : mouseEvents };
      }
    });
  };
  var ledgePart = edgePart('left', $_65n6i010ujcgfo9vs.setToLedge);
  var redgePart = edgePart('right', $_65n6i010ujcgfo9vs.setToRedge);
  var thumbPart = $_cdrten10jjcgfo9qn.required({
    name: 'thumb',
    defaults: $_ee1z6xwajcgfo8qa.constant({ dom: { styles: { position: 'absolute' } } }),
    overrides: function (detail) {
      return {
        events: $_de0ow7w5jcgfo8ot.derive([
          $_de0ow7w5jcgfo8ot.redirectToPart($_8bjxvowwjcgfo8tj.touchstart(), detail, 'spectrum'),
          $_de0ow7w5jcgfo8ot.redirectToPart($_8bjxvowwjcgfo8tj.touchmove(), detail, 'spectrum'),
          $_de0ow7w5jcgfo8ot.redirectToPart($_8bjxvowwjcgfo8tj.touchend(), detail, 'spectrum')
        ])
      };
    }
  });
  var spectrumPart = $_cdrten10jjcgfo9qn.required({
    schema: [$_6inazsx1jcgfo8uu.state('mouseIsDown', function () {
        return Cell(false);
      })],
    name: 'spectrum',
    overrides: function (detail) {
      var moveToX = function (spectrum, simulatedEvent) {
        var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
        $_65n6i010ujcgfo9vs.setXFromEvent(spectrum, detail, spectrumBounds, simulatedEvent);
      };
      var touchEvents = $_de0ow7w5jcgfo8ot.derive([
        $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.touchstart(), moveToX),
        $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.touchmove(), moveToX)
      ]);
      var mouseEvents = $_de0ow7w5jcgfo8ot.derive([
        $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.mousedown(), moveToX),
        $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.mousemove(), function (spectrum, se) {
          if (detail.mouseIsDown().get())
            moveToX(spectrum, se);
        })
      ]);
      return {
        behaviours: $_395jq4w3jcgfo8n1.derive(isTouch ? [] : [
          Keying.config({
            mode: 'special',
            onLeft: function (spectrum) {
              $_65n6i010ujcgfo9vs.moveLeft(spectrum, detail);
              return $_d7fxouw9jcgfo8q5.some(true);
            },
            onRight: function (spectrum) {
              $_65n6i010ujcgfo9vs.moveRight(spectrum, detail);
              return $_d7fxouw9jcgfo8q5.some(true);
            }
          }),
          Focusing.config({})
        ]),
        events: isTouch ? touchEvents : mouseEvents
      };
    }
  });
  var SliderParts = [
    ledgePart,
    redgePart,
    thumbPart,
    spectrumPart
  ];

  var onLoad$1 = function (component, repConfig, repState) {
    repConfig.store().manager().onLoad(component, repConfig, repState);
  };
  var onUnload = function (component, repConfig, repState) {
    repConfig.store().manager().onUnload(component, repConfig, repState);
  };
  var setValue = function (component, repConfig, repState, data) {
    repConfig.store().manager().setValue(component, repConfig, repState, data);
  };
  var getValue = function (component, repConfig, repState) {
    return repConfig.store().manager().getValue(component, repConfig, repState);
  };
  var $_ya9ep10zjcgfo9ws = {
    onLoad: onLoad$1,
    onUnload: onUnload,
    setValue: setValue,
    getValue: getValue
  };

  var events$5 = function (repConfig, repState) {
    var es = repConfig.resetOnDom() ? [
      $_de0ow7w5jcgfo8ot.runOnAttached(function (comp, se) {
        $_ya9ep10zjcgfo9ws.onLoad(comp, repConfig, repState);
      }),
      $_de0ow7w5jcgfo8ot.runOnDetached(function (comp, se) {
        $_ya9ep10zjcgfo9ws.onUnload(comp, repConfig, repState);
      })
    ] : [$_7cgou0w4jcgfo8nu.loadEvent(repConfig, repState, $_ya9ep10zjcgfo9ws.onLoad)];
    return $_de0ow7w5jcgfo8ot.derive(es);
  };
  var $_6vajrs10yjcgfo9wq = { events: events$5 };

  var memory = function () {
    var data = Cell(null);
    var readState = function () {
      return {
        mode: 'memory',
        value: data.get()
      };
    };
    var isNotSet = function () {
      return data.get() === null;
    };
    var clear = function () {
      data.set(null);
    };
    return BehaviourState({
      set: data.set,
      get: data.get,
      isNotSet: isNotSet,
      clear: clear,
      readState: readState
    });
  };
  var manual = function () {
    var readState = function () {
    };
    return BehaviourState({ readState: readState });
  };
  var dataset = function () {
    var data = Cell({});
    var readState = function () {
      return {
        mode: 'dataset',
        dataset: data.get()
      };
    };
    return BehaviourState({
      readState: readState,
      set: data.set,
      get: data.get
    });
  };
  var init$2 = function (spec) {
    return spec.store().manager().state(spec);
  };
  var $_z8we7112jcgfo9xc = {
    memory: memory,
    dataset: dataset,
    manual: manual,
    init: init$2
  };

  var setValue$1 = function (component, repConfig, repState, data) {
    var dataKey = repConfig.store().getDataKey();
    repState.set({});
    repConfig.store().setData()(component, data);
    repConfig.onSetValue()(component, data);
  };
  var getValue$1 = function (component, repConfig, repState) {
    var key = repConfig.store().getDataKey()(component);
    var dataset = repState.get();
    return $_8fkfzex5jcgfo8wf.readOptFrom(dataset, key).fold(function () {
      return repConfig.store().getFallbackEntry()(key);
    }, function (data) {
      return data;
    });
  };
  var onLoad$2 = function (component, repConfig, repState) {
    repConfig.store().initialValue().each(function (data) {
      setValue$1(component, repConfig, repState, data);
    });
  };
  var onUnload$1 = function (component, repConfig, repState) {
    repState.set({});
  };
  var DatasetStore = [
    $_6inazsx1jcgfo8uu.option('initialValue'),
    $_6inazsx1jcgfo8uu.strict('getFallbackEntry'),
    $_6inazsx1jcgfo8uu.strict('getDataKey'),
    $_6inazsx1jcgfo8uu.strict('setData'),
    $_dkk53lysjcgfo983.output('manager', {
      setValue: setValue$1,
      getValue: getValue$1,
      onLoad: onLoad$2,
      onUnload: onUnload$1,
      state: $_z8we7112jcgfo9xc.dataset
    })
  ];

  var getValue$2 = function (component, repConfig, repState) {
    return repConfig.store().getValue()(component);
  };
  var setValue$2 = function (component, repConfig, repState, data) {
    repConfig.store().setValue()(component, data);
    repConfig.onSetValue()(component, data);
  };
  var onLoad$3 = function (component, repConfig, repState) {
    repConfig.store().initialValue().each(function (data) {
      repConfig.store().setValue()(component, data);
    });
  };
  var ManualStore = [
    $_6inazsx1jcgfo8uu.strict('getValue'),
    $_6inazsx1jcgfo8uu.defaulted('setValue', $_ee1z6xwajcgfo8qa.noop),
    $_6inazsx1jcgfo8uu.option('initialValue'),
    $_dkk53lysjcgfo983.output('manager', {
      setValue: setValue$2,
      getValue: getValue$2,
      onLoad: onLoad$3,
      onUnload: $_ee1z6xwajcgfo8qa.noop,
      state: $_bjozj5xpjcgfo90f.init
    })
  ];

  var setValue$3 = function (component, repConfig, repState, data) {
    repState.set(data);
    repConfig.onSetValue()(component, data);
  };
  var getValue$3 = function (component, repConfig, repState) {
    return repState.get();
  };
  var onLoad$4 = function (component, repConfig, repState) {
    repConfig.store().initialValue().each(function (initVal) {
      if (repState.isNotSet())
        repState.set(initVal);
    });
  };
  var onUnload$2 = function (component, repConfig, repState) {
    repState.clear();
  };
  var MemoryStore = [
    $_6inazsx1jcgfo8uu.option('initialValue'),
    $_dkk53lysjcgfo983.output('manager', {
      setValue: setValue$3,
      getValue: getValue$3,
      onLoad: onLoad$4,
      onUnload: onUnload$2,
      state: $_z8we7112jcgfo9xc.memory
    })
  ];

  var RepresentSchema = [
    $_6inazsx1jcgfo8uu.defaultedOf('store', { mode: 'memory' }, $_783jrjxgjcgfo8yn.choose('mode', {
      memory: MemoryStore,
      manual: ManualStore,
      dataset: DatasetStore
    })),
    $_dkk53lysjcgfo983.onHandler('onSetValue'),
    $_6inazsx1jcgfo8uu.defaulted('resetOnDom', false)
  ];

  var me = $_395jq4w3jcgfo8n1.create({
    fields: RepresentSchema,
    name: 'representing',
    active: $_6vajrs10yjcgfo9wq,
    apis: $_ya9ep10zjcgfo9ws,
    extra: {
      setValueFrom: function (component, source) {
        var value = me.getValue(source);
        me.setValue(component, value);
      }
    },
    state: $_z8we7112jcgfo9xc
  });

  var isTouch$2 = $_6o4pdywfjcgfo8qq.detect().deviceType.isTouch();
  var SliderSchema = [
    $_6inazsx1jcgfo8uu.strict('min'),
    $_6inazsx1jcgfo8uu.strict('max'),
    $_6inazsx1jcgfo8uu.defaulted('stepSize', 1),
    $_6inazsx1jcgfo8uu.defaulted('onChange', $_ee1z6xwajcgfo8qa.noop),
    $_6inazsx1jcgfo8uu.defaulted('onInit', $_ee1z6xwajcgfo8qa.noop),
    $_6inazsx1jcgfo8uu.defaulted('onDragStart', $_ee1z6xwajcgfo8qa.noop),
    $_6inazsx1jcgfo8uu.defaulted('onDragEnd', $_ee1z6xwajcgfo8qa.noop),
    $_6inazsx1jcgfo8uu.defaulted('snapToGrid', false),
    $_6inazsx1jcgfo8uu.option('snapStart'),
    $_6inazsx1jcgfo8uu.strict('getInitialValue'),
    $_70kbdh10cjcgfo9nm.field('sliderBehaviours', [
      Keying,
      me
    ]),
    $_6inazsx1jcgfo8uu.state('value', function (spec) {
      return Cell(spec.min);
    })
  ].concat(!isTouch$2 ? [$_6inazsx1jcgfo8uu.state('mouseIsDown', function () {
      return Cell(false);
    })] : []);

  var api$1 = Dimension('width', function (element) {
    return element.dom().offsetWidth;
  });
  var set$4 = function (element, h) {
    api$1.set(element, h);
  };
  var get$6 = function (element) {
    return api$1.get(element);
  };
  var getOuter$2 = function (element) {
    return api$1.getOuter(element);
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
    var absMax = api$1.max(element, value, inclusions);
    $_9qule1zrjcgfo9ge.set(element, 'max-width', absMax + 'px');
  };
  var $_2kwnrj116jcgfo9yt = {
    set: set$4,
    get: get$6,
    getOuter: getOuter$2,
    setMax: setMax$1
  };

  var isTouch$3 = $_6o4pdywfjcgfo8qq.detect().deviceType.isTouch();
  var sketch$2 = function (detail, components, spec, externals) {
    var range = detail.max() - detail.min();
    var getXCentre = function (component) {
      var rect = component.element().dom().getBoundingClientRect();
      return (rect.left + rect.right) / 2;
    };
    var getThumb = function (component) {
      return $_15kt8q10hjcgfo9pa.getPartOrDie(component, detail, 'thumb');
    };
    var getXOffset = function (slider, spectrumBounds, detail) {
      var v = detail.value().get();
      if (v < detail.min()) {
        return $_15kt8q10hjcgfo9pa.getPart(slider, detail, 'left-edge').fold(function () {
          return 0;
        }, function (ledge) {
          return getXCentre(ledge) - spectrumBounds.left;
        });
      } else if (v > detail.max()) {
        return $_15kt8q10hjcgfo9pa.getPart(slider, detail, 'right-edge').fold(function () {
          return spectrumBounds.width;
        }, function (redge) {
          return getXCentre(redge) - spectrumBounds.left;
        });
      } else {
        return (detail.value().get() - detail.min()) / range * spectrumBounds.width;
      }
    };
    var getXPos = function (slider) {
      var spectrum = $_15kt8q10hjcgfo9pa.getPartOrDie(slider, detail, 'spectrum');
      var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
      var sliderBounds = slider.element().dom().getBoundingClientRect();
      var xOffset = getXOffset(slider, spectrumBounds, detail);
      return spectrumBounds.left - sliderBounds.left + xOffset;
    };
    var refresh = function (component) {
      var pos = getXPos(component);
      var thumb = getThumb(component);
      var thumbRadius = $_2kwnrj116jcgfo9yt.get(thumb.element()) / 2;
      $_9qule1zrjcgfo9ge.set(thumb.element(), 'left', pos - thumbRadius + 'px');
    };
    var changeValue = function (component, newValue) {
      var oldValue = detail.value().get();
      var thumb = getThumb(component);
      if (oldValue !== newValue || $_9qule1zrjcgfo9ge.getRaw(thumb.element(), 'left').isNone()) {
        detail.value().set(newValue);
        refresh(component);
        detail.onChange()(component, thumb, newValue);
        return $_d7fxouw9jcgfo8q5.some(true);
      } else {
        return $_d7fxouw9jcgfo8q5.none();
      }
    };
    var resetToMin = function (slider) {
      changeValue(slider, detail.min());
    };
    var resetToMax = function (slider) {
      changeValue(slider, detail.max());
    };
    var uiEventsArr = isTouch$3 ? [
      $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.touchstart(), function (slider, simulatedEvent) {
        detail.onDragStart()(slider, getThumb(slider));
      }),
      $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.touchend(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
      })
    ] : [
      $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.mousedown(), function (slider, simulatedEvent) {
        simulatedEvent.stop();
        detail.onDragStart()(slider, getThumb(slider));
        detail.mouseIsDown().set(true);
      }),
      $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.mouseup(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
        detail.mouseIsDown().set(false);
      })
    ];
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_au1coewxjcgfo8tp.deepMerge($_395jq4w3jcgfo8n1.derive($_3h0i9zw8jcgfo8px.flatten([
        !isTouch$3 ? [Keying.config({
            mode: 'special',
            focusIn: function (slider) {
              return $_15kt8q10hjcgfo9pa.getPart(slider, detail, 'spectrum').map(Keying.focusIn).map($_ee1z6xwajcgfo8qa.constant(true));
            }
          })] : [],
        [me.config({
            store: {
              mode: 'manual',
              getValue: function (_) {
                return detail.value().get();
              }
            }
          })]
      ])), $_70kbdh10cjcgfo9nm.get(detail.sliderBehaviours())),
      events: $_de0ow7w5jcgfo8ot.derive([
        $_de0ow7w5jcgfo8ot.run($_65n6i010ujcgfo9vs.changeEvent(), function (slider, simulatedEvent) {
          changeValue(slider, simulatedEvent.event().value());
        }),
        $_de0ow7w5jcgfo8ot.runOnAttached(function (slider, simulatedEvent) {
          detail.value().set(detail.getInitialValue()());
          var thumb = getThumb(slider);
          refresh(slider);
          detail.onInit()(slider, thumb, detail.value().get());
        })
      ].concat(uiEventsArr)),
      apis: {
        resetToMin: resetToMin,
        resetToMax: resetToMax,
        refresh: refresh
      },
      domModification: { styles: { position: 'relative' } }
    };
  };
  var $_8wwgo5115jcgfo9y2 = { sketch: sketch$2 };

  var Slider = $_8307zi10djcgfo9nz.composite({
    name: 'Slider',
    configFields: SliderSchema,
    partFields: SliderParts,
    factory: $_8wwgo5115jcgfo9y2.sketch,
    apis: {
      resetToMin: function (apis, slider) {
        apis.resetToMin(slider);
      },
      resetToMax: function (apis, slider) {
        apis.resetToMax(slider);
      },
      refresh: function (apis, slider) {
        apis.refresh(slider);
      }
    }
  });

  var button = function (realm, clazz, makeItems) {
    return $_16du12z1jcgfo9ar.forToolbar(clazz, function () {
      var items = makeItems();
      realm.setContextToolbar([{
          label: clazz + ' group',
          items: items
        }]);
    }, {});
  };
  var $_fstoxo117jcgfo9yw = { button: button };

  var BLACK = -1;
  var makeSlider = function (spec) {
    var getColor = function (hue) {
      if (hue < 0) {
        return 'black';
      } else if (hue > 360) {
        return 'white';
      } else {
        return 'hsl(' + hue + ', 100%, 50%)';
      }
    };
    var onInit = function (slider, thumb, value) {
      var color = getColor(value);
      $_9qule1zrjcgfo9ge.set(thumb.element(), 'background-color', color);
    };
    var onChange = function (slider, thumb, value) {
      var color = getColor(value);
      $_9qule1zrjcgfo9ge.set(thumb.element(), 'background-color', color);
      spec.onChange(slider, thumb, color);
    };
    return Slider.sketch({
      dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-slider ${prefix}-hue-slider-container"></div>'),
      components: [
        Slider.parts()['left-edge']($_3l4nzn10pjcgfo9tr.spec('<div class="${prefix}-hue-slider-black"></div>')),
        Slider.parts().spectrum({
          dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-slider-gradient-container"></div>'),
          components: [$_3l4nzn10pjcgfo9tr.spec('<div class="${prefix}-slider-gradient"></div>')],
          behaviours: $_395jq4w3jcgfo8n1.derive([Toggling.config({ toggleClass: $_3eky7iz0jcgfo9aj.resolve('thumb-active') })])
        }),
        Slider.parts()['right-edge']($_3l4nzn10pjcgfo9tr.spec('<div class="${prefix}-hue-slider-white"></div>')),
        Slider.parts().thumb({
          dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_395jq4w3jcgfo8n1.derive([Toggling.config({ toggleClass: $_3eky7iz0jcgfo9aj.resolve('thumb-active') })])
        })
      ],
      onChange: onChange,
      onDragStart: function (slider, thumb) {
        Toggling.on(thumb);
      },
      onDragEnd: function (slider, thumb) {
        Toggling.off(thumb);
      },
      onInit: onInit,
      stepSize: 10,
      min: 0,
      max: 360,
      getInitialValue: spec.getInitialValue,
      sliderBehaviours: $_395jq4w3jcgfo8n1.derive([$_82uzw2yzjcgfo9ad.orientation(Slider.refresh)])
    });
  };
  var makeItems = function (spec) {
    return [makeSlider(spec)];
  };
  var sketch$1 = function (realm, editor) {
    var spec = {
      onChange: function (slider, thumb, color) {
        editor.undoManager.transact(function () {
          editor.formatter.apply('forecolor', { value: color });
          editor.nodeChanged();
        });
      },
      getInitialValue: function () {
        return BLACK;
      }
    };
    return $_fstoxo117jcgfo9yw.button(realm, 'color', function () {
      return makeItems(spec);
    });
  };
  var $_77noq710rjcgfo9up = {
    makeItems: makeItems,
    sketch: sketch$1
  };

  var schema$7 = $_783jrjxgjcgfo8yn.objOfOnly([
    $_6inazsx1jcgfo8uu.strict('getInitialValue'),
    $_6inazsx1jcgfo8uu.strict('onChange'),
    $_6inazsx1jcgfo8uu.strict('category'),
    $_6inazsx1jcgfo8uu.strict('sizes')
  ]);
  var sketch$4 = function (rawSpec) {
    var spec = $_783jrjxgjcgfo8yn.asRawOrDie('SizeSlider', schema$7, rawSpec);
    var isValidValue = function (valueIndex) {
      return valueIndex >= 0 && valueIndex < spec.sizes.length;
    };
    var onChange = function (slider, thumb, valueIndex) {
      if (isValidValue(valueIndex)) {
        spec.onChange(valueIndex);
      }
    };
    return Slider.sketch({
      dom: {
        tag: 'div',
        classes: [
          $_3eky7iz0jcgfo9aj.resolve('slider-' + spec.category + '-size-container'),
          $_3eky7iz0jcgfo9aj.resolve('slider'),
          $_3eky7iz0jcgfo9aj.resolve('slider-size-container')
        ]
      },
      onChange: onChange,
      onDragStart: function (slider, thumb) {
        Toggling.on(thumb);
      },
      onDragEnd: function (slider, thumb) {
        Toggling.off(thumb);
      },
      min: 0,
      max: spec.sizes.length - 1,
      stepSize: 1,
      getInitialValue: spec.getInitialValue,
      snapToGrid: true,
      sliderBehaviours: $_395jq4w3jcgfo8n1.derive([$_82uzw2yzjcgfo9ad.orientation(Slider.refresh)]),
      components: [
        Slider.parts().spectrum({
          dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-slider-size-container"></div>'),
          components: [$_3l4nzn10pjcgfo9tr.spec('<div class="${prefix}-slider-size-line"></div>')]
        }),
        Slider.parts().thumb({
          dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_395jq4w3jcgfo8n1.derive([Toggling.config({ toggleClass: $_3eky7iz0jcgfo9aj.resolve('thumb-active') })])
        })
      ]
    });
  };
  var $_106lfu119jcgfo9z0 = { sketch: sketch$4 };

  var ancestor$3 = function (scope, transform, isRoot) {
    var element = scope.dom();
    var stop = $_eregpvwyjcgfo8ts.isFunction(isRoot) ? isRoot : $_ee1z6xwajcgfo8qa.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_6rcvbhwsjcgfo8sm.fromDom(element);
      var transformed = transform(el);
      if (transformed.isSome())
        return transformed;
      else if (stop(el))
        break;
    }
    return $_d7fxouw9jcgfo8q5.none();
  };
  var closest$3 = function (scope, transform, isRoot) {
    var current = transform(scope);
    return current.orThunk(function () {
      return isRoot(scope) ? $_d7fxouw9jcgfo8q5.none() : ancestor$3(scope, transform, isRoot);
    });
  };
  var $_50fngi11bjcgfoa16 = {
    ancestor: ancestor$3,
    closest: closest$3
  };

  var candidates = [
    '9px',
    '10px',
    '11px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '24px',
    '32px',
    '36px'
  ];
  var defaultSize = 'medium';
  var defaultIndex = 2;
  var indexToSize = function (index) {
    return $_d7fxouw9jcgfo8q5.from(candidates[index]);
  };
  var sizeToIndex = function (size) {
    return $_3h0i9zw8jcgfo8px.findIndex(candidates, function (v) {
      return v === size;
    });
  };
  var getRawOrComputed = function (isRoot, rawStart) {
    var optStart = $_bmv0faxwjcgfo91e.isElement(rawStart) ? $_d7fxouw9jcgfo8q5.some(rawStart) : $_dd88k4y2jcgfo92t.parent(rawStart);
    return optStart.map(function (start) {
      var inline = $_50fngi11bjcgfoa16.closest(start, function (elem) {
        return $_9qule1zrjcgfo9ge.getRaw(elem, 'font-size');
      }, isRoot);
      return inline.getOrThunk(function () {
        return $_9qule1zrjcgfo9ge.get(start, 'font-size');
      });
    }).getOr('');
  };
  var getSize = function (editor) {
    var node = editor.selection.getStart();
    var elem = $_6rcvbhwsjcgfo8sm.fromDom(node);
    var root = $_6rcvbhwsjcgfo8sm.fromDom(editor.getBody());
    var isRoot = function (e) {
      return $_8prpzjw7jcgfo8p9.eq(root, e);
    };
    var elemSize = getRawOrComputed(isRoot, elem);
    return $_3h0i9zw8jcgfo8px.find(candidates, function (size) {
      return elemSize === size;
    }).getOr(defaultSize);
  };
  var applySize = function (editor, value) {
    var currentValue = getSize(editor);
    if (currentValue !== value) {
      editor.execCommand('fontSize', false, value);
    }
  };
  var get$7 = function (editor) {
    var size = getSize(editor);
    return sizeToIndex(size).getOr(defaultIndex);
  };
  var apply$1 = function (editor, index) {
    indexToSize(index).each(function (size) {
      applySize(editor, size);
    });
  };
  var $_3xp96511ajcgfo9zg = {
    candidates: $_ee1z6xwajcgfo8qa.constant(candidates),
    get: get$7,
    apply: apply$1
  };

  var sizes = $_3xp96511ajcgfo9zg.candidates();
  var makeSlider$1 = function (spec) {
    return $_106lfu119jcgfo9z0.sketch({
      onChange: spec.onChange,
      sizes: sizes,
      category: 'font',
      getInitialValue: spec.getInitialValue
    });
  };
  var makeItems$1 = function (spec) {
    return [
      $_3l4nzn10pjcgfo9tr.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-small-font ${prefix}-icon"></span>'),
      makeSlider$1(spec),
      $_3l4nzn10pjcgfo9tr.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-large-font ${prefix}-icon"></span>')
    ];
  };
  var sketch$3 = function (realm, editor) {
    var spec = {
      onChange: function (value) {
        $_3xp96511ajcgfo9zg.apply(editor, value);
      },
      getInitialValue: function () {
        return $_3xp96511ajcgfo9zg.get(editor);
      }
    };
    return $_fstoxo117jcgfo9yw.button(realm, 'font-size', function () {
      return makeItems$1(spec);
    });
  };
  var $_y4o09118jcgfo9yy = {
    makeItems: makeItems$1,
    sketch: sketch$3
  };

  var record = function (spec) {
    var uid = $_8fkfzex5jcgfo8wf.hasKey(spec, 'uid') ? spec.uid : $_77g8b110ljcgfo9s0.generate('memento');
    var get = function (any) {
      return any.getSystem().getByUid(uid).getOrDie();
    };
    var getOpt = function (any) {
      return any.getSystem().getByUid(uid).fold($_d7fxouw9jcgfo8q5.none, $_d7fxouw9jcgfo8q5.some);
    };
    var asSpec = function () {
      return $_au1coewxjcgfo8tp.deepMerge(spec, { uid: uid });
    };
    return {
      get: get,
      getOpt: getOpt,
      asSpec: asSpec
    };
  };
  var $_dwt5fx11djcgfoa3d = { record: record };

  function create$3(width, height) {
    return resize(document.createElement('canvas'), width, height);
  }
  function clone$2(canvas) {
    var tCanvas, ctx;
    tCanvas = create$3(canvas.width, canvas.height);
    ctx = get2dContext(tCanvas);
    ctx.drawImage(canvas, 0, 0);
    return tCanvas;
  }
  function get2dContext(canvas) {
    return canvas.getContext('2d');
  }
  function get3dContext(canvas) {
    var gl = null;
    try {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch (e) {
    }
    if (!gl) {
      gl = null;
    }
    return gl;
  }
  function resize(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  var $_1vulna11gjcgfoa4m = {
    create: create$3,
    clone: clone$2,
    resize: resize,
    get2dContext: get2dContext,
    get3dContext: get3dContext
  };

  function getWidth(image) {
    return image.naturalWidth || image.width;
  }
  function getHeight(image) {
    return image.naturalHeight || image.height;
  }
  var $_flohh11hjcgfoa4p = {
    getWidth: getWidth,
    getHeight: getHeight
  };

  var promise = function () {
    var Promise = function (fn) {
      if (typeof this !== 'object')
        throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function')
        throw new TypeError('not a function');
      this._state = null;
      this._value = null;
      this._deferreds = [];
      doResolve(fn, bind(resolve, this), bind(reject, this));
    };
    var asap = Promise.immediateFn || typeof setImmediate === 'function' && setImmediate || function (fn) {
      setTimeout(fn, 1);
    };
    function bind(fn, thisArg) {
      return function () {
        fn.apply(thisArg, arguments);
      };
    }
    var isArray = Array.isArray || function (value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    };
    function handle(deferred) {
      var me = this;
      if (this._state === null) {
        this._deferreds.push(deferred);
        return;
      }
      asap(function () {
        var cb = me._state ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (me._state ? deferred.resolve : deferred.reject)(me._value);
          return;
        }
        var ret;
        try {
          ret = cb(me._value);
        } catch (e) {
          deferred.reject(e);
          return;
        }
        deferred.resolve(ret);
      });
    }
    function resolve(newValue) {
      try {
        if (newValue === this)
          throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
          var then = newValue.then;
          if (typeof then === 'function') {
            doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
            return;
          }
        }
        this._state = true;
        this._value = newValue;
        finale.call(this);
      } catch (e) {
        reject.call(this, e);
      }
    }
    function reject(newValue) {
      this._state = false;
      this._value = newValue;
      finale.call(this);
    }
    function finale() {
      for (var i = 0, len = this._deferreds.length; i < len; i++) {
        handle.call(this, this._deferreds[i]);
      }
      this._deferreds = null;
    }
    function Handler(onFulfilled, onRejected, resolve, reject) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.resolve = resolve;
      this.reject = reject;
    }
    function doResolve(fn, onFulfilled, onRejected) {
      var done = false;
      try {
        fn(function (value) {
          if (done)
            return;
          done = true;
          onFulfilled(value);
        }, function (reason) {
          if (done)
            return;
          done = true;
          onRejected(reason);
        });
      } catch (ex) {
        if (done)
          return;
        done = true;
        onRejected(ex);
      }
    }
    Promise.prototype['catch'] = function (onRejected) {
      return this.then(null, onRejected);
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
      var me = this;
      return new Promise(function (resolve, reject) {
        handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
      });
    };
    Promise.all = function () {
      var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);
      return new Promise(function (resolve, reject) {
        if (args.length === 0)
          return resolve([]);
        var remaining = args.length;
        function res(i, val) {
          try {
            if (val && (typeof val === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(val, function (val) {
                  res(i, val);
                }, reject);
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }
        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };
    Promise.resolve = function (value) {
      if (value && typeof value === 'object' && value.constructor === Promise) {
        return value;
      }
      return new Promise(function (resolve) {
        resolve(value);
      });
    };
    Promise.reject = function (value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    };
    Promise.race = function (values) {
      return new Promise(function (resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i].then(resolve, reject);
        }
      });
    };
    return Promise;
  };
  var Promise = window.Promise ? window.Promise : promise();

  var Blob = function (parts, properties) {
    var f = $_6t1mpcwcjcgfo8qg.getOrDie('Blob');
    return new f(parts, properties);
  };

  var FileReader = function () {
    var f = $_6t1mpcwcjcgfo8qg.getOrDie('FileReader');
    return new f();
  };

  var Uint8Array = function (arr) {
    var f = $_6t1mpcwcjcgfo8qg.getOrDie('Uint8Array');
    return new f(arr);
  };

  var requestAnimationFrame = function (callback) {
    var f = $_6t1mpcwcjcgfo8qg.getOrDie('requestAnimationFrame');
    f(callback);
  };
  var atob = function (base64) {
    var f = $_6t1mpcwcjcgfo8qg.getOrDie('atob');
    return f(base64);
  };
  var $_5e7tsf11mjcgfoa52 = {
    atob: atob,
    requestAnimationFrame: requestAnimationFrame
  };

  function loadImage(image) {
    return new Promise(function (resolve) {
      function loaded() {
        image.removeEventListener('load', loaded);
        resolve(image);
      }
      if (image.complete) {
        resolve(image);
      } else {
        image.addEventListener('load', loaded);
      }
    });
  }
  function imageToBlob$1(image) {
    return loadImage(image).then(function (image) {
      var src = image.src;
      if (src.indexOf('blob:') === 0) {
        return anyUriToBlob(src);
      }
      if (src.indexOf('data:') === 0) {
        return dataUriToBlob(src);
      }
      return anyUriToBlob(src);
    });
  }
  function blobToImage$1(blob) {
    return new Promise(function (resolve, reject) {
      var blobUrl = URL.createObjectURL(blob);
      var image = new Image();
      var removeListeners = function () {
        image.removeEventListener('load', loaded);
        image.removeEventListener('error', error);
      };
      function loaded() {
        removeListeners();
        resolve(image);
      }
      function error() {
        removeListeners();
        reject('Unable to load data of type ' + blob.type + ': ' + blobUrl);
      }
      image.addEventListener('load', loaded);
      image.addEventListener('error', error);
      image.src = blobUrl;
      if (image.complete) {
        loaded();
      }
    });
  }
  function anyUriToBlob(url) {
    return new Promise(function (resolve) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        if (this.status == 200) {
          resolve(this.response);
        }
      };
      xhr.send();
    });
  }
  function dataUriToBlobSync$1(uri) {
    var data = uri.split(',');
    var matches = /data:([^;]+)/.exec(data[0]);
    if (!matches)
      return $_d7fxouw9jcgfo8q5.none();
    var mimetype = matches[1];
    var base64 = data[1];
    var sliceSize = 1024;
    var byteCharacters = $_5e7tsf11mjcgfoa52.atob(base64);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);
    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);
      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = Uint8Array(bytes);
    }
    return $_d7fxouw9jcgfo8q5.some(Blob(byteArrays, { type: mimetype }));
  }
  function dataUriToBlob(uri) {
    return new Promise(function (resolve, reject) {
      dataUriToBlobSync$1(uri).fold(function () {
        reject('uri is not base64: ' + uri);
      }, resolve);
    });
  }
  function uriToBlob$1(url) {
    if (url.indexOf('blob:') === 0) {
      return anyUriToBlob(url);
    }
    if (url.indexOf('data:') === 0) {
      return dataUriToBlob(url);
    }
    return null;
  }
  function canvasToBlob(canvas, type, quality) {
    type = type || 'image/png';
    if (HTMLCanvasElement.prototype.toBlob) {
      return new Promise(function (resolve) {
        canvas.toBlob(function (blob) {
          resolve(blob);
        }, type, quality);
      });
    } else {
      return dataUriToBlob(canvas.toDataURL(type, quality));
    }
  }
  function canvasToDataURL(getCanvas, type, quality) {
    type = type || 'image/png';
    return getCanvas.then(function (canvas) {
      return canvas.toDataURL(type, quality);
    });
  }
  function blobToCanvas(blob) {
    return blobToImage$1(blob).then(function (image) {
      revokeImageUrl(image);
      var context, canvas;
      canvas = $_1vulna11gjcgfoa4m.create($_flohh11hjcgfoa4p.getWidth(image), $_flohh11hjcgfoa4p.getHeight(image));
      context = $_1vulna11gjcgfoa4m.get2dContext(canvas);
      context.drawImage(image, 0, 0);
      return canvas;
    });
  }
  function blobToDataUri$1(blob) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }
  function blobToBase64$1(blob) {
    return blobToDataUri$1(blob).then(function (dataUri) {
      return dataUri.split(',')[1];
    });
  }
  function revokeImageUrl(image) {
    URL.revokeObjectURL(image.src);
  }
  var $_3mrn8w11fjcgfoa3y = {
    blobToImage: blobToImage$1,
    imageToBlob: imageToBlob$1,
    blobToDataUri: blobToDataUri$1,
    blobToBase64: blobToBase64$1,
    dataUriToBlobSync: dataUriToBlobSync$1,
    canvasToBlob: canvasToBlob,
    canvasToDataURL: canvasToDataURL,
    blobToCanvas: blobToCanvas,
    uriToBlob: uriToBlob$1
  };

  var blobToImage = function (image) {
    return $_3mrn8w11fjcgfoa3y.blobToImage(image);
  };
  var imageToBlob = function (blob) {
    return $_3mrn8w11fjcgfoa3y.imageToBlob(blob);
  };
  var blobToDataUri = function (blob) {
    return $_3mrn8w11fjcgfoa3y.blobToDataUri(blob);
  };
  var blobToBase64 = function (blob) {
    return $_3mrn8w11fjcgfoa3y.blobToBase64(blob);
  };
  var dataUriToBlobSync = function (uri) {
    return $_3mrn8w11fjcgfoa3y.dataUriToBlobSync(uri);
  };
  var uriToBlob = function (uri) {
    return $_d7fxouw9jcgfo8q5.from($_3mrn8w11fjcgfoa3y.uriToBlob(uri));
  };
  var $_dpifh11ejcgfoa3r = {
    blobToImage: blobToImage,
    imageToBlob: imageToBlob,
    blobToDataUri: blobToDataUri,
    blobToBase64: blobToBase64,
    dataUriToBlobSync: dataUriToBlobSync,
    uriToBlob: uriToBlob
  };

  var addImage = function (editor, blob) {
    $_dpifh11ejcgfoa3r.blobToBase64(blob).then(function (base64) {
      editor.undoManager.transact(function () {
        var cache = editor.editorUpload.blobCache;
        var info = cache.create($_gcx8v510fjcgfo9ox.generate('mceu'), blob, base64);
        cache.add(info);
        var img = editor.dom.createHTML('img', { src: info.blobUri() });
        editor.insertContent(img);
      });
    });
  };
  var extractBlob = function (simulatedEvent) {
    var event = simulatedEvent.event();
    var files = event.raw().target.files || event.raw().dataTransfer.files;
    return $_d7fxouw9jcgfo8q5.from(files[0]);
  };
  var sketch$5 = function (editor) {
    var pickerDom = {
      tag: 'input',
      attributes: {
        accept: 'image/*',
        type: 'file',
        title: ''
      },
      styles: {
        visibility: 'hidden',
        position: 'absolute'
      }
    };
    var memPicker = $_dwt5fx11djcgfoa3d.record({
      dom: pickerDom,
      events: $_de0ow7w5jcgfo8ot.derive([
        $_de0ow7w5jcgfo8ot.cutter($_8bjxvowwjcgfo8tj.click()),
        $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.change(), function (picker, simulatedEvent) {
          extractBlob(simulatedEvent).each(function (blob) {
            addImage(editor, blob);
          });
        })
      ])
    });
    return Button.sketch({
      dom: $_3l4nzn10pjcgfo9tr.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-image ${prefix}-icon"></span>'),
      components: [memPicker.asSpec()],
      action: function (button) {
        var picker = memPicker.get(button);
        picker.element().dom().click();
      }
    });
  };
  var $_87hqaq11cjcgfoa2c = { sketch: sketch$5 };

  var get$8 = function (element) {
    return element.dom().textContent;
  };
  var set$5 = function (element, value) {
    element.dom().textContent = value;
  };
  var $_44617911pjcgfoa60 = {
    get: get$8,
    set: set$5
  };

  var isNotEmpty = function (val) {
    return val.length > 0;
  };
  var defaultToEmpty = function (str) {
    return str === undefined || str === null ? '' : str;
  };
  var noLink = function (editor) {
    var text = editor.selection.getContent({ format: 'text' });
    return {
      url: '',
      text: text,
      title: '',
      target: '',
      link: $_d7fxouw9jcgfo8q5.none()
    };
  };
  var fromLink = function (link) {
    var text = $_44617911pjcgfoa60.get(link);
    var url = $_8ut06dxvjcgfo912.get(link, 'href');
    var title = $_8ut06dxvjcgfo912.get(link, 'title');
    var target = $_8ut06dxvjcgfo912.get(link, 'target');
    return {
      url: defaultToEmpty(url),
      text: text !== url ? defaultToEmpty(text) : '',
      title: defaultToEmpty(title),
      target: defaultToEmpty(target),
      link: $_d7fxouw9jcgfo8q5.some(link)
    };
  };
  var getInfo = function (editor) {
    return query(editor).fold(function () {
      return noLink(editor);
    }, function (link) {
      return fromLink(link);
    });
  };
  var wasSimple = function (link) {
    var prevHref = $_8ut06dxvjcgfo912.get(link, 'href');
    var prevText = $_44617911pjcgfoa60.get(link);
    return prevHref === prevText;
  };
  var getTextToApply = function (link, url, info) {
    return info.text.filter(isNotEmpty).fold(function () {
      return wasSimple(link) ? $_d7fxouw9jcgfo8q5.some(url) : $_d7fxouw9jcgfo8q5.none();
    }, $_d7fxouw9jcgfo8q5.some);
  };
  var unlinkIfRequired = function (editor, info) {
    var activeLink = info.link.bind($_ee1z6xwajcgfo8qa.identity);
    activeLink.each(function (link) {
      editor.execCommand('unlink');
    });
  };
  var getAttrs$1 = function (url, info) {
    var attrs = {};
    attrs.href = url;
    info.title.filter(isNotEmpty).each(function (title) {
      attrs.title = title;
    });
    info.target.filter(isNotEmpty).each(function (target) {
      attrs.target = target;
    });
    return attrs;
  };
  var applyInfo = function (editor, info) {
    info.url.filter(isNotEmpty).fold(function () {
      unlinkIfRequired(editor, info);
    }, function (url) {
      var attrs = getAttrs$1(url, info);
      var activeLink = info.link.bind($_ee1z6xwajcgfo8qa.identity);
      activeLink.fold(function () {
        var text = info.text.filter(isNotEmpty).getOr(url);
        editor.insertContent(editor.dom.createHTML('a', attrs, editor.dom.encode(text)));
      }, function (link) {
        var text = getTextToApply(link, url, info);
        $_8ut06dxvjcgfo912.setAll(link, attrs);
        text.each(function (newText) {
          $_44617911pjcgfoa60.set(link, newText);
        });
      });
    });
  };
  var query = function (editor) {
    var start = $_6rcvbhwsjcgfo8sm.fromDom(editor.selection.getStart());
    return $_dka7lkzljcgfo9fe.closest(start, 'a');
  };
  var $_75tkxh11ojcgfoa5f = {
    getInfo: getInfo,
    applyInfo: applyInfo,
    query: query
  };

  var events$6 = function (name, eventHandlers) {
    var events = $_de0ow7w5jcgfo8ot.derive(eventHandlers);
    return $_395jq4w3jcgfo8n1.create({
      fields: [$_6inazsx1jcgfo8uu.strict('enabled')],
      name: name,
      active: { events: $_ee1z6xwajcgfo8qa.constant(events) }
    });
  };
  var config = function (name, eventHandlers) {
    var me = events$6(name, eventHandlers);
    return {
      key: name,
      value: {
        config: {},
        me: me,
        configAsRaw: $_ee1z6xwajcgfo8qa.constant({}),
        initialConfig: {},
        state: $_395jq4w3jcgfo8n1.noState()
      }
    };
  };
  var $_d60tjl11rjcgfoa7b = {
    events: events$6,
    config: config
  };

  var getCurrent = function (component, composeConfig, composeState) {
    return composeConfig.find()(component);
  };
  var $_gfkrul11tjcgfoa7m = { getCurrent: getCurrent };

  var ComposeSchema = [$_6inazsx1jcgfo8uu.strict('find')];

  var Composing = $_395jq4w3jcgfo8n1.create({
    fields: ComposeSchema,
    name: 'composing',
    apis: $_gfkrul11tjcgfoa7m
  });

  var factory$1 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_au1coewxjcgfo8tp.deepMerge({
        tag: 'div',
        attributes: { role: 'presentation' }
      }, detail.dom()),
      components: detail.components(),
      behaviours: $_70kbdh10cjcgfo9nm.get(detail.containerBehaviours()),
      events: detail.events(),
      domModification: detail.domModification(),
      eventOrder: detail.eventOrder()
    };
  };
  var Container = $_8307zi10djcgfo9nz.single({
    name: 'Container',
    factory: factory$1,
    configFields: [
      $_6inazsx1jcgfo8uu.defaulted('components', []),
      $_70kbdh10cjcgfo9nm.field('containerBehaviours', []),
      $_6inazsx1jcgfo8uu.defaulted('events', {}),
      $_6inazsx1jcgfo8uu.defaulted('domModification', {}),
      $_6inazsx1jcgfo8uu.defaulted('eventOrder', {})
    ]
  });

  var factory$2 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      behaviours: $_au1coewxjcgfo8tp.deepMerge($_395jq4w3jcgfo8n1.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: detail.getInitialValue()()
          }
        }),
        Composing.config({ find: $_d7fxouw9jcgfo8q5.some })
      ]), $_70kbdh10cjcgfo9nm.get(detail.dataBehaviours())),
      events: $_de0ow7w5jcgfo8ot.derive([$_de0ow7w5jcgfo8ot.runOnAttached(function (component, simulatedEvent) {
          me.setValue(component, detail.getInitialValue()());
        })])
    };
  };
  var DataField = $_8307zi10djcgfo9nz.single({
    name: 'DataField',
    factory: factory$2,
    configFields: [
      $_6inazsx1jcgfo8uu.strict('uid'),
      $_6inazsx1jcgfo8uu.strict('dom'),
      $_6inazsx1jcgfo8uu.strict('getInitialValue'),
      $_70kbdh10cjcgfo9nm.field('dataBehaviours', [
        me,
        Composing
      ])
    ]
  });

  var get$9 = function (element) {
    return element.dom().value;
  };
  var set$6 = function (element, value) {
    if (value === undefined)
      throw new Error('Value.set was undefined');
    element.dom().value = value;
  };
  var $_8yhye311zjcgfoadi = {
    set: set$6,
    get: get$9
  };

  var schema$8 = [
    $_6inazsx1jcgfo8uu.option('data'),
    $_6inazsx1jcgfo8uu.defaulted('inputAttributes', {}),
    $_6inazsx1jcgfo8uu.defaulted('inputStyles', {}),
    $_6inazsx1jcgfo8uu.defaulted('type', 'input'),
    $_6inazsx1jcgfo8uu.defaulted('tag', 'input'),
    $_6inazsx1jcgfo8uu.defaulted('inputClasses', []),
    $_dkk53lysjcgfo983.onHandler('onSetValue'),
    $_6inazsx1jcgfo8uu.defaulted('styles', {}),
    $_6inazsx1jcgfo8uu.option('placeholder'),
    $_6inazsx1jcgfo8uu.defaulted('eventOrder', {}),
    $_70kbdh10cjcgfo9nm.field('inputBehaviours', [
      me,
      Focusing
    ]),
    $_6inazsx1jcgfo8uu.defaulted('selectOnFocus', true)
  ];
  var behaviours = function (detail) {
    return $_au1coewxjcgfo8tp.deepMerge($_395jq4w3jcgfo8n1.derive([
      me.config({
        store: {
          mode: 'manual',
          initialValue: detail.data().getOr(undefined),
          getValue: function (input) {
            return $_8yhye311zjcgfoadi.get(input.element());
          },
          setValue: function (input, data) {
            var current = $_8yhye311zjcgfoadi.get(input.element());
            if (current !== data) {
              $_8yhye311zjcgfoadi.set(input.element(), data);
            }
          }
        },
        onSetValue: detail.onSetValue()
      }),
      Focusing.config({
        onFocus: detail.selectOnFocus() === false ? $_ee1z6xwajcgfo8qa.noop : function (component) {
          var input = component.element();
          var value = $_8yhye311zjcgfoadi.get(input);
          input.dom().setSelectionRange(0, value.length);
        }
      })
    ]), $_70kbdh10cjcgfo9nm.get(detail.inputBehaviours()));
  };
  var dom$2 = function (detail) {
    return {
      tag: detail.tag(),
      attributes: $_au1coewxjcgfo8tp.deepMerge($_8fkfzex5jcgfo8wf.wrapAll([{
          key: 'type',
          value: detail.type()
        }].concat(detail.placeholder().map(function (pc) {
        return {
          key: 'placeholder',
          value: pc
        };
      }).toArray())), detail.inputAttributes()),
      styles: detail.inputStyles(),
      classes: detail.inputClasses()
    };
  };
  var $_fvtcao11yjcgfoa8k = {
    schema: $_ee1z6xwajcgfo8qa.constant(schema$8),
    behaviours: behaviours,
    dom: dom$2
  };

  var factory$3 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_fvtcao11yjcgfoa8k.dom(detail),
      components: [],
      behaviours: $_fvtcao11yjcgfoa8k.behaviours(detail),
      eventOrder: detail.eventOrder()
    };
  };
  var Input = $_8307zi10djcgfo9nz.single({
    name: 'Input',
    configFields: $_fvtcao11yjcgfoa8k.schema(),
    factory: factory$3
  });

  var exhibit$3 = function (base, tabConfig) {
    return $_5jneh4xjjcgfo8z7.nu({
      attributes: $_8fkfzex5jcgfo8wf.wrapAll([{
          key: tabConfig.tabAttr(),
          value: 'true'
        }])
    });
  };
  var $_4095d6121jcgfoadp = { exhibit: exhibit$3 };

  var TabstopSchema = [$_6inazsx1jcgfo8uu.defaulted('tabAttr', 'data-alloy-tabstop')];

  var Tabstopping = $_395jq4w3jcgfo8n1.create({
    fields: TabstopSchema,
    name: 'tabstopping',
    active: $_4095d6121jcgfoadp
  });

  var clearInputBehaviour = 'input-clearing';
  var field$2 = function (name, placeholder) {
    var inputSpec = $_dwt5fx11djcgfoa3d.record(Input.sketch({
      placeholder: placeholder,
      onSetValue: function (input, data) {
        $_4x498fwujcgfo8sy.emit(input, $_8bjxvowwjcgfo8tj.input());
      },
      inputBehaviours: $_395jq4w3jcgfo8n1.derive([
        Composing.config({ find: $_d7fxouw9jcgfo8q5.some }),
        Tabstopping.config({}),
        Keying.config({ mode: 'execution' })
      ]),
      selectOnFocus: false
    }));
    var buttonSpec = $_dwt5fx11djcgfoa3d.record(Button.sketch({
      dom: $_3l4nzn10pjcgfo9tr.dom('<button class="${prefix}-input-container-x ${prefix}-icon-cancel-circle ${prefix}-icon"></button>'),
      action: function (button) {
        var input = inputSpec.get(button);
        me.setValue(input, '');
      }
    }));
    return {
      name: name,
      spec: Container.sketch({
        dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-input-container"></div>'),
        components: [
          inputSpec.asSpec(),
          buttonSpec.asSpec()
        ],
        containerBehaviours: $_395jq4w3jcgfo8n1.derive([
          Toggling.config({ toggleClass: $_3eky7iz0jcgfo9aj.resolve('input-container-empty') }),
          Composing.config({
            find: function (comp) {
              return $_d7fxouw9jcgfo8q5.some(inputSpec.get(comp));
            }
          }),
          $_d60tjl11rjcgfoa7b.config(clearInputBehaviour, [$_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.input(), function (iContainer) {
              var input = inputSpec.get(iContainer);
              var val = me.getValue(input);
              var f = val.length > 0 ? Toggling.off : Toggling.on;
              f(iContainer);
            })])
        ])
      })
    };
  };
  var hidden = function (name) {
    return {
      name: name,
      spec: DataField.sketch({
        dom: {
          tag: 'span',
          styles: { display: 'none' }
        },
        getInitialValue: function () {
          return $_d7fxouw9jcgfo8q5.none();
        }
      })
    };
  };
  var $_d5c61m11qjcgfoa62 = {
    field: field$2,
    hidden: hidden
  };

  var nativeDisabled = [
    'input',
    'button',
    'textarea'
  ];
  var onLoad$5 = function (component, disableConfig, disableState) {
    if (disableConfig.disabled())
      disable(component, disableConfig, disableState);
  };
  var hasNative = function (component) {
    return $_3h0i9zw8jcgfo8px.contains(nativeDisabled, $_bmv0faxwjcgfo91e.name(component.element()));
  };
  var nativeIsDisabled = function (component) {
    return $_8ut06dxvjcgfo912.has(component.element(), 'disabled');
  };
  var nativeDisable = function (component) {
    $_8ut06dxvjcgfo912.set(component.element(), 'disabled', 'disabled');
  };
  var nativeEnable = function (component) {
    $_8ut06dxvjcgfo912.remove(component.element(), 'disabled');
  };
  var ariaIsDisabled = function (component) {
    return $_8ut06dxvjcgfo912.get(component.element(), 'aria-disabled') === 'true';
  };
  var ariaDisable = function (component) {
    $_8ut06dxvjcgfo912.set(component.element(), 'aria-disabled', 'true');
  };
  var ariaEnable = function (component) {
    $_8ut06dxvjcgfo912.set(component.element(), 'aria-disabled', 'false');
  };
  var disable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_4ub0gextjcgfo90x.add(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeDisable : ariaDisable;
    f(component);
  };
  var enable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_4ub0gextjcgfo90x.remove(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeEnable : ariaEnable;
    f(component);
  };
  var isDisabled = function (component) {
    return hasNative(component) ? nativeIsDisabled(component) : ariaIsDisabled(component);
  };
  var $_a5tseh126jcgfoage = {
    enable: enable,
    disable: disable,
    isDisabled: isDisabled,
    onLoad: onLoad$5
  };

  var exhibit$4 = function (base, disableConfig, disableState) {
    return $_5jneh4xjjcgfo8z7.nu({ classes: disableConfig.disabled() ? disableConfig.disableClass().map($_3h0i9zw8jcgfo8px.pure).getOr([]) : [] });
  };
  var events$7 = function (disableConfig, disableState) {
    return $_de0ow7w5jcgfo8ot.derive([
      $_de0ow7w5jcgfo8ot.abort($_1snegiwvjcgfo8tb.execute(), function (component, simulatedEvent) {
        return $_a5tseh126jcgfoage.isDisabled(component, disableConfig, disableState);
      }),
      $_7cgou0w4jcgfo8nu.loadEvent(disableConfig, disableState, $_a5tseh126jcgfoage.onLoad)
    ]);
  };
  var $_8m4co0125jcgfoag8 = {
    exhibit: exhibit$4,
    events: events$7
  };

  var DisableSchema = [
    $_6inazsx1jcgfo8uu.defaulted('disabled', false),
    $_6inazsx1jcgfo8uu.option('disableClass')
  ];

  var Disabling = $_395jq4w3jcgfo8n1.create({
    fields: DisableSchema,
    name: 'disabling',
    active: $_8m4co0125jcgfoag8,
    apis: $_a5tseh126jcgfoage
  });

  var owner$1 = 'form';
  var schema$9 = [$_70kbdh10cjcgfo9nm.field('formBehaviours', [me])];
  var getPartName = function (name) {
    return '<alloy.field.' + name + '>';
  };
  var sketch$8 = function (fSpec) {
    var parts = function () {
      var record = [];
      var field = function (name, config) {
        record.push(name);
        return $_15kt8q10hjcgfo9pa.generateOne(owner$1, getPartName(name), config);
      };
      return {
        field: field,
        record: function () {
          return record;
        }
      };
    }();
    var spec = fSpec(parts);
    var partNames = parts.record();
    var fieldParts = $_3h0i9zw8jcgfo8px.map(partNames, function (n) {
      return $_cdrten10jjcgfo9qn.required({
        name: n,
        pname: getPartName(n)
      });
    });
    return $_dhvo4c10gjcgfo9p0.composite(owner$1, schema$9, fieldParts, make, spec);
  };
  var make = function (detail, components, spec) {
    return $_au1coewxjcgfo8tp.deepMerge({
      'debug.sketcher': { 'Form': spec },
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_au1coewxjcgfo8tp.deepMerge($_395jq4w3jcgfo8n1.derive([me.config({
          store: {
            mode: 'manual',
            getValue: function (form) {
              var optPs = $_15kt8q10hjcgfo9pa.getAllParts(form, detail);
              return $_a7hrnswzjcgfo8tz.map(optPs, function (optPThunk, pName) {
                return optPThunk().bind(Composing.getCurrent).map(me.getValue);
              });
            },
            setValue: function (form, values) {
              $_a7hrnswzjcgfo8tz.each(values, function (newValue, key) {
                $_15kt8q10hjcgfo9pa.getPart(form, detail, key).each(function (wrapper) {
                  Composing.getCurrent(wrapper).each(function (field) {
                    me.setValue(field, newValue);
                  });
                });
              });
            }
          }
        })]), $_70kbdh10cjcgfo9nm.get(detail.formBehaviours())),
      apis: {
        getField: function (form, key) {
          return $_15kt8q10hjcgfo9pa.getPart(form, detail, key).bind(Composing.getCurrent);
        }
      }
    });
  };
  var $_580owo128jcgfoah1 = {
    getField: $_c7yo6t10ejcgfo9oj.makeApi(function (apis, component, key) {
      return apis.getField(component, key);
    }),
    sketch: sketch$8
  };

  var revocable = function (doRevoke) {
    var subject = Cell($_d7fxouw9jcgfo8q5.none());
    var revoke = function () {
      subject.get().each(doRevoke);
    };
    var clear = function () {
      revoke();
      subject.set($_d7fxouw9jcgfo8q5.none());
    };
    var set = function (s) {
      revoke();
      subject.set($_d7fxouw9jcgfo8q5.some(s));
    };
    var isSet = function () {
      return subject.get().isSome();
    };
    return {
      clear: clear,
      isSet: isSet,
      set: set
    };
  };
  var destroyable = function () {
    return revocable(function (s) {
      s.destroy();
    });
  };
  var unbindable = function () {
    return revocable(function (s) {
      s.unbind();
    });
  };
  var api$2 = function () {
    var subject = Cell($_d7fxouw9jcgfo8q5.none());
    var revoke = function () {
      subject.get().each(function (s) {
        s.destroy();
      });
    };
    var clear = function () {
      revoke();
      subject.set($_d7fxouw9jcgfo8q5.none());
    };
    var set = function (s) {
      revoke();
      subject.set($_d7fxouw9jcgfo8q5.some(s));
    };
    var run = function (f) {
      subject.get().each(f);
    };
    var isSet = function () {
      return subject.get().isSome();
    };
    return {
      clear: clear,
      isSet: isSet,
      set: set,
      run: run
    };
  };
  var value$3 = function () {
    var subject = Cell($_d7fxouw9jcgfo8q5.none());
    var clear = function () {
      subject.set($_d7fxouw9jcgfo8q5.none());
    };
    var set = function (s) {
      subject.set($_d7fxouw9jcgfo8q5.some(s));
    };
    var on = function (f) {
      subject.get().each(f);
    };
    var isSet = function () {
      return subject.get().isSome();
    };
    return {
      clear: clear,
      set: set,
      isSet: isSet,
      on: on
    };
  };
  var $_br33ye129jcgfoahg = {
    destroyable: destroyable,
    unbindable: unbindable,
    api: api$2,
    value: value$3
  };

  var SWIPING_LEFT = 1;
  var SWIPING_RIGHT = -1;
  var SWIPING_NONE = 0;
  var init$3 = function (xValue) {
    return {
      xValue: xValue,
      points: []
    };
  };
  var move = function (model, xValue) {
    if (xValue === model.xValue) {
      return model;
    }
    var currentDirection = xValue - model.xValue > 0 ? SWIPING_LEFT : SWIPING_RIGHT;
    var newPoint = {
      direction: currentDirection,
      xValue: xValue
    };
    var priorPoints = function () {
      if (model.points.length === 0) {
        return [];
      } else {
        var prev = model.points[model.points.length - 1];
        return prev.direction === currentDirection ? model.points.slice(0, model.points.length - 1) : model.points;
      }
    }();
    return {
      xValue: xValue,
      points: priorPoints.concat([newPoint])
    };
  };
  var complete = function (model) {
    if (model.points.length === 0) {
      return SWIPING_NONE;
    } else {
      var firstDirection = model.points[0].direction;
      var lastDirection = model.points[model.points.length - 1].direction;
      return firstDirection === SWIPING_RIGHT && lastDirection === SWIPING_RIGHT ? SWIPING_RIGHT : firstDirection === SWIPING_LEFT && lastDirection === SWIPING_LEFT ? SWIPING_LEFT : SWIPING_NONE;
    }
  };
  var $_7rmap12ajcgfoahj = {
    init: init$3,
    move: move,
    complete: complete
  };

  var sketch$7 = function (rawSpec) {
    var navigateEvent = 'navigateEvent';
    var wrapperAdhocEvents = 'serializer-wrapper-events';
    var formAdhocEvents = 'form-events';
    var schema = $_783jrjxgjcgfo8yn.objOf([
      $_6inazsx1jcgfo8uu.strict('fields'),
      $_6inazsx1jcgfo8uu.defaulted('maxFieldIndex', rawSpec.fields.length - 1),
      $_6inazsx1jcgfo8uu.strict('onExecute'),
      $_6inazsx1jcgfo8uu.strict('getInitialValue'),
      $_6inazsx1jcgfo8uu.state('state', function () {
        return {
          dialogSwipeState: $_br33ye129jcgfoahg.value(),
          currentScreen: Cell(0)
        };
      })
    ]);
    var spec = $_783jrjxgjcgfo8yn.asRawOrDie('SerialisedDialog', schema, rawSpec);
    var navigationButton = function (direction, directionName, enabled) {
      return Button.sketch({
        dom: $_3l4nzn10pjcgfo9tr.dom('<span class="${prefix}-icon-' + directionName + ' ${prefix}-icon"></span>'),
        action: function (button) {
          $_4x498fwujcgfo8sy.emitWith(button, navigateEvent, { direction: direction });
        },
        buttonBehaviours: $_395jq4w3jcgfo8n1.derive([Disabling.config({
            disableClass: $_3eky7iz0jcgfo9aj.resolve('toolbar-navigation-disabled'),
            disabled: !enabled
          })])
      });
    };
    var reposition = function (dialog, message) {
      $_dka7lkzljcgfo9fe.descendant(dialog.element(), '.' + $_3eky7iz0jcgfo9aj.resolve('serialised-dialog-chain')).each(function (parent) {
        $_9qule1zrjcgfo9ge.set(parent, 'left', -spec.state.currentScreen.get() * message.width + 'px');
      });
    };
    var navigate = function (dialog, direction) {
      var screens = $_fk8w0mzjjcgfo9f4.descendants(dialog.element(), '.' + $_3eky7iz0jcgfo9aj.resolve('serialised-dialog-screen'));
      $_dka7lkzljcgfo9fe.descendant(dialog.element(), '.' + $_3eky7iz0jcgfo9aj.resolve('serialised-dialog-chain')).each(function (parent) {
        if (spec.state.currentScreen.get() + direction >= 0 && spec.state.currentScreen.get() + direction < screens.length) {
          $_9qule1zrjcgfo9ge.getRaw(parent, 'left').each(function (left) {
            var currentLeft = parseInt(left, 10);
            var w = $_2kwnrj116jcgfo9yt.get(screens[0]);
            $_9qule1zrjcgfo9ge.set(parent, 'left', currentLeft - direction * w + 'px');
          });
          spec.state.currentScreen.set(spec.state.currentScreen.get() + direction);
        }
      });
    };
    var focusInput = function (dialog) {
      var inputs = $_fk8w0mzjjcgfo9f4.descendants(dialog.element(), 'input');
      var optInput = $_d7fxouw9jcgfo8q5.from(inputs[spec.state.currentScreen.get()]);
      optInput.each(function (input) {
        dialog.getSystem().getByDom(input).each(function (inputComp) {
          $_4x498fwujcgfo8sy.dispatchFocus(dialog, inputComp.element());
        });
      });
      var dotitems = memDots.get(dialog);
      Highlighting.highlightAt(dotitems, spec.state.currentScreen.get());
    };
    var resetState = function () {
      spec.state.currentScreen.set(0);
      spec.state.dialogSwipeState.clear();
    };
    var memForm = $_dwt5fx11djcgfoa3d.record($_580owo128jcgfoah1.sketch(function (parts) {
      return {
        dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-serialised-dialog"></div>'),
        components: [Container.sketch({
            dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-serialised-dialog-chain" style="left: 0px; position: absolute;"></div>'),
            components: $_3h0i9zw8jcgfo8px.map(spec.fields, function (field, i) {
              return i <= spec.maxFieldIndex ? Container.sketch({
                dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-serialised-dialog-screen"></div>'),
                components: $_3h0i9zw8jcgfo8px.flatten([
                  [navigationButton(-1, 'previous', i > 0)],
                  [parts.field(field.name, field.spec)],
                  [navigationButton(+1, 'next', i < spec.maxFieldIndex)]
                ])
              }) : parts.field(field.name, field.spec);
            })
          })],
        formBehaviours: $_395jq4w3jcgfo8n1.derive([
          $_82uzw2yzjcgfo9ad.orientation(function (dialog, message) {
            reposition(dialog, message);
          }),
          Keying.config({
            mode: 'special',
            focusIn: function (dialog) {
              focusInput(dialog);
            },
            onTab: function (dialog) {
              navigate(dialog, +1);
              return $_d7fxouw9jcgfo8q5.some(true);
            },
            onShiftTab: function (dialog) {
              navigate(dialog, -1);
              return $_d7fxouw9jcgfo8q5.some(true);
            }
          }),
          $_d60tjl11rjcgfoa7b.config(formAdhocEvents, [
            $_de0ow7w5jcgfo8ot.runOnAttached(function (dialog, simulatedEvent) {
              resetState();
              var dotitems = memDots.get(dialog);
              Highlighting.highlightFirst(dotitems);
              spec.getInitialValue(dialog).each(function (v) {
                me.setValue(dialog, v);
              });
            }),
            $_de0ow7w5jcgfo8ot.runOnExecute(spec.onExecute),
            $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.transitionend(), function (dialog, simulatedEvent) {
              if (simulatedEvent.event().raw().propertyName === 'left') {
                focusInput(dialog);
              }
            }),
            $_de0ow7w5jcgfo8ot.run(navigateEvent, function (dialog, simulatedEvent) {
              var direction = simulatedEvent.event().direction();
              navigate(dialog, direction);
            })
          ])
        ])
      };
    }));
    var memDots = $_dwt5fx11djcgfoa3d.record({
      dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-dot-container"></div>'),
      behaviours: $_395jq4w3jcgfo8n1.derive([Highlighting.config({
          highlightClass: $_3eky7iz0jcgfo9aj.resolve('dot-active'),
          itemClass: $_3eky7iz0jcgfo9aj.resolve('dot-item')
        })]),
      components: $_3h0i9zw8jcgfo8px.bind(spec.fields, function (_f, i) {
        return i <= spec.maxFieldIndex ? [$_3l4nzn10pjcgfo9tr.spec('<div class="${prefix}-dot-item ${prefix}-icon-full-dot ${prefix}-icon"></div>')] : [];
      })
    });
    return {
      dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-serializer-wrapper"></div>'),
      components: [
        memForm.asSpec(),
        memDots.asSpec()
      ],
      behaviours: $_395jq4w3jcgfo8n1.derive([
        Keying.config({
          mode: 'special',
          focusIn: function (wrapper) {
            var form = memForm.get(wrapper);
            Keying.focusIn(form);
          }
        }),
        $_d60tjl11rjcgfoa7b.config(wrapperAdhocEvents, [
          $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.touchstart(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.set($_7rmap12ajcgfoahj.init(simulatedEvent.event().raw().touches[0].clientX));
          }),
          $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.touchmove(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.on(function (state) {
              simulatedEvent.event().prevent();
              spec.state.dialogSwipeState.set($_7rmap12ajcgfoahj.move(state, simulatedEvent.event().raw().touches[0].clientX));
            });
          }),
          $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.touchend(), function (wrapper) {
            spec.state.dialogSwipeState.on(function (state) {
              var dialog = memForm.get(wrapper);
              var direction = -1 * $_7rmap12ajcgfoahj.complete(state);
              navigate(dialog, direction);
            });
          })
        ])
      ])
    };
  };
  var $_az1onm123jcgfoaej = { sketch: sketch$7 };

  var platform$1 = $_6o4pdywfjcgfo8qq.detect();
  var preserve$1 = function (f, editor) {
    var rng = editor.selection.getRng();
    f();
    editor.selection.setRng(rng);
  };
  var forAndroid = function (editor, f) {
    var wrapper = platform$1.os.isAndroid() ? preserve$1 : $_ee1z6xwajcgfo8qa.apply;
    wrapper(f, editor);
  };
  var $_8hjmt512bjcgfoahm = { forAndroid: forAndroid };

  var getGroups = $_1u8x7pwgjcgfo8r0.cached(function (realm, editor) {
    return [{
        label: 'the link group',
        items: [$_az1onm123jcgfoaej.sketch({
            fields: [
              $_d5c61m11qjcgfoa62.field('url', 'Type or paste URL'),
              $_d5c61m11qjcgfoa62.field('text', 'Link text'),
              $_d5c61m11qjcgfoa62.field('title', 'Link title'),
              $_d5c61m11qjcgfoa62.field('target', 'Link target'),
              $_d5c61m11qjcgfoa62.hidden('link')
            ],
            maxFieldIndex: [
              'url',
              'text',
              'title',
              'target'
            ].length - 1,
            getInitialValue: function () {
              return $_d7fxouw9jcgfo8q5.some($_75tkxh11ojcgfoa5f.getInfo(editor));
            },
            onExecute: function (dialog) {
              var info = me.getValue(dialog);
              $_75tkxh11ojcgfoa5f.applyInfo(editor, info);
              realm.restoreToolbar();
              editor.focus();
            }
          })]
      }];
  });
  var sketch$6 = function (realm, editor) {
    return $_16du12z1jcgfo9ar.forToolbarStateAction(editor, 'link', 'link', function () {
      var groups = getGroups(realm, editor);
      realm.setContextToolbar(groups);
      $_8hjmt512bjcgfoahm.forAndroid(editor, function () {
        realm.focusToolbar();
      });
      $_75tkxh11ojcgfoa5f.query(editor).each(function (link) {
        editor.selection.select(link.dom());
      });
    });
  };
  var $_woa5e11njcgfoa54 = { sketch: sketch$6 };

  var DefaultStyleFormats = [
    {
      title: 'Headings',
      items: [
        {
          title: 'Heading 1',
          format: 'h1'
        },
        {
          title: 'Heading 2',
          format: 'h2'
        },
        {
          title: 'Heading 3',
          format: 'h3'
        },
        {
          title: 'Heading 4',
          format: 'h4'
        },
        {
          title: 'Heading 5',
          format: 'h5'
        },
        {
          title: 'Heading 6',
          format: 'h6'
        }
      ]
    },
    {
      title: 'Inline',
      items: [
        {
          title: 'Bold',
          icon: 'bold',
          format: 'bold'
        },
        {
          title: 'Italic',
          icon: 'italic',
          format: 'italic'
        },
        {
          title: 'Underline',
          icon: 'underline',
          format: 'underline'
        },
        {
          title: 'Strikethrough',
          icon: 'strikethrough',
          format: 'strikethrough'
        },
        {
          title: 'Superscript',
          icon: 'superscript',
          format: 'superscript'
        },
        {
          title: 'Subscript',
          icon: 'subscript',
          format: 'subscript'
        },
        {
          title: 'Code',
          icon: 'code',
          format: 'code'
        }
      ]
    },
    {
      title: 'Blocks',
      items: [
        {
          title: 'Paragraph',
          format: 'p'
        },
        {
          title: 'Blockquote',
          format: 'blockquote'
        },
        {
          title: 'Div',
          format: 'div'
        },
        {
          title: 'Pre',
          format: 'pre'
        }
      ]
    },
    {
      title: 'Alignment',
      items: [
        {
          title: 'Left',
          icon: 'alignleft',
          format: 'alignleft'
        },
        {
          title: 'Center',
          icon: 'aligncenter',
          format: 'aligncenter'
        },
        {
          title: 'Right',
          icon: 'alignright',
          format: 'alignright'
        },
        {
          title: 'Justify',
          icon: 'alignjustify',
          format: 'alignjustify'
        }
      ]
    }
  ];

  var findRoute = function (component, transConfig, transState, route) {
    return $_8fkfzex5jcgfo8wf.readOptFrom(transConfig.routes(), route.start()).map($_ee1z6xwajcgfo8qa.apply).bind(function (sConfig) {
      return $_8fkfzex5jcgfo8wf.readOptFrom(sConfig, route.destination()).map($_ee1z6xwajcgfo8qa.apply);
    });
  };
  var getTransition = function (comp, transConfig, transState) {
    var route = getCurrentRoute(comp, transConfig, transState);
    return route.bind(function (r) {
      return getTransitionOf(comp, transConfig, transState, r);
    });
  };
  var getTransitionOf = function (comp, transConfig, transState, route) {
    return findRoute(comp, transConfig, transState, route).bind(function (r) {
      return r.transition().map(function (t) {
        return {
          transition: $_ee1z6xwajcgfo8qa.constant(t),
          route: $_ee1z6xwajcgfo8qa.constant(r)
        };
      });
    });
  };
  var disableTransition = function (comp, transConfig, transState) {
    getTransition(comp, transConfig, transState).each(function (routeTransition) {
      var t = routeTransition.transition();
      $_4ub0gextjcgfo90x.remove(comp.element(), t.transitionClass());
      $_8ut06dxvjcgfo912.remove(comp.element(), transConfig.destinationAttr());
    });
  };
  var getNewRoute = function (comp, transConfig, transState, destination) {
    return {
      start: $_ee1z6xwajcgfo8qa.constant($_8ut06dxvjcgfo912.get(comp.element(), transConfig.stateAttr())),
      destination: $_ee1z6xwajcgfo8qa.constant(destination)
    };
  };
  var getCurrentRoute = function (comp, transConfig, transState) {
    var el = comp.element();
    return $_8ut06dxvjcgfo912.has(el, transConfig.destinationAttr()) ? $_d7fxouw9jcgfo8q5.some({
      start: $_ee1z6xwajcgfo8qa.constant($_8ut06dxvjcgfo912.get(comp.element(), transConfig.stateAttr())),
      destination: $_ee1z6xwajcgfo8qa.constant($_8ut06dxvjcgfo912.get(comp.element(), transConfig.destinationAttr()))
    }) : $_d7fxouw9jcgfo8q5.none();
  };
  var jumpTo = function (comp, transConfig, transState, destination) {
    disableTransition(comp, transConfig, transState);
    if ($_8ut06dxvjcgfo912.has(comp.element(), transConfig.stateAttr()) && $_8ut06dxvjcgfo912.get(comp.element(), transConfig.stateAttr()) !== destination)
      transConfig.onFinish()(comp, destination);
    $_8ut06dxvjcgfo912.set(comp.element(), transConfig.stateAttr(), destination);
  };
  var fasttrack = function (comp, transConfig, transState, destination) {
    if ($_8ut06dxvjcgfo912.has(comp.element(), transConfig.destinationAttr())) {
      $_8ut06dxvjcgfo912.set(comp.element(), transConfig.stateAttr(), $_8ut06dxvjcgfo912.get(comp.element(), transConfig.destinationAttr()));
      $_8ut06dxvjcgfo912.remove(comp.element(), transConfig.destinationAttr());
    }
  };
  var progressTo = function (comp, transConfig, transState, destination) {
    fasttrack(comp, transConfig, transState, destination);
    var route = getNewRoute(comp, transConfig, transState, destination);
    getTransitionOf(comp, transConfig, transState, route).fold(function () {
      jumpTo(comp, transConfig, transState, destination);
    }, function (routeTransition) {
      disableTransition(comp, transConfig, transState);
      var t = routeTransition.transition();
      $_4ub0gextjcgfo90x.add(comp.element(), t.transitionClass());
      $_8ut06dxvjcgfo912.set(comp.element(), transConfig.destinationAttr(), destination);
    });
  };
  var getState = function (comp, transConfig, transState) {
    var e = comp.element();
    return $_8ut06dxvjcgfo912.has(e, transConfig.stateAttr()) ? $_d7fxouw9jcgfo8q5.some($_8ut06dxvjcgfo912.get(e, transConfig.stateAttr())) : $_d7fxouw9jcgfo8q5.none();
  };
  var $_6u642l12hjcgfoak4 = {
    findRoute: findRoute,
    disableTransition: disableTransition,
    getCurrentRoute: getCurrentRoute,
    jumpTo: jumpTo,
    progressTo: progressTo,
    getState: getState
  };

  var events$8 = function (transConfig, transState) {
    return $_de0ow7w5jcgfo8ot.derive([
      $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        $_6u642l12hjcgfoak4.getCurrentRoute(component, transConfig, transState).each(function (route) {
          $_6u642l12hjcgfoak4.findRoute(component, transConfig, transState, route).each(function (rInfo) {
            rInfo.transition().each(function (rTransition) {
              if (raw.propertyName === rTransition.property()) {
                $_6u642l12hjcgfoak4.jumpTo(component, transConfig, transState, route.destination());
                transConfig.onTransition()(component, route);
              }
            });
          });
        });
      }),
      $_de0ow7w5jcgfo8ot.runOnAttached(function (comp, se) {
        $_6u642l12hjcgfoak4.jumpTo(comp, transConfig, transState, transConfig.initialState());
      })
    ]);
  };
  var $_4lbuz212gjcgfoak1 = { events: events$8 };

  var TransitionSchema = [
    $_6inazsx1jcgfo8uu.defaulted('destinationAttr', 'data-transitioning-destination'),
    $_6inazsx1jcgfo8uu.defaulted('stateAttr', 'data-transitioning-state'),
    $_6inazsx1jcgfo8uu.strict('initialState'),
    $_dkk53lysjcgfo983.onHandler('onTransition'),
    $_dkk53lysjcgfo983.onHandler('onFinish'),
    $_6inazsx1jcgfo8uu.strictOf('routes', $_783jrjxgjcgfo8yn.setOf($_eyzbemx7jcgfo8x7.value, $_783jrjxgjcgfo8yn.setOf($_eyzbemx7jcgfo8x7.value, $_783jrjxgjcgfo8yn.objOfOnly([$_6inazsx1jcgfo8uu.optionObjOfOnly('transition', [
        $_6inazsx1jcgfo8uu.strict('property'),
        $_6inazsx1jcgfo8uu.strict('transitionClass')
      ])]))))
  ];

  var createRoutes = function (routes) {
    var r = {};
    $_a7hrnswzjcgfo8tz.each(routes, function (v, k) {
      var waypoints = k.split('<->');
      r[waypoints[0]] = $_8fkfzex5jcgfo8wf.wrap(waypoints[1], v);
      r[waypoints[1]] = $_8fkfzex5jcgfo8wf.wrap(waypoints[0], v);
    });
    return r;
  };
  var createBistate = function (first, second, transitions) {
    return $_8fkfzex5jcgfo8wf.wrapAll([
      {
        key: first,
        value: $_8fkfzex5jcgfo8wf.wrap(second, transitions)
      },
      {
        key: second,
        value: $_8fkfzex5jcgfo8wf.wrap(first, transitions)
      }
    ]);
  };
  var createTristate = function (first, second, third, transitions) {
    return $_8fkfzex5jcgfo8wf.wrapAll([
      {
        key: first,
        value: $_8fkfzex5jcgfo8wf.wrapAll([
          {
            key: second,
            value: transitions
          },
          {
            key: third,
            value: transitions
          }
        ])
      },
      {
        key: second,
        value: $_8fkfzex5jcgfo8wf.wrapAll([
          {
            key: first,
            value: transitions
          },
          {
            key: third,
            value: transitions
          }
        ])
      },
      {
        key: third,
        value: $_8fkfzex5jcgfo8wf.wrapAll([
          {
            key: first,
            value: transitions
          },
          {
            key: second,
            value: transitions
          }
        ])
      }
    ]);
  };
  var Transitioning = $_395jq4w3jcgfo8n1.create({
    fields: TransitionSchema,
    name: 'transitioning',
    active: $_4lbuz212gjcgfoak1,
    apis: $_6u642l12hjcgfoak4,
    extra: {
      createRoutes: createRoutes,
      createBistate: createBistate,
      createTristate: createTristate
    }
  });

  var generateFrom$1 = function (spec, all) {
    var schema = $_3h0i9zw8jcgfo8px.map(all, function (a) {
      return $_6inazsx1jcgfo8uu.field(a.name(), a.name(), $_d0l63jx2jcgfo8v5.asOption(), $_783jrjxgjcgfo8yn.objOf([
        $_6inazsx1jcgfo8uu.strict('config'),
        $_6inazsx1jcgfo8uu.defaulted('state', $_bjozj5xpjcgfo90f)
      ]));
    });
    var validated = $_783jrjxgjcgfo8yn.asStruct('component.behaviours', $_783jrjxgjcgfo8yn.objOf(schema), spec.behaviours).fold(function (errInfo) {
      throw new Error($_783jrjxgjcgfo8yn.formatError(errInfo) + '\nComplete spec:\n' + $_8pq9zfxejcgfo8yf.stringify(spec, null, 2));
    }, $_ee1z6xwajcgfo8qa.identity);
    return {
      list: all,
      data: $_a7hrnswzjcgfo8tz.map(validated, function (blobOptionThunk) {
        var blobOption = blobOptionThunk();
        return $_ee1z6xwajcgfo8qa.constant(blobOption.map(function (blob) {
          return {
            config: blob.config(),
            state: blob.state().init(blob.config())
          };
        }));
      })
    };
  };
  var getBehaviours$1 = function (bData) {
    return bData.list;
  };
  var getData = function (bData) {
    return bData.data;
  };
  var $_2gij8812mjcgfoanb = {
    generateFrom: generateFrom$1,
    getBehaviours: getBehaviours$1,
    getData: getData
  };

  var getBehaviours = function (spec) {
    var behaviours = $_8fkfzex5jcgfo8wf.readOptFrom(spec, 'behaviours').getOr({});
    var keys = $_3h0i9zw8jcgfo8px.filter($_a7hrnswzjcgfo8tz.keys(behaviours), function (k) {
      return behaviours[k] !== undefined;
    });
    return $_3h0i9zw8jcgfo8px.map(keys, function (k) {
      return spec.behaviours[k].me;
    });
  };
  var generateFrom = function (spec, all) {
    return $_2gij8812mjcgfoanb.generateFrom(spec, all);
  };
  var generate$4 = function (spec) {
    var all = getBehaviours(spec);
    return generateFrom(spec, all);
  };
  var $_ccmv3712ljcgfoamy = {
    generate: generate$4,
    generateFrom: generateFrom
  };

  var ComponentApi = $_fwzqphxrjcgfo90n.exactly([
    'getSystem',
    'config',
    'hasConfigured',
    'spec',
    'connect',
    'disconnect',
    'element',
    'syncComponents',
    'readState',
    'components',
    'events'
  ]);

  var SystemApi = $_fwzqphxrjcgfo90n.exactly([
    'debugInfo',
    'triggerFocus',
    'triggerEvent',
    'triggerEscape',
    'addToWorld',
    'removeFromWorld',
    'addToGui',
    'removeFromGui',
    'build',
    'getByUid',
    'getByDom',
    'broadcast',
    'broadcastOn'
  ]);

  var NoContextApi = function (getComp) {
    var fail = function (event) {
      return function () {
        throw new Error('The component must be in a context to send: ' + event + '\n' + $_5b4pz8y8jcgfo94i.element(getComp().element()) + ' is not in context.');
      };
    };
    return SystemApi({
      debugInfo: $_ee1z6xwajcgfo8qa.constant('fake'),
      triggerEvent: fail('triggerEvent'),
      triggerFocus: fail('triggerFocus'),
      triggerEscape: fail('triggerEscape'),
      build: fail('build'),
      addToWorld: fail('addToWorld'),
      removeFromWorld: fail('removeFromWorld'),
      addToGui: fail('addToGui'),
      removeFromGui: fail('removeFromGui'),
      getByUid: fail('getByUid'),
      getByDom: fail('getByDom'),
      broadcast: fail('broadcast'),
      broadcastOn: fail('broadcastOn')
    });
  };

  var byInnerKey = function (data, tuple) {
    var r = {};
    $_a7hrnswzjcgfo8tz.each(data, function (detail, key) {
      $_a7hrnswzjcgfo8tz.each(detail, function (value, indexKey) {
        var chain = $_8fkfzex5jcgfo8wf.readOr(indexKey, [])(r);
        r[indexKey] = chain.concat([tuple(key, value)]);
      });
    });
    return r;
  };
  var $_1ltuvy12rjcgfoap7 = { byInnerKey: byInnerKey };

  var behaviourDom = function (name, modification) {
    return {
      name: $_ee1z6xwajcgfo8qa.constant(name),
      modification: modification
    };
  };
  var concat = function (chain, aspect) {
    var values = $_3h0i9zw8jcgfo8px.bind(chain, function (c) {
      return c.modification().getOr([]);
    });
    return $_eyzbemx7jcgfo8x7.value($_8fkfzex5jcgfo8wf.wrap(aspect, values));
  };
  var onlyOne = function (chain, aspect, order) {
    if (chain.length > 1)
      return $_eyzbemx7jcgfo8x7.error('Multiple behaviours have tried to change DOM "' + aspect + '". The guilty behaviours are: ' + $_8pq9zfxejcgfo8yf.stringify($_3h0i9zw8jcgfo8px.map(chain, function (b) {
        return b.name();
      })) + '. At this stage, this ' + 'is not supported. Future releases might provide strategies for resolving this.');
    else if (chain.length === 0)
      return $_eyzbemx7jcgfo8x7.value({});
    else
      return $_eyzbemx7jcgfo8x7.value(chain[0].modification().fold(function () {
        return {};
      }, function (m) {
        return $_8fkfzex5jcgfo8wf.wrap(aspect, m);
      }));
  };
  var duplicate = function (aspect, k, obj, behaviours) {
    return $_eyzbemx7jcgfo8x7.error('Mulitple behaviours have tried to change the _' + k + '_ "' + aspect + '"' + '. The guilty behaviours are: ' + $_8pq9zfxejcgfo8yf.stringify($_3h0i9zw8jcgfo8px.bind(behaviours, function (b) {
      return b.modification().getOr({})[k] !== undefined ? [b.name()] : [];
    }), null, 2) + '. This is not currently supported.');
  };
  var safeMerge = function (chain, aspect) {
    var y = $_3h0i9zw8jcgfo8px.foldl(chain, function (acc, c) {
      var obj = c.modification().getOr({});
      return acc.bind(function (accRest) {
        var parts = $_a7hrnswzjcgfo8tz.mapToArray(obj, function (v, k) {
          return accRest[k] !== undefined ? duplicate(aspect, k, obj, chain) : $_eyzbemx7jcgfo8x7.value($_8fkfzex5jcgfo8wf.wrap(k, v));
        });
        return $_8fkfzex5jcgfo8wf.consolidate(parts, accRest);
      });
    }, $_eyzbemx7jcgfo8x7.value({}));
    return y.map(function (yValue) {
      return $_8fkfzex5jcgfo8wf.wrap(aspect, yValue);
    });
  };
  var mergeTypes = {
    classes: concat,
    attributes: safeMerge,
    styles: safeMerge,
    domChildren: onlyOne,
    defChildren: onlyOne,
    innerHtml: onlyOne,
    value: onlyOne
  };
  var combine$1 = function (info, baseMod, behaviours, base) {
    var behaviourDoms = $_au1coewxjcgfo8tp.deepMerge({}, baseMod);
    $_3h0i9zw8jcgfo8px.each(behaviours, function (behaviour) {
      behaviourDoms[behaviour.name()] = behaviour.exhibit(info, base);
    });
    var byAspect = $_1ltuvy12rjcgfoap7.byInnerKey(behaviourDoms, behaviourDom);
    var usedAspect = $_a7hrnswzjcgfo8tz.map(byAspect, function (values, aspect) {
      return $_3h0i9zw8jcgfo8px.bind(values, function (value) {
        return value.modification().fold(function () {
          return [];
        }, function (v) {
          return [value];
        });
      });
    });
    var modifications = $_a7hrnswzjcgfo8tz.mapToArray(usedAspect, function (values, aspect) {
      return $_8fkfzex5jcgfo8wf.readOptFrom(mergeTypes, aspect).fold(function () {
        return $_eyzbemx7jcgfo8x7.error('Unknown field type: ' + aspect);
      }, function (merger) {
        return merger(values, aspect);
      });
    });
    var consolidated = $_8fkfzex5jcgfo8wf.consolidate(modifications, {});
    return consolidated.map($_5jneh4xjjcgfo8z7.nu);
  };
  var $_ezk44212qjcgfoaoi = { combine: combine$1 };

  var sortKeys = function (label, keyName, array, order) {
    var sliced = array.slice(0);
    try {
      var sorted = sliced.sort(function (a, b) {
        var aKey = a[keyName]();
        var bKey = b[keyName]();
        var aIndex = order.indexOf(aKey);
        var bIndex = order.indexOf(bKey);
        if (aIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + aKey + '.\nOrder specified: ' + $_8pq9zfxejcgfo8yf.stringify(order, null, 2));
        if (bIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + bKey + '.\nOrder specified: ' + $_8pq9zfxejcgfo8yf.stringify(order, null, 2));
        if (aIndex < bIndex)
          return -1;
        else if (bIndex < aIndex)
          return 1;
        else
          return 0;
      });
      return $_eyzbemx7jcgfo8x7.value(sorted);
    } catch (err) {
      return $_eyzbemx7jcgfo8x7.error([err]);
    }
  };
  var $_2mf5gg12tjcgfoaq6 = { sortKeys: sortKeys };

  var nu$7 = function (handler, purpose) {
    return {
      handler: handler,
      purpose: $_ee1z6xwajcgfo8qa.constant(purpose)
    };
  };
  var curryArgs = function (descHandler, extraArgs) {
    return {
      handler: $_ee1z6xwajcgfo8qa.curry.apply(undefined, [descHandler.handler].concat(extraArgs)),
      purpose: descHandler.purpose
    };
  };
  var getHandler = function (descHandler) {
    return descHandler.handler;
  };
  var $_1xb3k712ujcgfoaqf = {
    nu: nu$7,
    curryArgs: curryArgs,
    getHandler: getHandler
  };

  var behaviourTuple = function (name, handler) {
    return {
      name: $_ee1z6xwajcgfo8qa.constant(name),
      handler: $_ee1z6xwajcgfo8qa.constant(handler)
    };
  };
  var nameToHandlers = function (behaviours, info) {
    var r = {};
    $_3h0i9zw8jcgfo8px.each(behaviours, function (behaviour) {
      r[behaviour.name()] = behaviour.handlers(info);
    });
    return r;
  };
  var groupByEvents = function (info, behaviours, base) {
    var behaviourEvents = $_au1coewxjcgfo8tp.deepMerge(base, nameToHandlers(behaviours, info));
    return $_1ltuvy12rjcgfoap7.byInnerKey(behaviourEvents, behaviourTuple);
  };
  var combine$2 = function (info, eventOrder, behaviours, base) {
    var byEventName = groupByEvents(info, behaviours, base);
    return combineGroups(byEventName, eventOrder);
  };
  var assemble = function (rawHandler) {
    var handler = $_bfrqsvx0jcgfo8u3.read(rawHandler);
    return function (component, simulatedEvent) {
      var args = Array.prototype.slice.call(arguments, 0);
      if (handler.abort.apply(undefined, args)) {
        simulatedEvent.stop();
      } else if (handler.can.apply(undefined, args)) {
        handler.run.apply(undefined, args);
      }
    };
  };
  var missingOrderError = function (eventName, tuples) {
    return new $_eyzbemx7jcgfo8x7.error(['The event (' + eventName + ') has more than one behaviour that listens to it.\nWhen this occurs, you must ' + 'specify an event ordering for the behaviours in your spec (e.g. [ "listing", "toggling" ]).\nThe behaviours that ' + 'can trigger it are: ' + $_8pq9zfxejcgfo8yf.stringify($_3h0i9zw8jcgfo8px.map(tuples, function (c) {
        return c.name();
      }), null, 2)]);
  };
  var fuse$1 = function (tuples, eventOrder, eventName) {
    var order = eventOrder[eventName];
    if (!order)
      return missingOrderError(eventName, tuples);
    else
      return $_2mf5gg12tjcgfoaq6.sortKeys('Event: ' + eventName, 'name', tuples, order).map(function (sortedTuples) {
        var handlers = $_3h0i9zw8jcgfo8px.map(sortedTuples, function (tuple) {
          return tuple.handler();
        });
        return $_bfrqsvx0jcgfo8u3.fuse(handlers);
      });
  };
  var combineGroups = function (byEventName, eventOrder) {
    var r = $_a7hrnswzjcgfo8tz.mapToArray(byEventName, function (tuples, eventName) {
      var combined = tuples.length === 1 ? $_eyzbemx7jcgfo8x7.value(tuples[0].handler()) : fuse$1(tuples, eventOrder, eventName);
      return combined.map(function (handler) {
        var assembled = assemble(handler);
        var purpose = tuples.length > 1 ? $_3h0i9zw8jcgfo8px.filter(eventOrder, function (o) {
          return $_3h0i9zw8jcgfo8px.contains(tuples, function (t) {
            return t.name() === o;
          });
        }).join(' > ') : tuples[0].name();
        return $_8fkfzex5jcgfo8wf.wrap(eventName, $_1xb3k712ujcgfoaqf.nu(assembled, purpose));
      });
    });
    return $_8fkfzex5jcgfo8wf.consolidate(r, {});
  };
  var $_ffwzxc12sjcgfoapg = { combine: combine$2 };

  var toInfo = function (spec) {
    return $_783jrjxgjcgfo8yn.asStruct('custom.definition', $_783jrjxgjcgfo8yn.objOfOnly([
      $_6inazsx1jcgfo8uu.field('dom', 'dom', $_d0l63jx2jcgfo8v5.strict(), $_783jrjxgjcgfo8yn.objOfOnly([
        $_6inazsx1jcgfo8uu.strict('tag'),
        $_6inazsx1jcgfo8uu.defaulted('styles', {}),
        $_6inazsx1jcgfo8uu.defaulted('classes', []),
        $_6inazsx1jcgfo8uu.defaulted('attributes', {}),
        $_6inazsx1jcgfo8uu.option('value'),
        $_6inazsx1jcgfo8uu.option('innerHtml')
      ])),
      $_6inazsx1jcgfo8uu.strict('components'),
      $_6inazsx1jcgfo8uu.strict('uid'),
      $_6inazsx1jcgfo8uu.defaulted('events', {}),
      $_6inazsx1jcgfo8uu.defaulted('apis', $_ee1z6xwajcgfo8qa.constant({})),
      $_6inazsx1jcgfo8uu.field('eventOrder', 'eventOrder', $_d0l63jx2jcgfo8v5.mergeWith({
        'alloy.execute': [
          'disabling',
          'alloy.base.behaviour',
          'toggling'
        ],
        'alloy.focus': [
          'alloy.base.behaviour',
          'focusing',
          'keying'
        ],
        'alloy.system.init': [
          'alloy.base.behaviour',
          'disabling',
          'toggling',
          'representing'
        ],
        'input': [
          'alloy.base.behaviour',
          'representing',
          'streaming',
          'invalidating'
        ],
        'alloy.system.detached': [
          'alloy.base.behaviour',
          'representing'
        ]
      }), $_783jrjxgjcgfo8yn.anyValue()),
      $_6inazsx1jcgfo8uu.option('domModification'),
      $_dkk53lysjcgfo983.snapshot('originalSpec'),
      $_6inazsx1jcgfo8uu.defaulted('debug.sketcher', 'unknown')
    ]), spec);
  };
  var getUid = function (info) {
    return $_8fkfzex5jcgfo8wf.wrap($_a3vcbb10mjcgfo9sn.idAttr(), info.uid());
  };
  var toDefinition = function (info) {
    var base = {
      tag: info.dom().tag(),
      classes: info.dom().classes(),
      attributes: $_au1coewxjcgfo8tp.deepMerge(getUid(info), info.dom().attributes()),
      styles: info.dom().styles(),
      domChildren: $_3h0i9zw8jcgfo8px.map(info.components(), function (comp) {
        return comp.element();
      })
    };
    return $_5eg0fdxkjcgfo8zw.nu($_au1coewxjcgfo8tp.deepMerge(base, info.dom().innerHtml().map(function (h) {
      return $_8fkfzex5jcgfo8wf.wrap('innerHtml', h);
    }).getOr({}), info.dom().value().map(function (h) {
      return $_8fkfzex5jcgfo8wf.wrap('value', h);
    }).getOr({})));
  };
  var toModification = function (info) {
    return info.domModification().fold(function () {
      return $_5jneh4xjjcgfo8z7.nu({});
    }, $_5jneh4xjjcgfo8z7.nu);
  };
  var toApis = function (info) {
    return info.apis();
  };
  var toEvents = function (info) {
    return info.events();
  };
  var $_2v36g312vjcgfoaqk = {
    toInfo: toInfo,
    toDefinition: toDefinition,
    toModification: toModification,
    toApis: toApis,
    toEvents: toEvents
  };

  var add$3 = function (element, classes) {
    $_3h0i9zw8jcgfo8px.each(classes, function (x) {
      $_4ub0gextjcgfo90x.add(element, x);
    });
  };
  var remove$6 = function (element, classes) {
    $_3h0i9zw8jcgfo8px.each(classes, function (x) {
      $_4ub0gextjcgfo90x.remove(element, x);
    });
  };
  var toggle$3 = function (element, classes) {
    $_3h0i9zw8jcgfo8px.each(classes, function (x) {
      $_4ub0gextjcgfo90x.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_3h0i9zw8jcgfo8px.forall(classes, function (clazz) {
      return $_4ub0gextjcgfo90x.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_3h0i9zw8jcgfo8px.exists(classes, function (clazz) {
      return $_4ub0gextjcgfo90x.has(element, clazz);
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
  var get$10 = function (element) {
    return $_d7qymxxxjcgfo91g.supports(element) ? getNative(element) : $_d7qymxxxjcgfo91g.get(element);
  };
  var $_9yt2vd12xjcgfoas3 = {
    add: add$3,
    remove: remove$6,
    toggle: toggle$3,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$10
  };

  var getChildren = function (definition) {
    if (definition.domChildren().isSome() && definition.defChildren().isSome()) {
      throw new Error('Cannot specify children and child specs! Must be one or the other.\nDef: ' + $_5eg0fdxkjcgfo8zw.defToStr(definition));
    } else {
      return definition.domChildren().fold(function () {
        var defChildren = definition.defChildren().getOr([]);
        return $_3h0i9zw8jcgfo8px.map(defChildren, renderDef);
      }, function (domChildren) {
        return domChildren;
      });
    }
  };
  var renderToDom = function (definition) {
    var subject = $_6rcvbhwsjcgfo8sm.fromTag(definition.tag());
    $_8ut06dxvjcgfo912.setAll(subject, definition.attributes().getOr({}));
    $_9yt2vd12xjcgfoas3.add(subject, definition.classes().getOr([]));
    $_9qule1zrjcgfo9ge.setAll(subject, definition.styles().getOr({}));
    $_8dqis5yajcgfo94u.set(subject, definition.innerHtml().getOr(''));
    var children = getChildren(definition);
    $_979fusy5jcgfo93m.append(subject, children);
    definition.value().each(function (value) {
      $_8yhye311zjcgfoadi.set(subject, value);
    });
    return subject;
  };
  var renderDef = function (spec) {
    var definition = $_5eg0fdxkjcgfo8zw.nu(spec);
    return renderToDom(definition);
  };
  var $_egoo1y12wjcgfoar9 = { renderToDom: renderToDom };

  var build$1 = function (spec) {
    var getMe = function () {
      return me;
    };
    var systemApi = Cell(NoContextApi(getMe));
    var info = $_783jrjxgjcgfo8yn.getOrDie($_2v36g312vjcgfoaqk.toInfo($_au1coewxjcgfo8tp.deepMerge(spec, { behaviours: undefined })));
    var bBlob = $_ccmv3712ljcgfoamy.generate(spec);
    var bList = $_2gij8812mjcgfoanb.getBehaviours(bBlob);
    var bData = $_2gij8812mjcgfoanb.getData(bBlob);
    var definition = $_2v36g312vjcgfoaqk.toDefinition(info);
    var baseModification = { 'alloy.base.modification': $_2v36g312vjcgfoaqk.toModification(info) };
    var modification = $_ezk44212qjcgfoaoi.combine(bData, baseModification, bList, definition).getOrDie();
    var modDefinition = $_5jneh4xjjcgfo8z7.merge(definition, modification);
    var item = $_egoo1y12wjcgfoar9.renderToDom(modDefinition);
    var baseEvents = { 'alloy.base.behaviour': $_2v36g312vjcgfoaqk.toEvents(info) };
    var events = $_ffwzxc12sjcgfoapg.combine(bData, info.eventOrder(), bList, baseEvents).getOrDie();
    var subcomponents = Cell(info.components());
    var connect = function (newApi) {
      systemApi.set(newApi);
    };
    var disconnect = function () {
      systemApi.set(NoContextApi(getMe));
    };
    var syncComponents = function () {
      var children = $_dd88k4y2jcgfo92t.children(item);
      var subs = $_3h0i9zw8jcgfo8px.bind(children, function (child) {
        return systemApi.get().getByDom(child).fold(function () {
          return [];
        }, function (c) {
          return [c];
        });
      });
      subcomponents.set(subs);
    };
    var config = function (behaviour) {
      if (behaviour === $_c7yo6t10ejcgfo9oj.apiConfig())
        return info.apis();
      var b = bData;
      var f = $_eregpvwyjcgfo8ts.isFunction(b[behaviour.name()]) ? b[behaviour.name()] : function () {
        throw new Error('Could not find ' + behaviour.name() + ' in ' + $_8pq9zfxejcgfo8yf.stringify(spec, null, 2));
      };
      return f();
    };
    var hasConfigured = function (behaviour) {
      return $_eregpvwyjcgfo8ts.isFunction(bData[behaviour.name()]);
    };
    var readState = function (behaviourName) {
      return bData[behaviourName]().map(function (b) {
        return b.state.readState();
      }).getOr('not enabled');
    };
    var me = ComponentApi({
      getSystem: systemApi.get,
      config: config,
      hasConfigured: hasConfigured,
      spec: $_ee1z6xwajcgfo8qa.constant(spec),
      readState: readState,
      connect: connect,
      disconnect: disconnect,
      element: $_ee1z6xwajcgfo8qa.constant(item),
      syncComponents: syncComponents,
      components: subcomponents.get,
      events: $_ee1z6xwajcgfo8qa.constant(events)
    });
    return me;
  };
  var $_1hzryd12kjcgfoam0 = { build: build$1 };

  var isRecursive = function (component, originator, target) {
    return $_8prpzjw7jcgfo8p9.eq(originator, component.element()) && !$_8prpzjw7jcgfo8p9.eq(originator, target);
  };
  var $_fkcmpr12yjcgfoasd = {
    events: $_de0ow7w5jcgfo8ot.derive([$_de0ow7w5jcgfo8ot.can($_1snegiwvjcgfo8tb.focus(), function (component, simulatedEvent) {
        var originator = simulatedEvent.event().originator();
        var target = simulatedEvent.event().target();
        if (isRecursive(component, originator, target)) {
          console.warn($_1snegiwvjcgfo8tb.focus() + ' did not get interpreted by the desired target. ' + '\nOriginator: ' + $_5b4pz8y8jcgfo94i.element(originator) + '\nTarget: ' + $_5b4pz8y8jcgfo94i.element(target) + '\nCheck the ' + $_1snegiwvjcgfo8tb.focus() + ' event handlers');
          return false;
        } else {
          return true;
        }
      })])
  };

  var make$1 = function (spec) {
    return spec;
  };
  var $_ec1n8i12zjcgfoasi = { make: make$1 };

  var buildSubcomponents = function (spec) {
    var components = $_8fkfzex5jcgfo8wf.readOr('components', [])(spec);
    return $_3h0i9zw8jcgfo8px.map(components, build);
  };
  var buildFromSpec = function (userSpec) {
    var spec = $_ec1n8i12zjcgfoasi.make(userSpec);
    var components = buildSubcomponents(spec);
    var completeSpec = $_au1coewxjcgfo8tp.deepMerge($_fkcmpr12yjcgfoasd, spec, $_8fkfzex5jcgfo8wf.wrap('components', components));
    return $_eyzbemx7jcgfo8x7.value($_1hzryd12kjcgfoam0.build(completeSpec));
  };
  var text = function (textContent) {
    var element = $_6rcvbhwsjcgfo8sm.fromText(textContent);
    return external({ element: element });
  };
  var external = function (spec) {
    var extSpec = $_783jrjxgjcgfo8yn.asStructOrDie('external.component', $_783jrjxgjcgfo8yn.objOfOnly([
      $_6inazsx1jcgfo8uu.strict('element'),
      $_6inazsx1jcgfo8uu.option('uid')
    ]), spec);
    var systemApi = Cell(NoContextApi());
    var connect = function (newApi) {
      systemApi.set(newApi);
    };
    var disconnect = function () {
      systemApi.set(NoContextApi(function () {
        return me;
      }));
    };
    extSpec.uid().each(function (uid) {
      $_77g8b110ljcgfo9s0.writeOnly(extSpec.element(), uid);
    });
    var me = ComponentApi({
      getSystem: systemApi.get,
      config: $_d7fxouw9jcgfo8q5.none,
      hasConfigured: $_ee1z6xwajcgfo8qa.constant(false),
      connect: connect,
      disconnect: disconnect,
      element: $_ee1z6xwajcgfo8qa.constant(extSpec.element()),
      spec: $_ee1z6xwajcgfo8qa.constant(spec),
      readState: $_ee1z6xwajcgfo8qa.constant('No state'),
      syncComponents: $_ee1z6xwajcgfo8qa.noop,
      components: $_ee1z6xwajcgfo8qa.constant([]),
      events: $_ee1z6xwajcgfo8qa.constant({})
    });
    return $_c7yo6t10ejcgfo9oj.premade(me);
  };
  var build = function (rawUserSpec) {
    return $_c7yo6t10ejcgfo9oj.getPremade(rawUserSpec).fold(function () {
      var userSpecWithUid = $_au1coewxjcgfo8tp.deepMerge({ uid: $_77g8b110ljcgfo9s0.generate('') }, rawUserSpec);
      return buildFromSpec(userSpecWithUid).getOrDie();
    }, function (prebuilt) {
      return prebuilt;
    });
  };
  var $_8rjh5i12jjcgfoal1 = {
    build: build,
    premade: $_c7yo6t10ejcgfo9oj.premade,
    external: external,
    text: text
  };

  var hoverEvent = 'alloy.item-hover';
  var focusEvent = 'alloy.item-focus';
  var onHover = function (item) {
    if ($_evqgdsyfjcgfo95e.search(item.element()).isNone() || Focusing.isFocused(item)) {
      if (!Focusing.isFocused(item))
        Focusing.focus(item);
      $_4x498fwujcgfo8sy.emitWith(item, hoverEvent, { item: item });
    }
  };
  var onFocus = function (item) {
    $_4x498fwujcgfo8sy.emitWith(item, focusEvent, { item: item });
  };
  var $_76h4cg133jcgfoatd = {
    hover: $_ee1z6xwajcgfo8qa.constant(hoverEvent),
    focus: $_ee1z6xwajcgfo8qa.constant(focusEvent),
    onHover: onHover,
    onFocus: onFocus
  };

  var builder = function (info) {
    return {
      dom: $_au1coewxjcgfo8tp.deepMerge(info.dom(), { attributes: { role: info.toggling().isSome() ? 'menuitemcheckbox' : 'menuitem' } }),
      behaviours: $_au1coewxjcgfo8tp.deepMerge($_395jq4w3jcgfo8n1.derive([
        info.toggling().fold(Toggling.revoke, function (tConfig) {
          return Toggling.config($_au1coewxjcgfo8tp.deepMerge({ aria: { mode: 'checked' } }, tConfig));
        }),
        Focusing.config({
          ignore: info.ignoreFocus(),
          onFocus: function (component) {
            $_76h4cg133jcgfoatd.onFocus(component);
          }
        }),
        Keying.config({ mode: 'execution' }),
        me.config({
          store: {
            mode: 'memory',
            initialValue: info.data()
          }
        })
      ]), info.itemBehaviours()),
      events: $_de0ow7w5jcgfo8ot.derive([
        $_de0ow7w5jcgfo8ot.runWithTarget($_1snegiwvjcgfo8tb.tapOrClick(), $_4x498fwujcgfo8sy.emitExecute),
        $_de0ow7w5jcgfo8ot.cutter($_8bjxvowwjcgfo8tj.mousedown()),
        $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.mouseover(), $_76h4cg133jcgfoatd.onHover),
        $_de0ow7w5jcgfo8ot.run($_1snegiwvjcgfo8tb.focusItem(), Focusing.focus)
      ]),
      components: info.components(),
      domModification: info.domModification()
    };
  };
  var schema$11 = [
    $_6inazsx1jcgfo8uu.strict('data'),
    $_6inazsx1jcgfo8uu.strict('components'),
    $_6inazsx1jcgfo8uu.strict('dom'),
    $_6inazsx1jcgfo8uu.option('toggling'),
    $_6inazsx1jcgfo8uu.defaulted('itemBehaviours', {}),
    $_6inazsx1jcgfo8uu.defaulted('ignoreFocus', false),
    $_6inazsx1jcgfo8uu.defaulted('domModification', {}),
    $_dkk53lysjcgfo983.output('builder', builder)
  ];

  var builder$1 = function (detail) {
    return {
      dom: detail.dom(),
      components: detail.components(),
      events: $_de0ow7w5jcgfo8ot.derive([$_de0ow7w5jcgfo8ot.stopper($_1snegiwvjcgfo8tb.focusItem())])
    };
  };
  var schema$12 = [
    $_6inazsx1jcgfo8uu.strict('dom'),
    $_6inazsx1jcgfo8uu.strict('components'),
    $_dkk53lysjcgfo983.output('builder', builder$1)
  ];

  var owner$2 = 'item-widget';
  var partTypes = [$_cdrten10jjcgfo9qn.required({
      name: 'widget',
      overrides: function (detail) {
        return {
          behaviours: $_395jq4w3jcgfo8n1.derive([me.config({
              store: {
                mode: 'manual',
                getValue: function (component) {
                  return detail.data();
                },
                setValue: function () {
                }
              }
            })])
        };
      }
    })];
  var $_fspadf136jcgfoau6 = {
    owner: $_ee1z6xwajcgfo8qa.constant(owner$2),
    parts: $_ee1z6xwajcgfo8qa.constant(partTypes)
  };

  var builder$2 = function (info) {
    var subs = $_15kt8q10hjcgfo9pa.substitutes($_fspadf136jcgfoau6.owner(), info, $_fspadf136jcgfoau6.parts());
    var components = $_15kt8q10hjcgfo9pa.components($_fspadf136jcgfoau6.owner(), info, subs.internals());
    var focusWidget = function (component) {
      return $_15kt8q10hjcgfo9pa.getPart(component, info, 'widget').map(function (widget) {
        Keying.focusIn(widget);
        return widget;
      });
    };
    var onHorizontalArrow = function (component, simulatedEvent) {
      return $_3604zdzwjcgfo9i3.inside(simulatedEvent.event().target()) ? $_d7fxouw9jcgfo8q5.none() : function () {
        if (info.autofocus()) {
          simulatedEvent.setSource(component.element());
          return $_d7fxouw9jcgfo8q5.none();
        } else {
          return $_d7fxouw9jcgfo8q5.none();
        }
      }();
    };
    return $_au1coewxjcgfo8tp.deepMerge({
      dom: info.dom(),
      components: components,
      domModification: info.domModification(),
      events: $_de0ow7w5jcgfo8ot.derive([
        $_de0ow7w5jcgfo8ot.runOnExecute(function (component, simulatedEvent) {
          focusWidget(component).each(function (widget) {
            simulatedEvent.stop();
          });
        }),
        $_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.mouseover(), $_76h4cg133jcgfoatd.onHover),
        $_de0ow7w5jcgfo8ot.run($_1snegiwvjcgfo8tb.focusItem(), function (component, simulatedEvent) {
          if (info.autofocus())
            focusWidget(component);
          else
            Focusing.focus(component);
        })
      ]),
      behaviours: $_395jq4w3jcgfo8n1.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: info.data()
          }
        }),
        Focusing.config({
          onFocus: function (component) {
            $_76h4cg133jcgfoatd.onFocus(component);
          }
        }),
        Keying.config({
          mode: 'special',
          onLeft: onHorizontalArrow,
          onRight: onHorizontalArrow,
          onEscape: function (component, simulatedEvent) {
            if (!Focusing.isFocused(component) && !info.autofocus()) {
              Focusing.focus(component);
              return $_d7fxouw9jcgfo8q5.some(true);
            } else if (info.autofocus()) {
              simulatedEvent.setSource(component.element());
              return $_d7fxouw9jcgfo8q5.none();
            } else {
              return $_d7fxouw9jcgfo8q5.none();
            }
          }
        })
      ])
    });
  };
  var schema$13 = [
    $_6inazsx1jcgfo8uu.strict('uid'),
    $_6inazsx1jcgfo8uu.strict('data'),
    $_6inazsx1jcgfo8uu.strict('components'),
    $_6inazsx1jcgfo8uu.strict('dom'),
    $_6inazsx1jcgfo8uu.defaulted('autofocus', false),
    $_6inazsx1jcgfo8uu.defaulted('domModification', {}),
    $_15kt8q10hjcgfo9pa.defaultUidsSchema($_fspadf136jcgfoau6.parts()),
    $_dkk53lysjcgfo983.output('builder', builder$2)
  ];

  var itemSchema$1 = $_783jrjxgjcgfo8yn.choose('type', {
    widget: schema$13,
    item: schema$11,
    separator: schema$12
  });
  var configureGrid = function (detail, movementInfo) {
    return {
      mode: 'flatgrid',
      selector: '.' + detail.markers().item(),
      initSize: {
        numColumns: movementInfo.initSize().numColumns(),
        numRows: movementInfo.initSize().numRows()
      },
      focusManager: detail.focusManager()
    };
  };
  var configureMenu = function (detail, movementInfo) {
    return {
      mode: 'menu',
      selector: '.' + detail.markers().item(),
      moveOnTab: movementInfo.moveOnTab(),
      focusManager: detail.focusManager()
    };
  };
  var parts = [$_cdrten10jjcgfo9qn.group({
      factory: {
        sketch: function (spec) {
          var itemInfo = $_783jrjxgjcgfo8yn.asStructOrDie('menu.spec item', itemSchema$1, spec);
          return itemInfo.builder()(itemInfo);
        }
      },
      name: 'items',
      unit: 'item',
      defaults: function (detail, u) {
        var fallbackUid = $_77g8b110ljcgfo9s0.generate('');
        return $_au1coewxjcgfo8tp.deepMerge({ uid: fallbackUid }, u);
      },
      overrides: function (detail, u) {
        return {
          type: u.type,
          ignoreFocus: detail.fakeFocus(),
          domModification: { classes: [detail.markers().item()] }
        };
      }
    })];
  var schema$10 = [
    $_6inazsx1jcgfo8uu.strict('value'),
    $_6inazsx1jcgfo8uu.strict('items'),
    $_6inazsx1jcgfo8uu.strict('dom'),
    $_6inazsx1jcgfo8uu.strict('components'),
    $_6inazsx1jcgfo8uu.defaulted('eventOrder', {}),
    $_70kbdh10cjcgfo9nm.field('menuBehaviours', [
      Highlighting,
      me,
      Composing,
      Keying
    ]),
    $_6inazsx1jcgfo8uu.defaultedOf('movement', {
      mode: 'menu',
      moveOnTab: true
    }, $_783jrjxgjcgfo8yn.choose('mode', {
      grid: [
        $_dkk53lysjcgfo983.initSize(),
        $_dkk53lysjcgfo983.output('config', configureGrid)
      ],
      menu: [
        $_6inazsx1jcgfo8uu.defaulted('moveOnTab', true),
        $_dkk53lysjcgfo983.output('config', configureMenu)
      ]
    })),
    $_dkk53lysjcgfo983.itemMarkers(),
    $_6inazsx1jcgfo8uu.defaulted('fakeFocus', false),
    $_6inazsx1jcgfo8uu.defaulted('focusManager', $_bs0cyuzfjcgfo9dz.dom()),
    $_dkk53lysjcgfo983.onHandler('onHighlight')
  ];
  var $_f0pu7u131jcgfoasn = {
    name: $_ee1z6xwajcgfo8qa.constant('Menu'),
    schema: $_ee1z6xwajcgfo8qa.constant(schema$10),
    parts: $_ee1z6xwajcgfo8qa.constant(parts)
  };

  var focusEvent$1 = 'alloy.menu-focus';
  var $_5wfy6x138jcgfoaul = { focus: $_ee1z6xwajcgfo8qa.constant(focusEvent$1) };

  var make$2 = function (detail, components, spec, externals) {
    return $_au1coewxjcgfo8tp.deepMerge({
      dom: $_au1coewxjcgfo8tp.deepMerge(detail.dom(), { attributes: { role: 'menu' } }),
      uid: detail.uid(),
      behaviours: $_au1coewxjcgfo8tp.deepMerge($_395jq4w3jcgfo8n1.derive([
        Highlighting.config({
          highlightClass: detail.markers().selectedItem(),
          itemClass: detail.markers().item(),
          onHighlight: detail.onHighlight()
        }),
        me.config({
          store: {
            mode: 'memory',
            initialValue: detail.value()
          }
        }),
        Composing.config({ find: $_ee1z6xwajcgfo8qa.identity }),
        Keying.config(detail.movement().config()(detail, detail.movement()))
      ]), $_70kbdh10cjcgfo9nm.get(detail.menuBehaviours())),
      events: $_de0ow7w5jcgfo8ot.derive([
        $_de0ow7w5jcgfo8ot.run($_76h4cg133jcgfoatd.focus(), function (menu, simulatedEvent) {
          var event = simulatedEvent.event();
          menu.getSystem().getByDom(event.target()).each(function (item) {
            Highlighting.highlight(menu, item);
            simulatedEvent.stop();
            $_4x498fwujcgfo8sy.emitWith(menu, $_5wfy6x138jcgfoaul.focus(), {
              menu: menu,
              item: item
            });
          });
        }),
        $_de0ow7w5jcgfo8ot.run($_76h4cg133jcgfoatd.hover(), function (menu, simulatedEvent) {
          var item = simulatedEvent.event().item();
          Highlighting.highlight(menu, item);
        })
      ]),
      components: components,
      eventOrder: detail.eventOrder()
    });
  };
  var $_7ccz5v137jcgfoauc = { make: make$2 };

  var Menu = $_8307zi10djcgfo9nz.composite({
    name: 'Menu',
    configFields: $_f0pu7u131jcgfoasn.schema(),
    partFields: $_f0pu7u131jcgfoasn.parts(),
    factory: $_7ccz5v137jcgfoauc.make
  });

  var preserve$2 = function (f, container) {
    var ownerDoc = $_dd88k4y2jcgfo92t.owner(container);
    var refocus = $_evqgdsyfjcgfo95e.active(ownerDoc).bind(function (focused) {
      var hasFocus = function (elem) {
        return $_8prpzjw7jcgfo8p9.eq(focused, elem);
      };
      return hasFocus(container) ? $_d7fxouw9jcgfo8q5.some(container) : $_d45jk3yhjcgfo95p.descendant(container, hasFocus);
    });
    var result = f(container);
    refocus.each(function (oldFocus) {
      $_evqgdsyfjcgfo95e.active(ownerDoc).filter(function (newFocus) {
        return $_8prpzjw7jcgfo8p9.eq(newFocus, oldFocus);
      }).orThunk(function () {
        $_evqgdsyfjcgfo95e.focus(oldFocus);
      });
    });
    return result;
  };
  var $_8dda8v13cjcgfoavl = { preserve: preserve$2 };

  var set$7 = function (component, replaceConfig, replaceState, data) {
    $_bi57h5y0jcgfo91w.detachChildren(component);
    $_8dda8v13cjcgfoavl.preserve(function () {
      var children = $_3h0i9zw8jcgfo8px.map(data, component.getSystem().build);
      $_3h0i9zw8jcgfo8px.each(children, function (l) {
        $_bi57h5y0jcgfo91w.attach(component, l);
      });
    }, component.element());
  };
  var insert = function (component, replaceConfig, insertion, childSpec) {
    var child = component.getSystem().build(childSpec);
    $_bi57h5y0jcgfo91w.attachWith(component, child, insertion);
  };
  var append$2 = function (component, replaceConfig, replaceState, appendee) {
    insert(component, replaceConfig, $_5ypytwy1jcgfo92q.append, appendee);
  };
  var prepend$2 = function (component, replaceConfig, replaceState, prependee) {
    insert(component, replaceConfig, $_5ypytwy1jcgfo92q.prepend, prependee);
  };
  var remove$7 = function (component, replaceConfig, replaceState, removee) {
    var children = contents(component, replaceConfig);
    var foundChild = $_3h0i9zw8jcgfo8px.find(children, function (child) {
      return $_8prpzjw7jcgfo8p9.eq(removee.element(), child.element());
    });
    foundChild.each($_bi57h5y0jcgfo91w.detach);
  };
  var contents = function (component, replaceConfig) {
    return component.components();
  };
  var $_7qsqv413bjcgfoav8 = {
    append: append$2,
    prepend: prepend$2,
    remove: remove$7,
    set: set$7,
    contents: contents
  };

  var Replacing = $_395jq4w3jcgfo8n1.create({
    fields: [],
    name: 'replacing',
    apis: $_7qsqv413bjcgfoav8
  });

  var transpose = function (obj) {
    return $_a7hrnswzjcgfo8tz.tupleMap(obj, function (v, k) {
      return {
        k: v,
        v: k
      };
    });
  };
  var trace = function (items, byItem, byMenu, finish) {
    return $_8fkfzex5jcgfo8wf.readOptFrom(byMenu, finish).bind(function (triggerItem) {
      return $_8fkfzex5jcgfo8wf.readOptFrom(items, triggerItem).bind(function (triggerMenu) {
        var rest = trace(items, byItem, byMenu, triggerMenu);
        return $_d7fxouw9jcgfo8q5.some([triggerMenu].concat(rest));
      });
    }).getOr([]);
  };
  var generate$5 = function (menus, expansions) {
    var items = {};
    $_a7hrnswzjcgfo8tz.each(menus, function (menuItems, menu) {
      $_3h0i9zw8jcgfo8px.each(menuItems, function (item) {
        items[item] = menu;
      });
    });
    var byItem = expansions;
    var byMenu = transpose(expansions);
    var menuPaths = $_a7hrnswzjcgfo8tz.map(byMenu, function (triggerItem, submenu) {
      return [submenu].concat(trace(items, byItem, byMenu, submenu));
    });
    return $_a7hrnswzjcgfo8tz.map(items, function (path) {
      return $_8fkfzex5jcgfo8wf.readOptFrom(menuPaths, path).getOr([path]);
    });
  };
  var $_7z7cy713fjcgfoaxz = { generate: generate$5 };

  var LayeredState = function () {
    var expansions = Cell({});
    var menus = Cell({});
    var paths = Cell({});
    var primary = Cell($_d7fxouw9jcgfo8q5.none());
    var toItemValues = Cell($_ee1z6xwajcgfo8qa.constant([]));
    var clear = function () {
      expansions.set({});
      menus.set({});
      paths.set({});
      primary.set($_d7fxouw9jcgfo8q5.none());
    };
    var isClear = function () {
      return primary.get().isNone();
    };
    var setContents = function (sPrimary, sMenus, sExpansions, sToItemValues) {
      primary.set($_d7fxouw9jcgfo8q5.some(sPrimary));
      expansions.set(sExpansions);
      menus.set(sMenus);
      toItemValues.set(sToItemValues);
      var menuValues = sToItemValues(sMenus);
      var sPaths = $_7z7cy713fjcgfoaxz.generate(menuValues, sExpansions);
      paths.set(sPaths);
    };
    var expand = function (itemValue) {
      return $_8fkfzex5jcgfo8wf.readOptFrom(expansions.get(), itemValue).map(function (menu) {
        var current = $_8fkfzex5jcgfo8wf.readOptFrom(paths.get(), itemValue).getOr([]);
        return [menu].concat(current);
      });
    };
    var collapse = function (itemValue) {
      return $_8fkfzex5jcgfo8wf.readOptFrom(paths.get(), itemValue).bind(function (path) {
        return path.length > 1 ? $_d7fxouw9jcgfo8q5.some(path.slice(1)) : $_d7fxouw9jcgfo8q5.none();
      });
    };
    var refresh = function (itemValue) {
      return $_8fkfzex5jcgfo8wf.readOptFrom(paths.get(), itemValue);
    };
    var lookupMenu = function (menuValue) {
      return $_8fkfzex5jcgfo8wf.readOptFrom(menus.get(), menuValue);
    };
    var otherMenus = function (path) {
      var menuValues = toItemValues.get()(menus.get());
      return $_3h0i9zw8jcgfo8px.difference($_a7hrnswzjcgfo8tz.keys(menuValues), path);
    };
    var getPrimary = function () {
      return primary.get().bind(lookupMenu);
    };
    var getMenus = function () {
      return menus.get();
    };
    return {
      setContents: setContents,
      expand: expand,
      refresh: refresh,
      collapse: collapse,
      lookupMenu: lookupMenu,
      otherMenus: otherMenus,
      getPrimary: getPrimary,
      getMenus: getMenus,
      clear: clear,
      isClear: isClear
    };
  };

  var make$3 = function (detail, rawUiSpec) {
    var buildMenus = function (container, menus) {
      return $_a7hrnswzjcgfo8tz.map(menus, function (spec, name) {
        var data = Menu.sketch($_au1coewxjcgfo8tp.deepMerge(spec, {
          value: name,
          items: spec.items,
          markers: $_8fkfzex5jcgfo8wf.narrow(rawUiSpec.markers, [
            'item',
            'selectedItem'
          ]),
          fakeFocus: detail.fakeFocus(),
          onHighlight: detail.onHighlight(),
          focusManager: detail.fakeFocus() ? $_bs0cyuzfjcgfo9dz.highlights() : $_bs0cyuzfjcgfo9dz.dom()
        }));
        return container.getSystem().build(data);
      });
    };
    var state = LayeredState();
    var setup = function (container) {
      var componentMap = buildMenus(container, detail.data().menus());
      state.setContents(detail.data().primary(), componentMap, detail.data().expansions(), function (sMenus) {
        return toMenuValues(container, sMenus);
      });
      return state.getPrimary();
    };
    var getItemValue = function (item) {
      return me.getValue(item).value;
    };
    var toMenuValues = function (container, sMenus) {
      return $_a7hrnswzjcgfo8tz.map(detail.data().menus(), function (data, menuName) {
        return $_3h0i9zw8jcgfo8px.bind(data.items, function (item) {
          return item.type === 'separator' ? [] : [item.data.value];
        });
      });
    };
    var setActiveMenu = function (container, menu) {
      Highlighting.highlight(container, menu);
      Highlighting.getHighlighted(menu).orThunk(function () {
        return Highlighting.getFirst(menu);
      }).each(function (item) {
        $_4x498fwujcgfo8sy.dispatch(container, item.element(), $_1snegiwvjcgfo8tb.focusItem());
      });
    };
    var getMenus = function (state, menuValues) {
      return $_czjvbsydjcgfo959.cat($_3h0i9zw8jcgfo8px.map(menuValues, state.lookupMenu));
    };
    var updateMenuPath = function (container, state, path) {
      return $_d7fxouw9jcgfo8q5.from(path[0]).bind(state.lookupMenu).map(function (activeMenu) {
        var rest = getMenus(state, path.slice(1));
        $_3h0i9zw8jcgfo8px.each(rest, function (r) {
          $_4ub0gextjcgfo90x.add(r.element(), detail.markers().backgroundMenu());
        });
        if (!$_g9a7hjy6jcgfo93s.inBody(activeMenu.element())) {
          Replacing.append(container, $_8rjh5i12jjcgfoal1.premade(activeMenu));
        }
        $_9yt2vd12xjcgfoas3.remove(activeMenu.element(), [detail.markers().backgroundMenu()]);
        setActiveMenu(container, activeMenu);
        var others = getMenus(state, state.otherMenus(path));
        $_3h0i9zw8jcgfo8px.each(others, function (o) {
          $_9yt2vd12xjcgfoas3.remove(o.element(), [detail.markers().backgroundMenu()]);
          if (!detail.stayInDom())
            Replacing.remove(container, o);
        });
        return activeMenu;
      });
    };
    var expandRight = function (container, item) {
      var value = getItemValue(item);
      return state.expand(value).bind(function (path) {
        $_d7fxouw9jcgfo8q5.from(path[0]).bind(state.lookupMenu).each(function (activeMenu) {
          if (!$_g9a7hjy6jcgfo93s.inBody(activeMenu.element())) {
            Replacing.append(container, $_8rjh5i12jjcgfoal1.premade(activeMenu));
          }
          detail.onOpenSubmenu()(container, item, activeMenu);
          Highlighting.highlightFirst(activeMenu);
        });
        return updateMenuPath(container, state, path);
      });
    };
    var collapseLeft = function (container, item) {
      var value = getItemValue(item);
      return state.collapse(value).bind(function (path) {
        return updateMenuPath(container, state, path).map(function (activeMenu) {
          detail.onCollapseMenu()(container, item, activeMenu);
          return activeMenu;
        });
      });
    };
    var updateView = function (container, item) {
      var value = getItemValue(item);
      return state.refresh(value).bind(function (path) {
        return updateMenuPath(container, state, path);
      });
    };
    var onRight = function (container, item) {
      return $_3604zdzwjcgfo9i3.inside(item.element()) ? $_d7fxouw9jcgfo8q5.none() : expandRight(container, item);
    };
    var onLeft = function (container, item) {
      return $_3604zdzwjcgfo9i3.inside(item.element()) ? $_d7fxouw9jcgfo8q5.none() : collapseLeft(container, item);
    };
    var onEscape = function (container, item) {
      return collapseLeft(container, item).orThunk(function () {
        return detail.onEscape()(container, item);
      });
    };
    var keyOnItem = function (f) {
      return function (container, simulatedEvent) {
        return $_dka7lkzljcgfo9fe.closest(simulatedEvent.getSource(), '.' + detail.markers().item()).bind(function (target) {
          return container.getSystem().getByDom(target).bind(function (item) {
            return f(container, item);
          });
        });
      };
    };
    var events = $_de0ow7w5jcgfo8ot.derive([
      $_de0ow7w5jcgfo8ot.run($_5wfy6x138jcgfoaul.focus(), function (sandbox, simulatedEvent) {
        var menu = simulatedEvent.event().menu();
        Highlighting.highlight(sandbox, menu);
      }),
      $_de0ow7w5jcgfo8ot.runOnExecute(function (sandbox, simulatedEvent) {
        var target = simulatedEvent.event().target();
        return sandbox.getSystem().getByDom(target).bind(function (item) {
          var itemValue = getItemValue(item);
          if (itemValue.indexOf('collapse-item') === 0) {
            return collapseLeft(sandbox, item);
          }
          return expandRight(sandbox, item).orThunk(function () {
            return detail.onExecute()(sandbox, item);
          });
        });
      }),
      $_de0ow7w5jcgfo8ot.runOnAttached(function (container, simulatedEvent) {
        setup(container).each(function (primary) {
          Replacing.append(container, $_8rjh5i12jjcgfoal1.premade(primary));
          if (detail.openImmediately()) {
            setActiveMenu(container, primary);
            detail.onOpenMenu()(container, primary);
          }
        });
      })
    ].concat(detail.navigateOnHover() ? [$_de0ow7w5jcgfo8ot.run($_76h4cg133jcgfoatd.hover(), function (sandbox, simulatedEvent) {
        var item = simulatedEvent.event().item();
        updateView(sandbox, item);
        expandRight(sandbox, item);
        detail.onHover()(sandbox, item);
      })] : []));
    var collapseMenuApi = function (container) {
      Highlighting.getHighlighted(container).each(function (currentMenu) {
        Highlighting.getHighlighted(currentMenu).each(function (currentItem) {
          collapseLeft(container, currentItem);
        });
      });
    };
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      behaviours: $_au1coewxjcgfo8tp.deepMerge($_395jq4w3jcgfo8n1.derive([
        Keying.config({
          mode: 'special',
          onRight: keyOnItem(onRight),
          onLeft: keyOnItem(onLeft),
          onEscape: keyOnItem(onEscape),
          focusIn: function (container, keyInfo) {
            state.getPrimary().each(function (primary) {
              $_4x498fwujcgfo8sy.dispatch(container, primary.element(), $_1snegiwvjcgfo8tb.focusItem());
            });
          }
        }),
        Highlighting.config({
          highlightClass: detail.markers().selectedMenu(),
          itemClass: detail.markers().menu()
        }),
        Composing.config({
          find: function (container) {
            return Highlighting.getHighlighted(container);
          }
        }),
        Replacing.config({})
      ]), $_70kbdh10cjcgfo9nm.get(detail.tmenuBehaviours())),
      eventOrder: detail.eventOrder(),
      apis: { collapseMenu: collapseMenuApi },
      events: events
    };
  };
  var $_8ozhro13djcgfoaw5 = {
    make: make$3,
    collapseItem: $_ee1z6xwajcgfo8qa.constant('collapse-item')
  };

  var tieredData = function (primary, menus, expansions) {
    return {
      primary: primary,
      menus: menus,
      expansions: expansions
    };
  };
  var singleData = function (name, menu) {
    return {
      primary: name,
      menus: $_8fkfzex5jcgfo8wf.wrap(name, menu),
      expansions: {}
    };
  };
  var collapseItem = function (text) {
    return {
      value: $_gcx8v510fjcgfo9ox.generate($_8ozhro13djcgfoaw5.collapseItem()),
      text: text
    };
  };
  var TieredMenu = $_8307zi10djcgfo9nz.single({
    name: 'TieredMenu',
    configFields: [
      $_dkk53lysjcgfo983.onStrictKeyboardHandler('onExecute'),
      $_dkk53lysjcgfo983.onStrictKeyboardHandler('onEscape'),
      $_dkk53lysjcgfo983.onStrictHandler('onOpenMenu'),
      $_dkk53lysjcgfo983.onStrictHandler('onOpenSubmenu'),
      $_dkk53lysjcgfo983.onHandler('onCollapseMenu'),
      $_6inazsx1jcgfo8uu.defaulted('openImmediately', true),
      $_6inazsx1jcgfo8uu.strictObjOf('data', [
        $_6inazsx1jcgfo8uu.strict('primary'),
        $_6inazsx1jcgfo8uu.strict('menus'),
        $_6inazsx1jcgfo8uu.strict('expansions')
      ]),
      $_6inazsx1jcgfo8uu.defaulted('fakeFocus', false),
      $_dkk53lysjcgfo983.onHandler('onHighlight'),
      $_dkk53lysjcgfo983.onHandler('onHover'),
      $_dkk53lysjcgfo983.tieredMenuMarkers(),
      $_6inazsx1jcgfo8uu.strict('dom'),
      $_6inazsx1jcgfo8uu.defaulted('navigateOnHover', true),
      $_6inazsx1jcgfo8uu.defaulted('stayInDom', false),
      $_70kbdh10cjcgfo9nm.field('tmenuBehaviours', [
        Keying,
        Highlighting,
        Composing,
        Replacing
      ]),
      $_6inazsx1jcgfo8uu.defaulted('eventOrder', {})
    ],
    apis: {
      collapseMenu: function (apis, tmenu) {
        apis.collapseMenu(tmenu);
      }
    },
    factory: $_8ozhro13djcgfoaw5.make,
    extraApis: {
      tieredData: tieredData,
      singleData: singleData,
      collapseItem: collapseItem
    }
  });

  var scrollable = $_3eky7iz0jcgfo9aj.resolve('scrollable');
  var register$1 = function (element) {
    $_4ub0gextjcgfo90x.add(element, scrollable);
  };
  var deregister = function (element) {
    $_4ub0gextjcgfo90x.remove(element, scrollable);
  };
  var $_daiv3913gjcgfoayg = {
    register: register$1,
    deregister: deregister,
    scrollable: $_ee1z6xwajcgfo8qa.constant(scrollable)
  };

  var getValue$4 = function (item) {
    return $_8fkfzex5jcgfo8wf.readOptFrom(item, 'format').getOr(item.title);
  };
  var convert$1 = function (formats, memMenuThunk) {
    var mainMenu = makeMenu('Styles', [].concat($_3h0i9zw8jcgfo8px.map(formats.items, function (k) {
      return makeItem(getValue$4(k), k.title, k.isSelected(), k.getPreview(), $_8fkfzex5jcgfo8wf.hasKey(formats.expansions, getValue$4(k)));
    })), memMenuThunk, false);
    var submenus = $_a7hrnswzjcgfo8tz.map(formats.menus, function (menuItems, menuName) {
      var items = $_3h0i9zw8jcgfo8px.map(menuItems, function (item) {
        return makeItem(getValue$4(item), item.title, item.isSelected !== undefined ? item.isSelected() : false, item.getPreview !== undefined ? item.getPreview() : '', $_8fkfzex5jcgfo8wf.hasKey(formats.expansions, getValue$4(item)));
      });
      return makeMenu(menuName, items, memMenuThunk, true);
    });
    var menus = $_au1coewxjcgfo8tp.deepMerge(submenus, $_8fkfzex5jcgfo8wf.wrap('styles', mainMenu));
    var tmenu = TieredMenu.tieredData('styles', menus, formats.expansions);
    return { tmenu: tmenu };
  };
  var makeItem = function (value, text, selected, preview, isMenu) {
    return {
      data: {
        value: value,
        text: text
      },
      type: 'item',
      dom: {
        tag: 'div',
        classes: isMenu ? [$_3eky7iz0jcgfo9aj.resolve('styles-item-is-menu')] : []
      },
      toggling: {
        toggleOnExecute: false,
        toggleClass: $_3eky7iz0jcgfo9aj.resolve('format-matches'),
        selected: selected
      },
      itemBehaviours: $_395jq4w3jcgfo8n1.derive(isMenu ? [] : [$_82uzw2yzjcgfo9ad.format(value, function (comp, status) {
          var toggle = status ? Toggling.on : Toggling.off;
          toggle(comp);
        })]),
      components: [{
          dom: {
            tag: 'div',
            attributes: { style: preview },
            innerHtml: text
          }
        }]
    };
  };
  var makeMenu = function (value, items, memMenuThunk, collapsable) {
    return {
      value: value,
      dom: { tag: 'div' },
      components: [
        Button.sketch({
          dom: {
            tag: 'div',
            classes: [$_3eky7iz0jcgfo9aj.resolve('styles-collapser')]
          },
          components: collapsable ? [
            {
              dom: {
                tag: 'span',
                classes: [$_3eky7iz0jcgfo9aj.resolve('styles-collapse-icon')]
              }
            },
            $_8rjh5i12jjcgfoal1.text(value)
          ] : [$_8rjh5i12jjcgfoal1.text(value)],
          action: function (item) {
            if (collapsable) {
              var comp = memMenuThunk().get(item);
              TieredMenu.collapseMenu(comp);
            }
          }
        }),
        {
          dom: {
            tag: 'div',
            classes: [$_3eky7iz0jcgfo9aj.resolve('styles-menu-items-container')]
          },
          components: [Menu.parts().items({})],
          behaviours: $_395jq4w3jcgfo8n1.derive([$_d60tjl11rjcgfoa7b.config('adhoc-scrollable-menu', [
              $_de0ow7w5jcgfo8ot.runOnAttached(function (component, simulatedEvent) {
                $_9qule1zrjcgfo9ge.set(component.element(), 'overflow-y', 'auto');
                $_9qule1zrjcgfo9ge.set(component.element(), '-webkit-overflow-scrolling', 'touch');
                $_daiv3913gjcgfoayg.register(component.element());
              }),
              $_de0ow7w5jcgfo8ot.runOnDetached(function (component) {
                $_9qule1zrjcgfo9ge.remove(component.element(), 'overflow-y');
                $_9qule1zrjcgfo9ge.remove(component.element(), '-webkit-overflow-scrolling');
                $_daiv3913gjcgfoayg.deregister(component.element());
              })
            ])])
        }
      ],
      items: items,
      menuBehaviours: $_395jq4w3jcgfo8n1.derive([Transitioning.config({
          initialState: 'after',
          routes: Transitioning.createTristate('before', 'current', 'after', {
            transition: {
              property: 'transform',
              transitionClass: 'transitioning'
            }
          })
        })])
    };
  };
  var sketch$9 = function (settings) {
    var dataset = convert$1(settings.formats, function () {
      return memMenu;
    });
    var memMenu = $_dwt5fx11djcgfoa3d.record(TieredMenu.sketch({
      dom: {
        tag: 'div',
        classes: [$_3eky7iz0jcgfo9aj.resolve('styles-menu')]
      },
      components: [],
      fakeFocus: true,
      stayInDom: true,
      onExecute: function (tmenu, item) {
        var v = me.getValue(item);
        settings.handle(item, v.value);
      },
      onEscape: function () {
      },
      onOpenMenu: function (container, menu) {
        var w = $_2kwnrj116jcgfo9yt.get(container.element());
        $_2kwnrj116jcgfo9yt.set(menu.element(), w);
        Transitioning.jumpTo(menu, 'current');
      },
      onOpenSubmenu: function (container, item, submenu) {
        var w = $_2kwnrj116jcgfo9yt.get(container.element());
        var menu = $_dka7lkzljcgfo9fe.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var menuComp = container.getSystem().getByDom(menu).getOrDie();
        $_2kwnrj116jcgfo9yt.set(submenu.element(), w);
        Transitioning.progressTo(menuComp, 'before');
        Transitioning.jumpTo(submenu, 'after');
        Transitioning.progressTo(submenu, 'current');
      },
      onCollapseMenu: function (container, item, menu) {
        var submenu = $_dka7lkzljcgfo9fe.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var submenuComp = container.getSystem().getByDom(submenu).getOrDie();
        Transitioning.progressTo(submenuComp, 'after');
        Transitioning.progressTo(menu, 'current');
      },
      navigateOnHover: false,
      openImmediately: true,
      data: dataset.tmenu,
      markers: {
        backgroundMenu: $_3eky7iz0jcgfo9aj.resolve('styles-background-menu'),
        menu: $_3eky7iz0jcgfo9aj.resolve('styles-menu'),
        selectedMenu: $_3eky7iz0jcgfo9aj.resolve('styles-selected-menu'),
        item: $_3eky7iz0jcgfo9aj.resolve('styles-item'),
        selectedItem: $_3eky7iz0jcgfo9aj.resolve('styles-selected-item')
      }
    }));
    return memMenu.asSpec();
  };
  var $_28w5f912ejcgfoaib = { sketch: sketch$9 };

  var getFromExpandingItem = function (item) {
    var newItem = $_au1coewxjcgfo8tp.deepMerge($_8fkfzex5jcgfo8wf.exclude(item, ['items']), { menu: true });
    var rest = expand(item.items);
    var newMenus = $_au1coewxjcgfo8tp.deepMerge(rest.menus, $_8fkfzex5jcgfo8wf.wrap(item.title, rest.items));
    var newExpansions = $_au1coewxjcgfo8tp.deepMerge(rest.expansions, $_8fkfzex5jcgfo8wf.wrap(item.title, item.title));
    return {
      item: newItem,
      menus: newMenus,
      expansions: newExpansions
    };
  };
  var getFromItem = function (item) {
    return $_8fkfzex5jcgfo8wf.hasKey(item, 'items') ? getFromExpandingItem(item) : {
      item: item,
      menus: {},
      expansions: {}
    };
  };
  var expand = function (items) {
    return $_3h0i9zw8jcgfo8px.foldr(items, function (acc, item) {
      var newData = getFromItem(item);
      return {
        menus: $_au1coewxjcgfo8tp.deepMerge(acc.menus, newData.menus),
        items: [newData.item].concat(acc.items),
        expansions: $_au1coewxjcgfo8tp.deepMerge(acc.expansions, newData.expansions)
      };
    }, {
      menus: {},
      expansions: {},
      items: []
    });
  };
  var $_g20zrc13hjcgfoayn = { expand: expand };

  var register = function (editor, settings) {
    var isSelectedFor = function (format) {
      return function () {
        return editor.formatter.match(format);
      };
    };
    var getPreview = function (format) {
      return function () {
        var styles = editor.formatter.getCssText(format);
        return styles;
      };
    };
    var enrichSupported = function (item) {
      return $_au1coewxjcgfo8tp.deepMerge(item, {
        isSelected: isSelectedFor(item.format),
        getPreview: getPreview(item.format)
      });
    };
    var enrichMenu = function (item) {
      return $_au1coewxjcgfo8tp.deepMerge(item, {
        isSelected: $_ee1z6xwajcgfo8qa.constant(false),
        getPreview: $_ee1z6xwajcgfo8qa.constant('')
      });
    };
    var enrichCustom = function (item) {
      var formatName = $_gcx8v510fjcgfo9ox.generate(item.title);
      var newItem = $_au1coewxjcgfo8tp.deepMerge(item, {
        format: formatName,
        isSelected: isSelectedFor(formatName),
        getPreview: getPreview(formatName)
      });
      editor.formatter.register(formatName, newItem);
      return newItem;
    };
    var formats = $_8fkfzex5jcgfo8wf.readOptFrom(settings, 'style_formats').getOr(DefaultStyleFormats);
    var doEnrich = function (items) {
      return $_3h0i9zw8jcgfo8px.map(items, function (item) {
        if ($_8fkfzex5jcgfo8wf.hasKey(item, 'items')) {
          var newItems = doEnrich(item.items);
          return $_au1coewxjcgfo8tp.deepMerge(enrichMenu(item), { items: newItems });
        } else if ($_8fkfzex5jcgfo8wf.hasKey(item, 'format')) {
          return enrichSupported(item);
        } else {
          return enrichCustom(item);
        }
      });
    };
    return doEnrich(formats);
  };
  var prune = function (editor, formats) {
    var doPrune = function (items) {
      return $_3h0i9zw8jcgfo8px.bind(items, function (item) {
        if (item.items !== undefined) {
          var newItems = doPrune(item.items);
          return newItems.length > 0 ? [item] : [];
        } else {
          var keep = $_8fkfzex5jcgfo8wf.hasKey(item, 'format') ? editor.formatter.canApply(item.format) : true;
          return keep ? [item] : [];
        }
      });
    };
    var prunedItems = doPrune(formats);
    return $_g20zrc13hjcgfoayn.expand(prunedItems);
  };
  var ui = function (editor, formats, onDone) {
    var pruned = prune(editor, formats);
    return $_28w5f912ejcgfoaib.sketch({
      formats: pruned,
      handle: function (item, value) {
        editor.undoManager.transact(function () {
          if (Toggling.isOn(item)) {
            editor.formatter.remove(value);
          } else {
            editor.formatter.apply(value);
          }
        });
        onDone();
      }
    });
  };
  var $_1fruhv12cjcgfoahs = {
    register: register,
    ui: ui
  };

  var defaults = [
    'undo',
    'bold',
    'italic',
    'link',
    'image',
    'bullist',
    'styleselect'
  ];
  var extract$1 = function (rawToolbar) {
    var toolbar = rawToolbar.replace(/\|/g, ' ').trim();
    return toolbar.length > 0 ? toolbar.split(/\s+/) : [];
  };
  var identifyFromArray = function (toolbar) {
    return $_3h0i9zw8jcgfo8px.bind(toolbar, function (item) {
      return $_eregpvwyjcgfo8ts.isArray(item) ? identifyFromArray(item) : extract$1(item);
    });
  };
  var identify = function (settings) {
    var toolbar = settings.toolbar !== undefined ? settings.toolbar : defaults;
    return $_eregpvwyjcgfo8ts.isArray(toolbar) ? identifyFromArray(toolbar) : extract$1(toolbar);
  };
  var setup = function (realm, editor) {
    var commandSketch = function (name) {
      return function () {
        return $_16du12z1jcgfo9ar.forToolbarCommand(editor, name);
      };
    };
    var stateCommandSketch = function (name) {
      return function () {
        return $_16du12z1jcgfo9ar.forToolbarStateCommand(editor, name);
      };
    };
    var actionSketch = function (name, query, action) {
      return function () {
        return $_16du12z1jcgfo9ar.forToolbarStateAction(editor, name, query, action);
      };
    };
    var undo = commandSketch('undo');
    var redo = commandSketch('redo');
    var bold = stateCommandSketch('bold');
    var italic = stateCommandSketch('italic');
    var underline = stateCommandSketch('underline');
    var removeformat = commandSketch('removeformat');
    var link = function () {
      return $_woa5e11njcgfoa54.sketch(realm, editor);
    };
    var unlink = actionSketch('unlink', 'link', function () {
      editor.execCommand('unlink', null, false);
    });
    var image = function () {
      return $_87hqaq11cjcgfoa2c.sketch(editor);
    };
    var bullist = actionSketch('unordered-list', 'ul', function () {
      editor.execCommand('InsertUnorderedList', null, false);
    });
    var numlist = actionSketch('ordered-list', 'ol', function () {
      editor.execCommand('InsertOrderedList', null, false);
    });
    var fontsizeselect = function () {
      return $_y4o09118jcgfo9yy.sketch(realm, editor);
    };
    var forecolor = function () {
      return $_77noq710rjcgfo9up.sketch(realm, editor);
    };
    var styleFormats = $_1fruhv12cjcgfoahs.register(editor, editor.settings);
    var styleFormatsMenu = function () {
      return $_1fruhv12cjcgfoahs.ui(editor, styleFormats, function () {
        editor.fire('scrollIntoView');
      });
    };
    var styleselect = function () {
      return $_16du12z1jcgfo9ar.forToolbar('style-formats', function (button) {
        editor.fire('toReading');
        realm.dropup().appear(styleFormatsMenu, Toggling.on, button);
      }, $_395jq4w3jcgfo8n1.derive([
        Toggling.config({
          toggleClass: $_3eky7iz0jcgfo9aj.resolve('toolbar-button-selected'),
          toggleOnExecute: false,
          aria: { mode: 'pressed' }
        }),
        Receiving.config({
          channels: $_8fkfzex5jcgfo8wf.wrapAll([
            $_82uzw2yzjcgfo9ad.receive($_1wsj8mynjcgfo96i.orientationChanged(), Toggling.off),
            $_82uzw2yzjcgfo9ad.receive($_1wsj8mynjcgfo96i.dropupDismissed(), Toggling.off)
          ])
        })
      ]));
    };
    var feature = function (prereq, sketch) {
      return {
        isSupported: function () {
          return prereq.forall(function (p) {
            return $_8fkfzex5jcgfo8wf.hasKey(editor.buttons, p);
          });
        },
        sketch: sketch
      };
    };
    return {
      undo: feature($_d7fxouw9jcgfo8q5.none(), undo),
      redo: feature($_d7fxouw9jcgfo8q5.none(), redo),
      bold: feature($_d7fxouw9jcgfo8q5.none(), bold),
      italic: feature($_d7fxouw9jcgfo8q5.none(), italic),
      underline: feature($_d7fxouw9jcgfo8q5.none(), underline),
      removeformat: feature($_d7fxouw9jcgfo8q5.none(), removeformat),
      link: feature($_d7fxouw9jcgfo8q5.none(), link),
      unlink: feature($_d7fxouw9jcgfo8q5.none(), unlink),
      image: feature($_d7fxouw9jcgfo8q5.none(), image),
      bullist: feature($_d7fxouw9jcgfo8q5.some('bullist'), bullist),
      numlist: feature($_d7fxouw9jcgfo8q5.some('numlist'), numlist),
      fontsizeselect: feature($_d7fxouw9jcgfo8q5.none(), fontsizeselect),
      forecolor: feature($_d7fxouw9jcgfo8q5.none(), forecolor),
      styleselect: feature($_d7fxouw9jcgfo8q5.none(), styleselect)
    };
  };
  var detect$4 = function (settings, features) {
    var itemNames = identify(settings);
    var present = {};
    return $_3h0i9zw8jcgfo8px.bind(itemNames, function (iName) {
      var r = !$_8fkfzex5jcgfo8wf.hasKey(present, iName) && $_8fkfzex5jcgfo8wf.hasKey(features, iName) && features[iName].isSupported() ? [features[iName].sketch()] : [];
      present[iName] = true;
      return r;
    });
  };
  var $_en9a75yojcgfo96n = {
    identify: identify,
    setup: setup,
    detect: detect$4
  };

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_ee1z6xwajcgfo8qa.constant(target),
      'x': $_ee1z6xwajcgfo8qa.constant(x),
      'y': $_ee1z6xwajcgfo8qa.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_ee1z6xwajcgfo8qa.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_6rcvbhwsjcgfo8sm.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_ee1z6xwajcgfo8qa.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_ee1z6xwajcgfo8qa.curry(unbind, element, event, wrapped, useCapture) };
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
  var $_7gqsqe13kjcgfoazi = {
    bind: bind$2,
    capture: capture$1
  };

  var filter$1 = $_ee1z6xwajcgfo8qa.constant(true);
  var bind$1 = function (element, event, handler) {
    return $_7gqsqe13kjcgfoazi.bind(element, event, filter$1, handler);
  };
  var capture = function (element, event, handler) {
    return $_7gqsqe13kjcgfoazi.capture(element, event, filter$1, handler);
  };
  var $_5bqkbs13jjcgfoazc = {
    bind: bind$1,
    capture: capture
  };

  var INTERVAL = 50;
  var INSURANCE = 1000 / INTERVAL;
  var get$11 = function (outerWindow) {
    var isPortrait = outerWindow.matchMedia('(orientation: portrait)').matches;
    return { isPortrait: $_ee1z6xwajcgfo8qa.constant(isPortrait) };
  };
  var getActualWidth = function (outerWindow) {
    var isIos = $_6o4pdywfjcgfo8qq.detect().os.isiOS();
    var isPortrait = get$11(outerWindow).isPortrait();
    return isIos && !isPortrait ? outerWindow.screen.height : outerWindow.screen.width;
  };
  var onChange = function (outerWindow, listeners) {
    var win = $_6rcvbhwsjcgfo8sm.fromDom(outerWindow);
    var poller = null;
    var change = function () {
      clearInterval(poller);
      var orientation = get$11(outerWindow);
      listeners.onChange(orientation);
      onAdjustment(function () {
        listeners.onReady(orientation);
      });
    };
    var orientationHandle = $_5bqkbs13jjcgfoazc.bind(win, 'orientationchange', change);
    var onAdjustment = function (f) {
      clearInterval(poller);
      var flag = outerWindow.innerHeight;
      var insurance = 0;
      poller = setInterval(function () {
        if (flag !== outerWindow.innerHeight) {
          clearInterval(poller);
          f($_d7fxouw9jcgfo8q5.some(outerWindow.innerHeight));
        } else if (insurance > INSURANCE) {
          clearInterval(poller);
          f($_d7fxouw9jcgfo8q5.none());
        }
        insurance++;
      }, INTERVAL);
    };
    var destroy = function () {
      orientationHandle.unbind();
    };
    return {
      onAdjustment: onAdjustment,
      destroy: destroy
    };
  };
  var $_9l2p1513ijcgfoayw = {
    get: get$11,
    onChange: onChange,
    getActualWidth: getActualWidth
  };

  var DelayedFunction = function (fun, delay) {
    var ref = null;
    var schedule = function () {
      var args = arguments;
      ref = setTimeout(function () {
        fun.apply(null, args);
        ref = null;
      }, delay);
    };
    var cancel = function () {
      if (ref !== null) {
        clearTimeout(ref);
        ref = null;
      }
    };
    return {
      cancel: cancel,
      schedule: schedule
    };
  };

  var SIGNIFICANT_MOVE = 5;
  var LONGPRESS_DELAY = 400;
  var getTouch = function (event) {
    if (event.raw().touches === undefined || event.raw().touches.length !== 1)
      return $_d7fxouw9jcgfo8q5.none();
    return $_d7fxouw9jcgfo8q5.some(event.raw().touches[0]);
  };
  var isFarEnough = function (touch, data) {
    var distX = Math.abs(touch.clientX - data.x());
    var distY = Math.abs(touch.clientY - data.y());
    return distX > SIGNIFICANT_MOVE || distY > SIGNIFICANT_MOVE;
  };
  var monitor$1 = function (settings) {
    var startData = Cell($_d7fxouw9jcgfo8q5.none());
    var longpress = DelayedFunction(function (event) {
      startData.set($_d7fxouw9jcgfo8q5.none());
      settings.triggerEvent($_1snegiwvjcgfo8tb.longpress(), event);
    }, LONGPRESS_DELAY);
    var handleTouchstart = function (event) {
      getTouch(event).each(function (touch) {
        longpress.cancel();
        var data = {
          x: $_ee1z6xwajcgfo8qa.constant(touch.clientX),
          y: $_ee1z6xwajcgfo8qa.constant(touch.clientY),
          target: event.target
        };
        longpress.schedule(data);
        startData.set($_d7fxouw9jcgfo8q5.some(data));
      });
      return $_d7fxouw9jcgfo8q5.none();
    };
    var handleTouchmove = function (event) {
      longpress.cancel();
      getTouch(event).each(function (touch) {
        startData.get().each(function (data) {
          if (isFarEnough(touch, data))
            startData.set($_d7fxouw9jcgfo8q5.none());
        });
      });
      return $_d7fxouw9jcgfo8q5.none();
    };
    var handleTouchend = function (event) {
      longpress.cancel();
      var isSame = function (data) {
        return $_8prpzjw7jcgfo8p9.eq(data.target(), event.target());
      };
      return startData.get().filter(isSame).map(function (data) {
        return settings.triggerEvent($_1snegiwvjcgfo8tb.tap(), event);
      });
    };
    var handlers = $_8fkfzex5jcgfo8wf.wrapAll([
      {
        key: $_8bjxvowwjcgfo8tj.touchstart(),
        value: handleTouchstart
      },
      {
        key: $_8bjxvowwjcgfo8tj.touchmove(),
        value: handleTouchmove
      },
      {
        key: $_8bjxvowwjcgfo8tj.touchend(),
        value: handleTouchend
      }
    ]);
    var fireIfReady = function (event, type) {
      return $_8fkfzex5jcgfo8wf.readOptFrom(handlers, type).bind(function (handler) {
        return handler(event);
      });
    };
    return { fireIfReady: fireIfReady };
  };
  var $_c0anmg13qjcgfob1n = { monitor: monitor$1 };

  var monitor = function (editorApi) {
    var tapEvent = $_c0anmg13qjcgfob1n.monitor({
      triggerEvent: function (type, evt) {
        editorApi.onTapContent(evt);
      }
    });
    var onTouchend = function () {
      return $_5bqkbs13jjcgfoazc.bind(editorApi.body(), 'touchend', function (evt) {
        tapEvent.fireIfReady(evt, 'touchend');
      });
    };
    var onTouchmove = function () {
      return $_5bqkbs13jjcgfoazc.bind(editorApi.body(), 'touchmove', function (evt) {
        tapEvent.fireIfReady(evt, 'touchmove');
      });
    };
    var fireTouchstart = function (evt) {
      tapEvent.fireIfReady(evt, 'touchstart');
    };
    return {
      fireTouchstart: fireTouchstart,
      onTouchend: onTouchend,
      onTouchmove: onTouchmove
    };
  };
  var $_bas80413pjcgfob1f = { monitor: monitor };

  var isAndroid6 = $_6o4pdywfjcgfo8qq.detect().os.version.major >= 6;
  var initEvents = function (editorApi, toolstrip, alloy) {
    var tapping = $_bas80413pjcgfob1f.monitor(editorApi);
    var outerDoc = $_dd88k4y2jcgfo92t.owner(toolstrip);
    var isRanged = function (sel) {
      return !$_8prpzjw7jcgfo8p9.eq(sel.start(), sel.finish()) || sel.soffset() !== sel.foffset();
    };
    var hasRangeInUi = function () {
      return $_evqgdsyfjcgfo95e.active(outerDoc).filter(function (input) {
        return $_bmv0faxwjcgfo91e.name(input) === 'input';
      }).exists(function (input) {
        return input.dom().selectionStart !== input.dom().selectionEnd;
      });
    };
    var updateMargin = function () {
      var rangeInContent = editorApi.doc().dom().hasFocus() && editorApi.getSelection().exists(isRanged);
      alloy.getByDom(toolstrip).each((rangeInContent || hasRangeInUi()) === true ? Toggling.on : Toggling.off);
    };
    var listeners = [
      $_5bqkbs13jjcgfoazc.bind(editorApi.body(), 'touchstart', function (evt) {
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_5bqkbs13jjcgfoazc.bind(toolstrip, 'touchstart', function (evt) {
        editorApi.onTouchToolstrip();
      }),
      editorApi.onToReading(function () {
        $_evqgdsyfjcgfo95e.blur(editorApi.body());
      }),
      editorApi.onToEditing($_ee1z6xwajcgfo8qa.noop),
      editorApi.onScrollToCursor(function (tinyEvent) {
        tinyEvent.preventDefault();
        editorApi.getCursorBox().each(function (bounds) {
          var cWin = editorApi.win();
          var isOutside = bounds.top() > cWin.innerHeight || bounds.bottom() > cWin.innerHeight;
          var cScrollBy = isOutside ? bounds.bottom() - cWin.innerHeight + 50 : 0;
          if (cScrollBy !== 0) {
            cWin.scrollTo(cWin.pageXOffset, cWin.pageYOffset + cScrollBy);
          }
        });
      })
    ].concat(isAndroid6 === true ? [] : [
      $_5bqkbs13jjcgfoazc.bind($_6rcvbhwsjcgfo8sm.fromDom(editorApi.win()), 'blur', function () {
        alloy.getByDom(toolstrip).each(Toggling.off);
      }),
      $_5bqkbs13jjcgfoazc.bind(outerDoc, 'select', updateMargin),
      $_5bqkbs13jjcgfoazc.bind(editorApi.doc(), 'selectionchange', updateMargin)
    ]);
    var destroy = function () {
      $_3h0i9zw8jcgfo8px.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_fw7fhr13ojcgfob0o = { initEvents: initEvents };

  var autocompleteHack = function () {
    return function (f) {
      setTimeout(function () {
        f();
      }, 0);
    };
  };
  var resume = function (cWin) {
    cWin.focus();
    var iBody = $_6rcvbhwsjcgfo8sm.fromDom(cWin.document.body);
    var inInput = $_evqgdsyfjcgfo95e.active().exists(function (elem) {
      return $_3h0i9zw8jcgfo8px.contains([
        'input',
        'textarea'
      ], $_bmv0faxwjcgfo91e.name(elem));
    });
    var transaction = inInput ? autocompleteHack() : $_ee1z6xwajcgfo8qa.apply;
    transaction(function () {
      $_evqgdsyfjcgfo95e.active().each($_evqgdsyfjcgfo95e.blur);
      $_evqgdsyfjcgfo95e.focus(iBody);
    });
  };
  var $_702pmx13tjcgfob2n = { resume: resume };

  var safeParse = function (element, attribute) {
    var parsed = parseInt($_8ut06dxvjcgfo912.get(element, attribute), 10);
    return isNaN(parsed) ? 0 : parsed;
  };
  var $_1gs84p13ujcgfob34 = { safeParse: safeParse };

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
        return $_d7fxouw9jcgfo8q5.none();
      }
    };
    var getOptionSafe = function (element) {
      return is(element) ? $_d7fxouw9jcgfo8q5.from(element.dom().nodeValue) : $_d7fxouw9jcgfo8q5.none();
    };
    var browser = $_6o4pdywfjcgfo8qq.detect().browser;
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

  var api$3 = NodeValue($_bmv0faxwjcgfo91e.isText, 'text');
  var get$12 = function (element) {
    return api$3.get(element);
  };
  var getOption = function (element) {
    return api$3.getOption(element);
  };
  var set$8 = function (element, value) {
    api$3.set(element, value);
  };
  var $_chziq113xjcgfob3y = {
    get: get$12,
    getOption: getOption,
    set: set$8
  };

  var getEnd = function (element) {
    return $_bmv0faxwjcgfo91e.name(element) === 'img' ? 1 : $_chziq113xjcgfob3y.getOption(element).fold(function () {
      return $_dd88k4y2jcgfo92t.children(element).length;
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
    return $_chziq113xjcgfob3y.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_3h0i9zw8jcgfo8px.contains(elementsWithCursorPosition, $_bmv0faxwjcgfo91e.name(elem));
  };
  var $_c98cg213wjcgfob3t = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var adt$4 = $_eqsftbx3jcgfo8vg.generate([
    { 'before': ['element'] },
    {
      'on': [
        'element',
        'offset'
      ]
    },
    { after: ['element'] }
  ]);
  var cata = function (subject, onBefore, onOn, onAfter) {
    return subject.fold(onBefore, onOn, onAfter);
  };
  var getStart$1 = function (situ) {
    return situ.fold($_ee1z6xwajcgfo8qa.identity, $_ee1z6xwajcgfo8qa.identity, $_ee1z6xwajcgfo8qa.identity);
  };
  var $_3632zm140jcgfob4h = {
    before: adt$4.before,
    on: adt$4.on,
    after: adt$4.after,
    cata: cata,
    getStart: getStart$1
  };

  var type$1 = $_eqsftbx3jcgfo8vg.generate([
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
  var range$1 = $_catt2ixljcgfo904.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$1.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_6rcvbhwsjcgfo8sm.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_3632zm140jcgfob4h.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart(selection);
    return $_dd88k4y2jcgfo92t.defaultView(start);
  };
  var $_1f1t0s13zjcgfob49 = {
    domRange: type$1.domRange,
    relative: type$1.relative,
    exact: type$1.exact,
    exactFromRange: exactFromRange,
    range: range$1,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_dd88k4y2jcgfo92t.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_6rcvbhwsjcgfo8sm.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_8prpzjw7jcgfo8p9.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_2bf4mx142jcgfob4y = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_3h0i9zw8jcgfo8px.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_6rcvbhwsjcgfo8sm.fromDom(fragment);
  };
  var $_5ip3y0143jcgfob51 = { fromElements: fromElements };

  var selectNodeContents = function (win, element) {
    var rng = win.document.createRange();
    selectNodeContentsUsing(rng, element);
    return rng;
  };
  var selectNodeContentsUsing = function (rng, element) {
    rng.selectNodeContents(element.dom());
  };
  var isWithin = function (outerRange, innerRange) {
    return innerRange.compareBoundaryPoints(outerRange.END_TO_START, outerRange) < 1 && innerRange.compareBoundaryPoints(outerRange.START_TO_END, outerRange) > -1;
  };
  var create$5 = function (win) {
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
    return $_6rcvbhwsjcgfo8sm.fromDom(fragment);
  };
  var toRect$1 = function (rect) {
    return {
      left: $_ee1z6xwajcgfo8qa.constant(rect.left),
      top: $_ee1z6xwajcgfo8qa.constant(rect.top),
      right: $_ee1z6xwajcgfo8qa.constant(rect.right),
      bottom: $_ee1z6xwajcgfo8qa.constant(rect.bottom),
      width: $_ee1z6xwajcgfo8qa.constant(rect.width),
      height: $_ee1z6xwajcgfo8qa.constant(rect.height)
    };
  };
  var getFirstRect$1 = function (rng) {
    var rects = rng.getClientRects();
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_d7fxouw9jcgfo8q5.some(rect).map(toRect$1) : $_d7fxouw9jcgfo8q5.none();
  };
  var getBounds$2 = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_d7fxouw9jcgfo8q5.some(rect).map(toRect$1) : $_d7fxouw9jcgfo8q5.none();
  };
  var toString$1 = function (rng) {
    return rng.toString();
  };
  var $_fq21ot144jcgfob56 = {
    create: create$5,
    replaceWith: replaceWith,
    selectNodeContents: selectNodeContents,
    selectNodeContentsUsing: selectNodeContentsUsing,
    relativeToNative: relativeToNative,
    exactToNative: exactToNative,
    deleteContents: deleteContents,
    cloneFragment: cloneFragment,
    getFirstRect: getFirstRect$1,
    getBounds: getBounds$2,
    isWithin: isWithin,
    toString: toString$1
  };

  var adt$5 = $_eqsftbx3jcgfo8vg.generate([
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
    return type($_6rcvbhwsjcgfo8sm.fromDom(range.startContainer), range.startOffset, $_6rcvbhwsjcgfo8sm.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_ee1z6xwajcgfo8qa.constant(rng),
          rtl: $_d7fxouw9jcgfo8q5.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_1u8x7pwgjcgfo8r0.cached(function () {
            return $_fq21ot144jcgfob56.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_1u8x7pwgjcgfo8r0.cached(function () {
            return $_d7fxouw9jcgfo8q5.some($_fq21ot144jcgfob56.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_1u8x7pwgjcgfo8r0.cached(function () {
            return $_fq21ot144jcgfob56.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_1u8x7pwgjcgfo8r0.cached(function () {
            return $_d7fxouw9jcgfo8q5.some($_fq21ot144jcgfob56.exactToNative(win, finish, foffset, start, soffset));
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
        return adt$5.rtl($_6rcvbhwsjcgfo8sm.fromDom(rev.endContainer), rev.endOffset, $_6rcvbhwsjcgfo8sm.fromDom(rev.startContainer), rev.startOffset);
      }).getOrThunk(function () {
        return fromRange(win, adt$5.ltr, rng);
      });
    } else {
      return fromRange(win, adt$5.ltr, rng);
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
  var $_8k6c7f145jcgfob5g = {
    ltr: adt$5.ltr,
    rtl: adt$5.rtl,
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
  var $_etnk5u148jcgfob6e = {
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
    var length = $_chziq113xjcgfob3y.get(textnode).length;
    var offset = $_etnk5u148jcgfob6e.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate$2 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_czjvbsydjcgfo959.findMap(rects, function (rect) {
      return $_etnk5u148jcgfob6e.inRect(rect, x, y) ? $_d7fxouw9jcgfo8q5.some(rect) : $_d7fxouw9jcgfo8q5.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_brryr8149jcgfob6g = { locate: locate$2 };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_dd88k4y2jcgfo92t.children(node);
    return $_czjvbsydjcgfo959.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_etnk5u148jcgfob6e.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : $_d7fxouw9jcgfo8q5.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_bmv0faxwjcgfo91e.isText(node) ? $_brryr8149jcgfob6g.locate : searchInChildren;
    return locator(doc, node, x, y);
  };
  var locate$1 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return locateNode(doc, node, boundedX, boundedY);
  };
  var $_g8rpy6147jcgfob65 = { locate: locate$1 };

  var first$3 = function (element) {
    return $_d45jk3yhjcgfo95p.descendant(element, $_c98cg213wjcgfob3t.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_c98cg213wjcgfob3t.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_dd88k4y2jcgfo92t.children(element);
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (predicate(child))
          return $_d7fxouw9jcgfo8q5.some(child);
        var res = descend(child);
        if (res.isSome())
          return res;
      }
      return $_d7fxouw9jcgfo8q5.none();
    };
    return descend(scope);
  };
  var $_3socd614bjcgfob6v = {
    first: first$3,
    last: last$2
  };

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
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_3socd614bjcgfob6v.first : $_3socd614bjcgfob6v.last;
    return f(node).map(function (target) {
      return createCollapsedNode(doc, target, collapseDirection);
    });
  };
  var locateInEmpty = function (doc, node, x) {
    var rect = node.dom().getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    return $_d7fxouw9jcgfo8q5.some(createCollapsedNode(doc, node, collapseDirection));
  };
  var search$1 = function (doc, node, x) {
    var f = $_dd88k4y2jcgfo92t.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_1qwa814ajcgfob6p = { search: search$1 };

  var caretPositionFromPoint = function (doc, x, y) {
    return $_d7fxouw9jcgfo8q5.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
      if (pos.offsetNode === null)
        return $_d7fxouw9jcgfo8q5.none();
      var r = doc.dom().createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse();
      return $_d7fxouw9jcgfo8q5.some(r);
    });
  };
  var caretRangeFromPoint = function (doc, x, y) {
    return $_d7fxouw9jcgfo8q5.from(doc.dom().caretRangeFromPoint(x, y));
  };
  var searchTextNodes = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return $_g8rpy6147jcgfob65.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_6rcvbhwsjcgfo8sm.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_1qwa814ajcgfob6p.search(doc, elem, x);
      };
      return $_dd88k4y2jcgfo92t.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_6rcvbhwsjcgfo8sm.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_1f1t0s13zjcgfob49.range($_6rcvbhwsjcgfo8sm.fromDom(rng.startContainer), rng.startOffset, $_6rcvbhwsjcgfo8sm.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_4rpkdt146jcgfob5z = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_fq21ot144jcgfob56.create(win);
    var self = $_dk3rx9wrjcgfo8sc.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_fk8w0mzjjcgfo9f4.descendants(ancestor, selector));
    return $_3h0i9zw8jcgfo8px.filter(elements, function (elem) {
      $_fq21ot144jcgfob56.selectNodeContentsUsing(innerRange, elem);
      return $_fq21ot144jcgfob56.isWithin(outerRange, innerRange);
    });
  };
  var find$4 = function (win, selection, selector) {
    var outerRange = $_8k6c7f145jcgfob5g.asLtrRange(win, selection);
    var ancestor = $_6rcvbhwsjcgfo8sm.fromDom(outerRange.commonAncestorContainer);
    return $_bmv0faxwjcgfo91e.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_81dtdu14cjcgfob71 = { find: find$4 };

  var beforeSpecial = function (element, offset) {
    var name = $_bmv0faxwjcgfo91e.name(element);
    if ('input' === name)
      return $_3632zm140jcgfob4h.after(element);
    else if (!$_3h0i9zw8jcgfo8px.contains([
        'br',
        'img'
      ], name))
      return $_3632zm140jcgfob4h.on(element, offset);
    else
      return offset === 0 ? $_3632zm140jcgfob4h.before(element) : $_3632zm140jcgfob4h.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_3632zm140jcgfob4h.before, beforeSpecial, $_3632zm140jcgfob4h.after);
    var finish = finishSitu.fold($_3632zm140jcgfob4h.before, beforeSpecial, $_3632zm140jcgfob4h.after);
    return $_1f1t0s13zjcgfob49.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_1f1t0s13zjcgfob49.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_6rcvbhwsjcgfo8sm.fromDom(rng.startContainer);
        var finish = $_6rcvbhwsjcgfo8sm.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_79sl5214djcgfob77 = {
    beforeSpecial: beforeSpecial,
    preprocess: preprocess,
    preprocessRelative: preprocessRelative,
    preprocessExact: preprocessExact
  };

  var doSetNativeRange = function (win, rng) {
    $_d7fxouw9jcgfo8q5.from(win.getSelection()).each(function (selection) {
      selection.removeAllRanges();
      selection.addRange(rng);
    });
  };
  var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = $_fq21ot144jcgfob56.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_81dtdu14cjcgfob71.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_8k6c7f145jcgfob5g.diagnose(win, relative).match({
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
    var relative = $_79sl5214djcgfob77.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_79sl5214djcgfob77.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_1f1t0s13zjcgfob49.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_fq21ot144jcgfob56.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_79sl5214djcgfob77.preprocess(selection);
    return $_8k6c7f145jcgfob5g.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return $_d7fxouw9jcgfo8q5.some($_1f1t0s13zjcgfob49.range($_6rcvbhwsjcgfo8sm.fromDom(firstRng.startContainer), firstRng.startOffset, $_6rcvbhwsjcgfo8sm.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return $_d7fxouw9jcgfo8q5.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_6rcvbhwsjcgfo8sm.fromDom(selection.anchorNode);
    var focusNode = $_6rcvbhwsjcgfo8sm.fromDom(selection.focusNode);
    return $_2bf4mx142jcgfob4y.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? $_d7fxouw9jcgfo8q5.some($_1f1t0s13zjcgfob49.range($_6rcvbhwsjcgfo8sm.fromDom(selection.anchorNode), selection.anchorOffset, $_6rcvbhwsjcgfo8sm.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_fq21ot144jcgfob56.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_fq21ot144jcgfob56.selectNodeContents(win, element);
    return $_1f1t0s13zjcgfob49.range($_6rcvbhwsjcgfo8sm.fromDom(rng.startContainer), rng.startOffset, $_6rcvbhwsjcgfo8sm.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : $_d7fxouw9jcgfo8q5.none();
  };
  var get$13 = function (win) {
    return getExact(win).map(function (range) {
      return $_1f1t0s13zjcgfob49.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect = function (win, selection) {
    var rng = $_8k6c7f145jcgfob5g.asLtrRange(win, selection);
    return $_fq21ot144jcgfob56.getFirstRect(rng);
  };
  var getBounds$1 = function (win, selection) {
    var rng = $_8k6c7f145jcgfob5g.asLtrRange(win, selection);
    return $_fq21ot144jcgfob56.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_4rpkdt146jcgfob5z.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_8k6c7f145jcgfob5g.asLtrRange(win, selection);
    return $_fq21ot144jcgfob56.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$3 = function (win, selection) {
    var rng = $_8k6c7f145jcgfob5g.asLtrRange(win, selection);
    return $_fq21ot144jcgfob56.cloneFragment(rng);
  };
  var replace = function (win, selection, elements) {
    var rng = $_8k6c7f145jcgfob5g.asLtrRange(win, selection);
    var fragment = $_5ip3y0143jcgfob51.fromElements(elements, win.document);
    $_fq21ot144jcgfob56.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_8k6c7f145jcgfob5g.asLtrRange(win, selection);
    $_fq21ot144jcgfob56.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_8prpzjw7jcgfo8p9.eq(start, finish) && soffset === foffset;
  };
  var $_a9bmo9141jcgfob4q = {
    setExact: setExact,
    getExact: getExact,
    get: get$13,
    setRelative: setRelative,
    toNative: toNative,
    setToElement: setToElement,
    clear: clear$1,
    clone: clone$3,
    replace: replace,
    deleteAt: deleteAt,
    forElement: forElement,
    getFirstRect: getFirstRect,
    getBounds: getBounds$1,
    getAtPoint: getAtPoint,
    findWithin: findWithin,
    getAsString: getAsString,
    isCollapsed: isCollapsed
  };

  var COLLAPSED_WIDTH = 2;
  var collapsedRect = function (rect) {
    return {
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: $_ee1z6xwajcgfo8qa.constant(COLLAPSED_WIDTH),
      height: rect.height
    };
  };
  var toRect = function (rawRect) {
    return {
      left: $_ee1z6xwajcgfo8qa.constant(rawRect.left),
      top: $_ee1z6xwajcgfo8qa.constant(rawRect.top),
      right: $_ee1z6xwajcgfo8qa.constant(rawRect.right),
      bottom: $_ee1z6xwajcgfo8qa.constant(rawRect.bottom),
      width: $_ee1z6xwajcgfo8qa.constant(rawRect.width),
      height: $_ee1z6xwajcgfo8qa.constant(rawRect.height)
    };
  };
  var getRectsFromRange = function (range) {
    if (!range.collapsed) {
      return $_3h0i9zw8jcgfo8px.map(range.getClientRects(), toRect);
    } else {
      var start_1 = $_6rcvbhwsjcgfo8sm.fromDom(range.startContainer);
      return $_dd88k4y2jcgfo92t.parent(start_1).bind(function (parent) {
        var selection = $_1f1t0s13zjcgfob49.exact(start_1, range.startOffset, parent, $_c98cg213wjcgfob3t.getEnd(parent));
        var optRect = $_a9bmo9141jcgfob4q.getFirstRect(range.startContainer.ownerDocument.defaultView, selection);
        return optRect.map(collapsedRect).map($_3h0i9zw8jcgfo8px.pure);
      }).getOr([]);
    }
  };
  var getRectangles = function (cWin) {
    var sel = cWin.getSelection();
    return sel !== undefined && sel.rangeCount > 0 ? getRectsFromRange(sel.getRangeAt(0)) : [];
  };
  var $_80lifv13vjcgfob38 = { getRectangles: getRectangles };

  var EXTRA_SPACING = 50;
  var data = 'data-' + $_3eky7iz0jcgfo9aj.resolve('last-outer-height');
  var setLastHeight = function (cBody, value) {
    $_8ut06dxvjcgfo912.set(cBody, data, value);
  };
  var getLastHeight = function (cBody) {
    return $_1gs84p13ujcgfob34.safeParse(cBody, data);
  };
  var getBoundsFrom = function (rect) {
    return {
      top: $_ee1z6xwajcgfo8qa.constant(rect.top()),
      bottom: $_ee1z6xwajcgfo8qa.constant(rect.top() + rect.height())
    };
  };
  var getBounds = function (cWin) {
    var rects = $_80lifv13vjcgfob38.getRectangles(cWin);
    return rects.length > 0 ? $_d7fxouw9jcgfo8q5.some(rects[0]).map(getBoundsFrom) : $_d7fxouw9jcgfo8q5.none();
  };
  var findDelta = function (outerWindow, cBody) {
    var last = getLastHeight(cBody);
    var current = outerWindow.innerHeight;
    return last > current ? $_d7fxouw9jcgfo8q5.some(last - current) : $_d7fxouw9jcgfo8q5.none();
  };
  var calculate = function (cWin, bounds, delta) {
    var isOutside = bounds.top() > cWin.innerHeight || bounds.bottom() > cWin.innerHeight;
    return isOutside ? Math.min(delta, bounds.bottom() - cWin.innerHeight + EXTRA_SPACING) : 0;
  };
  var setup$1 = function (outerWindow, cWin) {
    var cBody = $_6rcvbhwsjcgfo8sm.fromDom(cWin.document.body);
    var toEditing = function () {
      $_702pmx13tjcgfob2n.resume(cWin);
    };
    var onResize = $_5bqkbs13jjcgfoazc.bind($_6rcvbhwsjcgfo8sm.fromDom(outerWindow), 'resize', function () {
      findDelta(outerWindow, cBody).each(function (delta) {
        getBounds(cWin).each(function (bounds) {
          var cScrollBy = calculate(cWin, bounds, delta);
          if (cScrollBy !== 0) {
            cWin.scrollTo(cWin.pageXOffset, cWin.pageYOffset + cScrollBy);
          }
        });
      });
      setLastHeight(cBody, outerWindow.innerHeight);
    });
    setLastHeight(cBody, outerWindow.innerHeight);
    var destroy = function () {
      onResize.unbind();
    };
    return {
      toEditing: toEditing,
      destroy: destroy
    };
  };
  var $_6s0im213sjcgfob28 = { setup: setup$1 };

  var getBodyFromFrame = function (frame) {
    return $_d7fxouw9jcgfo8q5.some($_6rcvbhwsjcgfo8sm.fromDom(frame.dom().contentWindow.document.body));
  };
  var getDocFromFrame = function (frame) {
    return $_d7fxouw9jcgfo8q5.some($_6rcvbhwsjcgfo8sm.fromDom(frame.dom().contentWindow.document));
  };
  var getWinFromFrame = function (frame) {
    return $_d7fxouw9jcgfo8q5.from(frame.dom().contentWindow);
  };
  var getSelectionFromFrame = function (frame) {
    var optWin = getWinFromFrame(frame);
    return optWin.bind($_a9bmo9141jcgfob4q.getExact);
  };
  var getFrame = function (editor) {
    return editor.getFrame();
  };
  var getOrDerive = function (name, f) {
    return function (editor) {
      var g = editor[name].getOrThunk(function () {
        var frame = getFrame(editor);
        return function () {
          return f(frame);
        };
      });
      return g();
    };
  };
  var getOrListen = function (editor, doc, name, type) {
    return editor[name].getOrThunk(function () {
      return function (handler) {
        return $_5bqkbs13jjcgfoazc.bind(doc, type, handler);
      };
    });
  };
  var toRect$2 = function (rect) {
    return {
      left: $_ee1z6xwajcgfo8qa.constant(rect.left),
      top: $_ee1z6xwajcgfo8qa.constant(rect.top),
      right: $_ee1z6xwajcgfo8qa.constant(rect.right),
      bottom: $_ee1z6xwajcgfo8qa.constant(rect.bottom),
      width: $_ee1z6xwajcgfo8qa.constant(rect.width),
      height: $_ee1z6xwajcgfo8qa.constant(rect.height)
    };
  };
  var getActiveApi = function (editor) {
    var frame = getFrame(editor);
    var tryFallbackBox = function (win) {
      var isCollapsed = function (sel) {
        return $_8prpzjw7jcgfo8p9.eq(sel.start(), sel.finish()) && sel.soffset() === sel.foffset();
      };
      var toStartRect = function (sel) {
        var rect = sel.start().dom().getBoundingClientRect();
        return rect.width > 0 || rect.height > 0 ? $_d7fxouw9jcgfo8q5.some(rect).map(toRect$2) : $_d7fxouw9jcgfo8q5.none();
      };
      return $_a9bmo9141jcgfob4q.getExact(win).filter(isCollapsed).bind(toStartRect);
    };
    return getBodyFromFrame(frame).bind(function (body) {
      return getDocFromFrame(frame).bind(function (doc) {
        return getWinFromFrame(frame).map(function (win) {
          var html = $_6rcvbhwsjcgfo8sm.fromDom(doc.dom().documentElement);
          var getCursorBox = editor.getCursorBox.getOrThunk(function () {
            return function () {
              return $_a9bmo9141jcgfob4q.get(win).bind(function (sel) {
                return $_a9bmo9141jcgfob4q.getFirstRect(win, sel).orThunk(function () {
                  return tryFallbackBox(win);
                });
              });
            };
          });
          var setSelection = editor.setSelection.getOrThunk(function () {
            return function (start, soffset, finish, foffset) {
              $_a9bmo9141jcgfob4q.setExact(win, start, soffset, finish, foffset);
            };
          });
          var clearSelection = editor.clearSelection.getOrThunk(function () {
            return function () {
              $_a9bmo9141jcgfob4q.clear(win);
            };
          });
          return {
            body: $_ee1z6xwajcgfo8qa.constant(body),
            doc: $_ee1z6xwajcgfo8qa.constant(doc),
            win: $_ee1z6xwajcgfo8qa.constant(win),
            html: $_ee1z6xwajcgfo8qa.constant(html),
            getSelection: $_ee1z6xwajcgfo8qa.curry(getSelectionFromFrame, frame),
            setSelection: setSelection,
            clearSelection: clearSelection,
            frame: $_ee1z6xwajcgfo8qa.constant(frame),
            onKeyup: getOrListen(editor, doc, 'onKeyup', 'keyup'),
            onNodeChanged: getOrListen(editor, doc, 'onNodeChanged', 'selectionchange'),
            onDomChanged: editor.onDomChanged,
            onScrollToCursor: editor.onScrollToCursor,
            onScrollToElement: editor.onScrollToElement,
            onToReading: editor.onToReading,
            onToEditing: editor.onToEditing,
            onToolbarScrollStart: editor.onToolbarScrollStart,
            onTouchContent: editor.onTouchContent,
            onTapContent: editor.onTapContent,
            onTouchToolstrip: editor.onTouchToolstrip,
            getCursorBox: getCursorBox
          };
        });
      });
    });
  };
  var $_1hikps14ejcgfob7d = {
    getBody: getOrDerive('getBody', getBodyFromFrame),
    getDoc: getOrDerive('getDoc', getDocFromFrame),
    getWin: getOrDerive('getWin', getWinFromFrame),
    getSelection: getOrDerive('getSelection', getSelectionFromFrame),
    getFrame: getFrame,
    getActiveApi: getActiveApi
  };

  var attr = 'data-ephox-mobile-fullscreen-style';
  var siblingStyles = 'display:none!important;';
  var ancestorPosition = 'position:absolute!important;';
  var ancestorStyles = 'top:0!important;left:0!important;margin:0' + '!important;padding:0!important;width:100%!important;';
  var bgFallback = 'background-color:rgb(255,255,255)!important;';
  var isAndroid = $_6o4pdywfjcgfo8qq.detect().os.isAndroid();
  var matchColor = function (editorBody) {
    var color = $_9qule1zrjcgfo9ge.get(editorBody, 'background-color');
    return color !== undefined && color !== '' ? 'background-color:' + color + '!important' : bgFallback;
  };
  var clobberStyles = function (container, editorBody) {
    var gatherSibilings = function (element) {
      var siblings = $_fk8w0mzjjcgfo9f4.siblings(element, '*');
      return siblings;
    };
    var clobber = function (clobberStyle) {
      return function (element) {
        var styles = $_8ut06dxvjcgfo912.get(element, 'style');
        var backup = styles === undefined ? 'no-styles' : styles.trim();
        if (backup === clobberStyle) {
          return;
        } else {
          $_8ut06dxvjcgfo912.set(element, attr, backup);
          $_8ut06dxvjcgfo912.set(element, 'style', clobberStyle);
        }
      };
    };
    var ancestors = $_fk8w0mzjjcgfo9f4.ancestors(container, '*');
    var siblings = $_3h0i9zw8jcgfo8px.bind(ancestors, gatherSibilings);
    var bgColor = matchColor(editorBody);
    $_3h0i9zw8jcgfo8px.each(siblings, clobber(siblingStyles));
    $_3h0i9zw8jcgfo8px.each(ancestors, clobber(ancestorPosition + ancestorStyles + bgColor));
    var containerStyles = isAndroid === true ? '' : ancestorPosition;
    clobber(containerStyles + ancestorStyles + bgColor)(container);
  };
  var restoreStyles = function () {
    var clobberedEls = $_fk8w0mzjjcgfo9f4.all('[' + attr + ']');
    $_3h0i9zw8jcgfo8px.each(clobberedEls, function (element) {
      var restore = $_8ut06dxvjcgfo912.get(element, attr);
      if (restore !== 'no-styles') {
        $_8ut06dxvjcgfo912.set(element, 'style', restore);
      } else {
        $_8ut06dxvjcgfo912.remove(element, 'style');
      }
      $_8ut06dxvjcgfo912.remove(element, attr);
    });
  };
  var $_82r7uf14fjcgfob7v = {
    clobberStyles: clobberStyles,
    restoreStyles: restoreStyles
  };

  var tag = function () {
    var head = $_dka7lkzljcgfo9fe.first('head').getOrDie();
    var nu = function () {
      var meta = $_6rcvbhwsjcgfo8sm.fromTag('meta');
      $_8ut06dxvjcgfo912.set(meta, 'name', 'viewport');
      $_5ypytwy1jcgfo92q.append(head, meta);
      return meta;
    };
    var element = $_dka7lkzljcgfo9fe.first('meta[name="viewport"]').getOrThunk(nu);
    var backup = $_8ut06dxvjcgfo912.get(element, 'content');
    var maximize = function () {
      $_8ut06dxvjcgfo912.set(element, 'content', 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0');
    };
    var restore = function () {
      if (backup !== undefined && backup !== null && backup.length > 0) {
        $_8ut06dxvjcgfo912.set(element, 'content', backup);
      } else {
        $_8ut06dxvjcgfo912.set(element, 'content', 'user-scalable=yes');
      }
    };
    return {
      maximize: maximize,
      restore: restore
    };
  };
  var $_8m1qhh14gjcgfob89 = { tag: tag };

  var create$4 = function (platform, mask) {
    var meta = $_8m1qhh14gjcgfob89.tag();
    var androidApi = $_br33ye129jcgfoahg.api();
    var androidEvents = $_br33ye129jcgfoahg.api();
    var enter = function () {
      mask.hide();
      $_4ub0gextjcgfo90x.add(platform.container, $_3eky7iz0jcgfo9aj.resolve('fullscreen-maximized'));
      $_4ub0gextjcgfo90x.add(platform.container, $_3eky7iz0jcgfo9aj.resolve('android-maximized'));
      meta.maximize();
      $_4ub0gextjcgfo90x.add(platform.body, $_3eky7iz0jcgfo9aj.resolve('android-scroll-reload'));
      androidApi.set($_6s0im213sjcgfob28.setup(platform.win, $_1hikps14ejcgfob7d.getWin(platform.editor).getOrDie('no')));
      $_1hikps14ejcgfob7d.getActiveApi(platform.editor).each(function (editorApi) {
        $_82r7uf14fjcgfob7v.clobberStyles(platform.container, editorApi.body());
        androidEvents.set($_fw7fhr13ojcgfob0o.initEvents(editorApi, platform.toolstrip, platform.alloy));
      });
    };
    var exit = function () {
      meta.restore();
      mask.show();
      $_4ub0gextjcgfo90x.remove(platform.container, $_3eky7iz0jcgfo9aj.resolve('fullscreen-maximized'));
      $_4ub0gextjcgfo90x.remove(platform.container, $_3eky7iz0jcgfo9aj.resolve('android-maximized'));
      $_82r7uf14fjcgfob7v.restoreStyles();
      $_4ub0gextjcgfo90x.remove(platform.body, $_3eky7iz0jcgfo9aj.resolve('android-scroll-reload'));
      androidEvents.clear();
      androidApi.clear();
    };
    return {
      enter: enter,
      exit: exit
    };
  };
  var $_42dce813njcgfob0g = { create: create$4 };

  var MobileSchema = $_783jrjxgjcgfo8yn.objOf([
    $_6inazsx1jcgfo8uu.strictObjOf('editor', [
      $_6inazsx1jcgfo8uu.strict('getFrame'),
      $_6inazsx1jcgfo8uu.option('getBody'),
      $_6inazsx1jcgfo8uu.option('getDoc'),
      $_6inazsx1jcgfo8uu.option('getWin'),
      $_6inazsx1jcgfo8uu.option('getSelection'),
      $_6inazsx1jcgfo8uu.option('setSelection'),
      $_6inazsx1jcgfo8uu.option('clearSelection'),
      $_6inazsx1jcgfo8uu.option('cursorSaver'),
      $_6inazsx1jcgfo8uu.option('onKeyup'),
      $_6inazsx1jcgfo8uu.option('onNodeChanged'),
      $_6inazsx1jcgfo8uu.option('getCursorBox'),
      $_6inazsx1jcgfo8uu.strict('onDomChanged'),
      $_6inazsx1jcgfo8uu.defaulted('onTouchContent', $_ee1z6xwajcgfo8qa.noop),
      $_6inazsx1jcgfo8uu.defaulted('onTapContent', $_ee1z6xwajcgfo8qa.noop),
      $_6inazsx1jcgfo8uu.defaulted('onTouchToolstrip', $_ee1z6xwajcgfo8qa.noop),
      $_6inazsx1jcgfo8uu.defaulted('onScrollToCursor', $_ee1z6xwajcgfo8qa.constant({ unbind: $_ee1z6xwajcgfo8qa.noop })),
      $_6inazsx1jcgfo8uu.defaulted('onScrollToElement', $_ee1z6xwajcgfo8qa.constant({ unbind: $_ee1z6xwajcgfo8qa.noop })),
      $_6inazsx1jcgfo8uu.defaulted('onToEditing', $_ee1z6xwajcgfo8qa.constant({ unbind: $_ee1z6xwajcgfo8qa.noop })),
      $_6inazsx1jcgfo8uu.defaulted('onToReading', $_ee1z6xwajcgfo8qa.constant({ unbind: $_ee1z6xwajcgfo8qa.noop })),
      $_6inazsx1jcgfo8uu.defaulted('onToolbarScrollStart', $_ee1z6xwajcgfo8qa.identity)
    ]),
    $_6inazsx1jcgfo8uu.strict('socket'),
    $_6inazsx1jcgfo8uu.strict('toolstrip'),
    $_6inazsx1jcgfo8uu.strict('dropup'),
    $_6inazsx1jcgfo8uu.strict('toolbar'),
    $_6inazsx1jcgfo8uu.strict('container'),
    $_6inazsx1jcgfo8uu.strict('alloy'),
    $_6inazsx1jcgfo8uu.state('win', function (spec) {
      return $_dd88k4y2jcgfo92t.owner(spec.socket).dom().defaultView;
    }),
    $_6inazsx1jcgfo8uu.state('body', function (spec) {
      return $_6rcvbhwsjcgfo8sm.fromDom(spec.socket.dom().ownerDocument.body);
    }),
    $_6inazsx1jcgfo8uu.defaulted('translate', $_ee1z6xwajcgfo8qa.identity),
    $_6inazsx1jcgfo8uu.defaulted('setReadOnly', $_ee1z6xwajcgfo8qa.noop)
  ]);

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
  var $_anljve14jjcgfob9k = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var sketch$10 = function (onView, translate) {
    var memIcon = $_dwt5fx11djcgfoa3d.record(Container.sketch({
      dom: $_3l4nzn10pjcgfo9tr.dom('<div aria-hidden="true" class="${prefix}-mask-tap-icon"></div>'),
      containerBehaviours: $_395jq4w3jcgfo8n1.derive([Toggling.config({
          toggleClass: $_3eky7iz0jcgfo9aj.resolve('mask-tap-icon-selected'),
          toggleOnExecute: false
        })])
    }));
    var onViewThrottle = $_anljve14jjcgfob9k.first(onView, 200);
    return Container.sketch({
      dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-disabled-mask"></div>'),
      components: [Container.sketch({
          dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-content-container"></div>'),
          components: [Button.sketch({
              dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-content-tap-section"></div>'),
              components: [memIcon.asSpec()],
              action: function (button) {
                onViewThrottle.throttle();
              },
              buttonBehaviours: $_395jq4w3jcgfo8n1.derive([Toggling.config({ toggleClass: $_3eky7iz0jcgfo9aj.resolve('mask-tap-icon-selected') })])
            })]
        })]
    });
  };
  var $_bk2ner14ijcgfob92 = { sketch: sketch$10 };

  var produce = function (raw) {
    var mobile = $_783jrjxgjcgfo8yn.asRawOrDie('Getting AndroidWebapp schema', MobileSchema, raw);
    $_9qule1zrjcgfo9ge.set(mobile.toolstrip, 'width', '100%');
    var onTap = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_8rjh5i12jjcgfoal1.build($_bk2ner14ijcgfob92.sketch(onTap, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    $_5ypytwy1jcgfo92q.append(mobile.container, mask.element());
    var mode = $_42dce813njcgfob0g.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: $_ee1z6xwajcgfo8qa.noop,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_ee1z6xwajcgfo8qa.noop
    };
  };
  var $_9tlj2y13mjcgfoazy = { produce: produce };

  var schema$14 = [
    $_6inazsx1jcgfo8uu.defaulted('shell', true),
    $_70kbdh10cjcgfo9nm.field('toolbarBehaviours', [Replacing])
  ];
  var enhanceGroups = function (detail) {
    return { behaviours: $_395jq4w3jcgfo8n1.derive([Replacing.config({})]) };
  };
  var partTypes$1 = [$_cdrten10jjcgfo9qn.optional({
      name: 'groups',
      overrides: enhanceGroups
    })];
  var $_aowk6814mjcgfobav = {
    name: $_ee1z6xwajcgfo8qa.constant('Toolbar'),
    schema: $_ee1z6xwajcgfo8qa.constant(schema$14),
    parts: $_ee1z6xwajcgfo8qa.constant(partTypes$1)
  };

  var factory$4 = function (detail, components, spec, _externals) {
    var setGroups = function (toolbar, groups) {
      getGroupContainer(toolbar).fold(function () {
        console.error('Toolbar was defined to not be a shell, but no groups container was specified in components');
        throw new Error('Toolbar was defined to not be a shell, but no groups container was specified in components');
      }, function (container) {
        Replacing.set(container, groups);
      });
    };
    var getGroupContainer = function (component) {
      return detail.shell() ? $_d7fxouw9jcgfo8q5.some(component) : $_15kt8q10hjcgfo9pa.getPart(component, detail, 'groups');
    };
    var extra = detail.shell() ? {
      behaviours: [Replacing.config({})],
      components: []
    } : {
      behaviours: [],
      components: components
    };
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: extra.components,
      behaviours: $_au1coewxjcgfo8tp.deepMerge($_395jq4w3jcgfo8n1.derive(extra.behaviours), $_70kbdh10cjcgfo9nm.get(detail.toolbarBehaviours())),
      apis: { setGroups: setGroups },
      domModification: { attributes: { role: 'group' } }
    };
  };
  var Toolbar = $_8307zi10djcgfo9nz.composite({
    name: 'Toolbar',
    configFields: $_aowk6814mjcgfobav.schema(),
    partFields: $_aowk6814mjcgfobav.parts(),
    factory: factory$4,
    apis: {
      setGroups: function (apis, toolbar, groups) {
        apis.setGroups(toolbar, groups);
      }
    }
  });

  var schema$15 = [
    $_6inazsx1jcgfo8uu.strict('items'),
    $_dkk53lysjcgfo983.markers(['itemClass']),
    $_70kbdh10cjcgfo9nm.field('tgroupBehaviours', [Keying])
  ];
  var partTypes$2 = [$_cdrten10jjcgfo9qn.group({
      name: 'items',
      unit: 'item',
      overrides: function (detail) {
        return { domModification: { classes: [detail.markers().itemClass()] } };
      }
    })];
  var $_8aj1uo14ojcgfobbd = {
    name: $_ee1z6xwajcgfo8qa.constant('ToolbarGroup'),
    schema: $_ee1z6xwajcgfo8qa.constant(schema$15),
    parts: $_ee1z6xwajcgfo8qa.constant(partTypes$2)
  };

  var factory$5 = function (detail, components, spec, _externals) {
    return $_au1coewxjcgfo8tp.deepMerge({ dom: { attributes: { role: 'toolbar' } } }, {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_au1coewxjcgfo8tp.deepMerge($_395jq4w3jcgfo8n1.derive([Keying.config({
          mode: 'flow',
          selector: '.' + detail.markers().itemClass()
        })]), $_70kbdh10cjcgfo9nm.get(detail.tgroupBehaviours())),
      'debug.sketcher': spec['debug.sketcher']
    });
  };
  var ToolbarGroup = $_8307zi10djcgfo9nz.composite({
    name: 'ToolbarGroup',
    configFields: $_8aj1uo14ojcgfobbd.schema(),
    partFields: $_8aj1uo14ojcgfobbd.parts(),
    factory: factory$5
  });

  var dataHorizontal = 'data-' + $_3eky7iz0jcgfo9aj.resolve('horizontal-scroll');
  var canScrollVertically = function (container) {
    container.dom().scrollTop = 1;
    var result = container.dom().scrollTop !== 0;
    container.dom().scrollTop = 0;
    return result;
  };
  var canScrollHorizontally = function (container) {
    container.dom().scrollLeft = 1;
    var result = container.dom().scrollLeft !== 0;
    container.dom().scrollLeft = 0;
    return result;
  };
  var hasVerticalScroll = function (container) {
    return container.dom().scrollTop > 0 || canScrollVertically(container);
  };
  var hasHorizontalScroll = function (container) {
    return container.dom().scrollLeft > 0 || canScrollHorizontally(container);
  };
  var markAsHorizontal = function (container) {
    $_8ut06dxvjcgfo912.set(container, dataHorizontal, 'true');
  };
  var hasScroll = function (container) {
    return $_8ut06dxvjcgfo912.get(container, dataHorizontal) === 'true' ? hasHorizontalScroll : hasVerticalScroll;
  };
  var exclusive = function (scope, selector) {
    return $_5bqkbs13jjcgfoazc.bind(scope, 'touchmove', function (event) {
      $_dka7lkzljcgfo9fe.closest(event.target(), selector).filter(hasScroll).fold(function () {
        event.raw().preventDefault();
      }, $_ee1z6xwajcgfo8qa.noop);
    });
  };
  var $_uip4g14pjcgfobbn = {
    exclusive: exclusive,
    markAsHorizontal: markAsHorizontal
  };

  var ScrollingToolbar = function () {
    var makeGroup = function (gSpec) {
      var scrollClass = gSpec.scrollable === true ? '${prefix}-toolbar-scrollable-group' : '';
      return {
        dom: $_3l4nzn10pjcgfo9tr.dom('<div aria-label="' + gSpec.label + '" class="${prefix}-toolbar-group ' + scrollClass + '"></div>'),
        tgroupBehaviours: $_395jq4w3jcgfo8n1.derive([$_d60tjl11rjcgfoa7b.config('adhoc-scrollable-toolbar', gSpec.scrollable === true ? [$_de0ow7w5jcgfo8ot.runOnInit(function (component, simulatedEvent) {
              $_9qule1zrjcgfo9ge.set(component.element(), 'overflow-x', 'auto');
              $_uip4g14pjcgfobbn.markAsHorizontal(component.element());
              $_daiv3913gjcgfoayg.register(component.element());
            })] : [])]),
        components: [Container.sketch({ components: [ToolbarGroup.parts().items({})] })],
        markers: { itemClass: $_3eky7iz0jcgfo9aj.resolve('toolbar-group-item') },
        items: gSpec.items
      };
    };
    var toolbar = $_8rjh5i12jjcgfoal1.build(Toolbar.sketch({
      dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-toolbar"></div>'),
      components: [Toolbar.parts().groups({})],
      toolbarBehaviours: $_395jq4w3jcgfo8n1.derive([
        Toggling.config({
          toggleClass: $_3eky7iz0jcgfo9aj.resolve('context-toolbar'),
          toggleOnExecute: false,
          aria: { mode: 'none' }
        }),
        Keying.config({ mode: 'cyclic' })
      ]),
      shell: true
    }));
    var wrapper = $_8rjh5i12jjcgfoal1.build(Container.sketch({
      dom: { classes: [$_3eky7iz0jcgfo9aj.resolve('toolstrip')] },
      components: [$_8rjh5i12jjcgfoal1.premade(toolbar)],
      containerBehaviours: $_395jq4w3jcgfo8n1.derive([Toggling.config({
          toggleClass: $_3eky7iz0jcgfo9aj.resolve('android-selection-context-toolbar'),
          toggleOnExecute: false
        })])
    }));
    var resetGroups = function () {
      Toolbar.setGroups(toolbar, initGroups.get());
      Toggling.off(toolbar);
    };
    var initGroups = Cell([]);
    var setGroups = function (gs) {
      initGroups.set(gs);
      resetGroups();
    };
    var createGroups = function (gs) {
      return $_3h0i9zw8jcgfo8px.map(gs, $_ee1z6xwajcgfo8qa.compose(ToolbarGroup.sketch, makeGroup));
    };
    var refresh = function () {
      Toolbar.refresh(toolbar);
    };
    var setContextToolbar = function (gs) {
      Toggling.on(toolbar);
      Toolbar.setGroups(toolbar, gs);
    };
    var restoreToolbar = function () {
      if (Toggling.isOn(toolbar)) {
        resetGroups();
      }
    };
    var focus = function () {
      Keying.focusIn(toolbar);
    };
    return {
      wrapper: $_ee1z6xwajcgfo8qa.constant(wrapper),
      toolbar: $_ee1z6xwajcgfo8qa.constant(toolbar),
      createGroups: createGroups,
      setGroups: setGroups,
      setContextToolbar: setContextToolbar,
      restoreToolbar: restoreToolbar,
      refresh: refresh,
      focus: focus
    };
  };

  var makeEditSwitch = function (webapp) {
    return $_8rjh5i12jjcgfoal1.build(Button.sketch({
      dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-mask-edit-icon ${prefix}-icon"></div>'),
      action: function () {
        webapp.run(function (w) {
          w.setReadOnly(false);
        });
      }
    }));
  };
  var makeSocket = function () {
    return $_8rjh5i12jjcgfoal1.build(Container.sketch({
      dom: $_3l4nzn10pjcgfo9tr.dom('<div class="${prefix}-editor-socket"></div>'),
      components: [],
      containerBehaviours: $_395jq4w3jcgfo8n1.derive([Replacing.config({})])
    }));
  };
  var showEdit = function (socket, switchToEdit) {
    Replacing.append(socket, $_8rjh5i12jjcgfoal1.premade(switchToEdit));
  };
  var hideEdit = function (socket, switchToEdit) {
    Replacing.remove(socket, switchToEdit);
  };
  var updateMode = function (socket, switchToEdit, readOnly, root) {
    var swap = readOnly === true ? Swapping.toAlpha : Swapping.toOmega;
    swap(root);
    var f = readOnly ? showEdit : hideEdit;
    f(socket, switchToEdit);
  };
  var $_2x8g9214qjcgfobbz = {
    makeEditSwitch: makeEditSwitch,
    makeSocket: makeSocket,
    updateMode: updateMode
  };

  var getAnimationRoot = function (component, slideConfig) {
    return slideConfig.getAnimationRoot().fold(function () {
      return component.element();
    }, function (get) {
      return get(component);
    });
  };
  var getDimensionProperty = function (slideConfig) {
    return slideConfig.dimension().property();
  };
  var getDimension = function (slideConfig, elem) {
    return slideConfig.dimension().getDimension()(elem);
  };
  var disableTransitions = function (component, slideConfig) {
    var root = getAnimationRoot(component, slideConfig);
    $_9yt2vd12xjcgfoas3.remove(root, [
      slideConfig.shrinkingClass(),
      slideConfig.growingClass()
    ]);
  };
  var setShrunk = function (component, slideConfig) {
    $_4ub0gextjcgfo90x.remove(component.element(), slideConfig.openClass());
    $_4ub0gextjcgfo90x.add(component.element(), slideConfig.closedClass());
    $_9qule1zrjcgfo9ge.set(component.element(), getDimensionProperty(slideConfig), '0px');
    $_9qule1zrjcgfo9ge.reflow(component.element());
  };
  var measureTargetSize = function (component, slideConfig) {
    setGrown(component, slideConfig);
    var expanded = getDimension(slideConfig, component.element());
    setShrunk(component, slideConfig);
    return expanded;
  };
  var setGrown = function (component, slideConfig) {
    $_4ub0gextjcgfo90x.remove(component.element(), slideConfig.closedClass());
    $_4ub0gextjcgfo90x.add(component.element(), slideConfig.openClass());
    $_9qule1zrjcgfo9ge.remove(component.element(), getDimensionProperty(slideConfig));
  };
  var doImmediateShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_9qule1zrjcgfo9ge.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_9qule1zrjcgfo9ge.reflow(component.element());
    disableTransitions(component, slideConfig);
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
    slideConfig.onShrunk()(component);
  };
  var doStartShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_9qule1zrjcgfo9ge.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_9qule1zrjcgfo9ge.reflow(component.element());
    var root = getAnimationRoot(component, slideConfig);
    $_4ub0gextjcgfo90x.add(root, slideConfig.shrinkingClass());
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
  };
  var doStartGrow = function (component, slideConfig, slideState) {
    var fullSize = measureTargetSize(component, slideConfig);
    var root = getAnimationRoot(component, slideConfig);
    $_4ub0gextjcgfo90x.add(root, slideConfig.growingClass());
    setGrown(component, slideConfig);
    $_9qule1zrjcgfo9ge.set(component.element(), getDimensionProperty(slideConfig), fullSize);
    slideState.setExpanded();
    slideConfig.onStartGrow()(component);
  };
  var grow = function (component, slideConfig, slideState) {
    if (!slideState.isExpanded())
      doStartGrow(component, slideConfig, slideState);
  };
  var shrink = function (component, slideConfig, slideState) {
    if (slideState.isExpanded())
      doStartShrink(component, slideConfig, slideState);
  };
  var immediateShrink = function (component, slideConfig, slideState) {
    if (slideState.isExpanded())
      doImmediateShrink(component, slideConfig, slideState);
  };
  var hasGrown = function (component, slideConfig, slideState) {
    return slideState.isExpanded();
  };
  var hasShrunk = function (component, slideConfig, slideState) {
    return slideState.isCollapsed();
  };
  var isGrowing = function (component, slideConfig, slideState) {
    var root = getAnimationRoot(component, slideConfig);
    return $_4ub0gextjcgfo90x.has(root, slideConfig.growingClass()) === true;
  };
  var isShrinking = function (component, slideConfig, slideState) {
    var root = getAnimationRoot(component, slideConfig);
    return $_4ub0gextjcgfo90x.has(root, slideConfig.shrinkingClass()) === true;
  };
  var isTransitioning = function (component, slideConfig, slideState) {
    return isGrowing(component, slideConfig, slideState) === true || isShrinking(component, slideConfig, slideState) === true;
  };
  var toggleGrow = function (component, slideConfig, slideState) {
    var f = slideState.isExpanded() ? doStartShrink : doStartGrow;
    f(component, slideConfig, slideState);
  };
  var $_758x8u14ujcgfobd7 = {
    grow: grow,
    shrink: shrink,
    immediateShrink: immediateShrink,
    hasGrown: hasGrown,
    hasShrunk: hasShrunk,
    isGrowing: isGrowing,
    isShrinking: isShrinking,
    isTransitioning: isTransitioning,
    toggleGrow: toggleGrow,
    disableTransitions: disableTransitions
  };

  var exhibit$5 = function (base, slideConfig) {
    var expanded = slideConfig.expanded();
    return expanded ? $_5jneh4xjjcgfo8z7.nu({
      classes: [slideConfig.openClass()],
      styles: {}
    }) : $_5jneh4xjjcgfo8z7.nu({
      classes: [slideConfig.closedClass()],
      styles: $_8fkfzex5jcgfo8wf.wrap(slideConfig.dimension().property(), '0px')
    });
  };
  var events$9 = function (slideConfig, slideState) {
    return $_de0ow7w5jcgfo8ot.derive([$_de0ow7w5jcgfo8ot.run($_8bjxvowwjcgfo8tj.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        if (raw.propertyName === slideConfig.dimension().property()) {
          $_758x8u14ujcgfobd7.disableTransitions(component, slideConfig, slideState);
          if (slideState.isExpanded())
            $_9qule1zrjcgfo9ge.remove(component.element(), slideConfig.dimension().property());
          var notify = slideState.isExpanded() ? slideConfig.onGrown() : slideConfig.onShrunk();
          notify(component, simulatedEvent);
        }
      })]);
  };
  var $_4qv2ef14tjcgfobcx = {
    exhibit: exhibit$5,
    events: events$9
  };

  var SlidingSchema = [
    $_6inazsx1jcgfo8uu.strict('closedClass'),
    $_6inazsx1jcgfo8uu.strict('openClass'),
    $_6inazsx1jcgfo8uu.strict('shrinkingClass'),
    $_6inazsx1jcgfo8uu.strict('growingClass'),
    $_6inazsx1jcgfo8uu.option('getAnimationRoot'),
    $_dkk53lysjcgfo983.onHandler('onShrunk'),
    $_dkk53lysjcgfo983.onHandler('onStartShrink'),
    $_dkk53lysjcgfo983.onHandler('onGrown'),
    $_dkk53lysjcgfo983.onHandler('onStartGrow'),
    $_6inazsx1jcgfo8uu.defaulted('expanded', false),
    $_6inazsx1jcgfo8uu.strictOf('dimension', $_783jrjxgjcgfo8yn.choose('property', {
      width: [
        $_dkk53lysjcgfo983.output('property', 'width'),
        $_dkk53lysjcgfo983.output('getDimension', function (elem) {
          return $_2kwnrj116jcgfo9yt.get(elem) + 'px';
        })
      ],
      height: [
        $_dkk53lysjcgfo983.output('property', 'height'),
        $_dkk53lysjcgfo983.output('getDimension', function (elem) {
          return $_3rfbmazqjcgfo9gb.get(elem) + 'px';
        })
      ]
    }))
  ];

  var init$4 = function (spec) {
    var state = Cell(spec.expanded());
    var readState = function () {
      return 'expanded: ' + state.get();
    };
    return BehaviourState({
      isExpanded: function () {
        return state.get() === true;
      },
      isCollapsed: function () {
        return state.get() === false;
      },
      setCollapsed: $_ee1z6xwajcgfo8qa.curry(state.set, false),
      setExpanded: $_ee1z6xwajcgfo8qa.curry(state.set, true),
      readState: readState
    });
  };
  var $_u69j514wjcgfobe3 = { init: init$4 };

  var Sliding = $_395jq4w3jcgfo8n1.create({
    fields: SlidingSchema,
    name: 'sliding',
    active: $_4qv2ef14tjcgfobcx,
    apis: $_758x8u14ujcgfobd7,
    state: $_u69j514wjcgfobe3
  });

  var build$2 = function (refresh, scrollIntoView) {
    var dropup = $_8rjh5i12jjcgfoal1.build(Container.sketch({
      dom: {
        tag: 'div',
        classes: $_3eky7iz0jcgfo9aj.resolve('dropup')
      },
      components: [],
      containerBehaviours: $_395jq4w3jcgfo8n1.derive([
        Replacing.config({}),
        Sliding.config({
          closedClass: $_3eky7iz0jcgfo9aj.resolve('dropup-closed'),
          openClass: $_3eky7iz0jcgfo9aj.resolve('dropup-open'),
          shrinkingClass: $_3eky7iz0jcgfo9aj.resolve('dropup-shrinking'),
          growingClass: $_3eky7iz0jcgfo9aj.resolve('dropup-growing'),
          dimension: { property: 'height' },
          onShrunk: function (component) {
            refresh();
            scrollIntoView();
            Replacing.set(component, []);
          },
          onGrown: function (component) {
            refresh();
            scrollIntoView();
          }
        }),
        $_82uzw2yzjcgfo9ad.orientation(function (component, data) {
          disappear($_ee1z6xwajcgfo8qa.noop);
        })
      ])
    }));
    var appear = function (menu, update, component) {
      if (Sliding.hasShrunk(dropup) === true && Sliding.isTransitioning(dropup) === false) {
        window.requestAnimationFrame(function () {
          update(component);
          Replacing.set(dropup, [menu()]);
          Sliding.grow(dropup);
        });
      }
    };
    var disappear = function (onReadyToShrink) {
      window.requestAnimationFrame(function () {
        onReadyToShrink();
        Sliding.shrink(dropup);
      });
    };
    return {
      appear: appear,
      disappear: disappear,
      component: $_ee1z6xwajcgfo8qa.constant(dropup),
      element: dropup.element
    };
  };
  var $_ecxuh614rjcgfobcf = { build: build$2 };

  var isDangerous = function (event) {
    return event.raw().which === $_aqtpkrzdjcgfo9dh.BACKSPACE()[0] && !$_3h0i9zw8jcgfo8px.contains([
      'input',
      'textarea'
    ], $_bmv0faxwjcgfo91e.name(event.target()));
  };
  var isFirefox = $_6o4pdywfjcgfo8qq.detect().browser.isFirefox();
  var settingsSchema = $_783jrjxgjcgfo8yn.objOfOnly([
    $_6inazsx1jcgfo8uu.strictFunction('triggerEvent'),
    $_6inazsx1jcgfo8uu.strictFunction('broadcastEvent'),
    $_6inazsx1jcgfo8uu.defaulted('stopBackspace', true)
  ]);
  var bindFocus = function (container, handler) {
    if (isFirefox) {
      return $_5bqkbs13jjcgfoazc.capture(container, 'focus', handler);
    } else {
      return $_5bqkbs13jjcgfoazc.bind(container, 'focusin', handler);
    }
  };
  var bindBlur = function (container, handler) {
    if (isFirefox) {
      return $_5bqkbs13jjcgfoazc.capture(container, 'blur', handler);
    } else {
      return $_5bqkbs13jjcgfoazc.bind(container, 'focusout', handler);
    }
  };
  var setup$2 = function (container, rawSettings) {
    var settings = $_783jrjxgjcgfo8yn.asRawOrDie('Getting GUI events settings', settingsSchema, rawSettings);
    var pointerEvents = $_6o4pdywfjcgfo8qq.detect().deviceType.isTouch() ? [
      'touchstart',
      'touchmove',
      'touchend',
      'gesturestart'
    ] : [
      'mousedown',
      'mouseup',
      'mouseover',
      'mousemove',
      'mouseout',
      'click'
    ];
    var tapEvent = $_c0anmg13qjcgfob1n.monitor(settings);
    var simpleEvents = $_3h0i9zw8jcgfo8px.map(pointerEvents.concat([
      'selectstart',
      'input',
      'contextmenu',
      'change',
      'transitionend',
      'dragstart',
      'dragover',
      'drop'
    ]), function (type) {
      return $_5bqkbs13jjcgfoazc.bind(container, type, function (event) {
        tapEvent.fireIfReady(event, type).each(function (tapStopped) {
          if (tapStopped)
            event.kill();
        });
        var stopped = settings.triggerEvent(type, event);
        if (stopped)
          event.kill();
      });
    });
    var onKeydown = $_5bqkbs13jjcgfoazc.bind(container, 'keydown', function (event) {
      var stopped = settings.triggerEvent('keydown', event);
      if (stopped)
        event.kill();
      else if (settings.stopBackspace === true && isDangerous(event)) {
        event.prevent();
      }
    });
    var onFocusIn = bindFocus(container, function (event) {
      var stopped = settings.triggerEvent('focusin', event);
      if (stopped)
        event.kill();
    });
    var onFocusOut = bindBlur(container, function (event) {
      var stopped = settings.triggerEvent('focusout', event);
      if (stopped)
        event.kill();
      setTimeout(function () {
        settings.triggerEvent($_1snegiwvjcgfo8tb.postBlur(), event);
      }, 0);
    });
    var defaultView = $_dd88k4y2jcgfo92t.defaultView(container);
    var onWindowScroll = $_5bqkbs13jjcgfoazc.bind(defaultView, 'scroll', function (event) {
      var stopped = settings.broadcastEvent($_1snegiwvjcgfo8tb.windowScroll(), event);
      if (stopped)
        event.kill();
    });
    var unbind = function () {
      $_3h0i9zw8jcgfo8px.each(simpleEvents, function (e) {
        e.unbind();
      });
      onKeydown.unbind();
      onFocusIn.unbind();
      onFocusOut.unbind();
      onWindowScroll.unbind();
    };
    return { unbind: unbind };
  };
  var $_8xt4r614zjcgfobfr = { setup: setup$2 };

  var derive$3 = function (rawEvent, rawTarget) {
    var source = $_8fkfzex5jcgfo8wf.readOptFrom(rawEvent, 'target').map(function (getTarget) {
      return getTarget();
    }).getOr(rawTarget);
    return Cell(source);
  };
  var $_13nmd3151jcgfobgx = { derive: derive$3 };

  var fromSource = function (event, source) {
    var stopper = Cell(false);
    var cutter = Cell(false);
    var stop = function () {
      stopper.set(true);
    };
    var cut = function () {
      cutter.set(true);
    };
    return {
      stop: stop,
      cut: cut,
      isStopped: stopper.get,
      isCut: cutter.get,
      event: $_ee1z6xwajcgfo8qa.constant(event),
      setSource: source.set,
      getSource: source.get
    };
  };
  var fromExternal = function (event) {
    var stopper = Cell(false);
    var stop = function () {
      stopper.set(true);
    };
    return {
      stop: stop,
      cut: $_ee1z6xwajcgfo8qa.noop,
      isStopped: stopper.get,
      isCut: $_ee1z6xwajcgfo8qa.constant(false),
      event: $_ee1z6xwajcgfo8qa.constant(event),
      setTarget: $_ee1z6xwajcgfo8qa.die(new Error('Cannot set target of a broadcasted event')),
      getTarget: $_ee1z6xwajcgfo8qa.die(new Error('Cannot get target of a broadcasted event'))
    };
  };
  var fromTarget = function (event, target) {
    var source = Cell(target);
    return fromSource(event, source);
  };
  var $_2nxo0n152jcgfobh5 = {
    fromSource: fromSource,
    fromExternal: fromExternal,
    fromTarget: fromTarget
  };

  var adt$6 = $_eqsftbx3jcgfo8vg.generate([
    { stopped: [] },
    { resume: ['element'] },
    { complete: [] }
  ]);
  var doTriggerHandler = function (lookup, eventType, rawEvent, target, source, logger) {
    var handler = lookup(eventType, target);
    var simulatedEvent = $_2nxo0n152jcgfobh5.fromSource(rawEvent, source);
    return handler.fold(function () {
      logger.logEventNoHandlers(eventType, target);
      return adt$6.complete();
    }, function (handlerInfo) {
      var descHandler = handlerInfo.descHandler();
      var eventHandler = $_1xb3k712ujcgfoaqf.getHandler(descHandler);
      eventHandler(simulatedEvent);
      if (simulatedEvent.isStopped()) {
        logger.logEventStopped(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.stopped();
      } else if (simulatedEvent.isCut()) {
        logger.logEventCut(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.complete();
      } else
        return $_dd88k4y2jcgfo92t.parent(handlerInfo.element()).fold(function () {
          logger.logNoParent(eventType, handlerInfo.element(), descHandler.purpose());
          return adt$6.complete();
        }, function (parent) {
          logger.logEventResponse(eventType, handlerInfo.element(), descHandler.purpose());
          return adt$6.resume(parent);
        });
    });
  };
  var doTriggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, source, logger) {
    return doTriggerHandler(lookup, eventType, rawEvent, rawTarget, source, logger).fold(function () {
      return true;
    }, function (parent) {
      return doTriggerOnUntilStopped(lookup, eventType, rawEvent, parent, source, logger);
    }, function () {
      return false;
    });
  };
  var triggerHandler = function (lookup, eventType, rawEvent, target, logger) {
    var source = $_13nmd3151jcgfobgx.derive(rawEvent, target);
    return doTriggerHandler(lookup, eventType, rawEvent, target, source, logger);
  };
  var broadcast = function (listeners, rawEvent, logger) {
    var simulatedEvent = $_2nxo0n152jcgfobh5.fromExternal(rawEvent);
    $_3h0i9zw8jcgfo8px.each(listeners, function (listener) {
      var descHandler = listener.descHandler();
      var handler = $_1xb3k712ujcgfoaqf.getHandler(descHandler);
      handler(simulatedEvent);
    });
    return simulatedEvent.isStopped();
  };
  var triggerUntilStopped = function (lookup, eventType, rawEvent, logger) {
    var rawTarget = rawEvent.target();
    return triggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, logger);
  };
  var triggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, logger) {
    var source = $_13nmd3151jcgfobgx.derive(rawEvent, rawTarget);
    return doTriggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, source, logger);
  };
  var $_2ek93k150jcgfobgi = {
    triggerHandler: triggerHandler,
    triggerUntilStopped: triggerUntilStopped,
    triggerOnUntilStopped: triggerOnUntilStopped,
    broadcast: broadcast
  };

  var closest$4 = function (target, transform, isRoot) {
    var delegate = $_d45jk3yhjcgfo95p.closest(target, function (elem) {
      return transform(elem).isSome();
    }, isRoot);
    return delegate.bind(transform);
  };
  var $_5ihk5s155jcgfobi4 = { closest: closest$4 };

  var eventHandler = $_catt2ixljcgfo904.immutable('element', 'descHandler');
  var messageHandler = function (id, handler) {
    return {
      id: $_ee1z6xwajcgfo8qa.constant(id),
      descHandler: $_ee1z6xwajcgfo8qa.constant(handler)
    };
  };
  var EventRegistry = function () {
    var registry = {};
    var registerId = function (extraArgs, id, events) {
      $_a7hrnswzjcgfo8tz.each(events, function (v, k) {
        var handlers = registry[k] !== undefined ? registry[k] : {};
        handlers[id] = $_1xb3k712ujcgfoaqf.curryArgs(v, extraArgs);
        registry[k] = handlers;
      });
    };
    var findHandler = function (handlers, elem) {
      return $_77g8b110ljcgfo9s0.read(elem).fold(function (err) {
        return $_d7fxouw9jcgfo8q5.none();
      }, function (id) {
        var reader = $_8fkfzex5jcgfo8wf.readOpt(id);
        return handlers.bind(reader).map(function (descHandler) {
          return eventHandler(elem, descHandler);
        });
      });
    };
    var filterByType = function (type) {
      return $_8fkfzex5jcgfo8wf.readOptFrom(registry, type).map(function (handlers) {
        return $_a7hrnswzjcgfo8tz.mapToArray(handlers, function (f, id) {
          return messageHandler(id, f);
        });
      }).getOr([]);
    };
    var find = function (isAboveRoot, type, target) {
      var readType = $_8fkfzex5jcgfo8wf.readOpt(type);
      var handlers = readType(registry);
      return $_5ihk5s155jcgfobi4.closest(target, function (elem) {
        return findHandler(handlers, elem);
      }, isAboveRoot);
    };
    var unregisterId = function (id) {
      $_a7hrnswzjcgfo8tz.each(registry, function (handlersById, eventName) {
        if (handlersById.hasOwnProperty(id))
          delete handlersById[id];
      });
    };
    return {
      registerId: registerId,
      unregisterId: unregisterId,
      filterByType: filterByType,
      find: find
    };
  };

  var Registry = function () {
    var events = EventRegistry();
    var components = {};
    var readOrTag = function (component) {
      var elem = component.element();
      return $_77g8b110ljcgfo9s0.read(elem).fold(function () {
        return $_77g8b110ljcgfo9s0.write('uid-', component.element());
      }, function (uid) {
        return uid;
      });
    };
    var failOnDuplicate = function (component, tagId) {
      var conflict = components[tagId];
      if (conflict === component)
        unregister(component);
      else
        throw new Error('The tagId "' + tagId + '" is already used by: ' + $_5b4pz8y8jcgfo94i.element(conflict.element()) + '\nCannot use it for: ' + $_5b4pz8y8jcgfo94i.element(component.element()) + '\n' + 'The conflicting element is' + ($_g9a7hjy6jcgfo93s.inBody(conflict.element()) ? ' ' : ' not ') + 'already in the DOM');
    };
    var register = function (component) {
      var tagId = readOrTag(component);
      if ($_8fkfzex5jcgfo8wf.hasKey(components, tagId))
        failOnDuplicate(component, tagId);
      var extraArgs = [component];
      events.registerId(extraArgs, tagId, component.events());
      components[tagId] = component;
    };
    var unregister = function (component) {
      $_77g8b110ljcgfo9s0.read(component.element()).each(function (tagId) {
        components[tagId] = undefined;
        events.unregisterId(tagId);
      });
    };
    var filter = function (type) {
      return events.filterByType(type);
    };
    var find = function (isAboveRoot, type, target) {
      return events.find(isAboveRoot, type, target);
    };
    var getById = function (id) {
      return $_8fkfzex5jcgfo8wf.readOpt(id)(components);
    };
    return {
      find: find,
      filter: filter,
      register: register,
      unregister: unregister,
      getById: getById
    };
  };

  var create$6 = function () {
    var root = $_8rjh5i12jjcgfoal1.build(Container.sketch({ dom: { tag: 'div' } }));
    return takeover(root);
  };
  var takeover = function (root) {
    var isAboveRoot = function (el) {
      return $_dd88k4y2jcgfo92t.parent(root.element()).fold(function () {
        return true;
      }, function (parent) {
        return $_8prpzjw7jcgfo8p9.eq(el, parent);
      });
    };
    var registry = Registry();
    var lookup = function (eventName, target) {
      return registry.find(isAboveRoot, eventName, target);
    };
    var domEvents = $_8xt4r614zjcgfobfr.setup(root.element(), {
      triggerEvent: function (eventName, event) {
        return $_8jyrjqy7jcgfo93y.monitorEvent(eventName, event.target(), function (logger) {
          return $_2ek93k150jcgfobgi.triggerUntilStopped(lookup, eventName, event, logger);
        });
      },
      broadcastEvent: function (eventName, event) {
        var listeners = registry.filter(eventName);
        return $_2ek93k150jcgfobgi.broadcast(listeners, event);
      }
    });
    var systemApi = SystemApi({
      debugInfo: $_ee1z6xwajcgfo8qa.constant('real'),
      triggerEvent: function (customType, target, data) {
        $_8jyrjqy7jcgfo93y.monitorEvent(customType, target, function (logger) {
          $_2ek93k150jcgfobgi.triggerOnUntilStopped(lookup, customType, data, target, logger);
        });
      },
      triggerFocus: function (target, originator) {
        $_77g8b110ljcgfo9s0.read(target).fold(function () {
          $_evqgdsyfjcgfo95e.focus(target);
        }, function (_alloyId) {
          $_8jyrjqy7jcgfo93y.monitorEvent($_1snegiwvjcgfo8tb.focus(), target, function (logger) {
            $_2ek93k150jcgfobgi.triggerHandler(lookup, $_1snegiwvjcgfo8tb.focus(), {
              originator: $_ee1z6xwajcgfo8qa.constant(originator),
              target: $_ee1z6xwajcgfo8qa.constant(target)
            }, target, logger);
          });
        });
      },
      triggerEscape: function (comp, simulatedEvent) {
        systemApi.triggerEvent('keydown', comp.element(), simulatedEvent.event());
      },
      getByUid: function (uid) {
        return getByUid(uid);
      },
      getByDom: function (elem) {
        return getByDom(elem);
      },
      build: $_8rjh5i12jjcgfoal1.build,
      addToGui: function (c) {
        add(c);
      },
      removeFromGui: function (c) {
        remove(c);
      },
      addToWorld: function (c) {
        addToWorld(c);
      },
      removeFromWorld: function (c) {
        removeFromWorld(c);
      },
      broadcast: function (message) {
        broadcast(message);
      },
      broadcastOn: function (channels, message) {
        broadcastOn(channels, message);
      }
    });
    var addToWorld = function (component) {
      component.connect(systemApi);
      if (!$_bmv0faxwjcgfo91e.isText(component.element())) {
        registry.register(component);
        $_3h0i9zw8jcgfo8px.each(component.components(), addToWorld);
        systemApi.triggerEvent($_1snegiwvjcgfo8tb.systemInit(), component.element(), { target: $_ee1z6xwajcgfo8qa.constant(component.element()) });
      }
    };
    var removeFromWorld = function (component) {
      if (!$_bmv0faxwjcgfo91e.isText(component.element())) {
        $_3h0i9zw8jcgfo8px.each(component.components(), removeFromWorld);
        registry.unregister(component);
      }
      component.disconnect();
    };
    var add = function (component) {
      $_bi57h5y0jcgfo91w.attach(root, component);
    };
    var remove = function (component) {
      $_bi57h5y0jcgfo91w.detach(component);
    };
    var destroy = function () {
      domEvents.unbind();
      $_anj8kky4jcgfo93h.remove(root.element());
    };
    var broadcastData = function (data) {
      var receivers = registry.filter($_1snegiwvjcgfo8tb.receive());
      $_3h0i9zw8jcgfo8px.each(receivers, function (receiver) {
        var descHandler = receiver.descHandler();
        var handler = $_1xb3k712ujcgfoaqf.getHandler(descHandler);
        handler(data);
      });
    };
    var broadcast = function (message) {
      broadcastData({
        universal: $_ee1z6xwajcgfo8qa.constant(true),
        data: $_ee1z6xwajcgfo8qa.constant(message)
      });
    };
    var broadcastOn = function (channels, message) {
      broadcastData({
        universal: $_ee1z6xwajcgfo8qa.constant(false),
        channels: $_ee1z6xwajcgfo8qa.constant(channels),
        data: $_ee1z6xwajcgfo8qa.constant(message)
      });
    };
    var getByUid = function (uid) {
      return registry.getById(uid).fold(function () {
        return $_eyzbemx7jcgfo8x7.error(new Error('Could not find component with uid: "' + uid + '" in system.'));
      }, $_eyzbemx7jcgfo8x7.value);
    };
    var getByDom = function (elem) {
      return $_77g8b110ljcgfo9s0.read(elem).bind(getByUid);
    };
    addToWorld(root);
    return {
      root: $_ee1z6xwajcgfo8qa.constant(root),
      element: root.element,
      destroy: destroy,
      add: add,
      remove: remove,
      getByUid: getByUid,
      getByDom: getByDom,
      addToWorld: addToWorld,
      removeFromWorld: removeFromWorld,
      broadcast: broadcast,
      broadcastOn: broadcastOn
    };
  };
  var $_dh62el14yjcgfobew = {
    create: create$6,
    takeover: takeover
  };

  var READ_ONLY_MODE_CLASS = $_ee1z6xwajcgfo8qa.constant($_3eky7iz0jcgfo9aj.resolve('readonly-mode'));
  var EDIT_MODE_CLASS = $_ee1z6xwajcgfo8qa.constant($_3eky7iz0jcgfo9aj.resolve('edit-mode'));
  var OuterContainer = function (spec) {
    var root = $_8rjh5i12jjcgfoal1.build(Container.sketch({
      dom: { classes: [$_3eky7iz0jcgfo9aj.resolve('outer-container')].concat(spec.classes) },
      containerBehaviours: $_395jq4w3jcgfo8n1.derive([Swapping.config({
          alpha: READ_ONLY_MODE_CLASS(),
          omega: EDIT_MODE_CLASS()
        })])
    }));
    return $_dh62el14yjcgfobew.takeover(root);
  };

  var AndroidRealm = function (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_3eky7iz0jcgfo9aj.resolve('android-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_br33ye129jcgfoahg.api();
    var switchToEdit = $_2x8g9214qjcgfobbz.makeEditSwitch(webapp);
    var socket = $_2x8g9214qjcgfobbz.makeSocket();
    var dropup = $_ecxuh614rjcgfobcf.build($_ee1z6xwajcgfo8qa.noop, scrollIntoView);
    alloy.add(toolbar.wrapper());
    alloy.add(socket);
    alloy.add(dropup.component());
    var setToolbarGroups = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setGroups(groups);
    };
    var setContextToolbar = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setContextToolbar(groups);
    };
    var focusToolbar = function () {
      toolbar.focus();
    };
    var restoreToolbar = function () {
      toolbar.restoreToolbar();
    };
    var init = function (spec) {
      webapp.set($_9tlj2y13mjcgfoazy.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        w.exit();
        Replacing.remove(socket, switchToEdit);
      });
    };
    var updateMode = function (readOnly) {
      $_2x8g9214qjcgfobbz.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_ee1z6xwajcgfo8qa.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_ee1z6xwajcgfo8qa.constant(socket),
      dropup: $_ee1z6xwajcgfo8qa.constant(dropup)
    };
  };

  var initEvents$1 = function (editorApi, iosApi, toolstrip, socket, dropup) {
    var saveSelectionFirst = function () {
      iosApi.run(function (api) {
        api.highlightSelection();
      });
    };
    var refreshIosSelection = function () {
      iosApi.run(function (api) {
        api.refreshSelection();
      });
    };
    var scrollToY = function (yTop, height) {
      var y = yTop - socket.dom().scrollTop;
      iosApi.run(function (api) {
        api.scrollIntoView(y, y + height);
      });
    };
    var scrollToElement = function (target) {
      scrollToY(iosApi, socket);
    };
    var scrollToCursor = function () {
      editorApi.getCursorBox().each(function (box) {
        scrollToY(box.top(), box.height());
      });
    };
    var clearSelection = function () {
      iosApi.run(function (api) {
        api.clearSelection();
      });
    };
    var clearAndRefresh = function () {
      clearSelection();
      refreshThrottle.throttle();
    };
    var refreshView = function () {
      scrollToCursor();
      iosApi.run(function (api) {
        api.syncHeight();
      });
    };
    var reposition = function () {
      var toolbarHeight = $_3rfbmazqjcgfo9gb.get(toolstrip);
      iosApi.run(function (api) {
        api.setViewportOffset(toolbarHeight);
      });
      refreshIosSelection();
      refreshView();
    };
    var toEditing = function () {
      iosApi.run(function (api) {
        api.toEditing();
      });
    };
    var toReading = function () {
      iosApi.run(function (api) {
        api.toReading();
      });
    };
    var onToolbarTouch = function (event) {
      iosApi.run(function (api) {
        api.onToolbarTouch(event);
      });
    };
    var tapping = $_bas80413pjcgfob1f.monitor(editorApi);
    var refreshThrottle = $_anljve14jjcgfob9k.last(refreshView, 300);
    var listeners = [
      editorApi.onKeyup(clearAndRefresh),
      editorApi.onNodeChanged(refreshIosSelection),
      editorApi.onDomChanged(refreshThrottle.throttle),
      editorApi.onDomChanged(refreshIosSelection),
      editorApi.onScrollToCursor(function (tinyEvent) {
        tinyEvent.preventDefault();
        refreshThrottle.throttle();
      }),
      editorApi.onScrollToElement(function (event) {
        scrollToElement(event.element());
      }),
      editorApi.onToEditing(toEditing),
      editorApi.onToReading(toReading),
      $_5bqkbs13jjcgfoazc.bind(editorApi.doc(), 'touchend', function (touchEvent) {
        if ($_8prpzjw7jcgfo8p9.eq(editorApi.html(), touchEvent.target()) || $_8prpzjw7jcgfo8p9.eq(editorApi.body(), touchEvent.target())) {
        }
      }),
      $_5bqkbs13jjcgfoazc.bind(toolstrip, 'transitionend', function (transitionEvent) {
        if (transitionEvent.raw().propertyName === 'height') {
          reposition();
        }
      }),
      $_5bqkbs13jjcgfoazc.capture(toolstrip, 'touchstart', function (touchEvent) {
        saveSelectionFirst();
        onToolbarTouch(touchEvent);
        editorApi.onTouchToolstrip();
      }),
      $_5bqkbs13jjcgfoazc.bind(editorApi.body(), 'touchstart', function (evt) {
        clearSelection();
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_5bqkbs13jjcgfoazc.bind(editorApi.body(), 'click', function (event) {
        event.kill();
      }),
      $_5bqkbs13jjcgfoazc.bind(toolstrip, 'touchmove', function () {
        editorApi.onToolbarScrollStart();
      })
    ];
    var destroy = function () {
      $_3h0i9zw8jcgfo8px.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_677p6w159jcgfobjj = { initEvents: initEvents$1 };

  var refreshInput = function (input) {
    var start = input.dom().selectionStart;
    var end = input.dom().selectionEnd;
    var dir = input.dom().selectionDirection;
    setTimeout(function () {
      input.dom().setSelectionRange(start, end, dir);
      $_evqgdsyfjcgfo95e.focus(input);
    }, 50);
  };
  var refresh = function (winScope) {
    var sel = winScope.getSelection();
    if (sel.rangeCount > 0) {
      var br = sel.getRangeAt(0);
      var r = winScope.document.createRange();
      r.setStart(br.startContainer, br.startOffset);
      r.setEnd(br.endContainer, br.endOffset);
      sel.removeAllRanges();
      sel.addRange(r);
    }
  };
  var $_8eq5yw15djcgfoblr = {
    refreshInput: refreshInput,
    refresh: refresh
  };

  var resume$1 = function (cWin, frame) {
    $_evqgdsyfjcgfo95e.active().each(function (active) {
      if (!$_8prpzjw7jcgfo8p9.eq(active, frame)) {
        $_evqgdsyfjcgfo95e.blur(active);
      }
    });
    cWin.focus();
    $_evqgdsyfjcgfo95e.focus($_6rcvbhwsjcgfo8sm.fromDom(cWin.document.body));
    $_8eq5yw15djcgfoblr.refresh(cWin);
  };
  var $_2o6wug15cjcgfobli = { resume: resume$1 };

  var FakeSelection = function (win, frame) {
    var doc = win.document;
    var container = $_6rcvbhwsjcgfo8sm.fromTag('div');
    $_4ub0gextjcgfo90x.add(container, $_3eky7iz0jcgfo9aj.resolve('unfocused-selections'));
    $_5ypytwy1jcgfo92q.append($_6rcvbhwsjcgfo8sm.fromDom(doc.documentElement), container);
    var onTouch = $_5bqkbs13jjcgfoazc.bind(container, 'touchstart', function (event) {
      event.prevent();
      $_2o6wug15cjcgfobli.resume(win, frame);
      clear();
    });
    var make = function (rectangle) {
      var span = $_6rcvbhwsjcgfo8sm.fromTag('span');
      $_9yt2vd12xjcgfoas3.add(span, [
        $_3eky7iz0jcgfo9aj.resolve('layer-editor'),
        $_3eky7iz0jcgfo9aj.resolve('unfocused-selection')
      ]);
      $_9qule1zrjcgfo9ge.setAll(span, {
        left: rectangle.left() + 'px',
        top: rectangle.top() + 'px',
        width: rectangle.width() + 'px',
        height: rectangle.height() + 'px'
      });
      return span;
    };
    var update = function () {
      clear();
      var rectangles = $_80lifv13vjcgfob38.getRectangles(win);
      var spans = $_3h0i9zw8jcgfo8px.map(rectangles, make);
      $_979fusy5jcgfo93m.append(container, spans);
    };
    var clear = function () {
      $_anj8kky4jcgfo93h.empty(container);
    };
    var destroy = function () {
      onTouch.unbind();
      $_anj8kky4jcgfo93h.remove(container);
    };
    var isActive = function () {
      return $_dd88k4y2jcgfo92t.children(container).length > 0;
    };
    return {
      update: update,
      isActive: isActive,
      destroy: destroy,
      clear: clear
    };
  };

  var nu$9 = function (baseFn) {
    var data = $_d7fxouw9jcgfo8q5.none();
    var callbacks = [];
    var map = function (f) {
      return nu$9(function (nCallback) {
        get(function (data) {
          nCallback(f(data));
        });
      });
    };
    var get = function (nCallback) {
      if (isReady())
        call(nCallback);
      else
        callbacks.push(nCallback);
    };
    var set = function (x) {
      data = $_d7fxouw9jcgfo8q5.some(x);
      run(callbacks);
      callbacks = [];
    };
    var isReady = function () {
      return data.isSome();
    };
    var run = function (cbs) {
      $_3h0i9zw8jcgfo8px.each(cbs, call);
    };
    var call = function (cb) {
      data.each(function (x) {
        setTimeout(function () {
          cb(x);
        }, 0);
      });
    };
    baseFn(set);
    return {
      get: get,
      map: map,
      isReady: isReady
    };
  };
  var pure$2 = function (a) {
    return nu$9(function (callback) {
      callback(a);
    });
  };
  var $_6f77ps15gjcgfobmj = {
    nu: nu$9,
    pure: pure$2
  };

  var bounce = function (f) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      var me = this;
      setTimeout(function () {
        f.apply(me, args);
      }, 0);
    };
  };
  var $_bfzsfx15hjcgfobml = { bounce: bounce };

  var nu$8 = function (baseFn) {
    var get = function (callback) {
      baseFn($_bfzsfx15hjcgfobml.bounce(callback));
    };
    var map = function (fab) {
      return nu$8(function (callback) {
        get(function (a) {
          var value = fab(a);
          callback(value);
        });
      });
    };
    var bind = function (aFutureB) {
      return nu$8(function (callback) {
        get(function (a) {
          aFutureB(a).get(callback);
        });
      });
    };
    var anonBind = function (futureB) {
      return nu$8(function (callback) {
        get(function (a) {
          futureB.get(callback);
        });
      });
    };
    var toLazy = function () {
      return $_6f77ps15gjcgfobmj.nu(get);
    };
    return {
      map: map,
      bind: bind,
      anonBind: anonBind,
      toLazy: toLazy,
      get: get
    };
  };
  var pure$1 = function (a) {
    return nu$8(function (callback) {
      callback(a);
    });
  };
  var $_e7fzfy15fjcgfobmg = {
    nu: nu$8,
    pure: pure$1
  };

  var adjust = function (value, destination, amount) {
    if (Math.abs(value - destination) <= amount) {
      return $_d7fxouw9jcgfo8q5.none();
    } else if (value < destination) {
      return $_d7fxouw9jcgfo8q5.some(value + amount);
    } else {
      return $_d7fxouw9jcgfo8q5.some(value - amount);
    }
  };
  var create$8 = function () {
    var interval = null;
    var animate = function (getCurrent, destination, amount, increment, doFinish, rate) {
      var finished = false;
      var finish = function (v) {
        finished = true;
        doFinish(v);
      };
      clearInterval(interval);
      var abort = function (v) {
        clearInterval(interval);
        finish(v);
      };
      interval = setInterval(function () {
        var value = getCurrent();
        adjust(value, destination, amount).fold(function () {
          clearInterval(interval);
          finish(destination);
        }, function (s) {
          increment(s, abort);
          if (!finished) {
            var newValue = getCurrent();
            if (newValue !== s || Math.abs(newValue - destination) > Math.abs(value - destination)) {
              clearInterval(interval);
              finish(destination);
            }
          }
        });
      }, rate);
    };
    return { animate: animate };
  };
  var $_ciyakq15ijcgfobmo = {
    create: create$8,
    adjust: adjust
  };

  var findDevice = function (deviceWidth, deviceHeight) {
    var devices = [
      {
        width: 320,
        height: 480,
        keyboard: {
          portrait: 300,
          landscape: 240
        }
      },
      {
        width: 320,
        height: 568,
        keyboard: {
          portrait: 300,
          landscape: 240
        }
      },
      {
        width: 375,
        height: 667,
        keyboard: {
          portrait: 305,
          landscape: 240
        }
      },
      {
        width: 414,
        height: 736,
        keyboard: {
          portrait: 320,
          landscape: 240
        }
      },
      {
        width: 768,
        height: 1024,
        keyboard: {
          portrait: 320,
          landscape: 400
        }
      },
      {
        width: 1024,
        height: 1366,
        keyboard: {
          portrait: 380,
          landscape: 460
        }
      }
    ];
    return $_czjvbsydjcgfo959.findMap(devices, function (device) {
      return deviceWidth <= device.width && deviceHeight <= device.height ? $_d7fxouw9jcgfo8q5.some(device.keyboard) : $_d7fxouw9jcgfo8q5.none();
    }).getOr({
      portrait: deviceHeight / 5,
      landscape: deviceWidth / 4
    });
  };
  var $_uebct15ljcgfobnu = { findDevice: findDevice };

  var softKeyboardLimits = function (outerWindow) {
    return $_uebct15ljcgfobnu.findDevice(outerWindow.screen.width, outerWindow.screen.height);
  };
  var accountableKeyboardHeight = function (outerWindow) {
    var portrait = $_9l2p1513ijcgfoayw.get(outerWindow).isPortrait();
    var limits = softKeyboardLimits(outerWindow);
    var keyboard = portrait ? limits.portrait : limits.landscape;
    var visualScreenHeight = portrait ? outerWindow.screen.height : outerWindow.screen.width;
    return visualScreenHeight - outerWindow.innerHeight > keyboard ? 0 : keyboard;
  };
  var getGreenzone = function (socket, dropup) {
    var outerWindow = $_dd88k4y2jcgfo92t.owner(socket).dom().defaultView;
    var viewportHeight = $_3rfbmazqjcgfo9gb.get(socket) + $_3rfbmazqjcgfo9gb.get(dropup);
    var acc = accountableKeyboardHeight(outerWindow);
    return viewportHeight - acc;
  };
  var updatePadding = function (contentBody, socket, dropup) {
    var greenzoneHeight = getGreenzone(socket, dropup);
    var deltaHeight = $_3rfbmazqjcgfo9gb.get(socket) + $_3rfbmazqjcgfo9gb.get(dropup) - greenzoneHeight;
    $_9qule1zrjcgfo9ge.set(contentBody, 'padding-bottom', deltaHeight + 'px');
  };
  var $_7jde0u15kjcgfobnj = {
    getGreenzone: getGreenzone,
    updatePadding: updatePadding
  };

  var fixture = $_eqsftbx3jcgfo8vg.generate([
    {
      fixed: [
        'element',
        'property',
        'offsetY'
      ]
    },
    {
      scroller: [
        'element',
        'offsetY'
      ]
    }
  ]);
  var yFixedData = 'data-' + $_3eky7iz0jcgfo9aj.resolve('position-y-fixed');
  var yFixedProperty = 'data-' + $_3eky7iz0jcgfo9aj.resolve('y-property');
  var yScrollingData = 'data-' + $_3eky7iz0jcgfo9aj.resolve('scrolling');
  var windowSizeData = 'data-' + $_3eky7iz0jcgfo9aj.resolve('last-window-height');
  var getYFixedData = function (element) {
    return $_1gs84p13ujcgfob34.safeParse(element, yFixedData);
  };
  var getYFixedProperty = function (element) {
    return $_8ut06dxvjcgfo912.get(element, yFixedProperty);
  };
  var getLastWindowSize = function (element) {
    return $_1gs84p13ujcgfob34.safeParse(element, windowSizeData);
  };
  var classifyFixed = function (element, offsetY) {
    var prop = getYFixedProperty(element);
    return fixture.fixed(element, prop, offsetY);
  };
  var classifyScrolling = function (element, offsetY) {
    return fixture.scroller(element, offsetY);
  };
  var classify = function (element) {
    var offsetY = getYFixedData(element);
    var classifier = $_8ut06dxvjcgfo912.get(element, yScrollingData) === 'true' ? classifyScrolling : classifyFixed;
    return classifier(element, offsetY);
  };
  var findFixtures = function (container) {
    var candidates = $_fk8w0mzjjcgfo9f4.descendants(container, '[' + yFixedData + ']');
    return $_3h0i9zw8jcgfo8px.map(candidates, classify);
  };
  var takeoverToolbar = function (toolbar) {
    var oldToolbarStyle = $_8ut06dxvjcgfo912.get(toolbar, 'style');
    $_9qule1zrjcgfo9ge.setAll(toolbar, {
      position: 'absolute',
      top: '0px'
    });
    $_8ut06dxvjcgfo912.set(toolbar, yFixedData, '0px');
    $_8ut06dxvjcgfo912.set(toolbar, yFixedProperty, 'top');
    var restore = function () {
      $_8ut06dxvjcgfo912.set(toolbar, 'style', oldToolbarStyle || '');
      $_8ut06dxvjcgfo912.remove(toolbar, yFixedData);
      $_8ut06dxvjcgfo912.remove(toolbar, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverViewport = function (toolbarHeight, height, viewport) {
    var oldViewportStyle = $_8ut06dxvjcgfo912.get(viewport, 'style');
    $_daiv3913gjcgfoayg.register(viewport);
    $_9qule1zrjcgfo9ge.setAll(viewport, {
      position: 'absolute',
      height: height + 'px',
      width: '100%',
      top: toolbarHeight + 'px'
    });
    $_8ut06dxvjcgfo912.set(viewport, yFixedData, toolbarHeight + 'px');
    $_8ut06dxvjcgfo912.set(viewport, yScrollingData, 'true');
    $_8ut06dxvjcgfo912.set(viewport, yFixedProperty, 'top');
    var restore = function () {
      $_daiv3913gjcgfoayg.deregister(viewport);
      $_8ut06dxvjcgfo912.set(viewport, 'style', oldViewportStyle || '');
      $_8ut06dxvjcgfo912.remove(viewport, yFixedData);
      $_8ut06dxvjcgfo912.remove(viewport, yScrollingData);
      $_8ut06dxvjcgfo912.remove(viewport, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverDropup = function (dropup, toolbarHeight, viewportHeight) {
    var oldDropupStyle = $_8ut06dxvjcgfo912.get(dropup, 'style');
    $_9qule1zrjcgfo9ge.setAll(dropup, {
      position: 'absolute',
      bottom: '0px'
    });
    $_8ut06dxvjcgfo912.set(dropup, yFixedData, '0px');
    $_8ut06dxvjcgfo912.set(dropup, yFixedProperty, 'bottom');
    var restore = function () {
      $_8ut06dxvjcgfo912.set(dropup, 'style', oldDropupStyle || '');
      $_8ut06dxvjcgfo912.remove(dropup, yFixedData);
      $_8ut06dxvjcgfo912.remove(dropup, yFixedProperty);
    };
    return { restore: restore };
  };
  var deriveViewportHeight = function (viewport, toolbarHeight, dropupHeight) {
    var outerWindow = $_dd88k4y2jcgfo92t.owner(viewport).dom().defaultView;
    var winH = outerWindow.innerHeight;
    $_8ut06dxvjcgfo912.set(viewport, windowSizeData, winH + 'px');
    return winH - toolbarHeight - dropupHeight;
  };
  var takeover$1 = function (viewport, contentBody, toolbar, dropup) {
    var outerWindow = $_dd88k4y2jcgfo92t.owner(viewport).dom().defaultView;
    var toolbarSetup = takeoverToolbar(toolbar);
    var toolbarHeight = $_3rfbmazqjcgfo9gb.get(toolbar);
    var dropupHeight = $_3rfbmazqjcgfo9gb.get(dropup);
    var viewportHeight = deriveViewportHeight(viewport, toolbarHeight, dropupHeight);
    var viewportSetup = takeoverViewport(toolbarHeight, viewportHeight, viewport);
    var dropupSetup = takeoverDropup(dropup, toolbarHeight, viewportHeight);
    var isActive = true;
    var restore = function () {
      isActive = false;
      toolbarSetup.restore();
      viewportSetup.restore();
      dropupSetup.restore();
    };
    var isExpanding = function () {
      var currentWinHeight = outerWindow.innerHeight;
      var lastWinHeight = getLastWindowSize(viewport);
      return currentWinHeight > lastWinHeight;
    };
    var refresh = function () {
      if (isActive) {
        var newToolbarHeight = $_3rfbmazqjcgfo9gb.get(toolbar);
        var dropupHeight_1 = $_3rfbmazqjcgfo9gb.get(dropup);
        var newHeight = deriveViewportHeight(viewport, newToolbarHeight, dropupHeight_1);
        $_8ut06dxvjcgfo912.set(viewport, yFixedData, newToolbarHeight + 'px');
        $_9qule1zrjcgfo9ge.set(viewport, 'height', newHeight + 'px');
        $_9qule1zrjcgfo9ge.set(dropup, 'bottom', -(newToolbarHeight + newHeight + dropupHeight_1) + 'px');
        $_7jde0u15kjcgfobnj.updatePadding(contentBody, viewport, dropup);
      }
    };
    var setViewportOffset = function (newYOffset) {
      var offsetPx = newYOffset + 'px';
      $_8ut06dxvjcgfo912.set(viewport, yFixedData, offsetPx);
      refresh();
    };
    $_7jde0u15kjcgfobnj.updatePadding(contentBody, viewport, dropup);
    return {
      setViewportOffset: setViewportOffset,
      isExpanding: isExpanding,
      isShrinking: $_ee1z6xwajcgfo8qa.not(isExpanding),
      refresh: refresh,
      restore: restore
    };
  };
  var $_7a5vko15jjcgfobmv = {
    findFixtures: findFixtures,
    takeover: takeover$1,
    getYFixedData: getYFixedData
  };

  var animator = $_ciyakq15ijcgfobmo.create();
  var ANIMATION_STEP = 15;
  var NUM_TOP_ANIMATION_FRAMES = 10;
  var ANIMATION_RATE = 10;
  var lastScroll = 'data-' + $_3eky7iz0jcgfo9aj.resolve('last-scroll-top');
  var getTop = function (element) {
    var raw = $_9qule1zrjcgfo9ge.getRaw(element, 'top').getOr(0);
    return parseInt(raw, 10);
  };
  var getScrollTop = function (element) {
    return parseInt(element.dom().scrollTop, 10);
  };
  var moveScrollAndTop = function (element, destination, finalTop) {
    return $_e7fzfy15fjcgfobmg.nu(function (callback) {
      var getCurrent = $_ee1z6xwajcgfo8qa.curry(getScrollTop, element);
      var update = function (newScroll) {
        element.dom().scrollTop = newScroll;
        $_9qule1zrjcgfo9ge.set(element, 'top', getTop(element) + ANIMATION_STEP + 'px');
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_9qule1zrjcgfo9ge.set(element, 'top', finalTop + 'px');
        callback(destination);
      };
      animator.animate(getCurrent, destination, ANIMATION_STEP, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyScroll = function (element, destination) {
    return $_e7fzfy15fjcgfobmg.nu(function (callback) {
      var getCurrent = $_ee1z6xwajcgfo8qa.curry(getScrollTop, element);
      $_8ut06dxvjcgfo912.set(element, lastScroll, getCurrent());
      var update = function (newScroll, abort) {
        var previous = $_1gs84p13ujcgfob34.safeParse(element, lastScroll);
        if (previous !== element.dom().scrollTop) {
          abort(element.dom().scrollTop);
        } else {
          element.dom().scrollTop = newScroll;
          $_8ut06dxvjcgfo912.set(element, lastScroll, newScroll);
        }
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_8ut06dxvjcgfo912.set(element, lastScroll, destination);
        callback(destination);
      };
      var distance = Math.abs(destination - getCurrent());
      var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
      animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyTop = function (element, destination) {
    return $_e7fzfy15fjcgfobmg.nu(function (callback) {
      var getCurrent = $_ee1z6xwajcgfo8qa.curry(getTop, element);
      var update = function (newTop) {
        $_9qule1zrjcgfo9ge.set(element, 'top', newTop + 'px');
      };
      var finish = function () {
        update(destination);
        callback(destination);
      };
      var distance = Math.abs(destination - getCurrent());
      var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
      animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
  };
  var updateTop = function (element, amount) {
    var newTop = amount + $_7a5vko15jjcgfobmv.getYFixedData(element) + 'px';
    $_9qule1zrjcgfo9ge.set(element, 'top', newTop);
  };
  var moveWindowScroll = function (toolbar, viewport, destY) {
    var outerWindow = $_dd88k4y2jcgfo92t.owner(toolbar).dom().defaultView;
    return $_e7fzfy15fjcgfobmg.nu(function (callback) {
      updateTop(toolbar, destY);
      updateTop(viewport, destY);
      outerWindow.scrollTo(0, destY);
      callback(destY);
    });
  };
  var $_c45kve15ejcgfoblw = {
    moveScrollAndTop: moveScrollAndTop,
    moveOnlyScroll: moveOnlyScroll,
    moveOnlyTop: moveOnlyTop,
    moveWindowScroll: moveWindowScroll
  };

  var BackgroundActivity = function (doAction) {
    var action = Cell($_6f77ps15gjcgfobmj.pure({}));
    var start = function (value) {
      var future = $_6f77ps15gjcgfobmj.nu(function (callback) {
        return doAction(value).get(callback);
      });
      action.set(future);
    };
    var idle = function (g) {
      action.get().get(function () {
        g();
      });
    };
    return {
      start: start,
      idle: idle
    };
  };

  var scrollIntoView = function (cWin, socket, dropup, top, bottom) {
    var greenzone = $_7jde0u15kjcgfobnj.getGreenzone(socket, dropup);
    var refreshCursor = $_ee1z6xwajcgfo8qa.curry($_8eq5yw15djcgfoblr.refresh, cWin);
    if (top > greenzone || bottom > greenzone) {
      $_c45kve15ejcgfoblw.moveOnlyScroll(socket, socket.dom().scrollTop - greenzone + bottom).get(refreshCursor);
    } else if (top < 0) {
      $_c45kve15ejcgfoblw.moveOnlyScroll(socket, socket.dom().scrollTop + top).get(refreshCursor);
    } else {
    }
  };
  var $_fcv6jk15njcgfoboa = { scrollIntoView: scrollIntoView };

  var par$1 = function (asyncValues, nu) {
    return nu(function (callback) {
      var r = [];
      var count = 0;
      var cb = function (i) {
        return function (value) {
          r[i] = value;
          count++;
          if (count >= asyncValues.length) {
            callback(r);
          }
        };
      };
      if (asyncValues.length === 0) {
        callback([]);
      } else {
        $_3h0i9zw8jcgfo8px.each(asyncValues, function (asyncValue, i) {
          asyncValue.get(cb(i));
        });
      }
    });
  };
  var $_84valp15qjcgfobou = { par: par$1 };

  var par = function (futures) {
    return $_84valp15qjcgfobou.par(futures, $_e7fzfy15fjcgfobmg.nu);
  };
  var mapM = function (array, fn) {
    var futures = $_3h0i9zw8jcgfo8px.map(array, fn);
    return par(futures);
  };
  var compose$1 = function (f, g) {
    return function (a) {
      return g(a).bind(f);
    };
  };
  var $_9p3zr915pjcgfobos = {
    par: par,
    mapM: mapM,
    compose: compose$1
  };

  var updateFixed = function (element, property, winY, offsetY) {
    var destination = winY + offsetY;
    $_9qule1zrjcgfo9ge.set(element, property, destination + 'px');
    return $_e7fzfy15fjcgfobmg.pure(offsetY);
  };
  var updateScrollingFixed = function (element, winY, offsetY) {
    var destTop = winY + offsetY;
    var oldProp = $_9qule1zrjcgfo9ge.getRaw(element, 'top').getOr(offsetY);
    var delta = destTop - parseInt(oldProp, 10);
    var destScroll = element.dom().scrollTop + delta;
    return $_c45kve15ejcgfoblw.moveScrollAndTop(element, destScroll, destTop);
  };
  var updateFixture = function (fixture, winY) {
    return fixture.fold(function (element, property, offsetY) {
      return updateFixed(element, property, winY, offsetY);
    }, function (element, offsetY) {
      return updateScrollingFixed(element, winY, offsetY);
    });
  };
  var updatePositions = function (container, winY) {
    var fixtures = $_7a5vko15jjcgfobmv.findFixtures(container);
    var updates = $_3h0i9zw8jcgfo8px.map(fixtures, function (fixture) {
      return updateFixture(fixture, winY);
    });
    return $_9p3zr915pjcgfobos.par(updates);
  };
  var $_foze7o15ojcgfobof = { updatePositions: updatePositions };

  var input = function (parent, operation) {
    var input = $_6rcvbhwsjcgfo8sm.fromTag('input');
    $_9qule1zrjcgfo9ge.setAll(input, {
      opacity: '0',
      position: 'absolute',
      top: '-1000px',
      left: '-1000px'
    });
    $_5ypytwy1jcgfo92q.append(parent, input);
    $_evqgdsyfjcgfo95e.focus(input);
    operation(input);
    $_anj8kky4jcgfo93h.remove(input);
  };
  var $_34snkp15rjcgfobox = { input: input };

  var VIEW_MARGIN = 5;
  var register$2 = function (toolstrip, socket, container, outerWindow, structure, cWin) {
    var scroller = BackgroundActivity(function (y) {
      return $_c45kve15ejcgfoblw.moveWindowScroll(toolstrip, socket, y);
    });
    var scrollBounds = function () {
      var rects = $_80lifv13vjcgfob38.getRectangles(cWin);
      return $_d7fxouw9jcgfo8q5.from(rects[0]).bind(function (rect) {
        var viewTop = rect.top() - socket.dom().scrollTop;
        var outside = viewTop > outerWindow.innerHeight + VIEW_MARGIN || viewTop < -VIEW_MARGIN;
        return outside ? $_d7fxouw9jcgfo8q5.some({
          top: $_ee1z6xwajcgfo8qa.constant(viewTop),
          bottom: $_ee1z6xwajcgfo8qa.constant(viewTop + rect.height())
        }) : $_d7fxouw9jcgfo8q5.none();
      });
    };
    var scrollThrottle = $_anljve14jjcgfob9k.last(function () {
      scroller.idle(function () {
        $_foze7o15ojcgfobof.updatePositions(container, outerWindow.pageYOffset).get(function () {
          var extraScroll = scrollBounds();
          extraScroll.each(function (extra) {
            socket.dom().scrollTop = socket.dom().scrollTop + extra.top();
          });
          scroller.start(0);
          structure.refresh();
        });
      });
    }, 1000);
    var onScroll = $_5bqkbs13jjcgfoazc.bind($_6rcvbhwsjcgfo8sm.fromDom(outerWindow), 'scroll', function () {
      if (outerWindow.pageYOffset < 0) {
        return;
      }
      scrollThrottle.throttle();
    });
    $_foze7o15ojcgfobof.updatePositions(container, outerWindow.pageYOffset).get($_ee1z6xwajcgfo8qa.identity);
    return { unbind: onScroll.unbind };
  };
  var setup$3 = function (bag) {
    var cWin = bag.cWin();
    var ceBody = bag.ceBody();
    var socket = bag.socket();
    var toolstrip = bag.toolstrip();
    var toolbar = bag.toolbar();
    var contentElement = bag.contentElement();
    var keyboardType = bag.keyboardType();
    var outerWindow = bag.outerWindow();
    var dropup = bag.dropup();
    var structure = $_7a5vko15jjcgfobmv.takeover(socket, ceBody, toolstrip, dropup);
    var keyboardModel = keyboardType(bag.outerBody(), cWin, $_g9a7hjy6jcgfo93s.body(), contentElement, toolstrip, toolbar);
    var toEditing = function () {
      keyboardModel.toEditing();
      clearSelection();
    };
    var toReading = function () {
      keyboardModel.toReading();
    };
    var onToolbarTouch = function (event) {
      keyboardModel.onToolbarTouch(event);
    };
    var onOrientation = $_9l2p1513ijcgfoayw.onChange(outerWindow, {
      onChange: $_ee1z6xwajcgfo8qa.noop,
      onReady: structure.refresh
    });
    onOrientation.onAdjustment(function () {
      structure.refresh();
    });
    var onResize = $_5bqkbs13jjcgfoazc.bind($_6rcvbhwsjcgfo8sm.fromDom(outerWindow), 'resize', function () {
      if (structure.isExpanding()) {
        structure.refresh();
      }
    });
    var onScroll = register$2(toolstrip, socket, bag.outerBody(), outerWindow, structure, cWin);
    var unfocusedSelection = FakeSelection(cWin, contentElement);
    var refreshSelection = function () {
      if (unfocusedSelection.isActive()) {
        unfocusedSelection.update();
      }
    };
    var highlightSelection = function () {
      unfocusedSelection.update();
    };
    var clearSelection = function () {
      unfocusedSelection.clear();
    };
    var scrollIntoView = function (top, bottom) {
      $_fcv6jk15njcgfoboa.scrollIntoView(cWin, socket, dropup, top, bottom);
    };
    var syncHeight = function () {
      $_9qule1zrjcgfo9ge.set(contentElement, 'height', contentElement.dom().contentWindow.document.body.scrollHeight + 'px');
    };
    var setViewportOffset = function (newYOffset) {
      structure.setViewportOffset(newYOffset);
      $_c45kve15ejcgfoblw.moveOnlyTop(socket, newYOffset).get($_ee1z6xwajcgfo8qa.identity);
    };
    var destroy = function () {
      structure.restore();
      onOrientation.destroy();
      onScroll.unbind();
      onResize.unbind();
      keyboardModel.destroy();
      unfocusedSelection.destroy();
      $_34snkp15rjcgfobox.input($_g9a7hjy6jcgfo93s.body(), $_evqgdsyfjcgfo95e.blur);
    };
    return {
      toEditing: toEditing,
      toReading: toReading,
      onToolbarTouch: onToolbarTouch,
      refreshSelection: refreshSelection,
      clearSelection: clearSelection,
      highlightSelection: highlightSelection,
      scrollIntoView: scrollIntoView,
      updateToolbarPadding: $_ee1z6xwajcgfo8qa.noop,
      setViewportOffset: setViewportOffset,
      syncHeight: syncHeight,
      refreshStructure: structure.refresh,
      destroy: destroy
    };
  };
  var $_db8e5415ajcgfobk2 = { setup: setup$3 };

  var stubborn = function (outerBody, cWin, page, frame) {
    var toEditing = function () {
      $_2o6wug15cjcgfobli.resume(cWin, frame);
    };
    var toReading = function () {
      $_34snkp15rjcgfobox.input(outerBody, $_evqgdsyfjcgfo95e.blur);
    };
    var captureInput = $_5bqkbs13jjcgfoazc.bind(page, 'keydown', function (evt) {
      if (!$_3h0i9zw8jcgfo8px.contains([
          'input',
          'textarea'
        ], $_bmv0faxwjcgfo91e.name(evt.target()))) {
        toEditing();
      }
    });
    var onToolbarTouch = function () {
    };
    var destroy = function () {
      captureInput.unbind();
    };
    return {
      toReading: toReading,
      toEditing: toEditing,
      onToolbarTouch: onToolbarTouch,
      destroy: destroy
    };
  };
  var timid = function (outerBody, cWin, page, frame) {
    var dismissKeyboard = function () {
      $_evqgdsyfjcgfo95e.blur(frame);
    };
    var onToolbarTouch = function () {
      dismissKeyboard();
    };
    var toReading = function () {
      dismissKeyboard();
    };
    var toEditing = function () {
      $_2o6wug15cjcgfobli.resume(cWin, frame);
    };
    return {
      toReading: toReading,
      toEditing: toEditing,
      onToolbarTouch: onToolbarTouch,
      destroy: $_ee1z6xwajcgfo8qa.noop
    };
  };
  var $_1459j315sjcgfobpe = {
    stubborn: stubborn,
    timid: timid
  };

  var create$7 = function (platform, mask) {
    var meta = $_8m1qhh14gjcgfob89.tag();
    var priorState = $_br33ye129jcgfoahg.value();
    var scrollEvents = $_br33ye129jcgfoahg.value();
    var iosApi = $_br33ye129jcgfoahg.api();
    var iosEvents = $_br33ye129jcgfoahg.api();
    var enter = function () {
      mask.hide();
      var doc = $_6rcvbhwsjcgfo8sm.fromDom(document);
      $_1hikps14ejcgfob7d.getActiveApi(platform.editor).each(function (editorApi) {
        priorState.set({
          socketHeight: $_9qule1zrjcgfo9ge.getRaw(platform.socket, 'height'),
          iframeHeight: $_9qule1zrjcgfo9ge.getRaw(editorApi.frame(), 'height'),
          outerScroll: document.body.scrollTop
        });
        scrollEvents.set({ exclusives: $_uip4g14pjcgfobbn.exclusive(doc, '.' + $_daiv3913gjcgfoayg.scrollable()) });
        $_4ub0gextjcgfo90x.add(platform.container, $_3eky7iz0jcgfo9aj.resolve('fullscreen-maximized'));
        $_82r7uf14fjcgfob7v.clobberStyles(platform.container, editorApi.body());
        meta.maximize();
        $_9qule1zrjcgfo9ge.set(platform.socket, 'overflow', 'scroll');
        $_9qule1zrjcgfo9ge.set(platform.socket, '-webkit-overflow-scrolling', 'touch');
        $_evqgdsyfjcgfo95e.focus(editorApi.body());
        var setupBag = $_catt2ixljcgfo904.immutableBag([
          'cWin',
          'ceBody',
          'socket',
          'toolstrip',
          'toolbar',
          'dropup',
          'contentElement',
          'cursor',
          'keyboardType',
          'isScrolling',
          'outerWindow',
          'outerBody'
        ], []);
        iosApi.set($_db8e5415ajcgfobk2.setup(setupBag({
          cWin: editorApi.win(),
          ceBody: editorApi.body(),
          socket: platform.socket,
          toolstrip: platform.toolstrip,
          toolbar: platform.toolbar,
          dropup: platform.dropup.element(),
          contentElement: editorApi.frame(),
          cursor: $_ee1z6xwajcgfo8qa.noop,
          outerBody: platform.body,
          outerWindow: platform.win,
          keyboardType: $_1459j315sjcgfobpe.stubborn,
          isScrolling: function () {
            return scrollEvents.get().exists(function (s) {
              return s.socket.isScrolling();
            });
          }
        })));
        iosApi.run(function (api) {
          api.syncHeight();
        });
        iosEvents.set($_677p6w159jcgfobjj.initEvents(editorApi, iosApi, platform.toolstrip, platform.socket, platform.dropup));
      });
    };
    var exit = function () {
      meta.restore();
      iosEvents.clear();
      iosApi.clear();
      mask.show();
      priorState.on(function (s) {
        s.socketHeight.each(function (h) {
          $_9qule1zrjcgfo9ge.set(platform.socket, 'height', h);
        });
        s.iframeHeight.each(function (h) {
          $_9qule1zrjcgfo9ge.set(platform.editor.getFrame(), 'height', h);
        });
        document.body.scrollTop = s.scrollTop;
      });
      priorState.clear();
      scrollEvents.on(function (s) {
        s.exclusives.unbind();
      });
      scrollEvents.clear();
      $_4ub0gextjcgfo90x.remove(platform.container, $_3eky7iz0jcgfo9aj.resolve('fullscreen-maximized'));
      $_82r7uf14fjcgfob7v.restoreStyles();
      $_daiv3913gjcgfoayg.deregister(platform.toolbar);
      $_9qule1zrjcgfo9ge.remove(platform.socket, 'overflow');
      $_9qule1zrjcgfo9ge.remove(platform.socket, '-webkit-overflow-scrolling');
      $_evqgdsyfjcgfo95e.blur(platform.editor.getFrame());
      $_1hikps14ejcgfob7d.getActiveApi(platform.editor).each(function (editorApi) {
        editorApi.clearSelection();
      });
    };
    var refreshStructure = function () {
      iosApi.run(function (api) {
        api.refreshStructure();
      });
    };
    return {
      enter: enter,
      refreshStructure: refreshStructure,
      exit: exit
    };
  };
  var $_agej7g158jcgfobiw = { create: create$7 };

  var produce$1 = function (raw) {
    var mobile = $_783jrjxgjcgfo8yn.asRawOrDie('Getting IosWebapp schema', MobileSchema, raw);
    $_9qule1zrjcgfo9ge.set(mobile.toolstrip, 'width', '100%');
    $_9qule1zrjcgfo9ge.set(mobile.container, 'position', 'relative');
    var onView = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_8rjh5i12jjcgfoal1.build($_bk2ner14ijcgfob92.sketch(onView, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    var mode = $_agej7g158jcgfobiw.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: mode.refreshStructure,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_ee1z6xwajcgfo8qa.noop
    };
  };
  var $_cyderq157jcgfobik = { produce: produce$1 };

  var IosRealm = function (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_3eky7iz0jcgfo9aj.resolve('ios-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_br33ye129jcgfoahg.api();
    var switchToEdit = $_2x8g9214qjcgfobbz.makeEditSwitch(webapp);
    var socket = $_2x8g9214qjcgfobbz.makeSocket();
    var dropup = $_ecxuh614rjcgfobcf.build(function () {
      webapp.run(function (w) {
        w.refreshStructure();
      });
    }, scrollIntoView);
    alloy.add(toolbar.wrapper());
    alloy.add(socket);
    alloy.add(dropup.component());
    var setToolbarGroups = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setGroups(groups);
    };
    var setContextToolbar = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setContextToolbar(groups);
    };
    var focusToolbar = function () {
      toolbar.focus();
    };
    var restoreToolbar = function () {
      toolbar.restoreToolbar();
    };
    var init = function (spec) {
      webapp.set($_cyderq157jcgfobik.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        Replacing.remove(socket, switchToEdit);
        w.exit();
      });
    };
    var updateMode = function (readOnly) {
      $_2x8g9214qjcgfobbz.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_ee1z6xwajcgfo8qa.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_ee1z6xwajcgfo8qa.constant(socket),
      dropup: $_ee1z6xwajcgfo8qa.constant(dropup)
    };
  };

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  var derive$4 = function (editor) {
    var base = $_8fkfzex5jcgfo8wf.readOptFrom(editor.settings, 'skin_url').fold(function () {
      return EditorManager.baseURL + '/skins/' + 'lightgray';
    }, function (url) {
      return url;
    });
    return {
      content: base + '/content.mobile.min.css',
      ui: base + '/skin.mobile.min.css'
    };
  };
  var $_aa4zvi15tjcgfobpt = { derive: derive$4 };

  var fontSizes = [
    'x-small',
    'small',
    'medium',
    'large',
    'x-large'
  ];
  var fireChange$1 = function (realm, command, state) {
    realm.system().broadcastOn([$_1wsj8mynjcgfo96i.formatChanged()], {
      command: command,
      state: state
    });
  };
  var init$5 = function (realm, editor) {
    var allFormats = $_a7hrnswzjcgfo8tz.keys(editor.formatter.get());
    $_3h0i9zw8jcgfo8px.each(allFormats, function (command) {
      editor.formatter.formatChanged(command, function (state) {
        fireChange$1(realm, command, state);
      });
    });
    $_3h0i9zw8jcgfo8px.each([
      'ul',
      'ol'
    ], function (command) {
      editor.selection.selectorChanged(command, function (state, data) {
        fireChange$1(realm, command, state);
      });
    });
  };
  var $_9ojim315vjcgfobpy = {
    init: init$5,
    fontSizes: $_ee1z6xwajcgfo8qa.constant(fontSizes)
  };

  var fireSkinLoaded = function (editor) {
    var done = function () {
      editor._skinLoaded = true;
      editor.fire('SkinLoaded');
    };
    return function () {
      if (editor.initialized) {
        done();
      } else {
        editor.on('init', done);
      }
    };
  };
  var $_bv2g2h15wjcgfobq7 = { fireSkinLoaded: fireSkinLoaded };

  var READING = $_ee1z6xwajcgfo8qa.constant('toReading');
  var EDITING = $_ee1z6xwajcgfo8qa.constant('toEditing');
  ThemeManager.add('mobile', function (editor) {
    var renderUI = function (args) {
      var cssUrls = $_aa4zvi15tjcgfobpt.derive(editor);
      if ($_ewohrgymjcgfo96g.isSkinDisabled(editor) === false) {
        editor.contentCSS.push(cssUrls.content);
        DOMUtils.DOM.styleSheetLoader.load(cssUrls.ui, $_bv2g2h15wjcgfobq7.fireSkinLoaded(editor));
      } else {
        $_bv2g2h15wjcgfobq7.fireSkinLoaded(editor)();
      }
      var doScrollIntoView = function () {
        editor.fire('scrollIntoView');
      };
      var wrapper = $_6rcvbhwsjcgfo8sm.fromTag('div');
      var realm = $_6o4pdywfjcgfo8qq.detect().os.isAndroid() ? AndroidRealm(doScrollIntoView) : IosRealm(doScrollIntoView);
      var original = $_6rcvbhwsjcgfo8sm.fromDom(args.targetNode);
      $_5ypytwy1jcgfo92q.after(original, wrapper);
      $_bi57h5y0jcgfo91w.attachSystem(wrapper, realm.system());
      var findFocusIn = function (elem) {
        return $_evqgdsyfjcgfo95e.search(elem).bind(function (focused) {
          return realm.system().getByDom(focused).toOption();
        });
      };
      var outerWindow = args.targetNode.ownerDocument.defaultView;
      var orientation = $_9l2p1513ijcgfoayw.onChange(outerWindow, {
        onChange: function () {
          var alloy = realm.system();
          alloy.broadcastOn([$_1wsj8mynjcgfo96i.orientationChanged()], { width: $_9l2p1513ijcgfoayw.getActualWidth(outerWindow) });
        },
        onReady: $_ee1z6xwajcgfo8qa.noop
      });
      var setReadOnly = function (readOnlyGroups, mainGroups, ro) {
        if (ro === false) {
          editor.selection.collapse();
        }
        realm.setToolbarGroups(ro ? readOnlyGroups.get() : mainGroups.get());
        editor.setMode(ro === true ? 'readonly' : 'design');
        editor.fire(ro === true ? READING() : EDITING());
        realm.updateMode(ro);
      };
      var bindHandler = function (label, handler) {
        editor.on(label, handler);
        return {
          unbind: function () {
            editor.off(label);
          }
        };
      };
      editor.on('init', function () {
        realm.init({
          editor: {
            getFrame: function () {
              return $_6rcvbhwsjcgfo8sm.fromDom(editor.contentAreaContainer.querySelector('iframe'));
            },
            onDomChanged: function () {
              return { unbind: $_ee1z6xwajcgfo8qa.noop };
            },
            onToReading: function (handler) {
              return bindHandler(READING(), handler);
            },
            onToEditing: function (handler) {
              return bindHandler(EDITING(), handler);
            },
            onScrollToCursor: function (handler) {
              editor.on('scrollIntoView', function (tinyEvent) {
                handler(tinyEvent);
              });
              var unbind = function () {
                editor.off('scrollIntoView');
                orientation.destroy();
              };
              return { unbind: unbind };
            },
            onTouchToolstrip: function () {
              hideDropup();
            },
            onTouchContent: function () {
              var toolbar = $_6rcvbhwsjcgfo8sm.fromDom(editor.editorContainer.querySelector('.' + $_3eky7iz0jcgfo9aj.resolve('toolbar')));
              findFocusIn(toolbar).each($_4x498fwujcgfo8sy.emitExecute);
              realm.restoreToolbar();
              hideDropup();
            },
            onTapContent: function (evt) {
              var target = evt.target();
              if ($_bmv0faxwjcgfo91e.name(target) === 'img') {
                editor.selection.select(target.dom());
                evt.kill();
              } else if ($_bmv0faxwjcgfo91e.name(target) === 'a') {
                var component = realm.system().getByDom($_6rcvbhwsjcgfo8sm.fromDom(editor.editorContainer));
                component.each(function (container) {
                  if (Swapping.isAlpha(container)) {
                    $_bryrcvyljcgfo96f.openLink(target.dom());
                  }
                });
              }
            }
          },
          container: $_6rcvbhwsjcgfo8sm.fromDom(editor.editorContainer),
          socket: $_6rcvbhwsjcgfo8sm.fromDom(editor.contentAreaContainer),
          toolstrip: $_6rcvbhwsjcgfo8sm.fromDom(editor.editorContainer.querySelector('.' + $_3eky7iz0jcgfo9aj.resolve('toolstrip'))),
          toolbar: $_6rcvbhwsjcgfo8sm.fromDom(editor.editorContainer.querySelector('.' + $_3eky7iz0jcgfo9aj.resolve('toolbar'))),
          dropup: realm.dropup(),
          alloy: realm.system(),
          translate: $_ee1z6xwajcgfo8qa.noop,
          setReadOnly: function (ro) {
            setReadOnly(readOnlyGroups, mainGroups, ro);
          }
        });
        var hideDropup = function () {
          realm.dropup().disappear(function () {
            realm.system().broadcastOn([$_1wsj8mynjcgfo96i.dropupDismissed()], {});
          });
        };
        $_8jyrjqy7jcgfo93y.registerInspector('remove this', realm.system());
        var backToMaskGroup = {
          label: 'The first group',
          scrollable: false,
          items: [$_16du12z1jcgfo9ar.forToolbar('back', function () {
              editor.selection.collapse();
              realm.exit();
            }, {})]
        };
        var backToReadOnlyGroup = {
          label: 'Back to read only',
          scrollable: false,
          items: [$_16du12z1jcgfo9ar.forToolbar('readonly-back', function () {
              setReadOnly(readOnlyGroups, mainGroups, true);
            }, {})]
        };
        var readOnlyGroup = {
          label: 'The read only mode group',
          scrollable: true,
          items: []
        };
        var features = $_en9a75yojcgfo96n.setup(realm, editor);
        var items = $_en9a75yojcgfo96n.detect(editor.settings, features);
        var actionGroup = {
          label: 'the action group',
          scrollable: true,
          items: items
        };
        var extraGroup = {
          label: 'The extra group',
          scrollable: false,
          items: []
        };
        var mainGroups = Cell([
          backToReadOnlyGroup,
          actionGroup,
          extraGroup
        ]);
        var readOnlyGroups = Cell([
          backToMaskGroup,
          readOnlyGroup,
          extraGroup
        ]);
        $_9ojim315vjcgfobpy.init(realm, editor);
      });
      return {
        iframeContainer: realm.socket().element().dom(),
        editorContainer: realm.element().dom()
      };
    };
    return {
      getNotificationManagerImpl: function () {
        return {
          open: $_ee1z6xwajcgfo8qa.identity,
          close: $_ee1z6xwajcgfo8qa.noop,
          reposition: $_ee1z6xwajcgfo8qa.noop,
          getArgs: $_ee1z6xwajcgfo8qa.identity
        };
      },
      renderUI: renderUI
    };
  });
  var Theme = function () {
  };

  return Theme;

}());
})()
