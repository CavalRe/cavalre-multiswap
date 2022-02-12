// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.11;

library Shared {

    struct Asset {
        address token;
        uint reserve; // Number of asset tokens in pool 
        uint fee; // Transaction fee, e.g. 0.003
        uint ewaFees; // Exponentialy weighted average fees for this asset token
        uint k; // AMM parameter for this asset token
        uint weight; // Market value weight of this asset token, sum_i w_i = 10^18
        bool isActive; // Flag to indicate whether this asset token is actively traded
    }

}