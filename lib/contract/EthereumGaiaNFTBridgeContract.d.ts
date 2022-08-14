import { BigNumberish } from "@ethersproject/bignumber";
import EthereumContract from "./EthereumContract";
import GaiaNFTBridgeInterface from "./GaiaNFTBridgeInterface";
declare class EthereumGaiaNFTBridgeContract extends EthereumContract<any> implements GaiaNFTBridgeInterface {
    constructor();
    loadAddress(): Promise<string | undefined>;
    connect(): Promise<void>;
    sendNFTs(toChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[]): Promise<void>;
}
declare const _default: EthereumGaiaNFTBridgeContract;
export default _default;
//# sourceMappingURL=EthereumGaiaNFTBridgeContract.d.ts.map