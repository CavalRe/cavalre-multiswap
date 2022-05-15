export const decimalNumber = (value: string, decimals: string = "18") => {
    return parseInt(value) / (10 ** parseInt(decimals));
};

export type Dict<T> = {
    [key: string]: T
};

export { abi as poolAbi } from "../../artifacts/contracts/Pool.sol/Pool.json";

export { abi as tokenAbi } from "../../artifacts/contracts/Token.sol/Token.json";
