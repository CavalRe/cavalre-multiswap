// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import { PRBTest } from "@prb/test/PRBTest.sol";
import "forge-std/Test.sol";
import "../src/Pool.sol";
import "./Token.t.sol";

contract InitTest is PRBTest {
    function testInit() public {
        address alice = address(1);
        vm.startPrank(alice);
        Pool pool = new Pool("Pool", "P");

        Token tokenA = new Token("Foo", "FOOA");
        Token tokenB = new Token("Foo", "FOOB");
        uint256 amount = 1e27;

        vm.expectRevert(abi.encodeWithSelector(Pool.NotInitialized.selector));
        pool.stake(address(tokenA), amount, alice);
        vm.expectRevert(abi.encodeWithSelector(Pool.NotInitialized.selector));
        pool.unstake(address(tokenB), amount, alice);
        vm.expectRevert(abi.encodeWithSelector(Pool.NotInitialized.selector));
        pool.swap(address(tokenA), address(tokenB), amount, alice);

        tokenA.mint(amount);
        tokenA.approve(address(pool), amount);
        pool.addAsset(address(tokenA), amount, 1e18);
        tokenB.mint(amount);
        tokenB.approve(address(pool), amount);
        pool.addAsset(address(tokenB), amount, 1e18);

        Token tokenC = new Token("Foo", "FOOC");
        tokenC.mint(amount);
        vm.expectRevert(abi.encodeWithSelector(Pool.InsufficientAllowance.selector, 0, amount));
        pool.addAsset(address(tokenC), amount, 1e18);
        // TODO check for double adds

        pool.initialize();

        vm.expectRevert(abi.encodeWithSelector(Pool.AlreadyInitialized.selector));
        pool.addAsset(address(tokenB), amount, 1e18);
        vm.expectRevert(abi.encodeWithSelector(Pool.AlreadyInitialized.selector));
        pool.initialize();

        //vm.expectRevert(abi.encodeWithSelector(stdError.assertionError, "Ownable: caller is not the owner"));
        vm.stopPrank();
    }

    function testFailInit() public {
        address alice = address(1);
        address bob = address(2);

        vm.startPrank(alice);
        Pool pool = new Pool("Pool", "P");
        vm.stopPrank();

        vm.startPrank(bob);
        pool.initialize();
        vm.stopPrank();
    }

    function testFailAdd() public {
        address alice = address(1);
        address bob = address(2);

        vm.startPrank(alice);
        Pool pool = new Pool("Pool", "P");
        vm.stopPrank();

        vm.startPrank(bob);
        uint256 amount = 1e18;
        Token tokenA = new Token("Foo", "FOOA");
        tokenA.mint(amount);
        tokenA.approve(address(pool), amount);
        pool.addAsset(address(tokenA), amount, 1e18);
        vm.stopPrank();
    }
}
