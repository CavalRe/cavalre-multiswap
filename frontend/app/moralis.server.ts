import Moralis from "moralis/node";
import { poolAbi, decimalNumber } from "~/utils";
import type { Dict } from "~/utils";

const serverUrl = "https://sf5h683tvf93.usemoralis.com:2053/server";
const appId = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";
const masterKey = "8v8AJX9Tanzb2sYiwTG8tlc55AeRwb9LSLSjg0Ej"
// const contractAddress = "0x83B141645dD821650b496b01729B98fc7D5e5c3F".toLowerCase();
// const contractAddress = "0x6df37236a56954a4e3e1eAB9c2A2b252829d766a".toLowerCase();
const contractAddress = "0x513abc44e268a1ae437b3631542555b04845e5a5".toLowerCase();
const chain = "ropsten";

const feeMax = .01;

export const serverInfo = { serverUrl, appId, masterKey };

Moralis.start({
    serverUrl,
    appId,
    masterKey
});

type Selection = "Pay" | "Receive" | "Neither" | "Not in Pool";

export type PoolToken = {
    address: string
    name: string
    symbol: string
    decimals: number
    fee: number
    contractBalance: number
    accountBalance: number
    allowance: number
    amount: number
    allocation: number
    selection: Selection
};

export type AssetToken = PoolToken & {
    k: number
    weight: number,
};

export type Token = PoolToken | AssetToken;

export const getPool = async () => {

    const poolTokens: number = decimalNumber(await Moralis.Web3API.native.runContractFunction({
        chain,
        address: contractAddress,
        function_name: "balance",
        abi: poolAbi
    }));

    const assetData: any = await Moralis.Web3API.native.runContractFunction({
        chain,
        address: contractAddress,
        function_name: "assets",
        abi: poolAbi
    });

    const addresses = assetData.map((asset: any) => asset[0].toLowerCase());

    const metadata: Dict<any> = {};
    const metadataArray = await Moralis.Web3API.token.getTokenMetadata({
        chain,
        addresses
    });
    metadataArray.forEach((m: any) => {
        metadata[m.address] = m;
    });

    const poolToken: PoolToken = {
        address: contractAddress,
        name: "Pool",
        symbol: "P",
        decimals: 18,
        fee: 0.0001,
        contractBalance: poolTokens,
        accountBalance: 0,
        allowance: 0,
        amount: 0,
        allocation: 0,
        selection: "Neither"
    };

    const assetTokens: Dict<AssetToken> = {};

    assetData.forEach((a: any, i: number) => {
        assetTokens[a[0].toLowerCase()] = {
            address: addresses[i],
            name: metadata[addresses[i]].name,
            symbol: metadata[addresses[i]].symbol,
            decimals: parseInt(metadata[addresses[i]].decimals),
            k: decimalNumber(a[4]),
            fee: decimalNumber(a[2]),
            weight: 1 / addresses.length,
            contractBalance: decimalNumber(a[1]),
            accountBalance: 0,
            allowance: 0,
            amount: 0,
            allocation: 0,
            selection: "Neither"
        }
    })

    return { chain, poolToken, assetTokens };
};

export default Moralis;
