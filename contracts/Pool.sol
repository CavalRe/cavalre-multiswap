// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./libraries/SafeMath.sol";

contract Pool is ReentrancyGuard, ERC20 {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    // The `address` here is the address of the respective external asset token contract.
    mapping(address => uint256) private index;
    Asset[] private assets;

    // Parameter for exponentially weighted moving averages
    uint256 private alpha;

    uint256 private scale;

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
        scale = poolSupply;
        _mint(_msgSender(), poolSupply);
        uint256 checkWeight = 0;
        for (uint256 i = 0; i < weights.length; i++) {
            index[tokens[i]] = i;
            assets.push(
                Asset(
                    IERC20(tokens[i]),
                    reserves[i],
                    fees[i],
                    weights[i].dmul(poolSupply),
                    ks[i]
                )
            );
            checkWeight = checkWeight.add(weights[i]);

            SafeERC20.safeTransferFrom(
                IERC20(tokens[i]),
                _msgSender(),
                address(this),
                reserves[i]
            );
        }
        require(checkWeight == 1e18, "Weights must sum to 1.");
    }

    function asset(address token) internal view returns (Asset memory) {
        return assets[index[token]];
    }

    function reserve(address token) public view returns (uint256) {
        return asset(token).reserve;
    }

    function weight(address token) public view returns (uint256) {
        return asset(token).scale.ddiv(scale);
    }

    function swap(
        address addressIn,
        address addressOut,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        Asset memory assetIn = assets[index[addressIn]];
        Asset memory assetOut = assets[index[addressOut]];

        uint256 reserveIn = assetIn.reserve.add(amountIn);
        uint256 amountOut;

        {
            uint256 weightRatio = assetIn.scale.ddiv(assetOut.scale);
            uint256 invGrowthOut = weightRatio
                .dmul(amountIn.ddiv(reserveIn))
                .add(SafeMath.UNIT);
            uint256 preFeeReserveOut = assetOut.reserve.ddiv(invGrowthOut);
            uint256 preFeeAmountOut = assetOut.reserve.sub(preFeeReserveOut);
            uint256 feeAmount = preFeeAmountOut.dmul(assetOut.fee);
            amountOut = preFeeAmountOut - feeAmount;
        }

        assets[index[addressIn]].reserve = reserveIn;
        assets[index[addressOut]].reserve = assetOut.reserve.sub(amountOut);

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
        Asset memory assetIn = assets[index[addressIn]];

        uint256 reserveIn = assetIn.reserve.add(amountIn);
        uint256 reserveOut = totalSupply();
        uint256 weightIn = assetIn.scale.ddiv(scale);
        uint256 amountOut;

        {
            uint256 invGrowthOut = SafeMath.UNIT.sub(
                amountIn.dmul(weightIn).ddiv(reserveIn)
            );
            amountOut = reserveOut.ddiv(invGrowthOut).sub(reserveOut);
        }

        assets[index[addressIn]].reserve = reserveIn;

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

        uint256 amountOut = 0;

        for (uint256 i = 0; i < n; i++) {
            Asset memory assetIn = assets[index[addressIn[i]]];

            uint256 reserveIn = assetIn.reserve.add(amountIn[i]);
            uint256 reserveOut = totalSupply();
            uint256 weightIn = assetIn.scale.ddiv(scale);

            {
                uint256 invGrowthOut = SafeMath.UNIT.sub(
                    amountIn[i].dmul(weightIn).ddiv(reserveIn)
                );
                amountOut = amountOut.add(
                    reserveOut.ddiv(invGrowthOut).sub(reserveOut)
                );
            }

            assets[index[addressIn[i]]].reserve = reserveIn;

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
        Asset memory assetOut = assets[index[addressOut]];

        uint256 reserveIn = totalSupply().sub(amountIn);
        uint256 weightOut = assetOut.scale.ddiv(scale);
        uint256 amountOut;

        {
            uint256 invGrowthOut = SafeMath.UNIT.sub(
                amountIn.ddiv(weightOut.dmul(reserveIn))
            );
            amountOut = assetOut.reserve.ddiv(invGrowthOut).sub(
                assetOut.reserve
            );
        }

        assets[index[addressOut]].reserve = assetOut.reserve.sub(amountOut);

        SafeERC20.safeTransfer(IERC20(addressOut), _msgSender(), amountOut);
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
        Asset memory assetIn = assets[index[addressIn]];

        uint256 scaleIn;

        {
            uint256 reserve0 = totalSupply();
            uint256 reserveIn = assetIn.reserve;
            uint256 valueIn = reserve0.dmul(assetIn.scale).ddiv(scale);
            scaleIn = valueIn.dmul(amountIn).ddiv(reserveIn);
        }

        index[addressNew] = assets.length;
        assets.push(
            Asset(IERC20(addressNew), amountNew, feeNew, scaleIn, kNew)
        );

        assets[index[addressIn]].reserve = assetIn.reserve.add(amountIn);
        assets[index[addressIn]].scale = assetIn.scale.add(scaleIn);

        address[] memory addresses = new address[](2);
        uint256[] memory amounts = new uint256[](2);
        addresses[0] = addressIn;
        addresses[1] = addressNew;
        amounts[0] = amountIn;
        amounts[1] = amountNew;

        return _stakeBatch(addresses, amounts, addressTo);
    }
}
