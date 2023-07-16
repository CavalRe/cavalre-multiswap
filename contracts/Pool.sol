// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {LPToken, FixedPointMathLib, IERC20, IERC20Metadata} from "@cavalre/LPToken.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

struct PoolState {
    address token;
    string name;
    string symbol;
    uint8 decimals;
    int256 tau;
    uint256 balance;
    uint256 meanBalance;
    uint256 scale;
    uint256 meanScale;
    uint256 lastUpdated;
}

struct AssetState {
    address token;
    uint256 index;
    string name;
    string symbol;
    uint8 decimals;
    uint256 fee;
    uint256 balance;
    uint256 meanBalance;
    uint256 scale;
    uint256 meanScale;
    uint256 lastUpdated;
}

contract Pool is LPToken {
    using SafeERC20 for IERC20;
    using FixedPointMathLib for uint256;
    using FixedPointMathLib for int256;

    uint256 private _txCount;

    uint256 private _isInitialized;

    modifier onlyInitialized() {
        if (_isInitialized == 0) revert NotInitialized();
        _;
    }

    modifier onlyUninitialized() {
        if (_isInitialized == 1) revert AlreadyInitialized();
        _;
    }

    PoolState private _poolState;

    mapping(address => AssetState) private _assetState;
    address[] private _assetAddress;

    event Multiswap(
        address indexed user,
        address[] payTokens,
        address[] receiveTokens,
        uint256[] payAmounts,
        uint256[] receiveAmounts,
        uint256 feeAmount
    );

    event Swap(
        address indexed user,
        address payToken,
        address receiveToken,
        uint256 payAmount,
        uint256 receiveAmount,
        uint256 feeAmount
    );

    event Stake(
        address indexed user,
        address payToken,
        uint256 payAmount,
        uint256 receiveAmount
    );

    event Unstake(
        address indexed user,
        address receiveToken,
        uint256 payAmount,
        uint256 receiveAmount,
        uint256 feeAmount
    );

    event AddLiquidity(
        address indexed user,
        uint256[] payAmounts,
        uint256 receiveAmount
    );

    event RemoveLiquidity(
        address indexed user,
        uint256 payAmount,
        uint256[] receiveAmounts,
        uint256 feeAmount
    );

    error AlreadyInitialized();

    error AssetNotFound(address asset);

    error DuplicateToken(address payToken);

    error IncorrectAllocation(uint256 expected, uint256 actual);

    error InvalidStake(address payToken);

    error InvalidSwap(address payToken, address receiveToken);

    error InvalidUnstake(address receiveToken);

    error LengthMismatch(uint256 expected, uint256 actual);

    error NotInitialized();

    error TooLarge(uint256 size);

    error ZeroBalance();

    error ZeroLength();

    error ZeroScale();

    constructor(
        string memory name,
        string memory symbol,
        int256 tau
    ) LPToken(name, symbol) {
        _poolState.token = address(this);
        _poolState.name = name;
        _poolState.symbol = symbol;
        _poolState.decimals = 18;
        _poolState.tau = tau;
    }

    function fromCanonical(
        uint256 amount,
        uint8 decimals
    ) private pure returns (uint256) {
        if (decimals == 18) return amount;
        if (decimals < 18) return amount / (10 ** (18 - decimals));
        return amount * (10 ** (decimals - 18));
    }

    function addAsset(
        address payToken_,
        uint256 balance_,
        uint256 fee_,
        uint256 assetScale_
    ) public onlyUninitialized onlyOwner {
        if (payToken_ == address(0)) revert ZeroAddress();
        if (_assetState[payToken_].token == payToken_)
            revert DuplicateToken(payToken_);
        if (balance_ == 0) revert ZeroBalance();
        if (assetScale_ == 0) revert ZeroScale();

        _poolState.balance += assetScale_;
        _poolState.meanBalance += assetScale_;
        _poolState.scale += assetScale_;
        _poolState.meanScale += assetScale_;

        uint8 decimals_ = IERC20Metadata(payToken_).decimals();

        SafeERC20.safeTransferFrom(
            IERC20(payToken_),
            _msgSender(),
            address(this),
            fromCanonical(balance_, decimals_)
        );

        _assetState[payToken_] = AssetState(
            payToken_,
            _assetAddress.length,
            IERC20Metadata(payToken_).name(),
            IERC20Metadata(payToken_).symbol(),
            decimals_,
            fee_,
            balance_,
            balance_,
            assetScale_,
            assetScale_,
            0
        );
        _assetAddress.push(payToken_);
    }

    function removeAsset(address token) public onlyUninitialized onlyOwner {
        if (token == address(0)) revert ZeroAddress();
        AssetState storage asset_ = _assetState[token];
        if (asset_.token != token) revert AssetNotFound(token);

        uint256 assetScale_ = asset_.scale;

        _poolState.balance -= assetScale_;
        _poolState.meanBalance -= assetScale_;
        _poolState.scale -= assetScale_;
        _poolState.meanScale -= assetScale_;

        delete _assetState[token];

        SafeERC20.safeTransfer(
            IERC20(token),
            owner(),
            fromCanonical(asset_.balance, asset_.decimals)
        );

        uint256 index_ = asset_.index;
        uint256 lastIndex_ = _assetAddress.length - 1;

        if (index_ != lastIndex_) {
            _assetAddress[index_] = _assetAddress[lastIndex_];
            _assetState[_assetAddress[index_]].index = index_;
        }
        _assetAddress.pop();
    }

    function initialize() public onlyUninitialized onlyOwner {
        _isInitialized = 1;

        mint(_msgSender(), _poolState.scale);
    }

    function info() public view returns (PoolState memory) {
        return _poolState;
    }

    function assets() public view returns (AssetState[] memory) {
        AssetState[] memory assets_ = new AssetState[](_assetAddress.length);

        for (uint256 i; i < _assetAddress.length; i++) {
            assets_[i] = asset(_assetAddress[i]);
        }

        return assets_;
    }

    function asset(address token) public view returns (AssetState memory) {
        if (token == address(0)) revert ZeroAddress();
        if (_assetState[token].token != token) revert AssetNotFound(token);
        return _assetState[token];
    }

    function _geometricMean(
        uint256 newValue,
        uint256 lastValue,
        uint256 lastMean,
        uint256 lastUpdated
    ) private view returns (uint256) {
        int256 delta = int256(_txCount - lastUpdated);
        int256 tau = _poolState.tau;
        if (delta == 0) return lastMean;
        if (delta == 1) {
            return
                newValue.mulWadUp(
                    uint256(int256(lastMean.divWadUp(newValue)).powWad(tau))
                );
        } else {
            int256 exp = tau.powWad(delta);
            return
                newValue
                    .mulWadUp(
                        uint256(
                            int256(lastMean.divWadUp(lastValue)).powWad(exp)
                        )
                    )
                    .mulWadUp(
                        uint256(
                            int256(lastValue.divWadUp(newValue)).powWad(tau)
                        )
                    );
        }
    }

    function _updateAssetBalance(
        address token,
        uint256 increaseAmount,
        uint256 decreaseAmount
    ) private {
        if (token == address(0)) revert ZeroAddress();
        AssetState storage asset_ = _assetState[token];
        if (asset_.token != token) revert AssetNotFound(token);
        uint256 lastBalance = asset_.balance;
        asset_.balance += increaseAmount;
        asset_.balance -= decreaseAmount;
        asset_.meanBalance = _geometricMean(
            asset_.balance,
            lastBalance,
            asset_.meanBalance,
            asset_.lastUpdated
        );
        asset_.lastUpdated = _txCount;
    }

    function _updatePoolBalance() private {
        uint256 lastPoolBalance = _poolState.balance;
        _poolState.balance = totalSupply();
        _poolState.meanBalance = _geometricMean(
            _poolState.balance,
            lastPoolBalance,
            _poolState.meanBalance,
            _poolState.lastUpdated
        );
        _poolState.lastUpdated = _txCount;
    }

    function _multiswap(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations
    )
        private
        onlyOnce
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        _txCount++;

        receiveAmounts = new uint256[](receiveTokens.length);

        // Compute fee
        uint256 fee;
        {
            for (uint256 i; i < receiveTokens.length; i++) {
                fee += allocations[i].mulWadUp(
                    _assetState[receiveTokens[i]].fee
                );
            }
            uint256 discount_ = user(_msgSender()).discount;
            if (fee > 0 && discount_ > 0) {
                fee = fee.mulWadUp(ONE - discount_);
            }
        }
        uint256 gamma = ONE - fee;

        // Compute scaledValueIn
        uint256 scaledValueIn;
        uint256 poolOut;
        {
            // Contribution from assets only
            for (uint256 i; i < payTokens.length; i++) {
                address token_ = payTokens[i];
                uint256 amount_ = amounts[i];
                if (token_ != address(this)) {
                    AssetState storage assetIn = _assetState[token_];
                    scaledValueIn += assetIn.scale.fullMulDiv(
                        amount_,
                        assetIn.balance + amount_
                    );
                }
            }

            uint256 poolAlloc = fee;
            if (receiveTokens[0] == address(this)) {
                poolAlloc += allocations[0].mulWadUp(gamma);
            }
            uint256 lastPoolBalance = _poolState.balance;
            uint256 scaledPoolOut = scaledValueIn.mulWadUp(poolAlloc);
            if (payTokens[0] == address(this)) {
                uint256 poolIn = amounts[0];
                poolOut = poolAlloc.fullMulDiv(
                    scaledValueIn.mulWadUp(lastPoolBalance - poolIn) +
                        _poolState.scale.mulWadUp(poolIn),
                    _poolState.scale - scaledPoolOut
                );
                scaledValueIn += _poolState.scale.fullMulDiv(
                    poolIn,
                    lastPoolBalance + poolOut - poolIn
                );
                feeAmount = poolOut;
            } else {
                poolOut = lastPoolBalance.fullMulDiv(
                    scaledPoolOut,
                    _poolState.scale - scaledPoolOut
                );
                feeAmount = poolOut.fullMulDiv(fee, poolAlloc);
            }
        }

        // Compute receiveAmounts
        {
            uint256 scaledValueOut;

            address receiveToken;
            uint256 allocation;
            for (uint256 i; i < receiveTokens.length; i++) {
                receiveToken = receiveTokens[i];
                allocation = allocations[i].mulWadUp(gamma);
                scaledValueOut = scaledValueIn.mulWadUp(allocation);
                if (receiveToken == address(this)) {
                    receiveAmounts[i] = poolOut - feeAmount;
                } else {
                    AssetState storage assetOut = _assetState[receiveToken];
                    receiveAmounts[i] = assetOut.balance.fullMulDiv(
                        scaledValueOut,
                        assetOut.scale + scaledValueOut
                    );
                }
            }
        }

        // Distribute fee
        distributeFee(feeAmount);

        // Transfer tokens to the pool
        for (uint256 i; i < payTokens.length; i++) {
            address payToken = payTokens[i];
            uint256 amount = amounts[i];
            if (payToken == address(this)) {
                burn(_msgSender(), amount);
            } else {
                _updateAssetBalance(payToken, amount, 0);

                SafeERC20.safeTransferFrom(
                    IERC20(payToken),
                    _msgSender(),
                    address(this),
                    fromCanonical(amount, IERC20Metadata(payToken).decimals())
                );
            }
        }

        // Transfer tokens to the receiving address
        for (uint256 i; i < receiveTokens.length; i++) {
            address receiveToken = receiveTokens[i];
            uint256 amountOut = receiveAmounts[i];
            // Update _balance and asset balances.
            if (receiveToken == address(this)) {
                mint(_msgSender(), amountOut);
            } else {
                _updateAssetBalance(receiveToken, 0, amountOut);

                SafeERC20.safeTransfer(
                    IERC20(receiveToken),
                    _msgSender(),
                    fromCanonical(
                        amountOut,
                        IERC20Metadata(receiveToken).decimals()
                    )
                );
            }
        }
        _updatePoolBalance();
    }

    function checkDuplicateTokens(
        address[] memory tokens,
        uint256[] memory tokenValues,
        bool[] memory check_,
        bool isLP
    ) private view returns (bool) {
        uint256 temp;
        for (uint256 i = 0; i < tokens.length; i++) {
            address token = tokens[i];
            if (token == address(0)) revert ZeroAddress();
            if (address(this) == token) {
                if (isLP) revert DuplicateToken(token);
                isLP = true;
                if (i != 0) {
                    tokens[i] = tokens[0];
                    tokens[0] = address(this);
                    temp = tokenValues[i];
                    tokenValues[i] = tokenValues[0];
                    tokenValues[0] = temp;
                }
                continue;
            }
            AssetState memory asset_ = _assetState[token];
            if (asset_.token != token) revert AssetNotFound(token);
            if (check_[asset_.index]) revert DuplicateToken(token);
            check_[asset_.index] = true;
        }
        return isLP;
    }

    function multiswap(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations
    )
        public
        onlyInitialized
        onlyAllowed
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        // Check lengths
        {
            if (payTokens.length == 0) revert ZeroLength();
            if (receiveTokens.length == 0) revert ZeroLength();
            if (payTokens.length != amounts.length)
                revert LengthMismatch(payTokens.length, amounts.length);
            if (receiveTokens.length != allocations.length)
                revert LengthMismatch(receiveTokens.length, allocations.length);
        }
        // Check duplicates
        {
            bool isLP;
            bool[] memory check_ = new bool[](_assetAddress.length);
            isLP = checkDuplicateTokens(payTokens, amounts, check_, isLP);
            isLP = checkDuplicateTokens(
                receiveTokens,
                allocations,
                check_,
                isLP
            );
        }
        // Check allocations
        {
            uint256 totalAllocation;
            for (uint256 i; i < allocations.length; i++) {
                totalAllocation += allocations[i];
            }
            if (totalAllocation != 1e18)
                revert IncorrectAllocation(1e18, totalAllocation);
        }
        // Check size
        {
            for (uint256 i; i < payTokens.length; i++) {
                address payToken = payTokens[i];
                uint256 balance_;
                if (payToken == address(this)) {
                    balance_ = _poolState.balance;
                } else {
                    balance_ = _assetState[payToken].balance;
                }
                if (amounts[i] * 3 > balance_) revert TooLarge(amounts[i]);
            }
        }

        (receiveAmounts, feeAmount) = _multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );

        emit Multiswap(
            _msgSender(),
            payTokens,
            receiveTokens,
            amounts,
            receiveAmounts,
            feeAmount
        );
    }

    function swap(
        address payToken,
        address receiveToken,
        uint256 payAmount
    )
        public
        onlyInitialized
        onlyAllowed
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        if (payToken == address(0)) revert ZeroAddress();
        if (receiveToken == address(0)) revert ZeroAddress();
        if (payToken == address(this))
            revert InvalidSwap(payToken, receiveToken);
        if (receiveToken == address(this))
            revert InvalidSwap(payToken, receiveToken);
        if (payToken == receiveToken) revert DuplicateToken(payToken);
        if (_assetState[payToken].token != payToken)
            revert AssetNotFound(payToken);
        if (_assetState[receiveToken].token != receiveToken)
            revert AssetNotFound(receiveToken);

        if (payAmount * 3 > _assetState[payToken].balance)
            revert TooLarge(payAmount);

        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](1);
        uint256[] memory allocations = new uint256[](1);
        uint256[] memory receiveAmounts = new uint256[](1);

        payTokens[0] = payToken;
        amounts[0] = payAmount;
        receiveTokens[0] = receiveToken;
        allocations[0] = 1e18;

        (receiveAmounts, feeAmount) = _multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );

        receiveAmount = receiveAmounts[0];

        emit Swap(
            _msgSender(),
            payToken,
            receiveToken,
            payAmount,
            receiveAmount,
            feeAmount
        );
    }

    function stake(
        address payToken,
        uint256 payAmount
    )
        public
        onlyInitialized
        onlyAllowed
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        if (payToken == address(0)) revert ZeroAddress();
        if (payToken == address(this)) revert InvalidStake(payToken);
        if (_assetState[payToken].token != payToken)
            revert AssetNotFound(payToken);
        if (payAmount * 3 > _assetState[payToken].balance)
            revert TooLarge(payAmount);

        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](1);
        uint256[] memory allocations = new uint256[](1);
        uint256[] memory receiveAmounts = new uint256[](1);

        payTokens[0] = payToken;
        amounts[0] = payAmount;
        receiveTokens[0] = address(this);
        allocations[0] = 1e18;

        (receiveAmounts, feeAmount) = _multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );

        receiveAmount = receiveAmounts[0];

        emit Stake(_msgSender(), payToken, payAmount, receiveAmount);
    }

    function unstake(
        address receiveToken,
        uint256 payAmount
    )
        public
        onlyInitialized
        onlyAllowed
        returns (uint256 receiveAmount, uint256 feeAmount)
    {
        if (receiveToken == address(0)) revert ZeroAddress();
        if (receiveToken == address(this)) revert InvalidUnstake(receiveToken);
        if (_assetState[receiveToken].token != receiveToken)
            revert AssetNotFound(receiveToken);
        if (payAmount * 3 > _poolState.balance) revert TooLarge(payAmount);

        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](1);
        uint256[] memory allocations = new uint256[](1);
        uint256[] memory receiveAmounts = new uint256[](1);

        payTokens[0] = address(this);
        amounts[0] = payAmount;
        receiveTokens[0] = receiveToken;
        allocations[0] = 1e18;

        (receiveAmounts, feeAmount) = _multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );

        receiveAmount = receiveAmounts[0];

        emit Unstake(
            _msgSender(),
            receiveToken,
            payAmount,
            receiveAmount,
            feeAmount
        );
    }

    function addLiquidity(
        address token,
        uint256 amount
    ) public onlyInitialized onlyAllowed onlyOnce returns (uint256) {
        _txCount++;

        AssetState storage assetIn;
        uint256 g;
        uint256 amountOut;
        uint256[] memory payAmounts = new uint256[](_assetAddress.length);
        if (token == address(this)) {
            g = (_poolState.balance + amount).divWadUp(_poolState.balance);
            amountOut = amount;
        } else {
            if (token == address(0)) revert ZeroAddress();
            assetIn = _assetState[token];
            if (assetIn.token != token) revert AssetNotFound(token);
            g = (assetIn.balance + amount).divWadUp(assetIn.balance);
            amountOut = _poolState.balance.mulWadUp(g) - _poolState.balance;
        }
        for (uint256 i; i < _assetAddress.length; i++) {
            assetIn = _assetState[_assetAddress[i]];
            uint256 amountIn;
            if (assetIn.token == token) {
                amountIn = amount;
            } else {
                amountIn = assetIn.balance.mulWadUp(g) - assetIn.balance;
            }
            payAmounts[i] = amountIn;
            _updateAssetBalance(_assetAddress[i], amountIn, 0);

            SafeERC20.safeTransferFrom(
                IERC20(assetIn.token),
                _msgSender(),
                address(this),
                fromCanonical(amount, IERC20Metadata(assetIn.token).decimals())
            );
        }

        mint(_msgSender(), amountOut);
        _updatePoolBalance();

        emit AddLiquidity(_msgSender(), payAmounts, amountOut);

        return amountOut;
    }

    function removeLiquidity(
        uint256 amount
    )
        public
        onlyInitialized
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        uint256 n = _assetAddress.length;
        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](n);
        uint256[] memory allocations = new uint256[](n);
        receiveAmounts = new uint256[](n);

        payTokens[0] = address(this);
        amounts[0] = amount;
        receiveTokens = _assetAddress;
        uint256 allocation;
        uint256 totalAllocation;
        for (uint256 i; i < n - 1; i++) {
            allocation = _assetState[_assetAddress[i]].scale.divWadUp(
                _poolState.scale
            );
            allocations[i] = allocation;
            totalAllocation += allocation;
        }
        allocations[n - 1] = 1e18 - totalAllocation;

        (receiveAmounts, feeAmount) = _multiswap(
            payTokens,
            amounts,
            receiveTokens,
            allocations
        );
        emit RemoveLiquidity(_msgSender(), amount, receiveAmounts, feeAmount);
    }
}
