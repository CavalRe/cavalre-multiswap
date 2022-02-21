import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { useMoralis } from "react-moralis";

export const loader: LoaderFunction = async () => {

    return {};

}

export default function Login() {
    const { authenticate, isAuthenticated, user, logout } = useMoralis();

    if (!isAuthenticated) {
        return (
            <div>
                <button onClick={() => authenticate({
                    // provider: "web3Auth",
                    // clientId: "BGI0ENrYWUvYu1OIalzasfpf4MESazKKWFP874gfbqlrm_OMWU2jYsjJGTuetTz8r_rxnmvmFTC4qAArbLWXejQ",
                })}>Connect Wallet</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome {user?.get("username")}</h1>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );

}
