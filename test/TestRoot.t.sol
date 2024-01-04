// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Pool, AssetState} from "../contracts/Pool.sol";
import {FloatingPoint, Float} from "./Pool.t.sol";
import {Token} from "./Token.t.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "forge-std/Test.sol";

contract TestRoot is Test, Context {
    using FloatingPoint for uint256;
    using FloatingPoint for Float;
    using Strings for uint256;

    uint256 internal constant ONE = 1e18;
    uint256 internal constant NTOKENS = 100;
    uint256 internal constant TO_INTERNAL = 1e9;

    Float internal ZERO_FLOAT = Float(0, 0);
    Float internal HALF_FLOAT = Float(5, -1).normalize();
    Float internal ONE_FLOAT = Float(1, 0).normalize();

    Token[] internal tokens;
    address[] internal addresses;
    Pool internal pool;
    address alice = address(1);
    address bob = address(2);
    address carol = address(3);

    uint256 private protocolFee = 5e17;
    address private multisigAddress = vm.envAddress("MULTISIG_ADDRESS");
    uint256 private tokensPerShare = 1e18;
    uint256 private tau = 1e16;

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

        pool = new Pool(
            "Pool",
            "P",
            protocolFee, // 18 decimals
            multisigAddress,
            tokensPerShare, // 18 decimals
            addresses[0]
        );
        pool.setProtocolFee(5e17);

        for (uint256 i; i < NTOKENS; i++) {
            uint256 amount = (i + 1) * 1e27;
            uint256 balance = 100 * amount;
            tokens[i].approve(address(pool), balance);
            pool.addAsset(address(tokens[i]), fee_, balance, scale_);
        }

        pool.initialize();
    }

    function weight(address token) public view returns (Float memory) {
        if (token == address(pool)) return ONE_FLOAT;
        AssetState memory asset_ = pool._asset(token);
        return asset_.scale.divide(pool._info().scale);
    }

    function price(address token) public view returns (Float memory) {
        if (token == address(pool)) return ONE_FLOAT;
        AssetState memory asset_ = pool._asset(token);
        Float memory weight_ = weight(token);
        return weight_.times(pool._info().balance).divide(asset_.balance);
    }

    function fee(address token) public view returns (Float memory) {
        if (token == address(pool)) return ZERO_FLOAT;
        AssetState memory asset_ = pool._asset(token);
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

        emit log_named_uint("Protocol fee", pool.protocolFee());
        Float memory valueIn = payAmount
            .fromDecimals(pool._asset(payToken).decimals)
            .times(price(payToken));
        emit log_named_string("Value in", valueIn.toString());
        Float memory valueOut = receiveAmount
            .fromDecimals(pool._asset(receiveToken).decimals)
            .times(price(receiveToken));
        emit log_named_string("Value out", valueOut.toString());
        valueOut = valueOut.plus(fee(receiveToken).times(valueIn));
        emit log_named_string(
            "Fee",
            fee(receiveToken).times(valueIn).toString()
        );
        emit log_named_string("Total value out", valueOut.toString());

        (valueIn, valueOut) = valueIn.align(valueOut);

        assertApproxEqRel(
            valueIn.mantissa,
            valueOut.mantissa,
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
        Float memory valueIn;
        Float memory valueOut;

        for (uint256 i; i < payTokens.length; i++) {
            valueIn = valueIn.plus(
                amounts[i]
                    .fromDecimals(pool._asset(payTokens[i]).decimals)
                    .times(price(payTokens[i]))
            );
        }

        assertGt(valueIn.mantissa, 0, "Value in must be greater than 0");

        Float memory fee_;
        for (uint256 i; i < receiveTokens.length; i++) {
            fee_ = fee_.plus(allocations[i].times(fee(receiveTokens[i])));
            valueOut = valueOut.plus(
                receiveAmounts[i].times(price(receiveTokens[i]))
            );
        }
        valueOut = valueOut.plus(fee_.times(valueIn));

        (valueIn, valueOut) = valueIn.align(valueOut);

        assertApproxEqRel(
            valueIn.mantissa,
            valueOut.mantissa,
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
