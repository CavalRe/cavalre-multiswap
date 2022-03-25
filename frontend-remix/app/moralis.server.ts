import Moralis from "moralis/node";

import { abi as poolAbi } from "../../artifacts/contracts/Pool.sol/Pool.json";

const serverUrl = "https://sf5h683tvf93.usemoralis.com:2053/server";
const appId = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";
const masterKey = "8v8AJX9Tanzb2sYiwTG8tlc55AeRwb9LSLSjg0Ej"
const contractAddress = "0x83B141645dD821650b496b01729B98fc7D5e5c3F".toLowerCase();
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

export type PoolToken = {
    address: string,
    name: string,
    symbol: string,
    fee: number,
    outstanding: number,
    balance: number;
    amount: number;
    allocation: number;
    isPay: boolean;
    isReceive: boolean;
};

export type AssetToken = {
    address: string,
    name: string,
    symbol: string,
    k: number
    fee: number,
    weight: number,
    reserve: number,
    balance: number;
    amount: number;
    allocation: number;
    isPay: boolean;
    isReceive: boolean;
}

export type Token = PoolToken | AssetToken;

const decimalNumber = (value: string, decimals: string="18") => {
    return parseInt(value) / (10 ** parseInt(decimals));
};

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

    const assetAddresses = assetData.map((asset: any) => asset[0].toLowerCase());

    const addresses = assetAddresses.concat(contractAddress);

    const metadata = await Moralis.Web3API.token.getTokenMetadata({
        chain,
        addresses
    });

    const poolTokenMetadata = metadata.pop();

    const poolToken: PoolToken = {
        address: poolTokenMetadata.address,
        name: poolTokenMetadata.name,
        symbol: poolTokenMetadata.symbol,
        fee: 0.0001,
        outstanding: poolTokens,
        balance: 0,
        amount: 0,
        allocation: 0,
        isPay: false,
        isReceive: false
    };

    const assetTokens: Dict<AssetToken> = {};

    assetData.forEach((a: any, i: number) => {
        assetTokens[a[0].toLowerCase()] = {
            address: assetAddresses[i],
            name: metadata[i].name,
            symbol: metadata[i].symbol,
            k: decimalNumber(a[4]),
            fee: decimalNumber(a[2]),
            weight: 1 / assetAddresses.length,
            reserve: decimalNumber(a[1]),
            balance: 0,
            amount: 0,
            allocation: 0,
            isPay: false,
            isReceive: false
        }
    })

    const balanceData: any[] = address === undefined ? [] : await Moralis.Web3API.account.getTokenBalances({
        address,
        chain
    });

    balanceData.forEach((b: any) => {
        if (b.token_address in assetTokens) {
            assetTokens[b.token_address].balance = decimalNumber(b.balance,b.decimals);
        } else if (b.token_address == contractAddress) {
            poolToken.balance = decimalNumber(b.balance,b.decimals);
        } else {
            assetTokens[b.token_address] = {
                address: b.token_address,
                name: b.name,
                symbol: b.symbol,
                k: 1,
                fee: feeMax,
                weight: 0,
                reserve: 0,
                balance: decimalNumber(b.balance,b.decimals),
                amount: 0,
                allocation: 0,
                isPay: false,
                isReceive: false
            };
        };
    })

    return { address, poolToken, assetTokens };
};

export default Moralis;
