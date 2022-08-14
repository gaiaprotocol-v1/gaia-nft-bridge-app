"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IERC721_json_1 = __importDefault(require("./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json"));
const ERC721Contract_1 = __importDefault(require("./ethereum-standard/ERC721Contract"));
class EthereumGaiaStableDAOContract extends ERC721Contract_1.default {
    constructor() {
        super("0xFfFd676Bffd8797f34C2Adc3E808F374CAEe49D8", IERC721_json_1.default.abi, ["ApprovalForAll"]);
    }
}
exports.default = new EthereumGaiaStableDAOContract();
//# sourceMappingURL=EthereumGaiaStableDAOContract.js.map