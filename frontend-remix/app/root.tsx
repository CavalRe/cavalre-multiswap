import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import { MantineProvider } from '@mantine/core';
// import Moralis from "./moralis.server";

// const serverUrl = "https://sf5h683tvf93.usemoralis.com:2053/server";
// const appId = "2Q2fAUPZO5WIzeDn2VPGRVKfKStzMaTZj7h998eA";
// const masterKey = "8v8AJX9Tanzb2sYiwTG8tlc55AeRwb9LSLSjg0Ej"

// Moralis.start({
//     serverUrl,
//     appId,
//     masterKey
// })

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
        <body>
          <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
            <Outlet />
          </MantineProvider>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
    </html>
  );
}
