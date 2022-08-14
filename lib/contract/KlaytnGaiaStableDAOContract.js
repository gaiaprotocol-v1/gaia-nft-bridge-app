"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Klaytn_1 = __importDefault(require("../klaytn/Klaytn"));
const IERC721_json_1 = __importDefault(require("./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json"));
const KIP17Contract_1 = __importDefault(require("./klaytn-standard/KIP17Contract"));
class KlaytnGaiaStableDAOContract extends KIP17Contract_1.default {
    constructor() {
        super("0x5428dB8Fd0063390b3357D78d56f183D6755A446", IERC721_json_1.default.abi);
        this.watch();
    }
    async watch() {
        let prevBlock = await Klaytn_1.default.loadBlockNumber();
        setInterval(async () => {
            const currentBlock = await Klaytn_1.default.loadBlockNumber();
            const transferEvents = await this.getTransferEvents(prevBlock, currentBlock);
            for (const event of transferEvents) {
                this.fireEvent("Transfer", event.returnValues[0], event.returnValues[1], ethers_1.BigNumber.from(event.returnValues[2]));
            }
            const approvalEvents = await this.getApprovalEvents(prevBlock, currentBlock);
            for (const event of approvalEvents) {
                this.fireEvent("Approval", event.returnValues[0], event.returnValues[1], ethers_1.BigNumber.from(event.returnValues[2]));
            }
            const approvalForAllEvents = await this.getApprovalForAllEvents(prevBlock, currentBlock);
            for (const event of approvalForAllEvents) {
                this.fireEvent("ApprovalForAll", event.returnValues[0], event.returnValues[1], event.returnValues[2]);
            }
            prevBlock = currentBlock + 1;
        }, 2000);
    }
}
exports.default = new KlaytnGaiaStableDAOContract();
//# sourceMappingURL=KlaytnGaiaStableDAOContract.js.map