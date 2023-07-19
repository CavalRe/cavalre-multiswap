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

        pool = new Pool("Pool", "P", int256(1e16));
    }

    function testUsers_addUser() public {
        pool.addUser(alice, 0);

        assertTrue(
            pool.user(alice).isAllowed,
            "Alice is allowed after being added as a user."
        );

        vm.expectRevert(
            abi.encodeWithSelector(Users.UserAlreadyAdded.selector, alice)
        );
        pool.addUser(alice, 0);
    }

    function testUsers_setAllowed() public {
        pool.addUser(alice, 0);
        pool.setAllowed(alice, false);

        assertFalse(
            pool.user(alice).isAllowed,
            "Alice is not allowed after being disappowed."
        );
    }

    function testUsers_userNotFound() public {
        vm.expectRevert(
            abi.encodeWithSelector(Users.UserNotFound.selector, bob)
        );
        pool.user(bob);

        pool.addUser(alice, 0);
        pool.addUser(bob, 0);

        assertTrue(
            pool.user(bob).isAllowed,
            "Bob is allowed after being added as a user."
        );

        pool.removeUser(bob);

        vm.expectRevert(
            abi.encodeWithSelector(Users.UserNotFound.selector, bob)
        );
        pool.user(bob);
    }

    function testUsers_associates() public {
        pool.addUser(alice, 0);
        pool.addUser(bob, 0);
        pool.addAssociate(alice, carol);

        assertTrue(
            pool.user(alice).isAllowed,
            "Alice is allowed after being allowed."
        );

        assertEq(
            pool.users()[0].associates[0],
            alice,
            "Alice is an associate of the first user."
        );

        assertEq(
            pool.user(alice).associates[0],
            alice,
            "Alice is the first associate of Alice."
        );

        assertEq(
            pool.users()[1].associates[0],
            bob,
            "Bob is an associate of the second user."
        );

        assertEq(
            pool.user(bob).associates[0],
            bob,
            "Bob is the first associate of Bob."
        );

        assertEq(
            pool.user(alice).associates[1],
            carol,
            "Carol is the second associate of Alice."
        );

        pool.removeAssociate(carol, alice);

        vm.expectRevert(
            abi.encodeWithSelector(Users.UserNotFound.selector, alice)
        );
        pool.user(alice);
    }
}
