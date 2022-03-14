import { useMoralis } from "react-moralis";
import { Button } from '@mantine/core';

const RequireAuth = ({ children }: any) => {
    const { isAuthenticated, authenticate } = useMoralis();

    const handleLogin = async () => { await authenticate(); };

    return (
        <>
            {isAuthenticated ?
                children :
                <Button onClick={handleLogin}>Connect Wallet</Button>
            }
        </>
    );
};

export default RequireAuth;
