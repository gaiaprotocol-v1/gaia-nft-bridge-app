import IERC721Artifact from "./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import ERC721Contract from "./polygon-standard/ERC721Contract";

class PolygonGaiaGenesisContract extends ERC721Contract<any> {

    constructor() {
        super("0x9f69C2a06c97fCAAc1E586b30Ea681c43975F052", IERC721Artifact.abi, ["ApprovalForAll"]);
    }
}

export default new PolygonGaiaGenesisContract();
