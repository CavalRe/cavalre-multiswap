import {
  useMoralis
} from "/build/_shared/chunk-3EGH6AUM.js";
import {
  Button,
  Card,
  Container,
  Group,
  Header,
  NativeSelect,
  SimpleGrid,
  Table,
  Text,
  Title
} from "/build/_shared/chunk-VNHTHI6T.js";
import {
  useNavigate
} from "/build/_shared/chunk-V55OXKBA.js";
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
    authenticate,
    logout
  } = useMoralis();
  const handleLogin = async () => {
    await authenticate();
  };
  const handleLogout = async () => {
    await logout();
  };
  return /* @__PURE__ */ React.createElement(Header, {
    height: 60,
    p: "xs"
  }, isAuthenticated ? /* @__PURE__ */ React.createElement(Button, {
    onClick: handleLogout
  }, "Logout") : /* @__PURE__ */ React.createElement(Button, {
    onClick: handleLogin
  }, "Connect Wallet"));
};
var Header_default = DashboardHeader;

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

// app/components/Dashboard/index.tsx
init_react();
var import_react = __toESM(require_react());
var Dashboard = (props) => {
  const { isAuthenticated, isAuthenticating, account, isWeb3Enabled, isWeb3EnableLoading, enableWeb3 } = useMoralis();
  const { contractAddress, address, poolTokens, assets, balances, pathname } = props;
  const navigate = useNavigate();
  (0, import_react.useEffect)(() => {
    const newPathname = account ? `/dashboard/${account}` : "/dashboard";
    if (newPathname !== pathname)
      navigate(newPathname);
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3();
  }, [isAuthenticated, isAuthenticating, isWeb3Enabled, isWeb3EnableLoading, account]);
  const assetMap = {};
  assets == null ? void 0 : assets.forEach((a) => {
    assetMap[a.token_address] = a;
  });
  const balanceMap = {};
  balances == null ? void 0 : balances.forEach((b) => {
    balanceMap[b.token_address] = b;
  });
  const poolToken = { name: "Pool Token", symbol: "P", price: 1 };
  const [numeraire, setNumeraire] = (0, import_react.useState)(poolToken);
  const poolBalance = balanceMap[contractAddress] ? parseInt(balanceMap[contractAddress].balance) / 1e18 : 0;
  const price = (address2) => {
    const asset = assetMap[address2];
    return poolTokens * asset.weight / asset.reserve;
  };
  const balance = (address2) => {
    const lowerAddress = address2.toLowerCase();
    return balanceMap[lowerAddress] ? parseInt(balanceMap[lowerAddress].balance) / 1e18 : 0;
  };
  const numeraires = [poolToken, ...assets == null ? void 0 : assets.map((a) => ({ name: a.name, symbol: a.symbol, price: price(a.token_address) }))];
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
  const rows = assets == null ? void 0 : assets.map((a, i) => /* @__PURE__ */ React.createElement("tr", {
    key: a.token_address
  }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Text, {
    size: "md",
    color: "bold",
    component: "span"
  }, `${a.name}`), /* @__PURE__ */ React.createElement(Text, {
    size: "xs",
    color: "dimmed",
    component: "span"
  }, ` (${a.symbol})`))), address ? /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, (balance(a.token_address) / numeraire.price).toLocaleString(void 0, numberOptions)) : null, /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, (price(a.token_address) / numeraire.price).toLocaleString(void 0, numberOptions)), /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, (a.reserve / numeraire.price).toLocaleString(void 0, numberOptions)), /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, (1e4 * a.fee).toLocaleString()), /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, a.k.toLocaleString())));
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Title, null, "Liquidity Pool"), /* @__PURE__ */ React.createElement(Card, {
    withBorder: true,
    p: "xl",
    radius: "md",
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(Title, {
    order: 3
  }, "Pool Tokens"), /* @__PURE__ */ React.createElement(SimpleGrid, {
    cols: address ? 4 : 3
  }, address ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text, {
    size: "xl",
    mt: "md"
  }, (poolBalance / numeraire.price).toLocaleString() + " " + numeraire.symbol), /* @__PURE__ */ React.createElement(Text, {
    size: "sm",
    color: "dimmed"
  }, "Balance")) : null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text, {
    size: "xl",
    mt: "md"
  }, (poolTokens / numeraire.price).toLocaleString() + " " + numeraire.symbol), /* @__PURE__ */ React.createElement(Text, {
    size: "sm",
    color: "dimmed"
  }, "TVL")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text, {
    size: "xl",
    mt: "md"
  }, poolTokens == null ? void 0 : poolTokens.toLocaleString()), /* @__PURE__ */ React.createElement(Text, {
    size: "sm",
    color: "dimmed"
  }, "Outstanding")), /* @__PURE__ */ React.createElement(NativeSelect, {
    mt: "md",
    value: `${numeraire.name} (${numeraire.symbol})`,
    onChange: (event) => handleNumeraire(event.currentTarget.value),
    data: numeraires.map((n) => `${n.name} (${n.symbol})`),
    description: "Select numeraire",
    required: true
  }))), /* @__PURE__ */ React.createElement(Card, {
    withBorder: true,
    p: "xl",
    radius: "md",
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(Title, {
    order: 3
  }, "Asset Tokens"), /* @__PURE__ */ React.createElement(Text, {
    size: "xl",
    mt: "md"
  }, assets == null ? void 0 : assets.length.toLocaleString()), /* @__PURE__ */ React.createElement(Text, {
    size: "sm",
    color: "dimmed"
  }, "Number of assets"), /* @__PURE__ */ React.createElement(Group, {
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(Table, {
    verticalSpacing: "sm",
    style: { width: "100%" },
    highlightOnHover: true
  }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: "md",
    color: "dimmed"
  }, "Name")), address ? /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: "md",
    color: "dimmed"
  }, "Balance (", numeraire.symbol, ")")) : null, /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: "md",
    color: "dimmed"
  }, "Price (", numeraire.symbol, ")")), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: "md",
    color: "dimmed"
  }, "Reserves (", numeraire.symbol, ")")), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: "md",
    color: "dimmed"
  }, "Fee (bps)")), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: "md",
    color: "dimmed"
  }, "Tuning (k)")))), /* @__PURE__ */ React.createElement("tbody", null, rows)))));
};
var Dashboard_default = Dashboard;

export {
  Header_default,
  RequireAuth_default,
  Dashboard_default
};
//# sourceMappingURL=/build/_shared/chunk-EG5N3GRM.js.map
