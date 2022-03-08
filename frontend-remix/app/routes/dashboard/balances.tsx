import { useState, useEffect } from 'react';
import { useMoralisWeb3Api } from "react-moralis";

import {
    Container,
    Table
} from '@mantine/core';

type Balance = {
    token_address: string;
    name: string;
    symbol: string;
    logo?: string | undefined;
    thumbnail?: string | undefined;
    decimals: string;
    balance: string;
};

const Balances = () => {
    const [balances, setBalances] = useState<Balance[] | null>(null);
    const { account } = useMoralisWeb3Api();

    const fetchTokenBalances = async () => {
        setBalances(await account.getTokenBalances({ chain: "ropsten" }));
    };

    useEffect(() => { if (!balances) fetchTokenBalances(); }, [balances]);

    const rows = balances?.sort(
        (e1, e2) => parseInt(e2.balance) - parseInt(e1.balance)
    ).map((e) => (
        <tr key={e.token_address}>
            <td><img
                src={e.logo || "https://etherscan.io/images/main/empty-token.png"}
                width="28px"
                height="28px"
            /></td>
            <td>{`${e.name} (${e.symbol})`}</td>
            <td align="right">{(parseInt(e.balance) / 1e18).toLocaleString()}</td>
            {/* <td>{e.token_address}</td> */}
        </tr>
    ));

    return (
        <Container>
            <h2>Balances</h2>
            <Table style={{ width: "100%" }} highlightOnHover>
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
        </Container>
    );
};

export default Balances;
