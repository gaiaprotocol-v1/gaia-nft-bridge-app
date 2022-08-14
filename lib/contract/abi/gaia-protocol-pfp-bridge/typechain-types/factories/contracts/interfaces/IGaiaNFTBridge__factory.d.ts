import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IGaiaNFTBridge, IGaiaNFTBridgeInterface } from "../../../contracts/interfaces/IGaiaNFTBridge";
export declare class IGaiaNFTBridge__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): IGaiaNFTBridgeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IGaiaNFTBridge;
}
//# sourceMappingURL=IGaiaNFTBridge__factory.d.ts.map