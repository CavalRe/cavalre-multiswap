
import { FC } from "react";
import {
    Card,
    Group,
    NumberInput,
    Text
} from "@mantine/core";

import type { TokenComponentProps } from "../TokenSelect";

const PayComponent: FC<TokenComponentProps> = (props: TokenComponentProps) => {
    const { token, swapState, getQuote } = props;
    const { poolToken, assetTokens } = swapState;

    const handleAmountChange = (amount: number) => {
        if (token.address == poolToken.address) {
            poolToken.amount = amount;
        } else {
            assetTokens[token.address].amount = amount;
        }
        getQuote({ poolToken, assetTokens });
    };

    return (
        <Card radius="md" mt="xs">
            <NumberInput
                precision={2}
                size="lg"
                icon={<Text size="md">{token.symbol}</Text>}
                hideControls
                value={token.amount}
                onChange={(a: number) => handleAmountChange(a)}
                min={0}
            />
            <Group mt="xs" position="left">
                <Text>Balance:</Text>
                <Text>{token.balance.toLocaleString()}</Text>
                <Text>{token.symbol}</Text>
            </Group>
            {token.address == poolToken.address ?
                <Group mt="xs" position="left">
                    <Text>Outstanding:</Text>
                    <Text>{token.outstanding.toLocaleString()}</Text>
                    <Text>{token.symbol}</Text>
                </Group> :
                <Group mt="xs" position="left">
                    <Text>Pool Reserve:</Text>
                    <Text>{token.reserve.toLocaleString()}</Text>
                    <Text>{token.symbol}</Text>
                </Group>
            }
        </Card>
    );
};

export default PayComponent;
