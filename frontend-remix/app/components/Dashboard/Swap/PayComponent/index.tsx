
import { FC } from "react";
import {
    Card,
    Group,
    NumberInput,
    Text
} from "@mantine/core";

import type { TokenComponentProps } from "../TokenSelect";

const PayComponent: FC<TokenComponentProps> = (props: TokenComponentProps) => {
    const { token, assetTokens } = props;

    const handleAmountChange = (amount: number) => {
        assetTokens[token.token_address].amount = amount;
    };

    return (
        <Card radius="md" mt="xs">
            <NumberInput
                // variant="unstyled"
                defaultValue={0.0}
                precision={2}
                size="lg"
                icon={<Text size="md">{token.symbol}</Text>}
                hideControls
                value={assetTokens[token.token_address].amount}
                onChange={(a: number) => handleAmountChange(a)}
                min={0}
            // rightSection={<Text size="lg">{token.symbol}</Text>}
            />
            <Group mt="xs" position="left">
                <Text>Balance:</Text>
                <Text>{token.balance.toLocaleString()}</Text>
                <Text>{token.symbol}</Text>
            </Group>
            <Group mt="xs" position="left">
                <Text>Pool Reserve:</Text>
                <Text>{token.reserve.toLocaleString()}</Text>
                <Text>{token.symbol}</Text>
            </Group>
        </Card>
    );
};

export default PayComponent;
