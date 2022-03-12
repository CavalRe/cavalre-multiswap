import { useEffect, useState } from 'react';
import {
    Outlet,
    useNavigate
} from "remix";
import { useMoralis } from "react-moralis";
import {
    AppShell
} from '@mantine/core';

import { Header, NavBar } from "~/components/Dashboard";

export default function Index() {
    const { isAuthenticated } = useMoralis();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate("/");
    },[isAuthenticated]);

    return (
        <AppShell
            padding="md"
            navbar={<NavBar />}
            header={<Header />}
        // styles={(theme) => ({
        //     main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        // })}
        >
            <Outlet />
        </AppShell>
    )
};
