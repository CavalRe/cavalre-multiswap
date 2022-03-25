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
import { poll } from "ethers/lib/utils";

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
        return asset.weight * poolToken.outstanding / asset.reserve;
    };

    const getPostTradePrice = (asset: AssetToken, newPoolTokens: number) => {
        return asset.weight * newPoolTokens / (asset.reserve + asset.amount);
    };

    const getAssetAmountIn = (assets: AssetToken[], newPoolTokens: number) => {
        return assets.reduce(
            (total: number, asset: AssetToken) => total + asset.amount * getPostTradePrice(asset, newPoolTokens),
            0
        );
    };

    const getQuote = (swapState: SwapState) => {
        const { poolToken, assetTokens } = swapState;

        let newPoolTokens: number = poolToken.outstanding - poolToken.amount;

        const selectedAssetPayTokens = Object.values(assetTokens).filter(
            (asset: AssetToken) => asset.isPay
        );
        // const selectedPayTokens: (PoolToken | AssetToken)[] = poolToken.isPay ? [poolToken, ...selectedAssetPayTokens] : selectedAssetPayTokens

        const selectedAssetReceiveTokens = Object.values(assetTokens).filter(
            (asset: AssetToken) => asset.isReceive
        )
        // const selectedReceiveTokens: (PoolToken | AssetToken)[] = poolToken.isReceive ? [poolToken, ...selectedAssetReceiveTokens] : selectedAssetReceiveTokens

        let assetAmountIn: number = getAssetAmountIn(selectedAssetPayTokens, newPoolTokens);

        let totalAmountIn: number = assetAmountIn - poolToken.amount;

        if (poolToken.allocation !== 0) {
            const factor: number = (1 - poolToken.fee) *
                poolToken.allocation -
                getAssetAmountIn(selectedAssetPayTokens, 1);

            const poolTokensOut = totalAmountIn / factor;

            poolToken.amount = -poolTokensOut;

            newPoolTokens -= poolTokensOut;

            assetAmountIn = getAssetAmountIn(selectedAssetPayTokens, newPoolTokens);

            totalAmountIn = assetAmountIn + poolTokensOut;
        };

        const quotes = selectedAssetReceiveTokens.map(
            (token: AssetToken) => {
                const allocation = token.allocation / 100;
                const factor = (1 - token.fee) * allocation * totalAmountIn / (token.weight * newPoolTokens);
                const amountOut = factor * token.reserve / (1 + factor);
                token.amount = -amountOut;
                const preTradePrice = getPreTradePrice(token);
                const postTradePrice = getPostTradePrice(token, newPoolTokens);

                return {
                    token,
                    preTradePrice,
                    postTradePrice,
                    amountOut
                }
            }
        );
        setSwapState({ poolToken, assetTokens });
        console.log([
            {
                name: poolToken.name,
                isPay: poolToken.isPay,
                isReceive: poolToken.isReceive,
                amount: poolToken.amount,
                allocation: poolToken.allocation
            }
        ].concat(
            Object.values(assetTokens).map(
                (asset: AssetToken) => {
                    return {
                        name: asset.name,
                        isPay: asset.isPay,
                        isReceive: asset.isReceive,
                        amount: asset.amount,
                        allocation: asset.allocation
                    }
                }
            )
        ));
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
            <Text>{`Total allocation: ${totalAllocation}%`}</Text>
            <Button
                onClick={handleSwap}
                mt="xl"
                size="md"
                disabled={totalAllocation !== 100}
            >
                Swap
            </Button>
        </>
    );
};

export default Swap;
