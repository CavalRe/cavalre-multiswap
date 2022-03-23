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
    // console.log("-----------------------------------");
    // console.log("/dashboard called loader");
    const { contractAddress, address, poolTokens, assets, balances, pathname } = pool;

    return (
        <DashboardComponent
            contractAddress={contractAddress}
            address={address}
            poolTokens={poolTokens}
            assets={assets}
            balances={balances}
            pathname={pathname}
        />
    )
}

export default Dashboard;