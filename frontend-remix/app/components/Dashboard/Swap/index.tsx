import { useState } from "react";
import {
    Button,
    SimpleGrid
} from "@mantine/core";

import type { Token } from "~/moralis.server";

import PayComponent from "./PayComponent";
import ReceiveComponent from "./ReceiveComponent";
import TokenSelect from "./TokenSelect";

type Dict<T> = {
    [key: string]: T
};

type SwapProps = {
    contractAddress: string,
    poolTokens: number,
    assetTokens: Dict<Token>
};

const Swap = (props: SwapProps) => {
    const { contractAddress, poolTokens, assetTokens } = props;
    const [selectedPayTokens, setSelectedPayTokens] = useState<string[]>(
        Object.values(
            assetTokens
        ).filter(
            (t: Token) => t.isPay
        ).map((t: Token) => t.token_address)
    );
    const [selectedReceiveTokens, setSelectedReceiveTokens] = useState<string[]>(
        Object.values(
            assetTokens
        ).filter(
            (t: Token) => t.isReceive
        ).map((t: Token) => t.token_address)
    );
    // const [totalAllocation, setTotalAllocation] = useState(0);

    // const handleSelectedReceiveTokens = (v: string[]) => {
    //     console.log("Handling selected receive tokens");
    //     setSelectedReceiveTokens(v);
    //     setTotalAllocation(
    //         Object.values(
    //             assetTokens
    //         ).map(
    //             (a: Token) => a.allocation
    //         ).reduce((p, c) => p + c)
    //     );
    // }



    const getPreTradePrice = (token: Token) => {
        return token.weight * poolTokens / token.reserve;
    };

    const getPostTradePrice = (token: Token, newPoolTokens: number) => {
        return token.weight * newPoolTokens / (token.reserve + token.amount);
    };

    const getAssetAmountIn = (tokens: string[], newPoolTokens: number) => {
        return tokens.filter(
            (address: string) => address !== contractAddress
        ).map(
            (address: string) => {
                const token = assetTokens[address];
                return token.amount * getPostTradePrice(token, newPoolTokens);
            }
        ).reduce(
            (p: number, c: number) => p + c
        );
    };

    const getQuotes = () => {
        const poolToken: Token = assetTokens[contractAddress];
        
        let newPoolTokens: number = poolTokens + poolToken.amount;

        let assetAmountIn: number = getAssetAmountIn(selectedPayTokens, newPoolTokens);

        let totalAmountIn: number = assetAmountIn - poolToken.amount;
 
        if (poolToken.allocation !== 0) {
            const factor: number = (1 - poolToken.fee) *
                poolToken.allocation -
                getAssetAmountIn(selectedPayTokens, 1);

            const poolTokensOut = totalAmountIn / factor;

            newPoolTokens -= poolTokensOut;

            assetAmountIn = getAssetAmountIn(selectedPayTokens, newPoolTokens);

            totalAmountIn = assetAmountIn + poolTokensOut;
        };

        return selectedReceiveTokens.map(
            (address: string) => {
                const token = assetTokens[address];
                const allocation = token.allocation / 100;
                const factor = (1-token.fee)*allocation*totalAmountIn/(token.weight * newPoolTokens);
                console.log(`factor: ${factor}`);
                const amountOut = factor*token.reserve/(1+factor);
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
    };

    const handleSwap = () => {
        const quotes = getQuotes();
        console.log(quotes);
    };

    return (
        <>
            <SimpleGrid cols={2}>
                <TokenSelect
                    title="Pay Tokens"
                    assetTokens={assetTokens}
                    tokenComponent={PayComponent}
                    selectedTokens={selectedPayTokens}
                    setSelectedTokens={setSelectedPayTokens}
                    isPay={true}
                    placeholder="Select tokens to deposit:"
                />
                <TokenSelect
                    title="Receive Tokens"
                    assetTokens={assetTokens}
                    tokenComponent={ReceiveComponent}
                    selectedTokens={selectedReceiveTokens}
                    setSelectedTokens={setSelectedReceiveTokens}
                    isPay={false}
                    placeholder="Select tokens to withdraw:"
                />
            </SimpleGrid>
            {/* <Text>{`Total allocation: ${totalAllocation}`}</Text> */}
            {/* {totalAllocation !== 100 ?
                <Alert title="Bummer!" color="red" withCloseButton variant="outline" mt="xl">
                    Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
                </Alert> : null} */}
            <Button
                onClick={handleSwap}
                mt="xl"
                size="md"
            >
                Swap
            </Button>
        </>
    );
};

export default Swap;
