// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "forge-std/Script.sol";
import "forge-std/Test.sol";
import "forge-std/StdJson.sol";

struct Asset {
    IERC20 token;
    string name;
    string symbol;
    uint8 decimals;
    uint256 balance;
    uint256 fee; // Transaction fee, e.g. 0.003
    uint256 scale; // Used to compute weight of this asset token
    uint256 k; // AMM parameter for this asset token
}

interface IMyContract {
    function name() external view returns (string memory);

    function assets() external view returns (Asset[] memory);

    function pool()
        external
        view
        returns (
            address,
            string memory,
            string memory,
            uint8,
            uint256,
            uint256
        );
}

contract CallAssets is Script, Test {
    using stdJson for *;

    address constant contractAddress =
        0x3e1E08f87393c55DFbe44B5c68570085f2Ab1717;

    function run() external {
        IMyContract myContract = IMyContract(contractAddress);
        emit log_named_string("contract name", myContract.name());
        Asset[] memory assets = myContract.assets();
        emit log_named_uint("assets length", assets.length);

        address poolAddress;
        string memory poolName;
        string memory poolSymbol;
        uint8 poolDecimals;
        uint256 poolBalance;
        uint256 poolScale;
        (
            poolAddress,
            poolName,
            poolSymbol,
            poolDecimals,
            poolBalance,
            poolScale
        ) = myContract.pool();

        emit log_named_address("pool address", poolAddress);
        emit log_named_string("pool name", poolName);
        emit log_named_string("pool symbol", poolSymbol);
        emit log_named_uint("pool decimals", poolDecimals);
        emit log_named_uint("pool balance", poolBalance);
        emit log_named_uint("pool scale", poolScale);

        // string[] memory assetsJSON = new string[](assets.length);
        // for (uint256 i = 0; i < assets.length; i++) {
        //     string memory asset = "asset";
        //     vm.serializeAddress(asset, "address", address(assets[i].token));
        //     vm.serializeString(asset, "name", assets[i].name);
        //     vm.serializeString(asset, "symbol", assets[i].symbol);
        //     vm.serializeUint(asset, "decimals", assets[i].decimals);
        //     vm.serializeUint(asset, "balance", assets[i].balance);
        //     vm.serializeUint(asset, "fee", assets[i].fee);
        //     vm.serializeUint(asset, "scale", assets[i].scale);
        //     assetsJSON[i] = vm.serializeUint(asset, "k", assets[i].k);
        //     // emit log("{");
        //     // emit log_named_address("asset address", address(assets[i].token));
        //     // emit log_named_string("name", assets[i].name);
        //     // emit log_named_string("symbol", assets[i].symbol);
        //     // emit log_named_uint("decimals", assets[i].decimals);
        //     // emit log_named_uint("balance", assets[i].balance);
        //     // emit log_named_uint("fee", assets[i].fee);
        //     // emit log_named_uint("scale", assets[i].scale);
        //     // emit log_named_uint("k", assets[i].k);
        //     // emit log("},");
        // }
        // string memory json = "json";
        // vm.writeJson(vm.serializeString(json, "assets", assetsJSON), "./sp500.json");
    }
}
