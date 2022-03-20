import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import DashboardComponent from "~/components/Dashboard";

import { getPool } from "~/moralis.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const pool = await getPool(params.address);
    return { ...pool, pathname };
};

const Dashboard = () => {
    const {
        contractAddress,
        address,
        poolTokens,
        assets,
        balances,
        pathname
    } = useLoaderData();

    return (
        <DashboardComponent
            contractAddress={contractAddress}
            address={address}
            poolTokens={poolTokens}
            assets={assets}
            balances={balances}
            pathname={pathname}
        />
    );
};

export default Dashboard;
