export const decimalNumber = (value: string, decimals: string = "18") => {
    return parseInt(value) / (10 ** parseInt(decimals));
};

export { abi as poolAbi } from "../../../artifacts/contracts/Pool.sol/Pool.json";
