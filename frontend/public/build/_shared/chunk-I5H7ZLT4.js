import {
  require_nacl_fast as require_nacl_fast2
} from "/build/_shared/chunk-F3KE3B5V.js";
import {
  require_regenerator
} from "/build/_shared/chunk-AG2S3DTR.js";
import {
  BaseProvider,
  createFetchMiddleware,
  init_baseControllers_esm,
  init_baseProvider_esm,
  providerFromEngine,
  require_nacl_fast
} from "/build/_shared/chunk-XJO3J6DA.js";
import {
  require_bn,
  require_dist3 as require_dist
} from "/build/_shared/chunk-LIYBAN7D.js";
import {
  esm_browser_exports,
  init_esm_browser
} from "/build/_shared/chunk-5Z4ISHF2.js";
import {
  require_sha3
} from "/build/_shared/chunk-EUMB4PXB.js";
import {
  require_elliptic
} from "/build/_shared/chunk-YM4R26UJ.js";
import {
  Buffer as Buffer2,
  CHAIN_NAMESPACES,
  JRPCEngine,
  WalletInitializationError,
  _defineProperty,
  createAsyncMiddleware,
  init_base_esm,
  init_buffer,
  init_defineProperty,
  init_openloginJrpc_esm,
  isHexStrict,
  mergeMiddleware,
  require_buffer,
  require_safe_buffer
} from "/build/_shared/chunk-INTQZUHU.js";
import {
  __commonJS,
  __esm,
  __toModule,
  init_react
} from "/build/_shared/chunk-ZBXWLNC7.js";

// node_modules/base-x/src/index.js
var require_src = __commonJS({
  "node_modules/base-x/src/index.js"(exports, module) {
    init_react();
    "use strict";
    var _Buffer = require_safe_buffer().Buffer;
    function base(ALPHABET) {
      if (ALPHABET.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255;
      }
      for (var i = 0; i < ALPHABET.length; i++) {
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x + " is ambiguous");
        }
        BASE_MAP[xc] = i;
      }
      var BASE = ALPHABET.length;
      var LEADER = ALPHABET.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode(source) {
        if (Array.isArray(source) || source instanceof Uint8Array) {
          source = _Buffer.from(source);
        }
        if (!_Buffer.isBuffer(source)) {
          throw new TypeError("Expected Buffer");
        }
        if (source.length === 0) {
          return "";
        }
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
          pbegin++;
          zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while (pbegin !== pend) {
          var carry = source[pbegin];
          var i2 = 0;
          for (var it1 = size - 1; (carry !== 0 || i2 < length) && it1 !== -1; it1--, i2++) {
            carry += 256 * b58[it1] >>> 0;
            b58[it1] = carry % BASE >>> 0;
            carry = carry / BASE >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          pbegin++;
        }
        var it2 = size - length;
        while (it2 !== size && b58[it2] === 0) {
          it2++;
        }
        var str = LEADER.repeat(zeroes);
        for (; it2 < size; ++it2) {
          str += ALPHABET.charAt(b58[it2]);
        }
        return str;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return _Buffer.alloc(0);
        }
        var psz = 0;
        var zeroes = 0;
        var length = 0;
        while (source[psz] === LEADER) {
          zeroes++;
          psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while (source[psz]) {
          var carry = BASE_MAP[source.charCodeAt(psz)];
          if (carry === 255) {
            return;
          }
          var i2 = 0;
          for (var it3 = size - 1; (carry !== 0 || i2 < length) && it3 !== -1; it3--, i2++) {
            carry += BASE * b256[it3] >>> 0;
            b256[it3] = carry % 256 >>> 0;
            carry = carry / 256 >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          psz++;
        }
        var it4 = size - length;
        while (it4 !== size && b256[it4] === 0) {
          it4++;
        }
        var vch = _Buffer.allocUnsafe(zeroes + (size - it4));
        vch.fill(0, 0, zeroes);
        var j2 = zeroes;
        while (it4 !== size) {
          vch[j2++] = b256[it4++];
        }
        return vch;
      }
      function decode(string2) {
        var buffer = decodeUnsafe(string2);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode,
        decodeUnsafe,
        decode
      };
    }
    module.exports = base;
  }
});

// node_modules/bs58/index.js
var require_bs58 = __commonJS({
  "node_modules/bs58/index.js"(exports, module) {
    init_react();
    var basex = require_src();
    var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    module.exports = basex(ALPHABET);
  }
});

// node_modules/text-encoding-utf-8/lib/encoding.lib.js
var require_encoding_lib = __commonJS({
  "node_modules/text-encoding-utf-8/lib/encoding.lib.js"(exports) {
    init_react();
    "use strict";
    function inRange(a, min, max) {
      return min <= a && a <= max;
    }
    function ToDictionary(o) {
      if (o === void 0)
        return {};
      if (o === Object(o))
        return o;
      throw TypeError("Could not convert argument to dictionary");
    }
    function stringToCodePoints(string2) {
      var s2 = String(string2);
      var n = s2.length;
      var i = 0;
      var u = [];
      while (i < n) {
        var c = s2.charCodeAt(i);
        if (c < 55296 || c > 57343) {
          u.push(c);
        } else if (56320 <= c && c <= 57343) {
          u.push(65533);
        } else if (55296 <= c && c <= 56319) {
          if (i === n - 1) {
            u.push(65533);
          } else {
            var d = string2.charCodeAt(i + 1);
            if (56320 <= d && d <= 57343) {
              var a = c & 1023;
              var b = d & 1023;
              u.push(65536 + (a << 10) + b);
              i += 1;
            } else {
              u.push(65533);
            }
          }
        }
        i += 1;
      }
      return u;
    }
    function codePointsToString(code_points) {
      var s2 = "";
      for (var i = 0; i < code_points.length; ++i) {
        var cp = code_points[i];
        if (cp <= 65535) {
          s2 += String.fromCharCode(cp);
        } else {
          cp -= 65536;
          s2 += String.fromCharCode((cp >> 10) + 55296, (cp & 1023) + 56320);
        }
      }
      return s2;
    }
    var end_of_stream = -1;
    function Stream(tokens) {
      this.tokens = [].slice.call(tokens);
    }
    Stream.prototype = {
      endOfStream: function() {
        return !this.tokens.length;
      },
      read: function() {
        if (!this.tokens.length)
          return end_of_stream;
        return this.tokens.shift();
      },
      prepend: function(token) {
        if (Array.isArray(token)) {
          var tokens = token;
          while (tokens.length)
            this.tokens.unshift(tokens.pop());
        } else {
          this.tokens.unshift(token);
        }
      },
      push: function(token) {
        if (Array.isArray(token)) {
          var tokens = token;
          while (tokens.length)
            this.tokens.push(tokens.shift());
        } else {
          this.tokens.push(token);
        }
      }
    };
    var finished = -1;
    function decoderError(fatal, opt_code_point) {
      if (fatal)
        throw TypeError("Decoder error");
      return opt_code_point || 65533;
    }
    var DEFAULT_ENCODING = "utf-8";
    function TextDecoder(encoding, options) {
      if (!(this instanceof TextDecoder)) {
        return new TextDecoder(encoding, options);
      }
      encoding = encoding !== void 0 ? String(encoding).toLowerCase() : DEFAULT_ENCODING;
      if (encoding !== DEFAULT_ENCODING) {
        throw new Error("Encoding not supported. Only utf-8 is supported");
      }
      options = ToDictionary(options);
      this._streaming = false;
      this._BOMseen = false;
      this._decoder = null;
      this._fatal = Boolean(options["fatal"]);
      this._ignoreBOM = Boolean(options["ignoreBOM"]);
      Object.defineProperty(this, "encoding", { value: "utf-8" });
      Object.defineProperty(this, "fatal", { value: this._fatal });
      Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
    }
    TextDecoder.prototype = {
      decode: function decode(input, options) {
        var bytes;
        if (typeof input === "object" && input instanceof ArrayBuffer) {
          bytes = new Uint8Array(input);
        } else if (typeof input === "object" && "buffer" in input && input.buffer instanceof ArrayBuffer) {
          bytes = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
        } else {
          bytes = new Uint8Array(0);
        }
        options = ToDictionary(options);
        if (!this._streaming) {
          this._decoder = new UTF8Decoder({ fatal: this._fatal });
          this._BOMseen = false;
        }
        this._streaming = Boolean(options["stream"]);
        var input_stream = new Stream(bytes);
        var code_points = [];
        var result;
        while (!input_stream.endOfStream()) {
          result = this._decoder.handler(input_stream, input_stream.read());
          if (result === finished)
            break;
          if (result === null)
            continue;
          if (Array.isArray(result))
            code_points.push.apply(code_points, result);
          else
            code_points.push(result);
        }
        if (!this._streaming) {
          do {
            result = this._decoder.handler(input_stream, input_stream.read());
            if (result === finished)
              break;
            if (result === null)
              continue;
            if (Array.isArray(result))
              code_points.push.apply(code_points, result);
            else
              code_points.push(result);
          } while (!input_stream.endOfStream());
          this._decoder = null;
        }
        if (code_points.length) {
          if (["utf-8"].indexOf(this.encoding) !== -1 && !this._ignoreBOM && !this._BOMseen) {
            if (code_points[0] === 65279) {
              this._BOMseen = true;
              code_points.shift();
            } else {
              this._BOMseen = true;
            }
          }
        }
        return codePointsToString(code_points);
      }
    };
    function TextEncoder2(encoding, options) {
      if (!(this instanceof TextEncoder2))
        return new TextEncoder2(encoding, options);
      encoding = encoding !== void 0 ? String(encoding).toLowerCase() : DEFAULT_ENCODING;
      if (encoding !== DEFAULT_ENCODING) {
        throw new Error("Encoding not supported. Only utf-8 is supported");
      }
      options = ToDictionary(options);
      this._streaming = false;
      this._encoder = null;
      this._options = { fatal: Boolean(options["fatal"]) };
      Object.defineProperty(this, "encoding", { value: "utf-8" });
    }
    TextEncoder2.prototype = {
      encode: function encode(opt_string, options) {
        opt_string = opt_string ? String(opt_string) : "";
        options = ToDictionary(options);
        if (!this._streaming)
          this._encoder = new UTF8Encoder(this._options);
        this._streaming = Boolean(options["stream"]);
        var bytes = [];
        var input_stream = new Stream(stringToCodePoints(opt_string));
        var result;
        while (!input_stream.endOfStream()) {
          result = this._encoder.handler(input_stream, input_stream.read());
          if (result === finished)
            break;
          if (Array.isArray(result))
            bytes.push.apply(bytes, result);
          else
            bytes.push(result);
        }
        if (!this._streaming) {
          while (true) {
            result = this._encoder.handler(input_stream, input_stream.read());
            if (result === finished)
              break;
            if (Array.isArray(result))
              bytes.push.apply(bytes, result);
            else
              bytes.push(result);
          }
          this._encoder = null;
        }
        return new Uint8Array(bytes);
      }
    };
    function UTF8Decoder(options) {
      var fatal = options.fatal;
      var utf8_code_point = 0, utf8_bytes_seen = 0, utf8_bytes_needed = 0, utf8_lower_boundary = 128, utf8_upper_boundary = 191;
      this.handler = function(stream, bite) {
        if (bite === end_of_stream && utf8_bytes_needed !== 0) {
          utf8_bytes_needed = 0;
          return decoderError(fatal);
        }
        if (bite === end_of_stream)
          return finished;
        if (utf8_bytes_needed === 0) {
          if (inRange(bite, 0, 127)) {
            return bite;
          }
          if (inRange(bite, 194, 223)) {
            utf8_bytes_needed = 1;
            utf8_code_point = bite - 192;
          } else if (inRange(bite, 224, 239)) {
            if (bite === 224)
              utf8_lower_boundary = 160;
            if (bite === 237)
              utf8_upper_boundary = 159;
            utf8_bytes_needed = 2;
            utf8_code_point = bite - 224;
          } else if (inRange(bite, 240, 244)) {
            if (bite === 240)
              utf8_lower_boundary = 144;
            if (bite === 244)
              utf8_upper_boundary = 143;
            utf8_bytes_needed = 3;
            utf8_code_point = bite - 240;
          } else {
            return decoderError(fatal);
          }
          utf8_code_point = utf8_code_point << 6 * utf8_bytes_needed;
          return null;
        }
        if (!inRange(bite, utf8_lower_boundary, utf8_upper_boundary)) {
          utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
          utf8_lower_boundary = 128;
          utf8_upper_boundary = 191;
          stream.prepend(bite);
          return decoderError(fatal);
        }
        utf8_lower_boundary = 128;
        utf8_upper_boundary = 191;
        utf8_bytes_seen += 1;
        utf8_code_point += bite - 128 << 6 * (utf8_bytes_needed - utf8_bytes_seen);
        if (utf8_bytes_seen !== utf8_bytes_needed)
          return null;
        var code_point = utf8_code_point;
        utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
        return code_point;
      };
    }
    function UTF8Encoder(options) {
      var fatal = options.fatal;
      this.handler = function(stream, code_point) {
        if (code_point === end_of_stream)
          return finished;
        if (inRange(code_point, 0, 127))
          return code_point;
        var count, offset2;
        if (inRange(code_point, 128, 2047)) {
          count = 1;
          offset2 = 192;
        } else if (inRange(code_point, 2048, 65535)) {
          count = 2;
          offset2 = 224;
        } else if (inRange(code_point, 65536, 1114111)) {
          count = 3;
          offset2 = 240;
        }
        var bytes = [(code_point >> 6 * count) + offset2];
        while (count > 0) {
          var temp = code_point >> 6 * (count - 1);
          bytes.push(128 | temp & 63);
          count -= 1;
        }
        return bytes;
      };
    }
    exports.TextEncoder = TextEncoder2;
    exports.TextDecoder = TextDecoder;
  }
});

// node_modules/borsh/lib/index.js
var require_lib = __commonJS({
  "node_modules/borsh/lib/index.js"(exports) {
    init_react();
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r2 = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
      return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
    };
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deserializeUnchecked = exports.deserialize = exports.serialize = exports.BinaryReader = exports.BinaryWriter = exports.BorshError = exports.baseDecode = exports.baseEncode = void 0;
    var bn_js_1 = __importDefault(require_bn());
    var bs58_1 = __importDefault(require_bs58());
    var encoding = __importStar(require_encoding_lib());
    var TextDecoder = typeof globalThis.TextDecoder !== "function" ? encoding.TextDecoder : globalThis.TextDecoder;
    var textDecoder = new TextDecoder("utf-8", { fatal: true });
    function baseEncode(value) {
      if (typeof value === "string") {
        value = Buffer.from(value, "utf8");
      }
      return bs58_1.default.encode(Buffer.from(value));
    }
    exports.baseEncode = baseEncode;
    function baseDecode(value) {
      return Buffer.from(bs58_1.default.decode(value));
    }
    exports.baseDecode = baseDecode;
    var INITIAL_LENGTH = 1024;
    var BorshError = class extends Error {
      constructor(message) {
        super(message);
        this.fieldPath = [];
        this.originalMessage = message;
      }
      addToFieldPath(fieldName) {
        this.fieldPath.splice(0, 0, fieldName);
        this.message = this.originalMessage + ": " + this.fieldPath.join(".");
      }
    };
    exports.BorshError = BorshError;
    var BinaryWriter = class {
      constructor() {
        this.buf = Buffer.alloc(INITIAL_LENGTH);
        this.length = 0;
      }
      maybeResize() {
        if (this.buf.length < 16 + this.length) {
          this.buf = Buffer.concat([this.buf, Buffer.alloc(INITIAL_LENGTH)]);
        }
      }
      writeU8(value) {
        this.maybeResize();
        this.buf.writeUInt8(value, this.length);
        this.length += 1;
      }
      writeU16(value) {
        this.maybeResize();
        this.buf.writeUInt16LE(value, this.length);
        this.length += 2;
      }
      writeU32(value) {
        this.maybeResize();
        this.buf.writeUInt32LE(value, this.length);
        this.length += 4;
      }
      writeU64(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 8)));
      }
      writeU128(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 16)));
      }
      writeU256(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 32)));
      }
      writeU512(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 64)));
      }
      writeBuffer(buffer) {
        this.buf = Buffer.concat([Buffer.from(this.buf.subarray(0, this.length)), buffer, Buffer.alloc(INITIAL_LENGTH)]);
        this.length += buffer.length;
      }
      writeString(str) {
        this.maybeResize();
        const b = Buffer.from(str, "utf8");
        this.writeU32(b.length);
        this.writeBuffer(b);
      }
      writeFixedArray(array2) {
        this.writeBuffer(Buffer.from(array2));
      }
      writeArray(array2, fn) {
        this.maybeResize();
        this.writeU32(array2.length);
        for (const elem of array2) {
          this.maybeResize();
          fn(elem);
        }
      }
      toArray() {
        return this.buf.subarray(0, this.length);
      }
    };
    exports.BinaryWriter = BinaryWriter;
    function handlingRangeError(target, propertyKey, propertyDescriptor) {
      const originalMethod = propertyDescriptor.value;
      propertyDescriptor.value = function(...args) {
        try {
          return originalMethod.apply(this, args);
        } catch (e) {
          if (e instanceof RangeError) {
            const code = e.code;
            if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(code) >= 0) {
              throw new BorshError("Reached the end of buffer when deserializing");
            }
          }
          throw e;
        }
      };
    }
    var BinaryReader = class {
      constructor(buf) {
        this.buf = buf;
        this.offset = 0;
      }
      readU8() {
        const value = this.buf.readUInt8(this.offset);
        this.offset += 1;
        return value;
      }
      readU16() {
        const value = this.buf.readUInt16LE(this.offset);
        this.offset += 2;
        return value;
      }
      readU32() {
        const value = this.buf.readUInt32LE(this.offset);
        this.offset += 4;
        return value;
      }
      readU64() {
        const buf = this.readBuffer(8);
        return new bn_js_1.default(buf, "le");
      }
      readU128() {
        const buf = this.readBuffer(16);
        return new bn_js_1.default(buf, "le");
      }
      readU256() {
        const buf = this.readBuffer(32);
        return new bn_js_1.default(buf, "le");
      }
      readU512() {
        const buf = this.readBuffer(64);
        return new bn_js_1.default(buf, "le");
      }
      readBuffer(len) {
        if (this.offset + len > this.buf.length) {
          throw new BorshError(`Expected buffer length ${len} isn't within bounds`);
        }
        const result = this.buf.slice(this.offset, this.offset + len);
        this.offset += len;
        return result;
      }
      readString() {
        const len = this.readU32();
        const buf = this.readBuffer(len);
        try {
          return textDecoder.decode(buf);
        } catch (e) {
          throw new BorshError(`Error decoding UTF-8 string: ${e}`);
        }
      }
      readFixedArray(len) {
        return new Uint8Array(this.readBuffer(len));
      }
      readArray(fn) {
        const len = this.readU32();
        const result = Array();
        for (let i = 0; i < len; ++i) {
          result.push(fn());
        }
        return result;
      }
    };
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU8", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU16", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU32", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU64", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU128", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU256", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU512", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readString", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readFixedArray", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readArray", null);
    exports.BinaryReader = BinaryReader;
    function capitalizeFirstLetter(string2) {
      return string2.charAt(0).toUpperCase() + string2.slice(1);
    }
    function serializeField(schema, fieldName, value, fieldType, writer) {
      try {
        if (typeof fieldType === "string") {
          writer[`write${capitalizeFirstLetter(fieldType)}`](value);
        } else if (fieldType instanceof Array) {
          if (typeof fieldType[0] === "number") {
            if (value.length !== fieldType[0]) {
              throw new BorshError(`Expecting byte array of length ${fieldType[0]}, but got ${value.length} bytes`);
            }
            writer.writeFixedArray(value);
          } else {
            writer.writeArray(value, (item) => {
              serializeField(schema, fieldName, item, fieldType[0], writer);
            });
          }
        } else if (fieldType.kind !== void 0) {
          switch (fieldType.kind) {
            case "option": {
              if (value === null || value === void 0) {
                writer.writeU8(0);
              } else {
                writer.writeU8(1);
                serializeField(schema, fieldName, value, fieldType.type, writer);
              }
              break;
            }
            default:
              throw new BorshError(`FieldType ${fieldType} unrecognized`);
          }
        } else {
          serializeStruct(schema, value, writer);
        }
      } catch (error) {
        if (error instanceof BorshError) {
          error.addToFieldPath(fieldName);
        }
        throw error;
      }
    }
    function serializeStruct(schema, obj, writer) {
      const structSchema = schema.get(obj.constructor);
      if (!structSchema) {
        throw new BorshError(`Class ${obj.constructor.name} is missing in schema`);
      }
      if (structSchema.kind === "struct") {
        structSchema.fields.map(([fieldName, fieldType]) => {
          serializeField(schema, fieldName, obj[fieldName], fieldType, writer);
        });
      } else if (structSchema.kind === "enum") {
        const name = obj[structSchema.field];
        for (let idx = 0; idx < structSchema.values.length; ++idx) {
          const [fieldName, fieldType] = structSchema.values[idx];
          if (fieldName === name) {
            writer.writeU8(idx);
            serializeField(schema, fieldName, obj[fieldName], fieldType, writer);
            break;
          }
        }
      } else {
        throw new BorshError(`Unexpected schema kind: ${structSchema.kind} for ${obj.constructor.name}`);
      }
    }
    function serialize2(schema, obj) {
      const writer = new BinaryWriter();
      serializeStruct(schema, obj, writer);
      return writer.toArray();
    }
    exports.serialize = serialize2;
    function deserializeField(schema, fieldName, fieldType, reader) {
      try {
        if (typeof fieldType === "string") {
          return reader[`read${capitalizeFirstLetter(fieldType)}`]();
        }
        if (fieldType instanceof Array) {
          if (typeof fieldType[0] === "number") {
            return reader.readFixedArray(fieldType[0]);
          }
          return reader.readArray(() => deserializeField(schema, fieldName, fieldType[0], reader));
        }
        if (fieldType.kind === "option") {
          const option = reader.readU8();
          if (option) {
            return deserializeField(schema, fieldName, fieldType.type, reader);
          }
          return void 0;
        }
        return deserializeStruct(schema, fieldType, reader);
      } catch (error) {
        if (error instanceof BorshError) {
          error.addToFieldPath(fieldName);
        }
        throw error;
      }
    }
    function deserializeStruct(schema, classType, reader) {
      const structSchema = schema.get(classType);
      if (!structSchema) {
        throw new BorshError(`Class ${classType.name} is missing in schema`);
      }
      if (structSchema.kind === "struct") {
        const result = {};
        for (const [fieldName, fieldType] of schema.get(classType).fields) {
          result[fieldName] = deserializeField(schema, fieldName, fieldType, reader);
        }
        return new classType(result);
      }
      if (structSchema.kind === "enum") {
        const idx = reader.readU8();
        if (idx >= structSchema.values.length) {
          throw new BorshError(`Enum index: ${idx} is out of range`);
        }
        const [fieldName, fieldType] = structSchema.values[idx];
        const fieldValue = deserializeField(schema, fieldName, fieldType, reader);
        return new classType({ [fieldName]: fieldValue });
      }
      throw new BorshError(`Unexpected schema kind: ${structSchema.kind} for ${classType.constructor.name}`);
    }
    function deserialize2(schema, classType, buffer) {
      const reader = new BinaryReader(buffer);
      const result = deserializeStruct(schema, classType, reader);
      if (reader.offset < buffer.length) {
        throw new BorshError(`Unexpected ${buffer.length - reader.offset} bytes after deserialized data`);
      }
      return result;
    }
    exports.deserialize = deserialize2;
    function deserializeUnchecked2(schema, classType, buffer) {
      const reader = new BinaryReader(buffer);
      return deserializeStruct(schema, classType, reader);
    }
    exports.deserializeUnchecked = deserializeUnchecked2;
  }
});

