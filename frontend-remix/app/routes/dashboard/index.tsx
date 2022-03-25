import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import DashboardComponent from "~/components/Dashboard";

import { getPool } from "~/moralis.server";

export const loader: LoaderFunction = async () => {
    const pathname = "/dashboard";
    const pool = await getPool(undefined);
    return { ...pool, pathname };
};

const Dashboard = () => {
    const pool = useLoaderData();
    const { address, poolToken, assetTokens, pathname } = pool;

    return (
        <DashboardComponent
            address={address}
            poolToken={poolToken}
            assetTokens={assetTokens}
            pathname={pathname}
        />
    )
}

export default Dashboard;
