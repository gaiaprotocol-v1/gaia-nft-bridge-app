"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const Klaytn_1 = __importDefault(require("../klaytn/Klaytn"));
const KlaytnWallet_1 = __importDefault(require("../klaytn/KlaytnWallet"));
const GaiaNFTBridge_json_1 = __importDefault(require("./abi/gaia-protocol-pfp-bridge/artifacts/contracts/GaiaNFTBridge.sol/GaiaNFTBridge.json"));
const KlaytnContract_1 = __importDefault(require("./KlaytnContract"));
class KlaytnGaiaNFTBridgeContract extends KlaytnContract_1.default {
    constructor() {
        super("0x3Ac0d778d64C8d7AAbB28cf574B9D5cEbF603764", GaiaNFTBridge_json_1.default.abi);
        KlaytnWallet_1.default.toss("connect", this);
        this.watch();
    }
    async watch() {
        let prevBlock = await Klaytn_1.default.loadBlockNumber();
        setInterval(async () => {
            const currentBlock = await Klaytn_1.default.loadBlockNumber();
            const sendEvents = await this.getSendNFTsEvents(prevBlock, currentBlock);
            for (const event of sendEvents) {
                this.fireEvent("SendNFTs", event.returnValues[0], bignumber_1.BigNumber.from(event.returnValues[1]), event.returnValues[2], event.returnValues[3], event.returnValues[4], event.returnValues[5], bignumber_1.BigNumber.from(event.returnValues[6]));
            }
            const receiveTokenEvents = await this.getReceiveNFTsEvents(prevBlock, currentBlock);
            for (const event of receiveTokenEvents) {
                this.fireEvent("ReceiveNFTs", event.returnValues[0], bignumber_1.BigNumber.from(event.returnValues[1]), event.returnValues[2], event.returnValues[3], event.returnValues[4], event.returnValues[5], bignumber_1.BigNumber.from(event.returnValues[6]));
            }
            prevBlock = currentBlock + 1;
        }, 2000);
    }
    async getSendNFTsEvents(startBlock, endBlock) {
        const events = await this.contract.getPastEvents("SendNFTs", {
            fromBlock: startBlock,
            toBlock: endBlock,
        });
        return events;
    }
    async getReceiveNFTsEvents(startBlock, endBlock) {
        const events = await this.contract.getPastEvents("ReceiveNFTs", {
            fromBlock: startBlock,
            toBlock: endBlock,
        });
        return events;
    }
    async loadAddress() {
        return await KlaytnWallet_1.default.loadAddress();
    }
    async connect() {
        await KlaytnWallet_1.default.connect();
    }
    async sendNFTs(toChain, receiver, nftName, nftAddress, ids) {
        await this.runWalletMethod("sendNFTs", toChain, receiver, nftName, nftAddress, ids);
    }
    async receiveNFTs(sender, fromChain, receiver, nftName, nftAddress, ids, sendingId, sig) {
        await this.runWalletMethod("receiveNFTs", sender, fromChain, receiver, nftName, nftAddress, ids, sendingId, sig);
    }
    async loadSended(sender, toChainId, receiver, nftName, nftAddress) {
        const currentBlock = await Klaytn_1.default.loadBlockNumber();
        const events = await this.contract.getPastEvents("SendNFTs", {
            filter: { sender, toChainId, receiver },
            fromBlock: currentBlock - 75000,
            toBlock: currentBlock,
        });
        const results = [];
        for (const event of events) {
            if (event.returnValues[3] === nftName &&
                event.returnValues[4] === nftAddress) {
                const ids = [];
                for (const id of event.returnValues[5]) {
                    ids.push(bignumber_1.BigNumber.from(id));
                }
                results.push({ sendingId: bignumber_1.BigNumber.from(event.returnValues[6]), ids });
            }
        }
        return results;
    }
    async isNFTsReceived(sender, fromChainId, sendingId) {
        return await this.runMethod("isNFTsReceived", sender, fromChainId, sendingId);
    }
}
exports.default = new KlaytnGaiaNFTBridgeContract();
//# sourceMappingURL=KlaytnGaiaNFTBridgeContract.js.map