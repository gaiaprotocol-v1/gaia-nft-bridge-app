"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IERC721_json_1 = __importDefault(require("./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json"));
const ERC721Contract_1 = __importDefault(require("./ethereum-standard/ERC721Contract"));
class EthereumGaiaSupernovaContract extends ERC721Contract_1.default {
    constructor() {
        super("0xe7df0DcA32eb23F4182055dC6a2053A3fF239315", IERC721_json_1.default.abi, ["ApprovalForAll"]);
    }
}
exports.default = new EthereumGaiaSupernovaContract();
//# sourceMappingURL=EthereumGaiaSupernovaContract.js.map