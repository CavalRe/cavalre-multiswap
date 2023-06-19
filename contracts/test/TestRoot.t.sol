// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "@cavalre/Pool.sol";
import "@cavalre/test/Token.t.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "forge-std/Test.sol";
import "solady/utils/FixedPointMathLib.sol";

contract TestRoot is Test {
    using FixedPointMathLib for uint256;
    using Strings for uint256;

    uint256 internal constant ONE = 1e18;
    uint256 internal constant NTOKENS = 100;

    Token[] internal tokens;
    Pool internal pool;

    function setUp() public {
        address bob = address(2);
        vm.startPrank(bob);

        pool = new Pool("Pool", "P");
        tokens = new Token[](NTOKENS);

        uint256 scale_ = 1e27;
        uint256 fee_ = 1e15;
        // uint256 fee_ = 0;

        for (uint256 i = 0; i < NTOKENS; i++) {
            uint256 amount = (i + 1) * 1e27;
            uint256 balance = 100 * amount;
            string memory name = "Token";
            string memory symbol = "T";
            Token token = new Token(name, symbol);
            token.mint(balance);
            token.approve(address(pool), balance);
            tokens[i] = token;

            pool.addAsset(address(token), balance, fee_, scale_);
        }

        pool.initialize();
        vm.stopPrank();
    }

    function weight(address token) public view returns (uint256) {
        if (token == address(pool)) return ONE;
        Asset memory asset_ = pool.asset(token);
        return asset_.state.scale.divWadUp(pool.scale());
    }

    function price(address token) public view returns (uint256) {
        if (token == address(pool)) return ONE;
        Asset memory asset_ = pool.asset(token);
        uint256 weight_ = weight(token);
        return weight_.fullMulDiv(pool.balance(), asset_.state.balance);
    }

    function fee(address token) public view returns (uint256) {
        if (token == address(pool)) return 0;
        Asset memory asset_ = pool.asset(token);
        return asset_.state.fee;
    }

    function checkSF(
        address payToken,
        address receiveToken,
        uint256 payAmount,
        uint256 receiveAmount
    ) public {
        uint256 valueIn = payAmount.mulWadUp(price(payToken));
        uint256 valueOut = receiveAmount.mulWadUp(price(receiveToken)) +
            fee(receiveToken).mulWadUp(valueIn);

        assertApproxEqRel(
            valueIn,
            valueOut,
            1e6,
            string(
                abi.encodePacked(
                    "Value in does not equal value out. ",
                    Strings.toString(payAmount),
                    " ",
                    Strings.toString(receiveAmount)
                )
            )
        );
    }

    function checkSF(
        address[] memory payTokens,
        uint256[] memory amounts,
        address[] memory receiveTokens,
        uint256[] memory allocations,
        uint256[] memory receiveAmounts
    ) public {
        uint256 valueIn;
        uint256 valueOut;

        for (uint256 i = 0; i < payTokens.length; i++) {
            valueIn += amounts[i].mulWadUp(price(payTokens[i]));
        }

        uint256 fee_;
        for (uint256 i = 0; i < receiveTokens.length; i++) {
            fee_ += allocations[i].mulWadUp(fee(receiveTokens[i]));
            valueOut += receiveAmounts[i].mulWadUp(price(receiveTokens[i]));
        }
        valueOut += fee_.mulWadUp(valueIn);

        assertApproxEqRel(
            valueIn,
            valueOut,
            1e8,
            "Value in does not equal value out."
        );
    }

    function checkLP() public {
        assertApproxEqRel(
            pool.totalSupply(),
            pool.balance(),
            1e6,
            "Pool total supply is not approximately equal to pool balance: "
        );
    }

    function checkLP(uint256 amountIn, uint256 amountOut) public {
        assertApproxEqRel(
            pool.totalSupply(),
            pool.balance(),
            1e6,
            string(
                abi.encodePacked(
                    "Pool total supply is not approximately equal to pool balance: ",
                    Strings.toString(amountIn),
                    " ",
                    Strings.toString(amountOut)
                )
            )
        );
    }
}
