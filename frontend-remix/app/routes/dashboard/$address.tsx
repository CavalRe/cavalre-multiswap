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
        address,
        poolToken,
        assetTokens,
        pathname
    } = useLoaderData();

    return (
        <DashboardComponent
            address={address}
            poolToken={poolToken}
            assetTokens={assetTokens}
            pathname={pathname}
        />
    );
};

export default Dashboard;
