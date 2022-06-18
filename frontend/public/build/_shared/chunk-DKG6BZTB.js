import{a as ee}from"/build/_shared/chunk-ORPR4B3S.js";import{b as Y,d as te,h as I,j as re}from"/build/_shared/chunk-PQ534PE5.js";import{$ as se,A as c,B as X,H as O,I as x,J as b,K as N,L as _,M as ie,O as ne,Q as A,R as j,S as K,U as M,W as k,Z as L,_ as R}from"/build/_shared/chunk-KQD5PGF4.js";import{c as Q,g as U,k as T}from"/build/_shared/chunk-FDUG2A2A.js";async function J(){return new Promise(s=>{document.readyState!=="loading"?s():document.addEventListener("DOMContentLoaded",()=>{s()})})}function H(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,e={},r=new URL(window.location.href);r.searchParams.forEach((a,o)=>{o!=="result"&&(e[o]=a)});let t=r.searchParams.get("result");if(t)try{let a=JSON.parse(b(t));Object.keys(a).forEach(o=>{e[o]=a[o]})}catch(a){E.error(a)}let i=r.hash.substring(1),n=new URL("".concat(window.location.origin,"/?").concat(i));n.searchParams.forEach((a,o)=>{o!=="result"&&(e[o]=a)});let l=n.searchParams.get("result");if(l)try{let a=JSON.parse(b(l));Object.keys(a).forEach(o=>{e[o]=a[o]})}catch(a){E.error(a)}if(s){let a=window.location.origin+window.location.pathname;window.history.replaceState(null,"",a)}return e}function B(s,e){return new Promise((r,t)=>{e||t(new Error("Unable to open window"));let i=!1,n=setInterval(()=>{!i&&e.closed&&(clearInterval(n),t(new Error("user closed popup")))},500),l=a=>{let{pid:o}=a.data;s===o&&(window.removeEventListener("message",l),i=!0,clearInterval(n),e.close(),a.data.data&&a.data.data.error?t(new Error(a.data.data.error)):r(a.data.data))};window.addEventListener("message",l)})}function y(s){let{baseURL:e,query:r,hash:t}=s,i=new URL(e);if(r&&Object.keys(r).forEach(n=>{i.searchParams.append(n,r[n])}),t){let n=new URL(y({baseURL:e,query:t})).searchParams.toString();i.hash=n}return i.toString()}function G(s){let e=!1,r=0,t;try{t=window[s],e=!0,r=t.length;let i="__storage_test__";return t.setItem(i,i),t.removeItem(i),!0}catch(i){return i&&(i.code===22||i.code===1014||i.name==="QuotaExceededErro r"||i.name==="NS_ERROR_DOM_QUOTA_REACHED")&&e&&r!==0}}function le(s){try{if(typeof document=="undefined")return;let e=document.createElement("link");e.href=s,e.crossOrigin="anonymous",e.type="text/html",e.rel="prefetch",e.relList&&e.relList.supports&&e.relList.supports("prefetch")&&document.head.appendChild(e)}catch(e){E.error(e)}}function $(){let s=window.screenLeft!==void 0?window.screenLeft:window.screenX,e=window.screenTop!==void 0?window.screenTop:window.screenY,r=1200,t=700,i=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:window.screen.width,n=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:window.screen.height,l=1,a=Math.abs((i-r)/2/l+s),o=Math.abs((n-t)/2/l+e);return"titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=".concat(t/l,",width=").concat(r/l,",top=").concat(o,",left=").concat(a)}function Z(s,e){var r=Object.keys(s);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(s);e&&(t=t.filter(function(i){return Object.getOwnPropertyDescriptor(s,i).enumerable})),r.push.apply(r,t)}return r}function d(s){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Z(Object(r),!0).forEach(function(t){c(s,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(r)):Z(Object(r)).forEach(function(t){Object.defineProperty(s,t,Object.getOwnPropertyDescriptor(r,t))})}return s}var S,u,W,q,D,f,P,g,h,v,we,E,ae,_e,oe,ce,z,F,C,V,de,he=Q(()=>{T();S=U(Y());X();u=U(ee());re();se();ie();W=U(te()),q=U(ne()),D="openlogin-modal",f="openlogin_store",P={POPUP:"popup",REDIRECT:"redirect"},g={LOGIN:"openlogin_login",LOGOUT:"openlogin_logout",CHECK_3PC_SUPPORT:"openlogin_check_3PC_support",SET_PID_DATA:"openlogin_set_pid_data",GET_DATA:"openlogin_get_data"},h={POPUP:"popup",REDIRECT:"redirect",JRPC:"jrpc"},v={MAINNET:"mainnet",TESTNET:"testnet",CYAN:"cyan",DEVELOPMENT:"development"},we={GOOGLE:"google",FACEBOOK:"facebook",REDDIT:"reddit",DISCORD:"discord",TWITCH:"twitch",APPLE:"apple",LINE:"line",GITHUB:"github",KAKAO:"kakao",LINKEDIN:"linkedin",TWITTER:"twitter",WEIBO:"weibo",WECHAT:"wechat",EMAIL_PASSWORDLESS:"email_passwordless",WEBAUTHN:"webauthn",JWT:"jwt"};S.default.setLevel("error");E=S.default.getLogger("openlogin");ae=s=>{let e=window.document.createElement("template"),r=s.trim();return e.innerHTML=r,e.content.firstChild};_e=G("sessionStorage"),oe=G("localStorage");ce=(s,e,r)=>{let t=i=>{r(i),s.removeListener(e,t)};s.on(e,t)},z=class{constructor(e){c(this,"modalUrl",void 0),c(this,"iframeElem",void 0),c(this,"initialized",!1),c(this,"modalZIndex",99999),c(this,"mux",void 0),c(this,"verifierStream",void 0),this.modalUrl=e}async init(){await this.initIFrame(this.modalUrl),this.setupStream()}setupStream(){if(this.iframeElem===null)throw new Error("iframe is null");this.mux=L(new R({name:"modal_iframe_rpc",target:"modal_rpc",targetWindow:this.iframeElem.contentWindow,targetOrigin:new URL(this.modalUrl).origin})),this.verifierStream=this.mux.createStream("verifier")}async initIFrame(e){await J();let r=document.getElementById(D);return r&&(r.remove(),E.info("already initialized, removing previous modal iframe")),this.iframeElem=ae(`<iframe
        id=`.concat(D,`
        class="torusIframe"
        src="`).concat(e,`"
        style="display: none; position: fixed; top: 0; right: 0; width: 100%;
        height: 100%; border: none; border-radius: 0; z-index: `).concat(this.modalZIndex.toString(),`"
      ></iframe>`)),this._hideModal(),document.body.appendChild(this.iframeElem),new Promise(t=>{this.iframeElem.onload=()=>{this.initialized=!0,t()}})}_showModal(){let e={};e.display="block",e.position="fixed",e.width="100%",e.height="100%",e.top="0px",e.right="0px",e.left="0px",e.bottom="0px",e.border="0",e["z-index"]=this.modalZIndex,this.iframeElem.setAttribute("style",Object.entries(e).map(r=>{let[t,i]=r;return"".concat(t,":").concat(i)}).join(";"))}_hideModal(){let e={};e.display="none",e.position="fixed",e.width="100%",e.height="100%",e.top="0px",e.right="0px",e.left="0px",e.bottom="0px",e.border="0",e["z-index"]=this.modalZIndex,this.iframeElem.setAttribute("style",Object.entries(e).map(r=>{let[t,i]=r;return"".concat(t,":").concat(i)}).join(";"))}async _prompt(e,r,t,i){this._showModal();let n=l=>{this._hideModal(),i(l)};ce(this.verifierStream,"data",n),this.verifierStream.write({name:"prompt",clientId:e,whiteLabel:r,loginConfig:t})}async cleanup(){await J();let e=document.getElementById(D);e&&(e.remove(),this.iframeElem=null),this.initialized=!1}},F=class{constructor(){c(this,"store",{})}getItem(e){return this.store[e]}setItem(e,r){this.store[e]=r}},C=class{constructor(e){c(this,"storage",void 0),this.storage=e;try{e.getItem(f)||this.resetStore()}catch{}}static getInstance(){return this.instance||(this.instance=new this(oe?localStorage:new F)),this.instance}toJSON(){return this.storage.getItem(f)}resetStore(){let e=this.getStore();return this.storage.setItem(f,JSON.stringify({})),e}getStore(){return JSON.parse(this.storage.getItem(f))}get(e){return JSON.parse(this.storage.getItem(f))[e]}set(e,r){let t=JSON.parse(this.storage.getItem(f));t[e]=r,this.storage.setItem(f,JSON.stringify(t))}};c(C,"instance",void 0);V=class extends A{constructor(){super(...arguments);c(this,"iframeElem",null),c(this,"rpcStream",void 0),c(this,"iframeUrl",void 0),c(this,"rpcEngine",void 0),c(this,"initialized",void 0),c(this,"mux",void 0)}init(e){let{iframeElem:r,iframeUrl:t}=e;this.iframeElem=r,this.iframeUrl=t,this.setupStream(),this.initialized=!0}setupStream(){if(this.iframeElem===null)throw new Error("iframe is null");this.rpcStream=new R({name:"embed_rpc",target:"iframe_rpc",targetWindow:this.iframeElem.contentWindow,targetOrigin:new URL(this.iframeUrl).origin}),this.mux=L(this.rpcStream);let e=K();(0,q.default)(e.stream,this.mux.createStream("jrpc"),e.stream,t=>{E.error("JRPC connection broken",t)});let r=new k;r.push(M()),r.push(e.middleware),this.rpcEngine=r}cleanup(){this.iframeElem=null,this.initialized=!1}_rpcRequest(e,r){e.jsonrpc||(e.jsonrpc="2.0"),e.id||(e.id=O()),this.rpcEngine.handle(e,r)}};le("https://app.openlogin.com/sdk-modal");de=class{constructor(e){var r,t,i,n,l,a,o,m,p;if(c(this,"provider",void 0),c(this,"state",void 0),c(this,"modal",void 0),this.provider=new Proxy(new V,{deleteProperty:()=>!0}),e._iframeUrl||(e.network===v.MAINNET?e._iframeUrl="https://app.openlogin.com":e.network===v.CYAN?e._iframeUrl="https://cyan.openlogin.com":e.network===v.TESTNET?e._iframeUrl="https://beta.openlogin.com":e.network===v.DEVELOPMENT&&(e._iframeUrl="http://localhost:3000")),!e._iframeUrl)throw new Error("unspecified network and iframeUrl");this.modal=new z("".concat(e._iframeUrl,"/sdk-modal")),this.initState(d(d({},e),{},{no3PC:(r=e.no3PC)!==null&&r!==void 0?r:!1,_iframeUrl:e._iframeUrl,_startUrl:(t=e._startUrl)!==null&&t!==void 0?t:"".concat(e._iframeUrl,"/start"),_popupUrl:(i=e._popupUrl)!==null&&i!==void 0?i:"".concat(e._iframeUrl,"/popup-window"),redirectUrl:(n=e.redirectUrl)!==null&&n!==void 0?n:"".concat(window.location.protocol,"//").concat(window.location.host).concat(window.location.pathname),uxMode:(l=e.uxMode)!==null&&l!==void 0?l:P.REDIRECT,replaceUrlOnRedirect:(a=e.replaceUrlOnRedirect)!==null&&a!==void 0?a:!0,originData:(o=e.originData)!==null&&o!==void 0?o:{[window.location.origin]:""},whiteLabel:(m=e.whiteLabel)!==null&&m!==void 0?m:{},loginConfig:(p=e.loginConfig)!==null&&p!==void 0?p:{}}))}get privKey(){return this.state.privKey?this.state.privKey.padStart(64,"0"):""}initState(e){this.state={uxMode:e.uxMode,network:e.network,store:C.getInstance(),iframeUrl:e._iframeUrl,startUrl:e._startUrl,popupUrl:e._popupUrl,clientId:e.clientId,redirectUrl:e.redirectUrl,replaceUrlOnRedirect:e.replaceUrlOnRedirect,originData:e.originData,loginConfig:e.loginConfig,support3PC:!e.no3PC,whiteLabel:e.whiteLabel}}async init(){if(this.state.support3PC){await Promise.all([this.modal.init(),this.updateOriginData()]),this.provider.init({iframeElem:this.modal.iframeElem,iframeUrl:this.state.iframeUrl}),this._syncState(H(this.state.replaceUrlOnRedirect));let e=await this._check3PCSupport();this.state.support3PC=!!e.support3PC,this.state.support3PC&&this._syncState(await this._getData())}else await this.updateOriginData(),this._syncState(H(this.state.replaceUrlOnRedirect))}async updateOriginData(){let e=JSON.parse(JSON.stringify(this.state.originData));Object.keys(e).forEach(i=>{e[i]===""&&delete e[i]});let[r,t]=await Promise.all([this.getWhitelist(),this.getWhiteLabel()]);this._syncState({originData:d(d({},r),e),whiteLabel:d(d({},t),this.state.whiteLabel)})}async getWhitelist(){try{let{clientId:e}=this.state;if(!e)throw new Error("unspecified clientId");return(await I("https://api.developer.tor.us/whitelist",{project_id:this.state.clientId})).signed_urls}catch{return{}}}async getWhiteLabel(){try{let{clientId:e}=this.state;if(!e)throw new Error("unspecified clientId");return(await I("https://api.developer.tor.us/whitelabel",{project_id:this.state.clientId})).whiteLabel}catch{return{}}}async _fastLogin(e){let r={redirectUrl:this.state.redirectUrl},t=d(d({},r),e),i=await this.request({params:[d(d({},t),{},{fastLogin:!0})],method:g.LOGIN,startUrl:this.state.startUrl,popupUrl:this.state.popupUrl,allowedInteractions:[h.POPUP,h.REDIRECT]});return this.state.privKey=i.privKey,i}async login(e){return e!=null&&e.loginProvider?this._selectedLogin(e):this._modal(e)}async _selectedLogin(e){let r={redirectUrl:this.state.redirectUrl},t=d(d({loginProvider:e.loginProvider},r),e),i=await this.request({method:g.LOGIN,allowedInteractions:[P.REDIRECT,P.POPUP],startUrl:this.state.startUrl,popupUrl:this.state.popupUrl,params:[t]});return this.state.privKey=i.privKey,i.store?this._syncState(i):this.state.privKey&&this.state.support3PC&&this._syncState(await this._getData()),{privKey:this.privKey}}async logout(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r={};r.redirectUrl=this.state.redirectUrl,r._clientId=this.state.clientId,e.clientId&&(r._clientId=e.clientId),e.fastLogin!==void 0&&(r.fastLogin=e.fastLogin),e.redirectUrl!==void 0&&(r.redirectUrl=e.redirectUrl);let t=await this.request({method:g.LOGOUT,params:[r],startUrl:this.state.startUrl,popupUrl:this.state.popupUrl,allowedInteractions:[h.JRPC,h.POPUP,h.REDIRECT]});return this.state.privKey="",t}async request(e){var r;let t=O(),{params:i}=e,n={};if(i.length!==1)throw new Error("request params array should have only one element");let{startUrl:l,popupUrl:a,method:o,allowedInteractions:m}=e;if(m.length===0)throw new Error("no allowed interactions");if(this.state.clientId&&(n._clientId=this.state.clientId),this.privKey){let p={clientId:n._clientId,timestamp:Date.now().toString()},w=await(0,u.sign)(Buffer.from(this.privKey,"hex"),Buffer.from(N("keccak256").update(JSON.stringify(p)).digest("hex"),"hex"));n._user=(0,u.getPublic)(Buffer.from(this.privKey,"hex")).toString("hex"),n._userSig=x.encode(w),n._userData=p}if(n._originData=this.state.originData,n._whiteLabelData=this.state.whiteLabel,n._loginConfig=this.state.loginConfig,i=[d(d({},n),i[0])],this.state.support3PC&&m.includes(h.JRPC))return this._jrpcRequest({method:o,params:i});if(i[0]._origin=new URL((r=i[0].redirectUrl)!==null&&r!==void 0?r:this.state.redirectUrl).origin,this.state.support3PC&&(await this._setPIDData(t,i),i=[{}]),!l||!a)throw new Error("no url for redirect / popup flow");if(this.state.uxMode===P.REDIRECT){if(m.includes(h.REDIRECT))return setTimeout(()=>{window.location.href=y({baseURL:l,hash:{b64Params:_(i[0]),_pid:t,_method:o}})},50),{};if(m.includes(h.POPUP)){let p=new URL(y({baseURL:a,hash:{b64Params:_(i[0]),_pid:t,_method:o}})),w=window.open(p.toString(),"_blank",$());return B(t,w)}}else{if(m.includes(h.POPUP)){let p=new URL(y({baseURL:a,hash:{b64Params:_(i[0]),_pid:t,_method:o}})),w=window.open(p.toString(),"_blank",$());return B(t,w)}if(m.includes(h.REDIRECT))return setTimeout(()=>{window.location.href=y({baseURL:l,hash:{b64Params:_(i[0]),_pid:t,_method:o}})},50),null}throw new Error("no matching allowed interactions")}async _jrpcRequest(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("invalid request args");let{method:r,params:t}=e;if(typeof r!="string"||r.length===0)throw new Error("invalid request method");if(t===void 0||!Array.isArray(t))throw new Error("invalid request params");return t.length===0&&t.push({}),new Promise((i,n)=>{this.provider._rpcRequest({method:r,params:t},j(i,n))})}async _check3PCSupport(){return this._jrpcRequest({method:g.CHECK_3PC_SUPPORT,params:[{_originData:this.state.originData}]})}async _setPIDData(e,r){await this.request({allowedInteractions:[h.JRPC],method:g.SET_PID_DATA,params:[{pid:e,data:r[0]}]})}async _getData(){return this.request({allowedInteractions:[h.JRPC],method:g.GET_DATA,params:[{}]})}_syncState(e){if(e.store){if(typeof e.store!="object")throw new Error("expected store to be an object");Object.keys(e.store).forEach(t=>{e.privKey?e.store[t]&&this.state.store.set(t,e.store[t]):this.state.store.set(t,e.store[t])})}let{store:r}=this.state;this.state=d(d(d({},this.state),e),{},{store:r})}async _modal(e){return new Promise((r,t)=>{this.modal._prompt(this.state.clientId,this.state.whiteLabel,this.state.loginConfig,async i=>{if(i.cancel)t(new Error("user canceled login"));else try{let n=await this._selectedLogin((0,W.default)(e,i));r(n)}catch(n){t(n)}})})}async _cleanup(){await this.modal.cleanup(),this.provider.cleanup()}async encrypt(e,r){let t=r;if(t||(t=this.privKey),!/^[0-9a-fA-f]{64}$/.exec(t))throw t===""||t===void 0?new Error("private key cannot be empty"):new Error("invalid private key in encrypt");return(0,u.encrypt)((0,u.getPublic)(Buffer.from(t,"hex")),e)}async decrypt(e,r){let t=r;if(t||(t=this.privKey),!/^[0-9a-fA-f]{64}$/.exec(t))throw t===""||t===void 0?new Error("private key cannot be empty"):new Error("invalid private key in decrypt");return(0,u.decrypt)(Buffer.from(t,"hex"),e)}async getUserInfo(){if(this.privKey){let e=this.state.store.getStore();return{email:e.email||"",name:e.name||"",profileImage:e.profileImage||"",aggregateVerifier:e.aggregateVerifier||"",verifier:e.verifier||"",verifierId:e.verifierId||"",typeOfLogin:e.typeOfLogin||""}}throw new Error("user should be logged in to fetch userInfo")}}});export{P as a,v as b,we as c,H as d,de as e,he as f};
