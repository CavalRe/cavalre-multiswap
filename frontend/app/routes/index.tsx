import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { AppShell } from '@mantine/core';

import Dashboard, { Header } from "~/components/Dashboard";

import { getPool } from "~/moralis.server";

export const loader: LoaderFunction = async () => {
    const pool = await getPool();
    return pool;
};

export default function Index() {
    const pool = useLoaderData();
    const { chain, poolToken, assetTokens } = pool;

    return (
        <AppShell
            padding="md"
            // navbar={<NavBar />}
            header={<Header chain={chain} poolToken={poolToken} assetTokens={assetTokens}/>}
        >
            <Dashboard
                chain={chain}
                poolToken={poolToken}
                assetTokens={assetTokens}
            />
        </AppShell>
    )
};
