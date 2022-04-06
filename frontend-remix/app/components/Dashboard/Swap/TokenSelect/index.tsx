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
};

type TokenSelectProps = {
    title: string
    swapState: SwapState
    getQuote: Function
    tokenComponent: FC<TokenComponentProps>
    isPay: boolean
    placeholder: string
};

const TokenSelect = (props: TokenSelectProps) => {
    const {
        title,
        swapState,
        getQuote,
        tokenComponent,
        isPay,
        placeholder,
    } = props;
    const { poolToken, assetTokens } = swapState;
    const [selected, setSelected] = useState<string[]>(
        () => {
            let selected: string[] = [];
            if ((isPay && poolToken.selection == "Pay") || (!isPay && poolToken.selection == "Receive")) {
                selected.push(poolToken.address);
            };
            Object.values(assetTokens).forEach(
                (asset: AssetToken) => {
                    if ((isPay && asset.selection == "Pay") || (!isPay && asset.selection == "Receive")) {
                        selected.push(asset.address);
                    };
                }
            );
            return selected;
        }
    );

    const TokenComponent: FC<TokenComponentProps> = tokenComponent;

    const getItems = () => {
        let items: SelectItem[] = [];
        if ((isPay && poolToken.selection !== "Receive") || (!isPay && poolToken.selection !== "Pay")) {
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
                (t: AssetToken) => isPay ? t.selection !== "Receive" : t.selection !== "Pay"
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
        if (isPay && v.includes(token.address)) {
                token.selection = "Pay";
                token.amount = token.amount == 0 ? 1 : token.amount;
        } else if (!isPay && v.includes(token.address)) {
                token.selection = "Receive";
                token.allocation = token.allocation == 0 ? Math.max(0,1-totalAllocation) : Math.min(token.allocation,1-totalAllocation);
         } else if ((isPay && token.selection == "Pay") || (!isPay && token.selection == "Receive")) {
            token.selection = "Neither";
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
                        key={poolToken.address}
                    /> : null
            }
            {
                Object.values(assetTokens)
                    .filter((token: AssetToken) => isPay ? token.selection == "Pay" : token.selection == "Receive")
                    .map((token: AssetToken, i: number) => {
                        return (
                            <TokenComponent
                                token={token}
                                swapState={swapState}
                                getQuote={getQuote}
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
