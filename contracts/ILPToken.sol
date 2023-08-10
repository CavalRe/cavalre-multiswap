// SPDX-License-Identifier: Unlicense
/**
 * This file is a modified version of a file from the OpenZeppelin project:
 * https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/token/ERC20/ERC20.sol
 *
 * The original file is licensed under the MIT License, a copy of which can be found at:
 * https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/LICENSE
 */

pragma solidity 0.8.19;

import {IUsers} from "@cavalre/IUsers.sol";

interface ILPToken is IUsers {
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    event DistributeFee(uint256 lpAmount, uint256 protocolAmount);

    event Transfer(address indexed from, address indexed to, uint256 value);

    error InvalidProtocolFee(uint256 fee);

    error UserNotAllowed(address user_);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external pure returns (uint8);

    function totalSupply() external view returns (uint256);

    function virtualSupply() external view returns (uint256);

    function ratio() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) external returns (bool);

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) external returns (bool);

    function protocolFee() external view returns (uint256);

    function protocolFeeRecipient() external view returns (address);

    function setProtocolFee(uint256 fee) external;

    function setProtocolFeeRecipient(address recipient) external;
}
