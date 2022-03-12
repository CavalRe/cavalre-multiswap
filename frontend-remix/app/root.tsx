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
import { MantineProvider } from '@mantine/core';

const serverUrl = "https://sf5h683tvf93.usemoralis.com:2053/server";
const appId = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
}

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
          <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
            <Outlet />
          </MantineProvider>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </MoralisProvider>
    </html>
  );
}
