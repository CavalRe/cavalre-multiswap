// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Pool, IPool, FixedPointMathLib} from "../contracts/Pool.sol";
import {PoolTest, Token, AssetState} from "./Pool.t.sol";

contract StakeTest is PoolTest {
    using FixedPointMathLib for uint256;

    Pool pool;
    Token[] tokens;

    function setUp() public {
        uint256 startBalance = type(uint256).max / 2;
        vm.deal(alice, startBalance);
        vm.deal(bob, startBalance);
        vm.deal(carol, startBalance);

        vm.startPrank(alice);

        (pool, tokens) = setUpPool("Pool", "P", 2e17, 1e16);

        // for (uint256 i; i < NTOKENS; i++) {
        //     allMaxs[i] = type(uint256).max;
        // }

        // oneAsset[0] = address(USDC);
        // oneConversion[0] = conversions[1];
        // anotherAsset[0] = address(BTCb);
        // anotherConversion[0] = conversions[9];
        // onePool[0] = address(pool);
        // oneAmount[0] = 1e24;
        // oneAllocation[0] = 1e18;
        // oneMax[0] = type(uint256).max;
    }

    function testStakeSmoke() public {
        uint256 payIndex = 8520 % tokens.length;
        Token payToken = tokens[payIndex];
        // Token payToken = tokens[0];

        uint256 balance = payToken.balanceOf(address(pool));
        uint256 payBalance = payToken.balanceOf(alice);
        uint256 poolBalance = pool.balanceOf(alice);

        uint256 amountOut;

        uint256 amount = 38593710624525879730480819364414810941157096808048686924515883081335702552592;
        amount = amount.fullMulDiv(balance, type(uint256).max);
        emit log(payToken.symbol());
        emit log_named_uint("balance", balance);
        emit log_named_uint("amount", amount);
        // uint256 amount = payToken.balanceOf(address(pool)) / 10;
        payToken.mint(amount);

        assertEq(
            payToken.balanceOf(alice),
            payBalance + amount,
            "Pay token balance before stake."
        );

        payToken.approve(address(pool), amount);

        (amountOut, ) = pool.stake(address(payToken), amount, 0);

        assertEq(
            payToken.balanceOf(alice),
            payBalance,
            "Pay token balance after stake."
        );

        assertEq(
            pool.balanceOf(alice),
            poolBalance + amountOut,
            "Pool balance after stake."
        );

        // checkSF(address(payToken), address(pool), amount, amountOut);
        payToken.mint(amount);
        payToken.approve(address(pool), amount);
        // checkStake(pool, address(payToken), amount);
    }

    function testStakeFuzz(uint256 amount, uint8 payIndex) public {
        vm.startPrank(alice);

        Token payToken = tokens[uint256(payIndex) % tokens.length];
        uint256 assetBalanceBefore = payToken.balanceOf(alice);
        uint256 poolBalanceBefore = pool.balanceOf(alice);
        emit log_named_uint("Alice's payToken balance before stake", payToken.balanceOf(alice));

        uint256 balance = payToken.balanceOf(address(pool));
        amount = amount.fullMulDiv(balance, type(uint256).max);
        vm.assume(amount > 0);

        payToken.mint(amount);
        payToken.approve(address(pool), amount);
        if (amount * 3 > balance) {
            vm.expectRevert(
                abi.encodeWithSelector(IPool.TooLarge.selector, amount)
            );
            pool.stake(address(payToken), amount, 0);
        } else {
            // checkStake(pool, address(payToken), amount);

            assertGt(
                pool.balanceOf(alice),
                poolBalanceBefore,
                "Alice's pool balance did not increase."
            );
            assertEq(
                payToken.balanceOf(alice),
                assetBalanceBefore,
                "Alice's final deposit token balance is not zero."
            );
        }
    }

    /*
     * Input Checking (Negative)
     */

    /// @dev `stake` should revert with `AssetNotFound` if the address is not a managed asset
    function testBadDepositAddress() public {
        Token token = new Token("Foo", "FOO", 18);
        address depositAddress = address(token);
        vm.expectRevert(
            abi.encodeWithSelector(IPool.AssetNotFound.selector, depositAddress)
        );
        pool.stake(depositAddress, 0, 0);
    }

    function testStakeZeroAmount(uint256 payIndex) public {
        payIndex = payIndex % tokens.length;
        Token payToken = tokens[payIndex];

        uint256 balance = pool.balanceOf(alice);

        vm.expectRevert(abi.encodeWithSelector(IPool.ZeroAmount.selector));
        pool.stake(address(payToken), 0, 0);
        assertEq(pool.balanceOf(alice), balance);
    }

    function testStakeNoAllowance() public {
        Token payToken = tokens[0];
        uint256 amount = 1e27;
        payToken.mint(amount);

        vm.expectRevert("ERC20: insufficient allowance");
        pool.stake(address(payToken), amount, 0);
    }

    /*
     * Pathological
     */
    function testFailStakeBadToken(uint256 amount) public {
        amount = (amount % 1e59) + 1e15;

        pool.stake(address(0), amount, 0);
    }
}
