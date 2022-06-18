import {
  require_elliptic
} from "/build/_shared/chunk-XHQWQGJR.js";
import {
  require_crypto
} from "/build/_shared/chunk-75H3VX32.js";
import {
  __commonJS,
  init_react
} from "/build/_shared/chunk-ZBXWLNC7.js";

// node_modules/@toruslabs/eccrypto/browser.js
var require_browser = __commonJS({
  "node_modules/@toruslabs/eccrypto/browser.js"(exports) {
    init_react();
    "use strict";
    var EC = require_elliptic().ec;
    var ec = new EC("secp256k1");
    var browserCrypto = globalThis.crypto || globalThis.msCrypto || {};
    var subtle = browserCrypto.subtle || browserCrypto.webkitSubtle;
    var nodeCrypto = require_crypto();
    var EC_GROUP_ORDER = Buffer.from("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", "hex");
    var ZERO32 = Buffer.alloc(32, 0);
    function assert(condition, message) {
      if (!condition) {
        throw new Error(message || "Assertion failed");
      }
    }
    function isScalar(x) {
      return Buffer.isBuffer(x) && x.length === 32;
    }
    function isValidPrivateKey(privateKey) {
      if (!isScalar(privateKey)) {
        return false;
      }
      return privateKey.compare(ZERO32) > 0 && privateKey.compare(EC_GROUP_ORDER) < 0;
    }
    function equalConstTime(b1, b2) {
      if (b1.length !== b2.length) {
        return false;
      }
      var res = 0;
      for (var i = 0; i < b1.length; i++) {
        res |= b1[i] ^ b2[i];
      }
      return res === 0;
    }
    function randomBytes(size) {
      var arr = new Uint8Array(size);
      if (typeof browserCrypto.getRandomValues === "undefined") {
        return Buffer.from(nodeCrypto.randomBytes(size));
      } else {
        browserCrypto.getRandomValues(arr);
      }
      return Buffer.from(arr);
    }
    function sha512(msg) {
      return new Promise(function(resolve) {
        var hash = nodeCrypto.createHash("sha512");
        var result = hash.update(msg).digest();
        resolve(new Uint8Array(result));
      });
    }
    function getAes(op) {
      return function(iv, key, data) {
        return new Promise(function(resolve) {
          if (subtle) {
            var importAlgorithm = { name: "AES-CBC" };
            var keyp = subtle.importKey("raw", key, importAlgorithm, false, [op]);
            return keyp.then(function(cryptoKey) {
              var encAlgorithm = { name: "AES-CBC", iv };
              return subtle[op](encAlgorithm, cryptoKey, data);
            }).then(function(result) {
              resolve(Buffer.from(new Uint8Array(result)));
            });
          } else {
            if (op === "encrypt") {
              var cipher = nodeCrypto.createCipheriv("aes-256-cbc", key, iv);
              let firstChunk = cipher.update(data);
              let secondChunk = cipher.final();
              resolve(Buffer.concat([firstChunk, secondChunk]));
            } else if (op === "decrypt") {
              var decipher = nodeCrypto.createDecipheriv("aes-256-cbc", key, iv);
              let firstChunk = decipher.update(data);
              let secondChunk = decipher.final();
              resolve(Buffer.concat([firstChunk, secondChunk]));
            }
          }
        });
      };
    }
    var aesCbcEncrypt = getAes("encrypt");
    var aesCbcDecrypt = getAes("decrypt");
    function hmacSha256Sign(key, msg) {
      return new Promise(function(resolve) {
        var hmac = nodeCrypto.createHmac("sha256", Buffer.from(key));
        hmac.update(msg);
        var result = hmac.digest();
        resolve(result);
      });
    }
    function hmacSha256Verify(key, msg, sig) {
      return new Promise(function(resolve) {
        var hmac = nodeCrypto.createHmac("sha256", Buffer.from(key));
        hmac.update(msg);
        var expectedSig = hmac.digest();
        resolve(equalConstTime(expectedSig, sig));
      });
    }
    exports.generatePrivate = function() {
      var privateKey = randomBytes(32);
      while (!isValidPrivateKey(privateKey)) {
        privateKey = randomBytes(32);
      }
      return privateKey;
    };
    var getPublic = exports.getPublic = function(privateKey) {
      assert(privateKey.length === 32, "Bad private key");
      assert(isValidPrivateKey(privateKey), "Bad private key");
      return Buffer.from(ec.keyFromPrivate(privateKey).getPublic("arr"));
    };
    var getPublicCompressed = exports.getPublicCompressed = function(privateKey) {
      assert(privateKey.length === 32, "Bad private key");
      assert(isValidPrivateKey(privateKey), "Bad private key");
      let compressed = true;
      return Buffer.from(ec.keyFromPrivate(privateKey).getPublic(compressed, "arr"));
    };
    exports.sign = function(privateKey, msg) {
      return new Promise(function(resolve) {
        assert(privateKey.length === 32, "Bad private key");
        assert(isValidPrivateKey(privateKey), "Bad private key");
        assert(msg.length > 0, "Message should not be empty");
        assert(msg.length <= 32, "Message is too long");
        resolve(Buffer.from(ec.sign(msg, privateKey, { canonical: true }).toDER()));
      });
    };
    exports.verify = function(publicKey, msg, sig) {
      return new Promise(function(resolve, reject) {
        assert(publicKey.length === 65 || publicKey.length === 33, "Bad public key");
        if (publicKey.length === 65) {
          assert(publicKey[0] === 4, "Bad public key");
        }
        if (publicKey.length === 33) {
          assert(publicKey[0] === 2 || publicKey[0] === 3, "Bad public key");
        }
        assert(msg.length > 0, "Message should not be empty");
        assert(msg.length <= 32, "Message is too long");
        if (ec.verify(msg, sig, publicKey)) {
          resolve(null);
        } else {
          reject(new Error("Bad signature"));
        }
      });
    };
    var derive = exports.derive = function(privateKeyA, publicKeyB) {
      return new Promise(function(resolve) {
        assert(Buffer.isBuffer(privateKeyA), "Bad private key");
        assert(Buffer.isBuffer(publicKeyB), "Bad public key");
        assert(privateKeyA.length === 32, "Bad private key");
        assert(isValidPrivateKey(privateKeyA), "Bad private key");
        assert(publicKeyB.length === 65 || publicKeyB.length === 33, "Bad public key");
        if (publicKeyB.length === 65) {
          assert(publicKeyB[0] === 4, "Bad public key");
        }
        if (publicKeyB.length === 33) {
          assert(publicKeyB[0] === 2 || publicKeyB[0] === 3, "Bad public key");
        }
        var keyA = ec.keyFromPrivate(privateKeyA);
        var keyB = ec.keyFromPublic(publicKeyB);
        var Px = keyA.derive(keyB.getPublic());
        resolve(Buffer.from(Px.toArray()));
      });
    };
    exports.encrypt = function(publicKeyTo, msg, opts) {
      opts = opts || {};
      var iv, ephemPublicKey, ciphertext, macKey;
      return new Promise(function(resolve) {
        var ephemPrivateKey = opts.ephemPrivateKey || randomBytes(32);
        while (!isValidPrivateKey(ephemPrivateKey)) {
          ephemPrivateKey = opts.ephemPrivateKey || randomBytes(32);
        }
        ephemPublicKey = getPublic(ephemPrivateKey);
        resolve(derive(ephemPrivateKey, publicKeyTo));
      }).then(function(Px) {
        return sha512(Px);
      }).then(function(hash) {
        iv = opts.iv || randomBytes(16);
        var encryptionKey = hash.slice(0, 32);
        macKey = hash.slice(32);
        return aesCbcEncrypt(iv, encryptionKey, msg);
      }).then(function(data) {
        ciphertext = data;
        var dataToMac = Buffer.concat([iv, ephemPublicKey, ciphertext]);
        return hmacSha256Sign(macKey, dataToMac);
      }).then(function(mac) {
        return {
          iv,
          ephemPublicKey,
          ciphertext,
          mac
        };
      });
    };
    exports.decrypt = function(privateKey, opts) {
      var encryptionKey;
      return derive(privateKey, opts.ephemPublicKey).then(function(Px) {
        return sha512(Px);
      }).then(function(hash) {
        encryptionKey = hash.slice(0, 32);
        var macKey = hash.slice(32);
        var dataToMac = Buffer.concat([
          opts.iv,
          opts.ephemPublicKey,
          opts.ciphertext
        ]);
        return hmacSha256Verify(macKey, dataToMac, opts.mac);
      }).then(function(macGood) {
        assert(macGood, "Bad MAC");
        return aesCbcDecrypt(opts.iv, encryptionKey, opts.ciphertext);
      }).then(function(msg) {
        return Buffer.from(new Uint8Array(msg));
      });
    };
  }
});

export {
  require_browser
};
//# sourceMappingURL=/build/_shared/chunk-EXAIR6L6.js.map
