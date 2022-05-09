import Moralis from "moralis/node";
import { poolAbi, decimalNumber } from "~/utils";

const serverUrl = "https://sf5h683tvf93.usemoralis.com:2053/server";
const appId = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";
const masterKey = "8v8AJX9Tanzb2sYiwTG8tlc55AeRwb9LSLSjg0Ej"
// const contractAddress = "0x83B141645dD821650b496b01729B98fc7D5e5c3F".toLowerCase();
const contractAddress = "0x6df37236a56954a4e3e1eAB9c2A2b252829d766a".toLowerCase();
const chain = "ropsten";

const feeMax = .01;

export const serverInfo = { serverUrl, appId, masterKey };

Moralis.start({
    serverUrl,
    appId,
    masterKey
});

type Dict<T> = {
    [key: string]: T
};

type Selection = "Pay" | "Receive" | "Neither" | "Not in Pool";

export type PoolToken = {
    address: string
    name: string
    symbol: string
    decimals: number
    fee: number
    contractBalance: number
    accountBalance: number
    amount: number
    allocation: number
    selection: Selection
};

export type AssetToken = PoolToken & {
    k: number
    weight: number,
};

export type Token = PoolToken | AssetToken;

// const decimalNumber = (value: string, decimals: string = "18") => {
//     return parseInt(value) / (10 ** parseInt(decimals));
// };

export const getPool = async () => {

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
    //     const assets: AssetToken[] = [];
    //     const balances: Balance[] = [];
    //     return { contractAddress, address, poolTokens, assets, balances}
    // }

    const assetData: any = await Moralis.Web3API.native.runContractFunction({
        chain,
        address: contractAddress,
        function_name: "assets",
        abi: poolAbi
    });

    const addresses = assetData.map((asset: any) => asset[0].toLowerCase());

    const metadata = await Moralis.Web3API.token.getTokenMetadata({
        chain,
        addresses
    });

    const poolToken: PoolToken = {
        address: contractAddress,
        name: "Pool",
        symbol: "P",
        decimals: 18,
        fee: 0.0001,
        contractBalance: poolTokens,
        accountBalance: 0,
        amount: 0,
        allocation: 0,
        selection: "Neither"
    };

    const assetTokens: Dict<AssetToken> = {};

    assetData.forEach((a: any, i: number) => {
        assetTokens[a[0].toLowerCase()] = {
            address: addresses[i],
            name: metadata[i].name,
            symbol: metadata[i].symbol,
            decimals: parseInt(metadata[i].decimals),
            k: decimalNumber(a[4]),
            fee: decimalNumber(a[2]),
            weight: 1 / addresses.length,
            contractBalance: decimalNumber(a[1]),
            accountBalance: 0,
            amount: 0,
            allocation: 0,
            selection: "Neither"
        }
    })

    return { chain, poolToken, assetTokens };
};

export default Moralis;
