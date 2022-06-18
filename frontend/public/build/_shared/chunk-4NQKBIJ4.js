import {
  require_browser
} from "/build/_shared/chunk-UDZY4BXT.js";
import {
  init_httpHelpers_esm,
  post,
  require_lodash,
  require_loglevel
} from "/build/_shared/chunk-TGMVR7JH.js";
import {
  JRPCEngine,
  PostMessageStream,
  SafeEventEmitter,
  _defineProperty,
  base64url,
  createIdRemapMiddleware,
  createStreamMiddleware,
  getRpcPromiseCallback,
  init_defineProperty,
  init_openloginJrpc_esm,
  init_openloginUtils_esm,
  jsonToBase64,
  keccak,
  randomId,
  require_pump,
  safeatob,
  setupMultiplex
} from "/build/_shared/chunk-I33PHKBI.js";
import {
  __esm,
  __toESM,
  init_react
} from "/build/_shared/chunk-6CGL4AQG.js";

// node_modules/@toruslabs/openlogin/dist/openlogin.esm.js
async function documentReady() {
  return new Promise((resolve) => {
    if (document.readyState !== "loading") {
      resolve();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        resolve();
      });
    }
  });
}
function getHashQueryParams() {
  let replaceUrl = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
  const result = {};
  const url = new URL(window.location.href);
  url.searchParams.forEach((value, key) => {
    if (key !== "result") {
      result[key] = value;
    }
  });
  const queryResult = url.searchParams.get("result");
  if (queryResult) {
    try {
      const queryParams = JSON.parse(safeatob(queryResult));
      Object.keys(queryParams).forEach((key) => {
        result[key] = queryParams[key];
      });
    } catch (error) {
      log.error(error);
    }
  }
  const hash = url.hash.substring(1);
  const hashUrl = new URL("".concat(window.location.origin, "/?").concat(hash));
  hashUrl.searchParams.forEach((value, key) => {
    if (key !== "result") {
      result[key] = value;
    }
  });
  const hashResult = hashUrl.searchParams.get("result");
  if (hashResult) {
    try {
      const hashParams = JSON.parse(safeatob(hashResult));
      Object.keys(hashParams).forEach((key) => {
        result[key] = hashParams[key];
      });
    } catch (error) {
      log.error(error);
    }
  }
  if (replaceUrl) {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState(null, "", cleanUrl);
  }
  return result;
}
function awaitReq(id, windowRef) {
  return new Promise((resolve, reject) => {
    if (!windowRef)
      reject(new Error("Unable to open window"));
    let closedByHandler = false;
    const closedMonitor = setInterval(() => {
      if (!closedByHandler && windowRef.closed) {
        clearInterval(closedMonitor);
        reject(new Error("user closed popup"));
      }
    }, 500);
    const handler = (ev) => {
      const {
        pid
      } = ev.data;
      if (id !== pid)
        return;
      window.removeEventListener("message", handler);
      closedByHandler = true;
      clearInterval(closedMonitor);
      windowRef.close();
      if (ev.data.data && ev.data.data.error) {
        reject(new Error(ev.data.data.error));
      } else {
        resolve(ev.data.data);
      }
    };
    window.addEventListener("message", handler);
  });
}
function constructURL(params) {
  const {
    baseURL,
    query,
    hash
  } = params;
  const url = new URL(baseURL);
  if (query) {
    Object.keys(query).forEach((key) => {
      url.searchParams.append(key, query[key]);
    });
  }
  if (hash) {
    const h = new URL(constructURL({
      baseURL,
      query: hash
    })).searchParams.toString();
    url.hash = h;
  }
  return url.toString();
}
function storageAvailable(type) {
  let storageExists = false;
  let storageLength = 0;
  let storage;
  try {
    storage = window[type];
    storageExists = true;
    storageLength = storage.length;
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (error) {
    return error && (error.code === 22 || error.code === 1014 || error.name === "QuotaExceededErro r" || error.name === "NS_ERROR_DOM_QUOTA_REACHED") && storageExists && storageLength !== 0;
  }
}
function preloadIframe(url) {
  try {
    if (typeof document === "undefined")
      return;
    const openloginIframeHtml = document.createElement("link");
    openloginIframeHtml.href = url;
    openloginIframeHtml.crossOrigin = "anonymous";
    openloginIframeHtml.type = "text/html";
    openloginIframeHtml.rel = "prefetch";
    if (openloginIframeHtml.relList && openloginIframeHtml.relList.supports) {
      if (openloginIframeHtml.relList.supports("prefetch")) {
        document.head.appendChild(openloginIframeHtml);
      }
    }
  } catch (error) {
    log.error(error);
  }
}
function getPopupFeatures() {
  const dualScreenLeft = window.screenLeft !== void 0 ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== void 0 ? window.screenTop : window.screenY;
  const w = 1200;
  const h = 700;
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
  const systemZoom = 1;
  const left = Math.abs((width - w) / 2 / systemZoom + dualScreenLeft);
  const top = Math.abs((height - h) / 2 / systemZoom + dualScreenTop);
  const features = "titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=".concat(h / systemZoom, ",width=").concat(w / systemZoom, ",top=").concat(top, ",left=").concat(left);
  return features;
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
var import_loglevel, import_eccrypto, import_lodash, import_pump, modalDOMElementID, storeKey, UX_MODE, OPENLOGIN_METHOD, ALLOWED_INTERACTIONS, OPENLOGIN_NETWORK, LOGIN_PROVIDER, log, htmlToElement, sessionStorageAvailable, localStorageAvailable, handleStream, Modal, MemoryStore, OpenLoginStore, Provider, OpenLogin;
var init_openlogin_esm = __esm({
  "node_modules/@toruslabs/openlogin/dist/openlogin.esm.js"() {
    init_react();
    import_loglevel = __toESM(require_loglevel());
    init_defineProperty();
    import_eccrypto = __toESM(require_browser());
    init_httpHelpers_esm();
    init_openloginJrpc_esm();
    init_openloginUtils_esm();
    import_lodash = __toESM(require_lodash());
    import_pump = __toESM(require_pump());
    modalDOMElementID = "openlogin-modal";
    storeKey = "openlogin_store";
    UX_MODE = {
      POPUP: "popup",
      REDIRECT: "redirect"
    };
    OPENLOGIN_METHOD = {
      LOGIN: "openlogin_login",
      LOGOUT: "openlogin_logout",
      CHECK_3PC_SUPPORT: "openlogin_check_3PC_support",
      SET_PID_DATA: "openlogin_set_pid_data",
      GET_DATA: "openlogin_get_data"
    };
    ALLOWED_INTERACTIONS = {
      POPUP: "popup",
      REDIRECT: "redirect",
      JRPC: "jrpc"
    };
    OPENLOGIN_NETWORK = {
      MAINNET: "mainnet",
      TESTNET: "testnet",
      CYAN: "cyan",
      DEVELOPMENT: "development"
    };
    LOGIN_PROVIDER = {
      GOOGLE: "google",
      FACEBOOK: "facebook",
      REDDIT: "reddit",
      DISCORD: "discord",
      TWITCH: "twitch",
      APPLE: "apple",
      LINE: "line",
      GITHUB: "github",
      KAKAO: "kakao",
      LINKEDIN: "linkedin",
      TWITTER: "twitter",
      WEIBO: "weibo",
      WECHAT: "wechat",
      EMAIL_PASSWORDLESS: "email_passwordless",
      WEBAUTHN: "webauthn",
      JWT: "jwt"
    };
    import_loglevel.default.setLevel("error");
    log = import_loglevel.default.getLogger("openlogin");
    htmlToElement = (html) => {
      const template = window.document.createElement("template");
      const trimmedHtml = html.trim();
      template.innerHTML = trimmedHtml;
      return template.content.firstChild;
    };
    sessionStorageAvailable = storageAvailable("sessionStorage");
    localStorageAvailable = storageAvailable("localStorage");
    handleStream = (handle, eventName, handler) => {
      const handlerWrapper = (chunk) => {
        handler(chunk);
        handle.removeListener(eventName, handlerWrapper);
      };
      handle.on(eventName, handlerWrapper);
    };
    Modal = class {
      constructor(modalUrl) {
        _defineProperty(this, "modalUrl", void 0);
        _defineProperty(this, "iframeElem", void 0);
        _defineProperty(this, "initialized", false);
        _defineProperty(this, "modalZIndex", 99999);
        _defineProperty(this, "mux", void 0);
        _defineProperty(this, "verifierStream", void 0);
        this.modalUrl = modalUrl;
      }
      async init() {
        await this.initIFrame(this.modalUrl);
        this.setupStream();
      }
      setupStream() {
        if (this.iframeElem === null)
          throw new Error("iframe is null");
        this.mux = setupMultiplex(new PostMessageStream({
          name: "modal_iframe_rpc",
          target: "modal_rpc",
          targetWindow: this.iframeElem.contentWindow,
          targetOrigin: new URL(this.modalUrl).origin
        }));
        this.verifierStream = this.mux.createStream("verifier");
      }
      async initIFrame(src) {
        await documentReady();
        const documentIFrameElem = document.getElementById(modalDOMElementID);
        if (documentIFrameElem) {
          documentIFrameElem.remove();
          log.info("already initialized, removing previous modal iframe");
        }
        this.iframeElem = htmlToElement("<iframe\n        id=".concat(modalDOMElementID, '\n        class="torusIframe"\n        src="').concat(src, '"\n        style="display: none; position: fixed; top: 0; right: 0; width: 100%;\n        height: 100%; border: none; border-radius: 0; z-index: ').concat(this.modalZIndex.toString(), '"\n      ></iframe>'));
        this._hideModal();
        document.body.appendChild(this.iframeElem);
        return new Promise((resolve) => {
          this.iframeElem.onload = () => {
            this.initialized = true;
            resolve();
          };
        });
      }
      _showModal() {
        const style = {};
        style.display = "block";
        style.position = "fixed";
        style.width = "100%";
        style.height = "100%";
        style.top = "0px";
        style.right = "0px";
        style.left = "0px";
        style.bottom = "0px";
        style.border = "0";
        style["z-index"] = this.modalZIndex;
        this.iframeElem.setAttribute("style", Object.entries(style).map((_ref) => {
          let [k, v] = _ref;
          return "".concat(k, ":").concat(v);
        }).join(";"));
      }
      _hideModal() {
        const style = {};
        style.display = "none";
        style.position = "fixed";
        style.width = "100%";
        style.height = "100%";
        style.top = "0px";
        style.right = "0px";
        style.left = "0px";
        style.bottom = "0px";
        style.border = "0";
        style["z-index"] = this.modalZIndex;
        this.iframeElem.setAttribute("style", Object.entries(style).map((_ref2) => {
          let [k, v] = _ref2;
          return "".concat(k, ":").concat(v);
        }).join(";"));
      }
      async _prompt(clientId, whiteLabel, loginConfig, cb) {
        this._showModal();
        const modalHandler = (chunk) => {
          this._hideModal();
          cb(chunk);
        };
        handleStream(this.verifierStream, "data", modalHandler);
        this.verifierStream.write({
          name: "prompt",
          clientId,
          whiteLabel,
          loginConfig
        });
      }
      async cleanup() {
        await documentReady();
        const documentIFrameElem = document.getElementById(modalDOMElementID);
        if (documentIFrameElem) {
          documentIFrameElem.remove();
          this.iframeElem = null;
        }
        this.initialized = false;
      }
    };
    MemoryStore = class {
      constructor() {
        _defineProperty(this, "store", {});
      }
      getItem(key) {
        return this.store[key];
      }
      setItem(key, value) {
        this.store[key] = value;
      }
    };
    OpenLoginStore = class {
      constructor(storage) {
        _defineProperty(this, "storage", void 0);
        this.storage = storage;
        try {
          if (!storage.getItem(storeKey)) {
            this.resetStore();
          }
        } catch (error) {
        }
      }
      static getInstance() {
        if (!this.instance) {
          this.instance = new this(localStorageAvailable ? localStorage : new MemoryStore());
        }
        return this.instance;
      }
      toJSON() {
        return this.storage.getItem(storeKey);
      }
      resetStore() {
        const currStore = this.getStore();
        this.storage.setItem(storeKey, JSON.stringify({}));
        return currStore;
      }
      getStore() {
        return JSON.parse(this.storage.getItem(storeKey));
      }
      get(key) {
        const store = JSON.parse(this.storage.getItem(storeKey));
        return store[key];
      }
      set(key, value) {
        const store = JSON.parse(this.storage.getItem(storeKey));
        store[key] = value;
        this.storage.setItem(storeKey, JSON.stringify(store));
      }
    };
    _defineProperty(OpenLoginStore, "instance", void 0);
    Provider = class extends SafeEventEmitter {
      constructor() {
        super(...arguments);
        _defineProperty(this, "iframeElem", null);
        _defineProperty(this, "rpcStream", void 0);
        _defineProperty(this, "iframeUrl", void 0);
        _defineProperty(this, "rpcEngine", void 0);
        _defineProperty(this, "initialized", void 0);
        _defineProperty(this, "mux", void 0);
      }
      init(_ref) {
        let {
          iframeElem,
          iframeUrl
        } = _ref;
        this.iframeElem = iframeElem;
        this.iframeUrl = iframeUrl;
        this.setupStream();
        this.initialized = true;
      }
      setupStream() {
        if (this.iframeElem === null)
          throw new Error("iframe is null");
        this.rpcStream = new PostMessageStream({
          name: "embed_rpc",
          target: "iframe_rpc",
          targetWindow: this.iframeElem.contentWindow,
          targetOrigin: new URL(this.iframeUrl).origin
        });
        this.mux = setupMultiplex(this.rpcStream);
        const JRPCConnection = createStreamMiddleware();
        (0, import_pump.default)(JRPCConnection.stream, this.mux.createStream("jrpc"), JRPCConnection.stream, (error) => {
          log.error("JRPC connection broken", error);
        });
        const rpcEngine = new JRPCEngine();
        rpcEngine.push(createIdRemapMiddleware());
        rpcEngine.push(JRPCConnection.middleware);
        this.rpcEngine = rpcEngine;
      }
      cleanup() {
        this.iframeElem = null;
        this.initialized = false;
      }
      _rpcRequest(payload, callback) {
        if (!payload.jsonrpc) {
          payload.jsonrpc = "2.0";
        }
        if (!payload.id) {
          payload.id = randomId();
        }
        this.rpcEngine.handle(payload, callback);
      }
    };
    preloadIframe("https://app.openlogin.com/sdk-modal");
    OpenLogin = class {
      constructor(options) {
        var _options$no3PC, _options$_startUrl, _options$_popupUrl, _options$redirectUrl, _options$uxMode, _options$replaceUrlOn, _options$originData, _options$whiteLabel, _options$loginConfig;
        _defineProperty(this, "provider", void 0);
        _defineProperty(this, "state", void 0);
        _defineProperty(this, "modal", void 0);
        this.provider = new Proxy(new Provider(), {
          deleteProperty: () => true
        });
        if (!options._iframeUrl) {
          if (options.network === OPENLOGIN_NETWORK.MAINNET) {
            options._iframeUrl = "https://app.openlogin.com";
          } else if (options.network === OPENLOGIN_NETWORK.CYAN) {
            options._iframeUrl = "https://cyan.openlogin.com";
          } else if (options.network === OPENLOGIN_NETWORK.TESTNET) {
            options._iframeUrl = "https://beta.openlogin.com";
          } else if (options.network === OPENLOGIN_NETWORK.DEVELOPMENT) {
            options._iframeUrl = "http://localhost:3000";
          }
        }
        if (!options._iframeUrl) {
          throw new Error("unspecified network and iframeUrl");
        }
        this.modal = new Modal("".concat(options._iframeUrl, "/sdk-modal"));
        this.initState(_objectSpread(_objectSpread({}, options), {}, {
          no3PC: (_options$no3PC = options.no3PC) !== null && _options$no3PC !== void 0 ? _options$no3PC : false,
          _iframeUrl: options._iframeUrl,
          _startUrl: (_options$_startUrl = options._startUrl) !== null && _options$_startUrl !== void 0 ? _options$_startUrl : "".concat(options._iframeUrl, "/start"),
          _popupUrl: (_options$_popupUrl = options._popupUrl) !== null && _options$_popupUrl !== void 0 ? _options$_popupUrl : "".concat(options._iframeUrl, "/popup-window"),
          redirectUrl: (_options$redirectUrl = options.redirectUrl) !== null && _options$redirectUrl !== void 0 ? _options$redirectUrl : "".concat(window.location.protocol, "//").concat(window.location.host).concat(window.location.pathname),
          uxMode: (_options$uxMode = options.uxMode) !== null && _options$uxMode !== void 0 ? _options$uxMode : UX_MODE.REDIRECT,
          replaceUrlOnRedirect: (_options$replaceUrlOn = options.replaceUrlOnRedirect) !== null && _options$replaceUrlOn !== void 0 ? _options$replaceUrlOn : true,
          originData: (_options$originData = options.originData) !== null && _options$originData !== void 0 ? _options$originData : {
            [window.location.origin]: ""
          },
          whiteLabel: (_options$whiteLabel = options.whiteLabel) !== null && _options$whiteLabel !== void 0 ? _options$whiteLabel : {},
          loginConfig: (_options$loginConfig = options.loginConfig) !== null && _options$loginConfig !== void 0 ? _options$loginConfig : {}
        }));
      }
      get privKey() {
        return this.state.privKey ? this.state.privKey.padStart(64, "0") : "";
      }
      initState(options) {
        this.state = {
          uxMode: options.uxMode,
          network: options.network,
          store: OpenLoginStore.getInstance(),
          iframeUrl: options._iframeUrl,
          startUrl: options._startUrl,
          popupUrl: options._popupUrl,
          clientId: options.clientId,
          redirectUrl: options.redirectUrl,
          replaceUrlOnRedirect: options.replaceUrlOnRedirect,
          originData: options.originData,
          loginConfig: options.loginConfig,
          support3PC: !options.no3PC,
          whiteLabel: options.whiteLabel
        };
      }
      async init() {
        if (this.state.support3PC) {
          await Promise.all([this.modal.init(), this.updateOriginData()]);
          this.provider.init({
            iframeElem: this.modal.iframeElem,
            iframeUrl: this.state.iframeUrl
          });
          this._syncState(getHashQueryParams(this.state.replaceUrlOnRedirect));
          const res = await this._check3PCSupport();
          this.state.support3PC = !!res.support3PC;
          if (this.state.support3PC) {
            this._syncState(await this._getData());
          }
        } else {
          await this.updateOriginData();
          this._syncState(getHashQueryParams(this.state.replaceUrlOnRedirect));
        }
      }
      async updateOriginData() {
        const filteredOriginData = JSON.parse(JSON.stringify(this.state.originData));
        Object.keys(filteredOriginData).forEach((key) => {
          if (filteredOriginData[key] === "")
            delete filteredOriginData[key];
        });
        const [whitelist, whiteLabel] = await Promise.all([this.getWhitelist(), this.getWhiteLabel()]);
        this._syncState({
          originData: _objectSpread(_objectSpread({}, whitelist), filteredOriginData),
          whiteLabel: _objectSpread(_objectSpread({}, whiteLabel), this.state.whiteLabel)
        });
      }
      async getWhitelist() {
        try {
          const {
            clientId
          } = this.state;
          if (!clientId) {
            throw new Error("unspecified clientId");
          }
          const res = await post("https://api.developer.tor.us/whitelist", {
            project_id: this.state.clientId
          });
          return res.signed_urls;
        } catch (_) {
          return {};
        }
      }
      async getWhiteLabel() {
        try {
          const {
            clientId
          } = this.state;
          if (!clientId) {
            throw new Error("unspecified clientId");
          }
          const res = await post("https://api.developer.tor.us/whitelabel", {
            project_id: this.state.clientId
          });
          return res.whiteLabel;
        } catch (_) {
          return {};
        }
      }
      async _fastLogin(params) {
        const defaultParams = {
          redirectUrl: this.state.redirectUrl
        };
        const loginParams = _objectSpread(_objectSpread({}, defaultParams), params);
        const res = await this.request({
          params: [_objectSpread(_objectSpread({}, loginParams), {}, {
            fastLogin: true
          })],
          method: OPENLOGIN_METHOD.LOGIN,
          startUrl: this.state.startUrl,
          popupUrl: this.state.popupUrl,
          allowedInteractions: [ALLOWED_INTERACTIONS.POPUP, ALLOWED_INTERACTIONS.REDIRECT]
        });
        this.state.privKey = res.privKey;
        return res;
      }
      async login(params) {
        if (params !== null && params !== void 0 && params.loginProvider) {
          return this._selectedLogin(params);
        }
        return this._modal(params);
      }
      async _selectedLogin(params) {
        const defaultParams = {
          redirectUrl: this.state.redirectUrl
        };
        const loginParams = _objectSpread(_objectSpread({
          loginProvider: params.loginProvider
        }, defaultParams), params);
        const res = await this.request({
          method: OPENLOGIN_METHOD.LOGIN,
          allowedInteractions: [UX_MODE.REDIRECT, UX_MODE.POPUP],
          startUrl: this.state.startUrl,
          popupUrl: this.state.popupUrl,
          params: [loginParams]
        });
        this.state.privKey = res.privKey;
        if (res.store) {
          this._syncState(res);
        } else if (this.state.privKey && this.state.support3PC) {
          this._syncState(await this._getData());
        }
        return {
          privKey: this.privKey
        };
      }
      async logout() {
        let logoutParams = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const params = {};
        params.redirectUrl = this.state.redirectUrl;
        params._clientId = this.state.clientId;
        if (logoutParams.clientId) {
          params._clientId = logoutParams.clientId;
        }
        if (logoutParams.fastLogin !== void 0) {
          params.fastLogin = logoutParams.fastLogin;
        }
        if (logoutParams.redirectUrl !== void 0) {
          params.redirectUrl = logoutParams.redirectUrl;
        }
        const res = await this.request({
          method: OPENLOGIN_METHOD.LOGOUT,
          params: [params],
          startUrl: this.state.startUrl,
          popupUrl: this.state.popupUrl,
          allowedInteractions: [ALLOWED_INTERACTIONS.JRPC, ALLOWED_INTERACTIONS.POPUP, ALLOWED_INTERACTIONS.REDIRECT]
        });
        this.state.privKey = "";
        return res;
      }
      async request(args) {
        var _params$0$redirectUrl;
        const pid = randomId();
        let {
          params
        } = args;
        const session = {};
        if (params.length !== 1)
          throw new Error("request params array should have only one element");
        const {
          startUrl,
          popupUrl,
          method,
          allowedInteractions
        } = args;
        if (allowedInteractions.length === 0)
          throw new Error("no allowed interactions");
        if (this.state.clientId) {
          session._clientId = this.state.clientId;
        }
        if (this.privKey) {
          const userData = {
            clientId: session._clientId,
            timestamp: Date.now().toString()
          };
          const sig = await (0, import_eccrypto.sign)(Buffer.from(this.privKey, "hex"), Buffer.from(keccak("keccak256").update(JSON.stringify(userData)).digest("hex"), "hex"));
          session._user = (0, import_eccrypto.getPublic)(Buffer.from(this.privKey, "hex")).toString("hex");
          session._userSig = base64url.encode(sig);
          session._userData = userData;
        }
        session._originData = this.state.originData;
        session._whiteLabelData = this.state.whiteLabel;
        session._loginConfig = this.state.loginConfig;
        params = [_objectSpread(_objectSpread({}, session), params[0])];
        if (this.state.support3PC && allowedInteractions.includes(ALLOWED_INTERACTIONS.JRPC)) {
          return this._jrpcRequest({
            method,
            params
          });
        }
        params[0]._origin = new URL((_params$0$redirectUrl = params[0].redirectUrl) !== null && _params$0$redirectUrl !== void 0 ? _params$0$redirectUrl : this.state.redirectUrl).origin;
        if (this.state.support3PC) {
          await this._setPIDData(pid, params);
          params = [{}];
        }
        if (!startUrl || !popupUrl) {
          throw new Error("no url for redirect / popup flow");
        }
        if (this.state.uxMode === UX_MODE.REDIRECT) {
          if (allowedInteractions.includes(ALLOWED_INTERACTIONS.REDIRECT)) {
            setTimeout(() => {
              window.location.href = constructURL({
                baseURL: startUrl,
                hash: {
                  b64Params: jsonToBase64(params[0]),
                  _pid: pid,
                  _method: method
                }
              });
            }, 50);
            return {};
          }
          if (allowedInteractions.includes(ALLOWED_INTERACTIONS.POPUP)) {
            const u = new URL(constructURL({
              baseURL: popupUrl,
              hash: {
                b64Params: jsonToBase64(params[0]),
                _pid: pid,
                _method: method
              }
            }));
            const windowRef = window.open(u.toString(), "_blank", getPopupFeatures());
            return awaitReq(pid, windowRef);
          }
        } else {
          if (allowedInteractions.includes(ALLOWED_INTERACTIONS.POPUP)) {
            const u = new URL(constructURL({
              baseURL: popupUrl,
              hash: {
                b64Params: jsonToBase64(params[0]),
                _pid: pid,
                _method: method
              }
            }));
            const windowRef = window.open(u.toString(), "_blank", getPopupFeatures());
            return awaitReq(pid, windowRef);
          }
          if (allowedInteractions.includes(ALLOWED_INTERACTIONS.REDIRECT)) {
            setTimeout(() => {
              window.location.href = constructURL({
                baseURL: startUrl,
                hash: {
                  b64Params: jsonToBase64(params[0]),
                  _pid: pid,
                  _method: method
                }
              });
            }, 50);
            return null;
          }
        }
        throw new Error("no matching allowed interactions");
      }
      async _jrpcRequest(args) {
        if (!args || typeof args !== "object" || Array.isArray(args)) {
          throw new Error("invalid request args");
        }
        const {
          method,
          params
        } = args;
        if (typeof method !== "string" || method.length === 0) {
          throw new Error("invalid request method");
        }
        if (params === void 0 || !Array.isArray(params)) {
          throw new Error("invalid request params");
        }
        if (params.length === 0) {
          params.push({});
        }
        return new Promise((resolve, reject) => {
          this.provider._rpcRequest({
            method,
            params
          }, getRpcPromiseCallback(resolve, reject));
        });
      }
      async _check3PCSupport() {
        return this._jrpcRequest({
          method: OPENLOGIN_METHOD.CHECK_3PC_SUPPORT,
          params: [{
            _originData: this.state.originData
          }]
        });
      }
      async _setPIDData(pid, data) {
        await this.request({
          allowedInteractions: [ALLOWED_INTERACTIONS.JRPC],
          method: OPENLOGIN_METHOD.SET_PID_DATA,
          params: [{
            pid,
            data: data[0]
          }]
        });
      }
      async _getData() {
        return this.request({
          allowedInteractions: [ALLOWED_INTERACTIONS.JRPC],
          method: OPENLOGIN_METHOD.GET_DATA,
          params: [{}]
        });
      }
      _syncState(newState) {
        if (newState.store) {
          if (typeof newState.store !== "object") {
            throw new Error("expected store to be an object");
          }
          Object.keys(newState.store).forEach((key) => {
            if (newState.privKey) {
              if (newState.store[key]) {
                this.state.store.set(key, newState.store[key]);
              }
            } else {
              this.state.store.set(key, newState.store[key]);
            }
          });
        }
        const {
          store
        } = this.state;
        this.state = _objectSpread(_objectSpread(_objectSpread({}, this.state), newState), {}, {
          store
        });
      }
      async _modal(params) {
        return new Promise((resolve, reject) => {
          this.modal._prompt(this.state.clientId, this.state.whiteLabel, this.state.loginConfig, async (chunk) => {
            if (chunk.cancel) {
              reject(new Error("user canceled login"));
            } else {
              try {
                const selectedLoginResponse = await this._selectedLogin((0, import_lodash.default)(params, chunk));
                resolve(selectedLoginResponse);
              } catch (error) {
                reject(error);
              }
            }
          });
        });
      }
      async _cleanup() {
        await this.modal.cleanup();
        this.provider.cleanup();
      }
      async encrypt(message, privateKey) {
        let privKey = privateKey;
        if (!privKey) {
          privKey = this.privKey;
        }
        if (!/^[0-9a-fA-f]{64}$/.exec(privKey)) {
          if (privKey === "" || privKey === void 0) {
            throw new Error("private key cannot be empty");
          } else {
            throw new Error("invalid private key in encrypt");
          }
        }
        return (0, import_eccrypto.encrypt)((0, import_eccrypto.getPublic)(Buffer.from(privKey, "hex")), message);
      }
      async decrypt(ciphertext, privateKey) {
        let privKey = privateKey;
        if (!privKey) {
          privKey = this.privKey;
        }
        if (!/^[0-9a-fA-f]{64}$/.exec(privKey)) {
          if (privKey === "" || privKey === void 0) {
            throw new Error("private key cannot be empty");
          } else {
            throw new Error("invalid private key in decrypt");
          }
        }
        return (0, import_eccrypto.decrypt)(Buffer.from(privKey, "hex"), ciphertext);
      }
      async getUserInfo() {
        if (this.privKey) {
          const storeData = this.state.store.getStore();
          const userInfo = {
            email: storeData.email || "",
            name: storeData.name || "",
            profileImage: storeData.profileImage || "",
            aggregateVerifier: storeData.aggregateVerifier || "",
            verifier: storeData.verifier || "",
            verifierId: storeData.verifierId || "",
            typeOfLogin: storeData.typeOfLogin || ""
          };
          return userInfo;
        }
        throw new Error("user should be logged in to fetch userInfo");
      }
    };
  }
});

export {
  UX_MODE,
  OPENLOGIN_NETWORK,
  LOGIN_PROVIDER,
  getHashQueryParams,
  OpenLogin,
  init_openlogin_esm
};
//# sourceMappingURL=/build/_shared/chunk-4NQKBIJ4.js.map
