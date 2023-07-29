// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {LPToken, UserState, FixedPointMathLib, IERC20, IERC20Metadata} from "@cavalre/LPToken.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

struct PoolState {
    address token;
    string name;
    string symbol;
    uint8 decimals;
    int256 w;
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

contract Pool is LPToken, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using FixedPointMathLib for uint256;
    using FixedPointMathLib for int256;

    uint256 private _txCount;

    uint256 private _isInitialized;

    PoolState private _poolState;

    mapping(address => AssetState) private _assetState;
    address[] private _assetAddress;

    event BalanceUpdate(
        uint256 indexed txCount,
        address indexed token,
        uint256 balance,
        uint256 meanBalance
    );

    event Multiswap(
        uint256 indexed txCount,
        address indexed user,
        address[] payTokens,
        address[] receiveTokens,
        uint256[] payAmounts,
        uint256[] receiveAmounts,
        uint256 feeAmount
    );

    event Swap(
        uint256 indexed txCount,
        address indexed user,
        address payToken,
        address receiveToken,
        uint256 payAmount,
        uint256 receiveAmount,
        uint256 feeAmount
    );

    event Stake(
        uint256 indexed txCount,
        address indexed user,
        address payToken,
        uint256 payAmount,
        uint256 receiveAmount
    );

    event Unstake(
        uint256 indexed txCount,
        address indexed user,
        address receiveToken,
        uint256 payAmount,
        uint256 receiveAmount,
        uint256 feeAmount
    );

    event AddLiquidity(
        uint256 indexed txCount,
        address indexed user,
        uint256[] payAmounts,
        uint256 receiveAmount
    );

    event RemoveLiquidity(
        uint256 indexed txCount,
        address indexed user,
        uint256 payAmount,
        uint256[] receiveAmounts,
        uint256 feeAmount
    );

    error AlreadyInitialized();

    error AssetNotFound(address asset);

    error DuplicateToken(address payToken);

    error IncorrectAllocation(uint256 expected, uint256 actual);

    error InsufficientOutputAmount(uint256 expected, uint256 actual);

    error InvalidStake(address payToken);

    error InvalidSwap(address payToken, address receiveToken);

    error InvalidUnstake(address receiveToken);

    error LengthMismatch(uint256 expected, uint256 actual);

    error LPTokenFirst();

    error NotInitialized();

    error OnlyOneTransaction(address user_);

    error TooLarge(uint256 size);

    error ZeroAllocation();

    error ZeroAmount();

    error ZeroBalance();

    error ZeroLength();

    error ZeroScale();

    modifier onlyInitialized() {
        if (_isInitialized == 0) revert NotInitialized();
        _;
    }

    modifier onlyOnce() {
        address userAddress_ = _msgSender();
        if (_userIndex[userAddress_] == 0) {
            addUser(userAddress_, 0);
        }
        UserState storage user_ = _userList[_userIndex[userAddress_] - 1];
        if (block.number == user_.lastBlock)
            revert OnlyOneTransaction(userAddress_);
        user_.lastBlock = block.number;
        _;
    }

    modifier onlyUninitialized() {
        if (_isInitialized == 1) revert AlreadyInitialized();
        _;
    }

    constructor(
        string memory name,
        string memory symbol,
        uint256 tau
    ) LPToken(name, symbol) {
        if (tau >= ONE) revert TooLarge(tau);
        _poolState.token = address(this);
        _poolState.name = name;
        _poolState.symbol = symbol;
        _poolState.decimals = 18;
        _poolState.w = int256(ONE - tau);

        addUser(_msgSender(), 0);
    }

    function fromCanonical(
        uint256 amount,
        uint8 decimals
    ) internal pure returns (uint256) {
        if (decimals == 18) return amount;
        if (decimals < 18) return amount / (10 ** (18 - decimals));
        return amount * (10 ** (decimals - 18));
    }

