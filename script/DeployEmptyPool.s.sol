// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../contracts/Pool.sol";
import "forge-std/Script.sol";
import "forge-std/Test.sol";

contract DeployEmptyPoolScript is Script, Test {
    Pool private pool;
    uint256 private protocolFee = 5e17;
    uint256 private tokensPerShare = 1e18;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address feeRecipient = vm.envAddress("FEE_RECIPIENT");

        vm.startBroadcast(deployerPrivateKey);
        pool = new Pool(
            "Multiswap Beta 1.1",
            unicode"β1.1",
            protocolFee,
            feeRecipient,
            tokensPerShare,
            vm.envAddress("WRAPPED_NATIVE_TOKEN")
        );

        emit log_named_address("pool address", address(pool));
        emit log_named_address("pool owner", address(pool.owner()));
        emit log_named_address("sender", msg.sender);

        // pool.transferOwnership(feeRecipient);
    }
}
