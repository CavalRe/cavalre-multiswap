// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/LPToken.sol";
import "forge-std/Test.sol";

contract LPMintable is LPToken {
    using FixedPointMathLib for uint256;

    constructor(
        string memory name_,
        string memory symbol_
    ) LPToken(name_, symbol_) {}

    function distributeFee_(uint256 amount) public {
        super.distributeFee(amount);
    }

    function mint_(uint256 amount) public onlyUnrestricted {
        super.mint(_msgSender(), amount);
    }

    function burn_(uint256 amount) public onlyUnrestricted {
        super.burn(_msgSender(), amount);
    }
}

contract LPTokenTest is Test {
    LPMintable private lpToken;

    function setUp() public {
        lpToken = new LPMintable("LP", "LP");
    }

    function testLPToken_mint(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);

        lpToken.addUser(alice, 0);

        vm.startPrank(alice);

        lpToken.mint_(amount);
        assertEq(lpToken.balanceOf(alice), amount, "Balance of alice after minting.");
        assertEq(lpToken.totalSupply(), amount, "Total supply after minting.");

        vm.stopPrank();

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(Users.UserNotFound.selector, bob)
        );
        lpToken.mint_(amount);
    }

    function testLPToken_burn(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);

        lpToken.addUser(alice, 0);

        vm.startPrank(alice);

        uint256 burnAmount = amount / 2;

        lpToken.mint_(amount);
        lpToken.burn_(burnAmount);
        assertEq(lpToken.balanceOf(alice), amount - burnAmount, "Balance of alice after burning.");
        assertEq(lpToken.totalSupply(), amount - burnAmount, "Total supply after burning.");

        vm.stopPrank();

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(Users.UserNotFound.selector, bob)
        );
        lpToken.burn_(burnAmount);

        vm.stopPrank();
    }

    function testLPToken_transfer(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        address bob = address(2);

        lpToken.addUser(alice, 0);

        vm.startPrank(alice);

        lpToken.mint_(amount);
        assertEq(lpToken.balanceOf(alice), amount, "Balance of alice after minting.");
        assertEq(lpToken.totalSupply(), amount, "Total supply after minting.");

        vm.expectRevert(
            abi.encodeWithSelector(Users.UserNotFound.selector, bob)
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

        lpToken.mint_(amount);
        assertEq(lpToken.balanceOf(alice), amount, "Balance of alice after minting.");
        assertEq(lpToken.totalSupply(), amount, "Total supply after minting.");

        vm.stopPrank();

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(Users.UserNotFound.selector, carol)
        );
        lpToken.transferFrom(alice, carol, amount);

        vm.stopPrank();

        lpToken.addUser(carol, 0);

        vm.startPrank(bob);

        lpToken.transferFrom(alice, carol, amount);

        vm.stopPrank();

        lpToken.setAllowed(alice, false);

        vm.startPrank(bob);

        vm.expectRevert(
            abi.encodeWithSelector(Users.UserNotAllowed.selector, alice)
        );
        lpToken.transferFrom(alice, carol, amount);

        vm.stopPrank();
    }

    function testLPToken_fee(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);

        lpToken.addUser(alice, 0);

        vm.startPrank(alice);

        lpToken.mint_(amount);
        assertEq(lpToken.balanceOf(alice), amount, "Balance of alice after minting.");
        assertEq(lpToken.totalSupply(), amount, "Total supply after minting.");

        vm.stopPrank();

        address bob = address(2);

        lpToken.addUser(bob, 0);

        vm.startPrank(bob);

        lpToken.mint_(amount);
        assertEq(lpToken.balanceOf(bob), amount, "Balance of bob after minting.");
        assertEq(lpToken.totalSupply(), 2 * amount, "Total supply after second minting.");

        vm.stopPrank();

        lpToken.distributeFee_(2 * amount);

        assertEq(lpToken.balanceOf(alice), 2 * amount, "Balance of alice after fee distribution.");
        assertEq(lpToken.balanceOf(bob), 2 * amount, "Balance of bob after fee distribution.");
        assertEq(lpToken.totalSupply(), 4 * amount, "Total supply after fee distribution.");
    }
}
