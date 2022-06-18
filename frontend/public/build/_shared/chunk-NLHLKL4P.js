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
var import_react3 = __toESM(require_react());

// app/components/Dashboard/Swap/index.tsx
init_react();
var import_react2 = __toESM(require_react());

// app/components/Dashboard/Swap/PayComponent/index.tsx
init_react();
var PayComponent = (props) => {
  const { token, swapState, getQuote } = props;
  const { poolToken, assetTokens } = swapState;
  const handleAmountChange = (amount) => {
    assetTokens[token.address].amount = amount;
    getQuote({ poolToken, assetTokens });
  };
  return /* @__PURE__ */ React.createElement(Card, {
    radius: "md",
    mt: "xs"
  }, /* @__PURE__ */ React.createElement(NumberInput, {
    precision: 2,
    size: "lg",
    icon: /* @__PURE__ */ React.createElement(Text, {
      size: "md"
    }, token.symbol),
    hideControls: true,
    value: assetTokens[token.address].amount,
    onChange: (a) => handleAmountChange(a),
    min: 0
  }), /* @__PURE__ */ React.createElement(Group, {
    mt: "xs",
    position: "left"
  }, /* @__PURE__ */ React.createElement(Text, null, "Balance:"), /* @__PURE__ */ React.createElement(Text, null, token.balance.toLocaleString()), /* @__PURE__ */ React.createElement(Text, null, token.symbol)), /* @__PURE__ */ React.createElement(Group, {
    mt: "xs",
    position: "left"
  }, /* @__PURE__ */ React.createElement(Text, null, "Pool Reserve:"), /* @__PURE__ */ React.createElement(Text, null, token.reserve.toLocaleString()), /* @__PURE__ */ React.createElement(Text, null, token.symbol)));
};
var PayComponent_default = PayComponent;

// app/components/Dashboard/Swap/ReceiveComponent/index.tsx
init_react();
var ReceiveComponent = (props) => {
  const { token, swapState, getQuote } = props;
  const { poolToken, assetTokens } = swapState;
  const handleAllocationChange = (allocation) => {
    assetTokens[token.address].allocation = allocation;
    getQuote({ poolToken, assetTokens });
  };
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
  }, (-token.amount).toFixed(4)), /* @__PURE__ */ React.createElement(Group, {
    mt: "xs"
  }, /* @__PURE__ */ React.createElement(Text, {
    component: "span",
    size: "md",
    styles: { width: "50%" }
  }, "Allocation:"), /* @__PURE__ */ React.createElement(NumberInput, {
    precision: 2,
    size: "md",
    value: assetTokens[token.address].allocation,
    onChange: (a) => handleAllocationChange(a),
    rightSection: /* @__PURE__ */ React.createElement(React.Fragment, null, "%"),
    styles: { root: { width: "50%" } },
    min: 0
  })), /* @__PURE__ */ React.createElement(Group, {
    mt: "xs",
    position: "left"
  }, /* @__PURE__ */ React.createElement(Text, null, "Pool Reserve:"), /* @__PURE__ */ React.createElement(Text, null, token.reserve.toLocaleString()), /* @__PURE__ */ React.createElement(Text, null, token.symbol)));
};
var ReceiveComponent_default = ReceiveComponent;

// app/components/Dashboard/Swap/TokenSelect/index.tsx
init_react();

