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
    uint256 fee; // Transaction fee, e.g. 0.003
    uint256 scale; // Used to compute weight of this asset token
}

contract Pool is ReentrancyGuard, ERC20, Ownable {
    using SafeERC20 for IERC20;
    using DMath for uint256;

    uint256 private _isInitialized;

    uint256 private _balance;

    uint256 private _scale;

    Asset[] private _assets;

    error AlreadyInitialized();

    error NotInitialized();

    error LengthMismatch(uint256 expected, uint256 actual);

    error IncorrectAllocation(uint256 expected, uint256 actual);

    error DuplicateToken(uint256 payIndex);

    error InvalidAsset(address token);

    error InvalidSwap(uint256 payIndex, uint256 receiveIndex);

    error InvalidStake(uint256 payIndex);

    error InvalidUnstake(uint256 receiveIndex);

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
        uint256 fee_,
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

        _assets.push(
            Asset(
                IERC20(payToken_),
                IERC20Metadata(payToken_).name(),
                IERC20Metadata(payToken_).symbol(),
                decimals_,
                balance_,
                fee_,
                assetScale_
            )
        );
    }

    function uninitialize(uint256 assetIndex) public nonReentrant onlyOwner {
        if (_isInitialized == 1) revert AlreadyInitialized();

        Asset memory x = _assets[assetIndex];
        SafeERC20.safeTransfer(x.token, owner(), x.balance);
    }

    function initialize() public nonReentrant onlyOwner {
        if (_isInitialized == 1) revert AlreadyInitialized();

        _isInitialized = 1;

        _mint(_msgSender(), _scale);

        renounceOwnership();
    }

    function pool()
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
        return _assets;
    }

    function asset(uint256 index) public view returns (Asset memory) {
        return _assets[index];
    }

    function balance() public view returns (uint256) {
        return _balance;
    }

    // function transferIn(
    //     address assetAddress,
    //     uint256 amount,
    //     uint8 decimals
    // ) internal returns (uint256 absolute) {
    //     absolute = toCanonical(amount, decimals);
    //     SafeERC20.safeTransferFrom(IERC20(assetAddress), _msgSender(), address(this), absolute);
    // }

    // function transferOut(
    //     address assetAddress,
    //     address beneficiary,
    //     uint256 amount,
    //     uint8 decimals
    // ) internal returns (uint256 absolute) {
    //     absolute = toCanonical(amount, decimals);
    //     SafeERC20.safeTransfer(IERC20(assetAddress), beneficiary, absolute);
    // }

    function multiswap(
        uint256[] memory payIndices,
        uint256[] memory amounts,
        uint256[] memory receiveIndices,
        uint256[] memory allocations
    ) public nonReentrant returns (uint256[] memory receiveAmounts) {
        if (_isInitialized == 0) revert NotInitialized();
        // Check length mismatch
        {
            if (payIndices.length != amounts.length)
                revert LengthMismatch(payIndices.length, amounts.length);
            if (receiveIndices.length != allocations.length)
                revert LengthMismatch(
                    receiveIndices.length,
                    allocations.length
                );
        }
        // Check duplicates
        uint256 index;
        {
            for (uint256 i; i < payIndices.length; i++) {
                index = payIndices[i];
                for (uint256 j; j < receiveIndices.length; j++) {
                    if (index == receiveIndices[j])
                        revert DuplicateToken(index);
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

        uint256 fracValueIn;
        uint256 amount;
        Asset storage _asset;
        uint256 gamma;
        uint256 weight;

        receiveAmounts = new uint256[](receiveIndices.length);

        // Compute fracValueIn
        {
            for (uint256 i; i < payIndices.length; i++) {
                index = payIndices[i];
                amount = amounts[i];
                if (index == 0) {
                    _balance -= amount;
                    fracValueIn += amount.ddiv(_balance);
                } else {
                    _asset = _assets[index - 1];
                    gamma = DMath.ONE - _asset.fee;
                    weight = _asset.scale.ddiv(_scale);
                    fracValueIn += gamma.dmul(weight).dmul(amount).ddiv(
                        _asset.balance + amount
                    );
                    _asset.balance += amount;
                }
            }
        }
        // Compute receiveAmounts
        {
            uint256 allocation;
            uint256 factor;
            for (uint256 i; i < receiveIndices.length; i++) {
                index = receiveIndices[i];
                allocation = allocations[i];
                if (index == 0) {
                    factor = fracValueIn.dmul(allocation);
                    amount = _balance.dmul(factor).ddiv(DMath.ONE - factor);
                    receiveAmounts[i] = amount;
                    _balance += amount;
                } else {
                    _asset = _assets[index - 1];
                    gamma = DMath.ONE - _asset.fee;
                    weight = _asset.scale.ddiv(_scale);
                    factor = gamma.ddiv(weight).dmul(allocation).dmul(
                        fracValueIn
                    );
                    amount = _asset.balance.dmul(factor).ddiv(
                        factor + DMath.ONE
                    );
                    receiveAmounts[i] = amount;
                    _asset.balance -= amount;
                }
            }
        }
        // Transfer tokens to the pool
        {
            uint256 delta;
            for (uint256 i; i < payIndices.length; i++) {
                index = payIndices[i];
                amount = amounts[i];
                if (index == 0) {
                    _burn(_msgSender(), amount);
                } else {
                    _asset = _assets[index - 1];
                    SafeERC20.safeTransferFrom(
                        _asset.token,
                        _msgSender(),
                        address(this),
                        toCanonical(amount, _asset.decimals)
                    );
                    delta = _asset.fee.dmul(amount);
                    _asset.scale += delta;
                    _scale += delta;
                }
            }

            // Transfer tokens to the receiving address
            for (uint256 i; i < receiveIndices.length; i++) {
                index = receiveIndices[i];
                amount = receiveAmounts[i];
                // Update _balance and asset balances.
                if (index == 0) {
                    _mint(_msgSender(), amount);
                } else {
                    _asset = _assets[index - 1];
                    SafeERC20.safeTransfer(
                        _asset.token,
                        _msgSender(),
                        toCanonical(amount, _asset.decimals)
                    );
                    delta = _asset.fee.dmul(amount);
                    _asset.scale += delta;
                    _scale += delta;
                }
            }
        }
    }

    function swap(
        uint256 payIndex,
        uint256 receiveIndex,
        uint256 amountIn
    ) public nonReentrant returns (uint256) {
        if (_isInitialized == 0) revert NotInitialized();
        if (payIndex*receiveIndex == 0 || payIndex == receiveIndex)
            revert InvalidSwap(payIndex, receiveIndex);
        Asset storage assetIn = _assets[payIndex-1];
        Asset storage assetOut = _assets[receiveIndex-1];

        uint256 reserveIn = assetIn.balance + amountIn;
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 gamma = (DMath.ONE - assetIn.fee).dmul(
                DMath.ONE - assetOut.fee
            );
            uint256 weightRatio = assetIn.scale.ddiv(assetOut.scale);
            uint256 invGrowthOut = DMath.ONE +
                gamma.dmul(weightRatio).dmul(amountIn.ddiv(reserveIn));
            reserveOut = assetOut.balance.ddiv(invGrowthOut);
            amountOut = assetOut.balance - reserveOut;
        }

        assetIn.balance = reserveIn;
        assetOut.balance = reserveOut;

        SafeERC20.safeTransferFrom(
            assetIn.token,
            _msgSender(),
            address(this),
            toCanonical(amountIn, assetIn.decimals)
        );
        SafeERC20.safeTransfer(
            assetOut.token,
            _msgSender(),
            toCanonical(amountOut, assetOut.decimals)
        );

        uint256 deltaIn = assetIn.fee.dmul(amountIn);
        uint256 deltaOut = assetOut.fee.dmul(amountOut);
        assetIn.scale += deltaIn;
        assetOut.scale += deltaOut;
        _scale += deltaIn + deltaOut;

        return amountOut;
    }

    function stake(
        uint256 payIndex,
        uint256 amountIn
    ) public nonReentrant returns (uint256) {
        if (_isInitialized == 0) revert NotInitialized();
        Asset storage assetIn = _assets[payIndex-1];

        uint256 reserveIn = assetIn.balance + amountIn;
        uint256 weightIn = assetIn.scale.ddiv(_scale);
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 gamma = DMath.ONE - assetIn.fee;
            uint256 invGrowthOut = DMath.ONE -
                gamma.dmul(weightIn).dmul(amountIn.ddiv(reserveIn));
            reserveOut = _balance.ddiv(invGrowthOut);
            amountOut = reserveOut - _balance;
        }

        assetIn.balance = reserveIn;
        _balance = reserveOut;

        uint256 delta = assetIn.fee.dmul(amountIn);
        assetIn.scale += delta;
        _scale += delta;

        SafeERC20.safeTransferFrom(
            assetIn.token,
            _msgSender(),
            address(this),
            toCanonical(amountIn, assetIn.decimals)
        );
        _mint(_msgSender(), amountOut);

        return amountOut;
    }

    function unstake(
        uint256 receiveIndex,
        uint256 amountIn
    ) public nonReentrant returns (uint256) {
        if (_isInitialized == 0) revert NotInitialized();
        Asset storage assetOut = _assets[receiveIndex-1];

        uint256 reserveIn = _balance - amountIn;
        uint256 weightOut = assetOut.scale.ddiv(_scale);
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 gamma = DMath.ONE - assetOut.fee;
            uint256 invGrowthOut = DMath.ONE +
                gamma.ddiv(weightOut).dmul(amountIn).ddiv(reserveIn);
            reserveOut = assetOut.balance.ddiv(invGrowthOut);
            amountOut = assetOut.balance - reserveOut;
        }

        _balance = reserveIn;
        assetOut.balance = reserveOut;

        uint256 delta = assetOut.fee.dmul(amountOut);
        assetOut.scale += delta;
        _scale += delta;

        SafeERC20.safeTransfer(
            assetOut.token,
            _msgSender(),
            toCanonical(amountOut, assetOut.decimals)
        );
        _burn(_msgSender(), amountIn);

        return amountOut;
    }

}
