"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_common_1 = require("skydapp-common");
const ConnectWalletPopup_1 = __importDefault(require("../component/shared/ConnectWalletPopup"));
const Kaikas_1 = __importDefault(require("./Kaikas"));
const Klip_1 = __importDefault(require("./Klip"));
class KlaytnWallet extends skydapp_common_1.EventContainer {
    constructor() {
        super();
        this.checkConnected();
        Kaikas_1.default.toss("connect", this);
        Klip_1.default.toss("connect", this);
    }
    async checkConnected() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }
    async loadAddress() {
        if (Kaikas_1.default.installed === true) {
            return await Kaikas_1.default.loadAddress();
        }
        else {
            return Klip_1.default.address;
        }
    }
    async connected() {
        return await this.loadAddress() !== undefined;
    }
    async connect() {
        if (Kaikas_1.default.installed === true) {
            return await Kaikas_1.default.connect();
        }
        else {
            return new Promise((resolve) => new ConnectWalletPopup_1.default(resolve));
        }
    }
    async disconnect() {
    }
    async loadChainId() {
        if (Kaikas_1.default.installed === true) {
            return await Kaikas_1.default.loadChainId();
        }
        else {
            return 8127;
        }
    }
    async addToken(address, symbol, decimals, image) {
        if (await this.loadChainId() !== 8217) {
            this.fireEvent("wrongNetwork");
            console.error("Wrong Network");
        }
        else {
            Kaikas_1.default.addToken(address, symbol, decimals, image);
        }
    }
}
exports.default = new KlaytnWallet();
//# sourceMappingURL=KlaytnWallet.js.map