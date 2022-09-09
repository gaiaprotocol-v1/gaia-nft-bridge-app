import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";

class EthereumNetworkProvider extends EventContainer {

    public provider: ethers.providers.JsonRpcProvider;
    public signer: ethers.providers.JsonRpcSigner;

    constructor() {
        super();
        this.provider = new ethers.providers.StaticJsonRpcProvider("https://mainnet.infura.io/v3/4d08e8ac01134ac0abe286403de9e9ac");
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
