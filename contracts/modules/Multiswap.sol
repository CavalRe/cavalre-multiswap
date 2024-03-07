// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2024, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity ^0.8.0;

// import {RouterStore, ModuleLib as ML} from "@cavalre/router/Module.sol";
// import {PoolModule, PoolStore, PoolLib as PL} from "./PoolModule.sol";

// // struct MultiswapStore {

// // }

// library MultiswapLib {
//     // Stores
//     bytes32 internal constant MULTISWAP_STORE_POSITION =
//         keccak256("@cavalre.multiswap.store");

//     // Errors
//     error ZeroLength();
//     error LengthMismatch(uint256 length1, uint256 length2);
//     error ZeroAllocation();
//     error IncorrectAmount(uint256 expected, uint256 actual);
//     error TooLarge(uint256 amount);
//     error TradingPausedError();

//     // Selectors
//     bytes4 internal constant MULTISWAP =
//         bytes4(
//             keccak256(
//                 "multiswap(address[],uint256[],address[],uint256[],uint256[])"
//             )
//         );

//     // Events
//     event Multiswap(
//         uint256 indexed txCount,
//         address indexed sender,
//         address[] payTokens,
//         address[] receiveTokens,
//         uint256[] amounts,
//         uint256[] receiveAmounts,
//         uint256 feeAmount
//     );

//     // Commands
//     function multiswap(
//         address[] memory payTokens,
//         uint256[] memory amounts, // Token decimals
//         address[] memory receiveTokens,
//         uint256[] memory allocations, // 18 decimals
//         uint256[] memory minReceiveAmounts // Token decimals
//     ) internal returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
//         RouterStore storage rs = ML.routerStore();
//         PoolStore storage ps = PL.store();
//         if (ps.tradingPaused) revert TradingPausedError();

//         address sender = _msgSender();
//         // Check user
//         {
//             _checkUser(sender);
//         }
//         // Check lengths
//         {
//             if (payTokens.length == 0) revert ZeroLength();
//             if (receiveTokens.length == 0) revert ZeroLength();
//             if (payTokens.length != amounts.length)
//                 revert LengthMismatch(payTokens.length, amounts.length);
//             if (receiveTokens.length != allocations.length)
//                 revert LengthMismatch(receiveTokens.length, allocations.length);
//             if (receiveTokens.length != minReceiveAmounts.length)
//                 revert LengthMismatch(
//                     receiveTokens.length,
//                     minReceiveAmounts.length
//                 );
//         }
//         // Check duplicates
//         {
//             bool hasLP;
//             bool[] memory check_ = new bool[](_assetAddresses.length);
//             hasLP = _checkDuplicateTokens(payTokens, check_, hasLP);
//             hasLP = _checkDuplicateTokens(receiveTokens, check_, hasLP);
//         }
//         // Check allocations
//         {
//             uint256 totalAllocation;
//             for (uint256 i; i < allocations.length; i++) {
//                 if (allocations[i] == 0) revert ZeroAllocation();
//                 totalAllocation += allocations[i];
//             }
//             if (totalAllocation != 1e18)
//                 revert IncorrectAmount(1e18, totalAllocation);
//         }
//         // Check size
//         {
//             for (uint256 i; i < payTokens.length; i++) {
//                 address payToken = payTokens[i];
//                 uint256 balance_;
//                 if (payToken == address(this)) {
//                     balance_ = _poolState.balance.toUInt(); // Convert to token decimals
//                 } else {
//                     balance_ = _assetState[payToken].balance.toUInt(
//                         _assetState[payToken].decimals
//                     ); // Convert to token decimals
//                 }
//                 if (amounts[i] > balance_ / 3) revert TooLarge(amounts[i]);
//             }
//         }

//         (receiveAmounts, feeAmount) = _multiswap(
//             sender,
//             payTokens,
//             amounts,
//             receiveTokens,
//             allocations,
//             minReceiveAmounts
//         );

//         emit MultiswapLib.Multiswap(
//             _txCount,
//             sender,
//             payTokens,
//             receiveTokens,
//             amounts,
//             receiveAmounts,
//             feeAmount
//         );
//     }

//     // function store() internal pure returns (Store storage s) {
//     //     bytes32 position = MULTISWAP_STORE_POSITION;
//     //     assembly {
//     //         s.slot := position
//     //     }
//     // }
// }

// contract MultiswapModule is PoolModule {
//     function commands()
//         public
//         pure
//         override
//         returns (bytes4[] memory _commands)
//     {
//         _commands = new bytes4[](1);
//         _commands[0] = MultiswapLib.MULTISWAP;
//     }

//     function multiswap(
//         address[] memory payTokens,
//         uint256[] memory amounts, // Token decimals
//         address[] memory receiveTokens,
//         uint256[] memory allocations, // 18 decimals
//         uint256[] memory minReceiveAmounts // Token decimals
//     )
//         public
//         payable
//         onlyInitialized
//         nonReentrant
//         returns (
//             uint256[] memory receiveAmounts,
//             uint256 feeAmount
//         )
//     {
//         enforceIsDelegated();
//         return
//             MultiswapLib.multiswap(
//                 payTokens,
//                 amounts,
//                 receiveTokens,
//                 allocations,
//                 minReceiveAmounts
//             );
//     }
// }
