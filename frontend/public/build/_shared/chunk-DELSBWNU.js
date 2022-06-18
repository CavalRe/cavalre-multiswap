import {
  Readable,
  Writable,
  init_stream
} from "/build/_shared/chunk-MS54VMH6.js";
import {
  inherits_default,
  init_buffer,
  init_util,
  isBuffer,
  isNull,
  isNullOrUndefined,
  isObject,
  isString
} from "/build/_shared/chunk-I33PHKBI.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  init_react
} from "/build/_shared/chunk-6CGL4AQG.js";

// node-modules-polyfills:punycode
function error(type2) {
  throw new RangeError(errors[type2]);
}
function map(array, fn) {
  var length = array.length;
  var result = [];
  while (length--) {
    result[length] = fn(array[length]);
  }
  return result;
}
function mapDomain(string, fn) {
  var parts = string.split("@");
  var result = "";
  if (parts.length > 1) {
    result = parts[0] + "@";
    string = parts[1];
  }
  string = string.replace(regexSeparators, ".");
  var labels = string.split(".");
  var encoded = map(labels, fn).join(".");
  return result + encoded;
}
function ucs2decode(string) {
  var output = [], counter = 0, length = string.length, value, extra;
  while (counter < length) {
    value = string.charCodeAt(counter++);
    if (value >= 55296 && value <= 56319 && counter < length) {
      extra = string.charCodeAt(counter++);
      if ((extra & 64512) == 56320) {
        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
function digitToBasic(digit, flag) {
  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
}
function adapt(delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
}
function encode(input) {
  var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
  input = ucs2decode(input);
  inputLength = input.length;
  n = initialN;
  delta = 0;
  bias = initialBias;
  for (j = 0; j < inputLength; ++j) {
    currentValue = input[j];
    if (currentValue < 128) {
      output.push(stringFromCharCode(currentValue));
    }
  }
  handledCPCount = basicLength = output.length;
  if (basicLength) {
    output.push(delimiter);
  }
  while (handledCPCount < inputLength) {
    for (m = maxInt, j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }
    handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      error("overflow");
    }
    delta += (m - n) * handledCPCountPlusOne;
    n = m;
    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue < n && ++delta > maxInt) {
        error("overflow");
      }
      if (currentValue == n) {
        for (q = delta, k = base; ; k += base) {
          t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) {
            break;
          }
          qMinusT = q - t;
          baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
          q = floor(qMinusT / baseMinusT);
        }
        output.push(stringFromCharCode(digitToBasic(q, 0)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }
    ++delta;
    ++n;
  }
  return output.join("");
}
function toASCII(input) {
  return mapDomain(input, function(string) {
    return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
  });
}
var maxInt, base, tMin, tMax, skew, damp, initialBias, initialN, delimiter, regexNonASCII, regexSeparators, errors, baseMinusTMin, floor, stringFromCharCode;
var init_punycode = __esm({
  "node-modules-polyfills:punycode"() {
    init_react();
    maxInt = 2147483647;
    base = 36;
    tMin = 1;
    tMax = 26;
    skew = 38;
    damp = 700;
    initialBias = 72;
    initialN = 128;
    delimiter = "-";
    regexNonASCII = /[^\x20-\x7E]/;
    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
    errors = {
      "overflow": "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    };
    baseMinusTMin = base - tMin;
    floor = Math.floor;
    stringFromCharCode = String.fromCharCode;
  }
});

// node-modules-polyfills:querystring
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function stringifyPrimitive(v) {
  switch (typeof v) {
    case "string":
      return v;
    case "boolean":
      return v ? "true" : "false";
    case "number":
      return isFinite(v) ? v : "";
    default:
      return "";
  }
}
function stringify(obj, sep, eq, name) {
  sep = sep || "&";
  eq = eq || "=";
  if (obj === null) {
    obj = void 0;
  }
  if (typeof obj === "object") {
    return map2(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map2(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }
  if (!name)
    return "";
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
}
function map2(xs, f) {
  if (xs.map)
    return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}
function parse(qs, sep, eq, options) {
  sep = sep || "&";
  eq = eq || "=";
  var obj = {};
  if (typeof qs !== "string" || qs.length === 0) {
    return obj;
  }
  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1e3;
  if (options && typeof options.maxKeys === "number") {
    maxKeys = options.maxKeys;
  }
  var len = qs.length;
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }
  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = "";
    }
    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);
    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }
  return obj;
}
var isArray, objectKeys;
var init_querystring = __esm({
  "node-modules-polyfills:querystring"() {
    init_react();
    isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
    objectKeys = Object.keys || function(obj) {
      var res = [];
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          res.push(key);
      }
      return res;
    };
  }
});

// node-modules-polyfills:url
var url_exports = {};
__export(url_exports, {
  Url: () => Url,
  default: () => url_default,
  format: () => urlFormat,
  parse: () => urlParse,
  resolve: () => urlResolve,
  resolveObject: () => urlResolveObject
});
function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}
function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && isObject(url) && url instanceof Url)
    return url;
  var u = new Url();
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}
function parse2(self, url, parseQueryString, slashesDenoteHost) {
  if (!isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }
  var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, "/");
  url = uSplit.join(splitter);
  var rest = url;
  rest = rest.trim();
  if (!slashesDenoteHost && url.split("#").length === 1) {
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      self.path = rest;
      self.href = rest;
      self.pathname = simplePath[1];
      if (simplePath[2]) {
        self.search = simplePath[2];
        if (parseQueryString) {
          self.query = parse(self.search.substr(1));
        } else {
          self.query = self.search.substr(1);
        }
      } else if (parseQueryString) {
        self.search = "";
        self.query = {};
      }
      return self;
    }
  }
  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    self.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === "//";
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      self.slashes = true;
    }
  }
  var i, hec, l, p;
  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    var hostEnd = -1;
    for (i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    var auth, atSign;
    if (hostEnd === -1) {
      atSign = rest.lastIndexOf("@");
    } else {
      atSign = rest.lastIndexOf("@", hostEnd);
    }
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      self.auth = decodeURIComponent(auth);
    }
    hostEnd = -1;
    for (i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    if (hostEnd === -1)
      hostEnd = rest.length;
    self.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);
    parseHost(self);
    self.hostname = self.hostname || "";
    var ipv6Hostname = self.hostname[0] === "[" && self.hostname[self.hostname.length - 1] === "]";
    if (!ipv6Hostname) {
      var hostparts = self.hostname.split(/\./);
      for (i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part)
          continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = "";
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              newpart += "x";
            } else {
              newpart += part[j];
            }
          }
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = "/" + notHost.join(".") + rest;
            }
            self.hostname = validParts.join(".");
            break;
          }
        }
      }
    }
    if (self.hostname.length > hostnameMaxLen) {
      self.hostname = "";
    } else {
      self.hostname = self.hostname.toLowerCase();
    }
    if (!ipv6Hostname) {
      self.hostname = toASCII(self.hostname);
    }
    p = self.port ? ":" + self.port : "";
    var h = self.hostname || "";
    self.host = h + p;
    self.href += self.host;
    if (ipv6Hostname) {
      self.hostname = self.hostname.substr(1, self.hostname.length - 2);
      if (rest[0] !== "/") {
        rest = "/" + rest;
      }
    }
  }
  if (!unsafeProtocol[lowerProto]) {
    for (i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }
  var hash = rest.indexOf("#");
  if (hash !== -1) {
    self.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf("?");
  if (qm !== -1) {
    self.search = rest.substr(qm);
    self.query = rest.substr(qm + 1);
    if (parseQueryString) {
      self.query = parse(self.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    self.search = "";
    self.query = {};
  }
  if (rest)
    self.pathname = rest;
  if (slashedProtocol[lowerProto] && self.hostname && !self.pathname) {
    self.pathname = "/";
  }
  if (self.pathname || self.search) {
    p = self.pathname || "";
    var s = self.search || "";
    self.path = p + s;
  }
  self.href = format(self);
  return self;
}
function urlFormat(obj) {
  if (isString(obj))
    obj = parse2({}, obj);
  return format(obj);
}
function format(self) {
  var auth = self.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var protocol = self.protocol || "", pathname = self.pathname || "", hash = self.hash || "", host = false, query = "";
  if (self.host) {
    host = auth + self.host;
  } else if (self.hostname) {
    host = auth + (self.hostname.indexOf(":") === -1 ? self.hostname : "[" + this.hostname + "]");
    if (self.port) {
      host += ":" + self.port;
    }
  }
  if (self.query && isObject(self.query) && Object.keys(self.query).length) {
    query = stringify(self.query);
  }
  var search = self.search || query && "?" + query || "";
  if (protocol && protocol.substr(-1) !== ":")
    protocol += ":";
  if (self.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = "//" + (host || "");
    if (pathname && pathname.charAt(0) !== "/")
      pathname = "/" + pathname;
  } else if (!host) {
    host = "";
  }
  if (hash && hash.charAt(0) !== "#")
    hash = "#" + hash;
  if (search && search.charAt(0) !== "?")
    search = "?" + search;
  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return protocol + host + pathname + search + hash;
}
function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}
function urlResolveObject(source, relative) {
  if (!source)
    return relative;
  return urlParse(source, false, true).resolveObject(relative);
}
function parseHost(self) {
  var host = self.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ":") {
      self.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host)
    self.hostname = host;
}
var url_default, protocolPattern, portPattern, simplePathPattern, delims, unwise, autoEscape, nonHostChars, hostEndingChars, hostnameMaxLen, hostnamePartPattern, hostnamePartStart, unsafeProtocol, hostlessProtocol, slashedProtocol;
var init_url = __esm({
  "node-modules-polyfills:url"() {
    init_react();
    init_punycode();
    init_util();
    init_querystring();
    url_default = {
      parse: urlParse,
      resolve: urlResolve,
      resolveObject: urlResolveObject,
      format: urlFormat,
      Url
    };
    protocolPattern = /^([a-z0-9.+-]+:)/i;
    portPattern = /:[0-9]*$/;
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
    delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
    unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
    autoEscape = ["'"].concat(unwise);
    nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
    hostEndingChars = ["/", "?", "#"];
    hostnameMaxLen = 255;
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
    unsafeProtocol = {
      "javascript": true,
      "javascript:": true
    };
    hostlessProtocol = {
      "javascript": true,
      "javascript:": true
    };
    slashedProtocol = {
      "http": true,
      "https": true,
      "ftp": true,
      "gopher": true,
      "file": true,
      "http:": true,
      "https:": true,
      "ftp:": true,
      "gopher:": true,
      "file:": true
    };
    Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
      return parse2(this, url, parseQueryString, slashesDenoteHost);
    };
    Url.prototype.format = function() {
      return format(this);
    };
    Url.prototype.resolve = function(relative) {
      return this.resolveObject(urlParse(relative, false, true)).format();
    };
    Url.prototype.resolveObject = function(relative) {
      if (isString(relative)) {
        var rel = new Url();
        rel.parse(relative, false, true);
        relative = rel;
      }
      var result = new Url();
      var tkeys = Object.keys(this);
      for (var tk = 0; tk < tkeys.length; tk++) {
        var tkey = tkeys[tk];
        result[tkey] = this[tkey];
      }
      result.hash = relative.hash;
      if (relative.href === "") {
        result.href = result.format();
        return result;
      }
      if (relative.slashes && !relative.protocol) {
        var rkeys = Object.keys(relative);
        for (var rk = 0; rk < rkeys.length; rk++) {
          var rkey = rkeys[rk];
          if (rkey !== "protocol")
            result[rkey] = relative[rkey];
        }
        if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
          result.path = result.pathname = "/";
        }
        result.href = result.format();
        return result;
      }
      var relPath;
      if (relative.protocol && relative.protocol !== result.protocol) {
        if (!slashedProtocol[relative.protocol]) {
          var keys = Object.keys(relative);
          for (var v = 0; v < keys.length; v++) {
            var k = keys[v];
            result[k] = relative[k];
          }
          result.href = result.format();
          return result;
        }
        result.protocol = relative.protocol;
        if (!relative.host && !hostlessProtocol[relative.protocol]) {
          relPath = (relative.pathname || "").split("/");
          while (relPath.length && !(relative.host = relPath.shift()))
            ;
          if (!relative.host)
            relative.host = "";
          if (!relative.hostname)
            relative.hostname = "";
          if (relPath[0] !== "")
            relPath.unshift("");
          if (relPath.length < 2)
            relPath.unshift("");
          result.pathname = relPath.join("/");
        } else {
          result.pathname = relative.pathname;
        }
        result.search = relative.search;
        result.query = relative.query;
        result.host = relative.host || "";
        result.auth = relative.auth;
        result.hostname = relative.hostname || relative.host;
        result.port = relative.port;
        if (result.pathname || result.search) {
          var p = result.pathname || "";
          var s = result.search || "";
          result.path = p + s;
        }
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      }
      var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
      relPath = relative.pathname && relative.pathname.split("/") || [];
      if (psychotic) {
        result.hostname = "";
        result.port = null;
        if (result.host) {
          if (srcPath[0] === "")
            srcPath[0] = result.host;
          else
            srcPath.unshift(result.host);
        }
        result.host = "";
        if (relative.protocol) {
          relative.hostname = null;
          relative.port = null;
          if (relative.host) {
            if (relPath[0] === "")
              relPath[0] = relative.host;
            else
              relPath.unshift(relative.host);
          }
          relative.host = null;
        }
        mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
      }
      var authInHost;
      if (isRelAbs) {
        result.host = relative.host || relative.host === "" ? relative.host : result.host;
        result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
        result.search = relative.search;
        result.query = relative.query;
        srcPath = relPath;
      } else if (relPath.length) {
        if (!srcPath)
          srcPath = [];
        srcPath.pop();
        srcPath = srcPath.concat(relPath);
        result.search = relative.search;
        result.query = relative.query;
      } else if (!isNullOrUndefined(relative.search)) {
        if (psychotic) {
          result.hostname = result.host = srcPath.shift();
          authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        result.search = relative.search;
        result.query = relative.query;
        if (!isNull(result.pathname) || !isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.href = result.format();
        return result;
      }
      if (!srcPath.length) {
        result.pathname = null;
        if (result.search) {
          result.path = "/" + result.search;
        } else {
          result.path = null;
        }
        result.href = result.format();
        return result;
      }
      var last = srcPath.slice(-1)[0];
      var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
      var up = 0;
      for (var i = srcPath.length; i >= 0; i--) {
        last = srcPath[i];
        if (last === ".") {
          srcPath.splice(i, 1);
        } else if (last === "..") {
          srcPath.splice(i, 1);
          up++;
        } else if (up) {
          srcPath.splice(i, 1);
          up--;
        }
      }
      if (!mustEndAbs && !removeAllDots) {
        for (; up--; up) {
          srcPath.unshift("..");
        }
      }
      if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
        srcPath.unshift("");
      }
      if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
        srcPath.push("");
      }
      var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
      if (psychotic) {
        result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
        authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      mustEndAbs = mustEndAbs || result.host && srcPath.length;
      if (mustEndAbs && !isAbsolute) {
        srcPath.unshift("");
      }
      if (!srcPath.length) {
        result.pathname = null;
        result.path = null;
      } else {
        result.pathname = srcPath.join("/");
      }
      if (!isNull(result.pathname) || !isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
      }
      result.auth = relative.auth || result.auth;
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    };
    Url.prototype.parseHost = function() {
      return parseHost(this);
    };
  }
});

