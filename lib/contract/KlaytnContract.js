"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_common_1 = require("skydapp-common");
const ConnectWalletPopup_1 = __importDefault(require("../component/shared/ConnectWalletPopup"));
const Kaikas_1 = __importDefault(require("../klaytn/Kaikas"));
const Klaytn_1 = __importDefault(require("../klaytn/Klaytn"));
const KlaytnWallet_1 = __importDefault(require("../klaytn/KlaytnWallet"));
const Klip_1 = __importDefault(require("../klaytn/Klip"));
class KlaytnContract extends skydapp_common_1.EventContainer {
    constructor(address, abi) {
        super();
        this.address = address;
        this.abi = abi;
        this.contract = Klaytn_1.default.createContract(address, abi);
    }
    findMethodABI(name) {
        return this.abi.filter((abi) => abi.name === name && abi.type === "function")[0];
    }
    async loadExtWalletContract() {
        if (await Kaikas_1.default.loadChainId() !== 8217) {
            this.fireEvent("wrongNetwork");
            console.error("Wrong Network");
        }
        else {
            if (await Kaikas_1.default.connected() !== true) {
                await Kaikas_1.default.connect();
            }
            if (this.walletContract === undefined) {
                this.walletContract = Kaikas_1.default.createContract(this.address, this.abi);
            }
            return this.walletContract;
        }
    }
    async runMethod(methodName, ...params) {
        return await this.contract.methods[methodName](...params).call();
    }
    async runWalletMethodWithGas(methodName, gas, ...params) {
        if (Kaikas_1.default.installed === true) {
            const from = await KlaytnWallet_1.default.loadAddress();
            const contract = await this.loadExtWalletContract();
            await contract?.methods[methodName](...params).send({ from, gas });
        }
        else if (Klip_1.default.connected === true) {
            await Klip_1.default.runContractMethod(this.address, this.findMethodABI(methodName), params);
        }
        else {
            return new Promise((resolve) => new ConnectWalletPopup_1.default(resolve));
        }
    }
    async runWalletMethod(methodName, ...params) {
        return this.runWalletMethodWithGas(methodName, 1500000, ...params);
    }
    async runWalletMethodWithLargeGas(methodName, ...params) {
        return this.runWalletMethodWithGas(methodName, 20000000, ...params);
    }
    async runWalletMethodWithValue(value, methodName, ...params) {
        if (Kaikas_1.default.installed === true) {
            const from = await KlaytnWallet_1.default.loadAddress();
            const contract = await this.loadExtWalletContract();
            await contract?.methods[methodName](...params).send({ from, gas: 1500000, value });
        }
        else if (Klip_1.default.connected === true) {
            await Klip_1.default.runContractMethod(this.address, this.findMethodABI(methodName), params, value.toString());
        }
        else {
            return new Promise((resolve) => new ConnectWalletPopup_1.default(resolve));
        }
    }
}
exports.default = KlaytnContract;
//# sourceMappingURL=KlaytnContract.js.map