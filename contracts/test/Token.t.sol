// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    uint8 private _decimals;

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) ERC20(name_, symbol_) {
        _decimals = decimals_;
    }

    function mint(uint256 amount) public virtual {
        _mint(_msgSender(), amount);
    }

    function burn(uint256 amount) public virtual {
        _burn(_msgSender(), amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
}

contract TokenFactory {
    mapping(address => uint256) private _index;
    Token[] private _tokens;

    error LengthMismatch(uint256 expected, uint256 actual);

    function tokens() public view returns (Token[] memory) {
        return _tokens;
    }

    function create(
        string[] memory names,
        string[] memory symbols
    ) public returns (Token[] memory) {
        if (names.length != symbols.length)
            revert LengthMismatch(names.length, symbols.length);

        for (uint256 i; i < names.length; i++) {
            Token token = new Token(names[i], symbols[i], 18);
            _index[address(token)] = _tokens.length;
            _tokens.push(token);
        }
        return _tokens;
    }

    function mint(address[] memory addresses, uint256[] memory amounts) public {
        if (addresses.length != amounts.length)
            revert LengthMismatch(addresses.length, amounts.length);
        for (uint256 i; i < addresses.length; i++) {
            _tokens[_index[addresses[i]]].mint(amounts[i]);
        }
    }

    function burn(address[] memory addresses, uint256[] memory amounts) public {
        if (addresses.length != amounts.length)
            revert LengthMismatch(addresses.length, amounts.length);
        for (uint256 i; i < addresses.length; i++) {
            _tokens[_index[addresses[i]]].burn(amounts[i]);
        }
    }

    function approve(
        address spender,
        address[] memory addresses,
        uint256[] memory amounts
    ) public {
        if (addresses.length != amounts.length)
            revert LengthMismatch(addresses.length, amounts.length);
        for (uint256 i; i < addresses.length; i++) {
            _tokens[_index[addresses[i]]].approve(spender, 0);
            _tokens[_index[addresses[i]]].approve(spender, amounts[i]);
        }
    }
}
