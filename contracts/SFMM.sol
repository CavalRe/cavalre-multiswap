// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./libraries/DMath.sol";

contract SFMM is ReentrancyGuard, ERC20 {
    using SafeERC20 for IERC20;
    using DMath for uint256;

    struct Asset {
        IERC20 token;
        string name;
        string symbol;
        uint8 decimals;
        uint256 balance;
        uint256 fee; // Transaction fee, e.g. 0.003
        uint256 scale; // Used to compute weight of this asset token
        uint256 k; // AMM parameter for this asset token
    }

    struct Pool {
        IERC20 token;
        string name;
        string symbol;
        uint8 decimals;
        uint256 balance;
        uint256 scale;
        Asset[] assets;
    }

    uint256 private _isInitialized;

    mapping(address => uint256) private _index;
    Pool private _pool;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _isInitialized = 0;
    }

    error LengthMismatch(uint256 expected, uint256 actual);

    error InsufficientAllowance(uint256 availabe, uint256 required);

    error IncorrectAllocation(uint256 expected, uint256 actual);

    error DuplicateToken(address payToken);

    error InvalidSwap(address payToken, address receiveToken);

    error InvalidStake(address payToken);

    error InvalidUnstake(address receiveToken);

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

        Asset[] storage _assets;

        _pool = Pool(
            IERC20(address(this)),
            IERC20Metadata(address(this)).name(),
            IERC20Metadata(address(this)).symbol(),
            IERC20Metadata(address(this)).decimals(),
            poolSupply,
            poolSupply,
            _assets
        );

        _mint(_msgSender(), poolSupply);
        // uint256 checkWeight;
        // for (uint256 i; i < weights.length; i++) {
        //     _index[payTokens[i]] = i;

        //     Asset storage _asset = Asset(
        //         IERC20(payTokens[i]),
        //         IERC20Metadata(payTokens[i]).name(),
        //         IERC20Metadata(payTokens[i]).symbol(),
        //         IERC20Metadata(payTokens[i]).decimals(),
        //         amounts[i],
        //         fees[i],
        //         weights[i].dmul(poolSupply),
        //         ks[i]
        //     );
            
        //     // _pool.assets[i] 
        //     checkWeight += weights[i];

        //     SafeERC20.safeTransferFrom(
        //         IERC20(payTokens[i]),
        //         _msgSender(),
        //         address(this),
        //         amounts[i]
        //     );
        // }
        // require(checkWeight == 1e18, "Weights must sum to 1.");

    }

    function pool() public view returns (Pool memory) {
        return _pool;
    }

    function assets() public view returns (Asset[] memory) {
        return _pool.assets;
    }

    function asset(address token) public view returns (Asset memory) {
        return _pool.assets[_index[token]];
    }

    function balance() public view returns (uint256) {
        return _pool.balance;
    }

    function balance(address token) public view returns (uint256) {
        return asset(token).balance;
    }

    function weight(address token) public view returns (uint256) {
        return asset(token).scale.ddiv(_pool.scale);
    }

    function scale() public view returns (uint256) {
        return _pool.scale;
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

        uint256 fracValueIn;

        receiveAmounts = new uint256[](receiveTokens.length);

        // Compute fracValueIn
        {
            for (uint256 i; i < payTokens.length; i++) {
                address payToken = payTokens[i];
                uint256 amountIn = amounts[i];
                if (payToken == address(this)) {
                    _pool.balance -= amountIn;
                    fracValueIn += amountIn.ddiv(_pool.balance);
                } else {
                    Asset storage assetIn = _pool.assets[_index[payToken]];
                    uint256 gamma = DMath.ONE - assetIn.fee;
                    uint256 weightIn = assetIn.scale.ddiv(_pool.scale);
                    fracValueIn += gamma.dmul(weightIn).dmul(amountIn).ddiv(assetIn.balance+amountIn);
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
                    amountOut = _pool.balance.dmul(factor).ddiv(DMath.ONE - factor);
                    receiveAmounts[i] = amountOut;
                    _pool.balance += amountOut;
                } else {
                    Asset storage assetOut = _pool.assets[_index[receiveToken]];
                    uint256 gamma = DMath.ONE - assetOut.fee;
                    uint256 weightOut = assetOut.scale.ddiv(_pool.scale);
                    factor = gamma.ddiv(weightOut).dmul(allocation).dmul(fracValueIn);
                    amountOut = assetOut.balance.dmul(factor).ddiv(factor + DMath.ONE);
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
                        amount
                    );
                    delta = _pool.assets[_index[payToken]].fee.dmul(amount);
                    _pool.assets[_index[payToken]].scale += delta;
                    _pool.scale += delta;
                }
            }

            // Transfer tokens to the receiving address
            for (uint256 i; i < receiveTokens.length; i++) {
                address receiveToken = receiveTokens[i];
                uint256 amountOut = receiveAmounts[i];
                uint256 delta;
                // Update _pool.balance and asset balances.
                if (receiveToken == address(this)) {
                    _mint(_msgSender(), amountOut);
                } else {
                    SafeERC20.safeTransfer(
                        IERC20(receiveToken),
                        _msgSender(),
                        amountOut
                    );
                    delta = _pool.assets[_index[receiveToken]].fee.dmul(amountOut);
                    _pool.assets[_index[receiveToken]].scale += delta;
                    _pool.scale += delta;
                }
            }
        }
    }

    function swap(
        address payToken,
        address receiveToken,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        Asset storage assetIn = _pool.assets[_index[payToken]];
        Asset storage assetOut = _pool.assets[_index[receiveToken]];
        // Check if swap
        if (address(assetIn.token) != payToken || address(assetOut.token) != receiveToken)
            revert InvalidSwap(payToken, receiveToken);
        // Check allowance
        {
            uint256 available = assetIn.token.allowance(
                _msgSender(),
                address(this)
            );
            if (amountIn > available)
                revert InsufficientAllowance(available, amountIn);
        }


        uint256 reserveIn = assetIn.balance + amountIn;
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 gamma = (DMath.ONE-assetIn.fee).dmul(DMath.ONE-assetOut.fee);
            uint256 weightRatio = assetIn.scale.ddiv(assetOut.scale);
            uint256 invGrowthOut = DMath.ONE + gamma.dmul(weightRatio).dmul(amountIn.ddiv(reserveIn));
            reserveOut = assetOut.balance.ddiv(invGrowthOut);
            amountOut = assetOut.balance - reserveOut;
        }

        assetIn.balance = reserveIn;
        assetOut.balance = reserveOut;

        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            amountIn
        );
        SafeERC20.safeTransfer(IERC20(receiveToken), addressTo, amountOut);

        uint256 deltaIn = assetIn.fee.dmul(amountIn);
        uint256 deltaOut = assetOut.fee.dmul(amountOut);
        assetIn.scale += deltaIn;
        assetOut.scale += deltaOut;
        _pool.scale += deltaIn + deltaOut;

        return amountOut;
    }

    function stake(
        address payToken,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        Asset storage assetIn = _pool.assets[_index[payToken]];
        // Check if stake
        if (address(assetIn.token) != payToken)
            revert InvalidStake(payToken);
        // Check allowance
        {
            uint256 available = assetIn.token.allowance(
                _msgSender(),
                address(this)
            );
            if (amountIn > available)
                revert InsufficientAllowance(available, amountIn);
        }

        uint256 reserveIn = assetIn.balance + amountIn;
        uint256 weightIn = assetIn.scale.ddiv(_pool.scale);
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 gamma = DMath.ONE-assetIn.fee;
            uint256 invGrowthOut = DMath.ONE - gamma.dmul(weightIn).dmul(amountIn.ddiv(reserveIn));
            reserveOut = _pool.balance.ddiv(invGrowthOut);
            amountOut = reserveOut - _pool.balance;
        }

        assetIn.balance = reserveIn;
        _pool.balance = reserveOut;

        uint256 delta = assetIn.fee.dmul(amountIn);
        assetIn.scale += delta;
        _pool.scale += delta;

        SafeERC20.safeTransferFrom(
            IERC20(payToken),
            _msgSender(),
            address(this),
            amountIn
        );
        _mint(addressTo, amountOut);

        return amountOut;
    }

    function unstake(
        address receiveToken,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        Asset storage assetOut = _pool.assets[_index[receiveToken]];
        // Check if unstake
        if (address(assetOut.token) != receiveToken)
            revert InvalidUnstake(receiveToken);
        // Check allowance
        {
            uint256 available = this.allowance(_msgSender(), address(this));
            if (amountIn > available)
                revert InsufficientAllowance(available, amountIn);
        }

        uint256 reserveIn = _pool.balance - amountIn;
        uint256 weightOut = assetOut.scale.ddiv(_pool.scale);
        uint256 reserveOut;
        uint256 amountOut;

        {
            uint256 gamma = DMath.ONE-assetOut.fee;
            uint256 invGrowthOut = DMath.ONE +
                gamma.ddiv(weightOut).dmul(amountIn).ddiv(reserveIn);
            reserveOut = assetOut.balance.ddiv(invGrowthOut);
            amountOut = assetOut.balance - reserveOut;
        }

        _pool.balance = reserveIn;
        assetOut.balance = reserveOut;

        uint256 delta = assetOut.fee.dmul(amountOut);
        assetOut.scale += delta;
        _pool.scale += delta;

        SafeERC20.safeTransfer(IERC20(receiveToken), addressTo, amountOut);
        _burn(_msgSender(), amountIn);

        return amountOut;
    }

}
