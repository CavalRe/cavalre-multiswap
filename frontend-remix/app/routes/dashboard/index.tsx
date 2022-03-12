import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import {
    Container,
    Group,
    List,
    Table,
    Title
} from '@mantine/core';

import { fetchPool, Asset } from "~/moralis.server";

export const loader: LoaderFunction = fetchPool;

// export const init = async () => {
//     console.log("Subscribing to assets");

//     const query = new Moralis.Query("Asset");
//     const subscription = await query.subscribe();

//     subscription.on("open", () => {
//         console.log("Asset subscription connection established");
//     });
// };

const Assets = () => {
    const { poolTokens, assets } = useLoaderData();

    const rows = assets?.map((a: Asset, i: number) => (
        <tr key={a.token_address}>
            {/* <td><img
                src={e.logo || "https://etherscan.io/images/main/empty-token.png"}
                width="28px"
                height="28px"
            /></td>*/}
            <td>{i + 1}</td>
            <td>{`${a.name} (${a.symbol})`}</td>
            <td align="right">{(0.1 * poolTokens / a.reserve).toFixed(2)}</td>
            {/* <td>{e.token}</td> */}
            {/* <td>{`${e.name} (${e.symbol})`}</td> */}
            {/* <td align="right">{(parseInt(e.reserve) / 1e18).toLocaleString()}</td> */}
            <td align="right">{`${100 / (assets.length)}%`}</td>
            <td align="right">{a.reserve.toLocaleString()}</td>
            <td align="right">{(10000 * a.fee).toLocaleString()}</td>
            <td align="right">{a.k.toLocaleString()}</td>
        </tr>
    ));

    return (
        <Container>
            <Title>Liquidity Pool</Title>
            <Group>
                <h3>Pool Tokens</h3>
            </Group>
            <Group>
                <List>
                    <List.Item>Price: 1</List.Item>
                    <List.Item>Outstanding: {poolTokens?.toLocaleString()}</List.Item>
                </List>
            </Group>
            <Group>
                <h3>Asset Tokens</h3>
            </Group>
            <Group>
                <List>
                    <List.Item>Number of Assets: {assets?.length}</List.Item>
                </List>
            </Group>
            <Group mt="lg">
                <Table style={{ width: "100%" }} highlightOnHover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Token</th>
                            <th>Price (P)</th>
                            {/* <th>Address</th> */}
                            <th>Weight</th>
                            <th>Reserves</th>
                            <th>Fee (bps)</th>
                            <th>Tuning (k)</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Group>
        </Container>
    );
};

export default Assets;
