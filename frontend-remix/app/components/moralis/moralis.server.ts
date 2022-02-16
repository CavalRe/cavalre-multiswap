import Moralis from "moralis/node";

const appId = process.env.MORALIS_APP_ID;
const serverUrl = process.env.MORALIS_SERVER_URL;
Moralis.start({ serverUrl, appId });

Moralis.User.enableUnsafeCurrentUser();

const user = Moralis.User.current();
console.log("Server");
console.log(user);

export default Moralis;