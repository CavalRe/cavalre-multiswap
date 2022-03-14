// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./libraries/DMath.sol";

contract Pool is ReentrancyGuard, ERC20 {
    using SafeERC20 for IERC20;
    using DMath for uint256;

    // The `address` here is the address of the respective external asset token contract.
    mapping(address => uint256) private _index;
    Asset[] private _assets;

    // Parameter for exponentially weighted moving averages
    uint256 private _alpha;

    uint256 private _scale;

    struct Asset {
        IERC20 token;
        uint256 reserve;
        uint256 fee; // Transaction fee, e.g. 0.003
        uint256 scale; // Used to compute weight of this asset token
        uint256 k; // AMM parameter for this asset token
    }

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function initialize(
        uint256 poolSupply,
        address[] memory tokens,
        uint256[] memory reserves,
        uint256[] memory fees,
        uint256[] memory weights,
        uint256[] memory ks
    ) public {
        _scale = poolSupply;
        _mint(_msgSender(), poolSupply);
        uint256 checkWeight;
        for (uint256 i; i < weights.length; i++) {
            _index[tokens[i]] = i;
            _assets.push(
                Asset(
                    IERC20(tokens[i]),
                    reserves[i],
                    fees[i],
                    weights[i].dmul(poolSupply),
                    ks[i]
                )
            );
            checkWeight += weights[i];

            SafeERC20.safeTransferFrom(
                IERC20(tokens[i]),
                _msgSender(),
                address(this),
                reserves[i]
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

    function reserve(address token) public view returns (uint256) {
        return asset(token).reserve;
    }

    function weight(address token) public view returns (uint256) {
        return asset(token).scale.ddiv(_scale);
    }

    function scale() public view returns (uint) {
        return _scale;
    }

    function swap(
        address addressIn,
        address addressOut,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        Asset memory assetIn = _assets[_index[addressIn]];
        Asset memory assetOut = _assets[_index[addressOut]];

        uint256 reserveIn = assetIn.reserve + amountIn;
        uint256 amountOut;

        {
            uint256 weightRatio = assetIn.scale.ddiv(assetOut.scale);
            uint256 invGrowthOut = weightRatio.dmul(amountIn.ddiv(reserveIn)) +
                DMath.ONE;
            uint256 preFeeReserveOut = assetOut.reserve.ddiv(invGrowthOut);
            uint256 preFeeAmountOut = assetOut.reserve - preFeeReserveOut;
            uint256 feeAmount = preFeeAmountOut.dmul(assetOut.fee);
            amountOut = preFeeAmountOut - feeAmount;
        }

        _assets[_index[addressIn]].reserve = reserveIn;
        _assets[_index[addressOut]].reserve = assetOut.reserve - amountOut;

        SafeERC20.safeTransferFrom(
            IERC20(addressIn),
            _msgSender(),
            address(this),
            amountIn
        );
        SafeERC20.safeTransfer(IERC20(addressOut), addressTo, amountOut);

        return amountOut;
    }

    function stake(
        address addressIn,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        Asset memory assetIn = _assets[_index[addressIn]];

        uint256 reserveIn = assetIn.reserve + amountIn;
        uint256 reserveOut = totalSupply();
        uint256 weightIn = assetIn.scale.ddiv(_scale);
        uint256 amountOut;

        {
            uint256 invGrowthOut = DMath.ONE -
                amountIn.dmul(weightIn).ddiv(reserveIn);
            amountOut = reserveOut.ddiv(invGrowthOut) - reserveOut;
        }

        _assets[_index[addressIn]].reserve = reserveIn;

        SafeERC20.safeTransferFrom(
            IERC20(addressIn),
            _msgSender(),
            address(this),
            amountIn
        );
        _mint(addressTo, amountOut);

        return amountOut;
    }

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

            uint256 reserveIn = assetIn.reserve + amountIn[i];
            uint256 reserveOut = totalSupply();
            uint256 weightIn = assetIn.scale.ddiv(_scale);

            {
                uint256 invGrowthOut = DMath.ONE -
                    amountIn[i].dmul(weightIn).ddiv(reserveIn);
                amountOut += reserveOut.ddiv(invGrowthOut) - reserveOut;
            }

            _assets[_index[addressIn[i]]].reserve = reserveIn;

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

    function unstake(
        address addressOut,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        Asset memory assetOut = _assets[_index[addressOut]];

        uint256 reserveIn = totalSupply() - amountIn;
        uint256 weightOut = assetOut.scale.ddiv(_scale);
        uint256 amountOut;

        {
            uint256 invGrowthOut = DMath.ONE -
                amountIn.ddiv(weightOut.dmul(reserveIn));
            amountOut = assetOut.reserve.ddiv(invGrowthOut) - assetOut.reserve;
        }

        _assets[_index[addressOut]].reserve = assetOut.reserve - amountOut;

        SafeERC20.safeTransfer(IERC20(addressOut), addressTo, amountOut);
        _burn(_msgSender(), amountOut);

        return amountOut;
    }

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
            uint256 reserveIn = assetIn.reserve;
            uint256 valueIn = reserve0.dmul(assetIn.scale).ddiv(_scale);
            scaleIn = valueIn.dmul(amountIn).ddiv(reserveIn);
        }

        _index[addressNew] = _assets.length;
        _assets.push(
            Asset(IERC20(addressNew), amountNew, feeNew, scaleIn, kNew)
        );

        _assets[_index[addressIn]].reserve = assetIn.reserve + amountIn;
        _assets[_index[addressIn]].scale = assetIn.scale + scaleIn;

        address[] memory addresses = new address[](2);
        uint256[] memory amounts = new uint256[](2);
        addresses[0] = addressIn;
        addresses[1] = addressNew;
        amounts[0] = amountIn;
        amounts[1] = amountNew;

        return _stakeBatch(addresses, amounts, addressTo);
    }
}
