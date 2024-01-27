// SPDX-License-Identifier: Business Source License 1.1
// Copyright (C) 2020-2023, CavalRe Inc. All rights reserved.
// See the file LICENSE.md for licensing terms.
pragma solidity 0.8.19;

import {RouterStore, Module} from "@cavalre/router/Module.sol";

struct Depot {
    string name;
    string symbol;
    uint8 decimals;
    uint256 totalSupply;
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowances;
}

contract ERC20 is Module {
    // Depot
    bytes32 internal constant ERC20_DEPOT_POSITION =
        keccak256("@cavalre.erc20.depot");

    // Commands
    bytes4 internal constant NAME = bytes4(keccak256("name()"));

    bytes4 internal constant SYMBOL = bytes4(keccak256("symbol()"));

    bytes4 internal constant DECIMALS = bytes4(keccak256("decimals()"));

    bytes4 internal constant TOTAL_SUPPLY = bytes4(keccak256("totalSupply()"));

    bytes4 internal constant BALANCE_OF =
        bytes4(keccak256("balanceOf(address)"));

    bytes4 internal constant TRANSFER =
        bytes4(keccak256("transfer(address,uint256)"));

    bytes4 internal constant ALLOWANCE =
        bytes4(keccak256("allowance(address,address)"));

    bytes4 internal constant APPROVE =
        bytes4(keccak256("approve(address,uint256)"));

    bytes4 internal constant TRANSFER_FROM =
        bytes4(keccak256("transferFrom(address,address,uint256)"));

    bytes4 internal constant INCREASE_ALLOWANCE =
        bytes4(keccak256("increaseAllowance(address,uint256)"));

    bytes4 internal constant DECREASE_ALLOWANCE =
        bytes4(keccak256("decreaseAllowance(address,uint256)"));

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    // Functions
    function commands() public pure override returns (bytes4[] memory _commands){
        _commands = new bytes4[](10);
        _commands[0] = NAME;
        _commands[1] = SYMBOL;
        _commands[2] = DECIMALS;
        _commands[3] = TOTAL_SUPPLY;
        _commands[4] = BALANCE_OF;
        _commands[5] = TRANSFER;
        _commands[6] = ALLOWANCE;
        _commands[7] = APPROVE;
        _commands[8] = TRANSFER_FROM;
        _commands[9] = INCREASE_ALLOWANCE;
        _commands[10] = DECREASE_ALLOWANCE;
    }

    function name() public view virtual returns (string memory) {
        return depot().name;
    }

    function symbol() public view virtual returns (string memory) {
        return depot().symbol;
    }

    function decimals() public view virtual returns (uint8) {
        return depot().decimals;
    }

    function totalSupply() public view virtual returns (uint256) {
        return depot().totalSupply;
    }

    function balanceOf(
        address account
    ) public view virtual returns (uint256) {
        return depot().balances[account];
    }

    function transfer(
        address to,
        uint256 amount
    ) public virtual returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function allowance(
        address owner,
        address spender
    ) public view virtual returns (uint256) {
        return depot().allowances[owner][spender];
    }

    function approve(
        address spender,
        uint256 amount
    ) public virtual returns (bool) {
        _approve(msg.sender, spender, amount);
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual returns (bool) {
        _spendAllowance(from, msg.sender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public virtual returns (bool) {
        Depot storage d = depot();
        _approve(
            msg.sender,
            spender,
            d.allowances[msg.sender][spender] + addedValue
        );
        return true;
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public virtual returns (bool) {
        uint256 currentAllowance = allowance(msg.sender, spender);
        require(
            currentAllowance >= subtractedValue,
            "ERC20: decreased allowance below zero"
        );
        unchecked {
            _approve(msg.sender, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        Depot storage d = depot();
        uint256 fromBalance = d.balances[from];
        require(
            fromBalance >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        unchecked {
            d.balances[from] = fromBalance - amount;
            // Overflow not possible: the sum of all balances is capped by totalSupply, and the sum is preserved by
            // decrementing then incrementing.
            d.balances[to] += amount;
        }

        emit Transfer(from, to, amount);
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        Depot storage d = depot();
        d.totalSupply += amount;
        unchecked {
            d.balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        Depot storage d = depot();
        uint256 accountBalance = d.balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            d.balances[account] = accountBalance - amount;
            // Overflow not possible: amount <= accountBalance <= totalSupply.
            d.totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        Depot storage d = depot();
        d.allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(
                currentAllowance >= amount,
                "ERC20: insufficient allowance"
            );
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    function depot() internal pure returns (Depot storage d) {
        bytes32 position = ERC20_DEPOT_POSITION;
        assembly {
            d.slot := position
        }
    }
}
