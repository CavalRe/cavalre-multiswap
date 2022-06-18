import {
  useMoralis
} from "/build/_shared/chunk-N6VELKRJ.js";
import {
  Button,
  Card,
  Container,
  Group,
  Header,
  Modal,
  MultiSelect,
  NativeSelect,
  NumberInput,
  Paper,
  SimpleGrid,
  Table,
  Text,
  Title
} from "/build/_shared/chunk-TMD7JYHS.js";
import {
  useNavigate
} from "/build/_shared/chunk-Y6WZQ56W.js";
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
var import_react2 = __toESM(require_react());

// app/components/Dashboard/Swap/index.tsx
init_react();
var import_react = __toESM(require_react());
var TokenSelect = (props) => {
  var _a;
  const { title, poolTokens, assetTokens, tokenComponent, placeholder } = props;
  const TokenComponent = tokenComponent;
  const items = (_a = Object.values(assetTokens)) == null ? void 0 : _a.map((t) => {
    return {
      label: `${t.name} (${t.symbol})`,
      value: t.token_address
    };
  });
  const [value, setValue] = (0, import_react.useState)([]);
  const TokenItem = (0, import_react.forwardRef)(({ label, value: value2, token, ...others }, ref) => {
    return /* @__PURE__ */ React.createElement("div", {
      ref,
      style: { width: "100%" },
      ...others
    }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Text, {
      size: "md",
      color: "bold",
      component: "span"
    }, `${token.name}`), /* @__PURE__ */ React.createElement(Text, {
      size: "xs",
      color: "dimmed",
      component: "span"
    }, ` (${token.symbol})`)));
  });
  return /* @__PURE__ */ React.createElement(Paper, {
    withBorder: true,
    p: "xl",
    radius: "md",
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(Title, {
    order: 4,
    align: "center"
  }, title), Object.values(assetTokens).map((token, i) => {
    return /* @__PURE__ */ React.createElement(TokenComponent, {
      token,
      key: i
    });
  }), /* @__PURE__ */ React.createElement(MultiSelect, {
    data: items,
    itemComponent: TokenItem,
    value,
    onChange: setValue,
    mt: "xs",
    size: "md",
    placeholder,
    searchable: true,
    nothingFound: "Nothing found",
    clearable: true,
    clearButtonLabel: "Clear selected tokens"
  }));
};
var payerComponent = (props) => {
  const { token } = props;
  return /* @__PURE__ */ React.createElement(Card, {
    radius: "md",
    mt: "xs"
  }, /* @__PURE__ */ React.createElement(NumberInput, {
    defaultValue: 0,
    precision: 2,
    size: "lg",
    icon: /* @__PURE__ */ React.createElement(Text, {
      size: "md"
    }, token.symbol),
    hideControls: true,
    onChange: (n) => console.log(n)
  }), /* @__PURE__ */ React.createElement(Group, {
    mt: "xs",
    position: "left"
  }, /* @__PURE__ */ React.createElement(Text, null, "Balance:"), /* @__PURE__ */ React.createElement(Text, null, token.balance.toLocaleString()), /* @__PURE__ */ React.createElement(Text, null, token.symbol)));
};
var receiverComponent = (props) => {
  const { token } = props;
  return /* @__PURE__ */ React.createElement(Card, {
    radius: "md",
    mt: "xs"
  }, /* @__PURE__ */ React.createElement(Text, {
    size: "md",
    mt: "sm",
    component: "span",
    color: "dimmed"
  }, token.symbol), /* @__PURE__ */ React.createElement(Text, {
    size: "lg",
    mt: "sm",
    component: "span",
    ml: "md"
  }, "0.00"), /* @__PURE__ */ React.createElement(Group, {
    mt: "xs"
  }, /* @__PURE__ */ React.createElement(Text, {
    component: "span",
    size: "md",
    styles: { width: "50%" }
  }, "Allocation:"), /* @__PURE__ */ React.createElement(NumberInput, {
    defaultValue: 100,
    precision: 2,
    size: "md",
    rightSection: /* @__PURE__ */ React.createElement(React.Fragment, null, "%"),
    styles: { root: { width: "50%" } }
  })));
};
var Swap = (props) => {
  const { poolTokens, assetTokens } = props;
  return /* @__PURE__ */ React.createElement(SimpleGrid, {
    cols: 2
  }, /* @__PURE__ */ React.createElement(TokenSelect, {
    title: "Pay Tokens",
    poolTokens,
    assetTokens,
    tokenComponent: payerComponent,
    placeholder: "Select tokens to deposit:"
  }), /* @__PURE__ */ React.createElement(TokenSelect, {
    title: "Receive Tokens",
    poolTokens,
    assetTokens,
    tokenComponent: receiverComponent,
    placeholder: "Select tokens to withdraw:"
  }));
};
var Swap_default = Swap;

