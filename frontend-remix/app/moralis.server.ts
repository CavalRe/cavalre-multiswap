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

type Selection = "Pay" | "Receive" | "Neither";

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

const decimalNumber = (value: string, decimals: string = "18") => {
    return parseInt(value) / (10 ** parseInt(decimals));
};

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

    // const balanceData: any[] = address === undefined ? [] : await Moralis.Web3API.account.getTokenBalances({
    //     address,
    //     chain
    // });

    // balanceData.forEach((b: any) => {
    //     if (b.token_address in assetTokens) {
    //         assetTokens[b.token_address].accountBalance = decimalNumber(b.balance, b.decimals);
    //     } else if (b.token_address == contractAddress) {
    //         poolToken.accountBalance = decimalNumber(b.balance, b.decimals);
    //     } else {
    //         assetTokens[b.token_address] = {
    //             address: b.token_address,
    //             name: b.name,
    //             symbol: b.symbol,
    //             k: 1,
    //             fee: feeMax,
    //             weight: 0,
    //             contractBalance: 0,
    //             accountBalance: decimalNumber(b.accountBalance, b.decimals),
    //             amount: 0,
    //             allocation: 0,
    //             isPay: false,
    //             isReceive: false
    //         };
    //     };
    // })

    return { poolToken, assetTokens };
};

export const swap = async (address: string, payTokens: Token[], receiveTokens: Token[]) => {
    const totalAllocation = receiveTokens.reduce((acc: number, t: Token) => acc + t.allocation, 0);
    if (Math.abs(totalAllocation - 1) > 0.0001) return { error: "Allocation must add up to 1" };

    if (payTokens.length === 0) return { error: "Must select at least one pay token" };
    if (receiveTokens.length === 0) return { error: "Must select at least one receive token" };

    if (payTokens.length > 1) return { error: "Must select only one pay token" };
    if (receiveTokens.length > 1) return { error: "Must select only one receive token" };

    const payAddresses = payTokens.map((t: Token) => t.address);
    const receiveAddresses = receiveTokens.map((t: Token) => t.address);

    if (payAddresses.includes(contractAddress)) {
        return { result: "Staking" };
    } else if (receiveAddresses.includes(contractAddress)) {
        return { result: "Unstaking" };
    } else {
        const { allowance } = await Moralis.Web3API.token.getTokenAllowance(
            {
                chain,
                owner_address: address,
                spender_address: contractAddress,
                address: payTokens[0].address
            }
        );
        console.log(`allowance: ${decimalNumber(allowance)}`);
        console.log(`amount: ${payTokens[0].amount}`);
        if (decimalNumber(allowance) < payTokens[0].amount) {
            // await Moralis.Web3API.native.runContractFunction({

            // })
        }
        // Moralis.authenticate({
        //     chain,
        //     address,
        // })
        // await Moralis.executeFunction({
        //     contractAddress,
        //     functionName: "swap",
        //     abi: poolAbi,
        //     params: { 
        //         addressIn: payTokens[0].address, 
        //         addressOut: receiveTokens[0].address,
        //         amountIn: payTokens[0].amount,
        //         addressTo: address
        //     }
        // });
        return { result: "Swapping" };
    };
};

export default Moralis;