// node-modules-polyfills-commonjs:url
var require_url = __commonJS({
  "node-modules-polyfills-commonjs:url"(exports, module) {
    init_react();
    var polyfill = (init_url(), __toCommonJS(url_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k in polyfill) {
        module.exports[k] = polyfill[k];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/capability.js
function blobConstructor() {
  if (typeof _blobConstructor !== "undefined") {
    return _blobConstructor;
  }
  try {
    new globalThis.Blob([new ArrayBuffer(1)]);
    _blobConstructor = true;
  } catch (e) {
    _blobConstructor = false;
  }
  return _blobConstructor;
}
function checkTypeSupport(type2) {
  if (!xhr) {
    xhr = new globalThis.XMLHttpRequest();
    xhr.open("GET", globalThis.location.host ? "/" : "https://example.com");
  }
  try {
    xhr.responseType = type2;
    return xhr.responseType === type2;
  } catch (e) {
    return false;
  }
}
function isFunction(value) {
  return typeof value === "function";
}
var hasFetch, _blobConstructor, xhr, haveArrayBuffer, haveSlice, arraybuffer, msstream, mozchunkedarraybuffer, overrideMimeType, vbArray;
var init_capability = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/capability.js"() {
    init_react();
    hasFetch = isFunction(globalThis.fetch) && isFunction(globalThis.ReadableStream);
    haveArrayBuffer = typeof globalThis.ArrayBuffer !== "undefined";
    haveSlice = haveArrayBuffer && isFunction(globalThis.ArrayBuffer.prototype.slice);
    arraybuffer = haveArrayBuffer && checkTypeSupport("arraybuffer");
    msstream = !hasFetch && haveSlice && checkTypeSupport("ms-stream");
    mozchunkedarraybuffer = !hasFetch && haveArrayBuffer && checkTypeSupport("moz-chunked-arraybuffer");
    overrideMimeType = isFunction(xhr.overrideMimeType);
    vbArray = isFunction(globalThis.VBArray);
    xhr = null;
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/response.js
function IncomingMessage(xhr2, response, mode) {
  var self = this;
  Readable.call(self);
  self._mode = mode;
  self.headers = {};
  self.rawHeaders = [];
  self.trailers = {};
  self.rawTrailers = [];
  self.on("end", function() {
    process.nextTick(function() {
      self.emit("close");
    });
  });
  var read;
  if (mode === "fetch") {
    self._fetchResponse = response;
    self.url = response.url;
    self.statusCode = response.status;
    self.statusMessage = response.statusText;
    for (var header, _i, _it = response.headers[Symbol.iterator](); header = (_i = _it.next()).value, !_i.done; ) {
      self.headers[header[0].toLowerCase()] = header[1];
      self.rawHeaders.push(header[0], header[1]);
    }
    var reader = response.body.getReader();
    read = function() {
      reader.read().then(function(result) {
        if (self._destroyed)
          return;
        if (result.done) {
          self.push(null);
          return;
        }
        self.push(new Buffer(result.value));
        read();
      });
    };
    read();
  } else {
    self._xhr = xhr2;
    self._pos = 0;
    self.url = xhr2.responseURL;
    self.statusCode = xhr2.status;
    self.statusMessage = xhr2.statusText;
    var headers = xhr2.getAllResponseHeaders().split(/\r?\n/);
    headers.forEach(function(header2) {
      var matches = header2.match(/^([^:]+):\s*(.*)/);
      if (matches) {
        var key = matches[1].toLowerCase();
        if (key === "set-cookie") {
          if (self.headers[key] === void 0) {
            self.headers[key] = [];
          }
          self.headers[key].push(matches[2]);
        } else if (self.headers[key] !== void 0) {
          self.headers[key] += ", " + matches[2];
        } else {
          self.headers[key] = matches[2];
        }
        self.rawHeaders.push(matches[1], matches[2]);
      }
    });
    self._charset = "x-user-defined";
    if (!overrideMimeType) {
      var mimeType = self.rawHeaders["mime-type"];
      if (mimeType) {
        var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/);
        if (charsetMatch) {
          self._charset = charsetMatch[1].toLowerCase();
        }
      }
      if (!self._charset)
        self._charset = "utf-8";
    }
  }
}
var rStates;
var init_response = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/response.js"() {
    init_react();
    init_capability();
    init_util();
    init_stream();
    rStates = {
      UNSENT: 0,
      OPENED: 1,
      HEADERS_RECEIVED: 2,
      LOADING: 3,
      DONE: 4
    };
    inherits_default(IncomingMessage, Readable);
    IncomingMessage.prototype._read = function() {
    };
    IncomingMessage.prototype._onXHRProgress = function() {
      var self = this;
      var xhr2 = self._xhr;
      var response = null;
      switch (self._mode) {
        case "text:vbarray":
          if (xhr2.readyState !== rStates.DONE)
            break;
          try {
            response = new globalThis.VBArray(xhr2.responseBody).toArray();
          } catch (e) {
          }
          if (response !== null) {
            self.push(new Buffer(response));
            break;
          }
        case "text":
          try {
            response = xhr2.responseText;
          } catch (e) {
            self._mode = "text:vbarray";
            break;
          }
          if (response.length > self._pos) {
            var newData = response.substr(self._pos);
            if (self._charset === "x-user-defined") {
              var buffer = new Buffer(newData.length);
              for (var i = 0; i < newData.length; i++)
                buffer[i] = newData.charCodeAt(i) & 255;
              self.push(buffer);
            } else {
              self.push(newData, self._charset);
            }
            self._pos = response.length;
          }
          break;
        case "arraybuffer":
          if (xhr2.readyState !== rStates.DONE || !xhr2.response)
            break;
          response = xhr2.response;
          self.push(new Buffer(new Uint8Array(response)));
          break;
        case "moz-chunked-arraybuffer":
          response = xhr2.response;
          if (xhr2.readyState !== rStates.LOADING || !response)
            break;
          self.push(new Buffer(new Uint8Array(response)));
          break;
        case "ms-stream":
          response = xhr2.response;
          if (xhr2.readyState !== rStates.LOADING)
            break;
          var reader = new globalThis.MSStreamReader();
          reader.onprogress = function() {
            if (reader.result.byteLength > self._pos) {
              self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))));
              self._pos = reader.result.byteLength;
            }
          };
          reader.onload = function() {
            self.push(null);
          };
          reader.readAsArrayBuffer(response);
          break;
      }
      if (self._xhr.readyState === rStates.DONE && self._mode !== "ms-stream") {
        self.push(null);
      }
    };
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/to-arraybuffer.js
function to_arraybuffer_default(buf) {
  if (buf instanceof Uint8Array) {
    if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
      return buf.buffer;
    } else if (typeof buf.buffer.slice === "function") {
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
  }
  if (isBuffer(buf)) {
    var arrayCopy = new Uint8Array(buf.length);
    var len = buf.length;
    for (var i = 0; i < len; i++) {
      arrayCopy[i] = buf[i];
    }
    return arrayCopy.buffer;
  } else {
    throw new Error("Argument must be a Buffer");
  }
}
var init_to_arraybuffer = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/to-arraybuffer.js"() {
    init_react();
    init_buffer();
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/request.js
function decideMode(preferBinary, useFetch) {
  if (hasFetch && useFetch) {
    return "fetch";
  } else if (mozchunkedarraybuffer) {
    return "moz-chunked-arraybuffer";
  } else if (msstream) {
    return "ms-stream";
  } else if (arraybuffer && preferBinary) {
    return "arraybuffer";
  } else if (vbArray && preferBinary) {
    return "text:vbarray";
  } else {
    return "text";
  }
}
function ClientRequest(opts) {
  var self = this;
  Writable.call(self);
  self._opts = opts;
  self._body = [];
  self._headers = {};
  if (opts.auth)
    self.setHeader("Authorization", "Basic " + new Buffer(opts.auth).toString("base64"));
  Object.keys(opts.headers).forEach(function(name) {
    self.setHeader(name, opts.headers[name]);
  });
  var preferBinary;
  var useFetch = true;
  if (opts.mode === "disable-fetch") {
    useFetch = false;
    preferBinary = true;
  } else if (opts.mode === "prefer-streaming") {
    preferBinary = false;
  } else if (opts.mode === "allow-wrong-content-type") {
    preferBinary = !overrideMimeType;
  } else if (!opts.mode || opts.mode === "default" || opts.mode === "prefer-fast") {
    preferBinary = true;
  } else {
    throw new Error("Invalid value for opts.mode");
  }
  self._mode = decideMode(preferBinary, useFetch);
  self.on("finish", function() {
    self._onFinish();
  });
}
function statusValid(xhr2) {
  try {
    var status = xhr2.status;
    return status !== null && status !== 0;
  } catch (e) {
    return false;
  }
}
var request_default, unsafeHeaders;
var init_request = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/http-lib/request.js"() {
    init_react();
    init_capability();
    init_util();
    init_response();
    init_stream();
    init_to_arraybuffer();
    request_default = ClientRequest;
    inherits_default(ClientRequest, Writable);
    unsafeHeaders = [
      "accept-charset",
      "accept-encoding",
      "access-control-request-headers",
      "access-control-request-method",
      "connection",
      "content-length",
      "cookie",
      "cookie2",
      "date",
      "dnt",
      "expect",
      "host",
      "keep-alive",
      "origin",
      "referer",
      "te",
      "trailer",
      "transfer-encoding",
      "upgrade",
      "user-agent",
      "via"
    ];
    ClientRequest.prototype.setHeader = function(name, value) {
      var self = this;
      var lowerName = name.toLowerCase();
      if (unsafeHeaders.indexOf(lowerName) !== -1)
        return;
      self._headers[lowerName] = {
        name,
        value
      };
    };
    ClientRequest.prototype.getHeader = function(name) {
      var self = this;
      return self._headers[name.toLowerCase()].value;
    };
    ClientRequest.prototype.removeHeader = function(name) {
      var self = this;
      delete self._headers[name.toLowerCase()];
    };
    ClientRequest.prototype._onFinish = function() {
      var self = this;
      if (self._destroyed)
        return;
      var opts = self._opts;
      var headersObj = self._headers;
      var body;
      if (opts.method === "POST" || opts.method === "PUT" || opts.method === "PATCH") {
        if (blobConstructor()) {
          body = new globalThis.Blob(self._body.map(function(buffer) {
            return to_arraybuffer_default(buffer);
          }), {
            type: (headersObj["content-type"] || {}).value || ""
          });
        } else {
          body = Buffer.concat(self._body).toString();
        }
      }
      if (self._mode === "fetch") {
        var headers = Object.keys(headersObj).map(function(name) {
          return [headersObj[name].name, headersObj[name].value];
        });
        globalThis.fetch(self._opts.url, {
          method: self._opts.method,
          headers,
          body,
          mode: "cors",
          credentials: opts.withCredentials ? "include" : "same-origin"
        }).then(function(response) {
          self._fetchResponse = response;
          self._connect();
        }, function(reason) {
          self.emit("error", reason);
        });
      } else {
        var xhr2 = self._xhr = new globalThis.XMLHttpRequest();
        try {
          xhr2.open(self._opts.method, self._opts.url, true);
        } catch (err) {
          process.nextTick(function() {
            self.emit("error", err);
          });
          return;
        }
        if ("responseType" in xhr2)
          xhr2.responseType = self._mode.split(":")[0];
        if ("withCredentials" in xhr2)
          xhr2.withCredentials = !!opts.withCredentials;
        if (self._mode === "text" && "overrideMimeType" in xhr2)
          xhr2.overrideMimeType("text/plain; charset=x-user-defined");
        Object.keys(headersObj).forEach(function(name) {
          xhr2.setRequestHeader(headersObj[name].name, headersObj[name].value);
        });
        self._response = null;
        xhr2.onreadystatechange = function() {
          switch (xhr2.readyState) {
            case rStates.LOADING:
            case rStates.DONE:
              self._onXHRProgress();
              break;
          }
        };
        if (self._mode === "moz-chunked-arraybuffer") {
          xhr2.onprogress = function() {
            self._onXHRProgress();
          };
        }
        xhr2.onerror = function() {
          if (self._destroyed)
            return;
          self.emit("error", new Error("XHR error"));
        };
        try {
          xhr2.send(body);
        } catch (err) {
          process.nextTick(function() {
            self.emit("error", err);
          });
          return;
        }
      }
    };
    ClientRequest.prototype._onXHRProgress = function() {
      var self = this;
      if (!statusValid(self._xhr) || self._destroyed)
        return;
      if (!self._response)
        self._connect();
      self._response._onXHRProgress();
    };
    ClientRequest.prototype._connect = function() {
      var self = this;
      if (self._destroyed)
        return;
      self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode);
      self.emit("response", self._response);
    };
    ClientRequest.prototype._write = function(chunk, encoding, cb) {
      var self = this;
      self._body.push(chunk);
      cb();
    };
    ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function() {
      var self = this;
      self._destroyed = true;
      if (self._response)
        self._response._destroyed = true;
      if (self._xhr)
        self._xhr.abort();
    };
    ClientRequest.prototype.end = function(data, encoding, cb) {
      var self = this;
      if (typeof data === "function") {
        cb = data;
        data = void 0;
      }
      Writable.prototype.end.call(self, data, encoding, cb);
    };
    ClientRequest.prototype.flushHeaders = function() {
    };
    ClientRequest.prototype.setTimeout = function() {
    };
    ClientRequest.prototype.setNoDelay = function() {
    };
    ClientRequest.prototype.setSocketKeepAlive = function() {
    };
  }
});

