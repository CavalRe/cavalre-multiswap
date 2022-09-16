// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./libraries/DMath.sol";

struct AssetMeta {
    IERC20 token;
    string name;
    string symbol;
    uint8 decimals;
    uint256 fee;
}

struct AssetState {
    uint256 balance;
    uint256 scale;
    uint256 gamma;
}

struct Asset {
    AssetMeta meta;
    AssetState state;
}

struct PoolState {
    uint256 balance;
    uint256 scale;
}

contract Pool is ReentrancyGuard, ERC20, Ownable {
    using SafeERC20 for IERC20;
    using DMath for uint256;

    uint256 private _isInitialized;

    PoolState private _poolState;

    mapping(address => AssetMeta) private _assetMeta;
    mapping(address => AssetState) private _assetState;
    address[] private _addresses;

    error AlreadyInitialized();

    error NotInitialized();

    error LengthMismatch(uint256 expected, uint256 actual);

    error IncorrectAllocation(uint256 expected, uint256 actual);

    error DuplicateToken(address payToken);

    error InvalidSwap(address payToken, address receiveToken);

    error InvalidStake(address payToken);

    error InvalidUnstake(address receiveToken);

    error TooSmall(uint256 size);

    error TooLarge(uint256 size);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function fromCanonical(uint256 amount, uint8 decimals)
        internal
        pure
        returns (uint256)
    {
        if (decimals == 18) return amount;
        if (decimals < 18) return amount / (10**(18 - decimals));
        return amount * (10**(decimals - 18));
    }

    function addAsset(
        address payToken_,
        uint256 balance_,
        uint256 gamma_,
        uint256 assetScale_
    ) public nonReentrant onlyOwner {
        if (_isInitialized == 1) revert AlreadyInitialized();

        _poolState.balance += assetScale_;
        _poolState.scale += assetScale_;

        uint8 decimals_ = IERC20Metadata(payToken_).decimals();

        SafeERC20.safeTransferFrom(
            IERC20(payToken_),
            _msgSender(),
            address(this),
            fromCanonical(balance_, decimals_)
        );

        _addresses.push(payToken_);
        _assetMeta[payToken_] = AssetMeta(
            IERC20(payToken_),
            IERC20Metadata(payToken_).name(),
            IERC20Metadata(payToken_).symbol(),
            decimals_,
            DMath.ONE - gamma_.dmul(gamma_)
        );
        _assetState[payToken_] = AssetState(balance_, assetScale_, gamma_);
    }

    function uninitialize(address token) public nonReentrant onlyOwner {
        if (_isInitialized == 1) revert AlreadyInitialized();

        AssetMeta memory m = _assetMeta[token];
        AssetState memory s = _assetState[token];
        SafeERC20.safeTransfer(
            m.token,
            owner(),
            fromCanonical(s.balance, m.decimals)
        );
    }

    function initialize() public nonReentrant onlyOwner {
        if (_isInitialized == 1) revert AlreadyInitialized();

        _isInitialized = 1;

        _mint(_msgSender(), _poolState.scale);

        renounceOwnership();
    }

    function info()
        public
        view
        returns (
            address,
            string memory,
            string memory,
            uint8,
            uint256,
            uint256
        )
    {
        address poolAddress = address(this);
        IERC20Metadata poolMetadata = IERC20Metadata(poolAddress);
        return (
            poolAddress,
            poolMetadata.name(),
            poolMetadata.symbol(),
            poolMetadata.decimals(),
            _poolState.balance,
            _poolState.scale
        );
    }

    function assets() public view returns (Asset[] memory) {
        Asset[] memory assets_ = new Asset[](_addresses.length);
        for (uint256 i; i < _addresses.length; i++) {
            assets_[i] = Asset(
                _assetMeta[_addresses[i]],
                _assetState[_addresses[i]]
            );
        }
        return assets_;
    }

    function asset(address token) public view returns (Asset memory) {
        return Asset(_assetMeta[token], _assetState[token]);
    }

    function balance() public view returns (uint256) {
        return _poolState.balance;
    }

    function multiswap(
        address[] calldata payTokens,
        uint256[] calldata amounts,
        address[] calldata receiveTokens,
        uint256[] calldata allocations
    ) public nonReentrant returns (uint256[] memory receiveAmounts) {
        if (_isInitialized == 0) revert NotInitialized();
        // Check length mismatch
        {
            if (payTokens.length != amounts.length)
                revert LengthMismatch(payTokens.length, amounts.length);
            if (receiveTokens.length != allocations.length)
                revert LengthMismatch(receiveTokens.length, allocations.length);
        }
        // Check duplicates
        {
            for (uint256 i; i < payTokens.length; i++) {
                address payToken = payTokens[i];
                for (uint256 j; j < receiveTokens.length; j++) {
                    if (payToken == receiveTokens[j])
                        revert DuplicateToken(payToken);
                }
            }
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
                if (amounts[i] < 10000) revert TooSmall(amounts[i]);
                address payToken = payTokens[i];
                uint256 balance_;
                if (payToken == address(this)) {
                    balance_ = _poolState.balance;
                } else {
                    balance_ = _assetState[payToken].balance;
                }
                if (amounts[i] * 3 > balance_ * 4) revert TooLarge(amounts[i]);
            }
        }

        uint256 fracValueIn;

        receiveAmounts = new uint256[](receiveTokens.length);

        // Compute fracValueIn
        {
            for (uint256 i; i < payTokens.length; i++) {
                address payToken = payTokens[i];
                uint256 amountIn = amounts[i];
                if (payToken == address(this)) {
                    _poolState.balance -= amountIn;
                    fracValueIn += amountIn.ddiv(_poolState.balance);
                } else {
                    AssetState storage assetIn = _assetState[payToken];
                    uint256 weightIn = assetIn.scale.ddiv(_poolState.scale);
                    fracValueIn += assetIn
                        .gamma
                        .dmul(weightIn)
                        .dmul(amountIn)
                        .ddiv(assetIn.balance + amountIn);
                    assetIn.balance += amountIn;
                }
            }
        }
        // Compute receiveAmounts
        {
            address receiveToken;
            uint256 allocation;
            uint256 factor;
            uint256 amountOut;
            for (uint256 i; i < receiveTokens.length; i++) {
                receiveToken = receiveTokens[i];
                allocation = allocations[i];
                if (receiveToken == address(this)) {
                    factor = fracValueIn.dmul(allocation);
                    amountOut = _poolState.balance.dmul(factor).ddiv(DMath.ONE - factor);
                    receiveAmounts[i] = amountOut;
                    _poolState.balance += amountOut;
                } else {
                    AssetState storage assetOut = _assetState[receiveToken];
                    uint256 weightOut = assetOut.scale.ddiv(_poolState.scale);
                    factor = assetOut
                        .gamma
                        .ddiv(weightOut)
                        .dmul(allocation)
                        .dmul(fracValueIn);
                    amountOut = assetOut.balance.dmul(factor).ddiv(
                        factor + DMath.ONE
                    );
                    receiveAmounts[i] = amountOut;
                    assetOut.balance -= amountOut;
                }
            }
        }
        // Transfer tokens to the pool
        {
            for (uint256 i; i < payTokens.length; i++) {
                address payToken = payTokens[i];
                uint256 amount = amounts[i];
                uint256 delta;
                if (payToken == address(this)) {
                    _burn(_msgSender(), amount);
                } else {
                    SafeERC20.safeTransferFrom(
                        IERC20(payToken),
                        _msgSender(),
                        address(this),
                        fromCanonical(amount, IERC20Metadata(payToken).decimals())
                    );
                    delta = _assetMeta[payToken].fee.dmul(amount);
                    _assetState[payToken].scale += delta;
                    _poolState.scale += delta;
                }
            }

            // Transfer tokens to the receiving address
            for (uint256 i; i < receiveTokens.length; i++) {
                address receiveToken = receiveTokens[i];
                uint256 amountOut = receiveAmounts[i];
                uint256 delta;
                // Update _balance and asset balances.
                if (receiveToken == address(this)) {
                    _mint(_msgSender(), amountOut);
                } else {
                    SafeERC20.safeTransfer(
                        IERC20(receiveToken),
                        _msgSender(),
                        fromCanonical(
                            amountOut,
                            IERC20Metadata(receiveToken).decimals()
                        )
                    );
                    delta = _assetMeta[receiveToken].fee.dmul(amountOut);
                    _assetState[receiveToken].scale += delta;
                    _poolState.scale += delta;
                }
            }
        }
    }

    function swap(
        address payToken,
        address receiveToken,
        uint256 amountIn
    ) public nonReentrant returns (uint256) {
        if (_isInitialized == 0) revert NotInitialized();
        if (
            payToken == address(this) ||
            receiveToken == address(this) ||
            _assetState[payToken].scale == 0 ||
            _assetState[receiveToken].scale == 0 ||
            payToken == receiveToken
        ) revert InvalidSwap(payToken, receiveToken);
        AssetState storage assetIn = _assetState[payToken];
        AssetState storage assetOut = _assetState[receiveToken];
        // Check size
        {
            if (amountIn < 10000) revert TooSmall(amountIn);
            if (amountIn * 3 > assetIn.balance * 4)
                revert TooLarge(amountIn);
        }

        uint256 reserveIn = assetIn.balance + amountIn;
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 weightRatio = assetIn.scale.ddiv(assetOut.scale);
            uint256 invGrowthOut = DMath.ONE +
                assetIn.gamma.dmul(assetOut.gamma).dmul(weightRatio).dmul(
                    amountIn.ddiv(reserveIn)
                );
            reserveOut = assetOut.balance.ddiv(invGrowthOut);
            amountOut = assetOut.balance - reserveOut;
        }

        assetIn.balance = reserveIn;
        assetOut.balance = reserveOut;

        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            fromCanonical(amountIn, IERC20Metadata(payToken).decimals())
        );
        SafeERC20.safeTransfer(
            IERC20(receiveToken),
            _msgSender(),
            fromCanonical(amountOut, IERC20Metadata(receiveToken).decimals())
        );

        uint256 deltaIn = _assetMeta[payToken].fee.dmul(amountIn);
        uint256 deltaOut = _assetMeta[receiveToken].fee.dmul(amountOut);
        assetIn.scale += deltaIn;
        assetOut.scale += deltaOut;
        _poolState.scale += deltaIn + deltaOut;

        return amountOut;
    }

    function stake(address payToken, uint256 amountIn)
        public
        nonReentrant
        returns (uint256)
    {
        if (_isInitialized == 0) revert NotInitialized();
        if (payToken == address(this) || _assetState[payToken].scale == 0)
            revert InvalidStake(payToken);
        // Check size
        {
            if (amountIn < 10000) revert TooSmall(amountIn);
            if (amountIn * 3 > _assetState[payToken].balance * 4)
                revert TooLarge(amountIn);
        }
        AssetState storage assetIn = _assetState[payToken];

        uint256 reserveIn = assetIn.balance + amountIn;
        uint256 weightIn = assetIn.scale.ddiv(_poolState.scale);
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 invGrowthOut = DMath.ONE -
                assetIn.gamma.dmul(weightIn).dmul(amountIn.ddiv(reserveIn));
            reserveOut = _poolState.balance.ddiv(invGrowthOut);
            amountOut = reserveOut - _poolState.balance;
        }

        assetIn.balance = reserveIn;
        _poolState.balance = reserveOut;

        uint256 delta = _assetMeta[payToken].fee.dmul(amountIn);
        assetIn.scale += delta;
        _poolState.scale += delta;

        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            fromCanonical(amountIn, IERC20Metadata(payToken).decimals())
        );
        _mint(_msgSender(), amountOut);

        return amountOut;
    }

    function unstake(address receiveToken, uint256 amountIn)
        public
        nonReentrant
        returns (uint256)
    {
        if (_isInitialized == 0) revert NotInitialized();
        if (receiveToken == address(this) || _assetState[receiveToken].scale == 0)
            revert InvalidUnstake(receiveToken);
        // Check size
        {
            if (amountIn < 10000) revert TooSmall(amountIn);
            if (amountIn * 3 > _poolState.balance * 4) revert TooLarge(amountIn);
        }

        AssetState storage assetOut = _assetState[receiveToken];
        // Check if unstake
        if (address(_assetMeta[receiveToken].token) != receiveToken)
            revert InvalidUnstake(receiveToken);

        uint256 reserveIn = _poolState.balance - amountIn;
        uint256 weightOut = assetOut.scale.ddiv(_poolState.scale);
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 invGrowthOut = DMath.ONE +
                assetOut.gamma.ddiv(weightOut).dmul(amountIn).ddiv(reserveIn);
            reserveOut = assetOut.balance.ddiv(invGrowthOut);
            amountOut = assetOut.balance - reserveOut;
        }

        _poolState.balance = reserveIn;
        assetOut.balance = reserveOut;

        uint256 delta = _assetMeta[receiveToken].fee.dmul(amountOut);
        assetOut.scale += delta;
        _poolState.scale += delta;

        SafeERC20.safeTransfer(
            IERC20(receiveToken),
            _msgSender(),
            fromCanonical(amountOut, IERC20Metadata(receiveToken).decimals())
        );
        _burn(_msgSender(), amountIn);

        return amountOut;
    }
}
