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

    function testUsers_addUser() public {
        assertTrue(
            pool.user(alice).isAllowed,
            "Alice is allowed after being added as a user."
        );

        vm.expectRevert(
            abi.encodeWithSelector(IUsers.UserAlreadyAdded.selector, alice)
        );
        pool.addUser(alice, 0);
    }

    function testUsers_setAllowed() public {
        pool.setAllowed(alice, false);

        assertFalse(
            pool.user(alice).isAllowed,
            "Alice is not allowed after being disappowed."
        );
    }

    function testUsers_userNotFound() public {
        vm.expectRevert(
            abi.encodeWithSelector(IUsers.UserNotFound.selector, bob)
        );
        pool.user(bob);

        pool.addUser(bob, 0);

        assertTrue(
            pool.user(bob).isAllowed,
            "Bob is allowed after being added as a user."
        );

        pool.removeUser(bob);

        vm.expectRevert(
            abi.encodeWithSelector(IUsers.UserNotFound.selector, bob)
        );
        pool.user(bob);
    }

    function toAddress(uint256 value) public pure returns (address) {
        return address(uint160(value));
    }

    function createUsers(uint256 nUsers, uint256 nAssociates) public {
        assertEq(
            pool.users().length,
            1,
            "Pool has one user (the owner) before adding users."
        );

        uint256 n;
        address user;
        address associate;
        for (uint256 i; i < nUsers; i++) {
            n++;
            user = toAddress(n);
            if (n > 1) {
                pool.addUser(user, 0);
            }
            assertEq(
                pool.users().length,
                i + 1,
                "Pool has incorrect number of users after adding a user."
            );
            for (uint256 j; j < nAssociates - 1; j++) {
                n++;
                associate = toAddress(n);
                pool.addAssociate(user, associate);
            }
        }
    }

    function testAssociates_isAllowed() public {
        uint256 nUsers = 3;
        uint256 nAssociates = 10;
        createUsers(nUsers, nAssociates);

        for (uint256 i; i < nUsers * nAssociates; i++) {
            assertTrue(
                pool.user(toAddress(i + 1)).isAllowed,
                "Associate is allowed after being added."
            );
        }
    }

    function testAssociates_isAssociate() public {
        uint256 nUsers = 3;
        uint256 nAssociates = 10;
        createUsers(nUsers, nAssociates);

        uint256 n;
        address user;
        address associate;
        for (uint256 i; i < nUsers; i++) {
            n++;
            user = toAddress(n);
            for (uint256 j; j < nAssociates - 1; j++) {
                n++;
                associate = toAddress(n);
            }
            assertEq(
                pool.user(user).associates,
                pool.user(associate).associates,
                "Associate is not an associate of user."
            );
        }
    }

    function testAssociates_removeUser() public {
        uint256 nUsers = 3;
        uint256 nAssociates = 10;
        createUsers(nUsers, nAssociates);

        pool.removeUser(toAddress(11));

        assertEq(
            pool.users().length,
            nUsers - 1,
            "Pool has incorrect number of users after removing a user."
        );

        uint256 n;
        address user;
        address associate;
        for (uint256 i; i < nUsers; i++) {
            n++;
            user = toAddress(n);
            for (uint256 j; j < nAssociates - 1; j++) {
                n++;
                associate = toAddress(n);
                if (n <= 10 || n > 20) {
                    assertTrue(
                        pool.user(associate).isAllowed,
                        "Associate is allowed after another user is removed."
                    );
                    assertEq(
                        pool.user(user).associates,
                        pool.user(associate).associates,
                        "Associate is not an associate of user."
                    );
                } else {
                    vm.expectRevert(
                        abi.encodeWithSelector(
                            IUsers.UserNotFound.selector,
                            associate
                        )
                    );
                    pool.user(associate);
                }
            }
        }
    }

    function testAssociates_removeAssociate() public {
        uint256 nUsers = 3;
        uint256 nAssociates = 10;
        createUsers(nUsers, nAssociates);

        uint256 n;
        address associate;
        for (uint256 i; i < nUsers; i++) {
            for (uint256 j; j < nAssociates; j++) {
                n++;
                associate = toAddress(n);

                assertTrue(
                    pool.user(associate).isAllowed,
                    "Associate is allowed before associate is removed."
                );

                pool.removeAssociate(associate);

                if (n < (i + 1) * nAssociates) {
                    assertEq(
                        pool.users().length,
                        nUsers - i,
                        "Pool has incorrect number of users after removing an associate."
                    );
                }

                vm.expectRevert(
                    abi.encodeWithSelector(
                        IUsers.UserNotFound.selector,
                        associate
                    )
                );
                pool.user(associate);
            }
        }

        for (uint256 i; i < nUsers * nAssociates; i++) {
            n++;
            associate = toAddress(n);

            vm.expectRevert(
                abi.encodeWithSelector(IUsers.UserNotFound.selector, associate)
            );
            pool.user(associate);
        }
    }
}
