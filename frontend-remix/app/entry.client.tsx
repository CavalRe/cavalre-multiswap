import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";
// import { MoralisProvider } from "react-moralis";

hydrate(<RemixBrowser />, document);

// const serverUrl = "https://vaddvut5cdnm.usemoralis.com:2053/server";
// const appId = "MORALIS_APP_ID=bSUtYH1vW3Etcx7NPH4EzFPgr82vAB5Ag1Zi7LRQ";
// hydrate(<MoralisProvider serverUrl={serverUrl} appId={appId}><RemixBrowser /></MoralisProvider>, document);
