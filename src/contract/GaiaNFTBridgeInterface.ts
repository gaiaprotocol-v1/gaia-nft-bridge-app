import { BigNumberish } from "ethers";

export default interface GaiaNFTBridgeInterface {

    on(eventName: string, eventHandler: any): void;
    off(eventName: string, eventHandler: any): void;

    loadAddress(): Promise<string | undefined>;
    connect(): Promise<void>;

    sendNFTs(toChain: BigNumberish, receiver: string, nftName: string, nftAddress: string, ids: BigNumberish[]): Promise<void>;
}