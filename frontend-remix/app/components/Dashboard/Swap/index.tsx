import { FC, forwardRef, useEffect, useState } from "react";
import {
    Alert,
    Button,
    Card,
    Group,
    MultiSelect,
    NumberInput,
    Paper,
    SelectItem,
    SimpleGrid,
    Text,
    Title,
} from "@mantine/core";

import type { Token } from "~/moralis.server";

type Dict<T> = {
    [key: string]: T
};

type TokenItemProps = {
    label: string,
    value: string,
    token: Token
};

type TokenComponentProps = {
    token: Token
};

type TokenSelectProps = {
    title: string,
    tokenComponent: FC<TokenComponentProps>
    isPay: boolean,
    placeholder: string
};

type SwapProps = {
    poolTokens: number,
    assetTokens: Dict<Token>
};

type SelectedState = {
    payTokensSelected: string[],
    receiveTokensSelected: string[]
};

const Swap = (props: SwapProps) => {
    const { poolTokens, assetTokens } = props;
    const [selectedState, setSelectedState] = useState<SelectedState>(
        {
            payTokensSelected: [],
            receiveTokensSelected: []
        }
    );
    const [totalAllocation, setTotalAllocation] = useState(0);

    const TokenSelect = (props: TokenSelectProps) => {
        const { title, tokenComponent, isPay, placeholder } = props;

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
            let copiedSelectedState = { ...selectedState };
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
            if (isPay) {
                copiedSelectedState.payTokensSelected = v;
            } else {
                copiedSelectedState.receiveTokensSelected = v;
            }
            setSelectedState(copiedSelectedState);
        });

        const TokenItem = forwardRef<HTMLDivElement, TokenItemProps>(
            ({ label, value, token, ...others }: TokenItemProps, ref) => {
                return (
                    <div ref={ref} style={{ width: "100%" }} {...others}>
                        <span>
                            <Text size="md" color="bold" component="span">
                                {`${token.name}`}
                            </Text>
                            <Text size="xs" color="dimmed" component="span">
                                {` (${token.symbol})`}
                            </Text>
                        </span>
                    </div>
                );
            }
        );

        return (
            <Paper withBorder p="xl" radius="md" mt="lg">
                <Title order={4} align="center">{title}</Title>
                {
                    Object.values(assetTokens)
                        .filter((token: Token) => isPay ? token.isPay : token.isReceive)
                        .map((token: Token, i: number) => {
                            return (
                                <TokenComponent token={token} key={i} />
                            )
                        })
                }
                {/* <Text color="dimmed" mt="lg">Select tokens to deposit:</Text> */}
                <MultiSelect
                    data={items}
                    // label="Select tokens to deposit:"
                    itemComponent={TokenItem}
                    // valueComponent={() => null}
                    value={isPay ? selectedState.payTokensSelected : selectedState.receiveTokensSelected}
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

    const payerComponent: FC<TokenComponentProps> = (props: TokenComponentProps) => {
        const { token } = props;

        const handleAmountChange = (amount: number) => {
            assetTokens[token.token_address].amount = amount;
        }
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

    const receiverComponent: FC<TokenComponentProps> = (props: TokenComponentProps) => {
        const { token } = props;

        const handleAllocationChange = (allocation: number) => {
            assetTokens[token.token_address].allocation = allocation;
            // setAllocation(allocation);
            // setTotalAllocation(
            //     Object.values(
            //         assetTokens
            //     ).map(
            //         (a: Token) => a.allocation
            //     ).reduce(
            //         (p: number, c: number) => p + c
            //     )
            // );
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
                    />
                </Group>
            </Card>
        );
    };

    const handleSwap = () => {
        console.log(assetTokens);
        // const totalAllocation = Object.values(assetTokens)
        //     .map((a: Token) => a.allocation)
        //     .reduce((p, c) => p + c);
        // setTotalAllocation(totalAllocation);
        // console.log(totalAllocation);
        // console.log(
        //     Object.values(assetTokens)
        //         .map((a: Token) => {
        //             return {
        //                 amount: a.amount,
        //                 allocation: a.allocation
        //             }
        //         })
        // );
    };

    useEffect(() => {
        const totalAllocation = Object.values(
            assetTokens
        ).map(
            (a: Token) => a.allocation
        ).reduce(
            (p: number, c: number) => p + c
        );
        setTotalAllocation(totalAllocation);
        console.log(totalAllocation);
    }, []);

    return (
        <>
            <SimpleGrid cols={2}>
                <TokenSelect
                    title="Pay Tokens"
                    tokenComponent={payerComponent}
                    isPay={true}
                    placeholder="Select tokens to deposit:"
                />
                <TokenSelect
                    title="Receive Tokens"
                    tokenComponent={receiverComponent}
                    isPay={false}
                    placeholder="Select tokens to withdraw:"
                />
            </SimpleGrid>
            <Text>{`Total allocation: ${totalAllocation}`}</Text>
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
