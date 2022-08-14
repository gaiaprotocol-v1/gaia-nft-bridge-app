"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IERC721_json_1 = __importDefault(require("./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json"));
const ERC721Contract_1 = __importDefault(require("./polygon-standard/ERC721Contract"));
class PolygonGaiaGenesisContract extends ERC721Contract_1.default {
    constructor() {
        super("0x9f69C2a06c97fCAAc1E586b30Ea681c43975F052", IERC721_json_1.default.abi, ["ApprovalForAll"]);
    }
}
exports.default = new PolygonGaiaGenesisContract();
//# sourceMappingURL=PolygonGaiaGenesisContract.js.map