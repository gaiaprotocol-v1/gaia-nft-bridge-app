import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import EthereumNetworkProvider from "../ethereum/EthereumNetworkProvider";
import EthereumWallet from "../ethereum/EthereumWallet";
import GaiaNFTBridgeArtifact from "./abi/gaia-protocol-pfp-bridge/artifacts/contracts/GaiaNFTBridge.sol/GaiaNFTBridge.json";
import EthereumContract from "./EthereumContract";
import GaiaNFTBridgeInterface from "./GaiaNFTBridgeInterface";

class EthereumGaiaNFTBridgeContract extends EthereumContract<any> implements GaiaNFTBridgeInterface {

    constructor() {
        super("0xe8C18687E9879094847bD45B3c7373f1241ea86d", GaiaNFTBridgeArtifact.abi, [
            "SendNFTs",
            "ReceiveNFTs",
        ]);
        EthereumWallet.toss("connect", this);
    }

    public async loadAddress(): Promise<string | undefined> {
        return await EthereumWallet.loadAddress();
    }

    public async connect() {
        await EthereumWallet.connect();
    }

    public async sendNFTs(toChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[]) {
        const owner = await EthereumWallet.loadAddress();
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
        const currentBlock = await EthereumNetworkProvider.getBlockNumber();
        const events = await this.contract.queryFilter(filter, currentBlock - 75000, currentBlock);
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

export default new EthereumGaiaNFTBridgeContract();
