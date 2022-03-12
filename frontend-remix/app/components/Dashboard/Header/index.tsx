import { useMoralis } from "react-moralis";
import {
    Button,
    Header
} from '@mantine/core';

const DashboardHeader = () => {
    const {
        isAuthenticated,
        logout
    } = useMoralis();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Header height={60} p="xs">
            {isAuthenticated ?
                <Button onClick={handleLogout}>Logout</Button> :
                null
            }
        </Header>
    )
};

export default DashboardHeader;
