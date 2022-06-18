import {
  require_sha3
} from "/build/_shared/chunk-EUMB4PXB.js";
import {
  require_bn,
  require_hash
} from "/build/_shared/chunk-XHQWQGJR.js";
import {
  __esm,
  __export,
  __toModule,
  init_react
} from "/build/_shared/chunk-ZBXWLNC7.js";

// node_modules/@ethersproject/logger/lib.esm/_version.js
var version;
var init_version = __esm({
  "node_modules/@ethersproject/logger/lib.esm/_version.js"() {
    init_react();
    version = "logger/5.5.0";
  }
});

// node_modules/@ethersproject/logger/lib.esm/index.js
function _checkNormalize() {
  try {
    const missing = [];
    ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
      try {
        if ("test".normalize(form) !== "test") {
          throw new Error("bad normalize");
        }
        ;
      } catch (error) {
        missing.push(form);
      }
    });
    if (missing.length) {
      throw new Error("missing " + missing.join(", "));
    }
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769)) {
      throw new Error("broken implementation");
    }
  } catch (error) {
    return error.message;
  }
  return null;
}
var _permanentCensorErrors, _censorErrors, LogLevels, _logLevel, _globalLogger, _normalizeError, LogLevel, ErrorCode, HEX, Logger;
var init_lib = __esm({
  "node_modules/@ethersproject/logger/lib.esm/index.js"() {
    init_react();
    init_version();
    "use strict";
    _permanentCensorErrors = false;
    _censorErrors = false;
    LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 };
    _logLevel = LogLevels["default"];
    _globalLogger = null;
    _normalizeError = _checkNormalize();
    (function(LogLevel2) {
      LogLevel2["DEBUG"] = "DEBUG";
      LogLevel2["INFO"] = "INFO";
      LogLevel2["WARNING"] = "WARNING";
      LogLevel2["ERROR"] = "ERROR";
      LogLevel2["OFF"] = "OFF";
    })(LogLevel || (LogLevel = {}));
    (function(ErrorCode2) {
      ErrorCode2["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
      ErrorCode2["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
      ErrorCode2["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
      ErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
      ErrorCode2["SERVER_ERROR"] = "SERVER_ERROR";
      ErrorCode2["TIMEOUT"] = "TIMEOUT";
      ErrorCode2["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
      ErrorCode2["NUMERIC_FAULT"] = "NUMERIC_FAULT";
      ErrorCode2["MISSING_NEW"] = "MISSING_NEW";
      ErrorCode2["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
      ErrorCode2["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
      ErrorCode2["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
      ErrorCode2["CALL_EXCEPTION"] = "CALL_EXCEPTION";
      ErrorCode2["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
      ErrorCode2["NONCE_EXPIRED"] = "NONCE_EXPIRED";
      ErrorCode2["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
      ErrorCode2["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
      ErrorCode2["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
    })(ErrorCode || (ErrorCode = {}));
    HEX = "0123456789abcdef";
    Logger = class {
      constructor(version11) {
        Object.defineProperty(this, "version", {
          enumerable: true,
          value: version11,
          writable: false
        });
      }
      _log(logLevel, args) {
        const level = logLevel.toLowerCase();
        if (LogLevels[level] == null) {
          this.throwArgumentError("invalid log level name", "logLevel", logLevel);
        }
        if (_logLevel > LogLevels[level]) {
          return;
        }
        console.log.apply(console, args);
      }
      debug(...args) {
        this._log(Logger.levels.DEBUG, args);
      }
      info(...args) {
        this._log(Logger.levels.INFO, args);
      }
      warn(...args) {
        this._log(Logger.levels.WARNING, args);
      }
      makeError(message, code, params) {
        if (_censorErrors) {
          return this.makeError("censored error", code, {});
        }
        if (!code) {
          code = Logger.errors.UNKNOWN_ERROR;
        }
        if (!params) {
          params = {};
        }
        const messageDetails = [];
        Object.keys(params).forEach((key2) => {
          const value = params[key2];
          try {
            if (value instanceof Uint8Array) {
              let hex = "";
              for (let i = 0; i < value.length; i++) {
                hex += HEX[value[i] >> 4];
                hex += HEX[value[i] & 15];
              }
              messageDetails.push(key2 + "=Uint8Array(0x" + hex + ")");
            } else {
              messageDetails.push(key2 + "=" + JSON.stringify(value));
            }
          } catch (error2) {
            messageDetails.push(key2 + "=" + JSON.stringify(params[key2].toString()));
          }
        });
        messageDetails.push(`code=${code}`);
        messageDetails.push(`version=${this.version}`);
        const reason = message;
        if (messageDetails.length) {
          message += " (" + messageDetails.join(", ") + ")";
        }
        const error = new Error(message);
        error.reason = reason;
        error.code = code;
        Object.keys(params).forEach(function(key2) {
          error[key2] = params[key2];
        });
        return error;
      }
      throwError(message, code, params) {
        throw this.makeError(message, code, params);
      }
      throwArgumentError(message, name, value) {
        return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
          argument: name,
          value
        });
      }
      assert(condition, message, code, params) {
        if (!!condition) {
          return;
        }
        this.throwError(message, code, params);
      }
      assertArgument(condition, message, name, value) {
        if (!!condition) {
          return;
        }
        this.throwArgumentError(message, name, value);
      }
      checkNormalize(message) {
        if (message == null) {
          message = "platform missing String.prototype.normalize";
        }
        if (_normalizeError) {
          this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "String.prototype.normalize",
            form: _normalizeError
          });
        }
      }
      checkSafeUint53(value, message) {
        if (typeof value !== "number") {
          return;
        }
        if (message == null) {
          message = "value not safe";
        }
        if (value < 0 || value >= 9007199254740991) {
          this.throwError(message, Logger.errors.NUMERIC_FAULT, {
            operation: "checkSafeInteger",
            fault: "out-of-safe-range",
            value
          });
        }
        if (value % 1) {
          this.throwError(message, Logger.errors.NUMERIC_FAULT, {
            operation: "checkSafeInteger",
            fault: "non-integer",
            value
          });
        }
      }
      checkArgumentCount(count, expectedCount, message) {
        if (message) {
          message = ": " + message;
        } else {
          message = "";
        }
        if (count < expectedCount) {
          this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
            count,
            expectedCount
          });
        }
        if (count > expectedCount) {
          this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
            count,
            expectedCount
          });
        }
      }
      checkNew(target, kind) {
        if (target === Object || target == null) {
          this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
        }
      }
      checkAbstract(target, kind) {
        if (target === kind) {
          this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" });
        } else if (target === Object || target == null) {
          this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
        }
      }
      static globalLogger() {
        if (!_globalLogger) {
          _globalLogger = new Logger(version);
        }
        return _globalLogger;
      }
      static setCensorship(censorship, permanent) {
        if (!censorship && permanent) {
          this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "setCensorship"
          });
        }
        if (_permanentCensorErrors) {
          if (!censorship) {
            return;
          }
          this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "setCensorship"
          });
        }
        _censorErrors = !!censorship;
        _permanentCensorErrors = !!permanent;
      }
      static setLogLevel(logLevel) {
        const level = LogLevels[logLevel.toLowerCase()];
        if (level == null) {
          Logger.globalLogger().warn("invalid log level - " + logLevel);
          return;
        }
        _logLevel = level;
      }
      static from(version11) {
        return new Logger(version11);
      }
    };
    Logger.errors = ErrorCode;
    Logger.levels = LogLevel;
  }
});

// node_modules/@ethersproject/bytes/lib.esm/_version.js
var version2;
var init_version2 = __esm({
  "node_modules/@ethersproject/bytes/lib.esm/_version.js"() {
    init_react();
    version2 = "bytes/5.5.0";
  }
});

// node_modules/@ethersproject/bytes/lib.esm/index.js
function isHexable(value) {
  return !!value.toHexString;
}
function addSlice(array) {
  if (array.slice) {
    return array;
  }
  array.slice = function() {
    const args = Array.prototype.slice.call(arguments);
    return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
  };
  return array;
}
function isBytesLike(value) {
  return isHexString(value) && !(value.length % 2) || isBytes(value);
}
function isInteger(value) {
  return typeof value === "number" && value == value && value % 1 === 0;
}
function isBytes(value) {
  if (value == null) {
    return false;
  }
  if (value.constructor === Uint8Array) {
    return true;
  }
  if (typeof value === "string") {
    return false;
  }
  if (!isInteger(value.length) || value.length < 0) {
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    if (!isInteger(v) || v < 0 || v >= 256) {
      return false;
    }
  }
  return true;
}
function arrayify(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid arrayify value");
    const result = [];
    while (value) {
      result.unshift(value & 255);
      value = parseInt(String(value / 256));
    }
    if (result.length === 0) {
      result.push(0);
    }
    return addSlice(new Uint8Array(result));
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexable(value)) {
    value = value.toHexString();
  }
  if (isHexString(value)) {
    let hex = value.substring(2);
    if (hex.length % 2) {
      if (options.hexPad === "left") {
        hex = "0x0" + hex.substring(2);
      } else if (options.hexPad === "right") {
        hex += "0";
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    const result = [];
    for (let i = 0; i < hex.length; i += 2) {
      result.push(parseInt(hex.substring(i, i + 2), 16));
    }
    return addSlice(new Uint8Array(result));
  }
  if (isBytes(value)) {
    return addSlice(new Uint8Array(value));
  }
  return logger.throwArgumentError("invalid arrayify value", "value", value);
}
function concat(items) {
  const objects = items.map((item) => arrayify(item));
  const length = objects.reduce((accum, item) => accum + item.length, 0);
  const result = new Uint8Array(length);
  objects.reduce((offset, object) => {
    result.set(object, offset);
    return offset + object.length;
  }, 0);
  return addSlice(result);
}
function stripZeros(value) {
  let result = arrayify(value);
  if (result.length === 0) {
    return result;
  }
  let start = 0;
  while (start < result.length && result[start] === 0) {
    start++;
  }
  if (start) {
    result = result.slice(start);
  }
  return result;
}
function zeroPad(value, length) {
  value = arrayify(value);
  if (value.length > length) {
    logger.throwArgumentError("value out of range", "value", arguments[0]);
  }
  const result = new Uint8Array(length);
  result.set(value, length - value.length);
  return addSlice(result);
}
function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}
function hexlify(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid hexlify value");
    let hex = "";
    while (value) {
      hex = HexCharacters[value & 15] + hex;
      value = Math.floor(value / 16);
    }
    if (hex.length) {
      if (hex.length % 2) {
        hex = "0" + hex;
      }
      return "0x" + hex;
    }
    return "0x00";
  }
  if (typeof value === "bigint") {
    value = value.toString(16);
    if (value.length % 2) {
      return "0x0" + value;
    }
    return "0x" + value;
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexable(value)) {
    return value.toHexString();
  }
  if (isHexString(value)) {
    if (value.length % 2) {
      if (options.hexPad === "left") {
        value = "0x0" + value.substring(2);
      } else if (options.hexPad === "right") {
        value += "0";
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    return value.toLowerCase();
  }
  if (isBytes(value)) {
    let result = "0x";
    for (let i = 0; i < value.length; i++) {
      let v = value[i];
      result += HexCharacters[(v & 240) >> 4] + HexCharacters[v & 15];
    }
    return result;
  }
  return logger.throwArgumentError("invalid hexlify value", "value", value);
}
function hexDataLength(data) {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    return null;
  }
  return (data.length - 2) / 2;
}
function hexDataSlice(data, offset, endOffset) {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    logger.throwArgumentError("invalid hexData", "value", data);
  }
  offset = 2 + 2 * offset;
  if (endOffset != null) {
    return "0x" + data.substring(offset, 2 + 2 * endOffset);
  }
  return "0x" + data.substring(offset);
}
function hexConcat(items) {
  let result = "0x";
  items.forEach((item) => {
    result += hexlify(item).substring(2);
  });
  return result;
}
function hexValue(value) {
  const trimmed = hexStripZeros(hexlify(value, { hexPad: "left" }));
  if (trimmed === "0x") {
    return "0x0";
  }
  return trimmed;
}
function hexStripZeros(value) {
  if (typeof value !== "string") {
    value = hexlify(value);
  }
  if (!isHexString(value)) {
    logger.throwArgumentError("invalid hex string", "value", value);
  }
  value = value.substring(2);
  let offset = 0;
  while (offset < value.length && value[offset] === "0") {
    offset++;
  }
  return "0x" + value.substring(offset);
}
function hexZeroPad(value, length) {
  if (typeof value !== "string") {
    value = hexlify(value);
  } else if (!isHexString(value)) {
    logger.throwArgumentError("invalid hex string", "value", value);
  }
  if (value.length > 2 * length + 2) {
    logger.throwArgumentError("value out of range", "value", arguments[1]);
  }
  while (value.length < 2 * length + 2) {
    value = "0x0" + value.substring(2);
  }
  return value;
}
function splitSignature(signature2) {
  const result = {
    r: "0x",
    s: "0x",
    _vs: "0x",
    recoveryParam: 0,
    v: 0
  };
  if (isBytesLike(signature2)) {
    const bytes = arrayify(signature2);
    if (bytes.length !== 65) {
      logger.throwArgumentError("invalid signature string; must be 65 bytes", "signature", signature2);
    }
    result.r = hexlify(bytes.slice(0, 32));
    result.s = hexlify(bytes.slice(32, 64));
    result.v = bytes[64];
    if (result.v < 27) {
      if (result.v === 0 || result.v === 1) {
        result.v += 27;
      } else {
        logger.throwArgumentError("signature invalid v byte", "signature", signature2);
      }
    }
    result.recoveryParam = 1 - result.v % 2;
    if (result.recoveryParam) {
      bytes[32] |= 128;
    }
    result._vs = hexlify(bytes.slice(32, 64));
  } else {
    result.r = signature2.r;
    result.s = signature2.s;
    result.v = signature2.v;
    result.recoveryParam = signature2.recoveryParam;
    result._vs = signature2._vs;
    if (result._vs != null) {
      const vs2 = zeroPad(arrayify(result._vs), 32);
      result._vs = hexlify(vs2);
      const recoveryParam = vs2[0] >= 128 ? 1 : 0;
      if (result.recoveryParam == null) {
        result.recoveryParam = recoveryParam;
      } else if (result.recoveryParam !== recoveryParam) {
        logger.throwArgumentError("signature recoveryParam mismatch _vs", "signature", signature2);
      }
      vs2[0] &= 127;
      const s = hexlify(vs2);
      if (result.s == null) {
        result.s = s;
      } else if (result.s !== s) {
        logger.throwArgumentError("signature v mismatch _vs", "signature", signature2);
      }
    }
    if (result.recoveryParam == null) {
      if (result.v == null) {
        logger.throwArgumentError("signature missing v and recoveryParam", "signature", signature2);
      } else if (result.v === 0 || result.v === 1) {
        result.recoveryParam = result.v;
      } else {
        result.recoveryParam = 1 - result.v % 2;
      }
    } else {
      if (result.v == null) {
        result.v = 27 + result.recoveryParam;
      } else {
        const recId = result.v === 0 || result.v === 1 ? result.v : 1 - result.v % 2;
        if (result.recoveryParam !== recId) {
          logger.throwArgumentError("signature recoveryParam mismatch v", "signature", signature2);
        }
      }
    }
    if (result.r == null || !isHexString(result.r)) {
      logger.throwArgumentError("signature missing or invalid r", "signature", signature2);
    } else {
      result.r = hexZeroPad(result.r, 32);
    }
    if (result.s == null || !isHexString(result.s)) {
      logger.throwArgumentError("signature missing or invalid s", "signature", signature2);
    } else {
      result.s = hexZeroPad(result.s, 32);
    }
    const vs = arrayify(result.s);
    if (vs[0] >= 128) {
      logger.throwArgumentError("signature s out of range", "signature", signature2);
    }
    if (result.recoveryParam) {
      vs[0] |= 128;
    }
    const _vs = hexlify(vs);
    if (result._vs) {
      if (!isHexString(result._vs)) {
        logger.throwArgumentError("signature invalid _vs", "signature", signature2);
      }
      result._vs = hexZeroPad(result._vs, 32);
    }
    if (result._vs == null) {
      result._vs = _vs;
    } else if (result._vs !== _vs) {
      logger.throwArgumentError("signature _vs mismatch v and s", "signature", signature2);
    }
  }
  return result;
}
function joinSignature(signature2) {
  signature2 = splitSignature(signature2);
  return hexlify(concat([
    signature2.r,
    signature2.s,
    signature2.recoveryParam ? "0x1c" : "0x1b"
  ]));
}
var logger, HexCharacters;
var init_lib2 = __esm({
  "node_modules/@ethersproject/bytes/lib.esm/index.js"() {
    init_react();
    init_lib();
    init_version2();
    "use strict";
    logger = new Logger(version2);
    HexCharacters = "0123456789abcdef";
  }
});

// node_modules/@ethersproject/bignumber/lib.esm/_version.js
var version3;
var init_version3 = __esm({
  "node_modules/@ethersproject/bignumber/lib.esm/_version.js"() {
    init_react();
    version3 = "bignumber/5.5.0";
  }
});

