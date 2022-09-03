// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "prb-math/PRBMathUD60x18.sol";

/// @custom:title store state of an asset managed by the pool
/// @custom:member balance ammount of <asset> tokens managed by the pool
/// @custom:member scale used to maintain the relative weights of assets
/// @custom:member fee fixed transaction fee for depositing/withdrawing the asset, in 60x18 format
/// @custom:member token fixed address of the coresponding ERC20 contract
struct Asset {
    uint256 balance;
    uint256 scale;
    uint256 fee;
    address token;
}

/// @custom:title represents the state changed by a `swap` operation
/// @custom:dev this is a pure data structure and should not be mutated after initialization
/// @custom:member poolScale pool `_scale`
/// @custom:member assetInBalance balance of the asset being deposited during a swap
/// @custom:member assetInScale scale of the asset being deposited during a swap
/// @custom:member assetOutBalance balance of the asset being withdrawn during a swap
/// @custom:member assetOutScale scale the asset being withdrawn during a swap
struct SwapState {
    uint256 poolScale;
    uint256 assetInBalance;
    uint256 assetInScale;
    uint256 assetOutBalance;
    uint256 assetOutScale;
}

/// @custom:dev used for both `stake` and `unstake` operations
/// @custom:member poolBalance pool `_balance`
/// @custom:member poolScale pool `_scale`
/// @custom:member assetBalance balance of asset being withdrawn/deposited
/// @custom:member assetScale scale of asset being withdrawn/deposited
struct StakeState {
    uint256 poolBalance;
    uint256 poolScale;
    uint256 assetBalance;
    uint256 assetScale;
}

struct MSState {
    uint256 poolBalance;
    uint256 poolScale;
    Asset[] assets;
}

struct AssetAfter {
    uint256 balance;
    uint256 scale;
    uint256 balanceDelta;
    address token;
}

struct MSStateAfter {
    uint256 poolBalanceDelta;
    uint256 poolScaleDelta;
    AssetAfter[] assets;
}

