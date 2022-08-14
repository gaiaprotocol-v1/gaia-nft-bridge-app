import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import EthereumNetworkProvider from "../ethereum/EthereumNetworkProvider";
import EthereumWallet from "../ethereum/EthereumWallet";
import GaiaNFTBridgeArtifact from "./abi/gaia-protocol-pfp-bridge/artifacts/contracts/GaiaNFTBridge.sol/GaiaNFTBridge.json";
//import APMCoinContract from "./APMCoinContract";
import EthereumContract from "./EthereumContract";
import GaiaNFTBridgeInterface from "./GaiaNFTBridgeInterface";

class EthereumGaiaNFTBridgeContract extends EthereumContract<any> implements GaiaNFTBridgeInterface {

    constructor() {
        super("0xe8C18687E9879094847bD45B3c7373f1241ea86d", GaiaNFTBridgeArtifact.abi, [
            "SendNFTs",
            "ReceiveNFTs",
        ]);
        //APMCoinContract.toss("Transfer", this);
        //APMCoinContract.toss("Approval", this);
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
            //if ((await APMCoinContract.allowance(owner, this.address)).lt(amount)) {
            //    await APMCoinContract.approve(this.address, constants.MaxUint256);
            //} else {
            //    const contract = await this.connectAndGetWalletContract();
            //    await contract?.sendToken(toChain, receiver, amount, data);
            //}
        }
    }

    public async receiveNFTs(sender: string, fromChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[], sendingId: BigNumberish, sig: string) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.receiveNFTs(sender, fromChain, receiver, nftName, nftAddress, ids, sendingId, sig);
    }

    public async loadSended(sender: string, toChainId: BigNumberish, receiver: string, nftName: string, nftAddress: string): Promise<{ sendingId: BigNumber, ids: BigNumber[] }[]> {
        const filter = this.contract.filters.SendNFTs(sender, toChainId, receiver);
        const currentBlock = await EthereumNetworkProvider.getBlockNumber();
        const events = await this.contract.queryFilter(filter, currentBlock - 5000, currentBlock);
        const results: { sendingId: BigNumber, ids: BigNumber[] }[] = [];
        for (const event of events) {
            if (
                event.args.nftName === nftName &&
                event.args.nftAddress === nftAddress
            ) {
                results.push({ sendingId: event.args.sendingId, ids: event.args.ids });
            }
        }
        return results;
    }
}

export default new EthereumGaiaNFTBridgeContract();