// node_modules/@ethersproject/bignumber/lib.esm/bignumber.js
function isBigNumberish(value) {
  return value != null && (BigNumber.isBigNumber(value) || typeof value === "number" && value % 1 === 0 || typeof value === "string" && !!value.match(/^-?[0-9]+$/) || isHexString(value) || typeof value === "bigint" || isBytes(value));
}
function toHex(value) {
  if (typeof value !== "string") {
    return toHex(value.toString(16));
  }
  if (value[0] === "-") {
    value = value.substring(1);
    if (value[0] === "-") {
      logger2.throwArgumentError("invalid hex", "value", value);
    }
    value = toHex(value);
    if (value === "0x00") {
      return value;
    }
    return "-" + value;
  }
  if (value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (value === "0x") {
    return "0x00";
  }
  if (value.length % 2) {
    value = "0x0" + value.substring(2);
  }
  while (value.length > 4 && value.substring(0, 4) === "0x00") {
    value = "0x" + value.substring(4);
  }
  return value;
}
function toBigNumber(value) {
  return BigNumber.from(toHex(value));
}
function toBN(value) {
  const hex = BigNumber.from(value).toHexString();
  if (hex[0] === "-") {
    return new BN("-" + hex.substring(3), 16);
  }
  return new BN(hex.substring(2), 16);
}
function throwFault(fault, operation, value) {
  const params = { fault, operation };
  if (value != null) {
    params.value = value;
  }
  return logger2.throwError(fault, Logger.errors.NUMERIC_FAULT, params);
}
function _base36To16(value) {
  return new BN(value, 36).toString(16);
}
function _base16To36(value) {
  return new BN(value, 16).toString(36);
}
var import_bn, BN, logger2, _constructorGuard, MAX_SAFE, _warnedToStringRadix, BigNumber;
var init_bignumber = __esm({
  "node_modules/@ethersproject/bignumber/lib.esm/bignumber.js"() {
    init_react();
    import_bn = __toModule(require_bn());
    init_lib2();
    init_lib();
    init_version3();
    "use strict";
    BN = import_bn.default.BN;
    logger2 = new Logger(version3);
    _constructorGuard = {};
    MAX_SAFE = 9007199254740991;
    _warnedToStringRadix = false;
    BigNumber = class {
      constructor(constructorGuard, hex) {
        logger2.checkNew(new.target, BigNumber);
        if (constructorGuard !== _constructorGuard) {
          logger2.throwError("cannot call constructor directly; use BigNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "new (BigNumber)"
          });
        }
        this._hex = hex;
        this._isBigNumber = true;
        Object.freeze(this);
      }
      fromTwos(value) {
        return toBigNumber(toBN(this).fromTwos(value));
      }
      toTwos(value) {
        return toBigNumber(toBN(this).toTwos(value));
      }
      abs() {
        if (this._hex[0] === "-") {
          return BigNumber.from(this._hex.substring(1));
        }
        return this;
      }
      add(other) {
        return toBigNumber(toBN(this).add(toBN(other)));
      }
      sub(other) {
        return toBigNumber(toBN(this).sub(toBN(other)));
      }
      div(other) {
        const o = BigNumber.from(other);
        if (o.isZero()) {
          throwFault("division by zero", "div");
        }
        return toBigNumber(toBN(this).div(toBN(other)));
      }
      mul(other) {
        return toBigNumber(toBN(this).mul(toBN(other)));
      }
      mod(other) {
        const value = toBN(other);
        if (value.isNeg()) {
          throwFault("cannot modulo negative values", "mod");
        }
        return toBigNumber(toBN(this).umod(value));
      }
      pow(other) {
        const value = toBN(other);
        if (value.isNeg()) {
          throwFault("cannot raise to negative values", "pow");
        }
        return toBigNumber(toBN(this).pow(value));
      }
      and(other) {
        const value = toBN(other);
        if (this.isNegative() || value.isNeg()) {
          throwFault("cannot 'and' negative values", "and");
        }
        return toBigNumber(toBN(this).and(value));
      }
      or(other) {
        const value = toBN(other);
        if (this.isNegative() || value.isNeg()) {
          throwFault("cannot 'or' negative values", "or");
        }
        return toBigNumber(toBN(this).or(value));
      }
      xor(other) {
        const value = toBN(other);
        if (this.isNegative() || value.isNeg()) {
          throwFault("cannot 'xor' negative values", "xor");
        }
        return toBigNumber(toBN(this).xor(value));
      }
      mask(value) {
        if (this.isNegative() || value < 0) {
          throwFault("cannot mask negative values", "mask");
        }
        return toBigNumber(toBN(this).maskn(value));
      }
      shl(value) {
        if (this.isNegative() || value < 0) {
          throwFault("cannot shift negative values", "shl");
        }
        return toBigNumber(toBN(this).shln(value));
      }
      shr(value) {
        if (this.isNegative() || value < 0) {
          throwFault("cannot shift negative values", "shr");
        }
        return toBigNumber(toBN(this).shrn(value));
      }
      eq(other) {
        return toBN(this).eq(toBN(other));
      }
      lt(other) {
        return toBN(this).lt(toBN(other));
      }
      lte(other) {
        return toBN(this).lte(toBN(other));
      }
      gt(other) {
        return toBN(this).gt(toBN(other));
      }
      gte(other) {
        return toBN(this).gte(toBN(other));
      }
      isNegative() {
        return this._hex[0] === "-";
      }
      isZero() {
        return toBN(this).isZero();
      }
      toNumber() {
        try {
          return toBN(this).toNumber();
        } catch (error) {
          throwFault("overflow", "toNumber", this.toString());
        }
        return null;
      }
      toBigInt() {
        try {
          return BigInt(this.toString());
        } catch (e) {
        }
        return logger2.throwError("this platform does not support BigInt", Logger.errors.UNSUPPORTED_OPERATION, {
          value: this.toString()
        });
      }
      toString() {
        if (arguments.length > 0) {
          if (arguments[0] === 10) {
            if (!_warnedToStringRadix) {
              _warnedToStringRadix = true;
              logger2.warn("BigNumber.toString does not accept any parameters; base-10 is assumed");
            }
          } else if (arguments[0] === 16) {
            logger2.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", Logger.errors.UNEXPECTED_ARGUMENT, {});
          } else {
            logger2.throwError("BigNumber.toString does not accept parameters", Logger.errors.UNEXPECTED_ARGUMENT, {});
          }
        }
        return toBN(this).toString(10);
      }
      toHexString() {
        return this._hex;
      }
      toJSON(key2) {
        return { type: "BigNumber", hex: this.toHexString() };
      }
      static from(value) {
        if (value instanceof BigNumber) {
          return value;
        }
        if (typeof value === "string") {
          if (value.match(/^-?0x[0-9a-f]+$/i)) {
            return new BigNumber(_constructorGuard, toHex(value));
          }
          if (value.match(/^-?[0-9]+$/)) {
            return new BigNumber(_constructorGuard, toHex(new BN(value)));
          }
          return logger2.throwArgumentError("invalid BigNumber string", "value", value);
        }
        if (typeof value === "number") {
          if (value % 1) {
            throwFault("underflow", "BigNumber.from", value);
          }
          if (value >= MAX_SAFE || value <= -MAX_SAFE) {
            throwFault("overflow", "BigNumber.from", value);
          }
          return BigNumber.from(String(value));
        }
        const anyValue = value;
        if (typeof anyValue === "bigint") {
          return BigNumber.from(anyValue.toString());
        }
        if (isBytes(anyValue)) {
          return BigNumber.from(hexlify(anyValue));
        }
        if (anyValue) {
          if (anyValue.toHexString) {
            const hex = anyValue.toHexString();
            if (typeof hex === "string") {
              return BigNumber.from(hex);
            }
          } else {
            let hex = anyValue._hex;
            if (hex == null && anyValue.type === "BigNumber") {
              hex = anyValue.hex;
            }
            if (typeof hex === "string") {
              if (isHexString(hex) || hex[0] === "-" && isHexString(hex.substring(1))) {
                return BigNumber.from(hex);
              }
            }
          }
        }
        return logger2.throwArgumentError("invalid BigNumber value", "value", value);
      }
      static isBigNumber(value) {
        return !!(value && value._isBigNumber);
      }
    };
  }
});

// node_modules/@ethersproject/bignumber/lib.esm/fixednumber.js
function throwFault2(message, fault, operation, value) {
  const params = { fault, operation };
  if (value !== void 0) {
    params.value = value;
  }
  return logger3.throwError(message, Logger.errors.NUMERIC_FAULT, params);
}
function getMultiplier(decimals) {
  if (typeof decimals !== "number") {
    try {
      decimals = BigNumber.from(decimals).toNumber();
    } catch (e) {
    }
  }
  if (typeof decimals === "number" && decimals >= 0 && decimals <= 256 && !(decimals % 1)) {
    return "1" + zeros.substring(0, decimals);
  }
  return logger3.throwArgumentError("invalid decimal size", "decimals", decimals);
}
function formatFixed(value, decimals) {
  if (decimals == null) {
    decimals = 0;
  }
  const multiplier = getMultiplier(decimals);
  value = BigNumber.from(value);
  const negative = value.lt(Zero);
  if (negative) {
    value = value.mul(NegativeOne);
  }
  let fraction = value.mod(multiplier).toString();
  while (fraction.length < multiplier.length - 1) {
    fraction = "0" + fraction;
  }
  fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  const whole = value.div(multiplier).toString();
  if (multiplier.length === 1) {
    value = whole;
  } else {
    value = whole + "." + fraction;
  }
  if (negative) {
    value = "-" + value;
  }
  return value;
}
function parseFixed(value, decimals) {
  if (decimals == null) {
    decimals = 0;
  }
  const multiplier = getMultiplier(decimals);
  if (typeof value !== "string" || !value.match(/^-?[0-9.]+$/)) {
    logger3.throwArgumentError("invalid decimal value", "value", value);
  }
  const negative = value.substring(0, 1) === "-";
  if (negative) {
    value = value.substring(1);
  }
  if (value === ".") {
    logger3.throwArgumentError("missing value", "value", value);
  }
  const comps = value.split(".");
  if (comps.length > 2) {
    logger3.throwArgumentError("too many decimal points", "value", value);
  }
  let whole = comps[0], fraction = comps[1];
  if (!whole) {
    whole = "0";
  }
  if (!fraction) {
    fraction = "0";
  }
  while (fraction[fraction.length - 1] === "0") {
    fraction = fraction.substring(0, fraction.length - 1);
  }
  if (fraction.length > multiplier.length - 1) {
    throwFault2("fractional component exceeds decimals", "underflow", "parseFixed");
  }
  if (fraction === "") {
    fraction = "0";
  }
  while (fraction.length < multiplier.length - 1) {
    fraction += "0";
  }
  const wholeValue = BigNumber.from(whole);
  const fractionValue = BigNumber.from(fraction);
  let wei = wholeValue.mul(multiplier).add(fractionValue);
  if (negative) {
    wei = wei.mul(NegativeOne);
  }
  return wei;
}
var logger3, _constructorGuard2, Zero, NegativeOne, zeros, FixedFormat, FixedNumber, ONE, BUMP;
var init_fixednumber = __esm({
  "node_modules/@ethersproject/bignumber/lib.esm/fixednumber.js"() {
    init_react();
    init_lib2();
    init_lib();
    init_version3();
    init_bignumber();
    "use strict";
    logger3 = new Logger(version3);
    _constructorGuard2 = {};
    Zero = BigNumber.from(0);
    NegativeOne = BigNumber.from(-1);
    zeros = "0";
    while (zeros.length < 256) {
      zeros += zeros;
    }
    FixedFormat = class {
      constructor(constructorGuard, signed, width, decimals) {
        if (constructorGuard !== _constructorGuard2) {
          logger3.throwError("cannot use FixedFormat constructor; use FixedFormat.from", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "new FixedFormat"
          });
        }
        this.signed = signed;
        this.width = width;
        this.decimals = decimals;
        this.name = (signed ? "" : "u") + "fixed" + String(width) + "x" + String(decimals);
        this._multiplier = getMultiplier(decimals);
        Object.freeze(this);
      }
      static from(value) {
        if (value instanceof FixedFormat) {
          return value;
        }
        if (typeof value === "number") {
          value = `fixed128x${value}`;
        }
        let signed = true;
        let width = 128;
        let decimals = 18;
        if (typeof value === "string") {
          if (value === "fixed") {
          } else if (value === "ufixed") {
            signed = false;
          } else {
            const match = value.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
            if (!match) {
              logger3.throwArgumentError("invalid fixed format", "format", value);
            }
            signed = match[1] !== "u";
            width = parseInt(match[2]);
            decimals = parseInt(match[3]);
          }
        } else if (value) {
          const check = (key2, type, defaultValue) => {
            if (value[key2] == null) {
              return defaultValue;
            }
            if (typeof value[key2] !== type) {
              logger3.throwArgumentError("invalid fixed format (" + key2 + " not " + type + ")", "format." + key2, value[key2]);
            }
            return value[key2];
          };
          signed = check("signed", "boolean", signed);
          width = check("width", "number", width);
          decimals = check("decimals", "number", decimals);
        }
        if (width % 8) {
          logger3.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", width);
        }
        if (decimals > 80) {
          logger3.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", decimals);
        }
        return new FixedFormat(_constructorGuard2, signed, width, decimals);
      }
    };
    FixedNumber = class {
      constructor(constructorGuard, hex, value, format) {
        logger3.checkNew(new.target, FixedNumber);
        if (constructorGuard !== _constructorGuard2) {
          logger3.throwError("cannot use FixedNumber constructor; use FixedNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "new FixedFormat"
          });
        }
        this.format = format;
        this._hex = hex;
        this._value = value;
        this._isFixedNumber = true;
        Object.freeze(this);
      }
      _checkFormat(other) {
        if (this.format.name !== other.format.name) {
          logger3.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", other);
        }
      }
      addUnsafe(other) {
        this._checkFormat(other);
        const a = parseFixed(this._value, this.format.decimals);
        const b = parseFixed(other._value, other.format.decimals);
        return FixedNumber.fromValue(a.add(b), this.format.decimals, this.format);
      }
      subUnsafe(other) {
        this._checkFormat(other);
        const a = parseFixed(this._value, this.format.decimals);
        const b = parseFixed(other._value, other.format.decimals);
        return FixedNumber.fromValue(a.sub(b), this.format.decimals, this.format);
      }
      mulUnsafe(other) {
        this._checkFormat(other);
        const a = parseFixed(this._value, this.format.decimals);
        const b = parseFixed(other._value, other.format.decimals);
        return FixedNumber.fromValue(a.mul(b).div(this.format._multiplier), this.format.decimals, this.format);
      }
      divUnsafe(other) {
        this._checkFormat(other);
        const a = parseFixed(this._value, this.format.decimals);
        const b = parseFixed(other._value, other.format.decimals);
        return FixedNumber.fromValue(a.mul(this.format._multiplier).div(b), this.format.decimals, this.format);
      }
      floor() {
        const comps = this.toString().split(".");
        if (comps.length === 1) {
          comps.push("0");
        }
        let result = FixedNumber.from(comps[0], this.format);
        const hasFraction = !comps[1].match(/^(0*)$/);
        if (this.isNegative() && hasFraction) {
          result = result.subUnsafe(ONE.toFormat(result.format));
        }
        return result;
      }
      ceiling() {
        const comps = this.toString().split(".");
        if (comps.length === 1) {
          comps.push("0");
        }
        let result = FixedNumber.from(comps[0], this.format);
        const hasFraction = !comps[1].match(/^(0*)$/);
        if (!this.isNegative() && hasFraction) {
          result = result.addUnsafe(ONE.toFormat(result.format));
        }
        return result;
      }
      round(decimals) {
        if (decimals == null) {
          decimals = 0;
        }
        const comps = this.toString().split(".");
        if (comps.length === 1) {
          comps.push("0");
        }
        if (decimals < 0 || decimals > 80 || decimals % 1) {
          logger3.throwArgumentError("invalid decimal count", "decimals", decimals);
        }
        if (comps[1].length <= decimals) {
          return this;
        }
        const factor = FixedNumber.from("1" + zeros.substring(0, decimals), this.format);
        const bump = BUMP.toFormat(this.format);
        return this.mulUnsafe(factor).addUnsafe(bump).floor().divUnsafe(factor);
      }
      isZero() {
        return this._value === "0.0" || this._value === "0";
      }
      isNegative() {
        return this._value[0] === "-";
      }
      toString() {
        return this._value;
      }
      toHexString(width) {
        if (width == null) {
          return this._hex;
        }
        if (width % 8) {
          logger3.throwArgumentError("invalid byte width", "width", width);
        }
        const hex = BigNumber.from(this._hex).fromTwos(this.format.width).toTwos(width).toHexString();
        return hexZeroPad(hex, width / 8);
      }
      toUnsafeFloat() {
        return parseFloat(this.toString());
      }
      toFormat(format) {
        return FixedNumber.fromString(this._value, format);
      }
      static fromValue(value, decimals, format) {
        if (format == null && decimals != null && !isBigNumberish(decimals)) {
          format = decimals;
          decimals = null;
        }
        if (decimals == null) {
          decimals = 0;
        }
        if (format == null) {
          format = "fixed";
        }
        return FixedNumber.fromString(formatFixed(value, decimals), FixedFormat.from(format));
      }
      static fromString(value, format) {
        if (format == null) {
          format = "fixed";
        }
        const fixedFormat = FixedFormat.from(format);
        const numeric = parseFixed(value, fixedFormat.decimals);
        if (!fixedFormat.signed && numeric.lt(Zero)) {
          throwFault2("unsigned value cannot be negative", "overflow", "value", value);
        }
        let hex = null;
        if (fixedFormat.signed) {
          hex = numeric.toTwos(fixedFormat.width).toHexString();
        } else {
          hex = numeric.toHexString();
          hex = hexZeroPad(hex, fixedFormat.width / 8);
        }
        const decimal = formatFixed(numeric, fixedFormat.decimals);
        return new FixedNumber(_constructorGuard2, hex, decimal, fixedFormat);
      }
      static fromBytes(value, format) {
        if (format == null) {
          format = "fixed";
        }
        const fixedFormat = FixedFormat.from(format);
        if (arrayify(value).length > fixedFormat.width / 8) {
          throw new Error("overflow");
        }
        let numeric = BigNumber.from(value);
        if (fixedFormat.signed) {
          numeric = numeric.fromTwos(fixedFormat.width);
        }
        const hex = numeric.toTwos((fixedFormat.signed ? 0 : 1) + fixedFormat.width).toHexString();
        const decimal = formatFixed(numeric, fixedFormat.decimals);
        return new FixedNumber(_constructorGuard2, hex, decimal, fixedFormat);
      }
      static from(value, format) {
        if (typeof value === "string") {
          return FixedNumber.fromString(value, format);
        }
        if (isBytes(value)) {
          return FixedNumber.fromBytes(value, format);
        }
        try {
          return FixedNumber.fromValue(value, 0, format);
        } catch (error) {
          if (error.code !== Logger.errors.INVALID_ARGUMENT) {
            throw error;
          }
        }
        return logger3.throwArgumentError("invalid FixedNumber value", "value", value);
      }
      static isFixedNumber(value) {
        return !!(value && value._isFixedNumber);
      }
    };
    ONE = FixedNumber.from(1);
    BUMP = FixedNumber.from("0.5");
  }
});

// node_modules/@ethersproject/bignumber/lib.esm/index.js
var init_lib3 = __esm({
  "node_modules/@ethersproject/bignumber/lib.esm/index.js"() {
    init_react();
    init_bignumber();
    init_fixednumber();
    init_bignumber();
  }
});

// node_modules/@ethersproject/keccak256/lib.esm/index.js
function keccak256(data) {
  return "0x" + import_js_sha3.default.keccak_256(arrayify(data));
}
var import_js_sha3;
var init_lib4 = __esm({
  "node_modules/@ethersproject/keccak256/lib.esm/index.js"() {
    init_react();
    import_js_sha3 = __toModule(require_sha3());
    init_lib2();
    "use strict";
  }
});

// node_modules/@ethersproject/rlp/lib.esm/_version.js
var version4;
var init_version4 = __esm({
  "node_modules/@ethersproject/rlp/lib.esm/_version.js"() {
    init_react();
    version4 = "rlp/5.5.0";
  }
});

