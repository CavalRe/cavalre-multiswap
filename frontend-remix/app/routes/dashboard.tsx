import { useState, useEffect } from 'react';
import { useMoralis } from "react-moralis";
import {
    Outlet,
    useNavigate
} from "remix";
import {
    AppShell,
    Button,
    Header,
    Modal,
    Navbar,
    Table,
    ThemeIcon
} from '@mantine/core';

import {
    MdOutlineAccountBalanceWallet,
    MdOutlineGroupWork,
    MdOutlineSwapHorizontalCircle
} from "react-icons/md";

import Swap from "~/components/Swap";

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


    const [opened, setOpened] = useState(false);

    useEffect(() => {
        if (
            isAuthenticated &&
            !isWeb3Enabled &&
            !isWeb3EnableLoading
        ) enableWeb3();
    }, [isAuthenticated, isWeb3Enabled, isWeb3EnableLoading]);

    const navigate = useNavigate();

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
            <Button onClick={handleLogin}>Connect Wallet</Button>
        );
    } else {
        return (<div>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                radius="lg"
                title="Mulit-Asset Swap"
            >
                <Swap />
            </Modal>
            <AppShell
                padding="md"
                navbar={
                    <Navbar width={{ base: 300 }} height={500} padding="xs">
                        <Navbar.Section>
                            <Table style={{ width: "100%" }} highlightOnHover>
                                <tbody>
                                    <tr onClick={() => navigate("/dashboard/balances")}>
                                        <td width="28px">
                                            <ThemeIcon>
                                                <MdOutlineAccountBalanceWallet />
                                            </ThemeIcon>
                                        </td>
                                        <td>
                                            Account Balances
                                        </td>
                                    </tr>
                                    <tr onClick={() => navigate("/dashboard/pool")}>
                                        <td>
                                            <ThemeIcon>
                                                <MdOutlineGroupWork />
                                            </ThemeIcon>
                                        </td>
                                        <td>
                                            Liquidity Pool
                                        </td>
                                    </tr>
                                    <tr onClick={() => setOpened(true)}>
                                        <td>
                                            <ThemeIcon>
                                                <MdOutlineSwapHorizontalCircle />
                                            </ThemeIcon>
                                        </td>
                                        <td>
                                            Multi-Asset Swap
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Navbar.Section>
                    </Navbar>
                }
                header={<Header height={60} padding="xs">
                    <Button onClick={() => logout()}>Logout</Button>
                </Header>}
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}
            >
                <Outlet />
            </AppShell>
        </div>)
    };

}
