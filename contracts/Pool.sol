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
    mapping(address => Asset) private assets;

    // Parameter for exponentially weighted moving averages
    uint256 private alpha;

    struct Asset {
        IERC20 token;
        uint256 fee; // Transaction fee, e.g. 0.003
        uint256 weight; // Market value weight of this asset token, sum_i w_i = 10^18
        uint256 k; // AMM parameter for this asset token
    }

    constructor(string memory name, string memory symbol)
        ERC20(name, symbol)
        nonReentrant
    {}

    function initialize(
        address[] memory tokens,
        uint256[] memory reserves,
        uint256[] memory fees,
        uint256[] memory weights,
        uint256[] memory ks
    ) public {
        uint256 checkWeight = 0;
        address token;
        uint256 reserve;
        uint256 fee;
        uint256 weight;
        uint256 k;
        for (uint256 i = 0; i < weights.length; i++) {
            token = tokens[i];
            reserve = reserves[i];
            fee = fees[i];
            weight = weights[i];
            k = ks[i];

            assets[token] = Asset(
                IERC20(token),
                fee,
                weight,
                k
            );
            checkWeight = checkWeight.add(weight);

            SafeERC20.safeTransferFrom(
                IERC20(token),
                _msgSender(),
                address(this),
                reserve
            );
        }
        require(checkWeight == 1e18, "Weights must sum to 1.");
    }

    // constructor(
    //     string memory name,
    //     string memory symbol,
    //     uint256 totalSupply,
    //     Asset[] memory _assets
    // ) ERC20(name, symbol) nonReentrant {
    //     uint256 sumWeights = 0;

    //     _mint(_msgSender(), totalSupply);
    //     for (uint256 i=0; i<_assets.length; i++) {
    //         Asset asset = _assets[i];
    //         assets[asset.token()] = asset;
    //         sumWeights = sumWeights.add(asset.weight());
    //     }

    //     require(sumWeights == SafeMath.UNIT,"Weights must sum to 1.");
    // }

    // function getAsset(address token) public view returns (Asset asset) {
    //     asset = assets[token];
    // }

    // function addAsset() public nonReentrant {
    //     alpha = 1;
    // }

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
}