// node_modules/@ethersproject/rlp/lib.esm/index.js
var lib_exports = {};
__export(lib_exports, {
  decode: () => decode,
  encode: () => encode
});
function arrayifyInteger(value) {
  const result = [];
  while (value) {
    result.unshift(value & 255);
    value >>= 8;
  }
  return result;
}
function unarrayifyInteger(data, offset, length) {
  let result = 0;
  for (let i = 0; i < length; i++) {
    result = result * 256 + data[offset + i];
  }
  return result;
}
function _encode(object) {
  if (Array.isArray(object)) {
    let payload = [];
    object.forEach(function(child) {
      payload = payload.concat(_encode(child));
    });
    if (payload.length <= 55) {
      payload.unshift(192 + payload.length);
      return payload;
    }
    const length2 = arrayifyInteger(payload.length);
    length2.unshift(247 + length2.length);
    return length2.concat(payload);
  }
  if (!isBytesLike(object)) {
    logger4.throwArgumentError("RLP object must be BytesLike", "object", object);
  }
  const data = Array.prototype.slice.call(arrayify(object));
  if (data.length === 1 && data[0] <= 127) {
    return data;
  } else if (data.length <= 55) {
    data.unshift(128 + data.length);
    return data;
  }
  const length = arrayifyInteger(data.length);
  length.unshift(183 + length.length);
  return length.concat(data);
}
function encode(object) {
  return hexlify(_encode(object));
}
function _decodeChildren(data, offset, childOffset, length) {
  const result = [];
  while (childOffset < offset + 1 + length) {
    const decoded = _decode(data, childOffset);
    result.push(decoded.result);
    childOffset += decoded.consumed;
    if (childOffset > offset + 1 + length) {
      logger4.throwError("child data too short", Logger.errors.BUFFER_OVERRUN, {});
    }
  }
  return { consumed: 1 + length, result };
}
function _decode(data, offset) {
  if (data.length === 0) {
    logger4.throwError("data too short", Logger.errors.BUFFER_OVERRUN, {});
  }
  if (data[offset] >= 248) {
    const lengthLength = data[offset] - 247;
    if (offset + 1 + lengthLength > data.length) {
      logger4.throwError("data short segment too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const length = unarrayifyInteger(data, offset + 1, lengthLength);
    if (offset + 1 + lengthLength + length > data.length) {
      logger4.throwError("data long segment too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    return _decodeChildren(data, offset, offset + 1 + lengthLength, lengthLength + length);
  } else if (data[offset] >= 192) {
    const length = data[offset] - 192;
    if (offset + 1 + length > data.length) {
      logger4.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    return _decodeChildren(data, offset, offset + 1, length);
  } else if (data[offset] >= 184) {
    const lengthLength = data[offset] - 183;
    if (offset + 1 + lengthLength > data.length) {
      logger4.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const length = unarrayifyInteger(data, offset + 1, lengthLength);
    if (offset + 1 + lengthLength + length > data.length) {
      logger4.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const result = hexlify(data.slice(offset + 1 + lengthLength, offset + 1 + lengthLength + length));
    return { consumed: 1 + lengthLength + length, result };
  } else if (data[offset] >= 128) {
    const length = data[offset] - 128;
    if (offset + 1 + length > data.length) {
      logger4.throwError("data too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    const result = hexlify(data.slice(offset + 1, offset + 1 + length));
    return { consumed: 1 + length, result };
  }
  return { consumed: 1, result: hexlify(data[offset]) };
}
function decode(data) {
  const bytes = arrayify(data);
  const decoded = _decode(bytes, 0);
  if (decoded.consumed !== bytes.length) {
    logger4.throwArgumentError("invalid rlp data", "data", data);
  }
  return decoded.result;
}
var logger4;
var init_lib5 = __esm({
  "node_modules/@ethersproject/rlp/lib.esm/index.js"() {
    init_react();
    init_lib2();
    init_lib();
    init_version4();
    "use strict";
    logger4 = new Logger(version4);
  }
});

// node_modules/@ethersproject/address/lib.esm/_version.js
var version5;
var init_version5 = __esm({
  "node_modules/@ethersproject/address/lib.esm/_version.js"() {
    init_react();
    version5 = "address/5.5.0";
  }
});

// node_modules/@ethersproject/address/lib.esm/index.js
function getChecksumAddress(address) {
  if (!isHexString(address, 20)) {
    logger5.throwArgumentError("invalid address", "address", address);
  }
  address = address.toLowerCase();
  const chars = address.substring(2).split("");
  const expanded = new Uint8Array(40);
  for (let i = 0; i < 40; i++) {
    expanded[i] = chars[i].charCodeAt(0);
  }
  const hashed = arrayify(keccak256(expanded));
  for (let i = 0; i < 40; i += 2) {
    if (hashed[i >> 1] >> 4 >= 8) {
      chars[i] = chars[i].toUpperCase();
    }
    if ((hashed[i >> 1] & 15) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase();
    }
  }
  return "0x" + chars.join("");
}
function log10(x) {
  if (Math.log10) {
    return Math.log10(x);
  }
  return Math.log(x) / Math.LN10;
}
function ibanChecksum(address) {
  address = address.toUpperCase();
  address = address.substring(4) + address.substring(0, 2) + "00";
  let expanded = address.split("").map((c) => {
    return ibanLookup[c];
  }).join("");
  while (expanded.length >= safeDigits) {
    let block = expanded.substring(0, safeDigits);
    expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
  }
  let checksum = String(98 - parseInt(expanded, 10) % 97);
  while (checksum.length < 2) {
    checksum = "0" + checksum;
  }
  return checksum;
}
function getAddress(address) {
  let result = null;
  if (typeof address !== "string") {
    logger5.throwArgumentError("invalid address", "address", address);
  }
  if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    if (address.substring(0, 2) !== "0x") {
      address = "0x" + address;
    }
    result = getChecksumAddress(address);
    if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
      logger5.throwArgumentError("bad address checksum", "address", address);
    }
  } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    if (address.substring(2, 4) !== ibanChecksum(address)) {
      logger5.throwArgumentError("bad icap checksum", "address", address);
    }
    result = _base36To16(address.substring(4));
    while (result.length < 40) {
      result = "0" + result;
    }
    result = getChecksumAddress("0x" + result);
  } else {
    logger5.throwArgumentError("invalid address", "address", address);
  }
  return result;
}
function isAddress(address) {
  try {
    getAddress(address);
    return true;
  } catch (error) {
  }
  return false;
}
function getIcapAddress(address) {
  let base36 = _base16To36(getAddress(address).substring(2)).toUpperCase();
  while (base36.length < 30) {
    base36 = "0" + base36;
  }
  return "XE" + ibanChecksum("XE00" + base36) + base36;
}
function getContractAddress(transaction) {
  let from = null;
  try {
    from = getAddress(transaction.from);
  } catch (error) {
    logger5.throwArgumentError("missing from address", "transaction", transaction);
  }
  const nonce = stripZeros(arrayify(BigNumber.from(transaction.nonce).toHexString()));
  return getAddress(hexDataSlice(keccak256(encode([from, nonce])), 12));
}
function getCreate2Address(from, salt, initCodeHash) {
  if (hexDataLength(salt) !== 32) {
    logger5.throwArgumentError("salt must be 32 bytes", "salt", salt);
  }
  if (hexDataLength(initCodeHash) !== 32) {
    logger5.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", initCodeHash);
  }
  return getAddress(hexDataSlice(keccak256(concat(["0xff", getAddress(from), salt, initCodeHash])), 12));
}
var logger5, MAX_SAFE_INTEGER, ibanLookup, safeDigits;
var init_lib6 = __esm({
  "node_modules/@ethersproject/address/lib.esm/index.js"() {
    init_react();
    init_lib2();
    init_lib3();
    init_lib4();
    init_lib5();
    init_lib();
    init_version5();
    "use strict";
    logger5 = new Logger(version5);
    MAX_SAFE_INTEGER = 9007199254740991;
    ibanLookup = {};
    for (let i = 0; i < 10; i++) {
      ibanLookup[String(i)] = String(i);
    }
    for (let i = 0; i < 26; i++) {
      ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
    }
    safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));
  }
});

// node_modules/@ethersproject/constants/lib.esm/addresses.js
var AddressZero;
var init_addresses = __esm({
  "node_modules/@ethersproject/constants/lib.esm/addresses.js"() {
    init_react();
    AddressZero = "0x0000000000000000000000000000000000000000";
  }
});

// node_modules/@ethersproject/constants/lib.esm/bignumbers.js
var NegativeOne2, Zero2, One, Two, WeiPerEther, MaxUint256, MinInt256, MaxInt256;
var init_bignumbers = __esm({
  "node_modules/@ethersproject/constants/lib.esm/bignumbers.js"() {
    init_react();
    init_lib3();
    NegativeOne2 = /* @__PURE__ */ BigNumber.from(-1);
    Zero2 = /* @__PURE__ */ BigNumber.from(0);
    One = /* @__PURE__ */ BigNumber.from(1);
    Two = /* @__PURE__ */ BigNumber.from(2);
    WeiPerEther = /* @__PURE__ */ BigNumber.from("1000000000000000000");
    MaxUint256 = /* @__PURE__ */ BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    MinInt256 = /* @__PURE__ */ BigNumber.from("-0x8000000000000000000000000000000000000000000000000000000000000000");
    MaxInt256 = /* @__PURE__ */ BigNumber.from("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  }
});

// node_modules/@ethersproject/constants/lib.esm/hashes.js
var HashZero;
var init_hashes = __esm({
  "node_modules/@ethersproject/constants/lib.esm/hashes.js"() {
    init_react();
    HashZero = "0x0000000000000000000000000000000000000000000000000000000000000000";
  }
});

// node_modules/@ethersproject/constants/lib.esm/strings.js
var EtherSymbol;
var init_strings = __esm({
  "node_modules/@ethersproject/constants/lib.esm/strings.js"() {
    init_react();
    EtherSymbol = "\u039E";
  }
});

// node_modules/@ethersproject/constants/lib.esm/index.js
var lib_exports2 = {};
__export(lib_exports2, {
  AddressZero: () => AddressZero,
  EtherSymbol: () => EtherSymbol,
  HashZero: () => HashZero,
  MaxInt256: () => MaxInt256,
  MaxUint256: () => MaxUint256,
  MinInt256: () => MinInt256,
  NegativeOne: () => NegativeOne2,
  One: () => One,
  Two: () => Two,
  WeiPerEther: () => WeiPerEther,
  Zero: () => Zero2
});
var init_lib7 = __esm({
  "node_modules/@ethersproject/constants/lib.esm/index.js"() {
    init_react();
    init_addresses();
    init_bignumbers();
    init_hashes();
    init_strings();
    "use strict";
  }
});

// node_modules/@ethersproject/properties/lib.esm/_version.js
var version6;
var init_version6 = __esm({
  "node_modules/@ethersproject/properties/lib.esm/_version.js"() {
    init_react();
    version6 = "properties/5.5.0";
  }
});

// node_modules/@ethersproject/properties/lib.esm/index.js
function defineReadOnly(object, name, value) {
  Object.defineProperty(object, name, {
    enumerable: true,
    value,
    writable: false
  });
}
function getStatic(ctor, key2) {
  for (let i = 0; i < 32; i++) {
    if (ctor[key2]) {
      return ctor[key2];
    }
    if (!ctor.prototype || typeof ctor.prototype !== "object") {
      break;
    }
    ctor = Object.getPrototypeOf(ctor.prototype).constructor;
  }
  return null;
}
function resolveProperties(object) {
  return __awaiter(this, void 0, void 0, function* () {
    const promises = Object.keys(object).map((key2) => {
      const value = object[key2];
      return Promise.resolve(value).then((v) => ({ key: key2, value: v }));
    });
    const results = yield Promise.all(promises);
    return results.reduce((accum, result) => {
      accum[result.key] = result.value;
      return accum;
    }, {});
  });
}
function checkProperties(object, properties) {
  if (!object || typeof object !== "object") {
    logger6.throwArgumentError("invalid object", "object", object);
  }
  Object.keys(object).forEach((key2) => {
    if (!properties[key2]) {
      logger6.throwArgumentError("invalid object key - " + key2, "transaction:" + key2, object);
    }
  });
}
function shallowCopy(object) {
  const result = {};
  for (const key2 in object) {
    result[key2] = object[key2];
  }
  return result;
}
function _isFrozen(object) {
  if (object === void 0 || object === null || opaque[typeof object]) {
    return true;
  }
  if (Array.isArray(object) || typeof object === "object") {
    if (!Object.isFrozen(object)) {
      return false;
    }
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      let value = null;
      try {
        value = object[keys[i]];
      } catch (error) {
        continue;
      }
      if (!_isFrozen(value)) {
        return false;
      }
    }
    return true;
  }
  return logger6.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
}
function _deepCopy(object) {
  if (_isFrozen(object)) {
    return object;
  }
  if (Array.isArray(object)) {
    return Object.freeze(object.map((item) => deepCopy(item)));
  }
  if (typeof object === "object") {
    const result = {};
    for (const key2 in object) {
      const value = object[key2];
      if (value === void 0) {
        continue;
      }
      defineReadOnly(result, key2, deepCopy(value));
    }
    return result;
  }
  return logger6.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
}
function deepCopy(object) {
  return _deepCopy(object);
}
var __awaiter, logger6, opaque, Description;
var init_lib8 = __esm({
  "node_modules/@ethersproject/properties/lib.esm/index.js"() {
    init_react();
    init_lib();
    init_version6();
    "use strict";
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
    logger6 = new Logger(version6);
    opaque = { bigint: true, boolean: true, "function": true, number: true, string: true };
    Description = class {
      constructor(info) {
        for (const key2 in info) {
          this[key2] = deepCopy(info[key2]);
        }
      }
    };
  }
});

// node_modules/@ethersproject/signing-key/lib.esm/elliptic.js
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base2) {
      return commonjsRequire(path, base2 === void 0 || base2 === null ? module.path : base2);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
function assert(val, msg) {
  if (!val)
    throw new Error(msg || "Assertion failed");
}
function BaseCurve(type, conf) {
  this.type = type;
  this.p = new import_bn2.default(conf.p, 16);
  this.red = conf.prime ? import_bn2.default.red(conf.prime) : import_bn2.default.mont(this.p);
  this.zero = new import_bn2.default(0).toRed(this.red);
  this.one = new import_bn2.default(1).toRed(this.red);
  this.two = new import_bn2.default(2).toRed(this.red);
  this.n = conf.n && new import_bn2.default(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);
  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);
  this._bitLength = this.n ? this.n.bitLength() : 0;
  var adjustCount = this.n && this.p.div(this.n);
  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}
function BasePoint(curve, type) {
  this.curve = curve;
  this.type = type;
  this.precomputed = null;
}
function ShortCurve(conf) {
  base.call(this, "short", conf);
  this.a = new import_bn2.default(conf.a, 16).toRed(this.red);
  this.b = new import_bn2.default(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();
  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}
function Point(curve, x, y, isRed) {
  base.BasePoint.call(this, curve, "affine");
  if (x === null && y === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new import_bn2.default(x, 16);
    this.y = new import_bn2.default(y, 16);
    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}
function JPoint(curve, x, y, z) {
  base.BasePoint.call(this, curve, "jacobian");
  if (x === null && y === null && z === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new import_bn2.default(0);
  } else {
    this.x = new import_bn2.default(x, 16);
    this.y = new import_bn2.default(y, 16);
    this.z = new import_bn2.default(z, 16);
  }
  if (!this.x.red)
    this.x = this.x.toRed(this.curve.red);
  if (!this.y.red)
    this.y = this.y.toRed(this.curve.red);
  if (!this.z.red)
    this.z = this.z.toRed(this.curve.red);
  this.zOne = this.z === this.curve.one;
}
function HmacDRBG(options) {
  if (!(this instanceof HmacDRBG))
    return new HmacDRBG(options);
  this.hash = options.hash;
  this.predResist = !!options.predResist;
  this.outLen = this.hash.outSize;
  this.minEntropy = options.minEntropy || this.hash.hmacStrength;
  this._reseed = null;
  this.reseedInterval = null;
  this.K = null;
  this.V = null;
  var entropy = utils_1.toArray(options.entropy, options.entropyEnc || "hex");
  var nonce = utils_1.toArray(options.nonce, options.nonceEnc || "hex");
  var pers = utils_1.toArray(options.pers, options.persEnc || "hex");
  minimalisticAssert(entropy.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
  this._init(entropy, nonce, pers);
}
function KeyPair(ec2, options) {
  this.ec = ec2;
  this.priv = null;
  this.pub = null;
  if (options.priv)
    this._importPrivate(options.priv, options.privEnc);
  if (options.pub)
    this._importPublic(options.pub, options.pubEnc);
}
function Signature(options, enc) {
  if (options instanceof Signature)
    return options;
  if (this._importDER(options, enc))
    return;
  assert$4(options.r && options.s, "Signature without r or s");
  this.r = new import_bn2.default(options.r, 16);
  this.s = new import_bn2.default(options.s, 16);
  if (options.recoveryParam === void 0)
    this.recoveryParam = null;
  else
    this.recoveryParam = options.recoveryParam;
}
function Position() {
  this.place = 0;
}
function getLength(buf, p) {
  var initial = buf[p.place++];
  if (!(initial & 128)) {
    return initial;
  }
  var octetLen = initial & 15;
  if (octetLen === 0 || octetLen > 4) {
    return false;
  }
  var val = 0;
  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
    val <<= 8;
    val |= buf[off];
    val >>>= 0;
  }
  if (val <= 127) {
    return false;
  }
  p.place = off;
  return val;
}
function rmPadding(buf) {
  var i = 0;
  var len = buf.length - 1;
  while (!buf[i] && !(buf[i + 1] & 128) && i < len) {
    i++;
  }
  if (i === 0) {
    return buf;
  }
  return buf.slice(i);
}
function constructLength(arr, len) {
  if (len < 128) {
    arr.push(len);
    return;
  }
  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 128);
  while (--octets) {
    arr.push(len >>> (octets << 3) & 255);
  }
  arr.push(len);
}
function EC(options) {
  if (!(this instanceof EC))
    return new EC(options);
  if (typeof options === "string") {
    assert$5(Object.prototype.hasOwnProperty.call(curves_1, options), "Unknown curve " + options);
    options = curves_1[options];
  }
  if (options instanceof curves_1.PresetCurve)
    options = { curve: options };
  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g;
  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1);
  this.hash = options.hash || options.curve.hash;
}
var import_bn2, import_hash, minimalisticAssert, utils_1, utils_1$1, getNAF, getJSF, assert$1, base, inherits_browser, assert$2, short_1, curve_1, curves_1, hmacDrbg, assert$3, key, assert$4, signature, rand, assert$5, ec, elliptic_1, EC$1;
var init_elliptic = __esm({
  "node_modules/@ethersproject/signing-key/lib.esm/elliptic.js"() {
    init_react();
    import_bn2 = __toModule(require_bn());
    import_hash = __toModule(require_hash());
    minimalisticAssert = assert;
    assert.equal = function assertEqual(l, r, msg) {
      if (l != r)
        throw new Error(msg || "Assertion failed: " + l + " != " + r);
    };
    utils_1 = createCommonjsModule(function(module, exports) {
      "use strict";
      var utils = exports;
      function toArray(msg, enc) {
        if (Array.isArray(msg))
          return msg.slice();
        if (!msg)
          return [];
        var res = [];
        if (typeof msg !== "string") {
          for (var i = 0; i < msg.length; i++)
            res[i] = msg[i] | 0;
          return res;
        }
        if (enc === "hex") {
          msg = msg.replace(/[^a-z0-9]+/ig, "");
          if (msg.length % 2 !== 0)
            msg = "0" + msg;
          for (var i = 0; i < msg.length; i += 2)
            res.push(parseInt(msg[i] + msg[i + 1], 16));
        } else {
          for (var i = 0; i < msg.length; i++) {
            var c = msg.charCodeAt(i);
            var hi = c >> 8;
            var lo = c & 255;
            if (hi)
              res.push(hi, lo);
            else
              res.push(lo);
          }
        }
        return res;
      }
      utils.toArray = toArray;
      function zero2(word) {
        if (word.length === 1)
          return "0" + word;
        else
          return word;
      }
      utils.zero2 = zero2;
      function toHex2(msg) {
        var res = "";
        for (var i = 0; i < msg.length; i++)
          res += zero2(msg[i].toString(16));
        return res;
      }
      utils.toHex = toHex2;
      utils.encode = function encode3(arr, enc) {
        if (enc === "hex")
          return toHex2(arr);
        else
          return arr;
      };
    });
    utils_1$1 = createCommonjsModule(function(module, exports) {
      "use strict";
      var utils = exports;
      utils.assert = minimalisticAssert;
      utils.toArray = utils_1.toArray;
      utils.zero2 = utils_1.zero2;
      utils.toHex = utils_1.toHex;
      utils.encode = utils_1.encode;
      function getNAF2(num, w, bits) {
        var naf = new Array(Math.max(num.bitLength(), bits) + 1);
        naf.fill(0);
        var ws = 1 << w + 1;
        var k = num.clone();
        for (var i = 0; i < naf.length; i++) {
          var z;
          var mod = k.andln(ws - 1);
          if (k.isOdd()) {
            if (mod > (ws >> 1) - 1)
              z = (ws >> 1) - mod;
            else
              z = mod;
            k.isubn(z);
          } else {
            z = 0;
          }
          naf[i] = z;
          k.iushrn(1);
        }
        return naf;
      }
      utils.getNAF = getNAF2;
      function getJSF2(k1, k2) {
        var jsf = [
          [],
          []
        ];
        k1 = k1.clone();
        k2 = k2.clone();
        var d1 = 0;
        var d2 = 0;
        var m8;
        while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
          var m14 = k1.andln(3) + d1 & 3;
          var m24 = k2.andln(3) + d2 & 3;
          if (m14 === 3)
            m14 = -1;
          if (m24 === 3)
            m24 = -1;
          var u1;
          if ((m14 & 1) === 0) {
            u1 = 0;
          } else {
            m8 = k1.andln(7) + d1 & 7;
            if ((m8 === 3 || m8 === 5) && m24 === 2)
              u1 = -m14;
            else
              u1 = m14;
          }
          jsf[0].push(u1);
          var u2;
          if ((m24 & 1) === 0) {
            u2 = 0;
          } else {
            m8 = k2.andln(7) + d2 & 7;
            if ((m8 === 3 || m8 === 5) && m14 === 2)
              u2 = -m24;
            else
              u2 = m24;
          }
          jsf[1].push(u2);
          if (2 * d1 === u1 + 1)
            d1 = 1 - d1;
          if (2 * d2 === u2 + 1)
            d2 = 1 - d2;
          k1.iushrn(1);
          k2.iushrn(1);
        }
        return jsf;
      }
      utils.getJSF = getJSF2;
      function cachedProperty(obj, name, computer) {
        var key2 = "_" + name;
        obj.prototype[name] = function cachedProperty2() {
          return this[key2] !== void 0 ? this[key2] : this[key2] = computer.call(this);
        };
      }
      utils.cachedProperty = cachedProperty;
      function parseBytes(bytes) {
        return typeof bytes === "string" ? utils.toArray(bytes, "hex") : bytes;
      }
      utils.parseBytes = parseBytes;
      function intFromLE(bytes) {
        return new import_bn2.default(bytes, "hex", "le");
      }
      utils.intFromLE = intFromLE;
    });
    getNAF = utils_1$1.getNAF;
    getJSF = utils_1$1.getJSF;
    assert$1 = utils_1$1.assert;
    base = BaseCurve;
    BaseCurve.prototype.point = function point() {
      throw new Error("Not implemented");
    };
    BaseCurve.prototype.validate = function validate() {
      throw new Error("Not implemented");
    };
    BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
      assert$1(p.precomputed);
      var doubles = p._getDoubles();
      var naf = getNAF(k, 1, this._bitLength);
      var I = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
      I /= 3;
      var repr = [];
      var j;
      var nafW;
      for (j = 0; j < naf.length; j += doubles.step) {
        nafW = 0;
        for (var l = j + doubles.step - 1; l >= j; l--)
          nafW = (nafW << 1) + naf[l];
        repr.push(nafW);
      }
      var a = this.jpoint(null, null, null);
      var b = this.jpoint(null, null, null);
      for (var i = I; i > 0; i--) {
        for (j = 0; j < repr.length; j++) {
          nafW = repr[j];
          if (nafW === i)
            b = b.mixedAdd(doubles.points[j]);
          else if (nafW === -i)
            b = b.mixedAdd(doubles.points[j].neg());
        }
        a = a.add(b);
      }
      return a.toP();
    };
    BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
      var w = 4;
      var nafPoints = p._getNAFPoints(w);
      w = nafPoints.wnd;
      var wnd = nafPoints.points;
      var naf = getNAF(k, w, this._bitLength);
      var acc = this.jpoint(null, null, null);
      for (var i = naf.length - 1; i >= 0; i--) {
        for (var l = 0; i >= 0 && naf[i] === 0; i--)
          l++;
        if (i >= 0)
          l++;
        acc = acc.dblp(l);
        if (i < 0)
          break;
        var z = naf[i];
        assert$1(z !== 0);
        if (p.type === "affine") {
          if (z > 0)
            acc = acc.mixedAdd(wnd[z - 1 >> 1]);
          else
            acc = acc.mixedAdd(wnd[-z - 1 >> 1].neg());
        } else {
          if (z > 0)
            acc = acc.add(wnd[z - 1 >> 1]);
          else
            acc = acc.add(wnd[-z - 1 >> 1].neg());
        }
      }
      return p.type === "affine" ? acc.toP() : acc;
    };
    BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
      var wndWidth = this._wnafT1;
      var wnd = this._wnafT2;
      var naf = this._wnafT3;
      var max = 0;
      var i;
      var j;
      var p;
      for (i = 0; i < len; i++) {
        p = points[i];
        var nafPoints = p._getNAFPoints(defW);
        wndWidth[i] = nafPoints.wnd;
        wnd[i] = nafPoints.points;
      }
      for (i = len - 1; i >= 1; i -= 2) {
        var a = i - 1;
        var b = i;
        if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
          naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
          naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
          max = Math.max(naf[a].length, max);
          max = Math.max(naf[b].length, max);
          continue;
        }
        var comb = [
          points[a],
          null,
          null,
          points[b]
        ];
        if (points[a].y.cmp(points[b].y) === 0) {
          comb[1] = points[a].add(points[b]);
          comb[2] = points[a].toJ().mixedAdd(points[b].neg());
        } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
          comb[1] = points[a].toJ().mixedAdd(points[b]);
          comb[2] = points[a].add(points[b].neg());
        } else {
          comb[1] = points[a].toJ().mixedAdd(points[b]);
          comb[2] = points[a].toJ().mixedAdd(points[b].neg());
        }
        var index = [
          -3,
          -1,
          -5,
          -7,
          0,
          7,
          5,
          1,
          3
        ];
        var jsf = getJSF(coeffs[a], coeffs[b]);
        max = Math.max(jsf[0].length, max);
        naf[a] = new Array(max);
        naf[b] = new Array(max);
        for (j = 0; j < max; j++) {
          var ja = jsf[0][j] | 0;
          var jb = jsf[1][j] | 0;
          naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
          naf[b][j] = 0;
          wnd[a] = comb;
        }
      }
      var acc = this.jpoint(null, null, null);
      var tmp = this._wnafT4;
      for (i = max; i >= 0; i--) {
        var k = 0;
        while (i >= 0) {
          var zero = true;
          for (j = 0; j < len; j++) {
            tmp[j] = naf[j][i] | 0;
            if (tmp[j] !== 0)
              zero = false;
          }
          if (!zero)
            break;
          k++;
          i--;
        }
        if (i >= 0)
          k++;
        acc = acc.dblp(k);
        if (i < 0)
          break;
        for (j = 0; j < len; j++) {
          var z = tmp[j];
          p;
          if (z === 0)
            continue;
          else if (z > 0)
            p = wnd[j][z - 1 >> 1];
          else if (z < 0)
            p = wnd[j][-z - 1 >> 1].neg();
          if (p.type === "affine")
            acc = acc.mixedAdd(p);
          else
            acc = acc.add(p);
        }
      }
      for (i = 0; i < len; i++)
        wnd[i] = null;
      if (jacobianResult)
        return acc;
      else
        return acc.toP();
    };
    BaseCurve.BasePoint = BasePoint;
    BasePoint.prototype.eq = function eq() {
      throw new Error("Not implemented");
    };
    BasePoint.prototype.validate = function validate2() {
      return this.curve.validate(this);
    };
    BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
      bytes = utils_1$1.toArray(bytes, enc);
      var len = this.p.byteLength();
      if ((bytes[0] === 4 || bytes[0] === 6 || bytes[0] === 7) && bytes.length - 1 === 2 * len) {
        if (bytes[0] === 6)
          assert$1(bytes[bytes.length - 1] % 2 === 0);
        else if (bytes[0] === 7)
          assert$1(bytes[bytes.length - 1] % 2 === 1);
        var res = this.point(bytes.slice(1, 1 + len), bytes.slice(1 + len, 1 + 2 * len));
        return res;
      } else if ((bytes[0] === 2 || bytes[0] === 3) && bytes.length - 1 === len) {
        return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 3);
      }
      throw new Error("Unknown point format");
    };
    BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
      return this.encode(enc, true);
    };
    BasePoint.prototype._encode = function _encode2(compact) {
      var len = this.curve.p.byteLength();
      var x = this.getX().toArray("be", len);
      if (compact)
        return [this.getY().isEven() ? 2 : 3].concat(x);
      return [4].concat(x, this.getY().toArray("be", len));
    };
    BasePoint.prototype.encode = function encode2(enc, compact) {
      return utils_1$1.encode(this._encode(compact), enc);
    };
    BasePoint.prototype.precompute = function precompute(power) {
      if (this.precomputed)
        return this;
      var precomputed = {
        doubles: null,
        naf: null,
        beta: null
      };
      precomputed.naf = this._getNAFPoints(8);
      precomputed.doubles = this._getDoubles(4, power);
      precomputed.beta = this._getBeta();
      this.precomputed = precomputed;
      return this;
    };
    BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
      if (!this.precomputed)
        return false;
      var doubles = this.precomputed.doubles;
      if (!doubles)
        return false;
      return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
    };
    BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
      if (this.precomputed && this.precomputed.doubles)
        return this.precomputed.doubles;
      var doubles = [this];
      var acc = this;
      for (var i = 0; i < power; i += step) {
        for (var j = 0; j < step; j++)
          acc = acc.dbl();
        doubles.push(acc);
      }
      return {
        step,
        points: doubles
      };
    };
    BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
      if (this.precomputed && this.precomputed.naf)
        return this.precomputed.naf;
      var res = [this];
      var max = (1 << wnd) - 1;
      var dbl3 = max === 1 ? null : this.dbl();
      for (var i = 1; i < max; i++)
        res[i] = res[i - 1].add(dbl3);
      return {
        wnd,
        points: res
      };
    };
    BasePoint.prototype._getBeta = function _getBeta() {
      return null;
    };
    BasePoint.prototype.dblp = function dblp(k) {
      var r = this;
      for (var i = 0; i < k; i++)
        r = r.dbl();
      return r;
    };
    inherits_browser = createCommonjsModule(function(module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    });
    assert$2 = utils_1$1.assert;
    inherits_browser(ShortCurve, base);
    short_1 = ShortCurve;
    ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
      if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
        return;
      var beta;
      var lambda;
      if (conf.beta) {
        beta = new import_bn2.default(conf.beta, 16).toRed(this.red);
      } else {
        var betas = this._getEndoRoots(this.p);
        beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
        beta = beta.toRed(this.red);
      }
      if (conf.lambda) {
        lambda = new import_bn2.default(conf.lambda, 16);
      } else {
        var lambdas = this._getEndoRoots(this.n);
        if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
          lambda = lambdas[0];
        } else {
          lambda = lambdas[1];
          assert$2(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
        }
      }
      var basis;
      if (conf.basis) {
        basis = conf.basis.map(function(vec) {
          return {
            a: new import_bn2.default(vec.a, 16),
            b: new import_bn2.default(vec.b, 16)
          };
        });
      } else {
        basis = this._getEndoBasis(lambda);
      }
      return {
        beta,
        lambda,
        basis
      };
    };
    ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
      var red = num === this.p ? this.red : import_bn2.default.mont(num);
      var tinv = new import_bn2.default(2).toRed(red).redInvm();
      var ntinv = tinv.redNeg();
      var s = new import_bn2.default(3).toRed(red).redNeg().redSqrt().redMul(tinv);
      var l1 = ntinv.redAdd(s).fromRed();
      var l2 = ntinv.redSub(s).fromRed();
      return [l1, l2];
    };
    ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
      var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
      var u = lambda;
      var v = this.n.clone();
      var x1 = new import_bn2.default(1);
      var y1 = new import_bn2.default(0);
      var x2 = new import_bn2.default(0);
      var y2 = new import_bn2.default(1);
      var a0;
      var b0;
      var a1;
      var b1;
      var a2;
      var b2;
      var prevR;
      var i = 0;
      var r;
      var x;
      while (u.cmpn(0) !== 0) {
        var q = v.div(u);
        r = v.sub(q.mul(u));
        x = x2.sub(q.mul(x1));
        var y = y2.sub(q.mul(y1));
        if (!a1 && r.cmp(aprxSqrt) < 0) {
          a0 = prevR.neg();
          b0 = x1;
          a1 = r.neg();
          b1 = x;
        } else if (a1 && ++i === 2) {
          break;
        }
        prevR = r;
        v = u;
        u = r;
        x2 = x1;
        x1 = x;
        y2 = y1;
        y1 = y;
      }
      a2 = r.neg();
      b2 = x;
      var len1 = a1.sqr().add(b1.sqr());
      var len2 = a2.sqr().add(b2.sqr());
      if (len2.cmp(len1) >= 0) {
        a2 = a0;
        b2 = b0;
      }
      if (a1.negative) {
        a1 = a1.neg();
        b1 = b1.neg();
      }
      if (a2.negative) {
        a2 = a2.neg();
        b2 = b2.neg();
      }
      return [
        { a: a1, b: b1 },
        { a: a2, b: b2 }
      ];
    };
    ShortCurve.prototype._endoSplit = function _endoSplit(k) {
      var basis = this.endo.basis;
      var v1 = basis[0];
      var v2 = basis[1];
      var c1 = v2.b.mul(k).divRound(this.n);
      var c2 = v1.b.neg().mul(k).divRound(this.n);
      var p1 = c1.mul(v1.a);
      var p2 = c2.mul(v2.a);
      var q1 = c1.mul(v1.b);
      var q2 = c2.mul(v2.b);
      var k1 = k.sub(p1).sub(p2);
      var k2 = q1.add(q2).neg();
      return { k1, k2 };
    };
    ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
      x = new import_bn2.default(x, 16);
      if (!x.red)
        x = x.toRed(this.red);
      var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
      var y = y2.redSqrt();
      if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
        throw new Error("invalid point");
      var isOdd = y.fromRed().isOdd();
      if (odd && !isOdd || !odd && isOdd)
        y = y.redNeg();
      return this.point(x, y);
    };
    ShortCurve.prototype.validate = function validate3(point3) {
      if (point3.inf)
        return true;
      var x = point3.x;
      var y = point3.y;
      var ax = this.a.redMul(x);
      var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
      return y.redSqr().redISub(rhs).cmpn(0) === 0;
    };
    ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
      var npoints = this._endoWnafT1;
      var ncoeffs = this._endoWnafT2;
      for (var i = 0; i < points.length; i++) {
        var split = this._endoSplit(coeffs[i]);
        var p = points[i];
        var beta = p._getBeta();
        if (split.k1.negative) {
          split.k1.ineg();
          p = p.neg(true);
        }
        if (split.k2.negative) {
          split.k2.ineg();
          beta = beta.neg(true);
        }
        npoints[i * 2] = p;
        npoints[i * 2 + 1] = beta;
        ncoeffs[i * 2] = split.k1;
        ncoeffs[i * 2 + 1] = split.k2;
      }
      var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);
      for (var j = 0; j < i * 2; j++) {
        npoints[j] = null;
        ncoeffs[j] = null;
      }
      return res;
    };
    inherits_browser(Point, base.BasePoint);
    ShortCurve.prototype.point = function point2(x, y, isRed) {
      return new Point(this, x, y, isRed);
    };
    ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
      return Point.fromJSON(this, obj, red);
    };
    Point.prototype._getBeta = function _getBeta2() {
      if (!this.curve.endo)
        return;
      var pre = this.precomputed;
      if (pre && pre.beta)
        return pre.beta;
      var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
      if (pre) {
        var curve = this.curve;
        var endoMul = function(p) {
          return curve.point(p.x.redMul(curve.endo.beta), p.y);
        };
        pre.beta = beta;
        beta.precomputed = {
          beta: null,
          naf: pre.naf && {
            wnd: pre.naf.wnd,
            points: pre.naf.points.map(endoMul)
          },
          doubles: pre.doubles && {
            step: pre.doubles.step,
            points: pre.doubles.points.map(endoMul)
          }
        };
      }
      return beta;
    };
    Point.prototype.toJSON = function toJSON() {
      if (!this.precomputed)
        return [this.x, this.y];
      return [this.x, this.y, this.precomputed && {
        doubles: this.precomputed.doubles && {
          step: this.precomputed.doubles.step,
          points: this.precomputed.doubles.points.slice(1)
        },
        naf: this.precomputed.naf && {
          wnd: this.precomputed.naf.wnd,
          points: this.precomputed.naf.points.slice(1)
        }
      }];
    };
    Point.fromJSON = function fromJSON(curve, obj, red) {
      if (typeof obj === "string")
        obj = JSON.parse(obj);
      var res = curve.point(obj[0], obj[1], red);
      if (!obj[2])
        return res;
      function obj2point(obj2) {
        return curve.point(obj2[0], obj2[1], red);
      }
      var pre = obj[2];
      res.precomputed = {
        beta: null,
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: [res].concat(pre.doubles.points.map(obj2point))
        },
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: [res].concat(pre.naf.points.map(obj2point))
        }
      };
      return res;
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.inf;
    };
    Point.prototype.add = function add(p) {
      if (this.inf)
        return p;
      if (p.inf)
        return this;
      if (this.eq(p))
        return this.dbl();
      if (this.neg().eq(p))
        return this.curve.point(null, null);
      if (this.x.cmp(p.x) === 0)
        return this.curve.point(null, null);
      var c = this.y.redSub(p.y);
      if (c.cmpn(0) !== 0)
        c = c.redMul(this.x.redSub(p.x).redInvm());
      var nx = c.redSqr().redISub(this.x).redISub(p.x);
      var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
      return this.curve.point(nx, ny);
    };
    Point.prototype.dbl = function dbl() {
      if (this.inf)
        return this;
      var ys1 = this.y.redAdd(this.y);
      if (ys1.cmpn(0) === 0)
        return this.curve.point(null, null);
      var a = this.curve.a;
      var x2 = this.x.redSqr();
      var dyinv = ys1.redInvm();
      var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);
      var nx = c.redSqr().redISub(this.x.redAdd(this.x));
      var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
      return this.curve.point(nx, ny);
    };
    Point.prototype.getX = function getX() {
      return this.x.fromRed();
    };
    Point.prototype.getY = function getY() {
      return this.y.fromRed();
    };
    Point.prototype.mul = function mul(k) {
      k = new import_bn2.default(k, 16);
      if (this.isInfinity())
        return this;
      else if (this._hasDoubles(k))
        return this.curve._fixedNafMul(this, k);
      else if (this.curve.endo)
        return this.curve._endoWnafMulAdd([this], [k]);
      else
        return this.curve._wnafMul(this, k);
    };
    Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
      var points = [this, p2];
      var coeffs = [k1, k2];
      if (this.curve.endo)
        return this.curve._endoWnafMulAdd(points, coeffs);
      else
        return this.curve._wnafMulAdd(1, points, coeffs, 2);
    };
    Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
      var points = [this, p2];
      var coeffs = [k1, k2];
      if (this.curve.endo)
        return this.curve._endoWnafMulAdd(points, coeffs, true);
      else
        return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
    };
    Point.prototype.eq = function eq2(p) {
      return this === p || this.inf === p.inf && (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
    };
    Point.prototype.neg = function neg(_precompute) {
      if (this.inf)
        return this;
      var res = this.curve.point(this.x, this.y.redNeg());
      if (_precompute && this.precomputed) {
        var pre = this.precomputed;
        var negate = function(p) {
          return p.neg();
        };
        res.precomputed = {
          naf: pre.naf && {
            wnd: pre.naf.wnd,
            points: pre.naf.points.map(negate)
          },
          doubles: pre.doubles && {
            step: pre.doubles.step,
            points: pre.doubles.points.map(negate)
          }
        };
      }
      return res;
    };
    Point.prototype.toJ = function toJ() {
      if (this.inf)
        return this.curve.jpoint(null, null, null);
      var res = this.curve.jpoint(this.x, this.y, this.curve.one);
      return res;
    };
    inherits_browser(JPoint, base.BasePoint);
    ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
      return new JPoint(this, x, y, z);
    };
    JPoint.prototype.toP = function toP() {
      if (this.isInfinity())
        return this.curve.point(null, null);
      var zinv = this.z.redInvm();
      var zinv2 = zinv.redSqr();
      var ax = this.x.redMul(zinv2);
      var ay = this.y.redMul(zinv2).redMul(zinv);
      return this.curve.point(ax, ay);
    };
    JPoint.prototype.neg = function neg2() {
      return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
    };
    JPoint.prototype.add = function add2(p) {
      if (this.isInfinity())
        return p;
      if (p.isInfinity())
        return this;
      var pz2 = p.z.redSqr();
      var z2 = this.z.redSqr();
      var u1 = this.x.redMul(pz2);
      var u2 = p.x.redMul(z2);
      var s1 = this.y.redMul(pz2.redMul(p.z));
      var s2 = p.y.redMul(z2.redMul(this.z));
      var h = u1.redSub(u2);
      var r = s1.redSub(s2);
      if (h.cmpn(0) === 0) {
        if (r.cmpn(0) !== 0)
          return this.curve.jpoint(null, null, null);
        else
          return this.dbl();
      }
      var h2 = h.redSqr();
      var h3 = h2.redMul(h);
      var v = u1.redMul(h2);
      var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
      var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
      var nz = this.z.redMul(p.z).redMul(h);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.mixedAdd = function mixedAdd(p) {
      if (this.isInfinity())
        return p.toJ();
      if (p.isInfinity())
        return this;
      var z2 = this.z.redSqr();
      var u1 = this.x;
      var u2 = p.x.redMul(z2);
      var s1 = this.y;
      var s2 = p.y.redMul(z2).redMul(this.z);
      var h = u1.redSub(u2);
      var r = s1.redSub(s2);
      if (h.cmpn(0) === 0) {
        if (r.cmpn(0) !== 0)
          return this.curve.jpoint(null, null, null);
        else
          return this.dbl();
      }
      var h2 = h.redSqr();
      var h3 = h2.redMul(h);
      var v = u1.redMul(h2);
      var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
      var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
      var nz = this.z.redMul(h);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.dblp = function dblp2(pow) {
      if (pow === 0)
        return this;
      if (this.isInfinity())
        return this;
      if (!pow)
        return this.dbl();
      var i;
      if (this.curve.zeroA || this.curve.threeA) {
        var r = this;
        for (i = 0; i < pow; i++)
          r = r.dbl();
        return r;
      }
      var a = this.curve.a;
      var tinv = this.curve.tinv;
      var jx = this.x;
      var jy = this.y;
      var jz = this.z;
      var jz4 = jz.redSqr().redSqr();
      var jyd = jy.redAdd(jy);
      for (i = 0; i < pow; i++) {
        var jx2 = jx.redSqr();
        var jyd2 = jyd.redSqr();
        var jyd4 = jyd2.redSqr();
        var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
        var t1 = jx.redMul(jyd2);
        var nx = c.redSqr().redISub(t1.redAdd(t1));
        var t2 = t1.redISub(nx);
        var dny = c.redMul(t2);
        dny = dny.redIAdd(dny).redISub(jyd4);
        var nz = jyd.redMul(jz);
        if (i + 1 < pow)
          jz4 = jz4.redMul(jyd4);
        jx = nx;
        jz = nz;
        jyd = dny;
      }
      return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
    };
    JPoint.prototype.dbl = function dbl2() {
      if (this.isInfinity())
        return this;
      if (this.curve.zeroA)
        return this._zeroDbl();
      else if (this.curve.threeA)
        return this._threeDbl();
      else
        return this._dbl();
    };
    JPoint.prototype._zeroDbl = function _zeroDbl() {
      var nx;
      var ny;
      var nz;
      if (this.zOne) {
        var xx = this.x.redSqr();
        var yy = this.y.redSqr();
        var yyyy = yy.redSqr();
        var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
        s = s.redIAdd(s);
        var m = xx.redAdd(xx).redIAdd(xx);
        var t = m.redSqr().redISub(s).redISub(s);
        var yyyy8 = yyyy.redIAdd(yyyy);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        nx = t;
        ny = m.redMul(s.redISub(t)).redISub(yyyy8);
        nz = this.y.redAdd(this.y);
      } else {
        var a = this.x.redSqr();
        var b = this.y.redSqr();
        var c = b.redSqr();
        var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
        d = d.redIAdd(d);
        var e = a.redAdd(a).redIAdd(a);
        var f = e.redSqr();
        var c8 = c.redIAdd(c);
        c8 = c8.redIAdd(c8);
        c8 = c8.redIAdd(c8);
        nx = f.redISub(d).redISub(d);
        ny = e.redMul(d.redISub(nx)).redISub(c8);
        nz = this.y.redMul(this.z);
        nz = nz.redIAdd(nz);
      }
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype._threeDbl = function _threeDbl() {
      var nx;
      var ny;
      var nz;
      if (this.zOne) {
        var xx = this.x.redSqr();
        var yy = this.y.redSqr();
        var yyyy = yy.redSqr();
        var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
        s = s.redIAdd(s);
        var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
        var t = m.redSqr().redISub(s).redISub(s);
        nx = t;
        var yyyy8 = yyyy.redIAdd(yyyy);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        ny = m.redMul(s.redISub(t)).redISub(yyyy8);
        nz = this.y.redAdd(this.y);
      } else {
        var delta = this.z.redSqr();
        var gamma = this.y.redSqr();
        var beta = this.x.redMul(gamma);
        var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
        alpha = alpha.redAdd(alpha).redIAdd(alpha);
        var beta4 = beta.redIAdd(beta);
        beta4 = beta4.redIAdd(beta4);
        var beta8 = beta4.redAdd(beta4);
        nx = alpha.redSqr().redISub(beta8);
        nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
        var ggamma8 = gamma.redSqr();
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
      }
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype._dbl = function _dbl() {
      var a = this.curve.a;
      var jx = this.x;
      var jy = this.y;
      var jz = this.z;
      var jz4 = jz.redSqr().redSqr();
      var jx2 = jx.redSqr();
      var jy2 = jy.redSqr();
      var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
      var jxd4 = jx.redAdd(jx);
      jxd4 = jxd4.redIAdd(jxd4);
      var t1 = jxd4.redMul(jy2);
      var nx = c.redSqr().redISub(t1.redAdd(t1));
      var t2 = t1.redISub(nx);
      var jyd8 = jy2.redSqr();
      jyd8 = jyd8.redIAdd(jyd8);
      jyd8 = jyd8.redIAdd(jyd8);
      jyd8 = jyd8.redIAdd(jyd8);
      var ny = c.redMul(t2).redISub(jyd8);
      var nz = jy.redAdd(jy).redMul(jz);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.trpl = function trpl() {
      if (!this.curve.zeroA)
        return this.dbl().add(this);
      var xx = this.x.redSqr();
      var yy = this.y.redSqr();
      var zz = this.z.redSqr();
      var yyyy = yy.redSqr();
      var m = xx.redAdd(xx).redIAdd(xx);
      var mm = m.redSqr();
      var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      e = e.redIAdd(e);
      e = e.redAdd(e).redIAdd(e);
      e = e.redISub(mm);
      var ee = e.redSqr();
      var t = yyyy.redIAdd(yyyy);
      t = t.redIAdd(t);
      t = t.redIAdd(t);
      t = t.redIAdd(t);
      var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
      var yyu4 = yy.redMul(u);
      yyu4 = yyu4.redIAdd(yyu4);
      yyu4 = yyu4.redIAdd(yyu4);
      var nx = this.x.redMul(ee).redISub(yyu4);
      nx = nx.redIAdd(nx);
      nx = nx.redIAdd(nx);
      var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
      ny = ny.redIAdd(ny);
      ny = ny.redIAdd(ny);
      ny = ny.redIAdd(ny);
      var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.mul = function mul2(k, kbase) {
      k = new import_bn2.default(k, kbase);
      return this.curve._wnafMul(this, k);
    };
    JPoint.prototype.eq = function eq3(p) {
      if (p.type === "affine")
        return this.eq(p.toJ());
      if (this === p)
        return true;
      var z2 = this.z.redSqr();
      var pz2 = p.z.redSqr();
      if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
        return false;
      var z3 = z2.redMul(this.z);
      var pz3 = pz2.redMul(p.z);
      return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
    };
    JPoint.prototype.eqXToP = function eqXToP(x) {
      var zs = this.z.redSqr();
      var rx = x.toRed(this.curve.red).redMul(zs);
      if (this.x.cmp(rx) === 0)
        return true;
      var xc = x.clone();
      var t = this.curve.redN.redMul(zs);
      for (; ; ) {
        xc.iadd(this.curve.n);
        if (xc.cmp(this.curve.p) >= 0)
          return false;
        rx.redIAdd(t);
        if (this.x.cmp(rx) === 0)
          return true;
      }
    };
    JPoint.prototype.inspect = function inspect2() {
      if (this.isInfinity())
        return "<EC JPoint Infinity>";
      return "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
    };
    JPoint.prototype.isInfinity = function isInfinity2() {
      return this.z.cmpn(0) === 0;
    };
    curve_1 = createCommonjsModule(function(module, exports) {
      "use strict";
      var curve = exports;
      curve.base = base;
      curve.short = short_1;
      curve.mont = null;
      curve.edwards = null;
    });
    curves_1 = createCommonjsModule(function(module, exports) {
      "use strict";
      var curves = exports;
      var assert2 = utils_1$1.assert;
      function PresetCurve(options) {
        if (options.type === "short")
          this.curve = new curve_1.short(options);
        else if (options.type === "edwards")
          this.curve = new curve_1.edwards(options);
        else
          this.curve = new curve_1.mont(options);
        this.g = this.curve.g;
        this.n = this.curve.n;
        this.hash = options.hash;
        assert2(this.g.validate(), "Invalid curve");
        assert2(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
      }
      curves.PresetCurve = PresetCurve;
      function defineCurve(name, options) {
        Object.defineProperty(curves, name, {
          configurable: true,
          enumerable: true,
          get: function() {
            var curve = new PresetCurve(options);
            Object.defineProperty(curves, name, {
              configurable: true,
              enumerable: true,
              value: curve
            });
            return curve;
          }
        });
      }
      defineCurve("p192", {
        type: "short",
        prime: "p192",
        p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
        a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
        b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
        n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
        hash: import_hash.default.sha256,
        gRed: false,
        g: [
          "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
          "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
        ]
      });
      defineCurve("p224", {
        type: "short",
        prime: "p224",
        p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
        a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
        b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
        n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
        hash: import_hash.default.sha256,
        gRed: false,
        g: [
          "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
          "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
        ]
      });
      defineCurve("p256", {
        type: "short",
        prime: null,
        p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
        a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
        b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
        n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
        hash: import_hash.default.sha256,
        gRed: false,
        g: [
          "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
          "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
        ]
      });
      defineCurve("p384", {
        type: "short",
        prime: null,
        p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
        a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
        b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
        n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
        hash: import_hash.default.sha384,
        gRed: false,
        g: [
          "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
          "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
        ]
      });
      defineCurve("p521", {
        type: "short",
        prime: null,
        p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
        a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
        b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
        n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
        hash: import_hash.default.sha512,
        gRed: false,
        g: [
          "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
          "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
        ]
      });
      defineCurve("curve25519", {
        type: "mont",
        prime: "p25519",
        p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
        a: "76d06",
        b: "1",
        n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
        hash: import_hash.default.sha256,
        gRed: false,
        g: [
          "9"
        ]
      });
      defineCurve("ed25519", {
        type: "edwards",
        prime: "p25519",
        p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
        a: "-1",
        c: "1",
        d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
        n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
        hash: import_hash.default.sha256,
        gRed: false,
        g: [
          "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
          "6666666666666666666666666666666666666666666666666666666666666658"
        ]
      });
      var pre;
      try {
        pre = null.crash();
      } catch (e) {
        pre = void 0;
      }
      defineCurve("secp256k1", {
        type: "short",
        prime: "k256",
        p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
        a: "0",
        b: "7",
        n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
        h: "1",
        hash: import_hash.default.sha256,
        beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
        lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
        basis: [
          {
            a: "3086d221a7d46bcde86c90e49284eb15",
            b: "-e4437ed6010e88286f547fa90abfe4c3"
          },
          {
            a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
            b: "3086d221a7d46bcde86c90e49284eb15"
          }
        ],
        gRed: false,
        g: [
          "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
          "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
          pre
        ]
      });
    });
    hmacDrbg = HmacDRBG;
    HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
      var seed = entropy.concat(nonce).concat(pers);
      this.K = new Array(this.outLen / 8);
      this.V = new Array(this.outLen / 8);
      for (var i = 0; i < this.V.length; i++) {
        this.K[i] = 0;
        this.V[i] = 1;
      }
      this._update(seed);
      this._reseed = 1;
      this.reseedInterval = 281474976710656;
    };
    HmacDRBG.prototype._hmac = function hmac() {
      return new import_hash.default.hmac(this.hash, this.K);
    };
    HmacDRBG.prototype._update = function update(seed) {
      var kmac = this._hmac().update(this.V).update([0]);
      if (seed)
        kmac = kmac.update(seed);
      this.K = kmac.digest();
      this.V = this._hmac().update(this.V).digest();
      if (!seed)
        return;
      this.K = this._hmac().update(this.V).update([1]).update(seed).digest();
      this.V = this._hmac().update(this.V).digest();
    };
    HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add3, addEnc) {
      if (typeof entropyEnc !== "string") {
        addEnc = add3;
        add3 = entropyEnc;
        entropyEnc = null;
      }
      entropy = utils_1.toArray(entropy, entropyEnc);
      add3 = utils_1.toArray(add3, addEnc);
      minimalisticAssert(entropy.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
      this._update(entropy.concat(add3 || []));
      this._reseed = 1;
    };
    HmacDRBG.prototype.generate = function generate(len, enc, add3, addEnc) {
      if (this._reseed > this.reseedInterval)
        throw new Error("Reseed is required");
      if (typeof enc !== "string") {
        addEnc = add3;
        add3 = enc;
        enc = null;
      }
      if (add3) {
        add3 = utils_1.toArray(add3, addEnc || "hex");
        this._update(add3);
      }
      var temp = [];
      while (temp.length < len) {
        this.V = this._hmac().update(this.V).digest();
        temp = temp.concat(this.V);
      }
      var res = temp.slice(0, len);
      this._update(add3);
      this._reseed++;
      return utils_1.encode(res, enc);
    };
    assert$3 = utils_1$1.assert;
    key = KeyPair;
    KeyPair.fromPublic = function fromPublic(ec2, pub, enc) {
      if (pub instanceof KeyPair)
        return pub;
      return new KeyPair(ec2, {
        pub,
        pubEnc: enc
      });
    };
    KeyPair.fromPrivate = function fromPrivate(ec2, priv, enc) {
      if (priv instanceof KeyPair)
        return priv;
      return new KeyPair(ec2, {
        priv,
        privEnc: enc
      });
    };
    KeyPair.prototype.validate = function validate4() {
      var pub = this.getPublic();
      if (pub.isInfinity())
        return { result: false, reason: "Invalid public key" };
      if (!pub.validate())
        return { result: false, reason: "Public key is not a point" };
      if (!pub.mul(this.ec.curve.n).isInfinity())
        return { result: false, reason: "Public key * N != O" };
      return { result: true, reason: null };
    };
    KeyPair.prototype.getPublic = function getPublic(compact, enc) {
      if (typeof compact === "string") {
        enc = compact;
        compact = null;
      }
      if (!this.pub)
        this.pub = this.ec.g.mul(this.priv);
      if (!enc)
        return this.pub;
      return this.pub.encode(enc, compact);
    };
    KeyPair.prototype.getPrivate = function getPrivate(enc) {
      if (enc === "hex")
        return this.priv.toString(16, 2);
      else
        return this.priv;
    };
    KeyPair.prototype._importPrivate = function _importPrivate(key2, enc) {
      this.priv = new import_bn2.default(key2, enc || 16);
      this.priv = this.priv.umod(this.ec.curve.n);
    };
    KeyPair.prototype._importPublic = function _importPublic(key2, enc) {
      if (key2.x || key2.y) {
        if (this.ec.curve.type === "mont") {
          assert$3(key2.x, "Need x coordinate");
        } else if (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") {
          assert$3(key2.x && key2.y, "Need both x and y coordinate");
        }
        this.pub = this.ec.curve.point(key2.x, key2.y);
        return;
      }
      this.pub = this.ec.curve.decodePoint(key2, enc);
    };
    KeyPair.prototype.derive = function derive(pub) {
      if (!pub.validate()) {
        assert$3(pub.validate(), "public point not validated");
      }
      return pub.mul(this.priv).getX();
    };
    KeyPair.prototype.sign = function sign(msg, enc, options) {
      return this.ec.sign(msg, this, enc, options);
    };
    KeyPair.prototype.verify = function verify(msg, signature2) {
      return this.ec.verify(msg, signature2, this);
    };
    KeyPair.prototype.inspect = function inspect3() {
      return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
    };
    assert$4 = utils_1$1.assert;
    signature = Signature;
    Signature.prototype._importDER = function _importDER(data, enc) {
      data = utils_1$1.toArray(data, enc);
      var p = new Position();
      if (data[p.place++] !== 48) {
        return false;
      }
      var len = getLength(data, p);
      if (len === false) {
        return false;
      }
      if (len + p.place !== data.length) {
        return false;
      }
      if (data[p.place++] !== 2) {
        return false;
      }
      var rlen = getLength(data, p);
      if (rlen === false) {
        return false;
      }
      var r = data.slice(p.place, rlen + p.place);
      p.place += rlen;
      if (data[p.place++] !== 2) {
        return false;
      }
      var slen = getLength(data, p);
      if (slen === false) {
        return false;
      }
      if (data.length !== slen + p.place) {
        return false;
      }
      var s = data.slice(p.place, slen + p.place);
      if (r[0] === 0) {
        if (r[1] & 128) {
          r = r.slice(1);
        } else {
          return false;
        }
      }
      if (s[0] === 0) {
        if (s[1] & 128) {
          s = s.slice(1);
        } else {
          return false;
        }
      }
      this.r = new import_bn2.default(r);
      this.s = new import_bn2.default(s);
      this.recoveryParam = null;
      return true;
    };
    Signature.prototype.toDER = function toDER(enc) {
      var r = this.r.toArray();
      var s = this.s.toArray();
      if (r[0] & 128)
        r = [0].concat(r);
      if (s[0] & 128)
        s = [0].concat(s);
      r = rmPadding(r);
      s = rmPadding(s);
      while (!s[0] && !(s[1] & 128)) {
        s = s.slice(1);
      }
      var arr = [2];
      constructLength(arr, r.length);
      arr = arr.concat(r);
      arr.push(2);
      constructLength(arr, s.length);
      var backHalf = arr.concat(s);
      var res = [48];
      constructLength(res, backHalf.length);
      res = res.concat(backHalf);
      return utils_1$1.encode(res, enc);
    };
    rand = function() {
      throw new Error("unsupported");
    };
    assert$5 = utils_1$1.assert;
    ec = EC;
    EC.prototype.keyPair = function keyPair(options) {
      return new key(this, options);
    };
    EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
      return key.fromPrivate(this, priv, enc);
    };
    EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
      return key.fromPublic(this, pub, enc);
    };
    EC.prototype.genKeyPair = function genKeyPair(options) {
      if (!options)
        options = {};
      var drbg = new hmacDrbg({
        hash: this.hash,
        pers: options.pers,
        persEnc: options.persEnc || "utf8",
        entropy: options.entropy || rand(this.hash.hmacStrength),
        entropyEnc: options.entropy && options.entropyEnc || "utf8",
        nonce: this.n.toArray()
      });
      var bytes = this.n.byteLength();
      var ns2 = this.n.sub(new import_bn2.default(2));
      for (; ; ) {
        var priv = new import_bn2.default(drbg.generate(bytes));
        if (priv.cmp(ns2) > 0)
          continue;
        priv.iaddn(1);
        return this.keyFromPrivate(priv);
      }
    };
    EC.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
      var delta = msg.byteLength() * 8 - this.n.bitLength();
      if (delta > 0)
        msg = msg.ushrn(delta);
      if (!truncOnly && msg.cmp(this.n) >= 0)
        return msg.sub(this.n);
      else
        return msg;
    };
    EC.prototype.sign = function sign2(msg, key2, enc, options) {
      if (typeof enc === "object") {
        options = enc;
        enc = null;
      }
      if (!options)
        options = {};
      key2 = this.keyFromPrivate(key2, enc);
      msg = this._truncateToN(new import_bn2.default(msg, 16));
      var bytes = this.n.byteLength();
      var bkey = key2.getPrivate().toArray("be", bytes);
      var nonce = msg.toArray("be", bytes);
      var drbg = new hmacDrbg({
        hash: this.hash,
        entropy: bkey,
        nonce,
        pers: options.pers,
        persEnc: options.persEnc || "utf8"
      });
      var ns1 = this.n.sub(new import_bn2.default(1));
      for (var iter = 0; ; iter++) {
        var k = options.k ? options.k(iter) : new import_bn2.default(drbg.generate(this.n.byteLength()));
        k = this._truncateToN(k, true);
        if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
          continue;
        var kp = this.g.mul(k);
        if (kp.isInfinity())
          continue;
        var kpX = kp.getX();
        var r = kpX.umod(this.n);
        if (r.cmpn(0) === 0)
          continue;
        var s = k.invm(this.n).mul(r.mul(key2.getPrivate()).iadd(msg));
        s = s.umod(this.n);
        if (s.cmpn(0) === 0)
          continue;
        var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r) !== 0 ? 2 : 0);
        if (options.canonical && s.cmp(this.nh) > 0) {
          s = this.n.sub(s);
          recoveryParam ^= 1;
        }
        return new signature({ r, s, recoveryParam });
      }
    };
    EC.prototype.verify = function verify2(msg, signature$1, key2, enc) {
      msg = this._truncateToN(new import_bn2.default(msg, 16));
      key2 = this.keyFromPublic(key2, enc);
      signature$1 = new signature(signature$1, "hex");
      var r = signature$1.r;
      var s = signature$1.s;
      if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
        return false;
      if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
        return false;
      var sinv = s.invm(this.n);
      var u1 = sinv.mul(msg).umod(this.n);
      var u2 = sinv.mul(r).umod(this.n);
      var p;
      if (!this.curve._maxwellTrick) {
        p = this.g.mulAdd(u1, key2.getPublic(), u2);
        if (p.isInfinity())
          return false;
        return p.getX().umod(this.n).cmp(r) === 0;
      }
      p = this.g.jmulAdd(u1, key2.getPublic(), u2);
      if (p.isInfinity())
        return false;
      return p.eqXToP(r);
    };
    EC.prototype.recoverPubKey = function(msg, signature$1, j, enc) {
      assert$5((3 & j) === j, "The recovery param is more than two bits");
      signature$1 = new signature(signature$1, enc);
      var n = this.n;
      var e = new import_bn2.default(msg);
      var r = signature$1.r;
      var s = signature$1.s;
      var isYOdd = j & 1;
      var isSecondKey = j >> 1;
      if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
        throw new Error("Unable to find sencond key candinate");
      if (isSecondKey)
        r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
      else
        r = this.curve.pointFromX(r, isYOdd);
      var rInv = signature$1.r.invm(n);
      var s1 = n.sub(e).mul(rInv).umod(n);
      var s2 = s.mul(rInv).umod(n);
      return this.g.mulAdd(s1, r, s2);
    };
    EC.prototype.getKeyRecoveryParam = function(e, signature$1, Q, enc) {
      signature$1 = new signature(signature$1, enc);
      if (signature$1.recoveryParam !== null)
        return signature$1.recoveryParam;
      for (var i = 0; i < 4; i++) {
        var Qprime;
        try {
          Qprime = this.recoverPubKey(e, signature$1, i);
        } catch (e2) {
          continue;
        }
        if (Qprime.eq(Q))
          return i;
      }
      throw new Error("Unable to find valid recovery factor");
    };
    elliptic_1 = createCommonjsModule(function(module, exports) {
      "use strict";
      var elliptic = exports;
      elliptic.version = { version: "6.5.4" }.version;
      elliptic.utils = utils_1$1;
      elliptic.rand = function() {
        throw new Error("unsupported");
      };
      elliptic.curve = curve_1;
      elliptic.curves = curves_1;
      elliptic.ec = ec;
      elliptic.eddsa = null;
    });
    EC$1 = elliptic_1.ec;
  }
});

