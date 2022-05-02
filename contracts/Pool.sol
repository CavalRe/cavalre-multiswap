// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./libraries/DMath.sol";

struct Asset {
    IERC20 token;
    uint256 balance;
    uint256 fee; // Transaction fee, e.g. 0.003
    uint256 scale; // Used to compute weight of this asset token
    uint256 k; // AMM parameter for this asset token
}

error LengthMismatch(uint256 expected, uint256 actual);

library Lib {
    using DMath for uint256;

    function postTradePrice(
        Asset memory asset,
        uint256 amount,
        uint256 poolTokens,
        uint256 poolScale
    ) internal pure returns (uint256) {
        uint256 weight = asset.scale.ddiv(poolScale);
        return weight.dmul(poolTokens).ddiv(asset.balance + amount);
    }

    function totalAssetValue(
        Asset[] memory payAssets,
        uint256[] memory amounts,
        uint256 poolTokens,
        uint256 poolScale
    ) internal pure returns (uint256) {
        if (payAssets.length != amounts.length)
            revert LengthMismatch(payAssets.length, amounts.length);

        uint256 assetAmount;
        for (uint256 i; i < payAssets.length; i++) {
            Asset memory payAsset = payAssets[i];
            uint256 amount = amounts[i];
            assetAmount += amount.dmul(
                postTradePrice(payAsset, amount, poolTokens, poolScale)
            );
        }
        return assetAmount;
    }

    function fracValueOut(
        Asset memory asset,
        uint256 amount,
        uint256 poolScale
    ) internal pure returns (uint256) {
        uint256 gamma = DMath.ONE - asset.fee;
        uint256 weight = asset.scale.ddiv(poolScale);
        return gamma.dmul(weight).dmul(amount).ddiv(asset.balance+amount);
    }
}

