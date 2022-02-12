// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./libraries/SafeMath.sol";

contract Pool is ERC20 {
    using SafeERC20 for IERC20;
    using SafeMath for uint;

    // The `address` here is the address of the respective external asset token contract.
    mapping(address => Asset) private assets;

    // Parameter for exponentially weighted moving averages
    uint private alpha;

    struct Asset {

        address token;
        uint fee; // Transaction fee, e.g. 0.003
        uint reserve; // Number of asset tokens in pool
        uint weight; // Market value weight of this asset token, sum_i w_i = 10^18
        uint k; // AMM parameter for this asset token
        bool isActive; // Flag to indicate whether this asset token is actively traded

    }

    // From Uniswap v2
    uint private unlocked = 1;

    modifier lock() {

        require(unlocked == 1, "LOCKED");
        unlocked = 0;
        _;
        unlocked = 1;

    }

    constructor(
        string memory name,
        string memory symbol,
        uint totalSupply,
        Asset[] memory _assets
    ) ERC20(name, symbol) lock {

        uint sumWeights = 0;

        _mint(msg.sender, totalSupply);
        for (uint i=0; i<_assets.length; i++) {
            Asset memory asset = _assets[i];
            assets[asset.token] = asset;
            sumWeights = sumWeights.add(asset.weight);
        }

        require(sumWeights == SafeMath.UNIT,"Weights must sum to 1.");

    }

    function getAsset(address token) public view returns (Asset memory asset) {

        asset = assets[token];

    }

    function addAsset() public lock {

        alpha = 1;

    }

    function swap(address addressIn, address addressOut, address addressTo, uint amountIn) public lock {

        Asset memory assetIn = assets[addressIn];
        require(assetIn.isActive,"Asset is not active");

        Asset memory assetOut = assets[addressOut];
        require(assetOut.isActive,"Asset is not active");

        uint reserveIn = assetIn.reserve.add(amountIn);
        uint weightIn;
        uint weightOut;
        uint amountOut;

        {

            uint deltaWeight = assetIn.weight.dmul(amountIn).ddiv(assetIn.reserve);
            weightIn = alpha.dmul(assetIn.weight.add(deltaWeight)).sub(alpha.sub(SafeMath.UNIT).dmul(assetIn.weight));
            weightOut = alpha.dmul(assetOut.weight.sub(deltaWeight)).sub(alpha.sub(SafeMath.UNIT).dmul(assetOut.weight));

            require(assetIn.weight.add(assetOut.weight) == weightIn.add(weightOut),"Weight 1 + Weight 2 must not change.");

            uint weightRatio = weightIn.ddiv(weightOut);
            uint invGrowthOut = weightRatio.dmul(amountIn.ddiv(reserveIn)).add(SafeMath.UNIT);
            uint preFeeReserveOut = assetOut.reserve.ddiv(invGrowthOut);
            uint preFeeAmountOut = preFeeReserveOut.sub(assetOut.reserve);
            // uint preFeeAmountOut = assetOut.reserve.ddiv(invGrowthOut).sub(assetOut.reserve);
            uint feeAmount = preFeeAmountOut.dmul(assetOut.fee);
            amountOut = preFeeAmountOut - feeAmount;

        }

        assetIn.reserve = reserveIn;
        assetOut.reserve = assetOut.reserve.sub(amountOut);

        assetIn.weight = weightIn;
        assetOut.weight = weightOut;

        SafeERC20.safeTransferFrom(IERC20(addressIn), addressIn, msg.sender, amountIn);
        SafeERC20.safeTransfer(IERC20(addressOut), addressTo, amountOut);

    }

}
