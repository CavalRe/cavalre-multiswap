import {
  __commonJS,
  init_react
} from "/build/_shared/chunk-ZBXWLNC7.js";

// node_modules/@metamask/detect-provider/dist/index.js
var require_dist = __commonJS({
  "node_modules/@metamask/detect-provider/dist/index.js"(exports, module) {
    init_react();
    "use strict";
    function detectEthereumProvider({ mustBeMetaMask = false, silent = false, timeout = 3e3 } = {}) {
      _validateInputs();
      let handled = false;
      return new Promise((resolve) => {
        if (window.ethereum) {
          handleEthereum();
        } else {
          window.addEventListener("ethereum#initialized", handleEthereum, { once: true });
          setTimeout(() => {
            handleEthereum();
          }, timeout);
        }
        function handleEthereum() {
          if (handled) {
            return;
          }
          handled = true;
          window.removeEventListener("ethereum#initialized", handleEthereum);
          const { ethereum } = window;
          if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
            resolve(ethereum);
          } else {
            const message = mustBeMetaMask && ethereum ? "Non-MetaMask window.ethereum detected." : "Unable to detect window.ethereum.";
            !silent && console.error("@metamask/detect-provider:", message);
            resolve(null);
          }
        }
      });
      function _validateInputs() {
        if (typeof mustBeMetaMask !== "boolean") {
          throw new Error(`@metamask/detect-provider: Expected option 'mustBeMetaMask' to be a boolean.`);
        }
        if (typeof silent !== "boolean") {
          throw new Error(`@metamask/detect-provider: Expected option 'silent' to be a boolean.`);
        }
        if (typeof timeout !== "number") {
          throw new Error(`@metamask/detect-provider: Expected option 'timeout' to be a number.`);
        }
      }
    }
    module.exports = detectEthereumProvider;
  }
});

export {
  require_dist
};
//# sourceMappingURL=/build/_shared/chunk-AIL4UPXA.js.map
