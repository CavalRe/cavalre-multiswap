// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../libraries/ds-test/src/test.sol";

contract MathTest is DSTest {
    address sender;
    uint constant nvalues = 50000;

    mapping(address => uint) index_map;
    uint[] value_array = new uint[](nvalues);
    mapping(address => uint) value_map;

    function setUp() public {
        sender = address(this);
        uint index = 5000;
        uint value = 300;
        index_map[sender] = index;
        value_array[index] = value;
        value_map[sender] = value;
    }

    // function testArray() public {
    //     uint check = value_array[index_map[sender]];
    //     assertEq(check,300);
    // }

    // function testMapping() public {
    //     uint check = value_map[sender];
    //     assertEq(check,300);
    // }
}
