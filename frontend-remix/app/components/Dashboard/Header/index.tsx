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

    const handleLogout = async () => logout();
    const handleLogin = async () => authenticate();

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
