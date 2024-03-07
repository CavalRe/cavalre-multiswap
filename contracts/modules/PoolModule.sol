// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2024, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

// import {Module, RouterStore} from "@cavalre/router/Module.sol";
// import {PoolState, AssetState} from "../interfaces/IPool.sol";

// struct PoolStore {
//     bool initialized;
//     uint256 txCount;
//     PoolState poolState;
//     mapping(address => AssetState) assetStates;
//     address[] assetAddresses;
//     address wrappedNative;
//     bool tradingPaused;
// }

// library PoolLib {
//     // Stores
//     bytes32 internal constant STORE_POSITION = keccak256("@cavalre.pool.store");

//     // Errors
//     error AlreadyInitialized();

//     error NotInitialized();

//     // Events

//     // Selectors

//     // Commands
//     function enforceIsInitialized() internal view {
//         PoolStore storage s = store();
//         if (!s.initialized) revert NotInitialized();
//     }

//     function enforceIsNotInitialized() internal view {
//         PoolStore storage s = store();
//         if (s.initialized) revert AlreadyInitialized();
//     }

//     function store() internal pure returns (PoolStore storage s) {
//         bytes32 position = STORE_POSITION;
//         assembly {
//             s.slot := position
//         }
//     }
// }

// contract PoolModule is Module {
//     modifier onlyInitialized() {
//         PoolLib.enforceIsInitialized();
//         _;
//     }

//     modifier onlyUninitialized() {
//         PoolLib.enforceIsNotInitialized();
//         _;
//     }
// }