// node-modules-polyfills:http
var http_exports = {};
__export(http_exports, {
  Agent: () => Agent,
  METHODS: () => METHODS,
  STATUS_CODES: () => STATUS_CODES,
  default: () => http_default,
  get: () => get,
  request: () => request
});
function request(opts, cb) {
  if (typeof opts === "string")
    opts = urlParse(opts);
  var defaultProtocol = globalThis.location.protocol.search(/^https?:$/) === -1 ? "http:" : "";
  var protocol = opts.protocol || defaultProtocol;
  var host = opts.hostname || opts.host;
  var port = opts.port;
  var path = opts.path || "/";
  if (host && host.indexOf(":") !== -1)
    host = "[" + host + "]";
  opts.url = (host ? protocol + "//" + host : "") + (port ? ":" + port : "") + path;
  opts.method = (opts.method || "GET").toUpperCase();
  opts.headers = opts.headers || {};
  var req = new request_default(opts);
  if (cb)
    req.on("response", cb);
  return req;
}
function get(opts, cb) {
  var req = request(opts, cb);
  req.end();
  return req;
}
function Agent() {
}
var METHODS, STATUS_CODES, http_default;
var init_http = __esm({
  "node-modules-polyfills:http"() {
    init_react();
    init_request();
    init_url();
    Agent.defaultMaxSockets = 4;
    METHODS = [
      "CHECKOUT",
      "CONNECT",
      "COPY",
      "DELETE",
      "GET",
      "HEAD",
      "LOCK",
      "M-SEARCH",
      "MERGE",
      "MKACTIVITY",
      "MKCOL",
      "MOVE",
      "NOTIFY",
      "OPTIONS",
      "PATCH",
      "POST",
      "PROPFIND",
      "PROPPATCH",
      "PURGE",
      "PUT",
      "REPORT",
      "SEARCH",
      "SUBSCRIBE",
      "TRACE",
      "UNLOCK",
      "UNSUBSCRIBE"
    ];
    STATUS_CODES = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      200: "OK",
      201: "Created",
      202: "Accepted",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Moved Temporarily",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Time-out",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Request Entity Too Large",
      414: "Request-URI Too Large",
      415: "Unsupported Media Type",
      416: "Requested Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      425: "Unordered Collection",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Time-out",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      509: "Bandwidth Limit Exceeded",
      510: "Not Extended",
      511: "Network Authentication Required"
    };
    http_default = {
      request,
      get,
      Agent,
      METHODS,
      STATUS_CODES
    };
  }
});

