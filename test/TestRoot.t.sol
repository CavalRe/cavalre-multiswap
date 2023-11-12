// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import "../contracts/Pool.sol";
import "./Token.t.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "forge-std/Test.sol";
import "solady/src/utils/FixedPointMathLib.sol";

contract TestRoot is Test, Context {
    using FixedPointMathLib for uint256;
    using Strings for uint256;

    uint256 internal constant ONE = 1e18;
    uint256 internal constant NTOKENS = 100;

    Token[] internal tokens;
    address[] internal addresses;
    Pool internal pool;
    address alice = address(1);
    address bob = address(2);
    address carol = address(3);

    function setUp() public {
        vm.startPrank(alice);
        vm.roll(1);

        tokens = new Token[](NTOKENS);
        addresses = new address[](NTOKENS);

        uint256 scale_ = 1e27;
        uint256 fee_ = 1e15;
        // uint256 fee_ = 0;

        for (uint256 i; i < NTOKENS; i++) {
            uint256 amount = (i + 1) * 1e27;
            uint256 balance = 100 * amount;

            string memory name = string(
                abi.encodePacked("Token ", Strings.toString(i + 1))
            );
            string memory symbol = string(
                abi.encodePacked("T", Strings.toString(i + 1))
            );
            Token token = new Token(name, symbol, 18);
            token.burn(token.balanceOf(alice));
            token.mint(balance);
            tokens[i] = token;
            addresses[i] = address(token);
        }

        uint256 protocolFee;
        // protocolFee = 2e17;

        pool = new Pool(
            "Pool",
            "P",
            protocolFee,
            1e16,
            vm.envAddress("WRAPPED_NATIVE_TOKEN")
        );

        for (uint256 i; i < NTOKENS; i++) {
            uint256 amount = (i + 1) * 1e27;
            uint256 balance = 100 * amount;
            tokens[i].approve(address(pool), balance);
            pool.addAsset(address(tokens[i]), fee_, balance, scale_);
        }

        pool.initialize();
    }

    function weight(address token) public view returns (uint256) {
        if (token == address(pool)) return ONE;
        AssetState memory asset_ = pool.asset(token);
        return asset_.scale.divWadUp(pool.info().scale);
    }

    function price(address token) public view returns (uint256) {
        if (token == address(pool)) return ONE;
        AssetState memory asset_ = pool.asset(token);
        uint256 weight_ = weight(token);
        return weight_.fullMulDiv(pool.info().balance, asset_.balance);
    }

    function fee(address token) public view returns (uint256) {
        if (token == address(pool)) return 0;
        AssetState memory asset_ = pool.asset(token);
        return asset_.fee;
    }

    function checkSF(
        address payToken,
        address receiveToken,
        uint256 payAmount,
        uint256 receiveAmount
    ) public {
        assertGt(payAmount, 0, "Pay amount must be greater than 0");
        assertGt(receiveAmount, 0, "Receive amount must be greater than 0");

        uint256 valueIn = payAmount.mulWadUp(price(payToken));
        uint256 valueOut = receiveAmount.mulWadUp(price(receiveToken)) +
            fee(receiveToken).mulWadUp(valueIn);

        assertApproxEqRel(
            valueIn,
            valueOut,
            1e8,
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

        for (uint256 i; i < payTokens.length; i++) {
            valueIn += amounts[i].mulWadUp(price(payTokens[i]));
        }

        assertGt(valueIn, 0, "Value in must be greater than 0");

        uint256 fee_;
        for (uint256 i; i < receiveTokens.length; i++) {
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
            pool.totalTokens(),
            pool.info().balance,
            1e8,
            "Pool total supply is not approximately equal to pool balance: "
        );
    }

    function checkLP(uint256 amountIn, uint256 amountOut) public {
        assertApproxEqRel(
            pool.totalTokens(),
            pool.info().balance,
            1e8,
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
