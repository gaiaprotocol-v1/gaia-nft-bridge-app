"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PolygonNetworkProvider_1 = __importDefault(require("../polygon/PolygonNetworkProvider"));
const PolygonWallet_1 = __importDefault(require("../polygon/PolygonWallet"));
const GaiaNFTBridge_json_1 = __importDefault(require("./abi/gaia-protocol-pfp-bridge/artifacts/contracts/GaiaNFTBridge.sol/GaiaNFTBridge.json"));
const PolygonContract_1 = __importDefault(require("./PolygonContract"));
class PolygonGaiaNFTBridgeContract extends PolygonContract_1.default {
    constructor() {
        super("0x1640C880E14F8913bA71644F6812eE58EAeF412F", GaiaNFTBridge_json_1.default.abi, [
            "SendNFTs",
            "ReceiveNFTs",
        ]);
        PolygonWallet_1.default.toss("connect", this);
    }
    async loadAddress() {
        return await PolygonWallet_1.default.loadAddress();
    }
    async connect() {
        await PolygonWallet_1.default.connect();
    }
    async sendNFTs(toChain, receiver, nftName, nftAddress, ids) {
        const owner = await PolygonWallet_1.default.loadAddress();
        if (owner !== undefined) {
            const contract = await this.connectAndGetWalletContract();
            await contract?.sendNFTs(toChain, receiver, nftName, nftAddress, ids);
        }
    }
    async receiveNFTs(sender, fromChain, receiver, nftName, nftAddress, ids, sendingId, sig) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.receiveNFTs(sender, fromChain, receiver, nftName, nftAddress, ids, sendingId, sig);
    }
    async loadSended(sender, toChainId, receiver, nftName, nftAddress) {
        const filter = this.contract.filters.SendNFTs(sender, toChainId, receiver);
        const currentBlock = await PolygonNetworkProvider_1.default.getBlockNumber();
        const events = await this.contract.queryFilter(filter, currentBlock - 10000, currentBlock);
        const results = [];
        for (const event of events) {
            if (event.args.nftName === nftName &&
                event.args.nftAddress === nftAddress) {
                results.push({ block: event.blockNumber, sendingId: event.args.sendingId, ids: event.args.ids });
            }
        }
        return results;
    }
    async isNFTsReceived(sender, fromChainId, sendingId) {
        return await this.contract.isNFTsReceived(sender, fromChainId, sendingId);
    }
}
exports.default = new PolygonGaiaNFTBridgeContract();
//# sourceMappingURL=PolygonGaiaNFTBridgeContract.js.map