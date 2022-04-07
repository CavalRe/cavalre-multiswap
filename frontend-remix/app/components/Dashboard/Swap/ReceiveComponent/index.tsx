import { FC } from "react";
import {
    Card,
    Group,
    NumberInput,
    Text
} from "@mantine/core";

import type { TokenComponentProps } from "../TokenSelect";

const ReceiveComponent: FC<TokenComponentProps> = (props: TokenComponentProps) => {
    const { token, swapState, getQuote } = props;
    const { poolToken, assetTokens } = swapState;

    const handleAllocationChange = (allocation: number) => {
        if (token.address === poolToken.address) {
            poolToken.allocation = allocation / 100;
        } else {
            assetTokens[token.address].allocation = allocation / 100;
        }
        getQuote({ poolToken, assetTokens });
    };

    return (
        <Card radius="md" mt="xs">
            <input type="hidden" name="receiveToken" value={JSON.stringify(token)} />
            <Text size="md" mt="sm" component="span" color="dimmed">
                {token.symbol}
            </Text>
            <Text size="lg" mt="sm" component="span" ml="md">
                {(-token.amount).toFixed(4)}
            </Text>
            <Group mt="xs">
                <Text
                    component="span"
                    size="md"
                    styles={{ width: "50%" }}
                >
                    Allocation:
                </Text>
                <NumberInput
                    precision={2}
                    size="md"
                    value={100 * token.allocation}
                    onChange={(a: number) => handleAllocationChange(a)}
                    rightSection={<>%</>}
                    styles={{ root: { width: "50%" } }}
                    min={0}
                />
            </Group>
            <Group mt="xs" position="left">
                <Text>Pool Balance:</Text>
                <Text>{token.contractBalance.toLocaleString()}</Text>
                <Text>{token.symbol}</Text>
            </Group>
        </Card>
    );
};

export default ReceiveComponent;
