import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import DashboardComponent from "~/components/Dashboard";

import { getPool } from "~/moralis.server";

export const loader: LoaderFunction = async () => {
    const pool = await getPool();
    return { ...pool };
};

const Dashboard = () => {
    const pool = useLoaderData();
    const { poolToken, assetTokens } = pool;

    return (
        <DashboardComponent
            poolToken={poolToken}
            assetTokens={assetTokens}
        />
    )
}

export default Dashboard;