// app/components/Dashboard/index.tsx
var Dashboard = (props) => {
  var _a, _b, _c;
  const {
    isInitialized,
    isAuthenticated,
    account,
    isWeb3Enabled,
    enableWeb3
  } = useMoralis();
  const { contractAddress, address, poolTokens, assetTokens, pathname } = props;
  const [opened, setOpened] = (0, import_react2.useState)(true);
  const navigate = useNavigate();
  (0, import_react2.useEffect)(() => {
    if (isAuthenticated && !isWeb3Enabled)
      enableWeb3();
    const newPathname = isAuthenticated ? account ? `/dashboard/${account}` : pathname : "/dashboard";
    if (isInitialized && newPathname !== pathname)
      navigate(newPathname);
  }, [isInitialized, isAuthenticated, account]);
  const poolToken = { name: "Pool Token", symbol: "P", price: 1 };
  const [numeraire, setNumeraire] = (0, import_react2.useState)(poolToken);
  const poolBalance = assetTokens[contractAddress] ? assetTokens[contractAddress].balance : 0;
  const price = (address2) => {
    const lowerAddress = address2.toLowerCase();
    const asset = assetTokens[lowerAddress];
    return poolTokens * asset.weight / asset.reserve;
  };
  const balance = (address2) => {
    const lowerAddress = address2.toLowerCase();
    return assetTokens[lowerAddress] ? assetTokens[lowerAddress].balance : 0;
  };
  const numeraires = [poolToken, ...(_a = Object.values(assetTokens)) == null ? void 0 : _a.map((a) => ({ name: a.name, symbol: a.symbol, price: price(a.token_address) }))];
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
  const rows = (_b = Object.values(assetTokens)) == null ? void 0 : _b.map((a, i) => /* @__PURE__ */ React.createElement("tr", {
    key: a.token_address
  }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Text, {
    size: cellTextSize,
    color: "bold",
    component: "span"
  }, `${a.name}`), /* @__PURE__ */ React.createElement(Text, {
    size: "xs",
    color: "dimmed",
    component: "span"
  }, ` (${a.symbol})`))), address ? /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(Text, {
    size: cellTextSize
  }, (balance(a.token_address) / numeraire.price).toLocaleString(void 0, numberOptions))) : null, /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(Text, {
    size: cellTextSize
  }, (price(a.token_address) / numeraire.price).toLocaleString(void 0, numberOptions))), /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(Text, {
    size: cellTextSize
  }, (a.reserve / numeraire.price).toLocaleString(void 0, numberOptions))), /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(Text, {
    size: cellTextSize
  }, (1e4 * a.fee).toLocaleString())), /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(Text, {
    size: cellTextSize
  }, a.k.toLocaleString()))));
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Title, null, "Liquidity Pool"), isAuthenticated ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    onClick: () => setOpened(true),
    mt: "xl"
  }, "Swap"), /* @__PURE__ */ React.createElement(Modal, {
    size: "800px",
    opened,
    onClose: () => setOpened(false),
    radius: "lg",
    title: /* @__PURE__ */ React.createElement(Title, {
      align: "center",
      order: 3
    }, "Mulit-Asset Swap")
  }, /* @__PURE__ */ React.createElement(Swap_default, {
    poolTokens,
    assetTokens
  }))) : null, /* @__PURE__ */ React.createElement(Card, {
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
    size: subTextSize,
    color: "dimmed"
  }, "Balance")) : null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text, {
    size: "xl",
    mt: "md"
  }, (poolTokens / numeraire.price).toLocaleString() + " " + numeraire.symbol), /* @__PURE__ */ React.createElement(Text, {
    size: subTextSize,
    color: "dimmed"
  }, "TVL")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text, {
    size: "xl",
    mt: "md"
  }, poolTokens == null ? void 0 : poolTokens.toLocaleString()), /* @__PURE__ */ React.createElement(Text, {
    size: subTextSize,
    color: "dimmed"
  }, "Outstanding")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(NativeSelect, {
    mt: "md",
    value: `${numeraire.name} (${numeraire.symbol})`,
    onChange: (event) => handleNumeraire(event.currentTarget.value),
    data: numeraires.map((n) => `${n.name} (${n.symbol})`),
    description: "Select numeraire",
    required: true
  })))), /* @__PURE__ */ React.createElement(Card, {
    withBorder: true,
    p: "xl",
    radius: "md",
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(Title, {
    order: 3
  }, "Asset Tokens"), /* @__PURE__ */ React.createElement(Text, {
    size: "xl",
    mt: "md"
  }, (_c = Object.values(assetTokens)) == null ? void 0 : _c.length.toLocaleString()), /* @__PURE__ */ React.createElement(Text, {
    size: subTextSize,
    color: "dimmed"
  }, "Number of assets"), /* @__PURE__ */ React.createElement(Group, {
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(Table, {
    verticalSpacing: "sm",
    style: { width: "100%" },
    highlightOnHover: true
  }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: headerTextSize
  }, "Name")), address ? /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: headerTextSize
  }, "Balance (", numeraire.symbol, ")")) : null, /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: headerTextSize
  }, "Price (", numeraire.symbol, ")")), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: headerTextSize
  }, "Reserves (", numeraire.symbol, ")")), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: headerTextSize
  }, "Fee (bps)")), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
    size: headerTextSize
  }, "Tuning (k)")))), /* @__PURE__ */ React.createElement("tbody", null, rows)))));
};
var Dashboard_default = Dashboard;

export {
  Header_default,
  RequireAuth_default,
  Dashboard_default
};
//# sourceMappingURL=/build/_shared/chunk-32B2EFRV.js.map
