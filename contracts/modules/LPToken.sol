// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2024, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

// import {Module} from "@cavalre/router/Module.sol";
// import {FloatingPoint, UFloat} from "@cavalre/floating-point/FloatingPoint.sol";

// struct Depot {
//     string name;
//     string symbol;
//     uint8 decimals;
//     UFloat totalTokens;
//     UFloat totalSupply;
//     mapping(address => uint256) balances;
//     mapping(address => mapping(address => uint256)) allowances;
// }

// contract LPToken is Module {
//     bytes32 internal constant LPTOKEN_DEPOT_POSITION =
//         keccak256("@cavalre.lptoken.depot");

//     event Transfer(address indexed from, address indexed to, uint256 value);

//     event Approval(
//         address indexed owner,
//         address indexed spender,
//         uint256 value
//     );

//     error InsufficientBalance(uint256 balance, uint256 amount);

//     error InsufficientAllowance(uint256 allowance, uint256 amount);

//     error InsufficientTotalSupply(uint256 totalSupply, uint256 amount);

//     error InsufficientShares(uint256 shares, uint256 amount);

//     error InsufficientTokensPerShare(
//         uint256 tokensPerShare,
//         uint256 amount,
//         uint256 shares
//     );

//     functio

//     function store() internal pure returns (Depot storage d) {
//         bytes32 position = LPTOKEN_DEPOT_POSITION;
//         assembly {
//             d.slot := position
//         }
//     }
// }