// node_modules/@ethersproject/signing-key/lib.esm/_version.js
var version7;
var init_version7 = __esm({
  "node_modules/@ethersproject/signing-key/lib.esm/_version.js"() {
    init_react();
    version7 = "signing-key/5.5.0";
  }
});

// node_modules/@ethersproject/signing-key/lib.esm/index.js
function getCurve() {
  if (!_curve) {
    _curve = new EC$1("secp256k1");
  }
  return _curve;
}
function recoverPublicKey(digest, signature2) {
  const sig = splitSignature(signature2);
  const rs = { r: arrayify(sig.r), s: arrayify(sig.s) };
  return "0x" + getCurve().recoverPubKey(arrayify(digest), rs, sig.recoveryParam).encode("hex", false);
}
function computePublicKey(key2, compressed) {
  const bytes = arrayify(key2);
  if (bytes.length === 32) {
    const signingKey = new SigningKey(bytes);
    if (compressed) {
      return "0x" + getCurve().keyFromPrivate(bytes).getPublic(true, "hex");
    }
    return signingKey.publicKey;
  } else if (bytes.length === 33) {
    if (compressed) {
      return hexlify(bytes);
    }
    return "0x" + getCurve().keyFromPublic(bytes).getPublic(false, "hex");
  } else if (bytes.length === 65) {
    if (!compressed) {
      return hexlify(bytes);
    }
    return "0x" + getCurve().keyFromPublic(bytes).getPublic(true, "hex");
  }
  return logger7.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}
