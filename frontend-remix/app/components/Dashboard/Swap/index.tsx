import { useState } from "react";
import {
    Button,
    SimpleGrid,
    Text
} from "@mantine/core";
import type MoralisType from "moralis";
import { BigNumber } from "ethers";
import type { PoolToken, AssetToken, Token } from "~/moralis.server";
import { poolAbi, decimalNumber } from "~/utils";
import PayComponent from "./PayComponent";
import ReceiveComponent from "./ReceiveComponent";
import TokenSelect from "./TokenSelect";

type Dict<T> = {
    [key: string]: T
};

export type SwapState = {
    poolToken: PoolToken
    assetTokens: Dict<AssetToken>
}

type SwapProps = {
    poolToken: PoolToken,
    assetTokens: Dict<AssetToken>
    chain: string
    address: string | null
    moralis: MoralisType
};

const Swap = (props: SwapProps) => {
    const { chain, address, moralis } = props;
    const [swapState, setSwapState] = useState<SwapState>(props);
    const { poolToken, assetTokens } = swapState;

    const getPreTradePrice = (asset: AssetToken) => {
        return asset.weight * poolToken.contractBalance / asset.contractBalance;
    };

    const getPostTradePrice = (asset: AssetToken, newPoolTokens: number) => {
        return asset.weight * newPoolTokens / (asset.contractBalance + asset.amount);
    };

    const getAssetAmount = (assets: AssetToken[], newPoolTokens: number) => {
        return assets.reduce(
            (total: number, asset: AssetToken) => total + asset.amount * getPostTradePrice(asset, newPoolTokens),
            0
        );
    };

    const getQuote = (swapState: SwapState) => {
        const { poolToken, assetTokens } = swapState;

        const poolTokensPreAlloc: number = poolToken.contractBalance - (poolToken.selection == "Pay" ? poolToken.amount : 0); // check

        const selectedAssetPayTokens = Object.values(assetTokens).filter(
            (asset: AssetToken) => asset.selection == "Pay"
        );

        const selectedAssetReceiveTokens = Object.values(assetTokens).filter(
            (asset: AssetToken) => asset.selection == "Receive"
        )

        const assetAmountInPreAlloc: number = getAssetAmount(selectedAssetPayTokens, poolTokensPreAlloc); // check

        const totalAmountInPreAlloc: number = assetAmountInPreAlloc + (poolToken.selection == "Pay" ? poolToken.amount : 0); // check

        let poolTokens = poolTokensPreAlloc;
        let totalAmountOut = totalAmountInPreAlloc;

        if (poolToken.allocation !== 0) {
            const factor: number = 1 / poolToken.allocation -
                getAssetAmount(selectedAssetPayTokens, 1);

            const totalAmountOutNoFee = totalAmountInPreAlloc / factor;

            const poolTokensOutNoFee = poolToken.allocation * totalAmountOutNoFee;

            const poolTokensOut = (1 - poolToken.fee) * poolTokensOutNoFee;

            poolToken.amount = -poolTokensOut;

            poolTokens = poolToken.contractBalance + poolTokensOut;

            totalAmountOut = totalAmountOutNoFee;
        };

        const quotes = selectedAssetReceiveTokens.map(
            (token: AssetToken) => {
                const allocation = token.allocation;
                const factor = (1 - token.fee) * allocation * totalAmountOut / (token.weight * poolTokens);
                const amountOut = factor * token.contractBalance / (1 + factor);
                token.amount = -amountOut;
                const preTradePrice = getPreTradePrice(token);
                const postTradePrice = getPostTradePrice(token, poolTokens);

                return {
                    token,
                    preTradePrice,
                    postTradePrice,
                    amountOut
                }
            }
        );
        setSwapState({ poolToken, assetTokens });
        return quotes;
    };

    const swap = async (address: string, payTokens: Token[], receiveTokens: Token[]) => {
        const totalAllocation = receiveTokens.reduce((acc: number, t: Token) => acc + t.allocation, 0);
        if (Math.abs(totalAllocation - 1) > 0.0001) return { error: "Allocation must add up to 1" };
    
        if (payTokens.length === 0) return { error: "Must select at least one pay token" };
        if (receiveTokens.length === 0) return { error: "Must select at least one receive token" };
    
        if (payTokens.length > 1) return { error: "Must select only one pay token" };
        if (receiveTokens.length > 1) return { error: "Must select only one receive token" };
    
        const payAddresses = payTokens.map((t: Token) => t.address);
        const receiveAddresses = receiveTokens.map((t: Token) => t.address);
    
        if (payAddresses.includes(poolToken.address)) {
            return { result: "Staking" };
        } else if (receiveAddresses.includes(poolToken.address)) {
            return { result: "Unstaking" };
        } else {
            const { allowance } = await moralis.Web3API.token.getTokenAllowance(
                {
                    chain,
                    owner_address: address,
                    spender_address: poolToken.address,
                    address: payTokens[0].address
                }
            );
            console.log(`allowance: ${decimalNumber(allowance)}`);
            console.log(`amount: ${payTokens[0].amount}`);
            if (decimalNumber(allowance) < payTokens[0].amount) {
                // await Moralis.Web3API.native.runContractFunction({
    
                // })
            }
            // Moralis.authenticate({
            //     chain,
            //     address,
            // })
            await moralis.executeFunction({
                contractAddress: poolToken.address,
                functionName: "swap",
                abi: poolAbi,
                params: { 
                    addressIn: payTokens[0].address, 
                    addressOut: receiveTokens[0].address,
                    amountIn: BigNumber.from(10).pow(payTokens[0].decimals).mul(payTokens[0].amount),
                    addressTo: address
                }
            });
            return { result: "Swapping" };
        };
    };

    const totalAllocation = Object.values(assetTokens).reduce(
        (total: number, { allocation }) => total + allocation,
        poolToken.allocation
    );

    const handleSwap = () => {
        const quotes = getQuote(swapState);
        const payTokens: Token[] = [];
        const receiveTokens: Token[] = [];

        if (poolToken.selection == "Pay") {
            payTokens.push(poolToken);
        } else if (poolToken.selection == "Receive") {
            receiveTokens.push(poolToken);
        };

        Object.values(assetTokens).forEach(
            (asset: AssetToken) => {
                if (asset.selection == "Pay") {
                    payTokens.push(asset);
                } else if (asset.selection == "Receive") {
                    receiveTokens.push(asset);
                }
            }
        );

        address && swap(address, payTokens, receiveTokens);
    };

    return (
        <>
            <SimpleGrid cols={2}>
                <TokenSelect
                    title="Pay Tokens"
                    swapState={swapState}
                    getQuote={getQuote}
                    tokenComponent={PayComponent}
                    isPay={true}
                    placeholder="Select tokens to deposit:"
                />
                <TokenSelect
                    title="Receive Tokens"
                    swapState={swapState}
                    getQuote={getQuote}
                    tokenComponent={ReceiveComponent}
                    isPay={false}
                    placeholder="Select tokens to withdraw:"
                />
            </SimpleGrid>
            <Text>{`Total allocation: ${(100 * totalAllocation).toFixed(2)}%`}</Text>
            <Button
                type="submit"
                onClick={handleSwap}
                mt="xl"
                size="md"
                disabled={Math.abs(totalAllocation - 1) > .0001}
            >
                Swap
            </Button>
        </>
    );
};

export default Swap;
