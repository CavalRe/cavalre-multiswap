// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "solmate/utils/FixedPointMathLib.sol";

contract LPToken is ERC20 {
    using FixedPointMathLib for uint256;

    uint256 private _ratio; // virtual -> real

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _ratio = 1e18;
    }

    function totalSupply() public view override returns (uint256) {
        return super.totalSupply().mulWadUp(_ratio);
    }

    function balanceOf(address account) public view override returns (uint256) {
        return super.balanceOf(account).mulWadUp(_ratio);
    }

    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool) {
        amount = amount.divWadUp(_ratio);
        return super.transfer(to, amount);
    }

    function allowance(
        address owner,
        address spender
    ) public view override returns (uint256) {
        return super.allowance(owner, spender).mulWadUp(_ratio);
    }

    function approve(
        address spender,
        uint256 amount
    ) public override returns (bool) {
        amount = amount.divWadUp(_ratio);
        return super.approve(spender, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        amount = amount.divWadUp(_ratio);
        return super.transferFrom(from, to, amount);
    }

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public override returns (bool) {
        addedValue = addedValue.divWadUp(_ratio);
        return super.increaseAllowance(spender, addedValue);
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public override returns (bool) {
        subtractedValue = subtractedValue.divWadUp(_ratio);
        return super.decreaseAllowance(spender, subtractedValue);
    }

    function _distributeFee(uint256 amount) internal virtual {
        _ratio = (totalSupply()+amount).divWadUp(super.totalSupply());
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        amount = amount.divWadUp(_ratio);
        super._transfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override {
        amount = amount.divWadUp(_ratio);
        super._mint(to, amount);
    }

    function _burn(address from, uint256 amount) internal override {
        amount = amount.divWadUp(_ratio);
        super._burn(from, amount);
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal override {
        amount = amount.divWadUp(_ratio);
        super._approve(owner, spender, amount);
    }

    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal override {
        amount = amount.divWadUp(_ratio);
        super._spendAllowance(owner, spender, amount);
    }

}
