import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { LoaderFunction, useLoaderData } from 'remix';
import {
    Button,
    Container,
    Table,
    Title
} from '@mantine/core';

import { fetchTokenBalances } from "~/moralis.server";
import type { Balance } from "~/moralis.server";

export const loader: LoaderFunction = fetchTokenBalances;

const Balances = () => {
    const { isAuthenticated, authenticate } = useMoralis();

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
            <td>{e.token_address}</td>
        </tr>
    ));

    const handleLogin = async () => {
        await authenticate();
    };

    return (
        <Container>
            {isAuthenticated ? (<>
                <Title>Account Balances</Title>
                <Table style={{ width: "100%" }} highlightOnHover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Token</th>
                            <th>Balance</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table></>) : (
                <Button onClick={handleLogin}>Connect Wallet</Button>
            )}
        </Container>
    );
};

export default Balances;