    function addAsset(
        address token_,
        uint256 balance_,
        uint256 fee_,
        uint256 scale_
    ) public onlyUninitialized onlyOwner {
        if (token_ == address(0)) revert ZeroAddress();
        if (_assetState[token_].token == token_) revert DuplicateToken(token_);
        if (balance_ == 0) revert ZeroBalance();
        if (scale_ == 0) revert ZeroScale();
        if (fee_ >= ONE) revert TooLarge(fee_);

        _poolState.balance += scale_;
        _poolState.meanBalance += scale_;
        _poolState.scale += scale_;
        _poolState.meanScale += scale_;

        uint8 decimals_ = IERC20Metadata(token_).decimals();

        SafeERC20.safeTransferFrom(
            IERC20(token_),
            _msgSender(),
            address(this),
            fromCanonical(balance_, decimals_)
        );

        _assetState[token_] = AssetState(
            token_,
            _assetAddress.length,
            IERC20Metadata(token_).name(),
            IERC20Metadata(token_).symbol(),
            decimals_,
            fee_,
            balance_,
            balance_,
            scale_,
            scale_,
            0
        );
        _assetAddress.push(token_);
    }

    function removeAsset(address token) public onlyUninitialized onlyOwner {
        if (token == address(0)) revert ZeroAddress();
        AssetState storage asset_ = _assetState[token];
        if (asset_.token != token) revert AssetNotFound(token);

        uint256 scale_ = asset_.scale;

        _poolState.balance -= scale_;
        _poolState.meanBalance -= scale_;
        _poolState.scale -= scale_;
        _poolState.meanScale -= scale_;

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

        delete _assetState[token];
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
        uint256 delta
    ) internal view returns (uint256) {
        int256 w = _poolState.w;
        if (delta == 0) return lastMean;
        if (delta == 1) {
            return
                newValue.mulWadUp(
                    uint256(int256(lastMean.divWadUp(newValue)).powWad(w))
                );
        } else {
            int256 exp = w.powWad(int256(delta * ONE));
            return
                newValue
                    .mulWadUp(
                        uint256(
                            int256(lastMean.divWadUp(lastValue)).powWad(exp)
                        )
                    )
                    .mulWadUp(
                        uint256(int256(lastValue.divWadUp(newValue)).powWad(w))
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
            _txCount - asset_.lastUpdated
        );
        asset_.lastUpdated = _txCount;
        emit BalanceUpdate(_txCount, token, asset_.balance, asset_.meanBalance);
    }

    function _updatePoolBalance() private {
        uint256 lastPoolBalance = _poolState.balance;
        _poolState.balance = totalSupply();
        _poolState.meanBalance = _geometricMean(
            _poolState.balance,
            lastPoolBalance,
            _poolState.meanBalance,
            _txCount - _poolState.lastUpdated
        );
        _poolState.lastUpdated = _txCount;
        emit BalanceUpdate(
            _txCount,
            address(this),
            _poolState.balance,
            _poolState.meanBalance
        );
    }

    function _checkDuplicateTokens(
        address[] memory tokens,
        bool[] memory check_,
        bool isLP
    ) private view returns (bool) {
        for (uint256 i; i < tokens.length; i++) {
            address token = tokens[i];
            if (token == address(0)) revert ZeroAddress();
            if (address(this) == token) {
                if (isLP) revert DuplicateToken(token);
                if (i != 0) revert LPTokenFirst();
                isLP = true;
                continue;
            }
            AssetState memory asset_ = _assetState[token];
            if (asset_.token != token) revert AssetNotFound(token);
            if (check_[asset_.index]) revert DuplicateToken(token);
            check_[asset_.index] = true;
        }
        return isLP;
    }

    function _multiswap(
        address sender,
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations,
        uint256[] memory minReceiveAmounts
    )
        private
        onlyOnce
        nonReentrant
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        _txCount++;

        receiveAmounts = new uint256[](receiveTokens.length);

        {
            // Compute fee
            uint256 fee;
            {
                for (uint256 i; i < receiveTokens.length; i++) {
                    fee += allocations[i].mulWadUp(
                        _assetState[receiveTokens[i]].fee
                    );
                }
                uint256 discount_ = user(sender).discount;
                if (fee > 0 && discount_ > 0) {
                    fee = fee.mulWadUp(ONE - discount_);
                }
            }

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
                    poolAlloc += allocations[0].mulWadUp(ONE - fee);
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
                    if (poolAlloc > 0) {
                        feeAmount = poolOut.fullMulDiv(fee, poolAlloc);
                    }
                }
            }