contract Pool is ReentrancyGuard, ERC20 {
    using SafeERC20 for IERC20;
    using DMath for uint256;

    uint256 private _isInitialized;

    uint256 private _balance;

    // The `address` here is the address of the respective external asset token contract.
    mapping(address => uint256) private _index;
    Asset[] private _assets;

    // Parameter for exponentially weighted moving averages
    uint256 private _alpha;

    uint256 private _scale;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _isInitialized = 0;
    }

    error InsufficientAllowance(uint256 availabe, uint256 required);

    error IncorrectAllocation(uint256 expected, uint256 actual);

    error DuplicateToken(address payToken);

    error AlreadyInitialized();

    function initialize(
        uint256 poolSupply,
        address[] memory payTokens,
        uint256[] memory amounts,
        uint256[] memory fees,
        uint256[] memory weights,
        uint256[] memory ks
    ) public nonReentrant {
        if (_isInitialized == 1) revert AlreadyInitialized();
        // Check allowances
        {
            if (payTokens.length != amounts.length)
                revert LengthMismatch(payTokens.length, amounts.length);

            for (uint256 i; i < payTokens.length; i++) {
                uint256 available = IERC20(payTokens[i]).allowance(
                    _msgSender(),
                    address(this)
                );
                if (amounts[i] > available)
                    revert InsufficientAllowance(available, amounts[i]);
            }
        }
        _isInitialized = 1;
        _balance = poolSupply;
        _scale = poolSupply;
        _mint(_msgSender(), poolSupply);
        uint256 checkWeight;
        for (uint256 i; i < weights.length; i++) {
            _index[payTokens[i]] = i;
            _assets.push(
                Asset(
                    IERC20(payTokens[i]),
                    amounts[i],
                    fees[i],
                    weights[i].dmul(poolSupply),
                    ks[i]
                )
            );
            checkWeight += weights[i];

            SafeERC20.safeTransferFrom(
                IERC20(payTokens[i]),
                _msgSender(),
                address(this),
                amounts[i]
            );
        }
        require(checkWeight == 1e18, "Weights must sum to 1.");
    }

    function assets() public view returns (Asset[] memory) {
        return _assets;
    }

    function asset(address token) public view returns (Asset memory) {
        return _assets[_index[token]];
    }

    function balance() public view returns (uint256) {
        return _balance;
    }

    function balance(address token) public view returns (uint256) {
        return asset(token).balance;
    }

    function weight(address token) public view returns (uint256) {
        return asset(token).scale.ddiv(_scale);
    }

    function scale() public view returns (uint256) {
        return _scale;
    }

    function scale(address token) public view returns (uint256) {
        return asset(token).scale;
    }

    function fee(address token) public view returns (uint256) {
        return asset(token).fee;
    }

    function multiswap(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations
    ) public nonReentrant returns (uint256[] memory receiveAmounts) {
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
        // Check for simple swaps
        /*
        {
            if (payTokens.length == 1 && receiveTokens.length == 1) {
                receiveAmounts = new uint256[](1);
                if (receiveTokens[0] == address(this)) {
                    receiveAmounts[0] = _stake(payTokens[0], amounts[0], _msgSender());
                } else if (payTokens[0] == address(this)) {
                    receiveAmounts[0] = _unstake(receiveTokens[0], allocations[0], _msgSender());
                } else {
                    receiveAmounts[0] = _swap(payTokens[0], receiveTokens[0], amounts[0], _msgSender());
                }
                return receiveAmounts;
            }
        }
        */
        // Check allowances
        {
            uint256 available;
            for (uint256 i; i < payTokens.length; i++) {
                available = IERC20(payTokens[i]).allowance(
                    _msgSender(),
                    address(this)
                );
                if (amounts[i] > available)
                    revert InsufficientAllowance(available, amounts[i]);
            }
        }

        uint256 poolAmount;
        uint256 poolAllocation;
        uint256 fracValueIn;

        receiveAmounts = new uint256[](receiveTokens.length);

        // Check to see if unstaking.
        {
            for (uint256 i; i < payTokens.length; i++) {
                if (payTokens[i] == address(this)) {
                    poolAmount = amounts[i];
                    break;
                }
            }
        }
        // Check to see if staking.
        {
            if (poolAmount == 0) {
                for (uint256 i; i < receiveTokens.length; i++) {
                    if (receiveTokens[i] == address(this)) {
                        poolAllocation = allocations[i];
                        break;
                    }
                }
            }
        }
        // Compute fracValueIn
        {
            for (uint256 i; i < payTokens.length; i++) {
                address payToken = payTokens[i];
                uint256 amountIn = amounts[i];
                if (payToken == address(this)) {
                    fracValueIn += amountIn.ddiv(_balance+amountIn);
                    _balance -= amountIn;
                } else {
                    Asset memory assetIn = asset(payToken);
                    uint256 weightIn = assetIn.scale.ddiv(_scale);
                    uint256 gamma = DMath.ONE - assetIn.fee;
                    fracValueIn += gamma.dmul(weightIn).dmul(amountIn).ddiv(assetIn.balance+amountIn);
                    _assets[_index[payToken]].balance += amountIn;
                }
            }
        }
        // Compute receiveAmounts
        {
            address receiveToken;
            uint256 allocation;
            uint256 factor;
            for (uint256 i; i < receiveTokens.length; i++) {
                receiveToken = receiveTokens[i];
                allocation = allocations[i];
                if (receiveToken == address(this)) {
                    factor = fracValueIn.dmul(allocation);
                    receiveAmounts[i] = _balance.dmul(factor).ddiv(DMath.ONE - factor);
                } else {
                    Asset memory assetOut = asset(receiveToken);
                    factor = fracValueIn.dmul(allocation).dmul(DMath.ONE - assetOut.fee).dmul(_scale).ddiv(assetOut.scale);
                    receiveAmounts[i] = assetOut.balance.dmul(factor).ddiv(factor + DMath.ONE);
                }
            }
        }
        // Transfer tokens and update balances
        {
            // Transfer tokens to the pool
            for (uint256 i; i < payTokens.length; i++) {
                address payToken = payTokens[i];
                uint256 amount = amounts[i];
                SafeERC20.safeTransferFrom(
                    IERC20(payToken),
                    _msgSender(),
                    address(this),
                    amount
                );
                // Update _balance and asset balances.
                if (payToken == address(this)) {
                    // _balance -= amount;
                    _burn(address(this), amount);
                } else {
                    _assets[_index[payToken]].balance += amount;
                }
            }

            // Transfer tokens to the receiving address
            for (uint256 i; i < receiveTokens.length; i++) {
                address receiveToken = receiveTokens[i];
                uint256 amountOut = receiveAmounts[i];
                // Update _balance and asset balances.
                if (receiveToken == address(this)) {
                    _balance += amountOut;
                    _mint(address(this), amountOut);
                } else {
                    _assets[_index[receiveToken]].balance -= amountOut;
                }
                SafeERC20.safeTransfer(
                    IERC20(receiveToken),
                    _msgSender(),
                    amountOut
                );
            }
        }
    }

    function _swap(
        address payToken,
        address receiveToken,
        uint256 amountIn,
        address addressTo
    ) internal returns (uint256) {
        // Check allowance
        {
            uint256 available = IERC20(payToken).allowance(
                _msgSender(),
                address(this)
            );
            if (amountIn > available)
                revert InsufficientAllowance(available, amountIn);
        }
        Asset memory assetIn = _assets[_index[payToken]];
        Asset memory assetOut = _assets[_index[receiveToken]];

        uint256 reserveIn = assetIn.balance + amountIn;
        uint256 amountOut;

        {
            uint256 gamma = (DMath.ONE-assetIn.fee).dmul(DMath.ONE-assetOut.fee);
            uint256 weightRatio = assetIn.scale.ddiv(assetOut.scale);
            uint256 invGrowthOut = DMath.ONE + gamma.dmul(weightRatio).dmul(amountIn.ddiv(reserveIn));
            uint256 reserveOut = assetOut.balance.ddiv(invGrowthOut);
            amountOut = assetOut.balance - reserveOut;
        }

        _assets[_index[payToken]].balance = reserveIn;
        _assets[_index[receiveToken]].balance = assetOut.balance - amountOut;

        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            amountIn
        );
        SafeERC20.safeTransfer(IERC20(receiveToken), addressTo, amountOut);

        return amountOut;
    }

    function swap(
        address payToken,
        address receiveToken,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        return _swap(payToken, receiveToken, amountIn, addressTo);
    }

    function _stake(
        address payToken,
        uint256 amountIn,
        address addressTo
    ) internal returns (uint256) {
        // Check allowance
        {
            uint256 available = IERC20(payToken).allowance(
                _msgSender(),
                address(this)
            );
            if (amountIn > available)
                revert InsufficientAllowance(available, amountIn);
        }
        Asset memory assetIn = _assets[_index[payToken]];

        uint256 reserveIn = assetIn.balance + amountIn;
        uint256 weightIn = assetIn.scale.ddiv(_scale);
        uint256 amountOut;

        {
            uint256 gamma = DMath.ONE-assetIn.fee;
            uint256 invGrowthOut = DMath.ONE - gamma.dmul(weightIn).dmul(amountIn.ddiv(reserveIn));
            uint256 reserveOut = _balance.ddiv(invGrowthOut);
            amountOut = reserveOut - _balance;
        }

        _assets[_index[payToken]].balance = reserveIn;
        _balance += amountOut;

        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            amountIn
        );
        _mint(addressTo, amountOut);

        return amountOut;
    }

    function stake(
        address payToken,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        return _stake(payToken, amountIn, addressTo);
    }

    function _unstake(
        address receiveToken,
        uint256 amountIn,
        address addressTo
    ) internal returns (uint256) {
        // Check allowance
        {
            uint256 available = this.allowance(_msgSender(), address(this));
            if (amountIn > available)
                revert InsufficientAllowance(available, amountIn);
        }
        Asset memory assetOut = _assets[_index[receiveToken]];

        uint256 reserveIn = _balance - amountIn;
        uint256 weightOut = assetOut.scale.ddiv(_scale);
        uint256 amountOut;

        {
            uint256 invGrowthOut = DMath.ONE -
                amountIn.ddiv(weightOut.dmul(reserveIn));
            amountOut = assetOut.balance.ddiv(invGrowthOut) - assetOut.balance;
        }

        _balance -= amountIn;
        _assets[_index[receiveToken]].balance = assetOut.balance - amountOut;

        SafeERC20.safeTransferFrom(
            IERC20(address(this)),
            _msgSender(),
            address(this),
            amountIn
        );
        SafeERC20.safeTransfer(IERC20(receiveToken), addressTo, amountOut);
        _burn(address(this), amountIn);

        return amountOut;
    }

    function unstake(
        address receiveToken,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        return _unstake(receiveToken, amountIn, addressTo);
    }

    /*
    function _stakeBatch(
        address[] memory addressIn,
        uint256[] memory amountIn,
        address addressTo
    ) internal returns (uint256) {
        uint256 n = addressIn.length;
        require(
            n == amountIn.length,
            "AddressIn and AmountIn should have the same length."
        );

        uint256 amountOut;

        for (uint256 i; i < n; i++) {
            Asset memory assetIn = _assets[_index[addressIn[i]]];

            uint256 reserveIn = assetIn.balance + amountIn[i];
            uint256 reserveOut = totalSupply();
            uint256 weightIn = assetIn.scale.ddiv(_scale);

            {
                uint256 invGrowthOut = DMath.ONE -
                    amountIn[i].dmul(weightIn).ddiv(reserveIn);
                amountOut += reserveOut.ddiv(invGrowthOut) - reserveOut;
            }

            _assets[_index[addressIn[i]]].balance = reserveIn;

            SafeERC20.safeTransferFrom(
                IERC20(addressIn[i]),
                _msgSender(),
                address(this),
                amountIn[i]
            );
        }

        _mint(addressTo, amountOut);

        return amountOut;
    }

    function stakeBatch(
        address[] memory addressIn,
        uint256[] memory amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        return _stakeBatch(addressIn, amountIn, addressTo);
    }
    */

    /*
    function addAsset(
        address addressIn,
        address addressNew,
        uint256 amountIn,
        uint256 amountNew,
        uint256 feeNew,
        uint256 kNew,
        address addressTo
    ) public nonReentrant returns (uint256) {
        Asset memory assetIn = _assets[_index[addressIn]];

        uint256 scaleIn;

        {
            uint256 reserve0 = totalSupply();
            uint256 reserveIn = assetIn.balance;
            uint256 valueIn = reserve0.dmul(assetIn.scale).ddiv(_scale);
            scaleIn = valueIn.dmul(amountIn).ddiv(reserveIn);
        }

        _index[addressNew] = _assets.length;
        _assets.push(
            Asset(IERC20(addressNew), amountNew, feeNew, scaleIn, kNew)
        );

        _assets[_index[addressIn]].balance = assetIn.balance + amountIn;
        _assets[_index[addressIn]].scale = assetIn.scale + scaleIn;

        address[] memory addresses = new address[](2);
        uint256[] memory amounts = new uint256[](2);
        addresses[0] = addressIn;
        addresses[1] = addressNew;
        amounts[0] = amountIn;
        amounts[1] = amountNew;

        return _stakeBatch(addresses, amounts, addressTo);
    }
    */
}