// app/components/Dashboard/Swap/TokenSelect/TokenItem/index.tsx
init_react();
var import_react = __toESM(require_react());
var TokenItem = (0, import_react.forwardRef)(({ label, value, token, ...others }, ref) => {
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
  const TokenComponent = tokenComponent;
  const selectedTokens = Object.values(assetTokens).filter((a) => isPay ? a.isPay : a.isReceive);
  const getItems = () => {
    let items2 = [];
    if (isPay && poolToken.isPay || !isPay && poolToken.isReceive) {
      items2.push({
        label: `${poolToken.name} (${poolToken.symbol})`,
        value: poolToken.address,
        token: poolToken,
        group: "Pool Token"
      });
    }
    ;
    items2 = items2.concat(items2, Object.values(assetTokens).filter((t) => isPay ? !t.isReceive : !t.isPay).map((t) => {
      return {
        label: `${t.name} (${t.symbol})`,
        value: t.address,
        token: t,
        group: "Asset Tokens"
      };
    }));
    return items2;
  };
  const items = getItems();
  const handleSelect = (v) => {
    Object.values(assetTokens).forEach((a) => {
      if (v.includes(a.address)) {
        a.isPay = isPay;
        a.isReceive = !isPay;
      } else {
        if (isPay) {
          a.isPay = !isPay;
          a.amount = 0;
        } else {
          a.isReceive = isPay;
          a.allocation = 0;
        }
        ;
      }
      ;
    });
    const nSelected = v.length;
    if (isPay && nSelected) {
      for (let i = 0; i < nSelected; i++) {
        const oldAmount = assetTokens[v[i]].amount;
        assetTokens[v[i]].amount = oldAmount == 0 ? 1 : oldAmount;
      }
    } else if (!isPay && nSelected) {
      let totalAllocation = 0;
      for (let i = 0; i < nSelected - 1; i++) {
        totalAllocation += assetTokens[v[i]].allocation;
      }
      assetTokens[v[nSelected - 1]].allocation = Math.max(0, 100 - totalAllocation);
    }
    ;
    getQuote({ poolToken, assetTokens });
  };
  return /* @__PURE__ */ React.createElement(Paper, {
    withBorder: true,
    p: "xl",
    radius: "md",
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(Title, {
    order: 4,
    align: "center"
  }, title), Object.values(assetTokens).filter((token) => isPay ? token.isPay : token.isReceive).map((token, i) => {
    return /* @__PURE__ */ React.createElement(TokenComponent, {
      token,
      swapState,
      getQuote,
      key: token.address
    });
  }), /* @__PURE__ */ React.createElement(MultiSelect, {
    data: items,
    itemComponent: TokenItem_default,
    value: selectedTokens.map((token) => token.address),
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
  const [swapState, setSwapState] = (0, import_react2.useState)(props);
  const { poolToken, assetTokens } = swapState;
  const getPreTradePrice = (asset) => {
    return asset.weight * poolToken.outstanding / asset.reserve;
  };
  const getPostTradePrice = (asset, newPoolTokens) => {
    return asset.weight * newPoolTokens / (asset.reserve + asset.amount);
  };
  const getAssetAmountIn = (assets, newPoolTokens) => {
    return assets.reduce((total, asset) => total + asset.amount * getPostTradePrice(asset, newPoolTokens), 0);
  };
  const getQuote = (swapState2) => {
    console.log("Getting quote...");
    const { poolToken: poolToken2, assetTokens: assetTokens2 } = swapState2;
    let newPoolTokens = poolToken2.outstanding + poolToken2.amount;
    const selectedPayTokens = Object.values(assetTokens2).filter((asset) => asset.isPay);
    const selectedReceiveTokens = Object.values(assetTokens2).filter((asset) => asset.isReceive);
    let assetAmountIn = getAssetAmountIn(selectedPayTokens, newPoolTokens);
    let totalAmountIn = assetAmountIn - poolToken2.amount;
    if (poolToken2.allocation !== 0) {
      const factor = (1 - poolToken2.fee) * poolToken2.allocation - getAssetAmountIn(selectedPayTokens, 1);
      const poolTokensOut = totalAmountIn / factor;
      newPoolTokens -= poolTokensOut;
      assetAmountIn = getAssetAmountIn(selectedPayTokens, newPoolTokens);
      totalAmountIn = assetAmountIn + poolTokensOut;
    }
    ;
    const quotes = selectedReceiveTokens.map((token) => {
      const allocation = token.allocation / 100;
      const factor = (1 - token.fee) * allocation * totalAmountIn / (token.weight * newPoolTokens);
      console.log(`factor: ${factor}`);
      const amountOut = factor * token.reserve / (1 + factor);
      token.amount = -amountOut;
      const preTradePrice = getPreTradePrice(token);
      const postTradePrice = getPostTradePrice(token, newPoolTokens);
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
  const totalAllocation = Object.values(assetTokens).reduce((total, { allocation }) => total + allocation, 0);
  const handleSwap = () => {
    const quotes = getQuote(swapState);
    console.log(quotes);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SimpleGrid, {
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
  })), /* @__PURE__ */ React.createElement(Text, null, `Total allocation: ${totalAllocation}%`), /* @__PURE__ */ React.createElement(Button, {
    onClick: handleSwap,
    mt: "xl",
    size: "md",
    disabled: totalAllocation !== 100
  }, "Swap"));
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
  const { address, poolToken, assetTokens, pathname } = props;
  const [opened, setOpened] = (0, import_react3.useState)(true);
  const navigate = useNavigate();
  (0, import_react3.useEffect)(() => {
    if (isAuthenticated && !isWeb3Enabled)
      enableWeb3();
    const newPathname = isAuthenticated ? account ? `/dashboard/${account}` : pathname : "/dashboard";
    if (isInitialized && newPathname !== pathname)
      navigate(newPathname);
  }, [isInitialized, isAuthenticated, account]);
  const poolBalance = poolToken.balance;
  const poolTokens = poolToken.outstanding;
  const price = (asset) => {
    return poolTokens * asset.weight / asset.reserve;
  };
  const balance = (asset) => {
    return asset.balance;
  };
  const poolTokenNumeraire = { name: poolToken.name, symbol: poolToken.symbol, price: 1 };
  const [numeraire, setNumeraire] = (0, import_react3.useState)(poolTokenNumeraire);
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
  const rows = (_b = Object.values(assetTokens)) == null ? void 0 : _b.filter((a) => a.reserve > 0 && a.k !== void 0 && a.fee !== void 0).map((a, i) => /* @__PURE__ */ React.createElement("tr", {
    key: a.address
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
  }, (balance(a) / numeraire.price).toLocaleString(void 0, numberOptions))) : null, /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(Text, {
    size: cellTextSize
  }, (price(a) / numeraire.price).toLocaleString(void 0, numberOptions))), /* @__PURE__ */ React.createElement("td", {
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
    poolToken,
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
  }, "AssetToken Tokens"), /* @__PURE__ */ React.createElement(Text, {
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
//# sourceMappingURL=/build/_shared/chunk-NLHLKL4P.js.map
