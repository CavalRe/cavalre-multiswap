import Moralis from "moralis/node";
import { LoaderFunction } from "remix";

import { abi as poolAbi } from "../../artifacts/contracts/Pool.sol/Pool.json";

const serverUrl = "https://sf5h683tvf93.usemoralis.com:2053/server";
const appId = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";
const masterKey = "8v8AJX9Tanzb2sYiwTG8tlc55AeRwb9LSLSjg0Ej"
const address = "0xDC1062712Dd033874d1d915adA2cFecDe1575c71";
const contractAddress = "0x83B141645dD821650b496b01729B98fc7D5e5c3F"
const chain = "ropsten";

export const serverInfo = { serverUrl, appId, masterKey };

Moralis.start({
    serverUrl,
    appId,
    masterKey
});

export type Asset = {
    token_address: string,
    name: string,
    symbol: string,
    reserve: number,
    fee: number,
    scale: number,
    k: number
};

export type Balance = {
    token_address: string;
    name: string;
    symbol: string;
    logo?: string | undefined;
    thumbnail?: string | undefined;
    decimals: string;
    balance: string;
};

const decimalNumber = (decimal: string) => {
    return parseInt(decimal) / 1e18;
};

export const fetchTokenBalances: LoaderFunction = async () => {
    const balances: Balance[] = await Moralis.Web3API.account.getTokenBalances({
        address,
        chain
    });
    return balances;
};

export const fetchPool: LoaderFunction = async () => {

    console.log("Subscribing to assets");

    const query = new Moralis.Query("Asset");
    const subscription = await query.subscribe();

    subscription.on("open", () => {
        console.log("Asset subscription connection established");
    });

    const poolTokens: number = decimalNumber(await Moralis.Web3API.native.runContractFunction({
        chain,
        address: contractAddress,
        function_name: "totalSupply",
        abi: poolAbi
    }));

    const arrays: any[] = await Moralis.Web3API.native.runContractFunction({
        chain,
        address: contractAddress,
        function_name: "assets",
        abi: poolAbi
    });
    const addresses = arrays.map((asset: any) => asset[0]);

    const metadata = await Moralis.Web3API.token.getTokenMetadata({
        chain,
        addresses
    });

    const assets = arrays.map((a, i) => {
        return {
            token_address: addresses[i],
            name: metadata[i].name,
            symbol: metadata[i].symbol,
            reserve: decimalNumber(a[1]),
            fee: decimalNumber(a[2]),
            scale: decimalNumber(a[3]),
            k: decimalNumber(a[4])
        }
    });

    // console.log(assets);

    return { poolTokens, assets };
};

export default Moralis;
