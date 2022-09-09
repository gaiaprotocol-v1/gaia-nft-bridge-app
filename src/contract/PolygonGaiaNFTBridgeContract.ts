import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import PolygonNetworkProvider from "../polygon/PolygonNetworkProvider";
import PolygonWallet from "../polygon/PolygonWallet";
import GaiaNFTBridgeArtifact from "./abi/gaia-protocol-pfp-bridge/artifacts/contracts/GaiaNFTBridge.sol/GaiaNFTBridge.json";
import PolygonContract from "./PolygonContract";
import GaiaNFTBridgeInterface from "./GaiaNFTBridgeInterface";

class PolygonGaiaNFTBridgeContract extends PolygonContract<any> implements GaiaNFTBridgeInterface {

    constructor() {
        super("0x1640C880E14F8913bA71644F6812eE58EAeF412F", GaiaNFTBridgeArtifact.abi, [
            "SendNFTs",
            "ReceiveNFTs",
        ]);
        PolygonWallet.toss("connect", this);
    }

    public async loadAddress(): Promise<string | undefined> {
        return await PolygonWallet.loadAddress();
    }

    public async connect() {
        await PolygonWallet.connect();
    }

    public async sendNFTs(toChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[]) {
        const owner = await PolygonWallet.loadAddress();
        if (owner !== undefined) {
            const contract = await this.connectAndGetWalletContract();
            await contract?.sendNFTs(toChain, receiver, nftName, nftAddress, ids);
        }
    }

    public async receiveNFTs(sender: string, fromChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[], sendingId: BigNumberish, sig: string) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.receiveNFTs(sender, fromChain, receiver, nftName, nftAddress, ids, sendingId, sig);
    }

    public async loadSended(sender: string, toChainId: BigNumberish, receiver: string, nftName: string, nftAddress: string): Promise<{ block: number, sendingId: BigNumber, ids: BigNumber[] }[]> {
        const filter = this.contract.filters.SendNFTs(sender, toChainId, receiver);
        const currentBlock = await PolygonNetworkProvider.getBlockNumber();
        const events = await this.contract.queryFilter(filter, currentBlock - 10000, currentBlock);
        const results: { block: number, sendingId: BigNumber, ids: BigNumber[] }[] = [];
        for (const event of events) {
            if (
                event.args.nftName === nftName &&
                event.args.nftAddress === nftAddress
            ) {
                results.push({ block: event.blockNumber, sendingId: event.args.sendingId, ids: event.args.ids });
            }
        }
        return results;
    }

    public async isNFTsReceived(sender: string, fromChainId: BigNumberish, sendingId: BigNumberish): Promise<boolean> {
        return await this.contract.isNFTsReceived(sender, fromChainId, sendingId)
    }
}

export default new PolygonGaiaNFTBridgeContract();
