import { useState, useEffect } from 'react';
import type { LoaderFunction } from 'remix';
import {
    Container,
    Table
} from '@mantine/core';
// import Moralis from "../../moralis.server";

// const serverUrl = "https://sf5h683tvf93.usemoralis.com:2053/server";
// const appId = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";
// const masterKey = "8v8AJX9Tanzb2sYiwTG8tlc55AeRwb9LSLSjg0Ej"

// Moralis.start({
//     serverUrl,
//     appId,
//     masterKey
// })
// import { fetchBalances } from "../../moralis.server";

type Balance = {
    token_address: string;
    name: string;
    symbol: string;
    logo?: string | undefined;
    thumbnail?: string | undefined;
    decimals: string;
    balance: string;
};

const address = "0xDC1062712Dd033874d1d915adA2cFecDe1575c71";

// const fetchBalances = async () => {
//     // const data = await Moralis.Web3API.account.getTokenBalances({ address, chain: "ropsten" });
//     const data = Moralis.User.current();
// }

// export const loader = async () => {
//     const data: Balance[] = await Moralis.Web3API.account.getTokenBalances({ address: "0xDC1062712Dd033874d1d915adA2cFecDe1575c71", chain: "ropsten" })
//     console.log(data);
//     return data;
// };

const Balances = () => {
    const [balances, setBalances] = useState<Balance[] | null>(null);
    // const { account } = useMoralisWeb3Api();

    // const fetchTokenBalances = async () => {
    //     setBalances(await account.getTokenBalances({ chain: "ropsten" }));
    // };

    // const fetchTokenBalances = async () => {
    //     setBalances(await Moralis.Web3API.account.getTokenBalances({ chain: "ropsten" }));
    // };

    // useEffect(() => { if (!balances) fetchBalances(); }, [balances]);

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
            <h2>Account Balances</h2>
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
