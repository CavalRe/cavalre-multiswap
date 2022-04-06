import { useState } from "react";
import type { FC } from "react";
import {
    MultiSelect,
    Paper,
    SelectItem,
    Title,
} from "@mantine/core";

import type { AssetToken, Token } from "~/moralis.server";
import type { SwapState } from "../../Swap";

import TokenItem from "./TokenItem";

export type TokenComponentProps = {
    token: Token
    swapState: SwapState
    getQuote: Function
    address: string
};

type TokenSelectProps = {
    title: string
    swapState: SwapState
    getQuote: Function
    tokenComponent: FC<TokenComponentProps>
    isPay: boolean
    placeholder: string
    address: string
};

const TokenSelect = (props: TokenSelectProps) => {
    const {
        title,
        swapState,
        getQuote,
        tokenComponent,
        isPay,
        placeholder,
        address
    } = props;
    const { poolToken, assetTokens } = swapState;
    const [selected, setSelected] = useState<string[]>([])

    const TokenComponent: FC<TokenComponentProps> = tokenComponent;

    const getItems = () => {
        let items: SelectItem[] = [];
        if ((isPay && poolToken.accountBalance > 0 && !poolToken.isReceive) || (!isPay && !poolToken.isPay)) {
            items.push({
                label: `${poolToken.name} (${poolToken.symbol})`,
                value: poolToken.address,
                token: poolToken,
                group: "Pool Token"
            })
        };
        items = items.concat(
            Object.values(
                assetTokens
            ).filter(
                (t: AssetToken) => isPay ? !t.isReceive : (!t.isPay && t.contractBalance > 0)
            ).map((t: AssetToken) => {
                return {
                    label: `${t.name} (${t.symbol})`,
                    value: t.address,
                    token: t,
                    group: t.contractBalance > 0 ? "Asset Tokens" : "Not in Pool",
                    disabled: isPay && t.contractBalance == 0
                }
            })
        );
        return items;
    };

    const items: SelectItem[] = getItems();

    const setToken = (v: string[], token: Token, totalAllocation: number) => {
        if (isPay) {
            if (v.includes(token.address)) {
                token.isPay = true;
                token.isReceive = false;
                token.amount = token.amount == 0 ? 1 : token.amount;
            } else {
                token.isPay = false;
            };
        } else {
            if (v.includes(token.address)) {
                token.isPay = false;
                token.isReceive = true;
                token.allocation = token.allocation == 0 ? Math.max(0,1-totalAllocation) : Math.min(token.allocation,1-totalAllocation);
            } else {
                token.isReceive = false;
            };
        };

        if (!token.isPay && !token.isReceive) {
            token.amount = 0;
            token.allocation = 0;
        };

        return totalAllocation+token.allocation;
    };

    const handleSelect = ((v: string[]) => {

        let totalAllocation = setToken(v,poolToken,0);

        Object.values(assetTokens).forEach((asset: AssetToken) => {
            totalAllocation = setToken(v,asset,totalAllocation);
        });

        getQuote({ poolToken, assetTokens });
        setSelected(v);
    });

    return (
        <Paper withBorder p="xl" radius="md" mt="lg">
            <Title order={4} align="center">{title}</Title>
            {
                selected.includes(poolToken.address) ?
                    <TokenComponent
                        token={poolToken}
                        swapState={swapState}
                        getQuote={getQuote}
                        address={address}
                        key={poolToken.address}
                    /> : null
            }
            {
                Object.values(assetTokens)
                    .filter((token: AssetToken) => isPay ? token.isPay : token.isReceive)
                    .map((token: AssetToken, i: number) => {
                        return (
                            <TokenComponent
                                token={token}
                                swapState={swapState}
                                getQuote={getQuote}
                                address={address}
                                key={token.address}
                            />
                        )
                    })
            }
            <MultiSelect
                data={items}
                itemComponent={TokenItem}
                value={selected}
                onChange={handleSelect}
                mt="xs"
                size="md"
                placeholder={placeholder}
                searchable
                nothingFound="Nothing found"
                clearable
                clearButtonLabel="Clear selected tokens"
            />
        </Paper >
    );
};

export default TokenSelect;
