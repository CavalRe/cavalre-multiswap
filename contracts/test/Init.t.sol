// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "@cavalre/Pool.sol";
import "@cavalre/test/Token.t.sol";

contract InitTest is Test {
    function testInit() public {
        address alice = address(1);

        vm.startPrank(alice);
        Pool pool = new Pool("Pool", "P", int256(1e16));

        Token tokenA = new Token("Foo", "FOOA", 18);
        Token tokenB = new Token("Foo", "FOOB", 18);
        uint256 amount = 1e27;
        uint256 minReceiveAmount = 0;

        pool.addUser(alice, 0);

        vm.expectRevert(abi.encodeWithSelector(Pool.NotInitialized.selector));
        pool.stake(address(tokenA), amount, minReceiveAmount);
        vm.expectRevert(abi.encodeWithSelector(Pool.NotInitialized.selector));
        pool.unstake(address(tokenB), amount, minReceiveAmount);
        vm.expectRevert(abi.encodeWithSelector(Pool.NotInitialized.selector));
        pool.swap(address(tokenA), address(tokenB), amount, minReceiveAmount);

        tokenA.mint(amount);
        tokenA.approve(address(pool), amount);
        pool.addAsset(address(tokenA), amount, 1e18, 1e18);
        tokenB.mint(amount);
        tokenB.approve(address(pool), amount);
        pool.addAsset(address(tokenB), amount, 1e18, 1e18);

        vm.expectRevert(
            abi.encodeWithSelector(
                Pool.DuplicateToken.selector,
                address(tokenB)
            )
        );
        pool.addAsset(address(tokenB), amount, 1e18, 1e18);

        pool.removeAsset(address(tokenA));

        vm.expectRevert(
            abi.encodeWithSelector(Pool.AssetNotFound.selector, address(tokenA))
        );
        pool.removeAsset(address(tokenA));

        pool.removeAsset(address(tokenB));

        tokenA.mint(amount);
        tokenA.approve(address(pool), amount);
        pool.addAsset(address(tokenA), amount, 1e18, 1e18);
        tokenB.mint(amount);
        tokenB.approve(address(pool), amount);
        pool.addAsset(address(tokenB), amount, 1e18, 1e18);

        pool.initialize();

        vm.expectRevert(
            abi.encodeWithSelector(Pool.AlreadyInitialized.selector)
        );
        pool.addAsset(address(tokenB), amount, 1e18, 1e18);
        vm.expectRevert(
            abi.encodeWithSelector(Pool.AlreadyInitialized.selector)
        );
        pool.initialize();

        AssetState[] memory assets = pool.assets();
        for (uint256 i = 0; i < assets.length; i++) {
            address token = assets[i].token;
            assertEq(token, assets[assets[i].index].token);
        }

        vm.stopPrank();
    }

    function testFailInit() public {
        address alice = address(1);
        address bob = address(2);

        vm.startPrank(alice);
        Pool pool = new Pool("Pool", "P", int256(1e16));
        vm.stopPrank();

        vm.startPrank(bob);
        pool.initialize();
        vm.stopPrank();
    }

    function testFailAdd() public {
        address alice = address(1);
        address bob = address(2);

        vm.startPrank(alice);
        Pool pool = new Pool("Pool", "P", int256(1e16));
        vm.stopPrank();

        vm.startPrank(bob);
        uint256 amount = 1e18;
        Token tokenA = new Token("Foo", "FOOA", 18);
        tokenA.mint(amount);
        tokenA.approve(address(pool), amount);
        pool.addAsset(address(tokenA), amount, 1e18, 1e18);
        vm.stopPrank();
    }
}
