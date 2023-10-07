// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/Pool.sol";
import "@cavalre/Users.sol";
import "forge-std/Test.sol";

contract UsersTest is Test {
    Users internal users;

    address alice = address(1);
    address bob = address(2);
    address carol = address(3);

    Pool private pool;

    function setUp() public {
        vm.startPrank(alice);
        vm.roll(1);

        pool = new Pool("Pool", "P", 1e16);
    }

    function testUsers_isAllowed() public {
        assertTrue(
            pool.isAllowed(alice),
            "Alice is allowed."
        );
    }

    function testUsers_setisAllowed() public {
        pool.setIsAllowed(alice, false);

        assertFalse(
            pool.isAllowed(alice),
            "Alice is not allowed after being disappowed."
        );
    }
}
