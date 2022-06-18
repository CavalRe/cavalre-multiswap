import {
  require_jsx_runtime,
  require_moralis
} from "/build/_shared/chunk-IBY2OJQB.js";
import {
  __toModule,
  init_react,
  require_react
} from "/build/_shared/chunk-ZBXWLNC7.js";

// node_modules/react-moralis/lib/index.esm.js
init_react();
var import_react = __toModule(require_react());
var import_jsx_runtime = __toModule(require_jsx_runtime());
var import_moralis = __toModule(require_moralis());
var extendStatics = function(d2, b2) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
    d3.__proto__ = b3;
  } || function(d3, b3) {
    for (var p2 in b3)
      if (Object.prototype.hasOwnProperty.call(b3, p2))
        d3[p2] = b3[p2];
  };
  return extendStatics(d2, b2);
};
function __extends(d2, b2) {
  if (typeof b2 !== "function" && b2 !== null)
    throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
  extendStatics(d2, b2);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t2) {
    for (var s2, i = 1, n2 = arguments.length; i < n2; i++) {
      s2 = arguments[i];
      for (var p2 in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p2))
          t2[p2] = s2[p2];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
function __rest(s2, e) {
  var t2 = {};
  for (var p2 in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p2) && e.indexOf(p2) < 0)
      t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s2); i < p2.length; i++) {
      if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i]))
        t2[p2[i]] = s2[p2[i]];
    }
  return t2;
}
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t2[0] & 1)
      throw t2[1];
    return t2[1];
  }, trys: [], ops: [] }, f2, y2, t2, g2;
  return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_2)
      try {
        if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
          return t2;
        if (y2 = 0, t2)
          op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _2.label++;
            return { value: op[1], done: false };
          case 5:
            _2.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _2.ops.pop();
            _2.trys.pop();
            continue;
          default:
            if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _2 = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _2.label = op[1];
              break;
            }
            if (op[0] === 6 && _2.label < t2[1]) {
              _2.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _2.label < t2[2]) {
              _2.label = t2[2];
              _2.ops.push(op);
              break;
            }
            if (t2[2])
              _2.ops.pop();
            _2.trys.pop();
            continue;
        }
        op = body.call(thisArg, _2);
      } catch (e) {
        op = [6, e];
        y2 = 0;
      } finally {
        f2 = t2 = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
var Plugin;
(function(Plugin2) {
  Plugin2["ONE_INCH"] = "oneInch";
  Plugin2["OPEN_SEA"] = "opensea";
  Plugin2["FIAT"] = "fiat";
  Plugin2["RARIBLE"] = "rarible";
})(Plugin || (Plugin = {}));
var currencyFormatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
var decimalFormatter = new Intl.NumberFormat("en-us", {
  style: "decimal",
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 4
});
var MoralisContext = (0, import_react.createContext)(null);
var ReactMoralisError = function(_super) {
  __extends(ReactMoralisError2, _super);
  function ReactMoralisError2(message) {
    var _this = _super.call(this, "[react-moralis]: ".concat(message)) || this;
    _this.name = "ReactMoralisError";
    _this.message = message;
    return _this;
  }
  ReactMoralisError2.isReactMoraliserrpr = true;
  return ReactMoralisError2;
}(Error);
var NoMoralisContextProviderError = function(_super) {
  __extends(NoMoralisContextProviderError2, _super);
  function NoMoralisContextProviderError2(message) {
    var _this = _super.call(this, message) || this;
    _this.name = "NoMoralisContextProviderError";
    return _this;
  }
  return NoMoralisContextProviderError2;
}(ReactMoralisError);
var NotAuthenticatedError = function(_super) {
  __extends(NotAuthenticatedError2, _super);
  function NotAuthenticatedError2(message) {
    var _this = _super.call(this, message) || this;
    _this.name = "NotAuthenticatedError";
    return _this;
  }
  return NotAuthenticatedError2;
}(ReactMoralisError);
var ValidationError = function(_super) {
  __extends(ValidationError2, _super);
  function ValidationError2(message) {
    var _this = _super.call(this, message) || this;
    _this.name = "ValidationError";
    return _this;
  }
  return ValidationError2;
}(ReactMoralisError);
var useMoralis = function() {
  var moralisContext = (0, import_react.useContext)(MoralisContext);
  if (!moralisContext) {
    throw new NoMoralisContextProviderError("Make sure to only call useMoralis within a  <MoralisProvider>");
  }
  return moralisContext;
};
function n(n2) {
  for (var t2 = arguments.length, r2 = Array(t2 > 1 ? t2 - 1 : 0), e = 1; e < t2; e++)
    r2[e - 1] = arguments[e];
  if (true) {
    var i = Y[n2], o2 = i ? typeof i == "function" ? i.apply(null, r2) : i : "unknown error nr: " + n2;
    throw Error("[Immer] " + o2);
  }
  throw Error("[Immer] minified error nr: " + n2 + (r2.length ? " " + r2.map(function(n3) {
    return "'" + n3 + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function t(n2) {
  return !!n2 && !!n2[Q];
}
function r(n2) {
  return !!n2 && (function(n3) {
    if (!n3 || typeof n3 != "object")
      return false;
    var t2 = Object.getPrototypeOf(n3);
    if (t2 === null)
      return true;
    var r2 = Object.hasOwnProperty.call(t2, "constructor") && t2.constructor;
    return r2 === Object || typeof r2 == "function" && Function.toString.call(r2) === Z;
  }(n2) || Array.isArray(n2) || !!n2[L] || !!n2.constructor[L] || s(n2) || v(n2));
}
function i$1(n2, t2, r2) {
  r2 === void 0 && (r2 = false), o(n2) === 0 ? (r2 ? Object.keys : nn)(n2).forEach(function(e) {
    r2 && typeof e == "symbol" || t2(e, n2[e], n2);
  }) : n2.forEach(function(r3, e) {
    return t2(e, r3, n2);
  });
}
function o(n2) {
  var t2 = n2[Q];
  return t2 ? t2.i > 3 ? t2.i - 4 : t2.i : Array.isArray(n2) ? 1 : s(n2) ? 2 : v(n2) ? 3 : 0;
}
function u(n2, t2) {
  return o(n2) === 2 ? n2.has(t2) : Object.prototype.hasOwnProperty.call(n2, t2);
}
function a(n2, t2) {
  return o(n2) === 2 ? n2.get(t2) : n2[t2];
}
function f(n2, t2, r2) {
  var e = o(n2);
  e === 2 ? n2.set(t2, r2) : e === 3 ? (n2.delete(t2), n2.add(r2)) : n2[t2] = r2;
}
function c(n2, t2) {
  return n2 === t2 ? n2 !== 0 || 1 / n2 == 1 / t2 : n2 != n2 && t2 != t2;
}
function s(n2) {
  return X && n2 instanceof Map;
}
function v(n2) {
  return q && n2 instanceof Set;
}
function p(n2) {
  return n2.o || n2.t;
}
function l(n2) {
  if (Array.isArray(n2))
    return Array.prototype.slice.call(n2);
  var t2 = tn(n2);
  delete t2[Q];
  for (var r2 = nn(t2), e = 0; e < r2.length; e++) {
    var i = r2[e], o2 = t2[i];
    o2.writable === false && (o2.writable = true, o2.configurable = true), (o2.get || o2.set) && (t2[i] = { configurable: true, writable: true, enumerable: o2.enumerable, value: n2[i] });
  }
  return Object.create(Object.getPrototypeOf(n2), t2);
}
function d(n2, e) {
  return e === void 0 && (e = false), y(n2) || t(n2) || !r(n2) ? n2 : (o(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h), Object.freeze(n2), e && i$1(n2, function(n3, t2) {
    return d(t2, true);
  }, true), n2);
}
function h() {
  n(2);
}
function y(n2) {
  return n2 == null || typeof n2 != "object" || Object.isFrozen(n2);
}
function b(t2) {
  var r2 = rn[t2];
  return r2 || n(18, t2), r2;
}
function _() {
  return U || n(0), U;
}
function j(n2, t2) {
  t2 && (b("Patches"), n2.u = [], n2.s = [], n2.v = t2);
}
function O(n2) {
  g(n2), n2.p.forEach(S), n2.p = null;
}
function g(n2) {
  n2 === U && (U = n2.l);
}
function w(n2) {
  return U = { p: [], l: U, h: n2, m: true, _: 0 };
}
function S(n2) {
  var t2 = n2[Q];
  t2.i === 0 || t2.i === 1 ? t2.j() : t2.O = true;
}
function P(t2, e) {
  e._ = e.p.length;
  var i = e.p[0], o2 = t2 !== void 0 && t2 !== i;
  return e.h.g || b("ES5").S(e, t2, o2), o2 ? (i[Q].P && (O(e), n(4)), r(t2) && (t2 = M(e, t2), e.l || x(e, t2)), e.u && b("Patches").M(i[Q], t2, e.u, e.s)) : t2 = M(e, i, []), O(e), e.u && e.v(e.u, e.s), t2 !== H ? t2 : void 0;
}
function M(n2, t2, r2) {
  if (y(t2))
    return t2;
  var e = t2[Q];
  if (!e)
    return i$1(t2, function(i, o3) {
      return A(n2, e, t2, i, o3, r2);
    }, true), t2;
  if (e.A !== n2)
    return t2;
  if (!e.P)
    return x(n2, e.t, true), e.t;
  if (!e.I) {
    e.I = true, e.A._--;
    var o2 = e.i === 4 || e.i === 5 ? e.o = l(e.k) : e.o;
    i$1(e.i === 3 ? new Set(o2) : o2, function(t3, i) {
      return A(n2, e, o2, t3, i, r2);
    }), x(n2, o2, false), r2 && n2.u && b("Patches").R(e, r2, n2.u, n2.s);
  }
  return e.o;
}
function A(e, i, o2, a2, c2, s2) {
  if (c2 === o2 && n(5), t(c2)) {
    var v2 = M(e, c2, s2 && i && i.i !== 3 && !u(i.D, a2) ? s2.concat(a2) : void 0);
    if (f(o2, a2, v2), !t(v2))
      return;
    e.m = false;
  }
  if (r(c2) && !y(c2)) {
    if (!e.h.F && e._ < 1)
      return;
    M(e, c2), i && i.A.l || x(e, c2);
  }
}
function x(n2, t2, r2) {
  r2 === void 0 && (r2 = false), n2.h.F && n2.m && d(t2, r2);
}
function z(n2, t2) {
  var r2 = n2[Q];
  return (r2 ? p(r2) : n2)[t2];
}
function I(n2, t2) {
  if (t2 in n2)
    for (var r2 = Object.getPrototypeOf(n2); r2; ) {
      var e = Object.getOwnPropertyDescriptor(r2, t2);
      if (e)
        return e;
      r2 = Object.getPrototypeOf(r2);
    }
}
function k(n2) {
  n2.P || (n2.P = true, n2.l && k(n2.l));
}
function E(n2) {
  n2.o || (n2.o = l(n2.t));
}
function R(n2, t2, r2) {
  var e = s(t2) ? b("MapSet").N(t2, r2) : v(t2) ? b("MapSet").T(t2, r2) : n2.g ? function(n3, t3) {
    var r3 = Array.isArray(n3), e2 = { i: r3 ? 1 : 0, A: t3 ? t3.A : _(), P: false, I: false, D: {}, l: t3, t: n3, k: null, o: null, j: null, C: false }, i = e2, o2 = en;
    r3 && (i = [e2], o2 = on);
    var u2 = Proxy.revocable(i, o2), a2 = u2.revoke, f2 = u2.proxy;
    return e2.k = f2, e2.j = a2, f2;
  }(t2, r2) : b("ES5").J(t2, r2);
  return (r2 ? r2.A : _()).p.push(e), e;
}
function D(e) {
  return t(e) || n(22, e), function n2(t2) {
    if (!r(t2))
      return t2;
    var e2, u2 = t2[Q], c2 = o(t2);
    if (u2) {
      if (!u2.P && (u2.i < 4 || !b("ES5").K(u2)))
        return u2.t;
      u2.I = true, e2 = F(t2, c2), u2.I = false;
    } else
      e2 = F(t2, c2);
    return i$1(e2, function(t3, r2) {
      u2 && a(u2.t, t3) === r2 || f(e2, t3, n2(r2));
    }), c2 === 3 ? new Set(e2) : e2;
  }(e);
}
function F(n2, t2) {
  switch (t2) {
    case 2:
      return new Map(n2);
    case 3:
      return Array.from(n2);
  }
  return l(n2);
}
var G;
var U;
var W = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol";
var X = typeof Map != "undefined";
var q = typeof Set != "undefined";
var B = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined";
var H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G);
var L = W ? Symbol.for("immer-draftable") : "__$immer_draftable";
var Q = W ? Symbol.for("immer-state") : "__$immer_state";
var Y = { 0: "Illegal state", 1: "Immer drafts cannot have computed properties", 2: "This object has been frozen and should not be mutated", 3: function(n2) {
  return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n2;
}, 4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.", 5: "Immer forbids circular references", 6: "The first or second argument to `produce` must be a function", 7: "The third argument to `produce` must be a function or undefined", 8: "First argument to `createDraft` must be a plain object, an array, or an immerable object", 9: "First argument to `finishDraft` must be a draft returned by `createDraft`", 10: "The given draft is already finalized", 11: "Object.defineProperty() cannot be used on an Immer draft", 12: "Object.setPrototypeOf() cannot be used on an Immer draft", 13: "Immer only supports deleting array indices", 14: "Immer only supports setting array indices and the 'length' property", 15: function(n2) {
  return "Cannot apply patch, path doesn't resolve: " + n2;
}, 16: 'Sets cannot have "replace" patches.', 17: function(n2) {
  return "Unsupported patch operation: " + n2;
}, 18: function(n2) {
  return "The plugin for '" + n2 + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n2 + "()` when initializing your application.";
}, 20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available", 21: function(n2) {
  return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n2 + "'";
}, 22: function(n2) {
  return "'current' expects a draft, got: " + n2;
}, 23: function(n2) {
  return "'original' expects a draft, got: " + n2;
}, 24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed" };
var Z = "" + Object.prototype.constructor;
var nn = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(n2) {
  return Object.getOwnPropertyNames(n2).concat(Object.getOwnPropertySymbols(n2));
} : Object.getOwnPropertyNames;
var tn = Object.getOwnPropertyDescriptors || function(n2) {
  var t2 = {};
  return nn(n2).forEach(function(r2) {
    t2[r2] = Object.getOwnPropertyDescriptor(n2, r2);
  }), t2;
};
var rn = {};
var en = { get: function(n2, t2) {
  if (t2 === Q)
    return n2;
  var e = p(n2);
  if (!u(e, t2))
    return function(n3, t3, r2) {
      var e2, i2 = I(t3, r2);
      return i2 ? "value" in i2 ? i2.value : (e2 = i2.get) === null || e2 === void 0 ? void 0 : e2.call(n3.k) : void 0;
    }(n2, e, t2);
  var i = e[t2];
  return n2.I || !r(i) ? i : i === z(n2.t, t2) ? (E(n2), n2.o[t2] = R(n2.A.h, i, n2)) : i;
}, has: function(n2, t2) {
  return t2 in p(n2);
}, ownKeys: function(n2) {
  return Reflect.ownKeys(p(n2));
}, set: function(n2, t2, r2) {
  var e = I(p(n2), t2);
  if (e == null ? void 0 : e.set)
    return e.set.call(n2.k, r2), true;
  if (!n2.P) {
    var i = z(p(n2), t2), o2 = i == null ? void 0 : i[Q];
    if (o2 && o2.t === r2)
      return n2.o[t2] = r2, n2.D[t2] = false, true;
    if (c(r2, i) && (r2 !== void 0 || u(n2.t, t2)))
      return true;
    E(n2), k(n2);
  }
  return n2.o[t2] === r2 && typeof r2 != "number" && (r2 !== void 0 || t2 in n2.o) || (n2.o[t2] = r2, n2.D[t2] = true, true);
}, deleteProperty: function(n2, t2) {
  return z(n2.t, t2) !== void 0 || t2 in n2.t ? (n2.D[t2] = false, E(n2), k(n2)) : delete n2.D[t2], n2.o && delete n2.o[t2], true;
}, getOwnPropertyDescriptor: function(n2, t2) {
  var r2 = p(n2), e = Reflect.getOwnPropertyDescriptor(r2, t2);
  return e ? { writable: true, configurable: n2.i !== 1 || t2 !== "length", enumerable: e.enumerable, value: r2[t2] } : e;
}, defineProperty: function() {
  n(11);
}, getPrototypeOf: function(n2) {
  return Object.getPrototypeOf(n2.t);
}, setPrototypeOf: function() {
  n(12);
} };
var on = {};
i$1(en, function(n2, t2) {
  on[n2] = function() {
    return arguments[0] = arguments[0][0], t2.apply(this, arguments);
  };
}), on.deleteProperty = function(t2, r2) {
  return isNaN(parseInt(r2)) && n(13), en.deleteProperty.call(this, t2[0], r2);
}, on.set = function(t2, r2, e) {
  return r2 !== "length" && isNaN(parseInt(r2)) && n(14), en.set.call(this, t2[0], r2, e, t2[0]);
};
var un = function() {
  function e(t2) {
    var e2 = this;
    this.g = B, this.F = true, this.produce = function(t3, i2, o2) {
      if (typeof t3 == "function" && typeof i2 != "function") {
        var u2 = i2;
        i2 = t3;
        var a2 = e2;
        return function(n2) {
          var t4 = this;
          n2 === void 0 && (n2 = u2);
          for (var r2 = arguments.length, e3 = Array(r2 > 1 ? r2 - 1 : 0), o3 = 1; o3 < r2; o3++)
            e3[o3 - 1] = arguments[o3];
          return a2.produce(n2, function(n3) {
            var r3;
            return (r3 = i2).call.apply(r3, [t4, n3].concat(e3));
          });
        };
      }
      var f2;
      if (typeof i2 != "function" && n(6), o2 !== void 0 && typeof o2 != "function" && n(7), r(t3)) {
        var c2 = w(e2), s2 = R(e2, t3, void 0), v2 = true;
        try {
          f2 = i2(s2), v2 = false;
        } finally {
          v2 ? O(c2) : g(c2);
        }
        return typeof Promise != "undefined" && f2 instanceof Promise ? f2.then(function(n2) {
          return j(c2, o2), P(n2, c2);
        }, function(n2) {
          throw O(c2), n2;
        }) : (j(c2, o2), P(f2, c2));
      }
      if (!t3 || typeof t3 != "object") {
        if ((f2 = i2(t3)) === H)
          return;
        return f2 === void 0 && (f2 = t3), e2.F && d(f2, true), f2;
      }
      n(21, t3);
    }, this.produceWithPatches = function(n2, t3) {
      return typeof n2 == "function" ? function(t4) {
        for (var r3 = arguments.length, i3 = Array(r3 > 1 ? r3 - 1 : 0), o2 = 1; o2 < r3; o2++)
          i3[o2 - 1] = arguments[o2];
        return e2.produceWithPatches(t4, function(t5) {
          return n2.apply(void 0, [t5].concat(i3));
        });
      } : [e2.produce(n2, t3, function(n3, t4) {
        r2 = n3, i2 = t4;
      }), r2, i2];
      var r2, i2;
    }, typeof (t2 == null ? void 0 : t2.useProxies) == "boolean" && this.setUseProxies(t2.useProxies), typeof (t2 == null ? void 0 : t2.autoFreeze) == "boolean" && this.setAutoFreeze(t2.autoFreeze);
  }
  var i = e.prototype;
  return i.createDraft = function(e2) {
    r(e2) || n(8), t(e2) && (e2 = D(e2));
    var i2 = w(this), o2 = R(this, e2, void 0);
    return o2[Q].C = true, g(i2), o2;
  }, i.finishDraft = function(t2, r2) {
    var e2 = t2 && t2[Q];
    e2 && e2.C || n(9), e2.I && n(10);
    var i2 = e2.A;
    return j(i2, r2), P(void 0, i2);
  }, i.setAutoFreeze = function(n2) {
    this.F = n2;
  }, i.setUseProxies = function(t2) {
    t2 && !B && n(20), this.g = t2;
  }, i.applyPatches = function(n2, r2) {
    var e2;
    for (e2 = r2.length - 1; e2 >= 0; e2--) {
      var i2 = r2[e2];
      if (i2.path.length === 0 && i2.op === "replace") {
        n2 = i2.value;
        break;
      }
    }
    e2 > -1 && (r2 = r2.slice(e2 + 1));
    var o2 = b("Patches").$;
    return t(n2) ? o2(n2, r2) : this.produce(n2, function(n3) {
      return o2(n3, r2);
    });
  }, e;
}();
var an = new un();
var fn = an.produce;
an.produceWithPatches.bind(an);
an.setAutoFreeze.bind(an);
an.setUseProxies.bind(an);
an.applyPatches.bind(an);
an.createDraft.bind(an);
an.finishDraft.bind(an);
var setMultipleDataToUser = function(data, user) {
  var password = data.password, email = data.email, username = data.username, restData = __rest(data, ["password", "email", "username"]);
  if (password !== void 0) {
    if (typeof password !== "string") {
      throw new ValidationError("password can only be a string type");
    }
    user.setPassword(password);
  }
  if (email !== void 0) {
    if (typeof email !== "string") {
      throw new ValidationError("email can only be a string type");
    }
    user.setEmail(email);
  }
  if (username !== void 0) {
    if (typeof username !== "string") {
      throw new ValidationError("username can only be a string type");
    }
    user.setUsername(username);
  }
  Object.entries(restData).filter(function(_a) {
    var value = _a[1];
    return value !== void 0;
  }).forEach(function(_a) {
    var key = _a[0], value = _a[1];
    user.set(key, value);
  });
};
var AuthenticationState;
(function(AuthenticationState2) {
  AuthenticationState2["UNDEFINED"] = "undefined";
  AuthenticationState2["UNAUTHENTICATED"] = "unauthenticated";
  AuthenticationState2["AUTHENTICATED"] = "authenticated";
  AuthenticationState2["AUTHENTICATING"] = "authenticating";
  AuthenticationState2["LOGGING_OUT"] = "logging_out";
  AuthenticationState2["ERROR"] = "error";
})(AuthenticationState || (AuthenticationState = {}));
var initialAuth = {
  state: AuthenticationState.UNDEFINED,
  error: null
};
var defaultUseMoralisAuthOptions = function(moralis) {
  return {
    setUser: function() {
    },
    Moralis: moralis,
    environment: "browser"
  };
};
var _useMoralisAuth = function(options) {
  var _a = __assign(__assign({}, defaultUseMoralisAuthOptions(options.Moralis)), options), onAccountChanged = _a.onAccountChanged, Moralis = _a.Moralis, environment = _a.environment, _setIsWeb3Enabled = _a._setIsWeb3Enabled, _setIsWeb3EnableLoading = _a._setIsWeb3EnableLoading;
  var setUser = options.setUser;
  var _b = (0, import_react.useState)(initialAuth), auth = _b[0], setAuth = _b[1];
  var _c = (0, import_react.useState)(false), hasOnAccountChangeListener = _c[0], setHasOnAccountChangeListener = _c[1];
  var authenticate = (0, import_react.useCallback)(function(_a2) {
    if (_a2 === void 0) {
      _a2 = {};
    }
    return __awaiter(void 0, void 0, void 0, function() {
      var user, error_1;
      var onComplete = _a2.onComplete, onError = _a2.onError, onSuccess = _a2.onSuccess, throwOnError = _a2.throwOnError, rest = __rest(_a2, ["onComplete", "onError", "onSuccess", "throwOnError"]);
      return __generator(this, function(_b2) {
        switch (_b2.label) {
          case 0:
            setAuth({
              state: AuthenticationState.AUTHENTICATING,
              error: null
            });
            if (_setIsWeb3EnableLoading) {
              _setIsWeb3EnableLoading(true);
            }
            _b2.label = 1;
          case 1:
            _b2.trys.push([1, 3, 4, 5]);
            return [4, Moralis.authenticate(rest)];
          case 2:
            user = _b2.sent();
            setUser(user);
            if (_setIsWeb3Enabled) {
              _setIsWeb3Enabled(true);
            }
            setAuth({
              state: AuthenticationState.AUTHENTICATED,
              error: null
            });
            if (onSuccess) {
              onSuccess(user);
            }
            return [2, user];
          case 3:
            error_1 = _b2.sent();
            setAuth({ state: AuthenticationState.ERROR, error: error_1 });
            setUser(null);
            if (onError) {
              onError(error_1);
            }
            if (throwOnError) {
              throw error_1;
            }
            return [3, 5];
          case 4:
            if (_setIsWeb3EnableLoading) {
              _setIsWeb3EnableLoading(false);
            }
            if (onComplete) {
              onComplete();
            }
            return [7];
          case 5:
            return [2];
        }
      });
    });
  }, [_setIsWeb3Enabled, _setIsWeb3EnableLoading]);
  var signup = (0, import_react.useCallback)(function(username, password, email, otherFields, _a2) {
    if (otherFields === void 0) {
      otherFields = {};
    }
    var _b2 = _a2 === void 0 ? {} : _a2, throwOnError = _b2.throwOnError, onSuccess = _b2.onSuccess, onError = _b2.onError, onComplete = _b2.onComplete;
    return __awaiter(void 0, void 0, void 0, function() {
      var newUser, user, error_2;
      return __generator(this, function(_c2) {
        switch (_c2.label) {
          case 0:
            setAuth({
              state: AuthenticationState.AUTHENTICATING,
              error: null
            });
            newUser = new Moralis.User();
            setMultipleDataToUser(__assign({ username, password, email }, otherFields), newUser);
            _c2.label = 1;
          case 1:
            _c2.trys.push([1, 3, 4, 5]);
            return [4, newUser.signUp()];
          case 2:
            user = _c2.sent();
            setAuth({
              state: AuthenticationState.AUTHENTICATED,
              error: null
            });
            setUser(user);
            if (onSuccess) {
              onSuccess(user);
            }
            return [2, user];
          case 3:
            error_2 = _c2.sent();
            setAuth({ state: AuthenticationState.ERROR, error: error_2 });
            if (throwOnError) {
              throw error_2;
            }
            if (onError) {
              onError(error_2);
            }
            return [3, 5];
          case 4:
            if (onComplete) {
              onComplete();
            }
            return [7];
          case 5:
            return [2];
        }
      });
    });
  }, []);
  var login = (0, import_react.useCallback)(function(username, password, _a2) {
    var _b2 = _a2 === void 0 ? {} : _a2, usePost = _b2.usePost, throwOnError = _b2.throwOnError, onError = _b2.onError, onSuccess = _b2.onSuccess, onComplete = _b2.onComplete;
    return __awaiter(void 0, void 0, void 0, function() {
      var user, error_3;
      return __generator(this, function(_c2) {
        switch (_c2.label) {
          case 0:
            setAuth({
              state: AuthenticationState.AUTHENTICATING,
              error: null
            });
            _c2.label = 1;
          case 1:
            _c2.trys.push([1, 3, 4, 5]);
            return [4, Moralis.User.logIn(username, password, {
              usePost
            })];
          case 2:
            user = _c2.sent();
            setAuth({
              state: AuthenticationState.AUTHENTICATED,
              error: null
            });
            setUser(user);
            if (onSuccess) {
              onSuccess(user);
            }
            return [2, user];
          case 3:
            error_3 = _c2.sent();
            setAuth({ state: AuthenticationState.ERROR, error: error_3 });
            if (throwOnError) {
              throw error_3;
            }
            if (onError) {
              onError(error_3);
            }
            return [3, 5];
          case 4:
            if (onComplete) {
              onComplete();
            }
            return [7];
          case 5:
            return [2];
        }
      });
    });
  }, []);
  var logout = (0, import_react.useCallback)(function(_a2) {
    var _b2 = _a2 === void 0 ? {} : _a2, throwOnError = _b2.throwOnError, onError = _b2.onError, onSuccess = _b2.onSuccess, onComplete = _b2.onComplete;
    return __awaiter(void 0, void 0, void 0, function() {
      var error_4;
      var _c2;
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            setAuth({
              state: AuthenticationState.AUTHENTICATING,
              error: null
            });
            _d.label = 1;
          case 1:
            _d.trys.push([1, 3, 4, 5]);
            return [4, Moralis.User.logOut()];
          case 2:
            _d.sent();
            setAuth({ state: AuthenticationState.UNAUTHENTICATED, error: null });
            setUser(null);
            if (onSuccess) {
              onSuccess();
            }
            return [3, 5];
          case 3:
            error_4 = _d.sent();
            setAuth({ state: AuthenticationState.ERROR, error: error_4 });
            setUser((_c2 = Moralis.User.current()) !== null && _c2 !== void 0 ? _c2 : null);
            if (throwOnError) {
              throw error_4;
            }
            if (onError) {
              onError(error_4);
            }
            return [3, 5];
          case 4:
            if (onComplete) {
              onComplete();
            }
            return [7];
          case 5:
            return [2];
        }
      });
    });
  }, []);
  (0, import_react.useEffect)(function() {
    try {
      var currentUser = Moralis.User.current();
      if (currentUser) {
        setAuth({
          state: AuthenticationState.AUTHENTICATED,
          error: null
        });
        setUser(currentUser);
      } else {
        throw new Error("Let it catch");
      }
    } catch (error) {
      setAuth({
        state: AuthenticationState.UNAUTHENTICATED,
        error: null
      });
      setUser(null);
    }
  }, []);
  (0, import_react.useEffect)(function() {
    if (hasOnAccountChangeListener) {
      return;
    }
    if (environment !== "browser") {
      return;
    }
    if (!window) {
      console.warn("No window object found");
      return;
    }
    try {
      var ethereum = window.ethereum;
      if (!ethereum) {
        console.warn("No window.ethereum found");
        return;
      }
      ethereum.on("accountsChanged", function(accounts) {
        return __awaiter(void 0, void 0, void 0, function() {
          var account;
          return __generator(this, function(_a2) {
            account = accounts[0];
            if (onAccountChanged) {
              onAccountChanged(account);
            }
            return [2];
          });
        });
      });
    } catch (error) {
      console.warn(error.message);
    }
    setHasOnAccountChangeListener(true);
  }, [hasOnAccountChangeListener]);
  var isAuthenticated = auth.state === AuthenticationState.AUTHENTICATED;
  var isUnauthenticated = auth.state === AuthenticationState.UNAUTHENTICATED;
  var isAuthenticating = auth.state === AuthenticationState.AUTHENTICATING;
  var hasAuthError = auth.state === AuthenticationState.ERROR;
  var isLoggingOut = auth.state === AuthenticationState.LOGGING_OUT;
  var isAuthUndefined = auth.state === AuthenticationState.UNDEFINED;
  return {
    auth,
    authenticate,
    signup,
    login,
    logout,
    authError: auth.error,
    isAuthenticated,
    isUnauthenticated,
    isAuthenticating,
    hasAuthError,
    isLoggingOut,
    isAuthUndefined
  };
};
var _useMoralisInit = function(_a) {
  var appId = _a.appId, serverUrl = _a.serverUrl, jsKey = _a.jsKey, dangerouslyUseOfMasterKey = _a.dangerouslyUseOfMasterKey, plugins = _a.plugins, _b = _a.environment, environment = _b === void 0 ? "browser" : _b, _c = _a.getMoralis, getMoralis = _c === void 0 ? function() {
    return import_moralis.default;
  } : _c, initializeOnMount = _a.initializeOnMount, setAppId = _a.setAppId, setServerUrl = _a.setServerUrl;
  var _d = (0, import_react.useState)(false), isInitialized = _d[0], setIsInitialized = _d[1];
  var _e = (0, import_react.useState)(false), isInitializing = _e[0], setIsInitializing = _e[1];
  var _f = (0, import_react.useState)(false), shouldInitialize = _f[0], setShouldInitialize = _f[1];
  var Moralis = (0, import_react.useRef)(getMoralis());
  var _initialize = (0, import_react.useCallback)(function(_a2) {
    var serverUrl2 = _a2.serverUrl, appId2 = _a2.appId, javascriptKey = _a2.javascriptKey, masterKey = _a2.masterKey, plugins2 = _a2.plugins;
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_b2) {
        switch (_b2.label) {
          case 0:
            if (isInitialized) {
              return [2];
            }
            if (!appId2) {
              throw new ReactMoralisError('Provide a "appId" provided to <MoralisProvider>');
            }
            if (!serverUrl2) {
              throw new ReactMoralisError('Provide a "serverUrl" provided to <MoralisProvider>');
            }
            setIsInitializing(true);
            return [4, Moralis.current.start({
              serverUrl: serverUrl2,
              appId: appId2,
              javascriptKey,
              masterKey,
              plugins: plugins2
            })];
          case 1:
            _b2.sent();
            setIsInitializing(false);
            setIsInitialized(true);
            return [2];
        }
      });
    });
  }, []);
  (0, import_react.useEffect)(function() {
    if (isInitialized) {
      return;
    }
    if (!initializeOnMount && !shouldInitialize) {
      return;
    }
    _initialize({
      appId,
      serverUrl,
      masterKey: dangerouslyUseOfMasterKey,
      javascriptKey: jsKey,
      plugins
    });
    setIsInitialized(true);
  }, [
    appId,
    serverUrl,
    dangerouslyUseOfMasterKey,
    jsKey,
    plugins,
    isInitialized,
    initializeOnMount,
    shouldInitialize
  ]);
  var initialize = (0, import_react.useCallback)(function(_a2) {
    var _b2 = _a2 === void 0 ? {} : _a2, newAppId = _b2.appId, newServerUrl = _b2.serverUrl;
    if (newAppId) {
      setAppId(newAppId);
    }
    if (newServerUrl) {
      setServerUrl(newServerUrl);
    }
    if (!newAppId && !appId) {
      throw new Error("No appId is provided. Please provide an appId to the Moralis.Provider or as argument in initialize()");
    }
    if (!newServerUrl && !serverUrl) {
      throw new Error("No serverUrl is provided. Please provide an serverUrl to the Moralis.Provider or as argument in initialize()");
    }
    setShouldInitialize(true);
  }, [appId, serverUrl]);
  return {
    isInitialized,
    isInitializing,
    initialize,
    Moralis: Moralis.current,
    environment
  };
};
var _useMoralisUser = function(Moralis) {
  var _a = (0, import_react.useState)(null), user = _a[0], setUser = _a[1];
  var _b = (0, import_react.useState)(false), isUpdating = _b[0], setIsUpdating = _b[1];
  var _c = (0, import_react.useState)(null), error = _c[0], setError = _c[1];
  var setUserData = (0, import_react.useCallback)(function(data, _a2) {
    var _b2 = _a2 === void 0 ? {} : _a2, throwOnError = _b2.throwOnError, onComplete = _b2.onComplete, onError = _b2.onError, onSuccess = _b2.onSuccess;
    return __awaiter(void 0, void 0, void 0, function() {
      var userHasLocallyUpdated, currentUser, error_1;
      return __generator(this, function(_c2) {
        switch (_c2.label) {
          case 0:
            if (!user) {
              throw new NotAuthenticatedError("User needs to be authenticated before setting new data");
            }
            setIsUpdating(true);
            setError(null);
            userHasLocallyUpdated = false;
            _c2.label = 1;
          case 1:
            _c2.trys.push([1, 3, 4, 5]);
            setMultipleDataToUser(data, user);
            userHasLocallyUpdated = true;
            return [4, user.save()];
          case 2:
            _c2.sent();
            currentUser = Moralis.User.current();
            if (!currentUser) {
              throw new ReactMoralisError("No user data found after save");
            }
            setUser(currentUser);
            if (onSuccess) {
              onSuccess(user);
            }
            return [2, user];
          case 3:
            error_1 = _c2.sent();
            if (userHasLocallyUpdated) {
              user.revert();
            }
            setError(error_1);
            if (throwOnError) {
              throw error_1;
            }
            if (onError) {
              onError(error_1);
            }
            return [3, 5];
          case 4:
            setIsUpdating(false);
            if (onComplete) {
              onComplete();
            }
            return [7];
          case 5:
            return [2];
        }
      });
    });
  }, [user]);
  var refetchUserData = (0, import_react.useCallback)(function(_a2) {
    var _b2 = _a2 === void 0 ? {} : _a2, throwOnError = _b2.throwOnError, onComplete = _b2.onComplete, onError = _b2.onError, onSuccess = _b2.onSuccess;
    return __awaiter(void 0, void 0, void 0, function() {
      var newUserData, error_2;
      return __generator(this, function(_c2) {
        switch (_c2.label) {
          case 0:
            if (!user) {
              throw new NotAuthenticatedError("User needs to be authenticated before refetching");
            }
            setIsUpdating(true);
            setError(null);
            _c2.label = 1;
          case 1:
            _c2.trys.push([1, 3, 4, 5]);
            return [4, user.fetch()];
          case 2:
            newUserData = _c2.sent();
            if (!newUserData) {
              throw new ReactMoralisError("No user data found after refetch");
            }
            setUser(newUserData);
            if (onSuccess) {
              onSuccess(newUserData);
            }
            return [2, newUserData];
          case 3:
            error_2 = _c2.sent();
            setError(error_2);
            if (throwOnError) {
              throw error_2;
            }
            if (onError) {
              onError(error_2);
            }
            return [3, 5];
          case 4:
            setIsUpdating(false);
            if (onComplete) {
              onComplete();
            }
            return [7];
          case 5:
            return [2];
        }
      });
    });
  }, [user]);
  return {
    setUserData,
    setUser,
    refetchUserData,
    user,
    _setUser: setUser,
    isUserUpdating: isUpdating,
    userError: error
  };
};
var _useMoralisWeb3 = function(Moralis) {
  var _a = (0, import_react.useState)(false), isWeb3Enabled = _a[0], _setIsWeb3Enabled = _a[1];
  var _b = (0, import_react.useState)(null), web3EnableError = _b[0], setEnableWeb3Error = _b[1];
  var _c = (0, import_react.useState)(false), isWeb3EnableLoading = _c[0], _setIsWeb3EnableLoading = _c[1];
  var _d = (0, import_react.useState)(null), web3 = _d[0], setWeb3 = _d[1];
  var _e = (0, import_react.useState)(null), chainId = _e[0], setChainId = _e[1];
  var _f = (0, import_react.useState)(null), account = _f[0], setAccount = _f[1];
  var _g = (0, import_react.useState)(null), connector = _g[0], setConnector = _g[1];
  var _h = (0, import_react.useState)(null), provider = _h[0], setProvider = _h[1];
  (0, import_react.useEffect)(function() {
    var handleConnect = function(_a2) {
      var web32 = _a2.web3, chainId2 = _a2.chainId, account2 = _a2.account, connector2 = _a2.connector, provider2 = _a2.provider;
      setWeb3(web32);
      setChainId(chainId2);
      setAccount(account2);
      setConnector(connector2);
      setProvider(provider2);
    };
    var handleDisconnect = function() {
      setWeb3(null);
      _setIsWeb3Enabled(false);
      setChainId(null);
      setAccount(null);
      setConnector(null);
      setProvider(null);
    };
    var handleChainChanged = function(chainId2) {
      setChainId(chainId2);
      setWeb3(Moralis.web3);
    };
    var unsubChainChanged = Moralis.onChainChanged(handleChainChanged);
    var unsubAccountChanged = Moralis.onAccountChanged(setAccount);
    var unsubEnable = Moralis.onWeb3Enabled(handleConnect);
    var unsubDeactivate = Moralis.onWeb3Deactivated(handleDisconnect);
    var unsubDisconnect = Moralis.onDisconnect(handleDisconnect);
    return function() {
      unsubChainChanged();
      unsubAccountChanged();
      unsubEnable();
      unsubDeactivate();
      unsubDisconnect();
    };
  }, [Moralis]);
  var enableWeb3 = (0, import_react.useCallback)(function(_a2) {
    if (_a2 === void 0) {
      _a2 = {};
    }
    return __awaiter(void 0, void 0, void 0, function() {
      var currentWeb3, error_1;
      var throwOnError = _a2.throwOnError, onComplete = _a2.onComplete, onError = _a2.onError, onSuccess = _a2.onSuccess, rest = __rest(_a2, ["throwOnError", "onComplete", "onError", "onSuccess"]);
      return __generator(this, function(_b2) {
        switch (_b2.label) {
          case 0:
            _setIsWeb3EnableLoading(true);
            setEnableWeb3Error(null);
            _b2.label = 1;
          case 1:
            _b2.trys.push([1, 3, 4, 5]);
            return [4, Moralis.enableWeb3(rest)];
          case 2:
            currentWeb3 = _b2.sent();
            _setIsWeb3Enabled(true);
            if (onSuccess) {
              onSuccess(currentWeb3);
            }
            return [2, currentWeb3];
          case 3:
            error_1 = _b2.sent();
            setEnableWeb3Error(error_1);
            if (throwOnError) {
              throw error_1;
            }
            if (onError) {
              onError(error_1);
            }
            return [3, 5];
          case 4:
            _setIsWeb3EnableLoading(false);
            if (onComplete) {
              onComplete();
            }
            return [7];
          case 5:
            return [2];
        }
      });
    });
  }, []);
  var deactivateWeb3 = (0, import_react.useCallback)(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            return [4, Moralis.deactivateWeb3()];
          case 1:
            _a2.sent();
            return [2];
        }
      });
    });
  }, []);
  var network = (0, import_react.useMemo)(function() {
    var _a2;
    return (_a2 = connector === null || connector === void 0 ? void 0 : connector.network) !== null && _a2 !== void 0 ? _a2 : null;
  }, [connector]);
  var connectorType = (0, import_react.useMemo)(function() {
    var _a2;
    return (_a2 = connector === null || connector === void 0 ? void 0 : connector.type) !== null && _a2 !== void 0 ? _a2 : null;
  }, [connector]);
  return {
    enableWeb3,
    web3,
    isWeb3Enabled,
    web3EnableError,
    isWeb3EnableLoading,
    _setIsWeb3Enabled,
    _setIsWeb3EnableLoading,
    chainId,
    account,
    network,
    connector,
    connectorType,
    deactivateWeb3,
    provider
  };
};
var MoralisProvider = function(_a) {
  var children = _a.children, _appId = _a.appId, _serverUrl = _a.serverUrl, jsKey = _a.jsKey, dangerouslyUseOfMasterKey = _a.dangerouslyUseOfMasterKey, plugins = _a.plugins, environment = _a.environment, getMoralis = _a.getMoralis, _b = _a.options, _c = _b === void 0 ? {} : _b, onAccountChanged = _c.onAccountChanged, _d = _a.initializeOnMount, initializeOnMount = _d === void 0 ? true : _d;
  var _e = (0, import_react.useState)(_appId !== null && _appId !== void 0 ? _appId : null), appId = _e[0], setAppId = _e[1];
  var _f = (0, import_react.useState)(_serverUrl !== null && _serverUrl !== void 0 ? _serverUrl : null), serverUrl = _f[0], setServerUrl = _f[1];
  var moralisInit = _useMoralisInit({
    appId,
    serverUrl,
    jsKey,
    dangerouslyUseOfMasterKey,
    plugins,
    environment,
    getMoralis,
    initializeOnMount,
    setAppId,
    setServerUrl
  });
  var _g = _useMoralisWeb3(moralisInit.Moralis), _setIsWeb3Enabled = _g._setIsWeb3Enabled, _setIsWeb3EnableLoading = _g._setIsWeb3EnableLoading, moralisWeb3 = __rest(_g, ["_setIsWeb3Enabled", "_setIsWeb3EnableLoading"]);
  var _h = _useMoralisUser(moralisInit.Moralis), setUser = _h.setUser, moralisUser = __rest(_h, ["setUser"]);
  var moralisAuth = _useMoralisAuth({
    onAccountChanged,
    setUser,
    Moralis: moralisInit.Moralis,
    environment: moralisInit.environment,
    _setIsWeb3Enabled,
    _setIsWeb3EnableLoading
  });
  return (0, import_jsx_runtime.jsx)(MoralisContext.Provider, __assign({ value: __assign(__assign(__assign(__assign(__assign({}, moralisInit), moralisAuth), moralisUser), moralisWeb3), { appId, serverUrl }) }, { children }), void 0);
};

export {
  useMoralis,
  MoralisProvider
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=/build/_shared/chunk-D7L2ONFT.js.map
