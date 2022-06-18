import {
  __commonJS,
  init_react
} from "/build/_shared/chunk-6CGL4AQG.js";

// node_modules/is-hex-prefixed/src/index.js
var require_src = __commonJS({
  "node_modules/is-hex-prefixed/src/index.js"(exports, module) {
    init_react();
    module.exports = function isHexPrefixed(str) {
      if (typeof str !== "string") {
        throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + typeof str + ", while checking isHexPrefixed.");
      }
      return str.slice(0, 2) === "0x";
    };
  }
});

// node_modules/strip-hex-prefix/src/index.js
var require_src2 = __commonJS({
  "node_modules/strip-hex-prefix/src/index.js"(exports, module) {
    init_react();
    var isHexPrefixed = require_src();
    module.exports = function stripHexPrefix(str) {
      if (typeof str !== "string") {
        return str;
      }
      return isHexPrefixed(str) ? str.slice(2) : str;
    };
  }
});

export {
  require_src,
  require_src2
};
//# sourceMappingURL=/build/_shared/chunk-N2BHM647.js.map
