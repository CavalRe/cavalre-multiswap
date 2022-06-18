import{c as E}from"/build/_shared/chunk-MDAX4QP2.js";import{a as b}from"/build/_shared/chunk-NTPXKD62.js";import{c as p,k as P}from"/build/_shared/chunk-OTKXJQRY.js";var H=p(o=>{"use strict";P();var A=E().ec,s=new A("secp256k1"),B=globalThis.crypto||globalThis.msCrypto||{},y=B.subtle||B.webkitSubtle,h=b(),S=Buffer.from("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141","hex"),M=Buffer.alloc(32,0);function f(e,r){if(!e)throw new Error(r||"Assertion failed")}function R(e){return Buffer.isBuffer(e)&&e.length===32}function m(e){return R(e)?e.compare(M)>0&&e.compare(S)<0:!1}function x(e,r){if(e.length!==r.length)return!1;for(var t=0,n=0;n<e.length;n++)t|=e[n]^r[n];return t===0}function v(e){var r=new Uint8Array(e);return typeof B.getRandomValues>"u"?Buffer.from(h.randomBytes(e)):(B.getRandomValues(r),Buffer.from(r))}function k(e){return new Promise(function(r){var t=h.createHash("sha512"),n=t.update(e).digest();r(new Uint8Array(n))})}function w(e){return function(r,t,n){return new Promise(function(a){if(y){var u={name:"AES-CBC"},g=y.importKey("raw",t,u,!1,[e]);return g.then(function(l){var d={name:"AES-CBC",iv:r};return y[e](d,l,n)}).then(function(l){a(Buffer.from(new Uint8Array(l)))})}else if(e==="encrypt"){var i=h.createCipheriv("aes-256-cbc",t,r);let l=i.update(n),d=i.final();a(Buffer.concat([l,d]))}else if(e==="decrypt"){var c=h.createDecipheriv("aes-256-cbc",t,r);let l=c.update(n),d=c.final();a(Buffer.concat([l,d]))}})}}var U=w("encrypt"),D=w("decrypt");function F(e,r){return new Promise(function(t){var n=h.createHmac("sha256",Buffer.from(e));n.update(r);var a=n.digest();t(a)})}function V(e,r,t){return new Promise(function(n){var a=h.createHmac("sha256",Buffer.from(e));a.update(r);var u=a.digest();n(x(u,t))})}o.generatePrivate=function(){for(var e=v(32);!m(e);)e=v(32);return e};var q=o.getPublic=function(e){return f(e.length===32,"Bad private key"),f(m(e),"Bad private key"),Buffer.from(s.keyFromPrivate(e).getPublic("arr"))},T=o.getPublicCompressed=function(e){f(e.length===32,"Bad private key"),f(m(e),"Bad private key");let r=!0;return Buffer.from(s.keyFromPrivate(e).getPublic(r,"arr"))};o.sign=function(e,r){return new Promise(function(t){f(e.length===32,"Bad private key"),f(m(e),"Bad private key"),f(r.length>0,"Message should not be empty"),f(r.length<=32,"Message is too long"),t(Buffer.from(s.sign(r,e,{canonical:!0}).toDER()))})};o.verify=function(e,r,t){return new Promise(function(n,a){f(e.length===65||e.length===33,"Bad public key"),e.length===65&&f(e[0]===4,"Bad public key"),e.length===33&&f(e[0]===2||e[0]===3,"Bad public key"),f(r.length>0,"Message should not be empty"),f(r.length<=32,"Message is too long"),s.verify(r,t,e)?n(null):a(new Error("Bad signature"))})};var C=o.derive=function(e,r){return new Promise(function(t){f(Buffer.isBuffer(e),"Bad private key"),f(Buffer.isBuffer(r),"Bad public key"),f(e.length===32,"Bad private key"),f(m(e),"Bad private key"),f(r.length===65||r.length===33,"Bad public key"),r.length===65&&f(r[0]===4,"Bad public key"),r.length===33&&f(r[0]===2||r[0]===3,"Bad public key");var n=s.keyFromPrivate(e),a=s.keyFromPublic(r),u=n.derive(a.getPublic());t(Buffer.from(u.toArray()))})};o.encrypt=function(e,r,t){t=t||{};var n,a,u,g;return new Promise(function(i){for(var c=t.ephemPrivateKey||v(32);!m(c);)c=t.ephemPrivateKey||v(32);a=q(c),i(C(c,e))}).then(function(i){return k(i)}).then(function(i){n=t.iv||v(16);var c=i.slice(0,32);return g=i.slice(32),U(n,c,r)}).then(function(i){u=i;var c=Buffer.concat([n,a,u]);return F(g,c)}).then(function(i){return{iv:n,ephemPublicKey:a,ciphertext:u,mac:i}})};o.decrypt=function(e,r){var t;return C(e,r.ephemPublicKey).then(function(n){return k(n)}).then(function(n){t=n.slice(0,32);var a=n.slice(32),u=Buffer.concat([r.iv,r.ephemPublicKey,r.ciphertext]);return V(a,u,r.mac)}).then(function(n){return f(n,"Bad MAC"),D(r.iv,t,r.ciphertext)}).then(function(n){return Buffer.from(new Uint8Array(n))})}});export{H as a};
