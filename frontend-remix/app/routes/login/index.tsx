import { useMoralis, useWeb3Contract, useMoralisWeb3Api } from "react-moralis";
import { BigNumber } from "ethers";
import { useState, useEffect } from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

import Pool from "../../../../artifacts/contracts/Pool.sol/Pool.json";

const poolABI = Pool.abi;

// const serverUrl = "https://sf5h683tvf93.usemoralis.com:2053/server";
// const appId = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";

// Moralis.start({serverUrl,appId});

const functionName = "assets";

type Balance = {
    token_address: string;
    name: string;
    symbol: string;
    logo?: string | undefined;
    thumbnail?: string | undefined;
    decimals: string;
    balance: string;
};

export default function Login() {
    const {
        isInitialized,
        isAuthenticated,
        authenticate,
        isWeb3Enabled,
        enableWeb3,
        // user,
        logout,
        // Moralis
    } = useMoralis();
    const {
        // runContractFunction,
        // data,
        // error,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        contractAddress: "0x1C7e70F5b6031a3b39279D24F7C8b2E7dA0e5CF9",
        functionName,
        abi: poolABI.filter(x => x.name == functionName)
    });
    const { account } = useMoralisWeb3Api();
    const [balances,setBalances] = useState<Balance[]>([]);

 
    // useEffect(() => {
    //     if (isInitialized && isAuthenticated) {
    //         if (!isWeb3Enabled) {
    //             enableWeb3();
    //         };
    //         // if (isWeb3Enabled && !isLoading) {
    //         //     fetchTokenBalances();
    //         // }
    //         // runContractFunction();
    //     }
    // }, [isInitialized, isAuthenticated, isWeb3Enabled])    

    // const fetchTokenBalances = async () => {
    //     setBalances(await account.getTokenBalances({chain: "ropsten"}));
    // };

    const handleLogin = async () => {
        authenticate(
            // {
            //     provider: "web3Auth",
            //     clientId: "BGI0ENrYWUvYu1OIalzasfpf4MESazKKWFP874gfbqlrm_OMWU2jYsjJGTuetTz8r_rxnmvmFTC4qAArbLWXejQ",
            //     // chainId: Moralis.Chains.ETH_ROPSTEN
            // }
        );
    };

    if (!isAuthenticated) {
        return (
            <ButtonComponent onClick={handleLogin}>Connect Wallet</ButtonComponent>
            // <button onClick={handleLogin}>Connect Wallet</button>
        );
    }

    // balances.length == 0 || console.log(balances);

    return (<div>
        {/* {error ? <pre>{JSON.stringify(error)}</pre> : null} */}
        {/* {error ? && <pre>{JSON.stringify(error)}</pre>} */}
        {/* <button onClick={() => runContractFunction()} disabled={isFetching}>Run contract function</button> */}
        {/* {data ? <pre>{data.toString()}</pre> : <pre>No data</pre>} */}
        {/* {data ? <pre>{JSON.stringify(data.map(x => x[1].div(BigNumber.from(10).pow(15)).toNumber() / 1000), undefined, 4)}</pre> : <pre>No data</pre>} */}
        <ButtonComponent onClick={() => logout()}>Logout</ButtonComponent>
        {balances.length !== 0 ? <pre>{JSON.stringify(balances, undefined, 4)}</pre> : <pre>No data</pre>}
    </div>)

}
