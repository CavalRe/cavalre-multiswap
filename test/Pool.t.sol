// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "../contracts/Pool.sol";
import "./Token.t.sol";
import "forge-std/Test.sol";

contract PoolTest is Test {
    using FixedPointMathLib for uint256;

    uint256 internal constant NTOKENS = 10;

    address internal alice = address(1);
    address internal bob = address(2);
    address internal carol = address(3);

    uint256[] internal fees = new uint256[](NTOKENS);
    uint256[] internal prices = new uint256[](NTOKENS);
    uint256[] internal conversions = new uint256[](NTOKENS);

    uint256 internal constant ONE = 1e18;
    uint256 internal constant PCT = 1e16;
    uint256 internal constant BPS = 1e14;

    uint256 internal marketCap = 1e25;

    Token internal WAVAX = new Token("Wrapped AVAX", "WAVAX", 18);
    Token internal USDC = new Token("USD Coin", "USDC", 6);
    Token internal USDt = new Token("TetherToken", "USDt", 6);
    Token internal EUROC = new Token("Euro Coin", "EUROC", 6);
    Token internal USDCe = new Token("Bridged USDC", "USDC.e", 6);
    Token internal USDTe = new Token("Bridged USDt", "USDT.e", 6);
    Token internal DAIe = new Token("Brdiged DAI", "DAI.e", 18);
    Token internal WETHe = new Token("Bridged WETH", "WETH.e", 18);
    Token internal WBTCe = new Token("Bridged WBTC", "WBTC.e", 8);
    Token internal BTCb = new Token("Bridged BTC", "BTC.b", 8);

    uint256[] internal payAmounts;
    uint256[] internal receiveAmounts;
    uint256 internal feeAmount;

    function setUpPool(
        string memory name,
        string memory symbol,
        uint256 protocolFee,
        uint tau
    ) public returns (Pool pool, Token[] memory tokens) {
        pool = new Pool(name, symbol, protocolFee, tau);
        tokens = new Token[](NTOKENS);

        uint256 n;
        tokens[n++] = WAVAX;
        tokens[n++] = USDC;
        tokens[n++] = USDt;
        tokens[n++] = EUROC;
        tokens[n++] = USDCe;
        tokens[n++] = USDTe;
        tokens[n++] = DAIe;
        tokens[n++] = WETHe;
        tokens[n++] = WBTCe;
        tokens[n++] = BTCb;

        n = 0;
        fees[n++] = 15 * BPS;
        fees[n++] = 5 * BPS;
        fees[n++] = 5 * BPS;
        fees[n++] = 5 * BPS;
        fees[n++] = 5 * BPS;
        fees[n++] = 5 * BPS;
        fees[n++] = 5 * BPS;
        fees[n++] = 30 * BPS;
        fees[n++] = 30 * BPS;
        fees[n++] = 30 * BPS;

        n = 0;
        prices[n++] = 145e17;
        prices[n++] = 1e18;
        prices[n++] = 1e18;
        prices[n++] = 113e16;
        prices[n++] = 1e18;
        prices[n++] = 1e18;
        prices[n++] = 1e18;
        prices[n++] = 1908e18;
        prices[n++] = 30065e18;
        prices[n++] = 30065e18;

        Token token;
        uint256 conversion;
        uint256 balance = marketCap.divWadUp(prices[0]);
        pool.addAsset{value: balance}(address(0), fees[0], balance, marketCap);
        for (uint256 i = 1; i < NTOKENS; i++) {
            token = tokens[i];
            conversion = 10 ** (18 - token.decimals());
            conversions[i] = conversion;
            balance = marketCap.divWadUp(prices[i]) / conversion;
            token.mint(balance);
            token.approve(address(pool), balance);
            pool.addAsset(address(token), fees[i], balance, marketCap);
        }

        pool.initialize();

        for (uint256 i = 1; i < NTOKENS; i++) {
            token = tokens[i];
            balance = token.balanceOf(address(pool));
            token.mint(balance);
            token.approve(address(pool), balance);
        }
    }
}
