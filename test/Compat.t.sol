// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import { PRBTest } from "@prb/test/PRBTest.sol";
import "../src/Pool.sol";
import "./AMM.t.sol";
import "./Token.t.sol";

contract CompatTest is PRBTest {
    uint256 internal constant NTOKENS = 100;

    Token[] internal tokens;
    Pool internal pool;
    AMM internal amm;

    function setUp() public {
        address bob = address(2);
        vm.startPrank(bob);

        pool = new Pool("Pool", "P");
	amm = new AMM("AMM", "AMM");
        tokens = new Token[](NTOKENS);

        uint256 scale = 1e27;
        uint256 fee = 1e15;

        for (uint256 i = 0; i < NTOKENS; i++) {
            uint256 amount = (i + 1) * 1e27;
            uint256 balance = 100 * amount;
            string memory name = "Token";
            string memory symbol = "T";
            Token token = new Token(name, symbol);
            tokens[i] = token;
            token.mint(2*balance);
            token.approve(address(pool), balance);
            token.approve(address(amm), balance);

            pool.addAsset(address(token), balance, fee, scale);
            amm.addAsset(address(token), balance, fee, scale, 0);
        }

        pool.initialize();
        vm.stopPrank();
    }

    function testCompatSwap(uint256 amount) public {
        amount = (amount % 1e59) + 1e11;
        Token depositToken = tokens[0];
        Token withdrawToken = tokens[1];

        depositToken.mint(2*amount);
        depositToken.approve(address(pool), amount);
        depositToken.approve(address(amm), amount);

        uint256 poolSwap = pool.swap(address(depositToken), address(withdrawToken), amount, address(1));
        uint256 ammSwap = amm.swap(address(depositToken), address(withdrawToken), amount, address(1));

        assertEq(poolSwap, ammSwap);
    }

    /*
    function testCompatStake(uint256 amount) public {
        amount = (amount % 1e59) + 1e11;
        Token depositToken = tokens[0];

        depositToken.mint(2*amount);
        depositToken.approve(address(pool), amount);
        depositToken.approve(address(amm), amount);

        uint256 poolSwap = pool.swap(address(depositToken), address(withdrawToken), amount, address(1));
        uint256 ammSwap = amm.swap(address(depositToken), address(withdrawToken), amount, address(1));

        assertEq(poolSwap, ammSwap);
    }
    */
}
