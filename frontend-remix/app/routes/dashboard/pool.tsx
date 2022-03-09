import { useState, useEffect } from "react";
import {
    Container,
    Group,
    List,
    Table
} from '@mantine/core';
import {
    useMoralis,
    useMoralisWeb3Api,
    useWeb3Contract
} from 'react-moralis';

import { abi } from "../../../../artifacts/contracts/Pool.sol/Pool.json";

const Assets = () => {
    const [poolTokens, setPoolTokens] = useState<number | null>(null);
    const [assets, setAssets] = useState<any[] | null>(null);
    const [metadata, setMetadata] = useState<any[] | null>(null);

    const {
        isWeb3Enabled,
    } = useMoralis();

    const poolTokenFunction = useWeb3Contract({
        contractAddress: "0x83B141645dD821650b496b01729B98fc7D5e5c3F",
        functionName: "totalSupply",
        abi
    });

    const assetsFunction = useWeb3Contract({
        contractAddress: "0x83B141645dD821650b496b01729B98fc7D5e5c3F",
        functionName: "assets",
        abi
    });

    const fetchPoolTokens = async () => {
        const { runContractFunction } = poolTokenFunction;
        const result = await runContractFunction();
        // console.log(decimalNumber(result).toLocaleString());
        setPoolTokens(decimalNumber(result));
    };

    const fetchAssets = async () => {
        const { runContractFunction } = assetsFunction;
        const result = await runContractFunction();
        // console.log(result);
        setAssets(result);
    };

    const Web3Api = useMoralisWeb3Api();

    const fetchTokenMetadata = async () => {
        const addresses = assets?.map(asset => asset.token);
        const options = {
            chain: "ropsten",
            addresses
        };
        const result = await Web3Api.token.getTokenMetadata(options);
        console.log(result);
        setMetadata(result);
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            if (!poolTokens) fetchPoolTokens();
            if (!assets) fetchAssets();
            if (assets && !metadata) fetchTokenMetadata();
        };
    }, [isWeb3Enabled, poolTokens, assets, metadata]);

    // .sort(
    //     (e1, e2) => parseInt(e2.reserve) - parseInt(e1.reserve)
    // )

    const decimalNumber = (decimal: string) => {
        return parseInt(decimal) / 1e18;
    };

    const rows = metadata && assets && poolTokens ? assets?.map((e,i) => (
        <tr key={e.token}>
            {/* <td><img
                src={e.logo || "https://etherscan.io/images/main/empty-token.png"}
                width="28px"
                height="28px"
            /></td>*/}
            <td>{i+1}</td>
            <td>{`${metadata[i].name} (${metadata[i].symbol})`}</td>
            <td align="right">{(0.1*poolTokens/decimalNumber(e.reserve)).toFixed(2)}</td>
            {/* <td>{e.token}</td> */}
            {/* <td>{`${e.name} (${e.symbol})`}</td> */}
            {/* <td align="right">{(parseInt(e.reserve) / 1e18).toLocaleString()}</td> */}
            <td align="right">{`${100/(assets.length)}%`}</td>
            <td align="right">{decimalNumber(e.reserve).toLocaleString()}</td>
            <td align="right">{(10000*decimalNumber(e.fee)).toLocaleString()}</td>
            <td align="right">{decimalNumber(e.k).toLocaleString()}</td>
        </tr>
    )) : [];

    return (
        <Container>
            <h2>Liquidity Pool</h2>
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
