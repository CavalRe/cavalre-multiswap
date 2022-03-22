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

export type Token = {
    token_address: string,
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

// export type Asset = {
//     token_address: string,
//     name: string,
//     symbol: string,
//     reserve: number,
//     fee: number,
//     weight: number,
//     k: number
// };

// export type Balance = {
//     token_address: string;
//     name: string;
//     symbol: string;
//     balance: number;
// };

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
    //     const assets: Asset[] = [];
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

    const assetTokens: Dict<Token> = {};

    assetData.forEach((a: any, i: number) => {
        console.log(`Creating ${a[0]}`);
        assetTokens[a[0].toLowerCase()] = {
            token_address: addresses[i],
            name: metadata[i].name,
            symbol: metadata[i].symbol,
            k: decimalNumber(a[4]),
            fee: decimalNumber(a[2]),
            weight: 1 / addresses.length,
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
            console.log(`Updating ${b.token_address}`);
            assetTokens[b.token_address].balance = decimalNumber(b.balance,b.decimals);
        } else {
            console.log(`Adding ${b.token_address}`);
            assetTokens[b.token_address] = {
                token_address: b.token_address,
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

    // console.log(assets);
    // console.log(balances);
    // console.log(poolTokens);

    return { contractAddress, address, poolTokens, assetTokens };
};

export default Moralis;
