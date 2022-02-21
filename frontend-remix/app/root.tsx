import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import { MoralisProvider } from "react-moralis";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
}

const serverUrl = "https://vaddvut5cdnm.usemoralis.com:2053/server";
const appId = "bSUtYH1vW3Etcx7NPH4EzFPgr82vAB5Ag1Zi7LRQ";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <MoralisProvider serverUrl={serverUrl} appId={appId}>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </MoralisProvider>
    </html>
  );
}
