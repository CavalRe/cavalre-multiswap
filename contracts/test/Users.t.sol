// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/Users.sol";
import "forge-std/Test.sol";

contract UsersTest is Test {
    Users internal users;

    address alice = address(1);
    address bob = address(2);

    function setUp() public {
        vm.startPrank(alice);

        users = new Users();
    }

    function testUsers() public {
        users.addUser(alice, 0);

        assertTrue(users.user(alice).isAllowed, "Alice is allowed after being added as a user.");

        assertFalse(users.user(bob).isAllowed, "Bob is not allowed after Alice is added as a user.");

        vm.expectRevert(
            abi.encodeWithSelector(Users.UserAlreadyAdded.selector, alice)
        );
        users.addUser(alice, 0);

        users.setAllowed(alice, false);

        assertFalse(users.user(alice).isAllowed, "Alice is not allowed after being disappowed.");

        users.addUser(bob, 0);

        assertTrue(users.user(bob).isAllowed, "Bob is allowed after being added as a user.");

        users.setAllowed(alice, true);

        assertTrue(users.user(alice).isAllowed, "Alice is allowed after being allowed.");

        assertEq(users.users()[0].associates[0], alice, "Alice is an associate of the first user.");

        assertEq(users.user(alice).associates[0], alice, "Alice is the first associate of Alice.");

        assertEq(users.users()[1].associates[0], bob, "Bob is an associate of the second user.");

        assertEq(users.user(bob).associates[0], bob, "Bob is the first associate of Bob.");

        setUp();

        assertFalse(users.user(alice).isAllowed, "Alice is not allowed after resetting users.");

        assertFalse(users.user(bob).isAllowed, "Bob is not allowed after resetting users.");
    }
}
