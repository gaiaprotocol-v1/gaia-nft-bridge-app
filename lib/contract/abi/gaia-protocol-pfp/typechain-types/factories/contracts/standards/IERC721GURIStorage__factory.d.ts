import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC721GURIStorage, IERC721GURIStorageInterface } from "../../../contracts/standards/IERC721GURIStorage";
export declare class IERC721GURIStorage__factory {
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
    static createInterface(): IERC721GURIStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC721GURIStorage;
}
//# sourceMappingURL=IERC721GURIStorage__factory.d.ts.map