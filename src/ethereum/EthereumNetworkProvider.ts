import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";

class EthereumNetworkProvider extends EventContainer {

    public provider: ethers.providers.JsonRpcProvider;
    public signer: ethers.providers.JsonRpcSigner;

    constructor() {
        super();
        this.provider = new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com");
        this.signer = this.provider.getSigner(ethers.constants.AddressZero);
    }

    public async getBlockNumber() {
        return await this.provider.getBlockNumber();
    }

    public async getBalance(address: string) {
        return await this.provider.getBalance(address);
    }
}

export default new EthereumNetworkProvider();
