// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.24;

import {IPool, PoolState, AssetState} from "./interfaces/IPool.sol";
import {LPToken, FixedPointMathLib} from "./LPToken.sol";
import {IWrappedNative} from "./interfaces/IWrappedNative.sol";

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20, IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Pool is IPool, LPToken, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using FixedPointMathLib for uint256;
    using FixedPointMathLib for int256;

    uint256 private _txCount;

    uint256 private _isInitialized;

    PoolState private _poolState;
    mapping(address => AssetState) private _assetState;
    address[] private _assetAddresses;

    address private _wrappedNativeAddress;

    bool private _tradingPaused;

    modifier onlyInitialized() {
        if (_isInitialized == 0) revert NotInitialized();
        _;
    }

    modifier onlyUninitialized() {
        if (_isInitialized == 1) revert AlreadyInitialized();
        _;
    }

    constructor(
        string memory name,
        string memory symbol,
        uint256 protocolFee,
        uint256 tau,
        address wrappedNativeAddress
    ) LPToken(name, symbol) {
        if (tau >= ONE) revert TooLarge(tau);
        _protocolFee = protocolFee;
        _poolState.token = address(this);
        _poolState.name = name;
        _poolState.symbol = symbol;
        _poolState.decimals = 18;
        _poolState.omega = int256(ONE - tau);
        _poolState.tokensPerShare = ONE;
        _wrappedNativeAddress = wrappedNativeAddress;
    }

    function _payTokenToPool(
        address sender,
        address payToken,
        uint256 amount
    ) private {
        if (payToken == address(this)) {
            _burn(sender, amount);
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

    function _payTokenToSender(
        address sender,
        address receiveToken,
        uint256 amount
    ) private {
        if (receiveToken == address(this)) {
            _mint(sender, amount);
        } else if (receiveToken == address(0)) {
            _unwrap(amount);
            (bool success, ) = payable(sender).call{value: amount}("");
            require(success, "Transfer failed");
        } else {
            SafeERC20.safeTransfer(IERC20(receiveToken), sender, amount);
        }
    }

    function addAsset(
        address token_,
        uint256 fee_, // 18 decimals
        uint256 balance_, // Token decimals
        uint256 scale_ // 18 decimals
    ) public payable onlyUninitialized onlyOwner {
        if (token_ == address(0)) revert ZeroAddress();
        if (_assetState[token_].token == token_) revert DuplicateToken(token_);
        if (balance_ == 0) revert ZeroBalance();
        if (scale_ == 0) revert ZeroScale();
        if (fee_ >= ONE) revert TooLarge(fee_);

        string memory name_ = IERC20Metadata(token_).name();
        string memory symbol_ = IERC20Metadata(token_).symbol();
        uint8 decimals_ = IERC20Metadata(token_).decimals();
        if (decimals_ > 18) revert TooLarge(decimals_); // Contract supports 18 decimals or fewer
        if (decimals_ == 0) revert TooSmall(decimals_);

        _payTokenToPool(_msgSender(), token_, balance_);

        _poolState.balance += scale_;
        _poolState.scale += scale_;

        uint256 conversion_ = 10 ** (18 - decimals_);
        balance_ *= conversion_; // Convert to canonical
        AssetState memory asset_ = _assetState[token_] = AssetState(
            token_,
            _assetAddresses.length,
            name_,
            symbol_,
            decimals_,
            conversion_,
            fee_,
            balance_,
            scale_,
            0
        );
        _assetState[token_] = asset_;
        if (token_ == _wrappedNativeAddress) {
            _assetState[address(0)] = asset_;
        }
        _assetAddresses.push(token_);
        emit AssetAdded(token_, fee_, balance_, scale_);
    }

    function removeAsset(address token) public onlyUninitialized onlyOwner {
        if (token == address(0)) revert ZeroAddress();
        AssetState storage asset_ = _assetState[token];
        if (asset_.decimals == 0) revert AssetNotFound(token);

        uint256 balance = IERC20(token).balanceOf(address(this));

        _payTokenToSender(_msgSender(), token, balance);

        uint256 scale_ = asset_.scale;
        _poolState.balance -= scale_;
        _poolState.scale -= scale_;

        uint256 index_ = asset_.index;
        uint256 lastIndex_ = _assetAddresses.length - 1;

        if (index_ != lastIndex_) {
            _assetAddresses[index_] = _assetAddresses[lastIndex_];
            _assetState[_assetAddresses[index_]].index = index_;
        }
        _assetAddresses.pop();

        delete _assetState[token];
        if (token == _wrappedNativeAddress) {
            delete _assetState[address(0)];
        }
        emit AssetRemoved(token);
    }

    function setTau(uint256 tau) public onlyUninitialized onlyOwner {
        if (tau >= ONE) revert TooLarge(tau);
        _poolState.omega = int256(ONE - tau);
    }

    function initialize() public onlyUninitialized onlyOwner {
        _isInitialized = 1;

        _mint(_msgSender(), _poolState.scale);
        emit Initialized(_poolState.token);
    }

    function txCount() public view returns (uint256) {
        return _txCount;
    }

    function isInitialized() public view returns (bool) {
        return _isInitialized == 1;
    }

    function info() public view returns (PoolState memory) {
        return _poolState;
    }

    function assets() public view returns (AssetState[] memory) {
        AssetState[] memory assets_ = new AssetState[](_assetAddresses.length);

        for (uint256 i; i < _assetAddresses.length; i++) {
            assets_[i] = asset(_assetAddresses[i]);
        }

        return assets_;
    }

    function assetAddresses() public view returns (address[] memory) {
        return _assetAddresses;
    }

    function asset(address token) public view returns (AssetState memory) {
        if (_assetState[token].decimals == 0) revert AssetNotFound(token);
        return _assetState[token];
    }

    function isPaused() public view returns (bool) {
        return _tradingPaused;
    }

    function _userAssetBalance(address token) internal view returns (uint256) {
        if (token == address(0) || token == _wrappedNativeAddress) {
            return
                _msgSender().balance +
                IERC20(_wrappedNativeAddress).balanceOf(_msgSender());
        }
        return IERC20(token).balanceOf(_msgSender());
    }

    function _updateAssetBalance(
        address token,
        uint256 increaseAmount,
        uint256 decreaseAmount
    ) private {
        AssetState storage asset_ = _assetState[token];
        if (asset_.decimals == 0) revert AssetNotFound(token);
        asset_.balance += increaseAmount;
        asset_.balance -= decreaseAmount;
        asset_.lastUpdated = _txCount;
        emit BalanceUpdate(_txCount, token, asset_.balance);
    }

    function _updatePoolBalance() private {
        _poolState.tokensPerShare = _tokensPerShare;
        _poolState.balance = _totalTokens;
        _poolState.lastUpdated = _txCount;
        emit BalanceUpdate(_txCount, address(this), _poolState.balance);
    }

    function _checkUser(address user_) private view {
        if (user_ == address(0)) revert ZeroAddress();
        if (_isBlocked[user_]) revert UserNotAllowed(user_);
    }

    function _checkDuplicateTokens(
        address[] memory tokens,
        bool[] memory check_,
        bool isLP
    ) private view returns (bool) {
        for (uint256 i; i < tokens.length; i++) {
            address token = tokens[i];
            if (address(this) == token) {
                if (isLP) revert DuplicateToken(token);
                if (i != 0) revert LPTokenFirst();
                isLP = true;
                continue;
            }
            AssetState memory asset_ = _assetState[token];
            if (asset_.decimals == 0) revert AssetNotFound(token);
            if (check_[asset_.index]) revert DuplicateToken(token);
            check_[asset_.index] = true;
        }
        return isLP;
    }

    struct Order {
        address token;
        uint256 amount;
    }

    function _checkInvariant(
        Order[] memory payOrders,
        Order[] memory receiveOrders
    ) private {
        // Determine final balances
        address token;
        for (uint256 i; i < payOrders.length; i++) {
            token = payOrders[i].token;
            if (token == address(this)) {
                _poolState.balance -= payOrders[i].amount;
            } else {
                AssetState storage asset_ = _assetState[token];
                if (asset_.decimals == 0) revert AssetNotFound(token);
                asset_.balance += payOrders[i].amount;
            }
        }
        for (uint256 i; i < receiveOrders.length; i++) {
            token = receiveOrders[i].token;
            if (token == address(this)) {
                _poolState.balance += receiveOrders[i].amount;
            } else {
                AssetState storage asset_ = _assetState[token];
                if (asset_.decimals == 0) revert AssetNotFound(token);
                asset_.balance -= receiveOrders[i].amount;
            }
        }

        // Determine value in
        uint256 valueIn;
        for (uint256 i; i < payOrders.length; i++) {
            token = payOrders[i].token;
            if (token == address(this)) {
                valueIn += _poolState.scale.fullMulDiv(
                    payOrders[i].amount,
                    _poolState.balance
                );
            } else {
                AssetState memory asset_ = _assetState[token];
                valueIn += asset_.scale.fullMulDiv(
                    payOrders[i].amount,
                    asset_.balance
                );
            }
        }

        // Determine value out
        uint256 valueOut;
        for (uint256 i; i < receiveOrders.length; i++) {
            token = receiveOrders[i].token;
            if (token == address(this)) {
                valueOut += _poolState.scale.fullMulDiv(
                    receiveOrders[i].amount,
                    _poolState.balance
                );
            } else {
                AssetState memory asset_ = _assetState[token];
                valueOut += asset_.scale.fullMulDiv(
                    receiveOrders[i].amount,
                    asset_.balance
                );
            }
        }

        if (valueIn < valueOut) revert InvariantViolation(valueIn, valueOut);
    }

    function multiswap(
        Order[] memory payOrders,
        Order[] memory receiveOrders,
        address sender //, bytes calldata data
    ) public nonReentrant onlyInitialized {
        _checkInvariant(payOrders, receiveOrders);

        for (uint256 i; i < receiveOrders.length; i++) {
            if (receiveOrders[i].amount == 0) continue;
            _payTokenToSender(
                sender,
                receiveOrders[i].token,
                receiveOrders[i].amount
            );
        }

        // Flashloan here

        for (uint256 i; i < payOrders.length; i++) {
            if (payOrders[i].amount == 0) continue;
            _payTokenToPool(sender, payOrders[i].token, payOrders[i].amount);
        }
    }

    function _liquidate(
        address receiver
    ) private returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        receiveAmounts = new uint256[](_assetAddresses.length);

        // Burn all LP tokens
        _burn(receiver, totalSupply());
        emit BalanceUpdate(_txCount, address(this), 0);

        for (uint256 i; i < _assetAddresses.length; i++) {
            address token = _assetAddresses[i];
            uint256 balance = IERC20(token).balanceOf(address(this));
            if (balance > 0) {
                SafeERC20.safeTransfer(IERC20(token), receiver, balance);
            }
            delete _assetState[token];
            receiveAmounts[i] = balance;
            emit BalanceUpdate(_txCount, token, 0);
        }

        _txCount = 0;
        _isInitialized = 0;
        _poolState.token = address(0);
        _poolState.name = "";
        _poolState.symbol = "";
        _poolState.decimals = 0;
        _poolState.omega = 0;
        _poolState.tokensPerShare = 0;
        _poolState.balance = 0;
        _poolState.scale = 0;
        _poolState.lastUpdated = 0;
        delete _assetAddresses;
        _tradingPaused = false;
        feeAmount = 0;
        renounceOwnership();

        emit PoolDisabled(_txCount, address(this));
    }

    function setIsAllowed(address user_, bool isAllowed_) public onlyOwner {
        if (_isBlocked[user_] == !isAllowed_) return;
        if (_isBlocked[user_] && isAllowed_) emit UserBlockLifted(user_);
        _isBlocked[user_] = !isAllowed_;
        if (!isAllowed_) {
            if (user_ == owner() || user_ == protocolFeeRecipient())
                revert CannotModify(user_);
            // if (balance > 0) {
            //     _removeLiquidity(
            //         user_,
            //         balance,
            //         new uint256[](_assetAddresses.length)
            //     );
            // }
            _discount[user_] = 0;
            emit UserBlocked(user_);
        }
    }

    function pauseTrading() public onlyOwner {
        _tradingPaused = true;
        emit TradingPaused();
    }

    function resumeTrading() public onlyOwner {
        _tradingPaused = false;
        emit TradingResumed();
    }

    function _approveTokenIfNeeded(
        address token,
        address _to,
        uint256 _amount
    ) internal {
        if (IERC20(token).allowance(address(this), _to) < _amount) {
            IERC20(token).approve(_to, type(uint256).max);
        }
    }

    function _wrap(uint256 amount) internal {
        IWrappedNative(_wrappedNativeAddress).deposit{value: amount}();
    }

    function _unwrap(uint256 amount) internal {
        _approveTokenIfNeeded(
            _wrappedNativeAddress,
            _wrappedNativeAddress,
            amount
        );
        IWrappedNative(_wrappedNativeAddress).withdraw(amount);
    }

    receive() external payable {}
}