var logger7, _curve, SigningKey;
var init_lib9 = __esm({
  "node_modules/@ethersproject/signing-key/lib.esm/index.js"() {
    init_react();
    init_elliptic();
    init_lib2();
    init_lib8();
    init_lib();
    init_version7();
    "use strict";
    logger7 = new Logger(version7);
    _curve = null;
    SigningKey = class {
      constructor(privateKey) {
        defineReadOnly(this, "curve", "secp256k1");
        defineReadOnly(this, "privateKey", hexlify(privateKey));
        const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
        defineReadOnly(this, "publicKey", "0x" + keyPair2.getPublic(false, "hex"));
        defineReadOnly(this, "compressedPublicKey", "0x" + keyPair2.getPublic(true, "hex"));
        defineReadOnly(this, "_isSigningKey", true);
      }
      _addPoint(other) {
        const p0 = getCurve().keyFromPublic(arrayify(this.publicKey));
        const p1 = getCurve().keyFromPublic(arrayify(other));
        return "0x" + p0.pub.add(p1.pub).encodeCompressed("hex");
      }
      signDigest(digest) {
        const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
        const digestBytes = arrayify(digest);
        if (digestBytes.length !== 32) {
          logger7.throwArgumentError("bad digest length", "digest", digest);
        }
        const signature2 = keyPair2.sign(digestBytes, { canonical: true });
        return splitSignature({
          recoveryParam: signature2.recoveryParam,
          r: hexZeroPad("0x" + signature2.r.toString(16), 32),
          s: hexZeroPad("0x" + signature2.s.toString(16), 32)
        });
      }
      computeSharedSecret(otherKey) {
        const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
        const otherKeyPair = getCurve().keyFromPublic(arrayify(computePublicKey(otherKey)));
        return hexZeroPad("0x" + keyPair2.derive(otherKeyPair.getPublic()).toString(16), 32);
      }
      static isSigningKey(value) {
        return !!(value && value._isSigningKey);
      }
    };
  }
});

