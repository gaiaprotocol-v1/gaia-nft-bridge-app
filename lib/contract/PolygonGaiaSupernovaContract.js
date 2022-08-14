"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IERC721_json_1 = __importDefault(require("./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json"));
const ERC721Contract_1 = __importDefault(require("./polygon-standard/ERC721Contract"));
class PolygonGaiaSupernovaContract extends ERC721Contract_1.default {
    constructor() {
        super("0xECFFc91149b8B702dEa6905Ae304A9D36527060F", IERC721_json_1.default.abi, ["ApprovalForAll"]);
    }
}
exports.default = new PolygonGaiaSupernovaContract();
//# sourceMappingURL=PolygonGaiaSupernovaContract.js.map