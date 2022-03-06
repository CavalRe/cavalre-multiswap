import { useEffect } from 'react';
import { useMoralis } from "react-moralis";
import { Button } from '@mantine/core';

import Assets from "~/components/Pool";
import Balances from "~/components/Balances";
// import Pool from "../../../artifacts/contracts/Pool.sol/Pool.json";

export default function Index() {
    const {
        isInitialized,
        isAuthenticated,
        authenticate,
        isWeb3Enabled,
        isWeb3EnableLoading,
        enableWeb3,
        // user,
        logout,
        // Moralis
    } = useMoralis();
    // const {
    //     runContractFunction,
    //     data,
    //     error,
    //     isLoading,
    //     isFetching,
    // } = useWeb3Contract({
    //     contractAddress: "0x1C7e70F5b6031a3b39279D24F7C8b2E7dA0e5CF9",
    //     functionName,
    //     abi: Pool.abi.filter(x => x.name == "assets")
    // });

    useEffect(() => {
        if (
            isAuthenticated &&
            !isWeb3Enabled &&
            !isWeb3EnableLoading
        ) enableWeb3();
    }, [isAuthenticated, isWeb3Enabled]);

    const handleLogin = async () => {
        authenticate(
            // {
            //     provider: "web3Auth",
            //     clientId: "BGI0ENrYWUvYu1OIalzasfpf4MESazKKWFP874gfbqlrm_OMWU2jYsjJGTuetTz8r_rxnmvmFTC4qAArbLWXejQ",
            //     // chainId: Moralis.Chains.ETH_ROPSTEN
            // }
        );
    };

    if (!isInitialized || !isWeb3Enabled) {
        return null
    } else if (!isAuthenticated) {
        return (
            <Button onClick={handleLogin}>Connect Wallet</Button>
        );
    } else {
        return (<div>
            {/* {error ? <pre>{JSON.stringify(error)}</pre> : null} */}
            {/* {error ? && <pre>{JSON.stringify(error)}</pre>} */}
            {/* <button onClick={() => runContractFunction()} disabled={isFetching}>Run contract function</button> */}
            {/* {data ? <pre>{data.toString()}</pre> : <pre>No data</pre>} */}
            {/* {data ? <pre>{JSON.stringify(data.map(x => x[1].div(BigNumber.from(10).pow(15)).toNumber() / 1000), undefined, 4)}</pre> : <pre>No data</pre>} */}
            <Button onClick={() => logout()}>Logout</Button>
            <Balances />
            {/* <Assets /> */}
        </div>)
    };

}