// node_modules/@ethersproject/transactions/lib.esm/_version.js
var version8;
var init_version8 = __esm({
  "node_modules/@ethersproject/transactions/lib.esm/_version.js"() {
    init_react();
    version8 = "transactions/5.5.0";
  }
});

// node_modules/@ethersproject/transactions/lib.esm/index.js
var lib_exports3 = {};
__export(lib_exports3, {
  TransactionTypes: () => TransactionTypes,
  accessListify: () => accessListify,
  computeAddress: () => computeAddress,
  parse: () => parse,
  recoverAddress: () => recoverAddress,
  serialize: () => serialize
});
function handleAddress(value) {
  if (value === "0x") {
    return null;
  }
  return getAddress(value);
}
function handleNumber(value) {
  if (value === "0x") {
    return Zero2;
  }
  return BigNumber.from(value);
}
function computeAddress(key2) {
  const publicKey = computePublicKey(key2);
  return getAddress(hexDataSlice(keccak256(hexDataSlice(publicKey, 1)), 12));
}
function recoverAddress(digest, signature2) {
  return computeAddress(recoverPublicKey(arrayify(digest), signature2));
}
function formatNumber(value, name) {
  const result = stripZeros(BigNumber.from(value).toHexString());
  if (result.length > 32) {
    logger8.throwArgumentError("invalid length for " + name, "transaction:" + name, value);
  }
  return result;
}
function accessSetify(addr, storageKeys) {
  return {
    address: getAddress(addr),
    storageKeys: (storageKeys || []).map((storageKey, index) => {
      if (hexDataLength(storageKey) !== 32) {
        logger8.throwArgumentError("invalid access list storageKey", `accessList[${addr}:${index}]`, storageKey);
      }
      return storageKey.toLowerCase();
    })
  };
}
function accessListify(value) {
  if (Array.isArray(value)) {
    return value.map((set, index) => {
      if (Array.isArray(set)) {
        if (set.length > 2) {
          logger8.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${index}]`, set);
        }
        return accessSetify(set[0], set[1]);
      }
      return accessSetify(set.address, set.storageKeys);
    });
  }
  const result = Object.keys(value).map((addr) => {
    const storageKeys = value[addr].reduce((accum, storageKey) => {
      accum[storageKey] = true;
      return accum;
    }, {});
    return accessSetify(addr, Object.keys(storageKeys).sort());
  });
  result.sort((a, b) => a.address.localeCompare(b.address));
  return result;
}
function formatAccessList(value) {
  return accessListify(value).map((set) => [set.address, set.storageKeys]);
}
function _serializeEip1559(transaction, signature2) {
  if (transaction.gasPrice != null) {
    const gasPrice = BigNumber.from(transaction.gasPrice);
    const maxFeePerGas = BigNumber.from(transaction.maxFeePerGas || 0);
    if (!gasPrice.eq(maxFeePerGas)) {
      logger8.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", {
        gasPrice,
        maxFeePerGas
      });
    }
  }
  const fields = [
    formatNumber(transaction.chainId || 0, "chainId"),
    formatNumber(transaction.nonce || 0, "nonce"),
    formatNumber(transaction.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    formatNumber(transaction.maxFeePerGas || 0, "maxFeePerGas"),
    formatNumber(transaction.gasLimit || 0, "gasLimit"),
    transaction.to != null ? getAddress(transaction.to) : "0x",
    formatNumber(transaction.value || 0, "value"),
    transaction.data || "0x",
    formatAccessList(transaction.accessList || [])
  ];
  if (signature2) {
    const sig = splitSignature(signature2);
    fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
    fields.push(stripZeros(sig.r));
    fields.push(stripZeros(sig.s));
  }
  return hexConcat(["0x02", encode(fields)]);
}
function _serializeEip2930(transaction, signature2) {
  const fields = [
    formatNumber(transaction.chainId || 0, "chainId"),
    formatNumber(transaction.nonce || 0, "nonce"),
    formatNumber(transaction.gasPrice || 0, "gasPrice"),
    formatNumber(transaction.gasLimit || 0, "gasLimit"),
    transaction.to != null ? getAddress(transaction.to) : "0x",
    formatNumber(transaction.value || 0, "value"),
    transaction.data || "0x",
    formatAccessList(transaction.accessList || [])
  ];
  if (signature2) {
    const sig = splitSignature(signature2);
    fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
    fields.push(stripZeros(sig.r));
    fields.push(stripZeros(sig.s));
  }
  return hexConcat(["0x01", encode(fields)]);
}
function _serialize(transaction, signature2) {
  checkProperties(transaction, allowedTransactionKeys);
  const raw = [];
  transactionFields.forEach(function(fieldInfo) {
    let value = transaction[fieldInfo.name] || [];
    const options = {};
    if (fieldInfo.numeric) {
      options.hexPad = "left";
    }
    value = arrayify(hexlify(value, options));
    if (fieldInfo.length && value.length !== fieldInfo.length && value.length > 0) {
      logger8.throwArgumentError("invalid length for " + fieldInfo.name, "transaction:" + fieldInfo.name, value);
    }
    if (fieldInfo.maxLength) {
      value = stripZeros(value);
      if (value.length > fieldInfo.maxLength) {
        logger8.throwArgumentError("invalid length for " + fieldInfo.name, "transaction:" + fieldInfo.name, value);
      }
    }
    raw.push(hexlify(value));
  });
  let chainId = 0;
  if (transaction.chainId != null) {
    chainId = transaction.chainId;
    if (typeof chainId !== "number") {
      logger8.throwArgumentError("invalid transaction.chainId", "transaction", transaction);
    }
  } else if (signature2 && !isBytesLike(signature2) && signature2.v > 28) {
    chainId = Math.floor((signature2.v - 35) / 2);
  }
  if (chainId !== 0) {
    raw.push(hexlify(chainId));
    raw.push("0x");
    raw.push("0x");
  }
  if (!signature2) {
    return encode(raw);
  }
  const sig = splitSignature(signature2);
  let v = 27 + sig.recoveryParam;
  if (chainId !== 0) {
    raw.pop();
    raw.pop();
    raw.pop();
    v += chainId * 2 + 8;
    if (sig.v > 28 && sig.v !== v) {
      logger8.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", signature2);
    }
  } else if (sig.v !== v) {
    logger8.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", signature2);
  }
  raw.push(hexlify(v));
  raw.push(stripZeros(arrayify(sig.r)));
  raw.push(stripZeros(arrayify(sig.s)));
  return encode(raw);
}
function serialize(transaction, signature2) {
  if (transaction.type == null || transaction.type === 0) {
    if (transaction.accessList != null) {
      logger8.throwArgumentError("untyped transactions do not support accessList; include type: 1", "transaction", transaction);
    }
    return _serialize(transaction, signature2);
  }
  switch (transaction.type) {
    case 1:
      return _serializeEip2930(transaction, signature2);
    case 2:
      return _serializeEip1559(transaction, signature2);
    default:
      break;
  }
  return logger8.throwError(`unsupported transaction type: ${transaction.type}`, Logger.errors.UNSUPPORTED_OPERATION, {
    operation: "serializeTransaction",
    transactionType: transaction.type
  });
}
function _parseEipSignature(tx, fields, serialize2) {
  try {
    const recid = handleNumber(fields[0]).toNumber();
    if (recid !== 0 && recid !== 1) {
      throw new Error("bad recid");
    }
    tx.v = recid;
  } catch (error) {
    logger8.throwArgumentError("invalid v for transaction type: 1", "v", fields[0]);
  }
  tx.r = hexZeroPad(fields[1], 32);
  tx.s = hexZeroPad(fields[2], 32);
  try {
    const digest = keccak256(serialize2(tx));
    tx.from = recoverAddress(digest, { r: tx.r, s: tx.s, recoveryParam: tx.v });
  } catch (error) {
    console.log(error);
  }
}
function _parseEip1559(payload) {
  const transaction = decode(payload.slice(1));
  if (transaction.length !== 9 && transaction.length !== 12) {
    logger8.throwArgumentError("invalid component count for transaction type: 2", "payload", hexlify(payload));
  }
  const maxPriorityFeePerGas = handleNumber(transaction[2]);
  const maxFeePerGas = handleNumber(transaction[3]);
  const tx = {
    type: 2,
    chainId: handleNumber(transaction[0]).toNumber(),
    nonce: handleNumber(transaction[1]).toNumber(),
    maxPriorityFeePerGas,
    maxFeePerGas,
    gasPrice: null,
    gasLimit: handleNumber(transaction[4]),
    to: handleAddress(transaction[5]),
    value: handleNumber(transaction[6]),
    data: transaction[7],
    accessList: accessListify(transaction[8])
  };
  if (transaction.length === 9) {
    return tx;
  }
  tx.hash = keccak256(payload);
  _parseEipSignature(tx, transaction.slice(9), _serializeEip1559);
  return tx;
}
function _parseEip2930(payload) {
  const transaction = decode(payload.slice(1));
  if (transaction.length !== 8 && transaction.length !== 11) {
    logger8.throwArgumentError("invalid component count for transaction type: 1", "payload", hexlify(payload));
  }
  const tx = {
    type: 1,
    chainId: handleNumber(transaction[0]).toNumber(),
    nonce: handleNumber(transaction[1]).toNumber(),
    gasPrice: handleNumber(transaction[2]),
    gasLimit: handleNumber(transaction[3]),
    to: handleAddress(transaction[4]),
    value: handleNumber(transaction[5]),
    data: transaction[6],
    accessList: accessListify(transaction[7])
  };
  if (transaction.length === 8) {
    return tx;
  }
  tx.hash = keccak256(payload);
  _parseEipSignature(tx, transaction.slice(8), _serializeEip2930);
  return tx;
}
function _parse(rawTransaction) {
  const transaction = decode(rawTransaction);
  if (transaction.length !== 9 && transaction.length !== 6) {
    logger8.throwArgumentError("invalid raw transaction", "rawTransaction", rawTransaction);
  }
  const tx = {
    nonce: handleNumber(transaction[0]).toNumber(),
    gasPrice: handleNumber(transaction[1]),
    gasLimit: handleNumber(transaction[2]),
    to: handleAddress(transaction[3]),
    value: handleNumber(transaction[4]),
    data: transaction[5],
    chainId: 0
  };
  if (transaction.length === 6) {
    return tx;
  }
  try {
    tx.v = BigNumber.from(transaction[6]).toNumber();
  } catch (error) {
    console.log(error);
    return tx;
  }
  tx.r = hexZeroPad(transaction[7], 32);
  tx.s = hexZeroPad(transaction[8], 32);
  if (BigNumber.from(tx.r).isZero() && BigNumber.from(tx.s).isZero()) {
    tx.chainId = tx.v;
    tx.v = 0;
  } else {
    tx.chainId = Math.floor((tx.v - 35) / 2);
    if (tx.chainId < 0) {
      tx.chainId = 0;
    }
    let recoveryParam = tx.v - 27;
    const raw = transaction.slice(0, 6);
    if (tx.chainId !== 0) {
      raw.push(hexlify(tx.chainId));
      raw.push("0x");
      raw.push("0x");
      recoveryParam -= tx.chainId * 2 + 8;
    }
    const digest = keccak256(encode(raw));
    try {
      tx.from = recoverAddress(digest, { r: hexlify(tx.r), s: hexlify(tx.s), recoveryParam });
    } catch (error) {
      console.log(error);
    }
    tx.hash = keccak256(rawTransaction);
  }
  tx.type = null;
  return tx;
}
function parse(rawTransaction) {
  const payload = arrayify(rawTransaction);
  if (payload[0] > 127) {
    return _parse(payload);
  }
  switch (payload[0]) {
    case 1:
      return _parseEip2930(payload);
    case 2:
      return _parseEip1559(payload);
    default:
      break;
  }
  return logger8.throwError(`unsupported transaction type: ${payload[0]}`, Logger.errors.UNSUPPORTED_OPERATION, {
    operation: "parseTransaction",
    transactionType: payload[0]
  });
}
var logger8, TransactionTypes, transactionFields, allowedTransactionKeys;
var init_lib10 = __esm({
  "node_modules/@ethersproject/transactions/lib.esm/index.js"() {
    init_react();
    init_lib6();
    init_lib3();
    init_lib2();
    init_lib7();
    init_lib4();
    init_lib8();
    init_lib5();
    init_lib9();
    init_lib();
    init_version8();
    "use strict";
    logger8 = new Logger(version8);
    (function(TransactionTypes2) {
      TransactionTypes2[TransactionTypes2["legacy"] = 0] = "legacy";
      TransactionTypes2[TransactionTypes2["eip2930"] = 1] = "eip2930";
      TransactionTypes2[TransactionTypes2["eip1559"] = 2] = "eip1559";
    })(TransactionTypes || (TransactionTypes = {}));
    transactionFields = [
      { name: "nonce", maxLength: 32, numeric: true },
      { name: "gasPrice", maxLength: 32, numeric: true },
      { name: "gasLimit", maxLength: 32, numeric: true },
      { name: "to", length: 20 },
      { name: "value", maxLength: 32, numeric: true },
      { name: "data" }
    ];
    allowedTransactionKeys = {
      chainId: true,
      data: true,
      gasLimit: true,
      gasPrice: true,
      nonce: true,
      to: true,
      type: true,
      value: true
    };
  }
});

// node_modules/@ethersproject/strings/lib.esm/_version.js
var version9;
var init_version9 = __esm({
  "node_modules/@ethersproject/strings/lib.esm/_version.js"() {
    init_react();
    version9 = "strings/5.5.0";
  }
});

// node_modules/@ethersproject/strings/lib.esm/utf8.js
function errorFunc(reason, offset, bytes, output, badCodepoint) {
  return logger9.throwArgumentError(`invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes);
}
function ignoreFunc(reason, offset, bytes, output, badCodepoint) {
  if (reason === Utf8ErrorReason.BAD_PREFIX || reason === Utf8ErrorReason.UNEXPECTED_CONTINUE) {
    let i = 0;
    for (let o = offset + 1; o < bytes.length; o++) {
      if (bytes[o] >> 6 !== 2) {
        break;
      }
      i++;
    }
    return i;
  }
  if (reason === Utf8ErrorReason.OVERRUN) {
    return bytes.length - offset - 1;
  }
  return 0;
}
function replaceFunc(reason, offset, bytes, output, badCodepoint) {
  if (reason === Utf8ErrorReason.OVERLONG) {
    output.push(badCodepoint);
    return 0;
  }
  output.push(65533);
  return ignoreFunc(reason, offset, bytes, output, badCodepoint);
}
function getUtf8CodePoints(bytes, onError) {
  if (onError == null) {
    onError = Utf8ErrorFuncs.error;
  }
  bytes = arrayify(bytes);
  const result = [];
  let i = 0;
  while (i < bytes.length) {
    const c = bytes[i++];
    if (c >> 7 === 0) {
      result.push(c);
      continue;
    }
    let extraLength = null;
    let overlongMask = null;
    if ((c & 224) === 192) {
      extraLength = 1;
      overlongMask = 127;
    } else if ((c & 240) === 224) {
      extraLength = 2;
      overlongMask = 2047;
    } else if ((c & 248) === 240) {
      extraLength = 3;
      overlongMask = 65535;
    } else {
      if ((c & 192) === 128) {
        i += onError(Utf8ErrorReason.UNEXPECTED_CONTINUE, i - 1, bytes, result);
      } else {
        i += onError(Utf8ErrorReason.BAD_PREFIX, i - 1, bytes, result);
      }
      continue;
    }
    if (i - 1 + extraLength >= bytes.length) {
      i += onError(Utf8ErrorReason.OVERRUN, i - 1, bytes, result);
      continue;
    }
    let res = c & (1 << 8 - extraLength - 1) - 1;
    for (let j = 0; j < extraLength; j++) {
      let nextChar = bytes[i];
      if ((nextChar & 192) != 128) {
        i += onError(Utf8ErrorReason.MISSING_CONTINUE, i, bytes, result);
        res = null;
        break;
      }
      ;
      res = res << 6 | nextChar & 63;
      i++;
    }
    if (res === null) {
      continue;
    }
    if (res > 1114111) {
      i += onError(Utf8ErrorReason.OUT_OF_RANGE, i - 1 - extraLength, bytes, result, res);
      continue;
    }
    if (res >= 55296 && res <= 57343) {
      i += onError(Utf8ErrorReason.UTF16_SURROGATE, i - 1 - extraLength, bytes, result, res);
      continue;
    }
    if (res <= overlongMask) {
      i += onError(Utf8ErrorReason.OVERLONG, i - 1 - extraLength, bytes, result, res);
      continue;
    }
    result.push(res);
  }
  return result;
}
function toUtf8Bytes(str, form = UnicodeNormalizationForm.current) {
  if (form != UnicodeNormalizationForm.current) {
    logger9.checkNormalize();
    str = str.normalize(form);
  }
  let result = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 128) {
      result.push(c);
    } else if (c < 2048) {
      result.push(c >> 6 | 192);
      result.push(c & 63 | 128);
    } else if ((c & 64512) == 55296) {
      i++;
      const c2 = str.charCodeAt(i);
      if (i >= str.length || (c2 & 64512) !== 56320) {
        throw new Error("invalid utf-8 string");
      }
      const pair = 65536 + ((c & 1023) << 10) + (c2 & 1023);
      result.push(pair >> 18 | 240);
      result.push(pair >> 12 & 63 | 128);
      result.push(pair >> 6 & 63 | 128);
      result.push(pair & 63 | 128);
    } else {
      result.push(c >> 12 | 224);
      result.push(c >> 6 & 63 | 128);
      result.push(c & 63 | 128);
    }
  }
  return arrayify(result);
}
function escapeChar(value) {
  const hex = "0000" + value.toString(16);
  return "\\u" + hex.substring(hex.length - 4);
}
function _toEscapedUtf8String(bytes, onError) {
  return '"' + getUtf8CodePoints(bytes, onError).map((codePoint) => {
    if (codePoint < 256) {
      switch (codePoint) {
        case 8:
          return "\\b";
        case 9:
          return "\\t";
        case 10:
          return "\\n";
        case 13:
          return "\\r";
        case 34:
          return '\\"';
        case 92:
          return "\\\\";
      }
      if (codePoint >= 32 && codePoint < 127) {
        return String.fromCharCode(codePoint);
      }
    }
    if (codePoint <= 65535) {
      return escapeChar(codePoint);
    }
    codePoint -= 65536;
    return escapeChar((codePoint >> 10 & 1023) + 55296) + escapeChar((codePoint & 1023) + 56320);
  }).join("") + '"';
}
function _toUtf8String(codePoints) {
  return codePoints.map((codePoint) => {
    if (codePoint <= 65535) {
      return String.fromCharCode(codePoint);
    }
    codePoint -= 65536;
    return String.fromCharCode((codePoint >> 10 & 1023) + 55296, (codePoint & 1023) + 56320);
  }).join("");
}
function toUtf8String(bytes, onError) {
  return _toUtf8String(getUtf8CodePoints(bytes, onError));
}
function toUtf8CodePoints(str, form = UnicodeNormalizationForm.current) {
  return getUtf8CodePoints(toUtf8Bytes(str, form));
}
var logger9, UnicodeNormalizationForm, Utf8ErrorReason, Utf8ErrorFuncs;
var init_utf8 = __esm({
  "node_modules/@ethersproject/strings/lib.esm/utf8.js"() {
    init_react();
    init_lib2();
    init_lib();
    init_version9();
    "use strict";
    logger9 = new Logger(version9);
    (function(UnicodeNormalizationForm2) {
      UnicodeNormalizationForm2["current"] = "";
      UnicodeNormalizationForm2["NFC"] = "NFC";
      UnicodeNormalizationForm2["NFD"] = "NFD";
      UnicodeNormalizationForm2["NFKC"] = "NFKC";
      UnicodeNormalizationForm2["NFKD"] = "NFKD";
    })(UnicodeNormalizationForm || (UnicodeNormalizationForm = {}));
    (function(Utf8ErrorReason2) {
      Utf8ErrorReason2["UNEXPECTED_CONTINUE"] = "unexpected continuation byte";
      Utf8ErrorReason2["BAD_PREFIX"] = "bad codepoint prefix";
      Utf8ErrorReason2["OVERRUN"] = "string overrun";
      Utf8ErrorReason2["MISSING_CONTINUE"] = "missing continuation byte";
      Utf8ErrorReason2["OUT_OF_RANGE"] = "out of UTF-8 range";
      Utf8ErrorReason2["UTF16_SURROGATE"] = "UTF-16 surrogate";
      Utf8ErrorReason2["OVERLONG"] = "overlong representation";
    })(Utf8ErrorReason || (Utf8ErrorReason = {}));
    Utf8ErrorFuncs = Object.freeze({
      error: errorFunc,
      ignore: ignoreFunc,
      replace: replaceFunc
    });
  }
});

// node_modules/@ethersproject/strings/lib.esm/bytes32.js
function formatBytes32String(text) {
  const bytes = toUtf8Bytes(text);
  if (bytes.length > 31) {
    throw new Error("bytes32 string must be less than 32 bytes");
  }
  return hexlify(concat([bytes, HashZero]).slice(0, 32));
}
function parseBytes32String(bytes) {
  const data = arrayify(bytes);
  if (data.length !== 32) {
    throw new Error("invalid bytes32 - not 32 bytes long");
  }
  if (data[31] !== 0) {
    throw new Error("invalid bytes32 string - no null terminator");
  }
  let length = 31;
  while (data[length - 1] === 0) {
    length--;
  }
  return toUtf8String(data.slice(0, length));
}
var init_bytes32 = __esm({
  "node_modules/@ethersproject/strings/lib.esm/bytes32.js"() {
    init_react();
    init_lib7();
    init_lib2();
    init_utf8();
    "use strict";
  }
});

// node_modules/@ethersproject/strings/lib.esm/idna.js
function bytes2(data) {
  if (data.length % 4 !== 0) {
    throw new Error("bad data");
  }
  let result = [];
  for (let i = 0; i < data.length; i += 4) {
    result.push(parseInt(data.substring(i, i + 4), 16));
  }
  return result;
}
function createTable(data, func) {
  if (!func) {
    func = function(value) {
      return [parseInt(value, 16)];
    };
  }
  let lo = 0;
  let result = {};
  data.split(",").forEach((pair) => {
    let comps = pair.split(":");
    lo += parseInt(comps[0], 16);
    result[lo] = func(comps[1]);
  });
  return result;
}
function createRangeTable(data) {
  let hi = 0;
  return data.split(",").map((v) => {
    let comps = v.split("-");
    if (comps.length === 1) {
      comps[1] = "0";
    } else if (comps[1] === "") {
      comps[1] = "1";
    }
    let lo = hi + parseInt(comps[0], 16);
    hi = parseInt(comps[1], 16);
    return { l: lo, h: hi };
  });
}
function matchMap(value, ranges) {
  let lo = 0;
  for (let i = 0; i < ranges.length; i++) {
    let range = ranges[i];
    lo += range.l;
    if (value >= lo && value <= lo + range.h && (value - lo) % (range.d || 1) === 0) {
      if (range.e && range.e.indexOf(value - lo) !== -1) {
        continue;
      }
      return range;
    }
  }
  return null;
}
function flatten(values) {
  return values.reduce((accum, value) => {
    value.forEach((value2) => {
      accum.push(value2);
    });
    return accum;
  }, []);
}
function _nameprepTableA1(codepoint) {
  return !!matchMap(codepoint, Table_A_1_ranges);
}
function _nameprepTableB2(codepoint) {
  let range = matchMap(codepoint, Table_B_2_ranges);
  if (range) {
    return [codepoint + range.s];
  }
  let codes = Table_B_2_lut_abs[codepoint];
  if (codes) {
    return codes;
  }
  let shift = Table_B_2_lut_rel[codepoint];
  if (shift) {
    return [codepoint + shift[0]];
  }
  let complex = Table_B_2_complex[codepoint];
  if (complex) {
    return complex;
  }
  return null;
}
function _nameprepTableC(codepoint) {
  return !!matchMap(codepoint, Table_C_ranges);
}
function nameprep(value) {
  if (value.match(/^[a-z0-9-]*$/i) && value.length <= 59) {
    return value.toLowerCase();
  }
  let codes = toUtf8CodePoints(value);
  codes = flatten(codes.map((code) => {
    if (Table_B_1_flags.indexOf(code) >= 0) {
      return [];
    }
    if (code >= 65024 && code <= 65039) {
      return [];
    }
    let codesTableB2 = _nameprepTableB2(code);
    if (codesTableB2) {
      return codesTableB2;
    }
    return [code];
  }));
  codes = toUtf8CodePoints(_toUtf8String(codes), UnicodeNormalizationForm.NFKC);
  codes.forEach((code) => {
    if (_nameprepTableC(code)) {
      throw new Error("STRINGPREP_CONTAINS_PROHIBITED");
    }
  });
  codes.forEach((code) => {
    if (_nameprepTableA1(code)) {
      throw new Error("STRINGPREP_CONTAINS_UNASSIGNED");
    }
  });
  let name = _toUtf8String(codes);
  if (name.substring(0, 1) === "-" || name.substring(2, 4) === "--" || name.substring(name.length - 1) === "-") {
    throw new Error("invalid hyphen");
  }
  if (name.length > 63) {
    throw new Error("too long");
  }
  return name;
}
var Table_A_1_ranges, Table_B_1_flags, Table_B_2_ranges, Table_B_2_lut_abs, Table_B_2_lut_rel, Table_B_2_complex, Table_C_ranges;
var init_idna = __esm({
  "node_modules/@ethersproject/strings/lib.esm/idna.js"() {
    init_react();
    init_utf8();
    "use strict";
    Table_A_1_ranges = createRangeTable("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d");
    Table_B_1_flags = "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((v) => parseInt(v, 16));
    Table_B_2_ranges = [
      { h: 25, s: 32, l: 65 },
      { h: 30, s: 32, e: [23], l: 127 },
      { h: 54, s: 1, e: [48], l: 64, d: 2 },
      { h: 14, s: 1, l: 57, d: 2 },
      { h: 44, s: 1, l: 17, d: 2 },
      { h: 10, s: 1, e: [2, 6, 8], l: 61, d: 2 },
      { h: 16, s: 1, l: 68, d: 2 },
      { h: 84, s: 1, e: [18, 24, 66], l: 19, d: 2 },
      { h: 26, s: 32, e: [17], l: 435 },
      { h: 22, s: 1, l: 71, d: 2 },
      { h: 15, s: 80, l: 40 },
      { h: 31, s: 32, l: 16 },
      { h: 32, s: 1, l: 80, d: 2 },
      { h: 52, s: 1, l: 42, d: 2 },
      { h: 12, s: 1, l: 55, d: 2 },
      { h: 40, s: 1, e: [38], l: 15, d: 2 },
      { h: 14, s: 1, l: 48, d: 2 },
      { h: 37, s: 48, l: 49 },
      { h: 148, s: 1, l: 6351, d: 2 },
      { h: 88, s: 1, l: 160, d: 2 },
      { h: 15, s: 16, l: 704 },
      { h: 25, s: 26, l: 854 },
      { h: 25, s: 32, l: 55915 },
      { h: 37, s: 40, l: 1247 },
      { h: 25, s: -119711, l: 53248 },
      { h: 25, s: -119763, l: 52 },
      { h: 25, s: -119815, l: 52 },
      { h: 25, s: -119867, e: [1, 4, 5, 7, 8, 11, 12, 17], l: 52 },
      { h: 25, s: -119919, l: 52 },
      { h: 24, s: -119971, e: [2, 7, 8, 17], l: 52 },
      { h: 24, s: -120023, e: [2, 7, 13, 15, 16, 17], l: 52 },
      { h: 25, s: -120075, l: 52 },
      { h: 25, s: -120127, l: 52 },
      { h: 25, s: -120179, l: 52 },
      { h: 25, s: -120231, l: 52 },
      { h: 25, s: -120283, l: 52 },
      { h: 25, s: -120335, l: 52 },
      { h: 24, s: -119543, e: [17], l: 56 },
      { h: 24, s: -119601, e: [17], l: 58 },
      { h: 24, s: -119659, e: [17], l: 58 },
      { h: 24, s: -119717, e: [17], l: 58 },
      { h: 24, s: -119775, e: [17], l: 58 }
    ];
    Table_B_2_lut_abs = createTable("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3");
    Table_B_2_lut_rel = createTable("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7");
    Table_B_2_complex = createTable("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", bytes2);
    Table_C_ranges = createRangeTable("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
  }
});

// node_modules/@ethersproject/strings/lib.esm/index.js
var init_lib11 = __esm({
  "node_modules/@ethersproject/strings/lib.esm/index.js"() {
    init_react();
    init_bytes32();
    init_idna();
    init_utf8();
    "use strict";
  }
});

// node_modules/@ethersproject/hash/lib.esm/id.js
function id(text) {
  return keccak256(toUtf8Bytes(text));
}
var init_id = __esm({
  "node_modules/@ethersproject/hash/lib.esm/id.js"() {
    init_react();
    init_lib4();
    init_lib11();
  }
});

// node_modules/@ethersproject/hash/lib.esm/_version.js
var version10;
var init_version10 = __esm({
  "node_modules/@ethersproject/hash/lib.esm/_version.js"() {
    init_react();
    version10 = "hash/5.5.0";
  }
});

// node_modules/@ethersproject/hash/lib.esm/namehash.js
function isValidName(name) {
  try {
    const comps = name.split(".");
    for (let i = 0; i < comps.length; i++) {
      if (nameprep(comps[i]).length === 0) {
        throw new Error("empty");
      }
    }
    return true;
  } catch (error) {
  }
  return false;
}
function namehash(name) {
  if (typeof name !== "string") {
    logger10.throwArgumentError("invalid ENS name; not a string", "name", name);
  }
  let current = name;
  let result = Zeros;
  while (current.length) {
    const partition = current.match(Partition);
    if (partition == null || partition[2] === "") {
      logger10.throwArgumentError("invalid ENS address; missing component", "name", name);
    }
    const label = toUtf8Bytes(nameprep(partition[3]));
    result = keccak256(concat([result, keccak256(label)]));
    current = partition[2] || "";
  }
  return hexlify(result);
}
var logger10, Zeros, Partition;
var init_namehash = __esm({
  "node_modules/@ethersproject/hash/lib.esm/namehash.js"() {
    init_react();
    init_lib2();
    init_lib11();
    init_lib4();
    init_lib();
    init_version10();
    logger10 = new Logger(version10);
    Zeros = new Uint8Array(32);
    Zeros.fill(0);
    Partition = new RegExp("^((.*)\\.)?([^.]+)$");
  }
});

// node_modules/@ethersproject/hash/lib.esm/message.js
function hashMessage(message) {
  if (typeof message === "string") {
    message = toUtf8Bytes(message);
  }
  return keccak256(concat([
    toUtf8Bytes(messagePrefix),
    toUtf8Bytes(String(message.length)),
    message
  ]));
}
var messagePrefix;
var init_message = __esm({
  "node_modules/@ethersproject/hash/lib.esm/message.js"() {
    init_react();
    init_lib2();
    init_lib4();
    init_lib11();
    messagePrefix = "Ethereum Signed Message:\n";
  }
});

// node_modules/@ethersproject/hash/lib.esm/typed-data.js
function hexPadRight(value) {
  const bytes = arrayify(value);
  const padOffset = bytes.length % 32;
  if (padOffset) {
    return hexConcat([bytes, padding.slice(padOffset)]);
  }
  return hexlify(bytes);
}
function checkString(key2) {
  return function(value) {
    if (typeof value !== "string") {
      logger11.throwArgumentError(`invalid domain value for ${JSON.stringify(key2)}`, `domain.${key2}`, value);
    }
    return value;
  };
}
function getBaseEncoder(type) {
  {
    const match = type.match(/^(u?)int(\d*)$/);
    if (match) {
      const signed = match[1] === "";
      const width = parseInt(match[2] || "256");
      if (width % 8 !== 0 || width > 256 || match[2] && match[2] !== String(width)) {
        logger11.throwArgumentError("invalid numeric width", "type", type);
      }
      const boundsUpper = MaxUint2562.mask(signed ? width - 1 : width);
      const boundsLower = signed ? boundsUpper.add(One2).mul(NegativeOne3) : Zero3;
      return function(value) {
        const v = BigNumber.from(value);
        if (v.lt(boundsLower) || v.gt(boundsUpper)) {
          logger11.throwArgumentError(`value out-of-bounds for ${type}`, "value", value);
        }
        return hexZeroPad(v.toTwos(256).toHexString(), 32);
      };
    }
  }
  {
    const match = type.match(/^bytes(\d+)$/);
    if (match) {
      const width = parseInt(match[1]);
      if (width === 0 || width > 32 || match[1] !== String(width)) {
        logger11.throwArgumentError("invalid bytes width", "type", type);
      }
      return function(value) {
        const bytes = arrayify(value);
        if (bytes.length !== width) {
          logger11.throwArgumentError(`invalid length for ${type}`, "value", value);
        }
        return hexPadRight(value);
      };
    }
  }
  switch (type) {
    case "address":
      return function(value) {
        return hexZeroPad(getAddress(value), 32);
      };
    case "bool":
      return function(value) {
        return !value ? hexFalse : hexTrue;
      };
    case "bytes":
      return function(value) {
        return keccak256(value);
      };
    case "string":
      return function(value) {
        return id(value);
      };
  }
  return null;
}
function encodeType(name, fields) {
  return `${name}(${fields.map(({ name: name2, type }) => type + " " + name2).join(",")})`;
}
var __awaiter2, logger11, padding, NegativeOne3, Zero3, One2, MaxUint2562, hexTrue, hexFalse, domainFieldTypes, domainFieldNames, domainChecks, TypedDataEncoder;
var init_typed_data = __esm({
  "node_modules/@ethersproject/hash/lib.esm/typed-data.js"() {
    init_react();
    init_lib6();
    init_lib3();
    init_lib2();
    init_lib4();
    init_lib8();
    init_lib();
    init_version10();
    init_id();
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
    logger11 = new Logger(version10);
    padding = new Uint8Array(32);
    padding.fill(0);
    NegativeOne3 = BigNumber.from(-1);
    Zero3 = BigNumber.from(0);
    One2 = BigNumber.from(1);
    MaxUint2562 = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    hexTrue = hexZeroPad(One2.toHexString(), 32);
    hexFalse = hexZeroPad(Zero3.toHexString(), 32);
    domainFieldTypes = {
      name: "string",
      version: "string",
      chainId: "uint256",
      verifyingContract: "address",
      salt: "bytes32"
    };
    domainFieldNames = [
      "name",
      "version",
      "chainId",
      "verifyingContract",
      "salt"
    ];
    domainChecks = {
      name: checkString("name"),
      version: checkString("version"),
      chainId: function(value) {
        try {
          return BigNumber.from(value).toString();
        } catch (error) {
        }
        return logger11.throwArgumentError(`invalid domain value for "chainId"`, "domain.chainId", value);
      },
      verifyingContract: function(value) {
        try {
          return getAddress(value).toLowerCase();
        } catch (error) {
        }
        return logger11.throwArgumentError(`invalid domain value "verifyingContract"`, "domain.verifyingContract", value);
      },
      salt: function(value) {
        try {
          const bytes = arrayify(value);
          if (bytes.length !== 32) {
            throw new Error("bad length");
          }
          return hexlify(bytes);
        } catch (error) {
        }
        return logger11.throwArgumentError(`invalid domain value "salt"`, "domain.salt", value);
      }
    };
    TypedDataEncoder = class {
      constructor(types) {
        defineReadOnly(this, "types", Object.freeze(deepCopy(types)));
        defineReadOnly(this, "_encoderCache", {});
        defineReadOnly(this, "_types", {});
        const links = {};
        const parents = {};
        const subtypes = {};
        Object.keys(types).forEach((type) => {
          links[type] = {};
          parents[type] = [];
          subtypes[type] = {};
        });
        for (const name in types) {
          const uniqueNames = {};
          types[name].forEach((field) => {
            if (uniqueNames[field.name]) {
              logger11.throwArgumentError(`duplicate variable name ${JSON.stringify(field.name)} in ${JSON.stringify(name)}`, "types", types);
            }
            uniqueNames[field.name] = true;
            const baseType = field.type.match(/^([^\x5b]*)(\x5b|$)/)[1];
            if (baseType === name) {
              logger11.throwArgumentError(`circular type reference to ${JSON.stringify(baseType)}`, "types", types);
            }
            const encoder = getBaseEncoder(baseType);
            if (encoder) {
              return;
            }
            if (!parents[baseType]) {
              logger11.throwArgumentError(`unknown type ${JSON.stringify(baseType)}`, "types", types);
            }
            parents[baseType].push(name);
            links[name][baseType] = true;
          });
        }
        const primaryTypes = Object.keys(parents).filter((n) => parents[n].length === 0);
        if (primaryTypes.length === 0) {
          logger11.throwArgumentError("missing primary type", "types", types);
        } else if (primaryTypes.length > 1) {
          logger11.throwArgumentError(`ambiguous primary types or unused types: ${primaryTypes.map((t) => JSON.stringify(t)).join(", ")}`, "types", types);
        }
        defineReadOnly(this, "primaryType", primaryTypes[0]);
        function checkCircular(type, found) {
          if (found[type]) {
            logger11.throwArgumentError(`circular type reference to ${JSON.stringify(type)}`, "types", types);
          }
          found[type] = true;
          Object.keys(links[type]).forEach((child) => {
            if (!parents[child]) {
              return;
            }
            checkCircular(child, found);
            Object.keys(found).forEach((subtype) => {
              subtypes[subtype][child] = true;
            });
          });
          delete found[type];
        }
        checkCircular(this.primaryType, {});
        for (const name in subtypes) {
          const st = Object.keys(subtypes[name]);
          st.sort();
          this._types[name] = encodeType(name, types[name]) + st.map((t) => encodeType(t, types[t])).join("");
        }
      }
      getEncoder(type) {
        let encoder = this._encoderCache[type];
        if (!encoder) {
          encoder = this._encoderCache[type] = this._getEncoder(type);
        }
        return encoder;
      }
      _getEncoder(type) {
        {
          const encoder = getBaseEncoder(type);
          if (encoder) {
            return encoder;
          }
        }
        const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);
        if (match) {
          const subtype = match[1];
          const subEncoder = this.getEncoder(subtype);
          const length = parseInt(match[3]);
          return (value) => {
            if (length >= 0 && value.length !== length) {
              logger11.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
            }
            let result = value.map(subEncoder);
            if (this._types[subtype]) {
              result = result.map(keccak256);
            }
            return keccak256(hexConcat(result));
          };
        }
        const fields = this.types[type];
        if (fields) {
          const encodedType = id(this._types[type]);
          return (value) => {
            const values = fields.map(({ name, type: type2 }) => {
              const result = this.getEncoder(type2)(value[name]);
              if (this._types[type2]) {
                return keccak256(result);
              }
              return result;
            });
            values.unshift(encodedType);
            return hexConcat(values);
          };
        }
        return logger11.throwArgumentError(`unknown type: ${type}`, "type", type);
      }
      encodeType(name) {
        const result = this._types[name];
        if (!result) {
          logger11.throwArgumentError(`unknown type: ${JSON.stringify(name)}`, "name", name);
        }
        return result;
      }
      encodeData(type, value) {
        return this.getEncoder(type)(value);
      }
      hashStruct(name, value) {
        return keccak256(this.encodeData(name, value));
      }
      encode(value) {
        return this.encodeData(this.primaryType, value);
      }
      hash(value) {
        return this.hashStruct(this.primaryType, value);
      }
      _visit(type, value, callback) {
        {
          const encoder = getBaseEncoder(type);
          if (encoder) {
            return callback(type, value);
          }
        }
        const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);
        if (match) {
          const subtype = match[1];
          const length = parseInt(match[3]);
          if (length >= 0 && value.length !== length) {
            logger11.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
          }
          return value.map((v) => this._visit(subtype, v, callback));
        }
        const fields = this.types[type];
        if (fields) {
          return fields.reduce((accum, { name, type: type2 }) => {
            accum[name] = this._visit(type2, value[name], callback);
            return accum;
          }, {});
        }
        return logger11.throwArgumentError(`unknown type: ${type}`, "type", type);
      }
      visit(value, callback) {
        return this._visit(this.primaryType, value, callback);
      }
      static from(types) {
        return new TypedDataEncoder(types);
      }
      static getPrimaryType(types) {
        return TypedDataEncoder.from(types).primaryType;
      }
      static hashStruct(name, types, value) {
        return TypedDataEncoder.from(types).hashStruct(name, value);
      }
      static hashDomain(domain) {
        const domainFields = [];
        for (const name in domain) {
          const type = domainFieldTypes[name];
          if (!type) {
            logger11.throwArgumentError(`invalid typed-data domain key: ${JSON.stringify(name)}`, "domain", domain);
          }
          domainFields.push({ name, type });
        }
        domainFields.sort((a, b) => {
          return domainFieldNames.indexOf(a.name) - domainFieldNames.indexOf(b.name);
        });
        return TypedDataEncoder.hashStruct("EIP712Domain", { EIP712Domain: domainFields }, domain);
      }
      static encode(domain, types, value) {
        return hexConcat([
          "0x1901",
          TypedDataEncoder.hashDomain(domain),
          TypedDataEncoder.from(types).hash(value)
        ]);
      }
      static hash(domain, types, value) {
        return keccak256(TypedDataEncoder.encode(domain, types, value));
      }
      static resolveNames(domain, types, value, resolveName) {
        return __awaiter2(this, void 0, void 0, function* () {
          domain = shallowCopy(domain);
          const ensCache = {};
          if (domain.verifyingContract && !isHexString(domain.verifyingContract, 20)) {
            ensCache[domain.verifyingContract] = "0x";
          }
          const encoder = TypedDataEncoder.from(types);
          encoder.visit(value, (type, value2) => {
            if (type === "address" && !isHexString(value2, 20)) {
              ensCache[value2] = "0x";
            }
            return value2;
          });
          for (const name in ensCache) {
            ensCache[name] = yield resolveName(name);
          }
          if (domain.verifyingContract && ensCache[domain.verifyingContract]) {
            domain.verifyingContract = ensCache[domain.verifyingContract];
          }
          value = encoder.visit(value, (type, value2) => {
            if (type === "address" && ensCache[value2]) {
              return ensCache[value2];
            }
            return value2;
          });
          return { domain, value };
        });
      }
      static getPayload(domain, types, value) {
        TypedDataEncoder.hashDomain(domain);
        const domainValues = {};
        const domainTypes = [];
        domainFieldNames.forEach((name) => {
          const value2 = domain[name];
          if (value2 == null) {
            return;
          }
          domainValues[name] = domainChecks[name](value2);
          domainTypes.push({ name, type: domainFieldTypes[name] });
        });
        const encoder = TypedDataEncoder.from(types);
        const typesWithDomain = shallowCopy(types);
        if (typesWithDomain.EIP712Domain) {
          logger11.throwArgumentError("types must not contain EIP712Domain type", "types.EIP712Domain", types);
        } else {
          typesWithDomain.EIP712Domain = domainTypes;
        }
        encoder.encode(value);
        return {
          types: typesWithDomain,
          domain: domainValues,
          primaryType: encoder.primaryType,
          message: encoder.visit(value, (type, value2) => {
            if (type.match(/^bytes(\d*)/)) {
              return hexlify(arrayify(value2));
            }
            if (type.match(/^u?int/)) {
              return BigNumber.from(value2).toString();
            }
            switch (type) {
              case "address":
                return value2.toLowerCase();
              case "bool":
                return !!value2;
              case "string":
                if (typeof value2 !== "string") {
                  logger11.throwArgumentError(`invalid string`, "value", value2);
                }
                return value2;
            }
            return logger11.throwArgumentError("unsupported type", "type", type);
          })
        };
      }
    };
  }
});

