import Moralis from "moralis/node";

const getSession = async () => {
    const session = await Moralis.Session.current();
    console.log(session);
}