import IERC721Artifact from "./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import ERC721Contract from "./polygon-standard/ERC721Contract";

class PolygonGaiaSupernovaContract extends ERC721Contract<any> {

    constructor() {
        super("0xECFFc91149b8B702dEa6905Ae304A9D36527060F", IERC721Artifact.abi, ["ApprovalForAll"]);
    }
}

export default new PolygonGaiaSupernovaContract();
