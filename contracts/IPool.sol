// SPDX-License-Identifier: Business Source License 1.1
pragma solidity 0.8.19;

import {ILPToken} from "@cavalre/ILPToken.sol";

struct PoolState {
    address token;
    string name;
    string symbol;
    uint8 decimals;
    int256 w;
    uint256 balance;
    uint256 meanBalance;
    uint256 scale;
    uint256 meanScale;
    uint256 lastUpdated;
}

struct AssetState {
    address token;
    uint256 index;
    string name;
    string symbol;
    uint8 decimals;
    uint256 conversion;
    uint256 fee;
    uint256 balance;
    uint256 meanBalance;
    uint256 scale;
    uint256 meanScale;
    uint256 lastUpdated;
}

interface IPool is ILPToken {
    event BalanceUpdate(
        uint256 indexed txCount,
        address indexed token,
        uint256 balance,
        uint256 meanBalance,
        uint256 userBalance
    );

    event Multiswap(
        uint256 indexed txCount,
        address indexed user,
        address[] payTokens,
        address[] receiveTokens,
        uint256[] payAmounts,
        uint256[] receiveAmounts,
        uint256 feeAmount
    );

    event Swap(
        uint256 indexed txCount,
        address indexed user,
        address payToken,
        address receiveToken,
        uint256 payAmount,
        uint256 receiveAmount,
        uint256 feeAmount
    );

    event Stake(
        uint256 indexed txCount,
        address indexed user,
        address payToken,
        uint256 payAmount,
        uint256 receiveAmount
    );

    event Unstake(
        uint256 indexed txCount,
        address indexed user,
        address receiveToken,
        uint256 payAmount,
        uint256 receiveAmount,
        uint256 feeAmount
    );

    event AddLiquidity(
        uint256 indexed txCount,
        address indexed user,
        uint256[] payAmounts,
        uint256 receiveAmount
    );

    event RemoveLiquidity(
        uint256 indexed txCount,
        address indexed user,
        uint256 payAmount,
        uint256[] receiveAmounts,
        uint256 feeAmount
    );

    event UserRemoved(address indexed user);

    event TradingPaused();

    event TradingResumed();

    error AlreadyInitialized();

    error AssetNotFound(address asset);

    error DuplicateToken(address payToken);

    error ExcessivePayAmount(uint256 expected, uint256 actual);

    error IncorrectAllocation(uint256 expected, uint256 actual);

    error IncorrectDecimals(uint256 expected, uint256 actual);

    error InsufficientReceiveAmount(uint256 expected, uint256 actual);

    error InvalidStake(address payToken);

    error InvalidSwap(address payToken, address receiveToken);

    error InvalidUnstake(address receiveToken);

    error LengthMismatch(uint256 expected, uint256 actual);

    error LPTokenFirst();

    error NotInitialized();

    error TooLarge(uint256 size);

    error TooSmall(uint256 size);

    error TradingPausedError();

    error ZeroAllocation();

    error ZeroAmount();

    error ZeroBalance();

    error ZeroLength();

    error ZeroScale();

    function addAsset(
        address token_,
        uint256 fee_, // 18 decimals
        uint256 balance_, // Token decimals
        uint256 scale_ // 18 decimals
    ) external;

    function removeAsset(address token) external;

    function initialize() external;

    function info() external view returns (PoolState memory);

    function assets() external view returns (AssetState[] memory);

    function asset(address token) external view returns (AssetState memory);

    function multiswap(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations,
        uint256[] memory minReceiveAmounts
    ) external returns (uint256[] memory receiveAmounts, uint256 feeAmount);

    function swap(
        address payToken,
        address receiveToken,
        uint256 payAmount,
        uint256 minReceiveAmount
    ) external returns (uint256 receiveAmount, uint256 feeAmount);

    function stake(
        address payToken,
        uint256 payAmount,
        uint256 minReceiveAmount
    ) external returns (uint256 receiveAmount, uint256 feeAmount);

    function unstake(
        address receiveToken,
        uint256 payAmount,
        uint256 minReceiveAmount
    ) external returns (uint256 receiveAmount, uint256 feeAmount);

    function addLiquidity(
        uint256 receiveAmount,
        uint256[] memory maxPayAmounts
    ) external returns (uint256[] memory payAmounts);

    function removeLiquidity(
        uint256 amount,
        uint256[] memory minReceiveAmounts
    ) external returns (uint256[] memory receiveAmounts, uint256 feeAmount);

    function setIsAllowed(address user_, bool isAllowed_) external;

    function pauseTrading() external;

    function resumeTrading() external;
}
