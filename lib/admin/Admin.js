"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const Layout_1 = __importDefault(require("../view/Layout"));
const AdminSwaper_1 = __importDefault(require("./AdminSwaper"));
class Admin {
    constructor() {
        Layout_1.default.current.title = "Gaia NFT Bridge";
        Layout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".home-view", new AdminSwaper_1.default()));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Admin;
//# sourceMappingURL=Admin.js.map