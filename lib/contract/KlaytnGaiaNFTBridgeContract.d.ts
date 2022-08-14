import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import GaiaNFTBridgeInterface from "./GaiaNFTBridgeInterface";
import KlaytnContract from "./KlaytnContract";
declare class KlaytnGaiaNFTBridgeContract extends KlaytnContract implements GaiaNFTBridgeInterface {
    constructor();
    private watch;
    private getSendNFTsEvents;
    private getReceiveNFTsEvents;
    loadAddress(): Promise<string | undefined>;
    connect(): Promise<void>;
    sendNFTs(toChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[]): Promise<void>;
    receiveNFTs(sender: string, fromChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[], sendingId: BigNumberish, sig: string): Promise<void>;
    loadSended(sender: string, toChainId: BigNumberish, receiver: string, nftName: string, nftAddress: string): Promise<{
        sendingId: BigNumber;
        ids: BigNumber[];
    }[]>;
    isNFTsReceived(sender: string, fromChainId: BigNumberish, sendingId: BigNumberish): Promise<boolean>;
}
declare const _default: KlaytnGaiaNFTBridgeContract;
export default _default;
//# sourceMappingURL=KlaytnGaiaNFTBridgeContract.d.ts.map