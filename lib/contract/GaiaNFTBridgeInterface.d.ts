import { BigNumber, BigNumberish } from "ethers";
export default interface GaiaNFTBridgeInterface {
    on(eventName: string, eventHandler: any): void;
    off(eventName: string, eventHandler: any): void;
    loadAddress(): Promise<string | undefined>;
    connect(): Promise<void>;
    sendNFTs(toChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[]): Promise<void>;
    receiveNFTs(sender: string, fromChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[], sendingId: BigNumberish, sig: string): Promise<void>;
    loadSended(sender: string, toChainId: BigNumberish, receiver: string, nftName: string, nftAddress: string): Promise<{
        sendingId: BigNumber;
        ids: BigNumber[];
    }[]>;
}
//# sourceMappingURL=GaiaNFTBridgeInterface.d.ts.map