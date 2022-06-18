import {
  _extends,
  init_extends,
  require_react_dom
} from "/build/_shared/chunk-BKGW37I2.js";
import {
  __commonJS,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-6CGL4AQG.js";

// node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    init_react();
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element2 = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment5 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal2 = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement2(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element2;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment5;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal2;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement2;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/hoist-non-react-statics/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/hoist-non-react-statics/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    init_react();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS({
  "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(exports, module) {
    "use strict";
    init_react();
    var reactIs = require_react_is();
    var REACT_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
    };
    var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    var FORWARD_REF_STATICS = {
      "$$typeof": true,
      render: true,
      defaultProps: true,
      displayName: true,
      propTypes: true
    };
    var MEMO_STATICS = {
      "$$typeof": true,
      compare: true,
      defaultProps: true,
      displayName: true,
      propTypes: true,
      type: true
    };
    var TYPE_STATICS = {};
    TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
    TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
    function getStatics(component) {
      if (reactIs.isMemo(component)) {
        return MEMO_STATICS;
      }
      return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
    }
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = Object.prototype;
    function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== "string") {
        if (objectPrototype) {
          var inheritedComponent = getPrototypeOf(sourceComponent);
          if (inheritedComponent && inheritedComponent !== objectPrototype) {
            hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
          }
        }
        var keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
          keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
            var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
            try {
              defineProperty(targetComponent, key, descriptor);
            } catch (e4) {
            }
          }
        }
      }
      return targetComponent;
    }
    module.exports = hoistNonReactStatics;
  }
});

// node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "node_modules/react-fast-compare/index.js"(exports, module) {
    init_react();
    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
    function equal(a, b2) {
      if (a === b2)
        return true;
      if (a && b2 && typeof a == "object" && typeof b2 == "object") {
        if (a.constructor !== b2.constructor)
          return false;
        var length2, i, keys;
        if (Array.isArray(a)) {
          length2 = a.length;
          if (length2 != b2.length)
            return false;
          for (i = length2; i-- !== 0; )
            if (!equal(a[i], b2[i]))
              return false;
          return true;
        }
        var it;
        if (hasMap && a instanceof Map && b2 instanceof Map) {
          if (a.size !== b2.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b2.has(i.value[0]))
              return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!equal(i.value[1], b2.get(i.value[0])))
              return false;
          return true;
        }
        if (hasSet && a instanceof Set && b2 instanceof Set) {
          if (a.size !== b2.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b2.has(i.value[0]))
              return false;
          return true;
        }
        if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b2)) {
          length2 = a.length;
          if (length2 != b2.length)
            return false;
          for (i = length2; i-- !== 0; )
            if (a[i] !== b2[i])
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b2.source && a.flags === b2.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b2.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b2.toString();
        keys = Object.keys(a);
        length2 = keys.length;
        if (length2 !== Object.keys(b2).length)
          return false;
        for (i = length2; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b2, keys[i]))
            return false;
        if (hasElementType && a instanceof Element)
          return false;
        for (i = length2; i-- !== 0; ) {
          if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
            continue;
          }
          if (!equal(a[keys[i]], b2[keys[i]]))
            return false;
        }
        return true;
      }
      return a !== a && b2 !== b2;
    }
    module.exports = function isEqual2(a, b2) {
      try {
        return equal(a, b2);
      } catch (error) {
        if ((error.message || "").match(/stack|recursion/i)) {
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        throw error;
      }
    };
  }
});

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/MantineProvider.js
init_react();
var import_react5 = __toESM(require_react());

// node_modules/@emotion/react/dist/emotion-react.browser.esm.js
init_react();
var React3 = __toESM(require_react());
var import_react2 = __toESM(require_react());

// node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
init_react();

// node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js
init_react();
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? false : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (true) {
      var isImportRule3 = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
      if (isImportRule3 && this._alreadyInsertedOrderInsensitiveRule) {
        console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule3;
    }
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e4) {
        if (!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(rule)) {
          console.error('There was a problem inserting the following rule: "' + rule + '"', e4);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
    if (true) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };
  return StyleSheet2;
}();

// node_modules/stylis/src/Enum.js
init_react();
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";

// node_modules/stylis/src/Utility.js
init_react();
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3);
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end2) {
  return value.slice(begin, end2);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}

// node_modules/stylis/src/Parser.js
init_react();

// node_modules/stylis/src/Tokenizer.js
init_react();
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end2) {
  return substr(characters, begin, end2);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}

// node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset2 = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference2 = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && characters2.charCodeAt(length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset2:
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference2 = ruleset(characters2, root, parent, index, offset2, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset2 === 0)
                parse(characters2, root, reference2, reference2, props, rulesets, length2, points, children);
              else
                switch (atrule) {
                  case 100:
                  case 109:
                  case 115:
                    parse(value, reference2, reference2, rule && append(ruleset(value, reference2, reference2, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference2, reference2, reference2, [""], children, 0, points, children);
                }
        }
        index = offset2 = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset2 > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset2 = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset2, rules, points, type, props, children, length2) {
  var post = offset2 - 1;
  var rule = offset2 === 0 ? rules : [""];
  var size2 = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j = points[i])), z2 = value; x2 < size2; ++x2)
      if (z2 = trim(j > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
        props[k++] = z2;
  return node(value, root, parent, offset2 === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}

// node_modules/stylis/src/Prefixer.js
init_react();
function prefix(value, length2) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
        }
      break;
    case 4949:
      if (charat(value, length2 + 1) !== 115)
        break;
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}

// node_modules/stylis/src/Serializer.js
init_react();
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}

// node_modules/stylis/src/Middleware.js
init_react();
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function prefixer(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length);
          break;
        case KEYFRAMES:
          return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element.length)
            return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] })], callback);
                case "::placeholder":
                  return serialize([
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] })
                  ], callback);
              }
              return "";
            });
      }
  }
}

// node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js
init_react();

// node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js
init_react();
function memoize(fn2) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0)
      cache[arg] = fn2(arg);
    return cache[arg];
  };
}
var emotion_memoize_browser_esm_default = memoize;

// node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var last = function last2(arr) {
  return arr.length ? arr[arr.length - 1] : null;
};
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek();
    if (previous === 38 && character2 === 12) {
      points[index] = 1;
    }
    if (token(character2)) {
      break;
    }
    next();
  }
  return slice(begin, position);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;
      case 2:
        parsed[index] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index] = peek() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      default:
        parsed[index] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || element.length < 1) {
    return;
  }
  var value = element.value, parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent)
      return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
      element["return"] = "";
      element.value = "";
    }
  }
};
var ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
var isIgnoringComment = function isIgnoringComment2(element) {
  return !!element && element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
};
var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache) {
  return function(element, index, children) {
    if (element.type !== "rule")
      return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
    if (unsafePseudoClasses && cache.compat !== true) {
      var prevElement = index > 0 ? children[index - 1] : null;
      if (prevElement && isIgnoringComment(last(prevElement.children))) {
        return;
      }
      unsafePseudoClasses.forEach(function(unsafePseudoClass) {
        console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
      });
    }
  };
};
var isImportRule = function isImportRule2(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};
var isPrependedWithRegularRules = function isPrependedWithRegularRules2(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }
  return false;
};
var nullifyElement = function nullifyElement2(element) {
  element.type = "";
  element.value = "";
  element["return"] = "";
  element.children = "";
  element.props = "";
};
var incorrectImportAlarm = function incorrectImportAlarm2(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }
  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (!key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
  }
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  if (true) {
    if (/[^a-z-]/.test(key)) {
      throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
    }
  }
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + key + ' "]'), function(node2) {
      var attrib = node2.getAttribute("data-emotion").split(" ");
      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }
      nodesToHydrate.push(node2);
    });
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  if (true) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }
    }), incorrectImportAlarm);
  }
  {
    var currentSheet;
    var finalizingPlugins = [stringify, true ? function(element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== COMMENT) {
          currentSheet.insert(element.value + "{}");
        }
      }
    } : rulesheet(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles2) {
      return serialize(compile(styles2), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      if (serialized.map !== void 0) {
        currentSheet = {
          insert: function insert2(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};
var emotion_cache_browser_esm_default = createCache;

// node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js
init_react();
var React2 = __toESM(require_react());
var import_react = __toESM(require_react());
init_extends();

// node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
init_react();
var isBrowser = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles2(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;
  if ((isStringTag === false || isBrowser === false) && cache.registered[className] === void 0) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;
  if (cache.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};

// node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js
init_react();

// node_modules/@emotion/hash/dist/hash.browser.esm.js
init_react();
function murmur2(str) {
  var h2 = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= k >>> 24;
    h2 = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h2 ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h2 ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h2 ^= str.charCodeAt(i) & 255;
      h2 = (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  h2 ^= h2 >>> 13;
  h2 = (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
}
var hash_browser_esm_default = murmur2;

// node_modules/@emotion/unitless/dist/unitless.browser.esm.js
init_react();
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var unitless_browser_esm_default = unitlessKeys;

// node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js
var ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ emotion_memoize_browser_esm_default(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitless_browser_esm_default[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
if (true) {
  contentValuePattern = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  contentValues = ["normal", "none", "initial", "inherit", "unset"];
  oldProcessStyleValue = processStyleValue;
  msPattern = /^-ms-/;
  hyphenPattern = /-(.)/g;
  hyphenatedCache = {};
  processStyleValue = function processStyleValue3(key, value) {
    if (key === "content") {
      if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }
    var processed = oldProcessStyleValue(key, value);
    if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }
    return processed;
  };
}
var contentValuePattern;
var contentValues;
var oldProcessStyleValue;
var msPattern;
var hyphenPattern;
var hyphenatedCache;
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    if (interpolation.toString() === "NO_COMPONENT_SELECTOR") {
      throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
    }
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next2 = interpolation.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles2 = interpolation.styles + ";";
        if (interpolation.map !== void 0) {
          styles2 += interpolation.map;
        }
        return styles2;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      } else if (true) {
        console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      }
      break;
    }
    case "string":
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function(match2, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
          return "${" + fakeVarName + "}";
        });
        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
        }
      }
      break;
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && true) {
          throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              if (_key === "undefined") {
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
              }
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;
if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
}
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles2 = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles2 += handleInterpolation(mergedProps, registered, strings);
  } else {
    if (strings[0] === void 0) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }
    styles2 += strings[0];
  }
  for (var i = 1; i < args.length; i++) {
    styles2 += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      if (strings[i] === void 0) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles2 += strings[i];
    }
  }
  var sourceMap;
  if (true) {
    styles2 = styles2.replace(sourceMapPattern, function(match3) {
      sourceMap = match3;
      return "";
    });
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles2)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = hash_browser_esm_default(styles2) + identifierName;
  if (true) {
    return {
      name,
      styles: styles2,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }
  return {
    name,
    styles: styles2,
    next: cursor
  };
};

// node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js
var hasOwnProperty = {}.hasOwnProperty;
var EmotionCacheContext = /* @__PURE__ */ (0, import_react.createContext)(typeof HTMLElement !== "undefined" ? /* @__PURE__ */ emotion_cache_browser_esm_default({
  key: "css"
}) : null);
if (true) {
  EmotionCacheContext.displayName = "EmotionCacheContext";
}
var CacheProvider = EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ (0, import_react.forwardRef)(function(props, ref) {
    var cache = (0, import_react.useContext)(EmotionCacheContext);
    return func(props, cache, ref);
  });
};
var ThemeContext = /* @__PURE__ */ (0, import_react.createContext)({});
if (true) {
  ThemeContext.displayName = "EmotionThemeContext";
}
var useInsertionEffect2 = React2["useInsertionEffect"] ? React2["useInsertionEffect"] : function useInsertionEffect3(create) {
  create();
};
function useInsertionEffectMaybe(create) {
  useInsertionEffect2(create);
}
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__";
var Insertion = function Insertion2(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  var rules = useInsertionEffectMaybe(function() {
    return insertStyles(cache, serialized, isStringTag);
  });
  return null;
};
var Emotion = /* @__PURE__ */ withEmotionCache(function(props, cache, ref) {
  var cssProp = props.css;
  if (typeof cssProp === "string" && cache.registered[cssProp] !== void 0) {
    cssProp = cache.registered[cssProp];
  }
  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = "";
  if (typeof props.className === "string") {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }
  var serialized = serializeStyles(registeredStyles, void 0, (0, import_react.useContext)(ThemeContext));
  if (serialized.name.indexOf("-") === -1) {
    var labelFromStack = props[labelPropName];
    if (labelFromStack) {
      serialized = serializeStyles([serialized, "label:" + labelFromStack + ";"]);
    }
  }
  className += cache.key + "-" + serialized.name;
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== "css" && key !== typePropName && key !== labelPropName) {
      newProps[key] = props[key];
    }
  }
  newProps.ref = ref;
  newProps.className = className;
  return /* @__PURE__ */ (0, import_react.createElement)(import_react.Fragment, null, /* @__PURE__ */ (0, import_react.createElement)(Insertion, {
    cache,
    serialized,
    isStringTag: typeof WrappedComponent === "string"
  }), /* @__PURE__ */ (0, import_react.createElement)(WrappedComponent, newProps));
});
if (true) {
  Emotion.displayName = "EmotionCssPropInternal";
}

