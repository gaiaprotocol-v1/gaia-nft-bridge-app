"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IERC721_json_1 = __importDefault(require("./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json"));
const ERC721Contract_1 = __importDefault(require("./polygon-standard/ERC721Contract"));
class PolygonGaiaStableDAOContract extends ERC721Contract_1.default {
    constructor() {
        super("0xa5f5b6C05a6d48a56E95E4Ce15078008a18BC79B", IERC721_json_1.default.abi, ["ApprovalForAll"]);
    }
}
exports.default = new PolygonGaiaStableDAOContract();
//# sourceMappingURL=PolygonGaiaStableDAOContract.js.map