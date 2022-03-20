import { FC, forwardRef, useState } from "react";
import {
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

type Dict<T> = {
    [key: string]: T
};

type Token = {
    label: string,
    value: string,
    name: string,
    symbol: string,
    token_address: string
    [key: string]: any
}

type TokenComponentProps = {
    token: Token
};

type TokenSelectProps = {
    title: string,
    tokens: Token[]
    tokenComponent: FC<TokenComponentProps>
    placeholder: string
};

const TokenSelect = (props: TokenSelectProps) => {
    const { title, tokens, tokenComponent, placeholder } = props;
    const TokenComponent: FC<TokenComponentProps> = tokenComponent;
    const tokenMap: Dict<Token> = {};
    const items: SelectItem[] = tokens.map((t: Token) => {
        tokenMap[t.token_address] = t;
        return {
            label: `${t.name} (${t.symbol})`,
            value: t.token_address
        }
    });

    const [value, setValue] = useState<string[]>([])

    const TokenItem = forwardRef<HTMLDivElement, Token>(
        ({ label, value, ...others }: Token, ref) => {
            return (
                <div ref={ref} style={{ width: "100%" }} {...others}>
                    <span>
                        <Text size="md" color="bold" component="span">
                            {`${tokenMap[value].name}`}
                        </Text>
                        <Text size="xs" color="dimmed" component="span">
                            {` (${tokenMap[value].symbol})`}
                        </Text>
                    </span>
                </div>
            );
        }
    );

    return (
        <Paper withBorder p="xl" radius="md" mt="lg">
            <Title order={4} align="center">{title}</Title>
            {value.map((v: string, i: number) => {
                const token = tokenMap[v];
                return (
                    <TokenComponent token={token} key={i} />
                )
            })}
            {/* <Text color="dimmed" mt="lg">Select tokens to deposit:</Text> */}
            <MultiSelect
                data={items}
                // label="Select tokens to deposit:"
                itemComponent={TokenItem}
                // valueComponent={() => null}
                value={value}
                onChange={setValue}
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
    return (
        <Card radius="md" mt="xs">
            <NumberInput
                // variant="unstyled"
                defaultValue={0.00}
                precision={2}
                size="lg"
                icon={<Text size="md">{token.symbol}</Text>}
                hideControls
                // rightSection={<Text size="lg">{token.symbol}</Text>}
            />
            <Group mt="xs" position="left">
                <Text>Balance:</Text>
                <Text>{token.balance.toLocaleString()}</Text>
                <Text>{token.symbol}</Text>
            </Group>
        </Card>
    );
};

const receiverComponent: FC<TokenComponentProps> = (props: TokenComponentProps) => {
    const { token } = props;
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
                    defaultValue={100.00}
                    precision={2}
                    size="md"
                    // icon={<Text size="md">{token.symbol}</Text>}
                    // hideControls
                    rightSection={<>%</>}
                    styles={{ root: { width: "50%" } }}
                />
            </Group>
        </Card>
    );
};

type SwapProps = {
    assets: Token[]
    balances: Token[]
};

const Swap = (props: SwapProps) => {
    const { assets, balances } = props;

    return (
        <SimpleGrid cols={2}>
            <TokenSelect
                title="Pay Tokens"
                tokens={balances}
                tokenComponent={payerComponent}
                placeholder="Select tokens to deposit:"
            />
            <TokenSelect
                title="Receive Tokens"
                tokens={balances}
                tokenComponent={receiverComponent}
                placeholder="Select tokens to withdraw:"
            />
        </SimpleGrid>
    );
};

export default Swap;
