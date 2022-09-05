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
}

struct MSData {
    uint256 deposit;
    uint256 allocation;
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
    uint8[] private DECIMALS;
    uint256[] private FEE;
    address[] private ADDRESS;

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

    function toCanonical(uint256 amount, uint8 decimals) internal pure returns (uint256) {
        if (decimals == 18) return amount;
        if (decimals < 18) return amount / (10**(18 - decimals));
        if (decimals > 18) return amount * (10**(decimals - 18));
        assert(false);
    }

    function transferIn(
        address assetAddress,
        uint256 amount,
        uint8 decimals
    ) internal returns (uint256 absolute) {
        absolute = toCanonical(amount, decimals);
        SafeERC20.safeTransferFrom(IERC20(assetAddress), _msgSender(), address(this), absolute);
    }

    function transferOut(
        address assetAddress,
        address beneficiary,
        uint256 amount,
        uint8 decimals
    ) internal returns (uint256 absolute) {
        absolute = toCanonical(amount, decimals);
        SafeERC20.safeTransfer(IERC20(assetAddress), beneficiary, absolute);
    }

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

        _index[payToken_] = _assets.length;
        IERC20Metadata metadata = IERC20Metadata(payToken_);
        _assets.push(Asset(balance_, assetScale_));
        ADDRESS.push(payToken_);
        FEE.push(fee_);
        DECIMALS.push(metadata.decimals());

        transferIn(payToken_, balance_, metadata.decimals());
    }

    function uninitialize(uint256 assetIndex) public nonReentrant onlyOwner {
        if (_isInitialized == 1) revert AlreadyInitialized();

        Asset memory x = _assets[assetIndex];
        SafeERC20.safeTransfer(IERC20(ADDRESS[assetIndex]), owner(), x.balance);
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

    /*
    function assets() public view returns (Asset[] memory) {
        return _assets;
    }

    function asset(address token) public view returns (Asset memory) {
        Asset memory result = _assets[_index[token]];
        if (result.token != token) revert AssetNotFound(token);
        return result;
    }
    */

    function balance() public view returns (uint256) {
        return _balance;
    }

    /*
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
    */

    function processDeposits(
        uint256 t0PoolBalance,
        uint256 t0PoolScale,
        MSData[] calldata params
    )
        internal
        returns (
            uint256 poolBalanceDelta,
            uint256 poolScaleDelta,
            uint256 valueDelta
        )
    {
        // pool deposit
        MSData calldata poolData = params[params.length - 1];
        if (poolData.deposit != 0) {
            require(poolData.allocation == 0);
            valueDelta += poolData.deposit.div(t0PoolBalance);
            poolBalanceDelta = poolData.deposit;
            _burn(_msgSender(), poolBalanceDelta);
        }
        // asset deposit
        for (uint256 i; i < params.length - 1; i++) {
            // setup
            MSData calldata x = params[i];
            if (x.deposit == 0) continue;
            require(x.allocation == 0);
            uint256 assetBalanceDelta = x.deposit;
            Asset storage t0Asset = _assets[i];
            // calculate deltas
            uint256 fee = FEE[i];
            uint256 gamma = ONE - fee;
            uint256 weight = t0Asset.scale.div(t0PoolScale);
            uint256 t1AssetBalance = t0Asset.balance + assetBalanceDelta;
            uint256 valueDeltaI = gamma.mul(weight).mul(assetBalanceDelta.div(t1AssetBalance));
            uint256 scaleDelta = fee.mul(assetBalanceDelta);
            // move this asset forward in time
            t0Asset.balance = t1AssetBalance;
            t0Asset.scale += scaleDelta;
            poolScaleDelta += poolScaleDelta;
            valueDelta += valueDeltaI;
            transferIn(ADDRESS[i], assetBalanceDelta, DECIMALS[i]);
        }
    }

    function processWithdrawals(
        uint256 t0PoolBalance,
        uint256 t0PoolScale,
        uint256 valueIn,
        MSData[] calldata params
    ) internal returns (uint256 poolBalanceDelta, uint256 poolScaleDelta) {
        // pool withdrawal
        MSData calldata poolData = params[params.length - 1];
        if (poolData.allocation != 0) {
            require(poolData.deposit == 0);
            uint256 factor = valueIn.mul(poolData.allocation);
            poolBalanceDelta = poolData.deposit.mul(factor).div(ONE - factor);
            _mint(_msgSender(), poolBalanceDelta);
        }
        // asset withdrawal
        for (uint256 i; i < params.length; i++) {
            // setup
            MSData calldata x = params[i];
            if (x.allocation == 0) continue;
            require(x.deposit == 0);
            Asset memory t0Asset = _assets[i];
            // calculate deltas
            uint256 fee = FEE[i];
            uint256 weight = t0Asset.scale.div(t0PoolScale);
            uint256 factor = (ONE - fee).div(weight).mul(x.allocation).mul(valueIn);
            uint256 assetBalanceDelta = t0Asset.balance.mul(factor).div(factor + ONE);
            uint256 scaleDelta = fee.mul(assetBalanceDelta);
            // move asset forward in time
            t0Asset.balance -= assetBalanceDelta;
            t0Asset.scale += scaleDelta;
            poolScaleDelta += scaleDelta;
            transferOut(ADDRESS[i], _msgSender(), assetBalanceDelta, DECIMALS[i]);
        }
    }

    function multiswap(MSData[] calldata params) external nonReentrant {
        if (params.length != _assets.length + 1) revert LengthMismatch(_assets.length, params.length);

        uint256 localScale = _scale;
        uint256 localBalance = _balance;
        (uint256 poolBalanceDeltaA, uint256 poolScaleDeltaA, uint256 valueDelta) = processDeposits(
            localBalance,
            localScale,
            params
        );
        (uint256 poolBalanceDeltaB, uint256 poolScaleDeltaB) = processWithdrawals(
            localBalance,
            localScale,
            valueDelta,
            params
        );

        // move pool values forward in time
        _scale = localScale + poolScaleDeltaA + poolScaleDeltaB;
        if (poolBalanceDeltaA != 0) {
            assert(poolBalanceDeltaB == 0);
            _balance = localBalance - poolBalanceDeltaA;
        }
        if (poolBalanceDeltaB != 0) {
            assert(poolBalanceDeltaA == 0);
            _balance = localBalance + poolBalanceDeltaB;
        }
    }

    /*
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

        transferIn(payToken, amountIn, assetIn.decimals);
        uint256 absoluteOut = transferOut(receiveToken, addressTo, assetOutBalanceDelta, assetOut.decimals);

        return absoluteOut;
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

        transferIn(payToken, assetBalanceDelta, assetIn.decimals);
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

        _burn(_msgSender(), poolBalanceDelta);
        uint256 absoluteOut = transferOut(receiveToken, addressTo, assetBalanceDelta, assetOut.decimals);

        return absoluteOut;
    }
    */
}
