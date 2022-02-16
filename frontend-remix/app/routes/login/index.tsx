import {
    redirect,
    useSubmit,
} from "remix";
import type { ActionFunction } from "remix";

// import Moralis from "../../components/moralis/moralis.server";
// import Moralis from "moralis/node";

declare global {
    interface Window {
        ethereum: any;
    }
}

// const appId = process.env.MORALIS_APP_ID;
// const serverUrl = process.env.MORALIS_SERVER_URL;

// console.log(appId);
// console.log(serverUrl);

// let user: any;

export const action: ActionFunction = async ({ request }) => {
    
    // user = Moralis.User.current();

}

export default function Login() {
    const submit = useSubmit();

    async function handleSubmit() {



        // Moralis.start({ serverUrl, appId });

        console.log("Yo!");
        
        // console.log(Moralis?.User?.current());
    
        // console.log(Moralis);

        console.log(window);

        const formData = new FormData();

        submit(formData)
    };

    return (
        <div>
            <button onClick={handleSubmit}>
                Sign in with Moralis
            </button>
        </div>
    );

}