// node-modules-polyfills-commonjs:http
var require_http = __commonJS({
  "node-modules-polyfills-commonjs:http"(exports, module) {
    init_react();
    var polyfill = (init_http(), __toCommonJS(http_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k in polyfill) {
        module.exports[k] = polyfill[k];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});

// node-modules-polyfills:https
var https_exports = {};
__export(https_exports, {
  Agent: () => Agent2,
  METHODS: () => METHODS2,
  STATUS_CODES: () => STATUS_CODES2,
  default: () => https_default,
  get: () => get2,
  request: () => request2
});
function request2(opts, cb) {
  if (typeof opts === "string")
    opts = urlParse(opts);
  var defaultProtocol = globalThis.location.protocol.search(/^https?:$/) === -1 ? "http:" : "";
  var protocol = opts.protocol || defaultProtocol;
  var host = opts.hostname || opts.host;
  var port = opts.port;
  var path = opts.path || "/";
  if (host && host.indexOf(":") !== -1)
    host = "[" + host + "]";
  opts.url = (host ? protocol + "//" + host : "") + (port ? ":" + port : "") + path;
  opts.method = (opts.method || "GET").toUpperCase();
  opts.headers = opts.headers || {};
  var req = new request_default(opts);
  if (cb)
    req.on("response", cb);
  return req;
}
function get2(opts, cb) {
  var req = request2(opts, cb);
  req.end();
  return req;
}
function Agent2() {
}
var METHODS2, STATUS_CODES2, https_default;
var init_https = __esm({
  "node-modules-polyfills:https"() {
    init_react();
    init_request();
    init_url();
    Agent2.defaultMaxSockets = 4;
    METHODS2 = [
      "CHECKOUT",
      "CONNECT",
      "COPY",
      "DELETE",
      "GET",
      "HEAD",
      "LOCK",
      "M-SEARCH",
      "MERGE",
      "MKACTIVITY",
      "MKCOL",
      "MOVE",
      "NOTIFY",
      "OPTIONS",
      "PATCH",
      "POST",
      "PROPFIND",
      "PROPPATCH",
      "PURGE",
      "PUT",
      "REPORT",
      "SEARCH",
      "SUBSCRIBE",
      "TRACE",
      "UNLOCK",
      "UNSUBSCRIBE"
    ];
    STATUS_CODES2 = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      200: "OK",
      201: "Created",
      202: "Accepted",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Moved Temporarily",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Time-out",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Request Entity Too Large",
      414: "Request-URI Too Large",
      415: "Unsupported Media Type",
      416: "Requested Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      425: "Unordered Collection",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Time-out",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      509: "Bandwidth Limit Exceeded",
      510: "Not Extended",
      511: "Network Authentication Required"
    };
    https_default = {
      request: request2,
      get: get2,
      Agent: Agent2,
      METHODS: METHODS2,
      STATUS_CODES: STATUS_CODES2
    };
  }
});

// node-modules-polyfills-commonjs:https
var require_https = __commonJS({
  "node-modules-polyfills-commonjs:https"(exports, module) {
    init_react();
    var polyfill = (init_https(), __toCommonJS(https_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k in polyfill) {
        module.exports[k] = polyfill[k];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});

// node-modules-polyfills:os
var os_exports = {};
__export(os_exports, {
  EOL: () => EOL,
  arch: () => arch,
  cpus: () => cpus,
  default: () => os_default,
  endianness: () => endianness,
  freemem: () => freemem,
  getNetworkInterfaces: () => getNetworkInterfaces,
  hostname: () => hostname,
  loadavg: () => loadavg,
  networkInterfaces: () => networkInterfaces,
  platform: () => platform,
  release: () => release,
  tmpDir: () => tmpDir,
  tmpdir: () => tmpdir,
  totalmem: () => totalmem,
  type: () => type,
  uptime: () => uptime
});
function endianness() {
  if (typeof _endianness === "undefined") {
    var a = new ArrayBuffer(2);
    var b = new Uint8Array(a);
    var c = new Uint16Array(a);
    b[0] = 1;
    b[1] = 2;
    if (c[0] === 258) {
      _endianness = "BE";
    } else if (c[0] === 513) {
      _endianness = "LE";
    } else {
      throw new Error("unable to figure out endianess");
    }
  }
  return _endianness;
}
function hostname() {
  if (typeof globalThis.location !== "undefined") {
    return globalThis.location.hostname;
  } else
    return "";
}
function loadavg() {
  return [];
}
function uptime() {
  return 0;
}
function freemem() {
  return Number.MAX_VALUE;
}
function totalmem() {
  return Number.MAX_VALUE;
}
function cpus() {
  return [];
}
function type() {
  return "Browser";
}
function release() {
  if (typeof globalThis.navigator !== "undefined") {
    return globalThis.navigator.appVersion;
  }
  return "";
}
function networkInterfaces() {
}
function getNetworkInterfaces() {
}
function arch() {
  return "javascript";
}
function platform() {
  return "browser";
}
function tmpDir() {
  return "/tmp";
}
var _endianness, tmpdir, EOL, os_default;
var init_os = __esm({
  "node-modules-polyfills:os"() {
    init_react();
    tmpdir = tmpDir;
    EOL = "\n";
    os_default = {
      EOL,
      tmpdir,
      tmpDir,
      networkInterfaces,
      getNetworkInterfaces,
      release,
      type,
      cpus,
      totalmem,
      freemem,
      uptime,
      loadavg,
      hostname,
      endianness
    };
  }
});

// node-modules-polyfills-commonjs:os
var require_os = __commonJS({
  "node-modules-polyfills-commonjs:os"(exports, module) {
    init_react();
    var polyfill = (init_os(), __toCommonJS(os_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k in polyfill) {
        module.exports[k] = polyfill[k];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});

export {
  require_os,
  require_url,
  require_http,
  require_https
};
/*! https://mths.be/punycode v1.4.1 by @mathias */
//# sourceMappingURL=/build/_shared/chunk-DELSBWNU.js.map
