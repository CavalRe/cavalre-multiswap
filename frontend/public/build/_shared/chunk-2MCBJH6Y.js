import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  init_react
} from "/build/_shared/chunk-6CGL4AQG.js";

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
  require_os
};
//# sourceMappingURL=/build/_shared/chunk-2MCBJH6Y.js.map
