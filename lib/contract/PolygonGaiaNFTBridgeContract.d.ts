import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import PolygonContract from "./PolygonContract";
import GaiaNFTBridgeInterface from "./GaiaNFTBridgeInterface";
declare class PolygonGaiaNFTBridgeContract extends PolygonContract<any> implements GaiaNFTBridgeInterface {
    constructor();
    loadAddress(): Promise<string | undefined>;
    connect(): Promise<void>;
    sendNFTs(toChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[]): Promise<void>;
    receiveNFTs(sender: string, fromChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[], sendingId: BigNumberish, sig: string): Promise<void>;
    loadSended(sender: string, toChainId: BigNumberish, receiver: string, nftName: string, nftAddress: string): Promise<{
        block: number;
        sendingId: BigNumber;
        ids: BigNumber[];
    }[]>;
    isNFTsReceived(sender: string, fromChainId: BigNumberish, sendingId: BigNumberish): Promise<boolean>;
}
declare const _default: PolygonGaiaNFTBridgeContract;
export default _default;
//# sourceMappingURL=PolygonGaiaNFTBridgeContract.d.ts.map