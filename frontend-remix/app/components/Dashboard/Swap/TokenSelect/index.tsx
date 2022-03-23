import { FC, SetStateAction } from "react";
import {
    MultiSelect,
    Paper,
    SelectItem,
    Title,
} from "@mantine/core";

import type { Token } from "~/moralis.server";

import TokenItem from "./TokenItem";

type Dict<T> = {
    [key: string]: T
};

export type TokenComponentProps = {
    token: Token
    assetTokens: Dict<Token>
};

type TokenSelectProps = {
    title: string
    assetTokens: Dict<Token>
    tokenComponent: FC<TokenComponentProps>
    selectedTokens: string[]
    setSelectedTokens: React.Dispatch<SetStateAction<string[]>>
    onNumberChange?: Function
    isPay: boolean
    placeholder: string
};

const TokenSelect = (props: TokenSelectProps) => {
    const { 
        title,
        assetTokens,
        tokenComponent,
        selectedTokens,
        setSelectedTokens,
        isPay,
        placeholder
    } = props;

    const TokenComponent: FC<TokenComponentProps> = tokenComponent;

    const items: SelectItem[] = Object.values(
        assetTokens
    ).filter(
        (t: Token) => isPay ? !t.isReceive : !t.isPay
    ).map((t: Token) => {
        return {
            label: `${t.name} (${t.symbol})`,
            value: t.token_address,
            token: t
        }
    });

    const handleSelect = ((v: string[]) => {
        Object.values(assetTokens).forEach((a: Token) => {
            if (v.includes(a.token_address)) {
                a.isPay = isPay;
                a.isReceive = !isPay;
            } else {
                if (isPay) {
                    a.isPay = !isPay;
                } else {
                    a.isReceive = isPay;
                };
            };
        });
        setSelectedTokens(v);
    });

    return (
        <Paper withBorder p="xl" radius="md" mt="lg">
            <Title order={4} align="center">{title}</Title>
            {
                Object.values(assetTokens)
                    .filter((token: Token) => isPay ? token.isPay : token.isReceive)
                    .map((token: Token, i: number) => {
                        return (
                            <TokenComponent token={token} assetTokens={assetTokens} key={i} />
                        )
                    })
            }
            {/* <Text color="dimmed" mt="lg">Select tokens to deposit:</Text> */}
            <MultiSelect
                data={items}
                // label="Select tokens to deposit:"
                itemComponent={TokenItem}
                // valueComponent={() => null}
                value={selectedTokens}
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
