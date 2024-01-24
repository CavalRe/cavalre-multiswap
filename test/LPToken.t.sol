// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Pool} from "../contracts/Pool.sol";
import {IUsers} from "../contracts/Users.sol";
import {FloatingPoint, UFloat} from "@cavalre/floating-point/FloatingPoint.sol";
import {PoolUtils} from "./PoolUtils.t.sol";

contract PoolMintable is Pool {
    using FloatingPoint for uint256;
    using FloatingPoint for UFloat;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 protocolFee_,
        address protocolFeeRecipient_,
        uint256 tokensPerShare_
    )
        Pool(
            name_,
            symbol_,
            protocolFee_,
            protocolFeeRecipient_,
            tokensPerShare_,
            address(1234)
        )
    {}

    function mint(uint256 shares) public {
        super._mint(_msgSender(), shares);
    }

    function burn(uint256 shares) public {
        super._burn(_msgSender(), shares);
    }

    function mintTokens(UFloat memory amount) public {
        super._mintTokens(_msgSender(), amount);
    }

    function burnTokens(UFloat memory amount) public {
        super._burnTokens(_msgSender(), amount);
    }

    function distributeTokens(UFloat memory amount) public {
        super._distributeTokens(amount);
    }

    function allocateShares(address account, uint256 shares) public {
        super._allocateShares(account, shares);
    }

    function spendAllowance(address owner, uint256 amount) public {
        super._spendAllowance(owner, _msgSender(), amount);
    }
}

