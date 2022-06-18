import {
  init_lib,
  useMoralis
} from "/build/_shared/chunk-USSOZC2H.js";
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
} from "/build/_shared/chunk-Q3EG33AN.js";
import {
  BigNumber
} from "/build/_shared/chunk-5CBF2EXT.js";
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
var import_react4 = __toESM(require_react());

// app/utils/index.ts
init_react();

// ../artifacts/contracts/Pool.sol/Pool.json
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

// app/utils/index.ts
var decimalNumber = (value, decimals = "18") => {
  return parseInt(value) / 10 ** parseInt(decimals);
};

// app/components/Dashboard/Swap/index.tsx
init_react();
var import_react3 = __toESM(require_react());
init_lib();

// app/components/Dashboard/Swap/PayComponent/index.tsx
init_react();
var PayComponent = (props) => {
  const { token, swapState, getQuote } = props;
  const { poolToken, assetTokens } = swapState;
  const handleAmountChange = (amount) => {
    if (token.address == poolToken.address) {
      poolToken.amount = amount;
    } else {
      assetTokens[token.address].amount = amount;
    }
    getQuote({ poolToken, assetTokens });
  };
  return /* @__PURE__ */ React.createElement(Card, {
    radius: "md",
    mt: "xs"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "address"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "payToken",
    value: JSON.stringify(token)
  }), /* @__PURE__ */ React.createElement(NumberInput, {
    precision: 2,
    size: "lg",
    icon: /* @__PURE__ */ React.createElement(Text, {
      size: "md"
    }, token.symbol),
    hideControls: true,
    value: token.amount,
    onChange: (a) => handleAmountChange(a),
    min: 0,
    error: token.amount > token.allowance ? "Insufficient allowance (" + token.symbol + " " + token.allowance + ")" : false
  }), /* @__PURE__ */ React.createElement(Group, {
    mt: "xs",
    position: "left"
  }, /* @__PURE__ */ React.createElement(Text, null, "Pool Balance:"), /* @__PURE__ */ React.createElement(Text, null, token.contractBalance.toLocaleString()), /* @__PURE__ */ React.createElement(Text, null, token.symbol)), /* @__PURE__ */ React.createElement(Group, {
    mt: "xs",
    position: "left"
  }, /* @__PURE__ */ React.createElement(Text, null, "Account Balance:"), /* @__PURE__ */ React.createElement(Text, null, token.accountBalance.toLocaleString()), /* @__PURE__ */ React.createElement(Text, null, token.symbol)));
};
var PayComponent_default = PayComponent;

// app/components/Dashboard/Swap/ReceiveComponent/index.tsx
init_react();
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
  return /* @__PURE__ */ React.createElement(Card, {
    radius: "md",
    mt: "xs"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "receiveToken",
    value: JSON.stringify(token)
  }), /* @__PURE__ */ React.createElement(Text, {
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
    value: 100 * token.allocation,
    onChange: (a) => handleAllocationChange(a),
    rightSection: /* @__PURE__ */ React.createElement(React.Fragment, null, "%"),
    styles: { root: { width: "50%" } },
    min: 0
  })), /* @__PURE__ */ React.createElement(Group, {
    mt: "xs",
    position: "left"
  }, /* @__PURE__ */ React.createElement(Text, null, "Pool Balance:"), /* @__PURE__ */ React.createElement(Text, null, token.contractBalance.toLocaleString()), /* @__PURE__ */ React.createElement(Text, null, token.symbol)));
};
var ReceiveComponent_default = ReceiveComponent;

