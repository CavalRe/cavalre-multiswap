import {
    Container,
    Table
} from '@mantine/core';

const Assets = () => {
    return (
        <Container>
            <h2>Pool Assets</h2>
        </Container>
    )
};

export default Assets;

// import { useWeb3Contract } from "react-moralis";
// import { useEffect } from 'react';

/*
===================================================================
VERSION DEPLOYED TO ROPSTEN DOES NOT YET HAVE THE 'assets' FUNCTION
===================================================================
*/
// import { abi } from "../../../../artifacts/contracts/Pool.sol/Pool.json";

    // const {
    //     runContractFunction,
    //     data,
    //     error
    // } = useWeb3Contract({
    //     contractAddress: "0x1C7e70F5b6031a3b39279D24F7C8b2E7dA0e5CF9",
    //     functionName: "assets",
    //     abi: abi.filter(x => x.name == "assets")
    // });

    // useEffect(() => {runContractFunction();});

            // {/* {error ? <pre>{JSON.stringify(error)}</pre> : null} */}
            // {/* {data ? <pre>{JSON.stringify(data, undefined, 4)}</pre> : <pre>No data</pre>} */}
