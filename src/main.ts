import { msg } from "skydapp-browser";
import { SkyRouter } from "skydapp-common";
import superagent from "superagent";
import Home from "./view/Home";
import Layout from "./view/Layout";

(async () => {
    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);
})();