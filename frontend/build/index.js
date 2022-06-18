var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React;
var init_react = __esm({
  "node_modules/@remix-run/dev/compiler/shims/react.ts"() {
    React = __toESM(require("react"));
  }
});

// node_modules/remix/index.js
var require_remix = __commonJS({
  "node_modules/remix/index.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var node = require("@remix-run/node");
    Object.defineProperty(exports, "createFileSessionStorage", {
      enumerable: true,
      get: function() {
        return node.createFileSessionStorage;
      }
    });
    Object.defineProperty(exports, "unstable_createFileUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createFileUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: true,
      get: function() {
        return node.unstable_parseMultipartFormData;
      }
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var serverRuntime = require("@remix-run/server-runtime");
    Object.defineProperty(exports, "createCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.createCookie;
      }
    });
    Object.defineProperty(exports, "createCookieSessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createCookieSessionStorage;
      }
    });
    Object.defineProperty(exports, "createMemorySessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createMemorySessionStorage;
      }
    });
    Object.defineProperty(exports, "createSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "createSessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSessionStorage;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: true,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var react = require("@remix-run/react");
    Object.defineProperty(exports, "Form", {
      enumerable: true,
      get: function() {
        return react.Form;
      }
    });
    Object.defineProperty(exports, "Link", {
      enumerable: true,
      get: function() {
        return react.Link;
      }
    });
    Object.defineProperty(exports, "Links", {
      enumerable: true,
      get: function() {
        return react.Links;
      }
    });
    Object.defineProperty(exports, "LiveReload", {
      enumerable: true,
      get: function() {
        return react.LiveReload;
      }
    });
    Object.defineProperty(exports, "Meta", {
      enumerable: true,
      get: function() {
        return react.Meta;
      }
    });
    Object.defineProperty(exports, "NavLink", {
      enumerable: true,
      get: function() {
        return react.NavLink;
      }
    });
    Object.defineProperty(exports, "Outlet", {
      enumerable: true,
      get: function() {
        return react.Outlet;
      }
    });
    Object.defineProperty(exports, "PrefetchPageLinks", {
      enumerable: true,
      get: function() {
        return react.PrefetchPageLinks;
      }
    });
    Object.defineProperty(exports, "RemixBrowser", {
      enumerable: true,
      get: function() {
        return react.RemixBrowser;
      }
    });
    Object.defineProperty(exports, "RemixServer", {
      enumerable: true,
      get: function() {
        return react.RemixServer;
      }
    });
    Object.defineProperty(exports, "Scripts", {
      enumerable: true,
      get: function() {
        return react.Scripts;
      }
    });
    Object.defineProperty(exports, "ScrollRestoration", {
      enumerable: true,
      get: function() {
        return react.ScrollRestoration;
      }
    });
    Object.defineProperty(exports, "useActionData", {
      enumerable: true,
      get: function() {
        return react.useActionData;
      }
    });
    Object.defineProperty(exports, "useBeforeUnload", {
      enumerable: true,
      get: function() {
        return react.useBeforeUnload;
      }
    });
    Object.defineProperty(exports, "useCatch", {
      enumerable: true,
      get: function() {
        return react.useCatch;
      }
    });
    Object.defineProperty(exports, "useFetcher", {
      enumerable: true,
      get: function() {
        return react.useFetcher;
      }
    });
    Object.defineProperty(exports, "useFetchers", {
      enumerable: true,
      get: function() {
        return react.useFetchers;
      }
    });
    Object.defineProperty(exports, "useFormAction", {
      enumerable: true,
      get: function() {
        return react.useFormAction;
      }
    });
    Object.defineProperty(exports, "useHref", {
      enumerable: true,
      get: function() {
        return react.useHref;
      }
    });
    Object.defineProperty(exports, "useLoaderData", {
      enumerable: true,
      get: function() {
        return react.useLoaderData;
      }
    });
    Object.defineProperty(exports, "useLocation", {
      enumerable: true,
      get: function() {
        return react.useLocation;
      }
    });
    Object.defineProperty(exports, "useMatches", {
      enumerable: true,
      get: function() {
        return react.useMatches;
      }
    });
    Object.defineProperty(exports, "useNavigate", {
      enumerable: true,
      get: function() {
        return react.useNavigate;
      }
    });
    Object.defineProperty(exports, "useNavigationType", {
      enumerable: true,
      get: function() {
        return react.useNavigationType;
      }
    });
    Object.defineProperty(exports, "useOutlet", {
      enumerable: true,
      get: function() {
        return react.useOutlet;
      }
    });
    Object.defineProperty(exports, "useOutletContext", {
      enumerable: true,
      get: function() {
        return react.useOutletContext;
      }
    });
    Object.defineProperty(exports, "useParams", {
      enumerable: true,
      get: function() {
        return react.useParams;
      }
    });
    Object.defineProperty(exports, "useResolvedPath", {
      enumerable: true,
      get: function() {
        return react.useResolvedPath;
      }
    });
    Object.defineProperty(exports, "useSearchParams", {
      enumerable: true,
      get: function() {
        return react.useSearchParams;
      }
    });
    Object.defineProperty(exports, "useSubmit", {
      enumerable: true,
      get: function() {
        return react.useSubmit;
      }
    });
    Object.defineProperty(exports, "useTransition", {
      enumerable: true,
      get: function() {
        return react.useTransition;
      }
    });
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});
init_react();

// server-entry-module:@remix-run/dev/server-build
init_react();

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
init_react();
var import_server = require("react-dom/server");
var import_remix = __toESM(require_remix());
var import_ssr = require("@mantine/ssr");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response(`<!DOCTYPE html>${(0, import_ssr.injectStylesIntoStaticMarkup)(markup)}`, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/home/eric/dev/CavalRe/amm/frontend-remix/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  meta: () => meta
});
init_react();
var import_remix2 = __toESM(require_remix());
var import_react_moralis = require("react-moralis");
var import_core = require("@mantine/core");
var serverUrl = "https://sf5h683tvf93.usemoralis.com:2053/server";
var appId = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";
var meta = () => {
  return { title: "CavalRe" };
};
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), /* @__PURE__ */ React.createElement(import_remix2.Meta, null), /* @__PURE__ */ React.createElement(import_remix2.Links, null)), /* @__PURE__ */ React.createElement(import_react_moralis.MoralisProvider, {
    serverUrl,
    appId
  }, /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_core.MantineProvider, {
    theme: { colorScheme: "dark" },
    withGlobalStyles: true
  }, /* @__PURE__ */ React.createElement(import_remix2.Outlet, null)), /* @__PURE__ */ React.createElement(import_remix2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_remix2.Scripts, null), /* @__PURE__ */ React.createElement(import_remix2.LiveReload, null))));
}

// route:/home/eric/dev/CavalRe/amm/frontend-remix/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader
});
init_react();
var import_remix3 = __toESM(require_remix());
var import_core9 = require("@mantine/core");

// app/components/Dashboard/index.tsx
init_react();
var import_react4 = require("react");
var import_react_moralis5 = require("react-moralis");
var import_core8 = require("@mantine/core");

// app/utils/index.ts
init_react();

// artifacts/contracts/Pool.sol/Pool.json
var abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "AlreadyInitialized",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "payToken",
        type: "address"
      }
    ],
    name: "DuplicateToken",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "expected",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "actual",
        type: "uint256"
      }
    ],
    name: "IncorrectAllocation",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "availabe",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "required",
        type: "uint256"
      }
    ],
    name: "InsufficientAllowance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "payToken",
        type: "address"
      }
    ],
    name: "InvalidStake",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "payToken",
        type: "address"
      },
      {
        internalType: "address",
        name: "receiveToken",
        type: "address"
      }
    ],
    name: "InvalidSwap",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiveToken",
        type: "address"
      }
    ],
    name: "InvalidUnstake",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "expected",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "actual",
        type: "uint256"
      }
    ],
    name: "LengthMismatch",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "asset",
    outputs: [
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "token",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "scale",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "k",
            type: "uint256"
          }
        ],
        internalType: "struct Asset",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "assets",
    outputs: [
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "token",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "scale",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "k",
            type: "uint256"
          }
        ],
        internalType: "struct Asset[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "balance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "balance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256"
      }
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256"
      }
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolSupply",
        type: "uint256"
      },
      {
        internalType: "address[]",
        name: "payTokens",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]"
      },
      {
        internalType: "uint256[]",
        name: "fees",
        type: "uint256[]"
      },
      {
        internalType: "uint256[]",
        name: "weights",
        type: "uint256[]"
      },
      {
        internalType: "uint256[]",
        name: "ks",
        type: "uint256[]"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "payTokens",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]"
      },
      {
        internalType: "address[]",
        name: "receiveTokens",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "allocations",
        type: "uint256[]"
      }
    ],
    name: "multiswap",
    outputs: [
      {
        internalType: "uint256[]",
        name: "receiveAmounts",
        type: "uint256[]"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "scale",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "scale",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "payToken",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "addressTo",
        type: "address"
      }
    ],
    name: "stake",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "payToken",
        type: "address"
      },
      {
        internalType: "address",
        name: "receiveToken",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "addressTo",
        type: "address"
      }
    ],
    name: "swap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiveToken",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "addressTo",
        type: "address"
      }
    ],
    name: "unstake",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "weight",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// artifacts/contracts/Token.sol/Token.json
var abi2 = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256"
      }
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256"
      }
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// app/utils/index.ts
var decimalNumber = (value, decimals = "18") => {
  return parseInt(value) / 10 ** parseInt(decimals);
};

// app/components/Dashboard/Header/index.tsx
init_react();
var import_react_moralis2 = require("react-moralis");
var import_core2 = require("@mantine/core");
var import_ethers = require("ethers");
var DashboardHeader = (props) => {
  const { chain: chain2, poolToken, assetTokens } = props;
  const {
    isAuthenticated,
    authenticate,
    logout,
    account,
    Moralis: Moralis2
  } = (0, import_react_moralis2.useMoralis)();
  const handleLogin = async () => {
    await authenticate();
  };
  const handleLogout = async () => {
    await logout();
  };
  const handleMintTokens = async () => {
    Object.values(assetTokens).forEach(async (asset) => {
      const value = poolToken.contractBalance / 10;
      const price = asset.weight * poolToken.contractBalance / asset.contractBalance;
      const amount = value / price;
      await Moralis2.executeFunction({
        contractAddress: asset.address,
        functionName: "mint",
        abi: abi2,
        params: {
          amount: import_ethers.BigNumber.from((amount * 10 ** asset.decimals).toLocaleString("fullwide", { useGrouping: false }))
        }
      });
    });
  };
  const handleBurnTokens = async () => {
    if (account) {
      await Moralis2.Web3API.account.getTokenBalances({
        account,
        chain: chain2
      }).then((balanceData) => {
        balanceData.forEach(async (b) => {
          var _a;
          if (((_a = assetTokens[b.token_address]) == null ? void 0 : _a.contractBalance) > 0) {
            await Moralis2.executeFunction({
              contractAddress: b.token_address,
              functionName: "burn",
              abi: abi2,
              params: {
                amount: b.balance
              }
            });
          }
          ;
        });
      });
    }
    ;
  };
  return /* @__PURE__ */ React.createElement(import_core2.Header, {
    height: 60,
    p: "xs"
  }, isAuthenticated ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_core2.Button, {
    onClick: handleLogout,
    ml: "md",
    size: "md"
  }, "Logout"), /* @__PURE__ */ React.createElement(import_core2.Button, {
    onClick: handleMintTokens,
    ml: "md",
    size: "md"
  }, "Mint Test Tokens"), /* @__PURE__ */ React.createElement(import_core2.Button, {
    onClick: handleBurnTokens,
    ml: "md",
    size: "md"
  }, "Burn Test Tokens")) : /* @__PURE__ */ React.createElement(import_core2.Button, {
    onClick: handleLogin,
    ml: "md",
    size: "md"
  }, "Connect Wallet"));
};
var Header_default = DashboardHeader;

// app/components/Dashboard/Swap/index.tsx
init_react();
var import_react3 = require("react");
var import_react_moralis4 = require("react-moralis");
var import_core7 = require("@mantine/core");
var import_ethers2 = require("ethers");

// app/components/Dashboard/Swap/PayComponent/index.tsx
init_react();
var import_react_moralis3 = require("react-moralis");
var import_core3 = require("@mantine/core");
var PayComponent = (props) => {
  const { token, swapState, getQuote } = props;
  const { poolToken, assetTokens } = swapState;
  const { isAuthenticated } = (0, import_react_moralis3.useMoralis)();
  const handleAmountChange = (amount) => {
    if (token.address == poolToken.address) {
      poolToken.amount = amount;
    } else {
      assetTokens[token.address].amount = amount;
    }
    getQuote({ poolToken, assetTokens });
  };
  return /* @__PURE__ */ React.createElement(import_core3.Card, {
    radius: "md",
    mt: "xs"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "address"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "payToken",
    value: JSON.stringify(token)
  }), /* @__PURE__ */ React.createElement(import_core3.NumberInput, {
    precision: 2,
    size: "lg",
    icon: /* @__PURE__ */ React.createElement(import_core3.Text, {
      size: "md"
    }, token.symbol),
    hideControls: true,
    value: token.amount,
    onChange: (a) => handleAmountChange(a),
    min: 0,
    error: isAuthenticated && token.amount > token.allowance ? "Insufficient allowance (" + token.symbol + " " + token.allowance + ")" : false
  }), /* @__PURE__ */ React.createElement(import_core3.Group, {
    mt: "xs",
    position: "left"
  }, /* @__PURE__ */ React.createElement(import_core3.Text, null, "Pool Balance:"), /* @__PURE__ */ React.createElement(import_core3.Text, null, token.contractBalance.toLocaleString()), /* @__PURE__ */ React.createElement(import_core3.Text, null, token.symbol)), /* @__PURE__ */ React.createElement(import_core3.Group, {
    mt: "xs",
    position: "left"
  }, /* @__PURE__ */ React.createElement(import_core3.Text, null, "Account Balance:"), /* @__PURE__ */ React.createElement(import_core3.Text, null, token.accountBalance.toLocaleString()), /* @__PURE__ */ React.createElement(import_core3.Text, null, token.symbol)));
};
var PayComponent_default = PayComponent;

// app/components/Dashboard/Swap/ReceiveComponent/index.tsx
init_react();
var import_core4 = require("@mantine/core");
var ReceiveComponent = (props) => {
  const { token, swapState, getQuote } = props;
  const { poolToken, assetTokens } = swapState;
  const handleAllocationChange = (allocation) => {
    if (token.address === poolToken.address) {
      poolToken.allocation = allocation / 100;
    } else {
      assetTokens[token.address].allocation = allocation / 100;
    }
    getQuote({ poolToken, assetTokens });
  };
  return /* @__PURE__ */ React.createElement(import_core4.Card, {
    radius: "md",
    mt: "xs"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "receiveToken",
    value: JSON.stringify(token)
  }), /* @__PURE__ */ React.createElement(import_core4.Text, {
    size: "md",
    mt: "sm",
    component: "span",
    color: "dimmed"
  }, token.symbol), /* @__PURE__ */ React.createElement(import_core4.Text, {
    size: "lg",
    mt: "sm",
    component: "span",
    ml: "md"
  }, (-token.amount).toFixed(4)), /* @__PURE__ */ React.createElement(import_core4.Group, {
    mt: "xs"
  }, /* @__PURE__ */ React.createElement(import_core4.Text, {
    component: "span",
    size: "md",
    styles: { width: "50%" }
  }, "Allocation:"), /* @__PURE__ */ React.createElement(import_core4.NumberInput, {
    precision: 2,
    size: "md",
    value: 100 * token.allocation,
    onChange: (a) => handleAllocationChange(a),
    rightSection: /* @__PURE__ */ React.createElement(React.Fragment, null, "%"),
    styles: { root: { width: "50%" } },
    min: 0
  })), /* @__PURE__ */ React.createElement(import_core4.Group, {
    mt: "xs",
    position: "left"
  }, /* @__PURE__ */ React.createElement(import_core4.Text, null, "Pool Balance:"), /* @__PURE__ */ React.createElement(import_core4.Text, null, token.contractBalance.toLocaleString()), /* @__PURE__ */ React.createElement(import_core4.Text, null, token.symbol)));
};
var ReceiveComponent_default = ReceiveComponent;

// app/components/Dashboard/Swap/TokenSelect/index.tsx
init_react();
var import_react2 = require("react");
var import_core6 = require("@mantine/core");

// app/components/Dashboard/Swap/TokenSelect/TokenItem/index.tsx
init_react();
var import_react = require("react");
var import_core5 = require("@mantine/core");
var TokenItem = (0, import_react.forwardRef)((_a, ref) => {
  var _b = _a, { label, value, token } = _b, others = __objRest(_b, ["label", "value", "token"]);
  return /* @__PURE__ */ React.createElement("div", __spreadValues({
    ref,
    style: { width: "100%" }
  }, others), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(import_core5.Text, {
    size: "md",
    color: "bold",
    component: "span"
  }, `${token.name}`), /* @__PURE__ */ React.createElement(import_core5.Text, {
    size: "xs",
    color: "dimmed",
    component: "span"
  }, ` (${token.symbol})`)));
});
var TokenItem_default = TokenItem;

