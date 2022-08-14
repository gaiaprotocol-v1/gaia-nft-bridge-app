import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Klaytn from "../klaytn/Klaytn";
import KlaytnWallet from "../klaytn/KlaytnWallet";
import GaiaNFTBridgeArtifact from "./abi/gaia-protocol-pfp-bridge/artifacts/contracts/GaiaNFTBridge.sol/GaiaNFTBridge.json";
import GaiaNFTBridgeInterface from "./GaiaNFTBridgeInterface";
//import KAPMContract from "./KAPMContract";
import KlaytnContract from "./KlaytnContract";

class KlaytnGaiaNFTBridgeContract extends KlaytnContract implements GaiaNFTBridgeInterface {

    constructor() {
        super("0x3Ac0d778d64C8d7AAbB28cf574B9D5cEbF603764", GaiaNFTBridgeArtifact.abi);
        KlaytnWallet.toss("connect", this);
        //KAPMContract.toss("Transfer", this);
        //KAPMContract.toss("Approval", this);
        this.watch();
    }

    private async watch() {
        let prevBlock = await Klaytn.loadBlockNumber();
        setInterval(async () => {
            const currentBlock = await Klaytn.loadBlockNumber();
            const sendEvents = await this.getSendNFTsEvents(prevBlock, currentBlock);
            for (const event of sendEvents) {
                console.log(event.returnValues[5]);
                this.fireEvent("SendNFTs", event.returnValues[0], BigNumber.from(event.returnValues[1]), event.returnValues[2], event.returnValues[3], event.returnValues[4], event.returnValues[5], event.returnValues[6]);
            }
            const receiveTokenEvents = await this.getReceiveNFTsEvents(prevBlock, currentBlock);
            for (const event of receiveTokenEvents) {
                this.fireEvent("ReceiveNFTs", event.returnValues[0], BigNumber.from(event.returnValues[1]), event.returnValues[2], event.returnValues[3], event.returnValues[4], event.returnValues[5], event.returnValues[6]);
            }
            prevBlock = currentBlock + 1;
        }, 2000);
    }

    private async getSendNFTsEvents(startBlock: number, endBlock: number) {
        const events = await this.contract.getPastEvents("SendNFTs", {
            fromBlock: startBlock,
            toBlock: endBlock,
        });
        return events;
    }

    private async getReceiveNFTsEvents(startBlock: number, endBlock: number) {
        const events = await this.contract.getPastEvents("ReceiveNFTs", {
            fromBlock: startBlock,
            toBlock: endBlock,
        });
        return events;
    }

    public async loadAddress(): Promise<string | undefined> {
        return await KlaytnWallet.loadAddress();
    }

    public async connect() {
        await KlaytnWallet.connect();
    }

    public async sendNFTs(toChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[]) {
        await this.runWalletMethod("sendNFTs", toChain, receiver, nftName, nftAddress, ids);
    }
}

export default new KlaytnGaiaNFTBridgeContract();