// node_modules/@emotion/react/dist/emotion-react.browser.esm.js
init_extends();
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
var pkg = {
  name: "@emotion/react",
  version: "11.8.1",
  main: "dist/emotion-react.cjs.js",
  module: "dist/emotion-react.esm.js",
  browser: {
    "./dist/emotion-react.cjs.js": "./dist/emotion-react.browser.cjs.js",
    "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
  },
  types: "types/index.d.ts",
  files: [
    "src",
    "dist",
    "jsx-runtime",
    "jsx-dev-runtime",
    "_isolated-hnrs",
    "types/*.d.ts",
    "macro.js",
    "macro.d.ts",
    "macro.js.flow"
  ],
  sideEffects: false,
  author: "Emotion Contributors",
  license: "MIT",
  scripts: {
    "test:typescript": "dtslint types"
  },
  dependencies: {
    "@babel/runtime": "^7.13.10",
    "@emotion/babel-plugin": "^11.7.1",
    "@emotion/cache": "^11.7.1",
    "@emotion/serialize": "^1.0.2",
    "@emotion/sheet": "^1.1.0",
    "@emotion/utils": "^1.1.0",
    "@emotion/weak-memoize": "^0.2.5",
    "hoist-non-react-statics": "^3.3.1"
  },
  peerDependencies: {
    "@babel/core": "^7.0.0",
    react: ">=16.8.0"
  },
  peerDependenciesMeta: {
    "@babel/core": {
      optional: true
    },
    "@types/react": {
      optional: true
    }
  },
  devDependencies: {
    "@babel/core": "^7.13.10",
    "@emotion/css": "11.7.1",
    "@emotion/css-prettifier": "1.0.1",
    "@emotion/server": "11.4.0",
    "@emotion/styled": "11.8.1",
    "@types/react": "^16.9.11",
    dtslint: "^0.3.0",
    "html-tag-names": "^1.1.2",
    react: "16.14.0",
    "svg-tag-names": "^1.1.1"
  },
  repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
  publishConfig: {
    access: "public"
  },
  "umd:main": "dist/emotion-react.umd.min.js",
  preconstruct: {
    entrypoints: [
      "./index.js",
      "./jsx-runtime.js",
      "./jsx-dev-runtime.js",
      "./_isolated-hnrs.js"
    ],
    umdName: "emotionReact"
  }
};
var useInsertionEffect5 = React3["useInsertionEffect"] ? React3["useInsertionEffect"] : import_react2.useLayoutEffect;
var warnedAboutCssPropForGlobal = false;
var Global = /* @__PURE__ */ withEmotionCache(function(props, cache) {
  if (!warnedAboutCssPropForGlobal && (props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }
  var styles2 = props.styles;
  var serialized = serializeStyles([styles2], void 0, (0, import_react2.useContext)(ThemeContext));
  var sheetRef = (0, import_react2.useRef)();
  useInsertionEffect5(function() {
    var key = cache.key + "-global";
    var sheet = new StyleSheet({
      key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false;
    var node2 = document.querySelector('style[data-emotion="' + key + " " + serialized.name + '"]');
    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }
    if (node2 !== null) {
      rehydrating = true;
      node2.setAttribute("data-emotion", key);
      sheet.hydrate([node2]);
    }
    sheetRef.current = [sheet, rehydrating];
    return function() {
      sheet.flush();
    };
  }, [cache]);
  useInsertionEffect5(function() {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }
    if (serialized.next !== void 0) {
      insertStyles(cache, serialized.next, true);
    }
    if (sheet.tags.length) {
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }
    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});
if (true) {
  Global.displayName = "EmotionGlobal";
}
var classnames = function classnames2(args) {
  var len = args.length;
  var i = 0;
  var cls = "";
  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null)
      continue;
    var toAdd = void 0;
    switch (typeof arg) {
      case "boolean":
        break;
      case "object": {
        if (Array.isArray(arg)) {
          toAdd = classnames2(arg);
        } else {
          if (arg.styles !== void 0 && arg.name !== void 0) {
            console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.");
          }
          toAdd = "";
          for (var k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += " ");
              toAdd += k;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      cls && (cls += " ");
      cls += toAdd;
    }
  }
  return cls;
};
function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css(registeredStyles);
}
var Insertion3 = function Insertion4(_ref) {
  var cache = _ref.cache, serializedArr = _ref.serializedArr;
  var rules = useInsertionEffectMaybe(function() {
    for (var i = 0; i < serializedArr.length; i++) {
      var res = insertStyles(cache, serializedArr[i], false);
    }
  });
  return null;
};
var ClassNames = /* @__PURE__ */ withEmotionCache(function(props, cache) {
  var hasRendered = false;
  var serializedArr = [];
  var css = function css2() {
    if (hasRendered && true) {
      throw new Error("css can only be used during render");
    }
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var serialized = serializeStyles(args, cache.registered);
    serializedArr.push(serialized);
    registerStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };
  var cx = function cx2() {
    if (hasRendered && true) {
      throw new Error("cx can only be used during render");
    }
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return merge(cache.registered, css, classnames(args));
  };
  var content = {
    css,
    cx,
    theme: (0, import_react2.useContext)(ThemeContext)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /* @__PURE__ */ (0, import_react2.createElement)(import_react2.Fragment, null, /* @__PURE__ */ (0, import_react2.createElement)(Insertion3, {
    cache,
    serializedArr
  }), ele);
});
if (true) {
  ClassNames.displayName = "EmotionClassNames";
}
if (true) {
  isBrowser2 = true;
  isJest = typeof jest !== "undefined";
  if (isBrowser2 && !isJest) {
    globalContext = typeof globalThis !== "undefined" ? globalThis : isBrowser2 ? window : globalThis;
    globalKey = "__EMOTION_REACT_" + pkg.version.split(".")[0] + "__";
    if (globalContext[globalKey]) {
      console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.");
    }
    globalContext[globalKey] = true;
  }
}
var isBrowser2;
var isJest;
var globalContext;
var globalKey;

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/default-theme.js
init_react();

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/default-colors.js
init_react();
var DEFAULT_COLORS = {
  dark: [
    "#C1C2C5",
    "#A6A7AB",
    "#909296",
    "#5c5f66",
    "#373A40",
    "#2C2E33",
    "#25262b",
    "#1A1B1E",
    "#141517",
    "#101113"
  ],
  gray: [
    "#f8f9fa",
    "#f1f3f5",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#868e96",
    "#495057",
    "#343a40",
    "#212529"
  ],
  red: [
    "#fff5f5",
    "#ffe3e3",
    "#ffc9c9",
    "#ffa8a8",
    "#ff8787",
    "#ff6b6b",
    "#fa5252",
    "#f03e3e",
    "#e03131",
    "#c92a2a"
  ],
  pink: [
    "#fff0f6",
    "#ffdeeb",
    "#fcc2d7",
    "#faa2c1",
    "#f783ac",
    "#f06595",
    "#e64980",
    "#d6336c",
    "#c2255c",
    "#a61e4d"
  ],
  grape: [
    "#f8f0fc",
    "#f3d9fa",
    "#eebefa",
    "#e599f7",
    "#da77f2",
    "#cc5de8",
    "#be4bdb",
    "#ae3ec9",
    "#9c36b5",
    "#862e9c"
  ],
  violet: [
    "#f3f0ff",
    "#e5dbff",
    "#d0bfff",
    "#b197fc",
    "#9775fa",
    "#845ef7",
    "#7950f2",
    "#7048e8",
    "#6741d9",
    "#5f3dc4"
  ],
  indigo: [
    "#edf2ff",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#5c7cfa",
    "#4c6ef5",
    "#4263eb",
    "#3b5bdb",
    "#364fc7"
  ],
  blue: [
    "#e7f5ff",
    "#d0ebff",
    "#a5d8ff",
    "#74c0fc",
    "#4dabf7",
    "#339af0",
    "#228be6",
    "#1c7ed6",
    "#1971c2",
    "#1864ab"
  ],
  cyan: [
    "#e3fafc",
    "#c5f6fa",
    "#99e9f2",
    "#66d9e8",
    "#3bc9db",
    "#22b8cf",
    "#15aabf",
    "#1098ad",
    "#0c8599",
    "#0b7285"
  ],
  teal: [
    "#e6fcf5",
    "#c3fae8",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#20c997",
    "#12b886",
    "#0ca678",
    "#099268",
    "#087f5b"
  ],
  green: [
    "#ebfbee",
    "#d3f9d8",
    "#b2f2bb",
    "#8ce99a",
    "#69db7c",
    "#51cf66",
    "#40c057",
    "#37b24d",
    "#2f9e44",
    "#2b8a3e"
  ],
  lime: [
    "#f4fce3",
    "#e9fac8",
    "#d8f5a2",
    "#c0eb75",
    "#a9e34b",
    "#94d82d",
    "#82c91e",
    "#74b816",
    "#66a80f",
    "#5c940d"
  ],
  yellow: [
    "#fff9db",
    "#fff3bf",
    "#ffec99",
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005",
    "#f59f00",
    "#f08c00",
    "#e67700"
  ],
  orange: [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffc078",
    "#ffa94d",
    "#ff922b",
    "#fd7e14",
    "#f76707",
    "#e8590c",
    "#d9480f"
  ]
};

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/attach-functions.js
init_react();

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/index.js
init_react();

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/font-styles/font-styles.js
init_react();
function fontStyles(theme) {
  return () => ({
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    fontFamily: theme.fontFamily || "sans-serif"
  });
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/focus-styles/focus-styles.js
init_react();
function focusStyles(theme) {
  return () => ({
    WebkitTapHighlightColor: "transparent",
    "&:focus": {
      outline: "none",
      boxShadow: theme.focusRing === "always" || theme.focusRing === "auto" ? `0 0 0 2px ${theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white}, 0 0 0 4px ${theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 7 : 5]}` : void 0
    },
    "&:focus:not(:focus-visible)": {
      boxShadow: theme.focusRing === "auto" || theme.focusRing === "never" ? "none" : void 0
    }
  });
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/theme-color/theme-color.js
init_react();
function themeColor(theme) {
  return (color, shade, primaryFallback = true) => {
    const primaryShades = theme.colors[theme.primaryColor];
    return color in theme.colors ? theme.colors[color][shade] : primaryFallback ? primaryShades[shade] : color;
  };
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/gradient/gradient.js
init_react();

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/gradient/get-gradient-color-stops/get-gradient-color-stops.js
init_react();
function getGradientColorStops(colors) {
  let stops = "";
  for (let i = 1; i < colors.length - 1; i += 1) {
    stops += `${colors[i]} ${i / (colors.length - 1) * 100}%, `;
  }
  return `${colors[0]} 0%, ${stops}${colors[colors.length - 1]} 100%`;
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/gradient/gradient.js
function linearGradient(deg, ...colors) {
  return `linear-gradient(${deg}deg, ${getGradientColorStops(colors)})`;
}
function radialGradient(...colors) {
  return `radial-gradient(circle, ${getGradientColorStops(colors)})`;
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/breakpoints/breakpoints.js
init_react();

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/size/size.js
init_react();
function size(props) {
  if (typeof props.size === "number") {
    return props.size;
  }
  return props.sizes[props.size] || props.size || props.sizes.md;
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/breakpoints/breakpoints.js
function largerThan(theme) {
  return (breakpoint) => `@media (min-width: ${size({ size: breakpoint, sizes: theme.breakpoints }) + 1}px)`;
}
function smallerThan(theme) {
  return (breakpoint) => `@media (max-width: ${size({ size: breakpoint, sizes: theme.breakpoints })}px)`;
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/rgba/rgba.js
init_react();

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/utils/to-rgba/to-rgba.js
init_react();
function isHexColor(hex) {
  const replaced = hex.replace("#", "");
  return typeof replaced === "string" && replaced.length === 6 && !Number.isNaN(Number(`0x${replaced}`));
}
function hexToRgba(color) {
  const replaced = color.replace("#", "");
  const parsed = parseInt(replaced, 16);
  const r3 = parsed >> 16 & 255;
  const g2 = parsed >> 8 & 255;
  const b2 = parsed & 255;
  return {
    r: r3,
    g: g2,
    b: b2,
    a: 1
  };
}
function rgbStringToRgba(color) {
  const [r3, g2, b2, a] = color.replace(/[^0-9,.]/g, "").split(",").map(Number);
  return { r: r3, g: g2, b: b2, a: a || 1 };
}
function toRgba(color) {
  if (isHexColor(color)) {
    return hexToRgba(color);
  }
  if (color.startsWith("rgb")) {
    return rgbStringToRgba(color);
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/rgba/rgba.js
function rgba(color, alpha) {
  if (typeof color !== "string" || alpha > 1 || alpha < 0) {
    return "rgba(0, 0, 0, 1)";
  }
  const { r: r3, g: g2, b: b2 } = toRgba(color);
  return `rgba(${r3}, ${g2}, ${b2}, ${alpha})`;
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/cover/cover.js
init_react();
function cover(offset2 = 0) {
  return {
    position: "absolute",
    top: offset2,
    right: offset2,
    left: offset2,
    bottom: offset2
  };
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/darken/darken.js
init_react();
function darken(color, alpha) {
  const { r: r3, g: g2, b: b2, a } = toRgba(color);
  const f2 = 1 - alpha;
  const dark = (input) => Math.round(input * f2);
  return `rgba(${dark(r3)}, ${dark(g2)}, ${dark(b2)}, ${a})`;
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/lighten/lighten.js
init_react();
function lighten(color, alpha) {
  const { r: r3, g: g2, b: b2, a } = toRgba(color);
  const light = (input) => Math.round(input + (255 - input) * alpha);
  return `rgba(${light(r3)}, ${light(g2)}, ${light(b2)}, ${a})`;
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/radius/radius.js
init_react();
function radius(theme) {
  return (size2) => {
    if (typeof size2 === "number") {
      return size2;
    }
    const defaultRadius = typeof theme.defaultRadius === "number" ? theme.defaultRadius : theme.radius[theme.defaultRadius] || theme.defaultRadius;
    return theme.radius[size2] || size2 || defaultRadius;
  };
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/fns/index.js
var fns = {
  fontStyles,
  themeColor,
  focusStyles,
  linearGradient,
  radialGradient,
  smallerThan,
  largerThan,
  rgba,
  size,
  cover,
  darken,
  lighten,
  radius
};

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/functions/attach-functions.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));
function attachFunctions(themeBase) {
  return __spreadProps(__spreadValues({}, themeBase), {
    fn: {
      fontStyles: fns.fontStyles(themeBase),
      themeColor: fns.themeColor(themeBase),
      focusStyles: fns.focusStyles(themeBase),
      largerThan: fns.largerThan(themeBase),
      smallerThan: fns.smallerThan(themeBase),
      radialGradient: fns.radialGradient,
      linearGradient: fns.linearGradient,
      rgba: fns.rgba,
      size: fns.size,
      cover: fns.cover,
      lighten: fns.lighten,
      darken: fns.darken,
      radius: fns.radius(themeBase)
    }
  });
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/default-theme.js
var MANTINE_COLORS = Object.keys(DEFAULT_COLORS);
var _DEFAULT_THEME = {
  dir: "ltr",
  focusRing: "auto",
  loader: "oval",
  dateFormat: "MMMM D, YYYY",
  colorScheme: "light",
  white: "#fff",
  black: "#000",
  defaultRadius: "sm",
  transitionTimingFunction: "ease",
  colors: DEFAULT_COLORS,
  lineHeight: 1.55,
  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  primaryColor: "blue",
  shadows: {
    xs: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px",
    md: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
    lg: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px",
    xl: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px"
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  },
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32
  },
  spacing: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24
  },
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400
  },
  headings: {
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
    fontWeight: 700,
    sizes: {
      h1: { fontSize: 34, lineHeight: 1.3 },
      h2: { fontSize: 26, lineHeight: 1.35 },
      h3: { fontSize: 22, lineHeight: 1.4 },
      h4: { fontSize: 18, lineHeight: 1.45 },
      h5: { fontSize: 16, lineHeight: 1.5 },
      h6: { fontSize: 14, lineHeight: 1.5 }
    }
  },
  other: {},
  datesLocale: "en"
};
var DEFAULT_THEME = attachFunctions(_DEFAULT_THEME);

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/utils/merge-theme/merge-theme.js
init_react();
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp2.call(b2, prop))
      __defNormalProp2(a, prop, b2[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b2)) {
      if (__propIsEnum2.call(b2, prop))
        __defNormalProp2(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b2) => __defProps2(a, __getOwnPropDescs2(b2));
function mergeTheme(currentTheme, themeOverride) {
  if (!themeOverride) {
    return currentTheme;
  }
  return Object.keys(currentTheme).reduce((acc, key) => {
    if (key === "headings" && themeOverride.headings) {
      const sizes7 = themeOverride.headings.sizes ? Object.keys(currentTheme.headings.sizes).reduce((headingsAcc, h2) => {
        headingsAcc[h2] = __spreadValues2(__spreadValues2({}, currentTheme.headings.sizes[h2]), themeOverride.headings.sizes[h2]);
        return headingsAcc;
      }, {}) : currentTheme.headings.sizes;
      return __spreadProps2(__spreadValues2({}, acc), {
        headings: __spreadProps2(__spreadValues2(__spreadValues2({}, currentTheme.headings), themeOverride.headings), {
          sizes: sizes7
        })
      });
    }
    acc[key] = typeof themeOverride[key] === "object" ? __spreadValues2(__spreadValues2({}, currentTheme[key]), themeOverride[key]) : typeof themeOverride[key] === "number" ? themeOverride[key] : themeOverride[key] || currentTheme[key];
    return acc;
  }, {});
}
function mergeThemeWithFunctions(currentTheme, themeOverride) {
  return attachFunctions(mergeTheme(currentTheme, themeOverride));
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/NormalizeCSS.js
init_react();
var import_react3 = __toESM(require_react());
var styles = {
  html: {
    fontFamily: "sans-serif",
    lineHeight: "1.15",
    textSizeAdjust: "100%"
  },
  body: {
    margin: 0
  },
  "article, aside, footer, header, nav, section, figcaption, figure, main": {
    display: "block"
  },
  h1: {
    fontSize: "2em"
  },
  hr: {
    boxSizing: "content-box",
    height: 0,
    overflow: "visible"
  },
  pre: {
    fontFamily: "monospace, monospace",
    fontSize: "1em"
  },
  a: {
    background: "transparent",
    textDecorationSkip: "objects"
  },
  "a:active, a:hover": {
    outlineWidth: 0
  },
  "abbr[title]": {
    borderBottom: "none",
    textDecoration: "underline"
  },
  "b, strong": {
    fontWeight: "bolder"
  },
  "code, kbp, samp": {
    fontFamily: "monospace, monospace",
    fontSize: "1em"
  },
  dfn: {
    fontStyle: "italic"
  },
  mark: {
    backgroundColor: "#ff0",
    color: "#000"
  },
  small: {
    fontSize: "80%"
  },
  "sub, sup": {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline"
  },
  sup: {
    top: "-0.5em"
  },
  sub: {
    bottom: "-0.25em"
  },
  "audio, video": {
    display: "inline-block"
  },
  "audio:not([controls])": {
    display: "none",
    height: 0
  },
  img: {
    borderStyle: "none",
    verticalAlign: "middle"
  },
  "svg:not(:root)": {
    overflow: "hidden"
  },
  "button, input, optgroup, select, textarea": {
    fontFamily: "sans-serif",
    fontSize: "100%",
    lineHeight: "1.15",
    margin: 0
  },
  "button, input": {
    overflow: "visible"
  },
  "button, select": {
    textTransform: "none"
  },
  "button, [type=reset], [type=submit]": {
    WebkitAppearance: "button"
  },
  "button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner": {
    borderStyle: "none",
    padding: 0
  },
  "button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring": {
    outline: "1px dotted ButtonText"
  },
  legend: {
    boxSizing: "border-box",
    color: "inherit",
    display: "table",
    maxWidth: "100%",
    padding: 0,
    whiteSpace: "normal"
  },
  progress: {
    display: "inline-block",
    verticalAlign: "baseline"
  },
  textarea: {
    overflow: "auto"
  },
  "[type=checkbox], [type=radio]": {
    boxSizing: "border-box",
    padding: 0
  },
  "[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button": {
    height: "auto"
  },
  "[type=search]": {
    appearance: "textfield",
    outlineOffset: "-2px"
  },
  "[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration": {
    appearance: "none"
  },
  "::-webkit-file-upload-button": {
    appearance: "button",
    font: "inherit"
  },
  "details, menu": {
    display: "block"
  },
  summary: {
    display: "list-item"
  },
  canvas: {
    display: "inline-block"
  },
  template: {
    display: "none"
  },
  "[hidden]": {
    display: "none"
  }
};
function NormalizeCSS() {
  return /* @__PURE__ */ import_react3.default.createElement(Global, {
    styles
  });
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/MantineProvider.js
var __defProp3 = Object.defineProperty;
var __defProps3 = Object.defineProperties;
var __getOwnPropDescs3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues3 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp3.call(b2, prop))
      __defNormalProp3(a, prop, b2[prop]);
  if (__getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(b2)) {
      if (__propIsEnum3.call(b2, prop))
        __defNormalProp3(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps3 = (a, b2) => __defProps3(a, __getOwnPropDescs3(b2));
var MantineProviderContext = (0, import_react5.createContext)({
  theme: DEFAULT_THEME,
  styles: {},
  emotionOptions: { key: "mantine", prepend: true },
  defaultProps: {}
});
function useMantineTheme() {
  var _a;
  return ((_a = (0, import_react5.useContext)(MantineProviderContext)) == null ? void 0 : _a.theme) || DEFAULT_THEME;
}
function useMantineThemeStyles() {
  var _a;
  return ((_a = (0, import_react5.useContext)(MantineProviderContext)) == null ? void 0 : _a.styles) || {};
}
function useMantineEmotionOptions() {
  var _a;
  return ((_a = (0, import_react5.useContext)(MantineProviderContext)) == null ? void 0 : _a.emotionOptions) || { key: "mantine", prepend: true };
}
function useMantineDefaultProps(component, defaultProps23, props) {
  var _a, _b;
  const contextProps = ((_b = (_a = (0, import_react5.useContext)(MantineProviderContext)) == null ? void 0 : _a.defaultProps) == null ? void 0 : _b[component]) || {};
  return __spreadValues3(__spreadValues3(__spreadValues3({}, defaultProps23), contextProps), props);
}
function GlobalStyles() {
  const theme = useMantineTheme();
  return /* @__PURE__ */ import_react5.default.createElement(Global, {
    styles: {
      "*, *::before, *::after": {
        boxSizing: "border-box"
      },
      body: __spreadProps3(__spreadValues3({}, theme.fn.fontStyles()), {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        lineHeight: theme.lineHeight,
        fontSize: theme.fontSizes.md
      })
    }
  });
}
function MantineProvider({
  theme,
  styles: styles2 = {},
  defaultProps: defaultProps23 = {},
  emotionOptions,
  withNormalizeCSS = false,
  withGlobalStyles = false,
  inherit = false,
  children
}) {
  const ctx = (0, import_react5.useContext)(MantineProviderContext);
  const overrides = {
    themeOverride: inherit ? __spreadValues3(__spreadValues3({}, ctx.theme), theme) : theme,
    emotionOptions: inherit ? __spreadValues3(__spreadValues3({}, ctx.emotionOptions), emotionOptions) : emotionOptions,
    styles: inherit ? __spreadValues3(__spreadValues3({}, ctx.styles), styles2) : styles2,
    defaultProps: inherit ? __spreadValues3(__spreadValues3({}, ctx.defaultProps), defaultProps23) : defaultProps23
  };
  return /* @__PURE__ */ import_react5.default.createElement(MantineProviderContext.Provider, {
    value: {
      theme: mergeThemeWithFunctions(DEFAULT_THEME, overrides.themeOverride),
      styles: overrides.styles,
      emotionOptions: overrides.emotionOptions,
      defaultProps: overrides.defaultProps
    }
  }, withNormalizeCSS && /* @__PURE__ */ import_react5.default.createElement(NormalizeCSS, null), withGlobalStyles && /* @__PURE__ */ import_react5.default.createElement(GlobalStyles, null), children);
}
MantineProvider.displayName = "@mantine/core/MantineProvider";

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/index.js
init_react();

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/utils/get-default-z-index/get-default-z-index.js
init_react();
var elevations = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400
};
function getDefaultZIndex(level) {
  return elevations[level];
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/utils/get-shared-color-scheme/get-shared-color-scheme.js
init_react();
var DEFAULT_GRADIENT = {
  from: "indigo",
  to: "cyan",
  deg: 45
};
function getSharedColorScheme({ color, theme, variant, gradient }) {
  if (variant === "light") {
    return {
      border: "transparent",
      background: theme.fn.rgba(theme.fn.themeColor(color, theme.colorScheme === "dark" ? 8 : 0), theme.colorScheme === "dark" ? 0.35 : 1),
      color: color === "dark" ? theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[9] : theme.fn.themeColor(color, theme.colorScheme === "dark" ? 2 : 6),
      hover: theme.fn.rgba(theme.fn.themeColor(color, theme.colorScheme === "dark" ? 7 : 1), theme.colorScheme === "dark" ? 0.45 : 0.65)
    };
  }
  if (variant === "default") {
    return {
      border: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4],
      background: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      hover: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[0]
    };
  }
  if (variant === "white") {
    return {
      border: "transparent",
      background: theme.white,
      color: theme.fn.themeColor(color, 6),
      hover: null
    };
  }
  if (variant === "outline") {
    return {
      border: theme.fn.rgba(theme.fn.themeColor(color, theme.colorScheme === "dark" ? 4 : 7), 0.75),
      background: "transparent",
      color: theme.fn.themeColor(color, theme.colorScheme === "dark" ? 4 : 7),
      hover: theme.colorScheme === "dark" ? theme.fn.rgba(theme.fn.themeColor(color, 4), 0.05) : theme.fn.rgba(theme.fn.themeColor(color, 0), 0.35)
    };
  }
  if (variant === "gradient") {
    const merged = {
      from: (gradient == null ? void 0 : gradient.from) || DEFAULT_GRADIENT.from,
      to: (gradient == null ? void 0 : gradient.to) || DEFAULT_GRADIENT.to,
      deg: (gradient == null ? void 0 : gradient.deg) || DEFAULT_GRADIENT.deg
    };
    return {
      background: `linear-gradient(${merged.deg}deg, ${theme.fn.themeColor(merged.from, 6)} 0%, ${theme.fn.themeColor(merged.to, 6)} 100%)`,
      color: theme.white,
      border: "transparent",
      hover: null
    };
  }
  if (variant === "subtle") {
    return {
      border: "transparent",
      background: "transparent",
      color: color === "dark" ? theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[9] : theme.fn.themeColor(color, theme.colorScheme === "dark" ? 2 : 6),
      hover: theme.fn.rgba(theme.fn.themeColor(color, theme.colorScheme === "dark" ? 8 : 0), theme.colorScheme === "dark" ? 0.35 : 1)
    };
  }
  return {
    border: "transparent",
    background: theme.fn.themeColor(color, theme.colorScheme === "dark" ? 8 : 6),
    color: theme.white,
    hover: theme.fn.themeColor(color, 7)
  };
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/theme/utils/extract-system-styles/extract-system-styles.js
init_react();
var __getOwnPropSymbols4 = Object.getOwnPropertySymbols;
var __hasOwnProp4 = Object.prototype.hasOwnProperty;
var __propIsEnum4 = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp4.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols4)
    for (var prop of __getOwnPropSymbols4(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum4.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function extractSystemStyles(others) {
  const _a = others, { m: m2, mx, my, mt, mb, ml, mr, p: p2, px, py, pt, pb, pl, pr } = _a, rest = __objRest(_a, ["m", "mx", "my", "mt", "mb", "ml", "mr", "p", "px", "py", "pt", "pb", "pl", "pr"]);
  const systemStyles = { m: m2, mx, my, mt, mb, ml, mr, p: p2, px, py, pt, pb, pl, pr };
  Object.keys(systemStyles).forEach((key) => {
    if (systemStyles[key] === void 0) {
      delete systemStyles[key];
    }
  });
  return { systemStyles, rest };
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/tss/create-styles.js
init_react();

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/tss/utils/from-entries/from-entries.js
init_react();
function fromEntries(entries) {
  const o4 = {};
  Object.keys(entries).forEach((key) => {
    const [k, v2] = entries[key];
    o4[k] = v2;
  });
  return o4;
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/tss/use-css.js
init_react();

// node_modules/clsx/dist/clsx.m.js
init_react();
function toVal(mix) {
  var k, y2, str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if (y2 = toVal(mix[k])) {
            str && (str += " ");
            str += y2;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += " ");
          str += k;
        }
      }
    }
  }
  return str;
}
function clsx_m_default() {
  var i = 0, tmp, x2, str = "";
  while (i < arguments.length) {
    if (tmp = arguments[i++]) {
      if (x2 = toVal(tmp)) {
        str && (str += " ");
        str += x2;
      }
    }
  }
  return str;
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/tss/utils/use-guaranteed-memo/use-guaranteed-memo.js
init_react();
var import_react7 = __toESM(require_react());
function useGuaranteedMemo(fn2, deps) {
  const ref = (0, import_react7.useRef)();
  if (!ref.current || deps.length !== ref.current.prevDeps.length || ref.current.prevDeps.map((v2, i) => v2 === deps[i]).indexOf(false) >= 0) {
    ref.current = {
      v: fn2(),
      prevDeps: [...deps]
    };
  }
  return ref.current.v;
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/tss/use-emotion-cache.js
init_react();
var defaultCacheOptions = {
  key: "mantine",
  prepend: true
};
var { getCache } = (() => {
  let cache;
  let _key = defaultCacheOptions.key;
  function _getCache(options) {
    if (cache === void 0 || _key !== (options == null ? void 0 : options.key)) {
      _key = (options == null ? void 0 : options.key) || "mantine";
      cache = emotion_cache_browser_esm_default(options || defaultCacheOptions);
    }
    return cache;
  }
  return { getCache: _getCache };
})();
function useEmotionCache() {
  const options = useMantineEmotionOptions();
  return getCache(options);
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/tss/use-css.js
var __defProp4 = Object.defineProperty;
var __getOwnPropSymbols5 = Object.getOwnPropertySymbols;
var __hasOwnProp5 = Object.prototype.hasOwnProperty;
var __propIsEnum5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp4 = (obj, key, value) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues4 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp5.call(b2, prop))
      __defNormalProp4(a, prop, b2[prop]);
  if (__getOwnPropSymbols5)
    for (var prop of __getOwnPropSymbols5(b2)) {
      if (__propIsEnum5.call(b2, prop))
        __defNormalProp4(a, prop, b2[prop]);
    }
  return a;
};
var refPropertyName = "ref";
function getRef(args) {
  let ref;
  if (args.length !== 1) {
    return { args, ref };
  }
  const [arg] = args;
  if (!(arg instanceof Object)) {
    return { args, ref };
  }
  if (!(refPropertyName in arg)) {
    return { args, ref };
  }
  ref = arg[refPropertyName];
  const argCopy = __spreadValues4({}, arg);
  delete argCopy[refPropertyName];
  return { args: [argCopy], ref };
}
var { cssFactory } = (() => {
  function merge2(registered, css, className) {
    const registeredStyles = [];
    const rawClassName = getRegisteredStyles(registered, registeredStyles, className);
    if (registeredStyles.length < 2) {
      return className;
    }
    return rawClassName + css(registeredStyles);
  }
  function _cssFactory(params) {
    const { cache } = params;
    const css = (...styles2) => {
      const { ref, args } = getRef(styles2);
      const serialized = serializeStyles(args, cache.registered);
      insertStyles(cache, serialized, false);
      return `${cache.key}-${serialized.name}${ref === void 0 ? "" : ` ${ref}`}`;
    };
    const cx = (...args) => merge2(cache.registered, css, clsx_m_default(args));
    return { css, cx };
  }
  return { cssFactory: _cssFactory };
})();
function useCss() {
  const cache = useEmotionCache();
  return useGuaranteedMemo(() => cssFactory({ cache }), [cache]);
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/tss/utils/merge-class-names/merge-class-names.js
init_react();
function mergeClassNames(cx, classes, classNames, name) {
  return Object.keys(classes).reduce((acc, className) => {
    acc[className] = cx(classes[className], classNames != null && classNames[className], name ? `mantine-${name}-${className}` : null);
    return acc;
  }, {});
}

// node_modules/@mantine/core/node_modules/@mantine/styles/esm/tss/create-styles.js
function createStyles(getCssObjectOrCssObject) {
  const getCssObject = typeof getCssObjectOrCssObject === "function" ? getCssObjectOrCssObject : () => getCssObjectOrCssObject;
  function useStyles24(params, options) {
    const theme = useMantineTheme();
    const themeStyles = useMantineThemeStyles()[options == null ? void 0 : options.name];
    const { css, cx } = useCss();
    function createRef(refName) {
      return `__mantine-ref-${refName || ""}`;
    }
    const cssObject = getCssObject(theme, params, createRef);
    const _styles = typeof (options == null ? void 0 : options.styles) === "function" ? options == null ? void 0 : options.styles(theme) : (options == null ? void 0 : options.styles) || {};
    const _themeStyles = typeof themeStyles === "function" ? themeStyles(theme, params || {}) : themeStyles || {};
    const classes = fromEntries(Object.keys(cssObject).map((key) => {
      const mergedStyles = cx(css(cssObject[key]), css(_themeStyles[key]), css(_styles[key]));
      return [key, mergedStyles];
    }));
    return { classes: mergeClassNames(cx, classes, options == null ? void 0 : options.classNames, options == null ? void 0 : options.name), cx, theme };
  }
  return useStyles24;
}

// node_modules/@mantine/core/esm/components/AppShell/Header/Header.js
init_react();
var import_react9 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/AppShell/Header/Header.styles.js
init_react();
var __defProp5 = Object.defineProperty;
var __defProps4 = Object.defineProperties;
var __getOwnPropDescs4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols6 = Object.getOwnPropertySymbols;
var __hasOwnProp6 = Object.prototype.hasOwnProperty;
var __propIsEnum6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp5 = (obj, key, value) => key in obj ? __defProp5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues5 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp6.call(b2, prop))
      __defNormalProp5(a, prop, b2[prop]);
  if (__getOwnPropSymbols6)
    for (var prop of __getOwnPropSymbols6(b2)) {
      if (__propIsEnum6.call(b2, prop))
        __defNormalProp5(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps4 = (a, b2) => __defProps4(a, __getOwnPropDescs4(b2));
var useStyles = createStyles((theme, { height, fixed, position: position2, zIndex }) => ({
  root: __spreadProps4(__spreadValues5(__spreadValues5({}, theme.fn.fontStyles()), position2), {
    zIndex,
    height,
    maxHeight: height,
    position: fixed ? "fixed" : "static",
    boxSizing: "border-box",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`
  })
}));
var Header_styles_default = useStyles;

// node_modules/@mantine/core/esm/components/Box/Box.js
init_react();
var import_react8 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Box/use-sx/use-sx.js
init_react();

// node_modules/@mantine/core/esm/components/Box/use-sx/get-system-styles/get-system-styles.js
init_react();
var SYSTEM_PROPS = {
  mt: "marginTop",
  mb: "marginBottom",
  ml: "marginLeft",
  mr: "marginRight",
  pt: "paddingTop",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight"
};
var NEGATIVE_VALUES = ["-xs", "-sm", "-md", "-lg", "-xl"];
function isValidSizeValue(margin) {
  return typeof margin === "string" || typeof margin === "number";
}
function getSizeValue(margin, theme) {
  if (NEGATIVE_VALUES.includes(margin)) {
    return theme.fn.size({ size: margin.replace("-", ""), sizes: theme.spacing }) * -1;
  }
  return theme.fn.size({ size: margin, sizes: theme.spacing });
}
function getSystemStyles(systemStyles, theme) {
  const styles2 = {};
  if (isValidSizeValue(systemStyles.p)) {
    const value = getSizeValue(systemStyles.p, theme);
    styles2.padding = value;
  }
  if (isValidSizeValue(systemStyles.m)) {
    const value = getSizeValue(systemStyles.m, theme);
    styles2.margin = value;
  }
  if (isValidSizeValue(systemStyles.py)) {
    const value = getSizeValue(systemStyles.py, theme);
    styles2.paddingTop = value;
    styles2.paddingBottom = value;
  }
  if (isValidSizeValue(systemStyles.px)) {
    const value = getSizeValue(systemStyles.px, theme);
    styles2.paddingLeft = value;
    styles2.paddingRight = value;
  }
  if (isValidSizeValue(systemStyles.my)) {
    const value = getSizeValue(systemStyles.my, theme);
    styles2.marginTop = value;
    styles2.marginBottom = value;
  }
  if (isValidSizeValue(systemStyles.mx)) {
    const value = getSizeValue(systemStyles.mx, theme);
    styles2.marginLeft = value;
    styles2.marginRight = value;
  }
  Object.keys(SYSTEM_PROPS).forEach((property) => {
    if (isValidSizeValue(systemStyles[property])) {
      styles2[SYSTEM_PROPS[property]] = theme.fn.size({
        size: getSizeValue(systemStyles[property], theme),
        sizes: theme.spacing
      });
    }
  });
  return styles2;
}

// node_modules/@mantine/core/esm/components/Box/use-sx/use-sx.js
function extractSx(sx, theme) {
  return typeof sx === "function" ? sx(theme) : sx;
}
function useSx(sx, systemProps, className) {
  const theme = useMantineTheme();
  const { css, cx } = useCss();
  if (Array.isArray(sx)) {
    return cx(className, css(getSystemStyles(systemProps, theme)), sx.map((partial) => css(extractSx(partial, theme))));
  }
  return cx(className, css(extractSx(sx, theme)), css(getSystemStyles(systemProps, theme)));
}

// node_modules/@mantine/core/esm/components/Box/Box.js
var __defProp6 = Object.defineProperty;
var __getOwnPropSymbols7 = Object.getOwnPropertySymbols;
var __hasOwnProp7 = Object.prototype.hasOwnProperty;
var __propIsEnum7 = Object.prototype.propertyIsEnumerable;
var __defNormalProp6 = (obj, key, value) => key in obj ? __defProp6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues6 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp7.call(b2, prop))
      __defNormalProp6(a, prop, b2[prop]);
  if (__getOwnPropSymbols7)
    for (var prop of __getOwnPropSymbols7(b2)) {
      if (__propIsEnum7.call(b2, prop))
        __defNormalProp6(a, prop, b2[prop]);
    }
  return a;
};
var __objRest2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp7.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols7)
    for (var prop of __getOwnPropSymbols7(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum7.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var Box = (0, import_react8.forwardRef)((_a, ref) => {
  var _b = _a, { className, component, style, sx } = _b, others = __objRest2(_b, ["className", "component", "style", "sx"]);
  const { systemStyles, rest } = extractSystemStyles(others);
  const Element2 = component || "div";
  return /* @__PURE__ */ import_react8.default.createElement(Element2, __spreadValues6({
    ref,
    className: useSx(sx, systemStyles, className),
    style
  }, rest));
});
Box.displayName = "@mantine/core/Box";

// node_modules/@mantine/core/esm/components/AppShell/Header/Header.js
var __defProp7 = Object.defineProperty;
var __getOwnPropSymbols8 = Object.getOwnPropertySymbols;
var __hasOwnProp8 = Object.prototype.hasOwnProperty;
var __propIsEnum8 = Object.prototype.propertyIsEnumerable;
var __defNormalProp7 = (obj, key, value) => key in obj ? __defProp7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues7 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp8.call(b2, prop))
      __defNormalProp7(a, prop, b2[prop]);
  if (__getOwnPropSymbols8)
    for (var prop of __getOwnPropSymbols8(b2)) {
      if (__propIsEnum8.call(b2, prop))
        __defNormalProp7(a, prop, b2[prop]);
    }
  return a;
};
var __objRest3 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp8.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols8)
    for (var prop of __getOwnPropSymbols8(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum8.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps = {
  fixed: false,
  position: { top: 0, left: 0, right: 0 },
  zIndex: getDefaultZIndex("app")
};
var Header = (0, import_react9.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Header", defaultProps, props), { children, className, classNames, styles: styles2, height, fixed, position: position2, zIndex } = _a, others = __objRest3(_a, ["children", "className", "classNames", "styles", "height", "fixed", "position", "zIndex"]);
  const { classes, cx } = Header_styles_default({ height, fixed, position: position2, zIndex }, { name: "Header", classNames, styles: styles2 });
  return /* @__PURE__ */ import_react9.default.createElement(Box, __spreadValues7({
    component: "nav",
    className: cx(classes.root, className),
    ref
  }, others), children);
});
Header.displayName = "@mantine/core/Header";

// node_modules/@mantine/core/esm/components/AppShell/AppShell.js
init_react();
var import_react10 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/AppShell/AppShell.styles.js
init_react();
var __defProp8 = Object.defineProperty;
var __getOwnPropSymbols9 = Object.getOwnPropertySymbols;
var __hasOwnProp9 = Object.prototype.hasOwnProperty;
var __propIsEnum9 = Object.prototype.propertyIsEnumerable;
var __defNormalProp8 = (obj, key, value) => key in obj ? __defProp8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues8 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp9.call(b2, prop))
      __defNormalProp8(a, prop, b2[prop]);
  if (__getOwnPropSymbols9)
    for (var prop of __getOwnPropSymbols9(b2)) {
      if (__propIsEnum9.call(b2, prop))
        __defNormalProp8(a, prop, b2[prop]);
    }
  return a;
};
function getPositionStyles(props, theme) {
  const padding = theme.fn.size({ size: props.padding, sizes: theme.spacing });
  const offset2 = props.navbarOffsetBreakpoint ? theme.fn.size({ size: props.navbarOffsetBreakpoint, sizes: theme.breakpoints }) : null;
  if (!props.fixed) {
    return { padding };
  }
  const queries = props.navbarBreakpoints.reduce((acc, [breakpoint, breakpointSize]) => {
    acc[`@media (min-width: ${breakpoint + 1}px)`] = {
      paddingLeft: `calc(${breakpointSize}px + ${padding}px)`
    };
    return acc;
  }, {});
  if (offset2) {
    queries[`@media (max-width: ${offset2}px)`] = {
      paddingLeft: padding
    };
  }
  return __spreadValues8({
    minHeight: "100vh",
    paddingTop: `calc(${props.headerHeight} + ${padding}px)`,
    paddingLeft: `calc(${props.navbarWidth} + ${padding}px)`,
    paddingRight: theme.fn.size({ size: padding, sizes: theme.spacing }),
    paddingBottom: theme.fn.size({ size: padding, sizes: theme.spacing })
  }, queries);
}
var useStyles2 = createStyles((theme, props) => ({
  root: {
    boxSizing: "border-box"
  },
  body: {
    display: "flex",
    boxSizing: "border-box"
  },
  main: __spreadValues8({
    flex: 1,
    width: "100vw",
    boxSizing: "border-box"
  }, getPositionStyles(props, theme))
}));
var AppShell_styles_default = useStyles2;

// node_modules/@mantine/core/esm/components/AppShell/utils/get-navbar-breakpoints/get-navbar-breakpoints.js
init_react();

// node_modules/@mantine/core/esm/components/AppShell/utils/get-sorted-breakpoints/get-sorted-breakpoints.js
init_react();
function getSortedBreakpoints(breakpoints, theme) {
  if (!breakpoints) {
    return [];
  }
  const values = Object.keys(breakpoints).filter((breakpoint) => breakpoint !== "base").map((breakpoint) => [
    theme.fn.size({ size: breakpoint, sizes: theme.breakpoints }),
    breakpoints[breakpoint]
  ]);
  values.sort((a, b2) => a[0] - b2[0]);
  return values;
}

// node_modules/@mantine/core/esm/components/AppShell/utils/get-navbar-breakpoints/get-navbar-breakpoints.js
function getNavbarBreakpoints(element, theme) {
  var _a;
  const breakpoints = (_a = element == null ? void 0 : element.props) == null ? void 0 : _a.width;
  return breakpoints != null ? getSortedBreakpoints(breakpoints, theme) : [];
}

// node_modules/@mantine/core/esm/components/AppShell/utils/get-navbar-base-width/get-navbar-base-width.js
init_react();
function getNavbarBaseWidth(element) {
  var _a, _b;
  const width = (_b = (_a = element == null ? void 0 : element.props) == null ? void 0 : _a.width) == null ? void 0 : _b.base;
  return typeof width === "number" ? `${width}px` : typeof width === "string" ? width : "0px";
}

// node_modules/@mantine/core/esm/components/AppShell/utils/get-element-height/get-element-height.js
init_react();
function getElementHeight(element) {
  var _a;
  const height = (_a = element == null ? void 0 : element.props) == null ? void 0 : _a.height;
  return typeof height === "number" ? `${height}px` : typeof height === "string" ? height : "0px";
}

// node_modules/@mantine/core/esm/components/AppShell/AppShell.js
var __defProp9 = Object.defineProperty;
var __getOwnPropSymbols10 = Object.getOwnPropertySymbols;
var __hasOwnProp10 = Object.prototype.hasOwnProperty;
var __propIsEnum10 = Object.prototype.propertyIsEnumerable;
var __defNormalProp9 = (obj, key, value) => key in obj ? __defProp9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues9 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp10.call(b2, prop))
      __defNormalProp9(a, prop, b2[prop]);
  if (__getOwnPropSymbols10)
    for (var prop of __getOwnPropSymbols10(b2)) {
      if (__propIsEnum10.call(b2, prop))
        __defNormalProp9(a, prop, b2[prop]);
    }
  return a;
};
var __objRest4 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp10.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols10)
    for (var prop of __getOwnPropSymbols10(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum10.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps2 = {
  fixed: false,
  zIndex: getDefaultZIndex("app"),
  padding: "md"
};
var AppShell = (0, import_react10.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("AppShell", defaultProps2, props), {
    children,
    navbar,
    header,
    fixed = false,
    zIndex = getDefaultZIndex("app"),
    padding = "md",
    navbarOffsetBreakpoint,
    className,
    styles: styles2,
    classNames
  } = _a, others = __objRest4(_a, [
    "children",
    "navbar",
    "header",
    "fixed",
    "zIndex",
    "padding",
    "navbarOffsetBreakpoint",
    "className",
    "styles",
    "classNames"
  ]);
  const theme = useMantineTheme();
  const navbarBreakpoints = getNavbarBreakpoints(navbar, theme);
  const navbarWidth = getNavbarBaseWidth(navbar);
  const headerHeight = getElementHeight(header);
  const navbarHeight = getElementHeight(navbar);
  const { classes, cx } = AppShell_styles_default({
    padding,
    fixed,
    navbarWidth,
    headerHeight,
    navbarBreakpoints,
    navbarOffsetBreakpoint
  }, { styles: styles2, classNames, name: "AppShell" });
  const _header = header ? import_react10.default.cloneElement(header, { fixed, zIndex }) : null;
  const _navbar = navbar ? import_react10.default.cloneElement(navbar, {
    fixed,
    zIndex,
    height: navbarHeight !== "0px" ? navbarHeight : `calc(100vh - ${headerHeight})`,
    position: { top: headerHeight, left: 0 }
  }) : null;
  return /* @__PURE__ */ import_react10.default.createElement(Box, __spreadValues9({
    className: cx(classes.root, className),
    ref
  }, others), _header, /* @__PURE__ */ import_react10.default.createElement("div", {
    className: classes.body
  }, _navbar, /* @__PURE__ */ import_react10.default.createElement("main", {
    className: classes.main
  }, children)));
});
AppShell.displayName = "@mantine/core/AppShell";

// node_modules/@mantine/core/esm/components/Button/Button.js
init_react();
var import_react15 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Button/Button.styles.js
init_react();

// node_modules/@mantine/core/esm/components/Input/Input.styles.js
init_react();
var __defProp10 = Object.defineProperty;
var __defProps5 = Object.defineProperties;
var __getOwnPropDescs5 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols11 = Object.getOwnPropertySymbols;
var __hasOwnProp11 = Object.prototype.hasOwnProperty;
var __propIsEnum11 = Object.prototype.propertyIsEnumerable;
var __defNormalProp10 = (obj, key, value) => key in obj ? __defProp10(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues10 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp11.call(b2, prop))
      __defNormalProp10(a, prop, b2[prop]);
  if (__getOwnPropSymbols11)
    for (var prop of __getOwnPropSymbols11(b2)) {
      if (__propIsEnum11.call(b2, prop))
        __defNormalProp10(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps5 = (a, b2) => __defProps5(a, __getOwnPropDescs5(b2));
var sizes = {
  xs: 30,
  sm: 36,
  md: 42,
  lg: 50,
  xl: 60
};
var useStyles3 = createStyles((theme, {
  size: size2,
  multiline,
  radius: radius2,
  variant,
  invalid,
  rightSectionWidth,
  withRightSection,
  iconWidth
}) => {
  const invalidColor = theme.colors.red[theme.colorScheme === "dark" ? 6 : 7];
  const sizeStyles = variant === "default" || variant === "filled" ? {
    minHeight: theme.fn.size({ size: size2, sizes }),
    paddingLeft: theme.fn.size({ size: size2, sizes }) / 3,
    paddingRight: withRightSection ? rightSectionWidth : theme.fn.size({ size: size2, sizes }) / 3,
    borderRadius: theme.fn.radius(radius2)
  } : null;
  return {
    wrapper: {
      position: "relative"
    },
    input: variant === "headless" ? {} : __spreadProps5(__spreadValues10(__spreadProps5(__spreadValues10({}, theme.fn.fontStyles()), {
      height: multiline ? variant === "unstyled" ? void 0 : "auto" : theme.fn.size({ size: size2, sizes }),
      WebkitTapHighlightColor: "transparent",
      lineHeight: multiline ? theme.lineHeight : `${theme.fn.size({ size: size2, sizes }) - 2}px`,
      appearance: "none",
      resize: "none",
      boxSizing: "border-box",
      fontSize: theme.fn.size({ size: size2, sizes: theme.fontSizes }),
      width: "100%",
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      display: "block",
      textAlign: "left"
    }), sizeStyles), {
      "&:disabled": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
        color: theme.colors.dark[2],
        opacity: 0.6,
        cursor: "not-allowed",
        "&::placeholder": {
          color: theme.colors.dark[2]
        }
      },
      "&::placeholder": {
        opacity: 1,
        userSelect: "none",
        color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
      },
      "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button, &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration": {
        appearance: "none"
      },
      "&[type=number]": {
        MozAppearance: "textfield"
      }
    }),
    defaultVariant: {
      border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]}`,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      transition: "border-color 100ms ease",
      "&:focus, &:focus-within": {
        outline: "none",
        borderColor: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 8 : 5]
      }
    },
    filledVariant: {
      border: "1px solid transparent",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
      "&:focus, &:focus-within": {
        outline: "none",
        borderColor: `${theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 8 : 5]} !important`
      }
    },
    unstyledVariant: {
      borderWidth: 0,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      backgroundColor: "transparent",
      minHeight: 28,
      outline: 0,
      "&:focus, &:focus-within": {
        outline: "none",
        borderColor: "transparent"
      },
      "&:disabled": {
        backgroundColor: "transparent",
        "&:focus, &:focus-within": {
          outline: "none",
          borderColor: "transparent"
        }
      }
    },
    withIcon: {
      paddingLeft: typeof iconWidth === "number" ? iconWidth : theme.fn.size({ size: size2, sizes })
    },
    invalid: {
      color: invalidColor,
      borderColor: invalidColor,
      "&::placeholder": {
        opacity: 1,
        color: invalidColor
      }
    },
    disabled: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
      color: theme.colors.dark[2],
      opacity: 0.6,
      cursor: "not-allowed",
      "&::placeholder": {
        color: theme.colors.dark[2]
      }
    },
    icon: {
      pointerEvents: "none",
      position: "absolute",
      zIndex: 1,
      left: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: theme.fn.size({ size: size2, sizes }),
      color: invalid ? theme.colors.red[theme.colorScheme === "dark" ? 6 : 7] : theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[5]
    },
    rightSection: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: rightSectionWidth
    }
  };
});
var Input_styles_default = useStyles3;

// node_modules/@mantine/core/esm/components/Button/Button.styles.js
var __defProp11 = Object.defineProperty;
var __defProps6 = Object.defineProperties;
var __getOwnPropDescs6 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols12 = Object.getOwnPropertySymbols;
var __hasOwnProp12 = Object.prototype.hasOwnProperty;
var __propIsEnum12 = Object.prototype.propertyIsEnumerable;
var __defNormalProp11 = (obj, key, value) => key in obj ? __defProp11(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues11 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp12.call(b2, prop))
      __defNormalProp11(a, prop, b2[prop]);
  if (__getOwnPropSymbols12)
    for (var prop of __getOwnPropSymbols12(b2)) {
      if (__propIsEnum12.call(b2, prop))
        __defNormalProp11(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps6 = (a, b2) => __defProps6(a, __getOwnPropDescs6(b2));
var sizes2 = {
  xs: {
    height: sizes.xs,
    padding: "0 14px"
  },
  sm: {
    height: sizes.sm,
    padding: "0 18px"
  },
  md: {
    height: sizes.md,
    padding: "0 22px"
  },
  lg: {
    height: sizes.lg,
    padding: "0 26px"
  },
  xl: {
    height: sizes.xl,
    padding: "0 32px"
  },
  "compact-xs": {
    height: 22,
    padding: "0 7px"
  },
  "compact-sm": {
    height: 26,
    padding: "0 8px"
  },
  "compact-md": {
    height: 30,
    padding: "0 10px"
  },
  "compact-lg": {
    height: 34,
    padding: "0 12px"
  },
  "compact-xl": {
    height: 40,
    padding: "0 14px"
  }
};
var heights = Object.keys(sizes2).reduce((acc, size2) => {
  acc[size2] = sizes2[size2].height;
  return acc;
}, {});
var getSizeStyles = ({ compact, size: size2 }) => {
  if (!compact) {
    return sizes2[size2];
  }
  return sizes2[`compact-${size2}`];
};
var getWidthStyles = (fullWidth) => ({
  display: fullWidth ? "block" : "inline-block",
  width: fullWidth ? "100%" : "auto"
});
function getVariantStyles({ variant, theme, color }) {
  const colors = getSharedColorScheme({
    theme,
    color,
    variant
  });
  return {
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    backgroundImage: colors.background,
    color: colors.color,
    "&:hover": {
      backgroundColor: colors.hover
    }
  };
}
var useStyles4 = createStyles((theme, {
  color,
  size: size2,
  radius: radius2,
  fullWidth,
  compact,
  gradientFrom,
  gradientTo,
  gradientDeg
}, getRef2) => {
  const gradient = getSharedColorScheme({
    theme,
    color,
    variant: "gradient",
    gradient: { from: gradientFrom, to: gradientTo, deg: gradientDeg }
  });
  return {
    loading: {
      ref: getRef2("loading"),
      pointerEvents: "none",
      "&::before": {
        content: '""',
        position: "absolute",
        top: -1,
        left: -1,
        right: -1,
        bottom: -1,
        backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors.dark[7], 0.5) : "rgba(255, 255, 255, .5)",
        borderRadius: theme.fn.radius(radius2),
        cursor: "not-allowed"
      }
    },
    outline: getVariantStyles({ variant: "outline", theme, color }),
    filled: getVariantStyles({ variant: "filled", theme, color }),
    light: getVariantStyles({ variant: "light", theme, color }),
    default: getVariantStyles({ variant: "default", theme, color }),
    white: getVariantStyles({ variant: "white", theme, color }),
    subtle: getVariantStyles({ variant: "subtle", theme, color }),
    gradient: {
      border: 0,
      backgroundImage: gradient.background,
      color: gradient.color,
      "&:hover": {
        backgroundSize: "200%"
      }
    },
    root: __spreadProps6(__spreadValues11(__spreadValues11(__spreadValues11(__spreadValues11({}, getSizeStyles({ compact, size: size2 })), theme.fn.fontStyles()), theme.fn.focusStyles()), getWidthStyles(fullWidth)), {
      borderRadius: theme.fn.radius(radius2),
      fontWeight: 600,
      position: "relative",
      lineHeight: 1,
      fontSize: theme.fn.size({ size: size2, sizes: theme.fontSizes }),
      WebkitTapHighlightColor: "transparent",
      userSelect: "none",
      boxSizing: "border-box",
      textDecoration: "none",
      cursor: "pointer",
      appearance: "none",
      WebkitAppearance: "none",
      "&:not(:disabled):active": {
        transform: "translateY(1px)"
      },
      [`&:not(.${getRef2("loading")}):disabled`]: {
        borderColor: "transparent",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
        color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[5],
        cursor: "not-allowed"
      }
    }),
    icon: {
      display: "flex",
      alignItems: "center"
    },
    leftIcon: {
      marginRight: 10
    },
    rightIcon: {
      marginLeft: 10
    },
    inner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      overflow: "visible"
    },
    label: {
      whiteSpace: "nowrap",
      height: "100%",
      overflow: "hidden",
      display: "flex",
      alignItems: "center"
    }
  };
});
var Button_styles_default = useStyles4;

// node_modules/@mantine/core/esm/components/Loader/Loader.js
init_react();
var import_react14 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Loader/loaders/Bars.js
init_react();
var import_react11 = __toESM(require_react());
var __defProp12 = Object.defineProperty;
var __getOwnPropSymbols13 = Object.getOwnPropertySymbols;
var __hasOwnProp13 = Object.prototype.hasOwnProperty;
var __propIsEnum13 = Object.prototype.propertyIsEnumerable;
var __defNormalProp12 = (obj, key, value) => key in obj ? __defProp12(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues12 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp13.call(b2, prop))
      __defNormalProp12(a, prop, b2[prop]);
  if (__getOwnPropSymbols13)
    for (var prop of __getOwnPropSymbols13(b2)) {
      if (__propIsEnum13.call(b2, prop))
        __defNormalProp12(a, prop, b2[prop]);
    }
  return a;
};
var __objRest5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp13.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols13)
    for (var prop of __getOwnPropSymbols13(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum13.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function Bars(_a) {
  var _b = _a, { size: size2, color } = _b, others = __objRest5(_b, ["size", "color"]);
  return /* @__PURE__ */ import_react11.default.createElement("svg", __spreadValues12({
    viewBox: "0 0 135 140",
    xmlns: "http://www.w3.org/2000/svg",
    fill: color,
    width: `${size2}px`
  }, others), /* @__PURE__ */ import_react11.default.createElement("rect", {
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ import_react11.default.createElement("animate", {
    attributeName: "height",
    begin: "0.5s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ import_react11.default.createElement("animate", {
    attributeName: "y",
    begin: "0.5s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ import_react11.default.createElement("rect", {
    x: "30",
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ import_react11.default.createElement("animate", {
    attributeName: "height",
    begin: "0.25s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ import_react11.default.createElement("animate", {
    attributeName: "y",
    begin: "0.25s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ import_react11.default.createElement("rect", {
    x: "60",
    width: "15",
    height: "140",
    rx: "6"
  }, /* @__PURE__ */ import_react11.default.createElement("animate", {
    attributeName: "height",
    begin: "0s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ import_react11.default.createElement("animate", {
    attributeName: "y",
    begin: "0s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ import_react11.default.createElement("rect", {
    x: "90",
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ import_react11.default.createElement("animate", {
    attributeName: "height",
    begin: "0.25s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ import_react11.default.createElement("animate", {
    attributeName: "y",
    begin: "0.25s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ import_react11.default.createElement("rect", {
    x: "120",
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ import_react11.default.createElement("animate", {
    attributeName: "height",
    begin: "0.5s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ import_react11.default.createElement("animate", {
    attributeName: "y",
    begin: "0.5s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })));
}

// node_modules/@mantine/core/esm/components/Loader/loaders/Oval.js
init_react();
var import_react12 = __toESM(require_react());
var __defProp13 = Object.defineProperty;
var __getOwnPropSymbols14 = Object.getOwnPropertySymbols;
var __hasOwnProp14 = Object.prototype.hasOwnProperty;
var __propIsEnum14 = Object.prototype.propertyIsEnumerable;
var __defNormalProp13 = (obj, key, value) => key in obj ? __defProp13(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues13 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp14.call(b2, prop))
      __defNormalProp13(a, prop, b2[prop]);
  if (__getOwnPropSymbols14)
    for (var prop of __getOwnPropSymbols14(b2)) {
      if (__propIsEnum14.call(b2, prop))
        __defNormalProp13(a, prop, b2[prop]);
    }
  return a;
};
var __objRest6 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp14.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols14)
    for (var prop of __getOwnPropSymbols14(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum14.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function Oval(_a) {
  var _b = _a, { size: size2, color } = _b, others = __objRest6(_b, ["size", "color"]);
  return /* @__PURE__ */ import_react12.default.createElement("svg", __spreadValues13({
    width: `${size2}px`,
    height: `${size2}px`,
    viewBox: "0 0 38 38",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: color
  }, others), /* @__PURE__ */ import_react12.default.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ import_react12.default.createElement("g", {
    transform: "translate(2.5 2.5)",
    strokeWidth: "5"
  }, /* @__PURE__ */ import_react12.default.createElement("circle", {
    strokeOpacity: ".5",
    cx: "16",
    cy: "16",
    r: "16"
  }), /* @__PURE__ */ import_react12.default.createElement("path", {
    d: "M32 16c0-9.94-8.06-16-16-16"
  }, /* @__PURE__ */ import_react12.default.createElement("animateTransform", {
    attributeName: "transform",
    type: "rotate",
    from: "0 16 16",
    to: "360 16 16",
    dur: "1s",
    repeatCount: "indefinite"
  })))));
}

// node_modules/@mantine/core/esm/components/Loader/loaders/Dots.js
init_react();
var import_react13 = __toESM(require_react());
var __defProp14 = Object.defineProperty;
var __getOwnPropSymbols15 = Object.getOwnPropertySymbols;
var __hasOwnProp15 = Object.prototype.hasOwnProperty;
var __propIsEnum15 = Object.prototype.propertyIsEnumerable;
var __defNormalProp14 = (obj, key, value) => key in obj ? __defProp14(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues14 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp15.call(b2, prop))
      __defNormalProp14(a, prop, b2[prop]);
  if (__getOwnPropSymbols15)
    for (var prop of __getOwnPropSymbols15(b2)) {
      if (__propIsEnum15.call(b2, prop))
        __defNormalProp14(a, prop, b2[prop]);
    }
  return a;
};
var __objRest7 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp15.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols15)
    for (var prop of __getOwnPropSymbols15(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum15.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function Dots(_a) {
  var _b = _a, { size: size2, color } = _b, others = __objRest7(_b, ["size", "color"]);
  return /* @__PURE__ */ import_react13.default.createElement("svg", __spreadValues14({
    width: `${size2}px`,
    height: `${size2 / 4}px`,
    viewBox: "0 0 120 30",
    xmlns: "http://www.w3.org/2000/svg",
    fill: color
  }, others), /* @__PURE__ */ import_react13.default.createElement("circle", {
    cx: "15",
    cy: "15",
    r: "15"
  }, /* @__PURE__ */ import_react13.default.createElement("animate", {
    attributeName: "r",
    from: "15",
    to: "15",
    begin: "0s",
    dur: "0.8s",
    values: "15;9;15",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ import_react13.default.createElement("animate", {
    attributeName: "fill-opacity",
    from: "1",
    to: "1",
    begin: "0s",
    dur: "0.8s",
    values: "1;.5;1",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ import_react13.default.createElement("circle", {
    cx: "60",
    cy: "15",
    r: "9",
    fillOpacity: "0.3"
  }, /* @__PURE__ */ import_react13.default.createElement("animate", {
    attributeName: "r",
    from: "9",
    to: "9",
    begin: "0s",
    dur: "0.8s",
    values: "9;15;9",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ import_react13.default.createElement("animate", {
    attributeName: "fill-opacity",
    from: "0.5",
    to: "0.5",
    begin: "0s",
    dur: "0.8s",
    values: ".5;1;.5",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ import_react13.default.createElement("circle", {
    cx: "105",
    cy: "15",
    r: "15"
  }, /* @__PURE__ */ import_react13.default.createElement("animate", {
    attributeName: "r",
    from: "15",
    to: "15",
    begin: "0s",
    dur: "0.8s",
    values: "15;9;15",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ import_react13.default.createElement("animate", {
    attributeName: "fill-opacity",
    from: "1",
    to: "1",
    begin: "0s",
    dur: "0.8s",
    values: "1;.5;1",
    calcMode: "linear",
    repeatCount: "indefinite"
  })));
}

// node_modules/@mantine/core/esm/components/Loader/Loader.js
var __defProp15 = Object.defineProperty;
var __getOwnPropSymbols16 = Object.getOwnPropertySymbols;
var __hasOwnProp16 = Object.prototype.hasOwnProperty;
var __propIsEnum16 = Object.prototype.propertyIsEnumerable;
var __defNormalProp15 = (obj, key, value) => key in obj ? __defProp15(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues15 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp16.call(b2, prop))
      __defNormalProp15(a, prop, b2[prop]);
  if (__getOwnPropSymbols16)
    for (var prop of __getOwnPropSymbols16(b2)) {
      if (__propIsEnum16.call(b2, prop))
        __defNormalProp15(a, prop, b2[prop]);
    }
  return a;
};
var __objRest8 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp16.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols16)
    for (var prop of __getOwnPropSymbols16(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum16.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var LOADERS = {
  bars: Bars,
  oval: Oval,
  dots: Dots
};
var LOADER_SIZES = {
  xs: 18,
  sm: 22,
  md: 36,
  lg: 44,
  xl: 58
};
var defaultProps3 = {
  size: "md"
};
function Loader(props) {
  const _a = useMantineDefaultProps("Loader", defaultProps3, props), {
    size: size2 = "md",
    color,
    variant
  } = _a, others = __objRest8(_a, [
    "size",
    "color",
    "variant"
  ]);
  const theme = useMantineTheme();
  const defaultLoader = variant in LOADERS ? variant : theme.loader;
  const _color = color || theme.primaryColor;
  return /* @__PURE__ */ import_react14.default.createElement(Box, __spreadValues15({
    role: "presentation",
    component: LOADERS[defaultLoader] || LOADERS.bars,
    size: theme.fn.size({ size: size2, sizes: LOADER_SIZES }),
    color: _color in theme.colors ? theme.fn.themeColor(_color, theme.colorScheme === "dark" ? 4 : 6) : color
  }, others));
}
Loader.displayName = "@mantine/core/Loader";

// node_modules/@mantine/core/esm/components/Button/Button.js
var __defProp16 = Object.defineProperty;
var __getOwnPropSymbols17 = Object.getOwnPropertySymbols;
var __hasOwnProp17 = Object.prototype.hasOwnProperty;
var __propIsEnum17 = Object.prototype.propertyIsEnumerable;
var __defNormalProp16 = (obj, key, value) => key in obj ? __defProp16(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues16 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp17.call(b2, prop))
      __defNormalProp16(a, prop, b2[prop]);
  if (__getOwnPropSymbols17)
    for (var prop of __getOwnPropSymbols17(b2)) {
      if (__propIsEnum17.call(b2, prop))
        __defNormalProp16(a, prop, b2[prop]);
    }
  return a;
};
var __objRest9 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp17.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols17)
    for (var prop of __getOwnPropSymbols17(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum17.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps4 = {
  size: "sm",
  type: "button",
  variant: "filled",
  loaderPosition: "left",
  gradient: { from: "blue", to: "cyan", deg: 45 }
};
var Button = (0, import_react15.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Button", defaultProps4, props), {
    className,
    size: size2,
    color,
    type,
    disabled,
    children,
    leftIcon,
    rightIcon,
    fullWidth,
    variant,
    radius: radius2,
    component,
    uppercase,
    compact,
    loading,
    loaderPosition,
    loaderProps,
    gradient,
    classNames,
    styles: styles2
  } = _a, others = __objRest9(_a, [
    "className",
    "size",
    "color",
    "type",
    "disabled",
    "children",
    "leftIcon",
    "rightIcon",
    "fullWidth",
    "variant",
    "radius",
    "component",
    "uppercase",
    "compact",
    "loading",
    "loaderPosition",
    "loaderProps",
    "gradient",
    "classNames",
    "styles"
  ]);
  const { classes, cx, theme } = Button_styles_default({
    radius: radius2,
    color,
    size: size2,
    fullWidth,
    compact,
    gradientFrom: gradient.from,
    gradientTo: gradient.to,
    gradientDeg: gradient.deg
  }, { classNames, styles: styles2, name: "Button" });
  const colors = getSharedColorScheme({ color, theme, variant });
  const loader = /* @__PURE__ */ import_react15.default.createElement(Loader, __spreadValues16({
    color: colors.color,
    size: theme.fn.size({ size: size2, sizes: heights }) / 2
  }, loaderProps));
  return /* @__PURE__ */ import_react15.default.createElement(Box, __spreadValues16({
    component: component || "button",
    className: cx(classes[variant], { [classes.loading]: loading }, classes.root, className),
    type,
    disabled: disabled || loading,
    ref,
    onTouchStart: () => {
    }
  }, others), /* @__PURE__ */ import_react15.default.createElement("div", {
    className: classes.inner
  }, (leftIcon || loading && loaderPosition === "left") && /* @__PURE__ */ import_react15.default.createElement("span", {
    className: cx(classes.icon, classes.leftIcon)
  }, loading && loaderPosition === "left" ? loader : leftIcon), /* @__PURE__ */ import_react15.default.createElement("span", {
    className: classes.label,
    style: { textTransform: uppercase ? "uppercase" : void 0 }
  }, children), (rightIcon || loading && loaderPosition === "right") && /* @__PURE__ */ import_react15.default.createElement("span", {
    className: cx(classes.icon, classes.rightIcon)
  }, loading && loaderPosition === "right" ? loader : rightIcon)));
});
Button.displayName = "@mantine/core/Button";

// node_modules/@mantine/core/esm/components/Card/Card.js
init_react();
var import_react18 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Paper/Paper.js
init_react();
var import_react16 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Paper/Paper.styles.js
init_react();
var __defProp17 = Object.defineProperty;
var __defProps7 = Object.defineProperties;
var __getOwnPropDescs7 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols18 = Object.getOwnPropertySymbols;
var __hasOwnProp18 = Object.prototype.hasOwnProperty;
var __propIsEnum18 = Object.prototype.propertyIsEnumerable;
var __defNormalProp17 = (obj, key, value) => key in obj ? __defProp17(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues17 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp18.call(b2, prop))
      __defNormalProp17(a, prop, b2[prop]);
  if (__getOwnPropSymbols18)
    for (var prop of __getOwnPropSymbols18(b2)) {
      if (__propIsEnum18.call(b2, prop))
        __defNormalProp17(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps7 = (a, b2) => __defProps7(a, __getOwnPropDescs7(b2));
var useStyles5 = createStyles((theme, { radius: radius2, shadow, withBorder }) => ({
  root: __spreadProps7(__spreadValues17({}, theme.fn.focusStyles()), {
    WebkitTapHighlightColor: "transparent",
    display: "block",
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    boxSizing: "border-box",
    borderRadius: theme.fn.radius(radius2),
    boxShadow: theme.shadows[shadow] || shadow || "none",
    border: withBorder ? `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]}` : void 0
  })
}));
var Paper_styles_default = useStyles5;

// node_modules/@mantine/core/esm/components/Paper/Paper.js
var __defProp18 = Object.defineProperty;
var __getOwnPropSymbols19 = Object.getOwnPropertySymbols;
var __hasOwnProp19 = Object.prototype.hasOwnProperty;
var __propIsEnum19 = Object.prototype.propertyIsEnumerable;
var __defNormalProp18 = (obj, key, value) => key in obj ? __defProp18(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues18 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp19.call(b2, prop))
      __defNormalProp18(a, prop, b2[prop]);
  if (__getOwnPropSymbols19)
    for (var prop of __getOwnPropSymbols19(b2)) {
      if (__propIsEnum19.call(b2, prop))
        __defNormalProp18(a, prop, b2[prop]);
    }
  return a;
};
var __objRest10 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp19.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols19)
    for (var prop of __getOwnPropSymbols19(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum19.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps5 = {};
var Paper = (0, import_react16.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Paper", defaultProps5, props), { component, className, children, radius: radius2, withBorder, shadow } = _a, others = __objRest10(_a, ["component", "className", "children", "radius", "withBorder", "shadow"]);
  const { classes, cx } = Paper_styles_default({ radius: radius2, shadow, withBorder }, { name: "Paper" });
  return /* @__PURE__ */ import_react16.default.createElement(Box, __spreadValues18({
    component: component || "div",
    className: cx(classes.root, className),
    ref
  }, others), children);
});
Paper.displayName = "@mantine/core/Paper";

// node_modules/@mantine/core/esm/components/Card/CardSection/CardSection.js
init_react();
var import_react17 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Card/CardSection/CardSection.styles.js
init_react();
var useStyles6 = createStyles((theme, { padding, first, last: last3 }) => ({
  cardSection: {
    display: "block",
    marginLeft: -1 * theme.fn.size({ size: padding, sizes: theme.spacing }),
    marginRight: -1 * theme.fn.size({ size: padding, sizes: theme.spacing }),
    marginTop: first ? -1 * theme.fn.size({ size: padding, sizes: theme.spacing }) : void 0,
    marginBottom: last3 ? -1 * theme.fn.size({ size: padding, sizes: theme.spacing }) : void 0
  }
}));
var CardSection_styles_default = useStyles6;

// node_modules/@mantine/core/esm/components/Card/CardSection/CardSection.js
var __defProp19 = Object.defineProperty;
var __getOwnPropSymbols20 = Object.getOwnPropertySymbols;
var __hasOwnProp20 = Object.prototype.hasOwnProperty;
var __propIsEnum20 = Object.prototype.propertyIsEnumerable;
var __defNormalProp19 = (obj, key, value) => key in obj ? __defProp19(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues19 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp20.call(b2, prop))
      __defNormalProp19(a, prop, b2[prop]);
  if (__getOwnPropSymbols20)
    for (var prop of __getOwnPropSymbols20(b2)) {
      if (__propIsEnum20.call(b2, prop))
        __defNormalProp19(a, prop, b2[prop]);
    }
  return a;
};
var __objRest11 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp20.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols20)
    for (var prop of __getOwnPropSymbols20(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum20.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var CardSection = (0, import_react17.forwardRef)((_a, ref) => {
  var _b = _a, { className, padding = 0, component, first, last: last3 } = _b, others = __objRest11(_b, ["className", "padding", "component", "first", "last"]);
  const { classes, cx } = CardSection_styles_default({ padding, first, last: last3 }, { name: "Card" });
  return /* @__PURE__ */ import_react17.default.createElement(Box, __spreadValues19({
    component: component || "div",
    className: cx(classes.cardSection, className),
    ref
  }, others));
});
CardSection.displayName = "@mantine/core/CardSection";

// node_modules/@mantine/core/esm/components/Card/Card.styles.js
init_react();
var useStyles7 = createStyles((theme) => ({
  root: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white
  }
}));
var Card_styles_default = useStyles7;

// node_modules/@mantine/core/esm/components/Card/Card.js
var __defProp20 = Object.defineProperty;
var __getOwnPropSymbols21 = Object.getOwnPropertySymbols;
var __hasOwnProp21 = Object.prototype.hasOwnProperty;
var __propIsEnum21 = Object.prototype.propertyIsEnumerable;
var __defNormalProp20 = (obj, key, value) => key in obj ? __defProp20(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues20 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp21.call(b2, prop))
      __defNormalProp20(a, prop, b2[prop]);
  if (__getOwnPropSymbols21)
    for (var prop of __getOwnPropSymbols21(b2)) {
      if (__propIsEnum21.call(b2, prop))
        __defNormalProp20(a, prop, b2[prop]);
    }
  return a;
};
var __objRest12 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp21.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols21)
    for (var prop of __getOwnPropSymbols21(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum21.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps6 = {
  p: "md"
};
var Card = (0, import_react18.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Card", defaultProps6, props), { component, className, p: p2, radius: radius2, children, classNames, styles: styles2 } = _a, others = __objRest12(_a, ["component", "className", "p", "radius", "children", "classNames", "styles"]);
  const { classes, cx } = Card_styles_default(null, { name: "Card", classNames, styles: styles2 });
  const _children = import_react18.Children.toArray(children);
  const content = _children.map((child, index) => {
    if (typeof child === "object" && child && "type" in child && child.type === CardSection) {
      return (0, import_react18.cloneElement)(child, {
        padding: p2,
        first: index === 0,
        last: index === _children.length - 1
      });
    }
    return child;
  });
  return /* @__PURE__ */ import_react18.default.createElement(Paper, __spreadValues20({
    className: cx(classes.root, className),
    radius: radius2,
    p: p2,
    component,
    ref
  }, others), content);
});
Card.Section = CardSection;
Card.displayName = "@mantine/core/Card";

// node_modules/@mantine/core/esm/components/Group/Group.js
init_react();
var import_react20 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Group/Group.styles.js
init_react();
var POSITIONS = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
  apart: "space-between"
};
var useStyles8 = createStyles((theme, { spacing, position: position2, noWrap, direction, grow, align, count }) => ({
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: direction,
    alignItems: align || (direction === "row" ? "center" : grow ? "stretch" : position2 === "apart" ? "flex-start" : POSITIONS[position2]),
    flexWrap: noWrap ? "nowrap" : "wrap",
    justifyContent: direction === "row" ? POSITIONS[position2] : void 0,
    gap: theme.fn.size({ size: spacing, sizes: theme.spacing })
  },
  child: {
    boxSizing: "border-box",
    maxWidth: grow && direction === "row" ? `calc(${100 / count}% - ${theme.fn.size({ size: spacing, sizes: theme.spacing }) - theme.fn.size({ size: spacing, sizes: theme.spacing }) / count}px)` : void 0,
    flexGrow: grow ? 1 : 0
  }
}));
var Group_styles_default = useStyles8;

// node_modules/@mantine/core/esm/utils/filter-falsy-children/filter-falsy-children.js
init_react();
var import_react19 = __toESM(require_react());
function filterFalsyChildren(children) {
  return import_react19.Children.toArray(children).filter(Boolean);
}

// node_modules/@mantine/core/esm/components/Group/Group.js
var __defProp21 = Object.defineProperty;
var __getOwnPropSymbols22 = Object.getOwnPropertySymbols;
var __hasOwnProp22 = Object.prototype.hasOwnProperty;
var __propIsEnum22 = Object.prototype.propertyIsEnumerable;
var __defNormalProp21 = (obj, key, value) => key in obj ? __defProp21(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues21 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp22.call(b2, prop))
      __defNormalProp21(a, prop, b2[prop]);
  if (__getOwnPropSymbols22)
    for (var prop of __getOwnPropSymbols22(b2)) {
      if (__propIsEnum22.call(b2, prop))
        __defNormalProp21(a, prop, b2[prop]);
    }
  return a;
};
var __objRest13 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp22.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols22)
    for (var prop of __getOwnPropSymbols22(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum22.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps7 = {
  position: "left",
  spacing: "md",
  direction: "row"
};
var Group = (0, import_react20.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Group", defaultProps7, props), {
    className,
    position: position2,
    align,
    children,
    noWrap,
    grow,
    spacing,
    direction,
    classNames,
    styles: styles2
  } = _a, others = __objRest13(_a, [
    "className",
    "position",
    "align",
    "children",
    "noWrap",
    "grow",
    "spacing",
    "direction",
    "classNames",
    "styles"
  ]);
  const filteredChildren = filterFalsyChildren(children);
  const { classes, cx } = Group_styles_default({
    align,
    grow,
    noWrap,
    spacing,
    position: position2,
    direction,
    count: filteredChildren.length
  }, { classNames, styles: styles2, name: "Group" });
  const items = filteredChildren.map((child) => {
    var _a2;
    if (typeof child === "object" && child !== null && "props" in child) {
      return import_react20.default.cloneElement(child, {
        className: cx(classes.child, (_a2 = child.props) == null ? void 0 : _a2.className)
      });
    }
    return child;
  });
  return /* @__PURE__ */ import_react20.default.createElement(Box, __spreadValues21({
    className: cx(classes.root, className),
    ref
  }, others), items);
});
Group.displayName = "@mantine/core/Group";

// node_modules/@mantine/core/esm/components/Container/Container.js
init_react();
var import_react21 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Container/Container.styles.js
init_react();
var useStyles9 = createStyles((theme, { fluid, size: size2, sizes: sizes7 }) => ({
  root: {
    maxWidth: fluid ? "100%" : theme.fn.size({ size: size2, sizes: sizes7 }),
    marginLeft: "auto",
    marginRight: "auto"
  }
}));
var Container_styles_default = useStyles9;

// node_modules/@mantine/core/esm/components/Container/Container.js
var __defProp22 = Object.defineProperty;
var __getOwnPropSymbols23 = Object.getOwnPropertySymbols;
var __hasOwnProp23 = Object.prototype.hasOwnProperty;
var __propIsEnum23 = Object.prototype.propertyIsEnumerable;
var __defNormalProp22 = (obj, key, value) => key in obj ? __defProp22(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues22 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp23.call(b2, prop))
      __defNormalProp22(a, prop, b2[prop]);
  if (__getOwnPropSymbols23)
    for (var prop of __getOwnPropSymbols23(b2)) {
      if (__propIsEnum23.call(b2, prop))
        __defNormalProp22(a, prop, b2[prop]);
    }
  return a;
};
var __objRest14 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp23.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols23)
    for (var prop of __getOwnPropSymbols23(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum23.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps8 = {
  px: "md",
  sizes: {
    xs: 540,
    sm: 720,
    md: 960,
    lg: 1140,
    xl: 1320
  }
};
var Container = (0, import_react21.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Container", defaultProps8, props), { className, fluid, size: size2, styles: styles2, classNames, sizes: sizes7 } = _a, others = __objRest14(_a, ["className", "fluid", "size", "styles", "classNames", "sizes"]);
  const { classes, cx } = Container_styles_default({ fluid, size: size2, sizes: sizes7 }, { styles: styles2, classNames, name: "Container" });
  return /* @__PURE__ */ import_react21.default.createElement(Box, __spreadValues22({
    className: cx(classes.root, className),
    ref
  }, others));
});
Container.displayName = "@mantine/core/Container";

// node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGrid.js
init_react();
var import_react22 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGrid.styles.js
init_react();

// node_modules/@mantine/core/esm/components/SimpleGrid/get-sorted-breakpoints/get-sorted-breakpoints.js
init_react();
function getSortedBreakpoints2(theme, breakpoints) {
  if (breakpoints.length === 0) {
    return breakpoints;
  }
  const property = "maxWidth" in breakpoints[0] ? "maxWidth" : "minWidth";
  const sorted = [...breakpoints].sort((a, b2) => theme.fn.size({ size: b2[property], sizes: theme.breakpoints }) - theme.fn.size({ size: a[property], sizes: theme.breakpoints }));
  return property === "minWidth" ? sorted.reverse() : sorted;
}

// node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGrid.styles.js
var __defProp23 = Object.defineProperty;
var __getOwnPropSymbols24 = Object.getOwnPropertySymbols;
var __hasOwnProp24 = Object.prototype.hasOwnProperty;
var __propIsEnum24 = Object.prototype.propertyIsEnumerable;
var __defNormalProp23 = (obj, key, value) => key in obj ? __defProp23(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues23 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp24.call(b2, prop))
      __defNormalProp23(a, prop, b2[prop]);
  if (__getOwnPropSymbols24)
    for (var prop of __getOwnPropSymbols24(b2)) {
      if (__propIsEnum24.call(b2, prop))
        __defNormalProp23(a, prop, b2[prop]);
    }
  return a;
};
var useStyles10 = createStyles((theme, { spacing, breakpoints, cols }) => {
  const gridBreakpoints = getSortedBreakpoints2(theme, breakpoints).reduce((acc, breakpoint) => {
    const property = "maxWidth" in breakpoint ? "max-width" : "min-width";
    const breakpointSize = theme.fn.size({
      size: property === "max-width" ? breakpoint.maxWidth : breakpoint.minWidth,
      sizes: theme.breakpoints
    });
    acc[`@media (${property}: ${breakpointSize + (property === "max-width" ? 0 : 1)}px)`] = {
      gridTemplateColumns: `repeat(${breakpoint.cols}, minmax(0, 1fr))`,
      gap: theme.fn.size({
        size: breakpoint.spacing || spacing,
        sizes: theme.spacing
      })
    };
    return acc;
  }, {});
  return {
    root: __spreadValues23({
      boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gap: theme.fn.size({ size: spacing, sizes: theme.spacing })
    }, gridBreakpoints)
  };
});
var SimpleGrid_styles_default = useStyles10;

// node_modules/@mantine/core/esm/components/SimpleGrid/SimpleGrid.js
var __defProp24 = Object.defineProperty;
var __getOwnPropSymbols25 = Object.getOwnPropertySymbols;
var __hasOwnProp25 = Object.prototype.hasOwnProperty;
var __propIsEnum25 = Object.prototype.propertyIsEnumerable;
var __defNormalProp24 = (obj, key, value) => key in obj ? __defProp24(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues24 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp25.call(b2, prop))
      __defNormalProp24(a, prop, b2[prop]);
  if (__getOwnPropSymbols25)
    for (var prop of __getOwnPropSymbols25(b2)) {
      if (__propIsEnum25.call(b2, prop))
        __defNormalProp24(a, prop, b2[prop]);
    }
  return a;
};
var __objRest15 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp25.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols25)
    for (var prop of __getOwnPropSymbols25(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum25.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps9 = {
  breakpoints: [],
  cols: 1,
  spacing: "md"
};
var SimpleGrid = (0, import_react22.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("SimpleGrid", defaultProps9, props), { className, breakpoints, cols, spacing, children, classNames, styles: styles2 } = _a, others = __objRest15(_a, ["className", "breakpoints", "cols", "spacing", "children", "classNames", "styles"]);
  const { classes, cx } = SimpleGrid_styles_default({ breakpoints, cols, spacing }, { classNames, styles: styles2, name: "SimpleGrid" });
  return /* @__PURE__ */ import_react22.default.createElement(Box, __spreadValues24({
    className: cx(classes.root, className),
    ref
  }, others), children);
});
SimpleGrid.displayName = "@mantine/core/SimpleGrid";

// node_modules/@mantine/core/esm/components/Table/Table.js
init_react();
var import_react23 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Table/Table.styles.js
init_react();
var __defProp25 = Object.defineProperty;
var __defProps8 = Object.defineProperties;
var __getOwnPropDescs8 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols26 = Object.getOwnPropertySymbols;
var __hasOwnProp26 = Object.prototype.hasOwnProperty;
var __propIsEnum26 = Object.prototype.propertyIsEnumerable;
var __defNormalProp25 = (obj, key, value) => key in obj ? __defProp25(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues25 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp26.call(b2, prop))
      __defNormalProp25(a, prop, b2[prop]);
  if (__getOwnPropSymbols26)
    for (var prop of __getOwnPropSymbols26(b2)) {
      if (__propIsEnum26.call(b2, prop))
        __defNormalProp25(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps8 = (a, b2) => __defProps8(a, __getOwnPropDescs8(b2));
var useStyles11 = createStyles((theme, { captionSide, horizontalSpacing, verticalSpacing }, getRef2) => {
  const striped = { ref: getRef2("striped") };
  const hover = { ref: getRef2("hover") };
  return {
    striped,
    hover,
    root: __spreadProps8(__spreadValues25({}, theme.fn.fontStyles()), {
      width: "100%",
      borderCollapse: "collapse",
      captionSide,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      lineHeight: theme.lineHeight,
      "& caption": {
        marginTop: captionSide === "top" ? 0 : theme.spacing.xs,
        marginBottom: captionSide === "bottom" ? 0 : theme.spacing.xs,
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6]
      },
      "& thead tr th, & tfoot tr th": {
        textAlign: "left",
        fontWeight: "bold",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: 14,
        padding: `${theme.fn.size({
          size: verticalSpacing,
          sizes: theme.spacing
        })}px ${theme.fn.size({ size: horizontalSpacing, sizes: theme.spacing })}px`
      },
      "& thead tr th": {
        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`
      },
      "& tfoot tr th": {
        borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`
      },
      "& tbody tr td": {
        padding: `${theme.fn.size({
          size: verticalSpacing,
          sizes: theme.spacing
        })}px ${theme.fn.size({ size: horizontalSpacing, sizes: theme.spacing })}px`,
        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        fontSize: 14
      },
      "& tbody tr:last-of-type td": {
        borderBottom: "none"
      },
      [`&.${striped.ref} tbody tr:nth-of-type(odd)`]: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
      },
      [`&.${hover.ref} tbody tr:hover`]: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
      }
    })
  };
});
var Table_styles_default = useStyles11;

// node_modules/@mantine/core/esm/components/Table/Table.js
var __defProp26 = Object.defineProperty;
var __defProps9 = Object.defineProperties;
var __getOwnPropDescs9 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols27 = Object.getOwnPropertySymbols;
var __hasOwnProp27 = Object.prototype.hasOwnProperty;
var __propIsEnum27 = Object.prototype.propertyIsEnumerable;
var __defNormalProp26 = (obj, key, value) => key in obj ? __defProp26(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues26 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp27.call(b2, prop))
      __defNormalProp26(a, prop, b2[prop]);
  if (__getOwnPropSymbols27)
    for (var prop of __getOwnPropSymbols27(b2)) {
      if (__propIsEnum27.call(b2, prop))
        __defNormalProp26(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps9 = (a, b2) => __defProps9(a, __getOwnPropDescs9(b2));
var __objRest16 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp27.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols27)
    for (var prop of __getOwnPropSymbols27(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum27.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps10 = {
  striped: false,
  highlightOnHover: false,
  captionSide: "top",
  horizontalSpacing: "xs",
  verticalSpacing: 7
};
var Table = (0, import_react23.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Table", defaultProps10, props), {
    className,
    children,
    striped,
    highlightOnHover,
    captionSide,
    horizontalSpacing,
    verticalSpacing
  } = _a, others = __objRest16(_a, [
    "className",
    "children",
    "striped",
    "highlightOnHover",
    "captionSide",
    "horizontalSpacing",
    "verticalSpacing"
  ]);
  const { classes, cx } = Table_styles_default({ captionSide, verticalSpacing, horizontalSpacing }, { name: "Table" });
  return /* @__PURE__ */ import_react23.default.createElement(Box, __spreadProps9(__spreadValues26({}, others), {
    component: "table",
    ref,
    className: cx(classes.root, { [classes.striped]: striped, [classes.hover]: highlightOnHover }, className)
  }), children);
});
Table.displayName = "@mantine/core/Table";

// node_modules/@mantine/core/esm/components/Title/Title.js
init_react();
var import_react24 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Title/Title.styles.js
init_react();
var __defProp27 = Object.defineProperty;
var __defProps10 = Object.defineProperties;
var __getOwnPropDescs10 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols28 = Object.getOwnPropertySymbols;
var __hasOwnProp28 = Object.prototype.hasOwnProperty;
var __propIsEnum28 = Object.prototype.propertyIsEnumerable;
var __defNormalProp27 = (obj, key, value) => key in obj ? __defProp27(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues27 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp28.call(b2, prop))
      __defNormalProp27(a, prop, b2[prop]);
  if (__getOwnPropSymbols28)
    for (var prop of __getOwnPropSymbols28(b2)) {
      if (__propIsEnum28.call(b2, prop))
        __defNormalProp27(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps10 = (a, b2) => __defProps10(a, __getOwnPropDescs10(b2));
var useStyles12 = createStyles((theme, { element, align }) => ({
  root: __spreadProps10(__spreadValues27({}, theme.fn.fontStyles()), {
    fontFamily: theme.headings.fontFamily,
    fontWeight: theme.headings.fontWeight,
    fontSize: theme.headings.sizes[element].fontSize,
    lineHeight: theme.headings.sizes[element].lineHeight,
    margin: 0,
    color: "inherit",
    textAlign: align
  })
}));
var Title_styles_default = useStyles12;

// node_modules/@mantine/core/esm/components/Title/Title.js
var __defProp28 = Object.defineProperty;
var __getOwnPropSymbols29 = Object.getOwnPropertySymbols;
var __hasOwnProp29 = Object.prototype.hasOwnProperty;
var __propIsEnum29 = Object.prototype.propertyIsEnumerable;
var __defNormalProp28 = (obj, key, value) => key in obj ? __defProp28(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues28 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp29.call(b2, prop))
      __defNormalProp28(a, prop, b2[prop]);
  if (__getOwnPropSymbols29)
    for (var prop of __getOwnPropSymbols29(b2)) {
      if (__propIsEnum29.call(b2, prop))
        __defNormalProp28(a, prop, b2[prop]);
    }
  return a;
};
var __objRest17 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp29.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols29)
    for (var prop of __getOwnPropSymbols29(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum29.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps11 = {
  order: 1
};
var Title = (0, import_react24.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Title", defaultProps11, props), { className, order: order2, children, align } = _a, others = __objRest17(_a, ["className", "order", "children", "align"]);
  const { classes, cx } = Title_styles_default({ element: `h${order2}`, align }, { name: "Title" });
  if (![1, 2, 3, 4, 5, 6].includes(order2)) {
    return null;
  }
  return /* @__PURE__ */ import_react24.default.createElement(Box, __spreadValues28({
    component: `h${order2}`,
    ref,
    className: cx(classes.root, className)
  }, others), children);
});
Title.displayName = "@mantine/core/Title";

// node_modules/@mantine/core/esm/index.js
init_react();

// node_modules/@mantine/core/esm/components/Transition/transitions.js
init_react();
var __defProp29 = Object.defineProperty;
var __defProps11 = Object.defineProperties;
var __getOwnPropDescs11 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols30 = Object.getOwnPropertySymbols;
var __hasOwnProp30 = Object.prototype.hasOwnProperty;
var __propIsEnum30 = Object.prototype.propertyIsEnumerable;
var __defNormalProp29 = (obj, key, value) => key in obj ? __defProp29(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues29 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp30.call(b2, prop))
      __defNormalProp29(a, prop, b2[prop]);
  if (__getOwnPropSymbols30)
    for (var prop of __getOwnPropSymbols30(b2)) {
      if (__propIsEnum30.call(b2, prop))
        __defNormalProp29(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps11 = (a, b2) => __defProps11(a, __getOwnPropDescs11(b2));
var popIn = {
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: "scale(.9) translateY(10px)" },
  transitionProperty: "transform, opacity"
};
var transitions = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: "opacity"
  },
  scale: {
    in: { opacity: 1, transform: "scale(1)" },
    out: { opacity: 0, transform: "scale(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-y": {
    in: { opacity: 1, transform: "scaleY(1)" },
    out: { opacity: 0, transform: "scaleY(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-x": {
    in: { opacity: 1, transform: "scaleX(1)" },
    out: { opacity: 0, transform: "scaleX(0)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "skew-up": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: "translateY(-20px) skew(-10deg, -5deg)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "skew-down": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: "translateY(20px) skew(-10deg, -5deg)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-left": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: "translateY(20px) rotate(-5deg)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-right": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: "translateY(20px) rotate(5deg)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-100%)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(100%)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "slide-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(100%)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "slide-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-100%)" },
    common: { transformOrigin: "right" },
    transitionProperty: "transform, opacity"
  },
  pop: __spreadProps11(__spreadValues29({}, popIn), {
    common: { transformOrigin: "center center" }
  }),
  "pop-bottom-left": __spreadProps11(__spreadValues29({}, popIn), {
    common: { transformOrigin: "bottom left" }
  }),
  "pop-bottom-right": __spreadProps11(__spreadValues29({}, popIn), {
    common: { transformOrigin: "bottom right" }
  }),
  "pop-top-left": __spreadProps11(__spreadValues29({}, popIn), {
    common: { transformOrigin: "top left" }
  }),
  "pop-top-right": __spreadProps11(__spreadValues29({}, popIn), {
    common: { transformOrigin: "top right" }
  })
};

// node_modules/@mantine/core/esm/utils/group-options/group-options.js
init_react();
function groupOptions({ data }) {
  const sortedData = [];
  const unGroupedData = [];
  const groupedData = data.reduce((acc, item, index) => {
    if (item.group) {
      if (acc[item.group])
        acc[item.group].push(index);
      else
        acc[item.group] = [index];
    } else {
      unGroupedData.push(index);
    }
    return acc;
  }, {});
  Object.keys(groupedData).forEach((groupName) => {
    sortedData.push(...groupedData[groupName].map((index) => data[index]));
  });
  sortedData.push(...unGroupedData.map((itemIndex) => data[itemIndex]));
  return sortedData;
}

// node_modules/@mantine/hooks/esm/index.js
init_react();

// node_modules/@mantine/hooks/esm/use-media-query/use-media-query.js
init_react();
var import_react25 = __toESM(require_react());
function attachMediaListener(query, callback) {
  try {
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
  } catch (e4) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}
function getInitialValue(query) {
  if (typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia(query).matches;
  }
  return false;
}
function useMediaQuery(query) {
  const [matches, setMatches] = (0, import_react25.useState)(getInitialValue(query));
  const queryRef = (0, import_react25.useRef)();
  (0, import_react25.useEffect)(() => {
    if ("matchMedia" in window) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);
      return attachMediaListener(queryRef.current, (event) => setMatches(event.matches));
    }
  }, [query]);
  return matches;
}

// node_modules/@mantine/hooks/esm/use-isomorphic-effect/use-isomorphic-effect.js
init_react();
var import_react26 = __toESM(require_react());
var useIsomorphicEffect = typeof document !== "undefined" ? import_react26.useLayoutEffect : import_react26.useEffect;

// node_modules/@mantine/hooks/esm/use-focus-return/use-focus-return.js
init_react();
var import_react28 = __toESM(require_react());

// node_modules/@mantine/hooks/esm/use-did-update/use-did-update.js
init_react();
var import_react27 = __toESM(require_react());
function useDidUpdate(fn2, dependencies) {
  const mounted = (0, import_react27.useRef)(false);
  (0, import_react27.useEffect)(() => {
    if (mounted.current) {
      fn2();
    } else {
      mounted.current = true;
    }
  }, dependencies);
}

// node_modules/@mantine/hooks/esm/use-focus-return/use-focus-return.js
function useFocusReturn({
  opened,
  transitionDuration,
  shouldReturnFocus = true
}) {
  const lastActiveElement = (0, import_react28.useRef)();
  const returnFocus = () => {
    var _a;
    if (lastActiveElement.current && "focus" in lastActiveElement.current && typeof lastActiveElement.current.focus === "function") {
      (_a = lastActiveElement.current) == null ? void 0 : _a.focus();
    }
  };
  useDidUpdate(() => {
    let timeout = -1;
    const clearFocusTimeout = (event) => {
      if (event.code === "Tab") {
        window.clearTimeout(timeout);
      }
    };
    document.addEventListener("keydown", clearFocusTimeout);
    if (opened) {
      lastActiveElement.current = document.activeElement;
    } else if (shouldReturnFocus) {
      timeout = window.setTimeout(returnFocus, transitionDuration + 10);
    }
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("keydown", clearFocusTimeout);
    };
  }, [opened]);
  return returnFocus;
}

// node_modules/@mantine/hooks/esm/use-focus-trap/use-focus-trap.js
init_react();
var import_react29 = __toESM(require_react());

// node_modules/@mantine/hooks/esm/use-focus-trap/tabbable.js
init_react();
var TABBABLE_NODES = /input|select|textarea|button|object/;
var FOCUS_SELECTOR = "a, input, select, textarea, button, object, [tabindex]";
function hidden(element) {
  if (false) {
    return false;
  }
  return element.style.display === "none";
}
function visible(element) {
  let parentElement = element;
  while (parentElement) {
    if (parentElement === document.body) {
      break;
    }
    if (hidden(parentElement)) {
      return false;
    }
    parentElement = parentElement.parentNode;
  }
  return true;
}
function getElementTabIndex(element) {
  let tabIndex = element.getAttribute("tabindex");
  if (tabIndex === null) {
    tabIndex = void 0;
  }
  return parseInt(tabIndex, 10);
}
function focusable(element) {
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexNotNaN = !Number.isNaN(getElementTabIndex(element));
  const res = TABBABLE_NODES.test(nodeName) && !element.disabled || (element instanceof HTMLAnchorElement ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
  return res && visible(element);
}
function tabbable(element) {
  const tabIndex = getElementTabIndex(element);
  const isTabIndexNaN = Number.isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element);
}
function findTabbableDescendants(element) {
  return Array.from(element.querySelectorAll(FOCUS_SELECTOR)).filter(tabbable);
}

// node_modules/@mantine/hooks/esm/use-focus-trap/scope-tab.js
init_react();
function scopeTab(node2, event) {
  const tabbable2 = findTabbableDescendants(node2);
  if (!tabbable2.length) {
    event.preventDefault();
    return;
  }
  const finalTabbable = tabbable2[event.shiftKey ? 0 : tabbable2.length - 1];
  const leavingFinalTabbable = finalTabbable === document.activeElement || node2 === document.activeElement;
  if (!leavingFinalTabbable) {
    return;
  }
  event.preventDefault();
  const target = tabbable2[event.shiftKey ? tabbable2.length - 1 : 0];
  if (target) {
    target.focus();
  }
}

// node_modules/@mantine/hooks/esm/use-focus-trap/create-aria-hider.js
init_react();
function createAriaHider(containerNode, selector = "body > :not(script)") {
  const rootNodes = Array.from(document.querySelectorAll(selector)).map((node2) => {
    if (node2.contains(containerNode)) {
      return void 0;
    }
    const ariaHidden = node2.getAttribute("aria-hidden");
    if (ariaHidden === null || ariaHidden === "false") {
      node2.setAttribute("aria-hidden", "true");
    }
    return { node: node2, ariaHidden };
  });
  return () => {
    rootNodes.forEach((item) => {
      if (!item) {
        return;
      }
      if (item.ariaHidden === null) {
        item.node.removeAttribute("aria-hidden");
      } else {
        item.node.setAttribute("aria-hidden", item.ariaHidden);
      }
    });
  };
}

// node_modules/@mantine/hooks/esm/use-focus-trap/use-focus-trap.js
function useFocusTrap(active = true) {
  const ref = (0, import_react29.useRef)();
  const restoreAria = (0, import_react29.useRef)(null);
  const setRef = (0, import_react29.useCallback)((node2) => {
    if (!active) {
      return;
    }
    if (restoreAria.current) {
      restoreAria.current();
    }
    if (node2) {
      const processNode = (_node) => {
        restoreAria.current = createAriaHider(_node);
        let focusElement = node2.querySelector("[data-autofocus]");
        if (!focusElement) {
          const children = Array.from(node2.querySelectorAll(FOCUS_SELECTOR));
          focusElement = children.find(tabbable) || children.find(focusable) || null;
          if (!focusElement && focusable(node2))
            focusElement = node2;
        }
        if (focusElement) {
          focusElement.focus();
        } else if (true) {
          console.warn("[@mantine/hooks/use-focus-trap] Failed to find focusable element within provided node", node2);
        }
      };
      setTimeout(() => {
        if (node2.ownerDocument) {
          processNode(node2);
        } else if (true) {
          console.warn("[@mantine/hooks/use-focus-trap] Ref node is not part of the dom", node2);
        }
      });
      ref.current = node2;
    } else {
      ref.current = null;
    }
  }, [active]);
  (0, import_react29.useEffect)(() => {
    if (!active) {
      return void 0;
    }
    const handleKeyDown = (event) => {
      if (event.key === "Tab" && ref.current) {
        scopeTab(ref.current, event);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);
  return setRef;
}

// node_modules/@mantine/hooks/esm/utils/random-id/random-id.js
init_react();
function randomId() {
  return `mantine-${Math.random().toString(36).substr(2, 9)}`;
}

// node_modules/@mantine/hooks/esm/use-window-event/use-window-event.js
init_react();
var import_react30 = __toESM(require_react());
function useWindowEvent(type, listener, options) {
  (0, import_react30.useEffect)(() => {
    window.addEventListener(type, listener, options);
    return () => window.removeEventListener(type, listener, options);
  }, []);
}

// node_modules/@mantine/hooks/esm/use-merged-ref/use-merged-ref.js
init_react();
var import_react31 = __toESM(require_react());

// node_modules/@mantine/hooks/esm/utils/assign-ref/assign-ref.js
init_react();
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
}

// node_modules/@mantine/hooks/esm/use-merged-ref/use-merged-ref.js
function useMergedRef(...refs) {
  return (0, import_react31.useCallback)((node2) => {
    refs.forEach((ref) => assignRef(ref, node2));
  }, refs);
}

// node_modules/@mantine/hooks/esm/use-uncontrolled/use-uncontrolled.js
init_react();
var import_react32 = __toESM(require_react());
function useUncontrolled({
  value,
  defaultValue,
  finalValue,
  rule,
  onChange,
  onValueUpdate
}) {
  const shouldBeControlled = rule(value);
  const modeRef = (0, import_react32.useRef)("initial");
  const initialValue = rule(defaultValue) ? defaultValue : finalValue;
  const [uncontrolledValue, setUncontrolledValue] = (0, import_react32.useState)(initialValue);
  let effectiveValue = shouldBeControlled ? value : uncontrolledValue;
  if (!shouldBeControlled && modeRef.current === "controlled") {
    effectiveValue = finalValue;
  }
  modeRef.current = shouldBeControlled ? "controlled" : "uncontrolled";
  const mode = modeRef.current;
  const handleChange = (nextValue) => {
    typeof onChange === "function" && onChange(nextValue);
    if (mode === "uncontrolled") {
      setUncontrolledValue(nextValue);
    }
  };
  (0, import_react32.useEffect)(() => {
    if (mode === "uncontrolled") {
      setUncontrolledValue(effectiveValue);
    }
    typeof onValueUpdate === "function" && onValueUpdate(effectiveValue);
  }, [mode, effectiveValue]);
  return [effectiveValue, handleChange, modeRef.current];
}

// node_modules/@mantine/hooks/esm/use-reduced-motion/use-reduced-motion.js
init_react();
function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

// node_modules/@mantine/hooks/esm/use-scroll-into-view/use-scroll-into-view.js
init_react();
var import_react33 = __toESM(require_react());

// node_modules/@mantine/hooks/esm/use-scroll-into-view/utils/ease-in-out-quad.js
init_react();
var easeInOutQuad = (t4) => t4 < 0.5 ? 2 * t4 * t4 : -1 + (4 - 2 * t4) * t4;

// node_modules/@mantine/hooks/esm/use-scroll-into-view/utils/get-relative-position.js
init_react();
var getRelativePosition = ({
  axis,
  target,
  parent,
  alignment,
  offset: offset2,
  isList
}) => {
  if (!target || !parent && typeof document === "undefined") {
    return 0;
  }
  const isCustomParent = !!parent;
  const parentElement = parent || document.body;
  const parentPosition = parentElement.getBoundingClientRect();
  const targetPosition = target.getBoundingClientRect();
  const getDiff = (property) => targetPosition[property] - parentPosition[property];
  if (axis === "y") {
    const diff = getDiff("top");
    if (diff === 0)
      return 0;
    if (alignment === "start") {
      const distance = diff - offset2;
      const shouldScroll = distance <= targetPosition.height * (isList ? 0 : 1) || !isList;
      return shouldScroll ? distance : 0;
    }
    const parentHeight = isCustomParent ? parentPosition.height : window.innerHeight;
    if (alignment === "end") {
      const distance = diff + offset2 - parentHeight + targetPosition.height;
      const shouldScroll = distance >= -targetPosition.height * (isList ? 0 : 1) || !isList;
      return shouldScroll ? distance : 0;
    }
    if (alignment === "center") {
      return diff - parentHeight / 2 + targetPosition.height / 2;
    }
    return 0;
  }
  if (axis === "x") {
    const diff = getDiff("left");
    if (diff === 0)
      return 0;
    if (alignment === "start") {
      const distance = diff - offset2;
      const shouldScroll = distance <= targetPosition.width || !isList;
      return shouldScroll ? distance : 0;
    }
    const parentWidth = isCustomParent ? parentPosition.width : window.innerWidth;
    if (alignment === "end") {
      const distance = diff + offset2 - parentWidth + targetPosition.width;
      const shouldScroll = distance >= -targetPosition.width || !isList;
      return shouldScroll ? distance : 0;
    }
    if (alignment === "center") {
      return diff - parentWidth / 2 + targetPosition.width / 2;
    }
    return 0;
  }
  return 0;
};

// node_modules/@mantine/hooks/esm/use-scroll-into-view/utils/get-scroll-start.js
init_react();
var getScrollStart = ({ axis, parent }) => {
  if (!parent && typeof document === "undefined") {
    return 0;
  }
  const method = axis === "y" ? "scrollTop" : "scrollLeft";
  if (parent) {
    return parent[method];
  }
  const { body, documentElement } = document;
  return body[method] + documentElement[method];
};

// node_modules/@mantine/hooks/esm/use-scroll-into-view/utils/set-scroll-param.js
init_react();
var setScrollParam = ({ axis, parent, distance }) => {
  if (!parent && typeof document === "undefined") {
    return;
  }
  const method = axis === "y" ? "scrollTop" : "scrollLeft";
  if (parent) {
    parent[method] = distance;
  } else {
    const { body, documentElement } = document;
    body[method] = distance;
    documentElement[method] = distance;
  }
};

// node_modules/@mantine/hooks/esm/use-scroll-into-view/use-scroll-into-view.js
function useScrollIntoView({
  duration = 1250,
  axis = "y",
  onScrollFinish,
  easing = easeInOutQuad,
  offset: offset2 = 0,
  cancelable = true,
  isList = false
} = {}) {
  const frameID = (0, import_react33.useRef)(0);
  const startTime = (0, import_react33.useRef)(0);
  const shouldStop = (0, import_react33.useRef)(false);
  const scrollableRef = (0, import_react33.useRef)(null);
  const targetRef = (0, import_react33.useRef)(null);
  const reducedMotion = useReducedMotion();
  const cancel = () => {
    if (frameID.current) {
      cancelAnimationFrame(frameID.current);
    }
  };
  const scrollIntoView = (0, import_react33.useCallback)(({ alignment = "start" } = {}) => {
    var _a;
    shouldStop.current = false;
    if (frameID.current) {
      cancel();
    }
    const start2 = (_a = getScrollStart({ parent: scrollableRef.current, axis })) != null ? _a : 0;
    const change = getRelativePosition({
      parent: scrollableRef.current,
      target: targetRef.current,
      axis,
      alignment,
      offset: offset2,
      isList
    }) - (scrollableRef.current ? 0 : start2);
    function animateScroll() {
      if (startTime.current === 0) {
        startTime.current = performance.now();
      }
      const now = performance.now();
      const elapsed = now - startTime.current;
      const t4 = reducedMotion || duration === 0 ? 1 : elapsed / duration;
      const distance = start2 + change * easing(t4);
      setScrollParam({
        parent: scrollableRef.current,
        axis,
        distance
      });
      if (!shouldStop.current && t4 < 1) {
        frameID.current = requestAnimationFrame(animateScroll);
      } else {
        typeof onScrollFinish === "function" && onScrollFinish();
        startTime.current = 0;
        frameID.current = 0;
        cancel();
      }
    }
    animateScroll();
  }, [scrollableRef.current]);
  const handleStop = () => {
    if (cancelable) {
      shouldStop.current = true;
    }
  };
  useWindowEvent("wheel", handleStop, {
    passive: true
  });
  useWindowEvent("touchmove", handleStop, {
    passive: true
  });
  (0, import_react33.useEffect)(() => cancel, []);
  return {
    scrollableRef,
    targetRef,
    scrollIntoView,
    cancel
  };
}

// node_modules/@mantine/hooks/esm/use-scroll-lock/use-scroll-lock.js
init_react();
var import_react34 = __toESM(require_react());

// node_modules/@mantine/hooks/esm/use-scroll-lock/utils/get-lock-styles.js
init_react();

// node_modules/@mantine/hooks/esm/use-scroll-lock/utils/get-scroll-width.js
init_react();
function getScrollWidth() {
  if (typeof window === "undefined" || typeof document === "undefined")
    return 0;
  const paddingRight = parseInt(window.getComputedStyle(document.body).paddingRight, 10);
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  return paddingRight + scrollbarWidth;
}

// node_modules/@mantine/hooks/esm/use-scroll-lock/utils/get-lock-styles.js
var getLockStyles = ({ disableBodyPadding }) => {
  const scrollWidth = disableBodyPadding ? null : getScrollWidth();
  const styles2 = `body {
        --removed-scroll-width: ${scrollWidth}px;
        touch-action: none;
        overflow: hidden !important;
        position: relative !important;
        ${scrollWidth ? "padding-right: var(--removed-scroll-width) !important;" : ""}
        `;
  return styles2;
};

// node_modules/@mantine/hooks/esm/use-scroll-lock/utils/inject-style-tag.js
init_react();
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}

// node_modules/@mantine/hooks/esm/use-scroll-lock/utils/insert-style-tag.js
init_react();
function insertStyleTag(tag) {
  const head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}

// node_modules/@mantine/hooks/esm/use-scroll-lock/utils/make-style-tag.js
init_react();
function makeStyleTag() {
  const tag = document.createElement("style");
  tag.type = "text/css";
  tag.setAttribute("mantine-scroll-lock", "");
  return tag;
}

// node_modules/@mantine/hooks/esm/use-scroll-lock/use-scroll-lock.js
function useScrollLock(lock, options = {
  disableBodyPadding: false
}) {
  const [scrollLocked, setScrollLocked] = (0, import_react34.useState)(lock || false);
  const scrollTop = (0, import_react34.useRef)(0);
  const { disableBodyPadding } = options;
  const stylesheet = (0, import_react34.useRef)(null);
  const lockScroll = () => {
    scrollTop.current = window.scrollY;
    const styles2 = getLockStyles({ disableBodyPadding });
    const sheet = makeStyleTag();
    injectStyles(sheet, styles2);
    insertStyleTag(sheet);
    stylesheet.current = sheet;
  };
  const unlockScroll = () => {
    if (!(stylesheet == null ? void 0 : stylesheet.current))
      return;
    stylesheet.current.parentNode.removeChild(stylesheet.current);
    stylesheet.current = null;
  };
  (0, import_react34.useEffect)(() => {
    if (scrollLocked) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return unlockScroll;
  }, [scrollLocked]);
  (0, import_react34.useEffect)(() => {
    if (lock !== void 0) {
      setScrollLocked(lock);
    }
  }, [lock]);
  (0, import_react34.useEffect)(() => {
    if (lock === void 0 && typeof window !== "undefined") {
      window.document.body.style.overflow === "hidden" && setScrollLocked(true);
    }
  }, [setScrollLocked]);
  return [scrollLocked, setScrollLocked];
}

// node_modules/@mantine/hooks/esm/use-uuid/use-uuid.js
init_react();
var import_react35 = __toESM(require_react());
function useUuid(staticId) {
  const [uuid, setUuid] = (0, import_react35.useState)("");
  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);
  return staticId || uuid;
}

// node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.js
init_react();
var import_react36 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.styles.js
init_react();
var __defProp30 = Object.defineProperty;
var __defProps12 = Object.defineProperties;
var __getOwnPropDescs12 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols31 = Object.getOwnPropertySymbols;
var __hasOwnProp31 = Object.prototype.hasOwnProperty;
var __propIsEnum31 = Object.prototype.propertyIsEnumerable;
var __defNormalProp30 = (obj, key, value) => key in obj ? __defProp30(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues30 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp31.call(b2, prop))
      __defNormalProp30(a, prop, b2[prop]);
  if (__getOwnPropSymbols31)
    for (var prop of __getOwnPropSymbols31(b2)) {
      if (__propIsEnum31.call(b2, prop))
        __defNormalProp30(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps12 = (a, b2) => __defProps12(a, __getOwnPropDescs12(b2));
var sizes3 = {
  xs: 18,
  sm: 22,
  md: 28,
  lg: 34,
  xl: 44
};
function getVariantStyles2({ variant, theme, color }) {
  if (variant === "hover" || variant === "transparent") {
    return {
      border: "1px solid transparent",
      color: theme.fn.themeColor(color, theme.colorScheme === "dark" ? 4 : 7),
      backgroundColor: "transparent",
      "&:hover": variant === "transparent" ? {} : {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.fn.themeColor(color, 0)
      }
    };
  }
  const colors = getSharedColorScheme({ theme, color, variant });
  return {
    backgroundColor: colors.background,
    color: colors.color,
    border: `1px solid ${colors.border}`,
    "&:hover": {
      backgroundColor: colors.hover
    }
  };
}
var useStyles13 = createStyles((theme, { color, size: size2, radius: radius2 }) => ({
  root: __spreadProps12(__spreadValues30(__spreadValues30({}, theme.fn.focusStyles()), theme.fn.fontStyles()), {
    position: "relative",
    appearance: "none",
    WebkitAppearance: "none",
    WebkitTapHighlightColor: "transparent",
    boxSizing: "border-box",
    height: theme.fn.size({ size: size2, sizes: sizes3 }),
    minHeight: theme.fn.size({ size: size2, sizes: sizes3 }),
    width: theme.fn.size({ size: size2, sizes: sizes3 }),
    minWidth: theme.fn.size({ size: size2, sizes: sizes3 }),
    borderRadius: theme.fn.radius(radius2),
    padding: 0,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:disabled": {
      color: theme.colors.gray[theme.colorScheme === "dark" ? 6 : 4],
      cursor: "not-allowed",
      backgroundColor: theme.fn.themeColor("gray", theme.colorScheme === "dark" ? 8 : 1),
      borderColor: theme.fn.themeColor("gray", theme.colorScheme === "dark" ? 8 : 1)
    },
    "&:not(:disabled):active": {
      transform: "translateY(1px)"
    }
  }),
  outline: getVariantStyles2({ theme, color, variant: "outline" }),
  filled: getVariantStyles2({ theme, color, variant: "filled" }),
  default: getVariantStyles2({ theme, color, variant: "default" }),
  light: getVariantStyles2({ theme, color, variant: "light" }),
  hover: getVariantStyles2({ theme, color, variant: "hover" }),
  transparent: getVariantStyles2({ theme, color, variant: "transparent" }),
  loading: {
    "&::before": {
      content: '""',
      position: "absolute",
      top: -1,
      left: -1,
      right: -1,
      bottom: -1,
      backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors.dark[7], 0.5) : "rgba(255, 255, 255, .5)",
      borderRadius: theme.fn.radius(radius2),
      cursor: "not-allowed"
    }
  }
}));
var ActionIcon_styles_default = useStyles13;

// node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.js
var __defProp31 = Object.defineProperty;
var __getOwnPropSymbols32 = Object.getOwnPropertySymbols;
var __hasOwnProp32 = Object.prototype.hasOwnProperty;
var __propIsEnum32 = Object.prototype.propertyIsEnumerable;
var __defNormalProp31 = (obj, key, value) => key in obj ? __defProp31(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues31 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp32.call(b2, prop))
      __defNormalProp31(a, prop, b2[prop]);
  if (__getOwnPropSymbols32)
    for (var prop of __getOwnPropSymbols32(b2)) {
      if (__propIsEnum32.call(b2, prop))
        __defNormalProp31(a, prop, b2[prop]);
    }
  return a;
};
var __objRest18 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp32.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols32)
    for (var prop of __getOwnPropSymbols32(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum32.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps12 = {
  color: "gray",
  size: "md",
  variant: "hover",
  disabled: false,
  loading: false
};
var ActionIcon = (0, import_react36.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("ActionIcon", defaultProps12, props), {
    className,
    color,
    children,
    radius: radius2,
    size: size2,
    variant,
    disabled,
    loaderProps,
    loading,
    component,
    styles: styles2,
    classNames
  } = _a, others = __objRest18(_a, [
    "className",
    "color",
    "children",
    "radius",
    "size",
    "variant",
    "disabled",
    "loaderProps",
    "loading",
    "component",
    "styles",
    "classNames"
  ]);
  const { classes, cx, theme } = ActionIcon_styles_default({ size: size2, radius: radius2, color }, { name: "ActionIcon", classNames, styles: styles2 });
  const colors = getSharedColorScheme({ color, theme, variant: "light" });
  const loader = /* @__PURE__ */ import_react36.default.createElement(Loader, __spreadValues31({
    color: colors.color,
    size: theme.fn.size({ size: size2, sizes: sizes3 }) - 12
  }, loaderProps));
  return /* @__PURE__ */ import_react36.default.createElement(Box, __spreadValues31({
    component: component || "button",
    className: cx(classes[variant], classes.root, { [classes.loading]: loading }, className),
    type: "button",
    ref,
    disabled: disabled || loading
  }, others), loading ? loader : children);
});
ActionIcon.displayName = "@mantine/core/ActionIcon";

// node_modules/@mantine/core/esm/components/ActionIcon/CloseButton/CloseButton.js
init_react();
var import_react38 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/ActionIcon/CloseButton/CloseIcon.js
init_react();
var import_react37 = __toESM(require_react());
var __defProp32 = Object.defineProperty;
var __getOwnPropSymbols33 = Object.getOwnPropertySymbols;
var __hasOwnProp33 = Object.prototype.hasOwnProperty;
var __propIsEnum33 = Object.prototype.propertyIsEnumerable;
var __defNormalProp32 = (obj, key, value) => key in obj ? __defProp32(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues32 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp33.call(b2, prop))
      __defNormalProp32(a, prop, b2[prop]);
  if (__getOwnPropSymbols33)
    for (var prop of __getOwnPropSymbols33(b2)) {
      if (__propIsEnum33.call(b2, prop))
        __defNormalProp32(a, prop, b2[prop]);
    }
  return a;
};
function CloseIcon(props) {
  return /* @__PURE__ */ import_react37.default.createElement("svg", __spreadValues32({
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /* @__PURE__ */ import_react37.default.createElement("path", {
    d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
    fill: "currentColor",
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}
CloseIcon.displayName = "@mantine/core/CloseIcon";

// node_modules/@mantine/core/esm/components/ActionIcon/CloseButton/CloseButton.js
var __defProp33 = Object.defineProperty;
var __getOwnPropSymbols34 = Object.getOwnPropertySymbols;
var __hasOwnProp34 = Object.prototype.hasOwnProperty;
var __propIsEnum34 = Object.prototype.propertyIsEnumerable;
var __defNormalProp33 = (obj, key, value) => key in obj ? __defProp33(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues33 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp34.call(b2, prop))
      __defNormalProp33(a, prop, b2[prop]);
  if (__getOwnPropSymbols34)
    for (var prop of __getOwnPropSymbols34(b2)) {
      if (__propIsEnum34.call(b2, prop))
        __defNormalProp33(a, prop, b2[prop]);
    }
  return a;
};
var __objRest19 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp34.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols34)
    for (var prop of __getOwnPropSymbols34(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum34.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var iconSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24
};
var CloseButton = (0, import_react38.forwardRef)((_a, ref) => {
  var _b = _a, { iconSize, size: size2 = "md" } = _b, others = __objRest19(_b, ["iconSize", "size"]);
  const theme = useMantineTheme();
  const _iconSize = iconSize || theme.fn.size({ size: size2, sizes: iconSizes });
  return /* @__PURE__ */ import_react38.default.createElement(ActionIcon, __spreadValues33({
    size: size2,
    ref
  }, others), /* @__PURE__ */ import_react38.default.createElement(CloseIcon, {
    width: _iconSize,
    height: _iconSize
  }));
});
CloseButton.displayName = "@mantine/core/CloseButton";

// node_modules/@mantine/core/esm/components/Portal/Portal.js
init_react();
var import_react39 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var defaultProps13 = {
  zIndex: 1,
  position: "relative"
};
function Portal(props) {
  const { children, zIndex, target, className, position: position2 } = useMantineDefaultProps("Portal", defaultProps13, props);
  const theme = useMantineTheme();
  const [mounted, setMounted] = (0, import_react39.useState)(false);
  const ref = (0, import_react39.useRef)();
  useIsomorphicEffect(() => {
    setMounted(true);
    ref.current = !target ? document.createElement("div") : typeof target === "string" ? document.querySelector(target) : target;
    if (!target) {
      document.body.appendChild(ref.current);
    }
    return () => {
      !target && document.body.removeChild(ref.current);
    };
  }, [target]);
  if (!mounted) {
    return null;
  }
  return (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react39.default.createElement("div", {
    className,
    dir: theme.dir,
    style: { position: position2, zIndex }
  }, children), ref.current);
}
Portal.displayName = "@mantine/core/Portal";

// node_modules/@mantine/core/esm/components/Text/Text.js
init_react();
var import_react40 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Text/Text.styles.js
init_react();
var __defProp34 = Object.defineProperty;
var __defProps13 = Object.defineProperties;
var __getOwnPropDescs13 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols35 = Object.getOwnPropertySymbols;
var __hasOwnProp35 = Object.prototype.hasOwnProperty;
var __propIsEnum35 = Object.prototype.propertyIsEnumerable;
var __defNormalProp34 = (obj, key, value) => key in obj ? __defProp34(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues34 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp35.call(b2, prop))
      __defNormalProp34(a, prop, b2[prop]);
  if (__getOwnPropSymbols35)
    for (var prop of __getOwnPropSymbols35(b2)) {
      if (__propIsEnum35.call(b2, prop))
        __defNormalProp34(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps13 = (a, b2) => __defProps13(a, __getOwnPropDescs13(b2));
function getTextColor({ theme, color, variant }) {
  if (color === "dimmed") {
    return theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6];
  }
  return color in theme.colors ? theme.colors[color][theme.colorScheme === "dark" ? 5 : 7] : variant === "link" ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 7] : color || "inherit";
}
function getLineClamp(lineClamp) {
  if (typeof lineClamp === "number") {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: lineClamp,
      WebkitBoxOrient: "vertical"
    };
  }
  return null;
}
var useStyles14 = createStyles((theme, {
  color,
  variant,
  size: size2,
  lineClamp,
  inline,
  inherit,
  underline,
  gradientDeg,
  gradientTo,
  gradientFrom,
  weight,
  transform,
  align
}) => {
  const colors = getSharedColorScheme({
    theme,
    variant: "gradient",
    gradient: { from: gradientFrom, to: gradientTo, deg: gradientDeg }
  });
  return {
    root: __spreadProps13(__spreadValues34(__spreadValues34(__spreadValues34({}, theme.fn.fontStyles()), theme.fn.focusStyles()), getLineClamp(lineClamp)), {
      color: getTextColor({ color, theme, variant }),
      fontFamily: inherit ? "inherit" : theme.fontFamily,
      fontSize: inherit ? "inherit" : theme.fontSizes[size2],
      lineHeight: inherit ? "inherit" : inline ? 1 : theme.lineHeight,
      textDecoration: underline ? "underline" : "none",
      WebkitTapHighlightColor: "transparent",
      fontWeight: inherit ? "inherit" : weight,
      textTransform: transform,
      textAlign: align,
      "&:hover": variant === "link" && underline === void 0 ? {
        textDecoration: "underline"
      } : void 0
    }),
    gradient: {
      backgroundImage: colors.background,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  };
});
var Text_styles_default = useStyles14;

// node_modules/@mantine/core/esm/components/Text/Text.js
var __defProp35 = Object.defineProperty;
var __getOwnPropSymbols36 = Object.getOwnPropertySymbols;
var __hasOwnProp36 = Object.prototype.hasOwnProperty;
var __propIsEnum36 = Object.prototype.propertyIsEnumerable;
var __defNormalProp35 = (obj, key, value) => key in obj ? __defProp35(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues35 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp36.call(b2, prop))
      __defNormalProp35(a, prop, b2[prop]);
  if (__getOwnPropSymbols36)
    for (var prop of __getOwnPropSymbols36(b2)) {
      if (__propIsEnum36.call(b2, prop))
        __defNormalProp35(a, prop, b2[prop]);
    }
  return a;
};
var __objRest20 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp36.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols36)
    for (var prop of __getOwnPropSymbols36(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum36.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps14 = {
  size: "md",
  variant: "text",
  gradient: { from: "blue", to: "cyan", deg: 45 },
  inline: false,
  inherit: false
};
var Text = (0, import_react40.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Text", defaultProps14, props), {
    className,
    component,
    size: size2 = "md",
    weight,
    transform,
    color,
    align,
    variant = "text",
    lineClamp,
    gradient = { from: "blue", to: "cyan", deg: 45 },
    inline = false,
    inherit = false,
    underline,
    classNames,
    styles: styles2
  } = _a, others = __objRest20(_a, [
    "className",
    "component",
    "size",
    "weight",
    "transform",
    "color",
    "align",
    "variant",
    "lineClamp",
    "gradient",
    "inline",
    "inherit",
    "underline",
    "classNames",
    "styles"
  ]);
  const { classes, cx } = Text_styles_default({
    variant,
    color,
    size: size2,
    lineClamp,
    inline,
    inherit,
    underline,
    weight,
    transform,
    align,
    gradientFrom: gradient.from,
    gradientTo: gradient.to,
    gradientDeg: gradient.deg
  }, { classNames, styles: styles2, name: "Text" });
  return /* @__PURE__ */ import_react40.default.createElement(Box, __spreadValues35({
    ref,
    component: component || "div",
    className: cx(classes.root, { [classes.gradient]: variant === "gradient" }, className)
  }, others));
});
Text.displayName = "@mantine/core/Text";

// node_modules/@mantine/core/esm/components/Select/SelectDropdown/SelectDropdown.js
init_react();
var import_react47 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Select/SelectScrollArea/SelectScrollArea.js
init_react();
var import_react42 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.js
init_react();
var import_react41 = __toESM(require_react());

// node_modules/@radix-ui/react-scroll-area/dist/index.module.js
init_react();

// node_modules/@radix-ui/primitive/dist/index.module.js
init_react();
function composeEventHandlers(e4, n2, { checkForDefaultPrevented: t4 = true } = {}) {
  return function(r3) {
    if (e4 == null || e4(r3), t4 === false || !r3.defaultPrevented)
      return n2 == null ? void 0 : n2(r3);
  };
}

// node_modules/@radix-ui/number/dist/index.module.js
init_react();
function clamp(t4, [a, n2]) {
  return Math.min(n2, Math.max(a, t4));
}

// node_modules/@radix-ui/react-use-layout-effect/dist/index.module.js
init_react();
var o = __toESM(require_react());
var useLayoutEffect4 = Boolean(globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) ? o.useLayoutEffect : () => {
};

// node_modules/@radix-ui/react-use-direction/dist/index.module.js
init_react();
var e = __toESM(require_react());
function useDirection(t4, n2) {
  const [r3, o4] = e.useState("ltr"), [i, u] = e.useState(), c = e.useRef(0);
  return e.useEffect(() => {
    if (n2 === void 0 && t4 != null && t4.parentElement) {
      const e4 = getComputedStyle(t4.parentElement);
      u(e4);
    }
  }, [t4, n2]), e.useEffect(() => (n2 === void 0 && function e4() {
    c.current = requestAnimationFrame(() => {
      const t5 = i == null ? void 0 : i.direction;
      t5 && o4(t5), e4();
    });
  }(), () => cancelAnimationFrame(c.current)), [i, n2, o4]), n2 || r3;
}

// node_modules/@radix-ui/react-use-callback-ref/dist/index.module.js
init_react();
var e2 = __toESM(require_react());
function useCallbackRef(r3) {
  const t4 = e2.useRef(r3);
  return e2.useEffect(() => {
    t4.current = r3;
  }), e2.useMemo(() => (...e4) => {
    var r4;
    return (r4 = t4.current) === null || r4 === void 0 ? void 0 : r4.call(t4, ...e4);
  }, []);
}

// node_modules/@radix-ui/react-compose-refs/dist/index.module.js
init_react();
var o2 = __toESM(require_react());
function composeRefs(...o4) {
  return (e4) => o4.forEach((o5) => function(o6, e5) {
    typeof o6 == "function" ? o6(e5) : o6 != null && (o6.current = e5);
  }(o5, e4));
}
function useComposedRefs(...e4) {
  return o2.useCallback(composeRefs(...e4), e4);
}

// node_modules/@radix-ui/react-context/dist/index.module.js
init_react();
var e3 = __toESM(require_react());
function createContextScope(n2, o4 = []) {
  let r3 = [];
  const c = () => {
    const t4 = r3.map((t5) => /* @__PURE__ */ e3.createContext(t5));
    return function(o5) {
      const r4 = (o5 == null ? void 0 : o5[n2]) || t4;
      return e3.useMemo(() => ({ [`__scope${n2}`]: { ...o5, [n2]: r4 } }), [o5, r4]);
    };
  };
  return c.scopeName = n2, [function(t4, o5) {
    const c2 = /* @__PURE__ */ e3.createContext(o5), u = r3.length;
    function s2(t5) {
      const { scope: o6, children: r4, ...s3 } = t5, i = (o6 == null ? void 0 : o6[n2][u]) || c2, a = e3.useMemo(() => s3, Object.values(s3));
      return e3.createElement(i.Provider, { value: a }, r4);
    }
    return r3 = [...r3, o5], s2.displayName = t4 + "Provider", [s2, function(r4, s3) {
      const i = (s3 == null ? void 0 : s3[n2][u]) || c2, a = e3.useContext(i);
      if (a)
        return a;
      if (o5 !== void 0)
        return o5;
      throw new Error(`\`${r4}\` must be used within \`${t4}\``);
    }];
  }, t(c, ...o4)];
}
function t(...t4) {
  const n2 = t4[0];
  if (t4.length === 1)
    return n2;
  const o4 = () => {
    const o5 = t4.map((e4) => ({ useScope: e4(), scopeName: e4.scopeName }));
    return function(t5) {
      const r3 = o5.reduce((e4, { useScope: n3, scopeName: o6 }) => ({ ...e4, ...n3(t5)[`__scope${o6}`] }), {});
      return e3.useMemo(() => ({ [`__scope${n2.scopeName}`]: r3 }), [r3]);
    };
  };
  return o4.scopeName = n2.scopeName, o4;
}

// node_modules/@radix-ui/react-presence/dist/index.module.js
init_react();
var t2 = __toESM(require_react());
var Presence = (u) => {
  const { present: o4, children: i } = u, s2 = function(n2) {
    const [u2, o5] = t2.useState(), i2 = t2.useRef({}), s3 = t2.useRef(n2), c2 = t2.useRef("none"), a2 = n2 ? "mounted" : "unmounted", [d2, m2] = function(e4, n3) {
      return t2.useReducer((e5, t4) => {
        const r3 = n3[e5][t4];
        return r3 != null ? r3 : e5;
      }, e4);
    }(a2, { mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" }, unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" }, unmounted: { MOUNT: "mounted" } });
    return t2.useEffect(() => {
      const e4 = r(i2.current);
      c2.current = d2 === "mounted" ? e4 : "none";
    }, [d2]), useLayoutEffect4(() => {
      const e4 = i2.current, t4 = s3.current;
      if (t4 !== n2) {
        const u3 = c2.current, o6 = r(e4);
        if (n2)
          m2("MOUNT");
        else if (o6 === "none" || (e4 == null ? void 0 : e4.display) === "none")
          m2("UNMOUNT");
        else {
          const e5 = u3 !== o6;
          m2(t4 && e5 ? "ANIMATION_OUT" : "UNMOUNT");
        }
        s3.current = n2;
      }
    }, [n2, m2]), useLayoutEffect4(() => {
      if (u2) {
        const e4 = (e5) => {
          const n4 = r(i2.current).includes(e5.animationName);
          e5.target === u2 && n4 && m2("ANIMATION_END");
        }, n3 = (e5) => {
          e5.target === u2 && (c2.current = r(i2.current));
        };
        return u2.addEventListener("animationstart", n3), u2.addEventListener("animationcancel", e4), u2.addEventListener("animationend", e4), () => {
          u2.removeEventListener("animationstart", n3), u2.removeEventListener("animationcancel", e4), u2.removeEventListener("animationend", e4);
        };
      }
      m2("ANIMATION_END");
    }, [u2, m2]), { isPresent: ["mounted", "unmountSuspended"].includes(d2), ref: t2.useCallback((e4) => {
      e4 && (i2.current = getComputedStyle(e4)), o5(e4);
    }, []) };
  }(o4), c = typeof i == "function" ? i({ present: s2.isPresent }) : t2.Children.only(i), a = useComposedRefs(s2.ref, c.ref);
  return typeof i == "function" || s2.isPresent ? /* @__PURE__ */ t2.cloneElement(c, { ref: a }) : null;
};
function r(e4) {
  return (e4 == null ? void 0 : e4.animationName) || "none";
}
Presence.displayName = "Presence";

// node_modules/@radix-ui/react-primitive/dist/index.module.js
init_react();

// node_modules/@radix-ui/react-slot/dist/index.module.js
init_react();
var t3 = __toESM(require_react());
init_extends();
var Slot = /* @__PURE__ */ t3.forwardRef((e4, o4) => {
  const { children: a, ...s2 } = e4;
  return t3.Children.toArray(a).some(l) ? /* @__PURE__ */ t3.createElement(t3.Fragment, null, t3.Children.map(a, (e5) => l(e5) ? /* @__PURE__ */ t3.createElement(n, _extends({}, s2, { ref: o4 }), e5.props.children) : e5)) : /* @__PURE__ */ t3.createElement(n, _extends({}, s2, { ref: o4 }), a);
});
Slot.displayName = "Slot";
var n = /* @__PURE__ */ t3.forwardRef((r3, n2) => {
  const { children: l2, ...a } = r3;
  return t3.isValidElement(l2) ? /* @__PURE__ */ t3.cloneElement(l2, { ...o3(a, l2.props), ref: composeRefs(n2, l2.ref) }) : t3.Children.count(l2) > 1 ? t3.Children.only(null) : null;
});
n.displayName = "SlotClone";
var Slottable = ({ children: e4 }) => /* @__PURE__ */ t3.createElement(t3.Fragment, null, e4);
function l(e4) {
  return t3.isValidElement(e4) && e4.type === Slottable;
}
function o3(e4, t4) {
  const r3 = { ...t4 };
  for (const n2 in t4) {
    const l2 = e4[n2], o4 = t4[n2];
    /^on[A-Z]/.test(n2) ? r3[n2] = (...e5) => {
      o4 == null || o4(...e5), l2 == null || l2(...e5);
    } : n2 === "style" ? r3[n2] = { ...l2, ...o4 } : n2 === "className" && (r3[n2] = [l2, o4].filter(Boolean).join(" "));
  }
  return { ...e4, ...r3 };
}

// node_modules/@radix-ui/react-primitive/dist/index.module.js
var r2 = __toESM(require_react());
init_extends();
var Primitive = ["a", "button", "div", "h2", "h3", "img", "li", "nav", "ol", "p", "span", "svg", "ul"].reduce((o4, i) => ({ ...o4, [i]: /* @__PURE__ */ r2.forwardRef((o5, m2) => {
  const { asChild: a, ...s2 } = o5, n2 = a ? Slot : i;
  return r2.useEffect(() => {
    window[Symbol.for("radix-ui")] = true;
  }, []), /* @__PURE__ */ r2.createElement(n2, _extends({}, s2, { ref: m2 }));
}) }), {});

// node_modules/@radix-ui/react-scroll-area/dist/index.module.js
var s = __toESM(require_react());
init_extends();
var [d, p] = createContextScope("ScrollArea");
var [f, h] = d("ScrollArea");
var ScrollArea = /* @__PURE__ */ s.forwardRef((e4, r3) => {
  const { __scopeScrollArea: t4, type: n2 = "hover", scrollHideDelay: i = 600, ...a } = e4, [d2, p2] = s.useState(null), [h2, m2] = s.useState(null), [w2, b2] = s.useState(null), [v2, S2] = s.useState(null), [g2, E2] = s.useState(null), [C2, T2] = s.useState(0), [y2, A2] = s.useState(0), [x2, R2] = s.useState(false), [P2, L2] = s.useState(false), _2 = useComposedRefs(r3, (e5) => p2(e5)), D2 = useDirection(d2, a.dir);
  return s.createElement(f, { scope: t4, type: n2, dir: D2, scrollHideDelay: i, scrollArea: d2, viewport: h2, onViewportChange: m2, content: w2, onContentChange: b2, scrollbarX: v2, onScrollbarXChange: S2, scrollbarXEnabled: x2, onScrollbarXEnabledChange: R2, scrollbarY: g2, onScrollbarYChange: E2, scrollbarYEnabled: P2, onScrollbarYEnabledChange: L2, onCornerWidthChange: T2, onCornerHeightChange: A2 }, /* @__PURE__ */ s.createElement(Primitive.div, _extends({}, a, { ref: _2, style: { position: "relative", "--radix-scroll-area-corner-width": C2 + "px", "--radix-scroll-area-corner-height": y2 + "px", ...e4.style } })));
});
var ScrollAreaViewport = /* @__PURE__ */ s.forwardRef((e4, r3) => {
  const { __scopeScrollArea: t4, children: o4, ...n2 } = e4, i = h("ScrollAreaViewport", t4), a = s.useRef(null), d2 = useComposedRefs(r3, a, i.onViewportChange);
  return s.createElement(s.Fragment, null, /* @__PURE__ */ s.createElement("style", { dangerouslySetInnerHTML: { __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}" } }), /* @__PURE__ */ s.createElement(Primitive.div, _extends({ "data-radix-scroll-area-viewport": "" }, n2, { ref: d2, style: { overflowX: i.scrollbarXEnabled ? "scroll" : "hidden", overflowY: i.scrollbarYEnabled ? "scroll" : "hidden", ...e4.style } }), /* @__PURE__ */ s.createElement("div", { ref: i.onContentChange, style: { minWidth: "100%", display: "table" } }, o4)));
});
var ScrollAreaScrollbar = /* @__PURE__ */ s.forwardRef((e4, r3) => {
  const { forceMount: t4, ...o4 } = e4, n2 = h("ScrollAreaScrollbar", e4.__scopeScrollArea), { onScrollbarXEnabledChange: l2, onScrollbarYEnabledChange: i } = n2, a = e4.orientation === "horizontal";
  return s.useEffect(() => (a ? l2(true) : i(true), () => {
    a ? l2(false) : i(false);
  }), [a, l2, i]), n2.type === "hover" ? /* @__PURE__ */ s.createElement(m, _extends({}, o4, { ref: r3, forceMount: t4 })) : n2.type === "scroll" ? /* @__PURE__ */ s.createElement(w, _extends({}, o4, { ref: r3, forceMount: t4 })) : n2.type === "auto" ? /* @__PURE__ */ s.createElement(b, _extends({}, o4, { ref: r3, forceMount: t4 })) : n2.type === "always" ? /* @__PURE__ */ s.createElement(v, _extends({}, o4, { ref: r3 })) : null;
});
var m = /* @__PURE__ */ s.forwardRef((e4, r3) => {
  const { forceMount: t4, ...o4 } = e4, n2 = h("ScrollAreaScrollbar", e4.__scopeScrollArea), [l2, i] = s.useState(false);
  return s.useEffect(() => {
    const e5 = n2.scrollArea;
    let r4 = 0;
    if (e5) {
      const t5 = () => {
        window.clearTimeout(r4), i(true);
      }, o5 = () => {
        r4 = window.setTimeout(() => i(false), n2.scrollHideDelay);
      };
      return e5.addEventListener("pointerenter", t5), e5.addEventListener("pointerleave", o5), () => {
        e5.removeEventListener("pointerenter", t5), e5.removeEventListener("pointerleave", o5);
      };
    }
  }, [n2.scrollArea, n2.scrollHideDelay]), /* @__PURE__ */ s.createElement(Presence, { present: t4 || l2 }, /* @__PURE__ */ s.createElement(b, _extends({ "data-state": l2 ? "visible" : "hidden" }, o4, { ref: r3 })));
});
var w = /* @__PURE__ */ s.forwardRef((r3, t4) => {
  const { forceMount: o4, ...n2 } = r3, l2 = h("ScrollAreaScrollbar", r3.__scopeScrollArea), i = r3.orientation === "horizontal", c = z(() => p2("SCROLL_END"), 100), [d2, p2] = (f2 = "hidden", m2 = { hidden: { SCROLL: "scrolling" }, scrolling: { SCROLL_END: "idle", POINTER_ENTER: "interacting" }, interacting: { SCROLL: "interacting", POINTER_LEAVE: "idle" }, idle: { HIDE: "hidden", SCROLL: "scrolling", POINTER_ENTER: "interacting" } }, s.useReducer((e4, r4) => {
    const t5 = m2[e4][r4];
    return t5 != null ? t5 : e4;
  }, f2));
  var f2, m2;
  return s.useEffect(() => {
    if (d2 === "idle") {
      const e4 = window.setTimeout(() => p2("HIDE"), l2.scrollHideDelay);
      return () => window.clearTimeout(e4);
    }
  }, [d2, l2.scrollHideDelay, p2]), s.useEffect(() => {
    const e4 = l2.viewport, r4 = i ? "scrollLeft" : "scrollTop";
    if (e4) {
      let t5 = e4[r4];
      const o5 = () => {
        const o6 = e4[r4];
        t5 !== o6 && (p2("SCROLL"), c()), t5 = o6;
      };
      return e4.addEventListener("scroll", o5), () => e4.removeEventListener("scroll", o5);
    }
  }, [l2.viewport, i, p2, c]), /* @__PURE__ */ s.createElement(Presence, { present: o4 || d2 !== "hidden" }, /* @__PURE__ */ s.createElement(v, _extends({ "data-state": d2 === "hidden" ? "hidden" : "visible" }, n2, { ref: t4, onPointerEnter: composeEventHandlers(r3.onPointerEnter, () => p2("POINTER_ENTER")), onPointerLeave: composeEventHandlers(r3.onPointerLeave, () => p2("POINTER_LEAVE")) })));
});
var b = /* @__PURE__ */ s.forwardRef((e4, r3) => {
  const t4 = h("ScrollAreaScrollbar", e4.__scopeScrollArea), { forceMount: o4, ...n2 } = e4, [l2, i] = s.useState(false), c = e4.orientation === "horizontal", d2 = z(() => {
    if (t4.viewport) {
      const e5 = t4.viewport.offsetWidth < t4.viewport.scrollWidth, r4 = t4.viewport.offsetHeight < t4.viewport.scrollHeight;
      i(c ? e5 : r4);
    }
  }, 10);
  return H(t4.viewport, d2), H(t4.content, d2), /* @__PURE__ */ s.createElement(Presence, { present: o4 || l2 }, /* @__PURE__ */ s.createElement(v, _extends({ "data-state": l2 ? "visible" : "hidden" }, n2, { ref: r3 })));
});
var v = /* @__PURE__ */ s.forwardRef((e4, r3) => {
  const { orientation: t4 = "vertical", ...o4 } = e4, n2 = h("ScrollAreaScrollbar", e4.__scopeScrollArea), l2 = s.useRef(null), i = s.useRef(0), [a, c] = s.useState({ content: 0, viewport: 0, scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 } }), d2 = x(a.viewport, a.content), p2 = { ...o4, sizes: a, onSizesChange: c, hasThumb: Boolean(d2 > 0 && d2 < 1), onThumbChange: (e5) => l2.current = e5, onThumbPointerUp: () => i.current = 0, onThumbPointerDown: (e5) => i.current = e5 };
  function f2(e5, r4) {
    return function(e6, r5, t5, o5 = "ltr") {
      const n3 = R(t5), l3 = n3 / 2, i2 = r5 || l3, a2 = n3 - i2, c2 = t5.scrollbar.paddingStart + i2, s2 = t5.scrollbar.size - t5.scrollbar.paddingEnd - a2, u = t5.content - t5.viewport;
      return L([c2, s2], o5 === "ltr" ? [0, u] : [-1 * u, 0])(e6);
    }(e5, i.current, a, r4);
  }
  return t4 === "horizontal" ? /* @__PURE__ */ s.createElement(S, _extends({}, p2, { ref: r3, onThumbPositionChange: () => {
    if (n2.viewport && l2.current) {
      const e5 = P(n2.viewport.scrollLeft, a, n2.dir);
      l2.current.style.transform = `translate3d(${e5}px, 0, 0)`;
    }
  }, onWheelScroll: (e5) => {
    n2.viewport && (n2.viewport.scrollLeft = e5);
  }, onDragScroll: (e5) => {
    n2.viewport && (n2.viewport.scrollLeft = f2(e5, n2.dir));
  } })) : t4 === "vertical" ? /* @__PURE__ */ s.createElement(g, _extends({}, p2, { ref: r3, onThumbPositionChange: () => {
    if (n2.viewport && l2.current) {
      const e5 = P(n2.viewport.scrollTop, a);
      l2.current.style.transform = `translate3d(0, ${e5}px, 0)`;
    }
  }, onWheelScroll: (e5) => {
    n2.viewport && (n2.viewport.scrollTop = e5);
  }, onDragScroll: (e5) => {
    n2.viewport && (n2.viewport.scrollTop = f2(e5));
  } })) : null;
});
var S = /* @__PURE__ */ s.forwardRef((e4, r3) => {
  const { sizes: t4, onSizesChange: o4, ...n2 } = e4, i = h("ScrollAreaScrollbar", e4.__scopeScrollArea), [a, c] = s.useState(), d2 = s.useRef(null), p2 = useComposedRefs(r3, d2, i.onScrollbarXChange);
  return s.useEffect(() => {
    d2.current && c(getComputedStyle(d2.current));
  }, [d2]), /* @__PURE__ */ s.createElement(T, _extends({ "data-orientation": "horizontal" }, n2, { ref: p2, sizes: t4, style: { bottom: 0, left: i.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0, right: i.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0, "--radix-scroll-area-thumb-width": R(t4) + "px", ...e4.style }, onThumbPointerDown: (r4) => e4.onThumbPointerDown(r4.x), onDragScroll: (r4) => e4.onDragScroll(r4.x), onWheelScroll: (r4, t5) => {
    if (i.viewport) {
      const o5 = i.viewport.scrollLeft + r4.deltaX;
      e4.onWheelScroll(o5), _(o5, t5) && r4.preventDefault();
    }
  }, onResize: () => {
    d2.current && i.viewport && a && o4({ content: i.viewport.scrollWidth, viewport: i.viewport.offsetWidth, scrollbar: { size: d2.current.clientWidth, paddingStart: A(a.paddingLeft), paddingEnd: A(a.paddingRight) } });
  } }));
});
var g = /* @__PURE__ */ s.forwardRef((e4, r3) => {
  const { sizes: t4, onSizesChange: o4, ...n2 } = e4, i = h("ScrollAreaScrollbar", e4.__scopeScrollArea), [a, c] = s.useState(), d2 = s.useRef(null), p2 = useComposedRefs(r3, d2, i.onScrollbarYChange);
  return s.useEffect(() => {
    d2.current && c(getComputedStyle(d2.current));
  }, [d2]), /* @__PURE__ */ s.createElement(T, _extends({ "data-orientation": "vertical" }, n2, { ref: p2, sizes: t4, style: { top: 0, right: i.dir === "ltr" ? 0 : void 0, left: i.dir === "rtl" ? 0 : void 0, bottom: "var(--radix-scroll-area-corner-height)", "--radix-scroll-area-thumb-height": R(t4) + "px", ...e4.style }, onThumbPointerDown: (r4) => e4.onThumbPointerDown(r4.y), onDragScroll: (r4) => e4.onDragScroll(r4.y), onWheelScroll: (r4, t5) => {
    if (i.viewport) {
      const o5 = i.viewport.scrollTop + r4.deltaY;
      e4.onWheelScroll(o5), _(o5, t5) && r4.preventDefault();
    }
  }, onResize: () => {
    d2.current && i.viewport && a && o4({ content: i.viewport.scrollHeight, viewport: i.viewport.offsetHeight, scrollbar: { size: d2.current.clientHeight, paddingStart: A(a.paddingTop), paddingEnd: A(a.paddingBottom) } });
  } }));
});
var [E, C] = d("ScrollAreaScrollbar");
var T = /* @__PURE__ */ s.forwardRef((r3, t4) => {
  const { __scopeScrollArea: o4, sizes: i, hasThumb: a, onThumbChange: d2, onThumbPointerUp: p2, onThumbPointerDown: f2, onThumbPositionChange: m2, onDragScroll: w2, onWheelScroll: b2, onResize: v2, ...S2 } = r3, g2 = h("ScrollAreaScrollbar", o4), [C2, T2] = s.useState(null), y2 = useComposedRefs(t4, (e4) => T2(e4)), A2 = s.useRef(null), x2 = s.useRef(""), R2 = g2.viewport, P2 = i.content - i.viewport, L2 = useCallbackRef(b2), _2 = useCallbackRef(m2), D2 = z(v2, 10);
  function W(e4) {
    if (A2.current) {
      const r4 = e4.clientX - A2.current.left, t5 = e4.clientY - A2.current.top;
      w2({ x: r4, y: t5 });
    }
  }
  return s.useEffect(() => {
    const e4 = (e5) => {
      const r4 = e5.target;
      (C2 == null ? void 0 : C2.contains(r4)) && L2(e5, P2);
    };
    return document.addEventListener("wheel", e4, { passive: false }), () => document.removeEventListener("wheel", e4, { passive: false });
  }, [R2, C2, P2, L2]), s.useEffect(_2, [i, _2]), H(C2, D2), H(g2.content, D2), /* @__PURE__ */ s.createElement(E, { scope: o4, scrollbar: C2, hasThumb: a, onThumbChange: useCallbackRef(d2), onThumbPointerUp: useCallbackRef(p2), onThumbPositionChange: _2, onThumbPointerDown: useCallbackRef(f2) }, /* @__PURE__ */ s.createElement(Primitive.div, _extends({}, S2, { ref: y2, style: { position: "absolute", ...S2.style }, onPointerDown: composeEventHandlers(r3.onPointerDown, (e4) => {
    if (e4.button === 0) {
      e4.target.setPointerCapture(e4.pointerId), A2.current = C2.getBoundingClientRect(), x2.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", W(e4);
    }
  }), onPointerMove: composeEventHandlers(r3.onPointerMove, W), onPointerUp: composeEventHandlers(r3.onPointerUp, (e4) => {
    e4.target.releasePointerCapture(e4.pointerId), document.body.style.webkitUserSelect = x2.current, A2.current = null;
  }) })));
});
var ScrollAreaThumb = /* @__PURE__ */ s.forwardRef((r3, t4) => {
  const { __scopeScrollArea: o4, style: n2, ...i } = r3, a = h("ScrollbarThumb", o4), d2 = C("ScrollbarThumb", o4), { onThumbPositionChange: p2 } = d2, f2 = useComposedRefs(t4, (e4) => d2.onThumbChange(e4)), m2 = s.useRef(), w2 = z(() => {
    m2.current && (m2.current(), m2.current = void 0);
  }, 100);
  return s.useEffect(() => {
    const e4 = a.viewport;
    if (e4) {
      const r4 = () => {
        if (w2(), !m2.current) {
          const r5 = D(e4, p2);
          m2.current = r5, p2();
        }
      };
      return p2(), e4.addEventListener("scroll", r4), () => e4.removeEventListener("scroll", r4);
    }
  }, [a.viewport, w2, p2]), d2.hasThumb ? /* @__PURE__ */ s.createElement(Primitive.div, _extends({}, i, { ref: f2, style: { width: "var(--radix-scroll-area-thumb-width)", height: "var(--radix-scroll-area-thumb-height)", ...n2 }, onPointerDownCapture: composeEventHandlers(r3.onPointerDownCapture, (e4) => {
    const r4 = e4.target.getBoundingClientRect(), t5 = e4.clientX - r4.left, o5 = e4.clientY - r4.top;
    d2.onThumbPointerDown({ x: t5, y: o5 });
  }), onPointerUp: composeEventHandlers(r3.onPointerUp, d2.onThumbPointerUp) })) : null;
});
var ScrollAreaCorner = /* @__PURE__ */ s.forwardRef((e4, r3) => {
  const t4 = h("ScrollAreaCorner", e4.__scopeScrollArea), o4 = Boolean(t4.scrollbarX && t4.scrollbarY);
  return t4.type !== "scroll" && o4 ? /* @__PURE__ */ s.createElement(y, _extends({}, e4, { ref: r3 })) : null;
});
var y = /* @__PURE__ */ s.forwardRef((e4, r3) => {
  const { __scopeScrollArea: t4, ...o4 } = e4, n2 = h("ScrollAreaCorner", t4), [l2, i] = s.useState(0), [a, d2] = s.useState(0), p2 = Boolean(l2 && a);
  return H(n2.scrollbarX, () => {
    var e5;
    const r4 = ((e5 = n2.scrollbarX) === null || e5 === void 0 ? void 0 : e5.offsetHeight) || 0;
    n2.onCornerHeightChange(r4), d2(r4);
  }), H(n2.scrollbarY, () => {
    var e5;
    const r4 = ((e5 = n2.scrollbarY) === null || e5 === void 0 ? void 0 : e5.offsetWidth) || 0;
    n2.onCornerWidthChange(r4), i(r4);
  }), p2 ? /* @__PURE__ */ s.createElement(Primitive.div, _extends({}, o4, { ref: r3, style: { width: l2, height: a, position: "absolute", right: n2.dir === "ltr" ? 0 : void 0, left: n2.dir === "rtl" ? 0 : void 0, bottom: 0, ...e4.style } })) : null;
});
function A(e4) {
  return e4 ? parseInt(e4, 10) : 0;
}
function x(e4, r3) {
  const t4 = e4 / r3;
  return isNaN(t4) ? 0 : t4;
}
function R(e4) {
  const r3 = x(e4.viewport, e4.content), t4 = e4.scrollbar.paddingStart + e4.scrollbar.paddingEnd, o4 = (e4.scrollbar.size - t4) * r3;
  return Math.max(o4, 18);
}
function P(e4, t4, o4 = "ltr") {
  const n2 = R(t4), l2 = t4.scrollbar.paddingStart + t4.scrollbar.paddingEnd, i = t4.scrollbar.size - l2, a = t4.content - t4.viewport, c = i - n2, s2 = clamp(e4, o4 === "ltr" ? [0, a] : [-1 * a, 0]);
  return L([0, a], [0, c])(s2);
}
function L(e4, r3) {
  return (t4) => {
    if (e4[0] === e4[1] || r3[0] === r3[1])
      return r3[0];
    const o4 = (r3[1] - r3[0]) / (e4[1] - e4[0]);
    return r3[0] + o4 * (t4 - e4[0]);
  };
}
function _(e4, r3) {
  return e4 > 0 && e4 < r3;
}
var D = (e4, r3 = () => {
}) => {
  let t4 = { left: e4.scrollLeft, top: e4.scrollTop }, o4 = 0;
  return function n2() {
    const l2 = { left: e4.scrollLeft, top: e4.scrollTop }, i = t4.left !== l2.left, a = t4.top !== l2.top;
    (i || a) && r3(), t4 = l2, o4 = window.requestAnimationFrame(n2);
  }(), () => window.cancelAnimationFrame(o4);
};
function z(e4, r3) {
  const t4 = useCallbackRef(e4), o4 = s.useRef(0);
  return s.useEffect(() => () => window.clearTimeout(o4.current), []), s.useCallback(() => {
    window.clearTimeout(o4.current), o4.current = window.setTimeout(t4, r3);
  }, [t4, r3]);
}
function H(e4, r3) {
  const o4 = useCallbackRef(r3);
  useLayoutEffect4(() => {
    let r4 = 0;
    if (e4) {
      const t4 = new ResizeObserver(() => {
        cancelAnimationFrame(r4), r4 = window.requestAnimationFrame(o4);
      });
      return t4.observe(e4), () => {
        window.cancelAnimationFrame(r4), t4.unobserve(e4);
      };
    }
  }, [e4, o4]);
}
var Root = ScrollArea;
var Viewport = ScrollAreaViewport;
var Scrollbar = ScrollAreaScrollbar;
var Thumb = ScrollAreaThumb;
var Corner = ScrollAreaCorner;

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.styles.js
init_react();
var useStyles15 = createStyles((theme, { scrollbarSize, offsetScrollbars, scrollbarHovered }, getRef2) => ({
  root: {
    overflow: "hidden"
  },
  viewport: {
    width: "100%",
    height: "100%",
    paddingRight: offsetScrollbars ? scrollbarSize : void 0
  },
  scrollbar: {
    display: "flex",
    userSelect: "none",
    touchAction: "none",
    boxSizing: "border-box",
    padding: scrollbarSize / 5,
    transition: "background-color 150ms ease, opacity 150ms ease",
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
      [`& .${getRef2("thumb")}`]: {
        backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba("#ffffff", 0.5) : theme.fn.rgba(theme.black, 0.5)
      }
    },
    '&[data-orientation="vertical"]': {
      width: scrollbarSize
    },
    '&[data-orientation="horizontal"]': {
      flexDirection: "column",
      height: scrollbarSize
    },
    '&[data-state="hidden"]': {
      opacity: 0
    }
  },
  thumb: {
    ref: getRef2("thumb"),
    flex: 1,
    backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba("#ffffff", 0.4) : theme.fn.rgba(theme.black, 0.4),
    borderRadius: scrollbarSize,
    position: "relative",
    transition: "background-color 150ms ease",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height: "100%",
      minWidth: 44,
      minHeight: 44
    }
  },
  corner: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    transition: "opacity 150ms ease",
    opacity: scrollbarHovered ? 1 : 0
  }
}));
var ScrollArea_styles_default = useStyles15;

// node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.js
var __defProp36 = Object.defineProperty;
var __getOwnPropSymbols37 = Object.getOwnPropertySymbols;
var __hasOwnProp37 = Object.prototype.hasOwnProperty;
var __propIsEnum37 = Object.prototype.propertyIsEnumerable;
var __defNormalProp36 = (obj, key, value) => key in obj ? __defProp36(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues36 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp37.call(b2, prop))
      __defNormalProp36(a, prop, b2[prop]);
  if (__getOwnPropSymbols37)
    for (var prop of __getOwnPropSymbols37(b2)) {
      if (__propIsEnum37.call(b2, prop))
        __defNormalProp36(a, prop, b2[prop]);
    }
  return a;
};
var __objRest21 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp37.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols37)
    for (var prop of __getOwnPropSymbols37(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum37.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps15 = {
  scrollbarSize: 12,
  scrollHideDelay: 1e3,
  type: "hover",
  offsetScrollbars: false
};
var ScrollArea2 = (0, import_react41.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("ScrollArea", defaultProps15, props), {
    children,
    className,
    classNames,
    styles: styles2,
    scrollbarSize,
    scrollHideDelay,
    type,
    dir,
    offsetScrollbars,
    viewportRef,
    onScrollPositionChange
  } = _a, others = __objRest21(_a, [
    "children",
    "className",
    "classNames",
    "styles",
    "scrollbarSize",
    "scrollHideDelay",
    "type",
    "dir",
    "offsetScrollbars",
    "viewportRef",
    "onScrollPositionChange"
  ]);
  const [scrollbarHovered, setScrollbarHovered] = (0, import_react41.useState)(false);
  const theme = useMantineTheme();
  const { classes, cx } = ScrollArea_styles_default({ scrollbarSize, offsetScrollbars, scrollbarHovered }, { name: "ScrollArea", classNames, styles: styles2 });
  return /* @__PURE__ */ import_react41.default.createElement(Root, {
    type,
    scrollHideDelay,
    dir: dir || theme.dir,
    ref,
    asChild: true
  }, /* @__PURE__ */ import_react41.default.createElement(Box, __spreadValues36({
    className: cx(classes.root, className)
  }, others), /* @__PURE__ */ import_react41.default.createElement(Viewport, {
    className: classes.viewport,
    ref: viewportRef,
    onScroll: typeof onScrollPositionChange === "function" ? ({ currentTarget }) => onScrollPositionChange({
      x: currentTarget.scrollLeft,
      y: currentTarget.scrollTop
    }) : void 0
  }, children), /* @__PURE__ */ import_react41.default.createElement(Scrollbar, {
    orientation: "horizontal",
    className: classes.scrollbar,
    forceMount: true,
    onMouseEnter: () => setScrollbarHovered(true),
    onMouseLeave: () => setScrollbarHovered(false)
  }, /* @__PURE__ */ import_react41.default.createElement(Thumb, {
    className: classes.thumb
  })), /* @__PURE__ */ import_react41.default.createElement(Scrollbar, {
    orientation: "vertical",
    className: classes.scrollbar,
    forceMount: true,
    onMouseEnter: () => setScrollbarHovered(true),
    onMouseLeave: () => setScrollbarHovered(false)
  }, /* @__PURE__ */ import_react41.default.createElement(Thumb, {
    className: classes.thumb
  })), /* @__PURE__ */ import_react41.default.createElement(Corner, {
    className: classes.corner
  })));
});
ScrollArea2.displayName = "@mantine/core/ScrollArea";

// node_modules/@mantine/core/esm/components/Select/SelectScrollArea/SelectScrollArea.js
var __defProp37 = Object.defineProperty;
var __defProps14 = Object.defineProperties;
var __getOwnPropDescs14 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols38 = Object.getOwnPropertySymbols;
var __hasOwnProp38 = Object.prototype.hasOwnProperty;
var __propIsEnum38 = Object.prototype.propertyIsEnumerable;
var __defNormalProp37 = (obj, key, value) => key in obj ? __defProp37(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues37 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp38.call(b2, prop))
      __defNormalProp37(a, prop, b2[prop]);
  if (__getOwnPropSymbols38)
    for (var prop of __getOwnPropSymbols38(b2)) {
      if (__propIsEnum38.call(b2, prop))
        __defNormalProp37(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps14 = (a, b2) => __defProps14(a, __getOwnPropDescs14(b2));
var __objRest22 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp38.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols38)
    for (var prop of __getOwnPropSymbols38(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum38.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var SelectScrollArea = (0, import_react42.forwardRef)((_a, ref) => {
  var _b = _a, { style } = _b, others = __objRest22(_b, ["style"]);
  return /* @__PURE__ */ import_react42.default.createElement(ScrollArea2, __spreadProps14(__spreadValues37({}, others), {
    style: __spreadValues37({ width: "100%" }, style),
    viewportRef: ref
  }), others.children);
});
SelectScrollArea.displayName = "@mantine/core/SelectScrollArea";

// node_modules/@mantine/core/esm/components/Select/SelectDropdown/SelectDropdown.styles.js
init_react();
var __defProp38 = Object.defineProperty;
var __defProps15 = Object.defineProperties;
var __getOwnPropDescs15 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols39 = Object.getOwnPropertySymbols;
var __hasOwnProp39 = Object.prototype.hasOwnProperty;
var __propIsEnum39 = Object.prototype.propertyIsEnumerable;
var __defNormalProp38 = (obj, key, value) => key in obj ? __defProp38(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues38 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp39.call(b2, prop))
      __defNormalProp38(a, prop, b2[prop]);
  if (__getOwnPropSymbols39)
    for (var prop of __getOwnPropSymbols39(b2)) {
      if (__propIsEnum39.call(b2, prop))
        __defNormalProp38(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps15 = (a, b2) => __defProps15(a, __getOwnPropDescs15(b2));
var useStyles16 = createStyles((theme, { native }) => ({
  dropdown: __spreadProps15(__spreadValues38({}, theme.fn.fontStyles()), {
    boxSizing: "border-box",
    pointerEvents: "auto",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]}`,
    padding: 4,
    overflowY: native ? "auto" : "hidden",
    overscrollBehaviorY: "contain",
    width: "100%"
  })
}));
var SelectDropdown_styles_default = useStyles16;

// node_modules/@mantine/core/esm/components/Popper/Popper.js
init_react();
var import_react46 = __toESM(require_react());

// node_modules/react-popper/lib/esm/index.js
init_react();

// node_modules/react-popper/lib/esm/utils.js
init_react();
var React29 = __toESM(require_react());
var fromEntries2 = function fromEntries3(entries) {
  return entries.reduce(function(acc, _ref) {
    var key = _ref[0], value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
var useIsomorphicLayoutEffect = typeof window !== "undefined" && window.document && window.document.createElement ? React29.useLayoutEffect : React29.useEffect;

// node_modules/react-popper/lib/esm/usePopper.js
init_react();
var React30 = __toESM(require_react());

// node_modules/@popperjs/core/lib/index.js
init_react();

// node_modules/@popperjs/core/lib/enums.js
init_react();
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
init_react();
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
init_react();
function getWindow(node2) {
  if (node2 == null) {
    return window;
  }
  if (node2.toString() !== "[object Window]") {
    var ownerDocument = node2.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node2;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node2) {
  var OwnElement = getWindow(node2).Element;
  return node2 instanceof OwnElement || node2 instanceof Element;
}
function isHTMLElement(node2) {
  var OwnElement = getWindow(node2).HTMLElement;
  return node2 instanceof OwnElement || node2 instanceof HTMLElement;
}
function isShadowRoot(node2) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node2).ShadowRoot;
  return node2 instanceof OwnElement || node2 instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/modifiers/arrow.js
init_react();

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
init_react();
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
init_react();

// node_modules/@popperjs/core/lib/utils/math.js
init_react();
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
init_react();
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next2 = child;
    do {
      if (next2 && parent.isSameNode(next2)) {
        return true;
      }
      next2 = next2.parentNode || next2.host;
    } while (next2);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
init_react();
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
init_react();
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
init_react();
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle2(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle2(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
init_react();
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/within.js
init_react();
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v2 = within(min2, value, max2);
  return v2 > max2 ? max2 : v2;
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
init_react();

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
init_react();
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
init_react();
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (true) {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
    }
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
init_react();

// node_modules/@popperjs/core/lib/utils/getVariation.js
init_react();
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x2 = _ref.x, y2 = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x2 * dpr) / dpr || 0,
    y: round(y2 * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position2 = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x2 = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y2 = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x: x2,
    y: y2
  }) : {
    x: x2,
    y: y2
  };
  x2 = _ref3.x;
  y2 = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle2(offsetParent).position !== "static" && position2 === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y2 -= offsetY - popperRect.height;
      y2 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x2 -= offsetX - popperRect.width;
      x2 *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position2
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x2,
    y: y2
  }) : {
    x: x2,
    y: y2
  };
  x2 = _ref4.x;
  y2 = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x2 + "px, " + y2 + "px)" : "translate3d(" + x2 + "px, " + y2 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y2 + "px" : "", _Object$assign2[sideX] = hasX ? x2 + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (true) {
    var transitionProperty = getComputedStyle2(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
init_react();
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/flip.js
init_react();

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
init_react();
var hash2 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
init_react();
var hash3 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash3[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
init_react();
function getWindowScroll(node2) {
  var win = getWindow(node2);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x2 = 0;
  var y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2 + getWindowScrollBarX(element),
    y: y2
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
init_react();
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x2 = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y2 = -winScroll.scrollTop;
  if (getComputedStyle2(body || html).direction === "rtl") {
    x2 += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
init_react();
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node2) {
  if (["html", "body", "#document"].indexOf(getNodeName(node2)) >= 0) {
    return node2.ownerDocument.body;
  }
  if (isHTMLElement(node2) && isScrollParent(node2)) {
    return node2;
  }
  return getScrollParent(getParentNode(node2));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
init_react();
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
init_react();
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
init_react();
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
    if (true) {
      console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
    }
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b2) {
    return overflows[a] - overflows[b2];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
init_react();
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
init_react();
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x2 = _data$state$placement.x, y2 = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x2;
    state.modifiersData.popperOffsets.y += y2;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
init_react();
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
init_react();

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
init_react();
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/createPopper.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
init_react();

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
init_react();
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node2) {
  if (node2 === getWindow(node2) || !isHTMLElement(node2)) {
    return getWindowScroll(node2);
  } else {
    return getHTMLElementScroll(node2);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
init_react();
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
init_react();
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/validateModifiers.js
init_react();

// node_modules/@popperjs/core/lib/utils/format.js
init_react();
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p2, c) {
    return p2.replace(/%s/, c);
  }, str);
}

// node_modules/@popperjs/core/lib/utils/validateModifiers.js
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s2) {
            return '"' + s2 + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

// node_modules/@popperjs/core/lib/utils/uniqueBy.js
init_react();
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier2 = fn2(item);
    if (!identifiers.has(identifier2)) {
      identifiers.add(identifier2);
      return true;
    }
  });
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
init_react();
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m2) {
          return m2.enabled;
        });
        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle2(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}

// node_modules/@popperjs/core/lib/popper.js
init_react();
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});

// node_modules/react-popper/lib/esm/usePopper.js
var import_react_fast_compare = __toESM(require_react_fast_compare());
var EMPTY_MODIFIERS = [];
var usePopper = function usePopper2(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }
  var prevOptions = React30.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || "bottom",
    strategy: options.strategy || "absolute",
    modifiers: options.modifiers || EMPTY_MODIFIERS
  };
  var _React$useState = React30.useState({
    styles: {
      popper: {
        position: optionsWithDefaults.strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), state = _React$useState[0], setState = _React$useState[1];
  var updateStateModifier = React30.useMemo(function() {
    return {
      name: "updateState",
      enabled: true,
      phase: "write",
      fn: function fn2(_ref) {
        var state2 = _ref.state;
        var elements = Object.keys(state2.elements);
        setState({
          styles: fromEntries2(elements.map(function(element) {
            return [element, state2.styles[element] || {}];
          })),
          attributes: fromEntries2(elements.map(function(element) {
            return [element, state2.attributes[element]];
          }))
        });
      },
      requires: ["computeStyles"]
    };
  }, []);
  var popperOptions = React30.useMemo(function() {
    var newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
        name: "applyStyles",
        enabled: false
      }])
    };
    if ((0, import_react_fast_compare.default)(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions;
    } else {
      prevOptions.current = newOptions;
      return newOptions;
    }
  }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
  var popperInstanceRef = React30.useRef();
  useIsomorphicLayoutEffect(function() {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions);
    }
  }, [popperOptions]);
  useIsomorphicLayoutEffect(function() {
    if (referenceElement == null || popperElement == null) {
      return;
    }
    var createPopper2 = options.createPopper || createPopper;
    var popperInstance = createPopper2(referenceElement, popperElement, popperOptions);
    popperInstanceRef.current = popperInstance;
    return function() {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    };
  }, [referenceElement, popperElement, options.createPopper]);
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
  };
};

// node_modules/@mantine/core/esm/components/Popper/parse-popper-position/parse-popper-position.js
init_react();
function parsePopperPosition(position2) {
  if (typeof position2 !== "string") {
    return { position: "top", placement: "center" };
  }
  const splitted = position2.split("-");
  if (splitted.length === 1) {
    return { position: position2, placement: "center" };
  }
  return { position: splitted[0], placement: splitted[1] };
}

// node_modules/@mantine/core/esm/components/Popper/PopperContainer/PopperContainer.js
init_react();
var import_react43 = __toESM(require_react());
function PopperContainer({
  children,
  zIndex = getDefaultZIndex("popover"),
  className,
  withinPortal = true
}) {
  if (withinPortal) {
    return /* @__PURE__ */ import_react43.default.createElement(Portal, {
      className,
      zIndex
    }, children);
  }
  return /* @__PURE__ */ import_react43.default.createElement("div", {
    className,
    style: { position: "relative", zIndex }
  }, children);
}
PopperContainer.displayName = "@mantine/core/PopperContainer";

// node_modules/@mantine/core/esm/components/Popper/Popper.styles.js
init_react();
var __defProp39 = Object.defineProperty;
var __defProps16 = Object.defineProperties;
var __getOwnPropDescs16 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols40 = Object.getOwnPropertySymbols;
var __hasOwnProp40 = Object.prototype.hasOwnProperty;
var __propIsEnum40 = Object.prototype.propertyIsEnumerable;
var __defNormalProp39 = (obj, key, value) => key in obj ? __defProp39(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues39 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp40.call(b2, prop))
      __defNormalProp39(a, prop, b2[prop]);
  if (__getOwnPropSymbols40)
    for (var prop of __getOwnPropSymbols40(b2)) {
      if (__propIsEnum40.call(b2, prop))
        __defNormalProp39(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps16 = (a, b2) => __defProps16(a, __getOwnPropDescs16(b2));
var horizontalPlacement = (arrowSize, distance, classes) => ({
  [`&.${classes.center}`]: {
    top: `calc(50% - ${arrowSize}px)`
  },
  [`&.${classes.end}`]: {
    bottom: arrowSize * distance
  },
  [`&.${classes.start}`]: {
    top: arrowSize * distance
  }
});
var verticalPlacement = (arrowSize, distance, classes, theme) => ({
  [`&.${classes.center}`]: {
    left: `calc(50% - ${arrowSize}px)`
  },
  [`&.${classes.end}`]: {
    right: theme.dir === "ltr" ? arrowSize * distance : void 0,
    left: theme.dir === "rtl" ? arrowSize * distance : void 0
  },
  [`&.${classes.start}`]: {
    left: theme.dir === "ltr" ? arrowSize * distance : void 0,
    right: theme.dir === "rtl" ? arrowSize * distance : void 0
  }
});
var useStyles17 = createStyles((theme, { arrowSize, arrowDistance }, getRef2) => {
  const center = { ref: getRef2("center") };
  const start2 = { ref: getRef2("start") };
  const end2 = { ref: getRef2("end") };
  const placementClasses = {
    center: center.ref,
    start: start2.ref,
    end: end2.ref
  };
  return {
    center,
    start: start2,
    end: end2,
    arrow: {
      width: arrowSize * 2,
      height: arrowSize * 2,
      position: "absolute",
      transform: "rotate(45deg)",
      border: "1px solid transparent",
      zIndex: 1
    },
    left: __spreadProps16(__spreadValues39({}, horizontalPlacement(arrowSize, arrowDistance, placementClasses)), {
      right: theme.dir === "ltr" ? -arrowSize : "unset",
      left: theme.dir === "rtl" ? -arrowSize : "unset",
      borderLeft: theme.dir === "ltr" ? 0 : void 0,
      borderRight: theme.dir === "rtl" ? 0 : void 0,
      borderBottom: 0
    }),
    right: __spreadProps16(__spreadValues39({}, horizontalPlacement(arrowSize, arrowDistance, placementClasses)), {
      left: theme.dir === "ltr" ? -arrowSize : "unset",
      right: theme.dir === "rtl" ? -arrowSize : "unset",
      borderRight: theme.dir === "ltr" ? 0 : void 0,
      borderLeft: theme.dir === "rtl" ? 0 : void 0,
      borderTop: 0
    }),
    top: __spreadProps16(__spreadValues39({}, verticalPlacement(arrowSize, arrowDistance, placementClasses, theme)), {
      bottom: -arrowSize,
      borderLeft: theme.dir === "ltr" ? 0 : void 0,
      borderRight: theme.dir === "rtl" ? 0 : void 0,
      borderTop: 0
    }),
    bottom: __spreadProps16(__spreadValues39({}, verticalPlacement(arrowSize, arrowDistance, placementClasses, theme)), {
      top: -arrowSize,
      borderRight: theme.dir === "ltr" ? 0 : void 0,
      borderLeft: theme.dir === "rtl" ? 0 : void 0,
      borderBottom: 0
    })
  };
});
var Popper_styles_default = useStyles17;

// node_modules/@mantine/core/esm/components/Transition/Transition.js
init_react();
var import_react45 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Transition/get-transition-styles/get-transition-styles.js
init_react();
var __defProp40 = Object.defineProperty;
var __getOwnPropSymbols41 = Object.getOwnPropertySymbols;
var __hasOwnProp41 = Object.prototype.hasOwnProperty;
var __propIsEnum41 = Object.prototype.propertyIsEnumerable;
var __defNormalProp40 = (obj, key, value) => key in obj ? __defProp40(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues40 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp41.call(b2, prop))
      __defNormalProp40(a, prop, b2[prop]);
  if (__getOwnPropSymbols41)
    for (var prop of __getOwnPropSymbols41(b2)) {
      if (__propIsEnum41.call(b2, prop))
        __defNormalProp40(a, prop, b2[prop]);
    }
  return a;
};
var transitionStatuses = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function getTransitionStyles({
  transition,
  state,
  duration,
  timingFunction
}) {
  const shared = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction
  };
  if (typeof transition === "string") {
    if (!(transition in transitions)) {
      return null;
    }
    return __spreadValues40(__spreadValues40(__spreadValues40({
      transitionProperty: transitions[transition].transitionProperty
    }, shared), transitions[transition].common), transitions[transition][transitionStatuses[state]]);
  }
  return __spreadValues40(__spreadValues40(__spreadValues40({
    transitionProperty: transition.transitionProperty
  }, shared), transition.common), transition[transitionStatuses[state]]);
}

// node_modules/@mantine/core/esm/components/Transition/use-transition.js
init_react();
var import_react44 = __toESM(require_react());
function useTransition({
  duration,
  exitDuration,
  timingFunction,
  mounted,
  onEnter,
  onExit,
  onEntered,
  onExited
}) {
  const theme = useMantineTheme();
  const reduceMotion = useReducedMotion();
  const [transitionStatus, setStatus] = (0, import_react44.useState)(mounted ? "entered" : "exited");
  const [transitionDuration, setTransitionDuration] = (0, import_react44.useState)(reduceMotion ? 0 : duration);
  const timeoutRef = (0, import_react44.useRef)(-1);
  const handleStateChange = (shouldMount) => {
    const preHandler = shouldMount ? onEnter : onExit;
    const handler = shouldMount ? onEntered : onExited;
    setStatus(shouldMount ? "pre-entering" : "pre-exiting");
    window.clearTimeout(timeoutRef.current);
    const _duration = reduceMotion ? 0 : shouldMount ? duration : exitDuration;
    setTransitionDuration(_duration);
    if (_duration === 0) {
      typeof preHandler === "function" && preHandler();
      typeof handler === "function" && handler();
      setStatus(shouldMount ? "entered" : "exited");
    } else {
      const preStateTimeout = window.setTimeout(() => {
        typeof preHandler === "function" && preHandler();
        setStatus(shouldMount ? "entering" : "exiting");
      }, 10);
      timeoutRef.current = window.setTimeout(() => {
        window.clearTimeout(preStateTimeout);
        typeof handler === "function" && handler();
        setStatus(shouldMount ? "entered" : "exited");
      }, _duration);
    }
  };
  useDidUpdate(() => {
    handleStateChange(mounted);
  }, [mounted]);
  (0, import_react44.useEffect)(() => () => window.clearTimeout(timeoutRef.current), []);
  return {
    transitionDuration,
    transitionStatus,
    transitionTimingFunction: timingFunction || theme.transitionTimingFunction
  };
}

// node_modules/@mantine/core/esm/components/Transition/Transition.js
function Transition({
  transition,
  duration = 250,
  exitDuration = duration,
  mounted,
  children,
  timingFunction,
  onExit,
  onEntered,
  onEnter,
  onExited
}) {
  const { transitionDuration, transitionStatus, transitionTimingFunction } = useTransition({
    mounted,
    exitDuration,
    duration,
    timingFunction,
    onExit,
    onEntered,
    onEnter,
    onExited
  });
  if (transitionDuration === 0) {
    return mounted ? /* @__PURE__ */ import_react45.default.createElement(import_react45.default.Fragment, null, children({})) : null;
  }
  return transitionStatus === "exited" ? null : /* @__PURE__ */ import_react45.default.createElement(import_react45.default.Fragment, null, children(getTransitionStyles({
    transition,
    duration: transitionDuration,
    state: transitionStatus,
    timingFunction: transitionTimingFunction
  })));
}
Transition.displayName = "@mantine/core/Transition";

// node_modules/@mantine/core/esm/components/Popper/Popper.js
var __defProp41 = Object.defineProperty;
var __defProps17 = Object.defineProperties;
var __getOwnPropDescs17 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols42 = Object.getOwnPropertySymbols;
var __hasOwnProp42 = Object.prototype.hasOwnProperty;
var __propIsEnum42 = Object.prototype.propertyIsEnumerable;
var __defNormalProp41 = (obj, key, value) => key in obj ? __defProp41(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues41 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp42.call(b2, prop))
      __defNormalProp41(a, prop, b2[prop]);
  if (__getOwnPropSymbols42)
    for (var prop of __getOwnPropSymbols42(b2)) {
      if (__propIsEnum42.call(b2, prop))
        __defNormalProp41(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps17 = (a, b2) => __defProps17(a, __getOwnPropDescs17(b2));
function flipPlacement(placement, dir) {
  if (placement === "center") {
    return placement;
  }
  if (dir === "rtl") {
    if (placement === "end") {
      return "start";
    }
    return "end";
  }
  return placement;
}
function flipPosition(position2, dir) {
  if (position2 === "top" || position2 === "bottom") {
    return position2;
  }
  if (dir === "rtl") {
    if (position2 === "left") {
      return "right";
    }
    return "left";
  }
  return position2;
}
function Popper({
  position: position2 = "top",
  placement = "center",
  gutter = 5,
  arrowSize = 2,
  arrowDistance = 2,
  withArrow = false,
  referenceElement,
  children,
  mounted,
  transition = "pop-top-left",
  transitionDuration,
  exitTransitionDuration = transitionDuration,
  transitionTimingFunction,
  arrowClassName,
  arrowStyle,
  zIndex = getDefaultZIndex("popover"),
  forceUpdateDependencies = [],
  modifiers = [],
  onTransitionEnd,
  withinPortal = true
}) {
  var _a;
  const padding = withArrow ? gutter + arrowSize : gutter;
  const { classes, cx, theme } = Popper_styles_default({ arrowSize, arrowDistance }, { name: "Popper" });
  const [popperElement, setPopperElement] = (0, import_react46.useState)(null);
  const _placement = flipPlacement(placement, theme.dir);
  const _position = flipPosition(position2, theme.dir);
  const initialPlacement = _placement === "center" ? _position : `${_position}-${_placement}`;
  const { styles: styles2, attributes, forceUpdate } = usePopper(referenceElement, popperElement, {
    placement: initialPlacement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, padding]
        }
      },
      ...modifiers
    ]
  });
  const parsedAttributes = parsePopperPosition((_a = attributes.popper) == null ? void 0 : _a["data-popper-placement"]);
  useDidUpdate(() => {
    typeof forceUpdate === "function" && forceUpdate();
  }, forceUpdateDependencies);
  return /* @__PURE__ */ import_react46.default.createElement(Transition, {
    mounted: mounted && !!referenceElement,
    duration: transitionDuration,
    exitDuration: exitTransitionDuration,
    transition,
    timingFunction: transitionTimingFunction,
    onExited: onTransitionEnd
  }, (transitionStyles) => /* @__PURE__ */ import_react46.default.createElement("div", null, /* @__PURE__ */ import_react46.default.createElement(PopperContainer, {
    withinPortal,
    zIndex
  }, /* @__PURE__ */ import_react46.default.createElement("div", __spreadValues41({
    ref: setPopperElement,
    style: __spreadProps17(__spreadValues41({}, styles2.popper), { pointerEvents: "none" })
  }, attributes.popper), /* @__PURE__ */ import_react46.default.createElement("div", {
    style: transitionStyles
  }, children, withArrow && /* @__PURE__ */ import_react46.default.createElement("div", {
    style: arrowStyle,
    className: cx(classes.arrow, classes[parsedAttributes.placement], classes[parsedAttributes.position], arrowClassName)
  }))))));
}
Popper.displayName = "@mantine/core/Popper";

// node_modules/@mantine/core/esm/components/Select/SelectDropdown/SelectDropdown.js
var SelectDropdown = (0, import_react47.forwardRef)(({
  mounted,
  transition,
  transitionDuration,
  transitionTimingFunction,
  uuid,
  shadow,
  maxDropdownHeight,
  withinPortal = true,
  children,
  classNames,
  styles: styles2,
  dropdownComponent,
  referenceElement,
  direction = "column",
  onDirectionChange,
  switchDirectionOnFlip = false,
  zIndex = getDefaultZIndex("popover"),
  dropdownPosition = "flip",
  __staticSelector
}, ref) => {
  const { classes } = SelectDropdown_styles_default({ native: dropdownComponent !== SelectScrollArea }, { classNames, styles: styles2, name: __staticSelector });
  const previousPlacement = (0, import_react47.useRef)("bottom");
  return /* @__PURE__ */ import_react47.default.createElement(Popper, {
    referenceElement,
    mounted,
    transition,
    transitionDuration,
    exitTransitionDuration: 0,
    transitionTimingFunction,
    position: dropdownPosition === "flip" ? "bottom" : dropdownPosition,
    withinPortal,
    zIndex,
    modifiers: [
      {
        name: "preventOverflow",
        enabled: false
      },
      {
        name: "flip",
        enabled: dropdownPosition === "flip"
      },
      {
        name: "sameWidth",
        enabled: true,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: ({ state }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        effect: ({ state }) => {
          state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
        }
      },
      {
        name: "directionControl",
        enabled: true,
        phase: "main",
        fn: ({ state }) => {
          if (previousPlacement.current !== state.placement) {
            previousPlacement.current = state.placement;
            const nextDirection = state.placement === "top" ? "column-reverse" : "column";
            if (direction !== nextDirection && switchDirectionOnFlip) {
              onDirectionChange && onDirectionChange(nextDirection);
            }
          }
        }
      }
    ]
  }, /* @__PURE__ */ import_react47.default.createElement("div", {
    style: { maxHeight: maxDropdownHeight, display: "flex" }
  }, /* @__PURE__ */ import_react47.default.createElement(Paper, {
    radius: "sm",
    component: dropdownComponent || "div",
    id: `${uuid}-items`,
    "aria-labelledby": `${uuid}-label`,
    role: "listbox",
    className: classes.dropdown,
    shadow,
    ref,
    onMouseDown: (event) => event.preventDefault()
  }, /* @__PURE__ */ import_react47.default.createElement("div", {
    style: { display: "flex", flexDirection: direction, width: "100%" }
  }, children))));
});
SelectDropdown.displayName = "@mantine/core/SelectDropdown";

// node_modules/@mantine/core/esm/components/Select/SelectItems/SelectItems.js
init_react();
var import_react49 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Divider/Divider.js
init_react();
var import_react48 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Divider/Divider.styles.js
init_react();
var sizes4 = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5
};
var useStyles18 = createStyles((theme, { size: size2, variant, color }) => ({
  withLabel: {
    borderTop: "0 !important"
  },
  left: {
    "&::before": {
      display: "none"
    }
  },
  right: {
    "&::after": {
      display: "none"
    }
  },
  label: {
    display: "flex",
    alignItems: "center",
    color: color === "dark" ? theme.colors.dark[1] : theme.fn.themeColor(color, 6),
    "&::before": {
      content: '""',
      flex: 1,
      height: 1,
      borderTop: `${theme.fn.size({ size: size2, sizes: sizes4 })}px ${variant} ${theme.fn.themeColor(color, theme.colorScheme === "dark" ? 3 : 4)}`,
      marginRight: theme.spacing.xs
    },
    "&::after": {
      content: '""',
      flex: 1,
      borderTop: `${theme.fn.size({ size: size2, sizes: sizes4 })}px ${variant} ${theme.fn.themeColor(color, theme.colorScheme === "dark" ? 3 : 4)}`,
      marginLeft: theme.spacing.xs
    }
  },
  horizontal: {
    border: 0,
    borderTopWidth: theme.fn.size({ size: size2, sizes: sizes4 }),
    borderTopColor: theme.fn.themeColor(color, theme.colorScheme === "dark" ? 3 : 4),
    borderTopStyle: variant,
    margin: 0
  },
  vertical: {
    border: 0,
    alignSelf: "stretch",
    height: "100%",
    borderLeftWidth: theme.fn.size({ size: size2, sizes: sizes4 }),
    borderLeftColor: theme.fn.themeColor(color, 4),
    borderLeftStyle: variant
  }
}));
var Divider_styles_default = useStyles18;

// node_modules/@mantine/core/esm/components/Divider/Divider.js
var __defProp42 = Object.defineProperty;
var __defProps18 = Object.defineProperties;
var __getOwnPropDescs18 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols43 = Object.getOwnPropertySymbols;
var __hasOwnProp43 = Object.prototype.hasOwnProperty;
var __propIsEnum43 = Object.prototype.propertyIsEnumerable;
var __defNormalProp42 = (obj, key, value) => key in obj ? __defProp42(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues42 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp43.call(b2, prop))
      __defNormalProp42(a, prop, b2[prop]);
  if (__getOwnPropSymbols43)
    for (var prop of __getOwnPropSymbols43(b2)) {
      if (__propIsEnum43.call(b2, prop))
        __defNormalProp42(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps18 = (a, b2) => __defProps18(a, __getOwnPropDescs18(b2));
var __objRest23 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp43.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols43)
    for (var prop of __getOwnPropSymbols43(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum43.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps16 = {
  orientation: "horizontal",
  size: "xs",
  labelPosition: "left",
  variant: "solid"
};
var Divider = (0, import_react48.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Divider", defaultProps16, props), {
    className,
    color,
    orientation,
    size: size2,
    label,
    labelPosition,
    labelProps,
    variant,
    styles: styles2,
    classNames
  } = _a, others = __objRest23(_a, [
    "className",
    "color",
    "orientation",
    "size",
    "label",
    "labelPosition",
    "labelProps",
    "variant",
    "styles",
    "classNames"
  ]);
  const theme = useMantineTheme();
  const _color = color || (theme.colorScheme === "dark" ? "dark" : "gray");
  const { classes, cx } = Divider_styles_default({ color: _color, size: size2, variant }, { classNames, styles: styles2, name: "Divider" });
  const vertical = orientation === "vertical";
  const horizontal = !vertical;
  const withLabel = !!label && horizontal;
  return /* @__PURE__ */ import_react48.default.createElement(Box, __spreadValues42({
    ref,
    className: cx({
      [classes.vertical]: vertical,
      [classes.horizontal]: horizontal,
      [classes.withLabel]: withLabel
    }, className)
  }, others), !!label && horizontal && /* @__PURE__ */ import_react48.default.createElement(Text, __spreadProps18(__spreadValues42({}, labelProps), {
    color: _color,
    size: (labelProps == null ? void 0 : labelProps.size) || "xs",
    sx: { marginTop: 2 },
    className: cx(classes.label, classes[labelPosition])
  }), label));
});
Divider.displayName = "@mantine/core/Divider";

// node_modules/@mantine/core/esm/components/Select/SelectItems/SelectItems.styles.js
init_react();
var useStyles19 = createStyles((theme, { size: size2 }) => ({
  item: {
    boxSizing: "border-box",
    textAlign: "left",
    width: "100%",
    padding: `${theme.fn.size({ size: size2, sizes: theme.spacing }) / 1.5}px ${theme.fn.size({
      size: size2,
      sizes: theme.spacing
    })}px`,
    cursor: "pointer",
    fontSize: theme.fn.size({ size: size2, sizes: theme.fontSizes }),
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    borderRadius: theme.radius.sm
  },
  selected: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors[theme.primaryColor][0],
    color: theme.colorScheme === "dark" ? theme.white : theme.colors[theme.primaryColor][9]
  },
  hovered: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
  },
  nothingFound: {
    boxSizing: "border-box",
    color: theme.colors.gray[6],
    paddingTop: theme.fn.size({ size: size2, sizes: theme.spacing }) / 2,
    paddingBottom: theme.fn.size({ size: size2, sizes: theme.spacing }) / 2,
    textAlign: "center"
  },
  disabled: {
    cursor: "default",
    color: theme.colors.dark[2]
  },
  separator: {
    boxSizing: "border-box",
    textAlign: "left",
    width: "100%",
    padding: `${theme.fn.size({ size: size2, sizes: theme.spacing }) / 1.5}px ${theme.fn.size({
      size: size2,
      sizes: theme.spacing
    })}px`
  },
  separatorLabel: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
  }
}));
var SelectItems_styles_default = useStyles19;

// node_modules/@mantine/core/esm/components/Select/SelectItems/SelectItems.js
var __defProp43 = Object.defineProperty;
var __getOwnPropSymbols44 = Object.getOwnPropertySymbols;
var __hasOwnProp44 = Object.prototype.hasOwnProperty;
var __propIsEnum44 = Object.prototype.propertyIsEnumerable;
var __defNormalProp43 = (obj, key, value) => key in obj ? __defProp43(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues43 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp44.call(b2, prop))
      __defNormalProp43(a, prop, b2[prop]);
  if (__getOwnPropSymbols44)
    for (var prop of __getOwnPropSymbols44(b2)) {
      if (__propIsEnum44.call(b2, prop))
        __defNormalProp43(a, prop, b2[prop]);
    }
  return a;
};
function SelectItems({
  data,
  hovered,
  classNames,
  styles: styles2,
  isItemSelected,
  uuid,
  __staticSelector,
  onItemHover,
  onItemSelect,
  itemsRefs,
  itemComponent: Item,
  size: size2,
  nothingFound,
  creatable,
  createLabel
}) {
  const { classes, cx } = SelectItems_styles_default({ size: size2 }, { classNames, styles: styles2, name: __staticSelector });
  const unGroupedItems = [];
  const groupedItems = [];
  let creatableDataIndex = null;
  const constructItemComponent = (item, index) => {
    const selected = typeof isItemSelected === "function" ? isItemSelected(item.value) : false;
    return /* @__PURE__ */ import_react49.default.createElement(Item, __spreadValues43({
      key: item.value,
      className: cx(classes.item, {
        [classes.hovered]: !item.disabled && hovered === index,
        [classes.selected]: !item.disabled && selected,
        [classes.disabled]: item.disabled
      }),
      onMouseEnter: () => onItemHover(index),
      id: `${uuid}-${index}`,
      role: "option",
      tabIndex: -1,
      "aria-selected": hovered === index,
      ref: (node2) => {
        if (itemsRefs && itemsRefs.current) {
          itemsRefs.current[item.value] = node2;
        }
      },
      onMouseDown: !item.disabled ? (event) => {
        event.preventDefault();
        onItemSelect(item);
      } : null,
      disabled: item.disabled
    }, item));
  };
  let groupName = null;
  data.forEach((item, index) => {
    if (item.creatable) {
      creatableDataIndex = index;
    } else if (!item.group) {
      unGroupedItems.push(constructItemComponent(item, index));
    } else {
      if (groupName !== item.group) {
        groupName = item.group;
        groupedItems.push(/* @__PURE__ */ import_react49.default.createElement("div", {
          className: classes.separator,
          key: index
        }, /* @__PURE__ */ import_react49.default.createElement(Divider, {
          classNames: { label: classes.separatorLabel },
          label: item.group
        })));
      }
      groupedItems.push(constructItemComponent(item, index));
    }
  });
  if (creatable) {
    const creatableDataItem = data[creatableDataIndex];
    const selected = typeof isItemSelected === "function" ? isItemSelected(data[creatableDataIndex].value) : false;
    unGroupedItems.push(/* @__PURE__ */ import_react49.default.createElement("div", {
      key: creatableDataItem.value,
      className: cx(classes.item, {
        [classes.hovered]: hovered === creatableDataIndex,
        [classes.selected]: selected
      }),
      onMouseEnter: () => onItemHover(creatableDataIndex),
      onMouseDown: (event) => {
        event.preventDefault();
        onItemSelect(creatableDataItem);
      },
      tabIndex: -1,
      ref: (node2) => {
        if (itemsRefs && itemsRefs.current) {
          itemsRefs.current[creatableDataItem.value] = node2;
        }
      }
    }, createLabel));
  }
  if (groupedItems.length > 0 && unGroupedItems.length > 0) {
    unGroupedItems.unshift(/* @__PURE__ */ import_react49.default.createElement("div", {
      className: classes.separator
    }, /* @__PURE__ */ import_react49.default.createElement(Divider, null)));
  }
  return groupedItems.length > 0 || unGroupedItems.length > 0 ? /* @__PURE__ */ import_react49.default.createElement(import_react49.default.Fragment, null, groupedItems, unGroupedItems) : /* @__PURE__ */ import_react49.default.createElement(Text, {
    size: size2,
    className: classes.nothingFound
  }, nothingFound);
}
SelectItems.displayName = "@mantine/core/SelectItems";

// node_modules/@mantine/core/esm/components/Select/DefaultItem/DefaultItem.js
init_react();
var import_react50 = __toESM(require_react());
var __defProp44 = Object.defineProperty;
var __getOwnPropSymbols45 = Object.getOwnPropertySymbols;
var __hasOwnProp45 = Object.prototype.hasOwnProperty;
var __propIsEnum45 = Object.prototype.propertyIsEnumerable;
var __defNormalProp44 = (obj, key, value) => key in obj ? __defProp44(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues44 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp45.call(b2, prop))
      __defNormalProp44(a, prop, b2[prop]);
  if (__getOwnPropSymbols45)
    for (var prop of __getOwnPropSymbols45(b2)) {
      if (__propIsEnum45.call(b2, prop))
        __defNormalProp44(a, prop, b2[prop]);
    }
  return a;
};
var __objRest24 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp45.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols45)
    for (var prop of __getOwnPropSymbols45(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum45.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var DefaultItem = (0, import_react50.forwardRef)((_a, ref) => {
  var _b = _a, { label, value } = _b, others = __objRest24(_b, ["label", "value"]);
  return /* @__PURE__ */ import_react50.default.createElement("div", __spreadValues44({
    ref
  }, others), label || value);
});
DefaultItem.displayName = "@mantine/core/DefaultItem";

// node_modules/@mantine/core/esm/components/InputWrapper/InputWrapper.js
init_react();
var import_react51 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/InputWrapper/InputWrapper.styles.js
init_react();
var __defProp45 = Object.defineProperty;
var __defProps19 = Object.defineProperties;
var __getOwnPropDescs19 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols46 = Object.getOwnPropertySymbols;
var __hasOwnProp46 = Object.prototype.hasOwnProperty;
var __propIsEnum46 = Object.prototype.propertyIsEnumerable;
var __defNormalProp45 = (obj, key, value) => key in obj ? __defProp45(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues45 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp46.call(b2, prop))
      __defNormalProp45(a, prop, b2[prop]);
  if (__getOwnPropSymbols46)
    for (var prop of __getOwnPropSymbols46(b2)) {
      if (__propIsEnum46.call(b2, prop))
        __defNormalProp45(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps19 = (a, b2) => __defProps19(a, __getOwnPropDescs19(b2));
var useStyles20 = createStyles((theme, { size: size2 }) => ({
  root: __spreadProps19(__spreadValues45({}, theme.fn.fontStyles()), {
    lineHeight: theme.lineHeight
  }),
  label: {
    display: "inline-block",
    marginBottom: 4,
    fontSize: theme.fn.size({ size: size2, sizes: theme.fontSizes }),
    fontWeight: 500,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[9],
    wordBreak: "break-word",
    cursor: "default",
    WebkitTapHighlightColor: "transparent"
  },
  error: {
    marginTop: theme.spacing.xs / 2,
    wordBreak: "break-word",
    color: `${theme.colors.red[theme.colorScheme === "dark" ? 6 : 7]} !important`
  },
  description: {
    marginTop: -3,
    marginBottom: 7,
    wordBreak: "break-word",
    color: `${theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6]} !important`,
    fontSize: `${theme.fn.size({ size: size2, sizes: theme.fontSizes }) - 2}px !important`,
    lineHeight: 1.2
  },
  required: {
    color: theme.colorScheme === "dark" ? theme.colors.red[5] : theme.colors.red[7]
  }
}));
var InputWrapper_styles_default = useStyles20;

// node_modules/@mantine/core/esm/components/InputWrapper/InputWrapper.js
var __defProp46 = Object.defineProperty;
var __defProps20 = Object.defineProperties;
var __getOwnPropDescs20 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols47 = Object.getOwnPropertySymbols;
var __hasOwnProp47 = Object.prototype.hasOwnProperty;
var __propIsEnum47 = Object.prototype.propertyIsEnumerable;
var __defNormalProp46 = (obj, key, value) => key in obj ? __defProp46(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues46 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp47.call(b2, prop))
      __defNormalProp46(a, prop, b2[prop]);
  if (__getOwnPropSymbols47)
    for (var prop of __getOwnPropSymbols47(b2)) {
      if (__propIsEnum47.call(b2, prop))
        __defNormalProp46(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps20 = (a, b2) => __defProps20(a, __getOwnPropDescs20(b2));
var __objRest25 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp47.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols47)
    for (var prop of __getOwnPropSymbols47(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum47.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps17 = {
  labelElement: "label",
  size: "sm",
  __staticSelector: "InputWrapper"
};
var InputWrapper = (0, import_react51.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("InputWrapper", defaultProps17, props), {
    className,
    label,
    children,
    required,
    id,
    error,
    description,
    labelElement,
    labelProps,
    descriptionProps,
    errorProps,
    classNames,
    styles: styles2,
    size: size2,
    __staticSelector
  } = _a, others = __objRest25(_a, [
    "className",
    "label",
    "children",
    "required",
    "id",
    "error",
    "description",
    "labelElement",
    "labelProps",
    "descriptionProps",
    "errorProps",
    "classNames",
    "styles",
    "size",
    "__staticSelector"
  ]);
  const { classes, cx } = InputWrapper_styles_default({ size: size2 }, { classNames, styles: styles2, name: __staticSelector });
  const _labelProps = labelElement === "label" ? { htmlFor: id } : {};
  const inputLabel = (0, import_react51.createElement)(labelElement, __spreadProps20(__spreadValues46(__spreadValues46({}, _labelProps), labelProps), {
    id: id ? `${id}-label` : void 0,
    className: classes.label
  }), /* @__PURE__ */ import_react51.default.createElement(import_react51.default.Fragment, null, label, required && /* @__PURE__ */ import_react51.default.createElement("span", {
    className: classes.required
  }, " *")));
  return /* @__PURE__ */ import_react51.default.createElement(Box, __spreadValues46({
    className: cx(classes.root, className),
    ref
  }, others), label && inputLabel, description && /* @__PURE__ */ import_react51.default.createElement(Text, __spreadProps20(__spreadValues46({}, descriptionProps), {
    color: "gray",
    className: classes.description
  }), description), children, typeof error !== "boolean" && error && /* @__PURE__ */ import_react51.default.createElement(Text, __spreadProps20(__spreadValues46({}, errorProps), {
    size: size2,
    className: classes.error
  }), error));
});
InputWrapper.displayName = "@mantine/core/InputWrapper";

// node_modules/@mantine/core/esm/components/Input/Input.js
init_react();
var import_react52 = __toESM(require_react());
var __defProp47 = Object.defineProperty;
var __defProps21 = Object.defineProperties;
var __getOwnPropDescs21 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols48 = Object.getOwnPropertySymbols;
var __hasOwnProp48 = Object.prototype.hasOwnProperty;
var __propIsEnum48 = Object.prototype.propertyIsEnumerable;
var __defNormalProp47 = (obj, key, value) => key in obj ? __defProp47(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues47 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp48.call(b2, prop))
      __defNormalProp47(a, prop, b2[prop]);
  if (__getOwnPropSymbols48)
    for (var prop of __getOwnPropSymbols48(b2)) {
      if (__propIsEnum48.call(b2, prop))
        __defNormalProp47(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps21 = (a, b2) => __defProps21(a, __getOwnPropDescs21(b2));
var __objRest26 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp48.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols48)
    for (var prop of __getOwnPropSymbols48(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum48.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps18 = {
  rightSectionWidth: 36,
  size: "sm",
  __staticSelector: "Input"
};
var Input = (0, import_react52.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Input", defaultProps18, props), {
    component,
    className,
    invalid,
    required,
    disabled,
    variant,
    icon,
    style,
    rightSectionWidth,
    iconWidth,
    rightSection,
    rightSectionProps,
    radius: radius2,
    size: size2,
    wrapperProps,
    classNames,
    styles: styles2,
    __staticSelector,
    multiline,
    sx
  } = _a, others = __objRest26(_a, [
    "component",
    "className",
    "invalid",
    "required",
    "disabled",
    "variant",
    "icon",
    "style",
    "rightSectionWidth",
    "iconWidth",
    "rightSection",
    "rightSectionProps",
    "radius",
    "size",
    "wrapperProps",
    "classNames",
    "styles",
    "__staticSelector",
    "multiline",
    "sx"
  ]);
  const theme = useMantineTheme();
  const _variant = variant || (theme.colorScheme === "dark" ? "filled" : "default");
  const { classes, cx } = Input_styles_default({
    radius: radius2,
    size: size2,
    multiline,
    variant: _variant,
    invalid,
    rightSectionWidth,
    iconWidth,
    withRightSection: !!rightSection
  }, { classNames, styles: styles2, name: __staticSelector });
  const { systemStyles, rest } = extractSystemStyles(others);
  const Element2 = component || "input";
  return /* @__PURE__ */ import_react52.default.createElement(Box, __spreadValues47(__spreadValues47({
    className: cx(classes.wrapper, className),
    sx,
    style
  }, systemStyles), wrapperProps), icon && /* @__PURE__ */ import_react52.default.createElement("div", {
    className: classes.icon
  }, icon), /* @__PURE__ */ import_react52.default.createElement(Element2, __spreadProps21(__spreadValues47({}, rest), {
    ref,
    required,
    "aria-invalid": invalid,
    disabled,
    className: cx(classes[`${_variant}Variant`], classes.input, {
      [classes.withIcon]: icon,
      [classes.invalid]: invalid,
      [classes.disabled]: disabled
    })
  })), rightSection && /* @__PURE__ */ import_react52.default.createElement("div", __spreadProps21(__spreadValues47({}, rightSectionProps), {
    className: classes.rightSection
  }), rightSection));
});
Input.displayName = "@mantine/core/Input";

// node_modules/@mantine/core/esm/components/Portal/OptionalPortal.js
init_react();
var import_react53 = __toESM(require_react());
var __defProp48 = Object.defineProperty;
var __getOwnPropSymbols49 = Object.getOwnPropertySymbols;
var __hasOwnProp49 = Object.prototype.hasOwnProperty;
var __propIsEnum49 = Object.prototype.propertyIsEnumerable;
var __defNormalProp48 = (obj, key, value) => key in obj ? __defProp48(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues48 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp49.call(b2, prop))
      __defNormalProp48(a, prop, b2[prop]);
  if (__getOwnPropSymbols49)
    for (var prop of __getOwnPropSymbols49(b2)) {
      if (__propIsEnum49.call(b2, prop))
        __defNormalProp48(a, prop, b2[prop]);
    }
  return a;
};
var __objRest27 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp49.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols49)
    for (var prop of __getOwnPropSymbols49(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum49.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function OptionalPortal(_a) {
  var _b = _a, { withinPortal = true, children } = _b, others = __objRest27(_b, ["withinPortal", "children"]);
  if (withinPortal) {
    return /* @__PURE__ */ import_react53.default.createElement(Portal, __spreadValues48({}, others), children);
  }
  return /* @__PURE__ */ import_react53.default.createElement(import_react53.default.Fragment, null, children);
}
OptionalPortal.displayName = "@mantine/core/OptionalPortal";

// node_modules/@mantine/core/esm/components/Transition/GroupedTransition.js
init_react();
var import_react54 = __toESM(require_react());
function GroupedTransition({
  transitions: transitions2,
  duration = 250,
  exitDuration = duration,
  mounted,
  children,
  timingFunction,
  onExit,
  onEntered,
  onEnter,
  onExited
}) {
  const { transitionDuration, transitionStatus, transitionTimingFunction } = useTransition({
    mounted,
    duration,
    exitDuration,
    timingFunction,
    onExit,
    onEntered,
    onEnter,
    onExited
  });
  if (transitionDuration === 0) {
    return mounted ? /* @__PURE__ */ import_react54.default.createElement(import_react54.default.Fragment, null, children({})) : null;
  }
  if (transitionStatus === "exited") {
    return null;
  }
  const transitionsStyles = Object.keys(transitions2).reduce((acc, transition) => {
    acc[transition] = getTransitionStyles({
      duration: transitions2[transition].duration,
      transition: transitions2[transition].transition,
      timingFunction: transitions2[transition].timingFunction || transitionTimingFunction,
      state: transitionStatus
    });
    return acc;
  }, {});
  return /* @__PURE__ */ import_react54.default.createElement(import_react54.default.Fragment, null, children(transitionsStyles));
}
GroupedTransition.displayName = "@mantine/core/GroupedTransition";

// node_modules/@mantine/core/esm/components/Overlay/Overlay.js
init_react();
var import_react55 = __toESM(require_react());
var __defProp49 = Object.defineProperty;
var __defProps22 = Object.defineProperties;
var __getOwnPropDescs22 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols50 = Object.getOwnPropertySymbols;
var __hasOwnProp50 = Object.prototype.hasOwnProperty;
var __propIsEnum50 = Object.prototype.propertyIsEnumerable;
var __defNormalProp49 = (obj, key, value) => key in obj ? __defProp49(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues49 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp50.call(b2, prop))
      __defNormalProp49(a, prop, b2[prop]);
  if (__getOwnPropSymbols50)
    for (var prop of __getOwnPropSymbols50(b2)) {
      if (__propIsEnum50.call(b2, prop))
        __defNormalProp49(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps22 = (a, b2) => __defProps22(a, __getOwnPropDescs22(b2));
var __objRest28 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp50.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols50)
    for (var prop of __getOwnPropSymbols50(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum50.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps19 = {
  opacity: 0.6,
  color: "#fff",
  zIndex: getDefaultZIndex("modal"),
  radius: 0,
  blur: 0
};
var Overlay = (0, import_react55.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("Overlay", defaultProps19, props), { opacity, blur, color, gradient, zIndex, component, radius: radius2, sx } = _a, others = __objRest28(_a, ["opacity", "blur", "color", "gradient", "zIndex", "component", "radius", "sx"]);
  const background = gradient ? { backgroundImage: gradient } : { backgroundColor: color };
  const baseStyles = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex
  };
  const innerOverlay = (otherProps) => /* @__PURE__ */ import_react55.default.createElement(Box, __spreadValues49({
    component: component || "div",
    ref,
    sx: [
      (theme) => __spreadProps22(__spreadValues49(__spreadValues49({}, background), baseStyles), {
        opacity,
        borderRadius: theme.fn.size({ size: radius2, sizes: theme.radius })
      }),
      sx
    ]
  }, otherProps));
  if (blur) {
    return /* @__PURE__ */ import_react55.default.createElement(Box, __spreadValues49({
      sx: [
        () => __spreadProps22(__spreadValues49({}, baseStyles), {
          backdropFilter: `blur(${blur}px)`
        }),
        sx
      ]
    }, others), innerOverlay());
  }
  return innerOverlay(others);
});
Overlay.displayName = "@mantine/core/Overlay";

// node_modules/@mantine/core/esm/components/Modal/Modal.styles.js
init_react();
var sizes5 = {
  xs: 320,
  sm: 380,
  md: 440,
  lg: 620,
  xl: 780,
  full: "100%"
};
var useStyles21 = createStyles((theme, { overflow, size: size2, centered, zIndex }) => ({
  close: {},
  overlay: {},
  root: {
    position: "fixed",
    zIndex,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  inner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
    overflowY: "auto",
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.md}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: centered ? "center" : "flex-start"
  },
  title: {
    marginRight: theme.spacing.md,
    textOverflow: "ellipsis",
    display: "block",
    wordBreak: "break-word"
  },
  modal: {
    position: "relative",
    zIndex: 5,
    width: theme.fn.size({ sizes: sizes5, size: size2 }),
    outline: 0,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginTop: centered ? "auto" : void 0,
    marginBottom: centered ? "auto" : void 0
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
    marginRight: -9
  },
  body: {
    maxHeight: overflow === "inside" ? "calc(100vh - 185px)" : null,
    overflowY: overflow === "inside" ? "auto" : null,
    wordBreak: "break-word"
  }
}));
var Modal_styles_default = useStyles21;

// node_modules/@mantine/core/esm/components/Modal/Modal.js
init_react();
var import_react56 = __toESM(require_react());
var __defProp50 = Object.defineProperty;
var __defProps23 = Object.defineProperties;
var __getOwnPropDescs23 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols51 = Object.getOwnPropertySymbols;
var __hasOwnProp51 = Object.prototype.hasOwnProperty;
var __propIsEnum51 = Object.prototype.propertyIsEnumerable;
var __defNormalProp50 = (obj, key, value) => key in obj ? __defProp50(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues50 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp51.call(b2, prop))
      __defNormalProp50(a, prop, b2[prop]);
  if (__getOwnPropSymbols51)
    for (var prop of __getOwnPropSymbols51(b2)) {
      if (__propIsEnum51.call(b2, prop))
        __defNormalProp50(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps23 = (a, b2) => __defProps23(a, __getOwnPropDescs23(b2));
var __objRest29 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp51.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols51)
    for (var prop of __getOwnPropSymbols51(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum51.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps20 = {
  size: "md",
  transitionDuration: 250,
  overflow: "outside",
  transition: "pop",
  padding: "lg",
  shadow: "lg",
  closeOnClickOutside: true,
  closeOnEscape: true,
  trapFocus: true,
  withCloseButton: true,
  withinPortal: true,
  zIndex: getDefaultZIndex("modal")
};
function Modal(props) {
  const _a = useMantineDefaultProps("Modal", defaultProps20, props), {
    className,
    opened,
    title,
    onClose,
    children,
    withCloseButton,
    overlayOpacity,
    size: size2,
    transitionDuration,
    closeButtonLabel,
    overlayColor,
    overflow,
    transition,
    padding,
    shadow,
    radius: radius2,
    id,
    classNames,
    styles: styles2,
    closeOnClickOutside,
    trapFocus,
    closeOnEscape,
    centered,
    target,
    withinPortal,
    zIndex
  } = _a, others = __objRest29(_a, [
    "className",
    "opened",
    "title",
    "onClose",
    "children",
    "withCloseButton",
    "overlayOpacity",
    "size",
    "transitionDuration",
    "closeButtonLabel",
    "overlayColor",
    "overflow",
    "transition",
    "padding",
    "shadow",
    "radius",
    "id",
    "classNames",
    "styles",
    "closeOnClickOutside",
    "trapFocus",
    "closeOnEscape",
    "centered",
    "target",
    "withinPortal",
    "zIndex"
  ]);
  const baseId = useUuid(id);
  const titleId = `${baseId}-title`;
  const bodyId = `${baseId}-body`;
  const { classes, cx, theme } = Modal_styles_default({ size: size2, overflow, centered, zIndex }, { classNames, styles: styles2, name: "Modal" });
  const focusTrapRef = useFocusTrap(trapFocus && opened);
  const _overlayOpacity = typeof overlayOpacity === "number" ? overlayOpacity : theme.colorScheme === "dark" ? 0.85 : 0.75;
  const [, lockScroll] = useScrollLock();
  const closeOnEscapePress = (event) => {
    if (!trapFocus && event.code === "Escape" && closeOnEscape) {
      onClose();
    }
  };
  (0, import_react56.useEffect)(() => {
    if (!trapFocus) {
      window.addEventListener("keydown", closeOnEscapePress);
      return () => window.removeEventListener("keydown", closeOnEscapePress);
    }
    return void 0;
  }, [trapFocus]);
  useFocusReturn({ opened, transitionDuration: 0 });
  return /* @__PURE__ */ import_react56.default.createElement(OptionalPortal, {
    withinPortal,
    zIndex,
    target
  }, /* @__PURE__ */ import_react56.default.createElement(GroupedTransition, {
    onExited: () => lockScroll(false),
    onEntered: () => lockScroll(true),
    mounted: opened,
    transitions: {
      modal: { duration: transitionDuration, transition },
      overlay: {
        duration: transitionDuration / 2,
        transition: "fade",
        timingFunction: "ease"
      }
    }
  }, (transitionStyles) => /* @__PURE__ */ import_react56.default.createElement(Box, __spreadValues50({
    className: cx(classes.root, className)
  }, others), /* @__PURE__ */ import_react56.default.createElement("div", {
    className: classes.inner,
    onMouseDown: () => closeOnClickOutside && onClose(),
    onKeyDownCapture: (event) => {
      var _a2;
      const shouldTrigger = ((_a2 = event.target) == null ? void 0 : _a2.getAttribute("data-mantine-stop-propagation")) !== "true";
      shouldTrigger && event.nativeEvent.code === "Escape" && closeOnEscape && onClose();
    },
    ref: focusTrapRef
  }, /* @__PURE__ */ import_react56.default.createElement(Paper, {
    onMouseDown: (event) => event.stopPropagation(),
    className: classes.modal,
    shadow,
    p: padding,
    radius: radius2,
    role: "dialog",
    "aria-labelledby": titleId,
    "aria-describedby": bodyId,
    "aria-modal": true,
    tabIndex: -1,
    style: __spreadProps23(__spreadValues50({}, transitionStyles.modal), {
      marginLeft: "calc(var(--removed-scroll-width, 0px) * -1)",
      zIndex: 3
    })
  }, (title || withCloseButton) && /* @__PURE__ */ import_react56.default.createElement("div", {
    className: classes.header
  }, /* @__PURE__ */ import_react56.default.createElement(Text, {
    id: titleId,
    className: classes.title
  }, title), withCloseButton && /* @__PURE__ */ import_react56.default.createElement(CloseButton, {
    iconSize: 16,
    onClick: onClose,
    "aria-label": closeButtonLabel,
    className: classes.close
  })), /* @__PURE__ */ import_react56.default.createElement("div", {
    id: bodyId,
    className: classes.body
  }, children))), /* @__PURE__ */ import_react56.default.createElement("div", {
    style: transitionStyles.overlay
  }, /* @__PURE__ */ import_react56.default.createElement(Overlay, {
    className: classes.overlay,
    zIndex: 0,
    color: overlayColor || (theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.black),
    opacity: _overlayOpacity
  })))));
}
Modal.displayName = "@mantine/core/Modal";

// node_modules/@mantine/core/esm/components/MultiSelect/MultiSelect.js
init_react();
var import_react61 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/MultiSelect/DefaultValue/DefaultValue.js
init_react();
var import_react57 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/MultiSelect/DefaultValue/DefaultValue.styles.js
init_react();
var sizes6 = {
  xs: 16,
  sm: 22,
  md: 26,
  lg: 30,
  xl: 36
};
var fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18
};
var useStyles22 = createStyles((theme, { size: size2, disabled, radius: radius2 }) => ({
  defaultValue: {
    display: "flex",
    alignItems: "center",
    backgroundColor: disabled ? theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3] : theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
    color: disabled ? theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7] : theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    height: theme.fn.size({ size: size2, sizes: sizes6 }),
    paddingLeft: theme.fn.size({ size: size2, sizes: theme.spacing }),
    paddingRight: disabled ? theme.fn.size({ size: size2, sizes: theme.spacing }) : 0,
    fontWeight: 500,
    fontSize: theme.fn.size({ size: size2, sizes: fontSizes }),
    borderRadius: theme.fn.size({ size: radius2, sizes: theme.radius }),
    cursor: disabled ? "not-allowed" : "default",
    userSelect: "none",
    maxWidth: "calc(100% - 20px)"
  },
  defaultValueRemove: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    marginLeft: theme.fn.size({ size: size2, sizes: theme.spacing }) / 6
  },
  label: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
}));
var DefaultValue_styles_default = useStyles22;

// node_modules/@mantine/core/esm/components/MultiSelect/DefaultValue/DefaultValue.js
var __defProp51 = Object.defineProperty;
var __getOwnPropSymbols52 = Object.getOwnPropertySymbols;
var __hasOwnProp52 = Object.prototype.hasOwnProperty;
var __propIsEnum52 = Object.prototype.propertyIsEnumerable;
var __defNormalProp51 = (obj, key, value) => key in obj ? __defProp51(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues51 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp52.call(b2, prop))
      __defNormalProp51(a, prop, b2[prop]);
  if (__getOwnPropSymbols52)
    for (var prop of __getOwnPropSymbols52(b2)) {
      if (__propIsEnum52.call(b2, prop))
        __defNormalProp51(a, prop, b2[prop]);
    }
  return a;
};
var __objRest30 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp52.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols52)
    for (var prop of __getOwnPropSymbols52(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum52.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var buttonSizes = {
  xs: 16,
  sm: 22,
  md: 24,
  lg: 26,
  xl: 30
};
function DefaultValue(_a) {
  var _b = _a, {
    label,
    classNames,
    styles: styles2,
    className,
    onRemove,
    disabled,
    size: size2,
    radius: radius2
  } = _b, others = __objRest30(_b, [
    "label",
    "classNames",
    "styles",
    "className",
    "onRemove",
    "disabled",
    "size",
    "radius"
  ]);
  const { classes, cx } = DefaultValue_styles_default({ size: size2, disabled, radius: radius2 }, { classNames, styles: styles2, name: "MultiSelect" });
  return /* @__PURE__ */ import_react57.default.createElement("div", __spreadValues51({
    className: cx(classes.defaultValue, className)
  }, others), /* @__PURE__ */ import_react57.default.createElement("span", {
    className: classes.label
  }, label), !disabled && /* @__PURE__ */ import_react57.default.createElement(CloseButton, {
    "aria-hidden": true,
    onMouseDown: onRemove,
    size: buttonSizes[size2],
    radius: 2,
    color: "blue",
    variant: "transparent",
    iconSize: buttonSizes[size2] / 2,
    className: classes.defaultValueRemove,
    tabIndex: -1
  }));
}
DefaultValue.displayName = "@mantine/core/MultiSelect/DefaultValue";

// node_modules/@mantine/core/esm/components/MultiSelect/filter-data/filter-data.js
init_react();
function filterData({ data, searchable, limit, searchValue, filter, value }) {
  if (!searchable && value.length === 0) {
    return data;
  }
  if (!searchable) {
    const result2 = [];
    for (let i = 0; i < data.length; i += 1) {
      if (!value.some((val) => val === data[i].value && !data[i].disabled)) {
        result2.push(data[i]);
      }
    }
    return result2;
  }
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    if (filter(searchValue, value.some((val) => val === data[i].value && !data[i].disabled), data[i])) {
      result.push(data[i]);
    }
    if (result.length >= limit) {
      break;
    }
  }
  return result;
}

// node_modules/@mantine/core/esm/components/Select/SelectRightSection/get-select-right-section-props.js
init_react();
var import_react60 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Select/SelectRightSection/SelectRightSection.js
init_react();
var import_react59 = __toESM(require_react());

// node_modules/@mantine/core/esm/components/Select/SelectRightSection/ChevronIcon.js
init_react();
var import_react58 = __toESM(require_react());
var __defProp52 = Object.defineProperty;
var __getOwnPropSymbols53 = Object.getOwnPropertySymbols;
var __hasOwnProp53 = Object.prototype.hasOwnProperty;
var __propIsEnum53 = Object.prototype.propertyIsEnumerable;
var __defNormalProp52 = (obj, key, value) => key in obj ? __defProp52(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues52 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp53.call(b2, prop))
      __defNormalProp52(a, prop, b2[prop]);
  if (__getOwnPropSymbols53)
    for (var prop of __getOwnPropSymbols53(b2)) {
      if (__propIsEnum53.call(b2, prop))
        __defNormalProp52(a, prop, b2[prop]);
    }
  return a;
};
var __objRest31 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp53.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols53)
    for (var prop of __getOwnPropSymbols53(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum53.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var iconSizes2 = {
  xs: 14,
  sm: 18,
  md: 20,
  lg: 24,
  xl: 28
};
function ChevronIcon(_a) {
  var _b = _a, { size: size2, error, style } = _b, others = __objRest31(_b, ["size", "error", "style"]);
  const theme = useMantineTheme();
  const _size = theme.fn.size({ size: size2, sizes: iconSizes2 });
  return /* @__PURE__ */ import_react58.default.createElement("svg", __spreadValues52({
    width: _size,
    height: _size,
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: __spreadValues52({ color: error ? theme.colors.red[6] : theme.colors.gray[6] }, style),
    "data-chevron": true
  }, others), /* @__PURE__ */ import_react58.default.createElement("path", {
    d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
    fill: "currentColor",
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}

// node_modules/@mantine/core/esm/components/Select/SelectRightSection/SelectRightSection.js
function SelectRightSection({
  shouldClear,
  clearButtonLabel,
  onClear,
  size: size2,
  error
}) {
  return shouldClear ? /* @__PURE__ */ import_react59.default.createElement(CloseButton, {
    variant: "transparent",
    "aria-label": clearButtonLabel,
    onClick: onClear,
    size: size2
  }) : /* @__PURE__ */ import_react59.default.createElement(ChevronIcon, {
    error,
    size: size2
  });
}
SelectRightSection.displayName = "@mantine/core/SelectRightSection";

// node_modules/@mantine/core/esm/components/Select/SelectRightSection/get-select-right-section-props.js
var __defProp53 = Object.defineProperty;
var __defProps24 = Object.defineProperties;
var __getOwnPropDescs24 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols54 = Object.getOwnPropertySymbols;
var __hasOwnProp54 = Object.prototype.hasOwnProperty;
var __propIsEnum54 = Object.prototype.propertyIsEnumerable;
var __defNormalProp53 = (obj, key, value) => key in obj ? __defProp53(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues53 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp54.call(b2, prop))
      __defNormalProp53(a, prop, b2[prop]);
  if (__getOwnPropSymbols54)
    for (var prop of __getOwnPropSymbols54(b2)) {
      if (__propIsEnum54.call(b2, prop))
        __defNormalProp53(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps24 = (a, b2) => __defProps24(a, __getOwnPropDescs24(b2));
var __objRest32 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp54.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols54)
    for (var prop of __getOwnPropSymbols54(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum54.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var RIGHT_SECTION_WIDTH = {
  xs: 24,
  sm: 30,
  md: 34,
  lg: 44,
  xl: 54
};
function getSelectRightSectionProps(_a) {
  var _b = _a, {
    styles: styles2,
    rightSection,
    rightSectionWidth,
    theme
  } = _b, props = __objRest32(_b, [
    "styles",
    "rightSection",
    "rightSectionWidth",
    "theme"
  ]);
  if (rightSection) {
    return { rightSection, rightSectionWidth, styles: styles2 };
  }
  const _styles = typeof styles2 === "function" ? styles2(theme) : styles2;
  return {
    rightSectionWidth: theme.fn.size({ size: props.size, sizes: RIGHT_SECTION_WIDTH }),
    rightSection: !(props.disabled && props.shouldClear) && /* @__PURE__ */ import_react60.default.createElement(SelectRightSection, __spreadValues53({}, props)),
    styles: __spreadProps24(__spreadValues53({}, _styles), {
      rightSection: __spreadProps24(__spreadValues53({}, _styles == null ? void 0 : _styles.rightSection), {
        pointerEvents: props.shouldClear ? void 0 : "none"
      })
    })
  };
}

// node_modules/@mantine/core/esm/components/MultiSelect/MultiSelect.styles.js
init_react();
var useStyles23 = createStyles((theme, { size: size2, invalid }) => ({
  wrapper: {
    position: "relative"
  },
  values: {
    minHeight: theme.fn.size({ size: size2, sizes }) - 2,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: -theme.spacing.xs / 2,
    paddingTop: theme.spacing.xs / 2 - 2,
    paddingBottom: theme.spacing.xs / 2 - 2,
    boxSizing: "border-box"
  },
  value: {
    margin: `${theme.spacing.xs / 2 - 2}px ${theme.spacing.xs / 2}px`
  },
  searchInput: {
    width: 60,
    backgroundColor: "transparent",
    border: 0,
    outline: 0,
    fontSize: theme.fn.size({ size: size2, sizes: theme.fontSizes }),
    padding: 0,
    margin: theme.spacing.xs / 2,
    appearance: "none",
    color: "inherit",
    "&::placeholder": {
      color: invalid ? theme.colors.red[theme.colorScheme === "dark" ? 6 : 7] : theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
    },
    "&:disabled": {
      cursor: "not-allowed"
    }
  },
  searchInputEmpty: {
    width: "100%"
  },
  searchInputInputHidden: {
    width: 0,
    height: 0,
    margin: 0,
    overflow: "hidden"
  },
  searchInputPointer: {
    cursor: "pointer",
    "&:disabled": {
      cursor: "not-allowed"
    }
  },
  input: {
    cursor: "pointer",
    "&:disabled": {
      cursor: "not-allowed"
    }
  }
}));
var MultiSelect_styles_default = useStyles23;

// node_modules/@mantine/core/esm/components/MultiSelect/MultiSelect.js
var __defProp54 = Object.defineProperty;
var __defProps25 = Object.defineProperties;
var __getOwnPropDescs25 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols55 = Object.getOwnPropertySymbols;
var __hasOwnProp55 = Object.prototype.hasOwnProperty;
var __propIsEnum55 = Object.prototype.propertyIsEnumerable;
var __defNormalProp54 = (obj, key, value) => key in obj ? __defProp54(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues54 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp55.call(b2, prop))
      __defNormalProp54(a, prop, b2[prop]);
  if (__getOwnPropSymbols55)
    for (var prop of __getOwnPropSymbols55(b2)) {
      if (__propIsEnum55.call(b2, prop))
        __defNormalProp54(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps25 = (a, b2) => __defProps25(a, __getOwnPropDescs25(b2));
var __objRest33 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp55.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols55)
    for (var prop of __getOwnPropSymbols55(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum55.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function defaultFilter(value, selected, item) {
  if (selected) {
    return false;
  }
  return item.label.toLowerCase().trim().includes(value.toLowerCase().trim());
}
function defaultShouldCreate(query, data) {
  return !!query && !data.some((item) => item.value.toLowerCase() === query.toLowerCase());
}
var defaultProps21 = {
  size: "sm",
  valueComponent: DefaultValue,
  itemComponent: DefaultItem,
  transition: "pop-top-left",
  transitionDuration: 0,
  maxDropdownHeight: 220,
  shadow: "sm",
  searchable: false,
  filter: defaultFilter,
  limit: Infinity,
  clearSearchOnChange: true,
  clearable: false,
  clearSearchOnBlur: false,
  disabled: false,
  initiallyOpened: false,
  radius: "sm",
  creatable: false,
  shouldCreate: defaultShouldCreate,
  switchDirectionOnFlip: false,
  zIndex: getDefaultZIndex("popover"),
  selectOnBlur: false
};
var MultiSelect = (0, import_react61.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("MultiSelect", defaultProps21, props), {
    className,
    style,
    required,
    label,
    description,
    size: size2,
    error,
    classNames,
    styles: styles2,
    wrapperProps,
    value,
    defaultValue,
    data,
    onChange,
    valueComponent: Value,
    itemComponent,
    id,
    transition,
    transitionDuration,
    transitionTimingFunction,
    maxDropdownHeight,
    shadow,
    nothingFound,
    onFocus,
    onBlur,
    searchable,
    placeholder,
    filter,
    limit,
    clearSearchOnChange,
    clearable,
    clearSearchOnBlur,
    clearButtonLabel,
    variant,
    onSearchChange,
    disabled,
    initiallyOpened,
    radius: radius2,
    icon,
    rightSection,
    rightSectionWidth,
    creatable,
    getCreateLabel,
    shouldCreate,
    onCreate,
    sx,
    dropdownComponent,
    onDropdownClose,
    onDropdownOpen,
    maxSelectedValues,
    withinPortal,
    switchDirectionOnFlip,
    zIndex,
    selectOnBlur,
    name,
    dropdownPosition
  } = _a, others = __objRest33(_a, [
    "className",
    "style",
    "required",
    "label",
    "description",
    "size",
    "error",
    "classNames",
    "styles",
    "wrapperProps",
    "value",
    "defaultValue",
    "data",
    "onChange",
    "valueComponent",
    "itemComponent",
    "id",
    "transition",
    "transitionDuration",
    "transitionTimingFunction",
    "maxDropdownHeight",
    "shadow",
    "nothingFound",
    "onFocus",
    "onBlur",
    "searchable",
    "placeholder",
    "filter",
    "limit",
    "clearSearchOnChange",
    "clearable",
    "clearSearchOnBlur",
    "clearButtonLabel",
    "variant",
    "onSearchChange",
    "disabled",
    "initiallyOpened",
    "radius",
    "icon",
    "rightSection",
    "rightSectionWidth",
    "creatable",
    "getCreateLabel",
    "shouldCreate",
    "onCreate",
    "sx",
    "dropdownComponent",
    "onDropdownClose",
    "onDropdownOpen",
    "maxSelectedValues",
    "withinPortal",
    "switchDirectionOnFlip",
    "zIndex",
    "selectOnBlur",
    "name",
    "dropdownPosition"
  ]);
  const { classes, cx, theme } = MultiSelect_styles_default({ size: size2, invalid: !!error }, { classNames, styles: styles2, name: "MultiSelect" });
  const { systemStyles, rest } = extractSystemStyles(others);
  const dropdownRef = (0, import_react61.useRef)();
  const inputRef = (0, import_react61.useRef)();
  const wrapperRef = (0, import_react61.useRef)();
  const itemsRefs = (0, import_react61.useRef)({});
  const uuid = useUuid(id);
  const [dropdownOpened, _setDropdownOpened] = (0, import_react61.useState)(initiallyOpened);
  const [hovered, setHovered] = (0, import_react61.useState)(-1);
  const [direction, setDirection] = (0, import_react61.useState)("column");
  const [searchValue, setSearchValue] = (0, import_react61.useState)("");
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
    duration: 0,
    offset: 5,
    cancelable: false,
    isList: true
  });
  const isCreatable = creatable && typeof getCreateLabel === "function";
  let createLabel = null;
  const setDropdownOpened = (opened) => {
    _setDropdownOpened(opened);
    const handler = opened ? onDropdownOpen : onDropdownClose;
    typeof handler === "function" && handler();
  };
  const handleSearchChange = (val) => {
    typeof onSearchChange === "function" && onSearchChange(val);
    setSearchValue(val);
  };
  const formattedData = data.map((item) => typeof item === "string" ? { label: item, value: item } : item);
  const sortedData = groupOptions({ data: formattedData });
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    rule: (val) => Array.isArray(val),
    onChange
  });
  const valuesOverflow = (0, import_react61.useRef)(!!maxSelectedValues && maxSelectedValues < _value.length);
  const handleValueRemove = (_val) => {
    const newValue = _value.filter((val) => val !== _val);
    setValue(newValue);
    if (!!maxSelectedValues && newValue.length < maxSelectedValues) {
      valuesOverflow.current = false;
    }
  };
  const handleInputChange = (event) => {
    handleSearchChange(event.currentTarget.value);
    setDropdownOpened(true);
  };
  const handleInputFocus = (event) => {
    typeof onFocus === "function" && onFocus(event);
  };
  const filteredData = filterData({
    data: sortedData,
    searchable,
    searchValue,
    limit,
    filter,
    value: _value
  });
  const getNextIndex = (index, nextItem, compareFn) => {
    let i = index;
    while (compareFn(i)) {
      i = nextItem(i);
      if (!filteredData[i].disabled)
        return i;
    }
    return index;
  };
  useDidUpdate(() => {
    setHovered(getNextIndex(-1, (index) => index + 1, (index) => index < filteredData.length - 1));
  }, [searchValue]);
  useDidUpdate(() => {
    if (!disabled && _value.length >= data.length)
      setDropdownOpened(false);
  }, [_value]);
  const handleItemSelect = (item) => {
    clearSearchOnChange && handleSearchChange("");
    if (_value.includes(item.value)) {
      handleValueRemove(item.value);
    } else {
      setValue([..._value, item.value]);
      if (_value.length === maxSelectedValues - 1) {
        valuesOverflow.current = true;
        setDropdownOpened(false);
      }
      if (hovered === filteredData.length - 1) {
        setHovered(filteredData.length - 2);
      }
    }
    if (item.creatable) {
      typeof onCreate === "function" && onCreate(item.value);
    }
  };
  const handleInputBlur = (event) => {
    typeof onBlur === "function" && onBlur(event);
    if (selectOnBlur && filteredData[hovered] && dropdownOpened) {
      handleItemSelect(filteredData[hovered]);
    }
    clearSearchOnBlur && handleSearchChange("");
    setDropdownOpened(false);
  };
  const handleInputKeydown = (event) => {
    const isColumn = direction === "column";
    const handleNext = () => {
      setHovered((current) => {
        var _a2;
        const nextIndex = getNextIndex(current, (index) => index + 1, (index) => index < filteredData.length - 1);
        if (dropdownOpened) {
          targetRef.current = itemsRefs.current[(_a2 = filteredData[nextIndex]) == null ? void 0 : _a2.value];
          scrollIntoView({
            alignment: isColumn ? "end" : "start"
          });
        }
        return nextIndex;
      });
    };
    const handlePrevious = () => {
      setHovered((current) => {
        var _a2;
        const nextIndex = getNextIndex(current, (index) => index - 1, (index) => index > 0);
        if (dropdownOpened) {
          targetRef.current = itemsRefs.current[(_a2 = filteredData[nextIndex]) == null ? void 0 : _a2.value];
          scrollIntoView({
            alignment: isColumn ? "start" : "end"
          });
        }
        return nextIndex;
      });
    };
    switch (event.nativeEvent.code) {
      case "ArrowUp": {
        event.preventDefault();
        setDropdownOpened(true);
        isColumn ? handlePrevious() : handleNext();
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        setDropdownOpened(true);
        isColumn ? handleNext() : handlePrevious();
        break;
      }
      case "Enter": {
        event.preventDefault();
        if (filteredData[hovered] && dropdownOpened) {
          handleItemSelect(filteredData[hovered]);
        } else {
          setDropdownOpened(true);
        }
        break;
      }
      case "Space": {
        if (!searchable) {
          event.preventDefault();
          if (filteredData[hovered] && dropdownOpened) {
            handleItemSelect(filteredData[hovered]);
          } else {
            setDropdownOpened(true);
          }
        }
        break;
      }
      case "Backspace": {
        if (_value.length > 0 && searchValue.length === 0) {
          setValue(_value.slice(0, -1));
          setDropdownOpened(true);
        }
        break;
      }
      case "Escape": {
        setDropdownOpened(false);
      }
    }
  };
  const selectedItems = _value.map((val) => {
    let selectedItem = sortedData.find((item) => item.value === val && !item.disabled);
    if (!selectedItem && isCreatable) {
      selectedItem = {
        value: val,
        label: val
      };
    }
    return selectedItem;
  }).filter((val) => !!val).map((item) => /* @__PURE__ */ import_react61.default.createElement(Value, __spreadProps25(__spreadValues54({}, item), {
    disabled,
    className: classes.value,
    onRemove: (event) => {
      if (dropdownOpened) {
        event.preventDefault();
        event.stopPropagation();
      }
      handleValueRemove(item.value);
      setDropdownOpened(true);
    },
    key: item.value,
    size: size2,
    styles: styles2,
    classNames,
    radius: radius2
  })));
  const handleClear = () => {
    var _a2;
    handleSearchChange("");
    setValue([]);
    (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
  };
  if (isCreatable && shouldCreate(searchValue, sortedData)) {
    createLabel = getCreateLabel(searchValue);
    filteredData.push({ label: searchValue, value: searchValue, creatable: true });
  }
  const shouldRenderDropdown = filteredData.length > 0 || isCreatable || searchValue.length > 0 && !!nothingFound && filteredData.length === 0;
  return /* @__PURE__ */ import_react61.default.createElement(InputWrapper, __spreadValues54(__spreadValues54({
    required,
    id: uuid,
    label,
    error,
    description,
    size: size2,
    className,
    style,
    classNames,
    styles: styles2,
    __staticSelector: "MultiSelect",
    sx
  }, systemStyles), wrapperProps), /* @__PURE__ */ import_react61.default.createElement("div", {
    className: classes.wrapper,
    role: "combobox",
    "aria-haspopup": "listbox",
    "aria-owns": `${uuid}-items`,
    "aria-controls": uuid,
    "aria-expanded": dropdownOpened,
    onMouseLeave: () => setHovered(-1),
    tabIndex: -1,
    ref: wrapperRef
  }, /* @__PURE__ */ import_react61.default.createElement(Input, __spreadValues54({
    __staticSelector: "MultiSelect",
    style: { overflow: "hidden" },
    component: "div",
    multiline: true,
    size: size2,
    variant,
    disabled,
    invalid: !!error,
    required,
    radius: radius2,
    icon,
    onMouseDown: (event) => {
      var _a2;
      event.preventDefault();
      !disabled && !valuesOverflow.current && setDropdownOpened(!dropdownOpened);
      (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    },
    classNames: __spreadProps25(__spreadValues54({}, classNames), {
      input: cx({ [classes.input]: !searchable }, classNames == null ? void 0 : classNames.input)
    })
  }, getSelectRightSectionProps({
    theme,
    rightSection,
    rightSectionWidth,
    styles: styles2,
    size: size2,
    shouldClear: clearable && _value.length > 0,
    clearButtonLabel,
    onClear: handleClear,
    error,
    disabled
  })), /* @__PURE__ */ import_react61.default.createElement("div", {
    className: classes.values
  }, selectedItems, /* @__PURE__ */ import_react61.default.createElement("input", __spreadValues54({
    ref: useMergedRef(ref, inputRef),
    type: "text",
    id: uuid,
    className: cx(classes.searchInput, {
      [classes.searchInputPointer]: !searchable,
      [classes.searchInputInputHidden]: !dropdownOpened && _value.length > 0 || !searchable && _value.length > 0,
      [classes.searchInputEmpty]: _value.length === 0
    }),
    onKeyDown: handleInputKeydown,
    value: searchValue,
    onChange: handleInputChange,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    readOnly: !searchable || valuesOverflow.current,
    placeholder: _value.length === 0 ? placeholder : void 0,
    disabled,
    "data-mantine-stop-propagation": dropdownOpened,
    name,
    autoComplete: "nope"
  }, rest)))), /* @__PURE__ */ import_react61.default.createElement(SelectDropdown, {
    mounted: dropdownOpened && shouldRenderDropdown,
    transition,
    transitionDuration,
    transitionTimingFunction,
    uuid,
    shadow,
    maxDropdownHeight,
    classNames,
    styles: styles2,
    ref: useMergedRef(dropdownRef, scrollableRef),
    __staticSelector: "MultiSelect",
    dropdownComponent: dropdownComponent || SelectScrollArea,
    referenceElement: wrapperRef.current,
    direction,
    onDirectionChange: setDirection,
    switchDirectionOnFlip,
    withinPortal,
    zIndex,
    dropdownPosition
  }, /* @__PURE__ */ import_react61.default.createElement(SelectItems, {
    data: filteredData,
    hovered,
    classNames,
    styles: styles2,
    uuid,
    __staticSelector: "MultiSelect",
    onItemHover: setHovered,
    onItemSelect: handleItemSelect,
    itemsRefs,
    itemComponent,
    size: size2,
    nothingFound,
    creatable: creatable && !!createLabel,
    createLabel
  }))));
});
MultiSelect.displayName = "@mantine/core/MultiSelect";

// node_modules/@mantine/core/esm/components/NativeSelect/NativeSelect.js
init_react();
var import_react62 = __toESM(require_react());
var __defProp55 = Object.defineProperty;
var __defProps26 = Object.defineProperties;
var __getOwnPropDescs26 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols56 = Object.getOwnPropertySymbols;
var __hasOwnProp56 = Object.prototype.hasOwnProperty;
var __propIsEnum56 = Object.prototype.propertyIsEnumerable;
var __defNormalProp55 = (obj, key, value) => key in obj ? __defProp55(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues55 = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp56.call(b2, prop))
      __defNormalProp55(a, prop, b2[prop]);
  if (__getOwnPropSymbols56)
    for (var prop of __getOwnPropSymbols56(b2)) {
      if (__propIsEnum56.call(b2, prop))
        __defNormalProp55(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps26 = (a, b2) => __defProps26(a, __getOwnPropDescs26(b2));
var __objRest34 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp56.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols56)
    for (var prop of __getOwnPropSymbols56(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum56.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultProps22 = {
  size: "sm"
};
var NativeSelect = (0, import_react62.forwardRef)((props, ref) => {
  const _a = useMantineDefaultProps("NativeSelect", defaultProps22, props), {
    id,
    className,
    required,
    label,
    error,
    style,
    data,
    placeholder,
    wrapperProps,
    inputStyle,
    description,
    onChange,
    value,
    classNames,
    styles: styles2,
    size: size2,
    rightSection,
    rightSectionWidth,
    sx
  } = _a, others = __objRest34(_a, [
    "id",
    "className",
    "required",
    "label",
    "error",
    "style",
    "data",
    "placeholder",
    "wrapperProps",
    "inputStyle",
    "description",
    "onChange",
    "value",
    "classNames",
    "styles",
    "size",
    "rightSection",
    "rightSectionWidth",
    "sx"
  ]);
  const uuid = useUuid(id);
  const theme = useMantineTheme();
  const { systemStyles, rest } = extractSystemStyles(others);
  const formattedData = data.map((item) => typeof item === "string" ? { label: item, value: item } : item);
  const options = formattedData.map((item) => /* @__PURE__ */ import_react62.default.createElement("option", {
    key: item.value,
    value: item.value,
    disabled: item.disabled
  }, item.label));
  if (placeholder) {
    options.unshift(/* @__PURE__ */ import_react62.default.createElement("option", {
      key: "placeholder",
      value: "",
      disabled: true,
      hidden: true
    }, placeholder));
  }
  return /* @__PURE__ */ import_react62.default.createElement(InputWrapper, __spreadValues55(__spreadValues55({
    required,
    id: uuid,
    label,
    error,
    className,
    style,
    description,
    size: size2,
    styles: styles2,
    classNames,
    sx,
    __staticSelector: "NativeSelect"
  }, systemStyles), wrapperProps), /* @__PURE__ */ import_react62.default.createElement(Input, __spreadValues55(__spreadProps26(__spreadValues55({}, rest), {
    onChange,
    component: "select",
    invalid: !!error,
    style: inputStyle,
    "aria-required": required,
    ref,
    id: uuid,
    required,
    value: value === null ? "" : value,
    size: size2,
    classNames,
    __staticSelector: "NativeSelect"
  }), getSelectRightSectionProps({
    theme,
    rightSection,
    rightSectionWidth,
    styles: styles2,
    shouldClear: false,
    size: size2,
    error
  })), options));
});
NativeSelect.displayName = "@mantine/core/NativeSelect";

export {
  MantineProvider,
  CloseButton,
  Text,
  Header,
  AppShell,
  Button,
  Card,
  Group,
  Container,
  Modal,
  MultiSelect,
  NativeSelect,
  SimpleGrid,
  Table,
  Title
};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=/build/_shared/chunk-6I6VKWXL.js.map
