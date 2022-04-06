import type {
    ActionFunction,
    LoaderFunction
} from "remix";
import {
    redirect,
    useLoaderData,
    // Form
} from "remix";

import DashboardComponent from "~/components/Dashboard";

import { swap, Token } from "~/moralis.server";
import { getPool } from "~/moralis.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const pool = await getPool(params.address);
    return { ...pool, pathname };
};

type ActionData = {
    formError?: string;
    fieldErrors?: {
        name: string | undefined;
        content: string | undefined;
    };
    fields?: {
        name: string;
        content: string;
    };
};

export let action: ActionFunction = async ({
    request,
}): Promise<Response | ActionData> => {
    const formData = await request.formData();
    const address = formData.get("address") ? formData.get("address").toString() : "";
    const payTokens: Token[] = [];
    const receiveTokens: Token[] = [];
    for (const pair of formData.entries()) {
        if (pair[0].startsWith("payToken")) {
            payTokens.push(JSON.parse(pair[1].toString()));
        } else if (pair[0].startsWith("receiveToken")) {
            receiveTokens.push(JSON.parse(pair[1].toString()));
        };
    };
    const { result, error }: { result?: string, error?: string } = await swap(address, payTokens, receiveTokens);
    if (error) {
        console.log(error);
    } else {
        console.log(result);
    };
    // let userId = await requireUserId(request);
    // let form = await request.formData();
    // let name = form.get("name");
    // let content = form.get("content");
    // if (typeof name !== "string" || typeof content !== "string") {
    //   return { formError: `Form not submitted correctly.` };
    // }

    // let fieldErrors = {
    //   name: validateJokeName(name),
    //   content: validateJokeContent(content),
    // };
    // let fields = { name, content };
    // if (Object.values(fieldErrors).some(Boolean)) {
    //   return { fieldErrors, fields };
    // }

    // let joke = await db.joke.create({
    //   data: { ...fields, jokesterId: userId },
    // });
    return redirect("/dashboard");
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
