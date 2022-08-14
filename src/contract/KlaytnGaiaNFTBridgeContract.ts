import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Klaytn from "../klaytn/Klaytn";
import KlaytnWallet from "../klaytn/KlaytnWallet";
import GaiaNFTBridgeArtifact from "./abi/gaia-protocol-pfp-bridge/artifacts/contracts/GaiaNFTBridge.sol/GaiaNFTBridge.json";
import GaiaNFTBridgeInterface from "./GaiaNFTBridgeInterface";
import KlaytnContract from "./KlaytnContract";

class KlaytnGaiaNFTBridgeContract extends KlaytnContract implements GaiaNFTBridgeInterface {

    constructor() {
        super("0x3Ac0d778d64C8d7AAbB28cf574B9D5cEbF603764", GaiaNFTBridgeArtifact.abi);
        KlaytnWallet.toss("connect", this);
        this.watch();
    }

    private async watch() {
        let prevBlock = await Klaytn.loadBlockNumber();
        setInterval(async () => {
            const currentBlock = await Klaytn.loadBlockNumber();
            const sendEvents = await this.getSendNFTsEvents(prevBlock, currentBlock);
            for (const event of sendEvents) {
                this.fireEvent("SendNFTs", event.returnValues[0], BigNumber.from(event.returnValues[1]), event.returnValues[2], event.returnValues[3], event.returnValues[4], event.returnValues[5], BigNumber.from(event.returnValues[6]));
            }
            const receiveTokenEvents = await this.getReceiveNFTsEvents(prevBlock, currentBlock);
            for (const event of receiveTokenEvents) {
                this.fireEvent("ReceiveNFTs", event.returnValues[0], BigNumber.from(event.returnValues[1]), event.returnValues[2], event.returnValues[3], event.returnValues[4], event.returnValues[5], BigNumber.from(event.returnValues[6]));
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

    public async receiveNFTs(sender: string, fromChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[], sendingId: BigNumberish, sig: string) {
        await this.runWalletMethod("receiveNFTs", sender, fromChain, receiver, nftName, nftAddress, ids, sendingId, sig);
    }

    public async loadSended(sender: string, toChainId: BigNumberish, receiver: string, nftName: string, nftAddress: string): Promise<{ block: number, sendingId: BigNumber, ids: BigNumber[] }[]> {
        const currentBlock = await Klaytn.loadBlockNumber();
        const events = await this.contract.getPastEvents("SendNFTs", {
            filter: { sender, toChainId, receiver },
            fromBlock: currentBlock - 75000,
            toBlock: currentBlock,
        });
        const results: { block: number, sendingId: BigNumber, ids: BigNumber[] }[] = [];
        for (const event of events) {
            if (
                event.returnValues[3] === nftName &&
                event.returnValues[4] === nftAddress
            ) {
                const ids: BigNumber[] = [];
                for (const id of event.returnValues[5]) {
                    ids.push(BigNumber.from(id));
                }
                console.log(event.block);
                results.push({ block: event.block, sendingId: BigNumber.from(event.returnValues[6]), ids });
            }
        }
        return results;
    }

    public async isNFTsReceived(sender: string, fromChainId: BigNumberish, sendingId: BigNumberish): Promise<boolean> {
        return await this.runMethod("isNFTsReceived", sender, fromChainId, sendingId);
    }
}

export default new KlaytnGaiaNFTBridgeContract();