contract LPTokenTest is PoolUtils {
    using FloatingPoint for uint256;

    PoolMintable private pool;

    address alice = address(1);
    address bob = address(2);
    address carol = address(3);

    uint256 private protocolFee = 5e17;
    address private feeRecipient = vm.envAddress("FEE_RECIPIENT");
    uint256 private tokensPerShare = 3e18;

    function setUp() public {
        vm.roll(1);
        pool = new PoolMintable(
            "Pool",
            "P",
            protocolFee,
            feeRecipient,
            tokensPerShare
        );
    }

    function tolerance(uint256 amount) public pure returns (uint256) {
        uint256 digits = msb(amount);
        if (digits >= 18) {
            return 10 ** (digits - 16);
        } else {
            return 10;
        }
    }

    function testLPToken_allowance() public {
        vm.startPrank(alice);

        pool.increaseAllowance(bob, 1e18);
        assertEq(
            pool.allowance(alice, bob),
            1e18,
            "Allowance of alice to bob after increasing."
        );
        pool.decreaseAllowance(bob, 1e18);
        assertEq(
            pool.allowance(alice, bob),
            0,
            "Allowance of alice to bob after decreasing."
        );

        vm.stopPrank();

        vm.startPrank(bob);

        pool.approve(alice, type(uint256).max);

        uint256 allowanceBefore = pool.allowance(bob, alice);
        assertEq(
            allowanceBefore,
            type(uint256).max,
            "Allowance of bob to alice after increasing."
        );

        vm.stopPrank();

        vm.startPrank(alice);

        pool.spendAllowance(bob, 1e18);

        assertEq(
            pool.allowance(bob, alice),
            allowanceBefore,
            "Allowance of bob to alice after spending."
        );
    }

    function testLPToken_mint(uint256 shares) public {
        vm.assume((shares > 0) && (shares < 1e50));

        vm.startPrank(alice);

        pool.mint(shares);
        assertEq(
            pool.balanceOf(alice),
            shares,
            "Balance of alice after minting."
        );
        assertEq(pool.totalSupply(), shares, "Total supply after minting.");
    }

    function testLPToken_burn(uint256 shares) public {
        // function testLPToken_burn(uint256 shares) public {
        vm.assume((shares > 0) && (shares < 1e48));
        // uint256 shares = 1e17;

        vm.startPrank(alice);

        uint256 burnAmount = shares / 2;

        pool.mint(shares);
        assertEq(
            pool.balanceOf(alice),
            shares,
            "Balance of alice after minting."
        );
        assertEq(
            pool.totalSupply(),
            shares,
            "Total supply after alice minting."
        );

        pool.burn(burnAmount);
        assertEq(
            pool.balanceOf(alice),
            shares - burnAmount,
            "Balance of alice after burning."
        );
        assertEq(
            pool.totalSupply(),
            shares - burnAmount,
            "Total supply after alice burning."
        );

        vm.stopPrank();

        vm.startPrank(bob);

        pool.mint(shares);
        assertEq(pool.balanceOf(bob), shares, "Balance of bob after minting.");
        assertEq(
            pool.totalSupply(),
            2 * shares - burnAmount,
            "Total supply after bob minting."
        );

        pool.burn(burnAmount);
        assertEq(
            pool.balanceOf(bob),
            shares - burnAmount,
            "Balance of bob after burning."
        );
        assertEq(
            pool.totalSupply(),
            2 * shares - 2 * burnAmount,
            "Total supply after bob burning."
        );

        vm.stopPrank();
    }

    function testLPToken_mintTokens(uint256 amount) public {
        vm.assume((amount > 0) && (amount < 1e50));

        vm.startPrank(alice);

        UFloat memory amountFloat = amount.toUFloat();

        pool.mintTokens(amountFloat);
        assertApproxEqAbs(
            pool.tokensOf(alice),
            amount,
            tolerance(amount),
            "Balance of alice after minting."
        );
        assertApproxEqAbs(
            pool.totalTokens(),
            amount,
            tolerance(amount),
            "Total supply after minting."
        );
    }

    function testLPToken_burnTokens(uint256 amount) public {
        vm.assume((amount > 0) && (amount < 1e50));

        vm.startPrank(alice);

        UFloat memory amountFloat = amount.toUFloat();

        pool.mintTokens(amountFloat);
        assertApproxEqAbs(
            pool.tokensOf(alice),
            amount,
            tolerance(amount),
            "Balance of alice after minting."
        );
        assertApproxEqAbs(
            pool.totalTokens(),
            amount,
            tolerance(amount),
            "Total supply after minting."
        );

        pool.burnTokens(amountFloat);
        assertEq(pool.tokensOf(alice), 0, "Balance of alice after burning.");
        assertEq(pool.totalTokens(), 0, "Total supply after burning.");
    }

    function testLPToken_transfer(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        pool.setIsAllowed(bob, false);

        vm.startPrank(alice);

        pool.mint(amount);
        assertEq(
            pool.balanceOf(alice),
            amount,
            "Balance of alice after minting."
        );
        assertEq(pool.totalSupply(), amount, "Total supply after minting.");

        vm.expectRevert(
            abi.encodeWithSelector(IUsers.UserNotAllowed.selector, bob)
        );
        pool.transfer(bob, amount);

        vm.stopPrank();

        pool.setIsAllowed(bob, true);

        vm.startPrank(alice);

        pool.transfer(bob, amount);

        vm.stopPrank();
    }

    function testLPToken_transferFrom(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        pool.setIsAllowed(carol, false);

        vm.startPrank(alice);

        pool.increaseAllowance(bob, amount);

        pool.mint(amount);
        assertEq(
            pool.balanceOf(alice),
            amount,
            "Balance of alice after minting."
        );
        assertEq(pool.totalSupply(), amount, "Total supply after minting.");

        vm.stopPrank();

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(IUsers.UserNotAllowed.selector, carol)
        );
        pool.transferFrom(alice, carol, amount);

        vm.stopPrank();

        pool.setIsAllowed(carol, true);

        vm.startPrank(bob);

        pool.transferFrom(alice, carol, amount);
    }

    function testLPToken_fee(uint256 shares) public {
        vm.assume((shares > 0) && (shares < 1e48));
        // vm.assume(shares > 0);

        vm.startPrank(alice);

        uint256 sharesBefore = pool.balanceOf(alice);

        pool.mint(shares);
        assertEq(
            pool.balanceOf(alice),
            shares,
            "Balance of alice after minting."
        );
        if (failed) {
            emit log_named_uint(
                "Balance of alice before minting.",
                sharesBefore
            );
        }
        assertEq(pool.totalSupply(), shares, "Total supply after minting.");

        vm.stopPrank();

        vm.startPrank(bob);

        pool.mint(shares);
        assertEq(pool.balanceOf(bob), shares, "Balance of bob after minting.");
        assertEq(
            pool.totalSupply(),
            2 * shares,
            "Total supply after second minting."
        );

        vm.stopPrank();

        setUp();

        vm.startPrank(alice);

        // pool.distributeFee_(2 * amount, 1e18);

        // emit log_named_uint("Shares", shares);
        // emit log_named_uint("Protocol fee", protocolFee);

        // assertApproxEqRel(
        //     pool.tokensOf(alice),
        //     2 * shares.divWadUp(uint256(1e18) + protocolFee),
        //     1e12,
        //     "Balance of alice after fee distribution."
        // );
        // assertApproxEqRel(
        //     pool.tokensOf(bob),
        //     2 * shares.divWadUp(uint256(1e18) + protocolFee),
        //     1e12,
        //     "Balance of bob after fee distribution."
        // );
        // assertEq(
        //     pool.totalTokens(),
        //     4 * shares,
        //     "Total supply after fee distribution."
        // );
    }
}
