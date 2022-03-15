import { LoaderFunction, useLoaderData } from 'remix';
import {
    Card,
    Container,
    Group,
    Table,
    Title
} from '@mantine/core';

// import { fetchTokenBalances } from "~/moralis.server";
import type { Balance } from "~/moralis.server";

import { RequireAuth } from "~/components/Dashboard";

// export const loader: LoaderFunction = fetchTokenBalances;

const Balances = () => {
    const balances = useLoaderData<Balance[]>();

    const rows = balances?.sort(
        (e1, e2) => parseInt(e2.balance) - parseInt(e1.balance)
    ).map((e) => (
        <tr key={e.token_address}>
            <td><img
                src={e.logo || "https://etherscan.io/images/main/empty-token.png"}
                width="20px"
                height="20px"
            /></td>
            <td>
                {`${e.name} (${e.symbol})`}
            </td>
            <td align="right">{(parseInt(e.balance) / 1e18).toLocaleString()}</td>
            {/* <td>{e.token_address}</td> */}
        </tr>
    ));

    return (
        <RequireAuth>
            <Container>
                <Title>Account Balances</Title>
                {/* <Group> */}
                    <Card withBorder p="xl" radius="md" mt="lg">
                        {/* <Group> */}
                        <Table
                            verticalSpacing="sm"
                            style={{ width: "100%" }}
                            highlightOnHover
                        >
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Token</th>
                                    <th>Balance</th>
                                    {/* <th>Address</th> */}
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                        {/* </Group> */}
                    </Card>
                {/* </Group> */}
            </Container>
        </RequireAuth>
    );
};

export default Balances;
