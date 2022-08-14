"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    }
}
exports.default = new KlaytnGaiaStableDAOContract();
//# sourceMappingURL=KlaytnGaiaStableDAOContract.js.map