// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./libraries/DMath.sol";

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

contract Pool is ReentrancyGuard, ERC20 {
    using SafeERC20 for IERC20;
    using DMath for uint256;

    address private _initializer;

    uint256 private _isInitialized;

    uint256 private _balance;

    uint256 private _scale;

    // The `address` here is the address of the respective external asset token contract.
    mapping(address => uint256) private _index;
    Asset[] private _assets;

    error Unauthorized(address initializer, address adder);

    error LengthMismatch(uint256 expected, uint256 actual);

    error InsufficientAllowance(uint256 availabe, uint256 required);

    error IncorrectAllocation(uint256 expected, uint256 actual);

    error DuplicateToken(address payToken);

    error InvalidSwap(address payToken, address receiveToken);

    error InvalidStake(address payToken);

    error InvalidUnstake(address receiveToken);

    error AlreadyInitialized();

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _initializer = _msgSender();
    }

    function addAsset(
        address payToken_,
        uint256 balance_,
        uint256 fee_,
        uint256 assetScale_,
        uint256 k_
    ) public nonReentrant {
        if (_initializer != _msgSender()) revert Unauthorized(_initializer, _msgSender());

        if (_isInitialized == 1) revert AlreadyInitialized();

        uint256 available = IERC20(payToken_).allowance(
            _msgSender(),
            address(this)
        );
        if (balance_ > available)
            revert InsufficientAllowance(available, balance_);

        _balance += assetScale_;
        _scale += assetScale_;

        SafeERC20.safeTransferFrom(
            IERC20(payToken_),
            _msgSender(),
            address(this),
            balance_
        );

        _index[payToken_] = _assets.length;
        _assets.push(
            Asset(
                IERC20(payToken_),
                IERC20Metadata(payToken_).name(),
                IERC20Metadata(payToken_).symbol(),
                IERC20Metadata(payToken_).decimals(),
                balance_,
                fee_,
                assetScale_,
                k_
            )
        );
    }

    function initialize() public nonReentrant {
        if (_initializer != _msgSender()) revert Unauthorized(_initializer, _msgSender());

        if (_isInitialized == 1) revert AlreadyInitialized();

        _isInitialized == 1;

        _mint(_msgSender(), _scale);
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

    function asset(address token) public view returns (Asset memory) {
        return _assets[_index[token]];
    }

    function balance() public view returns (uint256) {
        return _balance;
    }

    // function balance(address token) public view returns (uint256) {
    //     return asset(token).balance;
    // }

    // function weight(address token) public view returns (uint256) {
    //     return asset(token).scale.ddiv(_scale);
    // }

    // function scale() public view returns (uint256) {
    //     return _scale;
    // }

    // function scale(address token) public view returns (uint256) {
    //     return asset(token).scale;
    // }

    // function fee(address token) public view returns (uint256) {
    //     return asset(token).fee;
    // }

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
                    _balance -= amountIn;
                    fracValueIn += amountIn.ddiv(_balance);
                } else {
                    Asset storage assetIn = _assets[_index[payToken]];
                    uint256 gamma = DMath.ONE - assetIn.fee;
                    uint256 weightIn = assetIn.scale.ddiv(_scale);
                    fracValueIn += gamma.dmul(weightIn).dmul(amountIn).ddiv(
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
                    Asset storage assetOut = _assets[_index[receiveToken]];
                    uint256 gamma = DMath.ONE - assetOut.fee;
                    uint256 weightOut = assetOut.scale.ddiv(_scale);
                    factor = gamma.ddiv(weightOut).dmul(allocation).dmul(
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
                        amount
                    );
                    delta = _assets[_index[payToken]].fee.dmul(amount);
                    _assets[_index[payToken]].scale += delta;
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
                        amountOut
                    );
                    delta = _assets[_index[receiveToken]].fee.dmul(amountOut);
                    _assets[_index[receiveToken]].scale += delta;
                    _scale += delta;
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
        Asset storage assetIn = _assets[_index[payToken]];
        Asset storage assetOut = _assets[_index[receiveToken]];
        // Check if swap
        if (
            address(assetIn.token) != payToken ||
            address(assetOut.token) != receiveToken
        ) revert InvalidSwap(payToken, receiveToken);
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
        _scale += deltaIn + deltaOut;

        return amountOut;
    }

    function stake(
        address payToken,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        Asset storage assetIn = _assets[_index[payToken]];
        // Check if stake
        if (address(assetIn.token) != payToken) revert InvalidStake(payToken);
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
        Asset storage assetOut = _assets[_index[receiveToken]];
        // Check if unstake
        if (address(assetOut.token) != receiveToken)
            revert InvalidUnstake(receiveToken);
        // Check allowance
        {
            uint256 available = this.allowance(_msgSender(), address(this));
            if (amountIn > available)
                revert InsufficientAllowance(available, amountIn);
        }

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

        SafeERC20.safeTransfer(IERC20(receiveToken), addressTo, amountOut);
        _burn(_msgSender(), amountIn);

        return amountOut;
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
