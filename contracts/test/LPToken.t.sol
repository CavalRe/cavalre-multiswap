// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/LPToken.sol";
import "forge-std/Test.sol";

contract LPMintable is LPToken {
    constructor(
        string memory name_,
        string memory symbol_
    ) LPToken(name_, symbol_) {}

    function distributeFee(uint256 amount) public {
        _distributeFee(amount);
    }

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}

contract LPTokenTest is Test {
    LPMintable lpToken;

    function setUp() public {
        lpToken = new LPMintable("LP", "LP");
    }

    function testLPToken_mint(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);

        lpToken.addUser(alice, 0);

        vm.startPrank(alice);

        lpToken.mint(amount);
        assertEq(lpToken.balanceOf(alice), amount);
        assertEq(lpToken.totalSupply(), amount);

        vm.stopPrank();

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(LPToken.UserNotAllowed.selector, bob)
        );
        lpToken.mint(amount);
    }

    function testLPToken_burn(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);

        lpToken.addUser(alice, 0);

        vm.startPrank(alice);

        uint256 burnAmount = amount / 2;

        lpToken.mint(amount);
        lpToken.burn(burnAmount);
        assertEq(lpToken.balanceOf(alice), amount - burnAmount);
        assertEq(lpToken.totalSupply(), amount - burnAmount);

        vm.stopPrank();

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(LPToken.UserNotAllowed.selector, bob)
        );
        lpToken.burn(burnAmount);

        vm.stopPrank();
    }

    function testLPToken_transfer(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);

        lpToken.addUser(alice, 0);

        vm.startPrank(alice);

        lpToken.mint(amount);
        assertEq(lpToken.balanceOf(alice), amount);
        assertEq(lpToken.totalSupply(), amount);

        vm.expectRevert(
            abi.encodeWithSelector(LPToken.UserNotAllowed.selector, bob)
        );
        lpToken.transfer(bob, amount);

        vm.stopPrank();

        lpToken.addUser(bob, 0);

        vm.startPrank(alice);

        lpToken.transfer(bob, amount);

        vm.stopPrank();
    }

    function testLPToken_transferFrom(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);
        address carol = address(3);

        lpToken.addUser(alice, 0);

        vm.startPrank(alice);

        lpToken.increaseAllowance(bob, amount);

        lpToken.mint(amount);
        assertEq(lpToken.balanceOf(alice), amount);
        assertEq(lpToken.totalSupply(), amount);

        vm.stopPrank();

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(LPToken.UserNotAllowed.selector, carol)
        );
        lpToken.transferFrom(alice, carol, amount);

        vm.stopPrank();

        lpToken.addUser(carol, 0);

        vm.startPrank(bob);

        lpToken.transferFrom(alice, carol, amount);

        vm.stopPrank();

        lpToken.disallowUser(alice);

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(LPToken.UserNotAllowed.selector, alice)
        );
        lpToken.transferFrom(alice, carol, amount);

        vm.stopPrank();
    }

    function testLPToken_fee(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);

        lpToken.addUser(alice, 0);

        vm.startPrank(alice);

        lpToken.mint(amount);
        assertEq(lpToken.balanceOf(alice), amount);
        assertEq(lpToken.totalSupply(), amount);

        vm.stopPrank();

        address bob = address(2);

        lpToken.addUser(bob, 0);

        vm.startPrank(bob);

        lpToken.mint(amount);
        assertEq(lpToken.balanceOf(bob), amount);
        assertEq(lpToken.totalSupply(), 2 * amount);

        vm.stopPrank();

        lpToken.distributeFee(2 * amount);

        assertEq(lpToken.balanceOf(alice), 2 * amount);
        assertEq(lpToken.balanceOf(bob), 2 * amount);
        assertEq(lpToken.totalSupply(), 4 * amount);
    }
}