            // Compute receiveAmounts
            {
                uint256 scaledValueOut;

                address receiveToken;
                uint256 allocation;
                for (uint256 i; i < receiveTokens.length; i++) {
                    receiveToken = receiveTokens[i];
                    allocation = allocations[i].mulWadUp(ONE - fee);
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
                    if (receiveAmounts[i] < minReceiveAmounts[i]) {
                        revert InsufficientOutputAmount(
                            minReceiveAmounts[i],
                            receiveAmounts[i]
                        );
                    }
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
                burn(sender, amount);
            } else {
                _updateAssetBalance(payToken, amount, 0);

                SafeERC20.safeTransferFrom(
                    IERC20(payToken),
                    sender,
                    address(this),
                    fromCanonical(amount, IERC20Metadata(payToken).decimals())
                );
            }
        }

        // Transfer tokens to the receiving address
        for (uint256 i; i < receiveTokens.length; i++) {
            address receiveToken = receiveTokens[i];
            uint256 receiveAmount = receiveAmounts[i];
            // Update _balance and asset balances.
            if (receiveToken == address(this)) {
                mint(sender, receiveAmount);
            } else {
                _updateAssetBalance(receiveToken, 0, receiveAmount);

                SafeERC20.safeTransfer(
                    IERC20(receiveToken),
                    sender,
                    fromCanonical(
                        receiveAmount,
                        IERC20Metadata(receiveToken).decimals()
                    )
                );
            }
        }
        _updatePoolBalance();
    }

    function multiswap(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations,
        uint256[] memory minReceiveAmounts
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
            isLP = _checkDuplicateTokens(payTokens, check_, isLP);
            isLP = _checkDuplicateTokens(receiveTokens, check_, isLP);
        }
        // Check amounts
        {
            for (uint256 i; i < amounts.length; i++) {
                if (amounts[i] == 0) revert ZeroAmount();
            }
        }
        // Check allocations
        {
            uint256 totalAllocation;
            for (uint256 i; i < allocations.length; i++) {
                if (allocations[i] == 0) revert ZeroAllocation();
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

        address sender = _msgSender();

        (receiveAmounts, feeAmount) = _multiswap(
            sender,
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );

        emit Multiswap(
            _txCount,
            sender,
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
        uint256 payAmount,
        uint256 minReceiveAmount
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
        if (payAmount == 0) revert ZeroAmount();
        if (payAmount * 3 > _assetState[payToken].balance)
            revert TooLarge(payAmount);

        address sender = _msgSender();
        {
            address[] memory payTokens = new address[](1);
            uint256[] memory amounts = new uint256[](1);
            address[] memory receiveTokens = new address[](1);
            uint256[] memory allocations = new uint256[](1);
            uint256[] memory minReceiveAmounts = new uint256[](1);
            uint256[] memory receiveAmounts = new uint256[](1);

            payTokens[0] = payToken;
            amounts[0] = payAmount;
            receiveTokens[0] = receiveToken;
            allocations[0] = 1e18;
            minReceiveAmounts[0] = minReceiveAmount;

            (receiveAmounts, feeAmount) = _multiswap(
                sender,
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );

            receiveAmount = receiveAmounts[0];
        }

        emit Swap(
            _txCount,
            sender,
            payToken,
            receiveToken,
            payAmount,
            receiveAmount,
            feeAmount
        );
    }

    function stake(
        address payToken,
        uint256 payAmount,
        uint256 minReceiveAmount
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

        address sender = _msgSender();
        {
            address[] memory payTokens = new address[](1);
            uint256[] memory amounts = new uint256[](1);
            address[] memory receiveTokens = new address[](1);
            uint256[] memory allocations = new uint256[](1);
            uint256[] memory minReceiveAmounts = new uint256[](1);
            uint256[] memory receiveAmounts = new uint256[](1);

            payTokens[0] = payToken;
            amounts[0] = payAmount;
            receiveTokens[0] = address(this);
            allocations[0] = 1e18;
            minReceiveAmounts[0] = minReceiveAmount;

            (receiveAmounts, feeAmount) = _multiswap(
                sender,
                payTokens,
                amounts,
                receiveTokens,
                allocations,
                minReceiveAmounts
            );

            receiveAmount = receiveAmounts[0];
        }

        emit Stake(_txCount, sender, payToken, payAmount, receiveAmount);
    }

    function unstake(
        address receiveToken,
        uint256 payAmount,
        uint256 minReceiveAmount
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
        uint256[] memory minReceiveAmounts = new uint256[](1);
        uint256[] memory receiveAmounts = new uint256[](1);

        payTokens[0] = address(this);
        amounts[0] = payAmount;
        receiveTokens[0] = receiveToken;
        allocations[0] = 1e18;
        minReceiveAmounts[0] = minReceiveAmount;

        address sender = _msgSender();

        (receiveAmounts, feeAmount) = _multiswap(
            sender,
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );

        receiveAmount = receiveAmounts[0];

        emit Unstake(
            _txCount,
            sender,
            receiveToken,
            payAmount,
            receiveAmount,
            feeAmount
        );
    }

    function addLiquidity(
        address token,
        uint256 amount,
        uint256 minReceiveAmount
    )
        public
        onlyInitialized
        onlyAllowed
        onlyOnce
        nonReentrant
        returns (uint256)
    {
        _txCount++;

        AssetState storage assetIn;
        uint256 receiveAmount;
        uint256[] memory payAmounts = new uint256[](_assetAddress.length);
        if (token == address(0)) revert ZeroAddress();
        assetIn = _assetState[token];
        if (assetIn.token != token) revert AssetNotFound(token);
        uint256 g = (assetIn.balance + amount).divWadUp(assetIn.balance);
        receiveAmount = _poolState.balance.mulWadUp(g) - _poolState.balance;

        if (receiveAmount < minReceiveAmount)
            revert InsufficientOutputAmount(minReceiveAmount, receiveAmount);

        address sender = _msgSender();

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
                sender,
                address(this),
                fromCanonical(
                    amountIn,
                    IERC20Metadata(assetIn.token).decimals()
                )
            );
        }

        mint(sender, receiveAmount);
        _updatePoolBalance();

        emit AddLiquidity(_txCount, sender, payAmounts, receiveAmount);

        return receiveAmount;
    }

    function _removeLiquidity(
        address sender,
        uint256 amount,
        uint256[] memory minReceiveAmounts
    ) internal returns (uint256[] memory receiveAmounts, uint256 feeAmount) {
        uint256 n = _assetAddress.length;
        address[] memory payTokens = new address[](1);
        uint256[] memory amounts = new uint256[](1);
        address[] memory receiveTokens = new address[](n);
        uint256[] memory allocations = new uint256[](n);
        receiveAmounts = new uint256[](n);

        payTokens[0] = address(this);
        amounts[0] = amount;
        receiveTokens = _assetAddress;
        {
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
        }

        (receiveAmounts, feeAmount) = _multiswap(
            sender,
            payTokens,
            amounts,
            receiveTokens,
            allocations,
            minReceiveAmounts
        );

        emit RemoveLiquidity(
            _txCount,
            sender,
            amount,
            receiveAmounts,
            feeAmount
        );
    }

    function removeLiquidity(
        uint256 amount,
        uint256[] memory minReceiveAmounts
    )
        public
        onlyInitialized
        returns (uint256[] memory receiveAmounts, uint256 feeAmount)
    {
        (receiveAmounts, feeAmount) = _removeLiquidity(
            _msgSender(),
            amount,
            minReceiveAmounts
        );
    }

    function setAllowed(address user_, bool isAllowed_) public onlyOwner {
        if (_userIndex[user_] == 0) revert UserNotFound(user_);
        _userList[_userIndex[user_] - 1].isAllowed = isAllowed_;
        if (!isAllowed_ && _assetAddress.length > 0) {
            uint256 balance = balanceOf(user_);
            if (balance > 0)
                _removeLiquidity(
                    user_,
                    balance,
                    new uint256[](_assetAddress.length)
                );
        }
    }
}