// app/components/Dashboard/Swap/TokenSelect/index.tsx
init_react();
var import_react2 = __toESM(require_react());

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
  return /* @__PURE__ */ React.createElement(Paper, {
    withBorder: true,
    p: "xl",
    radius: "md",
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(Title, {
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
  }), /* @__PURE__ */ React.createElement(MultiSelect, {
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
  const { chain, address } = props;
  const [swapState, setSwapState] = (0, import_react3.useState)(props);
  const { poolToken, assetTokens } = swapState;
  const [isApproved, setIsApproved] = (0, import_react3.useState)(true);
  const {
    isAuthenticated,
    authenticate,
    Moralis
  } = useMoralis();
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
    const amounts = payTokens.map((t) => BigNumber.from((t.amount * 10 ** t.decimals).toLocaleString("fullwide", { useGrouping: false })));
    const receiveAddresses = receiveTokens.map((t) => t.address);
    const allocations = receiveTokens.map((t) => BigNumber.from((t.allocation * 10 ** 18).toLocaleString("fullwide", { useGrouping: false })));
    if (payTokens.length == 1 && receiveTokens.length == 1) {
      if (receiveAddresses.includes(poolToken.address)) {
        await Moralis.executeFunction({
          contractAddress: poolToken.address,
          functionName: "stake",
          abi,
          params: {
            payToken: payTokens[0].address,
            amountIn: BigNumber.from(10).pow(payTokens[0].decimals).mul(payTokens[0].amount),
            addressTo: address2
          }
        });
        return { result: "Staking" };
      } else if (payAddresses.includes(poolToken.address)) {
        await Moralis.executeFunction({
          contractAddress: poolToken.address,
          functionName: "unstake",
          abi,
          params: {
            receiveToken: receiveTokens[0].address,
            amountIn: BigNumber.from(10).pow(payTokens[0].decimals).mul(payTokens[0].amount),
            addressTo: address2
          }
        });
        return { result: "Unstaking" };
      } else {
        await Moralis.executeFunction({
          contractAddress: poolToken.address,
          functionName: "swap",
          abi,
          params: {
            payToken: payTokens[0].address,
            receiveToken: receiveTokens[0].address,
            amountIn: BigNumber.from(10).pow(payTokens[0].decimals).mul(payTokens[0].amount),
            addressTo: address2
          }
        });
        return { result: "Swapping" };
      }
      ;
    } else {
      await Moralis.executeFunction({
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
  })), /* @__PURE__ */ React.createElement(Text, null, `Total allocation: ${(100 * totalAllocation).toFixed(2)}%`), isAuthenticated ? /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    onClick: handleSwap,
    mt: "xl",
    size: "md",
    disabled: Math.abs(totalAllocation - 1) > 1e-4 || !checkAllocations()
  }, "Execute Swap") : /* @__PURE__ */ React.createElement(Button, {
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
    Moralis
  } = useMoralis();
  const { chain, poolToken, assetTokens } = props;
  const [opened, setOpened] = (0, import_react4.useState)(false);
  const [_, setTotalBalance] = (0, import_react4.useState)(0);
  const setBalances = async () => {
    if (account) {
      await Moralis.Web3API.account.getTokenBalances({
        account,
        chain
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
      await Moralis.Web3API.token.getTokenAllowance({
        owner_address: account,
        spender_address: poolToken.address,
        address: poolToken.address,
        chain
      }).then(({ allowance }) => {
        poolToken.allowance = decimalNumber(allowance, poolToken.decimals.toString());
      });
      Object.values(assetTokens).forEach(async (asset) => {
        await Moralis.Web3API.token.getTokenAllowance({
          owner_address: account,
          spender_address: poolToken.address,
          address: asset.address,
          chain
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
  }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Text, {
    size: cellTextSize,
    color: "bold",
    component: "span"
  }, `${a.name}`), /* @__PURE__ */ React.createElement(Text, {
    size: "xs",
    color: "dimmed",
    component: "span"
  }, ` (${a.symbol})`))), isAuthenticated ? /* @__PURE__ */ React.createElement("td", {
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
  }, (a.contractBalance / numeraire.price).toLocaleString(void 0, numberOptions))), /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(Text, {
    size: cellTextSize
  }, (1e4 * a.fee).toLocaleString())), /* @__PURE__ */ React.createElement("td", {
    align: "right"
  }, /* @__PURE__ */ React.createElement(Text, {
    size: cellTextSize
  }, a.k.toLocaleString()))));
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Title, null, "Liquidity Pool"), /* @__PURE__ */ React.createElement(Button, {
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
    assetTokens,
    chain,
    address: account
  })), /* @__PURE__ */ React.createElement(Card, {
    withBorder: true,
    p: "xl",
    radius: "md",
    mt: "lg"
  }, /* @__PURE__ */ React.createElement(Title, {
    order: 3
  }, "Pool Tokens"), /* @__PURE__ */ React.createElement(SimpleGrid, {
    cols: isAuthenticated ? 4 : 3
  }, isAuthenticated ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text, {
    size: "xl",
    mt: "md"
  }, (contractBalance / numeraire.price).toLocaleString() + " " + numeraire.symbol), /* @__PURE__ */ React.createElement(Text, {
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
  }, Object.values(assetTokens).reduce((acc, a) => acc + (a.selection !== "Not in Pool" ? 1 : 0), 0).toLocaleString()), /* @__PURE__ */ React.createElement(Text, {
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
  }, "Name")), isAuthenticated ? /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Text, {
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
//# sourceMappingURL=/build/_shared/chunk-3FJHDM6J.js.map
