// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import { PRBTest } from "@prb/test/PRBTest.sol";
import "../src/Pool.sol";
import "./Token.t.sol";

contract TestRoot is PRBTest {
    uint256 internal constant NTOKENS = 100;

    Token[] internal tokens;
    Pool internal pool;

    function setUp() public {
        address bob = address(2);
        vm.startPrank(bob);

        pool = new Pool("Pool", "P");
        tokens = new Token[](NTOKENS);

        uint256 scale = 1e27;

        for (uint256 i = 0; i < NTOKENS; i++) {
            uint256 amount = (i + 1) * 1e27;
            uint256 balance = 100 * amount;
            string memory name = "Token";
            string memory symbol = "T";
            Token token = new Token(name, symbol);
            token.mint(balance);
            token.approve(address(pool), balance);
            tokens[i] = token;

            pool.addAsset(address(token), balance, scale);
        }

        pool.initialize();
        vm.stopPrank();
    }
}
