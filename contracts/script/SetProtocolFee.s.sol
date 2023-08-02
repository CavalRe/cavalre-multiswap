// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@cavalre/Pool.sol";
import "forge-std/Script.sol";
import "forge-std/Test.sol";

contract SetProtocolFeeScript is Script, Test {

    uint256 public deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    Pool private pool = Pool(0x34c8b5c7793fCd063a87ee84d05d4F19F9900C00);

    function run() external {
        vm.startBroadcast(deployerPrivateKey);

        pool.setProtocolFee(5e17);
    }
}
