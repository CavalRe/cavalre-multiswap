import { FC } from "react";
import {
    Card,
    Group,
    NumberInput,
    Text
} from "@mantine/core";

import type { TokenComponentProps } from "../TokenSelect";

const ReceiveComponent: FC<TokenComponentProps> = (props: TokenComponentProps) => {
    const { token, assetTokens, onNumberChange } = props;

    const handleAllocationChange = (allocation: number) => {
        assetTokens[token.token_address].allocation = allocation;
        onNumberChange && onNumberChange()
    };

    return (
        <Card radius="md" mt="xs">
            <Text size="md" mt="sm" component="span" color="dimmed">
                {token.symbol}
            </Text>
            <Text size="lg" mt="sm" component="span" ml="md">
                0.00
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
                    // variant="filled"
                    // width={"50%"}
                    defaultValue={0}
                    precision={2}
                    size="md"
                    // icon={<Text size="md">{token.symbol}</Text>}
                    // hideControls
                    value={assetTokens[token.token_address].allocation}
                    onChange={(a: number) => handleAllocationChange(a)}
                    rightSection={<>%</>}
                    styles={{ root: { width: "50%" } }}
                    min={0}
                />
            </Group>
            <Group mt="xs" position="left">
                <Text>Pool Reserve:</Text>
                <Text>{token.reserve.toLocaleString()}</Text>
                <Text>{token.symbol}</Text>
            </Group>
        </Card>
    );
};

export default ReceiveComponent;