// node_modules/@solana/buffer-layout/lib/Layout.js
var require_Layout = __commonJS({
  "node_modules/@solana/buffer-layout/lib/Layout.js"(exports) {
    init_react();
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    exports.__esModule = true;
    exports.s16 = exports.s8 = exports.nu64be = exports.u48be = exports.u40be = exports.u32be = exports.u24be = exports.u16be = exports.nu64 = exports.u48 = exports.u40 = exports.u32 = exports.u24 = exports.u16 = exports.u8 = exports.offset = exports.greedy = exports.Constant = exports.UTF8 = exports.CString = exports.Blob = exports.Boolean = exports.BitField = exports.BitStructure = exports.VariantLayout = exports.Union = exports.UnionLayoutDiscriminator = exports.UnionDiscriminator = exports.Structure = exports.Sequence = exports.DoubleBE = exports.Double = exports.FloatBE = exports.Float = exports.NearInt64BE = exports.NearInt64 = exports.NearUInt64BE = exports.NearUInt64 = exports.IntBE = exports.Int = exports.UIntBE = exports.UInt = exports.OffsetLayout = exports.GreedyCount = exports.ExternalLayout = exports.bindConstructorLayout = exports.nameWithProperty = exports.Layout = exports.uint8ArrayToBuffer = exports.checkUint8Array = void 0;
    exports.constant = exports.utf8 = exports.cstr = exports.blob = exports.unionLayoutDiscriminator = exports.union = exports.seq = exports.bits = exports.struct = exports.f64be = exports.f64 = exports.f32be = exports.f32 = exports.ns64be = exports.s48be = exports.s40be = exports.s32be = exports.s24be = exports.s16be = exports.ns64 = exports.s48 = exports.s40 = exports.s32 = exports.s24 = void 0;
    var buffer_1 = require_buffer();
    function checkUint8Array(b) {
      if (!(b instanceof Uint8Array)) {
        throw new TypeError("b must be a Uint8Array");
      }
    }
    exports.checkUint8Array = checkUint8Array;
    function uint8ArrayToBuffer(b) {
      checkUint8Array(b);
      return buffer_1.Buffer.from(b.buffer, b.byteOffset, b.length);
    }
    exports.uint8ArrayToBuffer = uint8ArrayToBuffer;
    var Layout = function() {
      function Layout2(span, property) {
        if (!Number.isInteger(span)) {
          throw new TypeError("span must be an integer");
        }
        this.span = span;
        this.property = property;
      }
      Layout2.prototype.makeDestinationObject = function() {
        return {};
      };
      Layout2.prototype.decode = function(b, offset2) {
        throw new Error("Layout is abstract");
      };
      Layout2.prototype.encode = function(src, b, offset2) {
        throw new Error("Layout is abstract");
      };
      Layout2.prototype.getSpan = function(b, offset2) {
        if (0 > this.span) {
          throw new RangeError("indeterminate span");
        }
        return this.span;
      };
      Layout2.prototype.replicate = function(property) {
        var rv = Object.create(this.constructor.prototype);
        Object.assign(rv, this);
        rv.property = property;
        return rv;
      };
      Layout2.prototype.fromArray = function(values) {
        return void 0;
      };
      return Layout2;
    }();
    exports.Layout = Layout;
    function nameWithProperty(name, lo) {
      if (lo.property) {
        return name + "[" + lo.property + "]";
      }
      return name;
    }
    exports.nameWithProperty = nameWithProperty;
    function bindConstructorLayout(Class, layout) {
      if (typeof Class !== "function") {
        throw new TypeError("Class must be constructor");
      }
      if (Object.prototype.hasOwnProperty.call(Class, "layout_")) {
        throw new Error("Class is already bound to a layout");
      }
      if (!(layout && layout instanceof Layout)) {
        throw new TypeError("layout must be a Layout");
      }
      if (Object.prototype.hasOwnProperty.call(layout, "boundConstructor_")) {
        throw new Error("layout is already bound to a constructor");
      }
      Class.layout_ = layout;
      layout.boundConstructor_ = Class;
      layout.makeDestinationObject = function() {
        return new Class();
      };
      Object.defineProperty(Class.prototype, "encode", {
        value: function(b, offset2) {
          return layout.encode(this, b, offset2);
        },
        writable: true
      });
      Object.defineProperty(Class, "decode", {
        value: function(b, offset2) {
          return layout.decode(b, offset2);
        },
        writable: true
      });
    }
    exports.bindConstructorLayout = bindConstructorLayout;
    var ExternalLayout = function(_super) {
      __extends(ExternalLayout2, _super);
      function ExternalLayout2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      ExternalLayout2.prototype.isCount = function() {
        throw new Error("ExternalLayout is abstract");
      };
      return ExternalLayout2;
    }(Layout);
    exports.ExternalLayout = ExternalLayout;
    var GreedyCount = function(_super) {
      __extends(GreedyCount2, _super);
      function GreedyCount2(elementSpan, property) {
        var _this = this;
        if (elementSpan === void 0) {
          elementSpan = 1;
        }
        if (!Number.isInteger(elementSpan) || 0 >= elementSpan) {
          throw new TypeError("elementSpan must be a (positive) integer");
        }
        _this = _super.call(this, -1, property) || this;
        _this.elementSpan = elementSpan;
        return _this;
      }
      GreedyCount2.prototype.isCount = function() {
        return true;
      };
      GreedyCount2.prototype.decode = function(b, offset2) {
        checkUint8Array(b);
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var rem = b.length - offset2;
        return Math.floor(rem / this.elementSpan);
      };
      GreedyCount2.prototype.encode = function(src, b, offset2) {
        return 0;
      };
      return GreedyCount2;
    }(ExternalLayout);
    exports.GreedyCount = GreedyCount;
    var OffsetLayout = function(_super) {
      __extends(OffsetLayout2, _super);
      function OffsetLayout2(layout, offset2, property) {
        var _this = this;
        if (!(layout instanceof Layout)) {
          throw new TypeError("layout must be a Layout");
        }
        if (offset2 === void 0) {
          offset2 = 0;
        } else if (!Number.isInteger(offset2)) {
          throw new TypeError("offset must be integer or undefined");
        }
        _this = _super.call(this, layout.span, property || layout.property) || this;
        _this.layout = layout;
        _this.offset = offset2;
        return _this;
      }
      OffsetLayout2.prototype.isCount = function() {
        return this.layout instanceof UInt || this.layout instanceof UIntBE;
      };
      OffsetLayout2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        return this.layout.decode(b, offset2 + this.offset);
      };
      OffsetLayout2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        return this.layout.encode(src, b, offset2 + this.offset);
      };
      return OffsetLayout2;
    }(ExternalLayout);
    exports.OffsetLayout = OffsetLayout;
    var UInt = function(_super) {
      __extends(UInt2, _super);
      function UInt2(span, property) {
        var _this = _super.call(this, span, property) || this;
        if (6 < _this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
        return _this;
      }
      UInt2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        return uint8ArrayToBuffer(b).readUIntLE(offset2, this.span);
      };
      UInt2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        uint8ArrayToBuffer(b).writeUIntLE(src, offset2, this.span);
        return this.span;
      };
      return UInt2;
    }(Layout);
    exports.UInt = UInt;
    var UIntBE = function(_super) {
      __extends(UIntBE2, _super);
      function UIntBE2(span, property) {
        var _this = _super.call(this, span, property) || this;
        if (6 < _this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
        return _this;
      }
      UIntBE2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        return uint8ArrayToBuffer(b).readUIntBE(offset2, this.span);
      };
      UIntBE2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        uint8ArrayToBuffer(b).writeUIntBE(src, offset2, this.span);
        return this.span;
      };
      return UIntBE2;
    }(Layout);
    exports.UIntBE = UIntBE;
    var Int = function(_super) {
      __extends(Int2, _super);
      function Int2(span, property) {
        var _this = _super.call(this, span, property) || this;
        if (6 < _this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
        return _this;
      }
      Int2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        return uint8ArrayToBuffer(b).readIntLE(offset2, this.span);
      };
      Int2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        uint8ArrayToBuffer(b).writeIntLE(src, offset2, this.span);
        return this.span;
      };
      return Int2;
    }(Layout);
    exports.Int = Int;
    var IntBE = function(_super) {
      __extends(IntBE2, _super);
      function IntBE2(span, property) {
        var _this = _super.call(this, span, property) || this;
        if (6 < _this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
        return _this;
      }
      IntBE2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        return uint8ArrayToBuffer(b).readIntBE(offset2, this.span);
      };
      IntBE2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        uint8ArrayToBuffer(b).writeIntBE(src, offset2, this.span);
        return this.span;
      };
      return IntBE2;
    }(Layout);
    exports.IntBE = IntBE;
    var V2E32 = Math.pow(2, 32);
    function divmodInt64(src) {
      var hi32 = Math.floor(src / V2E32);
      var lo32 = src - hi32 * V2E32;
      return { hi32, lo32 };
    }
    function roundedInt64(hi32, lo32) {
      return hi32 * V2E32 + lo32;
    }
    var NearUInt64 = function(_super) {
      __extends(NearUInt642, _super);
      function NearUInt642(property) {
        return _super.call(this, 8, property) || this;
      }
      NearUInt642.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var buffer = uint8ArrayToBuffer(b);
        var lo32 = buffer.readUInt32LE(offset2);
        var hi32 = buffer.readUInt32LE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      };
      NearUInt642.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var split = divmodInt64(src);
        var buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32LE(split.lo32, offset2);
        buffer.writeUInt32LE(split.hi32, offset2 + 4);
        return 8;
      };
      return NearUInt642;
    }(Layout);
    exports.NearUInt64 = NearUInt64;
    var NearUInt64BE = function(_super) {
      __extends(NearUInt64BE2, _super);
      function NearUInt64BE2(property) {
        return _super.call(this, 8, property) || this;
      }
      NearUInt64BE2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var buffer = uint8ArrayToBuffer(b);
        var hi32 = buffer.readUInt32BE(offset2);
        var lo32 = buffer.readUInt32BE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      };
      NearUInt64BE2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var split = divmodInt64(src);
        var buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32BE(split.hi32, offset2);
        buffer.writeUInt32BE(split.lo32, offset2 + 4);
        return 8;
      };
      return NearUInt64BE2;
    }(Layout);
    exports.NearUInt64BE = NearUInt64BE;
    var NearInt64 = function(_super) {
      __extends(NearInt642, _super);
      function NearInt642(property) {
        return _super.call(this, 8, property) || this;
      }
      NearInt642.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var buffer = uint8ArrayToBuffer(b);
        var lo32 = buffer.readUInt32LE(offset2);
        var hi32 = buffer.readInt32LE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      };
      NearInt642.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var split = divmodInt64(src);
        var buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32LE(split.lo32, offset2);
        buffer.writeInt32LE(split.hi32, offset2 + 4);
        return 8;
      };
      return NearInt642;
    }(Layout);
    exports.NearInt64 = NearInt64;
    var NearInt64BE = function(_super) {
      __extends(NearInt64BE2, _super);
      function NearInt64BE2(property) {
        return _super.call(this, 8, property) || this;
      }
      NearInt64BE2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var buffer = uint8ArrayToBuffer(b);
        var hi32 = buffer.readInt32BE(offset2);
        var lo32 = buffer.readUInt32BE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      };
      NearInt64BE2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var split = divmodInt64(src);
        var buffer = uint8ArrayToBuffer(b);
        buffer.writeInt32BE(split.hi32, offset2);
        buffer.writeUInt32BE(split.lo32, offset2 + 4);
        return 8;
      };
      return NearInt64BE2;
    }(Layout);
    exports.NearInt64BE = NearInt64BE;
    var Float = function(_super) {
      __extends(Float2, _super);
      function Float2(property) {
        return _super.call(this, 4, property) || this;
      }
      Float2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        return uint8ArrayToBuffer(b).readFloatLE(offset2);
      };
      Float2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        uint8ArrayToBuffer(b).writeFloatLE(src, offset2);
        return 4;
      };
      return Float2;
    }(Layout);
    exports.Float = Float;
    var FloatBE = function(_super) {
      __extends(FloatBE2, _super);
      function FloatBE2(property) {
        return _super.call(this, 4, property) || this;
      }
      FloatBE2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        return uint8ArrayToBuffer(b).readFloatBE(offset2);
      };
      FloatBE2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        uint8ArrayToBuffer(b).writeFloatBE(src, offset2);
        return 4;
      };
      return FloatBE2;
    }(Layout);
    exports.FloatBE = FloatBE;
    var Double = function(_super) {
      __extends(Double2, _super);
      function Double2(property) {
        return _super.call(this, 8, property) || this;
      }
      Double2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        return uint8ArrayToBuffer(b).readDoubleLE(offset2);
      };
      Double2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        uint8ArrayToBuffer(b).writeDoubleLE(src, offset2);
        return 8;
      };
      return Double2;
    }(Layout);
    exports.Double = Double;
    var DoubleBE = function(_super) {
      __extends(DoubleBE2, _super);
      function DoubleBE2(property) {
        return _super.call(this, 8, property) || this;
      }
      DoubleBE2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        return uint8ArrayToBuffer(b).readDoubleBE(offset2);
      };
      DoubleBE2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        uint8ArrayToBuffer(b).writeDoubleBE(src, offset2);
        return 8;
      };
      return DoubleBE2;
    }(Layout);
    exports.DoubleBE = DoubleBE;
    var Sequence = function(_super) {
      __extends(Sequence2, _super);
      function Sequence2(elementLayout, count, property) {
        var _this = this;
        if (!(elementLayout instanceof Layout)) {
          throw new TypeError("elementLayout must be a Layout");
        }
        if (!(count instanceof ExternalLayout && count.isCount() || Number.isInteger(count) && 0 <= count)) {
          throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
        }
        var span = -1;
        if (!(count instanceof ExternalLayout) && 0 < elementLayout.span) {
          span = count * elementLayout.span;
        }
        _this = _super.call(this, span, property) || this;
        _this.elementLayout = elementLayout;
        _this.count = count;
        return _this;
      }
      Sequence2.prototype.getSpan = function(b, offset2) {
        if (0 <= this.span) {
          return this.span;
        }
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var span = 0;
        var count = this.count;
        if (count instanceof ExternalLayout) {
          count = count.decode(b, offset2);
        }
        if (0 < this.elementLayout.span) {
          span = count * this.elementLayout.span;
        } else {
          var idx = 0;
          while (idx < count) {
            span += this.elementLayout.getSpan(b, offset2 + span);
            ++idx;
          }
        }
        return span;
      };
      Sequence2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var rv = [];
        var i = 0;
        var count = this.count;
        if (count instanceof ExternalLayout) {
          count = count.decode(b, offset2);
        }
        while (i < count) {
          rv.push(this.elementLayout.decode(b, offset2));
          offset2 += this.elementLayout.getSpan(b, offset2);
          i += 1;
        }
        return rv;
      };
      Sequence2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var elo = this.elementLayout;
        var span = src.reduce(function(span2, v) {
          return span2 + elo.encode(v, b, offset2 + span2);
        }, 0);
        if (this.count instanceof ExternalLayout) {
          this.count.encode(src.length, b, offset2);
        }
        return span;
      };
      return Sequence2;
    }(Layout);
    exports.Sequence = Sequence;
    var Structure = function(_super) {
      __extends(Structure2, _super);
      function Structure2(fields, property, decodePrefixes) {
        var _this = this;
        if (!(Array.isArray(fields) && fields.reduce(function(acc, v) {
          return acc && v instanceof Layout;
        }, true))) {
          throw new TypeError("fields must be array of Layout instances");
        }
        if (typeof property === "boolean" && decodePrefixes === void 0) {
          decodePrefixes = property;
          property = void 0;
        }
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
          var fd = fields_1[_i];
          if (0 > fd.span && fd.property === void 0) {
            throw new Error("fields cannot contain unnamed variable-length layout");
          }
        }
        var span = -1;
        try {
          span = fields.reduce(function(span2, fd2) {
            return span2 + fd2.getSpan();
          }, 0);
        } catch (e) {
        }
        _this = _super.call(this, span, property) || this;
        _this.fields = fields;
        _this.decodePrefixes = !!decodePrefixes;
        return _this;
      }
      Structure2.prototype.getSpan = function(b, offset2) {
        if (0 <= this.span) {
          return this.span;
        }
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var span = 0;
        try {
          span = this.fields.reduce(function(span2, fd) {
            var fsp = fd.getSpan(b, offset2);
            offset2 += fsp;
            return span2 + fsp;
          }, 0);
        } catch (e) {
          throw new RangeError("indeterminate span");
        }
        return span;
      };
      Structure2.prototype.decode = function(b, offset2) {
        checkUint8Array(b);
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var dest = this.makeDestinationObject();
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
          var fd = _a[_i];
          if (fd.property !== void 0) {
            dest[fd.property] = fd.decode(b, offset2);
          }
          offset2 += fd.getSpan(b, offset2);
          if (this.decodePrefixes && b.length === offset2) {
            break;
          }
        }
        return dest;
      };
      Structure2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var firstOffset = offset2;
        var lastOffset = 0;
        var lastWrote = 0;
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
          var fd = _a[_i];
          var span = fd.span;
          lastWrote = 0 < span ? span : 0;
          if (fd.property !== void 0) {
            var fv = src[fd.property];
            if (fv !== void 0) {
              lastWrote = fd.encode(fv, b, offset2);
              if (0 > span) {
                span = fd.getSpan(b, offset2);
              }
            }
          }
          lastOffset = offset2;
          offset2 += span;
        }
        return lastOffset + lastWrote - firstOffset;
      };
      Structure2.prototype.fromArray = function(values) {
        var dest = this.makeDestinationObject();
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
          var fd = _a[_i];
          if (fd.property !== void 0 && 0 < values.length) {
            dest[fd.property] = values.shift();
          }
        }
        return dest;
      };
      Structure2.prototype.layoutFor = function(property) {
        if (typeof property !== "string") {
          throw new TypeError("property must be string");
        }
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
          var fd = _a[_i];
          if (fd.property === property) {
            return fd;
          }
        }
        return void 0;
      };
      Structure2.prototype.offsetOf = function(property) {
        if (typeof property !== "string") {
          throw new TypeError("property must be string");
        }
        var offset2 = 0;
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
          var fd = _a[_i];
          if (fd.property === property) {
            return offset2;
          }
          if (0 > fd.span) {
            offset2 = -1;
          } else if (0 <= offset2) {
            offset2 += fd.span;
          }
        }
        return void 0;
      };
      return Structure2;
    }(Layout);
    exports.Structure = Structure;
    var UnionDiscriminator = function() {
      function UnionDiscriminator2(property) {
        this.property = property;
      }
      UnionDiscriminator2.prototype.decode = function(b, offset2) {
        throw new Error("UnionDiscriminator is abstract");
      };
      UnionDiscriminator2.prototype.encode = function(src, b, offset2) {
        throw new Error("UnionDiscriminator is abstract");
      };
      return UnionDiscriminator2;
    }();
    exports.UnionDiscriminator = UnionDiscriminator;
    var UnionLayoutDiscriminator = function(_super) {
      __extends(UnionLayoutDiscriminator2, _super);
      function UnionLayoutDiscriminator2(layout, property) {
        var _this = this;
        if (!(layout instanceof ExternalLayout && layout.isCount())) {
          throw new TypeError("layout must be an unsigned integer ExternalLayout");
        }
        _this = _super.call(this, property || layout.property || "variant") || this;
        _this.layout = layout;
        return _this;
      }
      UnionLayoutDiscriminator2.prototype.decode = function(b, offset2) {
        return this.layout.decode(b, offset2);
      };
      UnionLayoutDiscriminator2.prototype.encode = function(src, b, offset2) {
        return this.layout.encode(src, b, offset2);
      };
      return UnionLayoutDiscriminator2;
    }(UnionDiscriminator);
    exports.UnionLayoutDiscriminator = UnionLayoutDiscriminator;
    var Union = function(_super) {
      __extends(Union2, _super);
      function Union2(discr, defaultLayout, property) {
        var _this = this;
        var upv = discr instanceof UInt || discr instanceof UIntBE;
        var discriminator;
        if (upv) {
          discriminator = new UnionLayoutDiscriminator(new OffsetLayout(discr));
        } else if (discr instanceof ExternalLayout && discr.isCount()) {
          discriminator = new UnionLayoutDiscriminator(discr);
        } else if (!(discr instanceof UnionDiscriminator)) {
          throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");
        } else {
          discriminator = discr;
        }
        if (defaultLayout === void 0) {
          defaultLayout = null;
        }
        if (!(defaultLayout === null || defaultLayout instanceof Layout)) {
          throw new TypeError("defaultLayout must be null or a Layout");
        }
        if (defaultLayout !== null) {
          if (0 > defaultLayout.span) {
            throw new Error("defaultLayout must have constant span");
          }
          if (defaultLayout.property === void 0) {
            defaultLayout = defaultLayout.replicate("content");
          }
        }
        var span = -1;
        if (defaultLayout) {
          span = defaultLayout.span;
          if (0 <= span && upv) {
            span += discriminator.layout.span;
          }
        }
        _this = _super.call(this, span, property) || this;
        _this.discriminator = discriminator;
        _this.usesPrefixDiscriminator = upv;
        _this.defaultLayout = defaultLayout;
        _this.registry = {};
        var boundGetSourceVariant = _this.defaultGetSourceVariant.bind(_this);
        _this.getSourceVariant = function(src) {
          return boundGetSourceVariant(src);
        };
        _this.configGetSourceVariant = function(gsv) {
          boundGetSourceVariant = gsv.bind(this);
        };
        return _this;
      }
      Union2.prototype.getSpan = function(b, offset2) {
        if (0 <= this.span) {
          return this.span;
        }
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var vlo = this.getVariant(b, offset2);
        if (!vlo) {
          throw new Error("unable to determine span for unrecognized variant");
        }
        return vlo.getSpan(b, offset2);
      };
      Union2.prototype.defaultGetSourceVariant = function(src) {
        if (Object.prototype.hasOwnProperty.call(src, this.discriminator.property)) {
          if (this.defaultLayout && this.defaultLayout.property && Object.prototype.hasOwnProperty.call(src, this.defaultLayout.property)) {
            return void 0;
          }
          var vlo = this.registry[src[this.discriminator.property]];
          if (vlo && (!vlo.layout || vlo.property && Object.prototype.hasOwnProperty.call(src, vlo.property))) {
            return vlo;
          }
        } else {
          for (var tag in this.registry) {
            var vlo = this.registry[tag];
            if (vlo.property && Object.prototype.hasOwnProperty.call(src, vlo.property)) {
              return vlo;
            }
          }
        }
        throw new Error("unable to infer src variant");
      };
      Union2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var dest;
        var dlo = this.discriminator;
        var discr = dlo.decode(b, offset2);
        var clo = this.registry[discr];
        if (clo === void 0) {
          var defaultLayout = this.defaultLayout;
          var contentOffset = 0;
          if (this.usesPrefixDiscriminator) {
            contentOffset = dlo.layout.span;
          }
          dest = this.makeDestinationObject();
          dest[dlo.property] = discr;
          dest[defaultLayout.property] = defaultLayout.decode(b, offset2 + contentOffset);
        } else {
          dest = clo.decode(b, offset2);
        }
        return dest;
      };
      Union2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var vlo = this.getSourceVariant(src);
        if (vlo === void 0) {
          var dlo = this.discriminator;
          var clo = this.defaultLayout;
          var contentOffset = 0;
          if (this.usesPrefixDiscriminator) {
            contentOffset = dlo.layout.span;
          }
          dlo.encode(src[dlo.property], b, offset2);
          return contentOffset + clo.encode(src[clo.property], b, offset2 + contentOffset);
        }
        return vlo.encode(src, b, offset2);
      };
      Union2.prototype.addVariant = function(variant, layout, property) {
        var rv = new VariantLayout(this, variant, layout, property);
        this.registry[variant] = rv;
        return rv;
      };
      Union2.prototype.getVariant = function(vb, offset2) {
        var variant;
        if (vb instanceof Uint8Array) {
          if (offset2 === void 0) {
            offset2 = 0;
          }
          variant = this.discriminator.decode(vb, offset2);
        } else {
          variant = vb;
        }
        return this.registry[variant];
      };
      return Union2;
    }(Layout);
    exports.Union = Union;
    var VariantLayout = function(_super) {
      __extends(VariantLayout2, _super);
      function VariantLayout2(union2, variant, layout, property) {
        var _this = this;
        if (!(union2 instanceof Union)) {
          throw new TypeError("union must be a Union");
        }
        if (!Number.isInteger(variant) || 0 > variant) {
          throw new TypeError("variant must be a (non-negative) integer");
        }
        if (typeof layout === "string" && property === void 0) {
          property = layout;
          layout = null;
        }
        if (layout) {
          if (!(layout instanceof Layout)) {
            throw new TypeError("layout must be a Layout");
          }
          if (union2.defaultLayout !== null && 0 <= layout.span && layout.span > union2.defaultLayout.span) {
            throw new Error("variant span exceeds span of containing union");
          }
          if (typeof property !== "string") {
            throw new TypeError("variant must have a String property");
          }
        }
        var span = union2.span;
        if (0 > union2.span) {
          span = layout ? layout.span : 0;
          if (0 <= span && union2.usesPrefixDiscriminator) {
            span += union2.discriminator.layout.span;
          }
        }
        _this = _super.call(this, span, property) || this;
        _this.union = union2;
        _this.variant = variant;
        _this.layout = layout || null;
        return _this;
      }
      VariantLayout2.prototype.getSpan = function(b, offset2) {
        if (0 <= this.span) {
          return this.span;
        }
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        var span = 0;
        if (this.layout) {
          span = this.layout.getSpan(b, offset2 + contentOffset);
        }
        return contentOffset + span;
      };
      VariantLayout2.prototype.decode = function(b, offset2) {
        var dest = this.makeDestinationObject();
        if (offset2 === void 0) {
          offset2 = 0;
        }
        if (this !== this.union.getVariant(b, offset2)) {
          throw new Error("variant mismatch");
        }
        var contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        var property = this.property;
        if (this.layout) {
          dest[property] = this.layout.decode(b, offset2 + contentOffset);
        } else if (property) {
          dest[property] = true;
        } else if (this.union.usesPrefixDiscriminator) {
          dest[this.union.discriminator.property] = this.variant;
        }
        return dest;
      };
      VariantLayout2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        var property = this.property;
        if (this.layout && !Object.prototype.hasOwnProperty.call(src, property)) {
          throw new TypeError("variant lacks property " + property);
        }
        this.union.discriminator.encode(this.variant, b, offset2);
        var span = contentOffset;
        if (this.layout) {
          this.layout.encode(src[property], b, offset2 + contentOffset);
          span += this.layout.getSpan(b, offset2 + contentOffset);
          if (0 <= this.union.span && span > this.union.span) {
            throw new Error("encoded variant overruns containing union");
          }
        }
        return span;
      };
      VariantLayout2.prototype.fromArray = function(values) {
        if (this.layout) {
          return this.layout.fromArray(values);
        }
        return void 0;
      };
      return VariantLayout2;
    }(Layout);
    exports.VariantLayout = VariantLayout;
    function fixBitwiseResult(v) {
      if (0 > v) {
        v += 4294967296;
      }
      return v;
    }
    var BitStructure = function(_super) {
      __extends(BitStructure2, _super);
      function BitStructure2(word, msb, property) {
        var _this = this;
        if (!(word instanceof UInt || word instanceof UIntBE)) {
          throw new TypeError("word must be a UInt or UIntBE layout");
        }
        if (typeof msb === "string" && property === void 0) {
          property = msb;
          msb = false;
        }
        if (4 < word.span) {
          throw new RangeError("word cannot exceed 32 bits");
        }
        _this = _super.call(this, word.span, property) || this;
        _this.word = word;
        _this.msb = !!msb;
        _this.fields = [];
        var value = 0;
        _this._packedSetValue = function(v) {
          value = fixBitwiseResult(v);
          return this;
        };
        _this._packedGetValue = function() {
          return value;
        };
        return _this;
      }
      BitStructure2.prototype.decode = function(b, offset2) {
        var dest = this.makeDestinationObject();
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var value = this.word.decode(b, offset2);
        this._packedSetValue(value);
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
          var fd = _a[_i];
          if (fd.property !== void 0) {
            dest[fd.property] = fd.decode(value);
          }
        }
        return dest;
      };
      BitStructure2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var value = this.word.decode(b, offset2);
        this._packedSetValue(value);
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
          var fd = _a[_i];
          if (fd.property !== void 0) {
            var fv = src[fd.property];
            if (fv !== void 0) {
              fd.encode(fv);
            }
          }
        }
        return this.word.encode(this._packedGetValue(), b, offset2);
      };
      BitStructure2.prototype.addField = function(bits, property) {
        var bf = new BitField(this, bits, property);
        this.fields.push(bf);
        return bf;
      };
      BitStructure2.prototype.addBoolean = function(property) {
        var bf = new Boolean2(this, property);
        this.fields.push(bf);
        return bf;
      };
      BitStructure2.prototype.fieldFor = function(property) {
        if (typeof property !== "string") {
          throw new TypeError("property must be string");
        }
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
          var fd = _a[_i];
          if (fd.property === property) {
            return fd;
          }
        }
        return void 0;
      };
      return BitStructure2;
    }(Layout);
    exports.BitStructure = BitStructure;
    var BitField = function() {
      function BitField2(container, bits, property) {
        if (!(container instanceof BitStructure)) {
          throw new TypeError("container must be a BitStructure");
        }
        if (!Number.isInteger(bits) || 0 >= bits) {
          throw new TypeError("bits must be positive integer");
        }
        var totalBits = 8 * container.span;
        var usedBits = container.fields.reduce(function(sum, fd) {
          return sum + fd.bits;
        }, 0);
        if (bits + usedBits > totalBits) {
          throw new Error("bits too long for span remainder (" + (totalBits - usedBits) + " of " + totalBits + " remain)");
        }
        this.container = container;
        this.bits = bits;
        this.valueMask = (1 << bits) - 1;
        if (bits === 32) {
          this.valueMask = 4294967295;
        }
        this.start = usedBits;
        if (this.container.msb) {
          this.start = totalBits - usedBits - bits;
        }
        this.wordMask = fixBitwiseResult(this.valueMask << this.start);
        this.property = property;
      }
      BitField2.prototype.decode = function(b, offset2) {
        var word = this.container._packedGetValue();
        var wordValue = fixBitwiseResult(word & this.wordMask);
        var value = wordValue >>> this.start;
        return value;
      };
      BitField2.prototype.encode = function(value) {
        if (!Number.isInteger(value) || value !== fixBitwiseResult(value & this.valueMask)) {
          throw new TypeError(nameWithProperty("BitField.encode", this) + " value must be integer not exceeding " + this.valueMask);
        }
        var word = this.container._packedGetValue();
        var wordValue = fixBitwiseResult(value << this.start);
        this.container._packedSetValue(fixBitwiseResult(word & ~this.wordMask) | wordValue);
      };
      return BitField2;
    }();
    exports.BitField = BitField;
    var Boolean2 = function(_super) {
      __extends(Boolean3, _super);
      function Boolean3(container, property) {
        return _super.call(this, container, 1, property) || this;
      }
      Boolean3.prototype.decode = function(b, offset2) {
        return !!BitField.prototype.decode.call(this, b, offset2);
      };
      Boolean3.prototype.encode = function(value) {
        if (typeof value === "boolean") {
          value = +value;
        }
        return BitField.prototype.encode.call(this, value);
      };
      return Boolean3;
    }(BitField);
    exports.Boolean = Boolean2;
    var Blob2 = function(_super) {
      __extends(Blob3, _super);
      function Blob3(length, property) {
        var _this = this;
        if (!(length instanceof ExternalLayout && length.isCount() || Number.isInteger(length) && 0 <= length)) {
          throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
        }
        var span = -1;
        if (!(length instanceof ExternalLayout)) {
          span = length;
        }
        _this = _super.call(this, span, property) || this;
        _this.length = length;
        return _this;
      }
      Blob3.prototype.getSpan = function(b, offset2) {
        var span = this.span;
        if (0 > span) {
          span = this.length.decode(b, offset2);
        }
        return span;
      };
      Blob3.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var span = this.span;
        if (0 > span) {
          span = this.length.decode(b, offset2);
        }
        return uint8ArrayToBuffer(b).slice(offset2, offset2 + span);
      };
      Blob3.prototype.encode = function(src, b, offset2) {
        var span = this.length;
        if (this.length instanceof ExternalLayout) {
          span = src.length;
        }
        if (!(src instanceof Uint8Array && span === src.length)) {
          throw new TypeError(nameWithProperty("Blob.encode", this) + " requires (length " + span + ") Uint8Array as src");
        }
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Uint8Array");
        }
        var srcBuffer = uint8ArrayToBuffer(src);
        uint8ArrayToBuffer(b).write(srcBuffer.toString("hex"), offset2, span, "hex");
        if (this.length instanceof ExternalLayout) {
          this.length.encode(span, b, offset2);
        }
        return span;
      };
      return Blob3;
    }(Layout);
    exports.Blob = Blob2;
    var CString = function(_super) {
      __extends(CString2, _super);
      function CString2(property) {
        return _super.call(this, -1, property) || this;
      }
      CString2.prototype.getSpan = function(b, offset2) {
        checkUint8Array(b);
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var idx = offset2;
        while (idx < b.length && b[idx] !== 0) {
          idx += 1;
        }
        return 1 + idx - offset2;
      };
      CString2.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var span = this.getSpan(b, offset2);
        return uint8ArrayToBuffer(b).slice(offset2, offset2 + span - 1).toString("utf-8");
      };
      CString2.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        if (typeof src !== "string") {
          src = src.toString();
        }
        var srcb = buffer_1.Buffer.from(src, "utf8");
        var span = srcb.length;
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Buffer");
        }
        var buffer = uint8ArrayToBuffer(b);
        srcb.copy(buffer, offset2);
        buffer[offset2 + span] = 0;
        return span + 1;
      };
      return CString2;
    }(Layout);
    exports.CString = CString;
    var UTF8 = function(_super) {
      __extends(UTF82, _super);
      function UTF82(maxSpan, property) {
        var _this = this;
        if (typeof maxSpan === "string" && property === void 0) {
          property = maxSpan;
          maxSpan = void 0;
        }
        if (maxSpan === void 0) {
          maxSpan = -1;
        } else if (!Number.isInteger(maxSpan)) {
          throw new TypeError("maxSpan must be an integer");
        }
        _this = _super.call(this, -1, property) || this;
        _this.maxSpan = maxSpan;
        return _this;
      }
      UTF82.prototype.getSpan = function(b, offset2) {
        checkUint8Array(b);
        if (offset2 === void 0) {
          offset2 = 0;
        }
        return b.length - offset2;
      };
      UTF82.prototype.decode = function(b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        var span = this.getSpan(b, offset2);
        if (0 <= this.maxSpan && this.maxSpan < span) {
          throw new RangeError("text length exceeds maxSpan");
        }
        return uint8ArrayToBuffer(b).slice(offset2, offset2 + span).toString("utf-8");
      };
      UTF82.prototype.encode = function(src, b, offset2) {
        if (offset2 === void 0) {
          offset2 = 0;
        }
        if (typeof src !== "string") {
          src = src.toString();
        }
        var srcb = buffer_1.Buffer.from(src, "utf8");
        var span = srcb.length;
        if (0 <= this.maxSpan && this.maxSpan < span) {
          throw new RangeError("text length exceeds maxSpan");
        }
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Buffer");
        }
        srcb.copy(uint8ArrayToBuffer(b), offset2);
        return span;
      };
      return UTF82;
    }(Layout);
    exports.UTF8 = UTF8;
    var Constant = function(_super) {
      __extends(Constant2, _super);
      function Constant2(value, property) {
        var _this = _super.call(this, 0, property) || this;
        _this.value = value;
        return _this;
      }
      Constant2.prototype.decode = function(b, offset2) {
        return this.value;
      };
      Constant2.prototype.encode = function(src, b, offset2) {
        return 0;
      };
      return Constant2;
    }(Layout);
    exports.Constant = Constant;
    exports.greedy = function(elementSpan, property) {
      return new GreedyCount(elementSpan, property);
    };
    exports.offset = function(layout, offset2, property) {
      return new OffsetLayout(layout, offset2, property);
    };
    exports.u8 = function(property) {
      return new UInt(1, property);
    };
    exports.u16 = function(property) {
      return new UInt(2, property);
    };
    exports.u24 = function(property) {
      return new UInt(3, property);
    };
    exports.u32 = function(property) {
      return new UInt(4, property);
    };
    exports.u40 = function(property) {
      return new UInt(5, property);
    };
    exports.u48 = function(property) {
      return new UInt(6, property);
    };
    exports.nu64 = function(property) {
      return new NearUInt64(property);
    };
    exports.u16be = function(property) {
      return new UIntBE(2, property);
    };
    exports.u24be = function(property) {
      return new UIntBE(3, property);
    };
    exports.u32be = function(property) {
      return new UIntBE(4, property);
    };
    exports.u40be = function(property) {
      return new UIntBE(5, property);
    };
    exports.u48be = function(property) {
      return new UIntBE(6, property);
    };
    exports.nu64be = function(property) {
      return new NearUInt64BE(property);
    };
    exports.s8 = function(property) {
      return new Int(1, property);
    };
    exports.s16 = function(property) {
      return new Int(2, property);
    };
    exports.s24 = function(property) {
      return new Int(3, property);
    };
    exports.s32 = function(property) {
      return new Int(4, property);
    };
    exports.s40 = function(property) {
      return new Int(5, property);
    };
    exports.s48 = function(property) {
      return new Int(6, property);
    };
    exports.ns64 = function(property) {
      return new NearInt64(property);
    };
    exports.s16be = function(property) {
      return new IntBE(2, property);
    };
    exports.s24be = function(property) {
      return new IntBE(3, property);
    };
    exports.s32be = function(property) {
      return new IntBE(4, property);
    };
    exports.s40be = function(property) {
      return new IntBE(5, property);
    };
    exports.s48be = function(property) {
      return new IntBE(6, property);
    };
    exports.ns64be = function(property) {
      return new NearInt64BE(property);
    };
    exports.f32 = function(property) {
      return new Float(property);
    };
    exports.f32be = function(property) {
      return new FloatBE(property);
    };
    exports.f64 = function(property) {
      return new Double(property);
    };
    exports.f64be = function(property) {
      return new DoubleBE(property);
    };
    exports.struct = function(fields, property, decodePrefixes) {
      return new Structure(fields, property, decodePrefixes);
    };
    exports.bits = function(word, msb, property) {
      return new BitStructure(word, msb, property);
    };
    exports.seq = function(elementLayout, count, property) {
      return new Sequence(elementLayout, count, property);
    };
    exports.union = function(discr, defaultLayout, property) {
      return new Union(discr, defaultLayout, property);
    };
    exports.unionLayoutDiscriminator = function(layout, property) {
      return new UnionLayoutDiscriminator(layout, property);
    };
    exports.blob = function(length, property) {
      return new Blob2(length, property);
    };
    exports.cstr = function(property) {
      return new CString(property);
    };
    exports.utf8 = function(maxSpan, property) {
      return new UTF8(maxSpan, property);
    };
    exports.constant = function(value, property) {
      return new Constant(value, property);
    };
  }
});

