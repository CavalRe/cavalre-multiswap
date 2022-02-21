// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol";

contract Asset is ERC20Wrapper {
    uint256 private _fee; // Transaction fee, e.g. 0.003
    uint256 private _weight; // Market value weight of this asset token, sum_i w_i = 10^18
    uint256 private _k; // AMM parameter for this asset token
    bool private _isActive; // Flag to indicate whether this asset token is actively traded

    constructor(
        string memory name_,
        string memory symbol_,
        address token_,
        uint256 fee_, // Transaction fee, e.g. 0.003
        uint256 weight_, // Market value weight of this asset token, sum_i w_i = 10^18
        uint256 k_, // AMM parameter for this asset token
        bool isActive_ // Flag to indicate whether this asset token is actively traded
    ) ERC20(name_,symbol_) ERC20Wrapper(IERC20(token_)) {
        // console.log("Constructing asset");
        // console.log("Depositing asset");
        // console.log("Message sender:",_msgSender());
        // console.log("This address:", address(this));
        // console.log("Balance:",IERC20(__token).balanceOf(_msgSender()));
        // depositFor(_msgSender(),__reserve);
        _fee = fee_;
        _weight = weight_;
        _k = k_;
        _isActive = isActive_;
    }

    // constructor(
    //     string memory __name,
    //     string memory __symbol,
    //     address __token,
    //     uint256 __reserve, // Number of asset tokens in pool
    //     uint256 __fee, // Transaction fee, e.g. 0.003
    //     uint256 __weight, // Market value weight of this asset token, sum_i w_i = 10^18
    //     uint256 __k, // AMM parameter for this asset token
    //     bool __isActive // Flag to indicate whether this asset token is actively traded
    // ) ERC20(__name,__symbol) ERC20Wrapper(IERC20(__token)) {
    //     console.log("Constructing asset");
    //     // console.log("Depositing asset");
    //     // console.log("Message sender:",_msgSender());
    //     // console.log("This address:", address(this));
    //     console.log("Balance:",IERC20(__token).balanceOf(_msgSender()));
    //     depositFor(_msgSender(),__reserve);
    //     _token = __token;
    //     _fee = __fee;
    //     _weight = __weight;
    //     _k = __k;
    //     _isActive = __isActive;
    // }

    function fee() public view returns (uint256) {
        return _fee;
    }

    function weight() public view returns (uint256) {
        return _weight;
    }

    function isActive() public view returns (bool) {
        return _isActive;
    }
}
