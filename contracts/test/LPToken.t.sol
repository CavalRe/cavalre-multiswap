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
        vm.startPrank(alice);

        lpToken.mint(amount);
        assertEq(lpToken.balanceOf(alice), amount);
        assertEq(lpToken.totalSupply(), amount);

        vm.stopPrank();
    }

    function testLPToken_burn(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        vm.startPrank(alice);

        uint256 burnAmount = amount / 2;

        lpToken.mint(amount);
        lpToken.burn(burnAmount);
        assertEq(lpToken.balanceOf(alice), amount - burnAmount);
        assertEq(lpToken.totalSupply(), amount - burnAmount);

        vm.stopPrank();
    }

    function testLPToken_fee(uint256 amount) public {
        vm.assume((amount > 1e17) && (amount < 1e50));

        address alice = address(1);
        vm.startPrank(alice);

        lpToken.mint(amount);
        assertEq(lpToken.balanceOf(alice), amount);
        assertEq(lpToken.totalSupply(), amount);

        vm.stopPrank();

        address carol = address(2);
        vm.startPrank(carol);

        lpToken.mint(amount);
        assertEq(lpToken.balanceOf(carol), amount);
        assertEq(lpToken.totalSupply(), 2 * amount);

        vm.stopPrank();

        lpToken.distributeFee(2 * amount);

        assertEq(lpToken.balanceOf(alice), 2 * amount);
        assertEq(lpToken.balanceOf(carol), 2 * amount);
        assertEq(lpToken.totalSupply(), 4 * amount);
    }
}
