"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EthereumWallet_1 = __importDefault(require("../ethereum/EthereumWallet"));
const GaiaNFTBridge_json_1 = __importDefault(require("./abi/gaia-protocol-pfp-bridge/artifacts/contracts/GaiaNFTBridge.sol/GaiaNFTBridge.json"));
const EthereumContract_1 = __importDefault(require("./EthereumContract"));
class EthereumGaiaNFTBridgeContract extends EthereumContract_1.default {
    constructor() {
        super("0xe8C18687E9879094847bD45B3c7373f1241ea86d", GaiaNFTBridge_json_1.default.abi, [
            "SendNFTs",
            "ReceiveNFTs",
        ]);
        EthereumWallet_1.default.toss("connect", this);
    }
    async loadAddress() {
        return await EthereumWallet_1.default.loadAddress();
    }
    async connect() {
        await EthereumWallet_1.default.connect();
    }
    async sendNFTs(toChain, receiver, nftName, nftAddress, ids) {
        const owner = await EthereumWallet_1.default.loadAddress();
        if (owner !== undefined) {
        }
    }
}
exports.default = new EthereumGaiaNFTBridgeContract();
//# sourceMappingURL=EthereumGaiaNFTBridgeContract.js.map