// app/components/Dashboard/Swap/TokenSelect/index.tsx
var TokenSelect = (props) => {
  const {
    title,
    swapState,
    getQuote,
    tokenComponent,
    isPay,
    placeholder
  } = props;
  const { poolToken, assetTokens } = swapState;
  const [selected, setSelected] = (0, import_react2.useState)(() => {
    let selected2 = [];
    if (isPay && poolToken.selection == "Pay" || !isPay && poolToken.selection == "Receive") {
      selected2.push(poolToken.address);
    }
    ;
    Object.values(assetTokens).forEach((asset) => {
      if (isPay && asset.selection == "Pay" || !isPay && asset.selection == "Receive") {
        selected2.push(asset.address);
      }
      ;
    });
    return selected2;
  });
  const TokenComponent = tokenComponent;
  const getItems = () => {
    let items2 = [];
    if (isPay && poolToken.selection !== "Receive" || !isPay && poolToken.selection !== "Pay") {
      items2.push({
        label: `${poolToken.name} (${poolToken.symbol})`,
        value: poolToken.address,
        token: poolToken,
        group: "Pool Token"
      });
    }
    ;
    items2 = items2.concat(Object.values(assetTokens).filter((t) => isPay ? t.selection !== "Receive" : t.selection !== "Pay").map((t) => {
      return {
        label: `${t.name} (${t.symbol})`,
        value: t.address,
        token: t,
        group: t.contractBalance > 0 ? "Asset Tokens" : "Not in Pool",
        disabled: isPay && t.contractBalance == 0
      };
    }));
    return items2;
  };
  const items = getItems();
  const setToken = (v, token, totalAllocation) => {
    if (isPay && v.includes(token.address)) {
      token.selection = "Pay";
      token.amount = token.amount == 0 ? 1 : token.amount;
    } else if (!isPay && v.includes(token.address)) {
      token.selection = "Receive";
      token.allocation = token.allocation == 0 ? Math.max(0, 1 - totalAllocation) : Math.min(token.allocation, 1 - totalAllocation);
    } else if (isPay && token.selection == "Pay" || !isPay && token.selection == "Receive") {
      token.selection = "Neither";
      token.amount = 0;
      token.allocation = 0;
    }
    ;
    return totalAllocation + token.allocation;
  };
  const handleSelect = (v) => {
    let totalAllocation = setToken(v, poolToken, 0);
    Object.values(assetTokens).forEach((asset) => {
      totalAllocation = setToken(v, asset, totalAllocation);
    });
    getQuote({ poolToken, assetTokens });
    setSelected(v);
  };
  return /* @__PURE__ */ React.createElement(import_core6.Paper, {
    withBorder: true,
    p: "xl",
    radius: "md",
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(import_core6.Title, {
    order: 4,
    align: "center"
  }, title), selected.includes(poolToken.address) ? /* @__PURE__ */ React.createElement(TokenComponent, {
    token: poolToken,
    swapState,
    getQuote,
    key: poolToken.address
  }) : null, Object.values(assetTokens).filter((token) => isPay ? token.selection == "Pay" : token.selection == "Receive").map((token, i) => {
    return /* @__PURE__ */ React.createElement(TokenComponent, {
      token,
      swapState,
      getQuote,
      key: token.address
    });
  }), /* @__PURE__ */ React.createElement(import_core6.MultiSelect, {
    data: items,
    itemComponent: TokenItem_default,
    value: selected,
    onChange: handleSelect,
    mt: "xs",
    size: "md",
    placeholder,
    searchable: true,
    nothingFound: "Nothing found",
    clearable: true,
    clearButtonLabel: "Clear selected tokens"
  }));
};
var TokenSelect_default = TokenSelect;

// app/components/Dashboard/Swap/index.tsx
var Swap = (props) => {
  const { chain: chain2, address } = props;
  const [swapState, setSwapState] = (0, import_react3.useState)(props);
  const { poolToken, assetTokens } = swapState;
  const [isApproved, setIsApproved] = (0, import_react3.useState)(true);
  const {
    isAuthenticated,
    authenticate,
    Moralis: Moralis2
  } = (0, import_react_moralis4.useMoralis)();
  const getPreTradePrice = (asset) => {
    return asset.weight * poolToken.contractBalance / asset.contractBalance;
  };
  const getPostTradePrice = (asset, newPoolTokens) => {
    return asset.weight * newPoolTokens / (asset.contractBalance + asset.amount);
  };
  const getAssetAmount = (assets, newPoolTokens) => {
    return assets.reduce((total, asset) => total + asset.amount * getPostTradePrice(asset, newPoolTokens), 0);
  };
  const getQuote = (swapState2) => {
    const { poolToken: poolToken2, assetTokens: assetTokens2 } = swapState2;
    const poolTokensPreAlloc = poolToken2.contractBalance - (poolToken2.selection == "Pay" ? poolToken2.amount : 0);
    const selectedAssetPayTokens = Object.values(assetTokens2).filter((asset) => asset.selection == "Pay");
    const selectedAssetReceiveTokens = Object.values(assetTokens2).filter((asset) => asset.selection == "Receive");
    const assetAmountInPreAlloc = getAssetAmount(selectedAssetPayTokens, poolTokensPreAlloc);
    const totalAmountInPreAlloc = assetAmountInPreAlloc + (poolToken2.selection == "Pay" ? poolToken2.amount : 0);
    let poolTokens = poolTokensPreAlloc;
    let totalAmountOut = totalAmountInPreAlloc;
    if (poolToken2.allocation !== 0) {
      const factor = 1 / poolToken2.allocation - getAssetAmount(selectedAssetPayTokens, 1);
      const totalAmountOutNoFee = totalAmountInPreAlloc / factor;
      const poolTokensOutNoFee = poolToken2.allocation * totalAmountOutNoFee;
      const poolTokensOut = (1 - poolToken2.fee) * poolTokensOutNoFee;
      poolToken2.amount = -poolTokensOut;
      poolTokens = poolToken2.contractBalance + poolTokensOut;
      totalAmountOut = totalAmountOutNoFee;
    }
    ;
    const quotes = selectedAssetReceiveTokens.map((token) => {
      const allocation = token.allocation;
      const factor = (1 - token.fee) * allocation * totalAmountOut / (token.weight * poolTokens);
      const amountOut = factor * token.contractBalance / (1 + factor);
      token.amount = -amountOut;
      const preTradePrice = getPreTradePrice(token);
      const postTradePrice = getPostTradePrice(token, poolTokens);
      return {
        token,
        preTradePrice,
        postTradePrice,
        amountOut
      };
    });
    setSwapState({ poolToken: poolToken2, assetTokens: assetTokens2 });
    return quotes;
  };
  const swap = async (address2, payTokens, receiveTokens) => {
    const totalAllocation2 = receiveTokens.reduce((acc, t) => acc + t.allocation, 0);
    if (Math.abs(totalAllocation2 - 1) > 1e-4) {
      console.log(`Allocation must be 1: ${totalAllocation2}`);
      return { error: "Allocation must add up to 1" };
    }
    ;
    if (payTokens.length == 0) {
      console.log("No pay tokens");
      return { error: "Must select at least one pay token" };
    }
    ;
    if (receiveTokens.length == 0) {
      console.log("Must select at least one receive token");
      return { error: "Must select at least one receive token" };
    }
    const payAddresses = payTokens.map((t) => t.address);
    const amounts = payTokens.map((t) => import_ethers2.BigNumber.from((t.amount * 10 ** t.decimals).toLocaleString("fullwide", { useGrouping: false })));
    const receiveAddresses = receiveTokens.map((t) => t.address);
    const allocations = receiveTokens.map((t) => import_ethers2.BigNumber.from((t.allocation * 10 ** 18).toLocaleString("fullwide", { useGrouping: false })));
    if (payTokens.length == 1 && receiveTokens.length == 1) {
      if (receiveAddresses.includes(poolToken.address)) {
        await Moralis2.executeFunction({
          contractAddress: poolToken.address,
          functionName: "stake",
          abi,
          params: {
            payToken: payTokens[0].address,
            amountIn: import_ethers2.BigNumber.from((payTokens[0].amount * 10 ** payTokens[0].decimals).toLocaleString("fullwide", { useGrouping: false })),
            addressTo: address2
          }
        });
        return { result: "Staking" };
      } else if (payAddresses.includes(poolToken.address)) {
        await Moralis2.executeFunction({
          contractAddress: poolToken.address,
          functionName: "unstake",
          abi,
          params: {
            receiveToken: receiveTokens[0].address,
            amountIn: import_ethers2.BigNumber.from((payTokens[0].amount * 10 ** payTokens[0].decimals).toLocaleString("fullwide", { useGrouping: false })),
            addressTo: address2
          }
        });
        return { result: "Unstaking" };
      } else {
        await Moralis2.executeFunction({
          contractAddress: poolToken.address,
          functionName: "swap",
          abi,
          params: {
            payToken: payTokens[0].address,
            receiveToken: receiveTokens[0].address,
            amountIn: import_ethers2.BigNumber.from((payTokens[0].amount * 10 ** payTokens[0].decimals).toLocaleString("fullwide", { useGrouping: false })),
            addressTo: address2
          }
        });
        return { result: "Swapping" };
      }
      ;
    } else {
      await Moralis2.executeFunction({
        contractAddress: poolToken.address,
        functionName: "multiswap",
        abi,
        params: {
          payTokens: payAddresses,
          amounts,
          receiveTokens: receiveAddresses,
          allocations
        }
      });
      return { result: "Swapping" };
    }
    ;
  };
  const totalAllocation = Object.values(assetTokens).reduce((total, { allocation }) => total + allocation, poolToken.allocation);
  const handleSwap = () => {
    getQuote(swapState);
    const payTokens = [];
    const receiveTokens = [];
    if (poolToken.selection == "Pay") {
      payTokens.push(poolToken);
    } else if (poolToken.selection == "Receive") {
      receiveTokens.push(poolToken);
    }
    ;
    Object.values(assetTokens).forEach((asset) => {
      if (asset.selection == "Pay") {
        payTokens.push(asset);
      } else if (asset.selection == "Receive") {
        receiveTokens.push(asset);
      }
    });
    address && swap(address, payTokens, receiveTokens);
  };
  const handleLogin = async () => await authenticate();
  const checkAllocations = () => {
    let isApproved2 = poolToken.amount <= poolToken.allowance;
    Object.values(assetTokens).forEach((asset) => {
      isApproved2 = isApproved2 && asset.amount <= asset.allowance;
    });
    return isApproved2;
  };
  const handleIncreaseAllowance = async () => {
    const increaseAmount = poolToken.amount - poolToken.allowance;
    if (increaseAmount > 0) {
      await Moralis2.executeFunction({
        contractAddress: poolToken.address,
        functionName: "approve",
        abi,
        params: {
          spender: poolToken.address,
          amount: import_ethers2.BigNumber.from((increaseAmount * 10 ** poolToken.decimals).toLocaleString("fullwide", { useGrouping: false }))
        }
      });
    }
    ;
    Object.values(assetTokens).forEach(async (asset) => {
      const increaseAmount2 = asset.amount - asset.allowance;
      if (increaseAmount2 > 0) {
        await Moralis2.executeFunction({
          contractAddress: asset.address,
          functionName: "approve",
          abi,
          params: {
            spender: poolToken.address,
            amount: import_ethers2.BigNumber.from((increaseAmount2 * 10 ** asset.decimals).toLocaleString("fullwide", { useGrouping: false }))
          }
        });
      }
      ;
    });
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_core7.SimpleGrid, {
    cols: 2
  }, /* @__PURE__ */ React.createElement(TokenSelect_default, {
    title: "Pay Tokens",
    swapState,
    getQuote,
    tokenComponent: PayComponent_default,
    isPay: true,
    placeholder: "Select tokens to deposit:"
  }), /* @__PURE__ */ React.createElement(TokenSelect_default, {
    title: "Receive Tokens",
    swapState,
    getQuote,
    tokenComponent: ReceiveComponent_default,
    isPay: false,
    placeholder: "Select tokens to withdraw:"
  })), /* @__PURE__ */ React.createElement(import_core7.Text, null, `Total allocation: ${(100 * totalAllocation).toFixed(2)}%`), isAuthenticated ? checkAllocations() ? /* @__PURE__ */ React.createElement(import_core7.Button, {
    type: "submit",
    onClick: handleSwap,
    mt: "xl",
    size: "md",
    disabled: Math.abs(totalAllocation - 1) > 1e-4
  }, "Execute Swap") : /* @__PURE__ */ React.createElement(import_core7.Button, {
    type: "submit",
    onClick: handleIncreaseAllowance,
    mt: "xl",
    size: "md"
  }, "Increase Allowances") : /* @__PURE__ */ React.createElement(import_core7.Button, {
    type: "submit",
    onClick: handleLogin,
    mt: "xl",
    size: "md"
  }, "Connect Wallet"));
};
var Swap_default = Swap;

// app/components/Dashboard/index.tsx
var Dashboard = (props) => {
  var _a, _b;
  const {
    isAuthenticated,
    isWeb3Enabled,
    enableWeb3,
    account,
    Moralis: Moralis2
  } = (0, import_react_moralis5.useMoralis)();
  const { chain: chain2, poolToken, assetTokens } = props;
  const [opened, setOpened] = (0, import_react4.useState)(false);
  const [_, setTotalBalance] = (0, import_react4.useState)(0);
  const setBalances = async () => {
    if (account) {
      await Moralis2.Web3API.account.getTokenBalances({
        account,
        chain: chain2
      }).then((balanceData) => {
        let totalBalance = 0;
        balanceData.forEach(async (b) => {
          const balance2 = decimalNumber(b.balance, b.decimals);
          totalBalance += balance2;
          if (b.token_address in assetTokens) {
            assetTokens[b.token_address].accountBalance = balance2;
          } else if (b.token_address == poolToken.address) {
            poolToken.accountBalance = balance2;
          } else {
            assetTokens[b.token_address] = {
              address: b.token_address,
              name: b.name,
              symbol: b.symbol,
              decimals: parseInt(b.decimals),
              k: 1,
              fee: 0.01,
              weight: 0,
              contractBalance: 0,
              accountBalance: balance2,
              allowance: 0,
              amount: 0,
              allocation: 0,
              selection: "Not in Pool"
            };
          }
          ;
        });
        setTotalBalance(totalBalance);
      });
    }
  };
  const setAllowances = async () => {
    if (account) {
      await Moralis2.Web3API.token.getTokenAllowance({
        owner_address: account,
        spender_address: poolToken.address,
        address: poolToken.address,
        chain: chain2
      }).then(({ allowance }) => {
        poolToken.allowance = decimalNumber(allowance, poolToken.decimals.toString());
      });
      Object.values(assetTokens).forEach(async (asset) => {
        await Moralis2.Web3API.token.getTokenAllowance({
          owner_address: account,
          spender_address: poolToken.address,
          address: asset.address,
          chain: chain2
        }).then(({ allowance }) => {
          assetTokens[asset.address].allowance = decimalNumber(allowance, asset.decimals.toString());
        });
      });
    }
    ;
  };
  (0, import_react4.useEffect)(() => {
    if (isAuthenticated) {
      if (!isWeb3Enabled) {
        enableWeb3();
      } else {
        setBalances();
        setAllowances();
      }
      ;
    }
  }, [isAuthenticated, isWeb3Enabled, account]);
  const contractBalance = poolToken.accountBalance;
  const poolTokens = poolToken.contractBalance;
  const price = (asset) => {
    return poolTokens * asset.weight / asset.contractBalance;
  };
  const balance = (asset) => {
    return asset.accountBalance;
  };
  const poolTokenNumeraire = { name: poolToken.name, symbol: poolToken.symbol, price: 1 };
  const [numeraire, setNumeraire] = (0, import_react4.useState)(poolTokenNumeraire);
  const numeraires = [poolTokenNumeraire, ...(_a = Object.values(assetTokens)) == null ? void 0 : _a.map((a) => {
    return { name: a.name, symbol: a.symbol, price: price(a) };
  })];
  const numeraireMap = {};
  numeraires.forEach((n) => {
    numeraireMap[`${n.name} (${n.symbol})`] = n;
  });
  const handleNumeraire = (value) => {
    setNumeraire(numeraireMap[value]);
  };
  const numberOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  const cellTextSize = "md";
  const headerTextSize = "lg";
  const subTextSize = "sm";
  const rows = (_b = Object.values(assetTokens)) == null ? void 0 : _b.filter((a) => a.contractBalance > 0 && a.k !== void 0 && a.fee !== void 0).map((a, i) => /* @__PURE__ */ React.createElement("tr", {
    key: a.address
  }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: cellTextSize,
    color: "bold",
    component: "span"
  }, `${a.name}`), /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: "xs",
    color: "dimmed",
    component: "span"
  }, ` (${a.symbol})`))), isAuthenticated ? /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: cellTextSize
  }, (balance(a) / numeraire.price).toLocaleString(void 0, numberOptions))) : null, /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: cellTextSize
  }, (price(a) / numeraire.price).toLocaleString(void 0, numberOptions))), /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: cellTextSize
  }, (a.contractBalance / numeraire.price).toLocaleString(void 0, numberOptions))), /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: cellTextSize
  }, (1e4 * a.fee).toLocaleString())), /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: cellTextSize
  }, a.k.toLocaleString()))));
  return /* @__PURE__ */ React.createElement(import_core8.Container, null, /* @__PURE__ */ React.createElement(import_core8.Title, null, "Liquidity Pool"), /* @__PURE__ */ React.createElement(import_core8.Button, {
    onClick: () => setOpened(true),
    mt: "xl"
  }, "Swap"), /* @__PURE__ */ React.createElement(import_core8.Modal, {
    size: "800px",
    opened,
    onClose: () => setOpened(false),
    radius: "lg",
    title: /* @__PURE__ */ React.createElement(import_core8.Title, {
      align: "center",
      order: 3
    }, "Mulit-Asset Swap")
  }, /* @__PURE__ */ React.createElement(Swap_default, {
    poolToken,
    assetTokens,
    chain: chain2,
    address: account
  })), /* @__PURE__ */ React.createElement(import_core8.Card, {
    withBorder: true,
    p: "xl",
    radius: "md",
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(import_core8.Title, {
    order: 3
  }, "Pool Tokens"), /* @__PURE__ */ React.createElement(import_core8.SimpleGrid, {
    cols: isAuthenticated ? 4 : 3
  }, isAuthenticated ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: "xl",
    mt: "md"
  }, (contractBalance / numeraire.price).toLocaleString() + " " + numeraire.symbol), /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: subTextSize,
    color: "dimmed"
  }, "Balance")) : null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: "xl",
    mt: "md"
  }, (poolTokens / numeraire.price).toLocaleString() + " " + numeraire.symbol), /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: subTextSize,
    color: "dimmed"
  }, "TVL")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: "xl",
    mt: "md"
  }, poolTokens == null ? void 0 : poolTokens.toLocaleString()), /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: subTextSize,
    color: "dimmed"
  }, "Outstanding")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_core8.NativeSelect, {
    mt: "md",
    value: `${numeraire.name} (${numeraire.symbol})`,
    onChange: (event) => handleNumeraire(event.currentTarget.value),
    data: numeraires.map((n) => `${n.name} (${n.symbol})`),
    description: "Select numeraire",
    required: true
  })))), /* @__PURE__ */ React.createElement(import_core8.Card, {
    withBorder: true,
    p: "xl",
    radius: "md",
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(import_core8.Title, {
    order: 3
  }, "Asset Tokens"), /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: "xl",
    mt: "md"
  }, Object.values(assetTokens).reduce((acc, a) => acc + (a.selection !== "Not in Pool" ? 1 : 0), 0).toLocaleString()), /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: subTextSize,
    color: "dimmed"
  }, "Number of assets"), /* @__PURE__ */ React.createElement(import_core8.Group, {
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(import_core8.Table, {
    verticalSpacing: "sm",
    style: { width: "100%" },
    highlightOnHover: true
  }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: headerTextSize
  }, "Name")), isAuthenticated ? /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: headerTextSize
  }, "Balance (", numeraire.symbol, ")")) : null, /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: headerTextSize
  }, "Price (", numeraire.symbol, ")")), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: headerTextSize
  }, "Reserves (", numeraire.symbol, ")")), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: headerTextSize
  }, "Fee (bps)")), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(import_core8.Text, {
    size: headerTextSize
  }, "Tuning (k)")))), /* @__PURE__ */ React.createElement("tbody", null, rows)))), /* @__PURE__ */ React.createElement(import_core8.Text, {
    align: "center"
  }, "Note: The tokens appearing above are mock versions of actual tokens for test purposes only."));
};
var Dashboard_default = Dashboard;

// app/moralis.server.ts
init_react();
var import_node = __toESM(require("moralis/node"));
var serverUrl2 = "https://sf5h683tvf93.usemoralis.com:2053/server";
var appId2 = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";
var masterKey = "8v8AJX9Tanzb2sYiwTG8tlc55AeRwb9LSLSjg0Ej";
var contractAddress = "0x513abc44e268a1ae437b3631542555b04845e5a5".toLowerCase();
var chain = "ropsten";
import_node.default.start({
  serverUrl: serverUrl2,
  appId: appId2,
  masterKey
});
var getPool = async () => {
  const poolTokens = decimalNumber(await import_node.default.Web3API.native.runContractFunction({
    chain,
    address: contractAddress,
    function_name: "balance",
    abi
  }));
  console.log("Pool Tokens:", poolTokens);
  const assetData = await import_node.default.Web3API.native.runContractFunction({
    chain,
    address: contractAddress,
    function_name: "assets",
    abi
  });
  const addresses = assetData.map((asset) => asset[0].toLowerCase());
  const metadata = await import_node.default.Web3API.token.getTokenMetadata({
    chain,
    addresses
  });
  const poolToken = {
    address: contractAddress,
    name: "Pool",
    symbol: "P",
    decimals: 18,
    fee: 1e-4,
    contractBalance: poolTokens,
    accountBalance: 0,
    allowance: 0,
    amount: 0,
    allocation: 0,
    selection: "Neither"
  };
  const assetTokens = {};
  assetData.forEach((a, i) => {
    assetTokens[a[0].toLowerCase()] = {
      address: addresses[i],
      name: metadata[i].name,
      symbol: metadata[i].symbol,
      decimals: parseInt(metadata[i].decimals),
      k: decimalNumber(a[4]),
      fee: decimalNumber(a[2]),
      weight: 1 / addresses.length,
      contractBalance: decimalNumber(a[1]),
      accountBalance: 0,
      allowance: 0,
      amount: 0,
      allocation: 0,
      selection: "Neither"
    };
  });
  return { chain, poolToken, assetTokens };
};

