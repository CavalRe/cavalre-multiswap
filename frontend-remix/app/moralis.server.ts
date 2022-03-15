import Moralis from "moralis/node";

import { abi as poolAbi } from "../../artifacts/contracts/Pool.sol/Pool.json";

const serverUrl = "https://sf5h683tvf93.usemoralis.com:2053/server";
const appId = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";
const masterKey = "8v8AJX9Tanzb2sYiwTG8tlc55AeRwb9LSLSjg0Ej"
const contractAddress = "0x83B141645dD821650b496b01729B98fc7D5e5c3F".toLowerCase();
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
    weight: number,
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

export const getTokenBalances = async (address: string) => {
    const balances: Balance[] = await Moralis.Web3API.account.getTokenBalances({
        address: address.toLowerCase(),
        chain
    });
    return balances;
}

export const getPool = async (address: string | undefined) => {

    const poolTokens: number = decimalNumber(await Moralis.Web3API.native.runContractFunction({
        chain,
        address: contractAddress,
        function_name: "totalSupply",
        abi: poolAbi
    }));

    // ==================================
    // Need a scale function for Pool.sol
    // ==================================
    // const poolScale: number = decimalNumber(await Moralis.Web3API.native.runContractFunction({
    //     chain,
    //     address: contractAddress,
    //     function_name: "scale",
    //     abi: poolAbi
    // }));

    // if (address === undefined) {
    //     const assets: Asset[] = [];
    //     const balances: Balance[] = [];
    //     return { contractAddress, address, poolTokens, assets, balances}
    // }

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
            weight: 1 / addresses.length,
            k: decimalNumber(a[4])
        }
    });

    const balances: Balance[] = address === undefined ? [] : await Moralis.Web3API.account.getTokenBalances({
        address,
        chain
    });

    // console.log(assets);
    // console.log(poolTokens);

    return { contractAddress, address, poolTokens, assets, balances };
};

export default Moralis;
