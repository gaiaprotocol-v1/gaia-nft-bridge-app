import { BigNumber } from "ethers";
import Config from "../Config";
import Klaytn from "../klaytn/Klaytn";
import IERC721Artifact from "./abi/gaia-protocol-pfp/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import ERC721Contract from "./ethereum-standard/ERC721Contract";
import KIP17Contract from "./klaytn-standard/KIP17Contract";

class KlaytnGaiaStableDAOContract extends KIP17Contract {

    constructor() {
        super("0x5428dB8Fd0063390b3357D78d56f183D6755A446", IERC721Artifact.abi);
        this.watch();
    }

    private async watch() {
        let prevBlock = await Klaytn.loadBlockNumber();
        /*setInterval(async () => {
            const currentBlock = await Klaytn.loadBlockNumber();
            const transferEvents = await this.getTransferEvents(prevBlock, currentBlock);
            for (const event of transferEvents) {
                this.fireEvent("Transfer", event.returnValues[0], event.returnValues[1], BigNumber.from(event.returnValues[2]));
            }
            const approvalEvents = await this.getApprovalEvents(prevBlock, currentBlock);
            for (const event of approvalEvents) {
                this.fireEvent("Approval", event.returnValues[0], event.returnValues[1], BigNumber.from(event.returnValues[2]));
            }
            prevBlock = currentBlock + 1;
        }, 2000);*/
    }
}

export default new KlaytnGaiaStableDAOContract();