// node_modules/superstruct/lib/index.es.js
function isIterable(x) {
  return isObject(x) && typeof x[Symbol.iterator] === "function";
}
function isObject(x) {
  return typeof x === "object" && x != null;
}
function print(value) {
  return typeof value === "string" ? JSON.stringify(value) : "" + value;
}
function shiftIterator(input) {
  const {
    done,
    value
  } = input.next();
  return done ? void 0 : value;
}
function toFailure(result, context, struct2, value) {
  if (result === true) {
    return;
  } else if (result === false) {
    result = {};
  } else if (typeof result === "string") {
    result = {
      message: result
    };
  }
  const {
    path,
    branch
  } = context;
  const {
    type: type2
  } = struct2;
  const {
    refinement,
    message = "Expected a value of type `" + type2 + "`" + (refinement ? " with refinement `" + refinement + "`" : "") + ", but received: `" + print(value) + "`"
  } = result;
  return {
    value,
    type: type2,
    refinement,
    key: path[path.length - 1],
    path,
    branch,
    ...result,
    message
  };
}
function* toFailures(result, context, struct2, value) {
  if (!isIterable(result)) {
    result = [result];
  }
  for (const r2 of result) {
    const failure = toFailure(r2, context, struct2, value);
    if (failure) {
      yield failure;
    }
  }
}
function* run(value, struct2, options = {}) {
  const {
    path = [],
    branch = [value],
    coerce: coerce2 = false,
    mask: mask2 = false
  } = options;
  const ctx = {
    path,
    branch
  };
  if (coerce2) {
    value = struct2.coercer(value, ctx);
    if (mask2 && struct2.type !== "type" && isObject(struct2.schema) && isObject(value) && !Array.isArray(value)) {
      for (const key in value) {
        if (struct2.schema[key] === void 0) {
          delete value[key];
        }
      }
    }
  }
  let valid = true;
  for (const failure of struct2.validator(value, ctx)) {
    valid = false;
    yield [failure, void 0];
  }
  for (let [k, v, s2] of struct2.entries(value, ctx)) {
    const ts = run(v, s2, {
      path: k === void 0 ? path : [...path, k],
      branch: k === void 0 ? branch : [...branch, v],
      coerce: coerce2,
      mask: mask2
    });
    for (const t of ts) {
      if (t[0]) {
        valid = false;
        yield [t[0], void 0];
      } else if (coerce2) {
        v = t[1];
        if (k === void 0) {
          value = v;
        } else if (value instanceof Map) {
          value.set(k, v);
        } else if (value instanceof Set) {
          value.add(v);
        } else if (isObject(value)) {
          value[k] = v;
        }
      }
    }
  }
  if (valid) {
    for (const failure of struct2.refiner(value, ctx)) {
      valid = false;
      yield [failure, void 0];
    }
  }
  if (valid) {
    yield [void 0, value];
  }
}
function assert(value, struct2) {
  const result = validate(value, struct2);
  if (result[0]) {
    throw result[0];
  }
}
function create(value, struct2) {
  const result = validate(value, struct2, {
    coerce: true
  });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function mask(value, struct2) {
  const result = validate(value, struct2, {
    coerce: true,
    mask: true
  });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function is(value, struct2) {
  const result = validate(value, struct2);
  return !result[0];
}
function validate(value, struct2, options = {}) {
  const tuples = run(value, struct2, options);
  const tuple2 = shiftIterator(tuples);
  if (tuple2[0]) {
    const error = new StructError(tuple2[0], function* () {
      for (const t of tuples) {
        if (t[0]) {
          yield t[0];
        }
      }
    });
    return [error, void 0];
  } else {
    const v = tuple2[1];
    return [void 0, v];
  }
}
function define(name, validator) {
  return new Struct({
    type: name,
    schema: null,
    validator
  });
}
function any() {
  return define("any", () => true);
}
function array(Element) {
  return new Struct({
    type: "array",
    schema: Element,
    *entries(value) {
      if (Element && Array.isArray(value)) {
        for (const [i, v] of value.entries()) {
          yield [i, v, Element];
        }
      }
    },
    coercer(value) {
      return Array.isArray(value) ? value.slice() : value;
    },
    validator(value) {
      return Array.isArray(value) || "Expected an array value, but received: " + print(value);
    }
  });
}
function boolean() {
  return define("boolean", (value) => {
    return typeof value === "boolean";
  });
}
function instance(Class) {
  return define("instance", (value) => {
    return value instanceof Class || "Expected a `" + Class.name + "` instance, but received: " + print(value);
  });
}
function literal(constant) {
  const description = print(constant);
  const t = typeof constant;
  return new Struct({
    type: "literal",
    schema: t === "string" || t === "number" || t === "boolean" ? constant : null,
    validator(value) {
      return value === constant || "Expected the literal `" + description + "`, but received: " + print(value);
    }
  });
}
function never() {
  return define("never", () => false);
}
function nullable(struct2) {
  return new Struct({
    ...struct2,
    validator: (value, ctx) => value === null || struct2.validator(value, ctx),
    refiner: (value, ctx) => value === null || struct2.refiner(value, ctx)
  });
}
function number() {
  return define("number", (value) => {
    return typeof value === "number" && !isNaN(value) || "Expected a number, but received: " + print(value);
  });
}
function optional(struct2) {
  return new Struct({
    ...struct2,
    validator: (value, ctx) => value === void 0 || struct2.validator(value, ctx),
    refiner: (value, ctx) => value === void 0 || struct2.refiner(value, ctx)
  });
}
function record(Key, Value) {
  return new Struct({
    type: "record",
    schema: null,
    *entries(value) {
      if (isObject(value)) {
        for (const k in value) {
          const v = value[k];
          yield [k, k, Key];
          yield [k, v, Value];
        }
      }
    },
    validator(value) {
      return isObject(value) || "Expected an object, but received: " + print(value);
    }
  });
}
function string() {
  return define("string", (value) => {
    return typeof value === "string" || "Expected a string, but received: " + print(value);
  });
}
function tuple(Elements) {
  const Never = never();
  return new Struct({
    type: "tuple",
    schema: null,
    *entries(value) {
      if (Array.isArray(value)) {
        const length = Math.max(Elements.length, value.length);
        for (let i = 0; i < length; i++) {
          yield [i, value[i], Elements[i] || Never];
        }
      }
    },
    validator(value) {
      return Array.isArray(value) || "Expected an array, but received: " + print(value);
    }
  });
}
function type(schema) {
  const keys = Object.keys(schema);
  return new Struct({
    type: "type",
    schema,
    *entries(value) {
      if (isObject(value)) {
        for (const k of keys) {
          yield [k, value[k], schema[k]];
        }
      }
    },
    validator(value) {
      return isObject(value) || "Expected an object, but received: " + print(value);
    }
  });
}
function union(Structs) {
  const description = Structs.map((s2) => s2.type).join(" | ");
  return new Struct({
    type: "union",
    schema: null,
    validator(value, ctx) {
      const failures = [];
      for (const S of Structs) {
        const [...tuples] = run(value, S, ctx);
        const [first] = tuples;
        if (!first[0]) {
          return [];
        } else {
          for (const [failure] of tuples) {
            if (failure) {
              failures.push(failure);
            }
          }
        }
      }
      return ["Expected the value to satisfy a union of `" + description + "`, but received: " + print(value), ...failures];
    }
  });
}
function unknown() {
  return define("unknown", () => true);
}
function coerce(struct2, condition, coercer) {
  return new Struct({
    ...struct2,
    coercer: (value, ctx) => {
      return is(value, condition) ? struct2.coercer(coercer(value, ctx), ctx) : struct2.coercer(value, ctx);
    }
  });
}
var StructError, Struct;
var init_index_es = __esm({
  "node_modules/superstruct/lib/index.es.js"() {
    init_react();
    StructError = class extends TypeError {
      constructor(failure, failures) {
        let cached;
        const {
          message,
          ...rest
        } = failure;
        const {
          path
        } = failure;
        const msg = path.length === 0 ? message : "At path: " + path.join(".") + " -- " + message;
        super(msg);
        Object.assign(this, rest);
        this.name = this.constructor.name;
        this.failures = () => {
          var _cached;
          return (_cached = cached) != null ? _cached : cached = [failure, ...failures()];
        };
      }
    };
    Struct = class {
      constructor(props) {
        const {
          type: type2,
          schema,
          validator,
          refiner,
          coercer = (value) => value,
          entries = function* () {
          }
        } = props;
        this.type = type2;
        this.schema = schema;
        this.entries = entries;
        this.coercer = coercer;
        if (validator) {
          this.validator = (value, context) => {
            const result = validator(value, context);
            return toFailures(result, context, this, value);
          };
        } else {
          this.validator = () => [];
        }
        if (refiner) {
          this.refiner = (value, context) => {
            const result = refiner(value, context);
            return toFailures(result, context, this, value);
          };
        } else {
          this.refiner = () => [];
        }
      }
      assert(value) {
        return assert(value, this);
      }
      create(value) {
        return create(value, this);
      }
      is(value) {
        return is(value, this);
      }
      mask(value) {
        return mask(value, this);
      }
      validate(value, options = {}) {
        return validate(value, this, options);
      }
    };
  }
});

// node_modules/@babel/runtime/helpers/interopRequireDefault.js
var require_interopRequireDefault = __commonJS({
  "node_modules/@babel/runtime/helpers/interopRequireDefault.js"(exports, module) {
    init_react();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/classCallCheck.js
var require_classCallCheck = __commonJS({
  "node_modules/@babel/runtime/helpers/classCallCheck.js"(exports, module) {
    init_react();
    function _classCallCheck(instance2, Constructor) {
      if (!(instance2 instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/setPrototypeOf.js
var require_setPrototypeOf = __commonJS({
  "node_modules/@babel/runtime/helpers/setPrototypeOf.js"(exports, module) {
    init_react();
    function _setPrototypeOf(o, p) {
      module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports;
      return _setPrototypeOf(o, p);
    }
    module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/inherits.js
var require_inherits = __commonJS({
  "node_modules/@babel/runtime/helpers/inherits.js"(exports, module) {
    init_react();
    var setPrototypeOf = require_setPrototypeOf();
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      Object.defineProperty(subClass, "prototype", {
        writable: false
      });
      if (superClass)
        setPrototypeOf(subClass, superClass);
    }
    module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/typeof.js
var require_typeof = __commonJS({
  "node_modules/@babel/runtime/helpers/typeof.js"(exports, module) {
    init_react();
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return module.exports = _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(obj);
    }
    module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/assertThisInitialized.js
var require_assertThisInitialized = __commonJS({
  "node_modules/@babel/runtime/helpers/assertThisInitialized.js"(exports, module) {
    init_react();
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var require_possibleConstructorReturn = __commonJS({
  "node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"(exports, module) {
    init_react();
    var _typeof = require_typeof()["default"];
    var assertThisInitialized = require_assertThisInitialized();
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return assertThisInitialized(self2);
    }
    module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/getPrototypeOf.js
var require_getPrototypeOf = __commonJS({
  "node_modules/@babel/runtime/helpers/getPrototypeOf.js"(exports, module) {
    init_react();
    function _getPrototypeOf(o) {
      module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      }, module.exports.__esModule = true, module.exports["default"] = module.exports;
      return _getPrototypeOf(o);
    }
    module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/createClass.js
var require_createClass = __commonJS({
  "node_modules/@babel/runtime/helpers/createClass.js"(exports, module) {
    init_react();
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    init_react();
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if (typeof module !== "undefined") {
      module.exports = EventEmitter;
    }
  }
});

// node_modules/rpc-websockets/dist/lib/client/websocket.browser.js
var require_websocket_browser = __commonJS({
  "node_modules/rpc-websockets/dist/lib/client/websocket.browser.js"(exports) {
    init_react();
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = _default;
    var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
    var _createClass2 = _interopRequireDefault(require_createClass());
    var _inherits2 = _interopRequireDefault(require_inherits());
    var _possibleConstructorReturn2 = _interopRequireDefault(require_possibleConstructorReturn());
    var _getPrototypeOf2 = _interopRequireDefault(require_getPrototypeOf());
    var _eventemitter = require_eventemitter3();
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = (0, _getPrototypeOf2["default"])(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return (0, _possibleConstructorReturn2["default"])(this, result);
      };
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    var WebSocketBrowserImpl = /* @__PURE__ */ function(_EventEmitter) {
      (0, _inherits2["default"])(WebSocketBrowserImpl2, _EventEmitter);
      var _super = _createSuper(WebSocketBrowserImpl2);
      function WebSocketBrowserImpl2(address, options, protocols) {
        var _this;
        (0, _classCallCheck2["default"])(this, WebSocketBrowserImpl2);
        _this = _super.call(this);
        _this.socket = new window.WebSocket(address, protocols);
        _this.socket.onopen = function() {
          return _this.emit("open");
        };
        _this.socket.onmessage = function(event) {
          return _this.emit("message", event.data);
        };
        _this.socket.onerror = function(error) {
          return _this.emit("error", error);
        };
        _this.socket.onclose = function(event) {
          _this.emit("close", event.code, event.reason);
        };
        return _this;
      }
      (0, _createClass2["default"])(WebSocketBrowserImpl2, [{
        key: "send",
        value: function send(data, optionsOrCallback, callback) {
          var cb = callback || optionsOrCallback;
          try {
            this.socket.send(data);
            cb();
          } catch (error) {
            cb(error);
          }
        }
      }, {
        key: "close",
        value: function close(code, reason) {
          this.socket.close(code, reason);
        }
      }, {
        key: "addEventListener",
        value: function addEventListener(type2, listener, options) {
          this.socket.addEventListener(type2, listener, options);
        }
      }]);
      return WebSocketBrowserImpl2;
    }(_eventemitter.EventEmitter);
    function _default(address, options) {
      return new WebSocketBrowserImpl(address, options);
    }
  }
});

// node_modules/@babel/runtime/helpers/asyncToGenerator.js
var require_asyncToGenerator = __commonJS({
  "node_modules/@babel/runtime/helpers/asyncToGenerator.js"(exports, module) {
    init_react();
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self2 = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self2, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/circular-json/build/circular-json.node.js
var require_circular_json_node = __commonJS({
  "node_modules/circular-json/build/circular-json.node.js"(exports, module) {
    init_react();
    var specialChar = "~";
    var safeSpecialChar = "\\x" + ("0" + specialChar.charCodeAt(0).toString(16)).slice(-2);
    var escapedSafeSpecialChar = "\\" + safeSpecialChar;
    var specialCharRG = new RegExp(safeSpecialChar, "g");
    var safeSpecialCharRG = new RegExp(escapedSafeSpecialChar, "g");
    var safeStartWithSpecialCharRG = new RegExp("(?:^|([^\\\\]))" + escapedSafeSpecialChar);
    var indexOf = [].indexOf || function(v) {
      for (var i = this.length; i-- && this[i] !== v; )
        ;
      return i;
    };
    var $String = String;
    function generateReplacer(value, replacer, resolve) {
      var doNotIgnore = false, inspect = !!replacer, path = [], all = [value], seen = [value], mapp = [resolve ? specialChar : "[Circular]"], last = value, lvl = 1, i, fn;
      if (inspect) {
        fn = typeof replacer === "object" ? function(key, value2) {
          return key !== "" && replacer.indexOf(key) < 0 ? void 0 : value2;
        } : replacer;
      }
      return function(key, value2) {
        if (inspect)
          value2 = fn.call(this, key, value2);
        if (doNotIgnore) {
          if (last !== this) {
            i = lvl - indexOf.call(all, this) - 1;
            lvl -= i;
            all.splice(lvl, all.length);
            path.splice(lvl - 1, path.length);
            last = this;
          }
          if (typeof value2 === "object" && value2) {
            if (indexOf.call(all, value2) < 0) {
              all.push(last = value2);
            }
            lvl = all.length;
            i = indexOf.call(seen, value2);
            if (i < 0) {
              i = seen.push(value2) - 1;
              if (resolve) {
                path.push(("" + key).replace(specialCharRG, safeSpecialChar));
                mapp[i] = specialChar + path.join(specialChar);
              } else {
                mapp[i] = mapp[0];
              }
            } else {
              value2 = mapp[i];
            }
          } else {
            if (typeof value2 === "string" && resolve) {
              value2 = value2.replace(safeSpecialChar, escapedSafeSpecialChar).replace(specialChar, safeSpecialChar);
            }
          }
        } else {
          doNotIgnore = true;
        }
        return value2;
      };
    }
    function retrieveFromPath(current, keys) {
      for (var i = 0, length = keys.length; i < length; current = current[keys[i++].replace(safeSpecialCharRG, specialChar)])
        ;
      return current;
    }
    function generateReviver(reviver) {
      return function(key, value) {
        var isString = typeof value === "string";
        if (isString && value.charAt(0) === specialChar) {
          return new $String(value.slice(1));
        }
        if (key === "")
          value = regenerate(value, value, {});
        if (isString)
          value = value.replace(safeStartWithSpecialCharRG, "$1" + specialChar).replace(escapedSafeSpecialChar, safeSpecialChar);
        return reviver ? reviver.call(this, key, value) : value;
      };
    }
    function regenerateArray(root, current, retrieve) {
      for (var i = 0, length = current.length; i < length; i++) {
        current[i] = regenerate(root, current[i], retrieve);
      }
      return current;
    }
    function regenerateObject(root, current, retrieve) {
      for (var key in current) {
        if (current.hasOwnProperty(key)) {
          current[key] = regenerate(root, current[key], retrieve);
        }
      }
      return current;
    }
    function regenerate(root, current, retrieve) {
      return current instanceof Array ? regenerateArray(root, current, retrieve) : current instanceof $String ? current.length ? retrieve.hasOwnProperty(current) ? retrieve[current] : retrieve[current] = retrieveFromPath(root, current.split(specialChar)) : root : current instanceof Object ? regenerateObject(root, current, retrieve) : current;
    }
    var CircularJSON = {
      stringify: function stringify(value, replacer, space, doNotResolve) {
        return CircularJSON.parser.stringify(value, generateReplacer(value, replacer, !doNotResolve), space);
      },
      parse: function parse(text, reviver) {
        return CircularJSON.parser.parse(text, generateReviver(reviver));
      },
      parser: JSON
    };
    module.exports = CircularJSON;
  }
});

// node_modules/rpc-websockets/dist/lib/client.js
var require_client = __commonJS({
  "node_modules/rpc-websockets/dist/lib/client.js"(exports) {
    init_react();
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _regenerator = _interopRequireDefault(require_regenerator());
    var _asyncToGenerator2 = _interopRequireDefault(require_asyncToGenerator());
    var _typeof2 = _interopRequireDefault(require_typeof());
    var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
    var _createClass2 = _interopRequireDefault(require_createClass());
    var _inherits2 = _interopRequireDefault(require_inherits());
    var _possibleConstructorReturn2 = _interopRequireDefault(require_possibleConstructorReturn());
    var _getPrototypeOf2 = _interopRequireDefault(require_getPrototypeOf());
    var _eventemitter = require_eventemitter3();
    var _circularJson = _interopRequireDefault(require_circular_json_node());
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = (0, _getPrototypeOf2["default"])(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return (0, _possibleConstructorReturn2["default"])(this, result);
      };
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    var __rest = function(s2, e) {
      var t = {};
      for (var p in s2) {
        if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
          t[p] = s2[p];
      }
      if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
            t[p[i]] = s2[p[i]];
        }
      return t;
    };
    var CommonClient = /* @__PURE__ */ function(_EventEmitter) {
      (0, _inherits2["default"])(CommonClient2, _EventEmitter);
      var _super = _createSuper(CommonClient2);
      function CommonClient2(webSocketFactory) {
        var _this;
        var address = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "ws://localhost:8080";
        var _a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var generate_request_id = arguments.length > 3 ? arguments[3] : void 0;
        (0, _classCallCheck2["default"])(this, CommonClient2);
        var _a$autoconnect = _a.autoconnect, autoconnect = _a$autoconnect === void 0 ? true : _a$autoconnect, _a$reconnect = _a.reconnect, reconnect = _a$reconnect === void 0 ? true : _a$reconnect, _a$reconnect_interval = _a.reconnect_interval, reconnect_interval = _a$reconnect_interval === void 0 ? 1e3 : _a$reconnect_interval, _a$max_reconnects = _a.max_reconnects, max_reconnects = _a$max_reconnects === void 0 ? 5 : _a$max_reconnects, rest_options = __rest(_a, ["autoconnect", "reconnect", "reconnect_interval", "max_reconnects"]);
        _this = _super.call(this);
        _this.webSocketFactory = webSocketFactory;
        _this.queue = {};
        _this.rpc_id = 0;
        _this.address = address;
        _this.autoconnect = autoconnect;
        _this.ready = false;
        _this.reconnect = reconnect;
        _this.reconnect_interval = reconnect_interval;
        _this.max_reconnects = max_reconnects;
        _this.rest_options = rest_options;
        _this.current_reconnects = 0;
        _this.generate_request_id = generate_request_id || function() {
          return ++_this.rpc_id;
        };
        if (_this.autoconnect)
          _this._connect(_this.address, Object.assign({
            autoconnect: _this.autoconnect,
            reconnect: _this.reconnect,
            reconnect_interval: _this.reconnect_interval,
            max_reconnects: _this.max_reconnects
          }, _this.rest_options));
        return _this;
      }
      (0, _createClass2["default"])(CommonClient2, [{
        key: "connect",
        value: function connect() {
          if (this.socket)
            return;
          this._connect(this.address, Object.assign({
            autoconnect: this.autoconnect,
            reconnect: this.reconnect,
            reconnect_interval: this.reconnect_interval,
            max_reconnects: this.max_reconnects
          }, this.rest_options));
        }
      }, {
        key: "call",
        value: function call(method, params, timeout, ws_opts) {
          var _this2 = this;
          if (!ws_opts && (0, _typeof2["default"])(timeout) === "object") {
            ws_opts = timeout;
            timeout = null;
          }
          return new Promise(function(resolve, reject) {
            if (!_this2.ready)
              return reject(new Error("socket not ready"));
            var rpc_id = _this2.generate_request_id(method, params);
            var message = {
              jsonrpc: "2.0",
              method,
              params: params || null,
              id: rpc_id
            };
            _this2.socket.send(JSON.stringify(message), ws_opts, function(error) {
              if (error)
                return reject(error);
              _this2.queue[rpc_id] = {
                promise: [resolve, reject]
              };
              if (timeout) {
                _this2.queue[rpc_id].timeout = setTimeout(function() {
                  delete _this2.queue[rpc_id];
                  reject(new Error("reply timeout"));
                }, timeout);
              }
            });
          });
        }
      }, {
        key: "login",
        value: function() {
          var _login = (0, _asyncToGenerator2["default"])(/* @__PURE__ */ _regenerator["default"].mark(function _callee(params) {
            var resp;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.call("rpc.login", params);
                  case 2:
                    resp = _context.sent;
                    if (resp) {
                      _context.next = 5;
                      break;
                    }
                    throw new Error("authentication failed");
                  case 5:
                    return _context.abrupt("return", resp);
                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
          function login(_x) {
            return _login.apply(this, arguments);
          }
          return login;
        }()
      }, {
        key: "listMethods",
        value: function() {
          var _listMethods = (0, _asyncToGenerator2["default"])(/* @__PURE__ */ _regenerator["default"].mark(function _callee2() {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return this.call("__listMethods");
                  case 2:
                    return _context2.abrupt("return", _context2.sent);
                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
          function listMethods() {
            return _listMethods.apply(this, arguments);
          }
          return listMethods;
        }()
      }, {
        key: "notify",
        value: function notify(method, params) {
          var _this3 = this;
          return new Promise(function(resolve, reject) {
            if (!_this3.ready)
              return reject(new Error("socket not ready"));
            var message = {
              jsonrpc: "2.0",
              method,
              params: params || null
            };
            _this3.socket.send(JSON.stringify(message), function(error) {
              if (error)
                return reject(error);
              resolve();
            });
          });
        }
      }, {
        key: "subscribe",
        value: function() {
          var _subscribe = (0, _asyncToGenerator2["default"])(/* @__PURE__ */ _regenerator["default"].mark(function _callee3(event) {
            var result;
            return _regenerator["default"].wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (typeof event === "string")
                      event = [event];
                    _context3.next = 3;
                    return this.call("rpc.on", event);
                  case 3:
                    result = _context3.sent;
                    if (!(typeof event === "string" && result[event] !== "ok")) {
                      _context3.next = 6;
                      break;
                    }
                    throw new Error("Failed subscribing to an event '" + event + "' with: " + result[event]);
                  case 6:
                    return _context3.abrupt("return", result);
                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
          function subscribe(_x2) {
            return _subscribe.apply(this, arguments);
          }
          return subscribe;
        }()
      }, {
        key: "unsubscribe",
        value: function() {
          var _unsubscribe = (0, _asyncToGenerator2["default"])(/* @__PURE__ */ _regenerator["default"].mark(function _callee4(event) {
            var result;
            return _regenerator["default"].wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (typeof event === "string")
                      event = [event];
                    _context4.next = 3;
                    return this.call("rpc.off", event);
                  case 3:
                    result = _context4.sent;
                    if (!(typeof event === "string" && result[event] !== "ok")) {
                      _context4.next = 6;
                      break;
                    }
                    throw new Error("Failed unsubscribing from an event with: " + result);
                  case 6:
                    return _context4.abrupt("return", result);
                  case 7:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));
          function unsubscribe(_x3) {
            return _unsubscribe.apply(this, arguments);
          }
          return unsubscribe;
        }()
      }, {
        key: "close",
        value: function close(code, data) {
          this.socket.close(code || 1e3, data);
        }
      }, {
        key: "_connect",
        value: function _connect(address, options) {
          var _this4 = this;
          this.socket = this.webSocketFactory(address, options);
          this.socket.addEventListener("open", function() {
            _this4.ready = true;
            _this4.emit("open");
            _this4.current_reconnects = 0;
          });
          this.socket.addEventListener("message", function(_ref) {
            var message = _ref.data;
            if (message instanceof ArrayBuffer)
              message = Buffer.from(message).toString();
            try {
              message = _circularJson["default"].parse(message);
            } catch (error) {
              return;
            }
            if (message.notification && _this4.listeners(message.notification).length) {
              if (!Object.keys(message.params).length)
                return _this4.emit(message.notification);
              var args = [message.notification];
              if (message.params.constructor === Object)
                args.push(message.params);
              else
                for (var i = 0; i < message.params.length; i++) {
                  args.push(message.params[i]);
                }
              return Promise.resolve().then(function() {
                _this4.emit.apply(_this4, args);
              });
            }
            if (!_this4.queue[message.id]) {
              if (message.method && message.params) {
                return Promise.resolve().then(function() {
                  _this4.emit(message.method, message.params);
                });
              }
              return;
            }
            if ("error" in message === "result" in message)
              _this4.queue[message.id].promise[1](new Error('Server response malformed. Response must include either "result" or "error", but not both.'));
            if (_this4.queue[message.id].timeout)
              clearTimeout(_this4.queue[message.id].timeout);
            if (message.error)
              _this4.queue[message.id].promise[1](message.error);
            else
              _this4.queue[message.id].promise[0](message.result);
            delete _this4.queue[message.id];
          });
          this.socket.addEventListener("error", function(error) {
            return _this4.emit("error", error);
          });
          this.socket.addEventListener("close", function(_ref2) {
            var code = _ref2.code, reason = _ref2.reason;
            if (_this4.ready)
              setTimeout(function() {
                return _this4.emit("close", code, reason);
              }, 0);
            _this4.ready = false;
            _this4.socket = void 0;
            if (code === 1e3)
              return;
            _this4.current_reconnects++;
            if (_this4.reconnect && (_this4.max_reconnects > _this4.current_reconnects || _this4.max_reconnects === 0))
              setTimeout(function() {
                return _this4._connect(address, options);
              }, _this4.reconnect_interval);
          });
        }
      }]);
      return CommonClient2;
    }(_eventemitter.EventEmitter);
    exports["default"] = CommonClient;
  }
});

// node_modules/rpc-websockets/dist/index.browser.js
var require_index_browser = __commonJS({
  "node_modules/rpc-websockets/dist/index.browser.js"(exports) {
    init_react();
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Client = void 0;
    var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
    var _inherits2 = _interopRequireDefault(require_inherits());
    var _possibleConstructorReturn2 = _interopRequireDefault(require_possibleConstructorReturn());
    var _getPrototypeOf2 = _interopRequireDefault(require_getPrototypeOf());
    var _websocket = _interopRequireDefault(require_websocket_browser());
    var _client = _interopRequireDefault(require_client());
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = (0, _getPrototypeOf2["default"])(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return (0, _possibleConstructorReturn2["default"])(this, result);
      };
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    var Client2 = /* @__PURE__ */ function(_CommonClient) {
      (0, _inherits2["default"])(Client3, _CommonClient);
      var _super = _createSuper(Client3);
      function Client3() {
        var address = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "ws://localhost:8080";
        var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$autoconnect = _ref.autoconnect, autoconnect = _ref$autoconnect === void 0 ? true : _ref$autoconnect, _ref$reconnect = _ref.reconnect, reconnect = _ref$reconnect === void 0 ? true : _ref$reconnect, _ref$reconnect_interv = _ref.reconnect_interval, reconnect_interval = _ref$reconnect_interv === void 0 ? 1e3 : _ref$reconnect_interv, _ref$max_reconnects = _ref.max_reconnects, max_reconnects = _ref$max_reconnects === void 0 ? 5 : _ref$max_reconnects;
        var generate_request_id = arguments.length > 2 ? arguments[2] : void 0;
        (0, _classCallCheck2["default"])(this, Client3);
        return _super.call(this, _websocket["default"], address, {
          autoconnect,
          reconnect,
          reconnect_interval,
          max_reconnects
        }, generate_request_id);
      }
      return Client3;
    }(_client["default"]);
    exports.Client = Client2;
  }
});

// node_modules/jayson/lib/generateRequest.js
var require_generateRequest = __commonJS({
  "node_modules/jayson/lib/generateRequest.js"(exports, module) {
    init_react();
    "use strict";
    var uuid = (init_esm_browser(), esm_browser_exports).v4;
    var generateRequest = function(method, params, id, options) {
      if (typeof method !== "string") {
        throw new TypeError(method + " must be a string");
      }
      options = options || {};
      const version2 = typeof options.version === "number" ? options.version : 2;
      if (version2 !== 1 && version2 !== 2) {
        throw new TypeError(version2 + " must be 1 or 2");
      }
      const request = {
        method
      };
      if (version2 === 2) {
        request.jsonrpc = "2.0";
      }
      if (params) {
        if (typeof params !== "object" && !Array.isArray(params)) {
          throw new TypeError(params + " must be an object, array or omitted");
        }
        request.params = params;
      }
      if (typeof id === "undefined") {
        const generator = typeof options.generator === "function" ? options.generator : function() {
          return uuid();
        };
        request.id = generator(request, options);
      } else if (version2 === 2 && id === null) {
        if (options.notificationIdNull) {
          request.id = null;
        }
      } else {
        request.id = id;
      }
      return request;
    };
    module.exports = generateRequest;
  }
});

// node_modules/jayson/lib/client/browser/index.js
var require_browser = __commonJS({
  "node_modules/jayson/lib/client/browser/index.js"(exports, module) {
    init_react();
    "use strict";
    var uuid = (init_esm_browser(), esm_browser_exports).v4;
    var generateRequest = require_generateRequest();
    var ClientBrowser = function(callServer, options) {
      if (!(this instanceof ClientBrowser)) {
        return new ClientBrowser(callServer, options);
      }
      if (!options) {
        options = {};
      }
      this.options = {
        reviver: typeof options.reviver !== "undefined" ? options.reviver : null,
        replacer: typeof options.replacer !== "undefined" ? options.replacer : null,
        generator: typeof options.generator !== "undefined" ? options.generator : function() {
          return uuid();
        },
        version: typeof options.version !== "undefined" ? options.version : 2,
        notificationIdNull: typeof options.notificationIdNull === "boolean" ? options.notificationIdNull : false
      };
      this.callServer = callServer;
    };
    module.exports = ClientBrowser;
    ClientBrowser.prototype.request = function(method, params, id, callback) {
      const self2 = this;
      let request = null;
      const isBatch = Array.isArray(method) && typeof params === "function";
      if (this.options.version === 1 && isBatch) {
        throw new TypeError("JSON-RPC 1.0 does not support batching");
      }
      const isRaw = !isBatch && method && typeof method === "object" && typeof params === "function";
      if (isBatch || isRaw) {
        callback = params;
        request = method;
      } else {
        if (typeof id === "function") {
          callback = id;
          id = void 0;
        }
        const hasCallback = typeof callback === "function";
        try {
          request = generateRequest(method, params, id, {
            generator: this.options.generator,
            version: this.options.version,
            notificationIdNull: this.options.notificationIdNull
          });
        } catch (err) {
          if (hasCallback) {
            return callback(err);
          }
          throw err;
        }
        if (!hasCallback) {
          return request;
        }
      }
      let message;
      try {
        message = JSON.stringify(request, this.options.replacer);
      } catch (err) {
        return callback(err);
      }
      this.callServer(message, function(err, response) {
        self2._parseResponse(err, response, callback);
      });
      return request;
    };
    ClientBrowser.prototype._parseResponse = function(err, responseText, callback) {
      if (err) {
        callback(err);
        return;
      }
      if (!responseText) {
        return callback();
      }
      let response;
      try {
        response = JSON.parse(responseText, this.options.reviver);
      } catch (err2) {
        return callback(err2);
      }
      if (callback.length === 3) {
        if (Array.isArray(response)) {
          const isError = function(res) {
            return typeof res.error !== "undefined";
          };
          const isNotError = function(res) {
            return !isError(res);
          };
          return callback(null, response.filter(isError), response.filter(isNotError));
        } else {
          return callback(null, response.error, response.result);
        }
      }
      callback(null, response);
    };
  }
});

// node_modules/@solana/web3.js/node_modules/secp256k1/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/@solana/web3.js/node_modules/secp256k1/lib/index.js"(exports, module) {
    init_react();
    var errors = {
      IMPOSSIBLE_CASE: "Impossible case. Please create issue.",
      TWEAK_ADD: "The tweak was out of range or the resulted private key is invalid",
      TWEAK_MUL: "The tweak was out of range or equal to zero",
      CONTEXT_RANDOMIZE_UNKNOW: "Unknow error on context randomization",
      SECKEY_INVALID: "Private Key is invalid",
      PUBKEY_PARSE: "Public Key could not be parsed",
      PUBKEY_SERIALIZE: "Public Key serialization error",
      PUBKEY_COMBINE: "The sum of the public keys is not valid",
      SIG_PARSE: "Signature could not be parsed",
      SIGN: "The nonce generation function failed, or the private key was invalid",
      RECOVER: "Public key could not be recover",
      ECDH: "Scalar was invalid (zero or overflow)"
    };
    function assert3(cond, msg) {
      if (!cond)
        throw new Error(msg);
    }
    function isUint8Array(name, value, length) {
      assert3(value instanceof Uint8Array, `Expected ${name} to be an Uint8Array`);
      if (length !== void 0) {
        if (Array.isArray(length)) {
          const numbers = length.join(", ");
          const msg = `Expected ${name} to be an Uint8Array with length [${numbers}]`;
          assert3(length.includes(value.length), msg);
        } else {
          const msg = `Expected ${name} to be an Uint8Array with length ${length}`;
          assert3(value.length === length, msg);
        }
      }
    }
    function isCompressed(value) {
      assert3(toTypeString(value) === "Boolean", "Expected compressed to be a Boolean");
    }
    function getAssertedOutput(output = (len) => new Uint8Array(len), length) {
      if (typeof output === "function")
        output = output(length);
      isUint8Array("output", output, length);
      return output;
    }
    function toTypeString(value) {
      return Object.prototype.toString.call(value).slice(8, -1);
    }
    module.exports = (secp256k12) => {
      return {
        contextRandomize(seed) {
          assert3(seed === null || seed instanceof Uint8Array, "Expected seed to be an Uint8Array or null");
          if (seed !== null)
            isUint8Array("seed", seed, 32);
          switch (secp256k12.contextRandomize(seed)) {
            case 1:
              throw new Error(errors.CONTEXT_RANDOMIZE_UNKNOW);
          }
        },
        privateKeyVerify(seckey) {
          isUint8Array("private key", seckey, 32);
          return secp256k12.privateKeyVerify(seckey) === 0;
        },
        privateKeyNegate(seckey) {
          isUint8Array("private key", seckey, 32);
          switch (secp256k12.privateKeyNegate(seckey)) {
            case 0:
              return seckey;
            case 1:
              throw new Error(errors.IMPOSSIBLE_CASE);
          }
        },
        privateKeyTweakAdd(seckey, tweak) {
          isUint8Array("private key", seckey, 32);
          isUint8Array("tweak", tweak, 32);
          switch (secp256k12.privateKeyTweakAdd(seckey, tweak)) {
            case 0:
              return seckey;
            case 1:
              throw new Error(errors.TWEAK_ADD);
          }
        },
        privateKeyTweakMul(seckey, tweak) {
          isUint8Array("private key", seckey, 32);
          isUint8Array("tweak", tweak, 32);
          switch (secp256k12.privateKeyTweakMul(seckey, tweak)) {
            case 0:
              return seckey;
            case 1:
              throw new Error(errors.TWEAK_MUL);
          }
        },
        publicKeyVerify(pubkey) {
          isUint8Array("public key", pubkey, [33, 65]);
          return secp256k12.publicKeyVerify(pubkey) === 0;
        },
        publicKeyCreate(seckey, compressed = true, output) {
          isUint8Array("private key", seckey, 32);
          isCompressed(compressed);
          output = getAssertedOutput(output, compressed ? 33 : 65);
          switch (secp256k12.publicKeyCreate(output, seckey)) {
            case 0:
              return output;
            case 1:
              throw new Error(errors.SECKEY_INVALID);
            case 2:
              throw new Error(errors.PUBKEY_SERIALIZE);
          }
        },
        publicKeyConvert(pubkey, compressed = true, output) {
          isUint8Array("public key", pubkey, [33, 65]);
          isCompressed(compressed);
          output = getAssertedOutput(output, compressed ? 33 : 65);
          switch (secp256k12.publicKeyConvert(output, pubkey)) {
            case 0:
              return output;
            case 1:
              throw new Error(errors.PUBKEY_PARSE);
            case 2:
              throw new Error(errors.PUBKEY_SERIALIZE);
          }
        },
        publicKeyNegate(pubkey, compressed = true, output) {
          isUint8Array("public key", pubkey, [33, 65]);
          isCompressed(compressed);
          output = getAssertedOutput(output, compressed ? 33 : 65);
          switch (secp256k12.publicKeyNegate(output, pubkey)) {
            case 0:
              return output;
            case 1:
              throw new Error(errors.PUBKEY_PARSE);
            case 2:
              throw new Error(errors.IMPOSSIBLE_CASE);
            case 3:
              throw new Error(errors.PUBKEY_SERIALIZE);
          }
        },
        publicKeyCombine(pubkeys, compressed = true, output) {
          assert3(Array.isArray(pubkeys), "Expected public keys to be an Array");
          assert3(pubkeys.length > 0, "Expected public keys array will have more than zero items");
          for (const pubkey of pubkeys) {
            isUint8Array("public key", pubkey, [33, 65]);
          }
          isCompressed(compressed);
          output = getAssertedOutput(output, compressed ? 33 : 65);
          switch (secp256k12.publicKeyCombine(output, pubkeys)) {
            case 0:
              return output;
            case 1:
              throw new Error(errors.PUBKEY_PARSE);
            case 2:
              throw new Error(errors.PUBKEY_COMBINE);
            case 3:
              throw new Error(errors.PUBKEY_SERIALIZE);
          }
        },
        publicKeyTweakAdd(pubkey, tweak, compressed = true, output) {
          isUint8Array("public key", pubkey, [33, 65]);
          isUint8Array("tweak", tweak, 32);
          isCompressed(compressed);
          output = getAssertedOutput(output, compressed ? 33 : 65);
          switch (secp256k12.publicKeyTweakAdd(output, pubkey, tweak)) {
            case 0:
              return output;
            case 1:
              throw new Error(errors.PUBKEY_PARSE);
            case 2:
              throw new Error(errors.TWEAK_ADD);
          }
        },
        publicKeyTweakMul(pubkey, tweak, compressed = true, output) {
          isUint8Array("public key", pubkey, [33, 65]);
          isUint8Array("tweak", tweak, 32);
          isCompressed(compressed);
          output = getAssertedOutput(output, compressed ? 33 : 65);
          switch (secp256k12.publicKeyTweakMul(output, pubkey, tweak)) {
            case 0:
              return output;
            case 1:
              throw new Error(errors.PUBKEY_PARSE);
            case 2:
              throw new Error(errors.TWEAK_MUL);
          }
        },
        signatureNormalize(sig) {
          isUint8Array("signature", sig, 64);
          switch (secp256k12.signatureNormalize(sig)) {
            case 0:
              return sig;
            case 1:
              throw new Error(errors.SIG_PARSE);
          }
        },
        signatureExport(sig, output) {
          isUint8Array("signature", sig, 64);
          output = getAssertedOutput(output, 72);
          const obj = { output, outputlen: 72 };
          switch (secp256k12.signatureExport(obj, sig)) {
            case 0:
              return output.slice(0, obj.outputlen);
            case 1:
              throw new Error(errors.SIG_PARSE);
            case 2:
              throw new Error(errors.IMPOSSIBLE_CASE);
          }
        },
        signatureImport(sig, output) {
          isUint8Array("signature", sig);
          output = getAssertedOutput(output, 64);
          switch (secp256k12.signatureImport(output, sig)) {
            case 0:
              return output;
            case 1:
              throw new Error(errors.SIG_PARSE);
            case 2:
              throw new Error(errors.IMPOSSIBLE_CASE);
          }
        },
        ecdsaSign(msg32, seckey, options = {}, output) {
          isUint8Array("message", msg32, 32);
          isUint8Array("private key", seckey, 32);
          assert3(toTypeString(options) === "Object", "Expected options to be an Object");
          if (options.data !== void 0)
            isUint8Array("options.data", options.data);
          if (options.noncefn !== void 0)
            assert3(toTypeString(options.noncefn) === "Function", "Expected options.noncefn to be a Function");
          output = getAssertedOutput(output, 64);
          const obj = { signature: output, recid: null };
          switch (secp256k12.ecdsaSign(obj, msg32, seckey, options.data, options.noncefn)) {
            case 0:
              return obj;
            case 1:
              throw new Error(errors.SIGN);
            case 2:
              throw new Error(errors.IMPOSSIBLE_CASE);
          }
        },
        ecdsaVerify(sig, msg32, pubkey) {
          isUint8Array("signature", sig, 64);
          isUint8Array("message", msg32, 32);
          isUint8Array("public key", pubkey, [33, 65]);
          switch (secp256k12.ecdsaVerify(sig, msg32, pubkey)) {
            case 0:
              return true;
            case 3:
              return false;
            case 1:
              throw new Error(errors.SIG_PARSE);
            case 2:
              throw new Error(errors.PUBKEY_PARSE);
          }
        },
        ecdsaRecover(sig, recid, msg32, compressed = true, output) {
          isUint8Array("signature", sig, 64);
          assert3(toTypeString(recid) === "Number" && recid >= 0 && recid <= 3, "Expected recovery id to be a Number within interval [0, 3]");
          isUint8Array("message", msg32, 32);
          isCompressed(compressed);
          output = getAssertedOutput(output, compressed ? 33 : 65);
          switch (secp256k12.ecdsaRecover(output, sig, recid, msg32)) {
            case 0:
              return output;
            case 1:
              throw new Error(errors.SIG_PARSE);
            case 2:
              throw new Error(errors.RECOVER);
            case 3:
              throw new Error(errors.IMPOSSIBLE_CASE);
          }
        },
        ecdh(pubkey, seckey, options = {}, output) {
          isUint8Array("public key", pubkey, [33, 65]);
          isUint8Array("private key", seckey, 32);
          assert3(toTypeString(options) === "Object", "Expected options to be an Object");
          if (options.data !== void 0)
            isUint8Array("options.data", options.data);
          if (options.hashfn !== void 0) {
            assert3(toTypeString(options.hashfn) === "Function", "Expected options.hashfn to be a Function");
            if (options.xbuf !== void 0)
              isUint8Array("options.xbuf", options.xbuf, 32);
            if (options.ybuf !== void 0)
              isUint8Array("options.ybuf", options.ybuf, 32);
            isUint8Array("output", output);
          } else {
            output = getAssertedOutput(output, 32);
          }
          switch (secp256k12.ecdh(output, pubkey, seckey, options.data, options.hashfn, options.xbuf, options.ybuf)) {
            case 0:
              return output;
            case 1:
              throw new Error(errors.PUBKEY_PARSE);
            case 2:
              throw new Error(errors.ECDH);
          }
        }
      };
    };
  }
});

// node_modules/@solana/web3.js/node_modules/secp256k1/lib/elliptic.js
var require_elliptic2 = __commonJS({
  "node_modules/@solana/web3.js/node_modules/secp256k1/lib/elliptic.js"(exports, module) {
    init_react();
    var EC = require_elliptic().ec;
    var ec = new EC("secp256k1");
    var ecparams = ec.curve;
    var BN2 = ecparams.n.constructor;
    function loadCompressedPublicKey(first, xbuf) {
      let x = new BN2(xbuf);
      if (x.cmp(ecparams.p) >= 0)
        return null;
      x = x.toRed(ecparams.red);
      let y = x.redSqr().redIMul(x).redIAdd(ecparams.b).redSqrt();
      if (first === 3 !== y.isOdd())
        y = y.redNeg();
      return ec.keyPair({ pub: { x, y } });
    }
    function loadUncompressedPublicKey(first, xbuf, ybuf) {
      let x = new BN2(xbuf);
      let y = new BN2(ybuf);
      if (x.cmp(ecparams.p) >= 0 || y.cmp(ecparams.p) >= 0)
        return null;
      x = x.toRed(ecparams.red);
      y = y.toRed(ecparams.red);
      if ((first === 6 || first === 7) && y.isOdd() !== (first === 7))
        return null;
      const x3 = x.redSqr().redIMul(x);
      if (!y.redSqr().redISub(x3.redIAdd(ecparams.b)).isZero())
        return null;
      return ec.keyPair({ pub: { x, y } });
    }
    function loadPublicKey(pubkey) {
      const first = pubkey[0];
      switch (first) {
        case 2:
        case 3:
          if (pubkey.length !== 33)
            return null;
          return loadCompressedPublicKey(first, pubkey.subarray(1, 33));
        case 4:
        case 6:
        case 7:
          if (pubkey.length !== 65)
            return null;
          return loadUncompressedPublicKey(first, pubkey.subarray(1, 33), pubkey.subarray(33, 65));
        default:
          return null;
      }
    }
    function savePublicKey(output, point) {
      const pubkey = point.encode(null, output.length === 33);
      for (let i = 0; i < output.length; ++i)
        output[i] = pubkey[i];
    }
    module.exports = {
      contextRandomize() {
        return 0;
      },
      privateKeyVerify(seckey) {
        const bn = new BN2(seckey);
        return bn.cmp(ecparams.n) < 0 && !bn.isZero() ? 0 : 1;
      },
      privateKeyNegate(seckey) {
        const bn = new BN2(seckey);
        const negate = ecparams.n.sub(bn).umod(ecparams.n).toArrayLike(Uint8Array, "be", 32);
        seckey.set(negate);
        return 0;
      },
      privateKeyTweakAdd(seckey, tweak) {
        const bn = new BN2(tweak);
        if (bn.cmp(ecparams.n) >= 0)
          return 1;
        bn.iadd(new BN2(seckey));
        if (bn.cmp(ecparams.n) >= 0)
          bn.isub(ecparams.n);
        if (bn.isZero())
          return 1;
        const tweaked = bn.toArrayLike(Uint8Array, "be", 32);
        seckey.set(tweaked);
        return 0;
      },
      privateKeyTweakMul(seckey, tweak) {
        let bn = new BN2(tweak);
        if (bn.cmp(ecparams.n) >= 0 || bn.isZero())
          return 1;
        bn.imul(new BN2(seckey));
        if (bn.cmp(ecparams.n) >= 0)
          bn = bn.umod(ecparams.n);
        const tweaked = bn.toArrayLike(Uint8Array, "be", 32);
        seckey.set(tweaked);
        return 0;
      },
      publicKeyVerify(pubkey) {
        const pair = loadPublicKey(pubkey);
        return pair === null ? 1 : 0;
      },
      publicKeyCreate(output, seckey) {
        const bn = new BN2(seckey);
        if (bn.cmp(ecparams.n) >= 0 || bn.isZero())
          return 1;
        const point = ec.keyFromPrivate(seckey).getPublic();
        savePublicKey(output, point);
        return 0;
      },
      publicKeyConvert(output, pubkey) {
        const pair = loadPublicKey(pubkey);
        if (pair === null)
          return 1;
        const point = pair.getPublic();
        savePublicKey(output, point);
        return 0;
      },
      publicKeyNegate(output, pubkey) {
        const pair = loadPublicKey(pubkey);
        if (pair === null)
          return 1;
        const point = pair.getPublic();
        point.y = point.y.redNeg();
        savePublicKey(output, point);
        return 0;
      },
      publicKeyCombine(output, pubkeys) {
        const pairs = new Array(pubkeys.length);
        for (let i = 0; i < pubkeys.length; ++i) {
          pairs[i] = loadPublicKey(pubkeys[i]);
          if (pairs[i] === null)
            return 1;
        }
        let point = pairs[0].getPublic();
        for (let i = 1; i < pairs.length; ++i)
          point = point.add(pairs[i].pub);
        if (point.isInfinity())
          return 2;
        savePublicKey(output, point);
        return 0;
      },
      publicKeyTweakAdd(output, pubkey, tweak) {
        const pair = loadPublicKey(pubkey);
        if (pair === null)
          return 1;
        tweak = new BN2(tweak);
        if (tweak.cmp(ecparams.n) >= 0)
          return 2;
        const point = pair.getPublic().add(ecparams.g.mul(tweak));
        if (point.isInfinity())
          return 2;
        savePublicKey(output, point);
        return 0;
      },
      publicKeyTweakMul(output, pubkey, tweak) {
        const pair = loadPublicKey(pubkey);
        if (pair === null)
          return 1;
        tweak = new BN2(tweak);
        if (tweak.cmp(ecparams.n) >= 0 || tweak.isZero())
          return 2;
        const point = pair.getPublic().mul(tweak);
        savePublicKey(output, point);
        return 0;
      },
      signatureNormalize(sig) {
        const r2 = new BN2(sig.subarray(0, 32));
        const s2 = new BN2(sig.subarray(32, 64));
        if (r2.cmp(ecparams.n) >= 0 || s2.cmp(ecparams.n) >= 0)
          return 1;
        if (s2.cmp(ec.nh) === 1) {
          sig.set(ecparams.n.sub(s2).toArrayLike(Uint8Array, "be", 32), 32);
        }
        return 0;
      },
      signatureExport(obj, sig) {
        const sigR = sig.subarray(0, 32);
        const sigS = sig.subarray(32, 64);
        if (new BN2(sigR).cmp(ecparams.n) >= 0)
          return 1;
        if (new BN2(sigS).cmp(ecparams.n) >= 0)
          return 1;
        const { output } = obj;
        let r2 = output.subarray(4, 4 + 33);
        r2[0] = 0;
        r2.set(sigR, 1);
        let lenR = 33;
        let posR = 0;
        for (; lenR > 1 && r2[posR] === 0 && !(r2[posR + 1] & 128); --lenR, ++posR)
          ;
        r2 = r2.subarray(posR);
        if (r2[0] & 128)
          return 1;
        if (lenR > 1 && r2[0] === 0 && !(r2[1] & 128))
          return 1;
        let s2 = output.subarray(6 + 33, 6 + 33 + 33);
        s2[0] = 0;
        s2.set(sigS, 1);
        let lenS = 33;
        let posS = 0;
        for (; lenS > 1 && s2[posS] === 0 && !(s2[posS + 1] & 128); --lenS, ++posS)
          ;
        s2 = s2.subarray(posS);
        if (s2[0] & 128)
          return 1;
        if (lenS > 1 && s2[0] === 0 && !(s2[1] & 128))
          return 1;
        obj.outputlen = 6 + lenR + lenS;
        output[0] = 48;
        output[1] = obj.outputlen - 2;
        output[2] = 2;
        output[3] = r2.length;
        output.set(r2, 4);
        output[4 + lenR] = 2;
        output[5 + lenR] = s2.length;
        output.set(s2, 6 + lenR);
        return 0;
      },
      signatureImport(output, sig) {
        if (sig.length < 8)
          return 1;
        if (sig.length > 72)
          return 1;
        if (sig[0] !== 48)
          return 1;
        if (sig[1] !== sig.length - 2)
          return 1;
        if (sig[2] !== 2)
          return 1;
        const lenR = sig[3];
        if (lenR === 0)
          return 1;
        if (5 + lenR >= sig.length)
          return 1;
        if (sig[4 + lenR] !== 2)
          return 1;
        const lenS = sig[5 + lenR];
        if (lenS === 0)
          return 1;
        if (6 + lenR + lenS !== sig.length)
          return 1;
        if (sig[4] & 128)
          return 1;
        if (lenR > 1 && sig[4] === 0 && !(sig[5] & 128))
          return 1;
        if (sig[lenR + 6] & 128)
          return 1;
        if (lenS > 1 && sig[lenR + 6] === 0 && !(sig[lenR + 7] & 128))
          return 1;
        let sigR = sig.subarray(4, 4 + lenR);
        if (sigR.length === 33 && sigR[0] === 0)
          sigR = sigR.subarray(1);
        if (sigR.length > 32)
          return 1;
        let sigS = sig.subarray(6 + lenR);
        if (sigS.length === 33 && sigS[0] === 0)
          sigS = sigS.slice(1);
        if (sigS.length > 32)
          throw new Error("S length is too long");
        let r2 = new BN2(sigR);
        if (r2.cmp(ecparams.n) >= 0)
          r2 = new BN2(0);
        let s2 = new BN2(sig.subarray(6 + lenR));
        if (s2.cmp(ecparams.n) >= 0)
          s2 = new BN2(0);
        output.set(r2.toArrayLike(Uint8Array, "be", 32), 0);
        output.set(s2.toArrayLike(Uint8Array, "be", 32), 32);
        return 0;
      },
      ecdsaSign(obj, message, seckey, data, noncefn) {
        if (noncefn) {
          const _noncefn = noncefn;
          noncefn = (counter) => {
            const nonce = _noncefn(message, seckey, null, data, counter);
            const isValid = nonce instanceof Uint8Array && nonce.length === 32;
            if (!isValid)
              throw new Error("This is the way");
            return new BN2(nonce);
          };
        }
        const d = new BN2(seckey);
        if (d.cmp(ecparams.n) >= 0 || d.isZero())
          return 1;
        let sig;
        try {
          sig = ec.sign(message, seckey, { canonical: true, k: noncefn, pers: data });
        } catch (err) {
          return 1;
        }
        obj.signature.set(sig.r.toArrayLike(Uint8Array, "be", 32), 0);
        obj.signature.set(sig.s.toArrayLike(Uint8Array, "be", 32), 32);
        obj.recid = sig.recoveryParam;
        return 0;
      },
      ecdsaVerify(sig, msg32, pubkey) {
        const sigObj = { r: sig.subarray(0, 32), s: sig.subarray(32, 64) };
        const sigr = new BN2(sigObj.r);
        const sigs = new BN2(sigObj.s);
        if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0)
          return 1;
        if (sigs.cmp(ec.nh) === 1 || sigr.isZero() || sigs.isZero())
          return 3;
        const pair = loadPublicKey(pubkey);
        if (pair === null)
          return 2;
        const point = pair.getPublic();
        const isValid = ec.verify(msg32, sigObj, point);
        return isValid ? 0 : 3;
      },
      ecdsaRecover(output, sig, recid, msg32) {
        const sigObj = { r: sig.slice(0, 32), s: sig.slice(32, 64) };
        const sigr = new BN2(sigObj.r);
        const sigs = new BN2(sigObj.s);
        if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0)
          return 1;
        if (sigr.isZero() || sigs.isZero())
          return 2;
        let point;
        try {
          point = ec.recoverPubKey(msg32, sigObj, recid);
        } catch (err) {
          return 2;
        }
        savePublicKey(output, point);
        return 0;
      },
      ecdh(output, pubkey, seckey, data, hashfn, xbuf, ybuf) {
        const pair = loadPublicKey(pubkey);
        if (pair === null)
          return 1;
        const scalar = new BN2(seckey);
        if (scalar.cmp(ecparams.n) >= 0 || scalar.isZero())
          return 2;
        const point = pair.getPublic().mul(scalar);
        if (hashfn === void 0) {
          const data2 = point.encode(null, true);
          const sha2562 = ec.hash().update(data2).digest();
          for (let i = 0; i < 32; ++i)
            output[i] = sha2562[i];
        } else {
          if (!xbuf)
            xbuf = new Uint8Array(32);
          const x = point.getX().toArray("be", 32);
          for (let i = 0; i < 32; ++i)
            xbuf[i] = x[i];
          if (!ybuf)
            ybuf = new Uint8Array(32);
          const y = point.getY().toArray("be", 32);
          for (let i = 0; i < 32; ++i)
            ybuf[i] = y[i];
          const hash2 = hashfn(xbuf, ybuf, data);
          const isValid = hash2 instanceof Uint8Array && hash2.length === output.length;
          if (!isValid)
            return 2;
          output.set(hash2);
        }
        return 0;
      }
    };
  }
});

// node_modules/@solana/web3.js/node_modules/secp256k1/elliptic.js
var require_elliptic3 = __commonJS({
  "node_modules/@solana/web3.js/node_modules/secp256k1/elliptic.js"(exports, module) {
    init_react();
    module.exports = require_lib2()(require_elliptic2());
  }
});

// node_modules/@solana/web3.js/lib/index.browser.esm.js
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function assert$6(val, msg) {
  if (!val)
    throw new Error(msg || "Assertion failed");
}
function isSurrogatePair(msg, i) {
  if ((msg.charCodeAt(i) & 64512) !== 55296) {
    return false;
  }
  if (i < 0 || i + 1 >= msg.length) {
    return false;
  }
  return (msg.charCodeAt(i + 1) & 64512) === 56320;
}
function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === "string") {
    if (!enc) {
      var p = 0;
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        if (c < 128) {
          res[p++] = c;
        } else if (c < 2048) {
          res[p++] = c >> 6 | 192;
          res[p++] = c & 63 | 128;
        } else if (isSurrogatePair(msg, i)) {
          c = 65536 + ((c & 1023) << 10) + (msg.charCodeAt(++i) & 1023);
          res[p++] = c >> 18 | 240;
          res[p++] = c >> 12 & 63 | 128;
          res[p++] = c >> 6 & 63 | 128;
          res[p++] = c & 63 | 128;
        } else {
          res[p++] = c >> 12 | 224;
          res[p++] = c >> 6 & 63 | 128;
          res[p++] = c & 63 | 128;
        }
      }
    } else if (enc === "hex") {
      msg = msg.replace(/[^a-z0-9]+/ig, "");
      if (msg.length % 2 !== 0)
        msg = "0" + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
function toHex(msg) {
  var res = "";
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
function htonl(w) {
  var res = w >>> 24 | w >>> 8 & 65280 | w << 8 & 16711680 | (w & 255) << 24;
  return res >>> 0;
}
function toHex32(msg, endian) {
  var res = "";
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === "little")
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
function zero2(word) {
  if (word.length === 1)
    return "0" + word;
  else
    return word;
}
function zero8(word) {
  if (word.length === 7)
    return "0" + word;
  else if (word.length === 6)
    return "00" + word;
  else if (word.length === 5)
    return "000" + word;
  else if (word.length === 4)
    return "0000" + word;
  else if (word.length === 3)
    return "00000" + word;
  else if (word.length === 2)
    return "000000" + word;
  else if (word.length === 1)
    return "0000000" + word;
  else
    return word;
}
function join32(msg, start, end, endian) {
  var len = end - start;
  assert$5(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === "big")
      w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];
    else
      w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === "big") {
      res[k] = m >>> 24;
      res[k + 1] = m >>> 16 & 255;
      res[k + 2] = m >>> 8 & 255;
      res[k + 3] = m & 255;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = m >>> 16 & 255;
      res[k + 1] = m >>> 8 & 255;
      res[k] = m & 255;
    }
  }
  return res;
}
function rotr32$1(w, b) {
  return w >>> b | w << 32 - b;
}
function rotl32$2(w, b) {
  return w << b | w >>> 32 - b;
}
function sum32$3(a, b) {
  return a + b >>> 0;
}
function sum32_3$1(a, b, c) {
  return a + b + c >>> 0;
}
function sum32_4$2(a, b, c, d) {
  return a + b + c + d >>> 0;
}
function sum32_5$2(a, b, c, d, e) {
  return a + b + c + d + e >>> 0;
}
function sum64$1(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];
  var lo = al + bl >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
function sum64_hi$1(ah, al, bh, bl) {
  var lo = al + bl >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
function sum64_lo$1(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
function sum64_4_hi$1(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = lo + bl >>> 0;
  carry += lo < al ? 1 : 0;
  lo = lo + cl >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = lo + dl >>> 0;
  carry += lo < dl ? 1 : 0;
  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
function sum64_4_lo$1(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
function sum64_5_hi$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = lo + bl >>> 0;
  carry += lo < al ? 1 : 0;
  lo = lo + cl >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = lo + dl >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = lo + el >>> 0;
  carry += lo < el ? 1 : 0;
  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
function sum64_5_lo$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;
  return lo >>> 0;
}
function rotr64_hi$1(ah, al, num) {
  var r2 = al << 32 - num | ah >>> num;
  return r2 >>> 0;
}
function rotr64_lo$1(ah, al, num) {
  var r2 = ah << 32 - num | al >>> num;
  return r2 >>> 0;
}
function shr64_hi$1(ah, al, num) {
  return ah >>> num;
}
function shr64_lo$1(ah, al, num) {
  var r2 = ah << 32 - num | al >>> num;
  return r2 >>> 0;
}
function BlockHash$4() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = "big";
  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
function ft_1$1(s2, x, y, z) {
  if (s2 === 0)
    return ch32$1(x, y, z);
  if (s2 === 1 || s2 === 3)
    return p32(x, y, z);
  if (s2 === 2)
    return maj32$1(x, y, z);
}
function ch32$1(x, y, z) {
  return x & y ^ ~x & z;
}
function maj32$1(x, y, z) {
  return x & y ^ x & z ^ y & z;
}
function p32(x, y, z) {
  return x ^ y ^ z;
}
function s0_256$1(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
function s1_256$1(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
function g0_256$1(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ x >>> 3;
}
function g1_256$1(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ x >>> 10;
}
function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();
  BlockHash$3.call(this);
  this.h = [
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ];
  this.W = new Array(80);
}
function SHA256$1() {
  if (!(this instanceof SHA256$1))
    return new SHA256$1();
  BlockHash$2.call(this);
  this.h = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
function SHA224() {
  if (!(this instanceof SHA224))
    return new SHA224();
  SHA256.call(this);
  this.h = [
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ];
}
function SHA512$1() {
  if (!(this instanceof SHA512$1))
    return new SHA512$1();
  BlockHash$1.call(this);
  this.h = [
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ];
  this.k = sha512_K;
  this.W = new Array(160);
}
function ch64_hi(xh, xl, yh, yl, zh) {
  var r2 = xh & yh ^ ~xh & zh;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r2 = xl & yl ^ ~xl & zl;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function maj64_hi(xh, xl, yh, yl, zh) {
  var r2 = xh & yh ^ xh & zh ^ yh & zh;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r2 = xl & yl ^ xl & zl ^ yl & zl;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 28);
  var c1_hi = rotr64_hi(xl, xh, 2);
  var c2_hi = rotr64_hi(xl, xh, 7);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 28);
  var c1_lo = rotr64_lo(xl, xh, 2);
  var c2_lo = rotr64_lo(xl, xh, 7);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 14);
  var c1_hi = rotr64_hi(xh, xl, 18);
  var c2_hi = rotr64_hi(xl, xh, 9);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 14);
  var c1_lo = rotr64_lo(xh, xl, 18);
  var c2_lo = rotr64_lo(xl, xh, 9);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 1);
  var c1_hi = rotr64_hi(xh, xl, 8);
  var c2_hi = shr64_hi(xh, xl, 7);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 1);
  var c1_lo = rotr64_lo(xh, xl, 8);
  var c2_lo = shr64_lo(xh, xl, 7);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 19);
  var c1_hi = rotr64_hi(xl, xh, 29);
  var c2_hi = shr64_hi(xh, xl, 6);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 19);
  var c1_lo = rotr64_lo(xl, xh, 29);
  var c2_lo = shr64_lo(xh, xl, 6);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function SHA384() {
  if (!(this instanceof SHA384))
    return new SHA384();
  SHA512.call(this);
  this.h = [
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ];
}
function RIPEMD160() {
  if (!(this instanceof RIPEMD160))
    return new RIPEMD160();
  BlockHash.call(this);
  this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  this.endian = "little";
}
function f(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return x & y | ~x & z;
  else if (j <= 47)
    return (x | ~y) ^ z;
  else if (j <= 63)
    return x & z | y & ~z;
  else
    return x ^ (y | ~z);
}
function K(j) {
  if (j <= 15)
    return 0;
  else if (j <= 31)
    return 1518500249;
  else if (j <= 47)
    return 1859775393;
  else if (j <= 63)
    return 2400959708;
  else
    return 2840853838;
}
function Kh(j) {
  if (j <= 15)
    return 1352829926;
  else if (j <= 31)
    return 1548603684;
  else if (j <= 47)
    return 1836072691;
  else if (j <= 63)
    return 2053994217;
  else
    return 0;
}
function Hmac(hash2, key, enc) {
  if (!(this instanceof Hmac))
    return new Hmac(hash2, key, enc);
  this.Hash = hash2;
  this.blockSize = hash2.blockSize / 8;
  this.outSize = hash2.outSize / 8;
  this.inner = null;
  this.outer = null;
  this._init(utils.toArray(key, enc));
}
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
function isHexable(value) {
  return !!value.toHexString;
}
function addSlice(array2) {
  if (array2.slice) {
    return array2;
  }
  array2.slice = function() {
    const args = Array.prototype.slice.call(arguments);
    return addSlice(new Uint8Array(Array.prototype.slice.apply(array2, args)));
  };
  return array2;
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
function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}
function sha256(data) {
  return "0x" + hash.sha256().update(arrayify(data)).digest("hex");
}
function isPublicKeyData(value) {
  return value._bn !== void 0;
}
function is_on_curve(p) {
  var r2 = [naclLowLevel.gf(), naclLowLevel.gf(), naclLowLevel.gf(), naclLowLevel.gf()];
  var t = naclLowLevel.gf(), chk = naclLowLevel.gf(), num = naclLowLevel.gf(), den = naclLowLevel.gf(), den2 = naclLowLevel.gf(), den4 = naclLowLevel.gf(), den6 = naclLowLevel.gf();
  naclLowLevel.set25519(r2[2], gf1);
  naclLowLevel.unpack25519(r2[1], p);
  naclLowLevel.S(num, r2[1]);
  naclLowLevel.M(den, num, naclLowLevel.D);
  naclLowLevel.Z(num, num, r2[2]);
  naclLowLevel.A(den, r2[2], den);
  naclLowLevel.S(den2, den);
  naclLowLevel.S(den4, den2);
  naclLowLevel.M(den6, den4, den2);
  naclLowLevel.M(t, den6, num);
  naclLowLevel.M(t, t, den);
  naclLowLevel.pow2523(t, t);
  naclLowLevel.M(t, t, num);
  naclLowLevel.M(t, t, den);
  naclLowLevel.M(t, t, den);
  naclLowLevel.M(r2[0], t, den);
  naclLowLevel.S(chk, r2[0]);
  naclLowLevel.M(chk, chk, den);
  if (neq25519(chk, num))
    naclLowLevel.M(r2[0], r2[0], I);
  naclLowLevel.S(chk, r2[0]);
  naclLowLevel.M(chk, chk, den);
  if (neq25519(chk, num))
    return 0;
  return 1;
}
function neq25519(a, b) {
  var c = new Uint8Array(32), d = new Uint8Array(32);
  naclLowLevel.pack25519(c, a);
  naclLowLevel.pack25519(d, b);
  return naclLowLevel.crypto_verify_32(c, 0, d, 0);
}
function getAlloc(type2, fields) {
  let alloc = 0;
  type2.layout.fields.forEach((item) => {
    if (item.span >= 0) {
      alloc += item.span;
    } else if (typeof item.alloc === "function") {
      alloc += item.alloc(fields[item.property]);
    }
  });
  return alloc;
}
function decodeLength(bytes) {
  let len = 0;
  let size = 0;
  for (; ; ) {
    let elem = bytes.shift();
    len |= (elem & 127) << size * 7;
    size += 1;
    if ((elem & 128) === 0) {
      break;
    }
  }
  return len;
}
function encodeLength(bytes, len) {
  let rem_len = len;
  for (; ; ) {
    let elem = rem_len & 127;
    rem_len >>= 7;
    if (rem_len == 0) {
      bytes.push(elem);
      break;
    } else {
      elem |= 128;
      bytes.push(elem);
    }
  }
}
function assert2(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}
async function sendAndConfirmTransaction(connection, transaction, signers, options) {
  const sendOptions = options && {
    skipPreflight: options.skipPreflight,
    preflightCommitment: options.preflightCommitment || options.commitment,
    maxRetries: options.maxRetries
  };
  const signature = await connection.sendTransaction(transaction, signers, sendOptions);
  const status = (await connection.confirmTransaction(signature, options && options.commitment)).value;
  if (status.err) {
    throw new Error(`Transaction ${signature} failed (${JSON.stringify(status)})`);
  }
  return signature;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function encodeData(type2, fields) {
  const allocLength = type2.layout.span >= 0 ? type2.layout.span : getAlloc(type2, fields);
  const data = Buffer2.alloc(allocLength);
  const layoutFields = Object.assign({
    instruction: type2.index
  }, fields);
  type2.layout.encode(layoutFields, data);
  return data;
}
function createRpcResult(result) {
  return union([type({
    jsonrpc: literal("2.0"),
    id: string(),
    result
  }), type({
    jsonrpc: literal("2.0"),
    id: string(),
    error: type({
      code: unknown(),
      message: string(),
      data: optional(any())
    })
  })]);
}
function jsonRpcResult(schema) {
  return coerce(createRpcResult(schema), UnknownRpcResult, (value) => {
    if ("error" in value) {
      return value;
    } else {
      return {
        ...value,
        result: create(value.result, schema)
      };
    }
  });
}
function jsonRpcResultAndContext(value) {
  return jsonRpcResult(type({
    context: type({
      slot: number()
    }),
    value
  }));
}
function notificationResultAndContext(value) {
  return type({
    context: type({
      slot: number()
    }),
    value
  });
}
var import_tweetnacl, import_bn, import_bs58, import_borsh, BufferLayout, import_rpc_websockets, import_browser, import_secp256k1, import_js_sha3, toBuffer, commonjsGlobal, hash$1, utils$9, minimalisticAssert, inherits_browser, assert$5, inherits, common$5, utils$8, assert$4, sha, common$4, utils$7, rotr32, utils$6, common$3, shaCommon$1, rotl32$1, sum32$2, sum32_5$1, ft_1, BlockHash$3, sha1_K, _1, utils$5, common$2, shaCommon, assert$3, sum32$1, sum32_4$1, sum32_5, ch32, maj32, s0_256, s1_256, g0_256, g1_256, BlockHash$2, sha256_K, _256, utils$4, SHA256, _224, utils$3, common$1, assert$2, rotr64_hi, rotr64_lo, shr64_hi, shr64_lo, sum64, sum64_hi, sum64_lo, sum64_4_hi, sum64_4_lo, sum64_5_hi, sum64_5_lo, BlockHash$1, sha512_K, _512, utils$2, SHA512, _384, ripemd, utils$1, common, rotl32, sum32, sum32_3, sum32_4, BlockHash, r, rh, s, sh, utils, assert$1, hmac, hash, version$2, _permanentCensorErrors, _censorErrors, LogLevels, _logLevel, _globalLogger, _normalizeError, LogLevel, ErrorCode, HEX, Logger, version$1, logger, version, Struct2, SOLANA_SCHEMA, MAX_SEED_LENGTH, PublicKey, naclLowLevel, gf1, I, BPF_LOADER_DEPRECATED_PROGRAM_ID, publicKey, rustString, authorized, lockup, voteInit, PUBKEY_LENGTH, Message, DEFAULT_SIGNATURE, PACKET_DATA_SIZE, SIGNATURE_LENGTH, TransactionInstruction, Transaction, SYSVAR_CLOCK_PUBKEY, SYSVAR_EPOCH_SCHEDULE_PUBKEY, SYSVAR_INSTRUCTIONS_PUBKEY, SYSVAR_RECENT_BLOCKHASHES_PUBKEY, SYSVAR_RENT_PUBKEY, SYSVAR_REWARDS_PUBKEY, SYSVAR_SLOT_HASHES_PUBKEY, SYSVAR_SLOT_HISTORY_PUBKEY, SYSVAR_STAKE_HISTORY_PUBKEY, FeeCalculatorLayout, NonceAccountLayout, NONCE_ACCOUNT_LENGTH, SYSTEM_INSTRUCTION_LAYOUTS, SystemProgram, CHUNK_SIZE, Loader, BPF_LOADER_PROGRAM_ID, browserPonyfill, fetch, NUM_TICKS_PER_SECOND, DEFAULT_TICKS_PER_SLOT, NUM_SLOTS_PER_SECOND, MS_PER_SLOT, PublicKeyFromString, RawAccountDataResult, BufferFromRawAccountData, BLOCKHASH_CACHE_TIMEOUT_MS, UnknownRpcResult, GetInflationGovernorResult, GetInflationRewardResult, GetEpochInfoResult, GetEpochScheduleResult, GetLeaderScheduleResult, TransactionErrorResult, SignatureStatusResult, SignatureReceivedResult, VersionResult, SimulatedTransactionResponseStruct, GetInflationGovernorRpcResult, GetEpochInfoRpcResult, GetEpochScheduleRpcResult, GetLeaderScheduleRpcResult, SlotRpcResult, GetSupplyRpcResult, TokenAmountResult, GetTokenLargestAccountsResult, GetTokenAccountsByOwner, ParsedAccountDataResult, GetParsedTokenAccountsByOwner, GetLargestAccountsRpcResult, AccountInfoResult, KeyedAccountInfoResult, ParsedOrRawAccountData, ParsedAccountInfoResult, KeyedParsedAccountInfoResult, StakeActivationResult, GetConfirmedSignaturesForAddress2RpcResult, GetSignaturesForAddressRpcResult, AccountNotificationResult, ProgramAccountInfoResult, ProgramAccountNotificationResult, SlotInfoResult, SlotNotificationResult, SlotUpdateResult, SlotUpdateNotificationResult, SignatureNotificationResult, RootNotificationResult, ContactInfoResult, VoteAccountInfoResult, GetVoteAccounts, ConfirmationStatus, SignatureStatusResponse, GetSignatureStatusesRpcResult, GetMinimumBalanceForRentExemptionRpcResult, ConfirmedTransactionResult, ParsedInstructionResult, RawInstructionResult, InstructionResult, UnknownInstructionResult, ParsedOrRawInstruction, ParsedConfirmedTransactionResult, TokenBalanceResult, ConfirmedTransactionMetaResult, ParsedConfirmedTransactionMetaResult, GetBlockRpcResult, GetConfirmedBlockRpcResult, GetBlockSignaturesRpcResult, GetTransactionRpcResult, GetParsedTransactionRpcResult, GetRecentBlockhashAndContextRpcResult, GetLatestBlockhashRpcResult, PerfSampleResult, GetRecentPerformanceSamplesRpcResult, GetFeeCalculatorRpcResult, RequestAirdropRpcResult, SendTransactionRpcResult, LogsResult, LogsNotificationResult, Keypair, PRIVATE_KEY_BYTES$1, PUBLIC_KEY_BYTES$1, SIGNATURE_BYTES, ED25519_INSTRUCTION_LAYOUT, Ed25519Program, STAKE_CONFIG_ID, Lockup, STAKE_INSTRUCTION_LAYOUTS, StakeAuthorizationLayout, StakeProgram, publicKeyCreate, ecdsaSign, PRIVATE_KEY_BYTES, ETHEREUM_ADDRESS_BYTES, PUBLIC_KEY_BYTES, SIGNATURE_OFFSETS_SERIALIZED_SIZE, SECP256K1_INSTRUCTION_LAYOUT, Secp256k1Program, VALIDATOR_INFO_KEY, InfoString, VOTE_PROGRAM_ID, VoteAccountLayout, VOTE_INSTRUCTION_LAYOUTS, VoteAuthorizationLayout, VoteProgram;
var init_index_browser_esm = __esm({
  "node_modules/@solana/web3.js/lib/index.browser.esm.js"() {
    init_react();
    import_tweetnacl = __toModule(require_nacl_fast());
    init_buffer();
    import_bn = __toModule(require_bn());
    import_bs58 = __toModule(require_bs58());
    import_borsh = __toModule(require_lib());
    BufferLayout = __toModule(require_Layout());
    init_index_es();
    import_rpc_websockets = __toModule(require_index_browser());
    import_browser = __toModule(require_browser());
    import_secp256k1 = __toModule(require_elliptic3());
    import_js_sha3 = __toModule(require_sha3());
    toBuffer = (arr) => {
      if (Buffer2.isBuffer(arr)) {
        return arr;
      } else if (arr instanceof Uint8Array) {
        return Buffer2.from(arr.buffer, arr.byteOffset, arr.byteLength);
      } else {
        return Buffer2.from(arr);
      }
    };
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : {};
    hash$1 = {};
    utils$9 = {};
    minimalisticAssert = assert$6;
    assert$6.equal = function assertEqual(l, r2, msg) {
      if (l != r2)
        throw new Error(msg || "Assertion failed: " + l + " != " + r2);
    };
    inherits_browser = { exports: {} };
    if (typeof Object.create === "function") {
      inherits_browser.exports = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      inherits_browser.exports = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
    assert$5 = minimalisticAssert;
    inherits = inherits_browser.exports;
    utils$9.inherits = inherits;
    utils$9.toArray = toArray;
    utils$9.toHex = toHex;
    utils$9.htonl = htonl;
    utils$9.toHex32 = toHex32;
    utils$9.zero2 = zero2;
    utils$9.zero8 = zero8;
    utils$9.join32 = join32;
    utils$9.split32 = split32;
    utils$9.rotr32 = rotr32$1;
    utils$9.rotl32 = rotl32$2;
    utils$9.sum32 = sum32$3;
    utils$9.sum32_3 = sum32_3$1;
    utils$9.sum32_4 = sum32_4$2;
    utils$9.sum32_5 = sum32_5$2;
    utils$9.sum64 = sum64$1;
    utils$9.sum64_hi = sum64_hi$1;
    utils$9.sum64_lo = sum64_lo$1;
    utils$9.sum64_4_hi = sum64_4_hi$1;
    utils$9.sum64_4_lo = sum64_4_lo$1;
    utils$9.sum64_5_hi = sum64_5_hi$1;
    utils$9.sum64_5_lo = sum64_5_lo$1;
    utils$9.rotr64_hi = rotr64_hi$1;
    utils$9.rotr64_lo = rotr64_lo$1;
    utils$9.shr64_hi = shr64_hi$1;
    utils$9.shr64_lo = shr64_lo$1;
    common$5 = {};
    utils$8 = utils$9;
    assert$4 = minimalisticAssert;
    common$5.BlockHash = BlockHash$4;
    BlockHash$4.prototype.update = function update(msg, enc) {
      msg = utils$8.toArray(msg, enc);
      if (!this.pending)
        this.pending = msg;
      else
        this.pending = this.pending.concat(msg);
      this.pendingTotal += msg.length;
      if (this.pending.length >= this._delta8) {
        msg = this.pending;
        var r2 = msg.length % this._delta8;
        this.pending = msg.slice(msg.length - r2, msg.length);
        if (this.pending.length === 0)
          this.pending = null;
        msg = utils$8.join32(msg, 0, msg.length - r2, this.endian);
        for (var i = 0; i < msg.length; i += this._delta32)
          this._update(msg, i, i + this._delta32);
      }
      return this;
    };
    BlockHash$4.prototype.digest = function digest(enc) {
      this.update(this._pad());
      assert$4(this.pending === null);
      return this._digest(enc);
    };
    BlockHash$4.prototype._pad = function pad() {
      var len = this.pendingTotal;
      var bytes = this._delta8;
      var k = bytes - (len + this.padLength) % bytes;
      var res = new Array(k + this.padLength);
      res[0] = 128;
      for (var i = 1; i < k; i++)
        res[i] = 0;
      len <<= 3;
      if (this.endian === "big") {
        for (var t = 8; t < this.padLength; t++)
          res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = len >>> 24 & 255;
        res[i++] = len >>> 16 & 255;
        res[i++] = len >>> 8 & 255;
        res[i++] = len & 255;
      } else {
        res[i++] = len & 255;
        res[i++] = len >>> 8 & 255;
        res[i++] = len >>> 16 & 255;
        res[i++] = len >>> 24 & 255;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        for (t = 8; t < this.padLength; t++)
          res[i++] = 0;
      }
      return res;
    };
    sha = {};
    common$4 = {};
    utils$7 = utils$9;
    rotr32 = utils$7.rotr32;
    common$4.ft_1 = ft_1$1;
    common$4.ch32 = ch32$1;
    common$4.maj32 = maj32$1;
    common$4.p32 = p32;
    common$4.s0_256 = s0_256$1;
    common$4.s1_256 = s1_256$1;
    common$4.g0_256 = g0_256$1;
    common$4.g1_256 = g1_256$1;
    utils$6 = utils$9;
    common$3 = common$5;
    shaCommon$1 = common$4;
    rotl32$1 = utils$6.rotl32;
    sum32$2 = utils$6.sum32;
    sum32_5$1 = utils$6.sum32_5;
    ft_1 = shaCommon$1.ft_1;
    BlockHash$3 = common$3.BlockHash;
    sha1_K = [
      1518500249,
      1859775393,
      2400959708,
      3395469782
    ];
    utils$6.inherits(SHA1, BlockHash$3);
    _1 = SHA1;
    SHA1.blockSize = 512;
    SHA1.outSize = 160;
    SHA1.hmacStrength = 80;
    SHA1.padLength = 64;
    SHA1.prototype._update = function _update(msg, start) {
      var W = this.W;
      for (var i = 0; i < 16; i++)
        W[i] = msg[start + i];
      for (; i < W.length; i++)
        W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
      var a = this.h[0];
      var b = this.h[1];
      var c = this.h[2];
      var d = this.h[3];
      var e = this.h[4];
      for (i = 0; i < W.length; i++) {
        var s2 = ~~(i / 20);
        var t = sum32_5$1(rotl32$1(a, 5), ft_1(s2, b, c, d), e, W[i], sha1_K[s2]);
        e = d;
        d = c;
        c = rotl32$1(b, 30);
        b = a;
        a = t;
      }
      this.h[0] = sum32$2(this.h[0], a);
      this.h[1] = sum32$2(this.h[1], b);
      this.h[2] = sum32$2(this.h[2], c);
      this.h[3] = sum32$2(this.h[3], d);
      this.h[4] = sum32$2(this.h[4], e);
    };
    SHA1.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils$6.toHex32(this.h, "big");
      else
        return utils$6.split32(this.h, "big");
    };
    utils$5 = utils$9;
    common$2 = common$5;
    shaCommon = common$4;
    assert$3 = minimalisticAssert;
    sum32$1 = utils$5.sum32;
    sum32_4$1 = utils$5.sum32_4;
    sum32_5 = utils$5.sum32_5;
    ch32 = shaCommon.ch32;
    maj32 = shaCommon.maj32;
    s0_256 = shaCommon.s0_256;
    s1_256 = shaCommon.s1_256;
    g0_256 = shaCommon.g0_256;
    g1_256 = shaCommon.g1_256;
    BlockHash$2 = common$2.BlockHash;
    sha256_K = [
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
    ];
    utils$5.inherits(SHA256$1, BlockHash$2);
    _256 = SHA256$1;
    SHA256$1.blockSize = 512;
    SHA256$1.outSize = 256;
    SHA256$1.hmacStrength = 192;
    SHA256$1.padLength = 64;
    SHA256$1.prototype._update = function _update2(msg, start) {
      var W = this.W;
      for (var i = 0; i < 16; i++)
        W[i] = msg[start + i];
      for (; i < W.length; i++)
        W[i] = sum32_4$1(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);
      var a = this.h[0];
      var b = this.h[1];
      var c = this.h[2];
      var d = this.h[3];
      var e = this.h[4];
      var f2 = this.h[5];
      var g = this.h[6];
      var h = this.h[7];
      assert$3(this.k.length === W.length);
      for (i = 0; i < W.length; i++) {
        var T1 = sum32_5(h, s1_256(e), ch32(e, f2, g), this.k[i], W[i]);
        var T2 = sum32$1(s0_256(a), maj32(a, b, c));
        h = g;
        g = f2;
        f2 = e;
        e = sum32$1(d, T1);
        d = c;
        c = b;
        b = a;
        a = sum32$1(T1, T2);
      }
      this.h[0] = sum32$1(this.h[0], a);
      this.h[1] = sum32$1(this.h[1], b);
      this.h[2] = sum32$1(this.h[2], c);
      this.h[3] = sum32$1(this.h[3], d);
      this.h[4] = sum32$1(this.h[4], e);
      this.h[5] = sum32$1(this.h[5], f2);
      this.h[6] = sum32$1(this.h[6], g);
      this.h[7] = sum32$1(this.h[7], h);
    };
    SHA256$1.prototype._digest = function digest3(enc) {
      if (enc === "hex")
        return utils$5.toHex32(this.h, "big");
      else
        return utils$5.split32(this.h, "big");
    };
    utils$4 = utils$9;
    SHA256 = _256;
    utils$4.inherits(SHA224, SHA256);
    _224 = SHA224;
    SHA224.blockSize = 512;
    SHA224.outSize = 224;
    SHA224.hmacStrength = 192;
    SHA224.padLength = 64;
    SHA224.prototype._digest = function digest4(enc) {
      if (enc === "hex")
        return utils$4.toHex32(this.h.slice(0, 7), "big");
      else
        return utils$4.split32(this.h.slice(0, 7), "big");
    };
    utils$3 = utils$9;
    common$1 = common$5;
    assert$2 = minimalisticAssert;
    rotr64_hi = utils$3.rotr64_hi;
    rotr64_lo = utils$3.rotr64_lo;
    shr64_hi = utils$3.shr64_hi;
    shr64_lo = utils$3.shr64_lo;
    sum64 = utils$3.sum64;
    sum64_hi = utils$3.sum64_hi;
    sum64_lo = utils$3.sum64_lo;
    sum64_4_hi = utils$3.sum64_4_hi;
    sum64_4_lo = utils$3.sum64_4_lo;
    sum64_5_hi = utils$3.sum64_5_hi;
    sum64_5_lo = utils$3.sum64_5_lo;
    BlockHash$1 = common$1.BlockHash;
    sha512_K = [
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ];
    utils$3.inherits(SHA512$1, BlockHash$1);
    _512 = SHA512$1;
    SHA512$1.blockSize = 1024;
    SHA512$1.outSize = 512;
    SHA512$1.hmacStrength = 192;
    SHA512$1.padLength = 128;
    SHA512$1.prototype._prepareBlock = function _prepareBlock(msg, start) {
      var W = this.W;
      for (var i = 0; i < 32; i++)
        W[i] = msg[start + i];
      for (; i < W.length; i += 2) {
        var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
        var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
        var c1_hi = W[i - 14];
        var c1_lo = W[i - 13];
        var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
        var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
        var c3_hi = W[i - 32];
        var c3_lo = W[i - 31];
        W[i] = sum64_4_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
        W[i + 1] = sum64_4_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
      }
    };
    SHA512$1.prototype._update = function _update3(msg, start) {
      this._prepareBlock(msg, start);
      var W = this.W;
      var ah = this.h[0];
      var al = this.h[1];
      var bh = this.h[2];
      var bl = this.h[3];
      var ch = this.h[4];
      var cl = this.h[5];
      var dh = this.h[6];
      var dl = this.h[7];
      var eh = this.h[8];
      var el = this.h[9];
      var fh = this.h[10];
      var fl = this.h[11];
      var gh = this.h[12];
      var gl = this.h[13];
      var hh = this.h[14];
      var hl = this.h[15];
      assert$2(this.k.length === W.length);
      for (var i = 0; i < W.length; i += 2) {
        var c0_hi = hh;
        var c0_lo = hl;
        var c1_hi = s1_512_hi(eh, el);
        var c1_lo = s1_512_lo(eh, el);
        var c2_hi = ch64_hi(eh, el, fh, fl, gh);
        var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
        var c3_hi = this.k[i];
        var c3_lo = this.k[i + 1];
        var c4_hi = W[i];
        var c4_lo = W[i + 1];
        var T1_hi = sum64_5_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
        var T1_lo = sum64_5_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
        c0_hi = s0_512_hi(ah, al);
        c0_lo = s0_512_lo(ah, al);
        c1_hi = maj64_hi(ah, al, bh, bl, ch);
        c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
        var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
        var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
        hh = gh;
        hl = gl;
        gh = fh;
        gl = fl;
        fh = eh;
        fl = el;
        eh = sum64_hi(dh, dl, T1_hi, T1_lo);
        el = sum64_lo(dl, dl, T1_hi, T1_lo);
        dh = ch;
        dl = cl;
        ch = bh;
        cl = bl;
        bh = ah;
        bl = al;
        ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
        al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
      }
      sum64(this.h, 0, ah, al);
      sum64(this.h, 2, bh, bl);
      sum64(this.h, 4, ch, cl);
      sum64(this.h, 6, dh, dl);
      sum64(this.h, 8, eh, el);
      sum64(this.h, 10, fh, fl);
      sum64(this.h, 12, gh, gl);
      sum64(this.h, 14, hh, hl);
    };
    SHA512$1.prototype._digest = function digest5(enc) {
      if (enc === "hex")
        return utils$3.toHex32(this.h, "big");
      else
        return utils$3.split32(this.h, "big");
    };
    utils$2 = utils$9;
    SHA512 = _512;
    utils$2.inherits(SHA384, SHA512);
    _384 = SHA384;
    SHA384.blockSize = 1024;
    SHA384.outSize = 384;
    SHA384.hmacStrength = 192;
    SHA384.padLength = 128;
    SHA384.prototype._digest = function digest6(enc) {
      if (enc === "hex")
        return utils$2.toHex32(this.h.slice(0, 12), "big");
      else
        return utils$2.split32(this.h.slice(0, 12), "big");
    };
    sha.sha1 = _1;
    sha.sha224 = _224;
    sha.sha256 = _256;
    sha.sha384 = _384;
    sha.sha512 = _512;
    ripemd = {};
    utils$1 = utils$9;
    common = common$5;
    rotl32 = utils$1.rotl32;
    sum32 = utils$1.sum32;
    sum32_3 = utils$1.sum32_3;
    sum32_4 = utils$1.sum32_4;
    BlockHash = common.BlockHash;
    utils$1.inherits(RIPEMD160, BlockHash);
    ripemd.ripemd160 = RIPEMD160;
    RIPEMD160.blockSize = 512;
    RIPEMD160.outSize = 160;
    RIPEMD160.hmacStrength = 192;
    RIPEMD160.padLength = 64;
    RIPEMD160.prototype._update = function update2(msg, start) {
      var A = this.h[0];
      var B = this.h[1];
      var C = this.h[2];
      var D = this.h[3];
      var E = this.h[4];
      var Ah = A;
      var Bh = B;
      var Ch = C;
      var Dh = D;
      var Eh = E;
      for (var j = 0; j < 80; j++) {
        var T = sum32(rotl32(sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)), s[j]), E);
        A = E;
        E = D;
        D = rotl32(C, 10);
        C = B;
        B = T;
        T = sum32(rotl32(sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)), sh[j]), Eh);
        Ah = Eh;
        Eh = Dh;
        Dh = rotl32(Ch, 10);
        Ch = Bh;
        Bh = T;
      }
      T = sum32_3(this.h[1], C, Dh);
      this.h[1] = sum32_3(this.h[2], D, Eh);
      this.h[2] = sum32_3(this.h[3], E, Ah);
      this.h[3] = sum32_3(this.h[4], A, Bh);
      this.h[4] = sum32_3(this.h[0], B, Ch);
      this.h[0] = T;
    };
    RIPEMD160.prototype._digest = function digest7(enc) {
      if (enc === "hex")
        return utils$1.toHex32(this.h, "little");
      else
        return utils$1.split32(this.h, "little");
    };
    r = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      7,
      4,
      13,
      1,
      10,
      6,
      15,
      3,
      12,
      0,
      9,
      5,
      2,
      14,
      11,
      8,
      3,
      10,
      14,
      4,
      9,
      15,
      8,
      1,
      2,
      7,
      0,
      6,
      13,
      11,
      5,
      12,
      1,
      9,
      11,
      10,
      0,
      8,
      12,
      4,
      13,
      3,
      7,
      15,
      14,
      5,
      6,
      2,
      4,
      0,
      5,
      9,
      7,
      12,
      2,
      10,
      14,
      1,
      3,
      8,
      11,
      6,
      15,
      13
    ];
    rh = [
      5,
      14,
      7,
      0,
      9,
      2,
      11,
      4,
      13,
      6,
      15,
      8,
      1,
      10,
      3,
      12,
      6,
      11,
      3,
      7,
      0,
      13,
      5,
      10,
      14,
      15,
      8,
      12,
      4,
      9,
      1,
      2,
      15,
      5,
      1,
      3,
      7,
      14,
      6,
      9,
      11,
      8,
      12,
      2,
      10,
      0,
      4,
      13,
      8,
      6,
      4,
      1,
      3,
      11,
      15,
      0,
      5,
      12,
      2,
      13,
      9,
      7,
      10,
      14,
      12,
      15,
      10,
      4,
      1,
      5,
      8,
      7,
      6,
      2,
      13,
      14,
      0,
      3,
      9,
      11
    ];
    s = [
      11,
      14,
      15,
      12,
      5,
      8,
      7,
      9,
      11,
      13,
      14,
      15,
      6,
      7,
      9,
      8,
      7,
      6,
      8,
      13,
      11,
      9,
      7,
      15,
      7,
      12,
      15,
      9,
      11,
      7,
      13,
      12,
      11,
      13,
      6,
      7,
      14,
      9,
      13,
      15,
      14,
      8,
      13,
      6,
      5,
      12,
      7,
      5,
      11,
      12,
      14,
      15,
      14,
      15,
      9,
      8,
      9,
      14,
      5,
      6,
      8,
      6,
      5,
      12,
      9,
      15,
      5,
      11,
      6,
      8,
      13,
      12,
      5,
      12,
      13,
      14,
      11,
      8,
      5,
      6
    ];
    sh = [
      8,
      9,
      9,
      11,
      13,
      15,
      15,
      5,
      7,
      7,
      8,
      11,
      14,
      14,
      12,
      6,
      9,
      13,
      15,
      7,
      12,
      8,
      9,
      11,
      7,
      7,
      12,
      7,
      6,
      15,
      13,
      11,
      9,
      7,
      15,
      11,
      8,
      6,
      6,
      14,
      12,
      13,
      5,
      14,
      13,
      13,
      7,
      5,
      15,
      5,
      8,
      11,
      14,
      14,
      6,
      14,
      6,
      9,
      12,
      9,
      12,
      5,
      15,
      8,
      8,
      5,
      12,
      9,
      12,
      5,
      14,
      6,
      8,
      13,
      6,
      5,
      15,
      13,
      11,
      11
    ];
    utils = utils$9;
    assert$1 = minimalisticAssert;
    hmac = Hmac;
    Hmac.prototype._init = function init(key) {
      if (key.length > this.blockSize)
        key = new this.Hash().update(key).digest();
      assert$1(key.length <= this.blockSize);
      for (var i = key.length; i < this.blockSize; i++)
        key.push(0);
      for (i = 0; i < key.length; i++)
        key[i] ^= 54;
      this.inner = new this.Hash().update(key);
      for (i = 0; i < key.length; i++)
        key[i] ^= 106;
      this.outer = new this.Hash().update(key);
    };
    Hmac.prototype.update = function update3(msg, enc) {
      this.inner.update(msg, enc);
      return this;
    };
    Hmac.prototype.digest = function digest8(enc) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(enc);
    };
    (function(exports) {
      var hash2 = exports;
      hash2.utils = utils$9;
      hash2.common = common$5;
      hash2.sha = sha;
      hash2.ripemd = ripemd;
      hash2.hmac = hmac;
      hash2.sha1 = hash2.sha.sha1;
      hash2.sha256 = hash2.sha.sha256;
      hash2.sha224 = hash2.sha.sha224;
      hash2.sha384 = hash2.sha.sha384;
      hash2.sha512 = hash2.sha.sha512;
      hash2.ripemd160 = hash2.ripemd.ripemd160;
    })(hash$1);
    hash = hash$1;
    version$2 = "logger/5.5.0";
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
      constructor(version2) {
        Object.defineProperty(this, "version", {
          enumerable: true,
          value: version2,
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
        Object.keys(params).forEach((key) => {
          const value = params[key];
          try {
            if (value instanceof Uint8Array) {
              let hex = "";
              for (let i = 0; i < value.length; i++) {
                hex += HEX[value[i] >> 4];
                hex += HEX[value[i] & 15];
              }
              messageDetails.push(key + "=Uint8Array(0x" + hex + ")");
            } else {
              messageDetails.push(key + "=" + JSON.stringify(value));
            }
          } catch (error2) {
            messageDetails.push(key + "=" + JSON.stringify(params[key].toString()));
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
        Object.keys(params).forEach(function(key) {
          error[key] = params[key];
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
          _globalLogger = new Logger(version$2);
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
      static from(version2) {
        return new Logger(version2);
      }
    };
    Logger.errors = ErrorCode;
    Logger.levels = LogLevel;
    version$1 = "bytes/5.5.0";
    logger = new Logger(version$1);
    version = "sha2/5.5.0";
    new Logger(version);
    Struct2 = class {
      constructor(properties) {
        Object.assign(this, properties);
      }
      encode() {
        return Buffer2.from((0, import_borsh.serialize)(SOLANA_SCHEMA, this));
      }
      static decode(data) {
        return (0, import_borsh.deserialize)(SOLANA_SCHEMA, this, data);
      }
      static decodeUnchecked(data) {
        return (0, import_borsh.deserializeUnchecked)(SOLANA_SCHEMA, this, data);
      }
    };
    SOLANA_SCHEMA = new Map();
    MAX_SEED_LENGTH = 32;
    PublicKey = class extends Struct2 {
      constructor(value) {
        super({});
        this._bn = void 0;
        if (isPublicKeyData(value)) {
          this._bn = value._bn;
        } else {
          if (typeof value === "string") {
            const decoded = import_bs58.default.decode(value);
            if (decoded.length != 32) {
              throw new Error(`Invalid public key input`);
            }
            this._bn = new import_bn.default(decoded);
          } else {
            this._bn = new import_bn.default(value);
          }
          if (this._bn.byteLength() > 32) {
            throw new Error(`Invalid public key input`);
          }
        }
      }
      equals(publicKey2) {
        return this._bn.eq(publicKey2._bn);
      }
      toBase58() {
        return import_bs58.default.encode(this.toBytes());
      }
      toJSON() {
        return this.toBase58();
      }
      toBytes() {
        return this.toBuffer();
      }
      toBuffer() {
        const b = this._bn.toArrayLike(Buffer2);
        if (b.length === 32) {
          return b;
        }
        const zeroPad = Buffer2.alloc(32);
        b.copy(zeroPad, 32 - b.length);
        return zeroPad;
      }
      toString() {
        return this.toBase58();
      }
      static async createWithSeed(fromPublicKey, seed, programId) {
        const buffer = Buffer2.concat([fromPublicKey.toBuffer(), Buffer2.from(seed), programId.toBuffer()]);
        const hash2 = sha256(new Uint8Array(buffer)).slice(2);
        return new PublicKey(Buffer2.from(hash2, "hex"));
      }
      static async createProgramAddress(seeds, programId) {
        let buffer = Buffer2.alloc(0);
        seeds.forEach(function(seed) {
          if (seed.length > MAX_SEED_LENGTH) {
            throw new TypeError(`Max seed length exceeded`);
          }
          buffer = Buffer2.concat([buffer, toBuffer(seed)]);
        });
        buffer = Buffer2.concat([buffer, programId.toBuffer(), Buffer2.from("ProgramDerivedAddress")]);
        let hash2 = sha256(new Uint8Array(buffer)).slice(2);
        let publicKeyBytes = new import_bn.default(hash2, 16).toArray(void 0, 32);
        if (is_on_curve(publicKeyBytes)) {
          throw new Error(`Invalid seeds, address must fall off the curve`);
        }
        return new PublicKey(publicKeyBytes);
      }
      static async findProgramAddress(seeds, programId) {
        let nonce = 255;
        let address;
        while (nonce != 0) {
          try {
            const seedsWithNonce = seeds.concat(Buffer2.from([nonce]));
            address = await this.createProgramAddress(seedsWithNonce, programId);
          } catch (err) {
            if (err instanceof TypeError) {
              throw err;
            }
            nonce--;
            continue;
          }
          return [address, nonce];
        }
        throw new Error(`Unable to find a viable program address nonce`);
      }
      static isOnCurve(pubkey) {
        return is_on_curve(pubkey) == 1;
      }
    };
    PublicKey.default = new PublicKey("11111111111111111111111111111111");
    SOLANA_SCHEMA.set(PublicKey, {
      kind: "struct",
      fields: [["_bn", "u256"]]
    });
    naclLowLevel = import_tweetnacl.default.lowlevel;
    gf1 = naclLowLevel.gf([1]);
    I = naclLowLevel.gf([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
    BPF_LOADER_DEPRECATED_PROGRAM_ID = new PublicKey("BPFLoader1111111111111111111111111111111111");
    publicKey = (property = "publicKey") => {
      return BufferLayout.blob(32, property);
    };
    rustString = (property = "string") => {
      const rsl = BufferLayout.struct([BufferLayout.u32("length"), BufferLayout.u32("lengthPadding"), BufferLayout.blob(BufferLayout.offset(BufferLayout.u32(), -8), "chars")], property);
      const _decode = rsl.decode.bind(rsl);
      const _encode = rsl.encode.bind(rsl);
      rsl.decode = (buffer, offset2) => {
        const data = _decode(buffer, offset2);
        return data["chars"].toString("utf8");
      };
      rsl.encode = (str, buffer, offset2) => {
        const data = {
          chars: Buffer2.from(str, "utf8")
        };
        return _encode(data, buffer, offset2);
      };
      rsl.alloc = (str) => {
        return BufferLayout.u32().span + BufferLayout.u32().span + Buffer2.from(str, "utf8").length;
      };
      return rsl;
    };
    authorized = (property = "authorized") => {
      return BufferLayout.struct([publicKey("staker"), publicKey("withdrawer")], property);
    };
    lockup = (property = "lockup") => {
      return BufferLayout.struct([BufferLayout.ns64("unixTimestamp"), BufferLayout.ns64("epoch"), publicKey("custodian")], property);
    };
    voteInit = (property = "voteInit") => {
      return BufferLayout.struct([publicKey("nodePubkey"), publicKey("authorizedVoter"), publicKey("authorizedWithdrawer"), BufferLayout.u8("commission")], property);
    };
    PUBKEY_LENGTH = 32;
    Message = class {
      constructor(args) {
        this.header = void 0;
        this.accountKeys = void 0;
        this.recentBlockhash = void 0;
        this.instructions = void 0;
        this.indexToProgramIds = new Map();
        this.header = args.header;
        this.accountKeys = args.accountKeys.map((account) => new PublicKey(account));
        this.recentBlockhash = args.recentBlockhash;
        this.instructions = args.instructions;
        this.instructions.forEach((ix) => this.indexToProgramIds.set(ix.programIdIndex, this.accountKeys[ix.programIdIndex]));
      }
      isAccountSigner(index) {
        return index < this.header.numRequiredSignatures;
      }
      isAccountWritable(index) {
        return index < this.header.numRequiredSignatures - this.header.numReadonlySignedAccounts || index >= this.header.numRequiredSignatures && index < this.accountKeys.length - this.header.numReadonlyUnsignedAccounts;
      }
      isProgramId(index) {
        return this.indexToProgramIds.has(index);
      }
      programIds() {
        return [...this.indexToProgramIds.values()];
      }
      nonProgramIds() {
        return this.accountKeys.filter((_, index) => !this.isProgramId(index));
      }
      serialize() {
        const numKeys = this.accountKeys.length;
        let keyCount = [];
        encodeLength(keyCount, numKeys);
        const instructions = this.instructions.map((instruction) => {
          const {
            accounts,
            programIdIndex
          } = instruction;
          const data = import_bs58.default.decode(instruction.data);
          let keyIndicesCount = [];
          encodeLength(keyIndicesCount, accounts.length);
          let dataCount = [];
          encodeLength(dataCount, data.length);
          return {
            programIdIndex,
            keyIndicesCount: Buffer2.from(keyIndicesCount),
            keyIndices: Buffer2.from(accounts),
            dataLength: Buffer2.from(dataCount),
            data
          };
        });
        let instructionCount = [];
        encodeLength(instructionCount, instructions.length);
        let instructionBuffer = Buffer2.alloc(PACKET_DATA_SIZE);
        Buffer2.from(instructionCount).copy(instructionBuffer);
        let instructionBufferLength = instructionCount.length;
        instructions.forEach((instruction) => {
          const instructionLayout = BufferLayout.struct([BufferLayout.u8("programIdIndex"), BufferLayout.blob(instruction.keyIndicesCount.length, "keyIndicesCount"), BufferLayout.seq(BufferLayout.u8("keyIndex"), instruction.keyIndices.length, "keyIndices"), BufferLayout.blob(instruction.dataLength.length, "dataLength"), BufferLayout.seq(BufferLayout.u8("userdatum"), instruction.data.length, "data")]);
          const length2 = instructionLayout.encode(instruction, instructionBuffer, instructionBufferLength);
          instructionBufferLength += length2;
        });
        instructionBuffer = instructionBuffer.slice(0, instructionBufferLength);
        const signDataLayout = BufferLayout.struct([BufferLayout.blob(1, "numRequiredSignatures"), BufferLayout.blob(1, "numReadonlySignedAccounts"), BufferLayout.blob(1, "numReadonlyUnsignedAccounts"), BufferLayout.blob(keyCount.length, "keyCount"), BufferLayout.seq(publicKey("key"), numKeys, "keys"), publicKey("recentBlockhash")]);
        const transaction = {
          numRequiredSignatures: Buffer2.from([this.header.numRequiredSignatures]),
          numReadonlySignedAccounts: Buffer2.from([this.header.numReadonlySignedAccounts]),
          numReadonlyUnsignedAccounts: Buffer2.from([this.header.numReadonlyUnsignedAccounts]),
          keyCount: Buffer2.from(keyCount),
          keys: this.accountKeys.map((key) => toBuffer(key.toBytes())),
          recentBlockhash: import_bs58.default.decode(this.recentBlockhash)
        };
        let signData = Buffer2.alloc(2048);
        const length = signDataLayout.encode(transaction, signData);
        instructionBuffer.copy(signData, length);
        return signData.slice(0, length + instructionBuffer.length);
      }
      static from(buffer) {
        let byteArray = [...buffer];
        const numRequiredSignatures = byteArray.shift();
        const numReadonlySignedAccounts = byteArray.shift();
        const numReadonlyUnsignedAccounts = byteArray.shift();
        const accountCount = decodeLength(byteArray);
        let accountKeys = [];
        for (let i = 0; i < accountCount; i++) {
          const account = byteArray.slice(0, PUBKEY_LENGTH);
          byteArray = byteArray.slice(PUBKEY_LENGTH);
          accountKeys.push(import_bs58.default.encode(Buffer2.from(account)));
        }
        const recentBlockhash = byteArray.slice(0, PUBKEY_LENGTH);
        byteArray = byteArray.slice(PUBKEY_LENGTH);
        const instructionCount = decodeLength(byteArray);
        let instructions = [];
        for (let i = 0; i < instructionCount; i++) {
          const programIdIndex = byteArray.shift();
          const accountCount2 = decodeLength(byteArray);
          const accounts = byteArray.slice(0, accountCount2);
          byteArray = byteArray.slice(accountCount2);
          const dataLength = decodeLength(byteArray);
          const dataSlice = byteArray.slice(0, dataLength);
          const data = import_bs58.default.encode(Buffer2.from(dataSlice));
          byteArray = byteArray.slice(dataLength);
          instructions.push({
            programIdIndex,
            accounts,
            data
          });
        }
        const messageArgs = {
          header: {
            numRequiredSignatures,
            numReadonlySignedAccounts,
            numReadonlyUnsignedAccounts
          },
          recentBlockhash: import_bs58.default.encode(Buffer2.from(recentBlockhash)),
          accountKeys,
          instructions
        };
        return new Message(messageArgs);
      }
    };
    DEFAULT_SIGNATURE = Buffer2.alloc(64).fill(0);
    PACKET_DATA_SIZE = 1280 - 40 - 8;
    SIGNATURE_LENGTH = 64;
    TransactionInstruction = class {
      constructor(opts) {
        this.keys = void 0;
        this.programId = void 0;
        this.data = Buffer2.alloc(0);
        this.programId = opts.programId;
        this.keys = opts.keys;
        if (opts.data) {
          this.data = opts.data;
        }
      }
    };
    Transaction = class {
      get signature() {
        if (this.signatures.length > 0) {
          return this.signatures[0].signature;
        }
        return null;
      }
      constructor(opts) {
        this.signatures = [];
        this.feePayer = void 0;
        this.instructions = [];
        this.recentBlockhash = void 0;
        this.nonceInfo = void 0;
        opts && Object.assign(this, opts);
      }
      add(...items) {
        if (items.length === 0) {
          throw new Error("No instructions");
        }
        items.forEach((item) => {
          if ("instructions" in item) {
            this.instructions = this.instructions.concat(item.instructions);
          } else if ("data" in item && "programId" in item && "keys" in item) {
            this.instructions.push(item);
          } else {
            this.instructions.push(new TransactionInstruction(item));
          }
        });
        return this;
      }
      compileMessage() {
        const {
          nonceInfo
        } = this;
        if (nonceInfo && this.instructions[0] != nonceInfo.nonceInstruction) {
          this.recentBlockhash = nonceInfo.nonce;
          this.instructions.unshift(nonceInfo.nonceInstruction);
        }
        const {
          recentBlockhash
        } = this;
        if (!recentBlockhash) {
          throw new Error("Transaction recentBlockhash required");
        }
        if (this.instructions.length < 1) {
          console.warn("No instructions provided");
        }
        let feePayer;
        if (this.feePayer) {
          feePayer = this.feePayer;
        } else if (this.signatures.length > 0 && this.signatures[0].publicKey) {
          feePayer = this.signatures[0].publicKey;
        } else {
          throw new Error("Transaction fee payer required");
        }
        for (let i = 0; i < this.instructions.length; i++) {
          if (this.instructions[i].programId === void 0) {
            throw new Error(`Transaction instruction index ${i} has undefined program id`);
          }
        }
        const programIds = [];
        const accountMetas = [];
        this.instructions.forEach((instruction) => {
          instruction.keys.forEach((accountMeta) => {
            accountMetas.push({
              ...accountMeta
            });
          });
          const programId = instruction.programId.toString();
          if (!programIds.includes(programId)) {
            programIds.push(programId);
          }
        });
        programIds.forEach((programId) => {
          accountMetas.push({
            pubkey: new PublicKey(programId),
            isSigner: false,
            isWritable: false
          });
        });
        accountMetas.sort(function(x, y) {
          const pubkeySorting = x.pubkey.toBase58().localeCompare(y.pubkey.toBase58());
          const checkSigner = x.isSigner === y.isSigner ? 0 : x.isSigner ? -1 : 1;
          const checkWritable = x.isWritable === y.isWritable ? pubkeySorting : x.isWritable ? -1 : 1;
          return checkSigner || checkWritable;
        });
        const uniqueMetas = [];
        accountMetas.forEach((accountMeta) => {
          const pubkeyString = accountMeta.pubkey.toString();
          const uniqueIndex = uniqueMetas.findIndex((x) => {
            return x.pubkey.toString() === pubkeyString;
          });
          if (uniqueIndex > -1) {
            uniqueMetas[uniqueIndex].isWritable = uniqueMetas[uniqueIndex].isWritable || accountMeta.isWritable;
          } else {
            uniqueMetas.push(accountMeta);
          }
        });
        const feePayerIndex = uniqueMetas.findIndex((x) => {
          return x.pubkey.equals(feePayer);
        });
        if (feePayerIndex > -1) {
          const [payerMeta] = uniqueMetas.splice(feePayerIndex, 1);
          payerMeta.isSigner = true;
          payerMeta.isWritable = true;
          uniqueMetas.unshift(payerMeta);
        } else {
          uniqueMetas.unshift({
            pubkey: feePayer,
            isSigner: true,
            isWritable: true
          });
        }
        for (const signature of this.signatures) {
          const uniqueIndex = uniqueMetas.findIndex((x) => {
            return x.pubkey.equals(signature.publicKey);
          });
          if (uniqueIndex > -1) {
            if (!uniqueMetas[uniqueIndex].isSigner) {
              uniqueMetas[uniqueIndex].isSigner = true;
              console.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release.");
            }
          } else {
            throw new Error(`unknown signer: ${signature.publicKey.toString()}`);
          }
        }
        let numRequiredSignatures = 0;
        let numReadonlySignedAccounts = 0;
        let numReadonlyUnsignedAccounts = 0;
        const signedKeys = [];
        const unsignedKeys = [];
        uniqueMetas.forEach(({
          pubkey,
          isSigner,
          isWritable
        }) => {
          if (isSigner) {
            signedKeys.push(pubkey.toString());
            numRequiredSignatures += 1;
            if (!isWritable) {
              numReadonlySignedAccounts += 1;
            }
          } else {
            unsignedKeys.push(pubkey.toString());
            if (!isWritable) {
              numReadonlyUnsignedAccounts += 1;
            }
          }
        });
        const accountKeys = signedKeys.concat(unsignedKeys);
        const instructions = this.instructions.map((instruction) => {
          const {
            data,
            programId
          } = instruction;
          return {
            programIdIndex: accountKeys.indexOf(programId.toString()),
            accounts: instruction.keys.map((meta) => accountKeys.indexOf(meta.pubkey.toString())),
            data: import_bs58.default.encode(data)
          };
        });
        instructions.forEach((instruction) => {
          assert2(instruction.programIdIndex >= 0);
          instruction.accounts.forEach((keyIndex) => assert2(keyIndex >= 0));
        });
        return new Message({
          header: {
            numRequiredSignatures,
            numReadonlySignedAccounts,
            numReadonlyUnsignedAccounts
          },
          accountKeys,
          recentBlockhash,
          instructions
        });
      }
      _compile() {
        const message = this.compileMessage();
        const signedKeys = message.accountKeys.slice(0, message.header.numRequiredSignatures);
        if (this.signatures.length === signedKeys.length) {
          const valid = this.signatures.every((pair, index) => {
            return signedKeys[index].equals(pair.publicKey);
          });
          if (valid)
            return message;
        }
        this.signatures = signedKeys.map((publicKey2) => ({
          signature: null,
          publicKey: publicKey2
        }));
        return message;
      }
      serializeMessage() {
        return this._compile().serialize();
      }
      setSigners(...signers) {
        if (signers.length === 0) {
          throw new Error("No signers");
        }
        const seen = new Set();
        this.signatures = signers.filter((publicKey2) => {
          const key = publicKey2.toString();
          if (seen.has(key)) {
            return false;
          } else {
            seen.add(key);
            return true;
          }
        }).map((publicKey2) => ({
          signature: null,
          publicKey: publicKey2
        }));
      }
      sign(...signers) {
        if (signers.length === 0) {
          throw new Error("No signers");
        }
        const seen = new Set();
        const uniqueSigners = [];
        for (const signer of signers) {
          const key = signer.publicKey.toString();
          if (seen.has(key)) {
            continue;
          } else {
            seen.add(key);
            uniqueSigners.push(signer);
          }
        }
        this.signatures = uniqueSigners.map((signer) => ({
          signature: null,
          publicKey: signer.publicKey
        }));
        const message = this._compile();
        this._partialSign(message, ...uniqueSigners);
        this._verifySignatures(message.serialize(), true);
      }
      partialSign(...signers) {
        if (signers.length === 0) {
          throw new Error("No signers");
        }
        const seen = new Set();
        const uniqueSigners = [];
        for (const signer of signers) {
          const key = signer.publicKey.toString();
          if (seen.has(key)) {
            continue;
          } else {
            seen.add(key);
            uniqueSigners.push(signer);
          }
        }
        const message = this._compile();
        this._partialSign(message, ...uniqueSigners);
      }
      _partialSign(message, ...signers) {
        const signData = message.serialize();
        signers.forEach((signer) => {
          const signature = import_tweetnacl.default.sign.detached(signData, signer.secretKey);
          this._addSignature(signer.publicKey, toBuffer(signature));
        });
      }
      addSignature(pubkey, signature) {
        this._compile();
        this._addSignature(pubkey, signature);
      }
      _addSignature(pubkey, signature) {
        assert2(signature.length === 64);
        const index = this.signatures.findIndex((sigpair) => pubkey.equals(sigpair.publicKey));
        if (index < 0) {
          throw new Error(`unknown signer: ${pubkey.toString()}`);
        }
        this.signatures[index].signature = Buffer2.from(signature);
      }
      verifySignatures() {
        return this._verifySignatures(this.serializeMessage(), true);
      }
      _verifySignatures(signData, requireAllSignatures) {
        for (const {
          signature,
          publicKey: publicKey2
        } of this.signatures) {
          if (signature === null) {
            if (requireAllSignatures) {
              return false;
            }
          } else {
            if (!import_tweetnacl.default.sign.detached.verify(signData, signature, publicKey2.toBuffer())) {
              return false;
            }
          }
        }
        return true;
      }
      serialize(config) {
        const {
          requireAllSignatures,
          verifySignatures
        } = Object.assign({
          requireAllSignatures: true,
          verifySignatures: true
        }, config);
        const signData = this.serializeMessage();
        if (verifySignatures && !this._verifySignatures(signData, requireAllSignatures)) {
          throw new Error("Signature verification failed");
        }
        return this._serialize(signData);
      }
      _serialize(signData) {
        const {
          signatures
        } = this;
        const signatureCount = [];
        encodeLength(signatureCount, signatures.length);
        const transactionLength = signatureCount.length + signatures.length * 64 + signData.length;
        const wireTransaction = Buffer2.alloc(transactionLength);
        assert2(signatures.length < 256);
        Buffer2.from(signatureCount).copy(wireTransaction, 0);
        signatures.forEach(({
          signature
        }, index) => {
          if (signature !== null) {
            assert2(signature.length === 64, `signature has invalid length`);
            Buffer2.from(signature).copy(wireTransaction, signatureCount.length + index * 64);
          }
        });
        signData.copy(wireTransaction, signatureCount.length + signatures.length * 64);
        assert2(wireTransaction.length <= PACKET_DATA_SIZE, `Transaction too large: ${wireTransaction.length} > ${PACKET_DATA_SIZE}`);
        return wireTransaction;
      }
      get keys() {
        assert2(this.instructions.length === 1);
        return this.instructions[0].keys.map((keyObj) => keyObj.pubkey);
      }
      get programId() {
        assert2(this.instructions.length === 1);
        return this.instructions[0].programId;
      }
      get data() {
        assert2(this.instructions.length === 1);
        return this.instructions[0].data;
      }
      static from(buffer) {
        let byteArray = [...buffer];
        const signatureCount = decodeLength(byteArray);
        let signatures = [];
        for (let i = 0; i < signatureCount; i++) {
          const signature = byteArray.slice(0, SIGNATURE_LENGTH);
          byteArray = byteArray.slice(SIGNATURE_LENGTH);
          signatures.push(import_bs58.default.encode(Buffer2.from(signature)));
        }
        return Transaction.populate(Message.from(byteArray), signatures);
      }
      static populate(message, signatures = []) {
        const transaction = new Transaction();
        transaction.recentBlockhash = message.recentBlockhash;
        if (message.header.numRequiredSignatures > 0) {
          transaction.feePayer = message.accountKeys[0];
        }
        signatures.forEach((signature, index) => {
          const sigPubkeyPair = {
            signature: signature == import_bs58.default.encode(DEFAULT_SIGNATURE) ? null : import_bs58.default.decode(signature),
            publicKey: message.accountKeys[index]
          };
          transaction.signatures.push(sigPubkeyPair);
        });
        message.instructions.forEach((instruction) => {
          const keys = instruction.accounts.map((account) => {
            const pubkey = message.accountKeys[account];
            return {
              pubkey,
              isSigner: transaction.signatures.some((keyObj) => keyObj.publicKey.toString() === pubkey.toString()) || message.isAccountSigner(account),
              isWritable: message.isAccountWritable(account)
            };
          });
          transaction.instructions.push(new TransactionInstruction({
            keys,
            programId: message.accountKeys[instruction.programIdIndex],
            data: import_bs58.default.decode(instruction.data)
          }));
        });
        return transaction;
      }
    };
    SYSVAR_CLOCK_PUBKEY = new PublicKey("SysvarC1ock11111111111111111111111111111111");
    SYSVAR_EPOCH_SCHEDULE_PUBKEY = new PublicKey("SysvarEpochSchedu1e111111111111111111111111");
    SYSVAR_INSTRUCTIONS_PUBKEY = new PublicKey("Sysvar1nstructions1111111111111111111111111");
    SYSVAR_RECENT_BLOCKHASHES_PUBKEY = new PublicKey("SysvarRecentB1ockHashes11111111111111111111");
    SYSVAR_RENT_PUBKEY = new PublicKey("SysvarRent111111111111111111111111111111111");
    SYSVAR_REWARDS_PUBKEY = new PublicKey("SysvarRewards111111111111111111111111111111");
    SYSVAR_SLOT_HASHES_PUBKEY = new PublicKey("SysvarS1otHashes111111111111111111111111111");
    SYSVAR_SLOT_HISTORY_PUBKEY = new PublicKey("SysvarS1otHistory11111111111111111111111111");
    SYSVAR_STAKE_HISTORY_PUBKEY = new PublicKey("SysvarStakeHistory1111111111111111111111111");
    FeeCalculatorLayout = BufferLayout.nu64("lamportsPerSignature");
    NonceAccountLayout = BufferLayout.struct([BufferLayout.u32("version"), BufferLayout.u32("state"), publicKey("authorizedPubkey"), publicKey("nonce"), BufferLayout.struct([FeeCalculatorLayout], "feeCalculator")]);
    NONCE_ACCOUNT_LENGTH = NonceAccountLayout.span;
    SYSTEM_INSTRUCTION_LAYOUTS = Object.freeze({
      Create: {
        index: 0,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports"), BufferLayout.ns64("space"), publicKey("programId")])
      },
      Assign: {
        index: 1,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("programId")])
      },
      Transfer: {
        index: 2,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
      },
      CreateWithSeed: {
        index: 3,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("base"), rustString("seed"), BufferLayout.ns64("lamports"), BufferLayout.ns64("space"), publicKey("programId")])
      },
      AdvanceNonceAccount: {
        index: 4,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      },
      WithdrawNonceAccount: {
        index: 5,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
      },
      InitializeNonceAccount: {
        index: 6,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("authorized")])
      },
      AuthorizeNonceAccount: {
        index: 7,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("authorized")])
      },
      Allocate: {
        index: 8,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("space")])
      },
      AllocateWithSeed: {
        index: 9,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("base"), rustString("seed"), BufferLayout.ns64("space"), publicKey("programId")])
      },
      AssignWithSeed: {
        index: 10,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("base"), rustString("seed"), publicKey("programId")])
      },
      TransferWithSeed: {
        index: 11,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports"), rustString("seed"), publicKey("programId")])
      }
    });
    SystemProgram = class {
      constructor() {
      }
      static createAccount(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.Create;
        const data = encodeData(type2, {
          lamports: params.lamports,
          space: params.space,
          programId: toBuffer(params.programId.toBuffer())
        });
        return new TransactionInstruction({
          keys: [{
            pubkey: params.fromPubkey,
            isSigner: true,
            isWritable: true
          }, {
            pubkey: params.newAccountPubkey,
            isSigner: true,
            isWritable: true
          }],
          programId: this.programId,
          data
        });
      }
      static transfer(params) {
        let data;
        let keys;
        if ("basePubkey" in params) {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.TransferWithSeed;
          data = encodeData(type2, {
            lamports: params.lamports,
            seed: params.seed,
            programId: toBuffer(params.programId.toBuffer())
          });
          keys = [{
            pubkey: params.fromPubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: params.basePubkey,
            isSigner: true,
            isWritable: false
          }, {
            pubkey: params.toPubkey,
            isSigner: false,
            isWritable: true
          }];
        } else {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.Transfer;
          data = encodeData(type2, {
            lamports: params.lamports
          });
          keys = [{
            pubkey: params.fromPubkey,
            isSigner: true,
            isWritable: true
          }, {
            pubkey: params.toPubkey,
            isSigner: false,
            isWritable: true
          }];
        }
        return new TransactionInstruction({
          keys,
          programId: this.programId,
          data
        });
      }
      static assign(params) {
        let data;
        let keys;
        if ("basePubkey" in params) {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed;
          data = encodeData(type2, {
            base: toBuffer(params.basePubkey.toBuffer()),
            seed: params.seed,
            programId: toBuffer(params.programId.toBuffer())
          });
          keys = [{
            pubkey: params.accountPubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: params.basePubkey,
            isSigner: true,
            isWritable: false
          }];
        } else {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.Assign;
          data = encodeData(type2, {
            programId: toBuffer(params.programId.toBuffer())
          });
          keys = [{
            pubkey: params.accountPubkey,
            isSigner: true,
            isWritable: true
          }];
        }
        return new TransactionInstruction({
          keys,
          programId: this.programId,
          data
        });
      }
      static createAccountWithSeed(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed;
        const data = encodeData(type2, {
          base: toBuffer(params.basePubkey.toBuffer()),
          seed: params.seed,
          lamports: params.lamports,
          space: params.space,
          programId: toBuffer(params.programId.toBuffer())
        });
        let keys = [{
          pubkey: params.fromPubkey,
          isSigner: true,
          isWritable: true
        }, {
          pubkey: params.newAccountPubkey,
          isSigner: false,
          isWritable: true
        }];
        if (params.basePubkey != params.fromPubkey) {
          keys.push({
            pubkey: params.basePubkey,
            isSigner: true,
            isWritable: false
          });
        }
        return new TransactionInstruction({
          keys,
          programId: this.programId,
          data
        });
      }
      static createNonceAccount(params) {
        const transaction = new Transaction();
        if ("basePubkey" in params && "seed" in params) {
          transaction.add(SystemProgram.createAccountWithSeed({
            fromPubkey: params.fromPubkey,
            newAccountPubkey: params.noncePubkey,
            basePubkey: params.basePubkey,
            seed: params.seed,
            lamports: params.lamports,
            space: NONCE_ACCOUNT_LENGTH,
            programId: this.programId
          }));
        } else {
          transaction.add(SystemProgram.createAccount({
            fromPubkey: params.fromPubkey,
            newAccountPubkey: params.noncePubkey,
            lamports: params.lamports,
            space: NONCE_ACCOUNT_LENGTH,
            programId: this.programId
          }));
        }
        const initParams = {
          noncePubkey: params.noncePubkey,
          authorizedPubkey: params.authorizedPubkey
        };
        transaction.add(this.nonceInitialize(initParams));
        return transaction;
      }
      static nonceInitialize(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount;
        const data = encodeData(type2, {
          authorized: toBuffer(params.authorizedPubkey.toBuffer())
        });
        const instructionData = {
          keys: [{
            pubkey: params.noncePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
          }],
          programId: this.programId,
          data
        };
        return new TransactionInstruction(instructionData);
      }
      static nonceAdvance(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount;
        const data = encodeData(type2);
        const instructionData = {
          keys: [{
            pubkey: params.noncePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: params.authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        };
        return new TransactionInstruction(instructionData);
      }
      static nonceWithdraw(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount;
        const data = encodeData(type2, {
          lamports: params.lamports
        });
        return new TransactionInstruction({
          keys: [{
            pubkey: params.noncePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: params.toPubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: params.authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
      static nonceAuthorize(params) {
        const type2 = SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount;
        const data = encodeData(type2, {
          authorized: toBuffer(params.newAuthorizedPubkey.toBuffer())
        });
        return new TransactionInstruction({
          keys: [{
            pubkey: params.noncePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: params.authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
      static allocate(params) {
        let data;
        let keys;
        if ("basePubkey" in params) {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed;
          data = encodeData(type2, {
            base: toBuffer(params.basePubkey.toBuffer()),
            seed: params.seed,
            space: params.space,
            programId: toBuffer(params.programId.toBuffer())
          });
          keys = [{
            pubkey: params.accountPubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: params.basePubkey,
            isSigner: true,
            isWritable: false
          }];
        } else {
          const type2 = SYSTEM_INSTRUCTION_LAYOUTS.Allocate;
          data = encodeData(type2, {
            space: params.space
          });
          keys = [{
            pubkey: params.accountPubkey,
            isSigner: true,
            isWritable: true
          }];
        }
        return new TransactionInstruction({
          keys,
          programId: this.programId,
          data
        });
      }
    };
    SystemProgram.programId = new PublicKey("11111111111111111111111111111111");
    CHUNK_SIZE = PACKET_DATA_SIZE - 300;
    Loader = class {
      constructor() {
      }
      static getMinNumSignatures(dataLength) {
        return 2 * (Math.ceil(dataLength / Loader.chunkSize) + 1 + 1);
      }
      static async load(connection, payer, program, programId, data) {
        {
          const balanceNeeded = await connection.getMinimumBalanceForRentExemption(data.length);
          const programInfo = await connection.getAccountInfo(program.publicKey, "confirmed");
          let transaction = null;
          if (programInfo !== null) {
            if (programInfo.executable) {
              console.error("Program load failed, account is already executable");
              return false;
            }
            if (programInfo.data.length !== data.length) {
              transaction = transaction || new Transaction();
              transaction.add(SystemProgram.allocate({
                accountPubkey: program.publicKey,
                space: data.length
              }));
            }
            if (!programInfo.owner.equals(programId)) {
              transaction = transaction || new Transaction();
              transaction.add(SystemProgram.assign({
                accountPubkey: program.publicKey,
                programId
              }));
            }
            if (programInfo.lamports < balanceNeeded) {
              transaction = transaction || new Transaction();
              transaction.add(SystemProgram.transfer({
                fromPubkey: payer.publicKey,
                toPubkey: program.publicKey,
                lamports: balanceNeeded - programInfo.lamports
              }));
            }
          } else {
            transaction = new Transaction().add(SystemProgram.createAccount({
              fromPubkey: payer.publicKey,
              newAccountPubkey: program.publicKey,
              lamports: balanceNeeded > 0 ? balanceNeeded : 1,
              space: data.length,
              programId
            }));
          }
          if (transaction !== null) {
            await sendAndConfirmTransaction(connection, transaction, [payer, program], {
              commitment: "confirmed"
            });
          }
        }
        const dataLayout = BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.u32("offset"), BufferLayout.u32("bytesLength"), BufferLayout.u32("bytesLengthPadding"), BufferLayout.seq(BufferLayout.u8("byte"), BufferLayout.offset(BufferLayout.u32(), -8), "bytes")]);
        const chunkSize = Loader.chunkSize;
        let offset2 = 0;
        let array2 = data;
        let transactions = [];
        while (array2.length > 0) {
          const bytes = array2.slice(0, chunkSize);
          const data2 = Buffer2.alloc(chunkSize + 16);
          dataLayout.encode({
            instruction: 0,
            offset: offset2,
            bytes
          }, data2);
          const transaction = new Transaction().add({
            keys: [{
              pubkey: program.publicKey,
              isSigner: true,
              isWritable: true
            }],
            programId,
            data: data2
          });
          transactions.push(sendAndConfirmTransaction(connection, transaction, [payer, program], {
            commitment: "confirmed"
          }));
          if (connection._rpcEndpoint.includes("solana.com")) {
            const REQUESTS_PER_SECOND = 4;
            await sleep(1e3 / REQUESTS_PER_SECOND);
          }
          offset2 += chunkSize;
          array2 = array2.slice(chunkSize);
        }
        await Promise.all(transactions);
        {
          const dataLayout2 = BufferLayout.struct([BufferLayout.u32("instruction")]);
          const data2 = Buffer2.alloc(dataLayout2.span);
          dataLayout2.encode({
            instruction: 1
          }, data2);
          const transaction = new Transaction().add({
            keys: [{
              pubkey: program.publicKey,
              isSigner: true,
              isWritable: true
            }, {
              pubkey: SYSVAR_RENT_PUBKEY,
              isSigner: false,
              isWritable: false
            }],
            programId,
            data: data2
          });
          await sendAndConfirmTransaction(connection, transaction, [payer, program], {
            commitment: "confirmed"
          });
        }
        return true;
      }
    };
    Loader.chunkSize = CHUNK_SIZE;
    BPF_LOADER_PROGRAM_ID = new PublicKey("BPFLoader2111111111111111111111111111111111");
    browserPonyfill = { exports: {} };
    (function(module, exports) {
      var global2 = typeof self !== "undefined" ? self : commonjsGlobal;
      var __self__ = function() {
        function F() {
          this.fetch = false;
          this.DOMException = global2.DOMException;
        }
        F.prototype = global2;
        return new F();
      }();
      (function(self2) {
        (function(exports2) {
          var support = {
            searchParams: "URLSearchParams" in self2,
            iterable: "Symbol" in self2 && "iterator" in Symbol,
            blob: "FileReader" in self2 && "Blob" in self2 && function() {
              try {
                new Blob();
                return true;
              } catch (e) {
                return false;
              }
            }(),
            formData: "FormData" in self2,
            arrayBuffer: "ArrayBuffer" in self2
          };
          function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
          }
          if (support.arrayBuffer) {
            var viewClasses = [
              "[object Int8Array]",
              "[object Uint8Array]",
              "[object Uint8ClampedArray]",
              "[object Int16Array]",
              "[object Uint16Array]",
              "[object Int32Array]",
              "[object Uint32Array]",
              "[object Float32Array]",
              "[object Float64Array]"
            ];
            var isArrayBufferView = ArrayBuffer.isView || function(obj) {
              return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
            };
          }
          function normalizeName(name) {
            if (typeof name !== "string") {
              name = String(name);
            }
            if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
              throw new TypeError("Invalid character in header field name");
            }
            return name.toLowerCase();
          }
          function normalizeValue(value) {
            if (typeof value !== "string") {
              value = String(value);
            }
            return value;
          }
          function iteratorFor(items) {
            var iterator = {
              next: function() {
                var value = items.shift();
                return { done: value === void 0, value };
              }
            };
            if (support.iterable) {
              iterator[Symbol.iterator] = function() {
                return iterator;
              };
            }
            return iterator;
          }
          function Headers(headers) {
            this.map = {};
            if (headers instanceof Headers) {
              headers.forEach(function(value, name) {
                this.append(name, value);
              }, this);
            } else if (Array.isArray(headers)) {
              headers.forEach(function(header) {
                this.append(header[0], header[1]);
              }, this);
            } else if (headers) {
              Object.getOwnPropertyNames(headers).forEach(function(name) {
                this.append(name, headers[name]);
              }, this);
            }
          }
          Headers.prototype.append = function(name, value) {
            name = normalizeName(name);
            value = normalizeValue(value);
            var oldValue = this.map[name];
            this.map[name] = oldValue ? oldValue + ", " + value : value;
          };
          Headers.prototype["delete"] = function(name) {
            delete this.map[normalizeName(name)];
          };
          Headers.prototype.get = function(name) {
            name = normalizeName(name);
            return this.has(name) ? this.map[name] : null;
          };
          Headers.prototype.has = function(name) {
            return this.map.hasOwnProperty(normalizeName(name));
          };
          Headers.prototype.set = function(name, value) {
            this.map[normalizeName(name)] = normalizeValue(value);
          };
          Headers.prototype.forEach = function(callback, thisArg) {
            for (var name in this.map) {
              if (this.map.hasOwnProperty(name)) {
                callback.call(thisArg, this.map[name], name, this);
              }
            }
          };
          Headers.prototype.keys = function() {
            var items = [];
            this.forEach(function(value, name) {
              items.push(name);
            });
            return iteratorFor(items);
          };
          Headers.prototype.values = function() {
            var items = [];
            this.forEach(function(value) {
              items.push(value);
            });
            return iteratorFor(items);
          };
          Headers.prototype.entries = function() {
            var items = [];
            this.forEach(function(value, name) {
              items.push([name, value]);
            });
            return iteratorFor(items);
          };
          if (support.iterable) {
            Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
          }
          function consumed(body) {
            if (body.bodyUsed) {
              return Promise.reject(new TypeError("Already read"));
            }
            body.bodyUsed = true;
          }
          function fileReaderReady(reader) {
            return new Promise(function(resolve, reject) {
              reader.onload = function() {
                resolve(reader.result);
              };
              reader.onerror = function() {
                reject(reader.error);
              };
            });
          }
          function readBlobAsArrayBuffer(blob2) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsArrayBuffer(blob2);
            return promise;
          }
          function readBlobAsText(blob2) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsText(blob2);
            return promise;
          }
          function readArrayBufferAsText(buf) {
            var view = new Uint8Array(buf);
            var chars = new Array(view.length);
            for (var i = 0; i < view.length; i++) {
              chars[i] = String.fromCharCode(view[i]);
            }
            return chars.join("");
          }
          function bufferClone(buf) {
            if (buf.slice) {
              return buf.slice(0);
            } else {
              var view = new Uint8Array(buf.byteLength);
              view.set(new Uint8Array(buf));
              return view.buffer;
            }
          }
          function Body() {
            this.bodyUsed = false;
            this._initBody = function(body) {
              this._bodyInit = body;
              if (!body) {
                this._bodyText = "";
              } else if (typeof body === "string") {
                this._bodyText = body;
              } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body;
              } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                this._bodyFormData = body;
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this._bodyText = body.toString();
              } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                this._bodyArrayBuffer = bufferClone(body.buffer);
                this._bodyInit = new Blob([this._bodyArrayBuffer]);
              } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                this._bodyArrayBuffer = bufferClone(body);
              } else {
                this._bodyText = body = Object.prototype.toString.call(body);
              }
              if (!this.headers.get("content-type")) {
                if (typeof body === "string") {
                  this.headers.set("content-type", "text/plain;charset=UTF-8");
                } else if (this._bodyBlob && this._bodyBlob.type) {
                  this.headers.set("content-type", this._bodyBlob.type);
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                  this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                }
              }
            };
            if (support.blob) {
              this.blob = function() {
                var rejected = consumed(this);
                if (rejected) {
                  return rejected;
                }
                if (this._bodyBlob) {
                  return Promise.resolve(this._bodyBlob);
                } else if (this._bodyArrayBuffer) {
                  return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                } else if (this._bodyFormData) {
                  throw new Error("could not read FormData body as blob");
                } else {
                  return Promise.resolve(new Blob([this._bodyText]));
                }
              };
              this.arrayBuffer = function() {
                if (this._bodyArrayBuffer) {
                  return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
                } else {
                  return this.blob().then(readBlobAsArrayBuffer);
                }
              };
            }
            this.text = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as text");
              } else {
                return Promise.resolve(this._bodyText);
              }
            };
            if (support.formData) {
              this.formData = function() {
                return this.text().then(decode);
              };
            }
            this.json = function() {
              return this.text().then(JSON.parse);
            };
            return this;
          }
          var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
          function normalizeMethod(method) {
            var upcased = method.toUpperCase();
            return methods.indexOf(upcased) > -1 ? upcased : method;
          }
          function Request(input, options) {
            options = options || {};
            var body = options.body;
            if (input instanceof Request) {
              if (input.bodyUsed) {
                throw new TypeError("Already read");
              }
              this.url = input.url;
              this.credentials = input.credentials;
              if (!options.headers) {
                this.headers = new Headers(input.headers);
              }
              this.method = input.method;
              this.mode = input.mode;
              this.signal = input.signal;
              if (!body && input._bodyInit != null) {
                body = input._bodyInit;
                input.bodyUsed = true;
              }
            } else {
              this.url = String(input);
            }
            this.credentials = options.credentials || this.credentials || "same-origin";
            if (options.headers || !this.headers) {
              this.headers = new Headers(options.headers);
            }
            this.method = normalizeMethod(options.method || this.method || "GET");
            this.mode = options.mode || this.mode || null;
            this.signal = options.signal || this.signal;
            this.referrer = null;
            if ((this.method === "GET" || this.method === "HEAD") && body) {
              throw new TypeError("Body not allowed for GET or HEAD requests");
            }
            this._initBody(body);
          }
          Request.prototype.clone = function() {
            return new Request(this, { body: this._bodyInit });
          };
          function decode(body) {
            var form = new FormData();
            body.trim().split("&").forEach(function(bytes) {
              if (bytes) {
                var split = bytes.split("=");
                var name = split.shift().replace(/\+/g, " ");
                var value = split.join("=").replace(/\+/g, " ");
                form.append(decodeURIComponent(name), decodeURIComponent(value));
              }
            });
            return form;
          }
          function parseHeaders(rawHeaders) {
            var headers = new Headers();
            var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
            preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
              var parts = line.split(":");
              var key = parts.shift().trim();
              if (key) {
                var value = parts.join(":").trim();
                headers.append(key, value);
              }
            });
            return headers;
          }
          Body.call(Request.prototype);
          function Response(bodyInit, options) {
            if (!options) {
              options = {};
            }
            this.type = "default";
            this.status = options.status === void 0 ? 200 : options.status;
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = "statusText" in options ? options.statusText : "OK";
            this.headers = new Headers(options.headers);
            this.url = options.url || "";
            this._initBody(bodyInit);
          }
          Body.call(Response.prototype);
          Response.prototype.clone = function() {
            return new Response(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new Headers(this.headers),
              url: this.url
            });
          };
          Response.error = function() {
            var response = new Response(null, { status: 0, statusText: "" });
            response.type = "error";
            return response;
          };
          var redirectStatuses = [301, 302, 303, 307, 308];
          Response.redirect = function(url, status) {
            if (redirectStatuses.indexOf(status) === -1) {
              throw new RangeError("Invalid status code");
            }
            return new Response(null, { status, headers: { location: url } });
          };
          exports2.DOMException = self2.DOMException;
          try {
            new exports2.DOMException();
          } catch (err) {
            exports2.DOMException = function(message, name) {
              this.message = message;
              this.name = name;
              var error = Error(message);
              this.stack = error.stack;
            };
            exports2.DOMException.prototype = Object.create(Error.prototype);
            exports2.DOMException.prototype.constructor = exports2.DOMException;
          }
          function fetch2(input, init2) {
            return new Promise(function(resolve, reject) {
              var request = new Request(input, init2);
              if (request.signal && request.signal.aborted) {
                return reject(new exports2.DOMException("Aborted", "AbortError"));
              }
              var xhr = new XMLHttpRequest();
              function abortXhr() {
                xhr.abort();
              }
              xhr.onload = function() {
                var options = {
                  status: xhr.status,
                  statusText: xhr.statusText,
                  headers: parseHeaders(xhr.getAllResponseHeaders() || "")
                };
                options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
                var body = "response" in xhr ? xhr.response : xhr.responseText;
                resolve(new Response(body, options));
              };
              xhr.onerror = function() {
                reject(new TypeError("Network request failed"));
              };
              xhr.ontimeout = function() {
                reject(new TypeError("Network request failed"));
              };
              xhr.onabort = function() {
                reject(new exports2.DOMException("Aborted", "AbortError"));
              };
              xhr.open(request.method, request.url, true);
              if (request.credentials === "include") {
                xhr.withCredentials = true;
              } else if (request.credentials === "omit") {
                xhr.withCredentials = false;
              }
              if ("responseType" in xhr && support.blob) {
                xhr.responseType = "blob";
              }
              request.headers.forEach(function(value, name) {
                xhr.setRequestHeader(name, value);
              });
              if (request.signal) {
                request.signal.addEventListener("abort", abortXhr);
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    request.signal.removeEventListener("abort", abortXhr);
                  }
                };
              }
              xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
            });
          }
          fetch2.polyfill = true;
          if (!self2.fetch) {
            self2.fetch = fetch2;
            self2.Headers = Headers;
            self2.Request = Request;
            self2.Response = Response;
          }
          exports2.Headers = Headers;
          exports2.Request = Request;
          exports2.Response = Response;
          exports2.fetch = fetch2;
          Object.defineProperty(exports2, "__esModule", { value: true });
          return exports2;
        })({});
      })(__self__);
      __self__.fetch.ponyfill = true;
      delete __self__.fetch.polyfill;
      var ctx = __self__;
      exports = ctx.fetch;
      exports.default = ctx.fetch;
      exports.fetch = ctx.fetch;
      exports.Headers = ctx.Headers;
      exports.Request = ctx.Request;
      exports.Response = ctx.Response;
      module.exports = exports;
    })(browserPonyfill, browserPonyfill.exports);
    fetch = /* @__PURE__ */ getDefaultExportFromCjs(browserPonyfill.exports);
    NUM_TICKS_PER_SECOND = 160;
    DEFAULT_TICKS_PER_SLOT = 64;
    NUM_SLOTS_PER_SECOND = NUM_TICKS_PER_SECOND / DEFAULT_TICKS_PER_SLOT;
    MS_PER_SLOT = 1e3 / NUM_SLOTS_PER_SECOND;
    PublicKeyFromString = coerce(instance(PublicKey), string(), (value) => new PublicKey(value));
    RawAccountDataResult = tuple([string(), literal("base64")]);
    BufferFromRawAccountData = coerce(instance(Buffer2), RawAccountDataResult, (value) => Buffer2.from(value[0], "base64"));
    BLOCKHASH_CACHE_TIMEOUT_MS = 30 * 1e3;
    UnknownRpcResult = createRpcResult(unknown());
    GetInflationGovernorResult = type({
      foundation: number(),
      foundationTerm: number(),
      initial: number(),
      taper: number(),
      terminal: number()
    });
    GetInflationRewardResult = jsonRpcResult(array(nullable(type({
      epoch: number(),
      effectiveSlot: number(),
      amount: number(),
      postBalance: number()
    }))));
    GetEpochInfoResult = type({
      epoch: number(),
      slotIndex: number(),
      slotsInEpoch: number(),
      absoluteSlot: number(),
      blockHeight: optional(number()),
      transactionCount: optional(number())
    });
    GetEpochScheduleResult = type({
      slotsPerEpoch: number(),
      leaderScheduleSlotOffset: number(),
      warmup: boolean(),
      firstNormalEpoch: number(),
      firstNormalSlot: number()
    });
    GetLeaderScheduleResult = record(string(), array(number()));
    TransactionErrorResult = nullable(union([type({}), string()]));
    SignatureStatusResult = type({
      err: TransactionErrorResult
    });
    SignatureReceivedResult = literal("receivedSignature");
    VersionResult = type({
      "solana-core": string(),
      "feature-set": optional(number())
    });
    SimulatedTransactionResponseStruct = jsonRpcResultAndContext(type({
      err: nullable(union([type({}), string()])),
      logs: nullable(array(string())),
      accounts: optional(nullable(array(type({
        executable: boolean(),
        owner: string(),
        lamports: number(),
        data: array(string()),
        rentEpoch: optional(number())
      })))),
      unitsConsumed: optional(number())
    }));
    GetInflationGovernorRpcResult = jsonRpcResult(GetInflationGovernorResult);
    GetEpochInfoRpcResult = jsonRpcResult(GetEpochInfoResult);
    GetEpochScheduleRpcResult = jsonRpcResult(GetEpochScheduleResult);
    GetLeaderScheduleRpcResult = jsonRpcResult(GetLeaderScheduleResult);
    SlotRpcResult = jsonRpcResult(number());
    GetSupplyRpcResult = jsonRpcResultAndContext(type({
      total: number(),
      circulating: number(),
      nonCirculating: number(),
      nonCirculatingAccounts: array(PublicKeyFromString)
    }));
    TokenAmountResult = type({
      amount: string(),
      uiAmount: nullable(number()),
      decimals: number(),
      uiAmountString: optional(string())
    });
    GetTokenLargestAccountsResult = jsonRpcResultAndContext(array(type({
      address: PublicKeyFromString,
      amount: string(),
      uiAmount: nullable(number()),
      decimals: number(),
      uiAmountString: optional(string())
    })));
    GetTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
      pubkey: PublicKeyFromString,
      account: type({
        executable: boolean(),
        owner: PublicKeyFromString,
        lamports: number(),
        data: BufferFromRawAccountData,
        rentEpoch: number()
      })
    })));
    ParsedAccountDataResult = type({
      program: string(),
      parsed: unknown(),
      space: number()
    });
    GetParsedTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
      pubkey: PublicKeyFromString,
      account: type({
        executable: boolean(),
        owner: PublicKeyFromString,
        lamports: number(),
        data: ParsedAccountDataResult,
        rentEpoch: number()
      })
    })));
    GetLargestAccountsRpcResult = jsonRpcResultAndContext(array(type({
      lamports: number(),
      address: PublicKeyFromString
    })));
    AccountInfoResult = type({
      executable: boolean(),
      owner: PublicKeyFromString,
      lamports: number(),
      data: BufferFromRawAccountData,
      rentEpoch: number()
    });
    KeyedAccountInfoResult = type({
      pubkey: PublicKeyFromString,
      account: AccountInfoResult
    });
    ParsedOrRawAccountData = coerce(union([instance(Buffer2), ParsedAccountDataResult]), union([RawAccountDataResult, ParsedAccountDataResult]), (value) => {
      if (Array.isArray(value)) {
        return create(value, BufferFromRawAccountData);
      } else {
        return value;
      }
    });
    ParsedAccountInfoResult = type({
      executable: boolean(),
      owner: PublicKeyFromString,
      lamports: number(),
      data: ParsedOrRawAccountData,
      rentEpoch: number()
    });
    KeyedParsedAccountInfoResult = type({
      pubkey: PublicKeyFromString,
      account: ParsedAccountInfoResult
    });
    StakeActivationResult = type({
      state: union([literal("active"), literal("inactive"), literal("activating"), literal("deactivating")]),
      active: number(),
      inactive: number()
    });
    GetConfirmedSignaturesForAddress2RpcResult = jsonRpcResult(array(type({
      signature: string(),
      slot: number(),
      err: TransactionErrorResult,
      memo: nullable(string()),
      blockTime: optional(nullable(number()))
    })));
    GetSignaturesForAddressRpcResult = jsonRpcResult(array(type({
      signature: string(),
      slot: number(),
      err: TransactionErrorResult,
      memo: nullable(string()),
      blockTime: optional(nullable(number()))
    })));
    AccountNotificationResult = type({
      subscription: number(),
      result: notificationResultAndContext(AccountInfoResult)
    });
    ProgramAccountInfoResult = type({
      pubkey: PublicKeyFromString,
      account: AccountInfoResult
    });
    ProgramAccountNotificationResult = type({
      subscription: number(),
      result: notificationResultAndContext(ProgramAccountInfoResult)
    });
    SlotInfoResult = type({
      parent: number(),
      slot: number(),
      root: number()
    });
    SlotNotificationResult = type({
      subscription: number(),
      result: SlotInfoResult
    });
    SlotUpdateResult = union([type({
      type: union([literal("firstShredReceived"), literal("completed"), literal("optimisticConfirmation"), literal("root")]),
      slot: number(),
      timestamp: number()
    }), type({
      type: literal("createdBank"),
      parent: number(),
      slot: number(),
      timestamp: number()
    }), type({
      type: literal("frozen"),
      slot: number(),
      timestamp: number(),
      stats: type({
        numTransactionEntries: number(),
        numSuccessfulTransactions: number(),
        numFailedTransactions: number(),
        maxTransactionsPerEntry: number()
      })
    }), type({
      type: literal("dead"),
      slot: number(),
      timestamp: number(),
      err: string()
    })]);
    SlotUpdateNotificationResult = type({
      subscription: number(),
      result: SlotUpdateResult
    });
    SignatureNotificationResult = type({
      subscription: number(),
      result: notificationResultAndContext(union([SignatureStatusResult, SignatureReceivedResult]))
    });
    RootNotificationResult = type({
      subscription: number(),
      result: number()
    });
    ContactInfoResult = type({
      pubkey: string(),
      gossip: nullable(string()),
      tpu: nullable(string()),
      rpc: nullable(string()),
      version: nullable(string())
    });
    VoteAccountInfoResult = type({
      votePubkey: string(),
      nodePubkey: string(),
      activatedStake: number(),
      epochVoteAccount: boolean(),
      epochCredits: array(tuple([number(), number(), number()])),
      commission: number(),
      lastVote: number(),
      rootSlot: nullable(number())
    });
    GetVoteAccounts = jsonRpcResult(type({
      current: array(VoteAccountInfoResult),
      delinquent: array(VoteAccountInfoResult)
    }));
    ConfirmationStatus = union([literal("processed"), literal("confirmed"), literal("finalized")]);
    SignatureStatusResponse = type({
      slot: number(),
      confirmations: nullable(number()),
      err: TransactionErrorResult,
      confirmationStatus: optional(ConfirmationStatus)
    });
    GetSignatureStatusesRpcResult = jsonRpcResultAndContext(array(nullable(SignatureStatusResponse)));
    GetMinimumBalanceForRentExemptionRpcResult = jsonRpcResult(number());
    ConfirmedTransactionResult = type({
      signatures: array(string()),
      message: type({
        accountKeys: array(string()),
        header: type({
          numRequiredSignatures: number(),
          numReadonlySignedAccounts: number(),
          numReadonlyUnsignedAccounts: number()
        }),
        instructions: array(type({
          accounts: array(number()),
          data: string(),
          programIdIndex: number()
        })),
        recentBlockhash: string()
      })
    });
    ParsedInstructionResult = type({
      parsed: unknown(),
      program: string(),
      programId: PublicKeyFromString
    });
    RawInstructionResult = type({
      accounts: array(PublicKeyFromString),
      data: string(),
      programId: PublicKeyFromString
    });
    InstructionResult = union([RawInstructionResult, ParsedInstructionResult]);
    UnknownInstructionResult = union([type({
      parsed: unknown(),
      program: string(),
      programId: string()
    }), type({
      accounts: array(string()),
      data: string(),
      programId: string()
    })]);
    ParsedOrRawInstruction = coerce(InstructionResult, UnknownInstructionResult, (value) => {
      if ("accounts" in value) {
        return create(value, RawInstructionResult);
      } else {
        return create(value, ParsedInstructionResult);
      }
    });
    ParsedConfirmedTransactionResult = type({
      signatures: array(string()),
      message: type({
        accountKeys: array(type({
          pubkey: PublicKeyFromString,
          signer: boolean(),
          writable: boolean()
        })),
        instructions: array(ParsedOrRawInstruction),
        recentBlockhash: string()
      })
    });
    TokenBalanceResult = type({
      accountIndex: number(),
      mint: string(),
      owner: optional(string()),
      uiTokenAmount: TokenAmountResult
    });
    ConfirmedTransactionMetaResult = type({
      err: TransactionErrorResult,
      fee: number(),
      innerInstructions: optional(nullable(array(type({
        index: number(),
        instructions: array(type({
          accounts: array(number()),
          data: string(),
          programIdIndex: number()
        }))
      })))),
      preBalances: array(number()),
      postBalances: array(number()),
      logMessages: optional(nullable(array(string()))),
      preTokenBalances: optional(nullable(array(TokenBalanceResult))),
      postTokenBalances: optional(nullable(array(TokenBalanceResult)))
    });
    ParsedConfirmedTransactionMetaResult = type({
      err: TransactionErrorResult,
      fee: number(),
      innerInstructions: optional(nullable(array(type({
        index: number(),
        instructions: array(ParsedOrRawInstruction)
      })))),
      preBalances: array(number()),
      postBalances: array(number()),
      logMessages: optional(nullable(array(string()))),
      preTokenBalances: optional(nullable(array(TokenBalanceResult))),
      postTokenBalances: optional(nullable(array(TokenBalanceResult)))
    });
    GetBlockRpcResult = jsonRpcResult(nullable(type({
      blockhash: string(),
      previousBlockhash: string(),
      parentSlot: number(),
      transactions: array(type({
        transaction: ConfirmedTransactionResult,
        meta: nullable(ConfirmedTransactionMetaResult)
      })),
      rewards: optional(array(type({
        pubkey: string(),
        lamports: number(),
        postBalance: nullable(number()),
        rewardType: nullable(string())
      }))),
      blockTime: nullable(number()),
      blockHeight: nullable(number())
    })));
    GetConfirmedBlockRpcResult = jsonRpcResult(nullable(type({
      blockhash: string(),
      previousBlockhash: string(),
      parentSlot: number(),
      transactions: array(type({
        transaction: ConfirmedTransactionResult,
        meta: nullable(ConfirmedTransactionMetaResult)
      })),
      rewards: optional(array(type({
        pubkey: string(),
        lamports: number(),
        postBalance: nullable(number()),
        rewardType: nullable(string())
      }))),
      blockTime: nullable(number())
    })));
    GetBlockSignaturesRpcResult = jsonRpcResult(nullable(type({
      blockhash: string(),
      previousBlockhash: string(),
      parentSlot: number(),
      signatures: array(string()),
      blockTime: nullable(number())
    })));
    GetTransactionRpcResult = jsonRpcResult(nullable(type({
      slot: number(),
      meta: ConfirmedTransactionMetaResult,
      blockTime: optional(nullable(number())),
      transaction: ConfirmedTransactionResult
    })));
    GetParsedTransactionRpcResult = jsonRpcResult(nullable(type({
      slot: number(),
      transaction: ParsedConfirmedTransactionResult,
      meta: nullable(ParsedConfirmedTransactionMetaResult),
      blockTime: optional(nullable(number()))
    })));
    GetRecentBlockhashAndContextRpcResult = jsonRpcResultAndContext(type({
      blockhash: string(),
      feeCalculator: type({
        lamportsPerSignature: number()
      })
    }));
    GetLatestBlockhashRpcResult = jsonRpcResultAndContext(type({
      blockhash: string(),
      lastValidBlockHeight: number()
    }));
    PerfSampleResult = type({
      slot: number(),
      numTransactions: number(),
      numSlots: number(),
      samplePeriodSecs: number()
    });
    GetRecentPerformanceSamplesRpcResult = jsonRpcResult(array(PerfSampleResult));
    GetFeeCalculatorRpcResult = jsonRpcResultAndContext(nullable(type({
      feeCalculator: type({
        lamportsPerSignature: number()
      })
    })));
    RequestAirdropRpcResult = jsonRpcResult(string());
    SendTransactionRpcResult = jsonRpcResult(string());
    LogsResult = type({
      err: TransactionErrorResult,
      logs: array(string()),
      signature: string()
    });
    LogsNotificationResult = type({
      result: notificationResultAndContext(LogsResult),
      subscription: number()
    });
    Keypair = class {
      constructor(keypair) {
        this._keypair = void 0;
        if (keypair) {
          this._keypair = keypair;
        } else {
          this._keypair = import_tweetnacl.default.sign.keyPair();
        }
      }
      static generate() {
        return new Keypair(import_tweetnacl.default.sign.keyPair());
      }
      static fromSecretKey(secretKey, options) {
        const keypair = import_tweetnacl.default.sign.keyPair.fromSecretKey(secretKey);
        if (!options || !options.skipValidation) {
          const encoder = new TextEncoder();
          const signData = encoder.encode("@solana/web3.js-validation-v1");
          const signature = import_tweetnacl.default.sign.detached(signData, keypair.secretKey);
          if (!import_tweetnacl.default.sign.detached.verify(signData, signature, keypair.publicKey)) {
            throw new Error("provided secretKey is invalid");
          }
        }
        return new Keypair(keypair);
      }
      static fromSeed(seed) {
        return new Keypair(import_tweetnacl.default.sign.keyPair.fromSeed(seed));
      }
      get publicKey() {
        return new PublicKey(this._keypair.publicKey);
      }
      get secretKey() {
        return this._keypair.secretKey;
      }
    };
    PRIVATE_KEY_BYTES$1 = 64;
    PUBLIC_KEY_BYTES$1 = 32;
    SIGNATURE_BYTES = 64;
    ED25519_INSTRUCTION_LAYOUT = BufferLayout.struct([BufferLayout.u8("numSignatures"), BufferLayout.u8("padding"), BufferLayout.u16("signatureOffset"), BufferLayout.u16("signatureInstructionIndex"), BufferLayout.u16("publicKeyOffset"), BufferLayout.u16("publicKeyInstructionIndex"), BufferLayout.u16("messageDataOffset"), BufferLayout.u16("messageDataSize"), BufferLayout.u16("messageInstructionIndex")]);
    Ed25519Program = class {
      constructor() {
      }
      static createInstructionWithPublicKey(params) {
        const {
          publicKey: publicKey2,
          message,
          signature,
          instructionIndex
        } = params;
        assert2(publicKey2.length === PUBLIC_KEY_BYTES$1, `Public Key must be ${PUBLIC_KEY_BYTES$1} bytes but received ${publicKey2.length} bytes`);
        assert2(signature.length === SIGNATURE_BYTES, `Signature must be ${SIGNATURE_BYTES} bytes but received ${signature.length} bytes`);
        const publicKeyOffset = ED25519_INSTRUCTION_LAYOUT.span;
        const signatureOffset = publicKeyOffset + publicKey2.length;
        const messageDataOffset = signatureOffset + signature.length;
        const numSignatures = 1;
        const instructionData = Buffer2.alloc(messageDataOffset + message.length);
        ED25519_INSTRUCTION_LAYOUT.encode({
          numSignatures,
          padding: 0,
          signatureOffset,
          signatureInstructionIndex: instructionIndex,
          publicKeyOffset,
          publicKeyInstructionIndex: instructionIndex,
          messageDataOffset,
          messageDataSize: message.length,
          messageInstructionIndex: instructionIndex
        }, instructionData);
        instructionData.fill(publicKey2, publicKeyOffset);
        instructionData.fill(signature, signatureOffset);
        instructionData.fill(message, messageDataOffset);
        return new TransactionInstruction({
          keys: [],
          programId: Ed25519Program.programId,
          data: instructionData
        });
      }
      static createInstructionWithPrivateKey(params) {
        const {
          privateKey,
          message,
          instructionIndex
        } = params;
        assert2(privateKey.length === PRIVATE_KEY_BYTES$1, `Private key must be ${PRIVATE_KEY_BYTES$1} bytes but received ${privateKey.length} bytes`);
        try {
          const keypair = Keypair.fromSecretKey(privateKey);
          const publicKey2 = keypair.publicKey.toBytes();
          const signature = import_tweetnacl.default.sign.detached(message, keypair.secretKey);
          return this.createInstructionWithPublicKey({
            publicKey: publicKey2,
            message,
            signature,
            instructionIndex
          });
        } catch (error) {
          throw new Error(`Error creating instruction; ${error}`);
        }
      }
    };
    Ed25519Program.programId = new PublicKey("Ed25519SigVerify111111111111111111111111111");
    STAKE_CONFIG_ID = new PublicKey("StakeConfig11111111111111111111111111111111");
    Lockup = class {
      constructor(unixTimestamp, epoch, custodian) {
        this.unixTimestamp = void 0;
        this.epoch = void 0;
        this.custodian = void 0;
        this.unixTimestamp = unixTimestamp;
        this.epoch = epoch;
        this.custodian = custodian;
      }
    };
    Lockup.default = new Lockup(0, 0, PublicKey.default);
    STAKE_INSTRUCTION_LAYOUTS = Object.freeze({
      Initialize: {
        index: 0,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), authorized(), lockup()])
      },
      Authorize: {
        index: 1,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("newAuthorized"), BufferLayout.u32("stakeAuthorizationType")])
      },
      Delegate: {
        index: 2,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      },
      Split: {
        index: 3,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
      },
      Withdraw: {
        index: 4,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
      },
      Deactivate: {
        index: 5,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      },
      Merge: {
        index: 7,
        layout: BufferLayout.struct([BufferLayout.u32("instruction")])
      },
      AuthorizeWithSeed: {
        index: 8,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("newAuthorized"), BufferLayout.u32("stakeAuthorizationType"), rustString("authoritySeed"), publicKey("authorityOwner")])
      }
    });
    StakeAuthorizationLayout = Object.freeze({
      Staker: {
        index: 0
      },
      Withdrawer: {
        index: 1
      }
    });
    StakeProgram = class {
      constructor() {
      }
      static initialize(params) {
        const {
          stakePubkey,
          authorized: authorized2,
          lockup: maybeLockup
        } = params;
        const lockup2 = maybeLockup || Lockup.default;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Initialize;
        const data = encodeData(type2, {
          authorized: {
            staker: toBuffer(authorized2.staker.toBuffer()),
            withdrawer: toBuffer(authorized2.withdrawer.toBuffer())
          },
          lockup: {
            unixTimestamp: lockup2.unixTimestamp,
            epoch: lockup2.epoch,
            custodian: toBuffer(lockup2.custodian.toBuffer())
          }
        });
        const instructionData = {
          keys: [{
            pubkey: stakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
          }],
          programId: this.programId,
          data
        };
        return new TransactionInstruction(instructionData);
      }
      static createAccountWithSeed(params) {
        const transaction = new Transaction();
        transaction.add(SystemProgram.createAccountWithSeed({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.stakePubkey,
          basePubkey: params.basePubkey,
          seed: params.seed,
          lamports: params.lamports,
          space: this.space,
          programId: this.programId
        }));
        const {
          stakePubkey,
          authorized: authorized2,
          lockup: lockup2
        } = params;
        return transaction.add(this.initialize({
          stakePubkey,
          authorized: authorized2,
          lockup: lockup2
        }));
      }
      static createAccount(params) {
        const transaction = new Transaction();
        transaction.add(SystemProgram.createAccount({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.stakePubkey,
          lamports: params.lamports,
          space: this.space,
          programId: this.programId
        }));
        const {
          stakePubkey,
          authorized: authorized2,
          lockup: lockup2
        } = params;
        return transaction.add(this.initialize({
          stakePubkey,
          authorized: authorized2,
          lockup: lockup2
        }));
      }
      static delegate(params) {
        const {
          stakePubkey,
          authorizedPubkey,
          votePubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Delegate;
        const data = encodeData(type2);
        return new Transaction().add({
          keys: [{
            pubkey: stakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: votePubkey,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: STAKE_CONFIG_ID,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
      static authorize(params) {
        const {
          stakePubkey,
          authorizedPubkey,
          newAuthorizedPubkey,
          stakeAuthorizationType,
          custodianPubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Authorize;
        const data = encodeData(type2, {
          newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
          stakeAuthorizationType: stakeAuthorizationType.index
        });
        const keys = [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }];
        if (custodianPubkey) {
          keys.push({
            pubkey: custodianPubkey,
            isSigner: false,
            isWritable: false
          });
        }
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
      static authorizeWithSeed(params) {
        const {
          stakePubkey,
          authorityBase,
          authoritySeed,
          authorityOwner,
          newAuthorizedPubkey,
          stakeAuthorizationType,
          custodianPubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.AuthorizeWithSeed;
        const data = encodeData(type2, {
          newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
          stakeAuthorizationType: stakeAuthorizationType.index,
          authoritySeed,
          authorityOwner: toBuffer(authorityOwner.toBuffer())
        });
        const keys = [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: authorityBase,
          isSigner: true,
          isWritable: false
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }];
        if (custodianPubkey) {
          keys.push({
            pubkey: custodianPubkey,
            isSigner: false,
            isWritable: false
          });
        }
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
      static split(params) {
        const {
          stakePubkey,
          authorizedPubkey,
          splitStakePubkey,
          lamports
        } = params;
        const transaction = new Transaction();
        transaction.add(SystemProgram.createAccount({
          fromPubkey: authorizedPubkey,
          newAccountPubkey: splitStakePubkey,
          lamports: 0,
          space: this.space,
          programId: this.programId
        }));
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Split;
        const data = encodeData(type2, {
          lamports
        });
        return transaction.add({
          keys: [{
            pubkey: stakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: splitStakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
      static merge(params) {
        const {
          stakePubkey,
          sourceStakePubKey,
          authorizedPubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Merge;
        const data = encodeData(type2);
        return new Transaction().add({
          keys: [{
            pubkey: stakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: sourceStakePubKey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
      static withdraw(params) {
        const {
          stakePubkey,
          authorizedPubkey,
          toPubkey,
          lamports,
          custodianPubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Withdraw;
        const data = encodeData(type2, {
          lamports
        });
        const keys = [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: toPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }];
        if (custodianPubkey) {
          keys.push({
            pubkey: custodianPubkey,
            isSigner: false,
            isWritable: false
          });
        }
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
      static deactivate(params) {
        const {
          stakePubkey,
          authorizedPubkey
        } = params;
        const type2 = STAKE_INSTRUCTION_LAYOUTS.Deactivate;
        const data = encodeData(type2);
        return new Transaction().add({
          keys: [{
            pubkey: stakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: authorizedPubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        });
      }
    };
    StakeProgram.programId = new PublicKey("Stake11111111111111111111111111111111111111");
    StakeProgram.space = 200;
    ({
      publicKeyCreate,
      ecdsaSign
    } = import_secp256k1.default);
    PRIVATE_KEY_BYTES = 32;
    ETHEREUM_ADDRESS_BYTES = 20;
    PUBLIC_KEY_BYTES = 64;
    SIGNATURE_OFFSETS_SERIALIZED_SIZE = 11;
    SECP256K1_INSTRUCTION_LAYOUT = BufferLayout.struct([BufferLayout.u8("numSignatures"), BufferLayout.u16("signatureOffset"), BufferLayout.u8("signatureInstructionIndex"), BufferLayout.u16("ethAddressOffset"), BufferLayout.u8("ethAddressInstructionIndex"), BufferLayout.u16("messageDataOffset"), BufferLayout.u16("messageDataSize"), BufferLayout.u8("messageInstructionIndex"), BufferLayout.blob(20, "ethAddress"), BufferLayout.blob(64, "signature"), BufferLayout.u8("recoveryId")]);
    Secp256k1Program = class {
      constructor() {
      }
      static publicKeyToEthAddress(publicKey2) {
        assert2(publicKey2.length === PUBLIC_KEY_BYTES, `Public key must be ${PUBLIC_KEY_BYTES} bytes but received ${publicKey2.length} bytes`);
        try {
          return Buffer2.from(import_js_sha3.default.keccak_256.update(toBuffer(publicKey2)).digest()).slice(-ETHEREUM_ADDRESS_BYTES);
        } catch (error) {
          throw new Error(`Error constructing Ethereum address: ${error}`);
        }
      }
      static createInstructionWithPublicKey(params) {
        const {
          publicKey: publicKey2,
          message,
          signature,
          recoveryId,
          instructionIndex
        } = params;
        return Secp256k1Program.createInstructionWithEthAddress({
          ethAddress: Secp256k1Program.publicKeyToEthAddress(publicKey2),
          message,
          signature,
          recoveryId,
          instructionIndex
        });
      }
      static createInstructionWithEthAddress(params) {
        const {
          ethAddress: rawAddress,
          message,
          signature,
          recoveryId,
          instructionIndex = 0
        } = params;
        let ethAddress;
        if (typeof rawAddress === "string") {
          if (rawAddress.startsWith("0x")) {
            ethAddress = Buffer2.from(rawAddress.substr(2), "hex");
          } else {
            ethAddress = Buffer2.from(rawAddress, "hex");
          }
        } else {
          ethAddress = rawAddress;
        }
        assert2(ethAddress.length === ETHEREUM_ADDRESS_BYTES, `Address must be ${ETHEREUM_ADDRESS_BYTES} bytes but received ${ethAddress.length} bytes`);
        const dataStart = 1 + SIGNATURE_OFFSETS_SERIALIZED_SIZE;
        const ethAddressOffset = dataStart;
        const signatureOffset = dataStart + ethAddress.length;
        const messageDataOffset = signatureOffset + signature.length + 1;
        const numSignatures = 1;
        const instructionData = Buffer2.alloc(SECP256K1_INSTRUCTION_LAYOUT.span + message.length);
        SECP256K1_INSTRUCTION_LAYOUT.encode({
          numSignatures,
          signatureOffset,
          signatureInstructionIndex: instructionIndex,
          ethAddressOffset,
          ethAddressInstructionIndex: instructionIndex,
          messageDataOffset,
          messageDataSize: message.length,
          messageInstructionIndex: instructionIndex,
          signature: toBuffer(signature),
          ethAddress: toBuffer(ethAddress),
          recoveryId
        }, instructionData);
        instructionData.fill(toBuffer(message), SECP256K1_INSTRUCTION_LAYOUT.span);
        return new TransactionInstruction({
          keys: [],
          programId: Secp256k1Program.programId,
          data: instructionData
        });
      }
      static createInstructionWithPrivateKey(params) {
        const {
          privateKey: pkey,
          message,
          instructionIndex
        } = params;
        assert2(pkey.length === PRIVATE_KEY_BYTES, `Private key must be ${PRIVATE_KEY_BYTES} bytes but received ${pkey.length} bytes`);
        try {
          const privateKey = toBuffer(pkey);
          const publicKey2 = publicKeyCreate(privateKey, false).slice(1);
          const messageHash = Buffer2.from(import_js_sha3.default.keccak_256.update(toBuffer(message)).digest());
          const {
            signature,
            recid: recoveryId
          } = ecdsaSign(messageHash, privateKey);
          return this.createInstructionWithPublicKey({
            publicKey: publicKey2,
            message,
            signature,
            recoveryId,
            instructionIndex
          });
        } catch (error) {
          throw new Error(`Error creating instruction; ${error}`);
        }
      }
    };
    Secp256k1Program.programId = new PublicKey("KeccakSecp256k11111111111111111111111111111");
    VALIDATOR_INFO_KEY = new PublicKey("Va1idator1nfo111111111111111111111111111111");
    InfoString = type({
      name: string(),
      website: optional(string()),
      details: optional(string()),
      keybaseUsername: optional(string())
    });
    VOTE_PROGRAM_ID = new PublicKey("Vote111111111111111111111111111111111111111");
    VoteAccountLayout = BufferLayout.struct([
      publicKey("nodePubkey"),
      publicKey("authorizedWithdrawer"),
      BufferLayout.u8("commission"),
      BufferLayout.nu64(),
      BufferLayout.seq(BufferLayout.struct([BufferLayout.nu64("slot"), BufferLayout.u32("confirmationCount")]), BufferLayout.offset(BufferLayout.u32(), -8), "votes"),
      BufferLayout.u8("rootSlotValid"),
      BufferLayout.nu64("rootSlot"),
      BufferLayout.nu64(),
      BufferLayout.seq(BufferLayout.struct([BufferLayout.nu64("epoch"), publicKey("authorizedVoter")]), BufferLayout.offset(BufferLayout.u32(), -8), "authorizedVoters"),
      BufferLayout.struct([BufferLayout.seq(BufferLayout.struct([publicKey("authorizedPubkey"), BufferLayout.nu64("epochOfLastAuthorizedSwitch"), BufferLayout.nu64("targetEpoch")]), 32, "buf"), BufferLayout.nu64("idx"), BufferLayout.u8("isEmpty")], "priorVoters"),
      BufferLayout.nu64(),
      BufferLayout.seq(BufferLayout.struct([BufferLayout.nu64("epoch"), BufferLayout.nu64("credits"), BufferLayout.nu64("prevCredits")]), BufferLayout.offset(BufferLayout.u32(), -8), "epochCredits"),
      BufferLayout.struct([BufferLayout.nu64("slot"), BufferLayout.nu64("timestamp")], "lastTimestamp")
    ]);
    VOTE_INSTRUCTION_LAYOUTS = Object.freeze({
      InitializeAccount: {
        index: 0,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), voteInit()])
      },
      Authorize: {
        index: 1,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("newAuthorized"), BufferLayout.u32("voteAuthorizationType")])
      },
      Withdraw: {
        index: 3,
        layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
      }
    });
    VoteAuthorizationLayout = Object.freeze({
      Voter: {
        index: 0
      },
      Withdrawer: {
        index: 1
      }
    });
    VoteProgram = class {
      constructor() {
      }
      static initializeAccount(params) {
        const {
          votePubkey,
          nodePubkey,
          voteInit: voteInit2
        } = params;
        const type2 = VOTE_INSTRUCTION_LAYOUTS.InitializeAccount;
        const data = encodeData(type2, {
          voteInit: {
            nodePubkey: toBuffer(voteInit2.nodePubkey.toBuffer()),
            authorizedVoter: toBuffer(voteInit2.authorizedVoter.toBuffer()),
            authorizedWithdrawer: toBuffer(voteInit2.authorizedWithdrawer.toBuffer()),
            commission: voteInit2.commission
          }
        });
        const instructionData = {
          keys: [{
            pubkey: votePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: nodePubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        };
        return new TransactionInstruction(instructionData);
      }
      static createAccount(params) {
        const transaction = new Transaction();
        transaction.add(SystemProgram.createAccount({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.votePubkey,
          lamports: params.lamports,
          space: this.space,
          programId: this.programId
        }));
        return transaction.add(this.initializeAccount({
          votePubkey: params.votePubkey,
          nodePubkey: params.voteInit.nodePubkey,
          voteInit: params.voteInit
        }));
      }
      static authorize(params) {
        const {
          votePubkey,
          authorizedPubkey,
          newAuthorizedPubkey,
          voteAuthorizationType
        } = params;
        const type2 = VOTE_INSTRUCTION_LAYOUTS.Authorize;
        const data = encodeData(type2, {
          newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
          voteAuthorizationType: voteAuthorizationType.index
        });
        const keys = [{
          pubkey: votePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }];
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
      static withdraw(params) {
        const {
          votePubkey,
          authorizedWithdrawerPubkey,
          lamports,
          toPubkey
        } = params;
        const type2 = VOTE_INSTRUCTION_LAYOUTS.Withdraw;
        const data = encodeData(type2, {
          lamports
        });
        const keys = [{
          pubkey: votePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: toPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: authorizedWithdrawerPubkey,
          isSigner: true,
          isWritable: false
        }];
        return new Transaction().add({
          keys,
          programId: this.programId,
          data
        });
      }
    };
    VoteProgram.programId = new PublicKey("Vote111111111111111111111111111111111111111");
    VoteProgram.space = 3731;
  }
});

// node_modules/@web3auth/solana-provider/dist/solanaProvider.esm.js
function createGetAccountsMiddleware(_ref) {
  let {
    getAccounts
  } = _ref;
  return createAsyncMiddleware(async (request, response, next) => {
    const {
      method
    } = request;
    if (method !== "getAccounts")
      return next();
    if (!getAccounts)
      throw new Error("WalletMiddleware - opts.getAccounts not provided");
    const accounts = await getAccounts(request);
    response.result = accounts;
    return void 0;
  });
}
function createRequestAccountsMiddleware(_ref2) {
  let {
    requestAccounts
  } = _ref2;
  return createAsyncMiddleware(async (request, response, next) => {
    const {
      method
    } = request;
    if (method !== "requestAccounts")
      return next();
    if (!requestAccounts)
      throw new Error("WalletMiddleware - opts.requestAccounts not provided");
    const accounts = await requestAccounts(request);
    response.result = accounts;
    return void 0;
  });
}
function createGenericJRPCMiddleware(targetMethod, handler) {
  return createAsyncMiddleware(async (request, response, next) => {
    const {
      method
    } = request;
    if (method !== targetMethod)
      return next();
    if (!handler)
      throw new Error("WalletMiddleware - ".concat(targetMethod, " not provided"));
    const result = await handler(request);
    response.result = result;
    return void 0;
  });
}
function createSolanaMiddleware(providerHandlers) {
  const {
    getAccounts,
    requestAccounts,
    signTransaction,
    signAndSendTransaction,
    signAllTransactions,
    signMessage,
    getPrivateKey
  } = providerHandlers;
  return mergeMiddleware([createRequestAccountsMiddleware({
    requestAccounts
  }), createGetAccountsMiddleware({
    getAccounts
  }), createGenericJRPCMiddleware("signTransaction", signTransaction), createGenericJRPCMiddleware("signAndSendTransaction", signAndSendTransaction), createGenericJRPCMiddleware("signAllTransactions", signAllTransactions), createGenericJRPCMiddleware("signMessage", signMessage), createGenericJRPCMiddleware("solanaPrivateKey", getPrivateKey)]);
}
function createChainSwitchMiddleware(_ref3) {
  let {
    addNewChainConfig,
    switchSolanaChain
  } = _ref3;
  return mergeMiddleware([createGenericJRPCMiddleware("addSolanaChain", addNewChainConfig), createGenericJRPCMiddleware("switchSolanaChain", switchSolanaChain)]);
}
function createAccountMiddleware(_ref4) {
  let {
    updatePrivatekey
  } = _ref4;
  return mergeMiddleware([createGenericJRPCMiddleware("updateAccount", updatePrivatekey)]);
}
function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys$3(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function createInjectedProviderProxyMiddleware(provider) {
  return createAsyncMiddleware(async (req, res, _next) => {
    const result = await provider.request(_objectSpread$3({}, req));
    res.result = result;
  });
}
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
function createChainIdMiddleware(chainId) {
  return (req, res, next, end) => {
    if (req.method === "solana_chainId") {
      res.result = chainId;
      return end();
    }
    return next();
  };
}
function createProviderConfigMiddleware(providerConfig) {
  return (req, res, next, end) => {
    if (req.method === "solana_provider_config") {
      res.result = providerConfig;
      return end();
    }
    return next();
  };
}
function createJsonRpcClient(providerConfig) {
  const {
    chainId,
    rpcTarget
  } = providerConfig;
  const fetchMiddleware = createFetchMiddleware({
    rpcTarget
  });
  const networkMiddleware = mergeMiddleware([createChainIdMiddleware(chainId), createProviderConfigMiddleware(providerConfig), fetchMiddleware]);
  return {
    networkMiddleware,
    fetchMiddleware
  };
}
async function getProviderHandlers(_ref) {
  let {
    privKey,
    getProviderEngineProxy
  } = _ref;
  const transactionGenerator = (serializedTx) => {
    const decodedTx = import_bs582.default.decode(serializedTx);
    const tx = Transaction.populate(Message.from(decodedTx));
    return tx;
  };
  const keyPairGenerator = () => {
    return Keypair.fromSecretKey(Buffer.from(privKey, "hex"));
  };
  if (typeof privKey !== "string")
    throw WalletInitializationError.invalidParams("privKey must be a string");
  const keyPair = keyPairGenerator();
  const providerHandlers = {
    requestAccounts: async () => {
      return [keyPair.publicKey.toBase58()];
    },
    getAccounts: async () => [keyPair.publicKey.toBase58()],
    getPrivateKey: async () => privKey,
    signTransaction: async (req) => {
      var _req$params, _req$params2;
      if (!((_req$params = req.params) !== null && _req$params !== void 0 && _req$params.message)) {
        throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("message");
      }
      const transaction = transactionGenerator((_req$params2 = req.params) === null || _req$params2 === void 0 ? void 0 : _req$params2.message);
      transaction.partialSign(keyPair);
      return transaction;
    },
    signMessage: async (req) => {
      var _req$params3;
      if (!((_req$params3 = req.params) !== null && _req$params3 !== void 0 && _req$params3.message)) {
        throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("message");
      }
      const signedMsg = import_tweetnacl_js.default.sign.detached(req.params.message, keyPair.secretKey);
      return signedMsg;
    },
    signAndSendTransaction: async (req) => {
      var _req$params4, _req$params5;
      if (!((_req$params4 = req.params) !== null && _req$params4 !== void 0 && _req$params4.message)) {
        throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("message");
      }
      const _providerEngineProxy = getProviderEngineProxy();
      if (!_providerEngineProxy)
        throw import_eth_rpc_errors.ethErrors.provider.custom({
          message: "Provider is not initialized",
          code: 4902
        });
      const transaction = transactionGenerator((_req$params5 = req.params) === null || _req$params5 === void 0 ? void 0 : _req$params5.message);
      transaction.sign(keyPair);
      const sig = await _providerEngineProxy.request({
        method: "sendTransaction",
        params: [import_bs582.default.encode(transaction.serialize())]
      });
      return {
        signature: sig
      };
    },
    signAllTransactions: async (req) => {
      var _req$params6, _req$params7;
      if (!((_req$params6 = req.params) !== null && _req$params6 !== void 0 && _req$params6.message) || !((_req$params7 = req.params) !== null && _req$params7 !== void 0 && _req$params7.message.length)) {
        throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("message");
      }
      const signedTransactions = [];
      for (const tx of ((_req$params8 = req.params) === null || _req$params8 === void 0 ? void 0 : _req$params8.message) || []) {
        var _req$params8;
        const transaction = transactionGenerator(tx);
        transaction.partialSign(keyPair);
        signedTransactions.push(transaction);
      }
      return signedTransactions;
    }
  };
  return providerHandlers;
}
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
var import_bs582, import_eth_rpc_errors, import_tweetnacl_js, getPhantomHandlers, PhantomInjectedProvider, getTorusHandlers, TorusInjectedProvider, SolanaPrivateKeyProvider, SolanaWallet;
var init_solanaProvider_esm = __esm({
  "node_modules/@web3auth/solana-provider/dist/solanaProvider.esm.js"() {
    init_react();
    init_defineProperty();
    init_baseControllers_esm();
    init_openloginJrpc_esm();
    init_base_esm();
    init_baseProvider_esm();
    init_index_browser_esm();
    import_bs582 = __toModule(require_bs58());
    import_eth_rpc_errors = __toModule(require_dist());
    import_tweetnacl_js = __toModule(require_nacl_fast2());
    getPhantomHandlers = (injectedProvider) => {
      const providerHandlers = {
        requestAccounts: async () => {
          return injectedProvider.publicKey ? [import_bs582.default.encode(injectedProvider.publicKey.toBytes())] : [];
        },
        getAccounts: async () => injectedProvider.publicKey ? [import_bs582.default.encode(injectedProvider.publicKey.toBytes())] : [],
        getPrivateKey: async () => {
          throw import_eth_rpc_errors.ethErrors.rpc.methodNotSupported();
        },
        signTransaction: async (req) => {
          const message = import_bs582.default.decode(req.params.message);
          const txn = Transaction.from(message);
          const transaction = await injectedProvider.signTransaction(txn);
          return transaction;
        },
        signMessage: async (req) => {
          var _req$params;
          const message = await injectedProvider.request({
            method: "signMessage",
            params: {
              message: (_req$params = req.params) === null || _req$params === void 0 ? void 0 : _req$params.message
            }
          });
          return message;
        },
        signAndSendTransaction: async (req) => {
          const message = import_bs582.default.decode(req.params.message);
          const txn = Transaction.from(message);
          const txRes = await injectedProvider.signAndSendTransaction(txn);
          return {
            signature: txRes.signature
          };
        },
        signAllTransactions: async (req) => {
          var _req$params2, _req$params3;
          if (!((_req$params2 = req.params) !== null && _req$params2 !== void 0 && _req$params2.message) || !((_req$params3 = req.params) !== null && _req$params3 !== void 0 && _req$params3.message.length)) {
            throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("message");
          }
          const txns = req.params.message.map((msg) => {
            const decodedMsg = import_bs582.default.decode(msg);
            return Transaction.from(decodedMsg);
          });
          const transaction = await injectedProvider.signAllTransactions(txns);
          return transaction;
        }
      };
      return providerHandlers;
    };
    PhantomInjectedProvider = class extends BaseProvider {
      constructor(_ref) {
        let {
          config,
          state
        } = _ref;
        super({
          config: {
            chainConfig: _objectSpread$2(_objectSpread$2({}, config.chainConfig), {}, {
              chainNamespace: CHAIN_NAMESPACES.SOLANA
            })
          },
          state
        });
      }
      async switchChain(_) {
        return Promise.resolve();
      }
      async setupProvider(injectedProvider) {
        const providerHandlers = getPhantomHandlers(injectedProvider);
        const solanaMiddleware = createSolanaMiddleware(providerHandlers);
        const injectedProviderProxy = createInjectedProviderProxyMiddleware(injectedProvider);
        const engine = new JRPCEngine();
        engine.push(solanaMiddleware);
        engine.push(injectedProviderProxy);
        const provider = providerFromEngine(engine);
        this.updateProviderEngineProxy(provider);
        await this.lookupNetwork(injectedProvider);
      }
      async lookupNetwork(_) {
        const {
          chainConfig
        } = this.config;
        this.update({
          chainId: chainConfig.chainId
        });
        return chainConfig.chainId || "";
      }
    };
    getTorusHandlers = (injectedProvider) => {
      const providerHandlers = {
        requestAccounts: async () => {
          const accounts = await injectedProvider.request({
            method: "solana_requestAccounts",
            params: {}
          });
          return accounts;
        },
        getAccounts: async () => {
          const accounts = await injectedProvider.request({
            method: "solana_accounts",
            params: {}
          });
          return accounts;
        },
        getPrivateKey: async () => {
          throw import_eth_rpc_errors.ethErrors.rpc.methodNotSupported();
        },
        signMessage: async (req) => {
          var _req$params;
          const message = await injectedProvider.request({
            method: "sign_message",
            params: {
              data: (_req$params = req.params) === null || _req$params === void 0 ? void 0 : _req$params.message
            }
          });
          return message;
        },
        signTransaction: async (req) => {
          var _req$params2;
          if (!((_req$params2 = req.params) !== null && _req$params2 !== void 0 && _req$params2.message)) {
            throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("message");
          }
          const message = import_bs582.default.decode(req.params.message).toString("hex");
          const response = await injectedProvider.request({
            method: "sign_transaction",
            params: {
              message
            }
          });
          const buf = Buffer.from(response, "hex");
          const sendTx = Transaction.from(buf);
          return sendTx;
        },
        signAndSendTransaction: async (req) => {
          var _req$params3;
          if (!((_req$params3 = req.params) !== null && _req$params3 !== void 0 && _req$params3.message)) {
            throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("message");
          }
          const message = import_bs582.default.decode(req.params.message).toString("hex");
          const response = await injectedProvider.request({
            method: "send_transaction",
            params: {
              message
            }
          });
          return {
            signature: response
          };
        },
        signAllTransactions: async (req) => {
          var _req$params4, _req$params5;
          if (!((_req$params4 = req.params) !== null && _req$params4 !== void 0 && _req$params4.message) || !((_req$params5 = req.params) !== null && _req$params5 !== void 0 && _req$params5.message.length)) {
            throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("message");
          }
          const messages = [];
          for (const transaction of req.params.message) {
            const message = import_bs582.default.decode(transaction).toString("hex");
            messages.push(message);
          }
          const response = await injectedProvider.request({
            method: "sign_all_transactions",
            params: {
              message: messages
            }
          });
          return response;
        }
      };
      return providerHandlers;
    };
    TorusInjectedProvider = class extends BaseProvider {
      constructor(_ref) {
        let {
          config,
          state
        } = _ref;
        super({
          config: {
            chainConfig: _objectSpread$1(_objectSpread$1({}, config.chainConfig), {}, {
              chainNamespace: CHAIN_NAMESPACES.SOLANA
            })
          },
          state
        });
      }
      async switchChain(_) {
        return Promise.resolve();
      }
      async setupProvider(injectedProvider) {
        this.handleInjectedProviderUpdate(injectedProvider);
        await this.setupEngine(injectedProvider);
      }
      async lookupNetwork() {
        if (!this.provider)
          throw import_eth_rpc_errors.ethErrors.provider.custom({
            message: "Torus solana provider is not initialized",
            code: 4902
          });
        const {
          chainId
        } = this.config.chainConfig;
        const connectedChainId = await this.provider.request({
          method: "solana_chainId"
        });
        const connectedHexChainId = isHexStrict(connectedChainId.toString()) ? connectedChainId : "0x".concat(parseInt(connectedChainId, 10).toString(16));
        if (chainId !== connectedHexChainId)
          throw WalletInitializationError.rpcConnectionError("Invalid network, net_version is: ".concat(connectedHexChainId, ", expected: ").concat(chainId));
        this.update({
          chainId: connectedHexChainId
        });
        this.provider.emit("connect", {
          chainId: this.state.chainId
        });
        this.provider.emit("chainChanged", this.state.chainId);
        return this.state.chainId;
      }
      async setupEngine(injectedProvider) {
        const providerHandlers = getTorusHandlers(injectedProvider);
        const solanaMiddleware = createSolanaMiddleware(providerHandlers);
        const injectedProviderProxy = createInjectedProviderProxyMiddleware(injectedProvider);
        const engine = new JRPCEngine();
        engine.push(solanaMiddleware);
        engine.push(injectedProviderProxy);
        const provider = providerFromEngine(engine);
        this.updateProviderEngineProxy(provider);
        await this.lookupNetwork();
      }
      async handleInjectedProviderUpdate(injectedProvider) {
        injectedProvider.on("accountsChanged", async (accounts) => {
          this.provider.emit("accountsChanged", accounts);
        });
        injectedProvider.on("chainChanged", async (chainId) => {
          const connectedHexChainId = isHexStrict(chainId) ? chainId : "0x".concat(parseInt(chainId, 10).toString(16));
          this.configure({
            chainConfig: _objectSpread$1(_objectSpread$1({}, this.config.chainConfig), {}, {
              chainId: connectedHexChainId
            })
          });
          await this.setupProvider(injectedProvider);
        });
      }
    };
    SolanaPrivateKeyProvider = class extends BaseProvider {
      constructor(_ref) {
        let {
          config,
          state
        } = _ref;
        super({
          config: {
            chainConfig: _objectSpread(_objectSpread({}, config.chainConfig), {}, {
              chainNamespace: CHAIN_NAMESPACES.SOLANA
            })
          },
          state
        });
      }
      async enable() {
        if (!this.state.privateKey)
          throw import_eth_rpc_errors.ethErrors.provider.custom({
            message: "Private key is not found in state, plz pass it in constructor state param",
            code: 4902
          });
        await this.setupProvider(this.state.privateKey);
        return this._providerEngineProxy.request({
          method: "eth_accounts"
        });
      }
      async setupProvider(privKey) {
        const providerHandlers = await getProviderHandlers({
          privKey,
          getProviderEngineProxy: this.getProviderEngineProxy.bind(this)
        });
        const solanaMiddleware = createSolanaMiddleware(providerHandlers);
        const engine = new JRPCEngine();
        const {
          networkMiddleware
        } = createJsonRpcClient(this.config.chainConfig);
        engine.push(this.getChainSwitchMiddleware());
        engine.push(this.getAccountMiddleware());
        engine.push(solanaMiddleware);
        engine.push(networkMiddleware);
        const provider = providerFromEngine(engine);
        this.updateProviderEngineProxy(provider);
        await this.lookupNetwork();
      }
      async updateAccount(params) {
        if (!this._providerEngineProxy)
          throw import_eth_rpc_errors.ethErrors.provider.custom({
            message: "Provider is not initialized",
            code: 4902
          });
        const existingKey = await this._providerEngineProxy.request({
          method: "solanaPrivateKey"
        });
        if (existingKey !== params.privateKey) {
          await this.setupProvider(params.privateKey);
          this._providerEngineProxy.emit("accountsChanged", {
            accounts: await this._providerEngineProxy.request({
              method: "requestAccounts"
            })
          });
        }
      }
      async switchChain(params) {
        if (!this._providerEngineProxy)
          throw import_eth_rpc_errors.ethErrors.provider.custom({
            message: "Provider is not initialized",
            code: 4902
          });
        const chainConfig = this.getChainConfig(params.chainId);
        this.update({
          chainId: "loading"
        });
        this.configure({
          chainConfig
        });
        const privKey = await this._providerEngineProxy.request({
          method: "solanaPrivateKey"
        });
        await this.setupProvider(privKey);
      }
      async lookupNetwork() {
        if (!this._providerEngineProxy)
          throw import_eth_rpc_errors.ethErrors.provider.custom({
            message: "Provider is not initialized",
            code: 4902
          });
        const health = await this._providerEngineProxy.request({
          method: "getHealth",
          params: []
        });
        const {
          chainConfig
        } = this.config;
        if (health !== "ok")
          throw WalletInitializationError.rpcConnectionError("Failed to lookup network for following rpc target: ".concat(chainConfig.rpcTarget));
        this.update({
          chainId: chainConfig.chainId
        });
        if (this.state.chainId !== chainConfig.chainId) {
          this.provider.emit("chainChanged", this.state.chainId);
          this.provider.emit("connect", {
            chainId: this.state.chainId
          });
        }
        return this.state.chainId;
      }
      getChainSwitchMiddleware() {
        const chainSwitchHandlers = {
          addNewChainConfig: async (req) => {
            if (!req.params)
              throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("Missing request params");
            const {
              chainId,
              chainName,
              rpcUrls,
              blockExplorerUrls,
              nativeCurrency
            } = req.params;
            if (!chainId)
              throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("Missing chainId in chainParams");
            if (!rpcUrls || rpcUrls.length === 0)
              throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("Missing rpcUrls in chainParams");
            if (!nativeCurrency)
              throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("Missing nativeCurrency in chainParams");
            this.addChain({
              chainNamespace: CHAIN_NAMESPACES.SOLANA,
              chainId,
              ticker: (nativeCurrency === null || nativeCurrency === void 0 ? void 0 : nativeCurrency.symbol) || "SOL",
              tickerName: (nativeCurrency === null || nativeCurrency === void 0 ? void 0 : nativeCurrency.name) || "Solana",
              displayName: chainName,
              rpcTarget: rpcUrls[0],
              blockExplorer: (blockExplorerUrls === null || blockExplorerUrls === void 0 ? void 0 : blockExplorerUrls[0]) || ""
            });
          },
          switchSolanaChain: async (req) => {
            if (!req.params)
              throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("Missing request params");
            if (!req.params.chainId)
              throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("Missing chainId");
            await this.switchChain(req.params);
          }
        };
        const chainSwitchMiddleware = createChainSwitchMiddleware(chainSwitchHandlers);
        return chainSwitchMiddleware;
      }
      getAccountMiddleware() {
        const accountHandlers = {
          updatePrivatekey: async (req) => {
            if (!req.params)
              throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("Missing request params");
            if (!req.params.privateKey)
              throw import_eth_rpc_errors.ethErrors.rpc.invalidParams("Missing privateKey");
            const {
              privateKey
            } = req.params;
            await this.updateAccount({
              privateKey
            });
          }
        };
        return createAccountMiddleware(accountHandlers);
      }
    };
    _defineProperty(SolanaPrivateKeyProvider, "getProviderInstance", async (params) => {
      const providerFactory = new SolanaPrivateKeyProvider({
        config: {
          chainConfig: params.chainConfig
        }
      });
      await providerFactory.setupProvider(params.privKey);
      return providerFactory;
    });
    SolanaWallet = class {
      constructor(provider) {
        _defineProperty(this, "provider", void 0);
        this.provider = provider;
      }
      async requestAccounts() {
        const accounts = await this.provider.request({
          method: "requestAccounts",
          params: {}
        });
        return accounts;
      }
      async signAndSendTransaction(transaction) {
        const {
          signature
        } = await this.provider.request({
          method: "signAndSendTransaction",
          params: {
            message: import_bs582.default.encode(transaction.serialize({
              requireAllSignatures: false
            }))
          }
        });
        return {
          signature
        };
      }
      async signTransaction(transaction) {
        const signedTransaction = await this.provider.request({
          method: "signTransaction",
          params: {
            message: import_bs582.default.encode(transaction.serialize({
              requireAllSignatures: false
            }))
          }
        });
        return signedTransaction;
      }
      async signAllTransactions(transactions) {
        const messages = transactions.map((transaction) => {
          return import_bs582.default.encode(transaction.serialize({
            requireAllSignatures: false
          }));
        });
        const signedTransaction = await this.provider.request({
          method: "signAllTransactions",
          params: {
            message: messages
          }
        });
        return signedTransaction;
      }
      async signMessage(data) {
        const response = await this.provider.request({
          method: "signMessage",
          params: {
            message: data
          }
        });
        return response;
      }
      async request(args) {
        const result = await this.provider.request(args);
        return result;
      }
    };
  }
});

export {
  Transaction,
  init_index_browser_esm,
  PhantomInjectedProvider,
  TorusInjectedProvider,
  SolanaPrivateKeyProvider,
  SolanaWallet,
  init_solanaProvider_esm
};
/*!
Copyright (C) 2013-2017 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
/**
 * Support for translating between Uint8Array instances and JavaScript
 * native types.
 *
 * {@link module:Layout~Layout|Layout} is the basis of a class
 * hierarchy that associates property names with sequences of encoded
 * bytes.
 *
 * Layouts are supported for these scalar (numeric) types:
 * * {@link module:Layout~UInt|Unsigned integers in little-endian
 *   format} with {@link module:Layout.u8|8-bit}, {@link
 *   module:Layout.u16|16-bit}, {@link module:Layout.u24|24-bit},
 *   {@link module:Layout.u32|32-bit}, {@link
 *   module:Layout.u40|40-bit}, and {@link module:Layout.u48|48-bit}
 *   representation ranges;
 * * {@link module:Layout~UIntBE|Unsigned integers in big-endian
 *   format} with {@link module:Layout.u16be|16-bit}, {@link
 *   module:Layout.u24be|24-bit}, {@link module:Layout.u32be|32-bit},
 *   {@link module:Layout.u40be|40-bit}, and {@link
 *   module:Layout.u48be|48-bit} representation ranges;
 * * {@link module:Layout~Int|Signed integers in little-endian
 *   format} with {@link module:Layout.s8|8-bit}, {@link
 *   module:Layout.s16|16-bit}, {@link module:Layout.s24|24-bit},
 *   {@link module:Layout.s32|32-bit}, {@link
 *   module:Layout.s40|40-bit}, and {@link module:Layout.s48|48-bit}
 *   representation ranges;
 * * {@link module:Layout~IntBE|Signed integers in big-endian format}
 *   with {@link module:Layout.s16be|16-bit}, {@link
 *   module:Layout.s24be|24-bit}, {@link module:Layout.s32be|32-bit},
 *   {@link module:Layout.s40be|40-bit}, and {@link
 *   module:Layout.s48be|48-bit} representation ranges;
 * * 64-bit integral values that decode to an exact (if magnitude is
 *   less than 2^53) or nearby integral Number in {@link
 *   module:Layout.nu64|unsigned little-endian}, {@link
 *   module:Layout.nu64be|unsigned big-endian}, {@link
 *   module:Layout.ns64|signed little-endian}, and {@link
 *   module:Layout.ns64be|unsigned big-endian} encodings;
 * * 32-bit floating point values with {@link
 *   module:Layout.f32|little-endian} and {@link
 *   module:Layout.f32be|big-endian} representations;
 * * 64-bit floating point values with {@link
 *   module:Layout.f64|little-endian} and {@link
 *   module:Layout.f64be|big-endian} representations;
 * * {@link module:Layout.const|Constants} that take no space in the
 *   encoded expression.
 *
 * and for these aggregate types:
 * * {@link module:Layout.seq|Sequence}s of instances of a {@link
 *   module:Layout~Layout|Layout}, with JavaScript representation as
 *   an Array and constant or data-dependent {@link
 *   module:Layout~Sequence#count|length};
 * * {@link module:Layout.struct|Structure}s that aggregate a
 *   heterogeneous sequence of {@link module:Layout~Layout|Layout}
 *   instances, with JavaScript representation as an Object;
 * * {@link module:Layout.union|Union}s that support multiple {@link
 *   module:Layout~VariantLayout|variant layouts} over a fixed
 *   (padded) or variable (not padded) span of bytes, using an
 *   unsigned integer at the start of the data or a separate {@link
 *   module:Layout.unionLayoutDiscriminator|layout element} to
 *   determine which layout to use when interpreting the buffer
 *   contents;
 * * {@link module:Layout.bits|BitStructure}s that contain a sequence
 *   of individual {@link
 *   module:Layout~BitStructure#addField|BitField}s packed into an 8,
 *   16, 24, or 32-bit unsigned integer starting at the least- or
 *   most-significant bit;
 * * {@link module:Layout.cstr|C strings} of varying length;
 * * {@link module:Layout.blob|Blobs} of fixed- or variable-{@link
 *   module:Layout~Blob#length|length} raw data.
 *
 * All {@link module:Layout~Layout|Layout} instances are immutable
 * after construction, to prevent internal state from becoming
 * inconsistent.
 *
 * @local Layout
 * @local ExternalLayout
 * @local GreedyCount
 * @local OffsetLayout
 * @local UInt
 * @local UIntBE
 * @local Int
 * @local IntBE
 * @local NearUInt64
 * @local NearUInt64BE
 * @local NearInt64
 * @local NearInt64BE
 * @local Float
 * @local FloatBE
 * @local Double
 * @local DoubleBE
 * @local Sequence
 * @local Structure
 * @local UnionDiscriminator
 * @local UnionLayoutDiscriminator
 * @local Union
 * @local VariantLayout
 * @local BitStructure
 * @local BitField
 * @local Boolean
 * @local Blob
 * @local CString
 * @local Constant
 * @local bindConstructorLayout
 * @module Layout
 * @license MIT
 * @author Peter A. Bigot
 * @see {@link https://github.com/pabigot/buffer-layout|buffer-layout on GitHub}
 */
//# sourceMappingURL=/build/_shared/chunk-I5H7ZLT4.js.map
