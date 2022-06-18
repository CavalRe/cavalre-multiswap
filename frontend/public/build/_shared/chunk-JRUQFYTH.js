import {
  LOGIN_PROVIDER,
  init_openlogin_esm
} from "/build/_shared/chunk-4NQKBIJ4.js";
import {
  require_react_dom
} from "/build/_shared/chunk-2A7HFO62.js";
import {
  AddressZero,
  BigNumber,
  Description,
  ErrorCode,
  FixedNumber,
  HashZero,
  Logger,
  MaxUint256,
  NegativeOne,
  One,
  SigningKey,
  TransactionTypes,
  TypedDataEncoder,
  UnicodeNormalizationForm,
  Utf8ErrorFuncs,
  Utf8ErrorReason,
  Zero,
  _toEscapedUtf8String,
  accessListify,
  arrayify,
  checkProperties,
  computeAddress,
  computePublicKey,
  concat,
  deepCopy,
  defineReadOnly,
  formatBytes32String,
  formatFixed,
  getAddress,
  getContractAddress,
  getCreate2Address,
  getIcapAddress,
  getStatic,
  hashMessage,
  hexConcat,
  hexDataLength,
  hexDataSlice,
  hexStripZeros,
  hexValue,
  hexZeroPad,
  hexlify,
  id,
  init_lib,
  init_lib10,
  init_lib11,
  init_lib12,
  init_lib2,
  init_lib3,
  init_lib4,
  init_lib5,
  init_lib6,
  init_lib7,
  init_lib8,
  init_lib9,
  isAddress,
  isBytes,
  isBytesLike,
  isHexString,
  isValidName,
  joinSignature,
  keccak256,
  lib_exports,
  lib_exports2,
  namehash,
  nameprep,
  parse,
  parseBytes32String,
  parseFixed,
  recoverAddress,
  recoverPublicKey,
  resolveProperties,
  serialize,
  shallowCopy,
  splitSignature,
  stripZeros,
  toUtf8Bytes,
  toUtf8CodePoints,
  toUtf8String,
  zeroPad
} from "/build/_shared/chunk-2R4NH65W.js";
import {
  require_hash,
  require_lodash,
  require_loglevel
} from "/build/_shared/chunk-TGMVR7JH.js";
import {
  ADAPTER_CATEGORY,
  ADAPTER_EVENTS,
  ADAPTER_NAMESPACES,
  ADAPTER_STATUS,
  CHAIN_NAMESPACES,
  EVM_ADAPTERS,
  SOLANA_ADAPTERS,
  SafeEventEmitter,
  WALLET_ADAPTERS,
  WalletInitializationError,
  WalletLoginError,
  _defineProperty,
  getChainConfig,
  init_base_esm,
  init_defineProperty,
  init_openloginJrpc_esm,
  storageAvailable
} from "/build/_shared/chunk-I33PHKBI.js";
import {
  require_crypto
} from "/build/_shared/chunk-LLVLRWYQ.js";
import {
  __commonJS,
  __esm,
  __export,
  __require,
  __toESM,
  init_react,
  require_object_assign,
  require_react
} from "/build/_shared/chunk-6CGL4AQG.js";

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    init_react();
    if (true) {
      (function() {
        "use strict";
        var React2 = require_react();
        var _assign = require_object_assign();
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        exports.Fragment = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          exports.Fragment = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactSharedInternals = React2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return "" + item;
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var functionName = innerType.displayName || innerType.name || "";
          return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentName(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case exports.Fragment:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                return getComponentName(type.type);
              case REACT_BLOCK_TYPE:
                return getComponentName(type._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentName(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: _assign({}, props, {
                  value: prevLog
                }),
                info: _assign({}, props, {
                  value: prevInfo
                }),
                warn: _assign({}, props, {
                  value: prevWarn
                }),
                error: _assign({}, props, {
                  value: prevError
                }),
                group: _assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: _assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: _assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name2, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name2;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name2 = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name2 ? describeBuiltInComponentFrame(name2) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_BLOCK_TYPE:
                return describeFunctionComponentFrame(type._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(Object.prototype.hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        var didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function warnIfStringRefCannotBeAutoConverted(config, self2) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
              var componentName = getComponentName(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        function defineKeyPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingKey = function() {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
        }
        function defineRefPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
        var ReactElement = function(type, key, ref, self2, source, owner, props) {
          var element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            ref,
            props,
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self2
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function jsxDEV(type, config, maybeKey, source, self2) {
          {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            if (maybeKey !== void 0) {
              key = "" + maybeKey;
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }
            if (hasValidRef(config)) {
              ref = config.ref;
              warnIfStringRefCannotBeAutoConverted(config, self2);
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
            return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function isValidElement(object) {
          {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
        }
        function getDeclarationErrorAddendum() {
          {
            if (ReactCurrentOwner$1.current) {
              var name2 = getComponentName(ReactCurrentOwner$1.current.type);
              if (name2) {
                return "\n\nCheck the render method of `" + name2 + "`.";
              }
            }
            return "";
          }
        }
        function getSourceInfoErrorAddendum(source) {
          {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
        }
        function validateExplicitKey(element, parentType) {
          {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
              childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
            }
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          {
            if (typeof node !== "object") {
              return;
            }
            if (Array.isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name2 = getComponentName(type);
              checkPropTypes(propTypes, element.props, "prop", name2, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentName(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
          {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendum(source);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (Array.isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentName(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = jsxDEV(type, props, key, source, self2);
            if (element == null) {
              return element;
            }
            if (validType) {
              var children = props.children;
              if (children !== void 0) {
                if (isStaticChildren) {
                  if (Array.isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                      validateChildKeys(children[i], type);
                    }
                    if (Object.freeze) {
                      Object.freeze(children);
                    }
                  } else {
                    error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                  }
                } else {
                  validateChildKeys(children, type);
                }
              }
            }
            if (type === exports.Fragment) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
        }
        function jsxWithValidationStatic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, true);
          }
        }
        function jsxWithValidationDynamic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, false);
          }
        }
        var jsx2 = jsxWithValidationDynamic;
        var jsxs2 = jsxWithValidationStatic;
        exports.jsx = jsx2;
        exports.jsxs = jsxs2;
      })();
    }
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    init_react();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/@ethersproject/abi/lib.esm/_version.js
var version;
var init_version = __esm({
  "node_modules/@ethersproject/abi/lib.esm/_version.js"() {
    init_react();
    version = "abi/5.5.0";
  }
});

// node_modules/@ethersproject/abi/lib.esm/fragments.js
function checkModifier(type, name2) {
  if (type === "bytes" || type === "string") {
    if (ModifiersBytes[name2]) {
      return true;
    }
  } else if (type === "address") {
    if (name2 === "payable") {
      return true;
    }
  } else if (type.indexOf("[") >= 0 || type === "tuple") {
    if (ModifiersNest[name2]) {
      return true;
    }
  }
  if (ModifiersBytes[name2] || name2 === "payable") {
    logger.throwArgumentError("invalid modifier", "name", name2);
  }
  return false;
}
function parseParamType(param, allowIndexed) {
  let originalParam = param;
  function throwError(i) {
    logger.throwArgumentError(`unexpected character at position ${i}`, "param", param);
  }
  param = param.replace(/\s/g, " ");
  function newNode(parent2) {
    let node2 = { type: "", name: "", parent: parent2, state: { allowType: true } };
    if (allowIndexed) {
      node2.indexed = false;
    }
    return node2;
  }
  let parent = { type: "", name: "", state: { allowType: true } };
  let node = parent;
  for (let i = 0; i < param.length; i++) {
    let c = param[i];
    switch (c) {
      case "(":
        if (node.state.allowType && node.type === "") {
          node.type = "tuple";
        } else if (!node.state.allowParams) {
          throwError(i);
        }
        node.state.allowType = false;
        node.type = verifyType(node.type);
        node.components = [newNode(node)];
        node = node.components[0];
        break;
      case ")":
        delete node.state;
        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i);
          }
          node.indexed = true;
          node.name = "";
        }
        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }
        node.type = verifyType(node.type);
        let child = node;
        node = node.parent;
        if (!node) {
          throwError(i);
        }
        delete child.parent;
        node.state.allowParams = false;
        node.state.allowName = true;
        node.state.allowArray = true;
        break;
      case ",":
        delete node.state;
        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i);
          }
          node.indexed = true;
          node.name = "";
        }
        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }
        node.type = verifyType(node.type);
        let sibling = newNode(node.parent);
        node.parent.components.push(sibling);
        delete node.parent;
        node = sibling;
        break;
      case " ":
        if (node.state.allowType) {
          if (node.type !== "") {
            node.type = verifyType(node.type);
            delete node.state.allowType;
            node.state.allowName = true;
            node.state.allowParams = true;
          }
        }
        if (node.state.allowName) {
          if (node.name !== "") {
            if (node.name === "indexed") {
              if (!allowIndexed) {
                throwError(i);
              }
              if (node.indexed) {
                throwError(i);
              }
              node.indexed = true;
              node.name = "";
            } else if (checkModifier(node.type, node.name)) {
              node.name = "";
            } else {
              node.state.allowName = false;
            }
          }
        }
        break;
      case "[":
        if (!node.state.allowArray) {
          throwError(i);
        }
        node.type += c;
        node.state.allowArray = false;
        node.state.allowName = false;
        node.state.readArray = true;
        break;
      case "]":
        if (!node.state.readArray) {
          throwError(i);
        }
        node.type += c;
        node.state.readArray = false;
        node.state.allowArray = true;
        node.state.allowName = true;
        break;
      default:
        if (node.state.allowType) {
          node.type += c;
          node.state.allowParams = true;
          node.state.allowArray = true;
        } else if (node.state.allowName) {
          node.name += c;
          delete node.state.allowArray;
        } else if (node.state.readArray) {
          node.type += c;
        } else {
          throwError(i);
        }
    }
  }
  if (node.parent) {
    logger.throwArgumentError("unexpected eof", "param", param);
  }
  delete parent.state;
  if (node.name === "indexed") {
    if (!allowIndexed) {
      throwError(originalParam.length - 7);
    }
    if (node.indexed) {
      throwError(originalParam.length - 7);
    }
    node.indexed = true;
    node.name = "";
  } else if (checkModifier(node.type, node.name)) {
    node.name = "";
  }
  parent.type = verifyType(parent.type);
  return parent;
}
function populate(object, params) {
  for (let key in params) {
    defineReadOnly(object, key, params[key]);
  }
}
function parseParams(value, allowIndex) {
  return splitNesting(value).map((param) => ParamType.fromString(param, allowIndex));
}
function parseGas(value, params) {
  params.gas = null;
  let comps = value.split("@");
  if (comps.length !== 1) {
    if (comps.length > 2) {
      logger.throwArgumentError("invalid human-readable ABI signature", "value", value);
    }
    if (!comps[1].match(/^[0-9]+$/)) {
      logger.throwArgumentError("invalid human-readable ABI signature gas", "value", value);
    }
    params.gas = BigNumber.from(comps[1]);
    return comps[0];
  }
  return value;
}
function parseModifiers(value, params) {
  params.constant = false;
  params.payable = false;
  params.stateMutability = "nonpayable";
  value.split(" ").forEach((modifier) => {
    switch (modifier.trim()) {
      case "constant":
        params.constant = true;
        break;
      case "payable":
        params.payable = true;
        params.stateMutability = "payable";
        break;
      case "nonpayable":
        params.payable = false;
        params.stateMutability = "nonpayable";
        break;
      case "pure":
        params.constant = true;
        params.stateMutability = "pure";
        break;
      case "view":
        params.constant = true;
        params.stateMutability = "view";
        break;
      case "external":
      case "public":
      case "":
        break;
      default:
        console.log("unknown modifier: " + modifier);
    }
  });
}
function verifyState(value) {
  let result = {
    constant: false,
    payable: true,
    stateMutability: "payable"
  };
  if (value.stateMutability != null) {
    result.stateMutability = value.stateMutability;
    result.constant = result.stateMutability === "view" || result.stateMutability === "pure";
    if (value.constant != null) {
      if (!!value.constant !== result.constant) {
        logger.throwArgumentError("cannot have constant function with mutability " + result.stateMutability, "value", value);
      }
    }
    result.payable = result.stateMutability === "payable";
    if (value.payable != null) {
      if (!!value.payable !== result.payable) {
        logger.throwArgumentError("cannot have payable function with mutability " + result.stateMutability, "value", value);
      }
    }
  } else if (value.payable != null) {
    result.payable = !!value.payable;
    if (value.constant == null && !result.payable && value.type !== "constructor") {
      logger.throwArgumentError("unable to determine stateMutability", "value", value);
    }
    result.constant = !!value.constant;
    if (result.constant) {
      result.stateMutability = "view";
    } else {
      result.stateMutability = result.payable ? "payable" : "nonpayable";
    }
    if (result.payable && result.constant) {
      logger.throwArgumentError("cannot have constant payable function", "value", value);
    }
  } else if (value.constant != null) {
    result.constant = !!value.constant;
    result.payable = !result.constant;
    result.stateMutability = result.constant ? "view" : "payable";
  } else if (value.type !== "constructor") {
    logger.throwArgumentError("unable to determine stateMutability", "value", value);
  }
  return result;
}
function checkForbidden(fragment) {
  const sig = fragment.format();
  if (sig === "Error(string)" || sig === "Panic(uint256)") {
    logger.throwArgumentError(`cannot specify user defined ${sig} error`, "fragment", fragment);
  }
  return fragment;
}
function verifyType(type) {
  if (type.match(/^uint($|[^1-9])/)) {
    type = "uint256" + type.substring(4);
  } else if (type.match(/^int($|[^1-9])/)) {
    type = "int256" + type.substring(3);
  }
  return type;
}
function verifyIdentifier(value) {
  if (!value || !value.match(regexIdentifier)) {
    logger.throwArgumentError(`invalid identifier "${value}"`, "value", value);
  }
  return value;
}
function splitNesting(value) {
  value = value.trim();
  let result = [];
  let accum = "";
  let depth = 0;
  for (let offset = 0; offset < value.length; offset++) {
    let c = value[offset];
    if (c === "," && depth === 0) {
      result.push(accum);
      accum = "";
    } else {
      accum += c;
      if (c === "(") {
        depth++;
      } else if (c === ")") {
        depth--;
        if (depth === -1) {
          logger.throwArgumentError("unbalanced parenthesis", "value", value);
        }
      }
    }
  }
  if (accum) {
    result.push(accum);
  }
  return result;
}
var logger, _constructorGuard, ModifiersBytes, ModifiersNest, FormatTypes, paramTypeArray, ParamType, Fragment, EventFragment, ConstructorFragment, FunctionFragment, ErrorFragment, regexIdentifier, regexParen;
var init_fragments = __esm({
  "node_modules/@ethersproject/abi/lib.esm/fragments.js"() {
    "use strict";
    init_react();
    init_lib3();
    init_lib4();
    init_lib();
    init_version();
    logger = new Logger(version);
    _constructorGuard = {};
    ModifiersBytes = { calldata: true, memory: true, storage: true };
    ModifiersNest = { calldata: true, memory: true };
    FormatTypes = Object.freeze({
      sighash: "sighash",
      minimal: "minimal",
      full: "full",
      json: "json"
    });
    paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);
    ParamType = class {
      constructor(constructorGuard, params) {
        if (constructorGuard !== _constructorGuard) {
          logger.throwError("use fromString", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "new ParamType()"
          });
        }
        populate(this, params);
        let match = this.type.match(paramTypeArray);
        if (match) {
          populate(this, {
            arrayLength: parseInt(match[2] || "-1"),
            arrayChildren: ParamType.fromObject({
              type: match[1],
              components: this.components
            }),
            baseType: "array"
          });
        } else {
          populate(this, {
            arrayLength: null,
            arrayChildren: null,
            baseType: this.components != null ? "tuple" : this.type
          });
        }
        this._isParamType = true;
        Object.freeze(this);
      }
      format(format) {
        if (!format) {
          format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
          logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
          let result2 = {
            type: this.baseType === "tuple" ? "tuple" : this.type,
            name: this.name || void 0
          };
          if (typeof this.indexed === "boolean") {
            result2.indexed = this.indexed;
          }
          if (this.components) {
            result2.components = this.components.map((comp) => JSON.parse(comp.format(format)));
          }
          return JSON.stringify(result2);
        }
        let result = "";
        if (this.baseType === "array") {
          result += this.arrayChildren.format(format);
          result += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]";
        } else {
          if (this.baseType === "tuple") {
            if (format !== FormatTypes.sighash) {
              result += this.type;
            }
            result += "(" + this.components.map((comp) => comp.format(format)).join(format === FormatTypes.full ? ", " : ",") + ")";
          } else {
            result += this.type;
          }
        }
        if (format !== FormatTypes.sighash) {
          if (this.indexed === true) {
            result += " indexed";
          }
          if (format === FormatTypes.full && this.name) {
            result += " " + this.name;
          }
        }
        return result;
      }
      static from(value, allowIndexed) {
        if (typeof value === "string") {
          return ParamType.fromString(value, allowIndexed);
        }
        return ParamType.fromObject(value);
      }
      static fromObject(value) {
        if (ParamType.isParamType(value)) {
          return value;
        }
        return new ParamType(_constructorGuard, {
          name: value.name || null,
          type: verifyType(value.type),
          indexed: value.indexed == null ? null : !!value.indexed,
          components: value.components ? value.components.map(ParamType.fromObject) : null
        });
      }
      static fromString(value, allowIndexed) {
        function ParamTypify(node) {
          return ParamType.fromObject({
            name: node.name,
            type: node.type,
            indexed: node.indexed,
            components: node.components
          });
        }
        return ParamTypify(parseParamType(value, !!allowIndexed));
      }
      static isParamType(value) {
        return !!(value != null && value._isParamType);
      }
    };
    Fragment = class {
      constructor(constructorGuard, params) {
        if (constructorGuard !== _constructorGuard) {
          logger.throwError("use a static from method", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "new Fragment()"
          });
        }
        populate(this, params);
        this._isFragment = true;
        Object.freeze(this);
      }
      static from(value) {
        if (Fragment.isFragment(value)) {
          return value;
        }
        if (typeof value === "string") {
          return Fragment.fromString(value);
        }
        return Fragment.fromObject(value);
      }
      static fromObject(value) {
        if (Fragment.isFragment(value)) {
          return value;
        }
        switch (value.type) {
          case "function":
            return FunctionFragment.fromObject(value);
          case "event":
            return EventFragment.fromObject(value);
          case "constructor":
            return ConstructorFragment.fromObject(value);
          case "error":
            return ErrorFragment.fromObject(value);
          case "fallback":
          case "receive":
            return null;
        }
        return logger.throwArgumentError("invalid fragment object", "value", value);
      }
      static fromString(value) {
        value = value.replace(/\s/g, " ");
        value = value.replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ");
        value = value.trim();
        if (value.split(" ")[0] === "event") {
          return EventFragment.fromString(value.substring(5).trim());
        } else if (value.split(" ")[0] === "function") {
          return FunctionFragment.fromString(value.substring(8).trim());
        } else if (value.split("(")[0].trim() === "constructor") {
          return ConstructorFragment.fromString(value.trim());
        } else if (value.split(" ")[0] === "error") {
          return ErrorFragment.fromString(value.substring(5).trim());
        }
        return logger.throwArgumentError("unsupported fragment", "value", value);
      }
      static isFragment(value) {
        return !!(value && value._isFragment);
      }
    };
    EventFragment = class extends Fragment {
      format(format) {
        if (!format) {
          format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
          logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
          return JSON.stringify({
            type: "event",
            anonymous: this.anonymous,
            name: this.name,
            inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
          });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
          result += "event ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
        if (format !== FormatTypes.sighash) {
          if (this.anonymous) {
            result += "anonymous ";
          }
        }
        return result.trim();
      }
      static from(value) {
        if (typeof value === "string") {
          return EventFragment.fromString(value);
        }
        return EventFragment.fromObject(value);
      }
      static fromObject(value) {
        if (EventFragment.isEventFragment(value)) {
          return value;
        }
        if (value.type !== "event") {
          logger.throwArgumentError("invalid event object", "value", value);
        }
        const params = {
          name: verifyIdentifier(value.name),
          anonymous: value.anonymous,
          inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
          type: "event"
        };
        return new EventFragment(_constructorGuard, params);
      }
      static fromString(value) {
        let match = value.match(regexParen);
        if (!match) {
          logger.throwArgumentError("invalid event string", "value", value);
        }
        let anonymous = false;
        match[3].split(" ").forEach((modifier) => {
          switch (modifier.trim()) {
            case "anonymous":
              anonymous = true;
              break;
            case "":
              break;
            default:
              logger.warn("unknown modifier: " + modifier);
          }
        });
        return EventFragment.fromObject({
          name: match[1].trim(),
          anonymous,
          inputs: parseParams(match[2], true),
          type: "event"
        });
      }
      static isEventFragment(value) {
        return value && value._isFragment && value.type === "event";
      }
    };
    ConstructorFragment = class extends Fragment {
      format(format) {
        if (!format) {
          format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
          logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
          return JSON.stringify({
            type: "constructor",
            stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
            payable: this.payable,
            gas: this.gas ? this.gas.toNumber() : void 0,
            inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
          });
        }
        if (format === FormatTypes.sighash) {
          logger.throwError("cannot format a constructor for sighash", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "format(sighash)"
          });
        }
        let result = "constructor(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
        if (this.stateMutability && this.stateMutability !== "nonpayable") {
          result += this.stateMutability + " ";
        }
        return result.trim();
      }
      static from(value) {
        if (typeof value === "string") {
          return ConstructorFragment.fromString(value);
        }
        return ConstructorFragment.fromObject(value);
      }
      static fromObject(value) {
        if (ConstructorFragment.isConstructorFragment(value)) {
          return value;
        }
        if (value.type !== "constructor") {
          logger.throwArgumentError("invalid constructor object", "value", value);
        }
        let state = verifyState(value);
        if (state.constant) {
          logger.throwArgumentError("constructor cannot be constant", "value", value);
        }
        const params = {
          name: null,
          type: value.type,
          inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
          payable: state.payable,
          stateMutability: state.stateMutability,
          gas: value.gas ? BigNumber.from(value.gas) : null
        };
        return new ConstructorFragment(_constructorGuard, params);
      }
      static fromString(value) {
        let params = { type: "constructor" };
        value = parseGas(value, params);
        let parens = value.match(regexParen);
        if (!parens || parens[1].trim() !== "constructor") {
          logger.throwArgumentError("invalid constructor string", "value", value);
        }
        params.inputs = parseParams(parens[2].trim(), false);
        parseModifiers(parens[3].trim(), params);
        return ConstructorFragment.fromObject(params);
      }
      static isConstructorFragment(value) {
        return value && value._isFragment && value.type === "constructor";
      }
    };
    FunctionFragment = class extends ConstructorFragment {
      format(format) {
        if (!format) {
          format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
          logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
          return JSON.stringify({
            type: "function",
            name: this.name,
            constant: this.constant,
            stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
            payable: this.payable,
            gas: this.gas ? this.gas.toNumber() : void 0,
            inputs: this.inputs.map((input) => JSON.parse(input.format(format))),
            outputs: this.outputs.map((output) => JSON.parse(output.format(format)))
          });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
          result += "function ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
        if (format !== FormatTypes.sighash) {
          if (this.stateMutability) {
            if (this.stateMutability !== "nonpayable") {
              result += this.stateMutability + " ";
            }
          } else if (this.constant) {
            result += "view ";
          }
          if (this.outputs && this.outputs.length) {
            result += "returns (" + this.outputs.map((output) => output.format(format)).join(", ") + ") ";
          }
          if (this.gas != null) {
            result += "@" + this.gas.toString() + " ";
          }
        }
        return result.trim();
      }
      static from(value) {
        if (typeof value === "string") {
          return FunctionFragment.fromString(value);
        }
        return FunctionFragment.fromObject(value);
      }
      static fromObject(value) {
        if (FunctionFragment.isFunctionFragment(value)) {
          return value;
        }
        if (value.type !== "function") {
          logger.throwArgumentError("invalid function object", "value", value);
        }
        let state = verifyState(value);
        const params = {
          type: value.type,
          name: verifyIdentifier(value.name),
          constant: state.constant,
          inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
          outputs: value.outputs ? value.outputs.map(ParamType.fromObject) : [],
          payable: state.payable,
          stateMutability: state.stateMutability,
          gas: value.gas ? BigNumber.from(value.gas) : null
        };
        return new FunctionFragment(_constructorGuard, params);
      }
      static fromString(value) {
        let params = { type: "function" };
        value = parseGas(value, params);
        let comps = value.split(" returns ");
        if (comps.length > 2) {
          logger.throwArgumentError("invalid function string", "value", value);
        }
        let parens = comps[0].match(regexParen);
        if (!parens) {
          logger.throwArgumentError("invalid function signature", "value", value);
        }
        params.name = parens[1].trim();
        if (params.name) {
          verifyIdentifier(params.name);
        }
        params.inputs = parseParams(parens[2], false);
        parseModifiers(parens[3].trim(), params);
        if (comps.length > 1) {
          let returns = comps[1].match(regexParen);
          if (returns[1].trim() != "" || returns[3].trim() != "") {
            logger.throwArgumentError("unexpected tokens", "value", value);
          }
          params.outputs = parseParams(returns[2], false);
        } else {
          params.outputs = [];
        }
        return FunctionFragment.fromObject(params);
      }
      static isFunctionFragment(value) {
        return value && value._isFragment && value.type === "function";
      }
    };
    ErrorFragment = class extends Fragment {
      format(format) {
        if (!format) {
          format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
          logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
          return JSON.stringify({
            type: "error",
            name: this.name,
            inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
          });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
          result += "error ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
        return result.trim();
      }
      static from(value) {
        if (typeof value === "string") {
          return ErrorFragment.fromString(value);
        }
        return ErrorFragment.fromObject(value);
      }
      static fromObject(value) {
        if (ErrorFragment.isErrorFragment(value)) {
          return value;
        }
        if (value.type !== "error") {
          logger.throwArgumentError("invalid error object", "value", value);
        }
        const params = {
          type: value.type,
          name: verifyIdentifier(value.name),
          inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : []
        };
        return checkForbidden(new ErrorFragment(_constructorGuard, params));
      }
      static fromString(value) {
        let params = { type: "error" };
        let parens = value.match(regexParen);
        if (!parens) {
          logger.throwArgumentError("invalid error signature", "value", value);
        }
        params.name = parens[1].trim();
        if (params.name) {
          verifyIdentifier(params.name);
        }
        params.inputs = parseParams(parens[2], false);
        return checkForbidden(ErrorFragment.fromObject(params));
      }
      static isErrorFragment(value) {
        return value && value._isFragment && value.type === "error";
      }
    };
    regexIdentifier = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
    regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js
function checkResultErrors(result) {
  const errors = [];
  const checkErrors = function(path, object) {
    if (!Array.isArray(object)) {
      return;
    }
    for (let key in object) {
      const childPath = path.slice();
      childPath.push(key);
      try {
        checkErrors(childPath, object[key]);
      } catch (error) {
        errors.push({ path: childPath, error });
      }
    }
  };
  checkErrors([], result);
  return errors;
}
var logger2, Coder, Writer, Reader;
var init_abstract_coder = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js"() {
    "use strict";
    init_react();
    init_lib2();
    init_lib3();
    init_lib4();
    init_lib();
    init_version();
    logger2 = new Logger(version);
    Coder = class {
      constructor(name2, type, localName, dynamic) {
        this.name = name2;
        this.type = type;
        this.localName = localName;
        this.dynamic = dynamic;
      }
      _throwError(message, value) {
        logger2.throwArgumentError(message, this.localName, value);
      }
    };
    Writer = class {
      constructor(wordSize) {
        defineReadOnly(this, "wordSize", wordSize || 32);
        this._data = [];
        this._dataLength = 0;
        this._padding = new Uint8Array(wordSize);
      }
      get data() {
        return hexConcat(this._data);
      }
      get length() {
        return this._dataLength;
      }
      _writeData(data) {
        this._data.push(data);
        this._dataLength += data.length;
        return data.length;
      }
      appendWriter(writer) {
        return this._writeData(concat(writer._data));
      }
      writeBytes(value) {
        let bytes = arrayify(value);
        const paddingOffset = bytes.length % this.wordSize;
        if (paddingOffset) {
          bytes = concat([bytes, this._padding.slice(paddingOffset)]);
        }
        return this._writeData(bytes);
      }
      _getValue(value) {
        let bytes = arrayify(BigNumber.from(value));
        if (bytes.length > this.wordSize) {
          logger2.throwError("value out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
            length: this.wordSize,
            offset: bytes.length
          });
        }
        if (bytes.length % this.wordSize) {
          bytes = concat([this._padding.slice(bytes.length % this.wordSize), bytes]);
        }
        return bytes;
      }
      writeValue(value) {
        return this._writeData(this._getValue(value));
      }
      writeUpdatableValue() {
        const offset = this._data.length;
        this._data.push(this._padding);
        this._dataLength += this.wordSize;
        return (value) => {
          this._data[offset] = this._getValue(value);
        };
      }
    };
    Reader = class {
      constructor(data, wordSize, coerceFunc, allowLoose) {
        defineReadOnly(this, "_data", arrayify(data));
        defineReadOnly(this, "wordSize", wordSize || 32);
        defineReadOnly(this, "_coerceFunc", coerceFunc);
        defineReadOnly(this, "allowLoose", allowLoose);
        this._offset = 0;
      }
      get data() {
        return hexlify(this._data);
      }
      get consumed() {
        return this._offset;
      }
      static coerce(name2, value) {
        let match = name2.match("^u?int([0-9]+)$");
        if (match && parseInt(match[1]) <= 48) {
          value = value.toNumber();
        }
        return value;
      }
      coerce(name2, value) {
        if (this._coerceFunc) {
          return this._coerceFunc(name2, value);
        }
        return Reader.coerce(name2, value);
      }
      _peekBytes(offset, length, loose) {
        let alignedLength = Math.ceil(length / this.wordSize) * this.wordSize;
        if (this._offset + alignedLength > this._data.length) {
          if (this.allowLoose && loose && this._offset + length <= this._data.length) {
            alignedLength = length;
          } else {
            logger2.throwError("data out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
              length: this._data.length,
              offset: this._offset + alignedLength
            });
          }
        }
        return this._data.slice(this._offset, this._offset + alignedLength);
      }
      subReader(offset) {
        return new Reader(this._data.slice(this._offset + offset), this.wordSize, this._coerceFunc, this.allowLoose);
      }
      readBytes(length, loose) {
        let bytes = this._peekBytes(0, length, !!loose);
        this._offset += bytes.length;
        return bytes.slice(0, length);
      }
      readValue() {
        return BigNumber.from(this.readBytes(this.wordSize));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/address.js
var AddressCoder;
var init_address = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/address.js"() {
    "use strict";
    init_react();
    init_lib7();
    init_lib2();
    init_abstract_coder();
    AddressCoder = class extends Coder {
      constructor(localName) {
        super("address", "address", localName, false);
      }
      defaultValue() {
        return "0x0000000000000000000000000000000000000000";
      }
      encode(writer, value) {
        try {
          value = getAddress(value);
        } catch (error) {
          this._throwError(error.message, value);
        }
        return writer.writeValue(value);
      }
      decode(reader) {
        return getAddress(hexZeroPad(reader.readValue().toHexString(), 20));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js
var AnonymousCoder;
var init_anonymous = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js"() {
    "use strict";
    init_react();
    init_abstract_coder();
    AnonymousCoder = class extends Coder {
      constructor(coder) {
        super(coder.name, coder.type, void 0, coder.dynamic);
        this.coder = coder;
      }
      defaultValue() {
        return this.coder.defaultValue();
      }
      encode(writer, value) {
        return this.coder.encode(writer, value);
      }
      decode(reader) {
        return this.coder.decode(reader);
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/array.js
function pack(writer, coders, values) {
  let arrayValues = null;
  if (Array.isArray(values)) {
    arrayValues = values;
  } else if (values && typeof values === "object") {
    let unique = {};
    arrayValues = coders.map((coder) => {
      const name2 = coder.localName;
      if (!name2) {
        logger3.throwError("cannot encode object for signature with missing names", Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder,
          value: values
        });
      }
      if (unique[name2]) {
        logger3.throwError("cannot encode object for signature with duplicate names", Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder,
          value: values
        });
      }
      unique[name2] = true;
      return values[name2];
    });
  } else {
    logger3.throwArgumentError("invalid tuple value", "tuple", values);
  }
  if (coders.length !== arrayValues.length) {
    logger3.throwArgumentError("types/value length mismatch", "tuple", values);
  }
  let staticWriter = new Writer(writer.wordSize);
  let dynamicWriter = new Writer(writer.wordSize);
  let updateFuncs = [];
  coders.forEach((coder, index) => {
    let value = arrayValues[index];
    if (coder.dynamic) {
      let dynamicOffset = dynamicWriter.length;
      coder.encode(dynamicWriter, value);
      let updateFunc = staticWriter.writeUpdatableValue();
      updateFuncs.push((baseOffset) => {
        updateFunc(baseOffset + dynamicOffset);
      });
    } else {
      coder.encode(staticWriter, value);
    }
  });
  updateFuncs.forEach((func) => {
    func(staticWriter.length);
  });
  let length = writer.appendWriter(staticWriter);
  length += writer.appendWriter(dynamicWriter);
  return length;
}
function unpack(reader, coders) {
  let values = [];
  let baseReader = reader.subReader(0);
  coders.forEach((coder) => {
    let value = null;
    if (coder.dynamic) {
      let offset = reader.readValue();
      let offsetReader = baseReader.subReader(offset.toNumber());
      try {
        value = coder.decode(offsetReader);
      } catch (error) {
        if (error.code === Logger.errors.BUFFER_OVERRUN) {
          throw error;
        }
        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    } else {
      try {
        value = coder.decode(reader);
      } catch (error) {
        if (error.code === Logger.errors.BUFFER_OVERRUN) {
          throw error;
        }
        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    }
    if (value != void 0) {
      values.push(value);
    }
  });
  const uniqueNames = coders.reduce((accum, coder) => {
    const name2 = coder.localName;
    if (name2) {
      if (!accum[name2]) {
        accum[name2] = 0;
      }
      accum[name2]++;
    }
    return accum;
  }, {});
  coders.forEach((coder, index) => {
    let name2 = coder.localName;
    if (!name2 || uniqueNames[name2] !== 1) {
      return;
    }
    if (name2 === "length") {
      name2 = "_length";
    }
    if (values[name2] != null) {
      return;
    }
    const value = values[index];
    if (value instanceof Error) {
      Object.defineProperty(values, name2, {
        enumerable: true,
        get: () => {
          throw value;
        }
      });
    } else {
      values[name2] = value;
    }
  });
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (value instanceof Error) {
      Object.defineProperty(values, i, {
        enumerable: true,
        get: () => {
          throw value;
        }
      });
    }
  }
  return Object.freeze(values);
}
var logger3, ArrayCoder;
var init_array = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/array.js"() {
    "use strict";
    init_react();
    init_lib();
    init_version();
    init_abstract_coder();
    init_anonymous();
    logger3 = new Logger(version);
    ArrayCoder = class extends Coder {
      constructor(coder, length, localName) {
        const type = coder.type + "[" + (length >= 0 ? length : "") + "]";
        const dynamic = length === -1 || coder.dynamic;
        super("array", type, localName, dynamic);
        this.coder = coder;
        this.length = length;
      }
      defaultValue() {
        const defaultChild = this.coder.defaultValue();
        const result = [];
        for (let i = 0; i < this.length; i++) {
          result.push(defaultChild);
        }
        return result;
      }
      encode(writer, value) {
        if (!Array.isArray(value)) {
          this._throwError("expected array value", value);
        }
        let count = this.length;
        if (count === -1) {
          count = value.length;
          writer.writeValue(value.length);
        }
        logger3.checkArgumentCount(value.length, count, "coder array" + (this.localName ? " " + this.localName : ""));
        let coders = [];
        for (let i = 0; i < value.length; i++) {
          coders.push(this.coder);
        }
        return pack(writer, coders, value);
      }
      decode(reader) {
        let count = this.length;
        if (count === -1) {
          count = reader.readValue().toNumber();
          if (count * 32 > reader._data.length) {
            logger3.throwError("insufficient data length", Logger.errors.BUFFER_OVERRUN, {
              length: reader._data.length,
              count
            });
          }
        }
        let coders = [];
        for (let i = 0; i < count; i++) {
          coders.push(new AnonymousCoder(this.coder));
        }
        return reader.coerce(this.name, unpack(reader, coders));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/boolean.js
var BooleanCoder;
var init_boolean = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/boolean.js"() {
    "use strict";
    init_react();
    init_abstract_coder();
    BooleanCoder = class extends Coder {
      constructor(localName) {
        super("bool", "bool", localName, false);
      }
      defaultValue() {
        return false;
      }
      encode(writer, value) {
        return writer.writeValue(value ? 1 : 0);
      }
      decode(reader) {
        return reader.coerce(this.type, !reader.readValue().isZero());
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/bytes.js
var DynamicBytesCoder, BytesCoder;
var init_bytes = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/bytes.js"() {
    "use strict";
    init_react();
    init_lib2();
    init_abstract_coder();
    DynamicBytesCoder = class extends Coder {
      constructor(type, localName) {
        super(type, type, localName, true);
      }
      defaultValue() {
        return "0x";
      }
      encode(writer, value) {
        value = arrayify(value);
        let length = writer.writeValue(value.length);
        length += writer.writeBytes(value);
        return length;
      }
      decode(reader) {
        return reader.readBytes(reader.readValue().toNumber(), true);
      }
    };
    BytesCoder = class extends DynamicBytesCoder {
      constructor(localName) {
        super("bytes", localName);
      }
      decode(reader) {
        return reader.coerce(this.name, hexlify(super.decode(reader)));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js
var FixedBytesCoder;
var init_fixed_bytes = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js"() {
    "use strict";
    init_react();
    init_lib2();
    init_abstract_coder();
    FixedBytesCoder = class extends Coder {
      constructor(size, localName) {
        let name2 = "bytes" + String(size);
        super(name2, name2, localName, false);
        this.size = size;
      }
      defaultValue() {
        return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
      }
      encode(writer, value) {
        let data = arrayify(value);
        if (data.length !== this.size) {
          this._throwError("incorrect data length", value);
        }
        return writer.writeBytes(data);
      }
      decode(reader) {
        return reader.coerce(this.name, hexlify(reader.readBytes(this.size)));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/null.js
var NullCoder;
var init_null = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/null.js"() {
    "use strict";
    init_react();
    init_abstract_coder();
    NullCoder = class extends Coder {
      constructor(localName) {
        super("null", "", localName, false);
      }
      defaultValue() {
        return null;
      }
      encode(writer, value) {
        if (value != null) {
          this._throwError("not null", value);
        }
        return writer.writeBytes([]);
      }
      decode(reader) {
        reader.readBytes(0);
        return reader.coerce(this.name, null);
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/number.js
var NumberCoder;
var init_number = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/number.js"() {
    "use strict";
    init_react();
    init_lib3();
    init_lib8();
    init_abstract_coder();
    NumberCoder = class extends Coder {
      constructor(size, signed, localName) {
        const name2 = (signed ? "int" : "uint") + size * 8;
        super(name2, name2, localName, false);
        this.size = size;
        this.signed = signed;
      }
      defaultValue() {
        return 0;
      }
      encode(writer, value) {
        let v = BigNumber.from(value);
        let maxUintValue = MaxUint256.mask(writer.wordSize * 8);
        if (this.signed) {
          let bounds = maxUintValue.mask(this.size * 8 - 1);
          if (v.gt(bounds) || v.lt(bounds.add(One).mul(NegativeOne))) {
            this._throwError("value out-of-bounds", value);
          }
        } else if (v.lt(Zero) || v.gt(maxUintValue.mask(this.size * 8))) {
          this._throwError("value out-of-bounds", value);
        }
        v = v.toTwos(this.size * 8).mask(this.size * 8);
        if (this.signed) {
          v = v.fromTwos(this.size * 8).toTwos(8 * writer.wordSize);
        }
        return writer.writeValue(v);
      }
      decode(reader) {
        let value = reader.readValue().mask(this.size * 8);
        if (this.signed) {
          value = value.fromTwos(this.size * 8);
        }
        return reader.coerce(this.name, value);
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/string.js
var StringCoder;
var init_string = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/string.js"() {
    "use strict";
    init_react();
    init_lib9();
    init_bytes();
    StringCoder = class extends DynamicBytesCoder {
      constructor(localName) {
        super("string", localName);
      }
      defaultValue() {
        return "";
      }
      encode(writer, value) {
        return super.encode(writer, toUtf8Bytes(value));
      }
      decode(reader) {
        return toUtf8String(super.decode(reader));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/coders/tuple.js
var TupleCoder;
var init_tuple = __esm({
  "node_modules/@ethersproject/abi/lib.esm/coders/tuple.js"() {
    "use strict";
    init_react();
    init_abstract_coder();
    init_array();
    TupleCoder = class extends Coder {
      constructor(coders, localName) {
        let dynamic = false;
        const types = [];
        coders.forEach((coder) => {
          if (coder.dynamic) {
            dynamic = true;
          }
          types.push(coder.type);
        });
        const type = "tuple(" + types.join(",") + ")";
        super("tuple", type, localName, dynamic);
        this.coders = coders;
      }
      defaultValue() {
        const values = [];
        this.coders.forEach((coder) => {
          values.push(coder.defaultValue());
        });
        const uniqueNames = this.coders.reduce((accum, coder) => {
          const name2 = coder.localName;
          if (name2) {
            if (!accum[name2]) {
              accum[name2] = 0;
            }
            accum[name2]++;
          }
          return accum;
        }, {});
        this.coders.forEach((coder, index) => {
          let name2 = coder.localName;
          if (!name2 || uniqueNames[name2] !== 1) {
            return;
          }
          if (name2 === "length") {
            name2 = "_length";
          }
          if (values[name2] != null) {
            return;
          }
          values[name2] = values[index];
        });
        return Object.freeze(values);
      }
      encode(writer, value) {
        return pack(writer, this.coders, value);
      }
      decode(reader) {
        return reader.coerce(this.name, unpack(reader, this.coders));
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/abi-coder.js
var logger4, paramTypeBytes, paramTypeNumber, AbiCoder, defaultAbiCoder;
var init_abi_coder = __esm({
  "node_modules/@ethersproject/abi/lib.esm/abi-coder.js"() {
    "use strict";
    init_react();
    init_lib2();
    init_lib4();
    init_lib();
    init_version();
    init_abstract_coder();
    init_address();
    init_array();
    init_boolean();
    init_bytes();
    init_fixed_bytes();
    init_null();
    init_number();
    init_string();
    init_tuple();
    init_fragments();
    logger4 = new Logger(version);
    paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
    paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
    AbiCoder = class {
      constructor(coerceFunc) {
        logger4.checkNew(new.target, AbiCoder);
        defineReadOnly(this, "coerceFunc", coerceFunc || null);
      }
      _getCoder(param) {
        switch (param.baseType) {
          case "address":
            return new AddressCoder(param.name);
          case "bool":
            return new BooleanCoder(param.name);
          case "string":
            return new StringCoder(param.name);
          case "bytes":
            return new BytesCoder(param.name);
          case "array":
            return new ArrayCoder(this._getCoder(param.arrayChildren), param.arrayLength, param.name);
          case "tuple":
            return new TupleCoder((param.components || []).map((component) => {
              return this._getCoder(component);
            }), param.name);
          case "":
            return new NullCoder(param.name);
        }
        let match = param.type.match(paramTypeNumber);
        if (match) {
          let size = parseInt(match[2] || "256");
          if (size === 0 || size > 256 || size % 8 !== 0) {
            logger4.throwArgumentError("invalid " + match[1] + " bit length", "param", param);
          }
          return new NumberCoder(size / 8, match[1] === "int", param.name);
        }
        match = param.type.match(paramTypeBytes);
        if (match) {
          let size = parseInt(match[1]);
          if (size === 0 || size > 32) {
            logger4.throwArgumentError("invalid bytes length", "param", param);
          }
          return new FixedBytesCoder(size, param.name);
        }
        return logger4.throwArgumentError("invalid type", "type", param.type);
      }
      _getWordSize() {
        return 32;
      }
      _getReader(data, allowLoose) {
        return new Reader(data, this._getWordSize(), this.coerceFunc, allowLoose);
      }
      _getWriter() {
        return new Writer(this._getWordSize());
      }
      getDefaultValue(types) {
        const coders = types.map((type) => this._getCoder(ParamType.from(type)));
        const coder = new TupleCoder(coders, "_");
        return coder.defaultValue();
      }
      encode(types, values) {
        if (types.length !== values.length) {
          logger4.throwError("types/values length mismatch", Logger.errors.INVALID_ARGUMENT, {
            count: { types: types.length, values: values.length },
            value: { types, values }
          });
        }
        const coders = types.map((type) => this._getCoder(ParamType.from(type)));
        const coder = new TupleCoder(coders, "_");
        const writer = this._getWriter();
        coder.encode(writer, values);
        return writer.data;
      }
      decode(types, data, loose) {
        const coders = types.map((type) => this._getCoder(ParamType.from(type)));
        const coder = new TupleCoder(coders, "_");
        return coder.decode(this._getReader(arrayify(data), loose));
      }
    };
    defaultAbiCoder = new AbiCoder();
  }
});

// node_modules/@ethersproject/abi/lib.esm/interface.js
function wrapAccessError(property, error) {
  const wrap = new Error(`deferred error during ABI decoding triggered accessing ${property}`);
  wrap.error = error;
  return wrap;
}
var logger5, LogDescription, TransactionDescription, ErrorDescription, Indexed, BuiltinErrors, Interface;
var init_interface = __esm({
  "node_modules/@ethersproject/abi/lib.esm/interface.js"() {
    "use strict";
    init_react();
    init_lib7();
    init_lib3();
    init_lib2();
    init_lib10();
    init_lib5();
    init_lib4();
    init_abi_coder();
    init_abstract_coder();
    init_fragments();
    init_lib();
    init_version();
    logger5 = new Logger(version);
    LogDescription = class extends Description {
    };
    TransactionDescription = class extends Description {
    };
    ErrorDescription = class extends Description {
    };
    Indexed = class extends Description {
      static isIndexed(value) {
        return !!(value && value._isIndexed);
      }
    };
    BuiltinErrors = {
      "0x08c379a0": { signature: "Error(string)", name: "Error", inputs: ["string"], reason: true },
      "0x4e487b71": { signature: "Panic(uint256)", name: "Panic", inputs: ["uint256"] }
    };
    Interface = class {
      constructor(fragments) {
        logger5.checkNew(new.target, Interface);
        let abi = [];
        if (typeof fragments === "string") {
          abi = JSON.parse(fragments);
        } else {
          abi = fragments;
        }
        defineReadOnly(this, "fragments", abi.map((fragment) => {
          return Fragment.from(fragment);
        }).filter((fragment) => fragment != null));
        defineReadOnly(this, "_abiCoder", getStatic(new.target, "getAbiCoder")());
        defineReadOnly(this, "functions", {});
        defineReadOnly(this, "errors", {});
        defineReadOnly(this, "events", {});
        defineReadOnly(this, "structs", {});
        this.fragments.forEach((fragment) => {
          let bucket = null;
          switch (fragment.type) {
            case "constructor":
              if (this.deploy) {
                logger5.warn("duplicate definition - constructor");
                return;
              }
              defineReadOnly(this, "deploy", fragment);
              return;
            case "function":
              bucket = this.functions;
              break;
            case "event":
              bucket = this.events;
              break;
            case "error":
              bucket = this.errors;
              break;
            default:
              return;
          }
          let signature = fragment.format();
          if (bucket[signature]) {
            logger5.warn("duplicate definition - " + signature);
            return;
          }
          bucket[signature] = fragment;
        });
        if (!this.deploy) {
          defineReadOnly(this, "deploy", ConstructorFragment.from({
            payable: false,
            type: "constructor"
          }));
        }
        defineReadOnly(this, "_isInterface", true);
      }
      format(format) {
        if (!format) {
          format = FormatTypes.full;
        }
        if (format === FormatTypes.sighash) {
          logger5.throwArgumentError("interface does not support formatting sighash", "format", format);
        }
        const abi = this.fragments.map((fragment) => fragment.format(format));
        if (format === FormatTypes.json) {
          return JSON.stringify(abi.map((j) => JSON.parse(j)));
        }
        return abi;
      }
      static getAbiCoder() {
        return defaultAbiCoder;
      }
      static getAddress(address) {
        return getAddress(address);
      }
      static getSighash(fragment) {
        return hexDataSlice(id(fragment.format()), 0, 4);
      }
      static getEventTopic(eventFragment) {
        return id(eventFragment.format());
      }
      getFunction(nameOrSignatureOrSighash) {
        if (isHexString(nameOrSignatureOrSighash)) {
          for (const name2 in this.functions) {
            if (nameOrSignatureOrSighash === this.getSighash(name2)) {
              return this.functions[name2];
            }
          }
          logger5.throwArgumentError("no matching function", "sighash", nameOrSignatureOrSighash);
        }
        if (nameOrSignatureOrSighash.indexOf("(") === -1) {
          const name2 = nameOrSignatureOrSighash.trim();
          const matching = Object.keys(this.functions).filter((f) => f.split("(")[0] === name2);
          if (matching.length === 0) {
            logger5.throwArgumentError("no matching function", "name", name2);
          } else if (matching.length > 1) {
            logger5.throwArgumentError("multiple matching functions", "name", name2);
          }
          return this.functions[matching[0]];
        }
        const result = this.functions[FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
        if (!result) {
          logger5.throwArgumentError("no matching function", "signature", nameOrSignatureOrSighash);
        }
        return result;
      }
      getEvent(nameOrSignatureOrTopic) {
        if (isHexString(nameOrSignatureOrTopic)) {
          const topichash = nameOrSignatureOrTopic.toLowerCase();
          for (const name2 in this.events) {
            if (topichash === this.getEventTopic(name2)) {
              return this.events[name2];
            }
          }
          logger5.throwArgumentError("no matching event", "topichash", topichash);
        }
        if (nameOrSignatureOrTopic.indexOf("(") === -1) {
          const name2 = nameOrSignatureOrTopic.trim();
          const matching = Object.keys(this.events).filter((f) => f.split("(")[0] === name2);
          if (matching.length === 0) {
            logger5.throwArgumentError("no matching event", "name", name2);
          } else if (matching.length > 1) {
            logger5.throwArgumentError("multiple matching events", "name", name2);
          }
          return this.events[matching[0]];
        }
        const result = this.events[EventFragment.fromString(nameOrSignatureOrTopic).format()];
        if (!result) {
          logger5.throwArgumentError("no matching event", "signature", nameOrSignatureOrTopic);
        }
        return result;
      }
      getError(nameOrSignatureOrSighash) {
        if (isHexString(nameOrSignatureOrSighash)) {
          const getSighash = getStatic(this.constructor, "getSighash");
          for (const name2 in this.errors) {
            const error = this.errors[name2];
            if (nameOrSignatureOrSighash === getSighash(error)) {
              return this.errors[name2];
            }
          }
          logger5.throwArgumentError("no matching error", "sighash", nameOrSignatureOrSighash);
        }
        if (nameOrSignatureOrSighash.indexOf("(") === -1) {
          const name2 = nameOrSignatureOrSighash.trim();
          const matching = Object.keys(this.errors).filter((f) => f.split("(")[0] === name2);
          if (matching.length === 0) {
            logger5.throwArgumentError("no matching error", "name", name2);
          } else if (matching.length > 1) {
            logger5.throwArgumentError("multiple matching errors", "name", name2);
          }
          return this.errors[matching[0]];
        }
        const result = this.errors[FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
        if (!result) {
          logger5.throwArgumentError("no matching error", "signature", nameOrSignatureOrSighash);
        }
        return result;
      }
      getSighash(fragment) {
        if (typeof fragment === "string") {
          try {
            fragment = this.getFunction(fragment);
          } catch (error) {
            try {
              fragment = this.getError(fragment);
            } catch (_) {
              throw error;
            }
          }
        }
        return getStatic(this.constructor, "getSighash")(fragment);
      }
      getEventTopic(eventFragment) {
        if (typeof eventFragment === "string") {
          eventFragment = this.getEvent(eventFragment);
        }
        return getStatic(this.constructor, "getEventTopic")(eventFragment);
      }
      _decodeParams(params, data) {
        return this._abiCoder.decode(params, data);
      }
      _encodeParams(params, values) {
        return this._abiCoder.encode(params, values);
      }
      encodeDeploy(values) {
        return this._encodeParams(this.deploy.inputs, values || []);
      }
      decodeErrorResult(fragment, data) {
        if (typeof fragment === "string") {
          fragment = this.getError(fragment);
        }
        const bytes = arrayify(data);
        if (hexlify(bytes.slice(0, 4)) !== this.getSighash(fragment)) {
          logger5.throwArgumentError(`data signature does not match error ${fragment.name}.`, "data", hexlify(bytes));
        }
        return this._decodeParams(fragment.inputs, bytes.slice(4));
      }
      encodeErrorResult(fragment, values) {
        if (typeof fragment === "string") {
          fragment = this.getError(fragment);
        }
        return hexlify(concat([
          this.getSighash(fragment),
          this._encodeParams(fragment.inputs, values || [])
        ]));
      }
      decodeFunctionData(functionFragment, data) {
        if (typeof functionFragment === "string") {
          functionFragment = this.getFunction(functionFragment);
        }
        const bytes = arrayify(data);
        if (hexlify(bytes.slice(0, 4)) !== this.getSighash(functionFragment)) {
          logger5.throwArgumentError(`data signature does not match function ${functionFragment.name}.`, "data", hexlify(bytes));
        }
        return this._decodeParams(functionFragment.inputs, bytes.slice(4));
      }
      encodeFunctionData(functionFragment, values) {
        if (typeof functionFragment === "string") {
          functionFragment = this.getFunction(functionFragment);
        }
        return hexlify(concat([
          this.getSighash(functionFragment),
          this._encodeParams(functionFragment.inputs, values || [])
        ]));
      }
      decodeFunctionResult(functionFragment, data) {
        if (typeof functionFragment === "string") {
          functionFragment = this.getFunction(functionFragment);
        }
        let bytes = arrayify(data);
        let reason = null;
        let errorArgs = null;
        let errorName = null;
        let errorSignature = null;
        switch (bytes.length % this._abiCoder._getWordSize()) {
          case 0:
            try {
              return this._abiCoder.decode(functionFragment.outputs, bytes);
            } catch (error) {
            }
            break;
          case 4: {
            const selector = hexlify(bytes.slice(0, 4));
            const builtin = BuiltinErrors[selector];
            if (builtin) {
              errorArgs = this._abiCoder.decode(builtin.inputs, bytes.slice(4));
              errorName = builtin.name;
              errorSignature = builtin.signature;
              if (builtin.reason) {
                reason = errorArgs[0];
              }
            } else {
              try {
                const error = this.getError(selector);
                errorArgs = this._abiCoder.decode(error.inputs, bytes.slice(4));
                errorName = error.name;
                errorSignature = error.format();
              } catch (error) {
                console.log(error);
              }
            }
            break;
          }
        }
        return logger5.throwError("call revert exception", Logger.errors.CALL_EXCEPTION, {
          method: functionFragment.format(),
          errorArgs,
          errorName,
          errorSignature,
          reason
        });
      }
      encodeFunctionResult(functionFragment, values) {
        if (typeof functionFragment === "string") {
          functionFragment = this.getFunction(functionFragment);
        }
        return hexlify(this._abiCoder.encode(functionFragment.outputs, values || []));
      }
      encodeFilterTopics(eventFragment, values) {
        if (typeof eventFragment === "string") {
          eventFragment = this.getEvent(eventFragment);
        }
        if (values.length > eventFragment.inputs.length) {
          logger5.throwError("too many arguments for " + eventFragment.format(), Logger.errors.UNEXPECTED_ARGUMENT, {
            argument: "values",
            value: values
          });
        }
        let topics = [];
        if (!eventFragment.anonymous) {
          topics.push(this.getEventTopic(eventFragment));
        }
        const encodeTopic = (param, value) => {
          if (param.type === "string") {
            return id(value);
          } else if (param.type === "bytes") {
            return keccak256(hexlify(value));
          }
          if (param.type === "address") {
            this._abiCoder.encode(["address"], [value]);
          }
          return hexZeroPad(hexlify(value), 32);
        };
        values.forEach((value, index) => {
          let param = eventFragment.inputs[index];
          if (!param.indexed) {
            if (value != null) {
              logger5.throwArgumentError("cannot filter non-indexed parameters; must be null", "contract." + param.name, value);
            }
            return;
          }
          if (value == null) {
            topics.push(null);
          } else if (param.baseType === "array" || param.baseType === "tuple") {
            logger5.throwArgumentError("filtering with tuples or arrays not supported", "contract." + param.name, value);
          } else if (Array.isArray(value)) {
            topics.push(value.map((value2) => encodeTopic(param, value2)));
          } else {
            topics.push(encodeTopic(param, value));
          }
        });
        while (topics.length && topics[topics.length - 1] === null) {
          topics.pop();
        }
        return topics;
      }
      encodeEventLog(eventFragment, values) {
        if (typeof eventFragment === "string") {
          eventFragment = this.getEvent(eventFragment);
        }
        const topics = [];
        const dataTypes = [];
        const dataValues = [];
        if (!eventFragment.anonymous) {
          topics.push(this.getEventTopic(eventFragment));
        }
        if (values.length !== eventFragment.inputs.length) {
          logger5.throwArgumentError("event arguments/values mismatch", "values", values);
        }
        eventFragment.inputs.forEach((param, index) => {
          const value = values[index];
          if (param.indexed) {
            if (param.type === "string") {
              topics.push(id(value));
            } else if (param.type === "bytes") {
              topics.push(keccak256(value));
            } else if (param.baseType === "tuple" || param.baseType === "array") {
              throw new Error("not implemented");
            } else {
              topics.push(this._abiCoder.encode([param.type], [value]));
            }
          } else {
            dataTypes.push(param);
            dataValues.push(value);
          }
        });
        return {
          data: this._abiCoder.encode(dataTypes, dataValues),
          topics
        };
      }
      decodeEventLog(eventFragment, data, topics) {
        if (typeof eventFragment === "string") {
          eventFragment = this.getEvent(eventFragment);
        }
        if (topics != null && !eventFragment.anonymous) {
          let topicHash = this.getEventTopic(eventFragment);
          if (!isHexString(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
            logger5.throwError("fragment/topic mismatch", Logger.errors.INVALID_ARGUMENT, { argument: "topics[0]", expected: topicHash, value: topics[0] });
          }
          topics = topics.slice(1);
        }
        let indexed = [];
        let nonIndexed = [];
        let dynamic = [];
        eventFragment.inputs.forEach((param, index) => {
          if (param.indexed) {
            if (param.type === "string" || param.type === "bytes" || param.baseType === "tuple" || param.baseType === "array") {
              indexed.push(ParamType.fromObject({ type: "bytes32", name: param.name }));
              dynamic.push(true);
            } else {
              indexed.push(param);
              dynamic.push(false);
            }
          } else {
            nonIndexed.push(param);
            dynamic.push(false);
          }
        });
        let resultIndexed = topics != null ? this._abiCoder.decode(indexed, concat(topics)) : null;
        let resultNonIndexed = this._abiCoder.decode(nonIndexed, data, true);
        let result = [];
        let nonIndexedIndex = 0, indexedIndex = 0;
        eventFragment.inputs.forEach((param, index) => {
          if (param.indexed) {
            if (resultIndexed == null) {
              result[index] = new Indexed({ _isIndexed: true, hash: null });
            } else if (dynamic[index]) {
              result[index] = new Indexed({ _isIndexed: true, hash: resultIndexed[indexedIndex++] });
            } else {
              try {
                result[index] = resultIndexed[indexedIndex++];
              } catch (error) {
                result[index] = error;
              }
            }
          } else {
            try {
              result[index] = resultNonIndexed[nonIndexedIndex++];
            } catch (error) {
              result[index] = error;
            }
          }
          if (param.name && result[param.name] == null) {
            const value = result[index];
            if (value instanceof Error) {
              Object.defineProperty(result, param.name, {
                enumerable: true,
                get: () => {
                  throw wrapAccessError(`property ${JSON.stringify(param.name)}`, value);
                }
              });
            } else {
              result[param.name] = value;
            }
          }
        });
        for (let i = 0; i < result.length; i++) {
          const value = result[i];
          if (value instanceof Error) {
            Object.defineProperty(result, i, {
              enumerable: true,
              get: () => {
                throw wrapAccessError(`index ${i}`, value);
              }
            });
          }
        }
        return Object.freeze(result);
      }
      parseTransaction(tx) {
        let fragment = this.getFunction(tx.data.substring(0, 10).toLowerCase());
        if (!fragment) {
          return null;
        }
        return new TransactionDescription({
          args: this._abiCoder.decode(fragment.inputs, "0x" + tx.data.substring(10)),
          functionFragment: fragment,
          name: fragment.name,
          signature: fragment.format(),
          sighash: this.getSighash(fragment),
          value: BigNumber.from(tx.value || "0")
        });
      }
      parseLog(log4) {
        let fragment = this.getEvent(log4.topics[0]);
        if (!fragment || fragment.anonymous) {
          return null;
        }
        return new LogDescription({
          eventFragment: fragment,
          name: fragment.name,
          signature: fragment.format(),
          topic: this.getEventTopic(fragment),
          args: this.decodeEventLog(fragment, log4.data, log4.topics)
        });
      }
      parseError(data) {
        const hexData = hexlify(data);
        let fragment = this.getError(hexData.substring(0, 10).toLowerCase());
        if (!fragment) {
          return null;
        }
        return new ErrorDescription({
          args: this._abiCoder.decode(fragment.inputs, "0x" + hexData.substring(10)),
          errorFragment: fragment,
          name: fragment.name,
          signature: fragment.format(),
          sighash: this.getSighash(fragment)
        });
      }
      static isInterface(value) {
        return !!(value && value._isInterface);
      }
    };
  }
});

// node_modules/@ethersproject/abi/lib.esm/index.js
var init_lib13 = __esm({
  "node_modules/@ethersproject/abi/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_fragments();
    init_abi_coder();
    init_interface();
  }
});

// node_modules/@ethersproject/abstract-provider/lib.esm/_version.js
var version2;
var init_version2 = __esm({
  "node_modules/@ethersproject/abstract-provider/lib.esm/_version.js"() {
    init_react();
    version2 = "abstract-provider/5.5.1";
  }
});

// node_modules/@ethersproject/abstract-provider/lib.esm/index.js
var __awaiter, logger6, ForkEvent, Provider;
var init_lib14 = __esm({
  "node_modules/@ethersproject/abstract-provider/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_lib3();
    init_lib4();
    init_lib();
    init_version2();
    __awaiter = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger6 = new Logger(version2);
    ForkEvent = class extends Description {
      static isForkEvent(value) {
        return !!(value && value._isForkEvent);
      }
    };
    Provider = class {
      constructor() {
        logger6.checkAbstract(new.target, Provider);
        defineReadOnly(this, "_isProvider", true);
      }
      getFeeData() {
        return __awaiter(this, void 0, void 0, function* () {
          const { block, gasPrice } = yield resolveProperties({
            block: this.getBlock("latest"),
            gasPrice: this.getGasPrice().catch((error) => {
              return null;
            })
          });
          let maxFeePerGas = null, maxPriorityFeePerGas = null;
          if (block && block.baseFeePerGas) {
            maxPriorityFeePerGas = BigNumber.from("2500000000");
            maxFeePerGas = block.baseFeePerGas.mul(2).add(maxPriorityFeePerGas);
          }
          return { maxFeePerGas, maxPriorityFeePerGas, gasPrice };
        });
      }
      addListener(eventName, listener) {
        return this.on(eventName, listener);
      }
      removeListener(eventName, listener) {
        return this.off(eventName, listener);
      }
      static isProvider(value) {
        return !!(value && value._isProvider);
      }
    };
  }
});

// node_modules/@ethersproject/abstract-signer/lib.esm/_version.js
var version3;
var init_version3 = __esm({
  "node_modules/@ethersproject/abstract-signer/lib.esm/_version.js"() {
    init_react();
    version3 = "abstract-signer/5.5.0";
  }
});

// node_modules/@ethersproject/abstract-signer/lib.esm/index.js
var __awaiter2, logger7, allowedTransactionKeys, forwardErrors, Signer, VoidSigner;
var init_lib15 = __esm({
  "node_modules/@ethersproject/abstract-signer/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_lib4();
    init_lib();
    init_version3();
    __awaiter2 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger7 = new Logger(version3);
    allowedTransactionKeys = [
      "accessList",
      "chainId",
      "customData",
      "data",
      "from",
      "gasLimit",
      "gasPrice",
      "maxFeePerGas",
      "maxPriorityFeePerGas",
      "nonce",
      "to",
      "type",
      "value"
    ];
    forwardErrors = [
      Logger.errors.INSUFFICIENT_FUNDS,
      Logger.errors.NONCE_EXPIRED,
      Logger.errors.REPLACEMENT_UNDERPRICED
    ];
    Signer = class {
      constructor() {
        logger7.checkAbstract(new.target, Signer);
        defineReadOnly(this, "_isSigner", true);
      }
      getBalance(blockTag) {
        return __awaiter2(this, void 0, void 0, function* () {
          this._checkProvider("getBalance");
          return yield this.provider.getBalance(this.getAddress(), blockTag);
        });
      }
      getTransactionCount(blockTag) {
        return __awaiter2(this, void 0, void 0, function* () {
          this._checkProvider("getTransactionCount");
          return yield this.provider.getTransactionCount(this.getAddress(), blockTag);
        });
      }
      estimateGas(transaction) {
        return __awaiter2(this, void 0, void 0, function* () {
          this._checkProvider("estimateGas");
          const tx = yield resolveProperties(this.checkTransaction(transaction));
          return yield this.provider.estimateGas(tx);
        });
      }
      call(transaction, blockTag) {
        return __awaiter2(this, void 0, void 0, function* () {
          this._checkProvider("call");
          const tx = yield resolveProperties(this.checkTransaction(transaction));
          return yield this.provider.call(tx, blockTag);
        });
      }
      sendTransaction(transaction) {
        return __awaiter2(this, void 0, void 0, function* () {
          this._checkProvider("sendTransaction");
          const tx = yield this.populateTransaction(transaction);
          const signedTx = yield this.signTransaction(tx);
          return yield this.provider.sendTransaction(signedTx);
        });
      }
      getChainId() {
        return __awaiter2(this, void 0, void 0, function* () {
          this._checkProvider("getChainId");
          const network = yield this.provider.getNetwork();
          return network.chainId;
        });
      }
      getGasPrice() {
        return __awaiter2(this, void 0, void 0, function* () {
          this._checkProvider("getGasPrice");
          return yield this.provider.getGasPrice();
        });
      }
      getFeeData() {
        return __awaiter2(this, void 0, void 0, function* () {
          this._checkProvider("getFeeData");
          return yield this.provider.getFeeData();
        });
      }
      resolveName(name2) {
        return __awaiter2(this, void 0, void 0, function* () {
          this._checkProvider("resolveName");
          return yield this.provider.resolveName(name2);
        });
      }
      checkTransaction(transaction) {
        for (const key in transaction) {
          if (allowedTransactionKeys.indexOf(key) === -1) {
            logger7.throwArgumentError("invalid transaction key: " + key, "transaction", transaction);
          }
        }
        const tx = shallowCopy(transaction);
        if (tx.from == null) {
          tx.from = this.getAddress();
        } else {
          tx.from = Promise.all([
            Promise.resolve(tx.from),
            this.getAddress()
          ]).then((result) => {
            if (result[0].toLowerCase() !== result[1].toLowerCase()) {
              logger7.throwArgumentError("from address mismatch", "transaction", transaction);
            }
            return result[0];
          });
        }
        return tx;
      }
      populateTransaction(transaction) {
        return __awaiter2(this, void 0, void 0, function* () {
          const tx = yield resolveProperties(this.checkTransaction(transaction));
          if (tx.to != null) {
            tx.to = Promise.resolve(tx.to).then((to) => __awaiter2(this, void 0, void 0, function* () {
              if (to == null) {
                return null;
              }
              const address = yield this.resolveName(to);
              if (address == null) {
                logger7.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
              }
              return address;
            }));
            tx.to.catch((error) => {
            });
          }
          const hasEip1559 = tx.maxFeePerGas != null || tx.maxPriorityFeePerGas != null;
          if (tx.gasPrice != null && (tx.type === 2 || hasEip1559)) {
            logger7.throwArgumentError("eip-1559 transaction do not support gasPrice", "transaction", transaction);
          } else if ((tx.type === 0 || tx.type === 1) && hasEip1559) {
            logger7.throwArgumentError("pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "transaction", transaction);
          }
          if ((tx.type === 2 || tx.type == null) && (tx.maxFeePerGas != null && tx.maxPriorityFeePerGas != null)) {
            tx.type = 2;
          } else if (tx.type === 0 || tx.type === 1) {
            if (tx.gasPrice == null) {
              tx.gasPrice = this.getGasPrice();
            }
          } else {
            const feeData = yield this.getFeeData();
            if (tx.type == null) {
              if (feeData.maxFeePerGas != null && feeData.maxPriorityFeePerGas != null) {
                tx.type = 2;
                if (tx.gasPrice != null) {
                  const gasPrice = tx.gasPrice;
                  delete tx.gasPrice;
                  tx.maxFeePerGas = gasPrice;
                  tx.maxPriorityFeePerGas = gasPrice;
                } else {
                  if (tx.maxFeePerGas == null) {
                    tx.maxFeePerGas = feeData.maxFeePerGas;
                  }
                  if (tx.maxPriorityFeePerGas == null) {
                    tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
                  }
                }
              } else if (feeData.gasPrice != null) {
                if (hasEip1559) {
                  logger7.throwError("network does not support EIP-1559", Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "populateTransaction"
                  });
                }
                if (tx.gasPrice == null) {
                  tx.gasPrice = feeData.gasPrice;
                }
                tx.type = 0;
              } else {
                logger7.throwError("failed to get consistent fee data", Logger.errors.UNSUPPORTED_OPERATION, {
                  operation: "signer.getFeeData"
                });
              }
            } else if (tx.type === 2) {
              if (tx.maxFeePerGas == null) {
                tx.maxFeePerGas = feeData.maxFeePerGas;
              }
              if (tx.maxPriorityFeePerGas == null) {
                tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
              }
            }
          }
          if (tx.nonce == null) {
            tx.nonce = this.getTransactionCount("pending");
          }
          if (tx.gasLimit == null) {
            tx.gasLimit = this.estimateGas(tx).catch((error) => {
              if (forwardErrors.indexOf(error.code) >= 0) {
                throw error;
              }
              return logger7.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
                error,
                tx
              });
            });
          }
          if (tx.chainId == null) {
            tx.chainId = this.getChainId();
          } else {
            tx.chainId = Promise.all([
              Promise.resolve(tx.chainId),
              this.getChainId()
            ]).then((results) => {
              if (results[1] !== 0 && results[0] !== results[1]) {
                logger7.throwArgumentError("chainId address mismatch", "transaction", transaction);
              }
              return results[0];
            });
          }
          return yield resolveProperties(tx);
        });
      }
      _checkProvider(operation) {
        if (!this.provider) {
          logger7.throwError("missing provider", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: operation || "_checkProvider"
          });
        }
      }
      static isSigner(value) {
        return !!(value && value._isSigner);
      }
    };
    VoidSigner = class extends Signer {
      constructor(address, provider) {
        logger7.checkNew(new.target, VoidSigner);
        super();
        defineReadOnly(this, "address", address);
        defineReadOnly(this, "provider", provider || null);
      }
      getAddress() {
        return Promise.resolve(this.address);
      }
      _fail(message, operation) {
        return Promise.resolve().then(() => {
          logger7.throwError(message, Logger.errors.UNSUPPORTED_OPERATION, { operation });
        });
      }
      signMessage(message) {
        return this._fail("VoidSigner cannot sign messages", "signMessage");
      }
      signTransaction(transaction) {
        return this._fail("VoidSigner cannot sign transactions", "signTransaction");
      }
      _signTypedData(domain, types, value) {
        return this._fail("VoidSigner cannot sign typed data", "signTypedData");
      }
      connect(provider) {
        return new VoidSigner(this.address, provider);
      }
    };
  }
});

// node_modules/@ethersproject/contracts/lib.esm/_version.js
var version4;
var init_version4 = __esm({
  "node_modules/@ethersproject/contracts/lib.esm/_version.js"() {
    init_react();
    version4 = "contracts/5.5.0";
  }
});

// node_modules/@ethersproject/contracts/lib.esm/index.js
function resolveName(resolver, nameOrPromise) {
  return __awaiter3(this, void 0, void 0, function* () {
    const name2 = yield nameOrPromise;
    if (typeof name2 !== "string") {
      logger8.throwArgumentError("invalid address or ENS name", "name", name2);
    }
    try {
      return getAddress(name2);
    } catch (error) {
    }
    if (!resolver) {
      logger8.throwError("a provider or signer is needed to resolve ENS names", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "resolveName"
      });
    }
    const address = yield resolver.resolveName(name2);
    if (address == null) {
      logger8.throwArgumentError("resolver or addr is not configured for ENS name", "name", name2);
    }
    return address;
  });
}
function resolveAddresses(resolver, value, paramType) {
  return __awaiter3(this, void 0, void 0, function* () {
    if (Array.isArray(paramType)) {
      return yield Promise.all(paramType.map((paramType2, index) => {
        return resolveAddresses(resolver, Array.isArray(value) ? value[index] : value[paramType2.name], paramType2);
      }));
    }
    if (paramType.type === "address") {
      return yield resolveName(resolver, value);
    }
    if (paramType.type === "tuple") {
      return yield resolveAddresses(resolver, value, paramType.components);
    }
    if (paramType.baseType === "array") {
      if (!Array.isArray(value)) {
        return Promise.reject(logger8.makeError("invalid value for array", Logger.errors.INVALID_ARGUMENT, {
          argument: "value",
          value
        }));
      }
      return yield Promise.all(value.map((v) => resolveAddresses(resolver, v, paramType.arrayChildren)));
    }
    return value;
  });
}
function populateTransaction(contract, fragment, args) {
  return __awaiter3(this, void 0, void 0, function* () {
    let overrides = {};
    if (args.length === fragment.inputs.length + 1 && typeof args[args.length - 1] === "object") {
      overrides = shallowCopy(args.pop());
    }
    logger8.checkArgumentCount(args.length, fragment.inputs.length, "passed to contract");
    if (contract.signer) {
      if (overrides.from) {
        overrides.from = resolveProperties({
          override: resolveName(contract.signer, overrides.from),
          signer: contract.signer.getAddress()
        }).then((check) => __awaiter3(this, void 0, void 0, function* () {
          if (getAddress(check.signer) !== check.override) {
            logger8.throwError("Contract with a Signer cannot override from", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "overrides.from"
            });
          }
          return check.override;
        }));
      } else {
        overrides.from = contract.signer.getAddress();
      }
    } else if (overrides.from) {
      overrides.from = resolveName(contract.provider, overrides.from);
    }
    const resolved = yield resolveProperties({
      args: resolveAddresses(contract.signer || contract.provider, args, fragment.inputs),
      address: contract.resolvedAddress,
      overrides: resolveProperties(overrides) || {}
    });
    const data = contract.interface.encodeFunctionData(fragment, resolved.args);
    const tx = {
      data,
      to: resolved.address
    };
    const ro = resolved.overrides;
    if (ro.nonce != null) {
      tx.nonce = BigNumber.from(ro.nonce).toNumber();
    }
    if (ro.gasLimit != null) {
      tx.gasLimit = BigNumber.from(ro.gasLimit);
    }
    if (ro.gasPrice != null) {
      tx.gasPrice = BigNumber.from(ro.gasPrice);
    }
    if (ro.maxFeePerGas != null) {
      tx.maxFeePerGas = BigNumber.from(ro.maxFeePerGas);
    }
    if (ro.maxPriorityFeePerGas != null) {
      tx.maxPriorityFeePerGas = BigNumber.from(ro.maxPriorityFeePerGas);
    }
    if (ro.from != null) {
      tx.from = ro.from;
    }
    if (ro.type != null) {
      tx.type = ro.type;
    }
    if (ro.accessList != null) {
      tx.accessList = accessListify(ro.accessList);
    }
    if (tx.gasLimit == null && fragment.gas != null) {
      let intrinsic = 21e3;
      const bytes = arrayify(data);
      for (let i = 0; i < bytes.length; i++) {
        intrinsic += 4;
        if (bytes[i]) {
          intrinsic += 64;
        }
      }
      tx.gasLimit = BigNumber.from(fragment.gas).add(intrinsic);
    }
    if (ro.value) {
      const roValue = BigNumber.from(ro.value);
      if (!roValue.isZero() && !fragment.payable) {
        logger8.throwError("non-payable method cannot override value", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "overrides.value",
          value: overrides.value
        });
      }
      tx.value = roValue;
    }
    if (ro.customData) {
      tx.customData = shallowCopy(ro.customData);
    }
    delete overrides.nonce;
    delete overrides.gasLimit;
    delete overrides.gasPrice;
    delete overrides.from;
    delete overrides.value;
    delete overrides.type;
    delete overrides.accessList;
    delete overrides.maxFeePerGas;
    delete overrides.maxPriorityFeePerGas;
    delete overrides.customData;
    const leftovers = Object.keys(overrides).filter((key) => overrides[key] != null);
    if (leftovers.length) {
      logger8.throwError(`cannot override ${leftovers.map((l) => JSON.stringify(l)).join(",")}`, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "overrides",
        overrides: leftovers
      });
    }
    return tx;
  });
}
function buildPopulate(contract, fragment) {
  return function(...args) {
    return populateTransaction(contract, fragment, args);
  };
}
function buildEstimate(contract, fragment) {
  const signerOrProvider = contract.signer || contract.provider;
  return function(...args) {
    return __awaiter3(this, void 0, void 0, function* () {
      if (!signerOrProvider) {
        logger8.throwError("estimate require a provider or signer", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "estimateGas"
        });
      }
      const tx = yield populateTransaction(contract, fragment, args);
      return yield signerOrProvider.estimateGas(tx);
    });
  };
}
function addContractWait(contract, tx) {
  const wait = tx.wait.bind(tx);
  tx.wait = (confirmations) => {
    return wait(confirmations).then((receipt) => {
      receipt.events = receipt.logs.map((log4) => {
        let event = deepCopy(log4);
        let parsed = null;
        try {
          parsed = contract.interface.parseLog(log4);
        } catch (e) {
        }
        if (parsed) {
          event.args = parsed.args;
          event.decode = (data, topics) => {
            return contract.interface.decodeEventLog(parsed.eventFragment, data, topics);
          };
          event.event = parsed.name;
          event.eventSignature = parsed.signature;
        }
        event.removeListener = () => {
          return contract.provider;
        };
        event.getBlock = () => {
          return contract.provider.getBlock(receipt.blockHash);
        };
        event.getTransaction = () => {
          return contract.provider.getTransaction(receipt.transactionHash);
        };
        event.getTransactionReceipt = () => {
          return Promise.resolve(receipt);
        };
        return event;
      });
      return receipt;
    });
  };
}
function buildCall(contract, fragment, collapseSimple) {
  const signerOrProvider = contract.signer || contract.provider;
  return function(...args) {
    return __awaiter3(this, void 0, void 0, function* () {
      let blockTag = void 0;
      if (args.length === fragment.inputs.length + 1 && typeof args[args.length - 1] === "object") {
        const overrides = shallowCopy(args.pop());
        if (overrides.blockTag != null) {
          blockTag = yield overrides.blockTag;
        }
        delete overrides.blockTag;
        args.push(overrides);
      }
      if (contract.deployTransaction != null) {
        yield contract._deployed(blockTag);
      }
      const tx = yield populateTransaction(contract, fragment, args);
      const result = yield signerOrProvider.call(tx, blockTag);
      try {
        let value = contract.interface.decodeFunctionResult(fragment, result);
        if (collapseSimple && fragment.outputs.length === 1) {
          value = value[0];
        }
        return value;
      } catch (error) {
        if (error.code === Logger.errors.CALL_EXCEPTION) {
          error.address = contract.address;
          error.args = args;
          error.transaction = tx;
        }
        throw error;
      }
    });
  };
}
function buildSend(contract, fragment) {
  return function(...args) {
    return __awaiter3(this, void 0, void 0, function* () {
      if (!contract.signer) {
        logger8.throwError("sending a transaction requires a signer", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "sendTransaction"
        });
      }
      if (contract.deployTransaction != null) {
        yield contract._deployed();
      }
      const txRequest = yield populateTransaction(contract, fragment, args);
      const tx = yield contract.signer.sendTransaction(txRequest);
      addContractWait(contract, tx);
      return tx;
    });
  };
}
function buildDefault(contract, fragment, collapseSimple) {
  if (fragment.constant) {
    return buildCall(contract, fragment, collapseSimple);
  }
  return buildSend(contract, fragment);
}
function getEventTag(filter) {
  if (filter.address && (filter.topics == null || filter.topics.length === 0)) {
    return "*";
  }
  return (filter.address || "*") + "@" + (filter.topics ? filter.topics.map((topic) => {
    if (Array.isArray(topic)) {
      return topic.join("|");
    }
    return topic;
  }).join(":") : "");
}
var __awaiter3, logger8, allowedTransactionKeys2, RunningEvent, ErrorRunningEvent, FragmentRunningEvent, WildcardRunningEvent, BaseContract, Contract, ContractFactory;
var init_lib16 = __esm({
  "node_modules/@ethersproject/contracts/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_lib13();
    init_lib14();
    init_lib15();
    init_lib7();
    init_lib3();
    init_lib2();
    init_lib4();
    init_lib12();
    init_lib();
    init_version4();
    __awaiter3 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger8 = new Logger(version4);
    allowedTransactionKeys2 = {
      chainId: true,
      data: true,
      from: true,
      gasLimit: true,
      gasPrice: true,
      nonce: true,
      to: true,
      value: true,
      type: true,
      accessList: true,
      maxFeePerGas: true,
      maxPriorityFeePerGas: true,
      customData: true
    };
    RunningEvent = class {
      constructor(tag, filter) {
        defineReadOnly(this, "tag", tag);
        defineReadOnly(this, "filter", filter);
        this._listeners = [];
      }
      addListener(listener, once) {
        this._listeners.push({ listener, once });
      }
      removeListener(listener) {
        let done = false;
        this._listeners = this._listeners.filter((item) => {
          if (done || item.listener !== listener) {
            return true;
          }
          done = true;
          return false;
        });
      }
      removeAllListeners() {
        this._listeners = [];
      }
      listeners() {
        return this._listeners.map((i) => i.listener);
      }
      listenerCount() {
        return this._listeners.length;
      }
      run(args) {
        const listenerCount = this.listenerCount();
        this._listeners = this._listeners.filter((item) => {
          const argsCopy = args.slice();
          setTimeout(() => {
            item.listener.apply(this, argsCopy);
          }, 0);
          return !item.once;
        });
        return listenerCount;
      }
      prepareEvent(event) {
      }
      getEmit(event) {
        return [event];
      }
    };
    ErrorRunningEvent = class extends RunningEvent {
      constructor() {
        super("error", null);
      }
    };
    FragmentRunningEvent = class extends RunningEvent {
      constructor(address, contractInterface, fragment, topics) {
        const filter = {
          address
        };
        let topic = contractInterface.getEventTopic(fragment);
        if (topics) {
          if (topic !== topics[0]) {
            logger8.throwArgumentError("topic mismatch", "topics", topics);
          }
          filter.topics = topics.slice();
        } else {
          filter.topics = [topic];
        }
        super(getEventTag(filter), filter);
        defineReadOnly(this, "address", address);
        defineReadOnly(this, "interface", contractInterface);
        defineReadOnly(this, "fragment", fragment);
      }
      prepareEvent(event) {
        super.prepareEvent(event);
        event.event = this.fragment.name;
        event.eventSignature = this.fragment.format();
        event.decode = (data, topics) => {
          return this.interface.decodeEventLog(this.fragment, data, topics);
        };
        try {
          event.args = this.interface.decodeEventLog(this.fragment, event.data, event.topics);
        } catch (error) {
          event.args = null;
          event.decodeError = error;
        }
      }
      getEmit(event) {
        const errors = checkResultErrors(event.args);
        if (errors.length) {
          throw errors[0].error;
        }
        const args = (event.args || []).slice();
        args.push(event);
        return args;
      }
    };
    WildcardRunningEvent = class extends RunningEvent {
      constructor(address, contractInterface) {
        super("*", { address });
        defineReadOnly(this, "address", address);
        defineReadOnly(this, "interface", contractInterface);
      }
      prepareEvent(event) {
        super.prepareEvent(event);
        try {
          const parsed = this.interface.parseLog(event);
          event.event = parsed.name;
          event.eventSignature = parsed.signature;
          event.decode = (data, topics) => {
            return this.interface.decodeEventLog(parsed.eventFragment, data, topics);
          };
          event.args = parsed.args;
        } catch (error) {
        }
      }
    };
    BaseContract = class {
      constructor(addressOrName, contractInterface, signerOrProvider) {
        logger8.checkNew(new.target, Contract);
        defineReadOnly(this, "interface", getStatic(new.target, "getInterface")(contractInterface));
        if (signerOrProvider == null) {
          defineReadOnly(this, "provider", null);
          defineReadOnly(this, "signer", null);
        } else if (Signer.isSigner(signerOrProvider)) {
          defineReadOnly(this, "provider", signerOrProvider.provider || null);
          defineReadOnly(this, "signer", signerOrProvider);
        } else if (Provider.isProvider(signerOrProvider)) {
          defineReadOnly(this, "provider", signerOrProvider);
          defineReadOnly(this, "signer", null);
        } else {
          logger8.throwArgumentError("invalid signer or provider", "signerOrProvider", signerOrProvider);
        }
        defineReadOnly(this, "callStatic", {});
        defineReadOnly(this, "estimateGas", {});
        defineReadOnly(this, "functions", {});
        defineReadOnly(this, "populateTransaction", {});
        defineReadOnly(this, "filters", {});
        {
          const uniqueFilters = {};
          Object.keys(this.interface.events).forEach((eventSignature) => {
            const event = this.interface.events[eventSignature];
            defineReadOnly(this.filters, eventSignature, (...args) => {
              return {
                address: this.address,
                topics: this.interface.encodeFilterTopics(event, args)
              };
            });
            if (!uniqueFilters[event.name]) {
              uniqueFilters[event.name] = [];
            }
            uniqueFilters[event.name].push(eventSignature);
          });
          Object.keys(uniqueFilters).forEach((name2) => {
            const filters = uniqueFilters[name2];
            if (filters.length === 1) {
              defineReadOnly(this.filters, name2, this.filters[filters[0]]);
            } else {
              logger8.warn(`Duplicate definition of ${name2} (${filters.join(", ")})`);
            }
          });
        }
        defineReadOnly(this, "_runningEvents", {});
        defineReadOnly(this, "_wrappedEmits", {});
        if (addressOrName == null) {
          logger8.throwArgumentError("invalid contract address or ENS name", "addressOrName", addressOrName);
        }
        defineReadOnly(this, "address", addressOrName);
        if (this.provider) {
          defineReadOnly(this, "resolvedAddress", resolveName(this.provider, addressOrName));
        } else {
          try {
            defineReadOnly(this, "resolvedAddress", Promise.resolve(getAddress(addressOrName)));
          } catch (error) {
            logger8.throwError("provider is required to use ENS name as contract address", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "new Contract"
            });
          }
        }
        const uniqueNames = {};
        const uniqueSignatures = {};
        Object.keys(this.interface.functions).forEach((signature) => {
          const fragment = this.interface.functions[signature];
          if (uniqueSignatures[signature]) {
            logger8.warn(`Duplicate ABI entry for ${JSON.stringify(signature)}`);
            return;
          }
          uniqueSignatures[signature] = true;
          {
            const name2 = fragment.name;
            if (!uniqueNames[`%${name2}`]) {
              uniqueNames[`%${name2}`] = [];
            }
            uniqueNames[`%${name2}`].push(signature);
          }
          if (this[signature] == null) {
            defineReadOnly(this, signature, buildDefault(this, fragment, true));
          }
          if (this.functions[signature] == null) {
            defineReadOnly(this.functions, signature, buildDefault(this, fragment, false));
          }
          if (this.callStatic[signature] == null) {
            defineReadOnly(this.callStatic, signature, buildCall(this, fragment, true));
          }
          if (this.populateTransaction[signature] == null) {
            defineReadOnly(this.populateTransaction, signature, buildPopulate(this, fragment));
          }
          if (this.estimateGas[signature] == null) {
            defineReadOnly(this.estimateGas, signature, buildEstimate(this, fragment));
          }
        });
        Object.keys(uniqueNames).forEach((name2) => {
          const signatures = uniqueNames[name2];
          if (signatures.length > 1) {
            return;
          }
          name2 = name2.substring(1);
          const signature = signatures[0];
          try {
            if (this[name2] == null) {
              defineReadOnly(this, name2, this[signature]);
            }
          } catch (e) {
          }
          if (this.functions[name2] == null) {
            defineReadOnly(this.functions, name2, this.functions[signature]);
          }
          if (this.callStatic[name2] == null) {
            defineReadOnly(this.callStatic, name2, this.callStatic[signature]);
          }
          if (this.populateTransaction[name2] == null) {
            defineReadOnly(this.populateTransaction, name2, this.populateTransaction[signature]);
          }
          if (this.estimateGas[name2] == null) {
            defineReadOnly(this.estimateGas, name2, this.estimateGas[signature]);
          }
        });
      }
      static getContractAddress(transaction) {
        return getContractAddress(transaction);
      }
      static getInterface(contractInterface) {
        if (Interface.isInterface(contractInterface)) {
          return contractInterface;
        }
        return new Interface(contractInterface);
      }
      deployed() {
        return this._deployed();
      }
      _deployed(blockTag) {
        if (!this._deployedPromise) {
          if (this.deployTransaction) {
            this._deployedPromise = this.deployTransaction.wait().then(() => {
              return this;
            });
          } else {
            this._deployedPromise = this.provider.getCode(this.address, blockTag).then((code) => {
              if (code === "0x") {
                logger8.throwError("contract not deployed", Logger.errors.UNSUPPORTED_OPERATION, {
                  contractAddress: this.address,
                  operation: "getDeployed"
                });
              }
              return this;
            });
          }
        }
        return this._deployedPromise;
      }
      fallback(overrides) {
        if (!this.signer) {
          logger8.throwError("sending a transactions require a signer", Logger.errors.UNSUPPORTED_OPERATION, { operation: "sendTransaction(fallback)" });
        }
        const tx = shallowCopy(overrides || {});
        ["from", "to"].forEach(function(key) {
          if (tx[key] == null) {
            return;
          }
          logger8.throwError("cannot override " + key, Logger.errors.UNSUPPORTED_OPERATION, { operation: key });
        });
        tx.to = this.resolvedAddress;
        return this.deployed().then(() => {
          return this.signer.sendTransaction(tx);
        });
      }
      connect(signerOrProvider) {
        if (typeof signerOrProvider === "string") {
          signerOrProvider = new VoidSigner(signerOrProvider, this.provider);
        }
        const contract = new this.constructor(this.address, this.interface, signerOrProvider);
        if (this.deployTransaction) {
          defineReadOnly(contract, "deployTransaction", this.deployTransaction);
        }
        return contract;
      }
      attach(addressOrName) {
        return new this.constructor(addressOrName, this.interface, this.signer || this.provider);
      }
      static isIndexed(value) {
        return Indexed.isIndexed(value);
      }
      _normalizeRunningEvent(runningEvent) {
        if (this._runningEvents[runningEvent.tag]) {
          return this._runningEvents[runningEvent.tag];
        }
        return runningEvent;
      }
      _getRunningEvent(eventName) {
        if (typeof eventName === "string") {
          if (eventName === "error") {
            return this._normalizeRunningEvent(new ErrorRunningEvent());
          }
          if (eventName === "event") {
            return this._normalizeRunningEvent(new RunningEvent("event", null));
          }
          if (eventName === "*") {
            return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
          }
          const fragment = this.interface.getEvent(eventName);
          return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment));
        }
        if (eventName.topics && eventName.topics.length > 0) {
          try {
            const topic = eventName.topics[0];
            if (typeof topic !== "string") {
              throw new Error("invalid topic");
            }
            const fragment = this.interface.getEvent(topic);
            return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment, eventName.topics));
          } catch (error) {
          }
          const filter = {
            address: this.address,
            topics: eventName.topics
          };
          return this._normalizeRunningEvent(new RunningEvent(getEventTag(filter), filter));
        }
        return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
      }
      _checkRunningEvents(runningEvent) {
        if (runningEvent.listenerCount() === 0) {
          delete this._runningEvents[runningEvent.tag];
          const emit = this._wrappedEmits[runningEvent.tag];
          if (emit && runningEvent.filter) {
            this.provider.off(runningEvent.filter, emit);
            delete this._wrappedEmits[runningEvent.tag];
          }
        }
      }
      _wrapEvent(runningEvent, log4, listener) {
        const event = deepCopy(log4);
        event.removeListener = () => {
          if (!listener) {
            return;
          }
          runningEvent.removeListener(listener);
          this._checkRunningEvents(runningEvent);
        };
        event.getBlock = () => {
          return this.provider.getBlock(log4.blockHash);
        };
        event.getTransaction = () => {
          return this.provider.getTransaction(log4.transactionHash);
        };
        event.getTransactionReceipt = () => {
          return this.provider.getTransactionReceipt(log4.transactionHash);
        };
        runningEvent.prepareEvent(event);
        return event;
      }
      _addEventListener(runningEvent, listener, once) {
        if (!this.provider) {
          logger8.throwError("events require a provider or a signer with a provider", Logger.errors.UNSUPPORTED_OPERATION, { operation: "once" });
        }
        runningEvent.addListener(listener, once);
        this._runningEvents[runningEvent.tag] = runningEvent;
        if (!this._wrappedEmits[runningEvent.tag]) {
          const wrappedEmit = (log4) => {
            let event = this._wrapEvent(runningEvent, log4, listener);
            if (event.decodeError == null) {
              try {
                const args = runningEvent.getEmit(event);
                this.emit(runningEvent.filter, ...args);
              } catch (error) {
                event.decodeError = error.error;
              }
            }
            if (runningEvent.filter != null) {
              this.emit("event", event);
            }
            if (event.decodeError != null) {
              this.emit("error", event.decodeError, event);
            }
          };
          this._wrappedEmits[runningEvent.tag] = wrappedEmit;
          if (runningEvent.filter != null) {
            this.provider.on(runningEvent.filter, wrappedEmit);
          }
        }
      }
      queryFilter(event, fromBlockOrBlockhash, toBlock) {
        const runningEvent = this._getRunningEvent(event);
        const filter = shallowCopy(runningEvent.filter);
        if (typeof fromBlockOrBlockhash === "string" && isHexString(fromBlockOrBlockhash, 32)) {
          if (toBlock != null) {
            logger8.throwArgumentError("cannot specify toBlock with blockhash", "toBlock", toBlock);
          }
          filter.blockHash = fromBlockOrBlockhash;
        } else {
          filter.fromBlock = fromBlockOrBlockhash != null ? fromBlockOrBlockhash : 0;
          filter.toBlock = toBlock != null ? toBlock : "latest";
        }
        return this.provider.getLogs(filter).then((logs) => {
          return logs.map((log4) => this._wrapEvent(runningEvent, log4, null));
        });
      }
      on(event, listener) {
        this._addEventListener(this._getRunningEvent(event), listener, false);
        return this;
      }
      once(event, listener) {
        this._addEventListener(this._getRunningEvent(event), listener, true);
        return this;
      }
      emit(eventName, ...args) {
        if (!this.provider) {
          return false;
        }
        const runningEvent = this._getRunningEvent(eventName);
        const result = runningEvent.run(args) > 0;
        this._checkRunningEvents(runningEvent);
        return result;
      }
      listenerCount(eventName) {
        if (!this.provider) {
          return 0;
        }
        if (eventName == null) {
          return Object.keys(this._runningEvents).reduce((accum, key) => {
            return accum + this._runningEvents[key].listenerCount();
          }, 0);
        }
        return this._getRunningEvent(eventName).listenerCount();
      }
      listeners(eventName) {
        if (!this.provider) {
          return [];
        }
        if (eventName == null) {
          const result = [];
          for (let tag in this._runningEvents) {
            this._runningEvents[tag].listeners().forEach((listener) => {
              result.push(listener);
            });
          }
          return result;
        }
        return this._getRunningEvent(eventName).listeners();
      }
      removeAllListeners(eventName) {
        if (!this.provider) {
          return this;
        }
        if (eventName == null) {
          for (const tag in this._runningEvents) {
            const runningEvent2 = this._runningEvents[tag];
            runningEvent2.removeAllListeners();
            this._checkRunningEvents(runningEvent2);
          }
          return this;
        }
        const runningEvent = this._getRunningEvent(eventName);
        runningEvent.removeAllListeners();
        this._checkRunningEvents(runningEvent);
        return this;
      }
      off(eventName, listener) {
        if (!this.provider) {
          return this;
        }
        const runningEvent = this._getRunningEvent(eventName);
        runningEvent.removeListener(listener);
        this._checkRunningEvents(runningEvent);
        return this;
      }
      removeListener(eventName, listener) {
        return this.off(eventName, listener);
      }
    };
    Contract = class extends BaseContract {
    };
    ContractFactory = class {
      constructor(contractInterface, bytecode, signer) {
        let bytecodeHex = null;
        if (typeof bytecode === "string") {
          bytecodeHex = bytecode;
        } else if (isBytes(bytecode)) {
          bytecodeHex = hexlify(bytecode);
        } else if (bytecode && typeof bytecode.object === "string") {
          bytecodeHex = bytecode.object;
        } else {
          bytecodeHex = "!";
        }
        if (bytecodeHex.substring(0, 2) !== "0x") {
          bytecodeHex = "0x" + bytecodeHex;
        }
        if (!isHexString(bytecodeHex) || bytecodeHex.length % 2) {
          logger8.throwArgumentError("invalid bytecode", "bytecode", bytecode);
        }
        if (signer && !Signer.isSigner(signer)) {
          logger8.throwArgumentError("invalid signer", "signer", signer);
        }
        defineReadOnly(this, "bytecode", bytecodeHex);
        defineReadOnly(this, "interface", getStatic(new.target, "getInterface")(contractInterface));
        defineReadOnly(this, "signer", signer || null);
      }
      getDeployTransaction(...args) {
        let tx = {};
        if (args.length === this.interface.deploy.inputs.length + 1 && typeof args[args.length - 1] === "object") {
          tx = shallowCopy(args.pop());
          for (const key in tx) {
            if (!allowedTransactionKeys2[key]) {
              throw new Error("unknown transaction override " + key);
            }
          }
        }
        ["data", "from", "to"].forEach((key) => {
          if (tx[key] == null) {
            return;
          }
          logger8.throwError("cannot override " + key, Logger.errors.UNSUPPORTED_OPERATION, { operation: key });
        });
        if (tx.value) {
          const value = BigNumber.from(tx.value);
          if (!value.isZero() && !this.interface.deploy.payable) {
            logger8.throwError("non-payable constructor cannot override value", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "overrides.value",
              value: tx.value
            });
          }
        }
        logger8.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor");
        tx.data = hexlify(concat([
          this.bytecode,
          this.interface.encodeDeploy(args)
        ]));
        return tx;
      }
      deploy(...args) {
        return __awaiter3(this, void 0, void 0, function* () {
          let overrides = {};
          if (args.length === this.interface.deploy.inputs.length + 1) {
            overrides = args.pop();
          }
          logger8.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor");
          const params = yield resolveAddresses(this.signer, args, this.interface.deploy.inputs);
          params.push(overrides);
          const unsignedTx = this.getDeployTransaction(...params);
          const tx = yield this.signer.sendTransaction(unsignedTx);
          const address = getStatic(this.constructor, "getContractAddress")(tx);
          const contract = getStatic(this.constructor, "getContract")(address, this.interface, this.signer);
          addContractWait(contract, tx);
          defineReadOnly(contract, "deployTransaction", tx);
          return contract;
        });
      }
      attach(address) {
        return this.constructor.getContract(address, this.interface, this.signer);
      }
      connect(signer) {
        return new this.constructor(this.interface, this.bytecode, signer);
      }
      static fromSolidity(compilerOutput, signer) {
        if (compilerOutput == null) {
          logger8.throwError("missing compiler output", Logger.errors.MISSING_ARGUMENT, { argument: "compilerOutput" });
        }
        if (typeof compilerOutput === "string") {
          compilerOutput = JSON.parse(compilerOutput);
        }
        const abi = compilerOutput.abi;
        let bytecode = null;
        if (compilerOutput.bytecode) {
          bytecode = compilerOutput.bytecode;
        } else if (compilerOutput.evm && compilerOutput.evm.bytecode) {
          bytecode = compilerOutput.evm.bytecode;
        }
        return new this(abi, bytecode, signer);
      }
      static getInterface(contractInterface) {
        return Contract.getInterface(contractInterface);
      }
      static getContractAddress(tx) {
        return getContractAddress(tx);
      }
      static getContract(address, contractInterface, signer) {
        return new Contract(address, contractInterface, signer);
      }
    };
  }
});

// node_modules/@ethersproject/basex/lib.esm/index.js
var BaseX, Base32, Base58;
var init_lib17 = __esm({
  "node_modules/@ethersproject/basex/lib.esm/index.js"() {
    init_react();
    init_lib2();
    init_lib4();
    BaseX = class {
      constructor(alphabet) {
        defineReadOnly(this, "alphabet", alphabet);
        defineReadOnly(this, "base", alphabet.length);
        defineReadOnly(this, "_alphabetMap", {});
        defineReadOnly(this, "_leader", alphabet.charAt(0));
        for (let i = 0; i < alphabet.length; i++) {
          this._alphabetMap[alphabet.charAt(i)] = i;
        }
      }
      encode(value) {
        let source = arrayify(value);
        if (source.length === 0) {
          return "";
        }
        let digits = [0];
        for (let i = 0; i < source.length; ++i) {
          let carry = source[i];
          for (let j = 0; j < digits.length; ++j) {
            carry += digits[j] << 8;
            digits[j] = carry % this.base;
            carry = carry / this.base | 0;
          }
          while (carry > 0) {
            digits.push(carry % this.base);
            carry = carry / this.base | 0;
          }
        }
        let string = "";
        for (let k = 0; source[k] === 0 && k < source.length - 1; ++k) {
          string += this._leader;
        }
        for (let q = digits.length - 1; q >= 0; --q) {
          string += this.alphabet[digits[q]];
        }
        return string;
      }
      decode(value) {
        if (typeof value !== "string") {
          throw new TypeError("Expected String");
        }
        let bytes = [];
        if (value.length === 0) {
          return new Uint8Array(bytes);
        }
        bytes.push(0);
        for (let i = 0; i < value.length; i++) {
          let byte = this._alphabetMap[value[i]];
          if (byte === void 0) {
            throw new Error("Non-base" + this.base + " character");
          }
          let carry = byte;
          for (let j = 0; j < bytes.length; ++j) {
            carry += bytes[j] * this.base;
            bytes[j] = carry & 255;
            carry >>= 8;
          }
          while (carry > 0) {
            bytes.push(carry & 255);
            carry >>= 8;
          }
        }
        for (let k = 0; value[k] === this._leader && k < value.length - 1; ++k) {
          bytes.push(0);
        }
        return arrayify(new Uint8Array(bytes.reverse()));
      }
    };
    Base32 = new BaseX("abcdefghijklmnopqrstuvwxyz234567");
    Base58 = new BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
  }
});

// node_modules/@ethersproject/sha2/lib.esm/types.js
var SupportedAlgorithm;
var init_types = __esm({
  "node_modules/@ethersproject/sha2/lib.esm/types.js"() {
    init_react();
    (function(SupportedAlgorithm2) {
      SupportedAlgorithm2["sha256"] = "sha256";
      SupportedAlgorithm2["sha512"] = "sha512";
    })(SupportedAlgorithm || (SupportedAlgorithm = {}));
  }
});

// node_modules/@ethersproject/sha2/lib.esm/_version.js
var version5;
var init_version5 = __esm({
  "node_modules/@ethersproject/sha2/lib.esm/_version.js"() {
    init_react();
    version5 = "sha2/5.5.0";
  }
});

// node_modules/@ethersproject/sha2/lib.esm/sha2.js
function ripemd160(data) {
  return "0x" + import_hash2.default.ripemd160().update(arrayify(data)).digest("hex");
}
function sha256(data) {
  return "0x" + import_hash2.default.sha256().update(arrayify(data)).digest("hex");
}
function sha512(data) {
  return "0x" + import_hash2.default.sha512().update(arrayify(data)).digest("hex");
}
function computeHmac(algorithm, key, data) {
  if (!SupportedAlgorithm[algorithm]) {
    logger9.throwError("unsupported algorithm " + algorithm, Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "hmac",
      algorithm
    });
  }
  return "0x" + import_hash2.default.hmac(import_hash2.default[algorithm], arrayify(key)).update(arrayify(data)).digest("hex");
}
var import_hash2, logger9;
var init_sha2 = __esm({
  "node_modules/@ethersproject/sha2/lib.esm/sha2.js"() {
    "use strict";
    init_react();
    import_hash2 = __toESM(require_hash());
    init_lib2();
    init_types();
    init_lib();
    init_version5();
    logger9 = new Logger(version5);
  }
});

// node_modules/@ethersproject/sha2/lib.esm/index.js
var init_lib18 = __esm({
  "node_modules/@ethersproject/sha2/lib.esm/index.js"() {
    init_react();
    init_sha2();
    init_types();
  }
});

// node_modules/@ethersproject/pbkdf2/lib.esm/pbkdf2.js
function pbkdf2(password, salt, iterations, keylen, hashAlgorithm) {
  password = arrayify(password);
  salt = arrayify(salt);
  let hLen;
  let l = 1;
  const DK = new Uint8Array(keylen);
  const block1 = new Uint8Array(salt.length + 4);
  block1.set(salt);
  let r;
  let T;
  for (let i = 1; i <= l; i++) {
    block1[salt.length] = i >> 24 & 255;
    block1[salt.length + 1] = i >> 16 & 255;
    block1[salt.length + 2] = i >> 8 & 255;
    block1[salt.length + 3] = i & 255;
    let U = arrayify(computeHmac(hashAlgorithm, password, block1));
    if (!hLen) {
      hLen = U.length;
      T = new Uint8Array(hLen);
      l = Math.ceil(keylen / hLen);
      r = keylen - (l - 1) * hLen;
    }
    T.set(U);
    for (let j = 1; j < iterations; j++) {
      U = arrayify(computeHmac(hashAlgorithm, password, U));
      for (let k = 0; k < hLen; k++)
        T[k] ^= U[k];
    }
    const destPos = (i - 1) * hLen;
    const len = i === l ? r : hLen;
    DK.set(arrayify(T).slice(0, len), destPos);
  }
  return hexlify(DK);
}
var init_pbkdf2 = __esm({
  "node_modules/@ethersproject/pbkdf2/lib.esm/pbkdf2.js"() {
    "use strict";
    init_react();
    init_lib2();
    init_lib18();
  }
});

// node_modules/@ethersproject/pbkdf2/lib.esm/index.js
var init_lib19 = __esm({
  "node_modules/@ethersproject/pbkdf2/lib.esm/index.js"() {
    init_react();
    init_pbkdf2();
  }
});

// node_modules/@ethersproject/wordlists/lib.esm/_version.js
var version6;
var init_version6 = __esm({
  "node_modules/@ethersproject/wordlists/lib.esm/_version.js"() {
    init_react();
    version6 = "wordlists/5.5.0";
  }
});

// node_modules/@ethersproject/wordlists/lib.esm/wordlist.js
var exportWordlist, logger10, Wordlist;
var init_wordlist = __esm({
  "node_modules/@ethersproject/wordlists/lib.esm/wordlist.js"() {
    "use strict";
    init_react();
    init_lib10();
    init_lib4();
    init_lib();
    init_version6();
    exportWordlist = false;
    logger10 = new Logger(version6);
    Wordlist = class {
      constructor(locale) {
        logger10.checkAbstract(new.target, Wordlist);
        defineReadOnly(this, "locale", locale);
      }
      split(mnemonic) {
        return mnemonic.toLowerCase().split(/ +/g);
      }
      join(words2) {
        return words2.join(" ");
      }
      static check(wordlist2) {
        const words2 = [];
        for (let i = 0; i < 2048; i++) {
          const word = wordlist2.getWord(i);
          if (i !== wordlist2.getWordIndex(word)) {
            return "0x";
          }
          words2.push(word);
        }
        return id(words2.join("\n") + "\n");
      }
      static register(lang, name2) {
        if (!name2) {
          name2 = lang.locale;
        }
        if (exportWordlist) {
          try {
            const anyGlobal2 = window;
            if (anyGlobal2._ethers && anyGlobal2._ethers.wordlists) {
              if (!anyGlobal2._ethers.wordlists[name2]) {
                defineReadOnly(anyGlobal2._ethers.wordlists, name2, lang);
              }
            }
          } catch (error) {
          }
        }
      }
    };
  }
});

// node_modules/@ethersproject/wordlists/lib.esm/lang-en.js
function loadWords(lang) {
  if (wordlist != null) {
    return;
  }
  wordlist = words.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ");
  if (Wordlist.check(lang) !== "0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60") {
    wordlist = null;
    throw new Error("BIP39 Wordlist for en (English) FAILED");
  }
}
var words, wordlist, LangEn, langEn;
var init_lang_en = __esm({
  "node_modules/@ethersproject/wordlists/lib.esm/lang-en.js"() {
    "use strict";
    init_react();
    init_wordlist();
    words = "AbandonAbilityAbleAboutAboveAbsentAbsorbAbstractAbsurdAbuseAccessAccidentAccountAccuseAchieveAcidAcousticAcquireAcrossActActionActorActressActualAdaptAddAddictAddressAdjustAdmitAdultAdvanceAdviceAerobicAffairAffordAfraidAgainAgeAgentAgreeAheadAimAirAirportAisleAlarmAlbumAlcoholAlertAlienAllAlleyAllowAlmostAloneAlphaAlreadyAlsoAlterAlwaysAmateurAmazingAmongAmountAmusedAnalystAnchorAncientAngerAngleAngryAnimalAnkleAnnounceAnnualAnotherAnswerAntennaAntiqueAnxietyAnyApartApologyAppearAppleApproveAprilArchArcticAreaArenaArgueArmArmedArmorArmyAroundArrangeArrestArriveArrowArtArtefactArtistArtworkAskAspectAssaultAssetAssistAssumeAsthmaAthleteAtomAttackAttendAttitudeAttractAuctionAuditAugustAuntAuthorAutoAutumnAverageAvocadoAvoidAwakeAwareAwayAwesomeAwfulAwkwardAxisBabyBachelorBaconBadgeBagBalanceBalconyBallBambooBananaBannerBarBarelyBargainBarrelBaseBasicBasketBattleBeachBeanBeautyBecauseBecomeBeefBeforeBeginBehaveBehindBelieveBelowBeltBenchBenefitBestBetrayBetterBetweenBeyondBicycleBidBikeBindBiologyBirdBirthBitterBlackBladeBlameBlanketBlastBleakBlessBlindBloodBlossomBlouseBlueBlurBlushBoardBoatBodyBoilBombBoneBonusBookBoostBorderBoringBorrowBossBottomBounceBoxBoyBracketBrainBrandBrassBraveBreadBreezeBrickBridgeBriefBrightBringBriskBroccoliBrokenBronzeBroomBrotherBrownBrushBubbleBuddyBudgetBuffaloBuildBulbBulkBulletBundleBunkerBurdenBurgerBurstBusBusinessBusyButterBuyerBuzzCabbageCabinCableCactusCageCakeCallCalmCameraCampCanCanalCancelCandyCannonCanoeCanvasCanyonCapableCapitalCaptainCarCarbonCardCargoCarpetCarryCartCaseCashCasinoCastleCasualCatCatalogCatchCategoryCattleCaughtCauseCautionCaveCeilingCeleryCementCensusCenturyCerealCertainChairChalkChampionChangeChaosChapterChargeChaseChatCheapCheckCheeseChefCherryChestChickenChiefChildChimneyChoiceChooseChronicChuckleChunkChurnCigarCinnamonCircleCitizenCityCivilClaimClapClarifyClawClayCleanClerkCleverClickClientCliffClimbClinicClipClockClogCloseClothCloudClownClubClumpClusterClutchCoachCoastCoconutCodeCoffeeCoilCoinCollectColorColumnCombineComeComfortComicCommonCompanyConcertConductConfirmCongressConnectConsiderControlConvinceCookCoolCopperCopyCoralCoreCornCorrectCostCottonCouchCountryCoupleCourseCousinCoverCoyoteCrackCradleCraftCramCraneCrashCraterCrawlCrazyCreamCreditCreekCrewCricketCrimeCrispCriticCropCrossCrouchCrowdCrucialCruelCruiseCrumbleCrunchCrushCryCrystalCubeCultureCupCupboardCuriousCurrentCurtainCurveCushionCustomCuteCycleDadDamageDampDanceDangerDaringDashDaughterDawnDayDealDebateDebrisDecadeDecemberDecideDeclineDecorateDecreaseDeerDefenseDefineDefyDegreeDelayDeliverDemandDemiseDenialDentistDenyDepartDependDepositDepthDeputyDeriveDescribeDesertDesignDeskDespairDestroyDetailDetectDevelopDeviceDevoteDiagramDialDiamondDiaryDiceDieselDietDifferDigitalDignityDilemmaDinnerDinosaurDirectDirtDisagreeDiscoverDiseaseDishDismissDisorderDisplayDistanceDivertDivideDivorceDizzyDoctorDocumentDogDollDolphinDomainDonateDonkeyDonorDoorDoseDoubleDoveDraftDragonDramaDrasticDrawDreamDressDriftDrillDrinkDripDriveDropDrumDryDuckDumbDuneDuringDustDutchDutyDwarfDynamicEagerEagleEarlyEarnEarthEasilyEastEasyEchoEcologyEconomyEdgeEditEducateEffortEggEightEitherElbowElderElectricElegantElementElephantElevatorEliteElseEmbarkEmbodyEmbraceEmergeEmotionEmployEmpowerEmptyEnableEnactEndEndlessEndorseEnemyEnergyEnforceEngageEngineEnhanceEnjoyEnlistEnoughEnrichEnrollEnsureEnterEntireEntryEnvelopeEpisodeEqualEquipEraEraseErodeErosionErrorEruptEscapeEssayEssenceEstateEternalEthicsEvidenceEvilEvokeEvolveExactExampleExcessExchangeExciteExcludeExcuseExecuteExerciseExhaustExhibitExileExistExitExoticExpandExpectExpireExplainExposeExpressExtendExtraEyeEyebrowFabricFaceFacultyFadeFaintFaithFallFalseFameFamilyFamousFanFancyFantasyFarmFashionFatFatalFatherFatigueFaultFavoriteFeatureFebruaryFederalFeeFeedFeelFemaleFenceFestivalFetchFeverFewFiberFictionFieldFigureFileFilmFilterFinalFindFineFingerFinishFireFirmFirstFiscalFishFitFitnessFixFlagFlameFlashFlatFlavorFleeFlightFlipFloatFlockFloorFlowerFluidFlushFlyFoamFocusFogFoilFoldFollowFoodFootForceForestForgetForkFortuneForumForwardFossilFosterFoundFoxFragileFrameFrequentFreshFriendFringeFrogFrontFrostFrownFrozenFruitFuelFunFunnyFurnaceFuryFutureGadgetGainGalaxyGalleryGameGapGarageGarbageGardenGarlicGarmentGasGaspGateGatherGaugeGazeGeneralGeniusGenreGentleGenuineGestureGhostGiantGiftGiggleGingerGiraffeGirlGiveGladGlanceGlareGlassGlideGlimpseGlobeGloomGloryGloveGlowGlueGoatGoddessGoldGoodGooseGorillaGospelGossipGovernGownGrabGraceGrainGrantGrapeGrassGravityGreatGreenGridGriefGritGroceryGroupGrowGruntGuardGuessGuideGuiltGuitarGunGymHabitHairHalfHammerHamsterHandHappyHarborHardHarshHarvestHatHaveHawkHazardHeadHealthHeartHeavyHedgehogHeightHelloHelmetHelpHenHeroHiddenHighHillHintHipHireHistoryHobbyHockeyHoldHoleHolidayHollowHomeHoneyHoodHopeHornHorrorHorseHospitalHostHotelHourHoverHubHugeHumanHumbleHumorHundredHungryHuntHurdleHurryHurtHusbandHybridIceIconIdeaIdentifyIdleIgnoreIllIllegalIllnessImageImitateImmenseImmuneImpactImposeImproveImpulseInchIncludeIncomeIncreaseIndexIndicateIndoorIndustryInfantInflictInformInhaleInheritInitialInjectInjuryInmateInnerInnocentInputInquiryInsaneInsectInsideInspireInstallIntactInterestIntoInvestInviteInvolveIronIslandIsolateIssueItemIvoryJacketJaguarJarJazzJealousJeansJellyJewelJobJoinJokeJourneyJoyJudgeJuiceJumpJungleJuniorJunkJustKangarooKeenKeepKetchupKeyKickKidKidneyKindKingdomKissKitKitchenKiteKittenKiwiKneeKnifeKnockKnowLabLabelLaborLadderLadyLakeLampLanguageLaptopLargeLaterLatinLaughLaundryLavaLawLawnLawsuitLayerLazyLeaderLeafLearnLeaveLectureLeftLegLegalLegendLeisureLemonLendLengthLensLeopardLessonLetterLevelLiarLibertyLibraryLicenseLifeLiftLightLikeLimbLimitLinkLionLiquidListLittleLiveLizardLoadLoanLobsterLocalLockLogicLonelyLongLoopLotteryLoudLoungeLoveLoyalLuckyLuggageLumberLunarLunchLuxuryLyricsMachineMadMagicMagnetMaidMailMainMajorMakeMammalManManageMandateMangoMansionManualMapleMarbleMarchMarginMarineMarketMarriageMaskMassMasterMatchMaterialMathMatrixMatterMaximumMazeMeadowMeanMeasureMeatMechanicMedalMediaMelodyMeltMemberMemoryMentionMenuMercyMergeMeritMerryMeshMessageMetalMethodMiddleMidnightMilkMillionMimicMindMinimumMinorMinuteMiracleMirrorMiseryMissMistakeMixMixedMixtureMobileModelModifyMomMomentMonitorMonkeyMonsterMonthMoonMoralMoreMorningMosquitoMotherMotionMotorMountainMouseMoveMovieMuchMuffinMuleMultiplyMuscleMuseumMushroomMusicMustMutualMyselfMysteryMythNaiveNameNapkinNarrowNastyNationNatureNearNeckNeedNegativeNeglectNeitherNephewNerveNestNetNetworkNeutralNeverNewsNextNiceNightNobleNoiseNomineeNoodleNormalNorthNoseNotableNoteNothingNoticeNovelNowNuclearNumberNurseNutOakObeyObjectObligeObscureObserveObtainObviousOccurOceanOctoberOdorOffOfferOfficeOftenOilOkayOldOliveOlympicOmitOnceOneOnionOnlineOnlyOpenOperaOpinionOpposeOptionOrangeOrbitOrchardOrderOrdinaryOrganOrientOriginalOrphanOstrichOtherOutdoorOuterOutputOutsideOvalOvenOverOwnOwnerOxygenOysterOzonePactPaddlePagePairPalacePalmPandaPanelPanicPantherPaperParadeParentParkParrotPartyPassPatchPathPatientPatrolPatternPausePavePaymentPeacePeanutPearPeasantPelicanPenPenaltyPencilPeoplePepperPerfectPermitPersonPetPhonePhotoPhrasePhysicalPianoPicnicPicturePiecePigPigeonPillPilotPinkPioneerPipePistolPitchPizzaPlacePlanetPlasticPlatePlayPleasePledgePluckPlugPlungePoemPoetPointPolarPolePolicePondPonyPoolPopularPortionPositionPossiblePostPotatoPotteryPovertyPowderPowerPracticePraisePredictPreferPreparePresentPrettyPreventPricePridePrimaryPrintPriorityPrisonPrivatePrizeProblemProcessProduceProfitProgramProjectPromoteProofPropertyProsperProtectProudProvidePublicPuddingPullPulpPulsePumpkinPunchPupilPuppyPurchasePurityPurposePursePushPutPuzzlePyramidQualityQuantumQuarterQuestionQuickQuitQuizQuoteRabbitRaccoonRaceRackRadarRadioRailRainRaiseRallyRampRanchRandomRangeRapidRareRateRatherRavenRawRazorReadyRealReasonRebelRebuildRecallReceiveRecipeRecordRecycleReduceReflectReformRefuseRegionRegretRegularRejectRelaxReleaseReliefRelyRemainRememberRemindRemoveRenderRenewRentReopenRepairRepeatReplaceReportRequireRescueResembleResistResourceResponseResultRetireRetreatReturnReunionRevealReviewRewardRhythmRibRibbonRiceRichRideRidgeRifleRightRigidRingRiotRippleRiskRitualRivalRiverRoadRoastRobotRobustRocketRomanceRoofRookieRoomRoseRotateRoughRoundRouteRoyalRubberRudeRugRuleRunRunwayRuralSadSaddleSadnessSafeSailSaladSalmonSalonSaltSaluteSameSampleSandSatisfySatoshiSauceSausageSaveSayScaleScanScareScatterSceneSchemeSchoolScienceScissorsScorpionScoutScrapScreenScriptScrubSeaSearchSeasonSeatSecondSecretSectionSecuritySeedSeekSegmentSelectSellSeminarSeniorSenseSentenceSeriesServiceSessionSettleSetupSevenShadowShaftShallowShareShedShellSheriffShieldShiftShineShipShiverShockShoeShootShopShortShoulderShoveShrimpShrugShuffleShySiblingSickSideSiegeSightSignSilentSilkSillySilverSimilarSimpleSinceSingSirenSisterSituateSixSizeSkateSketchSkiSkillSkinSkirtSkullSlabSlamSleepSlenderSliceSlideSlightSlimSloganSlotSlowSlushSmallSmartSmileSmokeSmoothSnackSnakeSnapSniffSnowSoapSoccerSocialSockSodaSoftSolarSoldierSolidSolutionSolveSomeoneSongSoonSorrySortSoulSoundSoupSourceSouthSpaceSpareSpatialSpawnSpeakSpecialSpeedSpellSpendSphereSpiceSpiderSpikeSpinSpiritSplitSpoilSponsorSpoonSportSpotSpraySpreadSpringSpySquareSqueezeSquirrelStableStadiumStaffStageStairsStampStandStartStateStaySteakSteelStemStepStereoStickStillStingStockStomachStoneStoolStoryStoveStrategyStreetStrikeStrongStruggleStudentStuffStumbleStyleSubjectSubmitSubwaySuccessSuchSuddenSufferSugarSuggestSuitSummerSunSunnySunsetSuperSupplySupremeSureSurfaceSurgeSurpriseSurroundSurveySuspectSustainSwallowSwampSwapSwarmSwearSweetSwiftSwimSwingSwitchSwordSymbolSymptomSyrupSystemTableTackleTagTailTalentTalkTankTapeTargetTaskTasteTattooTaxiTeachTeamTellTenTenantTennisTentTermTestTextThankThatThemeThenTheoryThereTheyThingThisThoughtThreeThriveThrowThumbThunderTicketTideTigerTiltTimberTimeTinyTipTiredTissueTitleToastTobaccoTodayToddlerToeTogetherToiletTokenTomatoTomorrowToneTongueTonightToolToothTopTopicToppleTorchTornadoTortoiseTossTotalTouristTowardTowerTownToyTrackTradeTrafficTragicTrainTransferTrapTrashTravelTrayTreatTreeTrendTrialTribeTrickTriggerTrimTripTrophyTroubleTruckTrueTrulyTrumpetTrustTruthTryTubeTuitionTumbleTunaTunnelTurkeyTurnTurtleTwelveTwentyTwiceTwinTwistTwoTypeTypicalUglyUmbrellaUnableUnawareUncleUncoverUnderUndoUnfairUnfoldUnhappyUniformUniqueUnitUniverseUnknownUnlockUntilUnusualUnveilUpdateUpgradeUpholdUponUpperUpsetUrbanUrgeUsageUseUsedUsefulUselessUsualUtilityVacantVacuumVagueValidValleyValveVanVanishVaporVariousVastVaultVehicleVelvetVendorVentureVenueVerbVerifyVersionVeryVesselVeteranViableVibrantViciousVictoryVideoViewVillageVintageViolinVirtualVirusVisaVisitVisualVitalVividVocalVoiceVoidVolcanoVolumeVoteVoyageWageWagonWaitWalkWallWalnutWantWarfareWarmWarriorWashWaspWasteWaterWaveWayWealthWeaponWearWeaselWeatherWebWeddingWeekendWeirdWelcomeWestWetWhaleWhatWheatWheelWhenWhereWhipWhisperWideWidthWifeWildWillWinWindowWineWingWinkWinnerWinterWireWisdomWiseWishWitnessWolfWomanWonderWoodWoolWordWorkWorldWorryWorthWrapWreckWrestleWristWriteWrongYardYearYellowYouYoungYouthZebraZeroZoneZoo";
    wordlist = null;
    LangEn = class extends Wordlist {
      constructor() {
        super("en");
      }
      getWord(index) {
        loadWords(this);
        return wordlist[index];
      }
      getWordIndex(word) {
        loadWords(this);
        return wordlist.indexOf(word);
      }
    };
    langEn = new LangEn();
    Wordlist.register(langEn);
  }
});

// node_modules/@ethersproject/wordlists/lib.esm/wordlists.js
var wordlists;
var init_wordlists = __esm({
  "node_modules/@ethersproject/wordlists/lib.esm/wordlists.js"() {
    "use strict";
    init_react();
    init_lang_en();
    wordlists = {
      en: langEn
    };
  }
});

// node_modules/@ethersproject/wordlists/lib.esm/index.js
var init_lib20 = __esm({
  "node_modules/@ethersproject/wordlists/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_wordlist();
    init_wordlists();
  }
});

// node_modules/@ethersproject/hdnode/lib.esm/_version.js
var version7;
var init_version7 = __esm({
  "node_modules/@ethersproject/hdnode/lib.esm/_version.js"() {
    init_react();
    version7 = "hdnode/5.5.0";
  }
});

// node_modules/@ethersproject/hdnode/lib.esm/index.js
function getUpperMask(bits) {
  return (1 << bits) - 1 << 8 - bits;
}
function getLowerMask(bits) {
  return (1 << bits) - 1;
}
function bytes32(value) {
  return hexZeroPad(hexlify(value), 32);
}
function base58check(data) {
  return Base58.encode(concat([data, hexDataSlice(sha256(sha256(data)), 0, 4)]));
}
function getWordlist(wordlist2) {
  if (wordlist2 == null) {
    return wordlists["en"];
  }
  if (typeof wordlist2 === "string") {
    const words2 = wordlists[wordlist2];
    if (words2 == null) {
      logger11.throwArgumentError("unknown locale", "wordlist", wordlist2);
    }
    return words2;
  }
  return wordlist2;
}
function mnemonicToSeed(mnemonic, password) {
  if (!password) {
    password = "";
  }
  const salt = toUtf8Bytes("mnemonic" + password, UnicodeNormalizationForm.NFKD);
  return pbkdf2(toUtf8Bytes(mnemonic, UnicodeNormalizationForm.NFKD), salt, 2048, 64, "sha512");
}
function mnemonicToEntropy(mnemonic, wordlist2) {
  wordlist2 = getWordlist(wordlist2);
  logger11.checkNormalize();
  const words2 = wordlist2.split(mnemonic);
  if (words2.length % 3 !== 0) {
    throw new Error("invalid mnemonic");
  }
  const entropy = arrayify(new Uint8Array(Math.ceil(11 * words2.length / 8)));
  let offset = 0;
  for (let i = 0; i < words2.length; i++) {
    let index = wordlist2.getWordIndex(words2[i].normalize("NFKD"));
    if (index === -1) {
      throw new Error("invalid mnemonic");
    }
    for (let bit = 0; bit < 11; bit++) {
      if (index & 1 << 10 - bit) {
        entropy[offset >> 3] |= 1 << 7 - offset % 8;
      }
      offset++;
    }
  }
  const entropyBits = 32 * words2.length / 3;
  const checksumBits = words2.length / 3;
  const checksumMask = getUpperMask(checksumBits);
  const checksum = arrayify(sha256(entropy.slice(0, entropyBits / 8)))[0] & checksumMask;
  if (checksum !== (entropy[entropy.length - 1] & checksumMask)) {
    throw new Error("invalid checksum");
  }
  return hexlify(entropy.slice(0, entropyBits / 8));
}
function entropyToMnemonic(entropy, wordlist2) {
  wordlist2 = getWordlist(wordlist2);
  entropy = arrayify(entropy);
  if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
    throw new Error("invalid entropy");
  }
  const indices = [0];
  let remainingBits = 11;
  for (let i = 0; i < entropy.length; i++) {
    if (remainingBits > 8) {
      indices[indices.length - 1] <<= 8;
      indices[indices.length - 1] |= entropy[i];
      remainingBits -= 8;
    } else {
      indices[indices.length - 1] <<= remainingBits;
      indices[indices.length - 1] |= entropy[i] >> 8 - remainingBits;
      indices.push(entropy[i] & getLowerMask(8 - remainingBits));
      remainingBits += 3;
    }
  }
  const checksumBits = entropy.length / 4;
  const checksum = arrayify(sha256(entropy))[0] & getUpperMask(checksumBits);
  indices[indices.length - 1] <<= checksumBits;
  indices[indices.length - 1] |= checksum >> 8 - checksumBits;
  return wordlist2.join(indices.map((index) => wordlist2.getWord(index)));
}
function isValidMnemonic(mnemonic, wordlist2) {
  try {
    mnemonicToEntropy(mnemonic, wordlist2);
    return true;
  } catch (error) {
  }
  return false;
}
function getAccountPath(index) {
  if (typeof index !== "number" || index < 0 || index >= HardenedBit || index % 1) {
    logger11.throwArgumentError("invalid account index", "index", index);
  }
  return `m/44'/60'/${index}'/0/0`;
}
var logger11, N, MasterSecret, HardenedBit, _constructorGuard2, defaultPath, HDNode;
var init_lib21 = __esm({
  "node_modules/@ethersproject/hdnode/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_lib17();
    init_lib2();
    init_lib3();
    init_lib9();
    init_lib19();
    init_lib4();
    init_lib11();
    init_lib18();
    init_lib12();
    init_lib20();
    init_lib();
    init_version7();
    logger11 = new Logger(version7);
    N = BigNumber.from("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
    MasterSecret = toUtf8Bytes("Bitcoin seed");
    HardenedBit = 2147483648;
    _constructorGuard2 = {};
    defaultPath = "m/44'/60'/0'/0/0";
    HDNode = class {
      constructor(constructorGuard, privateKey, publicKey, parentFingerprint, chainCode, index, depth, mnemonicOrPath) {
        logger11.checkNew(new.target, HDNode);
        if (constructorGuard !== _constructorGuard2) {
          throw new Error("HDNode constructor cannot be called directly");
        }
        if (privateKey) {
          const signingKey = new SigningKey(privateKey);
          defineReadOnly(this, "privateKey", signingKey.privateKey);
          defineReadOnly(this, "publicKey", signingKey.compressedPublicKey);
        } else {
          defineReadOnly(this, "privateKey", null);
          defineReadOnly(this, "publicKey", hexlify(publicKey));
        }
        defineReadOnly(this, "parentFingerprint", parentFingerprint);
        defineReadOnly(this, "fingerprint", hexDataSlice(ripemd160(sha256(this.publicKey)), 0, 4));
        defineReadOnly(this, "address", computeAddress(this.publicKey));
        defineReadOnly(this, "chainCode", chainCode);
        defineReadOnly(this, "index", index);
        defineReadOnly(this, "depth", depth);
        if (mnemonicOrPath == null) {
          defineReadOnly(this, "mnemonic", null);
          defineReadOnly(this, "path", null);
        } else if (typeof mnemonicOrPath === "string") {
          defineReadOnly(this, "mnemonic", null);
          defineReadOnly(this, "path", mnemonicOrPath);
        } else {
          defineReadOnly(this, "mnemonic", mnemonicOrPath);
          defineReadOnly(this, "path", mnemonicOrPath.path);
        }
      }
      get extendedKey() {
        if (this.depth >= 256) {
          throw new Error("Depth too large!");
        }
        return base58check(concat([
          this.privateKey != null ? "0x0488ADE4" : "0x0488B21E",
          hexlify(this.depth),
          this.parentFingerprint,
          hexZeroPad(hexlify(this.index), 4),
          this.chainCode,
          this.privateKey != null ? concat(["0x00", this.privateKey]) : this.publicKey
        ]));
      }
      neuter() {
        return new HDNode(_constructorGuard2, null, this.publicKey, this.parentFingerprint, this.chainCode, this.index, this.depth, this.path);
      }
      _derive(index) {
        if (index > 4294967295) {
          throw new Error("invalid index - " + String(index));
        }
        let path = this.path;
        if (path) {
          path += "/" + (index & ~HardenedBit);
        }
        const data = new Uint8Array(37);
        if (index & HardenedBit) {
          if (!this.privateKey) {
            throw new Error("cannot derive child of neutered node");
          }
          data.set(arrayify(this.privateKey), 1);
          if (path) {
            path += "'";
          }
        } else {
          data.set(arrayify(this.publicKey));
        }
        for (let i = 24; i >= 0; i -= 8) {
          data[33 + (i >> 3)] = index >> 24 - i & 255;
        }
        const I = arrayify(computeHmac(SupportedAlgorithm.sha512, this.chainCode, data));
        const IL = I.slice(0, 32);
        const IR = I.slice(32);
        let ki = null;
        let Ki = null;
        if (this.privateKey) {
          ki = bytes32(BigNumber.from(IL).add(this.privateKey).mod(N));
        } else {
          const ek = new SigningKey(hexlify(IL));
          Ki = ek._addPoint(this.publicKey);
        }
        let mnemonicOrPath = path;
        const srcMnemonic = this.mnemonic;
        if (srcMnemonic) {
          mnemonicOrPath = Object.freeze({
            phrase: srcMnemonic.phrase,
            path,
            locale: srcMnemonic.locale || "en"
          });
        }
        return new HDNode(_constructorGuard2, ki, Ki, this.fingerprint, bytes32(IR), index, this.depth + 1, mnemonicOrPath);
      }
      derivePath(path) {
        const components = path.split("/");
        if (components.length === 0 || components[0] === "m" && this.depth !== 0) {
          throw new Error("invalid path - " + path);
        }
        if (components[0] === "m") {
          components.shift();
        }
        let result = this;
        for (let i = 0; i < components.length; i++) {
          const component = components[i];
          if (component.match(/^[0-9]+'$/)) {
            const index = parseInt(component.substring(0, component.length - 1));
            if (index >= HardenedBit) {
              throw new Error("invalid path index - " + component);
            }
            result = result._derive(HardenedBit + index);
          } else if (component.match(/^[0-9]+$/)) {
            const index = parseInt(component);
            if (index >= HardenedBit) {
              throw new Error("invalid path index - " + component);
            }
            result = result._derive(index);
          } else {
            throw new Error("invalid path component - " + component);
          }
        }
        return result;
      }
      static _fromSeed(seed, mnemonic) {
        const seedArray = arrayify(seed);
        if (seedArray.length < 16 || seedArray.length > 64) {
          throw new Error("invalid seed");
        }
        const I = arrayify(computeHmac(SupportedAlgorithm.sha512, MasterSecret, seedArray));
        return new HDNode(_constructorGuard2, bytes32(I.slice(0, 32)), null, "0x00000000", bytes32(I.slice(32)), 0, 0, mnemonic);
      }
      static fromMnemonic(mnemonic, password, wordlist2) {
        wordlist2 = getWordlist(wordlist2);
        mnemonic = entropyToMnemonic(mnemonicToEntropy(mnemonic, wordlist2), wordlist2);
        return HDNode._fromSeed(mnemonicToSeed(mnemonic, password), {
          phrase: mnemonic,
          path: "m",
          locale: wordlist2.locale
        });
      }
      static fromSeed(seed) {
        return HDNode._fromSeed(seed, null);
      }
      static fromExtendedKey(extendedKey) {
        const bytes = Base58.decode(extendedKey);
        if (bytes.length !== 82 || base58check(bytes.slice(0, 78)) !== extendedKey) {
          logger11.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
        }
        const depth = bytes[4];
        const parentFingerprint = hexlify(bytes.slice(5, 9));
        const index = parseInt(hexlify(bytes.slice(9, 13)).substring(2), 16);
        const chainCode = hexlify(bytes.slice(13, 45));
        const key = bytes.slice(45, 78);
        switch (hexlify(bytes.slice(0, 4))) {
          case "0x0488b21e":
          case "0x043587cf":
            return new HDNode(_constructorGuard2, null, hexlify(key), parentFingerprint, chainCode, index, depth, null);
          case "0x0488ade4":
          case "0x04358394 ":
            if (key[0] !== 0) {
              break;
            }
            return new HDNode(_constructorGuard2, hexlify(key.slice(1)), null, parentFingerprint, chainCode, index, depth, null);
        }
        return logger11.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
      }
    };
  }
});

// node_modules/@ethersproject/random/lib.esm/_version.js
var version8;
var init_version8 = __esm({
  "node_modules/@ethersproject/random/lib.esm/_version.js"() {
    init_react();
    version8 = "random/5.5.1";
  }
});

// node_modules/@ethersproject/random/lib.esm/random.js
function getGlobal() {
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  throw new Error("unable to locate global object");
}
function randomBytes(length) {
  if (length <= 0 || length > 1024 || length % 1 || length != length) {
    logger12.throwArgumentError("invalid length", "length", length);
  }
  const result = new Uint8Array(length);
  crypto.getRandomValues(result);
  return arrayify(result);
}
var logger12, anyGlobal, crypto;
var init_random = __esm({
  "node_modules/@ethersproject/random/lib.esm/random.js"() {
    "use strict";
    init_react();
    init_lib2();
    init_lib();
    init_version8();
    logger12 = new Logger(version8);
    anyGlobal = getGlobal();
    crypto = anyGlobal.crypto || anyGlobal.msCrypto;
    if (!crypto || !crypto.getRandomValues) {
      logger12.warn("WARNING: Missing strong random number source");
      crypto = {
        getRandomValues: function(buffer) {
          return logger12.throwError("no secure random source avaialble", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "crypto.getRandomValues"
          });
        }
      };
    }
  }
});

// node_modules/@ethersproject/random/lib.esm/shuffle.js
function shuffled(array) {
  array = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}
var init_shuffle = __esm({
  "node_modules/@ethersproject/random/lib.esm/shuffle.js"() {
    "use strict";
    init_react();
  }
});

// node_modules/@ethersproject/random/lib.esm/index.js
var init_lib22 = __esm({
  "node_modules/@ethersproject/random/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_random();
    init_shuffle();
  }
});

// node_modules/@ethersproject/json-wallets/node_modules/aes-js/index.js
var require_aes_js = __commonJS({
  "node_modules/@ethersproject/json-wallets/node_modules/aes-js/index.js"(exports, module) {
    "use strict";
    init_react();
    (function(root) {
      function checkInt(value) {
        return parseInt(value) === value;
      }
      function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) {
          return false;
        }
        for (var i = 0; i < arrayish.length; i++) {
          if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
            return false;
          }
        }
        return true;
      }
      function coerceArray(arg, copy) {
        if (arg.buffer && ArrayBuffer.isView(arg) && arg.name === "Uint8Array") {
          if (copy) {
            if (arg.slice) {
              arg = arg.slice();
            } else {
              arg = Array.prototype.slice.call(arg);
            }
          }
          return arg;
        }
        if (Array.isArray(arg)) {
          if (!checkInts(arg)) {
            throw new Error("Array contains invalid value: " + arg);
          }
          return new Uint8Array(arg);
        }
        if (checkInt(arg.length) && checkInts(arg)) {
          return new Uint8Array(arg);
        }
        throw new Error("unsupported array-like object");
      }
      function createArray(length) {
        return new Uint8Array(length);
      }
      function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
          if (sourceArray.slice) {
            sourceArray = sourceArray.slice(sourceStart, sourceEnd);
          } else {
            sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
          }
        }
        targetArray.set(sourceArray, targetStart);
      }
      var convertUtf8 = function() {
        function toBytes(text) {
          var result = [], i = 0;
          text = encodeURI(text);
          while (i < text.length) {
            var c = text.charCodeAt(i++);
            if (c === 37) {
              result.push(parseInt(text.substr(i, 2), 16));
              i += 2;
            } else {
              result.push(c);
            }
          }
          return coerceArray(result);
        }
        function fromBytes(bytes) {
          var result = [], i = 0;
          while (i < bytes.length) {
            var c = bytes[i];
            if (c < 128) {
              result.push(String.fromCharCode(c));
              i++;
            } else if (c > 191 && c < 224) {
              result.push(String.fromCharCode((c & 31) << 6 | bytes[i + 1] & 63));
              i += 2;
            } else {
              result.push(String.fromCharCode((c & 15) << 12 | (bytes[i + 1] & 63) << 6 | bytes[i + 2] & 63));
              i += 3;
            }
          }
          return result.join("");
        }
        return {
          toBytes,
          fromBytes
        };
      }();
      var convertHex = function() {
        function toBytes(text) {
          var result = [];
          for (var i = 0; i < text.length; i += 2) {
            result.push(parseInt(text.substr(i, 2), 16));
          }
          return result;
        }
        var Hex = "0123456789abcdef";
        function fromBytes(bytes) {
          var result = [];
          for (var i = 0; i < bytes.length; i++) {
            var v = bytes[i];
            result.push(Hex[(v & 240) >> 4] + Hex[v & 15]);
          }
          return result.join("");
        }
        return {
          toBytes,
          fromBytes
        };
      }();
      var numberOfRounds = { 16: 10, 24: 12, 32: 14 };
      var rcon = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145];
      var S = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
      var Si = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125];
      var T1 = [3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986];
      var T2 = [2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766];
      var T3 = [1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126];
      var T4 = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436];
      var T5 = [1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890];
      var T6 = [1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935];
      var T7 = [2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239e3, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600];
      var T8 = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480];
      var U1 = [0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795];
      var U2 = [0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855];
      var U3 = [0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150];
      var U4 = [0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998e3, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925];
      function convertToInt32(bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
          result.push(bytes[i] << 24 | bytes[i + 1] << 16 | bytes[i + 2] << 8 | bytes[i + 3]);
        }
        return result;
      }
      var AES = function(key) {
        if (!(this instanceof AES)) {
          throw Error("AES must be instanitated with `new`");
        }
        Object.defineProperty(this, "key", {
          value: coerceArray(key, true)
        });
        this._prepare();
      };
      AES.prototype._prepare = function() {
        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
          throw new Error("invalid key size (must be 16, 24 or 32 bytes)");
        }
        this._Ke = [];
        this._Kd = [];
        for (var i = 0; i <= rounds; i++) {
          this._Ke.push([0, 0, 0, 0]);
          this._Kd.push([0, 0, 0, 0]);
        }
        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;
        var tk = convertToInt32(this.key);
        var index;
        for (var i = 0; i < KC; i++) {
          index = i >> 2;
          this._Ke[index][i % 4] = tk[i];
          this._Kd[rounds - index][i % 4] = tk[i];
        }
        var rconpointer = 0;
        var t = KC, tt;
        while (t < roundKeyCount) {
          tt = tk[KC - 1];
          tk[0] ^= S[tt >> 16 & 255] << 24 ^ S[tt >> 8 & 255] << 16 ^ S[tt & 255] << 8 ^ S[tt >> 24 & 255] ^ rcon[rconpointer] << 24;
          rconpointer += 1;
          if (KC != 8) {
            for (var i = 1; i < KC; i++) {
              tk[i] ^= tk[i - 1];
            }
          } else {
            for (var i = 1; i < KC / 2; i++) {
              tk[i] ^= tk[i - 1];
            }
            tt = tk[KC / 2 - 1];
            tk[KC / 2] ^= S[tt & 255] ^ S[tt >> 8 & 255] << 8 ^ S[tt >> 16 & 255] << 16 ^ S[tt >> 24 & 255] << 24;
            for (var i = KC / 2 + 1; i < KC; i++) {
              tk[i] ^= tk[i - 1];
            }
          }
          var i = 0, r, c;
          while (i < KC && t < roundKeyCount) {
            r = t >> 2;
            c = t % 4;
            this._Ke[r][c] = tk[i];
            this._Kd[rounds - r][c] = tk[i++];
            t++;
          }
        }
        for (var r = 1; r < rounds; r++) {
          for (var c = 0; c < 4; c++) {
            tt = this._Kd[r][c];
            this._Kd[r][c] = U1[tt >> 24 & 255] ^ U2[tt >> 16 & 255] ^ U3[tt >> 8 & 255] ^ U4[tt & 255];
          }
        }
      };
      AES.prototype.encrypt = function(plaintext) {
        if (plaintext.length != 16) {
          throw new Error("invalid plaintext size (must be 16 bytes)");
        }
        var rounds = this._Ke.length - 1;
        var a = [0, 0, 0, 0];
        var t = convertToInt32(plaintext);
        for (var i = 0; i < 4; i++) {
          t[i] ^= this._Ke[0][i];
        }
        for (var r = 1; r < rounds; r++) {
          for (var i = 0; i < 4; i++) {
            a[i] = T1[t[i] >> 24 & 255] ^ T2[t[(i + 1) % 4] >> 16 & 255] ^ T3[t[(i + 2) % 4] >> 8 & 255] ^ T4[t[(i + 3) % 4] & 255] ^ this._Ke[r][i];
          }
          t = a.slice();
        }
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
          tt = this._Ke[rounds][i];
          result[4 * i] = (S[t[i] >> 24 & 255] ^ tt >> 24) & 255;
          result[4 * i + 1] = (S[t[(i + 1) % 4] >> 16 & 255] ^ tt >> 16) & 255;
          result[4 * i + 2] = (S[t[(i + 2) % 4] >> 8 & 255] ^ tt >> 8) & 255;
          result[4 * i + 3] = (S[t[(i + 3) % 4] & 255] ^ tt) & 255;
        }
        return result;
      };
      AES.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length != 16) {
          throw new Error("invalid ciphertext size (must be 16 bytes)");
        }
        var rounds = this._Kd.length - 1;
        var a = [0, 0, 0, 0];
        var t = convertToInt32(ciphertext);
        for (var i = 0; i < 4; i++) {
          t[i] ^= this._Kd[0][i];
        }
        for (var r = 1; r < rounds; r++) {
          for (var i = 0; i < 4; i++) {
            a[i] = T5[t[i] >> 24 & 255] ^ T6[t[(i + 3) % 4] >> 16 & 255] ^ T7[t[(i + 2) % 4] >> 8 & 255] ^ T8[t[(i + 1) % 4] & 255] ^ this._Kd[r][i];
          }
          t = a.slice();
        }
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
          tt = this._Kd[rounds][i];
          result[4 * i] = (Si[t[i] >> 24 & 255] ^ tt >> 24) & 255;
          result[4 * i + 1] = (Si[t[(i + 3) % 4] >> 16 & 255] ^ tt >> 16) & 255;
          result[4 * i + 2] = (Si[t[(i + 2) % 4] >> 8 & 255] ^ tt >> 8) & 255;
          result[4 * i + 3] = (Si[t[(i + 1) % 4] & 255] ^ tt) & 255;
        }
        return result;
      };
      var ModeOfOperationECB = function(key) {
        if (!(this instanceof ModeOfOperationECB)) {
          throw Error("AES must be instanitated with `new`");
        }
        this.description = "Electronic Code Block";
        this.name = "ecb";
        this._aes = new AES(key);
      };
      ModeOfOperationECB.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);
        if (plaintext.length % 16 !== 0) {
          throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
        }
        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);
        for (var i = 0; i < plaintext.length; i += 16) {
          copyArray(plaintext, block, 0, i, i + 16);
          block = this._aes.encrypt(block);
          copyArray(block, ciphertext, i);
        }
        return ciphertext;
      };
      ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);
        if (ciphertext.length % 16 !== 0) {
          throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
        }
        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);
        for (var i = 0; i < ciphertext.length; i += 16) {
          copyArray(ciphertext, block, 0, i, i + 16);
          block = this._aes.decrypt(block);
          copyArray(block, plaintext, i);
        }
        return plaintext;
      };
      var ModeOfOperationCBC = function(key, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
          throw Error("AES must be instanitated with `new`");
        }
        this.description = "Cipher Block Chaining";
        this.name = "cbc";
        if (!iv) {
          iv = createArray(16);
        } else if (iv.length != 16) {
          throw new Error("invalid initialation vector size (must be 16 bytes)");
        }
        this._lastCipherblock = coerceArray(iv, true);
        this._aes = new AES(key);
      };
      ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);
        if (plaintext.length % 16 !== 0) {
          throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
        }
        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);
        for (var i = 0; i < plaintext.length; i += 16) {
          copyArray(plaintext, block, 0, i, i + 16);
          for (var j = 0; j < 16; j++) {
            block[j] ^= this._lastCipherblock[j];
          }
          this._lastCipherblock = this._aes.encrypt(block);
          copyArray(this._lastCipherblock, ciphertext, i);
        }
        return ciphertext;
      };
      ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);
        if (ciphertext.length % 16 !== 0) {
          throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
        }
        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);
        for (var i = 0; i < ciphertext.length; i += 16) {
          copyArray(ciphertext, block, 0, i, i + 16);
          block = this._aes.decrypt(block);
          for (var j = 0; j < 16; j++) {
            plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
          }
          copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
        }
        return plaintext;
      };
      var ModeOfOperationCFB = function(key, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
          throw Error("AES must be instanitated with `new`");
        }
        this.description = "Cipher Feedback";
        this.name = "cfb";
        if (!iv) {
          iv = createArray(16);
        } else if (iv.length != 16) {
          throw new Error("invalid initialation vector size (must be 16 size)");
        }
        if (!segmentSize) {
          segmentSize = 1;
        }
        this.segmentSize = segmentSize;
        this._shiftRegister = coerceArray(iv, true);
        this._aes = new AES(key);
      };
      ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
        if (plaintext.length % this.segmentSize != 0) {
          throw new Error("invalid plaintext size (must be segmentSize bytes)");
        }
        var encrypted = coerceArray(plaintext, true);
        var xorSegment;
        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
          xorSegment = this._aes.encrypt(this._shiftRegister);
          for (var j = 0; j < this.segmentSize; j++) {
            encrypted[i + j] ^= xorSegment[j];
          }
          copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
          copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }
        return encrypted;
      };
      ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length % this.segmentSize != 0) {
          throw new Error("invalid ciphertext size (must be segmentSize bytes)");
        }
        var plaintext = coerceArray(ciphertext, true);
        var xorSegment;
        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
          xorSegment = this._aes.encrypt(this._shiftRegister);
          for (var j = 0; j < this.segmentSize; j++) {
            plaintext[i + j] ^= xorSegment[j];
          }
          copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
          copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }
        return plaintext;
      };
      var ModeOfOperationOFB = function(key, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
          throw Error("AES must be instanitated with `new`");
        }
        this.description = "Output Feedback";
        this.name = "ofb";
        if (!iv) {
          iv = createArray(16);
        } else if (iv.length != 16) {
          throw new Error("invalid initialation vector size (must be 16 bytes)");
        }
        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;
        this._aes = new AES(key);
      };
      ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);
        for (var i = 0; i < encrypted.length; i++) {
          if (this._lastPrecipherIndex === 16) {
            this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
            this._lastPrecipherIndex = 0;
          }
          encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }
        return encrypted;
      };
      ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;
      var Counter = function(initialValue) {
        if (!(this instanceof Counter)) {
          throw Error("Counter must be instanitated with `new`");
        }
        if (initialValue !== 0 && !initialValue) {
          initialValue = 1;
        }
        if (typeof initialValue === "number") {
          this._counter = createArray(16);
          this.setValue(initialValue);
        } else {
          this.setBytes(initialValue);
        }
      };
      Counter.prototype.setValue = function(value) {
        if (typeof value !== "number" || parseInt(value) != value) {
          throw new Error("invalid counter value (must be an integer)");
        }
        for (var index = 15; index >= 0; --index) {
          this._counter[index] = value % 256;
          value = value >> 8;
        }
      };
      Counter.prototype.setBytes = function(bytes) {
        bytes = coerceArray(bytes, true);
        if (bytes.length != 16) {
          throw new Error("invalid counter bytes size (must be 16 bytes)");
        }
        this._counter = bytes;
      };
      Counter.prototype.increment = function() {
        for (var i = 15; i >= 0; i--) {
          if (this._counter[i] === 255) {
            this._counter[i] = 0;
          } else {
            this._counter[i]++;
            break;
          }
        }
      };
      var ModeOfOperationCTR = function(key, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
          throw Error("AES must be instanitated with `new`");
        }
        this.description = "Counter";
        this.name = "ctr";
        if (!(counter instanceof Counter)) {
          counter = new Counter(counter);
        }
        this._counter = counter;
        this._remainingCounter = null;
        this._remainingCounterIndex = 16;
        this._aes = new AES(key);
      };
      ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);
        for (var i = 0; i < encrypted.length; i++) {
          if (this._remainingCounterIndex === 16) {
            this._remainingCounter = this._aes.encrypt(this._counter._counter);
            this._remainingCounterIndex = 0;
            this._counter.increment();
          }
          encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
        }
        return encrypted;
      };
      ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;
      function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - data.length % 16;
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i = data.length; i < result.length; i++) {
          result[i] = padder;
        }
        return result;
      }
      function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) {
          throw new Error("PKCS#7 invalid length");
        }
        var padder = data[data.length - 1];
        if (padder > 16) {
          throw new Error("PKCS#7 padding byte out of range");
        }
        var length = data.length - padder;
        for (var i = 0; i < padder; i++) {
          if (data[length + i] !== padder) {
            throw new Error("PKCS#7 invalid padding byte");
          }
        }
        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
      }
      var aesjs = {
        AES,
        Counter,
        ModeOfOperation: {
          ecb: ModeOfOperationECB,
          cbc: ModeOfOperationCBC,
          cfb: ModeOfOperationCFB,
          ofb: ModeOfOperationOFB,
          ctr: ModeOfOperationCTR
        },
        utils: {
          hex: convertHex,
          utf8: convertUtf8
        },
        padding: {
          pkcs7: {
            pad: pkcs7pad,
            strip: pkcs7strip
          }
        },
        _arrayTest: {
          coerceArray,
          createArray,
          copyArray
        }
      };
      if (typeof exports !== "undefined") {
        module.exports = aesjs;
      } else if (typeof define === "function" && define.amd) {
        define(aesjs);
      } else {
        if (root.aesjs) {
          aesjs._aesjs = root.aesjs;
        }
        root.aesjs = aesjs;
      }
    })(exports);
  }
});

// node_modules/@ethersproject/json-wallets/lib.esm/_version.js
var version9;
var init_version9 = __esm({
  "node_modules/@ethersproject/json-wallets/lib.esm/_version.js"() {
    init_react();
    version9 = "json-wallets/5.5.0";
  }
});

// node_modules/@ethersproject/json-wallets/lib.esm/utils.js
function looseArrayify(hexString) {
  if (typeof hexString === "string" && hexString.substring(0, 2) !== "0x") {
    hexString = "0x" + hexString;
  }
  return arrayify(hexString);
}
function zpad(value, length) {
  value = String(value);
  while (value.length < length) {
    value = "0" + value;
  }
  return value;
}
function getPassword(password) {
  if (typeof password === "string") {
    return toUtf8Bytes(password, UnicodeNormalizationForm.NFKC);
  }
  return arrayify(password);
}
function searchPath(object, path) {
  let currentChild = object;
  const comps = path.toLowerCase().split("/");
  for (let i = 0; i < comps.length; i++) {
    let matchingChild = null;
    for (const key in currentChild) {
      if (key.toLowerCase() === comps[i]) {
        matchingChild = currentChild[key];
        break;
      }
    }
    if (matchingChild === null) {
      return null;
    }
    currentChild = matchingChild;
  }
  return currentChild;
}
function uuidV4(randomBytes2) {
  const bytes = arrayify(randomBytes2);
  bytes[6] = bytes[6] & 15 | 64;
  bytes[8] = bytes[8] & 63 | 128;
  const value = hexlify(bytes);
  return [
    value.substring(2, 10),
    value.substring(10, 14),
    value.substring(14, 18),
    value.substring(18, 22),
    value.substring(22, 34)
  ].join("-");
}
var init_utils = __esm({
  "node_modules/@ethersproject/json-wallets/lib.esm/utils.js"() {
    "use strict";
    init_react();
    init_lib2();
    init_lib9();
  }
});

// node_modules/@ethersproject/json-wallets/lib.esm/crowdsale.js
function decrypt(json, password) {
  const data = JSON.parse(json);
  password = getPassword(password);
  const ethaddr = getAddress(searchPath(data, "ethaddr"));
  const encseed = looseArrayify(searchPath(data, "encseed"));
  if (!encseed || encseed.length % 16 !== 0) {
    logger13.throwArgumentError("invalid encseed", "json", json);
  }
  const key = arrayify(pbkdf2(password, password, 2e3, 32, "sha256")).slice(0, 16);
  const iv = encseed.slice(0, 16);
  const encryptedSeed = encseed.slice(16);
  const aesCbc = new import_aes_js.default.ModeOfOperation.cbc(key, iv);
  const seed = import_aes_js.default.padding.pkcs7.strip(arrayify(aesCbc.decrypt(encryptedSeed)));
  let seedHex = "";
  for (let i = 0; i < seed.length; i++) {
    seedHex += String.fromCharCode(seed[i]);
  }
  const seedHexBytes = toUtf8Bytes(seedHex);
  const privateKey = keccak256(seedHexBytes);
  return new CrowdsaleAccount({
    _isCrowdsaleAccount: true,
    address: ethaddr,
    privateKey
  });
}
var import_aes_js, logger13, CrowdsaleAccount;
var init_crowdsale = __esm({
  "node_modules/@ethersproject/json-wallets/lib.esm/crowdsale.js"() {
    "use strict";
    init_react();
    import_aes_js = __toESM(require_aes_js());
    init_lib7();
    init_lib2();
    init_lib5();
    init_lib19();
    init_lib9();
    init_lib4();
    init_lib();
    init_version9();
    init_utils();
    logger13 = new Logger(version9);
    CrowdsaleAccount = class extends Description {
      isCrowdsaleAccount(value) {
        return !!(value && value._isCrowdsaleAccount);
      }
    };
  }
});

// node_modules/@ethersproject/json-wallets/lib.esm/inspect.js
function isCrowdsaleWallet(json) {
  let data = null;
  try {
    data = JSON.parse(json);
  } catch (error) {
    return false;
  }
  return data.encseed && data.ethaddr;
}
function isKeystoreWallet(json) {
  let data = null;
  try {
    data = JSON.parse(json);
  } catch (error) {
    return false;
  }
  if (!data.version || parseInt(data.version) !== data.version || parseInt(data.version) !== 3) {
    return false;
  }
  return true;
}
function getJsonWalletAddress(json) {
  if (isCrowdsaleWallet(json)) {
    try {
      return getAddress(JSON.parse(json).ethaddr);
    } catch (error) {
      return null;
    }
  }
  if (isKeystoreWallet(json)) {
    try {
      return getAddress(JSON.parse(json).address);
    } catch (error) {
      return null;
    }
  }
  return null;
}
var init_inspect = __esm({
  "node_modules/@ethersproject/json-wallets/lib.esm/inspect.js"() {
    "use strict";
    init_react();
    init_lib7();
  }
});

// node_modules/scrypt-js/scrypt.js
var require_scrypt = __commonJS({
  "node_modules/scrypt-js/scrypt.js"(exports, module) {
    "use strict";
    init_react();
    (function(root) {
      const MAX_VALUE = 2147483647;
      function SHA256(m) {
        const K = new Uint32Array([
          1116352408,
          1899447441,
          3049323471,
          3921009573,
          961987163,
          1508970993,
          2453635748,
          2870763221,
          3624381080,
          310598401,
          607225278,
          1426881987,
          1925078388,
          2162078206,
          2614888103,
          3248222580,
          3835390401,
          4022224774,
          264347078,
          604807628,
          770255983,
          1249150122,
          1555081692,
          1996064986,
          2554220882,
          2821834349,
          2952996808,
          3210313671,
          3336571891,
          3584528711,
          113926993,
          338241895,
          666307205,
          773529912,
          1294757372,
          1396182291,
          1695183700,
          1986661051,
          2177026350,
          2456956037,
          2730485921,
          2820302411,
          3259730800,
          3345764771,
          3516065817,
          3600352804,
          4094571909,
          275423344,
          430227734,
          506948616,
          659060556,
          883997877,
          958139571,
          1322822218,
          1537002063,
          1747873779,
          1955562222,
          2024104815,
          2227730452,
          2361852424,
          2428436474,
          2756734187,
          3204031479,
          3329325298
        ]);
        let h0 = 1779033703, h1 = 3144134277, h2 = 1013904242, h3 = 2773480762;
        let h4 = 1359893119, h5 = 2600822924, h6 = 528734635, h7 = 1541459225;
        const w = new Uint32Array(64);
        function blocks(p2) {
          let off = 0, len = p2.length;
          while (len >= 64) {
            let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7, u, i2, j, t1, t2;
            for (i2 = 0; i2 < 16; i2++) {
              j = off + i2 * 4;
              w[i2] = (p2[j] & 255) << 24 | (p2[j + 1] & 255) << 16 | (p2[j + 2] & 255) << 8 | p2[j + 3] & 255;
            }
            for (i2 = 16; i2 < 64; i2++) {
              u = w[i2 - 2];
              t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
              u = w[i2 - 15];
              t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
              w[i2] = (t1 + w[i2 - 7] | 0) + (t2 + w[i2 - 16] | 0) | 0;
            }
            for (i2 = 0; i2 < 64; i2++) {
              t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i2] + w[i2] | 0) | 0) | 0;
              t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
              h = g;
              g = f;
              f = e;
              e = d + t1 | 0;
              d = c;
              c = b;
              b = a;
              a = t1 + t2 | 0;
            }
            h0 = h0 + a | 0;
            h1 = h1 + b | 0;
            h2 = h2 + c | 0;
            h3 = h3 + d | 0;
            h4 = h4 + e | 0;
            h5 = h5 + f | 0;
            h6 = h6 + g | 0;
            h7 = h7 + h | 0;
            off += 64;
            len -= 64;
          }
        }
        blocks(m);
        let i, bytesLeft = m.length % 64, bitLenHi = m.length / 536870912 | 0, bitLenLo = m.length << 3, numZeros = bytesLeft < 56 ? 56 : 120, p = m.slice(m.length - bytesLeft, m.length);
        p.push(128);
        for (i = bytesLeft + 1; i < numZeros; i++) {
          p.push(0);
        }
        p.push(bitLenHi >>> 24 & 255);
        p.push(bitLenHi >>> 16 & 255);
        p.push(bitLenHi >>> 8 & 255);
        p.push(bitLenHi >>> 0 & 255);
        p.push(bitLenLo >>> 24 & 255);
        p.push(bitLenLo >>> 16 & 255);
        p.push(bitLenLo >>> 8 & 255);
        p.push(bitLenLo >>> 0 & 255);
        blocks(p);
        return [
          h0 >>> 24 & 255,
          h0 >>> 16 & 255,
          h0 >>> 8 & 255,
          h0 >>> 0 & 255,
          h1 >>> 24 & 255,
          h1 >>> 16 & 255,
          h1 >>> 8 & 255,
          h1 >>> 0 & 255,
          h2 >>> 24 & 255,
          h2 >>> 16 & 255,
          h2 >>> 8 & 255,
          h2 >>> 0 & 255,
          h3 >>> 24 & 255,
          h3 >>> 16 & 255,
          h3 >>> 8 & 255,
          h3 >>> 0 & 255,
          h4 >>> 24 & 255,
          h4 >>> 16 & 255,
          h4 >>> 8 & 255,
          h4 >>> 0 & 255,
          h5 >>> 24 & 255,
          h5 >>> 16 & 255,
          h5 >>> 8 & 255,
          h5 >>> 0 & 255,
          h6 >>> 24 & 255,
          h6 >>> 16 & 255,
          h6 >>> 8 & 255,
          h6 >>> 0 & 255,
          h7 >>> 24 & 255,
          h7 >>> 16 & 255,
          h7 >>> 8 & 255,
          h7 >>> 0 & 255
        ];
      }
      function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
        password = password.length <= 64 ? password : SHA256(password);
        const innerLen = 64 + salt.length + 4;
        const inner = new Array(innerLen);
        const outerKey = new Array(64);
        let i;
        let dk = [];
        for (i = 0; i < 64; i++) {
          inner[i] = 54;
        }
        for (i = 0; i < password.length; i++) {
          inner[i] ^= password[i];
        }
        for (i = 0; i < salt.length; i++) {
          inner[64 + i] = salt[i];
        }
        for (i = innerLen - 4; i < innerLen; i++) {
          inner[i] = 0;
        }
        for (i = 0; i < 64; i++)
          outerKey[i] = 92;
        for (i = 0; i < password.length; i++)
          outerKey[i] ^= password[i];
        function incrementCounter() {
          for (let i2 = innerLen - 1; i2 >= innerLen - 4; i2--) {
            inner[i2]++;
            if (inner[i2] <= 255)
              return;
            inner[i2] = 0;
          }
        }
        while (dkLen >= 32) {
          incrementCounter();
          dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
          dkLen -= 32;
        }
        if (dkLen > 0) {
          incrementCounter();
          dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
        }
        return dk;
      }
      function blockmix_salsa8(BY, Yi, r, x, _X) {
        let i;
        arraycopy(BY, (2 * r - 1) * 16, _X, 0, 16);
        for (i = 0; i < 2 * r; i++) {
          blockxor(BY, i * 16, _X, 16);
          salsa20_8(_X, x);
          arraycopy(_X, 0, BY, Yi + i * 16, 16);
        }
        for (i = 0; i < r; i++) {
          arraycopy(BY, Yi + i * 2 * 16, BY, i * 16, 16);
        }
        for (i = 0; i < r; i++) {
          arraycopy(BY, Yi + (i * 2 + 1) * 16, BY, (i + r) * 16, 16);
        }
      }
      function R(a, b) {
        return a << b | a >>> 32 - b;
      }
      function salsa20_8(B, x) {
        arraycopy(B, 0, x, 0, 16);
        for (let i = 8; i > 0; i -= 2) {
          x[4] ^= R(x[0] + x[12], 7);
          x[8] ^= R(x[4] + x[0], 9);
          x[12] ^= R(x[8] + x[4], 13);
          x[0] ^= R(x[12] + x[8], 18);
          x[9] ^= R(x[5] + x[1], 7);
          x[13] ^= R(x[9] + x[5], 9);
          x[1] ^= R(x[13] + x[9], 13);
          x[5] ^= R(x[1] + x[13], 18);
          x[14] ^= R(x[10] + x[6], 7);
          x[2] ^= R(x[14] + x[10], 9);
          x[6] ^= R(x[2] + x[14], 13);
          x[10] ^= R(x[6] + x[2], 18);
          x[3] ^= R(x[15] + x[11], 7);
          x[7] ^= R(x[3] + x[15], 9);
          x[11] ^= R(x[7] + x[3], 13);
          x[15] ^= R(x[11] + x[7], 18);
          x[1] ^= R(x[0] + x[3], 7);
          x[2] ^= R(x[1] + x[0], 9);
          x[3] ^= R(x[2] + x[1], 13);
          x[0] ^= R(x[3] + x[2], 18);
          x[6] ^= R(x[5] + x[4], 7);
          x[7] ^= R(x[6] + x[5], 9);
          x[4] ^= R(x[7] + x[6], 13);
          x[5] ^= R(x[4] + x[7], 18);
          x[11] ^= R(x[10] + x[9], 7);
          x[8] ^= R(x[11] + x[10], 9);
          x[9] ^= R(x[8] + x[11], 13);
          x[10] ^= R(x[9] + x[8], 18);
          x[12] ^= R(x[15] + x[14], 7);
          x[13] ^= R(x[12] + x[15], 9);
          x[14] ^= R(x[13] + x[12], 13);
          x[15] ^= R(x[14] + x[13], 18);
        }
        for (let i = 0; i < 16; ++i) {
          B[i] += x[i];
        }
      }
      function blockxor(S, Si, D, len) {
        for (let i = 0; i < len; i++) {
          D[i] ^= S[Si + i];
        }
      }
      function arraycopy(src, srcPos, dest, destPos, length) {
        while (length--) {
          dest[destPos++] = src[srcPos++];
        }
      }
      function checkBufferish(o) {
        if (!o || typeof o.length !== "number") {
          return false;
        }
        for (let i = 0; i < o.length; i++) {
          const v = o[i];
          if (typeof v !== "number" || v % 1 || v < 0 || v >= 256) {
            return false;
          }
        }
        return true;
      }
      function ensureInteger(value, name2) {
        if (typeof value !== "number" || value % 1) {
          throw new Error("invalid " + name2);
        }
        return value;
      }
      function _scrypt(password, salt, N2, r, p, dkLen, callback) {
        N2 = ensureInteger(N2, "N");
        r = ensureInteger(r, "r");
        p = ensureInteger(p, "p");
        dkLen = ensureInteger(dkLen, "dkLen");
        if (N2 === 0 || (N2 & N2 - 1) !== 0) {
          throw new Error("N must be power of 2");
        }
        if (N2 > MAX_VALUE / 128 / r) {
          throw new Error("N too large");
        }
        if (r > MAX_VALUE / 128 / p) {
          throw new Error("r too large");
        }
        if (!checkBufferish(password)) {
          throw new Error("password must be an array or buffer");
        }
        password = Array.prototype.slice.call(password);
        if (!checkBufferish(salt)) {
          throw new Error("salt must be an array or buffer");
        }
        salt = Array.prototype.slice.call(salt);
        let b = PBKDF2_HMAC_SHA256_OneIter(password, salt, p * 128 * r);
        const B = new Uint32Array(p * 32 * r);
        for (let i = 0; i < B.length; i++) {
          const j = i * 4;
          B[i] = (b[j + 3] & 255) << 24 | (b[j + 2] & 255) << 16 | (b[j + 1] & 255) << 8 | (b[j + 0] & 255) << 0;
        }
        const XY = new Uint32Array(64 * r);
        const V = new Uint32Array(32 * r * N2);
        const Yi = 32 * r;
        const x = new Uint32Array(16);
        const _X = new Uint32Array(16);
        const totalOps = p * N2 * 2;
        let currentOp = 0;
        let lastPercent10 = null;
        let stop = false;
        let state = 0;
        let i0 = 0, i1;
        let Bi;
        const limit = callback ? parseInt(1e3 / r) : 4294967295;
        const nextTick = typeof setImmediate !== "undefined" ? setImmediate : setTimeout;
        const incrementalSMix = function() {
          if (stop) {
            return callback(new Error("cancelled"), currentOp / totalOps);
          }
          let steps;
          switch (state) {
            case 0:
              Bi = i0 * 32 * r;
              arraycopy(B, Bi, XY, 0, Yi);
              state = 1;
              i1 = 0;
            case 1:
              steps = N2 - i1;
              if (steps > limit) {
                steps = limit;
              }
              for (let i = 0; i < steps; i++) {
                arraycopy(XY, 0, V, (i1 + i) * Yi, Yi);
                blockmix_salsa8(XY, Yi, r, x, _X);
              }
              i1 += steps;
              currentOp += steps;
              if (callback) {
                const percent10 = parseInt(1e3 * currentOp / totalOps);
                if (percent10 !== lastPercent10) {
                  stop = callback(null, currentOp / totalOps);
                  if (stop) {
                    break;
                  }
                  lastPercent10 = percent10;
                }
              }
              if (i1 < N2) {
                break;
              }
              i1 = 0;
              state = 2;
            case 2:
              steps = N2 - i1;
              if (steps > limit) {
                steps = limit;
              }
              for (let i = 0; i < steps; i++) {
                const offset = (2 * r - 1) * 16;
                const j = XY[offset] & N2 - 1;
                blockxor(V, j * Yi, XY, Yi);
                blockmix_salsa8(XY, Yi, r, x, _X);
              }
              i1 += steps;
              currentOp += steps;
              if (callback) {
                const percent10 = parseInt(1e3 * currentOp / totalOps);
                if (percent10 !== lastPercent10) {
                  stop = callback(null, currentOp / totalOps);
                  if (stop) {
                    break;
                  }
                  lastPercent10 = percent10;
                }
              }
              if (i1 < N2) {
                break;
              }
              arraycopy(XY, 0, B, Bi, Yi);
              i0++;
              if (i0 < p) {
                state = 0;
                break;
              }
              b = [];
              for (let i = 0; i < B.length; i++) {
                b.push(B[i] >> 0 & 255);
                b.push(B[i] >> 8 & 255);
                b.push(B[i] >> 16 & 255);
                b.push(B[i] >> 24 & 255);
              }
              const derivedKey = PBKDF2_HMAC_SHA256_OneIter(password, b, dkLen);
              if (callback) {
                callback(null, 1, derivedKey);
              }
              return derivedKey;
          }
          if (callback) {
            nextTick(incrementalSMix);
          }
        };
        if (!callback) {
          while (true) {
            const derivedKey = incrementalSMix();
            if (derivedKey != void 0) {
              return derivedKey;
            }
          }
        }
        incrementalSMix();
      }
      const lib = {
        scrypt: function(password, salt, N2, r, p, dkLen, progressCallback) {
          return new Promise(function(resolve, reject) {
            let lastProgress = 0;
            if (progressCallback) {
              progressCallback(0);
            }
            _scrypt(password, salt, N2, r, p, dkLen, function(error, progress, key) {
              if (error) {
                reject(error);
              } else if (key) {
                if (progressCallback && lastProgress !== 1) {
                  progressCallback(1);
                }
                resolve(new Uint8Array(key));
              } else if (progressCallback && progress !== lastProgress) {
                lastProgress = progress;
                return progressCallback(progress);
              }
            });
          });
        },
        syncScrypt: function(password, salt, N2, r, p, dkLen) {
          return new Uint8Array(_scrypt(password, salt, N2, r, p, dkLen));
        }
      };
      if (typeof exports !== "undefined") {
        module.exports = lib;
      } else if (typeof define === "function" && define.amd) {
        define(lib);
      } else if (root) {
        if (root.scrypt) {
          root._scrypt = root.scrypt;
        }
        root.scrypt = lib;
      }
    })(exports);
  }
});

// node_modules/@ethersproject/json-wallets/lib.esm/keystore.js
function hasMnemonic(value) {
  return value != null && value.mnemonic && value.mnemonic.phrase;
}
function _decrypt(data, key, ciphertext) {
  const cipher = searchPath(data, "crypto/cipher");
  if (cipher === "aes-128-ctr") {
    const iv = looseArrayify(searchPath(data, "crypto/cipherparams/iv"));
    const counter = new import_aes_js2.default.Counter(iv);
    const aesCtr = new import_aes_js2.default.ModeOfOperation.ctr(key, counter);
    return arrayify(aesCtr.decrypt(ciphertext));
  }
  return null;
}
function _getAccount(data, key) {
  const ciphertext = looseArrayify(searchPath(data, "crypto/ciphertext"));
  const computedMAC = hexlify(keccak256(concat([key.slice(16, 32), ciphertext]))).substring(2);
  if (computedMAC !== searchPath(data, "crypto/mac").toLowerCase()) {
    throw new Error("invalid password");
  }
  const privateKey = _decrypt(data, key.slice(0, 16), ciphertext);
  if (!privateKey) {
    logger14.throwError("unsupported cipher", Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "decrypt"
    });
  }
  const mnemonicKey = key.slice(32, 64);
  const address = computeAddress(privateKey);
  if (data.address) {
    let check = data.address.toLowerCase();
    if (check.substring(0, 2) !== "0x") {
      check = "0x" + check;
    }
    if (getAddress(check) !== address) {
      throw new Error("address mismatch");
    }
  }
  const account = {
    _isKeystoreAccount: true,
    address,
    privateKey: hexlify(privateKey)
  };
  if (searchPath(data, "x-ethers/version") === "0.1") {
    const mnemonicCiphertext = looseArrayify(searchPath(data, "x-ethers/mnemonicCiphertext"));
    const mnemonicIv = looseArrayify(searchPath(data, "x-ethers/mnemonicCounter"));
    const mnemonicCounter = new import_aes_js2.default.Counter(mnemonicIv);
    const mnemonicAesCtr = new import_aes_js2.default.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
    const path = searchPath(data, "x-ethers/path") || defaultPath;
    const locale = searchPath(data, "x-ethers/locale") || "en";
    const entropy = arrayify(mnemonicAesCtr.decrypt(mnemonicCiphertext));
    try {
      const mnemonic = entropyToMnemonic(entropy, locale);
      const node = HDNode.fromMnemonic(mnemonic, null, locale).derivePath(path);
      if (node.privateKey != account.privateKey) {
        throw new Error("mnemonic mismatch");
      }
      account.mnemonic = node.mnemonic;
    } catch (error) {
      if (error.code !== Logger.errors.INVALID_ARGUMENT || error.argument !== "wordlist") {
        throw error;
      }
    }
  }
  return new KeystoreAccount(account);
}
function pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc) {
  return arrayify(pbkdf2(passwordBytes, salt, count, dkLen, prfFunc));
}
function pbkdf22(passwordBytes, salt, count, dkLen, prfFunc) {
  return Promise.resolve(pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc));
}
function _computeKdfKey(data, password, pbkdf2Func, scryptFunc, progressCallback) {
  const passwordBytes = getPassword(password);
  const kdf = searchPath(data, "crypto/kdf");
  if (kdf && typeof kdf === "string") {
    const throwError = function(name2, value) {
      return logger14.throwArgumentError("invalid key-derivation function parameters", name2, value);
    };
    if (kdf.toLowerCase() === "scrypt") {
      const salt = looseArrayify(searchPath(data, "crypto/kdfparams/salt"));
      const N2 = parseInt(searchPath(data, "crypto/kdfparams/n"));
      const r = parseInt(searchPath(data, "crypto/kdfparams/r"));
      const p = parseInt(searchPath(data, "crypto/kdfparams/p"));
      if (!N2 || !r || !p) {
        throwError("kdf", kdf);
      }
      if ((N2 & N2 - 1) !== 0) {
        throwError("N", N2);
      }
      const dkLen = parseInt(searchPath(data, "crypto/kdfparams/dklen"));
      if (dkLen !== 32) {
        throwError("dklen", dkLen);
      }
      return scryptFunc(passwordBytes, salt, N2, r, p, 64, progressCallback);
    } else if (kdf.toLowerCase() === "pbkdf2") {
      const salt = looseArrayify(searchPath(data, "crypto/kdfparams/salt"));
      let prfFunc = null;
      const prf = searchPath(data, "crypto/kdfparams/prf");
      if (prf === "hmac-sha256") {
        prfFunc = "sha256";
      } else if (prf === "hmac-sha512") {
        prfFunc = "sha512";
      } else {
        throwError("prf", prf);
      }
      const count = parseInt(searchPath(data, "crypto/kdfparams/c"));
      const dkLen = parseInt(searchPath(data, "crypto/kdfparams/dklen"));
      if (dkLen !== 32) {
        throwError("dklen", dkLen);
      }
      return pbkdf2Func(passwordBytes, salt, count, dkLen, prfFunc);
    }
  }
  return logger14.throwArgumentError("unsupported key-derivation function", "kdf", kdf);
}
function decryptSync(json, password) {
  const data = JSON.parse(json);
  const key = _computeKdfKey(data, password, pbkdf2Sync, import_scrypt_js.default.syncScrypt);
  return _getAccount(data, key);
}
function decrypt2(json, password, progressCallback) {
  return __awaiter4(this, void 0, void 0, function* () {
    const data = JSON.parse(json);
    const key = yield _computeKdfKey(data, password, pbkdf22, import_scrypt_js.default.scrypt, progressCallback);
    return _getAccount(data, key);
  });
}
function encrypt(account, password, options, progressCallback) {
  try {
    if (getAddress(account.address) !== computeAddress(account.privateKey)) {
      throw new Error("address/privateKey mismatch");
    }
    if (hasMnemonic(account)) {
      const mnemonic = account.mnemonic;
      const node = HDNode.fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path || defaultPath);
      if (node.privateKey != account.privateKey) {
        throw new Error("mnemonic mismatch");
      }
    }
  } catch (e) {
    return Promise.reject(e);
  }
  if (typeof options === "function" && !progressCallback) {
    progressCallback = options;
    options = {};
  }
  if (!options) {
    options = {};
  }
  const privateKey = arrayify(account.privateKey);
  const passwordBytes = getPassword(password);
  let entropy = null;
  let path = null;
  let locale = null;
  if (hasMnemonic(account)) {
    const srcMnemonic = account.mnemonic;
    entropy = arrayify(mnemonicToEntropy(srcMnemonic.phrase, srcMnemonic.locale || "en"));
    path = srcMnemonic.path || defaultPath;
    locale = srcMnemonic.locale || "en";
  }
  let client = options.client;
  if (!client) {
    client = "ethers.js";
  }
  let salt = null;
  if (options.salt) {
    salt = arrayify(options.salt);
  } else {
    salt = randomBytes(32);
    ;
  }
  let iv = null;
  if (options.iv) {
    iv = arrayify(options.iv);
    if (iv.length !== 16) {
      throw new Error("invalid iv");
    }
  } else {
    iv = randomBytes(16);
  }
  let uuidRandom = null;
  if (options.uuid) {
    uuidRandom = arrayify(options.uuid);
    if (uuidRandom.length !== 16) {
      throw new Error("invalid uuid");
    }
  } else {
    uuidRandom = randomBytes(16);
  }
  let N2 = 1 << 17, r = 8, p = 1;
  if (options.scrypt) {
    if (options.scrypt.N) {
      N2 = options.scrypt.N;
    }
    if (options.scrypt.r) {
      r = options.scrypt.r;
    }
    if (options.scrypt.p) {
      p = options.scrypt.p;
    }
  }
  return import_scrypt_js.default.scrypt(passwordBytes, salt, N2, r, p, 64, progressCallback).then((key) => {
    key = arrayify(key);
    const derivedKey = key.slice(0, 16);
    const macPrefix = key.slice(16, 32);
    const mnemonicKey = key.slice(32, 64);
    const counter = new import_aes_js2.default.Counter(iv);
    const aesCtr = new import_aes_js2.default.ModeOfOperation.ctr(derivedKey, counter);
    const ciphertext = arrayify(aesCtr.encrypt(privateKey));
    const mac = keccak256(concat([macPrefix, ciphertext]));
    const data = {
      address: account.address.substring(2).toLowerCase(),
      id: uuidV4(uuidRandom),
      version: 3,
      Crypto: {
        cipher: "aes-128-ctr",
        cipherparams: {
          iv: hexlify(iv).substring(2)
        },
        ciphertext: hexlify(ciphertext).substring(2),
        kdf: "scrypt",
        kdfparams: {
          salt: hexlify(salt).substring(2),
          n: N2,
          dklen: 32,
          p,
          r
        },
        mac: mac.substring(2)
      }
    };
    if (entropy) {
      const mnemonicIv = randomBytes(16);
      const mnemonicCounter = new import_aes_js2.default.Counter(mnemonicIv);
      const mnemonicAesCtr = new import_aes_js2.default.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
      const mnemonicCiphertext = arrayify(mnemonicAesCtr.encrypt(entropy));
      const now2 = new Date();
      const timestamp = now2.getUTCFullYear() + "-" + zpad(now2.getUTCMonth() + 1, 2) + "-" + zpad(now2.getUTCDate(), 2) + "T" + zpad(now2.getUTCHours(), 2) + "-" + zpad(now2.getUTCMinutes(), 2) + "-" + zpad(now2.getUTCSeconds(), 2) + ".0Z";
      data["x-ethers"] = {
        client,
        gethFilename: "UTC--" + timestamp + "--" + data.address,
        mnemonicCounter: hexlify(mnemonicIv).substring(2),
        mnemonicCiphertext: hexlify(mnemonicCiphertext).substring(2),
        path,
        locale,
        version: "0.1"
      };
    }
    return JSON.stringify(data);
  });
}
var import_aes_js2, import_scrypt_js, __awaiter4, logger14, KeystoreAccount;
var init_keystore = __esm({
  "node_modules/@ethersproject/json-wallets/lib.esm/keystore.js"() {
    "use strict";
    init_react();
    import_aes_js2 = __toESM(require_aes_js());
    import_scrypt_js = __toESM(require_scrypt());
    init_lib7();
    init_lib2();
    init_lib21();
    init_lib5();
    init_lib19();
    init_lib22();
    init_lib4();
    init_lib12();
    init_utils();
    init_lib();
    init_version9();
    __awaiter4 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger14 = new Logger(version9);
    KeystoreAccount = class extends Description {
      isKeystoreAccount(value) {
        return !!(value && value._isKeystoreAccount);
      }
    };
  }
});

// node_modules/@ethersproject/json-wallets/lib.esm/index.js
function decryptJsonWallet(json, password, progressCallback) {
  if (isCrowdsaleWallet(json)) {
    if (progressCallback) {
      progressCallback(0);
    }
    const account = decrypt(json, password);
    if (progressCallback) {
      progressCallback(1);
    }
    return Promise.resolve(account);
  }
  if (isKeystoreWallet(json)) {
    return decrypt2(json, password, progressCallback);
  }
  return Promise.reject(new Error("invalid JSON wallet"));
}
function decryptJsonWalletSync(json, password) {
  if (isCrowdsaleWallet(json)) {
    return decrypt(json, password);
  }
  if (isKeystoreWallet(json)) {
    return decryptSync(json, password);
  }
  throw new Error("invalid JSON wallet");
}
var init_lib23 = __esm({
  "node_modules/@ethersproject/json-wallets/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_crowdsale();
    init_inspect();
    init_keystore();
  }
});

// node_modules/@ethersproject/wallet/lib.esm/_version.js
var version10;
var init_version10 = __esm({
  "node_modules/@ethersproject/wallet/lib.esm/_version.js"() {
    init_react();
    version10 = "wallet/5.5.0";
  }
});

// node_modules/@ethersproject/wallet/lib.esm/index.js
function isAccount(value) {
  return value != null && isHexString(value.privateKey, 32) && value.address != null;
}
function hasMnemonic2(value) {
  const mnemonic = value.mnemonic;
  return mnemonic && mnemonic.phrase;
}
function verifyMessage(message, signature) {
  return recoverAddress(hashMessage(message), signature);
}
function verifyTypedData(domain, types, value, signature) {
  return recoverAddress(TypedDataEncoder.hash(domain, types, value), signature);
}
var __awaiter5, logger15, Wallet;
var init_lib24 = __esm({
  "node_modules/@ethersproject/wallet/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_lib7();
    init_lib14();
    init_lib15();
    init_lib2();
    init_lib10();
    init_lib21();
    init_lib5();
    init_lib4();
    init_lib22();
    init_lib11();
    init_lib23();
    init_lib12();
    init_lib();
    init_version10();
    __awaiter5 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger15 = new Logger(version10);
    Wallet = class extends Signer {
      constructor(privateKey, provider) {
        logger15.checkNew(new.target, Wallet);
        super();
        if (isAccount(privateKey)) {
          const signingKey = new SigningKey(privateKey.privateKey);
          defineReadOnly(this, "_signingKey", () => signingKey);
          defineReadOnly(this, "address", computeAddress(this.publicKey));
          if (this.address !== getAddress(privateKey.address)) {
            logger15.throwArgumentError("privateKey/address mismatch", "privateKey", "[REDACTED]");
          }
          if (hasMnemonic2(privateKey)) {
            const srcMnemonic = privateKey.mnemonic;
            defineReadOnly(this, "_mnemonic", () => ({
              phrase: srcMnemonic.phrase,
              path: srcMnemonic.path || defaultPath,
              locale: srcMnemonic.locale || "en"
            }));
            const mnemonic = this.mnemonic;
            const node = HDNode.fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path);
            if (computeAddress(node.privateKey) !== this.address) {
              logger15.throwArgumentError("mnemonic/address mismatch", "privateKey", "[REDACTED]");
            }
          } else {
            defineReadOnly(this, "_mnemonic", () => null);
          }
        } else {
          if (SigningKey.isSigningKey(privateKey)) {
            if (privateKey.curve !== "secp256k1") {
              logger15.throwArgumentError("unsupported curve; must be secp256k1", "privateKey", "[REDACTED]");
            }
            defineReadOnly(this, "_signingKey", () => privateKey);
          } else {
            if (typeof privateKey === "string") {
              if (privateKey.match(/^[0-9a-f]*$/i) && privateKey.length === 64) {
                privateKey = "0x" + privateKey;
              }
            }
            const signingKey = new SigningKey(privateKey);
            defineReadOnly(this, "_signingKey", () => signingKey);
          }
          defineReadOnly(this, "_mnemonic", () => null);
          defineReadOnly(this, "address", computeAddress(this.publicKey));
        }
        if (provider && !Provider.isProvider(provider)) {
          logger15.throwArgumentError("invalid provider", "provider", provider);
        }
        defineReadOnly(this, "provider", provider || null);
      }
      get mnemonic() {
        return this._mnemonic();
      }
      get privateKey() {
        return this._signingKey().privateKey;
      }
      get publicKey() {
        return this._signingKey().publicKey;
      }
      getAddress() {
        return Promise.resolve(this.address);
      }
      connect(provider) {
        return new Wallet(this, provider);
      }
      signTransaction(transaction) {
        return resolveProperties(transaction).then((tx) => {
          if (tx.from != null) {
            if (getAddress(tx.from) !== this.address) {
              logger15.throwArgumentError("transaction from address mismatch", "transaction.from", transaction.from);
            }
            delete tx.from;
          }
          const signature = this._signingKey().signDigest(keccak256(serialize(tx)));
          return serialize(tx, signature);
        });
      }
      signMessage(message) {
        return __awaiter5(this, void 0, void 0, function* () {
          return joinSignature(this._signingKey().signDigest(hashMessage(message)));
        });
      }
      _signTypedData(domain, types, value) {
        return __awaiter5(this, void 0, void 0, function* () {
          const populated = yield TypedDataEncoder.resolveNames(domain, types, value, (name2) => {
            if (this.provider == null) {
              logger15.throwError("cannot resolve ENS names without a provider", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "resolveName",
                value: name2
              });
            }
            return this.provider.resolveName(name2);
          });
          return joinSignature(this._signingKey().signDigest(TypedDataEncoder.hash(populated.domain, types, populated.value)));
        });
      }
      encrypt(password, options, progressCallback) {
        if (typeof options === "function" && !progressCallback) {
          progressCallback = options;
          options = {};
        }
        if (progressCallback && typeof progressCallback !== "function") {
          throw new Error("invalid callback");
        }
        if (!options) {
          options = {};
        }
        return encrypt(this, password, options, progressCallback);
      }
      static createRandom(options) {
        let entropy = randomBytes(16);
        if (!options) {
          options = {};
        }
        if (options.extraEntropy) {
          entropy = arrayify(hexDataSlice(keccak256(concat([entropy, options.extraEntropy])), 0, 16));
        }
        const mnemonic = entropyToMnemonic(entropy, options.locale);
        return Wallet.fromMnemonic(mnemonic, options.path, options.locale);
      }
      static fromEncryptedJson(json, password, progressCallback) {
        return decryptJsonWallet(json, password, progressCallback).then((account) => {
          return new Wallet(account);
        });
      }
      static fromEncryptedJsonSync(json, password) {
        return new Wallet(decryptJsonWalletSync(json, password));
      }
      static fromMnemonic(mnemonic, path, wordlist2) {
        if (!path) {
          path = defaultPath;
        }
        return new Wallet(HDNode.fromMnemonic(mnemonic, null, wordlist2).derivePath(path));
      }
    };
  }
});

// node_modules/@ethersproject/networks/lib.esm/_version.js
var version11;
var init_version11 = __esm({
  "node_modules/@ethersproject/networks/lib.esm/_version.js"() {
    init_react();
    version11 = "networks/5.5.2";
  }
});

// node_modules/@ethersproject/networks/lib.esm/index.js
function isRenetworkable(value) {
  return value && typeof value.renetwork === "function";
}
function ethDefaultProvider(network) {
  const func = function(providers, options) {
    if (options == null) {
      options = {};
    }
    const providerList = [];
    if (providers.InfuraProvider) {
      try {
        providerList.push(new providers.InfuraProvider(network, options.infura));
      } catch (error) {
      }
    }
    if (providers.EtherscanProvider) {
      try {
        providerList.push(new providers.EtherscanProvider(network, options.etherscan));
      } catch (error) {
      }
    }
    if (providers.AlchemyProvider) {
      try {
        providerList.push(new providers.AlchemyProvider(network, options.alchemy));
      } catch (error) {
      }
    }
    if (providers.PocketProvider) {
      const skip = ["goerli", "ropsten", "rinkeby"];
      try {
        const provider = new providers.PocketProvider(network);
        if (provider.network && skip.indexOf(provider.network.name) === -1) {
          providerList.push(provider);
        }
      } catch (error) {
      }
    }
    if (providers.CloudflareProvider) {
      try {
        providerList.push(new providers.CloudflareProvider(network));
      } catch (error) {
      }
    }
    if (providerList.length === 0) {
      return null;
    }
    if (providers.FallbackProvider) {
      let quorum = 1;
      if (options.quorum != null) {
        quorum = options.quorum;
      } else if (network === "homestead") {
        quorum = 2;
      }
      return new providers.FallbackProvider(providerList, quorum);
    }
    return providerList[0];
  };
  func.renetwork = function(network2) {
    return ethDefaultProvider(network2);
  };
  return func;
}
function etcDefaultProvider(url, network) {
  const func = function(providers, options) {
    if (providers.JsonRpcProvider) {
      return new providers.JsonRpcProvider(url, network);
    }
    return null;
  };
  func.renetwork = function(network2) {
    return etcDefaultProvider(url, network2);
  };
  return func;
}
function getNetwork(network) {
  if (network == null) {
    return null;
  }
  if (typeof network === "number") {
    for (const name2 in networks) {
      const standard2 = networks[name2];
      if (standard2.chainId === network) {
        return {
          name: standard2.name,
          chainId: standard2.chainId,
          ensAddress: standard2.ensAddress || null,
          _defaultProvider: standard2._defaultProvider || null
        };
      }
    }
    return {
      chainId: network,
      name: "unknown"
    };
  }
  if (typeof network === "string") {
    const standard2 = networks[network];
    if (standard2 == null) {
      return null;
    }
    return {
      name: standard2.name,
      chainId: standard2.chainId,
      ensAddress: standard2.ensAddress,
      _defaultProvider: standard2._defaultProvider || null
    };
  }
  const standard = networks[network.name];
  if (!standard) {
    if (typeof network.chainId !== "number") {
      logger16.throwArgumentError("invalid network chainId", "network", network);
    }
    return network;
  }
  if (network.chainId !== 0 && network.chainId !== standard.chainId) {
    logger16.throwArgumentError("network chainId mismatch", "network", network);
  }
  let defaultProvider = network._defaultProvider || null;
  if (defaultProvider == null && standard._defaultProvider) {
    if (isRenetworkable(standard._defaultProvider)) {
      defaultProvider = standard._defaultProvider.renetwork(network);
    } else {
      defaultProvider = standard._defaultProvider;
    }
  }
  return {
    name: network.name,
    chainId: standard.chainId,
    ensAddress: network.ensAddress || standard.ensAddress || null,
    _defaultProvider: defaultProvider
  };
}
var logger16, homestead, ropsten, classicMordor, networks;
var init_lib25 = __esm({
  "node_modules/@ethersproject/networks/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_lib();
    init_version11();
    logger16 = new Logger(version11);
    homestead = {
      chainId: 1,
      ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      name: "homestead",
      _defaultProvider: ethDefaultProvider("homestead")
    };
    ropsten = {
      chainId: 3,
      ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      name: "ropsten",
      _defaultProvider: ethDefaultProvider("ropsten")
    };
    classicMordor = {
      chainId: 63,
      name: "classicMordor",
      _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/mordor", "classicMordor")
    };
    networks = {
      unspecified: { chainId: 0, name: "unspecified" },
      homestead,
      mainnet: homestead,
      morden: { chainId: 2, name: "morden" },
      ropsten,
      testnet: ropsten,
      rinkeby: {
        chainId: 4,
        ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
        name: "rinkeby",
        _defaultProvider: ethDefaultProvider("rinkeby")
      },
      kovan: {
        chainId: 42,
        name: "kovan",
        _defaultProvider: ethDefaultProvider("kovan")
      },
      goerli: {
        chainId: 5,
        ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
        name: "goerli",
        _defaultProvider: ethDefaultProvider("goerli")
      },
      kintsugi: { chainId: 1337702, name: "kintsugi" },
      classic: {
        chainId: 61,
        name: "classic",
        _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/etc", "classic")
      },
      classicMorden: { chainId: 62, name: "classicMorden" },
      classicMordor,
      classicTestnet: classicMordor,
      classicKotti: {
        chainId: 6,
        name: "classicKotti",
        _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/kotti", "classicKotti")
      },
      xdai: { chainId: 100, name: "xdai" },
      matic: { chainId: 137, name: "matic" },
      maticmum: { chainId: 80001, name: "maticmum" },
      optimism: { chainId: 10, name: "optimism" },
      "optimism-kovan": { chainId: 69, name: "optimism-kovan" },
      "optimism-goerli": { chainId: 420, name: "optimism-goerli" },
      arbitrum: { chainId: 42161, name: "arbitrum" },
      "arbitrum-rinkeby": { chainId: 421611, name: "arbitrum-rinkeby" },
      bnb: { chainId: 56, name: "bnb" },
      bnbt: { chainId: 97, name: "bnbt" }
    };
  }
});

// node_modules/@ethersproject/base64/lib.esm/base64.js
function decode(textData) {
  textData = atob(textData);
  const data = [];
  for (let i = 0; i < textData.length; i++) {
    data.push(textData.charCodeAt(i));
  }
  return arrayify(data);
}
function encode(data) {
  data = arrayify(data);
  let textData = "";
  for (let i = 0; i < data.length; i++) {
    textData += String.fromCharCode(data[i]);
  }
  return btoa(textData);
}
var init_base64 = __esm({
  "node_modules/@ethersproject/base64/lib.esm/base64.js"() {
    "use strict";
    init_react();
    init_lib2();
  }
});

// node_modules/@ethersproject/base64/lib.esm/index.js
var lib_exports3 = {};
__export(lib_exports3, {
  decode: () => decode,
  encode: () => encode
});
var init_lib26 = __esm({
  "node_modules/@ethersproject/base64/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_base64();
  }
});

// node_modules/@ethersproject/web/lib.esm/_version.js
var version12;
var init_version12 = __esm({
  "node_modules/@ethersproject/web/lib.esm/_version.js"() {
    init_react();
    version12 = "web/5.5.1";
  }
});

// node_modules/@ethersproject/web/lib.esm/geturl.js
function getUrl(href, options) {
  return __awaiter6(this, void 0, void 0, function* () {
    if (options == null) {
      options = {};
    }
    const request = {
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body || void 0
    };
    if (options.skipFetchSetup !== true) {
      request.mode = "cors";
      request.cache = "no-cache";
      request.credentials = "same-origin";
      request.redirect = "follow";
      request.referrer = "client";
    }
    ;
    const response = yield fetch(href, request);
    const body = yield response.arrayBuffer();
    const headers = {};
    if (response.headers.forEach) {
      response.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });
    } else {
      response.headers.keys().forEach((key) => {
        headers[key.toLowerCase()] = response.headers.get(key);
      });
    }
    return {
      headers,
      statusCode: response.status,
      statusMessage: response.statusText,
      body: arrayify(new Uint8Array(body))
    };
  });
}
var __awaiter6;
var init_geturl = __esm({
  "node_modules/@ethersproject/web/lib.esm/geturl.js"() {
    "use strict";
    init_react();
    init_lib2();
    __awaiter6 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
  }
});

// node_modules/@ethersproject/web/lib.esm/index.js
function staller(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
function bodyify(value, type) {
  if (value == null) {
    return null;
  }
  if (typeof value === "string") {
    return value;
  }
  if (isBytesLike(value)) {
    if (type && (type.split("/")[0] === "text" || type.split(";")[0].trim() === "application/json")) {
      try {
        return toUtf8String(value);
      } catch (error) {
      }
      ;
    }
    return hexlify(value);
  }
  return value;
}
function _fetchData(connection, body, processFunc) {
  const attemptLimit = typeof connection === "object" && connection.throttleLimit != null ? connection.throttleLimit : 12;
  logger17.assertArgument(attemptLimit > 0 && attemptLimit % 1 === 0, "invalid connection throttle limit", "connection.throttleLimit", attemptLimit);
  const throttleCallback = typeof connection === "object" ? connection.throttleCallback : null;
  const throttleSlotInterval = typeof connection === "object" && typeof connection.throttleSlotInterval === "number" ? connection.throttleSlotInterval : 100;
  logger17.assertArgument(throttleSlotInterval > 0 && throttleSlotInterval % 1 === 0, "invalid connection throttle slot interval", "connection.throttleSlotInterval", throttleSlotInterval);
  const headers = {};
  let url = null;
  const options = {
    method: "GET"
  };
  let allow304 = false;
  let timeout = 2 * 60 * 1e3;
  if (typeof connection === "string") {
    url = connection;
  } else if (typeof connection === "object") {
    if (connection == null || connection.url == null) {
      logger17.throwArgumentError("missing URL", "connection.url", connection);
    }
    url = connection.url;
    if (typeof connection.timeout === "number" && connection.timeout > 0) {
      timeout = connection.timeout;
    }
    if (connection.headers) {
      for (const key in connection.headers) {
        headers[key.toLowerCase()] = { key, value: String(connection.headers[key]) };
        if (["if-none-match", "if-modified-since"].indexOf(key.toLowerCase()) >= 0) {
          allow304 = true;
        }
      }
    }
    options.allowGzip = !!connection.allowGzip;
    if (connection.user != null && connection.password != null) {
      if (url.substring(0, 6) !== "https:" && connection.allowInsecureAuthentication !== true) {
        logger17.throwError("basic authentication requires a secure https url", Logger.errors.INVALID_ARGUMENT, { argument: "url", url, user: connection.user, password: "[REDACTED]" });
      }
      const authorization = connection.user + ":" + connection.password;
      headers["authorization"] = {
        key: "Authorization",
        value: "Basic " + encode(toUtf8Bytes(authorization))
      };
    }
  }
  const reData = new RegExp("^data:([a-z0-9-]+/[a-z0-9-]+);base64,(.*)$", "i");
  const dataMatch = url ? url.match(reData) : null;
  if (dataMatch) {
    try {
      const response = {
        statusCode: 200,
        statusMessage: "OK",
        headers: { "content-type": dataMatch[1] },
        body: decode(dataMatch[2])
      };
      let result = response.body;
      if (processFunc) {
        result = processFunc(response.body, response);
      }
      return Promise.resolve(result);
    } catch (error) {
      logger17.throwError("processing response error", Logger.errors.SERVER_ERROR, {
        body: bodyify(dataMatch[1], dataMatch[2]),
        error,
        requestBody: null,
        requestMethod: "GET",
        url
      });
    }
  }
  if (body) {
    options.method = "POST";
    options.body = body;
    if (headers["content-type"] == null) {
      headers["content-type"] = { key: "Content-Type", value: "application/octet-stream" };
    }
    if (headers["content-length"] == null) {
      headers["content-length"] = { key: "Content-Length", value: String(body.length) };
    }
  }
  const flatHeaders = {};
  Object.keys(headers).forEach((key) => {
    const header = headers[key];
    flatHeaders[header.key] = header.value;
  });
  options.headers = flatHeaders;
  const runningTimeout = function() {
    let timer2 = null;
    const promise = new Promise(function(resolve, reject) {
      if (timeout) {
        timer2 = setTimeout(() => {
          if (timer2 == null) {
            return;
          }
          timer2 = null;
          reject(logger17.makeError("timeout", Logger.errors.TIMEOUT, {
            requestBody: bodyify(options.body, flatHeaders["content-type"]),
            requestMethod: options.method,
            timeout,
            url
          }));
        }, timeout);
      }
    });
    const cancel = function() {
      if (timer2 == null) {
        return;
      }
      clearTimeout(timer2);
      timer2 = null;
    };
    return { promise, cancel };
  }();
  const runningFetch = function() {
    return __awaiter7(this, void 0, void 0, function* () {
      for (let attempt = 0; attempt < attemptLimit; attempt++) {
        let response = null;
        try {
          response = yield getUrl(url, options);
          if (attempt < attemptLimit) {
            if (response.statusCode === 301 || response.statusCode === 302) {
              const location = response.headers.location || "";
              if (options.method === "GET" && location.match(/^https:/)) {
                url = response.headers.location;
                continue;
              }
            } else if (response.statusCode === 429) {
              let tryAgain = true;
              if (throttleCallback) {
                tryAgain = yield throttleCallback(attempt, url);
              }
              if (tryAgain) {
                let stall3 = 0;
                const retryAfter = response.headers["retry-after"];
                if (typeof retryAfter === "string" && retryAfter.match(/^[1-9][0-9]*$/)) {
                  stall3 = parseInt(retryAfter) * 1e3;
                } else {
                  stall3 = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                }
                yield staller(stall3);
                continue;
              }
            }
          }
        } catch (error) {
          response = error.response;
          if (response == null) {
            runningTimeout.cancel();
            logger17.throwError("missing response", Logger.errors.SERVER_ERROR, {
              requestBody: bodyify(options.body, flatHeaders["content-type"]),
              requestMethod: options.method,
              serverError: error,
              url
            });
          }
        }
        let body2 = response.body;
        if (allow304 && response.statusCode === 304) {
          body2 = null;
        } else if (response.statusCode < 200 || response.statusCode >= 300) {
          runningTimeout.cancel();
          logger17.throwError("bad response", Logger.errors.SERVER_ERROR, {
            status: response.statusCode,
            headers: response.headers,
            body: bodyify(body2, response.headers ? response.headers["content-type"] : null),
            requestBody: bodyify(options.body, flatHeaders["content-type"]),
            requestMethod: options.method,
            url
          });
        }
        if (processFunc) {
          try {
            const result = yield processFunc(body2, response);
            runningTimeout.cancel();
            return result;
          } catch (error) {
            if (error.throttleRetry && attempt < attemptLimit) {
              let tryAgain = true;
              if (throttleCallback) {
                tryAgain = yield throttleCallback(attempt, url);
              }
              if (tryAgain) {
                const timeout2 = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                yield staller(timeout2);
                continue;
              }
            }
            runningTimeout.cancel();
            logger17.throwError("processing response error", Logger.errors.SERVER_ERROR, {
              body: bodyify(body2, response.headers ? response.headers["content-type"] : null),
              error,
              requestBody: bodyify(options.body, flatHeaders["content-type"]),
              requestMethod: options.method,
              url
            });
          }
        }
        runningTimeout.cancel();
        return body2;
      }
      return logger17.throwError("failed response", Logger.errors.SERVER_ERROR, {
        requestBody: bodyify(options.body, flatHeaders["content-type"]),
        requestMethod: options.method,
        url
      });
    });
  }();
  return Promise.race([runningTimeout.promise, runningFetch]);
}
function fetchJson(connection, json, processFunc) {
  let processJsonFunc = (value, response) => {
    let result = null;
    if (value != null) {
      try {
        result = JSON.parse(toUtf8String(value));
      } catch (error) {
        logger17.throwError("invalid JSON", Logger.errors.SERVER_ERROR, {
          body: value,
          error
        });
      }
    }
    if (processFunc) {
      result = processFunc(result, response);
    }
    return result;
  };
  let body = null;
  if (json != null) {
    body = toUtf8Bytes(json);
    const updated = typeof connection === "string" ? { url: connection } : shallowCopy(connection);
    if (updated.headers) {
      const hasContentType = Object.keys(updated.headers).filter((k) => k.toLowerCase() === "content-type").length !== 0;
      if (!hasContentType) {
        updated.headers = shallowCopy(updated.headers);
        updated.headers["content-type"] = "application/json";
      }
    } else {
      updated.headers = { "content-type": "application/json" };
    }
    connection = updated;
  }
  return _fetchData(connection, body, processJsonFunc);
}
function poll(func, options) {
  if (!options) {
    options = {};
  }
  options = shallowCopy(options);
  if (options.floor == null) {
    options.floor = 0;
  }
  if (options.ceiling == null) {
    options.ceiling = 1e4;
  }
  if (options.interval == null) {
    options.interval = 250;
  }
  return new Promise(function(resolve, reject) {
    let timer2 = null;
    let done = false;
    const cancel = () => {
      if (done) {
        return false;
      }
      done = true;
      if (timer2) {
        clearTimeout(timer2);
      }
      return true;
    };
    if (options.timeout) {
      timer2 = setTimeout(() => {
        if (cancel()) {
          reject(new Error("timeout"));
        }
      }, options.timeout);
    }
    const retryLimit = options.retryLimit;
    let attempt = 0;
    function check() {
      return func().then(function(result) {
        if (result !== void 0) {
          if (cancel()) {
            resolve(result);
          }
        } else if (options.oncePoll) {
          options.oncePoll.once("poll", check);
        } else if (options.onceBlock) {
          options.onceBlock.once("block", check);
        } else if (!done) {
          attempt++;
          if (attempt > retryLimit) {
            if (cancel()) {
              reject(new Error("retry limit reached"));
            }
            return;
          }
          let timeout = options.interval * parseInt(String(Math.random() * Math.pow(2, attempt)));
          if (timeout < options.floor) {
            timeout = options.floor;
          }
          if (timeout > options.ceiling) {
            timeout = options.ceiling;
          }
          setTimeout(check, timeout);
        }
        return null;
      }, function(error) {
        if (cancel()) {
          reject(error);
        }
      });
    }
    check();
  });
}
var __awaiter7, logger17;
var init_lib27 = __esm({
  "node_modules/@ethersproject/web/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_lib26();
    init_lib2();
    init_lib4();
    init_lib9();
    init_lib();
    init_version12();
    init_geturl();
    __awaiter7 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger17 = new Logger(version12);
  }
});

// node_modules/bech32/index.js
var require_bech32 = __commonJS({
  "node_modules/bech32/index.js"(exports, module) {
    "use strict";
    init_react();
    var ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
    var ALPHABET_MAP = {};
    for (z = 0; z < ALPHABET.length; z++) {
      x = ALPHABET.charAt(z);
      if (ALPHABET_MAP[x] !== void 0)
        throw new TypeError(x + " is ambiguous");
      ALPHABET_MAP[x] = z;
    }
    var x;
    var z;
    function polymodStep(pre) {
      var b = pre >> 25;
      return (pre & 33554431) << 5 ^ -(b >> 0 & 1) & 996825010 ^ -(b >> 1 & 1) & 642813549 ^ -(b >> 2 & 1) & 513874426 ^ -(b >> 3 & 1) & 1027748829 ^ -(b >> 4 & 1) & 705979059;
    }
    function prefixChk(prefix) {
      var chk = 1;
      for (var i = 0; i < prefix.length; ++i) {
        var c = prefix.charCodeAt(i);
        if (c < 33 || c > 126)
          return "Invalid prefix (" + prefix + ")";
        chk = polymodStep(chk) ^ c >> 5;
      }
      chk = polymodStep(chk);
      for (i = 0; i < prefix.length; ++i) {
        var v = prefix.charCodeAt(i);
        chk = polymodStep(chk) ^ v & 31;
      }
      return chk;
    }
    function encode2(prefix, words2, LIMIT) {
      LIMIT = LIMIT || 90;
      if (prefix.length + 7 + words2.length > LIMIT)
        throw new TypeError("Exceeds length limit");
      prefix = prefix.toLowerCase();
      var chk = prefixChk(prefix);
      if (typeof chk === "string")
        throw new Error(chk);
      var result = prefix + "1";
      for (var i = 0; i < words2.length; ++i) {
        var x2 = words2[i];
        if (x2 >> 5 !== 0)
          throw new Error("Non 5-bit word");
        chk = polymodStep(chk) ^ x2;
        result += ALPHABET.charAt(x2);
      }
      for (i = 0; i < 6; ++i) {
        chk = polymodStep(chk);
      }
      chk ^= 1;
      for (i = 0; i < 6; ++i) {
        var v = chk >> (5 - i) * 5 & 31;
        result += ALPHABET.charAt(v);
      }
      return result;
    }
    function __decode(str, LIMIT) {
      LIMIT = LIMIT || 90;
      if (str.length < 8)
        return str + " too short";
      if (str.length > LIMIT)
        return "Exceeds length limit";
      var lowered = str.toLowerCase();
      var uppered = str.toUpperCase();
      if (str !== lowered && str !== uppered)
        return "Mixed-case string " + str;
      str = lowered;
      var split = str.lastIndexOf("1");
      if (split === -1)
        return "No separator character for " + str;
      if (split === 0)
        return "Missing prefix for " + str;
      var prefix = str.slice(0, split);
      var wordChars = str.slice(split + 1);
      if (wordChars.length < 6)
        return "Data too short";
      var chk = prefixChk(prefix);
      if (typeof chk === "string")
        return chk;
      var words2 = [];
      for (var i = 0; i < wordChars.length; ++i) {
        var c = wordChars.charAt(i);
        var v = ALPHABET_MAP[c];
        if (v === void 0)
          return "Unknown character " + c;
        chk = polymodStep(chk) ^ v;
        if (i + 6 >= wordChars.length)
          continue;
        words2.push(v);
      }
      if (chk !== 1)
        return "Invalid checksum for " + str;
      return { prefix, words: words2 };
    }
    function decodeUnsafe() {
      var res = __decode.apply(null, arguments);
      if (typeof res === "object")
        return res;
    }
    function decode2(str) {
      var res = __decode.apply(null, arguments);
      if (typeof res === "object")
        return res;
      throw new Error(res);
    }
    function convert(data, inBits, outBits, pad) {
      var value = 0;
      var bits = 0;
      var maxV = (1 << outBits) - 1;
      var result = [];
      for (var i = 0; i < data.length; ++i) {
        value = value << inBits | data[i];
        bits += inBits;
        while (bits >= outBits) {
          bits -= outBits;
          result.push(value >> bits & maxV);
        }
      }
      if (pad) {
        if (bits > 0) {
          result.push(value << outBits - bits & maxV);
        }
      } else {
        if (bits >= inBits)
          return "Excess padding";
        if (value << outBits - bits & maxV)
          return "Non-zero padding";
      }
      return result;
    }
    function toWordsUnsafe(bytes) {
      var res = convert(bytes, 8, 5, true);
      if (Array.isArray(res))
        return res;
    }
    function toWords(bytes) {
      var res = convert(bytes, 8, 5, true);
      if (Array.isArray(res))
        return res;
      throw new Error(res);
    }
    function fromWordsUnsafe(words2) {
      var res = convert(words2, 5, 8, false);
      if (Array.isArray(res))
        return res;
    }
    function fromWords(words2) {
      var res = convert(words2, 5, 8, false);
      if (Array.isArray(res))
        return res;
      throw new Error(res);
    }
    module.exports = {
      decodeUnsafe,
      decode: decode2,
      encode: encode2,
      toWordsUnsafe,
      toWords,
      fromWordsUnsafe,
      fromWords
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/_version.js
var version13;
var init_version13 = __esm({
  "node_modules/@ethersproject/providers/lib.esm/_version.js"() {
    init_react();
    version13 = "providers/5.5.2";
  }
});

// node_modules/@ethersproject/providers/lib.esm/formatter.js
function isCommunityResourcable(value) {
  return value && typeof value.isCommunityResource === "function";
}
function isCommunityResource(value) {
  return isCommunityResourcable(value) && value.isCommunityResource();
}
function showThrottleMessage() {
  if (throttleMessage) {
    return;
  }
  throttleMessage = true;
  console.log("========= NOTICE =========");
  console.log("Request-Rate Exceeded  (this message will not be repeated)");
  console.log("");
  console.log("The default API keys for each service are provided as a highly-throttled,");
  console.log("community resource for low-traffic projects and early prototyping.");
  console.log("");
  console.log("While your application will continue to function, we highly recommended");
  console.log("signing up for your own API keys to improve performance, increase your");
  console.log("request rate/limit and enable other perks, such as metrics and advanced APIs.");
  console.log("");
  console.log("For more details: https://docs.ethers.io/api-keys/");
  console.log("==========================");
}
var logger18, Formatter, throttleMessage;
var init_formatter = __esm({
  "node_modules/@ethersproject/providers/lib.esm/formatter.js"() {
    "use strict";
    init_react();
    init_lib7();
    init_lib3();
    init_lib2();
    init_lib8();
    init_lib4();
    init_lib12();
    init_lib();
    init_version13();
    logger18 = new Logger(version13);
    Formatter = class {
      constructor() {
        logger18.checkNew(new.target, Formatter);
        this.formats = this.getDefaultFormats();
      }
      getDefaultFormats() {
        const formats = {};
        const address = this.address.bind(this);
        const bigNumber = this.bigNumber.bind(this);
        const blockTag = this.blockTag.bind(this);
        const data = this.data.bind(this);
        const hash2 = this.hash.bind(this);
        const hex = this.hex.bind(this);
        const number = this.number.bind(this);
        const type = this.type.bind(this);
        const strictData = (v) => {
          return this.data(v, true);
        };
        formats.transaction = {
          hash: hash2,
          type,
          accessList: Formatter.allowNull(this.accessList.bind(this), null),
          blockHash: Formatter.allowNull(hash2, null),
          blockNumber: Formatter.allowNull(number, null),
          transactionIndex: Formatter.allowNull(number, null),
          confirmations: Formatter.allowNull(number, null),
          from: address,
          gasPrice: Formatter.allowNull(bigNumber),
          maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
          maxFeePerGas: Formatter.allowNull(bigNumber),
          gasLimit: bigNumber,
          to: Formatter.allowNull(address, null),
          value: bigNumber,
          nonce: number,
          data,
          r: Formatter.allowNull(this.uint256),
          s: Formatter.allowNull(this.uint256),
          v: Formatter.allowNull(number),
          creates: Formatter.allowNull(address, null),
          raw: Formatter.allowNull(data)
        };
        formats.transactionRequest = {
          from: Formatter.allowNull(address),
          nonce: Formatter.allowNull(number),
          gasLimit: Formatter.allowNull(bigNumber),
          gasPrice: Formatter.allowNull(bigNumber),
          maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
          maxFeePerGas: Formatter.allowNull(bigNumber),
          to: Formatter.allowNull(address),
          value: Formatter.allowNull(bigNumber),
          data: Formatter.allowNull(strictData),
          type: Formatter.allowNull(number),
          accessList: Formatter.allowNull(this.accessList.bind(this), null)
        };
        formats.receiptLog = {
          transactionIndex: number,
          blockNumber: number,
          transactionHash: hash2,
          address,
          topics: Formatter.arrayOf(hash2),
          data,
          logIndex: number,
          blockHash: hash2
        };
        formats.receipt = {
          to: Formatter.allowNull(this.address, null),
          from: Formatter.allowNull(this.address, null),
          contractAddress: Formatter.allowNull(address, null),
          transactionIndex: number,
          root: Formatter.allowNull(hex),
          gasUsed: bigNumber,
          logsBloom: Formatter.allowNull(data),
          blockHash: hash2,
          transactionHash: hash2,
          logs: Formatter.arrayOf(this.receiptLog.bind(this)),
          blockNumber: number,
          confirmations: Formatter.allowNull(number, null),
          cumulativeGasUsed: bigNumber,
          effectiveGasPrice: Formatter.allowNull(bigNumber),
          status: Formatter.allowNull(number),
          type
        };
        formats.block = {
          hash: hash2,
          parentHash: hash2,
          number,
          timestamp: number,
          nonce: Formatter.allowNull(hex),
          difficulty: this.difficulty.bind(this),
          gasLimit: bigNumber,
          gasUsed: bigNumber,
          miner: address,
          extraData: data,
          transactions: Formatter.allowNull(Formatter.arrayOf(hash2)),
          baseFeePerGas: Formatter.allowNull(bigNumber)
        };
        formats.blockWithTransactions = shallowCopy(formats.block);
        formats.blockWithTransactions.transactions = Formatter.allowNull(Formatter.arrayOf(this.transactionResponse.bind(this)));
        formats.filter = {
          fromBlock: Formatter.allowNull(blockTag, void 0),
          toBlock: Formatter.allowNull(blockTag, void 0),
          blockHash: Formatter.allowNull(hash2, void 0),
          address: Formatter.allowNull(address, void 0),
          topics: Formatter.allowNull(this.topics.bind(this), void 0)
        };
        formats.filterLog = {
          blockNumber: Formatter.allowNull(number),
          blockHash: Formatter.allowNull(hash2),
          transactionIndex: number,
          removed: Formatter.allowNull(this.boolean.bind(this)),
          address,
          data: Formatter.allowFalsish(data, "0x"),
          topics: Formatter.arrayOf(hash2),
          transactionHash: hash2,
          logIndex: number
        };
        return formats;
      }
      accessList(accessList) {
        return accessListify(accessList || []);
      }
      number(number) {
        if (number === "0x") {
          return 0;
        }
        return BigNumber.from(number).toNumber();
      }
      type(number) {
        if (number === "0x" || number == null) {
          return 0;
        }
        return BigNumber.from(number).toNumber();
      }
      bigNumber(value) {
        return BigNumber.from(value);
      }
      boolean(value) {
        if (typeof value === "boolean") {
          return value;
        }
        if (typeof value === "string") {
          value = value.toLowerCase();
          if (value === "true") {
            return true;
          }
          if (value === "false") {
            return false;
          }
        }
        throw new Error("invalid boolean - " + value);
      }
      hex(value, strict) {
        if (typeof value === "string") {
          if (!strict && value.substring(0, 2) !== "0x") {
            value = "0x" + value;
          }
          if (isHexString(value)) {
            return value.toLowerCase();
          }
        }
        return logger18.throwArgumentError("invalid hash", "value", value);
      }
      data(value, strict) {
        const result = this.hex(value, strict);
        if (result.length % 2 !== 0) {
          throw new Error("invalid data; odd-length - " + value);
        }
        return result;
      }
      address(value) {
        return getAddress(value);
      }
      callAddress(value) {
        if (!isHexString(value, 32)) {
          return null;
        }
        const address = getAddress(hexDataSlice(value, 12));
        return address === AddressZero ? null : address;
      }
      contractAddress(value) {
        return getContractAddress(value);
      }
      blockTag(blockTag) {
        if (blockTag == null) {
          return "latest";
        }
        if (blockTag === "earliest") {
          return "0x0";
        }
        if (blockTag === "latest" || blockTag === "pending") {
          return blockTag;
        }
        if (typeof blockTag === "number" || isHexString(blockTag)) {
          return hexValue(blockTag);
        }
        throw new Error("invalid blockTag");
      }
      hash(value, strict) {
        const result = this.hex(value, strict);
        if (hexDataLength(result) !== 32) {
          return logger18.throwArgumentError("invalid hash", "value", value);
        }
        return result;
      }
      difficulty(value) {
        if (value == null) {
          return null;
        }
        const v = BigNumber.from(value);
        try {
          return v.toNumber();
        } catch (error) {
        }
        return null;
      }
      uint256(value) {
        if (!isHexString(value)) {
          throw new Error("invalid uint256");
        }
        return hexZeroPad(value, 32);
      }
      _block(value, format) {
        if (value.author != null && value.miner == null) {
          value.miner = value.author;
        }
        const difficulty = value._difficulty != null ? value._difficulty : value.difficulty;
        const result = Formatter.check(format, value);
        result._difficulty = difficulty == null ? null : BigNumber.from(difficulty);
        return result;
      }
      block(value) {
        return this._block(value, this.formats.block);
      }
      blockWithTransactions(value) {
        return this._block(value, this.formats.blockWithTransactions);
      }
      transactionRequest(value) {
        return Formatter.check(this.formats.transactionRequest, value);
      }
      transactionResponse(transaction) {
        if (transaction.gas != null && transaction.gasLimit == null) {
          transaction.gasLimit = transaction.gas;
        }
        if (transaction.to && BigNumber.from(transaction.to).isZero()) {
          transaction.to = "0x0000000000000000000000000000000000000000";
        }
        if (transaction.input != null && transaction.data == null) {
          transaction.data = transaction.input;
        }
        if (transaction.to == null && transaction.creates == null) {
          transaction.creates = this.contractAddress(transaction);
        }
        if ((transaction.type === 1 || transaction.type === 2) && transaction.accessList == null) {
          transaction.accessList = [];
        }
        const result = Formatter.check(this.formats.transaction, transaction);
        if (transaction.chainId != null) {
          let chainId = transaction.chainId;
          if (isHexString(chainId)) {
            chainId = BigNumber.from(chainId).toNumber();
          }
          result.chainId = chainId;
        } else {
          let chainId = transaction.networkId;
          if (chainId == null && result.v == null) {
            chainId = transaction.chainId;
          }
          if (isHexString(chainId)) {
            chainId = BigNumber.from(chainId).toNumber();
          }
          if (typeof chainId !== "number" && result.v != null) {
            chainId = (result.v - 35) / 2;
            if (chainId < 0) {
              chainId = 0;
            }
            chainId = parseInt(chainId);
          }
          if (typeof chainId !== "number") {
            chainId = 0;
          }
          result.chainId = chainId;
        }
        if (result.blockHash && result.blockHash.replace(/0/g, "") === "x") {
          result.blockHash = null;
        }
        return result;
      }
      transaction(value) {
        return parse(value);
      }
      receiptLog(value) {
        return Formatter.check(this.formats.receiptLog, value);
      }
      receipt(value) {
        const result = Formatter.check(this.formats.receipt, value);
        if (result.root != null) {
          if (result.root.length <= 4) {
            const value2 = BigNumber.from(result.root).toNumber();
            if (value2 === 0 || value2 === 1) {
              if (result.status != null && result.status !== value2) {
                logger18.throwArgumentError("alt-root-status/status mismatch", "value", { root: result.root, status: result.status });
              }
              result.status = value2;
              delete result.root;
            } else {
              logger18.throwArgumentError("invalid alt-root-status", "value.root", result.root);
            }
          } else if (result.root.length !== 66) {
            logger18.throwArgumentError("invalid root hash", "value.root", result.root);
          }
        }
        if (result.status != null) {
          result.byzantium = true;
        }
        return result;
      }
      topics(value) {
        if (Array.isArray(value)) {
          return value.map((v) => this.topics(v));
        } else if (value != null) {
          return this.hash(value, true);
        }
        return null;
      }
      filter(value) {
        return Formatter.check(this.formats.filter, value);
      }
      filterLog(value) {
        return Formatter.check(this.formats.filterLog, value);
      }
      static check(format, object) {
        const result = {};
        for (const key in format) {
          try {
            const value = format[key](object[key]);
            if (value !== void 0) {
              result[key] = value;
            }
          } catch (error) {
            error.checkKey = key;
            error.checkValue = object[key];
            throw error;
          }
        }
        return result;
      }
      static allowNull(format, nullValue) {
        return function(value) {
          if (value == null) {
            return nullValue;
          }
          return format(value);
        };
      }
      static allowFalsish(format, replaceValue) {
        return function(value) {
          if (!value) {
            return replaceValue;
          }
          return format(value);
        };
      }
      static arrayOf(format) {
        return function(array) {
          if (!Array.isArray(array)) {
            throw new Error("not an array");
          }
          const result = [];
          array.forEach(function(value) {
            result.push(format(value));
          });
          return result;
        };
      }
    };
    throttleMessage = false;
  }
});

// node_modules/@ethersproject/providers/lib.esm/base-provider.js
function checkTopic(topic) {
  if (topic == null) {
    return "null";
  }
  if (hexDataLength(topic) !== 32) {
    logger19.throwArgumentError("invalid topic", "topic", topic);
  }
  return topic.toLowerCase();
}
function serializeTopics(topics) {
  topics = topics.slice();
  while (topics.length > 0 && topics[topics.length - 1] == null) {
    topics.pop();
  }
  return topics.map((topic) => {
    if (Array.isArray(topic)) {
      const unique = {};
      topic.forEach((topic2) => {
        unique[checkTopic(topic2)] = true;
      });
      const sorted = Object.keys(unique);
      sorted.sort();
      return sorted.join("|");
    } else {
      return checkTopic(topic);
    }
  }).join("&");
}
function deserializeTopics(data) {
  if (data === "") {
    return [];
  }
  return data.split(/&/g).map((topic) => {
    if (topic === "") {
      return [];
    }
    const comps = topic.split("|").map((topic2) => {
      return topic2 === "null" ? null : topic2;
    });
    return comps.length === 1 ? comps[0] : comps;
  });
}
function getEventTag2(eventName) {
  if (typeof eventName === "string") {
    eventName = eventName.toLowerCase();
    if (hexDataLength(eventName) === 32) {
      return "tx:" + eventName;
    }
    if (eventName.indexOf(":") === -1) {
      return eventName;
    }
  } else if (Array.isArray(eventName)) {
    return "filter:*:" + serializeTopics(eventName);
  } else if (ForkEvent.isForkEvent(eventName)) {
    logger19.warn("not implemented");
    throw new Error("not implemented");
  } else if (eventName && typeof eventName === "object") {
    return "filter:" + (eventName.address || "*") + ":" + serializeTopics(eventName.topics || []);
  }
  throw new Error("invalid event - " + eventName);
}
function getTime() {
  return new Date().getTime();
}
function stall(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
function bytes32ify(value) {
  return hexZeroPad(BigNumber.from(value).toHexString(), 32);
}
function base58Encode(data) {
  return Base58.encode(concat([data, hexDataSlice(sha256(sha256(data)), 0, 4)]));
}
function _parseString(result) {
  try {
    return toUtf8String(_parseBytes(result));
  } catch (error) {
  }
  return null;
}
function _parseBytes(result) {
  if (result === "0x") {
    return null;
  }
  const offset = BigNumber.from(hexDataSlice(result, 0, 32)).toNumber();
  const length = BigNumber.from(hexDataSlice(result, offset, offset + 32)).toNumber();
  return hexDataSlice(result, offset + 32, offset + 32 + length);
}
function getIpfsLink(link) {
  return `https://gateway.ipfs.io/ipfs/${link.substring(7)}`;
}
var import_bech32, __awaiter8, logger19, PollableEvents, Event, coinInfos, matcherIpfs, matchers, Resolver, defaultFormatter, nextPollId, BaseProvider;
var init_base_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/base-provider.js"() {
    "use strict";
    init_react();
    init_lib14();
    init_lib17();
    init_lib3();
    init_lib2();
    init_lib8();
    init_lib10();
    init_lib25();
    init_lib4();
    init_lib18();
    init_lib9();
    init_lib27();
    import_bech32 = __toESM(require_bech32());
    init_lib();
    init_version13();
    init_formatter();
    __awaiter8 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger19 = new Logger(version13);
    PollableEvents = ["block", "network", "pending", "poll"];
    Event = class {
      constructor(tag, listener, once) {
        defineReadOnly(this, "tag", tag);
        defineReadOnly(this, "listener", listener);
        defineReadOnly(this, "once", once);
      }
      get event() {
        switch (this.type) {
          case "tx":
            return this.hash;
          case "filter":
            return this.filter;
        }
        return this.tag;
      }
      get type() {
        return this.tag.split(":")[0];
      }
      get hash() {
        const comps = this.tag.split(":");
        if (comps[0] !== "tx") {
          return null;
        }
        return comps[1];
      }
      get filter() {
        const comps = this.tag.split(":");
        if (comps[0] !== "filter") {
          return null;
        }
        const address = comps[1];
        const topics = deserializeTopics(comps[2]);
        const filter = {};
        if (topics.length > 0) {
          filter.topics = topics;
        }
        if (address && address !== "*") {
          filter.address = address;
        }
        return filter;
      }
      pollable() {
        return this.tag.indexOf(":") >= 0 || PollableEvents.indexOf(this.tag) >= 0;
      }
    };
    coinInfos = {
      "0": { symbol: "btc", p2pkh: 0, p2sh: 5, prefix: "bc" },
      "2": { symbol: "ltc", p2pkh: 48, p2sh: 50, prefix: "ltc" },
      "3": { symbol: "doge", p2pkh: 30, p2sh: 22 },
      "60": { symbol: "eth", ilk: "eth" },
      "61": { symbol: "etc", ilk: "eth" },
      "700": { symbol: "xdai", ilk: "eth" }
    };
    matcherIpfs = new RegExp("^(ipfs)://(.*)$", "i");
    matchers = [
      new RegExp("^(https)://(.*)$", "i"),
      new RegExp("^(data):(.*)$", "i"),
      matcherIpfs,
      new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")
    ];
    Resolver = class {
      constructor(provider, address, name2, resolvedAddress) {
        defineReadOnly(this, "provider", provider);
        defineReadOnly(this, "name", name2);
        defineReadOnly(this, "address", provider.formatter.address(address));
        defineReadOnly(this, "_resolvedAddress", resolvedAddress);
      }
      _fetchBytes(selector, parameters) {
        return __awaiter8(this, void 0, void 0, function* () {
          const tx = {
            to: this.address,
            data: hexConcat([selector, namehash(this.name), parameters || "0x"])
          };
          try {
            return _parseBytes(yield this.provider.call(tx));
          } catch (error) {
            if (error.code === Logger.errors.CALL_EXCEPTION) {
              return null;
            }
            return null;
          }
        });
      }
      _getAddress(coinType, hexBytes) {
        const coinInfo = coinInfos[String(coinType)];
        if (coinInfo == null) {
          logger19.throwError(`unsupported coin type: ${coinType}`, Logger.errors.UNSUPPORTED_OPERATION, {
            operation: `getAddress(${coinType})`
          });
        }
        if (coinInfo.ilk === "eth") {
          return this.provider.formatter.address(hexBytes);
        }
        const bytes = arrayify(hexBytes);
        if (coinInfo.p2pkh != null) {
          const p2pkh = hexBytes.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
          if (p2pkh) {
            const length = parseInt(p2pkh[1], 16);
            if (p2pkh[2].length === length * 2 && length >= 1 && length <= 75) {
              return base58Encode(concat([[coinInfo.p2pkh], "0x" + p2pkh[2]]));
            }
          }
        }
        if (coinInfo.p2sh != null) {
          const p2sh = hexBytes.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
          if (p2sh) {
            const length = parseInt(p2sh[1], 16);
            if (p2sh[2].length === length * 2 && length >= 1 && length <= 75) {
              return base58Encode(concat([[coinInfo.p2sh], "0x" + p2sh[2]]));
            }
          }
        }
        if (coinInfo.prefix != null) {
          const length = bytes[1];
          let version17 = bytes[0];
          if (version17 === 0) {
            if (length !== 20 && length !== 32) {
              version17 = -1;
            }
          } else {
            version17 = -1;
          }
          if (version17 >= 0 && bytes.length === 2 + length && length >= 1 && length <= 75) {
            const words2 = import_bech32.default.toWords(bytes.slice(2));
            words2.unshift(version17);
            return import_bech32.default.encode(coinInfo.prefix, words2);
          }
        }
        return null;
      }
      getAddress(coinType) {
        return __awaiter8(this, void 0, void 0, function* () {
          if (coinType == null) {
            coinType = 60;
          }
          if (coinType === 60) {
            try {
              const transaction = {
                to: this.address,
                data: "0x3b3b57de" + namehash(this.name).substring(2)
              };
              const hexBytes2 = yield this.provider.call(transaction);
              if (hexBytes2 === "0x" || hexBytes2 === HashZero) {
                return null;
              }
              return this.provider.formatter.callAddress(hexBytes2);
            } catch (error) {
              if (error.code === Logger.errors.CALL_EXCEPTION) {
                return null;
              }
              throw error;
            }
          }
          const hexBytes = yield this._fetchBytes("0xf1cb7e06", bytes32ify(coinType));
          if (hexBytes == null || hexBytes === "0x") {
            return null;
          }
          const address = this._getAddress(coinType, hexBytes);
          if (address == null) {
            logger19.throwError(`invalid or unsupported coin data`, Logger.errors.UNSUPPORTED_OPERATION, {
              operation: `getAddress(${coinType})`,
              coinType,
              data: hexBytes
            });
          }
          return address;
        });
      }
      getAvatar() {
        return __awaiter8(this, void 0, void 0, function* () {
          const linkage = [{ type: "name", content: this.name }];
          try {
            const avatar = yield this.getText("avatar");
            if (avatar == null) {
              return null;
            }
            for (let i = 0; i < matchers.length; i++) {
              const match = avatar.match(matchers[i]);
              if (match == null) {
                continue;
              }
              const scheme = match[1].toLowerCase();
              switch (scheme) {
                case "https":
                  linkage.push({ type: "url", content: avatar });
                  return { linkage, url: avatar };
                case "data":
                  linkage.push({ type: "data", content: avatar });
                  return { linkage, url: avatar };
                case "ipfs":
                  linkage.push({ type: "ipfs", content: avatar });
                  return { linkage, url: getIpfsLink(avatar) };
                case "erc721":
                case "erc1155": {
                  const selector = scheme === "erc721" ? "0xc87b56dd" : "0x0e89341c";
                  linkage.push({ type: scheme, content: avatar });
                  const owner = this._resolvedAddress || (yield this.getAddress());
                  const comps = (match[2] || "").split("/");
                  if (comps.length !== 2) {
                    return null;
                  }
                  const addr = yield this.provider.formatter.address(comps[0]);
                  const tokenId = hexZeroPad(BigNumber.from(comps[1]).toHexString(), 32);
                  if (scheme === "erc721") {
                    const tokenOwner = this.provider.formatter.callAddress(yield this.provider.call({
                      to: addr,
                      data: hexConcat(["0x6352211e", tokenId])
                    }));
                    if (owner !== tokenOwner) {
                      return null;
                    }
                    linkage.push({ type: "owner", content: tokenOwner });
                  } else if (scheme === "erc1155") {
                    const balance = BigNumber.from(yield this.provider.call({
                      to: addr,
                      data: hexConcat(["0x00fdd58e", hexZeroPad(owner, 32), tokenId])
                    }));
                    if (balance.isZero()) {
                      return null;
                    }
                    linkage.push({ type: "balance", content: balance.toString() });
                  }
                  const tx = {
                    to: this.provider.formatter.address(comps[0]),
                    data: hexConcat([selector, tokenId])
                  };
                  let metadataUrl = _parseString(yield this.provider.call(tx));
                  if (metadataUrl == null) {
                    return null;
                  }
                  linkage.push({ type: "metadata-url", content: metadataUrl });
                  if (scheme === "erc1155") {
                    metadataUrl = metadataUrl.replace("{id}", tokenId.substring(2));
                    linkage.push({ type: "metadata-url-expanded", content: metadataUrl });
                  }
                  const metadata = yield fetchJson(metadataUrl);
                  if (!metadata) {
                    return null;
                  }
                  linkage.push({ type: "metadata", content: JSON.stringify(metadata) });
                  let imageUrl = metadata.image;
                  if (typeof imageUrl !== "string") {
                    return null;
                  }
                  if (imageUrl.match(/^(https:\/\/|data:)/i)) {
                  } else {
                    const ipfs = imageUrl.match(matcherIpfs);
                    if (ipfs == null) {
                      return null;
                    }
                    linkage.push({ type: "url-ipfs", content: imageUrl });
                    imageUrl = getIpfsLink(imageUrl);
                  }
                  linkage.push({ type: "url", content: imageUrl });
                  return { linkage, url: imageUrl };
                }
              }
            }
          } catch (error) {
          }
          return null;
        });
      }
      getContentHash() {
        return __awaiter8(this, void 0, void 0, function* () {
          const hexBytes = yield this._fetchBytes("0xbc1c58d1");
          if (hexBytes == null || hexBytes === "0x") {
            return null;
          }
          const ipfs = hexBytes.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
          if (ipfs) {
            const length = parseInt(ipfs[3], 16);
            if (ipfs[4].length === length * 2) {
              return "ipfs://" + Base58.encode("0x" + ipfs[1]);
            }
          }
          const swarm = hexBytes.match(/^0xe40101fa011b20([0-9a-f]*)$/);
          if (swarm) {
            if (swarm[1].length === 32 * 2) {
              return "bzz://" + swarm[1];
            }
          }
          return logger19.throwError(`invalid or unsupported content hash data`, Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "getContentHash()",
            data: hexBytes
          });
        });
      }
      getText(key) {
        return __awaiter8(this, void 0, void 0, function* () {
          let keyBytes = toUtf8Bytes(key);
          keyBytes = concat([bytes32ify(64), bytes32ify(keyBytes.length), keyBytes]);
          if (keyBytes.length % 32 !== 0) {
            keyBytes = concat([keyBytes, hexZeroPad("0x", 32 - key.length % 32)]);
          }
          const hexBytes = yield this._fetchBytes("0x59d1d43c", hexlify(keyBytes));
          if (hexBytes == null || hexBytes === "0x") {
            return null;
          }
          return toUtf8String(hexBytes);
        });
      }
    };
    defaultFormatter = null;
    nextPollId = 1;
    BaseProvider = class extends Provider {
      constructor(network) {
        logger19.checkNew(new.target, Provider);
        super();
        this._events = [];
        this._emitted = { block: -2 };
        this.formatter = new.target.getFormatter();
        defineReadOnly(this, "anyNetwork", network === "any");
        if (this.anyNetwork) {
          network = this.detectNetwork();
        }
        if (network instanceof Promise) {
          this._networkPromise = network;
          network.catch((error) => {
          });
          this._ready().catch((error) => {
          });
        } else {
          const knownNetwork = getStatic(new.target, "getNetwork")(network);
          if (knownNetwork) {
            defineReadOnly(this, "_network", knownNetwork);
            this.emit("network", knownNetwork, null);
          } else {
            logger19.throwArgumentError("invalid network", "network", network);
          }
        }
        this._maxInternalBlockNumber = -1024;
        this._lastBlockNumber = -2;
        this._pollingInterval = 4e3;
        this._fastQueryDate = 0;
      }
      _ready() {
        return __awaiter8(this, void 0, void 0, function* () {
          if (this._network == null) {
            let network = null;
            if (this._networkPromise) {
              try {
                network = yield this._networkPromise;
              } catch (error) {
              }
            }
            if (network == null) {
              network = yield this.detectNetwork();
            }
            if (!network) {
              logger19.throwError("no network detected", Logger.errors.UNKNOWN_ERROR, {});
            }
            if (this._network == null) {
              if (this.anyNetwork) {
                this._network = network;
              } else {
                defineReadOnly(this, "_network", network);
              }
              this.emit("network", network, null);
            }
          }
          return this._network;
        });
      }
      get ready() {
        return poll(() => {
          return this._ready().then((network) => {
            return network;
          }, (error) => {
            if (error.code === Logger.errors.NETWORK_ERROR && error.event === "noNetwork") {
              return void 0;
            }
            throw error;
          });
        });
      }
      static getFormatter() {
        if (defaultFormatter == null) {
          defaultFormatter = new Formatter();
        }
        return defaultFormatter;
      }
      static getNetwork(network) {
        return getNetwork(network == null ? "homestead" : network);
      }
      _getInternalBlockNumber(maxAge) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this._ready();
          if (maxAge > 0) {
            while (this._internalBlockNumber) {
              const internalBlockNumber = this._internalBlockNumber;
              try {
                const result = yield internalBlockNumber;
                if (getTime() - result.respTime <= maxAge) {
                  return result.blockNumber;
                }
                break;
              } catch (error) {
                if (this._internalBlockNumber === internalBlockNumber) {
                  break;
                }
              }
            }
          }
          const reqTime = getTime();
          const checkInternalBlockNumber = resolveProperties({
            blockNumber: this.perform("getBlockNumber", {}),
            networkError: this.getNetwork().then((network) => null, (error) => error)
          }).then(({ blockNumber, networkError }) => {
            if (networkError) {
              if (this._internalBlockNumber === checkInternalBlockNumber) {
                this._internalBlockNumber = null;
              }
              throw networkError;
            }
            const respTime = getTime();
            blockNumber = BigNumber.from(blockNumber).toNumber();
            if (blockNumber < this._maxInternalBlockNumber) {
              blockNumber = this._maxInternalBlockNumber;
            }
            this._maxInternalBlockNumber = blockNumber;
            this._setFastBlockNumber(blockNumber);
            return { blockNumber, reqTime, respTime };
          });
          this._internalBlockNumber = checkInternalBlockNumber;
          checkInternalBlockNumber.catch((error) => {
            if (this._internalBlockNumber === checkInternalBlockNumber) {
              this._internalBlockNumber = null;
            }
          });
          return (yield checkInternalBlockNumber).blockNumber;
        });
      }
      poll() {
        return __awaiter8(this, void 0, void 0, function* () {
          const pollId = nextPollId++;
          const runners = [];
          let blockNumber = null;
          try {
            blockNumber = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2);
          } catch (error) {
            this.emit("error", error);
            return;
          }
          this._setFastBlockNumber(blockNumber);
          this.emit("poll", pollId, blockNumber);
          if (blockNumber === this._lastBlockNumber) {
            this.emit("didPoll", pollId);
            return;
          }
          if (this._emitted.block === -2) {
            this._emitted.block = blockNumber - 1;
          }
          if (Math.abs(this._emitted.block - blockNumber) > 1e3) {
            logger19.warn(`network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${blockNumber})`);
            this.emit("error", logger19.makeError("network block skew detected", Logger.errors.NETWORK_ERROR, {
              blockNumber,
              event: "blockSkew",
              previousBlockNumber: this._emitted.block
            }));
            this.emit("block", blockNumber);
          } else {
            for (let i = this._emitted.block + 1; i <= blockNumber; i++) {
              this.emit("block", i);
            }
          }
          if (this._emitted.block !== blockNumber) {
            this._emitted.block = blockNumber;
            Object.keys(this._emitted).forEach((key) => {
              if (key === "block") {
                return;
              }
              const eventBlockNumber = this._emitted[key];
              if (eventBlockNumber === "pending") {
                return;
              }
              if (blockNumber - eventBlockNumber > 12) {
                delete this._emitted[key];
              }
            });
          }
          if (this._lastBlockNumber === -2) {
            this._lastBlockNumber = blockNumber - 1;
          }
          this._events.forEach((event) => {
            switch (event.type) {
              case "tx": {
                const hash2 = event.hash;
                let runner = this.getTransactionReceipt(hash2).then((receipt) => {
                  if (!receipt || receipt.blockNumber == null) {
                    return null;
                  }
                  this._emitted["t:" + hash2] = receipt.blockNumber;
                  this.emit(hash2, receipt);
                  return null;
                }).catch((error) => {
                  this.emit("error", error);
                });
                runners.push(runner);
                break;
              }
              case "filter": {
                const filter = event.filter;
                filter.fromBlock = this._lastBlockNumber + 1;
                filter.toBlock = blockNumber;
                const runner = this.getLogs(filter).then((logs) => {
                  if (logs.length === 0) {
                    return;
                  }
                  logs.forEach((log4) => {
                    this._emitted["b:" + log4.blockHash] = log4.blockNumber;
                    this._emitted["t:" + log4.transactionHash] = log4.blockNumber;
                    this.emit(filter, log4);
                  });
                }).catch((error) => {
                  this.emit("error", error);
                });
                runners.push(runner);
                break;
              }
            }
          });
          this._lastBlockNumber = blockNumber;
          Promise.all(runners).then(() => {
            this.emit("didPoll", pollId);
          }).catch((error) => {
            this.emit("error", error);
          });
          return;
        });
      }
      resetEventsBlock(blockNumber) {
        this._lastBlockNumber = blockNumber - 1;
        if (this.polling) {
          this.poll();
        }
      }
      get network() {
        return this._network;
      }
      detectNetwork() {
        return __awaiter8(this, void 0, void 0, function* () {
          return logger19.throwError("provider does not support network detection", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "provider.detectNetwork"
          });
        });
      }
      getNetwork() {
        return __awaiter8(this, void 0, void 0, function* () {
          const network = yield this._ready();
          const currentNetwork = yield this.detectNetwork();
          if (network.chainId !== currentNetwork.chainId) {
            if (this.anyNetwork) {
              this._network = currentNetwork;
              this._lastBlockNumber = -2;
              this._fastBlockNumber = null;
              this._fastBlockNumberPromise = null;
              this._fastQueryDate = 0;
              this._emitted.block = -2;
              this._maxInternalBlockNumber = -1024;
              this._internalBlockNumber = null;
              this.emit("network", currentNetwork, network);
              yield stall(0);
              return this._network;
            }
            const error = logger19.makeError("underlying network changed", Logger.errors.NETWORK_ERROR, {
              event: "changed",
              network,
              detectedNetwork: currentNetwork
            });
            this.emit("error", error);
            throw error;
          }
          return network;
        });
      }
      get blockNumber() {
        this._getInternalBlockNumber(100 + this.pollingInterval / 2).then((blockNumber) => {
          this._setFastBlockNumber(blockNumber);
        }, (error) => {
        });
        return this._fastBlockNumber != null ? this._fastBlockNumber : -1;
      }
      get polling() {
        return this._poller != null;
      }
      set polling(value) {
        if (value && !this._poller) {
          this._poller = setInterval(() => {
            this.poll();
          }, this.pollingInterval);
          if (!this._bootstrapPoll) {
            this._bootstrapPoll = setTimeout(() => {
              this.poll();
              this._bootstrapPoll = setTimeout(() => {
                if (!this._poller) {
                  this.poll();
                }
                this._bootstrapPoll = null;
              }, this.pollingInterval);
            }, 0);
          }
        } else if (!value && this._poller) {
          clearInterval(this._poller);
          this._poller = null;
        }
      }
      get pollingInterval() {
        return this._pollingInterval;
      }
      set pollingInterval(value) {
        if (typeof value !== "number" || value <= 0 || parseInt(String(value)) != value) {
          throw new Error("invalid polling interval");
        }
        this._pollingInterval = value;
        if (this._poller) {
          clearInterval(this._poller);
          this._poller = setInterval(() => {
            this.poll();
          }, this._pollingInterval);
        }
      }
      _getFastBlockNumber() {
        const now2 = getTime();
        if (now2 - this._fastQueryDate > 2 * this._pollingInterval) {
          this._fastQueryDate = now2;
          this._fastBlockNumberPromise = this.getBlockNumber().then((blockNumber) => {
            if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
              this._fastBlockNumber = blockNumber;
            }
            return this._fastBlockNumber;
          });
        }
        return this._fastBlockNumberPromise;
      }
      _setFastBlockNumber(blockNumber) {
        if (this._fastBlockNumber != null && blockNumber < this._fastBlockNumber) {
          return;
        }
        this._fastQueryDate = getTime();
        if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
          this._fastBlockNumber = blockNumber;
          this._fastBlockNumberPromise = Promise.resolve(blockNumber);
        }
      }
      waitForTransaction(transactionHash, confirmations, timeout) {
        return __awaiter8(this, void 0, void 0, function* () {
          return this._waitForTransaction(transactionHash, confirmations == null ? 1 : confirmations, timeout || 0, null);
        });
      }
      _waitForTransaction(transactionHash, confirmations, timeout, replaceable) {
        return __awaiter8(this, void 0, void 0, function* () {
          const receipt = yield this.getTransactionReceipt(transactionHash);
          if ((receipt ? receipt.confirmations : 0) >= confirmations) {
            return receipt;
          }
          return new Promise((resolve, reject) => {
            const cancelFuncs = [];
            let done = false;
            const alreadyDone = function() {
              if (done) {
                return true;
              }
              done = true;
              cancelFuncs.forEach((func) => {
                func();
              });
              return false;
            };
            const minedHandler = (receipt2) => {
              if (receipt2.confirmations < confirmations) {
                return;
              }
              if (alreadyDone()) {
                return;
              }
              resolve(receipt2);
            };
            this.on(transactionHash, minedHandler);
            cancelFuncs.push(() => {
              this.removeListener(transactionHash, minedHandler);
            });
            if (replaceable) {
              let lastBlockNumber = replaceable.startBlock;
              let scannedBlock = null;
              const replaceHandler = (blockNumber) => __awaiter8(this, void 0, void 0, function* () {
                if (done) {
                  return;
                }
                yield stall(1e3);
                this.getTransactionCount(replaceable.from).then((nonce) => __awaiter8(this, void 0, void 0, function* () {
                  if (done) {
                    return;
                  }
                  if (nonce <= replaceable.nonce) {
                    lastBlockNumber = blockNumber;
                  } else {
                    {
                      const mined = yield this.getTransaction(transactionHash);
                      if (mined && mined.blockNumber != null) {
                        return;
                      }
                    }
                    if (scannedBlock == null) {
                      scannedBlock = lastBlockNumber - 3;
                      if (scannedBlock < replaceable.startBlock) {
                        scannedBlock = replaceable.startBlock;
                      }
                    }
                    while (scannedBlock <= blockNumber) {
                      if (done) {
                        return;
                      }
                      const block = yield this.getBlockWithTransactions(scannedBlock);
                      for (let ti = 0; ti < block.transactions.length; ti++) {
                        const tx = block.transactions[ti];
                        if (tx.hash === transactionHash) {
                          return;
                        }
                        if (tx.from === replaceable.from && tx.nonce === replaceable.nonce) {
                          if (done) {
                            return;
                          }
                          const receipt2 = yield this.waitForTransaction(tx.hash, confirmations);
                          if (alreadyDone()) {
                            return;
                          }
                          let reason = "replaced";
                          if (tx.data === replaceable.data && tx.to === replaceable.to && tx.value.eq(replaceable.value)) {
                            reason = "repriced";
                          } else if (tx.data === "0x" && tx.from === tx.to && tx.value.isZero()) {
                            reason = "cancelled";
                          }
                          reject(logger19.makeError("transaction was replaced", Logger.errors.TRANSACTION_REPLACED, {
                            cancelled: reason === "replaced" || reason === "cancelled",
                            reason,
                            replacement: this._wrapTransaction(tx),
                            hash: transactionHash,
                            receipt: receipt2
                          }));
                          return;
                        }
                      }
                      scannedBlock++;
                    }
                  }
                  if (done) {
                    return;
                  }
                  this.once("block", replaceHandler);
                }), (error) => {
                  if (done) {
                    return;
                  }
                  this.once("block", replaceHandler);
                });
              });
              if (done) {
                return;
              }
              this.once("block", replaceHandler);
              cancelFuncs.push(() => {
                this.removeListener("block", replaceHandler);
              });
            }
            if (typeof timeout === "number" && timeout > 0) {
              const timer2 = setTimeout(() => {
                if (alreadyDone()) {
                  return;
                }
                reject(logger19.makeError("timeout exceeded", Logger.errors.TIMEOUT, { timeout }));
              }, timeout);
              if (timer2.unref) {
                timer2.unref();
              }
              cancelFuncs.push(() => {
                clearTimeout(timer2);
              });
            }
          });
        });
      }
      getBlockNumber() {
        return __awaiter8(this, void 0, void 0, function* () {
          return this._getInternalBlockNumber(0);
        });
      }
      getGasPrice() {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          const result = yield this.perform("getGasPrice", {});
          try {
            return BigNumber.from(result);
          } catch (error) {
            return logger19.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
              method: "getGasPrice",
              result,
              error
            });
          }
        });
      }
      getBalance(addressOrName, blockTag) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          const params = yield resolveProperties({
            address: this._getAddress(addressOrName),
            blockTag: this._getBlockTag(blockTag)
          });
          const result = yield this.perform("getBalance", params);
          try {
            return BigNumber.from(result);
          } catch (error) {
            return logger19.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
              method: "getBalance",
              params,
              result,
              error
            });
          }
        });
      }
      getTransactionCount(addressOrName, blockTag) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          const params = yield resolveProperties({
            address: this._getAddress(addressOrName),
            blockTag: this._getBlockTag(blockTag)
          });
          const result = yield this.perform("getTransactionCount", params);
          try {
            return BigNumber.from(result).toNumber();
          } catch (error) {
            return logger19.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
              method: "getTransactionCount",
              params,
              result,
              error
            });
          }
        });
      }
      getCode(addressOrName, blockTag) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          const params = yield resolveProperties({
            address: this._getAddress(addressOrName),
            blockTag: this._getBlockTag(blockTag)
          });
          const result = yield this.perform("getCode", params);
          try {
            return hexlify(result);
          } catch (error) {
            return logger19.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
              method: "getCode",
              params,
              result,
              error
            });
          }
        });
      }
      getStorageAt(addressOrName, position, blockTag) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          const params = yield resolveProperties({
            address: this._getAddress(addressOrName),
            blockTag: this._getBlockTag(blockTag),
            position: Promise.resolve(position).then((p) => hexValue(p))
          });
          const result = yield this.perform("getStorageAt", params);
          try {
            return hexlify(result);
          } catch (error) {
            return logger19.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
              method: "getStorageAt",
              params,
              result,
              error
            });
          }
        });
      }
      _wrapTransaction(tx, hash2, startBlock) {
        if (hash2 != null && hexDataLength(hash2) !== 32) {
          throw new Error("invalid response - sendTransaction");
        }
        const result = tx;
        if (hash2 != null && tx.hash !== hash2) {
          logger19.throwError("Transaction hash mismatch from Provider.sendTransaction.", Logger.errors.UNKNOWN_ERROR, { expectedHash: tx.hash, returnedHash: hash2 });
        }
        result.wait = (confirms, timeout) => __awaiter8(this, void 0, void 0, function* () {
          if (confirms == null) {
            confirms = 1;
          }
          if (timeout == null) {
            timeout = 0;
          }
          let replacement = void 0;
          if (confirms !== 0 && startBlock != null) {
            replacement = {
              data: tx.data,
              from: tx.from,
              nonce: tx.nonce,
              to: tx.to,
              value: tx.value,
              startBlock
            };
          }
          const receipt = yield this._waitForTransaction(tx.hash, confirms, timeout, replacement);
          if (receipt == null && confirms === 0) {
            return null;
          }
          this._emitted["t:" + tx.hash] = receipt.blockNumber;
          if (receipt.status === 0) {
            logger19.throwError("transaction failed", Logger.errors.CALL_EXCEPTION, {
              transactionHash: tx.hash,
              transaction: tx,
              receipt
            });
          }
          return receipt;
        });
        return result;
      }
      sendTransaction(signedTransaction) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          const hexTx = yield Promise.resolve(signedTransaction).then((t) => hexlify(t));
          const tx = this.formatter.transaction(signedTransaction);
          if (tx.confirmations == null) {
            tx.confirmations = 0;
          }
          const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
          try {
            const hash2 = yield this.perform("sendTransaction", { signedTransaction: hexTx });
            return this._wrapTransaction(tx, hash2, blockNumber);
          } catch (error) {
            error.transaction = tx;
            error.transactionHash = tx.hash;
            throw error;
          }
        });
      }
      _getTransactionRequest(transaction) {
        return __awaiter8(this, void 0, void 0, function* () {
          const values = yield transaction;
          const tx = {};
          ["from", "to"].forEach((key) => {
            if (values[key] == null) {
              return;
            }
            tx[key] = Promise.resolve(values[key]).then((v) => v ? this._getAddress(v) : null);
          });
          ["gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "value"].forEach((key) => {
            if (values[key] == null) {
              return;
            }
            tx[key] = Promise.resolve(values[key]).then((v) => v ? BigNumber.from(v) : null);
          });
          ["type"].forEach((key) => {
            if (values[key] == null) {
              return;
            }
            tx[key] = Promise.resolve(values[key]).then((v) => v != null ? v : null);
          });
          if (values.accessList) {
            tx.accessList = this.formatter.accessList(values.accessList);
          }
          ["data"].forEach((key) => {
            if (values[key] == null) {
              return;
            }
            tx[key] = Promise.resolve(values[key]).then((v) => v ? hexlify(v) : null);
          });
          return this.formatter.transactionRequest(yield resolveProperties(tx));
        });
      }
      _getFilter(filter) {
        return __awaiter8(this, void 0, void 0, function* () {
          filter = yield filter;
          const result = {};
          if (filter.address != null) {
            result.address = this._getAddress(filter.address);
          }
          ["blockHash", "topics"].forEach((key) => {
            if (filter[key] == null) {
              return;
            }
            result[key] = filter[key];
          });
          ["fromBlock", "toBlock"].forEach((key) => {
            if (filter[key] == null) {
              return;
            }
            result[key] = this._getBlockTag(filter[key]);
          });
          return this.formatter.filter(yield resolveProperties(result));
        });
      }
      call(transaction, blockTag) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          const params = yield resolveProperties({
            transaction: this._getTransactionRequest(transaction),
            blockTag: this._getBlockTag(blockTag)
          });
          const result = yield this.perform("call", params);
          try {
            return hexlify(result);
          } catch (error) {
            return logger19.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
              method: "call",
              params,
              result,
              error
            });
          }
        });
      }
      estimateGas(transaction) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          const params = yield resolveProperties({
            transaction: this._getTransactionRequest(transaction)
          });
          const result = yield this.perform("estimateGas", params);
          try {
            return BigNumber.from(result);
          } catch (error) {
            return logger19.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
              method: "estimateGas",
              params,
              result,
              error
            });
          }
        });
      }
      _getAddress(addressOrName) {
        return __awaiter8(this, void 0, void 0, function* () {
          addressOrName = yield addressOrName;
          if (typeof addressOrName !== "string") {
            logger19.throwArgumentError("invalid address or ENS name", "name", addressOrName);
          }
          const address = yield this.resolveName(addressOrName);
          if (address == null) {
            logger19.throwError("ENS name not configured", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: `resolveName(${JSON.stringify(addressOrName)})`
            });
          }
          return address;
        });
      }
      _getBlock(blockHashOrBlockTag, includeTransactions) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          blockHashOrBlockTag = yield blockHashOrBlockTag;
          let blockNumber = -128;
          const params = {
            includeTransactions: !!includeTransactions
          };
          if (isHexString(blockHashOrBlockTag, 32)) {
            params.blockHash = blockHashOrBlockTag;
          } else {
            try {
              params.blockTag = yield this._getBlockTag(blockHashOrBlockTag);
              if (isHexString(params.blockTag)) {
                blockNumber = parseInt(params.blockTag.substring(2), 16);
              }
            } catch (error) {
              logger19.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", blockHashOrBlockTag);
            }
          }
          return poll(() => __awaiter8(this, void 0, void 0, function* () {
            const block = yield this.perform("getBlock", params);
            if (block == null) {
              if (params.blockHash != null) {
                if (this._emitted["b:" + params.blockHash] == null) {
                  return null;
                }
              }
              if (params.blockTag != null) {
                if (blockNumber > this._emitted.block) {
                  return null;
                }
              }
              return void 0;
            }
            if (includeTransactions) {
              let blockNumber2 = null;
              for (let i = 0; i < block.transactions.length; i++) {
                const tx = block.transactions[i];
                if (tx.blockNumber == null) {
                  tx.confirmations = 0;
                } else if (tx.confirmations == null) {
                  if (blockNumber2 == null) {
                    blockNumber2 = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                  }
                  let confirmations = blockNumber2 - tx.blockNumber + 1;
                  if (confirmations <= 0) {
                    confirmations = 1;
                  }
                  tx.confirmations = confirmations;
                }
              }
              const blockWithTxs = this.formatter.blockWithTransactions(block);
              blockWithTxs.transactions = blockWithTxs.transactions.map((tx) => this._wrapTransaction(tx));
              return blockWithTxs;
            }
            return this.formatter.block(block);
          }), { oncePoll: this });
        });
      }
      getBlock(blockHashOrBlockTag) {
        return this._getBlock(blockHashOrBlockTag, false);
      }
      getBlockWithTransactions(blockHashOrBlockTag) {
        return this._getBlock(blockHashOrBlockTag, true);
      }
      getTransaction(transactionHash) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          transactionHash = yield transactionHash;
          const params = { transactionHash: this.formatter.hash(transactionHash, true) };
          return poll(() => __awaiter8(this, void 0, void 0, function* () {
            const result = yield this.perform("getTransaction", params);
            if (result == null) {
              if (this._emitted["t:" + transactionHash] == null) {
                return null;
              }
              return void 0;
            }
            const tx = this.formatter.transactionResponse(result);
            if (tx.blockNumber == null) {
              tx.confirmations = 0;
            } else if (tx.confirmations == null) {
              const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
              let confirmations = blockNumber - tx.blockNumber + 1;
              if (confirmations <= 0) {
                confirmations = 1;
              }
              tx.confirmations = confirmations;
            }
            return this._wrapTransaction(tx);
          }), { oncePoll: this });
        });
      }
      getTransactionReceipt(transactionHash) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          transactionHash = yield transactionHash;
          const params = { transactionHash: this.formatter.hash(transactionHash, true) };
          return poll(() => __awaiter8(this, void 0, void 0, function* () {
            const result = yield this.perform("getTransactionReceipt", params);
            if (result == null) {
              if (this._emitted["t:" + transactionHash] == null) {
                return null;
              }
              return void 0;
            }
            if (result.blockHash == null) {
              return void 0;
            }
            const receipt = this.formatter.receipt(result);
            if (receipt.blockNumber == null) {
              receipt.confirmations = 0;
            } else if (receipt.confirmations == null) {
              const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
              let confirmations = blockNumber - receipt.blockNumber + 1;
              if (confirmations <= 0) {
                confirmations = 1;
              }
              receipt.confirmations = confirmations;
            }
            return receipt;
          }), { oncePoll: this });
        });
      }
      getLogs(filter) {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          const params = yield resolveProperties({ filter: this._getFilter(filter) });
          const logs = yield this.perform("getLogs", params);
          logs.forEach((log4) => {
            if (log4.removed == null) {
              log4.removed = false;
            }
          });
          return Formatter.arrayOf(this.formatter.filterLog.bind(this.formatter))(logs);
        });
      }
      getEtherPrice() {
        return __awaiter8(this, void 0, void 0, function* () {
          yield this.getNetwork();
          return this.perform("getEtherPrice", {});
        });
      }
      _getBlockTag(blockTag) {
        return __awaiter8(this, void 0, void 0, function* () {
          blockTag = yield blockTag;
          if (typeof blockTag === "number" && blockTag < 0) {
            if (blockTag % 1) {
              logger19.throwArgumentError("invalid BlockTag", "blockTag", blockTag);
            }
            let blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
            blockNumber += blockTag;
            if (blockNumber < 0) {
              blockNumber = 0;
            }
            return this.formatter.blockTag(blockNumber);
          }
          return this.formatter.blockTag(blockTag);
        });
      }
      getResolver(name2) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const address = yield this._getResolver(name2);
            if (address == null) {
              return null;
            }
            return new Resolver(this, address, name2);
          } catch (error) {
            if (error.code === Logger.errors.CALL_EXCEPTION) {
              return null;
            }
            throw error;
          }
        });
      }
      _getResolver(name2) {
        return __awaiter8(this, void 0, void 0, function* () {
          const network = yield this.getNetwork();
          if (!network.ensAddress) {
            logger19.throwError("network does not support ENS", Logger.errors.UNSUPPORTED_OPERATION, { operation: "ENS", network: network.name });
          }
          const transaction = {
            to: network.ensAddress,
            data: "0x0178b8bf" + namehash(name2).substring(2)
          };
          try {
            return this.formatter.callAddress(yield this.call(transaction));
          } catch (error) {
            if (error.code === Logger.errors.CALL_EXCEPTION) {
              return null;
            }
            throw error;
          }
        });
      }
      resolveName(name2) {
        return __awaiter8(this, void 0, void 0, function* () {
          name2 = yield name2;
          try {
            return Promise.resolve(this.formatter.address(name2));
          } catch (error) {
            if (isHexString(name2)) {
              throw error;
            }
          }
          if (typeof name2 !== "string") {
            logger19.throwArgumentError("invalid ENS name", "name", name2);
          }
          const resolver = yield this.getResolver(name2);
          if (!resolver) {
            return null;
          }
          return yield resolver.getAddress();
        });
      }
      lookupAddress(address) {
        return __awaiter8(this, void 0, void 0, function* () {
          address = yield address;
          address = this.formatter.address(address);
          const reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
          const resolverAddress = yield this._getResolver(reverseName);
          if (!resolverAddress) {
            return null;
          }
          let bytes = arrayify(yield this.call({
            to: resolverAddress,
            data: "0x691f3431" + namehash(reverseName).substring(2)
          }));
          if (bytes.length < 32 || !BigNumber.from(bytes.slice(0, 32)).eq(32)) {
            return null;
          }
          bytes = bytes.slice(32);
          if (bytes.length < 32) {
            return null;
          }
          const length = BigNumber.from(bytes.slice(0, 32)).toNumber();
          bytes = bytes.slice(32);
          if (length > bytes.length) {
            return null;
          }
          const name2 = toUtf8String(bytes.slice(0, length));
          const addr = yield this.resolveName(name2);
          if (addr != address) {
            return null;
          }
          return name2;
        });
      }
      getAvatar(nameOrAddress) {
        return __awaiter8(this, void 0, void 0, function* () {
          let resolver = null;
          if (isHexString(nameOrAddress)) {
            const address = this.formatter.address(nameOrAddress);
            const reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
            const resolverAddress = yield this._getResolver(reverseName);
            if (!resolverAddress) {
              return null;
            }
            resolver = new Resolver(this, resolverAddress, "_", address);
          } else {
            resolver = yield this.getResolver(nameOrAddress);
            if (!resolver) {
              return null;
            }
          }
          const avatar = yield resolver.getAvatar();
          if (avatar == null) {
            return null;
          }
          return avatar.url;
        });
      }
      perform(method, params) {
        return logger19.throwError(method + " not implemented", Logger.errors.NOT_IMPLEMENTED, { operation: method });
      }
      _startEvent(event) {
        this.polling = this._events.filter((e) => e.pollable()).length > 0;
      }
      _stopEvent(event) {
        this.polling = this._events.filter((e) => e.pollable()).length > 0;
      }
      _addEventListener(eventName, listener, once) {
        const event = new Event(getEventTag2(eventName), listener, once);
        this._events.push(event);
        this._startEvent(event);
        return this;
      }
      on(eventName, listener) {
        return this._addEventListener(eventName, listener, false);
      }
      once(eventName, listener) {
        return this._addEventListener(eventName, listener, true);
      }
      emit(eventName, ...args) {
        let result = false;
        let stopped = [];
        let eventTag = getEventTag2(eventName);
        this._events = this._events.filter((event) => {
          if (event.tag !== eventTag) {
            return true;
          }
          setTimeout(() => {
            event.listener.apply(this, args);
          }, 0);
          result = true;
          if (event.once) {
            stopped.push(event);
            return false;
          }
          return true;
        });
        stopped.forEach((event) => {
          this._stopEvent(event);
        });
        return result;
      }
      listenerCount(eventName) {
        if (!eventName) {
          return this._events.length;
        }
        let eventTag = getEventTag2(eventName);
        return this._events.filter((event) => {
          return event.tag === eventTag;
        }).length;
      }
      listeners(eventName) {
        if (eventName == null) {
          return this._events.map((event) => event.listener);
        }
        let eventTag = getEventTag2(eventName);
        return this._events.filter((event) => event.tag === eventTag).map((event) => event.listener);
      }
      off(eventName, listener) {
        if (listener == null) {
          return this.removeAllListeners(eventName);
        }
        const stopped = [];
        let found = false;
        let eventTag = getEventTag2(eventName);
        this._events = this._events.filter((event) => {
          if (event.tag !== eventTag || event.listener != listener) {
            return true;
          }
          if (found) {
            return true;
          }
          found = true;
          stopped.push(event);
          return false;
        });
        stopped.forEach((event) => {
          this._stopEvent(event);
        });
        return this;
      }
      removeAllListeners(eventName) {
        let stopped = [];
        if (eventName == null) {
          stopped = this._events;
          this._events = [];
        } else {
          const eventTag = getEventTag2(eventName);
          this._events = this._events.filter((event) => {
            if (event.tag !== eventTag) {
              return true;
            }
            stopped.push(event);
            return false;
          });
        }
        stopped.forEach((event) => {
          this._stopEvent(event);
        });
        return this;
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/json-rpc-provider.js
function checkError(method, error, params) {
  if (method === "call" && error.code === Logger.errors.SERVER_ERROR) {
    const e = error.error;
    if (e && e.message.match("reverted") && isHexString(e.data)) {
      return e.data;
    }
    logger20.throwError("missing revert data in call exception", Logger.errors.CALL_EXCEPTION, {
      error,
      data: "0x"
    });
  }
  let message = error.message;
  if (error.code === Logger.errors.SERVER_ERROR && error.error && typeof error.error.message === "string") {
    message = error.error.message;
  } else if (typeof error.body === "string") {
    message = error.body;
  } else if (typeof error.responseText === "string") {
    message = error.responseText;
  }
  message = (message || "").toLowerCase();
  const transaction = params.transaction || params.signedTransaction;
  if (message.match(/insufficient funds|base fee exceeds gas limit/)) {
    logger20.throwError("insufficient funds for intrinsic transaction cost", Logger.errors.INSUFFICIENT_FUNDS, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/nonce too low/)) {
    logger20.throwError("nonce has already been used", Logger.errors.NONCE_EXPIRED, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/replacement transaction underpriced/)) {
    logger20.throwError("replacement fee too low", Logger.errors.REPLACEMENT_UNDERPRICED, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/only replay-protected/)) {
    logger20.throwError("legacy pre-eip-155 transactions not supported", Logger.errors.UNSUPPORTED_OPERATION, {
      error,
      method,
      transaction
    });
  }
  if (errorGas.indexOf(method) >= 0 && message.match(/gas required exceeds allowance|always failing transaction|execution reverted/)) {
    logger20.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
      error,
      method,
      transaction
    });
  }
  throw error;
}
function timer(timeout) {
  return new Promise(function(resolve) {
    setTimeout(resolve, timeout);
  });
}
function getResult(payload) {
  if (payload.error) {
    const error = new Error(payload.error.message);
    error.code = payload.error.code;
    error.data = payload.error.data;
    throw error;
  }
  return payload.result;
}
function getLowerCase(value) {
  if (value) {
    return value.toLowerCase();
  }
  return value;
}
var __awaiter9, logger20, errorGas, _constructorGuard3, JsonRpcSigner, UncheckedJsonRpcSigner, allowedTransactionKeys3, JsonRpcProvider;
var init_json_rpc_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/json-rpc-provider.js"() {
    "use strict";
    init_react();
    init_lib15();
    init_lib3();
    init_lib2();
    init_lib10();
    init_lib4();
    init_lib9();
    init_lib12();
    init_lib27();
    init_lib();
    init_version13();
    init_base_provider();
    __awaiter9 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger20 = new Logger(version13);
    errorGas = ["call", "estimateGas"];
    _constructorGuard3 = {};
    JsonRpcSigner = class extends Signer {
      constructor(constructorGuard, provider, addressOrIndex) {
        logger20.checkNew(new.target, JsonRpcSigner);
        super();
        if (constructorGuard !== _constructorGuard3) {
          throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
        }
        defineReadOnly(this, "provider", provider);
        if (addressOrIndex == null) {
          addressOrIndex = 0;
        }
        if (typeof addressOrIndex === "string") {
          defineReadOnly(this, "_address", this.provider.formatter.address(addressOrIndex));
          defineReadOnly(this, "_index", null);
        } else if (typeof addressOrIndex === "number") {
          defineReadOnly(this, "_index", addressOrIndex);
          defineReadOnly(this, "_address", null);
        } else {
          logger20.throwArgumentError("invalid address or index", "addressOrIndex", addressOrIndex);
        }
      }
      connect(provider) {
        return logger20.throwError("cannot alter JSON-RPC Signer connection", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "connect"
        });
      }
      connectUnchecked() {
        return new UncheckedJsonRpcSigner(_constructorGuard3, this.provider, this._address || this._index);
      }
      getAddress() {
        if (this._address) {
          return Promise.resolve(this._address);
        }
        return this.provider.send("eth_accounts", []).then((accounts) => {
          if (accounts.length <= this._index) {
            logger20.throwError("unknown account #" + this._index, Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "getAddress"
            });
          }
          return this.provider.formatter.address(accounts[this._index]);
        });
      }
      sendUncheckedTransaction(transaction) {
        transaction = shallowCopy(transaction);
        const fromAddress = this.getAddress().then((address) => {
          if (address) {
            address = address.toLowerCase();
          }
          return address;
        });
        if (transaction.gasLimit == null) {
          const estimate = shallowCopy(transaction);
          estimate.from = fromAddress;
          transaction.gasLimit = this.provider.estimateGas(estimate);
        }
        if (transaction.to != null) {
          transaction.to = Promise.resolve(transaction.to).then((to) => __awaiter9(this, void 0, void 0, function* () {
            if (to == null) {
              return null;
            }
            const address = yield this.provider.resolveName(to);
            if (address == null) {
              logger20.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
            }
            return address;
          }));
        }
        return resolveProperties({
          tx: resolveProperties(transaction),
          sender: fromAddress
        }).then(({ tx, sender }) => {
          if (tx.from != null) {
            if (tx.from.toLowerCase() !== sender) {
              logger20.throwArgumentError("from address mismatch", "transaction", transaction);
            }
          } else {
            tx.from = sender;
          }
          const hexTx = this.provider.constructor.hexlifyTransaction(tx, { from: true });
          return this.provider.send("eth_sendTransaction", [hexTx]).then((hash2) => {
            return hash2;
          }, (error) => {
            return checkError("sendTransaction", error, hexTx);
          });
        });
      }
      signTransaction(transaction) {
        return logger20.throwError("signing transactions is unsupported", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "signTransaction"
        });
      }
      sendTransaction(transaction) {
        return __awaiter9(this, void 0, void 0, function* () {
          const blockNumber = yield this.provider._getInternalBlockNumber(100 + 2 * this.provider.pollingInterval);
          const hash2 = yield this.sendUncheckedTransaction(transaction);
          try {
            return yield poll(() => __awaiter9(this, void 0, void 0, function* () {
              const tx = yield this.provider.getTransaction(hash2);
              if (tx === null) {
                return void 0;
              }
              return this.provider._wrapTransaction(tx, hash2, blockNumber);
            }), { oncePoll: this.provider });
          } catch (error) {
            error.transactionHash = hash2;
            throw error;
          }
        });
      }
      signMessage(message) {
        return __awaiter9(this, void 0, void 0, function* () {
          const data = typeof message === "string" ? toUtf8Bytes(message) : message;
          const address = yield this.getAddress();
          return yield this.provider.send("personal_sign", [hexlify(data), address.toLowerCase()]);
        });
      }
      _legacySignMessage(message) {
        return __awaiter9(this, void 0, void 0, function* () {
          const data = typeof message === "string" ? toUtf8Bytes(message) : message;
          const address = yield this.getAddress();
          return yield this.provider.send("eth_sign", [address.toLowerCase(), hexlify(data)]);
        });
      }
      _signTypedData(domain, types, value) {
        return __awaiter9(this, void 0, void 0, function* () {
          const populated = yield TypedDataEncoder.resolveNames(domain, types, value, (name2) => {
            return this.provider.resolveName(name2);
          });
          const address = yield this.getAddress();
          return yield this.provider.send("eth_signTypedData_v4", [
            address.toLowerCase(),
            JSON.stringify(TypedDataEncoder.getPayload(populated.domain, types, populated.value))
          ]);
        });
      }
      unlock(password) {
        return __awaiter9(this, void 0, void 0, function* () {
          const provider = this.provider;
          const address = yield this.getAddress();
          return provider.send("personal_unlockAccount", [address.toLowerCase(), password, null]);
        });
      }
    };
    UncheckedJsonRpcSigner = class extends JsonRpcSigner {
      sendTransaction(transaction) {
        return this.sendUncheckedTransaction(transaction).then((hash2) => {
          return {
            hash: hash2,
            nonce: null,
            gasLimit: null,
            gasPrice: null,
            data: null,
            value: null,
            chainId: null,
            confirmations: 0,
            from: null,
            wait: (confirmations) => {
              return this.provider.waitForTransaction(hash2, confirmations);
            }
          };
        });
      }
    };
    allowedTransactionKeys3 = {
      chainId: true,
      data: true,
      gasLimit: true,
      gasPrice: true,
      nonce: true,
      to: true,
      value: true,
      type: true,
      accessList: true,
      maxFeePerGas: true,
      maxPriorityFeePerGas: true
    };
    JsonRpcProvider = class extends BaseProvider {
      constructor(url, network) {
        logger20.checkNew(new.target, JsonRpcProvider);
        let networkOrReady = network;
        if (networkOrReady == null) {
          networkOrReady = new Promise((resolve, reject) => {
            setTimeout(() => {
              this.detectNetwork().then((network2) => {
                resolve(network2);
              }, (error) => {
                reject(error);
              });
            }, 0);
          });
        }
        super(networkOrReady);
        if (!url) {
          url = getStatic(this.constructor, "defaultUrl")();
        }
        if (typeof url === "string") {
          defineReadOnly(this, "connection", Object.freeze({
            url
          }));
        } else {
          defineReadOnly(this, "connection", Object.freeze(shallowCopy(url)));
        }
        this._nextId = 42;
      }
      get _cache() {
        if (this._eventLoopCache == null) {
          this._eventLoopCache = {};
        }
        return this._eventLoopCache;
      }
      static defaultUrl() {
        return "http://localhost:8545";
      }
      detectNetwork() {
        if (!this._cache["detectNetwork"]) {
          this._cache["detectNetwork"] = this._uncachedDetectNetwork();
          setTimeout(() => {
            this._cache["detectNetwork"] = null;
          }, 0);
        }
        return this._cache["detectNetwork"];
      }
      _uncachedDetectNetwork() {
        return __awaiter9(this, void 0, void 0, function* () {
          yield timer(0);
          let chainId = null;
          try {
            chainId = yield this.send("eth_chainId", []);
          } catch (error) {
            try {
              chainId = yield this.send("net_version", []);
            } catch (error2) {
            }
          }
          if (chainId != null) {
            const getNetwork2 = getStatic(this.constructor, "getNetwork");
            try {
              return getNetwork2(BigNumber.from(chainId).toNumber());
            } catch (error) {
              return logger20.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
                chainId,
                event: "invalidNetwork",
                serverError: error
              });
            }
          }
          return logger20.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
            event: "noNetwork"
          });
        });
      }
      getSigner(addressOrIndex) {
        return new JsonRpcSigner(_constructorGuard3, this, addressOrIndex);
      }
      getUncheckedSigner(addressOrIndex) {
        return this.getSigner(addressOrIndex).connectUnchecked();
      }
      listAccounts() {
        return this.send("eth_accounts", []).then((accounts) => {
          return accounts.map((a) => this.formatter.address(a));
        });
      }
      send(method, params) {
        const request = {
          method,
          params,
          id: this._nextId++,
          jsonrpc: "2.0"
        };
        this.emit("debug", {
          action: "request",
          request: deepCopy(request),
          provider: this
        });
        const cache = ["eth_chainId", "eth_blockNumber"].indexOf(method) >= 0;
        if (cache && this._cache[method]) {
          return this._cache[method];
        }
        const result = fetchJson(this.connection, JSON.stringify(request), getResult).then((result2) => {
          this.emit("debug", {
            action: "response",
            request,
            response: result2,
            provider: this
          });
          return result2;
        }, (error) => {
          this.emit("debug", {
            action: "response",
            error,
            request,
            provider: this
          });
          throw error;
        });
        if (cache) {
          this._cache[method] = result;
          setTimeout(() => {
            this._cache[method] = null;
          }, 0);
        }
        return result;
      }
      prepareRequest(method, params) {
        switch (method) {
          case "getBlockNumber":
            return ["eth_blockNumber", []];
          case "getGasPrice":
            return ["eth_gasPrice", []];
          case "getBalance":
            return ["eth_getBalance", [getLowerCase(params.address), params.blockTag]];
          case "getTransactionCount":
            return ["eth_getTransactionCount", [getLowerCase(params.address), params.blockTag]];
          case "getCode":
            return ["eth_getCode", [getLowerCase(params.address), params.blockTag]];
          case "getStorageAt":
            return ["eth_getStorageAt", [getLowerCase(params.address), params.position, params.blockTag]];
          case "sendTransaction":
            return ["eth_sendRawTransaction", [params.signedTransaction]];
          case "getBlock":
            if (params.blockTag) {
              return ["eth_getBlockByNumber", [params.blockTag, !!params.includeTransactions]];
            } else if (params.blockHash) {
              return ["eth_getBlockByHash", [params.blockHash, !!params.includeTransactions]];
            }
            return null;
          case "getTransaction":
            return ["eth_getTransactionByHash", [params.transactionHash]];
          case "getTransactionReceipt":
            return ["eth_getTransactionReceipt", [params.transactionHash]];
          case "call": {
            const hexlifyTransaction = getStatic(this.constructor, "hexlifyTransaction");
            return ["eth_call", [hexlifyTransaction(params.transaction, { from: true }), params.blockTag]];
          }
          case "estimateGas": {
            const hexlifyTransaction = getStatic(this.constructor, "hexlifyTransaction");
            return ["eth_estimateGas", [hexlifyTransaction(params.transaction, { from: true })]];
          }
          case "getLogs":
            if (params.filter && params.filter.address != null) {
              params.filter.address = getLowerCase(params.filter.address);
            }
            return ["eth_getLogs", [params.filter]];
          default:
            break;
        }
        return null;
      }
      perform(method, params) {
        return __awaiter9(this, void 0, void 0, function* () {
          if (method === "call" || method === "estimateGas") {
            const tx = params.transaction;
            if (tx && tx.type != null && BigNumber.from(tx.type).isZero()) {
              if (tx.maxFeePerGas == null && tx.maxPriorityFeePerGas == null) {
                const feeData = yield this.getFeeData();
                if (feeData.maxFeePerGas == null && feeData.maxPriorityFeePerGas == null) {
                  params = shallowCopy(params);
                  params.transaction = shallowCopy(tx);
                  delete params.transaction.type;
                }
              }
            }
          }
          const args = this.prepareRequest(method, params);
          if (args == null) {
            logger20.throwError(method + " not implemented", Logger.errors.NOT_IMPLEMENTED, { operation: method });
          }
          try {
            return yield this.send(args[0], args[1]);
          } catch (error) {
            return checkError(method, error, params);
          }
        });
      }
      _startEvent(event) {
        if (event.tag === "pending") {
          this._startPending();
        }
        super._startEvent(event);
      }
      _startPending() {
        if (this._pendingFilter != null) {
          return;
        }
        const self2 = this;
        const pendingFilter = this.send("eth_newPendingTransactionFilter", []);
        this._pendingFilter = pendingFilter;
        pendingFilter.then(function(filterId) {
          function poll2() {
            self2.send("eth_getFilterChanges", [filterId]).then(function(hashes) {
              if (self2._pendingFilter != pendingFilter) {
                return null;
              }
              let seq = Promise.resolve();
              hashes.forEach(function(hash2) {
                self2._emitted["t:" + hash2.toLowerCase()] = "pending";
                seq = seq.then(function() {
                  return self2.getTransaction(hash2).then(function(tx) {
                    self2.emit("pending", tx);
                    return null;
                  });
                });
              });
              return seq.then(function() {
                return timer(1e3);
              });
            }).then(function() {
              if (self2._pendingFilter != pendingFilter) {
                self2.send("eth_uninstallFilter", [filterId]);
                return;
              }
              setTimeout(function() {
                poll2();
              }, 0);
              return null;
            }).catch((error) => {
            });
          }
          poll2();
          return filterId;
        }).catch((error) => {
        });
      }
      _stopEvent(event) {
        if (event.tag === "pending" && this.listenerCount("pending") === 0) {
          this._pendingFilter = null;
        }
        super._stopEvent(event);
      }
      static hexlifyTransaction(transaction, allowExtra) {
        const allowed = shallowCopy(allowedTransactionKeys3);
        if (allowExtra) {
          for (const key in allowExtra) {
            if (allowExtra[key]) {
              allowed[key] = true;
            }
          }
        }
        checkProperties(transaction, allowed);
        const result = {};
        ["gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach(function(key) {
          if (transaction[key] == null) {
            return;
          }
          const value = hexValue(transaction[key]);
          if (key === "gasLimit") {
            key = "gas";
          }
          result[key] = value;
        });
        ["from", "to", "data"].forEach(function(key) {
          if (transaction[key] == null) {
            return;
          }
          result[key] = hexlify(transaction[key]);
        });
        if (transaction.accessList) {
          result["accessList"] = accessListify(transaction.accessList);
        }
        return result;
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/ws.js
var WS;
var init_ws = __esm({
  "node_modules/@ethersproject/providers/lib.esm/ws.js"() {
    "use strict";
    init_react();
    init_lib();
    init_version13();
    WS = null;
    try {
      WS = WebSocket;
      if (WS == null) {
        throw new Error("inject please");
      }
    } catch (error) {
      const logger35 = new Logger(version13);
      WS = function() {
        logger35.throwError("WebSockets not supported in this environment", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "new WebSocket()"
        });
      };
    }
  }
});

// node_modules/@ethersproject/providers/lib.esm/websocket-provider.js
var __awaiter10, logger21, NextId, WebSocketProvider;
var init_websocket_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/websocket-provider.js"() {
    "use strict";
    init_react();
    init_lib3();
    init_lib4();
    init_json_rpc_provider();
    init_ws();
    init_lib();
    init_version13();
    __awaiter10 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger21 = new Logger(version13);
    NextId = 1;
    WebSocketProvider = class extends JsonRpcProvider {
      constructor(url, network) {
        if (network === "any") {
          logger21.throwError("WebSocketProvider does not support 'any' network yet", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "network:any"
          });
        }
        super(url, network);
        this._pollingInterval = -1;
        this._wsReady = false;
        defineReadOnly(this, "_websocket", new WS(this.connection.url));
        defineReadOnly(this, "_requests", {});
        defineReadOnly(this, "_subs", {});
        defineReadOnly(this, "_subIds", {});
        defineReadOnly(this, "_detectNetwork", super.detectNetwork());
        this._websocket.onopen = () => {
          this._wsReady = true;
          Object.keys(this._requests).forEach((id2) => {
            this._websocket.send(this._requests[id2].payload);
          });
        };
        this._websocket.onmessage = (messageEvent) => {
          const data = messageEvent.data;
          const result = JSON.parse(data);
          if (result.id != null) {
            const id2 = String(result.id);
            const request = this._requests[id2];
            delete this._requests[id2];
            if (result.result !== void 0) {
              request.callback(null, result.result);
              this.emit("debug", {
                action: "response",
                request: JSON.parse(request.payload),
                response: result.result,
                provider: this
              });
            } else {
              let error = null;
              if (result.error) {
                error = new Error(result.error.message || "unknown error");
                defineReadOnly(error, "code", result.error.code || null);
                defineReadOnly(error, "response", data);
              } else {
                error = new Error("unknown error");
              }
              request.callback(error, void 0);
              this.emit("debug", {
                action: "response",
                error,
                request: JSON.parse(request.payload),
                provider: this
              });
            }
          } else if (result.method === "eth_subscription") {
            const sub = this._subs[result.params.subscription];
            if (sub) {
              sub.processFunc(result.params.result);
            }
          } else {
            console.warn("this should not happen");
          }
        };
        const fauxPoll = setInterval(() => {
          this.emit("poll");
        }, 1e3);
        if (fauxPoll.unref) {
          fauxPoll.unref();
        }
      }
      detectNetwork() {
        return this._detectNetwork;
      }
      get pollingInterval() {
        return 0;
      }
      resetEventsBlock(blockNumber) {
        logger21.throwError("cannot reset events block on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "resetEventBlock"
        });
      }
      set pollingInterval(value) {
        logger21.throwError("cannot set polling interval on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "setPollingInterval"
        });
      }
      poll() {
        return __awaiter10(this, void 0, void 0, function* () {
          return null;
        });
      }
      set polling(value) {
        if (!value) {
          return;
        }
        logger21.throwError("cannot set polling on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "setPolling"
        });
      }
      send(method, params) {
        const rid = NextId++;
        return new Promise((resolve, reject) => {
          function callback(error, result) {
            if (error) {
              return reject(error);
            }
            return resolve(result);
          }
          const payload = JSON.stringify({
            method,
            params,
            id: rid,
            jsonrpc: "2.0"
          });
          this.emit("debug", {
            action: "request",
            request: JSON.parse(payload),
            provider: this
          });
          this._requests[String(rid)] = { callback, payload };
          if (this._wsReady) {
            this._websocket.send(payload);
          }
        });
      }
      static defaultUrl() {
        return "ws://localhost:8546";
      }
      _subscribe(tag, param, processFunc) {
        return __awaiter10(this, void 0, void 0, function* () {
          let subIdPromise = this._subIds[tag];
          if (subIdPromise == null) {
            subIdPromise = Promise.all(param).then((param2) => {
              return this.send("eth_subscribe", param2);
            });
            this._subIds[tag] = subIdPromise;
          }
          const subId = yield subIdPromise;
          this._subs[subId] = { tag, processFunc };
        });
      }
      _startEvent(event) {
        switch (event.type) {
          case "block":
            this._subscribe("block", ["newHeads"], (result) => {
              const blockNumber = BigNumber.from(result.number).toNumber();
              this._emitted.block = blockNumber;
              this.emit("block", blockNumber);
            });
            break;
          case "pending":
            this._subscribe("pending", ["newPendingTransactions"], (result) => {
              this.emit("pending", result);
            });
            break;
          case "filter":
            this._subscribe(event.tag, ["logs", this._getFilter(event.filter)], (result) => {
              if (result.removed == null) {
                result.removed = false;
              }
              this.emit(event.filter, this.formatter.filterLog(result));
            });
            break;
          case "tx": {
            const emitReceipt = (event2) => {
              const hash2 = event2.hash;
              this.getTransactionReceipt(hash2).then((receipt) => {
                if (!receipt) {
                  return;
                }
                this.emit(hash2, receipt);
              });
            };
            emitReceipt(event);
            this._subscribe("tx", ["newHeads"], (result) => {
              this._events.filter((e) => e.type === "tx").forEach(emitReceipt);
            });
            break;
          }
          case "debug":
          case "poll":
          case "willPoll":
          case "didPoll":
          case "error":
            break;
          default:
            console.log("unhandled:", event);
            break;
        }
      }
      _stopEvent(event) {
        let tag = event.tag;
        if (event.type === "tx") {
          if (this._events.filter((e) => e.type === "tx").length) {
            return;
          }
          tag = "tx";
        } else if (this.listenerCount(event.event)) {
          return;
        }
        const subId = this._subIds[tag];
        if (!subId) {
          return;
        }
        delete this._subIds[tag];
        subId.then((subId2) => {
          if (!this._subs[subId2]) {
            return;
          }
          delete this._subs[subId2];
          this.send("eth_unsubscribe", [subId2]);
        });
      }
      destroy() {
        return __awaiter10(this, void 0, void 0, function* () {
          if (this._websocket.readyState === WS.CONNECTING) {
            yield new Promise((resolve) => {
              this._websocket.onopen = function() {
                resolve(true);
              };
              this._websocket.onerror = function() {
                resolve(false);
              };
            });
          }
          this._websocket.close(1e3);
        });
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/url-json-rpc-provider.js
var __awaiter11, logger22, StaticJsonRpcProvider, UrlJsonRpcProvider;
var init_url_json_rpc_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/url-json-rpc-provider.js"() {
    "use strict";
    init_react();
    init_lib4();
    init_lib();
    init_version13();
    init_json_rpc_provider();
    __awaiter11 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger22 = new Logger(version13);
    StaticJsonRpcProvider = class extends JsonRpcProvider {
      detectNetwork() {
        const _super = Object.create(null, {
          detectNetwork: { get: () => super.detectNetwork }
        });
        return __awaiter11(this, void 0, void 0, function* () {
          let network = this.network;
          if (network == null) {
            network = yield _super.detectNetwork.call(this);
            if (!network) {
              logger22.throwError("no network detected", Logger.errors.UNKNOWN_ERROR, {});
            }
            if (this._network == null) {
              defineReadOnly(this, "_network", network);
              this.emit("network", network, null);
            }
          }
          return network;
        });
      }
    };
    UrlJsonRpcProvider = class extends StaticJsonRpcProvider {
      constructor(network, apiKey) {
        logger22.checkAbstract(new.target, UrlJsonRpcProvider);
        network = getStatic(new.target, "getNetwork")(network);
        apiKey = getStatic(new.target, "getApiKey")(apiKey);
        const connection = getStatic(new.target, "getUrl")(network, apiKey);
        super(connection, network);
        if (typeof apiKey === "string") {
          defineReadOnly(this, "apiKey", apiKey);
        } else if (apiKey != null) {
          Object.keys(apiKey).forEach((key) => {
            defineReadOnly(this, key, apiKey[key]);
          });
        }
      }
      _startPending() {
        logger22.warn("WARNING: API provider does not support pending filters");
      }
      isCommunityResource() {
        return false;
      }
      getSigner(address) {
        return logger22.throwError("API provider does not support signing", Logger.errors.UNSUPPORTED_OPERATION, { operation: "getSigner" });
      }
      listAccounts() {
        return Promise.resolve([]);
      }
      static getApiKey(apiKey) {
        return apiKey;
      }
      static getUrl(network, apiKey) {
        return logger22.throwError("not implemented; sub-classes must override getUrl", Logger.errors.NOT_IMPLEMENTED, {
          operation: "getUrl"
        });
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/alchemy-provider.js
var logger23, defaultApiKey, AlchemyWebSocketProvider, AlchemyProvider;
var init_alchemy_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/alchemy-provider.js"() {
    "use strict";
    init_react();
    init_lib4();
    init_formatter();
    init_websocket_provider();
    init_lib();
    init_version13();
    init_url_json_rpc_provider();
    logger23 = new Logger(version13);
    defaultApiKey = "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC";
    AlchemyWebSocketProvider = class extends WebSocketProvider {
      constructor(network, apiKey) {
        const provider = new AlchemyProvider(network, apiKey);
        const url = provider.connection.url.replace(/^http/i, "ws").replace(".alchemyapi.", ".ws.alchemyapi.");
        super(url, provider.network);
        defineReadOnly(this, "apiKey", provider.apiKey);
      }
      isCommunityResource() {
        return this.apiKey === defaultApiKey;
      }
    };
    AlchemyProvider = class extends UrlJsonRpcProvider {
      static getWebSocketProvider(network, apiKey) {
        return new AlchemyWebSocketProvider(network, apiKey);
      }
      static getApiKey(apiKey) {
        if (apiKey == null) {
          return defaultApiKey;
        }
        if (apiKey && typeof apiKey !== "string") {
          logger23.throwArgumentError("invalid apiKey", "apiKey", apiKey);
        }
        return apiKey;
      }
      static getUrl(network, apiKey) {
        let host = null;
        switch (network.name) {
          case "homestead":
            host = "eth-mainnet.alchemyapi.io/v2/";
            break;
          case "ropsten":
            host = "eth-ropsten.alchemyapi.io/v2/";
            break;
          case "rinkeby":
            host = "eth-rinkeby.alchemyapi.io/v2/";
            break;
          case "goerli":
            host = "eth-goerli.alchemyapi.io/v2/";
            break;
          case "kovan":
            host = "eth-kovan.alchemyapi.io/v2/";
            break;
          case "matic":
            host = "polygon-mainnet.g.alchemy.com/v2/";
            break;
          case "maticmum":
            host = "polygon-mumbai.g.alchemy.com/v2/";
            break;
          case "arbitrum":
            host = "arb-mainnet.g.alchemy.com/v2/";
            break;
          case "arbitrum-rinkeby":
            host = "arb-rinkeby.g.alchemy.com/v2/";
            break;
          case "optimism":
            host = "opt-mainnet.g.alchemy.com/v2/";
            break;
          case "optimism-kovan":
            host = "opt-kovan.g.alchemy.com/v2/";
            break;
          default:
            logger23.throwArgumentError("unsupported network", "network", arguments[0]);
        }
        return {
          allowGzip: true,
          url: "https://" + host + apiKey,
          throttleCallback: (attempt, url) => {
            if (apiKey === defaultApiKey) {
              showThrottleMessage();
            }
            return Promise.resolve(true);
          }
        };
      }
      isCommunityResource() {
        return this.apiKey === defaultApiKey;
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/cloudflare-provider.js
var __awaiter12, logger24, CloudflareProvider;
var init_cloudflare_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/cloudflare-provider.js"() {
    "use strict";
    init_react();
    init_url_json_rpc_provider();
    init_lib();
    init_version13();
    __awaiter12 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger24 = new Logger(version13);
    CloudflareProvider = class extends UrlJsonRpcProvider {
      static getApiKey(apiKey) {
        if (apiKey != null) {
          logger24.throwArgumentError("apiKey not supported for cloudflare", "apiKey", apiKey);
        }
        return null;
      }
      static getUrl(network, apiKey) {
        let host = null;
        switch (network.name) {
          case "homestead":
            host = "https://cloudflare-eth.com/";
            break;
          default:
            logger24.throwArgumentError("unsupported network", "network", arguments[0]);
        }
        return host;
      }
      perform(method, params) {
        const _super = Object.create(null, {
          perform: { get: () => super.perform }
        });
        return __awaiter12(this, void 0, void 0, function* () {
          if (method === "getBlockNumber") {
            const block = yield _super.perform.call(this, "getBlock", { blockTag: "latest" });
            return block.number;
          }
          return _super.perform.call(this, method, params);
        });
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/etherscan-provider.js
function getTransactionPostData(transaction) {
  const result = {};
  for (let key in transaction) {
    if (transaction[key] == null) {
      continue;
    }
    let value = transaction[key];
    if (key === "type" && value === 0) {
      continue;
    }
    if ({ type: true, gasLimit: true, gasPrice: true, maxFeePerGs: true, maxPriorityFeePerGas: true, nonce: true, value: true }[key]) {
      value = hexValue(hexlify(value));
    } else if (key === "accessList") {
      value = "[" + accessListify(value).map((set) => {
        return `{address:"${set.address}",storageKeys:["${set.storageKeys.join('","')}"]}`;
      }).join(",") + "]";
    } else {
      value = hexlify(value);
    }
    result[key] = value;
  }
  return result;
}
function getResult2(result) {
  if (result.status == 0 && (result.message === "No records found" || result.message === "No transactions found")) {
    return result.result;
  }
  if (result.status != 1 || result.message != "OK") {
    const error = new Error("invalid response");
    error.result = JSON.stringify(result);
    if ((result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
      error.throttleRetry = true;
    }
    throw error;
  }
  return result.result;
}
function getJsonResult(result) {
  if (result && result.status == 0 && result.message == "NOTOK" && (result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
    const error = new Error("throttled response");
    error.result = JSON.stringify(result);
    error.throttleRetry = true;
    throw error;
  }
  if (result.jsonrpc != "2.0") {
    const error = new Error("invalid response");
    error.result = JSON.stringify(result);
    throw error;
  }
  if (result.error) {
    const error = new Error(result.error.message || "unknown error");
    if (result.error.code) {
      error.code = result.error.code;
    }
    if (result.error.data) {
      error.data = result.error.data;
    }
    throw error;
  }
  return result.result;
}
function checkLogTag(blockTag) {
  if (blockTag === "pending") {
    throw new Error("pending not supported");
  }
  if (blockTag === "latest") {
    return blockTag;
  }
  return parseInt(blockTag.substring(2), 16);
}
function checkError2(method, error, transaction) {
  if (method === "call" && error.code === Logger.errors.SERVER_ERROR) {
    const e = error.error;
    if (e && (e.message.match(/reverted/i) || e.message.match(/VM execution error/i))) {
      let data = e.data;
      if (data) {
        data = "0x" + data.replace(/^.*0x/i, "");
      }
      if (isHexString(data)) {
        return data;
      }
      logger25.throwError("missing revert data in call exception", Logger.errors.CALL_EXCEPTION, {
        error,
        data: "0x"
      });
    }
  }
  let message = error.message;
  if (error.code === Logger.errors.SERVER_ERROR) {
    if (error.error && typeof error.error.message === "string") {
      message = error.error.message;
    } else if (typeof error.body === "string") {
      message = error.body;
    } else if (typeof error.responseText === "string") {
      message = error.responseText;
    }
  }
  message = (message || "").toLowerCase();
  if (message.match(/insufficient funds/)) {
    logger25.throwError("insufficient funds for intrinsic transaction cost", Logger.errors.INSUFFICIENT_FUNDS, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/same hash was already imported|transaction nonce is too low|nonce too low/)) {
    logger25.throwError("nonce has already been used", Logger.errors.NONCE_EXPIRED, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/another transaction with same nonce/)) {
    logger25.throwError("replacement fee too low", Logger.errors.REPLACEMENT_UNDERPRICED, {
      error,
      method,
      transaction
    });
  }
  if (message.match(/execution failed due to an exception|execution reverted/)) {
    logger25.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
      error,
      method,
      transaction
    });
  }
  throw error;
}
var __awaiter13, logger25, defaultApiKey2, EtherscanProvider;
var init_etherscan_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/etherscan-provider.js"() {
    "use strict";
    init_react();
    init_lib2();
    init_lib4();
    init_lib12();
    init_lib27();
    init_formatter();
    init_lib();
    init_version13();
    init_base_provider();
    __awaiter13 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger25 = new Logger(version13);
    defaultApiKey2 = "9D13ZE7XSBTJ94N9BNJ2MA33VMAY2YPIRB";
    EtherscanProvider = class extends BaseProvider {
      constructor(network, apiKey) {
        logger25.checkNew(new.target, EtherscanProvider);
        super(network);
        defineReadOnly(this, "baseUrl", this.getBaseUrl());
        defineReadOnly(this, "apiKey", apiKey || defaultApiKey2);
      }
      getBaseUrl() {
        switch (this.network ? this.network.name : "invalid") {
          case "homestead":
            return "https://api.etherscan.io";
          case "ropsten":
            return "https://api-ropsten.etherscan.io";
          case "rinkeby":
            return "https://api-rinkeby.etherscan.io";
          case "kovan":
            return "https://api-kovan.etherscan.io";
          case "goerli":
            return "https://api-goerli.etherscan.io";
          default:
        }
        return logger25.throwArgumentError("unsupported network", "network", name);
      }
      getUrl(module, params) {
        const query = Object.keys(params).reduce((accum, key) => {
          const value = params[key];
          if (value != null) {
            accum += `&${key}=${value}`;
          }
          return accum;
        }, "");
        const apiKey = this.apiKey ? `&apikey=${this.apiKey}` : "";
        return `${this.baseUrl}/api?module=${module}${query}${apiKey}`;
      }
      getPostUrl() {
        return `${this.baseUrl}/api`;
      }
      getPostData(module, params) {
        params.module = module;
        params.apikey = this.apiKey;
        return params;
      }
      fetch(module, params, post) {
        return __awaiter13(this, void 0, void 0, function* () {
          const url = post ? this.getPostUrl() : this.getUrl(module, params);
          const payload = post ? this.getPostData(module, params) : null;
          const procFunc = module === "proxy" ? getJsonResult : getResult2;
          this.emit("debug", {
            action: "request",
            request: url,
            provider: this
          });
          const connection = {
            url,
            throttleSlotInterval: 1e3,
            throttleCallback: (attempt, url2) => {
              if (this.isCommunityResource()) {
                showThrottleMessage();
              }
              return Promise.resolve(true);
            }
          };
          let payloadStr = null;
          if (payload) {
            connection.headers = { "content-type": "application/x-www-form-urlencoded; charset=UTF-8" };
            payloadStr = Object.keys(payload).map((key) => {
              return `${key}=${payload[key]}`;
            }).join("&");
          }
          const result = yield fetchJson(connection, payloadStr, procFunc || getJsonResult);
          this.emit("debug", {
            action: "response",
            request: url,
            response: deepCopy(result),
            provider: this
          });
          return result;
        });
      }
      detectNetwork() {
        return __awaiter13(this, void 0, void 0, function* () {
          return this.network;
        });
      }
      perform(method, params) {
        const _super = Object.create(null, {
          perform: { get: () => super.perform }
        });
        return __awaiter13(this, void 0, void 0, function* () {
          switch (method) {
            case "getBlockNumber":
              return this.fetch("proxy", { action: "eth_blockNumber" });
            case "getGasPrice":
              return this.fetch("proxy", { action: "eth_gasPrice" });
            case "getBalance":
              return this.fetch("account", {
                action: "balance",
                address: params.address,
                tag: params.blockTag
              });
            case "getTransactionCount":
              return this.fetch("proxy", {
                action: "eth_getTransactionCount",
                address: params.address,
                tag: params.blockTag
              });
            case "getCode":
              return this.fetch("proxy", {
                action: "eth_getCode",
                address: params.address,
                tag: params.blockTag
              });
            case "getStorageAt":
              return this.fetch("proxy", {
                action: "eth_getStorageAt",
                address: params.address,
                position: params.position,
                tag: params.blockTag
              });
            case "sendTransaction":
              return this.fetch("proxy", {
                action: "eth_sendRawTransaction",
                hex: params.signedTransaction
              }, true).catch((error) => {
                return checkError2("sendTransaction", error, params.signedTransaction);
              });
            case "getBlock":
              if (params.blockTag) {
                return this.fetch("proxy", {
                  action: "eth_getBlockByNumber",
                  tag: params.blockTag,
                  boolean: params.includeTransactions ? "true" : "false"
                });
              }
              throw new Error("getBlock by blockHash not implemented");
            case "getTransaction":
              return this.fetch("proxy", {
                action: "eth_getTransactionByHash",
                txhash: params.transactionHash
              });
            case "getTransactionReceipt":
              return this.fetch("proxy", {
                action: "eth_getTransactionReceipt",
                txhash: params.transactionHash
              });
            case "call": {
              if (params.blockTag !== "latest") {
                throw new Error("EtherscanProvider does not support blockTag for call");
              }
              const postData = getTransactionPostData(params.transaction);
              postData.module = "proxy";
              postData.action = "eth_call";
              try {
                return yield this.fetch("proxy", postData, true);
              } catch (error) {
                return checkError2("call", error, params.transaction);
              }
            }
            case "estimateGas": {
              const postData = getTransactionPostData(params.transaction);
              postData.module = "proxy";
              postData.action = "eth_estimateGas";
              try {
                return yield this.fetch("proxy", postData, true);
              } catch (error) {
                return checkError2("estimateGas", error, params.transaction);
              }
            }
            case "getLogs": {
              const args = { action: "getLogs" };
              if (params.filter.fromBlock) {
                args.fromBlock = checkLogTag(params.filter.fromBlock);
              }
              if (params.filter.toBlock) {
                args.toBlock = checkLogTag(params.filter.toBlock);
              }
              if (params.filter.address) {
                args.address = params.filter.address;
              }
              if (params.filter.topics && params.filter.topics.length > 0) {
                if (params.filter.topics.length > 1) {
                  logger25.throwError("unsupported topic count", Logger.errors.UNSUPPORTED_OPERATION, { topics: params.filter.topics });
                }
                if (params.filter.topics.length === 1) {
                  const topic0 = params.filter.topics[0];
                  if (typeof topic0 !== "string" || topic0.length !== 66) {
                    logger25.throwError("unsupported topic format", Logger.errors.UNSUPPORTED_OPERATION, { topic0 });
                  }
                  args.topic0 = topic0;
                }
              }
              const logs = yield this.fetch("logs", args);
              let blocks = {};
              for (let i = 0; i < logs.length; i++) {
                const log4 = logs[i];
                if (log4.blockHash != null) {
                  continue;
                }
                if (blocks[log4.blockNumber] == null) {
                  const block = yield this.getBlock(log4.blockNumber);
                  if (block) {
                    blocks[log4.blockNumber] = block.hash;
                  }
                }
                log4.blockHash = blocks[log4.blockNumber];
              }
              return logs;
            }
            case "getEtherPrice":
              if (this.network.name !== "homestead") {
                return 0;
              }
              return parseFloat((yield this.fetch("stats", { action: "ethprice" })).ethusd);
            default:
              break;
          }
          return _super.perform.call(this, method, params);
        });
      }
      getHistory(addressOrName, startBlock, endBlock) {
        return __awaiter13(this, void 0, void 0, function* () {
          const params = {
            action: "txlist",
            address: yield this.resolveName(addressOrName),
            startblock: startBlock == null ? 0 : startBlock,
            endblock: endBlock == null ? 99999999 : endBlock,
            sort: "asc"
          };
          const result = yield this.fetch("account", params);
          return result.map((tx) => {
            ["contractAddress", "to"].forEach(function(key) {
              if (tx[key] == "") {
                delete tx[key];
              }
            });
            if (tx.creates == null && tx.contractAddress != null) {
              tx.creates = tx.contractAddress;
            }
            const item = this.formatter.transactionResponse(tx);
            if (tx.timeStamp) {
              item.timestamp = parseInt(tx.timeStamp);
            }
            return item;
          });
        });
      }
      isCommunityResource() {
        return this.apiKey === defaultApiKey2;
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/fallback-provider.js
function now() {
  return new Date().getTime();
}
function checkNetworks(networks2) {
  let result = null;
  for (let i = 0; i < networks2.length; i++) {
    const network = networks2[i];
    if (network == null) {
      return null;
    }
    if (result) {
      if (!(result.name === network.name && result.chainId === network.chainId && (result.ensAddress === network.ensAddress || result.ensAddress == null && network.ensAddress == null))) {
        logger26.throwArgumentError("provider mismatch", "networks", networks2);
      }
    } else {
      result = network;
    }
  }
  return result;
}
function median(values, maxDelta) {
  values = values.slice().sort();
  const middle = Math.floor(values.length / 2);
  if (values.length % 2) {
    return values[middle];
  }
  const a = values[middle - 1], b = values[middle];
  if (maxDelta != null && Math.abs(a - b) > maxDelta) {
    return null;
  }
  return (a + b) / 2;
}
function serialize2(value) {
  if (value === null) {
    return "null";
  } else if (typeof value === "number" || typeof value === "boolean") {
    return JSON.stringify(value);
  } else if (typeof value === "string") {
    return value;
  } else if (BigNumber.isBigNumber(value)) {
    return value.toString();
  } else if (Array.isArray(value)) {
    return JSON.stringify(value.map((i) => serialize2(i)));
  } else if (typeof value === "object") {
    const keys = Object.keys(value);
    keys.sort();
    return "{" + keys.map((key) => {
      let v = value[key];
      if (typeof v === "function") {
        v = "[function]";
      } else {
        v = serialize2(v);
      }
      return JSON.stringify(key) + ":" + v;
    }).join(",") + "}";
  }
  throw new Error("unknown value type: " + typeof value);
}
function stall2(duration) {
  let cancel = null;
  let timer2 = null;
  let promise = new Promise((resolve) => {
    cancel = function() {
      if (timer2) {
        clearTimeout(timer2);
        timer2 = null;
      }
      resolve();
    };
    timer2 = setTimeout(cancel, duration);
  });
  const wait = (func) => {
    promise = promise.then(func);
    return promise;
  };
  function getPromise() {
    return promise;
  }
  return { cancel, getPromise, wait };
}
function exposeDebugConfig(config, now2) {
  const result = {
    weight: config.weight
  };
  Object.defineProperty(result, "provider", { get: () => config.provider });
  if (config.start) {
    result.start = config.start;
  }
  if (now2) {
    result.duration = now2 - config.start;
  }
  if (config.done) {
    if (config.error) {
      result.error = config.error;
    } else {
      result.result = config.result || null;
    }
  }
  return result;
}
function normalizedTally(normalize, quorum) {
  return function(configs) {
    const tally = {};
    configs.forEach((c) => {
      const value = normalize(c.result);
      if (!tally[value]) {
        tally[value] = { count: 0, result: c.result };
      }
      tally[value].count++;
    });
    const keys = Object.keys(tally);
    for (let i = 0; i < keys.length; i++) {
      const check = tally[keys[i]];
      if (check.count >= quorum) {
        return check.result;
      }
    }
    return void 0;
  };
}
function getProcessFunc(provider, method, params) {
  let normalize = serialize2;
  switch (method) {
    case "getBlockNumber":
      return function(configs) {
        const values = configs.map((c) => c.result);
        let blockNumber = median(configs.map((c) => c.result), 2);
        if (blockNumber == null) {
          return void 0;
        }
        blockNumber = Math.ceil(blockNumber);
        if (values.indexOf(blockNumber + 1) >= 0) {
          blockNumber++;
        }
        if (blockNumber >= provider._highestBlockNumber) {
          provider._highestBlockNumber = blockNumber;
        }
        return provider._highestBlockNumber;
      };
    case "getGasPrice":
      return function(configs) {
        const values = configs.map((c) => c.result);
        values.sort();
        return values[Math.floor(values.length / 2)];
      };
    case "getEtherPrice":
      return function(configs) {
        return median(configs.map((c) => c.result));
      };
    case "getBalance":
    case "getTransactionCount":
    case "getCode":
    case "getStorageAt":
    case "call":
    case "estimateGas":
    case "getLogs":
      break;
    case "getTransaction":
    case "getTransactionReceipt":
      normalize = function(tx) {
        if (tx == null) {
          return null;
        }
        tx = shallowCopy(tx);
        tx.confirmations = -1;
        return serialize2(tx);
      };
      break;
    case "getBlock":
      if (params.includeTransactions) {
        normalize = function(block) {
          if (block == null) {
            return null;
          }
          block = shallowCopy(block);
          block.transactions = block.transactions.map((tx) => {
            tx = shallowCopy(tx);
            tx.confirmations = -1;
            return tx;
          });
          return serialize2(block);
        };
      } else {
        normalize = function(block) {
          if (block == null) {
            return null;
          }
          return serialize2(block);
        };
      }
      break;
    default:
      throw new Error("unknown method: " + method);
  }
  return normalizedTally(normalize, provider.quorum);
}
function waitForSync(config, blockNumber) {
  return __awaiter14(this, void 0, void 0, function* () {
    const provider = config.provider;
    if (provider.blockNumber != null && provider.blockNumber >= blockNumber || blockNumber === -1) {
      return provider;
    }
    return poll(() => {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          if (provider.blockNumber >= blockNumber) {
            return resolve(provider);
          }
          if (config.cancelled) {
            return resolve(null);
          }
          return resolve(void 0);
        }, 0);
      });
    }, { oncePoll: provider });
  });
}
function getRunner(config, currentBlockNumber, method, params) {
  return __awaiter14(this, void 0, void 0, function* () {
    let provider = config.provider;
    switch (method) {
      case "getBlockNumber":
      case "getGasPrice":
        return provider[method]();
      case "getEtherPrice":
        if (provider.getEtherPrice) {
          return provider.getEtherPrice();
        }
        break;
      case "getBalance":
      case "getTransactionCount":
      case "getCode":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider[method](params.address, params.blockTag || "latest");
      case "getStorageAt":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider.getStorageAt(params.address, params.position, params.blockTag || "latest");
      case "getBlock":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider[params.includeTransactions ? "getBlockWithTransactions" : "getBlock"](params.blockTag || params.blockHash);
      case "call":
      case "estimateGas":
        if (params.blockTag && isHexString(params.blockTag)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider[method](params.transaction);
      case "getTransaction":
      case "getTransactionReceipt":
        return provider[method](params.transactionHash);
      case "getLogs": {
        let filter = params.filter;
        if (filter.fromBlock && isHexString(filter.fromBlock) || filter.toBlock && isHexString(filter.toBlock)) {
          provider = yield waitForSync(config, currentBlockNumber);
        }
        return provider.getLogs(filter);
      }
    }
    return logger26.throwError("unknown method error", Logger.errors.UNKNOWN_ERROR, {
      method,
      params
    });
  });
}
var __awaiter14, logger26, nextRid, ForwardErrors, ForwardProperties, FallbackProvider;
var init_fallback_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/fallback-provider.js"() {
    "use strict";
    init_react();
    init_lib14();
    init_lib3();
    init_lib2();
    init_lib4();
    init_lib22();
    init_lib27();
    init_base_provider();
    init_formatter();
    init_lib();
    init_version13();
    __awaiter14 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
    };
    logger26 = new Logger(version13);
    nextRid = 1;
    ForwardErrors = [
      Logger.errors.CALL_EXCEPTION,
      Logger.errors.INSUFFICIENT_FUNDS,
      Logger.errors.NONCE_EXPIRED,
      Logger.errors.REPLACEMENT_UNDERPRICED,
      Logger.errors.UNPREDICTABLE_GAS_LIMIT
    ];
    ForwardProperties = [
      "address",
      "args",
      "errorArgs",
      "errorSignature",
      "method",
      "transaction"
    ];
    FallbackProvider = class extends BaseProvider {
      constructor(providers, quorum) {
        logger26.checkNew(new.target, FallbackProvider);
        if (providers.length === 0) {
          logger26.throwArgumentError("missing providers", "providers", providers);
        }
        const providerConfigs = providers.map((configOrProvider, index) => {
          if (Provider.isProvider(configOrProvider)) {
            const stallTimeout = isCommunityResource(configOrProvider) ? 2e3 : 750;
            const priority = 1;
            return Object.freeze({ provider: configOrProvider, weight: 1, stallTimeout, priority });
          }
          const config = shallowCopy(configOrProvider);
          if (config.priority == null) {
            config.priority = 1;
          }
          if (config.stallTimeout == null) {
            config.stallTimeout = isCommunityResource(configOrProvider) ? 2e3 : 750;
          }
          if (config.weight == null) {
            config.weight = 1;
          }
          const weight = config.weight;
          if (weight % 1 || weight > 512 || weight < 1) {
            logger26.throwArgumentError("invalid weight; must be integer in [1, 512]", `providers[${index}].weight`, weight);
          }
          return Object.freeze(config);
        });
        const total = providerConfigs.reduce((accum, c) => accum + c.weight, 0);
        if (quorum == null) {
          quorum = total / 2;
        } else if (quorum > total) {
          logger26.throwArgumentError("quorum will always fail; larger than total weight", "quorum", quorum);
        }
        let networkOrReady = checkNetworks(providerConfigs.map((c) => c.provider.network));
        if (networkOrReady == null) {
          networkOrReady = new Promise((resolve, reject) => {
            setTimeout(() => {
              this.detectNetwork().then(resolve, reject);
            }, 0);
          });
        }
        super(networkOrReady);
        defineReadOnly(this, "providerConfigs", Object.freeze(providerConfigs));
        defineReadOnly(this, "quorum", quorum);
        this._highestBlockNumber = -1;
      }
      detectNetwork() {
        return __awaiter14(this, void 0, void 0, function* () {
          const networks2 = yield Promise.all(this.providerConfigs.map((c) => c.provider.getNetwork()));
          return checkNetworks(networks2);
        });
      }
      perform(method, params) {
        return __awaiter14(this, void 0, void 0, function* () {
          if (method === "sendTransaction") {
            const results = yield Promise.all(this.providerConfigs.map((c) => {
              return c.provider.sendTransaction(params.signedTransaction).then((result) => {
                return result.hash;
              }, (error) => {
                return error;
              });
            }));
            for (let i2 = 0; i2 < results.length; i2++) {
              const result = results[i2];
              if (typeof result === "string") {
                return result;
              }
            }
            throw results[0];
          }
          if (this._highestBlockNumber === -1 && method !== "getBlockNumber") {
            yield this.getBlockNumber();
          }
          const processFunc = getProcessFunc(this, method, params);
          const configs = shuffled(this.providerConfigs.map(shallowCopy));
          configs.sort((a, b) => a.priority - b.priority);
          const currentBlockNumber = this._highestBlockNumber;
          let i = 0;
          let first = true;
          while (true) {
            const t0 = now();
            let inflightWeight = configs.filter((c) => c.runner && t0 - c.start < c.stallTimeout).reduce((accum, c) => accum + c.weight, 0);
            while (inflightWeight < this.quorum && i < configs.length) {
              const config = configs[i++];
              const rid = nextRid++;
              config.start = now();
              config.staller = stall2(config.stallTimeout);
              config.staller.wait(() => {
                config.staller = null;
              });
              config.runner = getRunner(config, currentBlockNumber, method, params).then((result) => {
                config.done = true;
                config.result = result;
                if (this.listenerCount("debug")) {
                  this.emit("debug", {
                    action: "request",
                    rid,
                    backend: exposeDebugConfig(config, now()),
                    request: { method, params: deepCopy(params) },
                    provider: this
                  });
                }
              }, (error) => {
                config.done = true;
                config.error = error;
                if (this.listenerCount("debug")) {
                  this.emit("debug", {
                    action: "request",
                    rid,
                    backend: exposeDebugConfig(config, now()),
                    request: { method, params: deepCopy(params) },
                    provider: this
                  });
                }
              });
              if (this.listenerCount("debug")) {
                this.emit("debug", {
                  action: "request",
                  rid,
                  backend: exposeDebugConfig(config, null),
                  request: { method, params: deepCopy(params) },
                  provider: this
                });
              }
              inflightWeight += config.weight;
            }
            const waiting = [];
            configs.forEach((c) => {
              if (c.done || !c.runner) {
                return;
              }
              waiting.push(c.runner);
              if (c.staller) {
                waiting.push(c.staller.getPromise());
              }
            });
            if (waiting.length) {
              yield Promise.race(waiting);
            }
            const results = configs.filter((c) => c.done && c.error == null);
            if (results.length >= this.quorum) {
              const result = processFunc(results);
              if (result !== void 0) {
                configs.forEach((c) => {
                  if (c.staller) {
                    c.staller.cancel();
                  }
                  c.cancelled = true;
                });
                return result;
              }
              if (!first) {
                yield stall2(100).getPromise();
              }
              first = false;
            }
            const errors = configs.reduce((accum, c) => {
              if (!c.done || c.error == null) {
                return accum;
              }
              const code = c.error.code;
              if (ForwardErrors.indexOf(code) >= 0) {
                if (!accum[code]) {
                  accum[code] = { error: c.error, weight: 0 };
                }
                accum[code].weight += c.weight;
              }
              return accum;
            }, {});
            Object.keys(errors).forEach((errorCode) => {
              const tally = errors[errorCode];
              if (tally.weight < this.quorum) {
                return;
              }
              configs.forEach((c) => {
                if (c.staller) {
                  c.staller.cancel();
                }
                c.cancelled = true;
              });
              const e = tally.error;
              const props = {};
              ForwardProperties.forEach((name2) => {
                if (e[name2] == null) {
                  return;
                }
                props[name2] = e[name2];
              });
              logger26.throwError(e.reason || e.message, errorCode, props);
            });
            if (configs.filter((c) => !c.done).length === 0) {
              break;
            }
          }
          configs.forEach((c) => {
            if (c.staller) {
              c.staller.cancel();
            }
            c.cancelled = true;
          });
          return logger26.throwError("failed to meet quorum", Logger.errors.SERVER_ERROR, {
            method,
            params,
            results: configs.map((c) => exposeDebugConfig(c)),
            provider: this
          });
        });
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/ipc-provider.js
var IpcProvider;
var init_ipc_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/ipc-provider.js"() {
    "use strict";
    init_react();
    IpcProvider = null;
  }
});

// node_modules/@ethersproject/providers/lib.esm/infura-provider.js
var logger27, defaultProjectId, InfuraWebSocketProvider, InfuraProvider;
var init_infura_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/infura-provider.js"() {
    "use strict";
    init_react();
    init_lib4();
    init_websocket_provider();
    init_formatter();
    init_lib();
    init_version13();
    init_url_json_rpc_provider();
    logger27 = new Logger(version13);
    defaultProjectId = "84842078b09946638c03157f83405213";
    InfuraWebSocketProvider = class extends WebSocketProvider {
      constructor(network, apiKey) {
        const provider = new InfuraProvider(network, apiKey);
        const connection = provider.connection;
        if (connection.password) {
          logger27.throwError("INFURA WebSocket project secrets unsupported", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "InfuraProvider.getWebSocketProvider()"
          });
        }
        const url = connection.url.replace(/^http/i, "ws").replace("/v3/", "/ws/v3/");
        super(url, network);
        defineReadOnly(this, "apiKey", provider.projectId);
        defineReadOnly(this, "projectId", provider.projectId);
        defineReadOnly(this, "projectSecret", provider.projectSecret);
      }
      isCommunityResource() {
        return this.projectId === defaultProjectId;
      }
    };
    InfuraProvider = class extends UrlJsonRpcProvider {
      static getWebSocketProvider(network, apiKey) {
        return new InfuraWebSocketProvider(network, apiKey);
      }
      static getApiKey(apiKey) {
        const apiKeyObj = {
          apiKey: defaultProjectId,
          projectId: defaultProjectId,
          projectSecret: null
        };
        if (apiKey == null) {
          return apiKeyObj;
        }
        if (typeof apiKey === "string") {
          apiKeyObj.projectId = apiKey;
        } else if (apiKey.projectSecret != null) {
          logger27.assertArgument(typeof apiKey.projectId === "string", "projectSecret requires a projectId", "projectId", apiKey.projectId);
          logger27.assertArgument(typeof apiKey.projectSecret === "string", "invalid projectSecret", "projectSecret", "[REDACTED]");
          apiKeyObj.projectId = apiKey.projectId;
          apiKeyObj.projectSecret = apiKey.projectSecret;
        } else if (apiKey.projectId) {
          apiKeyObj.projectId = apiKey.projectId;
        }
        apiKeyObj.apiKey = apiKeyObj.projectId;
        return apiKeyObj;
      }
      static getUrl(network, apiKey) {
        let host = null;
        switch (network ? network.name : "unknown") {
          case "homestead":
            host = "mainnet.infura.io";
            break;
          case "ropsten":
            host = "ropsten.infura.io";
            break;
          case "rinkeby":
            host = "rinkeby.infura.io";
            break;
          case "kovan":
            host = "kovan.infura.io";
            break;
          case "goerli":
            host = "goerli.infura.io";
            break;
          case "matic":
            host = "polygon-mainnet.infura.io";
            break;
          case "maticmum":
            host = "polygon-mumbai.infura.io";
            break;
          case "optimism":
            host = "optimism-mainnet.infura.io";
            break;
          case "optimism-kovan":
            host = "optimism-kovan.infura.io";
            break;
          case "arbitrum":
            host = "arbitrum-mainnet.infura.io";
            break;
          case "arbitrum-rinkeby":
            host = "arbitrum-rinkeby.infura.io";
            break;
          default:
            logger27.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
              argument: "network",
              value: network
            });
        }
        const connection = {
          allowGzip: true,
          url: "https://" + host + "/v3/" + apiKey.projectId,
          throttleCallback: (attempt, url) => {
            if (apiKey.projectId === defaultProjectId) {
              showThrottleMessage();
            }
            return Promise.resolve(true);
          }
        };
        if (apiKey.projectSecret != null) {
          connection.user = "";
          connection.password = apiKey.projectSecret;
        }
        return connection;
      }
      isCommunityResource() {
        return this.projectId === defaultProjectId;
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/json-rpc-batch-provider.js
var JsonRpcBatchProvider;
var init_json_rpc_batch_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/json-rpc-batch-provider.js"() {
    init_react();
    init_lib4();
    init_lib27();
    init_json_rpc_provider();
    JsonRpcBatchProvider = class extends JsonRpcProvider {
      send(method, params) {
        const request = {
          method,
          params,
          id: this._nextId++,
          jsonrpc: "2.0"
        };
        if (this._pendingBatch == null) {
          this._pendingBatch = [];
        }
        const inflightRequest = { request, resolve: null, reject: null };
        const promise = new Promise((resolve, reject) => {
          inflightRequest.resolve = resolve;
          inflightRequest.reject = reject;
        });
        this._pendingBatch.push(inflightRequest);
        if (!this._pendingBatchAggregator) {
          this._pendingBatchAggregator = setTimeout(() => {
            const batch = this._pendingBatch;
            this._pendingBatch = null;
            this._pendingBatchAggregator = null;
            const request2 = batch.map((inflight) => inflight.request);
            this.emit("debug", {
              action: "requestBatch",
              request: deepCopy(request2),
              provider: this
            });
            return fetchJson(this.connection, JSON.stringify(request2)).then((result) => {
              this.emit("debug", {
                action: "response",
                request: request2,
                response: result,
                provider: this
              });
              batch.forEach((inflightRequest2, index) => {
                const payload = result[index];
                if (payload.error) {
                  const error = new Error(payload.error.message);
                  error.code = payload.error.code;
                  error.data = payload.error.data;
                  inflightRequest2.reject(error);
                } else {
                  inflightRequest2.resolve(payload.result);
                }
              });
            }, (error) => {
              this.emit("debug", {
                action: "response",
                error,
                request: request2,
                provider: this
              });
              batch.forEach((inflightRequest2) => {
                inflightRequest2.reject(error);
              });
            });
          }, 10);
        }
        return promise;
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/nodesmith-provider.js
var logger28, defaultApiKey3, NodesmithProvider;
var init_nodesmith_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/nodesmith-provider.js"() {
    "use strict";
    init_react();
    init_url_json_rpc_provider();
    init_lib();
    init_version13();
    logger28 = new Logger(version13);
    defaultApiKey3 = "ETHERS_JS_SHARED";
    NodesmithProvider = class extends UrlJsonRpcProvider {
      static getApiKey(apiKey) {
        if (apiKey && typeof apiKey !== "string") {
          logger28.throwArgumentError("invalid apiKey", "apiKey", apiKey);
        }
        return apiKey || defaultApiKey3;
      }
      static getUrl(network, apiKey) {
        logger28.warn("NodeSmith will be discontinued on 2019-12-20; please migrate to another platform.");
        let host = null;
        switch (network.name) {
          case "homestead":
            host = "https://ethereum.api.nodesmith.io/v1/mainnet/jsonrpc";
            break;
          case "ropsten":
            host = "https://ethereum.api.nodesmith.io/v1/ropsten/jsonrpc";
            break;
          case "rinkeby":
            host = "https://ethereum.api.nodesmith.io/v1/rinkeby/jsonrpc";
            break;
          case "goerli":
            host = "https://ethereum.api.nodesmith.io/v1/goerli/jsonrpc";
            break;
          case "kovan":
            host = "https://ethereum.api.nodesmith.io/v1/kovan/jsonrpc";
            break;
          default:
            logger28.throwArgumentError("unsupported network", "network", arguments[0]);
        }
        return host + "?apiKey=" + apiKey;
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/pocket-provider.js
var logger29, defaultApplicationIds, PocketProvider;
var init_pocket_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/pocket-provider.js"() {
    "use strict";
    init_react();
    init_lib4();
    init_lib();
    init_version13();
    init_url_json_rpc_provider();
    logger29 = new Logger(version13);
    defaultApplicationIds = {
      homestead: "6004bcd10040261633ade990",
      ropsten: "6004bd4d0040261633ade991",
      rinkeby: "6004bda20040261633ade994",
      goerli: "6004bd860040261633ade992"
    };
    PocketProvider = class extends UrlJsonRpcProvider {
      constructor(network, apiKey) {
        if (apiKey == null) {
          const n = getStatic(new.target, "getNetwork")(network);
          if (n) {
            const applicationId = defaultApplicationIds[n.name];
            if (applicationId) {
              apiKey = {
                applicationId,
                loadBalancer: true
              };
            }
          }
          if (apiKey == null) {
            logger29.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
              argument: "network",
              value: network
            });
          }
        }
        super(network, apiKey);
      }
      static getApiKey(apiKey) {
        if (apiKey == null) {
          logger29.throwArgumentError("PocketProvider.getApiKey does not support null apiKey", "apiKey", apiKey);
        }
        const apiKeyObj = {
          applicationId: null,
          loadBalancer: false,
          applicationSecretKey: null
        };
        if (typeof apiKey === "string") {
          apiKeyObj.applicationId = apiKey;
        } else if (apiKey.applicationSecretKey != null) {
          logger29.assertArgument(typeof apiKey.applicationId === "string", "applicationSecretKey requires an applicationId", "applicationId", apiKey.applicationId);
          logger29.assertArgument(typeof apiKey.applicationSecretKey === "string", "invalid applicationSecretKey", "applicationSecretKey", "[REDACTED]");
          apiKeyObj.applicationId = apiKey.applicationId;
          apiKeyObj.applicationSecretKey = apiKey.applicationSecretKey;
          apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
        } else if (apiKey.applicationId) {
          logger29.assertArgument(typeof apiKey.applicationId === "string", "apiKey.applicationId must be a string", "apiKey.applicationId", apiKey.applicationId);
          apiKeyObj.applicationId = apiKey.applicationId;
          apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
        } else {
          logger29.throwArgumentError("unsupported PocketProvider apiKey", "apiKey", apiKey);
        }
        return apiKeyObj;
      }
      static getUrl(network, apiKey) {
        let host = null;
        switch (network ? network.name : "unknown") {
          case "homestead":
            host = "eth-mainnet.gateway.pokt.network";
            break;
          case "ropsten":
            host = "eth-ropsten.gateway.pokt.network";
            break;
          case "rinkeby":
            host = "eth-rinkeby.gateway.pokt.network";
            break;
          case "goerli":
            host = "eth-goerli.gateway.pokt.network";
            break;
          default:
            logger29.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
              argument: "network",
              value: network
            });
        }
        let url = null;
        if (apiKey.loadBalancer) {
          url = `https://${host}/v1/lb/${apiKey.applicationId}`;
        } else {
          url = `https://${host}/v1/${apiKey.applicationId}`;
        }
        const connection = { url };
        connection.headers = {};
        if (apiKey.applicationSecretKey != null) {
          connection.user = "";
          connection.password = apiKey.applicationSecretKey;
        }
        return connection;
      }
      isCommunityResource() {
        return this.applicationId === defaultApplicationIds[this.network.name];
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/web3-provider.js
function buildWeb3LegacyFetcher(provider, sendFunc) {
  const fetcher = "Web3LegacyFetcher";
  return function(method, params) {
    const request = {
      method,
      params,
      id: _nextId++,
      jsonrpc: "2.0"
    };
    return new Promise((resolve, reject) => {
      this.emit("debug", {
        action: "request",
        fetcher,
        request: deepCopy(request),
        provider: this
      });
      sendFunc(request, (error, response) => {
        if (error) {
          this.emit("debug", {
            action: "response",
            fetcher,
            error,
            request,
            provider: this
          });
          return reject(error);
        }
        this.emit("debug", {
          action: "response",
          fetcher,
          request,
          response,
          provider: this
        });
        if (response.error) {
          const error2 = new Error(response.error.message);
          error2.code = response.error.code;
          error2.data = response.error.data;
          return reject(error2);
        }
        resolve(response.result);
      });
    });
  };
}
function buildEip1193Fetcher(provider) {
  return function(method, params) {
    if (params == null) {
      params = [];
    }
    const request = { method, params };
    this.emit("debug", {
      action: "request",
      fetcher: "Eip1193Fetcher",
      request: deepCopy(request),
      provider: this
    });
    return provider.request(request).then((response) => {
      this.emit("debug", {
        action: "response",
        fetcher: "Eip1193Fetcher",
        request,
        response,
        provider: this
      });
      return response;
    }, (error) => {
      this.emit("debug", {
        action: "response",
        fetcher: "Eip1193Fetcher",
        request,
        error,
        provider: this
      });
      throw error;
    });
  };
}
var logger30, _nextId, Web3Provider;
var init_web3_provider = __esm({
  "node_modules/@ethersproject/providers/lib.esm/web3-provider.js"() {
    "use strict";
    init_react();
    init_lib4();
    init_lib();
    init_version13();
    init_json_rpc_provider();
    logger30 = new Logger(version13);
    _nextId = 1;
    Web3Provider = class extends JsonRpcProvider {
      constructor(provider, network) {
        logger30.checkNew(new.target, Web3Provider);
        if (provider == null) {
          logger30.throwArgumentError("missing provider", "provider", provider);
        }
        let path = null;
        let jsonRpcFetchFunc = null;
        let subprovider = null;
        if (typeof provider === "function") {
          path = "unknown:";
          jsonRpcFetchFunc = provider;
        } else {
          path = provider.host || provider.path || "";
          if (!path && provider.isMetaMask) {
            path = "metamask";
          }
          subprovider = provider;
          if (provider.request) {
            if (path === "") {
              path = "eip-1193:";
            }
            jsonRpcFetchFunc = buildEip1193Fetcher(provider);
          } else if (provider.sendAsync) {
            jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.sendAsync.bind(provider));
          } else if (provider.send) {
            jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.send.bind(provider));
          } else {
            logger30.throwArgumentError("unsupported provider", "provider", provider);
          }
          if (!path) {
            path = "unknown:";
          }
        }
        super(path, network);
        defineReadOnly(this, "jsonRpcFetchFunc", jsonRpcFetchFunc);
        defineReadOnly(this, "provider", subprovider);
      }
      send(method, params) {
        return this.jsonRpcFetchFunc(method, params);
      }
    };
  }
});

// node_modules/@ethersproject/providers/lib.esm/index.js
var lib_exports4 = {};
__export(lib_exports4, {
  AlchemyProvider: () => AlchemyProvider,
  AlchemyWebSocketProvider: () => AlchemyWebSocketProvider,
  BaseProvider: () => BaseProvider,
  CloudflareProvider: () => CloudflareProvider,
  EtherscanProvider: () => EtherscanProvider,
  FallbackProvider: () => FallbackProvider,
  Formatter: () => Formatter,
  InfuraProvider: () => InfuraProvider,
  InfuraWebSocketProvider: () => InfuraWebSocketProvider,
  IpcProvider: () => IpcProvider,
  JsonRpcBatchProvider: () => JsonRpcBatchProvider,
  JsonRpcProvider: () => JsonRpcProvider,
  JsonRpcSigner: () => JsonRpcSigner,
  NodesmithProvider: () => NodesmithProvider,
  PocketProvider: () => PocketProvider,
  Provider: () => Provider,
  Resolver: () => Resolver,
  StaticJsonRpcProvider: () => StaticJsonRpcProvider,
  UrlJsonRpcProvider: () => UrlJsonRpcProvider,
  Web3Provider: () => Web3Provider,
  WebSocketProvider: () => WebSocketProvider,
  getDefaultProvider: () => getDefaultProvider,
  getNetwork: () => getNetwork,
  isCommunityResourcable: () => isCommunityResourcable,
  isCommunityResource: () => isCommunityResource,
  showThrottleMessage: () => showThrottleMessage
});
function getDefaultProvider(network, options) {
  if (network == null) {
    network = "homestead";
  }
  if (typeof network === "string") {
    const match = network.match(/^(ws|http)s?:/i);
    if (match) {
      switch (match[1]) {
        case "http":
          return new JsonRpcProvider(network);
        case "ws":
          return new WebSocketProvider(network);
        default:
          logger31.throwArgumentError("unsupported URL scheme", "network", network);
      }
    }
  }
  const n = getNetwork(network);
  if (!n || !n._defaultProvider) {
    logger31.throwError("unsupported getDefaultProvider network", Logger.errors.NETWORK_ERROR, {
      operation: "getDefaultProvider",
      network
    });
  }
  return n._defaultProvider({
    FallbackProvider,
    AlchemyProvider,
    CloudflareProvider,
    EtherscanProvider,
    InfuraProvider,
    JsonRpcProvider,
    NodesmithProvider,
    PocketProvider,
    Web3Provider,
    IpcProvider
  }, options);
}
var logger31;
var init_lib28 = __esm({
  "node_modules/@ethersproject/providers/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_lib14();
    init_lib25();
    init_base_provider();
    init_alchemy_provider();
    init_cloudflare_provider();
    init_etherscan_provider();
    init_fallback_provider();
    init_ipc_provider();
    init_infura_provider();
    init_json_rpc_provider();
    init_json_rpc_batch_provider();
    init_nodesmith_provider();
    init_pocket_provider();
    init_url_json_rpc_provider();
    init_web3_provider();
    init_websocket_provider();
    init_formatter();
    init_lib();
    init_version13();
    logger31 = new Logger(version13);
  }
});

// node_modules/@ethersproject/solidity/lib.esm/_version.js
var version14;
var init_version14 = __esm({
  "node_modules/@ethersproject/solidity/lib.esm/_version.js"() {
    init_react();
    version14 = "solidity/5.5.0";
  }
});

// node_modules/@ethersproject/solidity/lib.esm/index.js
function _pack(type, value, isArray) {
  switch (type) {
    case "address":
      if (isArray) {
        return zeroPad(value, 32);
      }
      return arrayify(value);
    case "string":
      return toUtf8Bytes(value);
    case "bytes":
      return arrayify(value);
    case "bool":
      value = value ? "0x01" : "0x00";
      if (isArray) {
        return zeroPad(value, 32);
      }
      return arrayify(value);
  }
  let match = type.match(regexNumber);
  if (match) {
    let size = parseInt(match[2] || "256");
    if (match[2] && String(size) !== match[2] || size % 8 !== 0 || size === 0 || size > 256) {
      logger32.throwArgumentError("invalid number type", "type", type);
    }
    if (isArray) {
      size = 256;
    }
    value = BigNumber.from(value).toTwos(size);
    return zeroPad(value, size / 8);
  }
  match = type.match(regexBytes);
  if (match) {
    const size = parseInt(match[1]);
    if (String(size) !== match[1] || size === 0 || size > 32) {
      logger32.throwArgumentError("invalid bytes type", "type", type);
    }
    if (arrayify(value).byteLength !== size) {
      logger32.throwArgumentError(`invalid value for ${type}`, "value", value);
    }
    if (isArray) {
      return arrayify((value + Zeros).substring(0, 66));
    }
    return value;
  }
  match = type.match(regexArray);
  if (match && Array.isArray(value)) {
    const baseType = match[1];
    const count = parseInt(match[2] || String(value.length));
    if (count != value.length) {
      logger32.throwArgumentError(`invalid array length for ${type}`, "value", value);
    }
    const result = [];
    value.forEach(function(value2) {
      result.push(_pack(baseType, value2, true));
    });
    return concat(result);
  }
  return logger32.throwArgumentError("invalid type", "type", type);
}
function pack2(types, values) {
  if (types.length != values.length) {
    logger32.throwArgumentError("wrong number of values; expected ${ types.length }", "values", values);
  }
  const tight = [];
  types.forEach(function(type, index) {
    tight.push(_pack(type, values[index]));
  });
  return hexlify(concat(tight));
}
function keccak2562(types, values) {
  return keccak256(pack2(types, values));
}
function sha2562(types, values) {
  return sha256(pack2(types, values));
}
var regexBytes, regexNumber, regexArray, Zeros, logger32;
var init_lib29 = __esm({
  "node_modules/@ethersproject/solidity/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_lib3();
    init_lib2();
    init_lib5();
    init_lib18();
    init_lib9();
    init_lib();
    init_version14();
    regexBytes = new RegExp("^bytes([0-9]+)$");
    regexNumber = new RegExp("^(u?int)([0-9]*)$");
    regexArray = new RegExp("^(.*)\\[([0-9]*)\\]$");
    Zeros = "0000000000000000000000000000000000000000000000000000000000000000";
    logger32 = new Logger(version14);
  }
});

// node_modules/@ethersproject/units/lib.esm/_version.js
var version15;
var init_version15 = __esm({
  "node_modules/@ethersproject/units/lib.esm/_version.js"() {
    init_react();
    version15 = "units/5.5.0";
  }
});

// node_modules/@ethersproject/units/lib.esm/index.js
function commify(value) {
  const comps = String(value).split(".");
  if (comps.length > 2 || !comps[0].match(/^-?[0-9]*$/) || comps[1] && !comps[1].match(/^[0-9]*$/) || value === "." || value === "-.") {
    logger33.throwArgumentError("invalid value", "value", value);
  }
  let whole = comps[0];
  let negative = "";
  if (whole.substring(0, 1) === "-") {
    negative = "-";
    whole = whole.substring(1);
  }
  while (whole.substring(0, 1) === "0") {
    whole = whole.substring(1);
  }
  if (whole === "") {
    whole = "0";
  }
  let suffix = "";
  if (comps.length === 2) {
    suffix = "." + (comps[1] || "0");
  }
  while (suffix.length > 2 && suffix[suffix.length - 1] === "0") {
    suffix = suffix.substring(0, suffix.length - 1);
  }
  const formatted = [];
  while (whole.length) {
    if (whole.length <= 3) {
      formatted.unshift(whole);
      break;
    } else {
      const index = whole.length - 3;
      formatted.unshift(whole.substring(index));
      whole = whole.substring(0, index);
    }
  }
  return negative + formatted.join(",") + suffix;
}
function formatUnits(value, unitName) {
  if (typeof unitName === "string") {
    const index = names.indexOf(unitName);
    if (index !== -1) {
      unitName = 3 * index;
    }
  }
  return formatFixed(value, unitName != null ? unitName : 18);
}
function parseUnits(value, unitName) {
  if (typeof value !== "string") {
    logger33.throwArgumentError("value must be a string", "value", value);
  }
  if (typeof unitName === "string") {
    const index = names.indexOf(unitName);
    if (index !== -1) {
      unitName = 3 * index;
    }
  }
  return parseFixed(value, unitName != null ? unitName : 18);
}
function formatEther(wei) {
  return formatUnits(wei, 18);
}
function parseEther(ether) {
  return parseUnits(ether, 18);
}
var logger33, names;
var init_lib30 = __esm({
  "node_modules/@ethersproject/units/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_lib3();
    init_lib();
    init_version15();
    logger33 = new Logger(version15);
    names = [
      "wei",
      "kwei",
      "mwei",
      "gwei",
      "szabo",
      "finney",
      "ether"
    ];
  }
});

// node_modules/ethers/lib.esm/utils.js
var utils_exports = {};
__export(utils_exports, {
  AbiCoder: () => AbiCoder,
  ConstructorFragment: () => ConstructorFragment,
  ErrorFragment: () => ErrorFragment,
  EventFragment: () => EventFragment,
  FormatTypes: () => FormatTypes,
  Fragment: () => Fragment,
  FunctionFragment: () => FunctionFragment,
  HDNode: () => HDNode,
  Indexed: () => Indexed,
  Interface: () => Interface,
  LogDescription: () => LogDescription,
  Logger: () => Logger,
  ParamType: () => ParamType,
  RLP: () => lib_exports,
  SigningKey: () => SigningKey,
  SupportedAlgorithm: () => SupportedAlgorithm,
  TransactionDescription: () => TransactionDescription,
  TransactionTypes: () => TransactionTypes,
  UnicodeNormalizationForm: () => UnicodeNormalizationForm,
  Utf8ErrorFuncs: () => Utf8ErrorFuncs,
  Utf8ErrorReason: () => Utf8ErrorReason,
  _TypedDataEncoder: () => TypedDataEncoder,
  _fetchData: () => _fetchData,
  _toEscapedUtf8String: () => _toEscapedUtf8String,
  accessListify: () => accessListify,
  arrayify: () => arrayify,
  base58: () => Base58,
  base64: () => lib_exports3,
  checkProperties: () => checkProperties,
  checkResultErrors: () => checkResultErrors,
  commify: () => commify,
  computeAddress: () => computeAddress,
  computeHmac: () => computeHmac,
  computePublicKey: () => computePublicKey,
  concat: () => concat,
  deepCopy: () => deepCopy,
  defaultAbiCoder: () => defaultAbiCoder,
  defaultPath: () => defaultPath,
  defineReadOnly: () => defineReadOnly,
  entropyToMnemonic: () => entropyToMnemonic,
  fetchJson: () => fetchJson,
  formatBytes32String: () => formatBytes32String,
  formatEther: () => formatEther,
  formatUnits: () => formatUnits,
  getAccountPath: () => getAccountPath,
  getAddress: () => getAddress,
  getContractAddress: () => getContractAddress,
  getCreate2Address: () => getCreate2Address,
  getIcapAddress: () => getIcapAddress,
  getJsonWalletAddress: () => getJsonWalletAddress,
  getStatic: () => getStatic,
  hashMessage: () => hashMessage,
  hexConcat: () => hexConcat,
  hexDataLength: () => hexDataLength,
  hexDataSlice: () => hexDataSlice,
  hexStripZeros: () => hexStripZeros,
  hexValue: () => hexValue,
  hexZeroPad: () => hexZeroPad,
  hexlify: () => hexlify,
  id: () => id,
  isAddress: () => isAddress,
  isBytes: () => isBytes,
  isBytesLike: () => isBytesLike,
  isHexString: () => isHexString,
  isValidMnemonic: () => isValidMnemonic,
  isValidName: () => isValidName,
  joinSignature: () => joinSignature,
  keccak256: () => keccak256,
  mnemonicToEntropy: () => mnemonicToEntropy,
  mnemonicToSeed: () => mnemonicToSeed,
  namehash: () => namehash,
  nameprep: () => nameprep,
  parseBytes32String: () => parseBytes32String,
  parseEther: () => parseEther,
  parseTransaction: () => parse,
  parseUnits: () => parseUnits,
  poll: () => poll,
  randomBytes: () => randomBytes,
  recoverAddress: () => recoverAddress,
  recoverPublicKey: () => recoverPublicKey,
  resolveProperties: () => resolveProperties,
  ripemd160: () => ripemd160,
  serializeTransaction: () => serialize,
  sha256: () => sha256,
  sha512: () => sha512,
  shallowCopy: () => shallowCopy,
  shuffled: () => shuffled,
  solidityKeccak256: () => keccak2562,
  solidityPack: () => pack2,
  soliditySha256: () => sha2562,
  splitSignature: () => splitSignature,
  stripZeros: () => stripZeros,
  toUtf8Bytes: () => toUtf8Bytes,
  toUtf8CodePoints: () => toUtf8CodePoints,
  toUtf8String: () => toUtf8String,
  verifyMessage: () => verifyMessage,
  verifyTypedData: () => verifyTypedData,
  zeroPad: () => zeroPad
});
var init_utils2 = __esm({
  "node_modules/ethers/lib.esm/utils.js"() {
    "use strict";
    init_react();
    init_lib13();
    init_lib7();
    init_lib26();
    init_lib17();
    init_lib2();
    init_lib10();
    init_lib21();
    init_lib23();
    init_lib5();
    init_lib();
    init_lib18();
    init_lib29();
    init_lib22();
    init_lib4();
    init_lib6();
    init_lib11();
    init_lib9();
    init_lib12();
    init_lib30();
    init_lib24();
    init_lib27();
    init_lib18();
    init_lib9();
  }
});

// node_modules/ethers/lib.esm/_version.js
var version16;
var init_version16 = __esm({
  "node_modules/ethers/lib.esm/_version.js"() {
    init_react();
    version16 = "ethers/5.5.3";
  }
});

// node_modules/ethers/lib.esm/ethers.js
var ethers_exports = {};
__export(ethers_exports, {
  BaseContract: () => BaseContract,
  BigNumber: () => BigNumber,
  Contract: () => Contract,
  ContractFactory: () => ContractFactory,
  FixedNumber: () => FixedNumber,
  Signer: () => Signer,
  VoidSigner: () => VoidSigner,
  Wallet: () => Wallet,
  Wordlist: () => Wordlist,
  constants: () => lib_exports2,
  errors: () => ErrorCode,
  getDefaultProvider: () => getDefaultProvider,
  logger: () => logger34,
  providers: () => lib_exports4,
  utils: () => utils_exports,
  version: () => version16,
  wordlists: () => wordlists
});
var logger34;
var init_ethers = __esm({
  "node_modules/ethers/lib.esm/ethers.js"() {
    "use strict";
    init_react();
    init_lib16();
    init_lib3();
    init_lib15();
    init_lib24();
    init_lib8();
    init_lib28();
    init_lib28();
    init_lib20();
    init_utils2();
    init_lib();
    init_version16();
    logger34 = new Logger(version16);
  }
});

// node_modules/ethers/lib.esm/index.js
var lib_exports5 = {};
__export(lib_exports5, {
  BaseContract: () => BaseContract,
  BigNumber: () => BigNumber,
  Contract: () => Contract,
  ContractFactory: () => ContractFactory,
  FixedNumber: () => FixedNumber,
  Signer: () => Signer,
  VoidSigner: () => VoidSigner,
  Wallet: () => Wallet,
  Wordlist: () => Wordlist,
  constants: () => lib_exports2,
  errors: () => ErrorCode,
  ethers: () => ethers_exports,
  getDefaultProvider: () => getDefaultProvider,
  logger: () => logger34,
  providers: () => lib_exports4,
  utils: () => utils_exports,
  version: () => version16,
  wordlists: () => wordlists
});
var init_lib31 = __esm({
  "node_modules/ethers/lib.esm/index.js"() {
    "use strict";
    init_react();
    init_ethers();
    init_ethers();
    try {
      const anyGlobal2 = window;
      if (anyGlobal2._ethers == null) {
        anyGlobal2._ethers = ethers_exports;
      }
    } catch (error) {
    }
  }
});

// node_modules/crypto-js/core.js
var require_core = __commonJS({
  "node_modules/crypto-js/core.js"(exports, module) {
    init_react();
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define([], factory);
      } else {
        root.CryptoJS = factory();
      }
    })(exports, function() {
      var CryptoJS = CryptoJS || function(Math2, undefined2) {
        var crypto2;
        if (typeof window !== "undefined" && window.crypto) {
          crypto2 = window.crypto;
        }
        if (typeof self !== "undefined" && self.crypto) {
          crypto2 = self.crypto;
        }
        if (typeof globalThis !== "undefined" && globalThis.crypto) {
          crypto2 = globalThis.crypto;
        }
        if (!crypto2 && typeof window !== "undefined" && window.msCrypto) {
          crypto2 = window.msCrypto;
        }
        if (!crypto2 && typeof globalThis !== "undefined" && globalThis.crypto) {
          crypto2 = globalThis.crypto;
        }
        if (!crypto2 && typeof __require === "function") {
          try {
            crypto2 = require_crypto();
          } catch (err) {
          }
        }
        var cryptoSecureRandomInt = function() {
          if (crypto2) {
            if (typeof crypto2.getRandomValues === "function") {
              try {
                return crypto2.getRandomValues(new Uint32Array(1))[0];
              } catch (err) {
              }
            }
            if (typeof crypto2.randomBytes === "function") {
              try {
                return crypto2.randomBytes(4).readInt32LE();
              } catch (err) {
              }
            }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        };
        var create = Object.create || function() {
          function F() {
          }
          return function(obj) {
            var subtype;
            F.prototype = obj;
            subtype = new F();
            F.prototype = null;
            return subtype;
          };
        }();
        var C = {};
        var C_lib = C.lib = {};
        var Base = C_lib.Base = function() {
          return {
            extend: function(overrides) {
              var subtype = create(this);
              if (overrides) {
                subtype.mixIn(overrides);
              }
              if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                subtype.init = function() {
                  subtype.$super.init.apply(this, arguments);
                };
              }
              subtype.init.prototype = subtype;
              subtype.$super = this;
              return subtype;
            },
            create: function() {
              var instance = this.extend();
              instance.init.apply(instance, arguments);
              return instance;
            },
            init: function() {
            },
            mixIn: function(properties) {
              for (var propertyName in properties) {
                if (properties.hasOwnProperty(propertyName)) {
                  this[propertyName] = properties[propertyName];
                }
              }
              if (properties.hasOwnProperty("toString")) {
                this.toString = properties.toString;
              }
            },
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }();
        var WordArray = C_lib.WordArray = Base.extend({
          init: function(words2, sigBytes) {
            words2 = this.words = words2 || [];
            if (sigBytes != undefined2) {
              this.sigBytes = sigBytes;
            } else {
              this.sigBytes = words2.length * 4;
            }
          },
          toString: function(encoder) {
            return (encoder || Hex).stringify(this);
          },
          concat: function(wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
              for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
              }
            } else {
              for (var j = 0; j < thatSigBytes; j += 4) {
                thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
              }
            }
            this.sigBytes += thatSigBytes;
            return this;
          },
          clamp: function() {
            var words2 = this.words;
            var sigBytes = this.sigBytes;
            words2[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
            words2.length = Math2.ceil(sigBytes / 4);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);
            return clone;
          },
          random: function(nBytes) {
            var words2 = [];
            for (var i = 0; i < nBytes; i += 4) {
              words2.push(cryptoSecureRandomInt());
            }
            return new WordArray.init(words2, nBytes);
          }
        });
        var C_enc = C.enc = {};
        var Hex = C_enc.Hex = {
          stringify: function(wordArray) {
            var words2 = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words2[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              hexChars.push((bite >>> 4).toString(16));
              hexChars.push((bite & 15).toString(16));
            }
            return hexChars.join("");
          },
          parse: function(hexStr) {
            var hexStrLength = hexStr.length;
            var words2 = [];
            for (var i = 0; i < hexStrLength; i += 2) {
              words2[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
            }
            return new WordArray.init(words2, hexStrLength / 2);
          }
        };
        var Latin1 = C_enc.Latin1 = {
          stringify: function(wordArray) {
            var words2 = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words2[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join("");
          },
          parse: function(latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words2 = [];
            for (var i = 0; i < latin1StrLength; i++) {
              words2[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
            }
            return new WordArray.init(words2, latin1StrLength);
          }
        };
        var Utf8 = C_enc.Utf8 = {
          stringify: function(wordArray) {
            try {
              return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function(utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
          }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
          reset: function() {
            this._data = new WordArray.init();
            this._nDataBytes = 0;
          },
          _append: function(data) {
            if (typeof data == "string") {
              data = Utf8.parse(data);
            }
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
          },
          _process: function(doFlush) {
            var processedWords;
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
              nBlocksReady = Math2.ceil(nBlocksReady);
            } else {
              nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
            if (nWordsReady) {
              for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                this._doProcessBlock(dataWords, offset);
              }
              processedWords = dataWords.splice(0, nWordsReady);
              data.sigBytes -= nBytesReady;
            }
            return new WordArray.init(processedWords, nBytesReady);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();
            return clone;
          },
          _minBufferSize: 0
        });
        var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
          cfg: Base.extend(),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
          },
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          update: function(messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
          },
          finalize: function(messageUpdate) {
            if (messageUpdate) {
              this._append(messageUpdate);
            }
            var hash2 = this._doFinalize();
            return hash2;
          },
          blockSize: 512 / 32,
          _createHelper: function(hasher) {
            return function(message, cfg) {
              return new hasher.init(cfg).finalize(message);
            };
          },
          _createHmacHelper: function(hasher) {
            return function(message, key) {
              return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
          }
        });
        var C_algo = C.algo = {};
        return C;
      }(Math);
      return CryptoJS;
    });
  }
});

// node_modules/crypto-js/enc-base64.js
var require_enc_base64 = __commonJS({
  "node_modules/crypto-js/enc-base64.js"(exports, module) {
    init_react();
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64 = C_enc.Base64 = {
          stringify: function(wordArray) {
            var words2 = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
              var byte1 = words2[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              var byte2 = words2[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
              var byte3 = words2[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              while (base64Chars.length % 4) {
                base64Chars.push(paddingChar);
              }
            }
            return base64Chars.join("");
          },
          parse: function(base64Str) {
            var base64StrLength = base64Str.length;
            var map = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map.length; j++) {
                reverseMap[map.charCodeAt(j)] = j;
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              if (paddingIndex !== -1) {
                base64StrLength = paddingIndex;
              }
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words2 = [];
          var nBytes = 0;
          for (var i = 0; i < base64StrLength; i++) {
            if (i % 4) {
              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
              var bitsCombined = bits1 | bits2;
              words2[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
              nBytes++;
            }
          }
          return WordArray.create(words2, nBytes);
        }
      })();
      return CryptoJS.enc.Base64;
    });
  }
});

// node_modules/crypto-js/md5.js
var require_md5 = __commonJS({
  "node_modules/crypto-js/md5.js"(exports, module) {
    init_react();
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function(Math2) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var T = [];
        (function() {
          for (var i = 0; i < 64; i++) {
            T[i] = Math2.abs(Math2.sin(i + 1)) * 4294967296 | 0;
          }
        })();
        var MD5 = C_algo.MD5 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([
              1732584193,
              4023233417,
              2562383102,
              271733878
            ]);
          },
          _doProcessBlock: function(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            a = FF(a, b, c, d, M_offset_0, 7, T[0]);
            d = FF(d, a, b, c, M_offset_1, 12, T[1]);
            c = FF(c, d, a, b, M_offset_2, 17, T[2]);
            b = FF(b, c, d, a, M_offset_3, 22, T[3]);
            a = FF(a, b, c, d, M_offset_4, 7, T[4]);
            d = FF(d, a, b, c, M_offset_5, 12, T[5]);
            c = FF(c, d, a, b, M_offset_6, 17, T[6]);
            b = FF(b, c, d, a, M_offset_7, 22, T[7]);
            a = FF(a, b, c, d, M_offset_8, 7, T[8]);
            d = FF(d, a, b, c, M_offset_9, 12, T[9]);
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
            a = FF(a, b, c, d, M_offset_12, 7, T[12]);
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
            a = GG(a, b, c, d, M_offset_1, 5, T[16]);
            d = GG(d, a, b, c, M_offset_6, 9, T[17]);
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
            b = GG(b, c, d, a, M_offset_0, 20, T[19]);
            a = GG(a, b, c, d, M_offset_5, 5, T[20]);
            d = GG(d, a, b, c, M_offset_10, 9, T[21]);
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
            b = GG(b, c, d, a, M_offset_4, 20, T[23]);
            a = GG(a, b, c, d, M_offset_9, 5, T[24]);
            d = GG(d, a, b, c, M_offset_14, 9, T[25]);
            c = GG(c, d, a, b, M_offset_3, 14, T[26]);
            b = GG(b, c, d, a, M_offset_8, 20, T[27]);
            a = GG(a, b, c, d, M_offset_13, 5, T[28]);
            d = GG(d, a, b, c, M_offset_2, 9, T[29]);
            c = GG(c, d, a, b, M_offset_7, 14, T[30]);
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
            a = HH(a, b, c, d, M_offset_5, 4, T[32]);
            d = HH(d, a, b, c, M_offset_8, 11, T[33]);
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
            a = HH(a, b, c, d, M_offset_1, 4, T[36]);
            d = HH(d, a, b, c, M_offset_4, 11, T[37]);
            c = HH(c, d, a, b, M_offset_7, 16, T[38]);
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
            a = HH(a, b, c, d, M_offset_13, 4, T[40]);
            d = HH(d, a, b, c, M_offset_0, 11, T[41]);
            c = HH(c, d, a, b, M_offset_3, 16, T[42]);
            b = HH(b, c, d, a, M_offset_6, 23, T[43]);
            a = HH(a, b, c, d, M_offset_9, 4, T[44]);
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
            b = HH(b, c, d, a, M_offset_2, 23, T[47]);
            a = II(a, b, c, d, M_offset_0, 6, T[48]);
            d = II(d, a, b, c, M_offset_7, 10, T[49]);
            c = II(c, d, a, b, M_offset_14, 15, T[50]);
            b = II(b, c, d, a, M_offset_5, 21, T[51]);
            a = II(a, b, c, d, M_offset_12, 6, T[52]);
            d = II(d, a, b, c, M_offset_3, 10, T[53]);
            c = II(c, d, a, b, M_offset_10, 15, T[54]);
            b = II(b, c, d, a, M_offset_1, 21, T[55]);
            a = II(a, b, c, d, M_offset_8, 6, T[56]);
            d = II(d, a, b, c, M_offset_15, 10, T[57]);
            c = II(c, d, a, b, M_offset_6, 15, T[58]);
            b = II(b, c, d, a, M_offset_13, 21, T[59]);
            a = II(a, b, c, d, M_offset_4, 6, T[60]);
            d = II(d, a, b, c, M_offset_11, 10, T[61]);
            c = II(c, d, a, b, M_offset_2, 15, T[62]);
            b = II(b, c, d, a, M_offset_9, 21, T[63]);
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
            var nBitsTotalL = nBitsTotal;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
            data.sigBytes = (dataWords.length + 1) * 4;
            this._process();
            var hash2 = this._hash;
            var H = hash2.words;
            for (var i = 0; i < 4; i++) {
              var H_i = H[i];
              H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
            }
            return hash2;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function FF(a, b, c, d, x, s, t) {
          var n = a + (b & c | ~b & d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function GG(a, b, c, d, x, s, t) {
          var n = a + (b & d | c & ~d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function HH(a, b, c, d, x, s, t) {
          var n = a + (b ^ c ^ d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function II(a, b, c, d, x, s, t) {
          var n = a + (c ^ (b | ~d)) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        C.MD5 = Hasher._createHelper(MD5);
        C.HmacMD5 = Hasher._createHmacHelper(MD5);
      })(Math);
      return CryptoJS.MD5;
    });
  }
});

// node_modules/crypto-js/sha1.js
var require_sha1 = __commonJS({
  "node_modules/crypto-js/sha1.js"(exports, module) {
    init_react();
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
        var SHA1 = C_algo.SHA1 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([
              1732584193,
              4023233417,
              2562383102,
              271733878,
              3285377520
            ]);
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            for (var i = 0; i < 80; i++) {
              if (i < 16) {
                W[i] = M[offset + i] | 0;
              } else {
                var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = n << 1 | n >>> 31;
              }
              var t = (a << 5 | a >>> 27) + e + W[i];
              if (i < 20) {
                t += (b & c | ~b & d) + 1518500249;
              } else if (i < 40) {
                t += (b ^ c ^ d) + 1859775393;
              } else if (i < 60) {
                t += (b & c | b & d | c & d) - 1894007588;
              } else {
                t += (b ^ c ^ d) - 899497514;
              }
              e = d;
              d = c;
              c = b << 30 | b >>> 2;
              b = a;
              a = t;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA1 = Hasher._createHelper(SHA1);
        C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
      })();
      return CryptoJS.SHA1;
    });
  }
});

// node_modules/crypto-js/hmac.js
var require_hmac = __commonJS({
  "node_modules/crypto-js/hmac.js"(exports, module) {
    init_react();
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;
        var HMAC = C_algo.HMAC = Base.extend({
          init: function(hasher, key) {
            hasher = this._hasher = new hasher.init();
            if (typeof key == "string") {
              key = Utf8.parse(key);
            }
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = hasherBlockSize * 4;
            if (key.sigBytes > hasherBlockSizeBytes) {
              key = hasher.finalize(key);
            }
            key.clamp();
            var oKey = this._oKey = key.clone();
            var iKey = this._iKey = key.clone();
            var oKeyWords = oKey.words;
            var iKeyWords = iKey.words;
            for (var i = 0; i < hasherBlockSize; i++) {
              oKeyWords[i] ^= 1549556828;
              iKeyWords[i] ^= 909522486;
            }
            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
            this.reset();
          },
          reset: function() {
            var hasher = this._hasher;
            hasher.reset();
            hasher.update(this._iKey);
          },
          update: function(messageUpdate) {
            this._hasher.update(messageUpdate);
            return this;
          },
          finalize: function(messageUpdate) {
            var hasher = this._hasher;
            var innerHash = hasher.finalize(messageUpdate);
            hasher.reset();
            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
            return hmac;
          }
        });
      })();
    });
  }
});

// node_modules/crypto-js/evpkdf.js
var require_evpkdf = __commonJS({
  "node_modules/crypto-js/evpkdf.js"(exports, module) {
    init_react();
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core(), require_sha1(), require_hmac());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha1", "./hmac"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var MD5 = C_algo.MD5;
        var EvpKDF = C_algo.EvpKDF = Base.extend({
          cfg: Base.extend({
            keySize: 128 / 32,
            hasher: MD5,
            iterations: 1
          }),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          compute: function(password, salt) {
            var block;
            var cfg = this.cfg;
            var hasher = cfg.hasher.create();
            var derivedKey = WordArray.create();
            var derivedKeyWords = derivedKey.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              if (block) {
                hasher.update(block);
              }
              block = hasher.update(password).finalize(salt);
              hasher.reset();
              for (var i = 1; i < iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
              }
              derivedKey.concat(block);
            }
            derivedKey.sigBytes = keySize * 4;
            return derivedKey;
          }
        });
        C.EvpKDF = function(password, salt, cfg) {
          return EvpKDF.create(cfg).compute(password, salt);
        };
      })();
      return CryptoJS.EvpKDF;
    });
  }
});

// node_modules/crypto-js/cipher-core.js
var require_cipher_core = __commonJS({
  "node_modules/crypto-js/cipher-core.js"(exports, module) {
    init_react();
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core(), require_evpkdf());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./evpkdf"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.lib.Cipher || function(undefined2) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
          cfg: Base.extend(),
          createEncryptor: function(key, cfg) {
            return this.create(this._ENC_XFORM_MODE, key, cfg);
          },
          createDecryptor: function(key, cfg) {
            return this.create(this._DEC_XFORM_MODE, key, cfg);
          },
          init: function(xformMode, key, cfg) {
            this.cfg = this.cfg.extend(cfg);
            this._xformMode = xformMode;
            this._key = key;
            this.reset();
          },
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          process: function(dataUpdate) {
            this._append(dataUpdate);
            return this._process();
          },
          finalize: function(dataUpdate) {
            if (dataUpdate) {
              this._append(dataUpdate);
            }
            var finalProcessedData = this._doFinalize();
            return finalProcessedData;
          },
          keySize: 128 / 32,
          ivSize: 128 / 32,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          _createHelper: function() {
            function selectCipherStrategy(key) {
              if (typeof key == "string") {
                return PasswordBasedCipher;
              } else {
                return SerializableCipher;
              }
            }
            return function(cipher) {
              return {
                encrypt: function(message, key, cfg) {
                  return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                },
                decrypt: function(ciphertext, key, cfg) {
                  return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                }
              };
            };
          }()
        });
        var StreamCipher = C_lib.StreamCipher = Cipher.extend({
          _doFinalize: function() {
            var finalProcessedBlocks = this._process(true);
            return finalProcessedBlocks;
          },
          blockSize: 1
        });
        var C_mode = C.mode = {};
        var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
          createEncryptor: function(cipher, iv) {
            return this.Encryptor.create(cipher, iv);
          },
          createDecryptor: function(cipher, iv) {
            return this.Decryptor.create(cipher, iv);
          },
          init: function(cipher, iv) {
            this._cipher = cipher;
            this._iv = iv;
          }
        });
        var CBC = C_mode.CBC = function() {
          var CBC2 = BlockCipherMode.extend();
          CBC2.Encryptor = CBC2.extend({
            processBlock: function(words2, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              xorBlock.call(this, words2, offset, blockSize);
              cipher.encryptBlock(words2, offset);
              this._prevBlock = words2.slice(offset, offset + blockSize);
            }
          });
          CBC2.Decryptor = CBC2.extend({
            processBlock: function(words2, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words2.slice(offset, offset + blockSize);
              cipher.decryptBlock(words2, offset);
              xorBlock.call(this, words2, offset, blockSize);
              this._prevBlock = thisBlock;
            }
          });
          function xorBlock(words2, offset, blockSize) {
            var block;
            var iv = this._iv;
            if (iv) {
              block = iv;
              this._iv = undefined2;
            } else {
              block = this._prevBlock;
            }
            for (var i = 0; i < blockSize; i++) {
              words2[offset + i] ^= block[i];
            }
          }
          return CBC2;
        }();
        var C_pad = C.pad = {};
        var Pkcs7 = C_pad.Pkcs7 = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
            var paddingWords = [];
            for (var i = 0; i < nPaddingBytes; i += 4) {
              paddingWords.push(paddingWord);
            }
            var padding = WordArray.create(paddingWords, nPaddingBytes);
            data.concat(padding);
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        var BlockCipher = C_lib.BlockCipher = Cipher.extend({
          cfg: Cipher.cfg.extend({
            mode: CBC,
            padding: Pkcs7
          }),
          reset: function() {
            var modeCreator;
            Cipher.reset.call(this);
            var cfg = this.cfg;
            var iv = cfg.iv;
            var mode = cfg.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              modeCreator = mode.createEncryptor;
            } else {
              modeCreator = mode.createDecryptor;
              this._minBufferSize = 1;
            }
            if (this._mode && this._mode.__creator == modeCreator) {
              this._mode.init(this, iv && iv.words);
            } else {
              this._mode = modeCreator.call(mode, this, iv && iv.words);
              this._mode.__creator = modeCreator;
            }
          },
          _doProcessBlock: function(words2, offset) {
            this._mode.processBlock(words2, offset);
          },
          _doFinalize: function() {
            var finalProcessedBlocks;
            var padding = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              padding.pad(this._data, this.blockSize);
              finalProcessedBlocks = this._process(true);
            } else {
              finalProcessedBlocks = this._process(true);
              padding.unpad(finalProcessedBlocks);
            }
            return finalProcessedBlocks;
          },
          blockSize: 128 / 32
        });
        var CipherParams = C_lib.CipherParams = Base.extend({
          init: function(cipherParams) {
            this.mixIn(cipherParams);
          },
          toString: function(formatter) {
            return (formatter || this.formatter).stringify(this);
          }
        });
        var C_format = C.format = {};
        var OpenSSLFormatter = C_format.OpenSSL = {
          stringify: function(cipherParams) {
            var wordArray;
            var ciphertext = cipherParams.ciphertext;
            var salt = cipherParams.salt;
            if (salt) {
              wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
            } else {
              wordArray = ciphertext;
            }
            return wordArray.toString(Base64);
          },
          parse: function(openSSLStr) {
            var salt;
            var ciphertext = Base64.parse(openSSLStr);
            var ciphertextWords = ciphertext.words;
            if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
              salt = WordArray.create(ciphertextWords.slice(2, 4));
              ciphertextWords.splice(0, 4);
              ciphertext.sigBytes -= 16;
            }
            return CipherParams.create({ ciphertext, salt });
          }
        };
        var SerializableCipher = C_lib.SerializableCipher = Base.extend({
          cfg: Base.extend({
            format: OpenSSLFormatter
          }),
          encrypt: function(cipher, message, key, cfg) {
            cfg = this.cfg.extend(cfg);
            var encryptor = cipher.createEncryptor(key, cfg);
            var ciphertext = encryptor.finalize(message);
            var cipherCfg = encryptor.cfg;
            return CipherParams.create({
              ciphertext,
              key,
              iv: cipherCfg.iv,
              algorithm: cipher,
              mode: cipherCfg.mode,
              padding: cipherCfg.padding,
              blockSize: cipher.blockSize,
              formatter: cfg.format
            });
          },
          decrypt: function(cipher, ciphertext, key, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
            return plaintext;
          },
          _parse: function(ciphertext, format) {
            if (typeof ciphertext == "string") {
              return format.parse(ciphertext, this);
            } else {
              return ciphertext;
            }
          }
        });
        var C_kdf = C.kdf = {};
        var OpenSSLKdf = C_kdf.OpenSSL = {
          execute: function(password, keySize, ivSize, salt) {
            if (!salt) {
              salt = WordArray.random(64 / 8);
            }
            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
            key.sigBytes = keySize * 4;
            return CipherParams.create({ key, iv, salt });
          }
        };
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
          cfg: SerializableCipher.cfg.extend({
            kdf: OpenSSLKdf
          }),
          encrypt: function(cipher, message, password, cfg) {
            cfg = this.cfg.extend(cfg);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
            cfg.iv = derivedParams.iv;
            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
            ciphertext.mixIn(derivedParams);
            return ciphertext;
          },
          decrypt: function(cipher, ciphertext, password, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
            cfg.iv = derivedParams.iv;
            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
            return plaintext;
          }
        });
      }();
    });
  }
});

// node_modules/crypto-js/aes.js
var require_aes = __commonJS({
  "node_modules/crypto-js/aes.js"(exports, module) {
    init_react();
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var SBOX = [];
        var INV_SBOX = [];
        var SUB_MIX_0 = [];
        var SUB_MIX_1 = [];
        var SUB_MIX_2 = [];
        var SUB_MIX_3 = [];
        var INV_SUB_MIX_0 = [];
        var INV_SUB_MIX_1 = [];
        var INV_SUB_MIX_2 = [];
        var INV_SUB_MIX_3 = [];
        (function() {
          var d = [];
          for (var i = 0; i < 256; i++) {
            if (i < 128) {
              d[i] = i << 1;
            } else {
              d[i] = i << 1 ^ 283;
            }
          }
          var x = 0;
          var xi = 0;
          for (var i = 0; i < 256; i++) {
            var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
            sx = sx >>> 8 ^ sx & 255 ^ 99;
            SBOX[x] = sx;
            INV_SBOX[sx] = x;
            var x2 = d[x];
            var x4 = d[x2];
            var x8 = d[x4];
            var t = d[sx] * 257 ^ sx * 16843008;
            SUB_MIX_0[x] = t << 24 | t >>> 8;
            SUB_MIX_1[x] = t << 16 | t >>> 16;
            SUB_MIX_2[x] = t << 8 | t >>> 24;
            SUB_MIX_3[x] = t;
            var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
            INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
            INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
            INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
            INV_SUB_MIX_3[sx] = t;
            if (!x) {
              x = xi = 1;
            } else {
              x = x2 ^ d[d[d[x8 ^ x2]]];
              xi ^= d[d[xi]];
            }
          }
        })();
        var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
        var AES = C_algo.AES = BlockCipher.extend({
          _doReset: function() {
            var t;
            if (this._nRounds && this._keyPriorReset === this._key) {
              return;
            }
            var key = this._keyPriorReset = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;
            var nRounds = this._nRounds = keySize + 6;
            var ksRows = (nRounds + 1) * 4;
            var keySchedule = this._keySchedule = [];
            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
              if (ksRow < keySize) {
                keySchedule[ksRow] = keyWords[ksRow];
              } else {
                t = keySchedule[ksRow - 1];
                if (!(ksRow % keySize)) {
                  t = t << 8 | t >>> 24;
                  t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                  t ^= RCON[ksRow / keySize | 0] << 24;
                } else if (keySize > 6 && ksRow % keySize == 4) {
                  t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                }
                keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
              }
            }
            var invKeySchedule = this._invKeySchedule = [];
            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
              var ksRow = ksRows - invKsRow;
              if (invKsRow % 4) {
                var t = keySchedule[ksRow];
              } else {
                var t = keySchedule[ksRow - 4];
              }
              if (invKsRow < 4 || ksRow <= 4) {
                invKeySchedule[invKsRow] = t;
              } else {
                invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
              }
            }
          },
          encryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
          },
          decryptBlock: function(M, offset) {
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
          },
          _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
            var nRounds = this._nRounds;
            var s0 = M[offset] ^ keySchedule[0];
            var s1 = M[offset + 1] ^ keySchedule[1];
            var s2 = M[offset + 2] ^ keySchedule[2];
            var s3 = M[offset + 3] ^ keySchedule[3];
            var ksRow = 4;
            for (var round = 1; round < nRounds; round++) {
              var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
              var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
              var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
              var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
              s0 = t0;
              s1 = t1;
              s2 = t2;
              s3 = t3;
            }
            var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
            var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
            var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
            var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
            M[offset] = t0;
            M[offset + 1] = t1;
            M[offset + 2] = t2;
            M[offset + 3] = t3;
          },
          keySize: 256 / 32
        });
        C.AES = BlockCipher._createHelper(AES);
      })();
      return CryptoJS.AES;
    });
  }
});

// node_modules/crypto-js/enc-utf8.js
var require_enc_utf8 = __commonJS({
  "node_modules/crypto-js/enc-utf8.js"(exports, module) {
    init_react();
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      return CryptoJS.enc.Utf8;
    });
  }
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    init_react();
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    function encode2(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize3(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode2(key) + "=" + encode2(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id2) {
      if (this.handlers[id2]) {
        this.handlers[id2] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name2) {
        if (name2 !== normalizedName && name2.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name2];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/axios/lib/core/enhanceError.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      };
      return error;
    };
  }
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/axios/lib/core/createError.js"(exports, module) {
    "use strict";
    init_react();
    var enhanceError = require_enhanceError();
    module.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    init_react();
    var createError = require_createError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name2, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name2 + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name2) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name2 + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name2) {
          this.write(name2, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    "use strict";
    init_react();
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/axios/lib/cancel/Cancel.js"(exports, module) {
    "use strict";
    init_react();
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module.exports = Cancel;
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || defaults.transitional;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var enhanceError = require_enhanceError();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw enhanceError(e, this, "E_JSON_PARSE");
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    var defaults = require_defaults();
    module.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new Cancel("canceled");
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module) {
    init_react();
    module.exports = {
      "version": "0.24.0"
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module) {
    "use strict";
    init_react();
    var VERSION = require_data().version;
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version17, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, " has been removed" + (version17 ? " in " + version17 : "")));
        }
        if (version17 && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(formatMessage(opt, " has been deprecated since v" + version17 + " and will be removed in the near future"));
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new TypeError("options must be an object");
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError("option " + opt + " must be " + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error("Unknown option " + opt);
        }
      }
    }
    module.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
    "use strict";
    init_react();
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = function isAxiosError(payload) {
      return typeof payload === "object" && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module) {
    "use strict";
    init_react();
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios = createInstance(defaults);
    axios.Axios = Axios;
    axios.Cancel = require_Cancel();
    axios.CancelToken = require_CancelToken();
    axios.isCancel = require_isCancel();
    axios.VERSION = require_data().version;
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require_spread();
    axios.isAxiosError = require_isAxiosError();
    module.exports = axios;
    module.exports.default = axios;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module) {
    init_react();
    module.exports = require_axios();
  }
});

// node_modules/@web3auth/core/dist/core.esm.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var import_loglevel, ADAPTER_CACHE_KEY, Web3AuthCore;
var init_core_esm = __esm({
  "node_modules/@web3auth/core/dist/core.esm.js"() {
    init_react();
    init_defineProperty();
    init_openloginJrpc_esm();
    init_base_esm();
    import_loglevel = __toESM(require_loglevel());
    ADAPTER_CACHE_KEY = "Web3Auth-cachedAdapter";
    Web3AuthCore = class extends SafeEventEmitter {
      constructor(options) {
        var _options$chainConfig, _options$chainConfig2, _options$chainConfig3, _options$chainConfig4;
        super();
        _defineProperty(this, "coreOptions", void 0);
        _defineProperty(this, "connectedAdapterName", null);
        _defineProperty(this, "status", ADAPTER_STATUS.NOT_READY);
        _defineProperty(this, "cachedAdapter", null);
        _defineProperty(this, "walletAdapters", {});
        if (!((_options$chainConfig = options.chainConfig) !== null && _options$chainConfig !== void 0 && _options$chainConfig.chainNamespace) || !Object.values(CHAIN_NAMESPACES).includes((_options$chainConfig2 = options.chainConfig) === null || _options$chainConfig2 === void 0 ? void 0 : _options$chainConfig2.chainNamespace))
          throw WalletInitializationError.invalidParams("Please provide a valid chainNamespace in chainConfig");
        this.cachedAdapter = storageAvailable("sessionStorage") ? window.sessionStorage.getItem(ADAPTER_CACHE_KEY) : null;
        this.coreOptions = _objectSpread(_objectSpread({}, options), {}, {
          chainConfig: _objectSpread(_objectSpread({}, getChainConfig((_options$chainConfig3 = options.chainConfig) === null || _options$chainConfig3 === void 0 ? void 0 : _options$chainConfig3.chainNamespace, (_options$chainConfig4 = options.chainConfig) === null || _options$chainConfig4 === void 0 ? void 0 : _options$chainConfig4.chainId)), options.chainConfig)
        });
        this.subscribeToAdapterEvents = this.subscribeToAdapterEvents.bind(this);
      }
      get provider() {
        if (this.status === ADAPTER_STATUS.CONNECTED && this.connectedAdapterName) {
          const adapter = this.walletAdapters[this.connectedAdapterName];
          return adapter.provider;
        }
        return null;
      }
      set provider(_) {
        throw new Error("Not implemented");
      }
      async init() {
        const initPromises = Object.keys(this.walletAdapters).map((adapterName) => {
          this.subscribeToAdapterEvents(this.walletAdapters[adapterName]);
          if (!this.walletAdapters[adapterName].chainConfigProxy) {
            const providedChainConfig = this.coreOptions.chainConfig;
            if (!providedChainConfig.chainNamespace)
              throw WalletInitializationError.invalidParams("Please provide chainNamespace in chainConfig");
            const chainConfig = _objectSpread(_objectSpread({}, getChainConfig(providedChainConfig.chainNamespace, providedChainConfig.chainId)), providedChainConfig);
            this.walletAdapters[adapterName].setChainConfig(chainConfig);
          }
          return this.walletAdapters[adapterName].init({
            autoConnect: this.cachedAdapter === adapterName
          }).catch((e) => import_loglevel.default.error(e));
        });
        this.status = ADAPTER_STATUS.READY;
        await Promise.all(initPromises);
      }
      configureAdapter(adapter) {
        this.checkInitRequirements();
        const providedChainConfig = this.coreOptions.chainConfig;
        if (!providedChainConfig.chainNamespace)
          throw WalletInitializationError.invalidParams("Please provide chainNamespace in chainConfig");
        const adapterAlreadyExists = this.walletAdapters[adapter.name];
        if (adapterAlreadyExists)
          throw WalletInitializationError.duplicateAdapterError("Wallet adapter for ".concat(adapter.name, " already exists"));
        if (adapter.adapterNamespace !== ADAPTER_NAMESPACES.MULTICHAIN && adapter.adapterNamespace !== providedChainConfig.chainNamespace)
          throw WalletInitializationError.incompatibleChainNameSpace("This wallet adapter belongs to ".concat(adapter.adapterNamespace, " which is incompatible with currently used namespace: ").concat(providedChainConfig.chainNamespace));
        if (adapter.adapterNamespace === ADAPTER_NAMESPACES.MULTICHAIN && adapter.currentChainNamespace && providedChainConfig.chainNamespace !== adapter.currentChainNamespace) {
          adapter.setChainConfig(providedChainConfig);
        }
        this.walletAdapters[adapter.name] = adapter;
        return this;
      }
      clearCache() {
        if (!storageAvailable("sessionStorage"))
          return;
        window.sessionStorage.removeItem(ADAPTER_CACHE_KEY);
        this.cachedAdapter = null;
      }
      async connectTo(walletName, loginParams) {
        if (!this.walletAdapters[walletName])
          throw WalletInitializationError.notFound("Please add wallet adapter for ".concat(walletName, " wallet, before connecting"));
        return this.walletAdapters[walletName].connect(loginParams);
      }
      async logout() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
          cleanup: false
        };
        if (this.status !== ADAPTER_STATUS.CONNECTED || !this.connectedAdapterName)
          throw WalletLoginError.notConnectedError("No wallet is connected");
        await this.walletAdapters[this.connectedAdapterName].disconnect(options);
      }
      async getUserInfo() {
        import_loglevel.default.debug("Getting user info", this.status, this.connectedAdapterName);
        if (this.status !== ADAPTER_STATUS.CONNECTED || !this.connectedAdapterName)
          throw WalletLoginError.notConnectedError("No wallet is connected");
        return this.walletAdapters[this.connectedAdapterName].getUserInfo();
      }
      subscribeToAdapterEvents(walletAdapter) {
        walletAdapter.on(ADAPTER_EVENTS.CONNECTED, (data) => {
          this.status = ADAPTER_STATUS.CONNECTED;
          this.connectedAdapterName = data.adapter;
          this.cacheWallet(data.adapter);
          this.emit(ADAPTER_EVENTS.CONNECTED, _objectSpread({}, data));
          import_loglevel.default.debug("connected", this.status, this.connectedAdapterName);
        });
        walletAdapter.on(ADAPTER_EVENTS.DISCONNECTED, (data) => {
          this.status = ADAPTER_STATUS.READY;
          this.emit(ADAPTER_EVENTS.DISCONNECTED, data);
          if (storageAvailable("sessionStorage")) {
            const cachedAdapter = window.sessionStorage.getItem(ADAPTER_CACHE_KEY);
            if (this.connectedAdapterName === cachedAdapter) {
              this.clearCache();
            }
          }
          import_loglevel.default.debug("disconnected", this.status, this.connectedAdapterName);
        });
        walletAdapter.on(ADAPTER_EVENTS.CONNECTING, (data) => {
          this.status = ADAPTER_STATUS.CONNECTING;
          this.emit(ADAPTER_EVENTS.CONNECTING, data);
          import_loglevel.default.debug("connecting", this.status, this.connectedAdapterName);
        });
        walletAdapter.on(ADAPTER_EVENTS.ERRORED, (data) => {
          this.status = ADAPTER_STATUS.ERRORED;
          this.clearCache();
          this.emit(ADAPTER_EVENTS.ERRORED, data);
          import_loglevel.default.debug("errored", this.status, this.connectedAdapterName);
        });
        walletAdapter.on(ADAPTER_EVENTS.ADAPTER_DATA_UPDATED, (data) => {
          import_loglevel.default.debug("adapter data updated", data);
          this.emit(ADAPTER_EVENTS.ADAPTER_DATA_UPDATED, data);
        });
      }
      checkInitRequirements() {
        if (this.status === ADAPTER_STATUS.CONNECTING)
          throw WalletInitializationError.notReady("Already pending connection");
        if (this.status === ADAPTER_STATUS.CONNECTED)
          throw WalletInitializationError.notReady("Already connected");
        if (this.status === ADAPTER_STATUS.READY)
          throw WalletInitializationError.notReady("Adapter is already initialized");
      }
      cacheWallet(walletName) {
        if (!storageAvailable("sessionStorage"))
          return;
        window.sessionStorage.setItem(ADAPTER_CACHE_KEY, walletName);
        this.cachedAdapter = walletName;
      }
    };
  }
});

// node_modules/lodash.clonedeep/index.js
var require_lodash2 = __commonJS({
  "node_modules/lodash.clonedeep/index.js"(exports, module) {
    init_react();
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reFlags = /\w*$/;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    function addMapEntry(map, pair) {
      map.set(pair[0], pair[1]);
      return map;
    }
    function addSetEntry(set, value) {
      set.add(value);
      return set;
    }
    function arrayEach(array, iteratee) {
      var index = -1, length = array ? array.length : 0;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array ? array.length : 0;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Buffer = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectCreate = Object.create;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap2 = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    function stackClear() {
      this.__data__ = new ListCache();
    }
    function stackDelete(key) {
      return this.__data__["delete"](key);
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }
        cache = this.__data__ = new MapCache(pairs);
      }
      cache.set(key, value);
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        object[key] = value;
      }
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }
    function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object) {
          if (isHostObject(value)) {
            return object ? value : {};
          }
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (!isArr) {
        var props = isFull ? getAllKeys(value) : keys(value);
      }
      arrayEach(props || value, function(subValue, key2) {
        if (props) {
          key2 = subValue;
          subValue = value[key2];
        }
        assignValue(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack));
      });
      return result;
    }
    function baseCreate(proto) {
      return isObject(proto) ? objectCreate(proto) : {};
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
      return objectToString.call(value);
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
      return result;
    }
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
      return arrayReduce(array, addMapEntry, new map.constructor());
    }
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
      return arrayReduce(array, addSetEntry, new set.constructor());
    }
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    function copyArray(source, array) {
      var index = -1, length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    function copyObject(source, props, object, customizer) {
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        assignValue(object, key, newValue === void 0 ? source[key] : newValue);
      }
      return object;
    }
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function initCloneArray(array) {
      var length = array.length, result = array.constructor(length);
      if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    function initCloneByTag(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case dataViewTag:
          return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);
        case mapTag:
          return cloneMap(object, isDeep, cloneFunc);
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          return cloneRegExp(object);
        case setTag:
          return cloneSet(object, isDeep, cloneFunc);
        case symbolTag:
          return cloneSymbol(object);
      }
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function cloneDeep2(value) {
      return baseClone(value, true, true);
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module.exports = cloneDeep2;
  }
});

// node_modules/qr.js/lib/mode.js
var require_mode = __commonJS({
  "node_modules/qr.js/lib/mode.js"(exports, module) {
    init_react();
    module.exports = {
      MODE_NUMBER: 1 << 0,
      MODE_ALPHA_NUM: 1 << 1,
      MODE_8BIT_BYTE: 1 << 2,
      MODE_KANJI: 1 << 3
    };
  }
});

// node_modules/qr.js/lib/8BitByte.js
var require_BitByte = __commonJS({
  "node_modules/qr.js/lib/8BitByte.js"(exports, module) {
    init_react();
    var mode = require_mode();
    function QR8bitByte(data) {
      this.mode = mode.MODE_8BIT_BYTE;
      this.data = data;
    }
    QR8bitByte.prototype = {
      getLength: function(buffer) {
        return this.data.length;
      },
      write: function(buffer) {
        for (var i = 0; i < this.data.length; i++) {
          buffer.put(this.data.charCodeAt(i), 8);
        }
      }
    };
    module.exports = QR8bitByte;
  }
});

// node_modules/qr.js/lib/ErrorCorrectLevel.js
var require_ErrorCorrectLevel = __commonJS({
  "node_modules/qr.js/lib/ErrorCorrectLevel.js"(exports, module) {
    init_react();
    module.exports = {
      L: 1,
      M: 0,
      Q: 3,
      H: 2
    };
  }
});

// node_modules/qr.js/lib/RSBlock.js
var require_RSBlock = __commonJS({
  "node_modules/qr.js/lib/RSBlock.js"(exports, module) {
    init_react();
    var ECL = require_ErrorCorrectLevel();
    function QRRSBlock(totalCount, dataCount) {
      this.totalCount = totalCount;
      this.dataCount = dataCount;
    }
    QRRSBlock.RS_BLOCK_TABLE = [
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12],
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];
    QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
      var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
      if (rsBlock == void 0) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
      }
      var length = rsBlock.length / 3;
      var list = new Array();
      for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];
        for (var j = 0; j < count; j++) {
          list.push(new QRRSBlock(totalCount, dataCount));
        }
      }
      return list;
    };
    QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
      switch (errorCorrectLevel) {
        case ECL.L:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case ECL.M:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case ECL.Q:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case ECL.H:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    module.exports = QRRSBlock;
  }
});

// node_modules/qr.js/lib/BitBuffer.js
var require_BitBuffer = __commonJS({
  "node_modules/qr.js/lib/BitBuffer.js"(exports, module) {
    init_react();
    function QRBitBuffer() {
      this.buffer = new Array();
      this.length = 0;
    }
    QRBitBuffer.prototype = {
      get: function(index) {
        var bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
      },
      put: function(num, length) {
        for (var i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) == 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module.exports = QRBitBuffer;
  }
});

// node_modules/qr.js/lib/math.js
var require_math = __commonJS({
  "node_modules/qr.js/lib/math.js"(exports, module) {
    init_react();
    var QRMath = {
      glog: function(n) {
        if (n < 1) {
          throw new Error("glog(" + n + ")");
        }
        return QRMath.LOG_TABLE[n];
      },
      gexp: function(n) {
        while (n < 0) {
          n += 255;
        }
        while (n >= 256) {
          n -= 255;
        }
        return QRMath.EXP_TABLE[n];
      },
      EXP_TABLE: new Array(256),
      LOG_TABLE: new Array(256)
    };
    for (i = 0; i < 8; i++) {
      QRMath.EXP_TABLE[i] = 1 << i;
    }
    var i;
    for (i = 8; i < 256; i++) {
      QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
    }
    var i;
    for (i = 0; i < 255; i++) {
      QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
    }
    var i;
    module.exports = QRMath;
  }
});

// node_modules/qr.js/lib/Polynomial.js
var require_Polynomial = __commonJS({
  "node_modules/qr.js/lib/Polynomial.js"(exports, module) {
    init_react();
    var math = require_math();
    function QRPolynomial(num, shift) {
      if (num.length == void 0) {
        throw new Error(num.length + "/" + shift);
      }
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset++;
      }
      this.num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i++) {
        this.num[i] = num[i + offset];
      }
    }
    QRPolynomial.prototype = {
      get: function(index) {
        return this.num[index];
      },
      getLength: function() {
        return this.num.length;
      },
      multiply: function(e) {
        var num = new Array(this.getLength() + e.getLength() - 1);
        for (var i = 0; i < this.getLength(); i++) {
          for (var j = 0; j < e.getLength(); j++) {
            num[i + j] ^= math.gexp(math.glog(this.get(i)) + math.glog(e.get(j)));
          }
        }
        return new QRPolynomial(num, 0);
      },
      mod: function(e) {
        if (this.getLength() - e.getLength() < 0) {
          return this;
        }
        var ratio = math.glog(this.get(0)) - math.glog(e.get(0));
        var num = new Array(this.getLength());
        for (var i = 0; i < this.getLength(); i++) {
          num[i] = this.get(i);
        }
        for (var i = 0; i < e.getLength(); i++) {
          num[i] ^= math.gexp(math.glog(e.get(i)) + ratio);
        }
        return new QRPolynomial(num, 0).mod(e);
      }
    };
    module.exports = QRPolynomial;
  }
});

// node_modules/qr.js/lib/util.js
var require_util = __commonJS({
  "node_modules/qr.js/lib/util.js"(exports, module) {
    init_react();
    var Mode = require_mode();
    var Polynomial = require_Polynomial();
    var math = require_math();
    var QRMaskPattern = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var QRUtil = {
      PATTERN_POSITION_TABLE: [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
      ],
      G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
      G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
      G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
      getBCHTypeInfo: function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
          d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
        }
        return (data << 10 | d) ^ QRUtil.G15_MASK;
      },
      getBCHTypeNumber: function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
          d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
        }
        return data << 12 | d;
      },
      getBCHDigit: function(data) {
        var digit = 0;
        while (data != 0) {
          digit++;
          data >>>= 1;
        }
        return digit;
      },
      getPatternPosition: function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
      },
      getMask: function(maskPattern, i, j) {
        switch (maskPattern) {
          case QRMaskPattern.PATTERN000:
            return (i + j) % 2 == 0;
          case QRMaskPattern.PATTERN001:
            return i % 2 == 0;
          case QRMaskPattern.PATTERN010:
            return j % 3 == 0;
          case QRMaskPattern.PATTERN011:
            return (i + j) % 3 == 0;
          case QRMaskPattern.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
          case QRMaskPattern.PATTERN101:
            return i * j % 2 + i * j % 3 == 0;
          case QRMaskPattern.PATTERN110:
            return (i * j % 2 + i * j % 3) % 2 == 0;
          case QRMaskPattern.PATTERN111:
            return (i * j % 3 + (i + j) % 2) % 2 == 0;
          default:
            throw new Error("bad maskPattern:" + maskPattern);
        }
      },
      getErrorCorrectPolynomial: function(errorCorrectLength) {
        var a = new Polynomial([1], 0);
        for (var i = 0; i < errorCorrectLength; i++) {
          a = a.multiply(new Polynomial([1, math.gexp(i)], 0));
        }
        return a;
      },
      getLengthInBits: function(mode, type) {
        if (1 <= type && type < 10) {
          switch (mode) {
            case Mode.MODE_NUMBER:
              return 10;
            case Mode.MODE_ALPHA_NUM:
              return 9;
            case Mode.MODE_8BIT_BYTE:
              return 8;
            case Mode.MODE_KANJI:
              return 8;
            default:
              throw new Error("mode:" + mode);
          }
        } else if (type < 27) {
          switch (mode) {
            case Mode.MODE_NUMBER:
              return 12;
            case Mode.MODE_ALPHA_NUM:
              return 11;
            case Mode.MODE_8BIT_BYTE:
              return 16;
            case Mode.MODE_KANJI:
              return 10;
            default:
              throw new Error("mode:" + mode);
          }
        } else if (type < 41) {
          switch (mode) {
            case Mode.MODE_NUMBER:
              return 14;
            case Mode.MODE_ALPHA_NUM:
              return 13;
            case Mode.MODE_8BIT_BYTE:
              return 16;
            case Mode.MODE_KANJI:
              return 12;
            default:
              throw new Error("mode:" + mode);
          }
        } else {
          throw new Error("type:" + type);
        }
      },
      getLostPoint: function(qrCode) {
        var moduleCount = qrCode.getModuleCount();
        var lostPoint = 0;
        for (var row = 0; row < moduleCount; row++) {
          for (var col = 0; col < moduleCount; col++) {
            var sameCount = 0;
            var dark = qrCode.isDark(row, col);
            for (var r = -1; r <= 1; r++) {
              if (row + r < 0 || moduleCount <= row + r) {
                continue;
              }
              for (var c = -1; c <= 1; c++) {
                if (col + c < 0 || moduleCount <= col + c) {
                  continue;
                }
                if (r == 0 && c == 0) {
                  continue;
                }
                if (dark == qrCode.isDark(row + r, col + c)) {
                  sameCount++;
                }
              }
            }
            if (sameCount > 5) {
              lostPoint += 3 + sameCount - 5;
            }
          }
        }
        for (var row = 0; row < moduleCount - 1; row++) {
          for (var col = 0; col < moduleCount - 1; col++) {
            var count = 0;
            if (qrCode.isDark(row, col))
              count++;
            if (qrCode.isDark(row + 1, col))
              count++;
            if (qrCode.isDark(row, col + 1))
              count++;
            if (qrCode.isDark(row + 1, col + 1))
              count++;
            if (count == 0 || count == 4) {
              lostPoint += 3;
            }
          }
        }
        for (var row = 0; row < moduleCount; row++) {
          for (var col = 0; col < moduleCount - 6; col++) {
            if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
              lostPoint += 40;
            }
          }
        }
        for (var col = 0; col < moduleCount; col++) {
          for (var row = 0; row < moduleCount - 6; row++) {
            if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
              lostPoint += 40;
            }
          }
        }
        var darkCount = 0;
        for (var col = 0; col < moduleCount; col++) {
          for (var row = 0; row < moduleCount; row++) {
            if (qrCode.isDark(row, col)) {
              darkCount++;
            }
          }
        }
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;
        return lostPoint;
      }
    };
    module.exports = QRUtil;
  }
});

// node_modules/qr.js/lib/QRCode.js
var require_QRCode = __commonJS({
  "node_modules/qr.js/lib/QRCode.js"(exports, module) {
    init_react();
    var BitByte = require_BitByte();
    var RSBlock = require_RSBlock();
    var BitBuffer = require_BitBuffer();
    var util = require_util();
    var Polynomial = require_Polynomial();
    function QRCode2(typeNumber, errorCorrectLevel) {
      this.typeNumber = typeNumber;
      this.errorCorrectLevel = errorCorrectLevel;
      this.modules = null;
      this.moduleCount = 0;
      this.dataCache = null;
      this.dataList = [];
    }
    var proto = QRCode2.prototype;
    proto.addData = function(data) {
      var newData = new BitByte(data);
      this.dataList.push(newData);
      this.dataCache = null;
    };
    proto.isDark = function(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
      }
      return this.modules[row][col];
    };
    proto.getModuleCount = function() {
      return this.moduleCount;
    };
    proto.make = function() {
      if (this.typeNumber < 1) {
        var typeNumber = 1;
        for (typeNumber = 1; typeNumber < 40; typeNumber++) {
          var rsBlocks = RSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
          var buffer = new BitBuffer();
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }
          for (var i = 0; i < this.dataList.length; i++) {
            var data = this.dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
          }
          if (buffer.getLengthInBits() <= totalDataCount * 8)
            break;
        }
        this.typeNumber = typeNumber;
      }
      this.makeImpl(false, this.getBestMaskPattern());
    };
    proto.makeImpl = function(test, maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (var row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
        for (var col = 0; col < this.moduleCount; col++) {
          this.modules[row][col] = null;
        }
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
      }
      if (this.dataCache == null) {
        this.dataCache = QRCode2.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
      }
      this.mapData(this.dataCache, maskPattern);
    };
    proto.setupPositionProbePattern = function(row, col) {
      for (var r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r)
          continue;
        for (var c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c)
            continue;
          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    };
    proto.getBestMaskPattern = function() {
      var minLostPoint = 0;
      var pattern = 0;
      for (var i = 0; i < 8; i++) {
        this.makeImpl(true, i);
        var lostPoint = util.getLostPoint(this);
        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }
      return pattern;
    };
    proto.createMovieClip = function(target_mc, instance_name, depth) {
      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
      var cs = 1;
      this.make();
      for (var row = 0; row < this.modules.length; row++) {
        var y = row * cs;
        for (var col = 0; col < this.modules[row].length; col++) {
          var x = col * cs;
          var dark = this.modules[row][col];
          if (dark) {
            qr_mc.beginFill(0, 100);
            qr_mc.moveTo(x, y);
            qr_mc.lineTo(x + cs, y);
            qr_mc.lineTo(x + cs, y + cs);
            qr_mc.lineTo(x, y + cs);
            qr_mc.endFill();
          }
        }
      }
      return qr_mc;
    };
    proto.setupTimingPattern = function() {
      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
      }
      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
          continue;
        }
        this.modules[6][c] = c % 2 == 0;
      }
    };
    proto.setupPositionAdjustPattern = function() {
      var pos = util.getPatternPosition(this.typeNumber);
      for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
          var row = pos[i];
          var col = pos[j];
          if (this.modules[row][col] != null) {
            continue;
          }
          for (var r = -2; r <= 2; r++) {
            for (var c = -2; c <= 2; c++) {
              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    };
    proto.setupTypeNumber = function(test) {
      var bits = util.getBCHTypeNumber(this.typeNumber);
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      }
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    };
    proto.setupTypeInfo = function(test, maskPattern) {
      var data = this.errorCorrectLevel << 3 | maskPattern;
      var bits = util.getBCHTypeInfo(data);
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
      }
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }
      this.modules[this.moduleCount - 8][8] = !test;
    };
    proto.mapData = function(data, maskPattern) {
      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6)
          col--;
        while (true) {
          for (var c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              var dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }
              var mask = util.getMask(maskPattern, row, col - c);
              if (mask) {
                dark = !dark;
              }
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    };
    QRCode2.PAD0 = 236;
    QRCode2.PAD1 = 17;
    QRCode2.createData = function(typeNumber, errorCorrectLevel, dataList) {
      var rsBlocks = RSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
      var buffer = new BitBuffer();
      for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber));
        data.write(buffer);
      }
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i++) {
        totalDataCount += rsBlocks[i].dataCount;
      }
      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
      }
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }
      while (true) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCode2.PAD0, 8);
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCode2.PAD1, 8);
      }
      return QRCode2.createBytes(buffer, rsBlocks);
    };
    QRCode2.createBytes = function(buffer, rsBlocks) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i = 0; i < dcdata[r].length; i++) {
          dcdata[r][i] = 255 & buffer.buffer[i + offset];
        }
        offset += dcCount;
        var rsPoly = util.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new Polynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i++) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }
      var totalCodeCount = 0;
      for (var i = 0; i < rsBlocks.length; i++) {
        totalCodeCount += rsBlocks[i].totalCount;
      }
      var data = new Array(totalCodeCount);
      var index = 0;
      for (var i = 0; i < maxDcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < dcdata[r].length) {
            data[index++] = dcdata[r][i];
          }
        }
      }
      for (var i = 0; i < maxEcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < ecdata[r].length) {
            data[index++] = ecdata[r][i];
          }
        }
      }
      return data;
    };
    module.exports = QRCode2;
  }
});

// node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js"(exports) {
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
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment3 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
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
        function isElement(object) {
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
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment3;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
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

// node_modules/prop-types/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/prop-types/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    init_react();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    init_react();
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    init_react();
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    init_react();
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    init_react();
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
                printWarning("You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.");
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."), { expectedType });
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).");
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + ".");
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError((componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`.");
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    init_react();
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/react-qr-code/lib/components/QRCodeCell/index.js
var require_QRCodeCell = __commonJS({
  "node_modules/react-qr-code/lib/components/QRCodeCell/index.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var propTypes = {
      d: _propTypes2.default.string.isRequired,
      fill: _propTypes2.default.string.isRequired,
      transformX: _propTypes2.default.number.isRequired,
      transformY: _propTypes2.default.number.isRequired
    };
    var defaultProps = {};
    var QRCodeCell = function QRCodeCell2(_ref) {
      var d = _ref.d, fill = _ref.fill, transformX = _ref.transformX, transformY = _ref.transformY;
      return _react2.default.createElement("path", { d, fill, transform: "matrix(" + [1, 0, 0, 1, transformX, transformY] + ")" });
    };
    QRCodeCell.propTypes = propTypes;
    QRCodeCell.defaultProps = defaultProps;
    exports.default = QRCodeCell;
  }
});

// node_modules/react-qr-code/lib/components/QRCodeSurface/index.js
var require_QRCodeSurface = __commonJS({
  "node_modules/react-qr-code/lib/components/QRCodeSurface/index.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    var propTypes = {
      children: _propTypes2.default.array.isRequired,
      size: _propTypes2.default.number.isRequired,
      title: _propTypes2.default.string,
      xmlns: _propTypes2.default.string
    };
    var defaultProps = {
      title: void 0,
      xmlns: "http://www.w3.org/2000/svg"
    };
    var QRCodeSurface = function QRCodeSurface2(_ref) {
      var children = _ref.children, size = _ref.size, title = _ref.title, xmlns = _ref.xmlns, props = _objectWithoutProperties(_ref, ["children", "size", "title", "xmlns"]);
      return _react2.default.createElement("svg", _extends({}, props, { height: size, width: size, xmlns }), title ? _react2.default.createElement("title", null, title) : null, children);
    };
    QRCodeSurface.propTypes = propTypes;
    QRCodeSurface.defaultProps = defaultProps;
    exports.default = QRCodeSurface;
  }
});

// node_modules/react-qr-code/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-qr-code/lib/index.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _QRCode = require_QRCode();
    var _QRCode2 = _interopRequireDefault(_QRCode);
    var _ErrorCorrectLevel = require_ErrorCorrectLevel();
    var _ErrorCorrectLevel2 = _interopRequireDefault(_ErrorCorrectLevel);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _QRCodeCell = require_QRCodeCell();
    var _QRCodeCell2 = _interopRequireDefault(_QRCodeCell);
    var _QRCodeSurface = require_QRCodeSurface();
    var _QRCodeSurface2 = _interopRequireDefault(_QRCodeSurface);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    var propTypes = {
      bgColor: _propTypes2.default.string,
      fgColor: _propTypes2.default.string,
      level: _propTypes2.default.oneOf(["L", "M", "Q", "H"]),
      size: _propTypes2.default.number,
      value: _propTypes2.default.string.isRequired
    };
    var defaultProps = {
      bgColor: "#FFFFFF",
      fgColor: "#000000",
      level: "L",
      size: 256
    };
    var QRCode2 = function QRCode3(_ref) {
      var bgColor = _ref.bgColor, fgColor = _ref.fgColor, level = _ref.level, size = _ref.size, value = _ref.value, props = _objectWithoutProperties(_ref, ["bgColor", "fgColor", "level", "size", "value"]);
      var qrcode = new _QRCode2.default(-1, _ErrorCorrectLevel2.default[level]);
      qrcode.addData(value);
      qrcode.make();
      var cells = qrcode.modules;
      var tileSize = size / cells.length;
      return _react2.default.createElement(_QRCodeSurface2.default, _extends({}, props, { size }), cells.map(function(row, rowIndex) {
        return row.map(function(cell, cellIndex) {
          var fill = cell ? fgColor : bgColor;
          var transformX = Math.round(cellIndex * tileSize);
          var transformY = Math.round(rowIndex * tileSize);
          var qrItemWidth = Math.round((cellIndex + 1) * tileSize) - transformX;
          var qrItemHeight = Math.round((rowIndex + 1) * tileSize) - transformY;
          var d = "M 0 0 L " + qrItemWidth + " 0 L " + qrItemWidth + " " + qrItemHeight + " L 0 " + qrItemHeight + " Z";
          return _react2.default.createElement(_QRCodeCell2.default, {
            key: "rectangle-" + rowIndex + "-" + cellIndex,
            d,
            fill,
            transformX,
            transformY
          });
        });
      }));
    };
    QRCode2.propTypes = propTypes;
    QRCode2.defaultProps = defaultProps;
    exports.default = (0, _react.memo)(QRCode2);
  }
});

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    init_react();
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      function classNames2() {
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (!arg)
            continue;
          var argType = typeof arg;
          if (argType === "string" || argType === "number") {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            if (arg.length) {
              var inner = classNames2.apply(null, arg);
              if (inner) {
                classes.push(inner);
              }
            }
          } else if (argType === "object") {
            if (arg.toString === Object.prototype.toString) {
              for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                  classes.push(key);
                }
              }
            } else {
              classes.push(arg.toString());
            }
          }
        }
        return classes.join(" ");
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames2.default = classNames2;
        module.exports = classNames2;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames2;
        });
      } else {
        window.classNames = classNames2;
      }
    })();
  }
});

// node_modules/@web3auth/ui/dist/ui.esm.js
function styleInject(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
function Icon(props) {
  const {
    iconName,
    height = "auto",
    width = "auto"
  } = props;
  return icons[iconName] ? (0, import_jsx_runtime.jsx)("img", {
    height,
    width,
    src: icons[iconName].image,
    alt: iconName
  }, void 0) : null;
}
function Image(props) {
  const {
    imageId,
    height = "auto",
    width = "auto"
  } = props;
  return (0, import_jsx_runtime.jsx)("img", {
    src: "https://images.web3auth.io/".concat(imageId, ".svg"),
    height,
    width,
    alt: imageId
  }, void 0);
}
function DetailedLoader(props) {
  const {
    adapter,
    appLogo = DEFAULT_LOGO_URL$2,
    message,
    modalStatus,
    onClose
  } = props;
  const web3authIcon = (0, import_jsx_runtime.jsx)(Image, {
    imageId: "web3auth"
  }, void 0);
  const providerIcon = (0, import_jsx_runtime.jsx)(Image, {
    imageId: "login-".concat(adapter)
  }, void 0);
  (0, import_react.useEffect)(() => {
    import_loglevel2.default.debug("adapter loader re-rendering");
    if (modalStatus === MODAL_STATUS.CONNECTED) {
      setTimeout(() => {
        onClose();
      }, 3e3);
    }
  }, [modalStatus, onClose]);
  return modalStatus !== MODAL_STATUS.INITIALIZED ? (0, import_jsx_runtime.jsxs)("div", {
    className: "w3ajs-modal-loader w3a-modal__loader",
    children: [(0, import_jsx_runtime.jsxs)("div", {
      className: "w3a-modal__loader-content",
      children: [(0, import_jsx_runtime.jsxs)("div", {
        className: "w3a-modal__loader-info",
        children: [modalStatus === MODAL_STATUS.CONNECTING && (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
          children: [(0, import_jsx_runtime.jsxs)("div", {
            className: "w3a-modal__loader-bridge",
            children: [(0, import_jsx_runtime.jsx)("div", {
              className: "w3a-modal__loader-app-logo",
              children: (0, import_jsx_runtime.jsx)("img", {
                src: appLogo,
                alt: ""
              }, void 0)
            }, void 0), (0, import_jsx_runtime.jsx)("div", {
              className: "w3a-modal__connector",
              children: (0, import_jsx_runtime.jsxs)("div", {
                className: "w3a-modal__connector-beat",
                children: [(0, import_jsx_runtime.jsx)("div", {}, void 0), (0, import_jsx_runtime.jsx)("div", {}, void 0), (0, import_jsx_runtime.jsx)("div", {}, void 0), (0, import_jsx_runtime.jsx)("div", {}, void 0), (0, import_jsx_runtime.jsx)("div", {}, void 0)]
              }, void 0)
            }, void 0), (0, import_jsx_runtime.jsx)("div", {
              className: "w3a-modal__loader-adapter",
              children: providerIcon
            }, void 0)]
          }, void 0), (0, import_jsx_runtime.jsx)("div", {
            children: (0, import_jsx_runtime.jsxs)("div", {
              className: "w3a-modal__loader-bridge-message",
              children: ["Verify on your ", (0, import_jsx_runtime.jsx)("span", {
                children: adapter
              }, void 0), " account to continue"]
            }, void 0)
          }, void 0)]
        }, void 0), modalStatus === ADAPTER_STATUS.CONNECTED && (0, import_jsx_runtime.jsx)("div", {
          className: "w3ajs-modal-loader__message w3a-spinner-message",
          children: message
        }, void 0), modalStatus === ADAPTER_STATUS.ERRORED && (0, import_jsx_runtime.jsx)("div", {
          className: "w3ajs-modal-loader__message w3a-spinner-message w3a-spinner-message--error",
          children: message
        }, void 0)]
      }, void 0), (0, import_jsx_runtime.jsxs)("div", {
        className: "w3a-spinner-power",
        children: [(0, import_jsx_runtime.jsx)("div", {
          children: "Secured by"
        }, void 0), web3authIcon]
      }, void 0)]
    }, void 0), (modalStatus === ADAPTER_STATUS.CONNECTED || modalStatus === ADAPTER_STATUS.ERRORED) && (0, import_jsx_runtime.jsx)("button", {
      type: "button",
      className: "w3a-header__button w3ajs-loader-close-btn",
      onClick: onClose,
      children: closeIcon$1
    }, void 0)]
  }, void 0) : null;
}
function Loader(props) {
  const {
    message,
    modalStatus,
    label,
    onClose,
    canEmit = true
  } = props;
  const web3authIcon = (0, import_jsx_runtime.jsx)(Image, {
    imageId: "web3auth"
  }, void 0);
  (0, import_react.useEffect)(() => {
    import_loglevel2.default.debug("loader re-rendering");
    if (modalStatus === MODAL_STATUS.CONNECTED && canEmit) {
      setTimeout(() => {
        onClose();
      }, 3e3);
    }
  }, [canEmit, modalStatus, onClose]);
  return modalStatus !== MODAL_STATUS.INITIALIZED ? (0, import_jsx_runtime.jsxs)("div", {
    className: "w3ajs-modal-loader w3a-modal__loader",
    children: [(0, import_jsx_runtime.jsxs)("div", {
      className: "w3a-modal__loader-content",
      children: [(0, import_jsx_runtime.jsxs)("div", {
        className: "w3a-modal__loader-info",
        children: [modalStatus === MODAL_STATUS.CONNECTING && (0, import_jsx_runtime.jsxs)("div", {
          className: "w3ajs-modal-loader__spinner w3a-spinner",
          children: [(0, import_jsx_runtime.jsx)("div", {}, void 0), (0, import_jsx_runtime.jsx)("div", {}, void 0), (0, import_jsx_runtime.jsx)("div", {}, void 0), (0, import_jsx_runtime.jsx)("div", {}, void 0)]
        }, void 0), (0, import_jsx_runtime.jsx)("div", {
          className: "w3ajs-modal-loader__label w3a-spinner-label",
          children: label
        }, void 0), modalStatus === ADAPTER_STATUS.CONNECTED && (0, import_jsx_runtime.jsx)("div", {
          className: "w3ajs-modal-loader__message w3a-spinner-message",
          children: message
        }, void 0), modalStatus === ADAPTER_STATUS.ERRORED && (0, import_jsx_runtime.jsx)("div", {
          className: "w3ajs-modal-loader__message w3a-spinner-message w3a-spinner-message--error",
          children: message
        }, void 0)]
      }, void 0), (0, import_jsx_runtime.jsxs)("div", {
        className: "w3a-spinner-power",
        children: [(0, import_jsx_runtime.jsx)("div", {
          children: "Secured by"
        }, void 0), web3authIcon]
      }, void 0)]
    }, void 0), (modalStatus === ADAPTER_STATUS.CONNECTED || modalStatus === ADAPTER_STATUS.ERRORED) && (0, import_jsx_runtime.jsx)("button", {
      type: "button",
      className: "w3a-header__button w3ajs-loader-close-btn",
      onClick: onClose,
      children: closeIcon
    }, void 0)]
  }, void 0) : null;
}
function WalletConnect(props) {
  const {
    walletConnectUri
  } = props;
  return (0, import_jsx_runtime.jsxs)("div", {
    className: "w3ajs-wallet-connect w3a-wallet-connect",
    children: [(0, import_jsx_runtime.jsx)("i", {
      className: "w3a-wallet-connect__logo",
      children: walletConnectIcon
    }, void 0), (0, import_jsx_runtime.jsxs)("div", {
      className: "w3ajs-wallet-connect__container w3a-wallet-connect__container",
      children: [(0, import_jsx_runtime.jsx)("div", {
        children: "Scan QR code with a WalletConnect-compatible wallet"
      }, void 0), (0, import_jsx_runtime.jsx)("div", {
        className: "w3ajs-wallet-connect-qr w3a-wallet-connect-qr",
        children: (0, import_jsx_runtime.jsx)(import_react_qr_code.default, {
          size: 200,
          value: walletConnectUri
        }, void 0)
      }, void 0)]
    }, void 0)]
  }, void 0);
}
function ExternalWallet(props) {
  const {
    hideExternalWallets,
    handleExternalWalletClick,
    config = {},
    walletConnectUri,
    showBackButton,
    modalStatus
  } = props;
  const [isLoaded, setIsLoaded] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    var _config$WALLET_ADAPTE;
    import_loglevel2.default.debug("loaded external wallets", config);
    const wcAvailable = (((_config$WALLET_ADAPTE = config[WALLET_ADAPTERS.WALLET_CONNECT_V1]) === null || _config$WALLET_ADAPTE === void 0 ? void 0 : _config$WALLET_ADAPTE.showOnModal) || false) !== false;
    if (wcAvailable && !walletConnectUri) {
      handleExternalWalletClick({
        adapter: WALLET_ADAPTERS.WALLET_CONNECT_V1
      });
    } else if (Object.keys(config).length > 0) {
      setIsLoaded(true);
    }
  }, [config, handleExternalWalletClick, walletConnectUri]);
  return (0, import_jsx_runtime.jsx)("div", {
    className: "w3ajs-external-wallet w3a-group",
    children: (0, import_jsx_runtime.jsxs)("div", {
      className: "w3a-external-container w3ajs-external-container",
      children: [showBackButton && (0, import_jsx_runtime.jsxs)("button", {
        type: "button",
        className: "w3a-external-back w3ajs-external-back",
        onClick: hideExternalWallets,
        children: [(0, import_jsx_runtime.jsx)(Icon, {
          iconName: "arrow-left"
        }, void 0), (0, import_jsx_runtime.jsx)("h6", {
          className: "w3a-group__title",
          children: "Back"
        }, void 0)]
      }, void 0), !isLoaded && (0, import_jsx_runtime.jsx)(Loader, {
        modalStatus: MODAL_STATUS.CONNECTING,
        canEmit: false
      }, void 0), Object.keys(config).map((adapter) => {
        if (adapter === WALLET_ADAPTERS.WALLET_CONNECT_V1 || adapter === WALLET_ADAPTERS.WALLET_CONNECT_V2) {
          return (0, import_jsx_runtime.jsx)(WalletConnect$1, {
            walletConnectUri
          }, adapter);
        }
        return null;
      }), modalStatus === MODAL_STATUS.INITIALIZED && (0, import_jsx_runtime.jsx)("ul", {
        className: "w3a-adapter-list w3ajs-wallet-adapters",
        children: Object.keys(config).map((adapter) => {
          var _config$adapter;
          if (adapter === WALLET_ADAPTERS.WALLET_CONNECT_V1 || adapter === WALLET_ADAPTERS.WALLET_CONNECT_V2) {
            return null;
          }
          const providerIcon = (0, import_jsx_runtime.jsx)(Image, {
            imageId: "login-".concat(adapter)
          }, void 0);
          return (0, import_jsx_runtime.jsxs)("li", {
            className: "w3a-adapter-item",
            children: [(0, import_jsx_runtime.jsx)("button", {
              type: "button",
              onClick: () => handleExternalWalletClick({
                adapter
              }),
              className: "w3a-button w3a-button--icon",
              children: providerIcon
            }, void 0), (0, import_jsx_runtime.jsx)("p", {
              className: "w3a-adapter-item__label",
              children: ((_config$adapter = config[adapter]) === null || _config$adapter === void 0 ? void 0 : _config$adapter.label) || adapter
            }, void 0)]
          }, adapter);
        })
      }, void 0)]
    }, void 0)
  }, void 0);
}
function Footer(props) {
  const {
    version: version17
  } = props;
  const web3authIcon = (0, import_jsx_runtime.jsx)(Image, {
    imageId: "web3auth",
    height: "14px",
    width: "auto"
  }, void 0);
  return (0, import_jsx_runtime.jsx)("div", {
    className: "w3a-modal__footer",
    children: (0, import_jsx_runtime.jsxs)("div", {
      className: "w3a-footer",
      children: [(0, import_jsx_runtime.jsxs)("div", {
        children: [(0, import_jsx_runtime.jsxs)("div", {
          className: "w3a-footer__links",
          children: [(0, import_jsx_runtime.jsx)("a", {
            href: "https://docs.web3auth.io/legal/terms-and-conditions",
            children: "Terms of use"
          }, void 0), (0, import_jsx_runtime.jsx)("span", {
            children: "|"
          }, void 0), (0, import_jsx_runtime.jsx)("a", {
            href: "https://docs.web3auth.io/legal/privacy-policy",
            children: "Privacy policy"
          }, void 0)]
        }, void 0), (0, import_jsx_runtime.jsx)("p", {
          children: version17
        }, void 0)]
      }, void 0), (0, import_jsx_runtime.jsxs)("div", {
        className: "w3a-footer__secured",
        children: [(0, import_jsx_runtime.jsx)("div", {
          children: "Secured by"
        }, void 0), web3authIcon]
      }, void 0)]
    }, void 0)
  }, void 0);
}
function Header(props) {
  const {
    isDark
  } = (0, import_react.useContext)(ThemedContext);
  const {
    appLogo = DEFAULT_LOGO_URL$1,
    onClose
  } = props;
  const web3authIcon = (0, import_jsx_runtime.jsx)(Image, {
    imageId: "web3auth".concat(isDark ? "-light" : "")
  }, void 0);
  return (0, import_jsx_runtime.jsxs)("div", {
    className: "w3a-modal__header",
    children: [(0, import_jsx_runtime.jsxs)("div", {
      className: "w3a-header",
      children: [appLogo ? (0, import_jsx_runtime.jsx)("img", {
        className: "w3a-header__logo",
        src: appLogo,
        alt: ""
      }, void 0) : web3authIcon, (0, import_jsx_runtime.jsxs)("div", {
        children: [(0, import_jsx_runtime.jsx)("h1", {
          className: "w3a-header__title",
          children: "Sign in"
        }, void 0), (0, import_jsx_runtime.jsx)("p", {
          className: "w3a-header__subtitle",
          children: "Select one of the following to continue"
        }, void 0)]
      }, void 0)]
    }, void 0), (0, import_jsx_runtime.jsx)("button", {
      type: "button",
      onClick: onClose,
      className: "w3a-header__button w3ajs-close-btn",
      children: (0, import_jsx_runtime.jsx)(Icon, {
        iconName: "close"
      }, void 0)
    }, void 0)]
  }, void 0);
}
function SocialLoginEmail(props) {
  const {
    handleSocialLoginClick,
    adapter
  } = props;
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    if (email)
      handleSocialLoginClick({
        adapter,
        loginParams: {
          loginProvider: "email_passwordless",
          login_hint: email
        }
      });
  };
  return (0, import_jsx_runtime.jsxs)("div", {
    className: "w3ajs-email-passwordless w3a-group w3a-group--email",
    children: [(0, import_jsx_runtime.jsx)("h6", {
      className: "w3a-group__title",
      children: "EMAIL"
    }, void 0), (0, import_jsx_runtime.jsxs)("form", {
      className: "w3ajs-email-passwordless-form",
      onSubmit: (e) => handleEmailSubmit(e),
      children: [(0, import_jsx_runtime.jsx)("input", {
        className: "w3a-text-field",
        type: "email",
        name: "email",
        required: true,
        placeholder: "Email"
      }, void 0), (0, import_jsx_runtime.jsx)("button", {
        className: "w3a-button",
        type: "submit",
        children: "Continue with Email"
      }, void 0)]
    }, void 0)]
  }, void 0);
}
function SocialLogins(props) {
  const {
    socialLoginsConfig = {
      loginMethods: {},
      loginMethodsOrder: [],
      adapter: ""
    },
    handleSocialLoginClick
  } = props;
  const {
    isDark
  } = (0, import_react.useContext)(ThemedContext);
  const [isExpanded, setIsExpanded] = (0, import_react.useState)(false);
  const expandClickHandler = () => {
    setIsExpanded(!isExpanded);
  };
  const adapterListClass = (0, import_classnames.default)("w3a-adapter-list", "w3ajs-socials-adapters", !isExpanded ? " w3a-adapter-list--shrink" : "");
  const adapterButtonClass = (0, import_classnames.default)("w3a-button-expand", "w3ajs-button-expand", isExpanded ? "w3a-button--rotate" : "");
  const adapterExpandText = isExpanded ? "View less options" : "View more options";
  return (0, import_jsx_runtime.jsxs)("div", {
    className: "w3ajs-social-logins w3a-group",
    children: [(0, import_jsx_runtime.jsx)("h6", {
      className: "w3a-group__title",
      children: "CONTINUE WITH"
    }, void 0), (0, import_jsx_runtime.jsx)("ul", {
      className: adapterListClass,
      children: Object.keys(socialLoginsConfig.loginMethods).map((method) => {
        const providerIcon = (0, import_jsx_runtime.jsx)(Image, {
          imageId: "login-".concat(method).concat(isDark && hasLightIcons.includes(method) ? "-light" : "")
        }, void 0);
        if (socialLoginsConfig.loginMethods[method].showOnModal === false || method === "webauthn" || method === "jwt" || method === "email_passwordless") {
          return null;
        }
        const orderIndex = socialLoginsConfig.loginMethodsOrder.indexOf(method) + 1;
        const order = orderIndex || Object.keys(socialLoginsConfig.loginMethods).length + 1;
        return (0, import_jsx_runtime.jsx)("li", {
          className: "w3a-adapter-item",
          style: {
            order
          },
          children: (0, import_jsx_runtime.jsx)("button", {
            type: "button",
            onClick: () => handleSocialLoginClick({
              adapter: socialLoginsConfig.adapter,
              loginParams: {
                loginProvider: method
              }
            }),
            className: "w3a-button w3a-button--icon",
            children: providerIcon
          }, void 0)
        }, method);
      })
    }, void 0), (0, import_jsx_runtime.jsxs)("button", {
      type: "button",
      className: adapterButtonClass,
      style: {
        display: Object.keys(socialLoginsConfig.loginMethods).length > 5 ? "flex" : "none"
      },
      onClick: expandClickHandler,
      children: [(0, import_jsx_runtime.jsx)(Icon, {
        iconName: "expand".concat(isDark ? "-light" : "")
      }, void 0), (0, import_jsx_runtime.jsx)("span", {
        className: "w3ajs-button-expand-text",
        children: adapterExpandText
      }, void 0)]
    }, void 0)]
  }, void 0);
}
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function Modal(props) {
  var _modalState$socialLog3, _modalState$socialLog4;
  const {
    isDark
  } = (0, import_react.useContext)(ThemedContext);
  const [modalTransitionClasses, setModalTransitionClasses] = (0, import_react.useState)(["w3a-modal__inner"]);
  const [modalState, setModalState] = (0, import_react.useState)({
    externalWalletsVisibility: false,
    status: MODAL_STATUS.INITIALIZED,
    hasExternalWallets: false,
    externalWalletsInitialized: false,
    modalVisibility: false,
    modalVisibilityDelayed: false,
    postLoadingMessage: "",
    walletConnectUri: "",
    socialLoginsConfig: {
      loginMethods: {},
      loginMethodsOrder: [],
      adapter: ""
    },
    externalWalletsConfig: {},
    detailedLoaderAdapter: "",
    showExternalWalletsOnly: false
  });
  const {
    stateListener,
    appLogo,
    version: version17,
    handleSocialLoginClick,
    handleExternalWalletClick,
    handleShowExternalWallets,
    closeModal
  } = props;
  const DETAILED_ADAPTERS = [WALLET_ADAPTERS.PHANTOM, WALLET_ADAPTERS.METAMASK];
  (0, import_react.useEffect)(() => {
    stateListener.emit("MOUNTED");
    stateListener.on("STATE_UPDATED", (newModalState) => {
      import_loglevel2.default.debug("state updated", newModalState);
      setModalState((prevState) => {
        const mergedState = (0, import_lodash.default)((0, import_lodash2.default)(prevState, newModalState));
        return mergedState;
      });
    });
  }, [stateListener]);
  (0, import_react.useEffect)(() => {
    let timeOutId;
    if (modalState.modalVisibility) {
      setModalState((prevState) => {
        return _objectSpread2(_objectSpread2({}, prevState), {}, {
          modalVisibilityDelayed: modalState.modalVisibility
        });
      });
      timeOutId = setTimeout(() => {
        setModalTransitionClasses(["w3a-modal__inner", modalState.modalVisibility ? "w3a-modal__inner--active" : ""]);
      }, 100);
    } else {
      setModalTransitionClasses(["w3a-modal__inner", modalState.modalVisibility ? "w3a-modal__inner--active" : ""]);
      timeOutId = setTimeout(() => {
        setModalState((prevState) => {
          return _objectSpread2(_objectSpread2({}, prevState), {}, {
            modalVisibilityDelayed: modalState.modalVisibility
          });
        });
      }, 250);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [modalState.modalVisibility]);
  const onCloseLoader = (0, import_react.useCallback)(() => {
    if (modalState.status === MODAL_STATUS.CONNECTED) {
      closeModal();
    }
    if (modalState.status === MODAL_STATUS.ERRORED) {
      setModalState((prevState) => {
        return _objectSpread2(_objectSpread2({}, prevState), {}, {
          modalVisibility: true,
          status: MODAL_STATUS.INITIALIZED
        });
      });
    }
  }, [closeModal, modalState.status]);
  const preHandleExternalWalletClick = (params) => {
    const {
      adapter
    } = params;
    if (DETAILED_ADAPTERS.includes(adapter))
      setModalState((prevState) => {
        return _objectSpread2(_objectSpread2({}, prevState), {}, {
          detailedLoaderAdapter: adapter
        });
      });
    else if (adapter !== WALLET_ADAPTERS.WALLET_CONNECT_V1)
      setModalState((prevState) => {
        return _objectSpread2(_objectSpread2({}, prevState), {}, {
          detailedLoaderAdapter: ""
        });
      });
    handleExternalWalletClick(params);
  };
  const preHandleSocialWalletClick = (params) => {
    setModalState((prevState) => {
      return _objectSpread2(_objectSpread2({}, prevState), {}, {
        detailedLoaderAdapter: ""
      });
    });
    handleSocialLoginClick(params);
  };
  const externalWalletButton = (0, import_jsx_runtime.jsx)("div", {
    className: "w3ajs-external-wallet w3a-group",
    children: (0, import_jsx_runtime.jsxs)("div", {
      className: "w3a-external-toggle w3ajs-external-toggle",
      children: [(0, import_jsx_runtime.jsx)("h6", {
        className: "w3a-group__title",
        children: "EXTERNAL WALLET"
      }, void 0), (0, import_jsx_runtime.jsx)("button", {
        type: "button",
        className: "w3a-button w3ajs-external-toggle__button",
        onClick: () => {
          handleShowExternalWallets(modalState.externalWalletsInitialized);
          setModalState((prevState) => {
            return _objectSpread2(_objectSpread2({}, prevState), {}, {
              externalWalletsVisibility: true
            });
          });
        },
        children: "Connect with Wallet"
      }, void 0)]
    }, void 0)
  }, void 0);
  const areSocialLoginsVisible = (0, import_react.useMemo)(() => {
    var _modalState$socialLog, _modalState$socialLog2;
    if (modalState.showExternalWalletsOnly)
      return false;
    if (Object.keys(((_modalState$socialLog = modalState.socialLoginsConfig) === null || _modalState$socialLog === void 0 ? void 0 : _modalState$socialLog.loginMethods) || {}).length === 0)
      return false;
    const isAnySocialLoginVisible = Object.values(((_modalState$socialLog2 = modalState.socialLoginsConfig) === null || _modalState$socialLog2 === void 0 ? void 0 : _modalState$socialLog2.loginMethods) || {}).some((x) => x.showOnModal !== false);
    if (isAnySocialLoginVisible)
      return true;
    return false;
  }, [modalState.showExternalWalletsOnly, (_modalState$socialLog3 = modalState.socialLoginsConfig) === null || _modalState$socialLog3 === void 0 ? void 0 : _modalState$socialLog3.loginMethods]);
  import_loglevel2.default.info("modal state", modalState, areSocialLoginsVisible);
  const modalClassName = "w3a-modal ".concat(isDark ? "" : " w3a-modal--light");
  return (0, import_jsx_runtime.jsx)("div", {
    id: "w3a-modal",
    className: modalClassName,
    style: {
      display: !modalState.modalVisibilityDelayed ? "none" : "flex"
    },
    children: (0, import_jsx_runtime.jsxs)("div", {
      className: modalTransitionClasses.join(" "),
      children: [(0, import_jsx_runtime.jsx)(Header$1, {
        onClose: closeModal,
        appLogo
      }, void 0), modalState.status !== MODAL_STATUS.INITIALIZED ? (0, import_jsx_runtime.jsx)("div", {
        className: "w3a-modal__content w3ajs-content",
        children: modalState.detailedLoaderAdapter ? (0, import_jsx_runtime.jsx)(DetailedLoader, {
          onClose: onCloseLoader,
          appLogo,
          modalStatus: modalState.status,
          message: modalState.postLoadingMessage,
          adapter: modalState.detailedLoaderAdapter
        }, void 0) : (0, import_jsx_runtime.jsx)(Loader, {
          onClose: onCloseLoader,
          modalStatus: modalState.status,
          message: modalState.postLoadingMessage
        }, void 0)
      }, void 0) : (0, import_jsx_runtime.jsx)("div", {
        className: "w3a-modal__content w3ajs-content",
        children: areSocialLoginsVisible && !modalState.externalWalletsVisibility ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
          children: [(0, import_jsx_runtime.jsx)(SocialLogins, {
            handleSocialLoginClick: (params) => preHandleSocialWalletClick(params),
            socialLoginsConfig: modalState.socialLoginsConfig
          }, void 0), (0, import_jsx_runtime.jsx)(SocialLoginEmail, {
            adapter: (_modalState$socialLog4 = modalState.socialLoginsConfig) === null || _modalState$socialLog4 === void 0 ? void 0 : _modalState$socialLog4.adapter,
            handleSocialLoginClick: (params) => preHandleSocialWalletClick(params)
          }, void 0), modalState.hasExternalWallets && externalWalletButton]
        }, void 0) : (0, import_jsx_runtime.jsx)(ExternalWallet, {
          modalStatus: modalState.status,
          showBackButton: areSocialLoginsVisible,
          handleExternalWalletClick: (params) => preHandleExternalWalletClick(params),
          walletConnectUri: modalState.walletConnectUri,
          config: modalState.externalWalletsConfig,
          hideExternalWallets: () => setModalState((prevState) => {
            return _objectSpread2(_objectSpread2({}, prevState), {}, {
              externalWalletsVisibility: false
            });
          })
        }, void 0)
      }, void 0), (0, import_jsx_runtime.jsx)(Footer$1, {
        version: version17
      }, void 0)]
    }, void 0)
  }, void 0);
}
function createWrapper() {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", "w3a-container");
  document.body.appendChild(wrapper);
  return wrapper;
}
var import_jsx_runtime, import_loglevel2, import_react_dom, import_lodash, import_lodash2, import_react, import_react_qr_code, import_classnames, LOGIN_MODAL_EVENTS, MODAL_STATUS, css_248z, ThemedContext, CircleArrowLeft, Close, Expand, ExpandLight, icons, DEFAULT_LOGO_URL$2, closeIcon$1, closeIcon, walletConnectIcon, WalletConnect$1, Footer$1, DEFAULT_LOGO_URL$1, Header$1, hasLightIcons, DEFAULT_LOGO_URL, LoginModal;
var init_ui_esm = __esm({
  "node_modules/@web3auth/ui/dist/ui.esm.js"() {
    init_react();
    init_defineProperty();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    init_openloginJrpc_esm();
    init_base_esm();
    import_loglevel2 = __toESM(require_loglevel());
    import_react_dom = __toESM(require_react_dom());
    import_lodash = __toESM(require_lodash2());
    import_lodash2 = __toESM(require_lodash());
    import_react = __toESM(require_react());
    import_react_qr_code = __toESM(require_lib());
    import_classnames = __toESM(require_classnames());
    LOGIN_MODAL_EVENTS = {
      INIT_EXTERNAL_WALLETS: "INIT_EXTERNAL_WALLETS",
      LOGIN: "LOGIN",
      DISCONNECT: "DISCONNECT",
      MODAL_VISIBILITY: "MODAL_VISIBILITY"
    };
    MODAL_STATUS = {
      INITIALIZED: "initialized",
      CONNECTED: "connected",
      CONNECTING: "connecting",
      ERRORED: "errored"
    };
    css_248z = '/* devanagari */\n@font-face {\n    font-family: "Poppins";\n    font-style: normal;\n    font-weight: 600;\n    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z11lFd2JQEl8qw.woff2) format("woff2");\n    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;\n}\n/* latin-ext */\n@font-face {\n    font-family: "Poppins";\n    font-style: normal;\n    font-weight: 600;\n    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1JlFd2JQEl8qw.woff2) format("woff2");\n    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n    font-family: "Poppins";\n    font-style: normal;\n    font-weight: 600;\n    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2) format("woff2");\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,\n        U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n\n/* latin-ext */\n@font-face {\n    font-family: "DM Sans";\n    font-style: normal;\n    font-weight: 400;\n    src: url(https://fonts.gstatic.com/s/dmsans/v6/rP2Hp2ywxg089UriCZ2IHTWEBlwu8Q.woff2) format("woff2");\n    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n    font-family: "DM Sans";\n    font-style: normal;\n    font-weight: 400;\n    src: url(https://fonts.gstatic.com/s/dmsans/v6/rP2Hp2ywxg089UriCZOIHTWEBlw.woff2) format("woff2");\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC,\n        U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n\n/* Modal */\n#w3a-modal {\n    --bg1: #0f1222;\n    --bg2: #24262e;\n    --text-color1: #d3d3d4;\n    --text-color2: #ffffff;\n\n    --text-header: "Poppins", Helvetica, sans-serif;\n    --text-body: "DM Sans", Helvetica, sans-serif;\n\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n    padding: 15px;\n    background: rgba(33, 33, 33, 0.46);\n    color: var(--text-color1);\n    font-family: var(--text-body);\n}\n\n#w3a-modal.w3a-modal--hidden {\n    display: none;\n}\n\n#w3a-modal p,\n#w3a-modal form,\n#w3a-modal h1,\n#w3a-modal h6,\n#w3a-modal button {\n    margin: 0;\n    padding: 0;\n}\n\n#w3a-modal .w3a-modal__inner {\n    width: 100%;\n    max-width: 375px;\n    overflow: hidden;\n    border-radius: 6px;\n    position: relative;\n    max-height: 95%;\n    overflow-y: auto;\n    opacity: 0;\n    transition: 200ms cubic-bezier(0.25, 0.8, 0.25, 1);\n    transform-origin: center center;\n    min-height: 350px;\n}\n\n#w3a-modal .w3a-modal__inner.w3a-modal__inner--active {\n    opacity: 1;\n    transition: 200ms cubic-bezier(0.25, 0.8, 0.25, 1);\n    transform-origin: center center;\n}\n\n#w3a-modal .w3a-modal__header {\n    padding: 25px 34px;\n    background: var(--bg1);\n    box-shadow: 0px 4px 28px rgba(3, 100, 255, 0.05);\n    position: relative;\n}\n#w3a-modal .w3a-modal__content {\n    padding: 30px 34px;\n    background: var(--bg2);\n}\n#w3a-modal .w3a-modal__footer {\n    padding: 16px 34px;\n    background: var(--bg1);\n}\n\n/* SPINNER */\n/* Loader */\n#w3a-modal .w3a-modal__loader {\n    background: var(--bg1);\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 10;\n}\n\n#w3a-modal .w3a-modal__loader.w3a-modal__loader--hidden {\n    display: none;\n}\n\n#w3a-modal .w3a-modal__loader-content {\n    text-align: center;\n    margin-bottom: 80px;\n    position: relative;\n    display: flex;\n    flex-direction: column;\n}\n\n#w3a-modal .w3a-modal__loader-info {\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding: 0 30px;\n}\n\n#w3a-modal .w3a-spinner-label {\n    margin-top: 10px;\n    font-size: 16px;\n    font-weight: 500;\n    color: #0364ff;\n}\n\n#w3a-modal .w3a-spinner-message {\n    margin-top: 10px;\n    font-size: 16px;\n}\n#w3a-modal .w3a-spinner-message:first-letter {\n    text-transform: capitalize;\n}\n#w3a-modal .w3a-spinner-message.w3a-spinner-message--error {\n    color: #fb4a61;\n}\n\n#w3a-modal button.w3a-logout {\n    background: none;\n    border: 0;\n    padding: 0;\n    display: inline-flex;\n    align-items: center;\n    margin-bottom: 30px;\n    cursor: pointer;\n    margin-top: 20px;\n    color: #0364ff;\n}\n\n#w3a-modal .w3a-spinner-power {\n    margin-top: auto;\n    font-size: 12px;\n    line-height: 1.2em;\n    color: #b7b8bd;\n}\n#w3a-modal .w3a-spinner-power > img {\n    height: 32px;\n    width: auto;\n}\n\n.w3a-spinner {\n    display: inline-block;\n    position: relative;\n    width: 80px;\n    height: 80px;\n}\n.w3a-spinner div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    width: 64px;\n    height: 64px;\n    margin: 8px;\n    border: 6px solid #0364ff;\n    border-radius: 50%;\n    animation: w3a-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n    border-color: #0364ff transparent transparent transparent;\n}\n.w3a-spinner div:nth-child(1) {\n    animation-delay: -0.45s;\n}\n.w3a-spinner div:nth-child(2) {\n    animation-delay: -0.3s;\n}\n.w3a-spinner div:nth-child(3) {\n    animation-delay: -0.15s;\n}\n.w3a-spinner.w3a-spinner--small {\n    width: 64px;\n    height: 64px;\n}\n.w3a-spinner.w3a-spinner--small div {\n    width: 48px;\n    height: 48px;\n    border: 4px solid #0364ff;\n    border-color: #0364ff transparent transparent transparent;\n}\n@keyframes w3a-spinner {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n/* Header */\n#w3a-modal .w3a-header {\n    display: flex;\n    color: var(--text-color2);\n    align-items: center;\n}\n#w3a-modal .w3a-header__logo {\n    height: auto;\n    width: 40px;\n    margin-right: 16px;\n}\n#w3a-modal h1.w3a-header__title {\n    font-family: var(--text-header);\n    font-weight: 600;\n    font-size: 20px;\n    line-height: 1.5em;\n}\n#w3a-modal p.w3a-header__subtitle {\n    font-size: 14px;\n    line-height: 1.5em;\n    font-weight: 400;\n}\n#w3a-modal button.w3a-header__button {\n    cursor: pointer;\n    position: absolute;\n    background: none;\n    padding: 0;\n    border: 0;\n    top: 20px;\n    right: 26px;\n}\n\n/* BODY */\n#w3a-modal .w3a-group {\n    margin-bottom: 24px;\n}\n#w3a-modal .w3a-group:last-child {\n    margin-bottom: 0;\n}\n\n#w3a-modal .w3a-group.w3a-group--hidden,\n#w3a-modal .w3a-group.w3a-group--social-hidden,\n#w3a-modal .w3a-group.w3a-group--email-hidden,\n#w3a-modal .w3a-group.w3a-group--ext-wallet-hidden {\n    display: none;\n}\n\n#w3a-modal .w3a-group:not(.w3a-group--hidden):not(:last-child),\n#w3a-modal .w3a-group:not(.w3a-group--social-hidden):not(:last-child),\n#w3a-modal .w3a-group:not(.w3a-group--email-hidden):not(:last-child),\n#w3a-modal .w3a-group:not(.w3a-group--ext-wallet-hidden):not(:last-child) {\n    border-bottom: 0.5px solid #5c6c7f;\n    padding-bottom: 24px;\n}\n\n#w3a-modal h6.w3a-group__title {\n    font-family: var(--text-header);\n    font-weight: 400;\n    font-size: 14px;\n    line-height: 1.5em;\n    margin-bottom: 8px;\n}\n\n/* Adapter List */\n#w3a-modal ul.w3a-adapter-list {\n    display: flex;\n    align-items: center;\n    padding: 0;\n    margin: 0;\n    gap: 16px;\n    overflow-y: hidden;\n    flex-wrap: wrap;\n    margin-bottom: 16px;\n    max-height: 500px;\n    transition: max-height 0.4s ease-in;\n}\n\n#w3a-modal ul.w3a-adapter-list.w3a-adapter-list--shrink {\n    max-height: 48px;\n    transition: max-height 0.4s ease-out;\n}\n\n#w3a-modal ul.w3a-adapter-list.w3a-adapter-list--hidden {\n    display: none;\n}\n\n#w3a-modal li.w3a-adapter-item {\n    list-style: none;\n}\n\n#w3a-modal .w3a-adapter-item--hide {\n    display: none;\n}\n\n#w3a-modal .w3a-adapter-item__label {\n    font-size: 12px;\n    color: #5c6c7f;\n    text-align: center;\n    margin-top: 8px;\n    text-transform: capitalize;\n    position: absolute;\n    transform: translate(-6px);\n    width: 60px;\n}\n\n/* Buttons */\n#w3a-modal button.w3a-button {\n    background-color: #2f3136;\n    border: 1px solid #404145;\n    box-sizing: border-box;\n    box-shadow: 2px 2px 12px rgba(3, 100, 255, 0.05);\n    border-radius: 24px;\n    height: 48px;\n    width: 100%;\n    padding: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: var(--text-body);\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    color: var(--text-color2);\n    cursor: pointer;\n}\n\n#w3a-modal button.w3a-button:hover {\n    background: #595857;\n}\n\n#w3a-modal button.w3a-button:active {\n    background: #6f717a;\n}\n\n#w3a-modal button.w3a-button:focus-visible {\n    outline: 1px solid #daf0ff;\n    outline-offset: -1px;\n}\n\n#w3a-modal button.w3a-button--icon {\n    width: 48px;\n}\n\n#w3a-modal button.w3a-button--left {\n    justify-content: start;\n    padding: 8px 16px;\n}\n\n#w3a-modal button.w3a-button--left > img {\n    height: 30px;\n    width: auto;\n}\n\n#w3a-modal button.w3a-button--left > div.w3a-button__name {\n    max-width: 180px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    text-transform: capitalize;\n}\n\n#w3a-modal button.w3a-button--left > div.w3a-button__note {\n    margin-left: 8px;\n    color: #b7b8bd;\n    margin-left: auto;\n}\n\n#w3a-modal .w3a-button__image {\n    max-width: 100%;\n    max-height: 100%;\n    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;\n}\n\n#w3a-modal button.w3a-button.w3a-button--rotate .w3a-button__image {\n    transform: rotate(180deg);\n}\n\n#w3a-modal .w3a-button--left .w3a-button__image {\n    margin-right: 12px;\n}\n\n#w3a-modal button.w3a-button-expand {\n    height: unset;\n    width: auto;\n    margin-left: auto;\n    font-size: 12px;\n    margin-top: 16px;\n    display: flex;\n    border: 8px;\n    color: var(--text-color2);\n    align-items: center;\n    cursor: pointer;\n    border-radius: 12px;\n    cursor: pointer;\n    padding: 0 10px 0 8px;\n    background: transparent;\n}\n\n#w3a-modal button.w3a-button-expand svg {\n    width: 12px;\n    height: auto;\n    margin-right: 4px;\n}\n\n#w3a-modal .w3a-external-toggle {\n    display: block;\n}\n\n#w3a-modal .w3a-external-toggle.w3a-external-toggle--hidden {\n    display: none;\n}\n\n#w3a-modal .w3a-external-container {\n    display: block;\n    margin-bottom: 34px;\n}\n\n#w3a-modal .w3a-external-container.w3a-external-container--hidden {\n    display: none;\n}\n\n#w3a-modal .w3a-external-group {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 12px;\n    margin-bottom: 16px;\n}\n\n#w3a-modal .w3a-external-group__left {\n    flex-grow: 1;\n}\n\n#w3a-modal button.w3a-external-back {\n    background: none;\n    border: 0;\n    padding: 0;\n    display: inline-flex;\n    align-items: center;\n    margin-bottom: 30px;\n    cursor: pointer;\n    color: var(--text-color1);\n}\n\n#w3a-modal .w3a-external-back:focus-visible {\n    outline: 1px solid #daf0ff;\n}\n\n#w3a-modal .w3a-external-back .w3a-group__title {\n    margin-bottom: 0;\n    margin-left: 5px;\n}\n\n#w3a-modal .w3a-external-loader {\n    display: flex;\n    justify-content: center;\n}\n\n#w3a-modal .w3a-wallet-connect {\n    display: block;\n    text-align: center;\n    margin-bottom: 16px;\n}\n\n#w3a-modal .w3a-wallet-connect.w3a-wallet-connect--hidden {\n    display: none;\n}\n\n#w3a-modal .w3a-wallet-connect__container {\n    padding: 10px;\n    background: #ffffff;\n    border-radius: 10px;\n    color: var(--text-color1);\n    font-size: 10px;\n    width: fit-content;\n    margin: auto;\n}\n\n.w3a-wallet-connect-qr {\n    width: 200px;\n    margin: 16px 16px;\n    padding: inherit;\n}\n\n#w3a-modal .w3a-wallet-connect__logo > img {\n    text-align: center;\n    width: 115px;\n    margin-bottom: 16px;\n}\n\n/* Text Field */\n#w3a-modal .w3a-text-field {\n    background: #393938;\n    border: 1px solid #27282d;\n    box-sizing: border-box;\n    box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.4);\n    border-radius: 24px;\n    padding: 0 28px;\n    height: 48px;\n    width: 100%;\n    font-family: var(--text-body);\n    font-size: 16px;\n    color: var(--text-color2);\n    margin-bottom: 16px;\n}\n\n#w3a-modal .w3a-text-field:active {\n    background: #0f1222;\n}\n\n#w3a-modal .w3a-text-field:focus-visible {\n    outline: 1px solid #daf0ff;\n    outline-offset: -1px;\n}\n\n/* Footer Components */\n#w3a-modal .w3a-footer {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    font-size: 10px;\n    line-height: 150%;\n    color: var(--text-color2);\n}\n\n#w3a-modal .w3a-footer__links {\n    padding: 0;\n    margin: 0;\n}\n\n#w3a-modal .w3a-footer__links a {\n    color: var(--text-color1);\n    text-decoration: none;\n}\n\n#w3a-modal .w3a-footer__links a:focus-visible {\n    outline: 1px solid #daf0ff;\n}\n\n#w3a-modal .w3a-footer__links span {\n    margin: 0 2px;\n}\n\n#w3a-modal .w3a-footer__secured {\n    text-align: right;\n    color: #b7b8bd;\n}\n#w3a-modal .w3a-footer__secured > img {\n    height: 14px;\n    width: auto;\n}\n\n/* Loader Bridge */\n#w3a-modal .w3a-modal__loader-bridge {\n    display: flex;\n    margin-bottom: 14px;\n}\n\n#w3a-modal .w3a-modal__loader-bridge-message span {\n    text-transform: capitalize;\n}\n\n#w3a-modal .w3a-modal__loader-app-logo {\n    display: flex;\n    padding: 8px;\n}\n\n#w3a-modal .w3a-modal__loader-app-logo img {\n    width: 64px;\n    height: auto;\n}\n\n#w3a-modal .w3a-modal__loader-adapter img {\n    width: 84px;\n    height: auto;\n}\n\n#w3a-modal .w3a-modal__connector {\n    display: flex;\n    align-items: center;\n}\n\n.w3a-modal__connector-beat {\n    display: inline-block;\n    position: relative;\n    width: 80px;\n    height: 80px;\n}\n\n.w3a-modal__connector-beat div {\n    position: absolute;\n    top: 33px;\n    width: 13px;\n    height: 13px;\n    border-radius: 50%;\n    background: #808080;\n    animation-timing-function: cubic-bezier(0, 1, 1, 0);\n}\n\n.w3a-modal__connector-beat div:nth-child(1) {\n    left: 8px;\n    animation: beat1 2.4s infinite;\n}\n\n.w3a-modal__connector-beat div:nth-child(2) {\n    left: 8px;\n    animation: beat2 2.4s infinite;\n}\n\n.w3a-modal__connector-beat div:nth-child(3) {\n    left: 8px;\n    animation: beat3 2.4s infinite;\n}\n\n.w3a-modal__connector-beat div:nth-child(4) {\n    left: 32px;\n    animation: beat4 2.4s infinite;\n}\n\n.w3a-modal__connector-beat div:nth-child(5) {\n    left: 56px;\n    animation: beat5 2.4s infinite;\n}\n\n@keyframes beat1 {\n    0% {\n        transform: scale(0);\n    }\n\n    25% {\n        transform: scale(0);\n    }\n\n    50% {\n        transform: scale(1);\n    }\n\n    75% {\n        transform: scale(0);\n    }\n\n    100% {\n        transform: scale(0);\n    }\n}\n\n@keyframes beat2 {\n    0% {\n        transform: scale(0);\n    }\n\n    25% {\n        transform: scale(1);\n    }\n\n    50% {\n        transform: translate(24px, 0);\n    }\n\n    75% {\n        transform: translate(0, 0);\n    }\n\n    100% {\n        transform: translate(0, 0) scale(0);\n    }\n}\n\n@keyframes beat3 {\n    0% {\n        transform: translate(0, 0);\n    }\n\n    25% {\n        transform: translate(24px, 0);\n    }\n\n    50% {\n        transform: translate(48px, 0);\n    }\n\n    75% {\n        transform: translate(24px, 0);\n    }\n\n    100% {\n        transform: translate(0, 0);\n    }\n}\n\n@keyframes beat4 {\n    0% {\n        transform: translate(0, 0);\n    }\n\n    25% {\n        transform: translate(24px, 0);\n    }\n\n    50% {\n        transform: translate(24px, 0) scale(0);\n    }\n\n    75% {\n        transform: translate(24px, 0) scale(1);\n    }\n\n    100% {\n        transform: translate(0, 0);\n    }\n}\n\n@keyframes beat5 {\n    0% {\n        transform: scale(1);\n    }\n\n    25% {\n        transform: scale(0);\n    }\n\n    50% {\n        transform: scale(0);\n    }\n\n    75% {\n        transform: scale(0);\n    }\n\n    100% {\n        transform: scale(1);\n    }\n}\n\n/* LIGHT MODE */\n#w3a-modal.w3a-modal--light {\n    --bg1: #ffffff;\n    --bg2: #f9f9fb;\n    --text-color1: #a2a5b5;\n    --text-color2: #5c6c7f;\n}\n\n#w3a-modal .w3a-group:not(.w3a-group--hidden):not(:last-child),\n#w3a-modal .w3a-group:not(.w3a-group--social-hidden):not(:last-child),\n#w3a-modal .w3a-group:not(.w3a-group--email-hidden):not(:last-child),\n#w3a-modal .w3a-group:not(.w3a-group--ext-wallet-hidden):not(:last-child) {\n    border-bottom: 0.5px solid #b7b8bd;\n    padding-bottom: 24px;\n}\n\n#w3a-modal.w3a-modal--light button.w3a-button {\n    background-color: #ffffff;\n    border: 1px solid #f3f3f4;\n    box-shadow: none;\n    color: #b7b8bd;\n}\n\n#w3a-modal.w3a-modal--light button.w3a-button:focus-visible {\n    outline: 1px solid #0f1222;\n}\n\n#w3a-modal.w3a-modal--light .w3a-text-field {\n    background: #ffffff;\n    border: 1px solid #ffffff;\n    box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.1);\n    color: #b7b8bd;\n}\n\n#w3a-modal.w3a-modal--light .w3a-text-field:active {\n    color: #0f1222;\n    outline: 1px solid #0f1222;\n}\n\n#w3a-modal.w3a-modal--light .w3a-text-field:focus-visible {\n    color: #0f1222;\n    outline: 1px solid #0f1222;\n}\n\n#w3a-modal.w3a-modal--light .w3a-footer__links a:focus-visible {\n    outline: 1px solid #0f1222;\n}\n\n#w3a-modal.w3a-modal--light .w3a-external-back:focus-visible {\n    outline: 1px solid #0f1222;\n}\n';
    styleInject(css_248z);
    ThemedContext = /* @__PURE__ */ (0, import_react.createContext)({
      isDark: true
    });
    CircleArrowLeft = "data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20id%3D%2224%20%2F%20arrows%20%2F%20circle-arrow-left%22%3E%3Cpath%20id%3D%22icon%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12%2023C5.92487%2023%201%2018.0751%201%2012C1%205.92487%205.92487%201%2012%201C18.0751%201%2023%205.92487%2023%2012C23%2018.0751%2018.0751%2023%2012%2023ZM12%2021C16.9706%2021%2021%2016.9706%2021%2012C21%207.02944%2016.9706%203%2012%203C7.02944%203%203%207.02944%203%2012C3%2016.9706%207.02944%2021%2012%2021ZM17%2011H10.4142L12.7071%208.70711L11.2929%207.29289L6.58579%2012L11.2929%2016.7071L12.7071%2015.2929L10.4142%2013H17V11Z%22%20fill%3D%22%23D3D3D4%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";
    Close = "data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M13.4142%2012L19.7782%2018.364L18.364%2019.7782L12%2013.4143L5.63604%2019.7782L4.22183%2018.364L10.5858%2012L4.22183%205.63608L5.63604%204.22187L12%2010.5858L18.364%204.22187L19.7782%205.63608L13.4142%2012Z%22%20fill%3D%22%23DFDFDF%22%2F%3E%3C%2Fsvg%3E";
    Expand = "data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.0991%2015.6785C11.694%2016.1072%2011.0119%2016.1072%2010.6068%2015.6785L4.98828%209.73136C4.36988%209.0768%204.83393%208%205.73441%208L16.9715%208C17.872%208%2018.336%209.0768%2017.7176%209.73136L12.0991%2015.6785Z%22%20fill%3D%22%23B7B8BD%22%2F%3E%3C%2Fsvg%3E";
    ExpandLight = "data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.0991%2015.6785C11.694%2016.1072%2011.0119%2016.1072%2010.6068%2015.6785L4.98828%209.73136C4.36988%209.0768%204.83393%208%205.73441%208L16.9715%208C17.872%208%2018.336%209.0768%2017.7176%209.73136L12.0991%2015.6785Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E";
    icons = {
      "arrow-left": {
        image: CircleArrowLeft
      },
      close: {
        image: Close
      },
      "expand-light": {
        image: ExpandLight
      },
      expand: {
        image: Expand
      }
    };
    DEFAULT_LOGO_URL$2 = "https://images.web3auth.io/web3auth-logo.svg";
    closeIcon$1 = (0, import_jsx_runtime.jsx)(Icon, {
      iconName: "close"
    }, void 0);
    closeIcon = (0, import_jsx_runtime.jsx)(Icon, {
      iconName: "close"
    }, void 0);
    walletConnectIcon = (0, import_jsx_runtime.jsx)(Image, {
      imageId: "wallet-connect",
      width: "114px"
    }, void 0);
    WalletConnect$1 = /* @__PURE__ */ (0, import_react.memo)(WalletConnect);
    Footer$1 = /* @__PURE__ */ (0, import_react.memo)(Footer);
    DEFAULT_LOGO_URL$1 = "https://images.web3auth.io/web3auth-logo.svg";
    Header$1 = /* @__PURE__ */ (0, import_react.memo)(Header, (prevProps, nextProps) => {
      if (prevProps.appLogo !== nextProps.appLogo) {
        return true;
      }
      return false;
    });
    hasLightIcons = ["apple", "github"];
    import_loglevel2.default.enableAll();
    DEFAULT_LOGO_URL = "https://images.web3auth.io/web3auth-logo.svg";
    LoginModal = class extends SafeEventEmitter {
      constructor(_ref) {
        let {
          appLogo,
          version: version17,
          adapterListener,
          theme = "light"
        } = _ref;
        super();
        _defineProperty(this, "appLogo", void 0);
        _defineProperty(this, "version", void 0);
        _defineProperty(this, "isDark", void 0);
        _defineProperty(this, "wrapper", void 0);
        _defineProperty(this, "stateEmitter", void 0);
        _defineProperty(this, "initModal", async () => {
          const darkState = {
            isDark: this.isDark
          };
          return new Promise((resolve) => {
            this.stateEmitter.once("MOUNTED", () => {
              import_loglevel2.default.info("rendered");
              this.setState({
                status: MODAL_STATUS.INITIALIZED
              });
              return resolve();
            });
            (0, import_react_dom.render)((0, import_jsx_runtime.jsx)(ThemedContext.Provider, {
              value: darkState,
              children: (0, import_jsx_runtime.jsx)(Modal, {
                closeModal: this.closeModal,
                stateListener: this.stateEmitter,
                handleShowExternalWallets: (externalWalletsInitialized) => this.handleShowExternalWallets(externalWalletsInitialized),
                handleExternalWalletClick: (params) => this.handleExternalWalletClick(params),
                handleSocialLoginClick: (params) => this.handleSocialLoginClick(params),
                appLogo: this.appLogo,
                version: this.version
              }, void 0)
            }, void 0), this.wrapper);
          });
        });
        _defineProperty(this, "addSocialLogins", (adapter, loginMethods, loginMethodsOrder) => {
          this.setState({
            socialLoginsConfig: {
              adapter,
              loginMethods,
              loginMethodsOrder
            }
          });
          import_loglevel2.default.info("addSocialLogins", adapter, loginMethods, loginMethodsOrder);
        });
        _defineProperty(this, "addWalletLogins", (externalWalletsConfig, options) => {
          this.setState({
            externalWalletsConfig,
            externalWalletsInitialized: true,
            showExternalWalletsOnly: !!(options !== null && options !== void 0 && options.showExternalWalletsOnly),
            externalWalletsVisibility: true
          });
        });
        _defineProperty(this, "open", () => {
          this.setState({
            modalVisibility: true
          });
          this.emit(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, true);
        });
        _defineProperty(this, "closeModal", () => {
          this.setState({
            modalVisibility: false,
            externalWalletsVisibility: false
          });
          this.emit(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, false);
        });
        _defineProperty(this, "initExternalWalletContainer", () => {
          this.setState({
            hasExternalWallets: true
          });
        });
        _defineProperty(this, "handleShowExternalWallets", (status) => {
          this.emit(LOGIN_MODAL_EVENTS.INIT_EXTERNAL_WALLETS, {
            externalWalletsInitialized: status
          });
        });
        _defineProperty(this, "handleExternalWalletClick", (params) => {
          import_loglevel2.default.info("external wallet clicked", params);
          const {
            adapter
          } = params;
          this.emit(LOGIN_MODAL_EVENTS.LOGIN, {
            adapter
          });
        });
        _defineProperty(this, "handleSocialLoginClick", (params) => {
          import_loglevel2.default.info("social login clicked", params);
          const {
            adapter,
            loginParams
          } = params;
          this.emit(LOGIN_MODAL_EVENTS.LOGIN, {
            adapter,
            loginParams: {
              loginProvider: loginParams.loginProvider,
              login_hint: loginParams.login_hint
            }
          });
        });
        _defineProperty(this, "setState", (newState) => {
          this.stateEmitter.emit("STATE_UPDATED", newState);
        });
        _defineProperty(this, "updateWalletConnect", (walletConnectUri) => {
          if (!walletConnectUri)
            return;
          this.setState({
            walletConnectUri
          });
        });
        _defineProperty(this, "handleAdapterData", (adapterData) => {
          if (adapterData.adapterName === WALLET_ADAPTERS.WALLET_CONNECT_V1) {
            const walletConnectData = adapterData.data;
            this.updateWalletConnect(walletConnectData.uri);
          }
        });
        _defineProperty(this, "subscribeCoreEvents", (listener) => {
          listener.on(ADAPTER_EVENTS.CONNECTING, (data) => {
            import_loglevel2.default.info("connecting with adapter", data);
            if ((data === null || data === void 0 ? void 0 : data.adapter) !== WALLET_ADAPTERS.WALLET_CONNECT_V1 && (data === null || data === void 0 ? void 0 : data.adapter) !== WALLET_ADAPTERS.WALLET_CONNECT_V2) {
              this.setState({
                status: MODAL_STATUS.CONNECTING
              });
            }
          });
          listener.on(ADAPTER_EVENTS.CONNECTED, (data) => {
            import_loglevel2.default.debug("connected with adapter", data);
            if (!data.reconnected) {
              this.setState({
                status: MODAL_STATUS.CONNECTED,
                modalVisibility: true,
                postLoadingMessage: "You are connected with your account"
              });
            } else {
              this.setState({
                status: MODAL_STATUS.CONNECTED
              });
            }
          });
          listener.on(ADAPTER_EVENTS.ERRORED, (error) => {
            import_loglevel2.default.error("error", error, error.message);
            if (error.code === 5e3) {
              this.setState({
                modalVisibility: true,
                postLoadingMessage: error.message || "Something went wrong!",
                status: MODAL_STATUS.ERRORED
              });
            } else {
              this.setState({
                modalVisibility: true,
                status: MODAL_STATUS.INITIALIZED
              });
            }
          });
          listener.on(ADAPTER_EVENTS.DISCONNECTED, () => {
            this.setState({
              status: MODAL_STATUS.INITIALIZED,
              externalWalletsVisibility: false
            });
          });
          listener.on(ADAPTER_EVENTS.ADAPTER_DATA_UPDATED, (adapterData) => {
            this.handleAdapterData(adapterData);
          });
        });
        this.appLogo = appLogo || DEFAULT_LOGO_URL;
        this.version = version17;
        this.isDark = theme === "dark";
        this.wrapper = createWrapper();
        this.stateEmitter = new SafeEventEmitter();
        this.subscribeCoreEvents(adapterListener);
      }
    };
  }
});

// node_modules/@web3auth/web3auth/dist/web3auth.esm.js
var web3auth_esm_exports = {};
__export(web3auth_esm_exports, {
  OPENLOGIN_PROVIDERS: () => OPENLOGIN_PROVIDERS,
  Web3Auth: () => Web3Auth,
  defaultEvmDappModalConfig: () => defaultEvmDappModalConfig,
  defaultEvmWalletModalConfig: () => defaultEvmWalletModalConfig,
  defaultSolanaDappModalConfig: () => defaultSolanaDappModalConfig,
  defaultSolanaWalletModalConfig: () => defaultSolanaWalletModalConfig
});
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function ownKeys3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys3(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys3(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var import_loglevel3, defaultSolanaDappModalConfig, defaultEvmDappModalConfig, defaultSolanaWalletModalConfig, defaultEvmWalletModalConfig, OPENLOGIN_PROVIDERS, getDefaultAdapterModule, getAdapterSocialLogins, Web3Auth;
var init_web3auth_esm = __esm({
  "node_modules/@web3auth/web3auth/dist/web3auth.esm.js"() {
    init_react();
    init_openlogin_esm();
    init_base_esm();
    init_defineProperty();
    init_core_esm();
    init_ui_esm();
    import_loglevel3 = __toESM(require_loglevel());
    defaultSolanaDappModalConfig = {
      chainNamespace: CHAIN_NAMESPACES.SOLANA,
      adapters: {
        [SOLANA_ADAPTERS.TORUS_SOLANA]: {
          label: "Torus Solana Wallet",
          showOnModal: true,
          showOnMobile: true,
          showOnDesktop: true
        },
        [SOLANA_ADAPTERS.OPENLOGIN]: {
          label: "OpenLogin",
          showOnModal: true,
          showOnMobile: true,
          showOnDesktop: true
        },
        [SOLANA_ADAPTERS.PHANTOM]: {
          label: "Phantom",
          showOnModal: true,
          showOnMobile: true,
          showOnDesktop: true
        }
      }
    };
    defaultEvmDappModalConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      adapters: {
        [EVM_ADAPTERS.TORUS_EVM]: {
          label: "Torus Wallet",
          showOnModal: true,
          showOnMobile: true,
          showOnDesktop: true
        },
        [EVM_ADAPTERS.METAMASK]: {
          label: "MetaMask",
          showOnModal: true,
          showOnMobile: true,
          showOnDesktop: true
        },
        [EVM_ADAPTERS.OPENLOGIN]: {
          label: "OpenLogin",
          showOnModal: true,
          showOnMobile: true,
          showOnDesktop: true
        },
        [EVM_ADAPTERS.WALLET_CONNECT_V1]: {
          label: "Wallet Connect",
          showOnModal: true,
          showOnMobile: true,
          showOnDesktop: true
        }
      }
    };
    defaultSolanaWalletModalConfig = {
      chainNamespace: CHAIN_NAMESPACES.SOLANA,
      adapters: {
        [SOLANA_ADAPTERS.OPENLOGIN]: {
          label: "OpenLogin",
          showOnModal: true,
          showOnMobile: true,
          showOnDesktop: true
        }
      }
    };
    defaultEvmWalletModalConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      adapters: {
        [EVM_ADAPTERS.OPENLOGIN]: {
          label: "OpenLogin",
          showOnModal: true,
          showOnMobile: true,
          showOnDesktop: true
        }
      }
    };
    OPENLOGIN_PROVIDERS = [LOGIN_PROVIDER.GOOGLE, LOGIN_PROVIDER.FACEBOOK, LOGIN_PROVIDER.TWITTER, LOGIN_PROVIDER.REDDIT, LOGIN_PROVIDER.DISCORD, LOGIN_PROVIDER.TWITCH, LOGIN_PROVIDER.APPLE, LOGIN_PROVIDER.LINE, LOGIN_PROVIDER.GITHUB, LOGIN_PROVIDER.KAKAO, LOGIN_PROVIDER.LINKEDIN, LOGIN_PROVIDER.WEIBO, LOGIN_PROVIDER.WECHAT, LOGIN_PROVIDER.EMAIL_PASSWORDLESS];
    getDefaultAdapterModule = async (params) => {
      const {
        name: name2,
        customChainConfig,
        clientId
      } = params;
      if (!Object.values(CHAIN_NAMESPACES).includes(customChainConfig.chainNamespace))
        throw new Error("Invalid chainNamespace: ".concat(customChainConfig.chainNamespace));
      const finalChainConfig = _objectSpread$2(_objectSpread$2({}, getChainConfig(customChainConfig.chainNamespace, customChainConfig === null || customChainConfig === void 0 ? void 0 : customChainConfig.chainId)), customChainConfig || {});
      if (name2 === WALLET_ADAPTERS.TORUS_EVM) {
        const {
          TorusWalletAdapter
        } = await import("/build/_shared/torusEvmAdapter.esm-DFHJKPJN.js");
        const adapter = new TorusWalletAdapter({
          chainConfig: finalChainConfig
        });
        return adapter;
      } else if (name2 === WALLET_ADAPTERS.TORUS_SOLANA) {
        const {
          SolanaWalletAdapter
        } = await import("/build/_shared/torusSolanaAdapter.esm-FZYTZ4UJ.js");
        const adapter = new SolanaWalletAdapter({
          chainConfig: finalChainConfig
        });
        return adapter;
      } else if (name2 === WALLET_ADAPTERS.METAMASK) {
        const {
          MetamaskAdapter
        } = await import("/build/_shared/metamaskAdapter.esm-DZ5RNMFG.js");
        const adapter = new MetamaskAdapter({
          chainConfig: finalChainConfig
        });
        return adapter;
      } else if (name2 === WALLET_ADAPTERS.PHANTOM) {
        const {
          PhantomAdapter
        } = await import("/build/_shared/phantomAdapter.esm-CEPWWDMB.js");
        const adapter = new PhantomAdapter({
          chainConfig: finalChainConfig
        });
        return adapter;
      } else if (name2 === WALLET_ADAPTERS.WALLET_CONNECT_V1) {
        const {
          WalletConnectV1Adapter
        } = await import("/build/_shared/walletConnectV1Adapter.esm-4VN4E3XH.js");
        const adapter = new WalletConnectV1Adapter({
          chainConfig: finalChainConfig
        });
        return adapter;
      } else if (name2 === WALLET_ADAPTERS.OPENLOGIN) {
        const {
          OpenloginAdapter,
          getOpenloginDefaultOptions
        } = await import("/build/_shared/openloginAdapter.esm-YZXBO565.js");
        const defaultOptions = getOpenloginDefaultOptions(customChainConfig.chainNamespace, customChainConfig === null || customChainConfig === void 0 ? void 0 : customChainConfig.chainId);
        const adapter = new OpenloginAdapter(_objectSpread$2(_objectSpread$2({}, defaultOptions), {}, {
          chainConfig: _objectSpread$2(_objectSpread$2({}, defaultOptions.chainConfig || {}), finalChainConfig),
          adapterSettings: _objectSpread$2(_objectSpread$2({}, defaultOptions.adapterSettings), {}, {
            clientId
          })
        }));
        return adapter;
      }
      throw new Error("Invalid wallet adapter name");
    };
    getAdapterSocialLogins = function(adapterName, adapter) {
      let loginMethodsConfig = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const finalLoginMethodsConfig = {};
      if (adapterName === WALLET_ADAPTERS.OPENLOGIN) {
        OPENLOGIN_PROVIDERS.forEach((loginMethod) => {
          const currentLoginMethodConfig = loginMethodsConfig[loginMethod] || {
            name: loginMethod,
            showOnMobile: true,
            showOnModal: true,
            showOnDesktop: true
          };
          finalLoginMethodsConfig[loginMethod] = _objectSpread$1({}, currentLoginMethodConfig);
          import_loglevel3.default.debug("OpenLogin login method ui config", finalLoginMethodsConfig);
        });
      } else {
        throw new Error("".concat(adapterName, " is not a valid adapter"));
      }
      return finalLoginMethodsConfig;
    };
    import_loglevel3.default.enableAll();
    import_loglevel3.default.setLevel("debug");
    Web3Auth = class extends Web3AuthCore {
      constructor(options) {
        var _this$options$uiConfi, _this$options$uiConfi2;
        super(options);
        _defineProperty(this, "loginModal", void 0);
        _defineProperty(this, "options", void 0);
        _defineProperty(this, "modalConfig", defaultEvmDappModalConfig);
        this.options = _objectSpread3({}, options);
        const providedChainConfig = this.options.chainConfig;
        if (providedChainConfig.chainNamespace === CHAIN_NAMESPACES.SOLANA) {
          if (options.authMode === "WALLET") {
            this.modalConfig = defaultSolanaWalletModalConfig;
          } else {
            this.modalConfig = defaultSolanaDappModalConfig;
          }
        } else if (providedChainConfig.chainNamespace === CHAIN_NAMESPACES.EIP155) {
          if (options.authMode === "WALLET") {
            this.modalConfig = defaultEvmWalletModalConfig;
          } else {
            this.modalConfig = defaultEvmDappModalConfig;
          }
        } else {
          throw new Error("Invalid chainNamespace provided: ".concat(providedChainConfig.chainNamespace));
        }
        this.loginModal = new LoginModal({
          theme: (_this$options$uiConfi = this.options.uiConfig) === null || _this$options$uiConfi === void 0 ? void 0 : _this$options$uiConfi.theme,
          appLogo: ((_this$options$uiConfi2 = this.options.uiConfig) === null || _this$options$uiConfi2 === void 0 ? void 0 : _this$options$uiConfi2.appLogo) || "",
          version: "",
          adapterListener: this
        });
        this.subscribeToLoginModalEvents();
      }
      async initModal(params) {
        super.checkInitRequirements();
        await this.loginModal.initModal();
        const providedChainConfig = this.options.chainConfig;
        const allAdapters = [.../* @__PURE__ */ new Set([...Object.keys(this.modalConfig.adapters || {}), ...Object.keys(this.walletAdapters)])];
        const adapterConfigurationPromises = allAdapters.map(async (adapterName) => {
          var _this$modalConfig$ada, _params$modalConfig, _this$modalConfig$ada2, _this$modalConfig$ada3;
          let adapterConfig = ((_this$modalConfig$ada = this.modalConfig.adapters) === null || _this$modalConfig$ada === void 0 ? void 0 : _this$modalConfig$ada[adapterName]) || {
            label: adapterName,
            showOnModal: true,
            showOnMobile: true,
            showOnDesktop: true
          };
          if (params !== null && params !== void 0 && (_params$modalConfig = params.modalConfig) !== null && _params$modalConfig !== void 0 && _params$modalConfig[adapterName]) {
            adapterConfig = _objectSpread3(_objectSpread3({}, adapterConfig), params.modalConfig[adapterName]);
          }
          this.modalConfig.adapters[adapterName] = adapterConfig;
          const adapter = this.walletAdapters[adapterName];
          import_loglevel3.default.debug("adapter config", adapterName, (_this$modalConfig$ada2 = this.modalConfig.adapters) === null || _this$modalConfig$ada2 === void 0 ? void 0 : _this$modalConfig$ada2[adapterName].showOnModal);
          if (!adapter && (_this$modalConfig$ada3 = this.modalConfig.adapters) !== null && _this$modalConfig$ada3 !== void 0 && _this$modalConfig$ada3[adapterName].showOnModal) {
            const ad = await getDefaultAdapterModule({
              name: adapterName,
              customChainConfig: this.options.chainConfig,
              clientId: this.options.clientId
            });
            this.walletAdapters[adapterName] = ad;
            return adapterName;
          } else if ((adapter === null || adapter === void 0 ? void 0 : adapter.type) === ADAPTER_CATEGORY.IN_APP || (adapter === null || adapter === void 0 ? void 0 : adapter.type) === ADAPTER_CATEGORY.EXTERNAL || adapterName === this.cachedAdapter) {
            var _this$modalConfig$ada4;
            if (!((_this$modalConfig$ada4 = this.modalConfig.adapters) !== null && _this$modalConfig$ada4 !== void 0 && _this$modalConfig$ada4[adapterName].showOnModal))
              return;
            if (adapterName === WALLET_ADAPTERS.OPENLOGIN) {
              this.walletAdapters[adapterName].setAdapterSettings({
                clientId: this.options.clientId
              });
            }
            if (!adapter.chainConfigProxy) {
              var _this$coreOptions$cha;
              const chainConfig = _objectSpread3(_objectSpread3({}, getChainConfig(providedChainConfig.chainNamespace, (_this$coreOptions$cha = this.coreOptions.chainConfig) === null || _this$coreOptions$cha === void 0 ? void 0 : _this$coreOptions$cha.chainId)), this.coreOptions.chainConfig);
              this.walletAdapters[adapterName].setChainConfig(chainConfig);
            }
            return adapterName;
          }
        });
        const adapterNames = await Promise.all(adapterConfigurationPromises);
        const hasInAppWallets = Object.values(this.walletAdapters).some((adapter) => {
          if (adapter.type !== ADAPTER_CATEGORY.IN_APP)
            return false;
          if (this.modalConfig.adapters[adapter.name].showOnModal !== true)
            return false;
          if (!this.modalConfig.adapters[adapter.name].loginMethods)
            return true;
          if (Object.values(this.modalConfig.adapters[adapter.name].loginMethods).some((method) => method.showOnModal))
            return true;
          return false;
        });
        import_loglevel3.default.debug(hasInAppWallets, this.walletAdapters, "hasInAppWallets");
        const initPromises = adapterNames.map(async (adapterName) => {
          if (!adapterName)
            return;
          try {
            const adapter = this.walletAdapters[adapterName];
            if (this.cachedAdapter !== adapterName && adapter.type === ADAPTER_CATEGORY.EXTERNAL) {
              return;
            }
            this.subscribeToAdapterEvents(adapter);
            if (adapter.status === ADAPTER_STATUS.NOT_READY)
              await adapter.init({
                autoConnect: this.cachedAdapter === adapterName
              });
            if (adapter.type === ADAPTER_CATEGORY.IN_APP) {
              this.initializeInAppWallet(adapterName);
            }
          } catch (error) {
            import_loglevel3.default.error(error, "error while initializing adapter");
          }
        });
        this.status = ADAPTER_STATUS.READY;
        await Promise.all(initPromises);
        const hasExternalWallets = allAdapters.some((adapterName) => {
          var _this$walletAdapters$, _this$modalConfig$ada5;
          return ((_this$walletAdapters$ = this.walletAdapters[adapterName]) === null || _this$walletAdapters$ === void 0 ? void 0 : _this$walletAdapters$.type) === ADAPTER_CATEGORY.EXTERNAL && ((_this$modalConfig$ada5 = this.modalConfig.adapters) === null || _this$modalConfig$ada5 === void 0 ? void 0 : _this$modalConfig$ada5[adapterName].showOnModal);
        });
        if (hasExternalWallets) {
          this.loginModal.initExternalWalletContainer();
        }
        if (!hasInAppWallets && hasExternalWallets) {
          await this.initExternalWalletAdapters(false, {
            showExternalWalletsOnly: true
          });
        }
      }
      async connect() {
        if (this.provider)
          return this.provider;
        this.loginModal.open();
        return new Promise((resolve, reject) => {
          this.once(ADAPTER_EVENTS.CONNECTED, () => {
            return resolve(this.provider);
          });
          this.once(ADAPTER_EVENTS.ERRORED, (err) => {
            return reject(err);
          });
        });
      }
      async initExternalWalletAdapters(externalWalletsInitialized, options) {
        if (externalWalletsInitialized)
          return;
        const adaptersConfig = {};
        const adaptersData = {};
        const adapterPromises = Object.keys(this.walletAdapters).map(async (adapterName) => {
          try {
            const adapter = this.walletAdapters[adapterName];
            if ((adapter === null || adapter === void 0 ? void 0 : adapter.type) === ADAPTER_CATEGORY.EXTERNAL) {
              import_loglevel3.default.debug("init external wallet", this.cachedAdapter, adapterName);
              this.subscribeToAdapterEvents(adapter);
              if (this.cachedAdapter === adapterName) {
                return;
              }
              if (adapter.status === ADAPTER_STATUS.NOT_READY)
                await adapter.init({
                  autoConnect: this.cachedAdapter === adapterName
                });
              adaptersConfig[adapterName] = this.modalConfig.adapters[adapterName];
              adaptersData[adapterName] = adapter.adapterData || {};
              return adapterName;
            }
          } catch (error) {
            import_loglevel3.default.error(error, "error while initializing adapter");
          }
        });
        const adapterInitResults = await Promise.all(adapterPromises);
        const finalAdaptersConfig = {};
        adapterInitResults.forEach((result) => {
          if (result) {
            finalAdaptersConfig[result] = adaptersConfig[result];
          }
        });
        this.loginModal.addWalletLogins(finalAdaptersConfig, {
          showExternalWalletsOnly: !!(options !== null && options !== void 0 && options.showExternalWalletsOnly)
        });
      }
      initializeInAppWallet(adapterName) {
        import_loglevel3.default.info("adapterInitResults", adapterName);
        if (this.walletAdapters[adapterName].type === ADAPTER_CATEGORY.IN_APP) {
          var _this$modalConfig$ada6, _this$options$uiConfi3;
          this.loginModal.addSocialLogins(adapterName, getAdapterSocialLogins(adapterName, this.walletAdapters[adapterName], (_this$modalConfig$ada6 = this.modalConfig.adapters[adapterName]) === null || _this$modalConfig$ada6 === void 0 ? void 0 : _this$modalConfig$ada6.loginMethods), ((_this$options$uiConfi3 = this.options.uiConfig) === null || _this$options$uiConfi3 === void 0 ? void 0 : _this$options$uiConfi3.loginMethodsOrder) || OPENLOGIN_PROVIDERS);
        }
      }
      subscribeToLoginModalEvents() {
        this.loginModal.on(LOGIN_MODAL_EVENTS.LOGIN, async (params) => {
          try {
            await this.connectTo(params.adapter, params.loginParams);
          } catch (error) {
            import_loglevel3.default.error("Error while connecting to adapter: ".concat(params.adapter), error);
          }
        });
        this.loginModal.on(LOGIN_MODAL_EVENTS.INIT_EXTERNAL_WALLETS, async (params) => {
          await this.initExternalWalletAdapters(params.externalWalletsInitialized);
        });
        this.loginModal.on(LOGIN_MODAL_EVENTS.DISCONNECT, async () => {
          try {
            await this.logout();
          } catch (error) {
            import_loglevel3.default.error("Error while disconnecting", error);
          }
        });
        this.loginModal.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, async (visibility) => {
          var _this$walletAdapters$2;
          import_loglevel3.default.debug("is login modal visible", visibility);
          this.emit(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, visibility);
          const walletConnectStatus = (_this$walletAdapters$2 = this.walletAdapters[WALLET_ADAPTERS.WALLET_CONNECT_V1]) === null || _this$walletAdapters$2 === void 0 ? void 0 : _this$walletAdapters$2.status;
          if (visibility && walletConnectStatus === ADAPTER_STATUS.READY) {
            try {
              this.walletAdapters[WALLET_ADAPTERS.WALLET_CONNECT_V1].connect();
            } catch (error) {
              import_loglevel3.default.error("Error while disconnecting to wallet connect in core", error);
            }
          }
        });
      }
    };
  }
});

export {
  require_jsx_runtime,
  lib_exports5 as lib_exports,
  init_lib31 as init_lib,
  web3auth_esm_exports,
  init_web3auth_esm,
  require_aes,
  require_enc_utf8,
  require_axios2 as require_axios
};
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=/build/_shared/chunk-JRUQFYTH.js.map
