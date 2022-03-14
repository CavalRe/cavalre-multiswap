import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import {
    Card,
    Container,
    Group,
    List,
    NativeSelect,
    SimpleGrid,
    Table,
    Text,
    Grid,
    Title
} from '@mantine/core';

import { fetchPool } from "~/moralis.server";
import type { Asset, Balance } from "~/moralis.server";

type Dict<T> = {
    [key: string]: T
}

type Numeraire = {
    name: string,
    symbol: string,
    price: number
}

const contractAddress = "0x83B141645dD821650b496b01729B98fc7D5e5c3F".toLowerCase();

export const loader: LoaderFunction = fetchPool;

const Assets = () => {
    const { isAuthenticated } = useMoralis();
    const { poolTokens, assets, balances } = useLoaderData();

    const assetMap: Dict<Asset> = {};
    assets?.forEach((a: Asset) => { assetMap[a.token_address] = a });

    const balanceMap: Dict<Balance> = {};
    balances?.forEach((b: Balance) => { balanceMap[b.token_address] = b });

    const poolToken = { name: "Pool Token", symbol: "P", price: 1 }
    const [numeraire, setNumeraire] = useState<Numeraire>(poolToken);

    const poolBalance = balanceMap[contractAddress] ? parseInt(balanceMap[contractAddress].balance) / 1e18 : 0;

    const price = (address: string) => {
        const asset: Asset = assetMap[address];
        return poolTokens * asset.weight / asset.reserve;
    };

    const balance = (address: string) => {
        const lowerAddress = address.toLowerCase();
        return balanceMap[lowerAddress] ? parseInt(balanceMap[lowerAddress].balance) / 1e18 : 0;
    };

    const numeraires = [poolToken, ...assets?.map((a: Asset) => ({ name: a.name, symbol: a.symbol, price: price(a.token_address) }))];
    const numeraireMap: Dict<Numeraire> = {};
    numeraires.forEach((n: Numeraire) => { numeraireMap[`${n.name} (${n.symbol})`] = n; });

    const handleNumeraire = (value: string) => {
        setNumeraire(numeraireMap[value]);
    };

    const numberOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };

    const rows = assets?.map((a: Asset, i: number) => (
        <tr key={a.token_address}>
            {/* <td>{i + 1}</td> */}
            <td><span><Text size="md" color="bold" component="span">{`${a.name}`}</Text><Text size="xs" color="dimmed" component="span">{` (${a.symbol})`}</Text></span></td>
            {isAuthenticated ? <td align="right">{(balance(a.token_address) / numeraire.price).toLocaleString(undefined, numberOptions)}</td> : null}
            <td align="right">{(price(a.token_address) / numeraire.price).toLocaleString(undefined, numberOptions)}</td>
            {/* <td align="right">{`${100 / (assets.length)}%`}</td> */}
            <td align="right">{(a.reserve / numeraire.price).toLocaleString(undefined, numberOptions)}</td>
            <td align="right">{(10000 * a.fee).toLocaleString()}</td>
            <td align="right">{a.k.toLocaleString()}</td>
        </tr>
    ));

    return (
        <Container>
            <Title>Liquidity Pool</Title>
            <Card withBorder p="xl" radius="md" mt="lg">
                <Title order={3}>Pool Tokens</Title>
                <SimpleGrid cols={isAuthenticated ? 4 : 3}>
                    {isAuthenticated ?
                        (<div>
                            <Text size="xl" mt="md">{(poolBalance / numeraire.price).toLocaleString() + " " + numeraire.symbol}</Text>
                            <Text size="sm" color="dimmed">Balance</Text>
                        </div>) : null}
                    <div>
                        <Text size="xl" mt="md">{(poolTokens / numeraire.price).toLocaleString() + " " + numeraire.symbol}</Text>
                        <Text size="sm" color="dimmed">TVL</Text>
                    </div>
                    <div>
                        <Text size="xl" mt="md">{poolTokens?.toLocaleString()}</Text>
                        <Text size="sm" color="dimmed">Outstanding</Text>
                    </div>
                    <NativeSelect
                        mt="md"
                        value={`${numeraire.name} (${numeraire.symbol})`}
                        onChange={(event) => handleNumeraire(event.currentTarget.value)}
                        data={numeraires.map(n => `${n.name} (${n.symbol})`)}
                        description="Select numeraire"
                        // label="Select numeraire"
                        required
                    />
                </SimpleGrid>
            </Card>
            <Card withBorder p="xl" radius="md" mt="lg">
                <Title order={3}>Asset Tokens</Title>
                <Text size="xl" mt="md">{assets?.length.toLocaleString()}</Text>
                <Text size="sm" color="dimmed">Number of assets</Text>
                <Group mt="lg">
                    <Table
                        verticalSpacing="sm"
                        style={{ width: "100%" }}
                        highlightOnHover
                    >
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th><Text size="md" color="dimmed">Name</Text></th>
                                {isAuthenticated ?
                                    <th><Text size="md" color="dimmed">Balance ({numeraire.symbol})</Text></th> : null}
                                <th><Text size="md" color="dimmed">Price ({numeraire.symbol})</Text></th>
                                {/* <th><Text size="md" color="dimmed">Weight</Text></th> */}
                                <th><Text size="md" color="dimmed">Reserves ({numeraire.symbol})</Text></th>
                                <th><Text size="md" color="dimmed">Fee (bps)</Text></th>
                                <th><Text size="md" color="dimmed">Tuning (k)</Text></th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </Group>
            </Card>
        </Container>
    );
};

export default Assets;
