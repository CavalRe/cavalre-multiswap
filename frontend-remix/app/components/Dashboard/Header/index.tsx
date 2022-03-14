import { useMoralis } from "react-moralis";
import {
    Button,
    Header
} from '@mantine/core';

const DashboardHeader = () => {
    const {
        isAuthenticated,
        authenticate,
        logout
    } = useMoralis();

    const handleLogin = async () => { await authenticate(); };
    const handleLogout = async () => { await logout(); };

    return (
        <Header height={60} p="xs">
            {isAuthenticated ?
                <Button onClick={handleLogout}>Logout</Button> :
                <Button onClick={handleLogin}>Connect Wallet</Button>
            }
        </Header>
    )
};

export default DashboardHeader;
