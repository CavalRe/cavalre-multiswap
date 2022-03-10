import Moralis from "moralis/node";
import { LoaderFunction } from "remix";
import { BigNumber } from "ethers";

const serverUrl = "https://sf5h683tvf93.usemoralis.com:2053/server";
const appId = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";
const masterKey = "8v8AJX9Tanzb2sYiwTG8tlc55AeRwb9LSLSjg0Ej"
const address = "0xDC1062712Dd033874d1d915adA2cFecDe1575c71";
const contractAddress = "0x83B141645dD821650b496b01729B98fc7D5e5c3F"

import { abi as poolAbi } from "../../artifacts/contracts/Pool.sol/Pool.json";

Moralis.start({
    serverUrl,
    appId,
    masterKey
});

// struct Asset {
//     IERC20 token;
//     uint256 reserve;
//     uint256 fee; // Transaction fee, e.g. 0.003
//     uint256 scale; // Used to compute weight of this asset token
//     uint256 k; // AMM parameter for this asset token
// }

export type Asset = {
    token: string,
    reserve: BigNumber,
    fee: BigNumber,
    scale: BigNumber,
    k: BigNumber
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
    const data = await Moralis.Web3API.account.getTokenBalances({
        address,chain: "ropsten"
    });
    return data;
};

export const fetchPoolTokens: LoaderFunction = async () => {
    const data = await Moralis.Web3API.native.runContractFunction({
        chain: "ropsten",
        address: contractAddress,
        function_name: "totalSupply",
        abi: poolAbi
    });
    console.log("Hello");
    console.log(data);
    return decimalNumber(data);
};

// export const fetchAssets: LoaderFunction = async () => {
//     const assets = await Moralis.Web3API.native.runContractFunction({
//         chain: "ropsten",
//         address: contractAddress,
//         function_name: "assets",
//         abi: poolAbi
//     });
//     // const addresses = assets?.map((asset: Asset) => asset.token)

//     return assets;
// };

export default Moralis;
