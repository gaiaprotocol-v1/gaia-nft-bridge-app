import IERC721Artifact from "./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import ERC721Contract from "./polygon-standard/ERC721Contract";

class PolygonGaiaStableDAOContract extends ERC721Contract<any> {

    constructor() {
        super("0xa5f5b6C05a6d48a56E95E4Ce15078008a18BC79B", IERC721Artifact.abi, ["ApprovalForAll"]);
    }
}

export default new PolygonGaiaStableDAOContract();