// route:/home/eric/dev/CavalRe/amm/frontend-remix/app/routes/index.tsx
var loader = async () => {
  const pool = await getPool();
  return pool;
};
function Index() {
  const pool = (0, import_remix3.useLoaderData)();
  const { chain: chain2, poolToken, assetTokens } = pool;
  return /* @__PURE__ */ React.createElement(import_core9.AppShell, {
    padding: "md",
    header: /* @__PURE__ */ React.createElement(Header_default, {
      chain: chain2,
      poolToken,
      assetTokens
    })
  }, /* @__PURE__ */ React.createElement(Dashboard_default, {
    chain: chain2,
    poolToken,
    assetTokens
  }));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
init_react();
var assets_manifest_default = { "version": "42a69b04", "entry": { "module": "/build/entry.client-ELD634MG.js", "imports": ["/build/_shared/chunk-2WLCDQIM.js", "/build/_shared/chunk-6CGL4AQG.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-K6GAUUYO.js", "imports": ["/build/_shared/chunk-IX54FUP3.js", "/build/_shared/chunk-EIQFNHMF.js", "/build/_shared/chunk-D5MFRKGD.js", "/build/_shared/chunk-BYTAJHI2.js", "/build/_shared/chunk-VJL6IW7N.js", "/build/_shared/chunk-Q4OQB5CY.js", "/build/_shared/chunk-LT2KR7O7.js", "/build/_shared/chunk-V6EQCR3J.js", "/build/_shared/chunk-L6HA2T2H.js", "/build/_shared/chunk-LLVLRWYQ.js", "/build/_shared/chunk-ZQZXQ4RX.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-FE2YNKMK.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-42A69B04.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
/**
 * @remix-run/node v1.2.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/react v1.2.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/server-runtime v1.2.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0ByZW1peC1ydW4vZGV2L2NvbXBpbGVyL3NoaW1zL3JlYWN0LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9yZW1peC9pbmRleC5qcyIsICI8c3RkaW4+IiwgInNlcnZlci1lbnRyeS1tb2R1bGU6QHJlbWl4LXJ1bi9kZXYvc2VydmVyLWJ1aWxkIiwgIi4uL2FwcC9lbnRyeS5zZXJ2ZXIudHN4IiwgInJvdXRlOi9ob21lL2VyaWMvZGV2L0NhdmFsUmUvYW1tL2Zyb250ZW5kLXJlbWl4L2FwcC9yb290LnRzeCIsICJyb3V0ZTovaG9tZS9lcmljL2Rldi9DYXZhbFJlL2FtbS9mcm9udGVuZC1yZW1peC9hcHAvcm91dGVzL2luZGV4LnRzeCIsICIuLi9hcHAvY29tcG9uZW50cy9EYXNoYm9hcmQvaW5kZXgudHN4IiwgIi4uL2FwcC91dGlscy9pbmRleC50cyIsICIuLi9hcHAvY29tcG9uZW50cy9EYXNoYm9hcmQvSGVhZGVyL2luZGV4LnRzeCIsICIuLi9hcHAvY29tcG9uZW50cy9EYXNoYm9hcmQvU3dhcC9pbmRleC50c3giLCAiLi4vYXBwL2NvbXBvbmVudHMvRGFzaGJvYXJkL1N3YXAvUGF5Q29tcG9uZW50L2luZGV4LnRzeCIsICIuLi9hcHAvY29tcG9uZW50cy9EYXNoYm9hcmQvU3dhcC9SZWNlaXZlQ29tcG9uZW50L2luZGV4LnRzeCIsICIuLi9hcHAvY29tcG9uZW50cy9EYXNoYm9hcmQvU3dhcC9Ub2tlblNlbGVjdC9pbmRleC50c3giLCAiLi4vYXBwL2NvbXBvbmVudHMvRGFzaGJvYXJkL1N3YXAvVG9rZW5TZWxlY3QvVG9rZW5JdGVtL2luZGV4LnRzeCIsICIuLi9hcHAvbW9yYWxpcy5zZXJ2ZXIudHMiLCAic2VydmVyLWFzc2V0cy1tYW5pZmVzdDpAcmVtaXgtcnVuL2Rldi9hc3NldHMtbWFuaWZlc3QiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZXhwb3J0IHsgUmVhY3QgfTtcbiIsICIvKipcbiAqIEByZW1peC1ydW4vbm9kZSB2MS4yLjNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIFJlbWl4IFNvZnR3YXJlIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UubWQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgbm9kZSA9IHJlcXVpcmUoJ0ByZW1peC1ydW4vbm9kZScpO1xuXG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdjcmVhdGVGaWxlU2Vzc2lvblN0b3JhZ2UnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbm9kZS5jcmVhdGVGaWxlU2Vzc2lvblN0b3JhZ2U7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1bnN0YWJsZV9jcmVhdGVGaWxlVXBsb2FkSGFuZGxlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBub2RlLnVuc3RhYmxlX2NyZWF0ZUZpbGVVcGxvYWRIYW5kbGVyOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndW5zdGFibGVfY3JlYXRlTWVtb3J5VXBsb2FkSGFuZGxlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBub2RlLnVuc3RhYmxlX2NyZWF0ZU1lbW9yeVVwbG9hZEhhbmRsZXI7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1bnN0YWJsZV9wYXJzZU11bHRpcGFydEZvcm1EYXRhJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5vZGUudW5zdGFibGVfcGFyc2VNdWx0aXBhcnRGb3JtRGF0YTsgfVxufSk7XG5cbi8qKlxuICogQHJlbWl4LXJ1bi9zZXJ2ZXItcnVudGltZSB2MS4yLjNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIFJlbWl4IFNvZnR3YXJlIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UubWQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgc2VydmVyUnVudGltZSA9IHJlcXVpcmUoJ0ByZW1peC1ydW4vc2VydmVyLXJ1bnRpbWUnKTtcblxuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnY3JlYXRlQ29va2llJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlcnZlclJ1bnRpbWUuY3JlYXRlQ29va2llOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnY3JlYXRlQ29va2llU2Vzc2lvblN0b3JhZ2UnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VydmVyUnVudGltZS5jcmVhdGVDb29raWVTZXNzaW9uU3RvcmFnZTsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2NyZWF0ZU1lbW9yeVNlc3Npb25TdG9yYWdlJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlcnZlclJ1bnRpbWUuY3JlYXRlTWVtb3J5U2Vzc2lvblN0b3JhZ2U7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdjcmVhdGVTZXNzaW9uJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlcnZlclJ1bnRpbWUuY3JlYXRlU2Vzc2lvbjsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2NyZWF0ZVNlc3Npb25TdG9yYWdlJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlcnZlclJ1bnRpbWUuY3JlYXRlU2Vzc2lvblN0b3JhZ2U7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdpc0Nvb2tpZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXJ2ZXJSdW50aW1lLmlzQ29va2llOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnaXNTZXNzaW9uJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlcnZlclJ1bnRpbWUuaXNTZXNzaW9uOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnanNvbicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXJ2ZXJSdW50aW1lLmpzb247IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdyZWRpcmVjdCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXJ2ZXJSdW50aW1lLnJlZGlyZWN0OyB9XG59KTtcblxuLyoqXG4gKiBAcmVtaXgtcnVuL3JlYWN0IHYxLjIuM1xuICpcbiAqIENvcHlyaWdodCAoYykgUmVtaXggU29mdHdhcmUgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS5tZCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciByZWFjdCA9IHJlcXVpcmUoJ0ByZW1peC1ydW4vcmVhY3QnKTtcblxuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRm9ybScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC5Gb3JtOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnTGluaycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC5MaW5rOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnTGlua3MnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QuTGlua3M7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdMaXZlUmVsb2FkJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LkxpdmVSZWxvYWQ7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdNZXRhJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0Lk1ldGE7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdOYXZMaW5rJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0Lk5hdkxpbms7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdPdXRsZXQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QuT3V0bGV0OyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnUHJlZmV0Y2hQYWdlTGlua3MnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QuUHJlZmV0Y2hQYWdlTGlua3M7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdSZW1peEJyb3dzZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QuUmVtaXhCcm93c2VyOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnUmVtaXhTZXJ2ZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QuUmVtaXhTZXJ2ZXI7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTY3JpcHRzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LlNjcmlwdHM7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTY3JvbGxSZXN0b3JhdGlvbicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC5TY3JvbGxSZXN0b3JhdGlvbjsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZUFjdGlvbkRhdGEnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QudXNlQWN0aW9uRGF0YTsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZUJlZm9yZVVubG9hZCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VCZWZvcmVVbmxvYWQ7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1c2VDYXRjaCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VDYXRjaDsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZUZldGNoZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QudXNlRmV0Y2hlcjsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZUZldGNoZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZUZldGNoZXJzOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlRm9ybUFjdGlvbicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VGb3JtQWN0aW9uOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlSHJlZicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VIcmVmOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlTG9hZGVyRGF0YScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VMb2FkZXJEYXRhOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlTG9jYXRpb24nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QudXNlTG9jYXRpb247IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1c2VNYXRjaGVzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZU1hdGNoZXM7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1c2VOYXZpZ2F0ZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VOYXZpZ2F0ZTsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZU5hdmlnYXRpb25UeXBlJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZU5hdmlnYXRpb25UeXBlOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlT3V0bGV0Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZU91dGxldDsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZU91dGxldENvbnRleHQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QudXNlT3V0bGV0Q29udGV4dDsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZVBhcmFtcycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VQYXJhbXM7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1c2VSZXNvbHZlZFBhdGgnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QudXNlUmVzb2x2ZWRQYXRoOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlU2VhcmNoUGFyYW1zJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZVNlYXJjaFBhcmFtczsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZVN1Ym1pdCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VTdWJtaXQ7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1c2VUcmFuc2l0aW9uJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZVRyYW5zaXRpb247IH1cbn0pO1xuXG4iLCAiZXhwb3J0ICogZnJvbSBcIkByZW1peC1ydW4vZGV2L3NlcnZlci1idWlsZFwiOyIsICJcbmltcG9ydCAqIGFzIGVudHJ5U2VydmVyIGZyb20gXCIvaG9tZS9lcmljL2Rldi9DYXZhbFJlL2FtbS9mcm9udGVuZC1yZW1peC9hcHAvZW50cnkuc2VydmVyLnRzeFwiO1xuaW1wb3J0ICogYXMgcm91dGUwIGZyb20gXCIvaG9tZS9lcmljL2Rldi9DYXZhbFJlL2FtbS9mcm9udGVuZC1yZW1peC9hcHAvcm9vdC50c3hcIjtcbmltcG9ydCAqIGFzIHJvdXRlMSBmcm9tIFwiL2hvbWUvZXJpYy9kZXYvQ2F2YWxSZS9hbW0vZnJvbnRlbmQtcmVtaXgvYXBwL3JvdXRlcy9pbmRleC50c3hcIjtcbiAgZXhwb3J0IHsgZGVmYXVsdCBhcyBhc3NldHMgfSBmcm9tIFwiQHJlbWl4LXJ1bi9kZXYvYXNzZXRzLW1hbmlmZXN0XCI7XG4gIGV4cG9ydCBjb25zdCBlbnRyeSA9IHsgbW9kdWxlOiBlbnRyeVNlcnZlciB9O1xuICBleHBvcnQgY29uc3Qgcm91dGVzID0ge1xuICAgIFwicm9vdFwiOiB7XG4gICAgICBpZDogXCJyb290XCIsXG4gICAgICBwYXJlbnRJZDogdW5kZWZpbmVkLFxuICAgICAgcGF0aDogXCJcIixcbiAgICAgIGluZGV4OiB1bmRlZmluZWQsXG4gICAgICBjYXNlU2Vuc2l0aXZlOiB1bmRlZmluZWQsXG4gICAgICBtb2R1bGU6IHJvdXRlMFxuICAgIH0sXG4gIFwicm91dGVzL2luZGV4XCI6IHtcbiAgICAgIGlkOiBcInJvdXRlcy9pbmRleFwiLFxuICAgICAgcGFyZW50SWQ6IFwicm9vdFwiLFxuICAgICAgcGF0aDogdW5kZWZpbmVkLFxuICAgICAgaW5kZXg6IHRydWUsXG4gICAgICBjYXNlU2Vuc2l0aXZlOiB1bmRlZmluZWQsXG4gICAgICBtb2R1bGU6IHJvdXRlMVxuICAgIH1cbiAgfTsiLCAiaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IFJlbWl4U2VydmVyIH0gZnJvbSAncmVtaXgnO1xuaW1wb3J0IHR5cGUgeyBFbnRyeUNvbnRleHQgfSBmcm9tICdyZW1peCc7XG5pbXBvcnQgeyBpbmplY3RTdHlsZXNJbnRvU3RhdGljTWFya3VwIH0gZnJvbSAnQG1hbnRpbmUvc3NyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChcbiAgcmVxdWVzdDogUmVxdWVzdCxcbiAgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXIsXG4gIHJlc3BvbnNlSGVhZGVyczogSGVhZGVycyxcbiAgcmVtaXhDb250ZXh0OiBFbnRyeUNvbnRleHRcbikge1xuICBjb25zdCBtYXJrdXAgPSByZW5kZXJUb1N0cmluZyg8UmVtaXhTZXJ2ZXIgY29udGV4dD17cmVtaXhDb250ZXh0fSB1cmw9e3JlcXVlc3QudXJsfSAvPik7XG4gIHJlc3BvbnNlSGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L2h0bWwnKTtcblxuICByZXR1cm4gbmV3IFJlc3BvbnNlKGA8IURPQ1RZUEUgaHRtbD4ke2luamVjdFN0eWxlc0ludG9TdGF0aWNNYXJrdXAobWFya3VwKX1gLCB7XG4gICAgc3RhdHVzOiByZXNwb25zZVN0YXR1c0NvZGUsXG4gICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICB9KTtcbn1cblxuXG4vLyBpbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gXCJyZWFjdC1kb20vc2VydmVyXCI7XG4vLyBpbXBvcnQgeyBSZW1peFNlcnZlciB9IGZyb20gXCJyZW1peFwiO1xuLy8gaW1wb3J0IHR5cGUgeyBFbnRyeUNvbnRleHQgfSBmcm9tIFwicmVtaXhcIjtcblxuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChcbi8vICAgcmVxdWVzdDogUmVxdWVzdCxcbi8vICAgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXIsXG4vLyAgIHJlc3BvbnNlSGVhZGVyczogSGVhZGVycyxcbi8vICAgcmVtaXhDb250ZXh0OiBFbnRyeUNvbnRleHRcbi8vICkge1xuLy8gICBjb25zdCBtYXJrdXAgPSByZW5kZXJUb1N0cmluZyhcbi8vICAgICAgIDxSZW1peFNlcnZlciBjb250ZXh0PXtyZW1peENvbnRleHR9IHVybD17cmVxdWVzdC51cmx9IC8+XG4vLyAgICk7XG5cbi8vICAgcmVzcG9uc2VIZWFkZXJzLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvaHRtbFwiKTtcblxuLy8gICByZXR1cm4gbmV3IFJlc3BvbnNlKFwiPCFET0NUWVBFIGh0bWw+XCIgKyBtYXJrdXAsIHtcbi8vICAgICBzdGF0dXM6IHJlc3BvbnNlU3RhdHVzQ29kZSxcbi8vICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnNcbi8vICAgfSk7XG4vLyB9XG4iLCAiaW1wb3J0IHtcclxuICBMaW5rcyxcclxuICBMaXZlUmVsb2FkLFxyXG4gIE1ldGEsXHJcbiAgT3V0bGV0LFxyXG4gIFNjcmlwdHMsXHJcbiAgU2Nyb2xsUmVzdG9yYXRpb25cclxufSBmcm9tIFwicmVtaXhcIjtcclxuaW1wb3J0IHR5cGUgeyBNZXRhRnVuY3Rpb24gfSBmcm9tIFwicmVtaXhcIjtcclxuaW1wb3J0IHsgTW9yYWxpc1Byb3ZpZGVyIH0gZnJvbSBcInJlYWN0LW1vcmFsaXNcIjtcclxuaW1wb3J0IHsgTWFudGluZVByb3ZpZGVyIH0gZnJvbSAnQG1hbnRpbmUvY29yZSc7XHJcblxyXG5jb25zdCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc2Y1aDY4M3R2ZjkzLnVzZW1vcmFsaXMuY29tOjIwNTMvc2VydmVyXCI7XHJcbmNvbnN0IGFwcElkID0gXCIyUTJmQVVQWk81V0l6ZURuMlZQR1JWS2ZLU3R6TWFUWmo3aDk5OGVBXCI7XHJcblxyXG5leHBvcnQgY29uc3QgbWV0YTogTWV0YUZ1bmN0aW9uID0gKCkgPT4ge1xyXG4gIHJldHVybiB7IHRpdGxlOiBcIkNhdmFsUmVcIiB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxodG1sIGxhbmc9XCJlblwiPlxyXG4gICAgICA8aGVhZD5cclxuICAgICAgICA8bWV0YSBjaGFyU2V0PVwidXRmLThcIiAvPlxyXG4gICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsaW5pdGlhbC1zY2FsZT0xXCIgLz5cclxuICAgICAgICA8TWV0YSAvPlxyXG4gICAgICAgIDxMaW5rcyAvPlxyXG4gICAgICA8L2hlYWQ+XHJcbiAgICAgIDxNb3JhbGlzUHJvdmlkZXIgc2VydmVyVXJsPXtzZXJ2ZXJVcmx9IGFwcElkPXthcHBJZH0+XHJcbiAgICAgICAgPGJvZHk+XHJcbiAgICAgICAgICA8TWFudGluZVByb3ZpZGVyIHRoZW1lPXt7IGNvbG9yU2NoZW1lOiBcImRhcmtcIiB9fSB3aXRoR2xvYmFsU3R5bGVzPlxyXG4gICAgICAgICAgICA8T3V0bGV0IC8+XHJcbiAgICAgICAgICA8L01hbnRpbmVQcm92aWRlcj5cclxuICAgICAgICAgIDxTY3JvbGxSZXN0b3JhdGlvbiAvPlxyXG4gICAgICAgICAgPFNjcmlwdHMgLz5cclxuICAgICAgICAgIHtwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiICYmIDxMaXZlUmVsb2FkIC8+fVxyXG4gICAgICAgIDwvYm9keT5cclxuICAgICAgPC9Nb3JhbGlzUHJvdmlkZXI+XHJcbiAgICA8L2h0bWw+XHJcbiAgKTtcclxufVxyXG4iLCAiaW1wb3J0IHsgdXNlTG9hZGVyRGF0YSB9IGZyb20gXCJyZW1peFwiO1xyXG5pbXBvcnQgdHlwZSB7IExvYWRlckZ1bmN0aW9uIH0gZnJvbSBcInJlbWl4XCI7XHJcbmltcG9ydCB7IEFwcFNoZWxsIH0gZnJvbSAnQG1hbnRpbmUvY29yZSc7XHJcblxyXG5pbXBvcnQgRGFzaGJvYXJkLCB7IEhlYWRlciB9IGZyb20gXCJ+L2NvbXBvbmVudHMvRGFzaGJvYXJkXCI7XHJcblxyXG5pbXBvcnQgeyBnZXRQb29sIH0gZnJvbSBcIn4vbW9yYWxpcy5zZXJ2ZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2FkZXI6IExvYWRlckZ1bmN0aW9uID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcG9vbCA9IGF3YWl0IGdldFBvb2woKTtcclxuICAgIHJldHVybiBwb29sO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW5kZXgoKSB7XHJcbiAgICBjb25zdCBwb29sID0gdXNlTG9hZGVyRGF0YSgpO1xyXG4gICAgY29uc3QgeyBjaGFpbiwgcG9vbFRva2VuLCBhc3NldFRva2VucyB9ID0gcG9vbDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxBcHBTaGVsbFxyXG4gICAgICAgICAgICBwYWRkaW5nPVwibWRcIlxyXG4gICAgICAgICAgICAvLyBuYXZiYXI9ezxOYXZCYXIgLz59XHJcbiAgICAgICAgICAgIGhlYWRlcj17PEhlYWRlciBjaGFpbj17Y2hhaW59IHBvb2xUb2tlbj17cG9vbFRva2VufSBhc3NldFRva2Vucz17YXNzZXRUb2tlbnN9Lz59XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgICA8RGFzaGJvYXJkXHJcbiAgICAgICAgICAgICAgICBjaGFpbj17Y2hhaW59XHJcbiAgICAgICAgICAgICAgICBwb29sVG9rZW49e3Bvb2xUb2tlbn1cclxuICAgICAgICAgICAgICAgIGFzc2V0VG9rZW5zPXthc3NldFRva2Vuc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8L0FwcFNoZWxsPlxyXG4gICAgKVxyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VNb3JhbGlzIH0gZnJvbSBcInJlYWN0LW1vcmFsaXNcIjtcclxuaW1wb3J0IHtcclxuICAgIEJ1dHRvbixcclxuICAgIENhcmQsXHJcbiAgICBDb250YWluZXIsXHJcbiAgICBHcm91cCxcclxuICAgIE1vZGFsLFxyXG4gICAgTmF0aXZlU2VsZWN0LFxyXG4gICAgU2ltcGxlR3JpZCxcclxuICAgIFRhYmxlLFxyXG4gICAgVGV4dCxcclxuICAgIFRpdGxlXHJcbn0gZnJvbSAnQG1hbnRpbmUvY29yZSc7XHJcbmltcG9ydCB0eXBlIHsgTWFudGluZVNpemUgfSBmcm9tIFwiQG1hbnRpbmUvY29yZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFBvb2xUb2tlbiwgQXNzZXRUb2tlbiB9IGZyb20gXCJ+L21vcmFsaXMuc2VydmVyXCI7XHJcbmltcG9ydCB7IGRlY2ltYWxOdW1iZXIgfSBmcm9tIFwifi91dGlsc1wiO1xyXG5pbXBvcnQgdHlwZSB7IERpY3QgfSBmcm9tIFwifi91dGlsc1wiO1xyXG5pbXBvcnQgeyBTd2FwIH0gZnJvbSBcIn4vY29tcG9uZW50cy9EYXNoYm9hcmRcIjtcclxuXHJcbnR5cGUgTnVtZXJhaXJlID0ge1xyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgc3ltYm9sOiBzdHJpbmcsXHJcbiAgICBwcmljZTogbnVtYmVyXHJcbn07XHJcblxyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEhlYWRlciB9IGZyb20gXCJ+L2NvbXBvbmVudHMvRGFzaGJvYXJkL0hlYWRlclwiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIE5hdkJhciB9IGZyb20gXCJ+L2NvbXBvbmVudHMvRGFzaGJvYXJkL05hdkJhclwiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFJlcXVpcmVBdXRoIH0gZnJvbSBcIn4vY29tcG9uZW50cy9EYXNoYm9hcmQvUmVxdWlyZUF1dGhcIjtcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBTd2FwIH0gZnJvbSBcIn4vY29tcG9uZW50cy9EYXNoYm9hcmQvU3dhcFwiO1xyXG5cclxudHlwZSBEYXNoYm9hcmRQcm9wcyA9IHtcclxuICAgIGNoYWluOiBzdHJpbmdcclxuICAgIHBvb2xUb2tlbjogUG9vbFRva2VuXHJcbiAgICBhc3NldFRva2VuczogRGljdDxBc3NldFRva2VuPlxyXG59O1xyXG5cclxuY29uc3QgRGFzaGJvYXJkID0gKHByb3BzOiBEYXNoYm9hcmRQcm9wcykgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICAgIGlzQXV0aGVudGljYXRlZCxcclxuICAgICAgICBpc1dlYjNFbmFibGVkLFxyXG4gICAgICAgIGVuYWJsZVdlYjMsXHJcbiAgICAgICAgYWNjb3VudCxcclxuICAgICAgICBNb3JhbGlzXHJcbiAgICB9ID0gdXNlTW9yYWxpcygpO1xyXG4gICAgY29uc3QgeyBjaGFpbiwgcG9vbFRva2VuLCBhc3NldFRva2VucyB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCBbb3BlbmVkLCBzZXRPcGVuZWRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gICAgY29uc3QgW18sIHNldFRvdGFsQmFsYW5jZV0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xyXG5cclxuICAgIGNvbnN0IHNldEJhbGFuY2VzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGlmIChhY2NvdW50KSB7XHJcbiAgICAgICAgICAgIGF3YWl0IE1vcmFsaXMuV2ViM0FQSS5hY2NvdW50LmdldFRva2VuQmFsYW5jZXMoe1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudCxcclxuICAgICAgICAgICAgICAgIGNoYWluXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKGJhbGFuY2VEYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB0b3RhbEJhbGFuY2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgYmFsYW5jZURhdGEuZm9yRWFjaChhc3luYyAoYjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFsYW5jZSA9IGRlY2ltYWxOdW1iZXIoYi5iYWxhbmNlLCBiLmRlY2ltYWxzKTtcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbEJhbGFuY2UgKz0gYmFsYW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYi50b2tlbl9hZGRyZXNzIGluIGFzc2V0VG9rZW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0VG9rZW5zW2IudG9rZW5fYWRkcmVzc10uYWNjb3VudEJhbGFuY2UgPSBiYWxhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYi50b2tlbl9hZGRyZXNzID09IHBvb2xUb2tlbi5hZGRyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvb2xUb2tlbi5hY2NvdW50QmFsYW5jZSA9IGJhbGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRUb2tlbnNbYi50b2tlbl9hZGRyZXNzXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGIudG9rZW5fYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGIubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5bWJvbDogYi5zeW1ib2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNpbWFsczogcGFyc2VJbnQoYi5kZWNpbWFscyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVlOiAuMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cmFjdEJhbGFuY2U6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50QmFsYW5jZTogYmFsYW5jZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93YW5jZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbG9jYXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFwiTm90IGluIFBvb2xcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHNldFRvdGFsQmFsYW5jZSh0b3RhbEJhbGFuY2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNldEFsbG93YW5jZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGFjY291bnQpIHtcclxuICAgICAgICAgICAgYXdhaXQgTW9yYWxpcy5XZWIzQVBJLnRva2VuLmdldFRva2VuQWxsb3dhbmNlKHtcclxuICAgICAgICAgICAgICAgIG93bmVyX2FkZHJlc3M6IGFjY291bnQsXHJcbiAgICAgICAgICAgICAgICBzcGVuZGVyX2FkZHJlc3M6IHBvb2xUb2tlbi5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogcG9vbFRva2VuLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBjaGFpblxyXG4gICAgICAgICAgICB9KS50aGVuKCh7IGFsbG93YW5jZSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb29sVG9rZW4uYWxsb3dhbmNlID0gZGVjaW1hbE51bWJlcihhbGxvd2FuY2UsIHBvb2xUb2tlbi5kZWNpbWFscy50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBPYmplY3QudmFsdWVzKGFzc2V0VG9rZW5zKS5mb3JFYWNoKGFzeW5jIChhc3NldDogQXNzZXRUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgTW9yYWxpcy5XZWIzQVBJLnRva2VuLmdldFRva2VuQWxsb3dhbmNlKHtcclxuICAgICAgICAgICAgICAgICAgICBvd25lcl9hZGRyZXNzOiBhY2NvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZW5kZXJfYWRkcmVzczogcG9vbFRva2VuLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogYXNzZXQuYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgICAgICBjaGFpblxyXG4gICAgICAgICAgICAgICAgfSkudGhlbigoeyBhbGxvd2FuY2UgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2V0VG9rZW5zW2Fzc2V0LmFkZHJlc3NdLmFsbG93YW5jZSA9IGRlY2ltYWxOdW1iZXIoYWxsb3dhbmNlLCBhc3NldC5kZWNpbWFscy50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc0F1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgICAgICAgaWYgKCFpc1dlYjNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVXZWIzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRCYWxhbmNlcygpO1xyXG4gICAgICAgICAgICAgICAgc2V0QWxsb3dhbmNlcygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtpc0F1dGhlbnRpY2F0ZWQsIGlzV2ViM0VuYWJsZWQsIGFjY291bnRdKVxyXG5cclxuICAgIGNvbnN0IGNvbnRyYWN0QmFsYW5jZSA9IHBvb2xUb2tlbi5hY2NvdW50QmFsYW5jZTtcclxuICAgIGNvbnN0IHBvb2xUb2tlbnMgPSBwb29sVG9rZW4uY29udHJhY3RCYWxhbmNlO1xyXG5cclxuICAgIGNvbnN0IHByaWNlID0gKGFzc2V0OiBBc3NldFRva2VuKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHBvb2xUb2tlbnMgKiBhc3NldC53ZWlnaHQgLyBhc3NldC5jb250cmFjdEJhbGFuY2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGJhbGFuY2UgPSAoYXNzZXQ6IEFzc2V0VG9rZW4pID0+IHtcclxuICAgICAgICByZXR1cm4gYXNzZXQuYWNjb3VudEJhbGFuY2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHBvb2xUb2tlbk51bWVyYWlyZSA9IHsgbmFtZTogcG9vbFRva2VuLm5hbWUsIHN5bWJvbDogcG9vbFRva2VuLnN5bWJvbCwgcHJpY2U6IDEgfVxyXG4gICAgY29uc3QgW251bWVyYWlyZSwgc2V0TnVtZXJhaXJlXSA9IHVzZVN0YXRlPE51bWVyYWlyZT4ocG9vbFRva2VuTnVtZXJhaXJlKTtcclxuXHJcbiAgICBjb25zdCBudW1lcmFpcmVzID0gW3Bvb2xUb2tlbk51bWVyYWlyZSwgLi4uT2JqZWN0LnZhbHVlcyhhc3NldFRva2Vucyk/Lm1hcCgoYTogQXNzZXRUb2tlbikgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IG5hbWU6IGEubmFtZSwgc3ltYm9sOiBhLnN5bWJvbCwgcHJpY2U6IHByaWNlKGEpIH1cclxuICAgIH0pXTtcclxuICAgIGNvbnN0IG51bWVyYWlyZU1hcDogRGljdDxOdW1lcmFpcmU+ID0ge307XHJcbiAgICBudW1lcmFpcmVzLmZvckVhY2goKG46IE51bWVyYWlyZSkgPT4geyBudW1lcmFpcmVNYXBbYCR7bi5uYW1lfSAoJHtuLnN5bWJvbH0pYF0gPSBuOyB9KTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVOdW1lcmFpcmUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHNldE51bWVyYWlyZShudW1lcmFpcmVNYXBbdmFsdWVdKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbnVtYmVyT3B0aW9ucyA9IHtcclxuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNlbGxUZXh0U2l6ZTogTWFudGluZVNpemUgPSBcIm1kXCI7XHJcbiAgICBjb25zdCBoZWFkZXJUZXh0U2l6ZTogTWFudGluZVNpemUgPSBcImxnXCI7XHJcbiAgICBjb25zdCBzdWJUZXh0U2l6ZTogTWFudGluZVNpemUgPSBcInNtXCI7XHJcbiAgICBjb25zdCByb3dzID0gT2JqZWN0LnZhbHVlcyhhc3NldFRva2Vucyk/LmZpbHRlcigoYTogQXNzZXRUb2tlbikgPT4gKGEuY29udHJhY3RCYWxhbmNlID4gMCAmJiBhLmsgIT09IHVuZGVmaW5lZCAmJiBhLmZlZSAhPT0gdW5kZWZpbmVkKSkubWFwKChhOiBBc3NldFRva2VuLCBpOiBudW1iZXIpID0+IChcclxuICAgICAgICA8dHIga2V5PXthLmFkZHJlc3N9PlxyXG4gICAgICAgICAgICA8dGQ+PHNwYW4+PFRleHQgc2l6ZT17Y2VsbFRleHRTaXplfSBjb2xvcj1cImJvbGRcIiBjb21wb25lbnQ9XCJzcGFuXCI+e2Ake2EubmFtZX1gfTwvVGV4dD48VGV4dCBzaXplPVwieHNcIiBjb2xvcj1cImRpbW1lZFwiIGNvbXBvbmVudD1cInNwYW5cIj57YCAoJHthLnN5bWJvbH0pYH08L1RleHQ+PC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgIHtpc0F1dGhlbnRpY2F0ZWQgPyA8dGQgYWxpZ249XCJyaWdodFwiPjxUZXh0IHNpemU9e2NlbGxUZXh0U2l6ZX0+eyhiYWxhbmNlKGEpIC8gbnVtZXJhaXJlLnByaWNlKS50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIG51bWJlck9wdGlvbnMpfTwvVGV4dD48L3RkPiA6IG51bGx9XHJcbiAgICAgICAgICAgIDx0ZCBhbGlnbj1cInJpZ2h0XCI+PFRleHQgc2l6ZT17Y2VsbFRleHRTaXplfT57KHByaWNlKGEpIC8gbnVtZXJhaXJlLnByaWNlKS50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIG51bWJlck9wdGlvbnMpfTwvVGV4dD48L3RkPlxyXG4gICAgICAgICAgICA8dGQgYWxpZ249XCJyaWdodFwiPjxUZXh0IHNpemU9e2NlbGxUZXh0U2l6ZX0+eyhhLmNvbnRyYWN0QmFsYW5jZSAvIG51bWVyYWlyZS5wcmljZSkudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCBudW1iZXJPcHRpb25zKX08L1RleHQ+PC90ZD5cclxuICAgICAgICAgICAgPHRkIGFsaWduPVwicmlnaHRcIj48VGV4dCBzaXplPXtjZWxsVGV4dFNpemV9PnsoMTAwMDAgKiBhLmZlZSkudG9Mb2NhbGVTdHJpbmcoKX08L1RleHQ+PC90ZD5cclxuICAgICAgICAgICAgPHRkIGFsaWduPVwicmlnaHRcIj48VGV4dCBzaXplPXtjZWxsVGV4dFNpemV9PnthLmsudG9Mb2NhbGVTdHJpbmcoKX08L1RleHQ+PC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgKSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Q29udGFpbmVyPlxyXG4gICAgICAgICAgICA8VGl0bGU+TGlxdWlkaXR5IFBvb2w8L1RpdGxlPlxyXG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldE9wZW5lZCh0cnVlKX0gbXQ9XCJ4bFwiPlN3YXA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPE1vZGFsXHJcbiAgICAgICAgICAgICAgICBzaXplPVwiODAwcHhcIlxyXG4gICAgICAgICAgICAgICAgb3BlbmVkPXtvcGVuZWR9XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRPcGVuZWQoZmFsc2UpfVxyXG4gICAgICAgICAgICAgICAgcmFkaXVzPVwibGdcIlxyXG4gICAgICAgICAgICAgICAgdGl0bGU9ezxUaXRsZSBhbGlnbj1cImNlbnRlclwiIG9yZGVyPXszfT5NdWxpdC1Bc3NldCBTd2FwPC9UaXRsZT59XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxTd2FwXHJcbiAgICAgICAgICAgICAgICAgICAgcG9vbFRva2VuPXtwb29sVG9rZW59XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzZXRUb2tlbnM9e2Fzc2V0VG9rZW5zfVxyXG4gICAgICAgICAgICAgICAgICAgIGNoYWluPXtjaGFpbn1cclxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzPXthY2NvdW50fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9Nb2RhbD5cclxuICAgICAgICAgICAgPENhcmQgd2l0aEJvcmRlciBwPVwieGxcIiByYWRpdXM9XCJtZFwiIG10PVwibGdcIj5cclxuICAgICAgICAgICAgICAgIDxUaXRsZSBvcmRlcj17M30+UG9vbCBUb2tlbnM8L1RpdGxlPlxyXG4gICAgICAgICAgICAgICAgPFNpbXBsZUdyaWQgY29scz17aXNBdXRoZW50aWNhdGVkID8gNCA6IDN9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtpc0F1dGhlbnRpY2F0ZWQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IHNpemU9XCJ4bFwiIG10PVwibWRcIj57KGNvbnRyYWN0QmFsYW5jZSAvIG51bWVyYWlyZS5wcmljZSkudG9Mb2NhbGVTdHJpbmcoKSArIFwiIFwiICsgbnVtZXJhaXJlLnN5bWJvbH08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzaXplPXtzdWJUZXh0U2l6ZX0gY29sb3I9XCJkaW1tZWRcIj5CYWxhbmNlPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pIDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzaXplPVwieGxcIiBtdD1cIm1kXCI+eyhwb29sVG9rZW5zIC8gbnVtZXJhaXJlLnByaWNlKS50b0xvY2FsZVN0cmluZygpICsgXCIgXCIgKyBudW1lcmFpcmUuc3ltYm9sfTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgc2l6ZT17c3ViVGV4dFNpemV9IGNvbG9yPVwiZGltbWVkXCI+VFZMPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IHNpemU9XCJ4bFwiIG10PVwibWRcIj57cG9vbFRva2Vucz8udG9Mb2NhbGVTdHJpbmcoKX08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IHNpemU9e3N1YlRleHRTaXplfSBjb2xvcj1cImRpbW1lZFwiPk91dHN0YW5kaW5nPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxOYXRpdmVTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG10PVwibWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Ake251bWVyYWlyZS5uYW1lfSAoJHtudW1lcmFpcmUuc3ltYm9sfSlgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gaGFuZGxlTnVtZXJhaXJlKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17bnVtZXJhaXJlcy5tYXAobiA9PiBgJHtuLm5hbWV9ICgke24uc3ltYm9sfSlgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiU2VsZWN0IG51bWVyYWlyZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsYWJlbD1cIlNlbGVjdCBudW1lcmFpcmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvU2ltcGxlR3JpZD5cclxuICAgICAgICAgICAgPC9DYXJkPlxyXG4gICAgICAgICAgICA8Q2FyZCB3aXRoQm9yZGVyIHA9XCJ4bFwiIHJhZGl1cz1cIm1kXCIgbXQ9XCJsZ1wiPlxyXG4gICAgICAgICAgICAgICAgPFRpdGxlIG9yZGVyPXszfT5Bc3NldCBUb2tlbnM8L1RpdGxlPlxyXG4gICAgICAgICAgICAgICAgPFRleHQgc2l6ZT1cInhsXCIgbXQ9XCJtZFwiPntPYmplY3QudmFsdWVzKGFzc2V0VG9rZW5zKS5yZWR1Y2UoXHJcbiAgICAgICAgICAgICAgICAgICAgKGFjYywgYSkgPT4gYWNjICsgKGEuc2VsZWN0aW9uICE9PSBcIk5vdCBpbiBQb29sXCIgPyAxIDogMCksIDBcclxuICAgICAgICAgICAgICAgICkudG9Mb2NhbGVTdHJpbmcoKX08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICA8VGV4dCBzaXplPXtzdWJUZXh0U2l6ZX0gY29sb3I9XCJkaW1tZWRcIj5OdW1iZXIgb2YgYXNzZXRzPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgPEdyb3VwIG10PVwibGdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8VGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxTcGFjaW5nPVwic21cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogXCIxMDAlXCIgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0T25Ib3ZlclxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8dGg+IzwvdGg+ICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD48VGV4dCBzaXplPXtoZWFkZXJUZXh0U2l6ZX0+TmFtZTwvVGV4dD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0F1dGhlbnRpY2F0ZWQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+PFRleHQgc2l6ZT17aGVhZGVyVGV4dFNpemV9PkJhbGFuY2UgKHtudW1lcmFpcmUuc3ltYm9sfSk8L1RleHQ+PC90aD4gOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD48VGV4dCBzaXplPXtoZWFkZXJUZXh0U2l6ZX0+UHJpY2UgKHtudW1lcmFpcmUuc3ltYm9sfSk8L1RleHQ+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogPHRoPjxUZXh0IHNpemU9e2hlYWRlclRleHRTaXplfT5XZWlnaHQ8L1RleHQ+PC90aD4gKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjxUZXh0IHNpemU9e2hlYWRlclRleHRTaXplfT5SZXNlcnZlcyAoe251bWVyYWlyZS5zeW1ib2x9KTwvVGV4dD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD48VGV4dCBzaXplPXtoZWFkZXJUZXh0U2l6ZX0+RmVlIChicHMpPC9UZXh0PjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjxUZXh0IHNpemU9e2hlYWRlclRleHRTaXplfT5UdW5pbmcgKGspPC9UZXh0PjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+e3Jvd3N9PC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICA8L1RhYmxlPlxyXG4gICAgICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICAgICAgPC9DYXJkPlxyXG4gICAgICAgICAgICA8VGV4dCBhbGlnbj1cImNlbnRlclwiPk5vdGU6IFRoZSB0b2tlbnMgYXBwZWFyaW5nIGFib3ZlIGFyZSBtb2NrIHZlcnNpb25zIG9mIGFjdHVhbCB0b2tlbnMgZm9yIHRlc3QgcHVycG9zZXMgb25seS48L1RleHQ+XHJcbiAgICAgICAgPC9Db250YWluZXI+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkO1xyXG4iLCAiZXhwb3J0IGNvbnN0IGRlY2ltYWxOdW1iZXIgPSAodmFsdWU6IHN0cmluZywgZGVjaW1hbHM6IHN0cmluZyA9IFwiMThcIikgPT4ge1xuICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSkgLyAoMTAgKiogcGFyc2VJbnQoZGVjaW1hbHMpKTtcbn07XG5cbmV4cG9ydCB0eXBlIERpY3Q8VD4gPSB7XG4gICAgW2tleTogc3RyaW5nXTogVFxufTtcblxuZXhwb3J0IHsgYWJpIGFzIHBvb2xBYmkgfSBmcm9tIFwiLi4vLi4vYXJ0aWZhY3RzL2NvbnRyYWN0cy9Qb29sLnNvbC9Qb29sLmpzb25cIjtcblxuZXhwb3J0IHsgYWJpIGFzIHRva2VuQWJpIH0gZnJvbSBcIi4uLy4uL2FydGlmYWN0cy9jb250cmFjdHMvVG9rZW4uc29sL1Rva2VuLmpzb25cIjtcbiIsICJpbXBvcnQgeyB1c2VNb3JhbGlzIH0gZnJvbSBcInJlYWN0LW1vcmFsaXNcIjtcclxuaW1wb3J0IHtcclxuICAgIEJ1dHRvbixcclxuICAgIEhlYWRlclxyXG59IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xyXG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tIFwiZXRoZXJzXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IFBvb2xUb2tlbiwgQXNzZXRUb2tlbiB9IGZyb20gXCJ+L21vcmFsaXMuc2VydmVyXCI7XHJcbmltcG9ydCB7IHRva2VuQWJpIH0gZnJvbSBcIn4vdXRpbHNcIjtcclxuaW1wb3J0IHR5cGUgeyBEaWN0IH0gZnJvbSBcIn4vdXRpbHNcIjtcclxuXHJcbnR5cGUgSGVhZGVyUHJvcHMgPSB7XHJcbiAgICBjaGFpbjogc3RyaW5nLFxyXG4gICAgcG9vbFRva2VuOiBQb29sVG9rZW5cclxuICAgIGFzc2V0VG9rZW5zOiBEaWN0PEFzc2V0VG9rZW4+XHJcbn07XHJcblxyXG5jb25zdCBEYXNoYm9hcmRIZWFkZXIgPSAocHJvcHM6IEhlYWRlclByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IGNoYWluLCBwb29sVG9rZW4sIGFzc2V0VG9rZW5zIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IHtcclxuICAgICAgICBpc0F1dGhlbnRpY2F0ZWQsXHJcbiAgICAgICAgYXV0aGVudGljYXRlLFxyXG4gICAgICAgIGxvZ291dCxcclxuICAgICAgICBhY2NvdW50LFxyXG4gICAgICAgIE1vcmFsaXNcclxuICAgIH0gPSB1c2VNb3JhbGlzKCk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlTG9naW4gPSBhc3luYyAoKSA9PiB7IGF3YWl0IGF1dGhlbnRpY2F0ZSgpOyB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUxvZ291dCA9IGFzeW5jICgpID0+IHsgYXdhaXQgbG9nb3V0KCk7IH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlTWludFRva2VucyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBPYmplY3QudmFsdWVzKGFzc2V0VG9rZW5zKS5mb3JFYWNoKGFzeW5jIChhc3NldDogQXNzZXRUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHBvb2xUb2tlbi5jb250cmFjdEJhbGFuY2UvMTA7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaWNlID0gYXNzZXQud2VpZ2h0KnBvb2xUb2tlbi5jb250cmFjdEJhbGFuY2UvYXNzZXQuY29udHJhY3RCYWxhbmNlO1xyXG4gICAgICAgICAgICBjb25zdCBhbW91bnQgPSB2YWx1ZS9wcmljZTtcclxuICAgICAgICAgICAgYXdhaXQgTW9yYWxpcy5leGVjdXRlRnVuY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgY29udHJhY3RBZGRyZXNzOiBhc3NldC5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb25OYW1lOiBcIm1pbnRcIixcclxuICAgICAgICAgICAgICAgIGFiaTogdG9rZW5BYmksXHJcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IEJpZ051bWJlci5mcm9tKChhbW91bnQqMTAqKmFzc2V0LmRlY2ltYWxzKS50b0xvY2FsZVN0cmluZygnZnVsbHdpZGUnLHt1c2VHcm91cGluZzpmYWxzZX0pKSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUJ1cm5Ub2tlbnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGFjY291bnQpIHtcclxuICAgICAgICAgICAgYXdhaXQgTW9yYWxpcy5XZWIzQVBJLmFjY291bnQuZ2V0VG9rZW5CYWxhbmNlcyh7XHJcbiAgICAgICAgICAgICAgICBhY2NvdW50LFxyXG4gICAgICAgICAgICAgICAgY2hhaW5cclxuICAgICAgICAgICAgfSkudGhlbigoYmFsYW5jZURhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYmFsYW5jZURhdGEuZm9yRWFjaChhc3luYyAoYjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2V0VG9rZW5zW2IudG9rZW5fYWRkcmVzc10/LmNvbnRyYWN0QmFsYW5jZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgTW9yYWxpcy5leGVjdXRlRnVuY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJhY3RBZGRyZXNzOiBiLnRva2VuX2FkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbk5hbWU6IFwiYnVyblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJpOiB0b2tlbkFiaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogYi5iYWxhbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEhlYWRlciBoZWlnaHQ9ezYwfSBwPVwieHNcIj5cclxuICAgICAgICAgICAge2lzQXV0aGVudGljYXRlZCA/XHJcbiAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTG9nb3V0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtbD1cIm1kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIm1kXCJcclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ291dFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTWludFRva2Vuc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWw9XCJtZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJtZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNaW50IFRlc3QgVG9rZW5zXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVCdXJuVG9rZW5zfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtbD1cIm1kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIm1kXCJcclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJ1cm4gVGVzdCBUb2tlbnNcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvPiA6XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTG9naW59XHJcbiAgICAgICAgICAgICAgICAgICAgbWw9XCJtZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIm1kXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBDb25uZWN0IFdhbGxldFxyXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICA8L0hlYWRlcj5cclxuICAgIClcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZEhlYWRlcjtcclxuIiwgImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VNb3JhbGlzIH0gZnJvbSBcInJlYWN0LW1vcmFsaXNcIjtcbmltcG9ydCB7XG4gICAgQnV0dG9uLFxuICAgIFNpbXBsZUdyaWQsXG4gICAgVGV4dFxufSBmcm9tIFwiQG1hbnRpbmUvY29yZVwiO1xuaW1wb3J0IHsgQmlnTnVtYmVyIH0gZnJvbSBcImV0aGVyc1wiO1xuaW1wb3J0IHR5cGUgeyBQb29sVG9rZW4sIEFzc2V0VG9rZW4sIFRva2VuIH0gZnJvbSBcIn4vbW9yYWxpcy5zZXJ2ZXJcIjtcbmltcG9ydCB7IHBvb2xBYmkgfSBmcm9tIFwifi91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBEaWN0IH0gZnJvbSBcIn4vdXRpbHNcIjtcbmltcG9ydCBQYXlDb21wb25lbnQgZnJvbSBcIi4vUGF5Q29tcG9uZW50XCI7XG5pbXBvcnQgUmVjZWl2ZUNvbXBvbmVudCBmcm9tIFwiLi9SZWNlaXZlQ29tcG9uZW50XCI7XG5pbXBvcnQgVG9rZW5TZWxlY3QgZnJvbSBcIi4vVG9rZW5TZWxlY3RcIjtcblxuZXhwb3J0IHR5cGUgU3dhcFN0YXRlID0ge1xuICAgIHBvb2xUb2tlbjogUG9vbFRva2VuXG4gICAgYXNzZXRUb2tlbnM6IERpY3Q8QXNzZXRUb2tlbj5cbn1cblxudHlwZSBTd2FwUHJvcHMgPSB7XG4gICAgcG9vbFRva2VuOiBQb29sVG9rZW5cbiAgICBhc3NldFRva2VuczogRGljdDxBc3NldFRva2VuPlxuICAgIGNoYWluOiBzdHJpbmdcbiAgICBhZGRyZXNzOiBzdHJpbmcgfCBudWxsXG59O1xuXG5jb25zdCBTd2FwID0gKHByb3BzOiBTd2FwUHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGNoYWluLCBhZGRyZXNzIH0gPSBwcm9wcztcbiAgICBjb25zdCBbc3dhcFN0YXRlLCBzZXRTd2FwU3RhdGVdID0gdXNlU3RhdGU8U3dhcFN0YXRlPihwcm9wcyk7XG4gICAgY29uc3QgeyBwb29sVG9rZW4sIGFzc2V0VG9rZW5zIH0gPSBzd2FwU3RhdGU7XG4gICAgY29uc3QgW2lzQXBwcm92ZWQsIHNldElzQXBwcm92ZWRdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gICAgY29uc3Qge1xuICAgICAgICBpc0F1dGhlbnRpY2F0ZWQsXG4gICAgICAgIGF1dGhlbnRpY2F0ZSxcbiAgICAgICAgTW9yYWxpc1xuICAgIH0gPSB1c2VNb3JhbGlzKCk7XG5cbiAgICBjb25zdCBnZXRQcmVUcmFkZVByaWNlID0gKGFzc2V0OiBBc3NldFRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBhc3NldC53ZWlnaHQgKiBwb29sVG9rZW4uY29udHJhY3RCYWxhbmNlIC8gYXNzZXQuY29udHJhY3RCYWxhbmNlO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRQb3N0VHJhZGVQcmljZSA9IChhc3NldDogQXNzZXRUb2tlbiwgbmV3UG9vbFRva2VuczogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiBhc3NldC53ZWlnaHQgKiBuZXdQb29sVG9rZW5zIC8gKGFzc2V0LmNvbnRyYWN0QmFsYW5jZSArIGFzc2V0LmFtb3VudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEFzc2V0QW1vdW50ID0gKGFzc2V0czogQXNzZXRUb2tlbltdLCBuZXdQb29sVG9rZW5zOiBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIGFzc2V0cy5yZWR1Y2UoXG4gICAgICAgICAgICAodG90YWw6IG51bWJlciwgYXNzZXQ6IEFzc2V0VG9rZW4pID0+IHRvdGFsICsgYXNzZXQuYW1vdW50ICogZ2V0UG9zdFRyYWRlUHJpY2UoYXNzZXQsIG5ld1Bvb2xUb2tlbnMpLFxuICAgICAgICAgICAgMFxuICAgICAgICApO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRRdW90ZSA9IChzd2FwU3RhdGU6IFN3YXBTdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCB7IHBvb2xUb2tlbiwgYXNzZXRUb2tlbnMgfSA9IHN3YXBTdGF0ZTtcblxuICAgICAgICBjb25zdCBwb29sVG9rZW5zUHJlQWxsb2M6IG51bWJlciA9IHBvb2xUb2tlbi5jb250cmFjdEJhbGFuY2UgLSAocG9vbFRva2VuLnNlbGVjdGlvbiA9PSBcIlBheVwiID8gcG9vbFRva2VuLmFtb3VudCA6IDApOyAvLyBjaGVja1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQXNzZXRQYXlUb2tlbnMgPSBPYmplY3QudmFsdWVzKGFzc2V0VG9rZW5zKS5maWx0ZXIoXG4gICAgICAgICAgICAoYXNzZXQ6IEFzc2V0VG9rZW4pID0+IGFzc2V0LnNlbGVjdGlvbiA9PSBcIlBheVwiXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRBc3NldFJlY2VpdmVUb2tlbnMgPSBPYmplY3QudmFsdWVzKGFzc2V0VG9rZW5zKS5maWx0ZXIoXG4gICAgICAgICAgICAoYXNzZXQ6IEFzc2V0VG9rZW4pID0+IGFzc2V0LnNlbGVjdGlvbiA9PSBcIlJlY2VpdmVcIlxuICAgICAgICApXG5cbiAgICAgICAgY29uc3QgYXNzZXRBbW91bnRJblByZUFsbG9jOiBudW1iZXIgPSBnZXRBc3NldEFtb3VudChzZWxlY3RlZEFzc2V0UGF5VG9rZW5zLCBwb29sVG9rZW5zUHJlQWxsb2MpOyAvLyBjaGVja1xuXG4gICAgICAgIGNvbnN0IHRvdGFsQW1vdW50SW5QcmVBbGxvYzogbnVtYmVyID0gYXNzZXRBbW91bnRJblByZUFsbG9jICsgKHBvb2xUb2tlbi5zZWxlY3Rpb24gPT0gXCJQYXlcIiA/IHBvb2xUb2tlbi5hbW91bnQgOiAwKTsgLy8gY2hlY2tcblxuICAgICAgICBsZXQgcG9vbFRva2VucyA9IHBvb2xUb2tlbnNQcmVBbGxvYztcbiAgICAgICAgbGV0IHRvdGFsQW1vdW50T3V0ID0gdG90YWxBbW91bnRJblByZUFsbG9jO1xuXG4gICAgICAgIGlmIChwb29sVG9rZW4uYWxsb2NhdGlvbiAhPT0gMCkge1xuICAgICAgICAgICAgY29uc3QgZmFjdG9yOiBudW1iZXIgPSAxIC8gcG9vbFRva2VuLmFsbG9jYXRpb24gLVxuICAgICAgICAgICAgICAgIGdldEFzc2V0QW1vdW50KHNlbGVjdGVkQXNzZXRQYXlUb2tlbnMsIDEpO1xuXG4gICAgICAgICAgICBjb25zdCB0b3RhbEFtb3VudE91dE5vRmVlID0gdG90YWxBbW91bnRJblByZUFsbG9jIC8gZmFjdG9yO1xuXG4gICAgICAgICAgICBjb25zdCBwb29sVG9rZW5zT3V0Tm9GZWUgPSBwb29sVG9rZW4uYWxsb2NhdGlvbiAqIHRvdGFsQW1vdW50T3V0Tm9GZWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHBvb2xUb2tlbnNPdXQgPSAoMSAtIHBvb2xUb2tlbi5mZWUpICogcG9vbFRva2Vuc091dE5vRmVlO1xuXG4gICAgICAgICAgICBwb29sVG9rZW4uYW1vdW50ID0gLXBvb2xUb2tlbnNPdXQ7XG5cbiAgICAgICAgICAgIHBvb2xUb2tlbnMgPSBwb29sVG9rZW4uY29udHJhY3RCYWxhbmNlICsgcG9vbFRva2Vuc091dDtcblxuICAgICAgICAgICAgdG90YWxBbW91bnRPdXQgPSB0b3RhbEFtb3VudE91dE5vRmVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHF1b3RlcyA9IHNlbGVjdGVkQXNzZXRSZWNlaXZlVG9rZW5zLm1hcChcbiAgICAgICAgICAgICh0b2tlbjogQXNzZXRUb2tlbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFsbG9jYXRpb24gPSB0b2tlbi5hbGxvY2F0aW9uO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZhY3RvciA9ICgxIC0gdG9rZW4uZmVlKSAqIGFsbG9jYXRpb24gKiB0b3RhbEFtb3VudE91dCAvICh0b2tlbi53ZWlnaHQgKiBwb29sVG9rZW5zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhbW91bnRPdXQgPSBmYWN0b3IgKiB0b2tlbi5jb250cmFjdEJhbGFuY2UgLyAoMSArIGZhY3Rvcik7XG4gICAgICAgICAgICAgICAgdG9rZW4uYW1vdW50ID0gLWFtb3VudE91dDtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmVUcmFkZVByaWNlID0gZ2V0UHJlVHJhZGVQcmljZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zdFRyYWRlUHJpY2UgPSBnZXRQb3N0VHJhZGVQcmljZSh0b2tlbiwgcG9vbFRva2Vucyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgICAgICAgICAgcHJlVHJhZGVQcmljZSxcbiAgICAgICAgICAgICAgICAgICAgcG9zdFRyYWRlUHJpY2UsXG4gICAgICAgICAgICAgICAgICAgIGFtb3VudE91dFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgc2V0U3dhcFN0YXRlKHsgcG9vbFRva2VuLCBhc3NldFRva2VucyB9KTtcbiAgICAgICAgcmV0dXJuIHF1b3RlcztcbiAgICB9O1xuXG4gICAgY29uc3Qgc3dhcCA9IGFzeW5jIChhZGRyZXNzOiBzdHJpbmcsIHBheVRva2VuczogVG9rZW5bXSwgcmVjZWl2ZVRva2VuczogVG9rZW5bXSkgPT4ge1xuICAgICAgICBjb25zdCB0b3RhbEFsbG9jYXRpb24gPSByZWNlaXZlVG9rZW5zLnJlZHVjZSgoYWNjOiBudW1iZXIsIHQ6IFRva2VuKSA9PiBhY2MgKyB0LmFsbG9jYXRpb24sIDApO1xuICAgICAgICBpZiAoTWF0aC5hYnModG90YWxBbGxvY2F0aW9uIC0gMSkgPiAwLjAwMDEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBbGxvY2F0aW9uIG11c3QgYmUgMTogJHt0b3RhbEFsbG9jYXRpb259YCk7XG4gICAgICAgICAgICByZXR1cm4geyBlcnJvcjogXCJBbGxvY2F0aW9uIG11c3QgYWRkIHVwIHRvIDFcIiB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwYXlUb2tlbnMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGF5IHRva2Vuc1wiKTtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIk11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSBwYXkgdG9rZW5cIiB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChyZWNlaXZlVG9rZW5zLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk11c3Qgc2VsZWN0IGF0IGxlYXN0IG9uZSByZWNlaXZlIHRva2VuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiTXVzdCBzZWxlY3QgYXQgbGVhc3Qgb25lIHJlY2VpdmUgdG9rZW5cIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGF5QWRkcmVzc2VzOiBzdHJpbmdbXSA9IHBheVRva2Vucy5tYXAoKHQ6IFRva2VuKSA9PiB0LmFkZHJlc3MpO1xuICAgICAgICBjb25zdCBhbW91bnRzOiBCaWdOdW1iZXJbXSA9IHBheVRva2Vucy5tYXAoKHQ6IFRva2VuKSA9PiBcbiAgICAgICAgICAgIEJpZ051bWJlci5mcm9tKCh0LmFtb3VudCoxMCoqdC5kZWNpbWFscykudG9Mb2NhbGVTdHJpbmcoJ2Z1bGx3aWRlJyx7dXNlR3JvdXBpbmc6ZmFsc2V9KSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCByZWNlaXZlQWRkcmVzc2VzOiBzdHJpbmdbXSA9IHJlY2VpdmVUb2tlbnMubWFwKCh0OiBUb2tlbikgPT4gdC5hZGRyZXNzKTtcbiAgICAgICAgY29uc3QgYWxsb2NhdGlvbnM6IEJpZ051bWJlcltdID0gcmVjZWl2ZVRva2Vucy5tYXAoKHQ6IFRva2VuKSA9PiBcbiAgICAgICAgICAgIEJpZ051bWJlci5mcm9tKCh0LmFsbG9jYXRpb24qMTAqKjE4KS50b0xvY2FsZVN0cmluZygnZnVsbHdpZGUnLHt1c2VHcm91cGluZzpmYWxzZX0pKVxuICAgICAgICApO1xuIFxuICAgICAgICAvLyBjb25zdCB7IGFsbG93YW5jZSB9ID0gYXdhaXQgTW9yYWxpcy5XZWIzQVBJLnRva2VuLmdldFRva2VuQWxsb3dhbmNlKFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvLyAgICAgICAgIGNoYWluLFxuICAgICAgICAvLyAgICAgICAgIG93bmVyX2FkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgIC8vICAgICAgICAgc3BlbmRlcl9hZGRyZXNzOiBwb29sVG9rZW4uYWRkcmVzcyxcbiAgICAgICAgLy8gICAgICAgICBhZGRyZXNzOiBwYXlUb2tlbnNbMF0uYWRkcmVzc1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgYWxsb3dhbmNlOiAke2RlY2ltYWxOdW1iZXIoYWxsb3dhbmNlKX1gKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYGFtb3VudDogJHtwYXlUb2tlbnNbMF0uYW1vdW50fWApO1xuICAgICAgICAvLyBpZiAoZGVjaW1hbE51bWJlcihhbGxvd2FuY2UpIDwgcGF5VG9rZW5zWzBdLmFtb3VudCkge1xuICAgICAgICAvLyAgICAgLy8gYXdhaXQgTW9yYWxpcy5XZWIzQVBJLm5hdGl2ZS5ydW5Db250cmFjdEZ1bmN0aW9uKHtcblxuICAgICAgICAvLyAgICAgLy8gfSlcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyAvLyBNb3JhbGlzLmF1dGhlbnRpY2F0ZSh7XG4gICAgICAgIC8vIC8vICAgICBjaGFpbixcbiAgICAgICAgLy8gLy8gICAgIGFkZHJlc3MsXG4gICAgICAgIC8vIC8vIH0pXG5cbiAgICAgICAgaWYgKHBheVRva2Vucy5sZW5ndGggPT0gMSAmJiByZWNlaXZlVG9rZW5zLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBpZiAocmVjZWl2ZUFkZHJlc3Nlcy5pbmNsdWRlcyhwb29sVG9rZW4uYWRkcmVzcykpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBNb3JhbGlzLmV4ZWN1dGVGdW5jdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0QWRkcmVzczogcG9vbFRva2VuLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uTmFtZTogXCJzdGFrZVwiLFxuICAgICAgICAgICAgICAgICAgICBhYmk6IHBvb2xBYmksXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF5VG9rZW46IHBheVRva2Vuc1swXS5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50SW46IEJpZ051bWJlci5mcm9tKChwYXlUb2tlbnNbMF0uYW1vdW50KjEwKipwYXlUb2tlbnNbMF0uZGVjaW1hbHMpLnRvTG9jYWxlU3RyaW5nKCdmdWxsd2lkZScse3VzZUdyb3VwaW5nOmZhbHNlfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzc1RvOiBhZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyByZXN1bHQ6IFwiU3Rha2luZ1wiIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBheUFkZHJlc3Nlcy5pbmNsdWRlcyhwb29sVG9rZW4uYWRkcmVzcykpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBNb3JhbGlzLmV4ZWN1dGVGdW5jdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0QWRkcmVzczogcG9vbFRva2VuLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uTmFtZTogXCJ1bnN0YWtlXCIsXG4gICAgICAgICAgICAgICAgICAgIGFiaTogcG9vbEFiaSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWNlaXZlVG9rZW46IHJlY2VpdmVUb2tlbnNbMF0uYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudEluOiBCaWdOdW1iZXIuZnJvbSgocGF5VG9rZW5zWzBdLmFtb3VudCoxMCoqcGF5VG9rZW5zWzBdLmRlY2ltYWxzKS50b0xvY2FsZVN0cmluZygnZnVsbHdpZGUnLHt1c2VHcm91cGluZzpmYWxzZX0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3NUbzogYWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmVzdWx0OiBcIlVuc3Rha2luZ1wiIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF3YWl0IE1vcmFsaXMuZXhlY3V0ZUZ1bmN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJhY3RBZGRyZXNzOiBwb29sVG9rZW4uYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb25OYW1lOiBcInN3YXBcIixcbiAgICAgICAgICAgICAgICAgICAgYWJpOiBwb29sQWJpLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheVRva2VuOiBwYXlUb2tlbnNbMF0uYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VpdmVUb2tlbjogcmVjZWl2ZVRva2Vuc1swXS5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50SW46IEJpZ051bWJlci5mcm9tKChwYXlUb2tlbnNbMF0uYW1vdW50KjEwKipwYXlUb2tlbnNbMF0uZGVjaW1hbHMpLnRvTG9jYWxlU3RyaW5nKCdmdWxsd2lkZScse3VzZUdyb3VwaW5nOmZhbHNlfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzc1RvOiBhZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyByZXN1bHQ6IFwiU3dhcHBpbmdcIiB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IE1vcmFsaXMuZXhlY3V0ZUZ1bmN0aW9uKHtcbiAgICAgICAgICAgICAgICBjb250cmFjdEFkZHJlc3M6IHBvb2xUb2tlbi5hZGRyZXNzLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uTmFtZTogXCJtdWx0aXN3YXBcIixcbiAgICAgICAgICAgICAgICBhYmk6IHBvb2xBYmksXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgIHBheVRva2VuczogcGF5QWRkcmVzc2VzLFxuICAgICAgICAgICAgICAgICAgICBhbW91bnRzLFxuICAgICAgICAgICAgICAgICAgICByZWNlaXZlVG9rZW5zOiByZWNlaXZlQWRkcmVzc2VzLFxuICAgICAgICAgICAgICAgICAgICBhbGxvY2F0aW9uc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgcmVzdWx0OiBcIlN3YXBwaW5nXCIgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgdG90YWxBbGxvY2F0aW9uID0gT2JqZWN0LnZhbHVlcyhhc3NldFRva2VucykucmVkdWNlKFxuICAgICAgICAodG90YWw6IG51bWJlciwgeyBhbGxvY2F0aW9uIH0pID0+IHRvdGFsICsgYWxsb2NhdGlvbixcbiAgICAgICAgcG9vbFRva2VuLmFsbG9jYXRpb25cbiAgICApO1xuXG4gICAgY29uc3QgaGFuZGxlU3dhcCA9ICgpID0+IHtcbiAgICAgICAgZ2V0UXVvdGUoc3dhcFN0YXRlKTtcbiAgICAgICAgY29uc3QgcGF5VG9rZW5zOiBUb2tlbltdID0gW107XG4gICAgICAgIGNvbnN0IHJlY2VpdmVUb2tlbnM6IFRva2VuW10gPSBbXTtcblxuICAgICAgICBpZiAocG9vbFRva2VuLnNlbGVjdGlvbiA9PSBcIlBheVwiKSB7XG4gICAgICAgICAgICBwYXlUb2tlbnMucHVzaChwb29sVG9rZW4pO1xuICAgICAgICB9IGVsc2UgaWYgKHBvb2xUb2tlbi5zZWxlY3Rpb24gPT0gXCJSZWNlaXZlXCIpIHtcbiAgICAgICAgICAgIHJlY2VpdmVUb2tlbnMucHVzaChwb29sVG9rZW4pO1xuICAgICAgICB9O1xuXG4gICAgICAgIE9iamVjdC52YWx1ZXMoYXNzZXRUb2tlbnMpLmZvckVhY2goXG4gICAgICAgICAgICAoYXNzZXQ6IEFzc2V0VG9rZW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXQuc2VsZWN0aW9uID09IFwiUGF5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5VG9rZW5zLnB1c2goYXNzZXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXNzZXQuc2VsZWN0aW9uID09IFwiUmVjZWl2ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY2VpdmVUb2tlbnMucHVzaChhc3NldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGFkZHJlc3MgJiYgc3dhcChhZGRyZXNzLCBwYXlUb2tlbnMsIHJlY2VpdmVUb2tlbnMpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVMb2dpbiA9IGFzeW5jICgpID0+IGF3YWl0IGF1dGhlbnRpY2F0ZSgpO1xuXG4gICAgY29uc3QgY2hlY2tBbGxvY2F0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgbGV0IGlzQXBwcm92ZWQgPSBwb29sVG9rZW4uYW1vdW50IDw9IHBvb2xUb2tlbi5hbGxvd2FuY2U7XG4gICAgICAgIE9iamVjdC52YWx1ZXMoYXNzZXRUb2tlbnMpLmZvckVhY2goKGFzc2V0OiBBc3NldFRva2VuKSA9PiB7XG4gICAgICAgICAgICBpc0FwcHJvdmVkID0gaXNBcHByb3ZlZCAmJiBhc3NldC5hbW91bnQgPD0gYXNzZXQuYWxsb3dhbmNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGlzQXBwcm92ZWQ7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUluY3JlYXNlQWxsb3dhbmNlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBpbmNyZWFzZUFtb3VudCA9IHBvb2xUb2tlbi5hbW91bnQgLSBwb29sVG9rZW4uYWxsb3dhbmNlO1xuICAgICAgICBpZiAoaW5jcmVhc2VBbW91bnQgPiAwKSB7XG4gICAgICAgICAgICBhd2FpdCBNb3JhbGlzLmV4ZWN1dGVGdW5jdGlvbih7XG4gICAgICAgICAgICAgICAgY29udHJhY3RBZGRyZXNzOiBwb29sVG9rZW4uYWRkcmVzcyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbk5hbWU6IFwiYXBwcm92ZVwiLFxuICAgICAgICAgICAgICAgIGFiaTogcG9vbEFiaSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgc3BlbmRlcjogcG9vbFRva2VuLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIGFtb3VudDogQmlnTnVtYmVyLmZyb20oKGluY3JlYXNlQW1vdW50KjEwKipwb29sVG9rZW4uZGVjaW1hbHMpLnRvTG9jYWxlU3RyaW5nKCdmdWxsd2lkZScse3VzZUdyb3VwaW5nOmZhbHNlfSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC52YWx1ZXMoYXNzZXRUb2tlbnMpLmZvckVhY2goYXN5bmMgKGFzc2V0OiBBc3NldFRva2VuKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmNyZWFzZUFtb3VudCA9IGFzc2V0LmFtb3VudCAtIGFzc2V0LmFsbG93YW5jZTtcbiAgICAgICAgICAgIGlmIChpbmNyZWFzZUFtb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBNb3JhbGlzLmV4ZWN1dGVGdW5jdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0QWRkcmVzczogYXNzZXQuYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb25OYW1lOiBcImFwcHJvdmVcIixcbiAgICAgICAgICAgICAgICAgICAgYWJpOiBwb29sQWJpLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZW5kZXI6IHBvb2xUb2tlbi5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBCaWdOdW1iZXIuZnJvbSgoaW5jcmVhc2VBbW91bnQqMTAqKmFzc2V0LmRlY2ltYWxzKS50b0xvY2FsZVN0cmluZygnZnVsbHdpZGUnLHt1c2VHcm91cGluZzpmYWxzZX0pKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxTaW1wbGVHcmlkIGNvbHM9ezJ9PlxuICAgICAgICAgICAgICAgIDxUb2tlblNlbGVjdFxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlBheSBUb2tlbnNcIlxuICAgICAgICAgICAgICAgICAgICBzd2FwU3RhdGU9e3N3YXBTdGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgZ2V0UXVvdGU9e2dldFF1b3RlfVxuICAgICAgICAgICAgICAgICAgICB0b2tlbkNvbXBvbmVudD17UGF5Q29tcG9uZW50fVxuICAgICAgICAgICAgICAgICAgICBpc1BheT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgdG9rZW5zIHRvIGRlcG9zaXQ6XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxUb2tlblNlbGVjdFxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlJlY2VpdmUgVG9rZW5zXCJcbiAgICAgICAgICAgICAgICAgICAgc3dhcFN0YXRlPXtzd2FwU3RhdGV9XG4gICAgICAgICAgICAgICAgICAgIGdldFF1b3RlPXtnZXRRdW90ZX1cbiAgICAgICAgICAgICAgICAgICAgdG9rZW5Db21wb25lbnQ9e1JlY2VpdmVDb21wb25lbnR9XG4gICAgICAgICAgICAgICAgICAgIGlzUGF5PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgdG9rZW5zIHRvIHdpdGhkcmF3OlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvU2ltcGxlR3JpZD5cbiAgICAgICAgICAgIDxUZXh0PntgVG90YWwgYWxsb2NhdGlvbjogJHsoMTAwICogdG90YWxBbGxvY2F0aW9uKS50b0ZpeGVkKDIpfSVgfTwvVGV4dD5cbiAgICAgICAgICAgIHtpc0F1dGhlbnRpY2F0ZWQgPyBcbiAgICAgICAgICAgICAgICBjaGVja0FsbG9jYXRpb25zKCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVN3YXB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXQ9XCJ4bFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17KE1hdGguYWJzKHRvdGFsQWxsb2NhdGlvbiAtIDEpID4gLjAwMDEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV4ZWN1dGUgU3dhcFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+IDpcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVJbmNyZWFzZUFsbG93YW5jZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdD1cInhsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwibWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluY3JlYXNlIEFsbG93YW5jZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPiA6XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTG9naW59XG4gICAgICAgICAgICAgICAgICAgIG10PVwieGxcIlxuICAgICAgICAgICAgICAgICAgICBzaXplPVwibWRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIENvbm5lY3QgV2FsbGV0XG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICB9XG4gICAgICAgIDwvPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTd2FwO1xuIiwgIlxuaW1wb3J0IHsgRkMgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZU1vcmFsaXMgfSBmcm9tIFwicmVhY3QtbW9yYWxpc1wiO1xuaW1wb3J0IHtcbiAgICBDYXJkLFxuICAgIEdyb3VwLFxuICAgIE51bWJlcklucHV0LFxuICAgIFRleHRcbn0gZnJvbSBcIkBtYW50aW5lL2NvcmVcIjtcblxuaW1wb3J0IHR5cGUgeyBUb2tlbkNvbXBvbmVudFByb3BzIH0gZnJvbSBcIi4uL1Rva2VuU2VsZWN0XCI7XG5cbmNvbnN0IFBheUNvbXBvbmVudDogRkM8VG9rZW5Db21wb25lbnRQcm9wcz4gPSAocHJvcHM6IFRva2VuQ29tcG9uZW50UHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHRva2VuLCBzd2FwU3RhdGUsIGdldFF1b3RlIH0gPSBwcm9wcztcbiAgICBjb25zdCB7IHBvb2xUb2tlbiwgYXNzZXRUb2tlbnMgfSA9IHN3YXBTdGF0ZTtcbiAgICBjb25zdCB7IGlzQXV0aGVudGljYXRlZCB9ID0gdXNlTW9yYWxpcygpO1xuXG4gICAgY29uc3QgaGFuZGxlQW1vdW50Q2hhbmdlID0gKGFtb3VudDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmICh0b2tlbi5hZGRyZXNzID09IHBvb2xUb2tlbi5hZGRyZXNzKSB7XG4gICAgICAgICAgICBwb29sVG9rZW4uYW1vdW50ID0gYW1vdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXNzZXRUb2tlbnNbdG9rZW4uYWRkcmVzc10uYW1vdW50ID0gYW1vdW50O1xuICAgICAgICB9XG4gICAgICAgIGdldFF1b3RlKHsgcG9vbFRva2VuLCBhc3NldFRva2VucyB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPENhcmQgcmFkaXVzPVwibWRcIiBtdD1cInhzXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJhZGRyZXNzXCIgLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInBheVRva2VuXCIgdmFsdWU9e0pTT04uc3RyaW5naWZ5KHRva2VuKX0gLz5cbiAgICAgICAgICAgIDxOdW1iZXJJbnB1dFxuICAgICAgICAgICAgICAgIHByZWNpc2lvbj17Mn1cbiAgICAgICAgICAgICAgICBzaXplPVwibGdcIlxuICAgICAgICAgICAgICAgIGljb249ezxUZXh0IHNpemU9XCJtZFwiPnt0b2tlbi5zeW1ib2x9PC9UZXh0Pn1cbiAgICAgICAgICAgICAgICBoaWRlQ29udHJvbHNcbiAgICAgICAgICAgICAgICB2YWx1ZT17dG9rZW4uYW1vdW50fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoYTogbnVtYmVyKSA9PiBoYW5kbGVBbW91bnRDaGFuZ2UoYSl9XG4gICAgICAgICAgICAgICAgbWluPXswfVxuICAgICAgICAgICAgICAgIGVycm9yPXtpc0F1dGhlbnRpY2F0ZWQgJiYgdG9rZW4uYW1vdW50ID4gdG9rZW4uYWxsb3dhbmNlID8gXCJJbnN1ZmZpY2llbnQgYWxsb3dhbmNlIChcIit0b2tlbi5zeW1ib2wrXCIgXCIrdG9rZW4uYWxsb3dhbmNlK1wiKVwiIDogZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEdyb3VwIG10PVwieHNcIiBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICAgICAgICA8VGV4dD5Qb29sIEJhbGFuY2U6PC9UZXh0PlxuICAgICAgICAgICAgICAgIDxUZXh0Pnt0b2tlbi5jb250cmFjdEJhbGFuY2UudG9Mb2NhbGVTdHJpbmcoKX08L1RleHQ+XG4gICAgICAgICAgICAgICAgPFRleHQ+e3Rva2VuLnN5bWJvbH08L1RleHQ+XG4gICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICAgICAgPEdyb3VwIG10PVwieHNcIiBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICAgICAgICA8VGV4dD5BY2NvdW50IEJhbGFuY2U6PC9UZXh0PlxuICAgICAgICAgICAgICAgIDxUZXh0Pnt0b2tlbi5hY2NvdW50QmFsYW5jZS50b0xvY2FsZVN0cmluZygpfTwvVGV4dD5cbiAgICAgICAgICAgICAgICA8VGV4dD57dG9rZW4uc3ltYm9sfTwvVGV4dD5cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgIDwvQ2FyZD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGF5Q29tcG9uZW50O1xuIiwgImltcG9ydCB7IEZDIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICAgIENhcmQsXG4gICAgR3JvdXAsXG4gICAgTnVtYmVySW5wdXQsXG4gICAgVGV4dFxufSBmcm9tIFwiQG1hbnRpbmUvY29yZVwiO1xuXG5pbXBvcnQgdHlwZSB7IFRva2VuQ29tcG9uZW50UHJvcHMgfSBmcm9tIFwiLi4vVG9rZW5TZWxlY3RcIjtcblxuY29uc3QgUmVjZWl2ZUNvbXBvbmVudDogRkM8VG9rZW5Db21wb25lbnRQcm9wcz4gPSAocHJvcHM6IFRva2VuQ29tcG9uZW50UHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHRva2VuLCBzd2FwU3RhdGUsIGdldFF1b3RlIH0gPSBwcm9wcztcbiAgICBjb25zdCB7IHBvb2xUb2tlbiwgYXNzZXRUb2tlbnMgfSA9IHN3YXBTdGF0ZTtcblxuICAgIGNvbnN0IGhhbmRsZUFsbG9jYXRpb25DaGFuZ2UgPSAoYWxsb2NhdGlvbjogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmICh0b2tlbi5hZGRyZXNzID09PSBwb29sVG9rZW4uYWRkcmVzcykge1xuICAgICAgICAgICAgcG9vbFRva2VuLmFsbG9jYXRpb24gPSBhbGxvY2F0aW9uIC8gMTAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXNzZXRUb2tlbnNbdG9rZW4uYWRkcmVzc10uYWxsb2NhdGlvbiA9IGFsbG9jYXRpb24gLyAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0UXVvdGUoeyBwb29sVG9rZW4sIGFzc2V0VG9rZW5zIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Q2FyZCByYWRpdXM9XCJtZFwiIG10PVwieHNcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInJlY2VpdmVUb2tlblwiIHZhbHVlPXtKU09OLnN0cmluZ2lmeSh0b2tlbil9IC8+XG4gICAgICAgICAgICA8VGV4dCBzaXplPVwibWRcIiBtdD1cInNtXCIgY29tcG9uZW50PVwic3BhblwiIGNvbG9yPVwiZGltbWVkXCI+XG4gICAgICAgICAgICAgICAge3Rva2VuLnN5bWJvbH1cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDxUZXh0IHNpemU9XCJsZ1wiIG10PVwic21cIiBjb21wb25lbnQ9XCJzcGFuXCIgbWw9XCJtZFwiPlxuICAgICAgICAgICAgICAgIHsoLXRva2VuLmFtb3VudCkudG9GaXhlZCg0KX1cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDxHcm91cCBtdD1cInhzXCI+XG4gICAgICAgICAgICAgICAgPFRleHRcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50PVwic3BhblwiXG4gICAgICAgICAgICAgICAgICAgIHNpemU9XCJtZFwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcz17eyB3aWR0aDogXCI1MCVcIiB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgQWxsb2NhdGlvbjpcbiAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0XG4gICAgICAgICAgICAgICAgICAgIHByZWNpc2lvbj17Mn1cbiAgICAgICAgICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9ezEwMCAqIHRva2VuLmFsbG9jYXRpb259XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoYTogbnVtYmVyKSA9PiBoYW5kbGVBbGxvY2F0aW9uQ2hhbmdlKGEpfVxuICAgICAgICAgICAgICAgICAgICByaWdodFNlY3Rpb249ezw+JTwvPn1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzPXt7IHJvb3Q6IHsgd2lkdGg6IFwiNTAlXCIgfSB9fVxuICAgICAgICAgICAgICAgICAgICBtaW49ezB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgICAgICA8R3JvdXAgbXQ9XCJ4c1wiIHBvc2l0aW9uPVwibGVmdFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0PlBvb2wgQmFsYW5jZTo8L1RleHQ+XG4gICAgICAgICAgICAgICAgPFRleHQ+e3Rva2VuLmNvbnRyYWN0QmFsYW5jZS50b0xvY2FsZVN0cmluZygpfTwvVGV4dD5cbiAgICAgICAgICAgICAgICA8VGV4dD57dG9rZW4uc3ltYm9sfTwvVGV4dD5cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgIDwvQ2FyZD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVjZWl2ZUNvbXBvbmVudDtcbiIsICJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEZDIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgICBNdWx0aVNlbGVjdCxcclxuICAgIFBhcGVyLFxyXG4gICAgU2VsZWN0SXRlbSxcclxuICAgIFRpdGxlLFxyXG59IGZyb20gXCJAbWFudGluZS9jb3JlXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IEFzc2V0VG9rZW4sIFRva2VuIH0gZnJvbSBcIn4vbW9yYWxpcy5zZXJ2ZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBTd2FwU3RhdGUgfSBmcm9tIFwiLi4vLi4vU3dhcFwiO1xyXG5cclxuaW1wb3J0IFRva2VuSXRlbSBmcm9tIFwiLi9Ub2tlbkl0ZW1cIjtcclxuXHJcbmV4cG9ydCB0eXBlIFRva2VuQ29tcG9uZW50UHJvcHMgPSB7XHJcbiAgICB0b2tlbjogVG9rZW5cclxuICAgIHN3YXBTdGF0ZTogU3dhcFN0YXRlXHJcbiAgICBnZXRRdW90ZTogRnVuY3Rpb25cclxufTtcclxuXHJcbnR5cGUgVG9rZW5TZWxlY3RQcm9wcyA9IHtcclxuICAgIHRpdGxlOiBzdHJpbmdcclxuICAgIHN3YXBTdGF0ZTogU3dhcFN0YXRlXHJcbiAgICBnZXRRdW90ZTogRnVuY3Rpb25cclxuICAgIHRva2VuQ29tcG9uZW50OiBGQzxUb2tlbkNvbXBvbmVudFByb3BzPlxyXG4gICAgaXNQYXk6IGJvb2xlYW5cclxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmdcclxufTtcclxuXHJcbmNvbnN0IFRva2VuU2VsZWN0ID0gKHByb3BzOiBUb2tlblNlbGVjdFByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgc3dhcFN0YXRlLFxyXG4gICAgICAgIGdldFF1b3RlLFxyXG4gICAgICAgIHRva2VuQ29tcG9uZW50LFxyXG4gICAgICAgIGlzUGF5LFxyXG4gICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgfSA9IHByb3BzO1xyXG4gICAgY29uc3QgeyBwb29sVG9rZW4sIGFzc2V0VG9rZW5zIH0gPSBzd2FwU3RhdGU7XHJcbiAgICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKChpc1BheSAmJiBwb29sVG9rZW4uc2VsZWN0aW9uID09IFwiUGF5XCIpIHx8ICghaXNQYXkgJiYgcG9vbFRva2VuLnNlbGVjdGlvbiA9PSBcIlJlY2VpdmVcIikpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkLnB1c2gocG9vbFRva2VuLmFkZHJlc3MpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBPYmplY3QudmFsdWVzKGFzc2V0VG9rZW5zKS5mb3JFYWNoKFxyXG4gICAgICAgICAgICAgICAgKGFzc2V0OiBBc3NldFRva2VuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpc1BheSAmJiBhc3NldC5zZWxlY3Rpb24gPT0gXCJQYXlcIikgfHwgKCFpc1BheSAmJiBhc3NldC5zZWxlY3Rpb24gPT0gXCJSZWNlaXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLnB1c2goYXNzZXQuYWRkcmVzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgVG9rZW5Db21wb25lbnQ6IEZDPFRva2VuQ29tcG9uZW50UHJvcHM+ID0gdG9rZW5Db21wb25lbnQ7XHJcblxyXG4gICAgY29uc3QgZ2V0SXRlbXMgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGl0ZW1zOiBTZWxlY3RJdGVtW10gPSBbXTtcclxuICAgICAgICBpZiAoKGlzUGF5ICYmIHBvb2xUb2tlbi5zZWxlY3Rpb24gIT09IFwiUmVjZWl2ZVwiKSB8fCAoIWlzUGF5ICYmIHBvb2xUb2tlbi5zZWxlY3Rpb24gIT09IFwiUGF5XCIpKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6IGAke3Bvb2xUb2tlbi5uYW1lfSAoJHtwb29sVG9rZW4uc3ltYm9sfSlgLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHBvb2xUb2tlbi5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgdG9rZW46IHBvb2xUb2tlbixcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBcIlBvb2wgVG9rZW5cIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlbXMgPSBpdGVtcy5jb25jYXQoXHJcbiAgICAgICAgICAgIE9iamVjdC52YWx1ZXMoXHJcbiAgICAgICAgICAgICAgICBhc3NldFRva2Vuc1xyXG4gICAgICAgICAgICApLmZpbHRlcihcclxuICAgICAgICAgICAgICAgICh0OiBBc3NldFRva2VuKSA9PiBpc1BheSA/IHQuc2VsZWN0aW9uICE9PSBcIlJlY2VpdmVcIiA6IHQuc2VsZWN0aW9uICE9PSBcIlBheVwiXHJcbiAgICAgICAgICAgICkubWFwKCh0OiBBc3NldFRva2VuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBgJHt0Lm5hbWV9ICgke3Quc3ltYm9sfSlgLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0LmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHQsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHQuY29udHJhY3RCYWxhbmNlID4gMCA/IFwiQXNzZXQgVG9rZW5zXCIgOiBcIk5vdCBpbiBQb29sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzUGF5ICYmIHQuY29udHJhY3RCYWxhbmNlID09IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBpdGVtcztcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaXRlbXM6IFNlbGVjdEl0ZW1bXSA9IGdldEl0ZW1zKCk7XHJcblxyXG4gICAgY29uc3Qgc2V0VG9rZW4gPSAodjogc3RyaW5nW10sIHRva2VuOiBUb2tlbiwgdG90YWxBbGxvY2F0aW9uOiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAoaXNQYXkgJiYgdi5pbmNsdWRlcyh0b2tlbi5hZGRyZXNzKSkge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4uc2VsZWN0aW9uID0gXCJQYXlcIjtcclxuICAgICAgICAgICAgICAgIHRva2VuLmFtb3VudCA9IHRva2VuLmFtb3VudCA9PSAwID8gMSA6IHRva2VuLmFtb3VudDtcclxuICAgICAgICB9IGVsc2UgaWYgKCFpc1BheSAmJiB2LmluY2x1ZGVzKHRva2VuLmFkZHJlc3MpKSB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi5zZWxlY3Rpb24gPSBcIlJlY2VpdmVcIjtcclxuICAgICAgICAgICAgICAgIHRva2VuLmFsbG9jYXRpb24gPSB0b2tlbi5hbGxvY2F0aW9uID09IDAgPyBNYXRoLm1heCgwLDEtdG90YWxBbGxvY2F0aW9uKSA6IE1hdGgubWluKHRva2VuLmFsbG9jYXRpb24sMS10b3RhbEFsbG9jYXRpb24pO1xyXG4gICAgICAgICB9IGVsc2UgaWYgKChpc1BheSAmJiB0b2tlbi5zZWxlY3Rpb24gPT0gXCJQYXlcIikgfHwgKCFpc1BheSAmJiB0b2tlbi5zZWxlY3Rpb24gPT0gXCJSZWNlaXZlXCIpKSB7XHJcbiAgICAgICAgICAgIHRva2VuLnNlbGVjdGlvbiA9IFwiTmVpdGhlclwiO1xyXG4gICAgICAgICAgICB0b2tlbi5hbW91bnQgPSAwO1xyXG4gICAgICAgICAgICB0b2tlbi5hbGxvY2F0aW9uID0gMDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdG90YWxBbGxvY2F0aW9uK3Rva2VuLmFsbG9jYXRpb247XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVNlbGVjdCA9ICgodjogc3RyaW5nW10pID0+IHtcclxuICAgICAgICBsZXQgdG90YWxBbGxvY2F0aW9uID0gc2V0VG9rZW4odixwb29sVG9rZW4sMCk7XHJcblxyXG4gICAgICAgIE9iamVjdC52YWx1ZXMoYXNzZXRUb2tlbnMpLmZvckVhY2goKGFzc2V0OiBBc3NldFRva2VuKSA9PiB7XHJcbiAgICAgICAgICAgIHRvdGFsQWxsb2NhdGlvbiA9IHNldFRva2VuKHYsYXNzZXQsdG90YWxBbGxvY2F0aW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZ2V0UXVvdGUoeyBwb29sVG9rZW4sIGFzc2V0VG9rZW5zIH0pO1xyXG4gICAgICAgIHNldFNlbGVjdGVkKHYpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8UGFwZXIgd2l0aEJvcmRlciBwPVwieGxcIiByYWRpdXM9XCJtZFwiIG10PVwibGdcIj5cclxuICAgICAgICAgICAgPFRpdGxlIG9yZGVyPXs0fSBhbGlnbj1cImNlbnRlclwiPnt0aXRsZX08L1RpdGxlPlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZC5pbmNsdWRlcyhwb29sVG9rZW4uYWRkcmVzcykgP1xyXG4gICAgICAgICAgICAgICAgICAgIDxUb2tlbkNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbj17cG9vbFRva2VufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2FwU3RhdGU9e3N3YXBTdGF0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0UXVvdGU9e2dldFF1b3RlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3Bvb2xUb2tlbi5hZGRyZXNzfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+IDogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC52YWx1ZXMoYXNzZXRUb2tlbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodG9rZW46IEFzc2V0VG9rZW4pID0+IGlzUGF5ID8gdG9rZW4uc2VsZWN0aW9uID09IFwiUGF5XCIgOiB0b2tlbi5zZWxlY3Rpb24gPT0gXCJSZWNlaXZlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgodG9rZW46IEFzc2V0VG9rZW4sIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRva2VuQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW49e3Rva2VufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YXBTdGF0ZT17c3dhcFN0YXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldFF1b3RlPXtnZXRRdW90ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3Rva2VuLmFkZHJlc3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8TXVsdGlTZWxlY3RcclxuICAgICAgICAgICAgICAgIGRhdGE9e2l0ZW1zfVxyXG4gICAgICAgICAgICAgICAgaXRlbUNvbXBvbmVudD17VG9rZW5JdGVtfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVNlbGVjdH1cclxuICAgICAgICAgICAgICAgIG10PVwieHNcIlxyXG4gICAgICAgICAgICAgICAgc2l6ZT1cIm1kXCJcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgICAgICAgICAgIHNlYXJjaGFibGVcclxuICAgICAgICAgICAgICAgIG5vdGhpbmdGb3VuZD1cIk5vdGhpbmcgZm91bmRcIlxyXG4gICAgICAgICAgICAgICAgY2xlYXJhYmxlXHJcbiAgICAgICAgICAgICAgICBjbGVhckJ1dHRvbkxhYmVsPVwiQ2xlYXIgc2VsZWN0ZWQgdG9rZW5zXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8L1BhcGVyID5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb2tlblNlbGVjdDtcclxuIiwgImltcG9ydCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gICAgVGV4dCxcbn0gZnJvbSBcIkBtYW50aW5lL2NvcmVcIjtcblxuaW1wb3J0IHR5cGUgeyBUb2tlbiB9IGZyb20gXCJ+L21vcmFsaXMuc2VydmVyXCI7XG5cbnR5cGUgVG9rZW5JdGVtUHJvcHMgPSB7XG4gICAgbGFiZWw6IHN0cmluZyxcbiAgICB2YWx1ZTogc3RyaW5nLFxuICAgIHRva2VuOiBUb2tlblxufTtcblxuY29uc3QgVG9rZW5JdGVtID0gZm9yd2FyZFJlZjxIVE1MRGl2RWxlbWVudCwgVG9rZW5JdGVtUHJvcHM+KFxuICAgICh7IGxhYmVsLCB2YWx1ZSwgdG9rZW4sIC4uLm90aGVycyB9OiBUb2tlbkl0ZW1Qcm9wcywgcmVmKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17eyB3aWR0aDogXCIxMDAlXCIgfX0gey4uLm90aGVyc30+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IHNpemU9XCJtZFwiIGNvbG9yPVwiYm9sZFwiIGNvbXBvbmVudD1cInNwYW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtgJHt0b2tlbi5uYW1lfWB9XG4gICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgc2l6ZT1cInhzXCIgY29sb3I9XCJkaW1tZWRcIiBjb21wb25lbnQ9XCJzcGFuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YCAoJHt0b2tlbi5zeW1ib2x9KWB9XG4gICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBUb2tlbkl0ZW07XG4iLCAiaW1wb3J0IE1vcmFsaXMgZnJvbSBcIm1vcmFsaXMvbm9kZVwiO1xyXG5pbXBvcnQgeyBwb29sQWJpLCBkZWNpbWFsTnVtYmVyIH0gZnJvbSBcIn4vdXRpbHNcIjtcclxuaW1wb3J0IHR5cGUgeyBEaWN0IH0gZnJvbSBcIn4vdXRpbHNcIjtcclxuXHJcbmNvbnN0IHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zZjVoNjgzdHZmOTMudXNlbW9yYWxpcy5jb206MjA1My9zZXJ2ZXJcIjtcclxuY29uc3QgYXBwSWQgPSBcIjJRMmZBVVBaTzVXSXplRG4yVlBHUlZLZktTdHpNYVRaajdoOTk4ZUFcIjtcclxuY29uc3QgbWFzdGVyS2V5ID0gXCI4djhBSlg5VGFuemIyc1lpd1RHOHRsYzU1QWVSd2I5TFNMU2pnMEVqXCJcclxuLy8gY29uc3QgY29udHJhY3RBZGRyZXNzID0gXCIweDgzQjE0MTY0NWREODIxNjUwYjQ5NmIwMTcyOUI5OGZjN0Q1ZTVjM0ZcIi50b0xvd2VyQ2FzZSgpO1xyXG4vLyBjb25zdCBjb250cmFjdEFkZHJlc3MgPSBcIjB4NmRmMzcyMzZhNTY5NTRhNGUzZTFlQUI5YzJBMmIyNTI4MjlkNzY2YVwiLnRvTG93ZXJDYXNlKCk7XHJcbmNvbnN0IGNvbnRyYWN0QWRkcmVzcyA9IFwiMHg1MTNhYmM0NGUyNjhhMWFlNDM3YjM2MzE1NDI1NTViMDQ4NDVlNWE1XCIudG9Mb3dlckNhc2UoKTtcclxuY29uc3QgY2hhaW4gPSBcInJvcHN0ZW5cIjtcclxuXHJcbmNvbnN0IGZlZU1heCA9IC4wMTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXJ2ZXJJbmZvID0geyBzZXJ2ZXJVcmwsIGFwcElkLCBtYXN0ZXJLZXkgfTtcclxuXHJcbk1vcmFsaXMuc3RhcnQoe1xyXG4gICAgc2VydmVyVXJsLFxyXG4gICAgYXBwSWQsXHJcbiAgICBtYXN0ZXJLZXlcclxufSk7XHJcblxyXG50eXBlIFNlbGVjdGlvbiA9IFwiUGF5XCIgfCBcIlJlY2VpdmVcIiB8IFwiTmVpdGhlclwiIHwgXCJOb3QgaW4gUG9vbFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgUG9vbFRva2VuID0ge1xyXG4gICAgYWRkcmVzczogc3RyaW5nXHJcbiAgICBuYW1lOiBzdHJpbmdcclxuICAgIHN5bWJvbDogc3RyaW5nXHJcbiAgICBkZWNpbWFsczogbnVtYmVyXHJcbiAgICBmZWU6IG51bWJlclxyXG4gICAgY29udHJhY3RCYWxhbmNlOiBudW1iZXJcclxuICAgIGFjY291bnRCYWxhbmNlOiBudW1iZXJcclxuICAgIGFsbG93YW5jZTogbnVtYmVyXHJcbiAgICBhbW91bnQ6IG51bWJlclxyXG4gICAgYWxsb2NhdGlvbjogbnVtYmVyXHJcbiAgICBzZWxlY3Rpb246IFNlbGVjdGlvblxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgQXNzZXRUb2tlbiA9IFBvb2xUb2tlbiAmIHtcclxuICAgIGs6IG51bWJlclxyXG4gICAgd2VpZ2h0OiBudW1iZXIsXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBUb2tlbiA9IFBvb2xUb2tlbiB8IEFzc2V0VG9rZW47XHJcblxyXG4vLyBjb25zdCBkZWNpbWFsTnVtYmVyID0gKHZhbHVlOiBzdHJpbmcsIGRlY2ltYWxzOiBzdHJpbmcgPSBcIjE4XCIpID0+IHtcclxuLy8gICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSkgLyAoMTAgKiogcGFyc2VJbnQoZGVjaW1hbHMpKTtcclxuLy8gfTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQb29sID0gYXN5bmMgKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IHBvb2xUb2tlbnM6IG51bWJlciA9IGRlY2ltYWxOdW1iZXIoYXdhaXQgTW9yYWxpcy5XZWIzQVBJLm5hdGl2ZS5ydW5Db250cmFjdEZ1bmN0aW9uKHtcclxuICAgICAgICBjaGFpbixcclxuICAgICAgICBhZGRyZXNzOiBjb250cmFjdEFkZHJlc3MsXHJcbiAgICAgICAgZnVuY3Rpb25fbmFtZTogXCJiYWxhbmNlXCIsXHJcbiAgICAgICAgYWJpOiBwb29sQWJpXHJcbiAgICB9KSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJQb29sIFRva2VuczpcIiwgcG9vbFRva2Vucyk7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTmVlZCBhIHNjYWxlIGZ1bmN0aW9uIGZvciBQb29sLnNvbFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gY29uc3QgcG9vbFNjYWxlOiBudW1iZXIgPSBkZWNpbWFsTnVtYmVyKGF3YWl0IE1vcmFsaXMuV2ViM0FQSS5uYXRpdmUucnVuQ29udHJhY3RGdW5jdGlvbih7XHJcbiAgICAvLyAgICAgY2hhaW4sXHJcbiAgICAvLyAgICAgYWRkcmVzczogY29udHJhY3RBZGRyZXNzLFxyXG4gICAgLy8gICAgIGZ1bmN0aW9uX25hbWU6IFwic2NhbGVcIixcclxuICAgIC8vICAgICBhYmk6IHBvb2xBYmlcclxuICAgIC8vIH0pKTtcclxuXHJcbiAgICAvLyBpZiAoYWRkcmVzcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvLyAgICAgY29uc3QgYXNzZXRzOiBBc3NldFRva2VuW10gPSBbXTtcclxuICAgIC8vICAgICBjb25zdCBiYWxhbmNlczogQmFsYW5jZVtdID0gW107XHJcbiAgICAvLyAgICAgcmV0dXJuIHsgY29udHJhY3RBZGRyZXNzLCBhZGRyZXNzLCBwb29sVG9rZW5zLCBhc3NldHMsIGJhbGFuY2VzfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIGNvbnN0IGFzc2V0RGF0YTogYW55ID0gYXdhaXQgTW9yYWxpcy5XZWIzQVBJLm5hdGl2ZS5ydW5Db250cmFjdEZ1bmN0aW9uKHtcclxuICAgICAgICBjaGFpbixcclxuICAgICAgICBhZGRyZXNzOiBjb250cmFjdEFkZHJlc3MsXHJcbiAgICAgICAgZnVuY3Rpb25fbmFtZTogXCJhc3NldHNcIixcclxuICAgICAgICBhYmk6IHBvb2xBYmlcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGFkZHJlc3NlcyA9IGFzc2V0RGF0YS5tYXAoKGFzc2V0OiBhbnkpID0+IGFzc2V0WzBdLnRvTG93ZXJDYXNlKCkpO1xyXG5cclxuICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgTW9yYWxpcy5XZWIzQVBJLnRva2VuLmdldFRva2VuTWV0YWRhdGEoe1xyXG4gICAgICAgIGNoYWluLFxyXG4gICAgICAgIGFkZHJlc3Nlc1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcG9vbFRva2VuOiBQb29sVG9rZW4gPSB7XHJcbiAgICAgICAgYWRkcmVzczogY29udHJhY3RBZGRyZXNzLFxyXG4gICAgICAgIG5hbWU6IFwiUG9vbFwiLFxyXG4gICAgICAgIHN5bWJvbDogXCJQXCIsXHJcbiAgICAgICAgZGVjaW1hbHM6IDE4LFxyXG4gICAgICAgIGZlZTogMC4wMDAxLFxyXG4gICAgICAgIGNvbnRyYWN0QmFsYW5jZTogcG9vbFRva2VucyxcclxuICAgICAgICBhY2NvdW50QmFsYW5jZTogMCxcclxuICAgICAgICBhbGxvd2FuY2U6IDAsXHJcbiAgICAgICAgYW1vdW50OiAwLFxyXG4gICAgICAgIGFsbG9jYXRpb246IDAsXHJcbiAgICAgICAgc2VsZWN0aW9uOiBcIk5laXRoZXJcIlxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBhc3NldFRva2VuczogRGljdDxBc3NldFRva2VuPiA9IHt9O1xyXG5cclxuICAgIGFzc2V0RGF0YS5mb3JFYWNoKChhOiBhbnksIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGFzc2V0VG9rZW5zW2FbMF0udG9Mb3dlckNhc2UoKV0gPSB7XHJcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3Nlc1tpXSxcclxuICAgICAgICAgICAgbmFtZTogbWV0YWRhdGFbaV0ubmFtZSxcclxuICAgICAgICAgICAgc3ltYm9sOiBtZXRhZGF0YVtpXS5zeW1ib2wsXHJcbiAgICAgICAgICAgIGRlY2ltYWxzOiBwYXJzZUludChtZXRhZGF0YVtpXS5kZWNpbWFscyksXHJcbiAgICAgICAgICAgIGs6IGRlY2ltYWxOdW1iZXIoYVs0XSksXHJcbiAgICAgICAgICAgIGZlZTogZGVjaW1hbE51bWJlcihhWzJdKSxcclxuICAgICAgICAgICAgd2VpZ2h0OiAxIC8gYWRkcmVzc2VzLmxlbmd0aCxcclxuICAgICAgICAgICAgY29udHJhY3RCYWxhbmNlOiBkZWNpbWFsTnVtYmVyKGFbMV0pLFxyXG4gICAgICAgICAgICBhY2NvdW50QmFsYW5jZTogMCxcclxuICAgICAgICAgICAgYWxsb3dhbmNlOiAwLFxyXG4gICAgICAgICAgICBhbW91bnQ6IDAsXHJcbiAgICAgICAgICAgIGFsbG9jYXRpb246IDAsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjogXCJOZWl0aGVyXCJcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiB7IGNoYWluLCBwb29sVG9rZW4sIGFzc2V0VG9rZW5zIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb3JhbGlzO1xyXG4iLCAiZXhwb3J0IGRlZmF1bHQgeyd2ZXJzaW9uJzonNDJhNjliMDQnLCdlbnRyeSc6eydtb2R1bGUnOicvYnVpbGQvZW50cnkuY2xpZW50LUVMRDYzNE1HLmpzJywnaW1wb3J0cyc6WycvYnVpbGQvX3NoYXJlZC9jaHVuay0yV0xDRFFJTS5qcycsJy9idWlsZC9fc2hhcmVkL2NodW5rLTZDR0w0QVFHLmpzJ119LCdyb3V0ZXMnOnsncm9vdCc6eydpZCc6J3Jvb3QnLCdwYXJlbnRJZCc6dW5kZWZpbmVkLCdwYXRoJzonJywnaW5kZXgnOnVuZGVmaW5lZCwnY2FzZVNlbnNpdGl2ZSc6dW5kZWZpbmVkLCdtb2R1bGUnOicvYnVpbGQvcm9vdC1LNkdBVVVZTy5qcycsJ2ltcG9ydHMnOlsnL2J1aWxkL19zaGFyZWQvY2h1bmstSVg1NEZVUDMuanMnLCcvYnVpbGQvX3NoYXJlZC9jaHVuay1FSVFGTkhNRi5qcycsJy9idWlsZC9fc2hhcmVkL2NodW5rLUQ1TUZSS0dELmpzJywnL2J1aWxkL19zaGFyZWQvY2h1bmstQllUQUpISTIuanMnLCcvYnVpbGQvX3NoYXJlZC9jaHVuay1WSkw2SVc3Ti5qcycsJy9idWlsZC9fc2hhcmVkL2NodW5rLVE0T1FCNUNZLmpzJywnL2J1aWxkL19zaGFyZWQvY2h1bmstTFQyS1I3TzcuanMnLCcvYnVpbGQvX3NoYXJlZC9jaHVuay1WNkVRQ1IzSi5qcycsJy9idWlsZC9fc2hhcmVkL2NodW5rLUw2SEEyVDJILmpzJywnL2J1aWxkL19zaGFyZWQvY2h1bmstTExWTFJXWVEuanMnLCcvYnVpbGQvX3NoYXJlZC9jaHVuay1aUVpYUTRSWC5qcyddLCdoYXNBY3Rpb24nOmZhbHNlLCdoYXNMb2FkZXInOmZhbHNlLCdoYXNDYXRjaEJvdW5kYXJ5JzpmYWxzZSwnaGFzRXJyb3JCb3VuZGFyeSc6ZmFsc2V9LCdyb3V0ZXMvaW5kZXgnOnsnaWQnOidyb3V0ZXMvaW5kZXgnLCdwYXJlbnRJZCc6J3Jvb3QnLCdwYXRoJzp1bmRlZmluZWQsJ2luZGV4Jzp0cnVlLCdjYXNlU2Vuc2l0aXZlJzp1bmRlZmluZWQsJ21vZHVsZSc6Jy9idWlsZC9yb3V0ZXMvaW5kZXgtRkUyWU5LTUsuanMnLCdpbXBvcnRzJzp1bmRlZmluZWQsJ2hhc0FjdGlvbic6ZmFsc2UsJ2hhc0xvYWRlcic6dHJ1ZSwnaGFzQ2F0Y2hCb3VuZGFyeSc6ZmFsc2UsJ2hhc0Vycm9yQm91bmRhcnknOmZhbHNlfX0sJ3VybCc6Jy9idWlsZC9tYW5pZmVzdC00MkE2OUIwNC5qcyd9OyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUF1QjtBQUFBO0FBQUE7OztBQ0F2QjtBQUFBO0FBQUE7QUFBQTtBQVlBLFdBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPO0FBRXRELFFBQUksT0FBTyxRQUFRO0FBSW5CLFdBQU8sZUFBZSxTQUFTLDRCQUE0QjtBQUFBLE1BQ3pELFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sS0FBSztBQUFBO0FBQUE7QUFFakMsV0FBTyxlQUFlLFNBQVMsb0NBQW9DO0FBQUEsTUFDakUsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxLQUFLO0FBQUE7QUFBQTtBQUVqQyxXQUFPLGVBQWUsU0FBUyxzQ0FBc0M7QUFBQSxNQUNuRSxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLEtBQUs7QUFBQTtBQUFBO0FBRWpDLFdBQU8sZUFBZSxTQUFTLG1DQUFtQztBQUFBLE1BQ2hFLFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sS0FBSztBQUFBO0FBQUE7QUFHakMsQUFZQSxXQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTztBQUV0RCxRQUFJLGdCQUFnQixRQUFRO0FBSTVCLFdBQU8sZUFBZSxTQUFTLGdCQUFnQjtBQUFBLE1BQzdDLFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sY0FBYztBQUFBO0FBQUE7QUFFMUMsV0FBTyxlQUFlLFNBQVMsOEJBQThCO0FBQUEsTUFDM0QsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxjQUFjO0FBQUE7QUFBQTtBQUUxQyxXQUFPLGVBQWUsU0FBUyw4QkFBOEI7QUFBQSxNQUMzRCxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLGNBQWM7QUFBQTtBQUFBO0FBRTFDLFdBQU8sZUFBZSxTQUFTLGlCQUFpQjtBQUFBLE1BQzlDLFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sY0FBYztBQUFBO0FBQUE7QUFFMUMsV0FBTyxlQUFlLFNBQVMsd0JBQXdCO0FBQUEsTUFDckQsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxjQUFjO0FBQUE7QUFBQTtBQUUxQyxXQUFPLGVBQWUsU0FBUyxZQUFZO0FBQUEsTUFDekMsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxjQUFjO0FBQUE7QUFBQTtBQUUxQyxXQUFPLGVBQWUsU0FBUyxhQUFhO0FBQUEsTUFDMUMsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxjQUFjO0FBQUE7QUFBQTtBQUUxQyxXQUFPLGVBQWUsU0FBUyxRQUFRO0FBQUEsTUFDckMsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxjQUFjO0FBQUE7QUFBQTtBQUUxQyxXQUFPLGVBQWUsU0FBUyxZQUFZO0FBQUEsTUFDekMsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxjQUFjO0FBQUE7QUFBQTtBQUcxQyxBQVlBLFdBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPO0FBRXRELFFBQUksUUFBUSxRQUFRO0FBSXBCLFdBQU8sZUFBZSxTQUFTLFFBQVE7QUFBQSxNQUNyQyxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLFFBQVE7QUFBQSxNQUNyQyxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLFNBQVM7QUFBQSxNQUN0QyxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLGNBQWM7QUFBQSxNQUMzQyxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLFFBQVE7QUFBQSxNQUNyQyxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLFdBQVc7QUFBQSxNQUN4QyxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLFVBQVU7QUFBQSxNQUN2QyxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLHFCQUFxQjtBQUFBLE1BQ2xELFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sTUFBTTtBQUFBO0FBQUE7QUFFbEMsV0FBTyxlQUFlLFNBQVMsZ0JBQWdCO0FBQUEsTUFDN0MsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxNQUFNO0FBQUE7QUFBQTtBQUVsQyxXQUFPLGVBQWUsU0FBUyxlQUFlO0FBQUEsTUFDNUMsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxNQUFNO0FBQUE7QUFBQTtBQUVsQyxXQUFPLGVBQWUsU0FBUyxXQUFXO0FBQUEsTUFDeEMsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxNQUFNO0FBQUE7QUFBQTtBQUVsQyxXQUFPLGVBQWUsU0FBUyxxQkFBcUI7QUFBQSxNQUNsRCxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLGlCQUFpQjtBQUFBLE1BQzlDLFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sTUFBTTtBQUFBO0FBQUE7QUFFbEMsV0FBTyxlQUFlLFNBQVMsbUJBQW1CO0FBQUEsTUFDaEQsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxNQUFNO0FBQUE7QUFBQTtBQUVsQyxXQUFPLGVBQWUsU0FBUyxZQUFZO0FBQUEsTUFDekMsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxNQUFNO0FBQUE7QUFBQTtBQUVsQyxXQUFPLGVBQWUsU0FBUyxjQUFjO0FBQUEsTUFDM0MsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxNQUFNO0FBQUE7QUFBQTtBQUVsQyxXQUFPLGVBQWUsU0FBUyxlQUFlO0FBQUEsTUFDNUMsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxNQUFNO0FBQUE7QUFBQTtBQUVsQyxXQUFPLGVBQWUsU0FBUyxpQkFBaUI7QUFBQSxNQUM5QyxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLFdBQVc7QUFBQSxNQUN4QyxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLGlCQUFpQjtBQUFBLE1BQzlDLFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sTUFBTTtBQUFBO0FBQUE7QUFFbEMsV0FBTyxlQUFlLFNBQVMsZUFBZTtBQUFBLE1BQzVDLFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sTUFBTTtBQUFBO0FBQUE7QUFFbEMsV0FBTyxlQUFlLFNBQVMsY0FBYztBQUFBLE1BQzNDLFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sTUFBTTtBQUFBO0FBQUE7QUFFbEMsV0FBTyxlQUFlLFNBQVMsZUFBZTtBQUFBLE1BQzVDLFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sTUFBTTtBQUFBO0FBQUE7QUFFbEMsV0FBTyxlQUFlLFNBQVMscUJBQXFCO0FBQUEsTUFDbEQsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxNQUFNO0FBQUE7QUFBQTtBQUVsQyxXQUFPLGVBQWUsU0FBUyxhQUFhO0FBQUEsTUFDMUMsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxNQUFNO0FBQUE7QUFBQTtBQUVsQyxXQUFPLGVBQWUsU0FBUyxvQkFBb0I7QUFBQSxNQUNqRCxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLGFBQWE7QUFBQSxNQUMxQyxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBRWxDLFdBQU8sZUFBZSxTQUFTLG1CQUFtQjtBQUFBLE1BQ2hELFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sTUFBTTtBQUFBO0FBQUE7QUFFbEMsV0FBTyxlQUFlLFNBQVMsbUJBQW1CO0FBQUEsTUFDaEQsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxNQUFNO0FBQUE7QUFBQTtBQUVsQyxXQUFPLGVBQWUsU0FBUyxhQUFhO0FBQUEsTUFDMUMsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxNQUFNO0FBQUE7QUFBQTtBQUVsQyxXQUFPLGVBQWUsU0FBUyxpQkFBaUI7QUFBQSxNQUM5QyxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDdE9sQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUE7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFBK0I7QUFDL0IsbUJBQTRCO0FBRTVCLGlCQUE2QztBQUU5Qix1QkFDYixTQUNBLG9CQUNBLGlCQUNBLGNBQ0E7QUFDQSxRQUFNLFNBQVMsa0NBQWUsb0NBQUMsMEJBQUQ7QUFBQSxJQUFhLFNBQVM7QUFBQSxJQUFjLEtBQUssUUFBUTtBQUFBO0FBQy9FLGtCQUFnQixJQUFJLGdCQUFnQjtBQUVwQyxTQUFPLElBQUksU0FBUyxrQkFBa0IsNkNBQTZCLFdBQVc7QUFBQSxJQUM1RSxRQUFRO0FBQUEsSUFDUixTQUFTO0FBQUE7QUFBQTs7O0FDaEJiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQU9PO0FBRVAsMkJBQWdDO0FBQ2hDLGtCQUFnQztBQUVoQyxJQUFNLFlBQVk7QUFDbEIsSUFBTSxRQUFRO0FBRVAsSUFBTSxPQUFxQixNQUFNO0FBQ3RDLFNBQU8sRUFBRSxPQUFPO0FBQUE7QUFHSCxlQUFlO0FBQzVCLFNBQ0Usb0NBQUMsUUFBRDtBQUFBLElBQU0sTUFBSztBQUFBLEtBQ1Qsb0NBQUMsUUFBRCxNQUNFLG9DQUFDLFFBQUQ7QUFBQSxJQUFNLFNBQVE7QUFBQSxNQUNkLG9DQUFDLFFBQUQ7QUFBQSxJQUFNLE1BQUs7QUFBQSxJQUFXLFNBQVE7QUFBQSxNQUM5QixvQ0FBQyxvQkFBRCxPQUNBLG9DQUFDLHFCQUFELFFBRUYsb0NBQUMsc0NBQUQ7QUFBQSxJQUFpQjtBQUFBLElBQXNCO0FBQUEsS0FDckMsb0NBQUMsUUFBRCxNQUNFLG9DQUFDLDZCQUFEO0FBQUEsSUFBaUIsT0FBTyxFQUFFLGFBQWE7QUFBQSxJQUFVLGtCQUFnQjtBQUFBLEtBQy9ELG9DQUFDLHNCQUFELFFBRUYsb0NBQUMsaUNBQUQsT0FDQSxvQ0FBQyx1QkFBRCxPQUMyQyxvQ0FBQywwQkFBRDtBQUFBOzs7QUNuQ3JEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQUE4QjtBQUU5QixtQkFBeUI7OztBQ0Z6QjtBQUFBLG9CQUFvQztBQUNwQyw0QkFBMkI7QUFDM0IsbUJBV087OztBQ2JQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
