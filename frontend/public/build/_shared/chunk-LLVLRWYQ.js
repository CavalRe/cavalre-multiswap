import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  init_react
} from "/build/_shared/chunk-6CGL4AQG.js";

// node-modules-polyfills:crypto
var crypto_exports = {};
__export(crypto_exports, {
  default: () => crypto_default
});
var crypto_default;
var init_crypto = __esm({
  "node-modules-polyfills:crypto"() {
    init_react();
    crypto_default = {};
  }
});

// node-modules-polyfills-commonjs:crypto
var require_crypto = __commonJS({
  "node-modules-polyfills-commonjs:crypto"(exports, module) {
    init_react();
    var polyfill = (init_crypto(), __toCommonJS(crypto_exports));
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
  require_crypto
};
//# sourceMappingURL=/build/_shared/chunk-LLVLRWYQ.js.map
