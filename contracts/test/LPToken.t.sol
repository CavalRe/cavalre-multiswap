// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/Pool.sol";
import "@cavalre/Users.sol";
import "forge-std/Test.sol";

contract PoolMintable is Pool {
    using FixedPointMathLib for uint256;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 tau_
    ) Pool(name_, symbol_, tau_) {}

    function distributeFee_(uint256 amount) public {
        super.distributeFee(amount);
    }

    function mint_(uint256 amount) public {
        super.mint(_msgSender(), amount);
    }

    function burn_(uint256 amount) public {
        super.burn(_msgSender(), amount);
    }
}

contract LPTokenTest is Test {
    PoolMintable private pool;
    
    function setUp() public {
        vm.roll(1);
        pool = new PoolMintable("Pool", "P", 1e16);
    }

    function testLPToken_mint(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);

        pool.addUser(alice, 0);

        vm.startPrank(alice);

        pool.mint_(amount);
        assertEq(pool.balanceOf(alice), amount, "Balance of alice after minting.");
        assertEq(pool.totalSupply(), amount, "Total supply after minting.");

        vm.stopPrank();

        pool.addUser(bob, 0);
        pool.setAllowed(bob, false);

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(LPToken.UserNotAllowed.selector, bob)
        );
        pool.mint_(amount);
    }

    function testLPToken_burn(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);

        pool.addUser(alice, 0);

        vm.startPrank(alice);

        uint256 burnAmount = amount / 2;

        pool.mint_(amount);
        pool.burn_(burnAmount);
        assertEq(pool.balanceOf(alice), amount - burnAmount, "Balance of alice after burning.");
        assertEq(pool.totalSupply(), amount - burnAmount, "Total supply after burning.");

        vm.stopPrank();

        pool.addUser(bob, 0);

        vm.startPrank(bob);
        pool.mint_(amount);

        emit log_named_uint("Bob's balance", pool.balanceOf(bob));
        emit log_named_uint("Total supply", pool.totalSupply());

        vm.stopPrank();

        pool.setAllowed(bob, false);

        emit log_named_uint("Bob's balance", pool.balanceOf(bob));
        emit log_named_uint("Total supply", pool.totalSupply());

        vm.startPrank(bob);

        pool.burn_(amount);

        vm.stopPrank();
    }

    function testLPToken_transfer(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);

        pool.addUser(alice, 0);

        vm.startPrank(alice);

        pool.mint_(amount);
        assertEq(pool.balanceOf(alice), amount, "Balance of alice after minting.");
        assertEq(pool.totalSupply(), amount, "Total supply after minting.");

        vm.expectRevert(
            abi.encodeWithSelector(Users.UserNotFound.selector, bob)
        );
        pool.transfer(bob, amount);

        vm.stopPrank();

        pool.addUser(bob, 0);

        vm.startPrank(alice);

        pool.transfer(bob, amount);

        vm.stopPrank();
    }

    function testLPToken_transferFrom(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);
        address carol = address(3);

        pool.addUser(alice, 0);

        vm.startPrank(alice);

        pool.increaseAllowance(bob, amount);

        pool.mint_(amount);
        assertEq(pool.balanceOf(alice), amount, "Balance of alice after minting.");
        assertEq(pool.totalSupply(), amount, "Total supply after minting.");

        vm.stopPrank();

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(Users.UserNotFound.selector, carol)
        );
        pool.transferFrom(alice, carol, amount);

        vm.stopPrank();

        pool.addUser(carol, 0);

        vm.startPrank(bob);

        pool.transferFrom(alice, carol, amount);

        vm.stopPrank();

        pool.setAllowed(alice, false);

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(LPToken.UserNotAllowed.selector, alice)
        );
        pool.transferFrom(alice, carol, amount);

        vm.stopPrank();
    }

    function testLPToken_fee(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);

        pool.addUser(alice, 0);

        vm.startPrank(alice);

        pool.mint_(amount);
        assertEq(pool.balanceOf(alice), amount, "Balance of alice after minting.");
        assertEq(pool.totalSupply(), amount, "Total supply after minting.");

        vm.stopPrank();

        address bob = address(2);

        pool.addUser(bob, 0);

        vm.startPrank(bob);

        pool.mint_(amount);
        assertEq(pool.balanceOf(bob), amount, "Balance of bob after minting.");
        assertEq(pool.totalSupply(), 2 * amount, "Total supply after second minting.");

        vm.stopPrank();

        pool.distributeFee_(2 * amount);

        assertEq(pool.balanceOf(alice), 2 * amount, "Balance of alice after fee distribution.");
        assertEq(pool.balanceOf(bob), 2 * amount, "Balance of bob after fee distribution.");
        assertEq(pool.totalSupply(), 4 * amount, "Total supply after fee distribution.");
    }
}
