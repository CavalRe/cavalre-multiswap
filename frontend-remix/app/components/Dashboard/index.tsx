import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
    Button,
    Card,
    Container,
    Group,
    Modal,
    NativeSelect,
    SimpleGrid,
    Table,
    Text,
    Title
} from '@mantine/core';
import type { MantineSize } from "@mantine/core";
import type { PoolToken, AssetToken } from "~/moralis.server";
import { decimalNumber } from "~/utils";
import { Swap } from "~/components/Dashboard";

type Dict<T> = {
    [key: string]: T
};

type Numeraire = {
    name: string,
    symbol: string,
    price: number
};

export { default as Header } from "~/components/Dashboard/Header";
export { default as NavBar } from "~/components/Dashboard/NavBar";
export { default as RequireAuth } from "~/components/Dashboard/RequireAuth";
export { default as Swap } from "~/components/Dashboard/Swap";

type DashboardProps = {
    chain: string
    poolToken: PoolToken
    assetTokens: Dict<AssetToken>
};

const Dashboard = (props: DashboardProps) => {
    const {
        isAuthenticated,
        isWeb3Enabled,
        enableWeb3,
        account,
        Moralis
    } = useMoralis();
    const { chain, poolToken, assetTokens } = props;
    const [opened, setOpened] = useState<boolean>(false);
    const [_, setTotalBalance] = useState<number>(0);

    const setBalances = async () => {
        if (account) {
            await Moralis.Web3API.account.getTokenBalances({
                account,
                chain
            }).then(
                (balanceData: any) => {
                    let totalBalance = 0;
                    balanceData.forEach(async (b: any) => {
                        const balance = decimalNumber(b.balance, b.decimals);
                        totalBalance += balance;
                        await Moralis.Web3API.token.getTokenAllowance({
                            owner_address: account,
                            spender_address: poolToken.address,
                            address: b.token_address,
                            chain
                        }).then(
                            ({ allowance }) => {
                                if (b.token_address in assetTokens) {
                                    assetTokens[b.token_address].accountBalance = balance;
                                    assetTokens[b.token_address].allowance = decimalNumber(allowance, b.decimals);
                                    console.log(assetTokens[b.token_address]);
                                } else if (b.token_address == poolToken.address) {
                                    poolToken.accountBalance = balance;
                                    poolToken.allowance = decimalNumber(allowance, b.decimals);
                                } else {
                                    assetTokens[b.token_address] = {
                                        address: b.token_address,
                                        name: b.name,
                                        symbol: b.symbol,
                                        decimals: parseInt(b.decimals),
                                        k: 1,
                                        fee: .01,
                                        weight: 0,
                                        contractBalance: 0,
                                        accountBalance: balance,
                                        allowance: decimalNumber(allowance, b.decimals),
                                        amount: 0,
                                        allocation: 0,
                                        selection: "Not in Pool"
                                    };
                                };
                            }
                        );
                    });
                    setTotalBalance(totalBalance);
                }
            );
        };
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (!isWeb3Enabled) {
                enableWeb3();
            } else {
                setBalances();
            };
        }
    }, [isAuthenticated, isWeb3Enabled, account])

    const contractBalance = poolToken.accountBalance;
    const poolTokens = poolToken.contractBalance;

    const price = (asset: AssetToken) => {
        return poolTokens * asset.weight / asset.contractBalance;
    };

    const balance = (asset: AssetToken) => {
        return asset.accountBalance;
    };

    const poolTokenNumeraire = { name: poolToken.name, symbol: poolToken.symbol, price: 1 }
    const [numeraire, setNumeraire] = useState<Numeraire>(poolTokenNumeraire);

    const numeraires = [poolTokenNumeraire, ...Object.values(assetTokens)?.map((a: AssetToken) => {
        return { name: a.name, symbol: a.symbol, price: price(a) }
    })];
    const numeraireMap: Dict<Numeraire> = {};
    numeraires.forEach((n: Numeraire) => { numeraireMap[`${n.name} (${n.symbol})`] = n; });

    const handleNumeraire = (value: string) => {
        setNumeraire(numeraireMap[value]);
    };

    const numberOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };

    const cellTextSize: MantineSize = "md";
    const headerTextSize: MantineSize = "lg";
    const subTextSize: MantineSize = "sm";
    const rows = Object.values(assetTokens)?.filter((a: AssetToken) => (a.contractBalance > 0 && a.k !== undefined && a.fee !== undefined)).map((a: AssetToken, i: number) => (
        <tr key={a.address}>
            <td><span><Text size={cellTextSize} color="bold" component="span">{`${a.name}`}</Text><Text size="xs" color="dimmed" component="span">{` (${a.symbol})`}</Text></span></td>
            {isAuthenticated ? <td align="right"><Text size={cellTextSize}>{(balance(a) / numeraire.price).toLocaleString(undefined, numberOptions)}</Text></td> : null}
            <td align="right"><Text size={cellTextSize}>{(price(a) / numeraire.price).toLocaleString(undefined, numberOptions)}</Text></td>
            <td align="right"><Text size={cellTextSize}>{(a.contractBalance / numeraire.price).toLocaleString(undefined, numberOptions)}</Text></td>
            <td align="right"><Text size={cellTextSize}>{(10000 * a.fee).toLocaleString()}</Text></td>
            <td align="right"><Text size={cellTextSize}>{a.k.toLocaleString()}</Text></td>
        </tr>
    ));

    return (
        <Container>
            <Title>Liquidity Pool</Title>
            <Button onClick={() => setOpened(true)} mt="xl">Swap</Button>
            <Modal
                size="800px"
                opened={opened}
                onClose={() => setOpened(false)}
                radius="lg"
                title={<Title align="center" order={3}>Mulit-Asset Swap</Title>}
            >
                <Swap
                    poolToken={poolToken}
                    assetTokens={assetTokens}
                    chain={chain}
                    address={account}
                />
            </Modal>
            <Card withBorder p="xl" radius="md" mt="lg">
                <Title order={3}>Pool Tokens</Title>
                <SimpleGrid cols={isAuthenticated ? 4 : 3}>
                    {isAuthenticated ?
                        (<div>
                            <Text size="xl" mt="md">{(contractBalance / numeraire.price).toLocaleString() + " " + numeraire.symbol}</Text>
                            <Text size={subTextSize} color="dimmed">Balance</Text>
                        </div>) : null}
                    <div>
                        <Text size="xl" mt="md">{(poolTokens / numeraire.price).toLocaleString() + " " + numeraire.symbol}</Text>
                        <Text size={subTextSize} color="dimmed">TVL</Text>
                    </div>
                    <div>
                        <Text size="xl" mt="md">{poolTokens?.toLocaleString()}</Text>
                        <Text size={subTextSize} color="dimmed">Outstanding</Text>
                    </div>
                    <div>
                        <NativeSelect
                            mt="md"
                            value={`${numeraire.name} (${numeraire.symbol})`}
                            onChange={(event) => handleNumeraire(event.currentTarget.value)}
                            data={numeraires.map(n => `${n.name} (${n.symbol})`)}
                            description="Select numeraire"
                            // label="Select numeraire"
                            required
                        />
                    </div>
                </SimpleGrid>
            </Card>
            <Card withBorder p="xl" radius="md" mt="lg">
                <Title order={3}>Asset Tokens</Title>
                <Text size="xl" mt="md">{Object.values(assetTokens).reduce(
                    (acc, a) => acc + (a.selection !== "Not in Pool" ? 1 : 0), 0
                ).toLocaleString()}</Text>
                <Text size={subTextSize} color="dimmed">Number of assets</Text>
                <Group mt="lg">
                    <Table
                        verticalSpacing="sm"
                        style={{ width: "100%" }}
                        highlightOnHover
                    >
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th><Text size={headerTextSize}>Name</Text></th>
                                {isAuthenticated ?
                                    <th><Text size={headerTextSize}>Balance ({numeraire.symbol})</Text></th> : null}
                                <th><Text size={headerTextSize}>Price ({numeraire.symbol})</Text></th>
                                {/* <th><Text size={headerTextSize}>Weight</Text></th> */}
                                <th><Text size={headerTextSize}>Reserves ({numeraire.symbol})</Text></th>
                                <th><Text size={headerTextSize}>Fee (bps)</Text></th>
                                <th><Text size={headerTextSize}>Tuning (k)</Text></th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </Group>
            </Card>
        </Container>
    );
};

export default Dashboard;
