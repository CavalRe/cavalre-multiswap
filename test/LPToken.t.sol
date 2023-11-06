// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "../contracts/LPToken.sol";
import "../contracts/Pool.sol";
import "../contracts/Users.sol";
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
        super._mint(_msgSender(), amount);
    }

    function burn_(uint256 amount) public {
        super._burn(_msgSender(), amount);
    }

    function spendAllowance_(address owner, uint256 amount) public {
        super._spendAllowance(owner, _msgSender(), amount);
    }
}

contract LPTokenTest is Test {
    PoolMintable private pool;
    
    function setUp() public {
        vm.roll(1);
        pool = new PoolMintable("Pool", "P", 1e16);
    }

    function testLPToken_allowance() public {
        address alice = address(1);
        address bob = address(2);

        vm.startPrank(alice);

        pool.increaseAllowance(bob, 1e18);
        assertEq(pool.allowance(alice, bob), 1e18, "Allowance of alice to bob after increasing.");
        pool.decreaseAllowance(bob, 1e18);
        assertEq(pool.allowance(alice, bob), 0, "Allowance of alice to bob after decreasing.");

        vm.stopPrank();

        vm.startPrank(bob);

        pool.approve(alice, type(uint256).max);

        uint256 allowanceBefore = pool.allowance(bob, alice);
        assertEq(allowanceBefore, type(uint256).max, "Allowance of bob to alice after increasing.");

        vm.stopPrank();

        vm.startPrank(alice);

        pool.spendAllowance_(bob, 1e18);

        assertEq(pool.allowance(bob, alice), allowanceBefore, "Allowance of bob to alice after spending.");
    }

    function testLPToken_mint(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);

        vm.startPrank(alice);

        pool.mint_(amount);
        assertEq(pool.balanceOf(alice), amount, "Balance of alice after minting.");
        assertEq(pool.totalSupply(), amount, "Total supply after minting.");
    }

    function testLPToken_burn() public {
    // function testLPToken_burn(uint256 amount) public {
    //     vm.assume((amount > 1e17) && (amount < 1e50));
        uint256 amount = 1e17;

        address alice = address(1);
        address bob = address(2);

        vm.startPrank(alice);

        uint256 burnAmount = amount / 2;

        pool.mint_(amount);
        assertEq(pool.balanceOf(alice), amount, "Balance of alice after minting.");
        assertEq(pool.totalSupply(), amount, "Total supply after alice minting.");
    
        pool.burn_(burnAmount);
        assertEq(pool.balanceOf(alice), amount - burnAmount, "Balance of alice after burning.");
        assertEq(pool.totalSupply(), amount - burnAmount, "Total supply after alice burning.");

        vm.stopPrank();

        vm.startPrank(bob);

        pool.mint_(amount);
        assertEq(pool.balanceOf(bob), amount, "Balance of bob after minting.");
        assertEq(pool.totalSupply(), 2*amount - burnAmount, "Total supply after bob minting.");

        pool.burn_(burnAmount);
        assertEq(pool.balanceOf(bob), amount - burnAmount, "Balance of bob after burning.");
        assertEq(pool.totalSupply(), 2*amount - 2*burnAmount, "Total supply after bob burning.");

        vm.stopPrank();
    }

    function testLPToken_transfer(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);

        pool.setIsAllowed(bob, false);

        vm.startPrank(alice);

        pool.mint_(amount);
        assertEq(pool.balanceOf(alice), amount, "Balance of alice after minting.");
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

        address alice = address(1);
        address bob = address(2);
        address carol = address(3);

        pool.setIsAllowed(carol, false);

        vm.startPrank(alice);

        pool.increaseAllowance(bob, amount);

        pool.mint_(amount);
        assertEq(pool.balanceOf(alice), amount, "Balance of alice after minting.");
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

    function testLPToken_fee(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);

        vm.startPrank(alice);

        pool.mint_(amount);
        assertEq(pool.balanceOf(alice), amount, "Balance of alice after minting.");
        assertEq(pool.totalSupply(), amount, "Total supply after minting.");

        vm.stopPrank();

        address bob = address(2);

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
