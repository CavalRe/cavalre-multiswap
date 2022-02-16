import Moralis from "./moralis.server";

export async function getUser() {
    let user = Moralis.User.current();
    if (!user) {
        console.log("Authenticating");
        // user = await Moralis.authenticate();
    }
    console.log(user);
    return user;
}
