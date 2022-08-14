import IERC721Artifact from "./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import ERC721Contract from "./ethereum-standard/ERC721Contract";

class EthereumGaiaSupernovaContract extends ERC721Contract<any> {

    constructor() {
        super("0xe7df0DcA32eb23F4182055dC6a2053A3fF239315", IERC721Artifact.abi, ["ApprovalForAll"]);
    }
}

export default new EthereumGaiaSupernovaContract();
