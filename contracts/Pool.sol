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

    struct Asset {
        IERC20 token;
        uint256 fee; // Transaction fee, e.g. 0.003
        uint256 weight; // Market value weight of this asset token, sum_i w_i = 10^18
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
        uint256 checkWeight = 0;
        for (uint256 i = 0; i < weights.length; i++) {
            index[tokens[i]] = i;
            assets.push(Asset(IERC20(tokens[i]), fees[i], weights[i], ks[i]));
            checkWeight = checkWeight.add(weights[i]);

            SafeERC20.safeTransferFrom(
                IERC20(tokens[i]),
                _msgSender(),
                address(this),
                reserves[i]
            );
            _mint(_msgSender(), poolSupply);
        }
        require(checkWeight == 1e18, "Weights must sum to 1.");
    }

    function asset(address token) public view returns (Asset memory asset) {
        asset = assets[index[token]];
    }

    // function swap(
    //     address addressIn,
    //     address addressOut,
    //     address addressTo,
    //     uint256 amountIn
    // ) public nonReentrant {
    //     Asset assetIn = assets[addressIn];
    //     require(assetIn.isActive(),"Asset is not active");

    //     Asset assetOut = assets[addressOut];
    //     require(assetOut.isActive(),"Asset is not active");

    //     uint256 reserveIn = assetIn.totalSupply().add(amountIn);
    //     uint256 weightIn;
    //     uint256 weightOut;
    //     uint256 amountOut;

    //     {
    //         uint256 deltaWeight = assetIn.weight().dmul(amountIn).ddiv(assetIn.totalSupply());
    //         weightIn = alpha.dmul(assetIn.weight().add(deltaWeight)).sub(alpha.sub(SafeMath.UNIT).dmul(assetIn.weight()));
    //         weightOut = alpha.dmul(assetOut.weight().sub(deltaWeight)).sub(alpha.sub(SafeMath.UNIT).dmul(assetOut.weight()));

    //         require(assetIn.weight().add(assetOut.weight()) == weightIn.add(weightOut),"Weight 1 + Weight 2 must not change.");

    //         uint256 weightRatio = weightIn.ddiv(weightOut);
    //         uint256 invGrowthOut = weightRatio.dmul(amountIn.ddiv(reserveIn)).add(SafeMath.UNIT);
    //         uint256 preFeeReserveOut = assetOut.totalSupply().ddiv(invGrowthOut);
    //         uint256 preFeeAmountOut = preFeeReserveOut.sub(assetOut.totalSupply());
    //         uint256 feeAmount = preFeeAmountOut.dmul(assetOut.fee());
    //         amountOut = preFeeAmountOut - feeAmount;
    //     }

    //     // assetIn.reserve = reserveIn;
    //     // assetOut.reserve = assetOut.totalSupply().sub(amountOut);

    //     // assetIn.weight = weightIn;
    //     // assetOut.weight = weightOut;

    //     // SafeERC20.safeTransferFrom(IERC20(addressIn), addressIn, _msgSender(), amountIn);
    //     // SafeERC20.safeTransfer(IERC20(addressOut), addressTo, amountOut);
    // }

    // function addAsset() public nonReentrant {
    //     alpha = 1;
    // }
}
