import { msg } from "skydapp-browser";
import { SkyRouter } from "skydapp-common";
import superagent from "superagent";
import Home from "./view/Home";
import Layout from "./view/Layout";
import Test from "./test/Test";

(async () => {
    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);
    SkyRouter.route("test", Test);

    /*//TEST
    const currentBlock = await Klaytn.loadBlockNumber();
    const events = await KlaytnGaiaNFTBridgeContract.getSendNFTsEvents(
        currentBlock - 75000,
        currentBlock,
    );
    for (const event of events) {
        if (
            event.returnValues[0] === "0x1c99aFAABc3670B3BC515527ae1913d8A71DE4f7"
        ) {
            console.log(event);
        }
    }*/
})();