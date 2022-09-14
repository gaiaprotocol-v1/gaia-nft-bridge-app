"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const superagent_1 = __importDefault(require("superagent"));
const Admin_1 = __importDefault(require("./admin/Admin"));
const Test_1 = __importDefault(require("./test/Test"));
const Home_1 = __importDefault(require("./view/Home"));
const Layout_1 = __importDefault(require("./view/Layout"));
(async () => {
    if (sessionStorage.__spa_path) {
        skydapp_common_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    skydapp_browser_1.msg.parseCSV((await superagent_1.default.get("/msg.csv")).text);
    skydapp_common_1.SkyRouter.route("**", Layout_1.default);
    skydapp_common_1.SkyRouter.route("", Home_1.default);
    skydapp_common_1.SkyRouter.route("test", Test_1.default);
    skydapp_common_1.SkyRouter.route("admin", Admin_1.default);
})();
//# sourceMappingURL=main.js.map