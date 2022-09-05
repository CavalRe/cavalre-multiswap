// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

//import "openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract Token is ERC20 {
    uint8 private immutable DECIMALS;

    constructor(
        string memory name,
        string memory symbol,
        uint8 _decimals
    ) ERC20(name, symbol) {
        DECIMALS = _decimals;
    }

    function mint(uint256 amount) public virtual {
        _mint(_msgSender(), amount);
    }

    function burn(uint256 amount) public virtual {
        _burn(_msgSender(), amount);
    }

    function decimals() public view override returns (uint8) {
        return DECIMALS;
    }
}
