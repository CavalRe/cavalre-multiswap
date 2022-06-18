import {
  useMoralis
} from "/build/_shared/chunk-33G3UXI3.js";
import {
  Button,
  Header,
  Navbar,
  Table,
  ThemeIcon
} from "/build/_shared/chunk-PBRG7SW5.js";
import {
  useNavigate
} from "/build/_shared/chunk-E3WSLHXN.js";
import {
  React,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-6CGL4AQG.js";

// app/components/Dashboard/Header/index.tsx
init_react();
var DashboardHeader = () => {
  const {
    isAuthenticated,
    logout
  } = useMoralis();
  const handleLogout = async () => {
    await logout();
  };
  return /* @__PURE__ */ React.createElement(Header, {
    height: 60,
    p: "xs"
  }, isAuthenticated ? /* @__PURE__ */ React.createElement(Button, {
    onClick: handleLogout
  }, "Logout") : null);
};
var Header_default = DashboardHeader;

// app/components/Dashboard/NavBar/index.tsx
init_react();

// node_modules/react-icons/md/index.esm.js
init_react();

// node_modules/react-icons/lib/esm/index.js
init_react();

// node_modules/react-icons/lib/esm/iconsManifest.js
init_react();

// node_modules/react-icons/lib/esm/iconBase.js
init_react();
var import_react2 = __toESM(require_react());

// node_modules/react-icons/lib/esm/iconContext.js
init_react();
var import_react = __toESM(require_react());
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = import_react.default.createContext && import_react.default.createContext(DefaultContext);

// node_modules/react-icons/lib/esm/iconBase.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i) {
    return import_react2.default.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  return function(props) {
    return import_react2.default.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return import_react2.default.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && import_react2.default.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? import_react2.default.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

// node_modules/react-icons/md/index.esm.js
function MdOutlineAccountBalanceWallet(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0V0z" } }, { "tag": "path", "attr": { "d": "M21 7.28V5c0-1.1-.9-2-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-2.28A2 2 0 0022 15V9a2 2 0 00-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z" } }, { "tag": "circle", "attr": { "cx": "16", "cy": "12", "r": "1.5" } }] })(props);
}
function MdOutlineGroupWork(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0V0z" } }, { "tag": "path", "attr": { "d": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" } }, { "tag": "circle", "attr": { "cx": "8", "cy": "14", "r": "2" } }, { "tag": "circle", "attr": { "cx": "12", "cy": "8", "r": "2" } }, { "tag": "circle", "attr": { "cx": "16", "cy": "14", "r": "2" } }] })(props);
}
function MdOutlineSwapHorizontalCircle(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0V0z" } }, { "tag": "path", "attr": { "d": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-13.5V9h-4v2h4v2.5l3.5-3.5zm-6 4L5.5 14 9 17.5V15h4v-2H9z" } }] })(props);
}

// app/components/Dashboard/NavBar/index.tsx
var DashboardNavBar = () => {
  const navigate = useNavigate();
  return /* @__PURE__ */ React.createElement(Navbar, {
    width: { base: 300 },
    height: 500
  }, /* @__PURE__ */ React.createElement(Navbar.Section, null, /* @__PURE__ */ React.createElement(Table, {
    style: { width: "100%" },
    highlightOnHover: true
  }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", {
    onClick: () => navigate("/dashboard")
  }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(ThemeIcon, null, /* @__PURE__ */ React.createElement(MdOutlineGroupWork, null))), /* @__PURE__ */ React.createElement("td", null, "Liquidity Pool")), /* @__PURE__ */ React.createElement("tr", {
    onClick: () => navigate("/dashboard/balances")
  }, /* @__PURE__ */ React.createElement("td", {
    width: "28px"
  }, /* @__PURE__ */ React.createElement(ThemeIcon, null, /* @__PURE__ */ React.createElement(MdOutlineAccountBalanceWallet, null))), /* @__PURE__ */ React.createElement("td", null, "Account Balances")), /* @__PURE__ */ React.createElement("tr", {
    onClick: () => navigate("/dashboard/swap")
  }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(ThemeIcon, null, /* @__PURE__ */ React.createElement(MdOutlineSwapHorizontalCircle, null))), /* @__PURE__ */ React.createElement("td", null, "Multi-Asset Swap"))))));
};
var NavBar_default = DashboardNavBar;

// app/components/Dashboard/RequireAuth/index.tsx
init_react();
var RequireAuth = ({ children }) => {
  const { isAuthenticated, authenticate } = useMoralis();
  const handleLogin = async () => {
    await authenticate();
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, isAuthenticated ? children : /* @__PURE__ */ React.createElement(Button, {
    onClick: handleLogin
  }, "Connect Wallet"));
};
var RequireAuth_default = RequireAuth;

// app/components/Dashboard/index.ts
init_react();

export {
  Header_default,
  NavBar_default,
  RequireAuth_default
};
//# sourceMappingURL=/build/_shared/chunk-JBKHDMLG.js.map
