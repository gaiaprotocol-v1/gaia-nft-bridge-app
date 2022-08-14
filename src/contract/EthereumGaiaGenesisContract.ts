import IERC721Artifact from "./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import ERC721Contract from "./ethereum-standard/ERC721Contract";

class EthereumGaiaGenesisContract extends ERC721Contract<any> {

    constructor() {
        super("0xb48E526d935BEe3891222f6aC10A253e31CCaBE1", IERC721Artifact.abi, ["ApprovalForAll"]);
    }
}

export default new EthereumGaiaGenesisContract();