// node_modules/@ethersproject/hash/lib.esm/index.js
var init_lib12 = __esm({
  "node_modules/@ethersproject/hash/lib.esm/index.js"() {
    init_react();
    init_id();
    init_namehash();
    init_message();
    init_typed_data();
    "use strict";
  }
});

export {
  ErrorCode,
  Logger,
  init_lib,
  isBytesLike,
  isBytes,
  arrayify,
  concat,
  stripZeros,
  zeroPad,
  isHexString,
  hexlify,
  hexDataLength,
  hexDataSlice,
  hexConcat,
  hexValue,
  hexStripZeros,
  hexZeroPad,
  splitSignature,
  joinSignature,
  init_lib2,
  BigNumber,
  formatFixed,
  parseFixed,
  FixedNumber,
  init_lib3,
  defineReadOnly,
  getStatic,
  resolveProperties,
  checkProperties,
  shallowCopy,
  deepCopy,
  Description,
  init_lib8 as init_lib4,
  keccak256,
  init_lib4 as init_lib5,
  lib_exports,
  init_lib5 as init_lib6,
  getAddress,
  isAddress,
  getIcapAddress,
  getContractAddress,
  getCreate2Address,
  init_lib6 as init_lib7,
  AddressZero,
  NegativeOne2 as NegativeOne,
  Zero2 as Zero,
  One,
  MaxUint256,
  HashZero,
  lib_exports2,
  init_lib7 as init_lib8,
  UnicodeNormalizationForm,
  Utf8ErrorReason,
  Utf8ErrorFuncs,
  toUtf8Bytes,
  _toEscapedUtf8String,
  toUtf8String,
  toUtf8CodePoints,
  formatBytes32String,
  parseBytes32String,
  nameprep,
  init_lib11 as init_lib9,
  id,
  isValidName,
  namehash,
  hashMessage,
  TypedDataEncoder,
  init_lib12 as init_lib10,
  SigningKey,
  recoverPublicKey,
  computePublicKey,
  init_lib9 as init_lib11,
  TransactionTypes,
  computeAddress,
  recoverAddress,
  accessListify,
  serialize,
  parse,
  lib_exports3,
  init_lib10 as init_lib12
};
//# sourceMappingURL=/build/_shared/chunk-3CB255OT.js.map
