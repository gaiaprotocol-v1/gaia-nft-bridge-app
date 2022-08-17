"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_common_1 = require("skydapp-common");
class EthereumNetworkProvider extends skydapp_common_1.EventContainer {
    constructor() {
        super();
        this.ethereum = window.ethereum;
        if (this.existsInjectedProvider === true) {
            this.provider = new ethers_1.ethers.providers.Web3Provider(this.ethereum);
        }
        else {
            this.provider = new ethers_1.ethers.providers.WebSocketProvider("wss://mainnet.infura.io/ws/v3/4d08e8ac01134ac0abe286403de9e9ac");
        }
        this.signer = this.provider.getSigner(ethers_1.ethers.constants.AddressZero);
    }
    get existsInjectedProvider() { return this.ethereum !== undefined; }
    async getBlockNumber() {
        return await this.provider.getBlockNumber();
    }
    async getBalance(address) {
        return await this.provider.getBalance(address);
    }
}
exports.default = new EthereumNetworkProvider();
//# sourceMappingURL=EthereumNetworkProvider.js.map