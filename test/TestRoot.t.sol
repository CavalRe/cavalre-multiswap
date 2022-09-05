// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import { PRBTest } from "@prb/test/PRBTest.sol";
import { console } from "forge-std/console.sol";
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
        uint256 balance = 1e27;

        uint256 scale = 1e18;
        uint256 fee = 0;

        // add general tokens
        for (uint256 i = 0; i < NTOKENS - 1; i++) {
            string memory name = "Token";
            string memory symbol = "T";
            Token token = new Token(name, symbol, 18);
            token.mint(balance);
            token.approve(address(pool), balance);
            tokens[i] = token;

            pool.addAsset(address(token), balance, fee, scale);
        }

        // add a token with different decimal system
        Token USD = new Token("USD", "USD", 6);
        USD.mint(balance);
        USD.approve(address(pool), balance);
        tokens[NTOKENS - 1] = USD;
        pool.addAsset(address(USD), balance, fee, scale);

        pool.initialize();
        vm.stopPrank();
    }
}
