import { ethers } from "ethers";
import { EventContainer } from "skydapp-common";

class EthereumNetworkProvider extends EventContainer {

    private ethereum: any | undefined = (window as any).ethereum;
    private get existsInjectedProvider() { return this.ethereum !== undefined; }

    public provider: ethers.providers.JsonRpcProvider;
    public signer: ethers.providers.JsonRpcSigner;

    constructor() {
        super();
        if (this.existsInjectedProvider === true) {
            this.provider = new ethers.providers.Web3Provider(this.ethereum);
        } else {
            this.provider = new ethers.providers.WebSocketProvider("wss://mainnet.infura.io/ws/v3/4d08e8ac01134ac0abe286403de9e9ac");
        }
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
