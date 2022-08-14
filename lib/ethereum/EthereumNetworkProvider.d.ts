import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";
declare class EthereumNetworkProvider extends EventContainer {
    provider: ethers.providers.JsonRpcProvider;
    signer: ethers.providers.JsonRpcSigner;
    constructor();
    getBlockNumber(): Promise<number>;
    getBalance(address: string): Promise<ethers.BigNumber>;
}
declare const _default: EthereumNetworkProvider;
export default _default;
//# sourceMappingURL=EthereumNetworkProvider.d.ts.map