contract Pool is ReentrancyGuard, ERC20, Ownable {
    using SafeERC20 for IERC20;
    using PRBMathUD60x18 for uint256;

    uint256 private _isInitialized = 0;
    uint256 private _balance;
    uint256 private _scale;
    uint256 private constant ONE = 10**18; // Number of decimals

    // The `address` here is the address of the respective external asset token contract.
    mapping(address => uint256) private _index;
    Asset[] private _assets;

    error AlreadyInitialized();
    error NotInitialized();
    error Unauthorized(address initializer, address adder);

    error LengthMismatch(uint256 expected, uint256 actual);
    error InsufficientAllowance(uint256 availabe, uint256 required);
    error IncorrectAllocation(uint256 expected, uint256 actual);
    error DuplicateToken(address payToken);
    error InvalidSwap(address payToken, address receiveToken);
    error InvalidStake(address payToken);
    error InvalidUnstake(address receiveToken);
    error AssetNotFound(address asset);

    event SwapStep(SwapState newState, address assetIn, address assetOut);
    event StakeStep(StakeState newState, address asset);
    event UnstakeStep(StakeState newState, address asset);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function addAsset(
        address payToken_,
        uint256 balance_,
        uint256 fee_,
        uint256 assetScale_
    ) public nonReentrant onlyOwner {
        if (_isInitialized == 1) revert AlreadyInitialized();

        uint256 available = IERC20(payToken_).allowance(_msgSender(), address(this));
        if (balance_ > available) revert InsufficientAllowance(available, balance_);

        _balance += assetScale_;
        _scale += assetScale_;

        SafeERC20.safeTransferFrom(IERC20(payToken_), _msgSender(), address(this), balance_);

        _index[payToken_] = _assets.length;
        _assets.push(Asset(balance_, assetScale_, fee_, payToken_));
    }

    function initialize() public nonReentrant onlyOwner {
        if (_isInitialized == 1) revert AlreadyInitialized();

        _isInitialized = 1;
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
        return (poolAddress, poolMetadata.name(), poolMetadata.symbol(), poolMetadata.decimals(), _balance, _scale);
    }

    function assets() public view returns (Asset[] memory) {
        return _assets;
    }

    function asset(address token) public view returns (Asset memory) {
        Asset memory result = _assets[_index[token]];
        if (result.token != token) revert AssetNotFound(token);
        return result;
    }

    function balance() public view returns (uint256) {
        return _balance;
    }

    function stakeStep(
        StakeState memory t0,
        uint256 assetBalanceDelta,
        uint256 fee
    ) internal pure returns (StakeState memory t1, uint256 poolBalanceDelta) {
        t1.assetBalance = t0.assetBalance + assetBalanceDelta;
        uint256 weight = t0.assetScale.div(t0.poolScale);
        uint256 gamma = ONE - fee;
        uint256 invGrowth = ONE - gamma.mul(weight).mul(assetBalanceDelta.div(t1.assetBalance));
        t1.poolBalance = t0.poolBalance.div(invGrowth);
        poolBalanceDelta = t1.poolBalance - t0.poolBalance;

        uint256 scaleDelta = fee.mul(assetBalanceDelta);
        t1.poolScale = t0.poolScale + scaleDelta;
        t1.assetScale = t0.assetScale + scaleDelta;
    }

    function unstakeStep(
        StakeState memory t0,
        uint256 poolBalanceDelta,
        uint256 fee
    ) internal pure returns (StakeState memory t1, uint256 assetDelta) {
        t1.poolBalance = t0.poolBalance - poolBalanceDelta;
        uint256 weight = t0.assetScale.div(t0.poolScale);
        uint256 gamma = ONE - fee;
        uint256 invGrowth = ONE + gamma.div(weight).mul(poolBalanceDelta.div(t1.poolBalance));
        t1.assetBalance = t0.assetBalance.div(invGrowth);
        assetDelta = t0.assetBalance - t1.assetBalance;

        uint256 scaleDelta = fee.mul(assetDelta);
        t1.poolScale = t0.poolScale + scaleDelta;
        t1.assetScale = t0.assetScale + scaleDelta;
    }

    function swapStep(
        SwapState memory t0,
        uint256 assetInBalanceDelta,
        uint256 assetInFee,
        uint256 assetOutFee
    ) internal pure returns (SwapState memory t1, uint256 assetOutBalanceDelta) {
        t1.assetInBalance = t0.assetInBalance + assetInBalanceDelta;
        uint256 gamma = (ONE - assetInFee).mul(ONE - assetOutFee);
        uint256 weight = t0.assetInScale.div(t0.assetOutScale);
        uint256 invGrowth = ONE + gamma.mul(weight).mul(assetInBalanceDelta.div(t1.assetInBalance));
        t1.assetOutBalance = t0.assetOutBalance.div(invGrowth);
        assetOutBalanceDelta = t0.assetOutBalance - t1.assetOutBalance;

        uint256 assetInScaleDelta = assetInFee.mul(assetInBalanceDelta);
        uint256 assetOutScaleDelta = assetOutFee.mul(assetOutBalanceDelta);
        t1.assetInScale = t0.assetInScale + assetInScaleDelta;
        t1.assetOutScale = t0.assetOutScale + assetOutScaleDelta;
        t1.poolScale = t0.poolScale + assetInScaleDelta + assetOutScaleDelta;
    }

    function multiswapInputChecks(
        uint256 poolAllocation,
        address[] memory payTokens,
        uint256[] calldata amounts,
        address[] memory receiveTokens,
        uint256[] calldata allocations
    ) internal pure {
        // Check length mismatch
        if (payTokens.length != amounts.length) revert LengthMismatch(payTokens.length, amounts.length);
        if (receiveTokens.length != allocations.length) revert LengthMismatch(receiveTokens.length, allocations.length);
        // check for duplicate tokens
	/*
        for (uint256 i; i < payTokens.length; i++) {
            address payToken = payTokens[i];
            for (uint256 j; j < receiveTokens.length; j++) {
                if (payToken == receiveTokens[j]) revert DuplicateToken(payToken);
            }
        }
	*/
        // check alloacation sums to ONE
        {
            uint256 totalAllocation = poolAllocation;
            for (uint256 i; i < receiveTokens.length; i++) {
                totalAllocation += allocations[i];
            }
            if (totalAllocation != 1e18) revert IncorrectAllocation(1e18, totalAllocation);
        }
    }

    function pureDepositStep(
        MSState memory t0,
        uint256[] calldata amounts,
        uint256 poolDeposit
    ) internal pure returns (MSStateAfter memory t1, uint256 valueDelta) {
        t1.assets = new AssetAfter[](t0.assets.length);
        if (poolDeposit != 0) {
            t1.poolBalanceDelta = poolDeposit;
            valueDelta += poolDeposit.div(t0.poolBalance);
        }
        for (uint256 i; i < t0.assets.length; i++) {
            Asset memory t0Asset = t0.assets[i];
            uint256 assetBalanceDelta = amounts[i];
            // calculate deltas
            uint256 gamma = ONE - t0Asset.fee;
            uint256 weight = t0Asset.scale.div(t0.poolScale);
            uint256 t1AssetBalance = t0Asset.balance + assetBalanceDelta;
            uint256 valueDelta_i = gamma.mul(weight).mul(assetBalanceDelta.div(t1AssetBalance));
            uint256 scaleDelta = t0Asset.fee.mul(assetBalanceDelta);
            // update state
            t1.assets[i] = AssetAfter(t1AssetBalance, t0Asset.scale + scaleDelta, assetBalanceDelta, t0Asset.token);
            t1.poolScaleDelta += scaleDelta;
            valueDelta += valueDelta_i;
        }
    }

    function pureWithdrawStep(
        MSState memory t0,
        uint256[] calldata allocations,
        uint256 poolAllocation,
        uint256 valueIn
    ) internal pure returns (MSStateAfter memory t1) {
        t1.assets = new AssetAfter[](t0.assets.length);
        if (poolAllocation != 0) {
            uint256 factor = valueIn.mul(poolAllocation);
            t1.poolBalanceDelta = t0.poolBalance.mul(factor).div(ONE - factor);
        }
        for (uint256 i; i < t0.assets.length; i++) {
	    // TODO try pushing
            Asset memory t0Asset = t0.assets[i];
            // calculate deltas
            uint256 weight = t0Asset.scale.div(t0.poolScale);
            uint256 factor = (ONE - t0Asset.fee).div(weight).mul(allocations[i]).mul(valueIn);
            uint256 assetBalanceDelta = t0Asset.balance.mul(factor).div(factor + ONE);
            uint256 scaleDelta = t0Asset.fee.mul(assetBalanceDelta); // update state
            t1.assets[i] = AssetAfter(
                t0Asset.balance - assetBalanceDelta,
                t0Asset.scale + scaleDelta,
                assetBalanceDelta,
                t0Asset.token
            );
            t1.poolScaleDelta += scaleDelta;
        }
    }

    function multiswap(
        uint256 poolDeposit,
        uint256 poolAllocation,
        address[] memory payTokens,
        uint256[] calldata amounts,
        address[] memory receiveTokens,
        uint256[] calldata allocations
    ) external nonReentrant returns (uint256[] memory receiveAmounts) {
        multiswapInputChecks(poolAllocation, payTokens, amounts, receiveTokens, allocations);

        // pure step t0 -> t1
        MSState memory t0 = MSState(_balance, _scale, new Asset[](payTokens.length));
        for (uint256 i; i < payTokens.length; i++) {
            t0.assets[i] = _assets[_index[payTokens[i]]];
        }
        (MSStateAfter memory depositT1, uint256 valueDelta) = pureDepositStep(t0, amounts, poolDeposit);

        t0.assets = new Asset[](receiveTokens.length);
        for (uint256 i; i < receiveTokens.length; i++) {
            t0.assets[i] = _assets[_index[receiveTokens[i]]];
        }
        MSStateAfter memory withdrawT1 = pureWithdrawStep(t0, allocations, poolAllocation, valueDelta);

        // external
        _scale += depositT1.poolScaleDelta + withdrawT1.poolScaleDelta;
        assert(depositT1.poolBalanceDelta == 0 || withdrawT1.poolBalanceDelta == 0);
        if (depositT1.poolBalanceDelta == 0) {
            _balance -= depositT1.poolBalanceDelta;
            _burn(_msgSender(), depositT1.poolBalanceDelta);
        }
        if (withdrawT1.poolBalanceDelta == 0) {
            _balance += depositT1.poolBalanceDelta;
            _mint(_msgSender(), depositT1.poolBalanceDelta);
        }

        for (uint256 i; i < payTokens.length; i++) {
            AssetAfter memory x = depositT1.assets[i];
            Asset storage assetX = _assets[_index[x.token]];
            assetX.balance = x.balance;
            assetX.scale = x.scale;
            SafeERC20.safeTransferFrom(IERC20(x.token), _msgSender(), address(this), x.balanceDelta);
        }
        for (uint256 i; i < withdrawT1.assets.length; i++) {
            AssetAfter memory x = withdrawT1.assets[i];
            Asset storage assetX = _assets[_index[x.token]];
            assetX.balance = x.balance;
            assetX.scale = x.scale;
            SafeERC20.safeTransfer(IERC20(x.token), _msgSender(), x.balanceDelta);
        }

        //emit MultiswapStep(_balance, _scale, depositT1.assets, withdrawT1.assets);
    }

    function swap(
        address payToken,
        address receiveToken,
        uint256 amountIn,
        address addressTo
    ) public nonReentrant returns (uint256) {
        if (_isInitialized == 0) revert NotInitialized();

        Asset storage assetIn = _assets[_index[payToken]];
        Asset storage assetOut = _assets[_index[receiveToken]];
        // Check if addresses are in the set of assets.
        if (assetIn.token != payToken || assetOut.token != receiveToken) revert InvalidSwap(payToken, receiveToken);

        SwapState memory t0 = SwapState(_scale, assetIn.balance, assetIn.scale, assetOut.balance, assetOut.scale);
        (SwapState memory t1, uint256 assetOutBalanceDelta) = swapStep(t0, amountIn, assetIn.fee, assetOut.fee);

        assetIn.balance = t1.assetInBalance;
        assetOut.balance = t1.assetOutBalance;
        assetIn.scale = t1.assetInScale;
        assetOut.scale = t1.assetOutScale;
        _scale = t1.poolScale;

        emit SwapStep(t1, assetIn.token, assetOut.token);

        SafeERC20.safeTransferFrom(IERC20(payToken), _msgSender(), address(this), amountIn);
        SafeERC20.safeTransfer(IERC20(receiveToken), addressTo, assetOutBalanceDelta);

        return assetOutBalanceDelta;
    }

    function stake(
        address payToken,
        uint256 assetBalanceDelta,
        address addressTo
    ) public nonReentrant returns (uint256) {
        if (_isInitialized == 0) revert NotInitialized();

        Asset storage assetIn = _assets[_index[payToken]];
        // Check if `payToken` is an asset.
        if (assetIn.token != payToken) revert InvalidStake(payToken);

        StakeState memory t0 = StakeState(_balance, _scale, assetIn.balance, assetIn.scale);
        (StakeState memory t1, uint256 poolBalanceDelta) = stakeStep(t0, assetBalanceDelta, assetIn.fee);

        _balance = t1.poolBalance;
        _scale = t1.poolScale;
        assetIn.balance = t1.assetBalance;
        assetIn.scale = t1.assetScale;

        emit StakeStep(t1, assetIn.token);

        SafeERC20.safeTransferFrom(IERC20(payToken), _msgSender(), address(this), assetBalanceDelta);
        _mint(addressTo, poolBalanceDelta);

        return poolBalanceDelta;
    }

    function unstake(
        address receiveToken,
        uint256 poolBalanceDelta,
        address addressTo
    ) public nonReentrant returns (uint256) {
        if (_isInitialized == 0) revert NotInitialized();

        Asset storage assetOut = _assets[_index[receiveToken]];
        // Check if `receiveToken` is an asset.
        if (assetOut.token != receiveToken) revert InvalidUnstake(receiveToken);

        StakeState memory t0 = StakeState(_balance, _scale, assetOut.balance, assetOut.scale);
        (StakeState memory t1, uint256 assetBalanceDelta) = unstakeStep(t0, poolBalanceDelta, assetOut.fee);

        _balance = t1.poolBalance;
        _scale = t1.poolScale;
        assetOut.balance = t1.assetBalance;
        assetOut.scale = t1.assetScale;

        emit UnstakeStep(t1, assetOut.token);

        SafeERC20.safeTransfer(IERC20(receiveToken), addressTo, assetBalanceDelta);
        _burn(_msgSender(), poolBalanceDelta);

        return assetBalanceDelta;
    }
}
