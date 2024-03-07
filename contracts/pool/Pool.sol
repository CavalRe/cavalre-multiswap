// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2024, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

import {IPool, Asset, Portfolio, Store} from "./IPool.sol";
import {Module, ModuleLib as ML, Store as ModuleStore} from "@cavalre/router/Module.sol";
import {IToken, Token} from "@cavalre/erc20/Token.sol";
import {UFloat, FloatingPoint as FP} from "@cavalre/floating-point/FloatingPoint.sol";
import {IWrappedNative} from "../interfaces/IWrappedNative.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

library PoolLib {
    // Stores
    bytes32 internal constant STORE_POSITION = keccak256("@cavalre.pool.store");

    // Events

    // Errors

    function store() internal pure returns (Store storage s) {
        bytes32 position = STORE_POSITION;
        assembly {
            s.slot := position
        }
    }
}

contract Pool is IPool, Module {
    using FP for UFloat;

    address private immutable __self = address(this);
    address private immutable __owner = msg.sender;

    uint256 internal constant ONE = 1e18;

    function commands()
        public
        pure
        virtual
        override
        returns (bytes4[] memory _commands)
    {
        _commands = new bytes4[](0);
    }

    function initialize(
        string memory _lpName,
        string memory _lpSymbol,
        string memory _slpName,
        string memory _slpSymbol,
        address[] memory addresses,
        uint256[] memory amounts, // Token decimals
        uint256[] memory allocations, // 18 decimals
        uint256 protocolFee, // 18 decimals
        address protocolFeeRecipient,
        address wrappedNativeAddress
    ) external payable {
        enforceIsOwner();
        Store storage s = PoolLib.store();
        if (s.isInitialized) revert AlreadyInitialized();
        if (wrappedNativeAddress == address(0)) revert ZeroAddress();

        Token lpToken = new Token();
        lpToken.initialize(_lpName, _lpSymbol, 18, 0);

        s.id = address(lpToken);
        s.isInitialized = true;
        s.protocolFeeRecipient = protocolFeeRecipient;
        s.protocolFee = uint64(protocolFee);
        address _address;
        uint8 _decimals;
        uint256 _amount;
        uint256 _allocation;
        uint256 _totalStake;
        for (uint256 i; i < addresses.length; i++) {
            _address = addresses[i];
            Asset storage asset = s.assets[_address];
            asset.id = addresses[i];
            _decimals = IToken(_address).decimals();
            asset.decimals = _decimals;
            _amount = amounts[i];
            asset.balance = FP.toUFloat(_amount, _decimals);
            _allocation = allocations[i];
            asset.marketCap = FP.toUFloat(_allocation);
            _totalStake += _allocation;
            asset.index = uint64(i);
            SafeERC20.safeTransferFrom(
                IERC20(_address),
                msg.sender,
                address(this),
                _allocation
            );
        }
        s.assetAddresses = addresses;

        Token slpToken = new Token();
        slpToken.initialize(_slpName, _slpSymbol, 18, 0);

        Portfolio storage slp = s.stakes[address(lpToken)];
        slp.token = address(slpToken);
        slp.allocator = msg.sender;
        slp.amount = uint128(_totalStake);
        slp.allocationAddresses = addresses;
        s.stakeAddresses.push(address(lpToken));

        s.wrappedNative = wrappedNativeAddress;

        lpToken.mint(address(slpToken), _totalStake);

        emit PoolInitialized(s.token);
    }

    function addAsset(
        address _token,
        uint256 _fee,
        uint256 _balance,
        uint256 _stake
    ) external {
        Store storage s = PoolLib.store();
        if (!s.isInitialized) revert NotInitialized();
        if (_token == address(0)) revert ZeroAddress();
        if (s.assets[_token].token == _token) revert DuplicateToken(_token);
        if (_fee >= ONE) revert TooLarge(_fee);

        _payTokenToPool(msg.sender, _token, _balance);
        _payTokensFromPool(msg.sender, s.token, _stake);

        Asset storage asset = s.assets[_token];
        asset.token = _token;
        asset.decimals = IToken(_token).decimals();
        asset.fee = FP.toUFloat(_fee);
        asset.balance = FP.toUFloat(_balance, asset.decimals);
        asset.stake = FP.toUFloat(_stake);
        asset.index = uint64(s.assetAddresses.length);
        asset.lastUpdated = s.txCount;
        s.assetAddresses.push(_token);

        emit AssetAdded(_token, _fee, _balance, _stake);
    }

    function createStake(
        address[] memory addresses,
        uint256[] memory allocations
    ) external {
        if (addresses.length != allocations.length) 
            revert LengthhMismatch(addresses.length, allocations.length);
        
        Store storage s = PoolLib.store();
        if (s.isInitialized) revert NotInitialized();
        s.txCount++;

        enforceIsOwner();

        Token token = new Token();
        token.initialize("Stake", "STK", 18, 0);

        Portfolio storage stake = s.stakes[address(token)];
        stake.token = address(token);
        stake.allocator = msg.sender;
        for (uint256 i; i < allocations.length; i++) {
            stake.amount += uint128(allocations[i]);
            stake.allocations[addresses[i]] = uint128(allocations[i]);
        }
        stake.allocationAddresses = addresses;
        stake.index = uint64(s.stakeAddresses.length);
        stake.lastUpdated = s.txCount;

        SafeERC20.safeTransferFrom(
            IERC20(s.token),
            msg.sender,
            address(stake.token),
            stake.amount
        );
    }

    function _payTokenToPool(
        address sender,
        address payToken,
        uint256 amount // Token decimals
    ) private {
        if (payToken == address(PoolLib.store().token)) {
            IToken(payToken).burn(sender, amount);
        } else if (payToken == address(0)) {
            if (msg.value != amount) revert IncorrectAmount(msg.value, amount);
            _wrap(amount);
        } else {
            SafeERC20.safeTransferFrom(
                IERC20(payToken),
                sender,
                address(this),
                amount
            );
        }
    }

    function _payTokensFromPool(
        address receiver,
        address receiveToken,
        uint256 amount // Token decimals
    ) private {
        if (receiveToken == address(PoolLib.store().token)) {
            IToken(receiveToken).mint(receiver, amount);
        } else if (receiveToken == address(0)) {
            _unwrap(amount);
            (bool success, ) = payable(receiver).call{value: amount}("");
            require(success, "Transfer failed");
        } else {
            SafeERC20.safeTransfer(IERC20(receiveToken), receiver, amount);
        }
    }

    function _approveTokenIfNeeded(
        address token,
        address _to,
        uint256 _amount
    ) internal {
        if (IToken(token).allowance(address(this), _to) < _amount) {
            IToken(token).approve(_to, type(uint256).max);
        }
    }

    function _wrap(uint256 amount) internal {
        IWrappedNative(PoolLib.store().wrappedNative).deposit{value: amount}();
    }

    function _unwrap(uint256 amount) internal {
        address _wrappedNative = PoolLib.store().wrappedNative;
        _approveTokenIfNeeded(
            _wrappedNative,
            _wrappedNative,
            amount
        );
        IWrappedNative(_wrappedNative).withdraw(amount);
    }
}
