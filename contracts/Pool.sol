// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./libraries/DMath.sol";

struct Asset {
    IERC20 token;
    string name;
    string symbol;
    uint8 decimals;
    uint256 balance;
    uint256 gamma;
    uint256 fee;
    uint256 scale; // Used to compute weight of this asset token
}

contract Pool is ReentrancyGuard, ERC20, Ownable {
    using SafeERC20 for IERC20;
    using DMath for uint256;

    uint256 private _isInitialized;

    uint256 private _balance;

    uint256 private _scale;

    // The `address` here is the address of the respective external asset token contract.
    mapping(address => Asset) private _assets;
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

    function toCanonical(uint256 amount, uint8 decimals)
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

        _balance += assetScale_;
        _scale += assetScale_;

        uint8 decimals_ = IERC20Metadata(payToken_).decimals();

        SafeERC20.safeTransferFrom(
            IERC20(payToken_),
            _msgSender(),
            address(this),
            toCanonical(balance_, decimals_)
        );

        _addresses.push(payToken_);
        _assets[payToken_] = Asset(
            IERC20(payToken_),
            IERC20Metadata(payToken_).name(),
            IERC20Metadata(payToken_).symbol(),
            decimals_,
            balance_,
            gamma_,
            DMath.ONE - gamma_.dmul(gamma_),
            assetScale_
        );
    }

    function uninitialize(address token) public nonReentrant onlyOwner {
        if (_isInitialized == 1) revert AlreadyInitialized();

        Asset memory x = _assets[token];
        SafeERC20.safeTransfer(
            x.token,
            owner(),
            toCanonical(x.balance, x.decimals)
        );
    }

    function initialize() public nonReentrant onlyOwner {
        if (_isInitialized == 1) revert AlreadyInitialized();

        _isInitialized = 1;

        _mint(_msgSender(), _scale);

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
            _balance,
            _scale
        );
    }

    function assets() public view returns (Asset[] memory) {
        Asset[] memory assets_ = new Asset[](_addresses.length);
        for (uint256 i; i < _addresses.length; i++) {
            assets_[i] = _assets[_addresses[i]];
        }
        return assets_;
    }

    function asset(address token) public view returns (Asset memory) {
        return _assets[token];
    }

    function balance() public view returns (uint256) {
        return _balance;
    }

    function multiswap(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations
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
                    balance_ = _balance;
                } else {
                    balance_ = _assets[payToken].balance;
                }
                if (amounts[i]*3 > balance_*4) revert  TooLarge(amounts[i]);
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
                    _balance -= amountIn;
                    fracValueIn += amountIn.ddiv(_balance);
                } else {
                    Asset storage assetIn = _assets[payToken];
                    uint256 weightIn = assetIn.scale.ddiv(_scale);
                    fracValueIn += assetIn.gamma.dmul(weightIn).dmul(amountIn).ddiv(
                        assetIn.balance + amountIn
                    );
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
                    amountOut = _balance.dmul(factor).ddiv(DMath.ONE - factor);
                    receiveAmounts[i] = amountOut;
                    _balance += amountOut;
                } else {
                    Asset storage assetOut = _assets[receiveToken];
                    uint256 weightOut = assetOut.scale.ddiv(_scale);
                    factor = assetOut.gamma.ddiv(weightOut).dmul(allocation).dmul(
                        fracValueIn
                    );
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
                        toCanonical(amount, IERC20Metadata(payToken).decimals())
                    );
                    delta = _assets[payToken].fee.dmul(amount);
                    _assets[payToken].scale += delta;
                    _scale += delta;
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
                        toCanonical(
                            amountOut,
                            IERC20Metadata(receiveToken).decimals()
                        )
                    );
                    delta = _assets[receiveToken].fee.dmul(amountOut);
                    _assets[receiveToken].scale += delta;
                    _scale += delta;
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
            _assets[payToken].scale == 0 ||
            _assets[receiveToken].scale == 0 ||
            payToken == receiveToken
        ) revert InvalidSwap(payToken, receiveToken); 
        Asset storage assetIn = _assets[payToken];
        Asset storage assetOut = _assets[receiveToken];
        // Check size
        {
            if (amountIn < 10000) revert TooSmall(amountIn);
            if (amountIn*3 > _assets[payToken].balance*4) revert  TooLarge(amountIn);
        }

        uint256 reserveIn = assetIn.balance + amountIn;
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 weightRatio = assetIn.scale.ddiv(assetOut.scale);
            uint256 invGrowthOut = DMath.ONE +
                assetIn.gamma.dmul(assetOut.gamma).dmul(weightRatio).dmul(amountIn.ddiv(reserveIn));
            reserveOut = assetOut.balance.ddiv(invGrowthOut);
            amountOut = assetOut.balance - reserveOut;
        }

        assetIn.balance = reserveIn;
        assetOut.balance = reserveOut;

        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            toCanonical(amountIn, IERC20Metadata(payToken).decimals())
        );
        SafeERC20.safeTransfer(
            IERC20(receiveToken),
            _msgSender(),
            toCanonical(amountOut, IERC20Metadata(receiveToken).decimals())
        );

        uint256 deltaIn = assetIn.fee.dmul(amountIn);
        uint256 deltaOut = assetOut.fee.dmul(amountOut);
        assetIn.scale += deltaIn;
        assetOut.scale += deltaOut;
        _scale += deltaIn + deltaOut;

        return amountOut;
    }

    function stake(address payToken, uint256 amountIn)
        public
        nonReentrant
        returns (uint256)
    {
        if (_isInitialized == 0) revert NotInitialized();
        if (
            payToken == address(this) ||
            _assets[payToken].scale == 0
        ) revert InvalidStake(payToken);
        // Check size
        {
            if (amountIn < 10000) revert TooSmall(amountIn);
            if (amountIn*3 > _assets[payToken].balance*4) revert  TooLarge(amountIn);
        }
        Asset storage assetIn = _assets[payToken];

        uint256 reserveIn = assetIn.balance + amountIn;
        uint256 weightIn = assetIn.scale.ddiv(_scale);
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 invGrowthOut = DMath.ONE -
                assetIn.gamma.dmul(weightIn).dmul(amountIn.ddiv(reserveIn));
            reserveOut = _balance.ddiv(invGrowthOut);
            amountOut = reserveOut - _balance;
        }

        assetIn.balance = reserveIn;
        _balance = reserveOut;

        uint256 delta = assetIn.fee.dmul(amountIn);
        assetIn.scale += delta;
        _scale += delta;

        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            toCanonical(amountIn, IERC20Metadata(payToken).decimals())
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
        if (
            receiveToken == address(this) ||
            _assets[receiveToken].scale == 0
        ) revert InvalidUnstake(receiveToken);
        // Check size
        {
            if (amountIn < 10000) revert TooSmall(amountIn);
            if (amountIn*3 > _balance*4) revert  TooLarge(amountIn);
        }

        Asset storage assetOut = _assets[receiveToken];
        // Check if unstake
        if (address(assetOut.token) != receiveToken)
            revert InvalidUnstake(receiveToken);

        uint256 reserveIn = _balance - amountIn;
        uint256 weightOut = assetOut.scale.ddiv(_scale);
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 invGrowthOut = DMath.ONE +
                assetOut.gamma.ddiv(weightOut).dmul(amountIn).ddiv(reserveIn);
            reserveOut = assetOut.balance.ddiv(invGrowthOut);
            amountOut = assetOut.balance - reserveOut;
        }

        _balance = reserveIn;
        assetOut.balance = reserveOut;

        uint256 delta = assetOut.fee.dmul(amountOut);
        assetOut.scale += delta;
        _scale += delta;

        SafeERC20.safeTransfer(
            IERC20(receiveToken),
            _msgSender(),
            toCanonical(amountOut, IERC20Metadata(receiveToken).decimals())
        );
        _burn(_msgSender(), amountIn);

        return amountOut;
    }
}
