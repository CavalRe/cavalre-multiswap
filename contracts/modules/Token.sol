// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract SimpleERC4626Token is Initializable, ERC4626Upgradeable {
    function initialize(ERC20Upgradeable asset) public initializer {
        __ERC4626_init(asset);
    }
}
