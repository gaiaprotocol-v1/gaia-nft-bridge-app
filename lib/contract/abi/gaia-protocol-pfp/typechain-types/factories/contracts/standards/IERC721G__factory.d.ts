import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC721G, IERC721GInterface } from "../../../contracts/standards/IERC721G";
export declare class IERC721G__factory {
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
    static createInterface(): IERC721GInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC721G;
}
//# sourceMappingURL=IERC721G__factory.d.ts.map