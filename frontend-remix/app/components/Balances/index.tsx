import { useState, useEffect } from 'react';
import { useMoralisWeb3Api } from "react-moralis";

import { Table } from '@mantine/core';

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
            <td>{e.symbol}</td>
            <td>{e.name}</td>
            <td align="right">{(parseInt(e.balance) / 1e18).toLocaleString()}</td>
        </tr>
    ));

    return (
        <div>
            <Table highlightOnHover>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
};

export default Balances;
