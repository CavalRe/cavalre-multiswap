// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2024, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

import {UFloat} from "@cavalre/floating-point/FloatingPoint.sol";

struct Asset {
    address id;
    uint8 decimals;
    uint64 fee;
    uint128 balance;
    uint128 marketCap;
    uint64 index;
    uint64 lastUpdated;
}

struct Portfolio {
    address id;
    address allocator;
    uint128 aum;
    mapping(address => uint128) allocations;
    address[] allocationAddresses;
    uint64 index;
    uint64 lastUpdated;
}

struct Store {
    address id;
    bool isInitialized;
    bool tradingPaused;
    address protocolFeeRecipient;
    uint64 protocolFee;

    uint128 maketCap;
    mapping(address => Asset) assets;
    address[] assetAddresses;

    uint128 aum;
    mapping(address => Portfolio) portfolios;
    address[] portfolioAddresses;

    mapping(address => mapping(address => uint128)) allocations;

    address wrappedNative;
    uint64 txCount;
}

interface IPool {
    // Events
    event AssetAdded(
        address token,
        uint256 fee,
        uint256 balance,
        uint256 scale
    );
    event PoolInitialized(address token);

    // Errors
    error NotInitialized();
    error ZeroAddress();
    error DuplicateToken(address token);
    error ZeroPrice();
    error TooLarge(uint256 value);
    error AssetNotFound(address token);
    error AlreadyInitialized();
    error IncorrectAmount(uint256 value, uint256 amount);
    error LengthhMismatch(uint256 expected, uint256 actual);
}