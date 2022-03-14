import { Outlet } from "remix";
import { AppShell } from '@mantine/core';

import {
    Header,
    // NavBar
} from "~/components/Dashboard";

export default function Index() {

    return (
        <AppShell
            padding="md"
            // navbar={<NavBar />}
            header={<Header />}
        >
            <Outlet />
        </AppShell>
    )
};
