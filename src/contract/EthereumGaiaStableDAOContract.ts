import IERC721Artifact from "./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import ERC721Contract from "./ethereum-standard/ERC721Contract";

class EthereumGaiaStableDAOContract extends ERC721Contract<any> {

    constructor() {
        super("0xFfFd676Bffd8797f34C2Adc3E808F374CAEe49D8", IERC721Artifact.abi, ["ApprovalForAll"]);
    }
}

export default new EthereumGaiaStableDAOContract();
