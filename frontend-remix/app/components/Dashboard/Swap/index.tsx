import { useState } from "react";
import {
    Button,
    SimpleGrid,
    Text
} from "@mantine/core";

import type { PoolToken, AssetToken } from "~/moralis.server";

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
};

const Swap = (props: SwapProps) => {
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

    const totalAllocation = Object.values(assetTokens).reduce(
        (total: number, { allocation }) => total + allocation,
        poolToken.allocation
    );

    const handleSwap = () => {
        const quotes = getQuote(swapState);
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
