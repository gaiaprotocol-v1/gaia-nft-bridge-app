import { BigNumber } from "@ethersproject/bignumber";
import { EventContainer } from "skydapp-common";
import ConnectWalletPopup from "../component/shared/ConnectWalletPopup";
import ExtWallet from "../klaytn/Kaikas";
import Klaytn from "../klaytn/Klaytn";
import KlaytnWallet from "../klaytn/KlaytnWallet";
import Klip from "../klaytn/Klip";

export default abstract class KlaytnContract extends EventContainer {

    private walletContract: any | undefined;
    protected contract: any;

    constructor(public address: string, private abi: any) {
        super();
        this.contract = Klaytn.createContract(address, abi);
    }

    private findMethodABI(name: string) {
        return this.abi.filter((abi: any) => abi.name === name && abi.type === "function")[0];
    }

    public async loadExtWalletContract() {
        if (await ExtWallet.loadChainId() !== 8217) {
            this.fireEvent("wrongNetwork");
            console.error("Wrong Network");
        } else {
            if (await ExtWallet.connected() !== true) {
                await ExtWallet.connect();
            }
            if (this.walletContract === undefined) {
                this.walletContract = ExtWallet.createContract(this.address, this.abi);
            }
            return this.walletContract;
        }
    }

    protected async runMethod(methodName: string, ...params: any[]) {
        return await this.contract.methods[methodName](...params).call();
    }

    private async runWalletMethodWithGas(methodName: string, gas: number, ...params: any[]) {
        if (ExtWallet.installed === true) {
            const from = await KlaytnWallet.loadAddress();
            const contract = await this.loadExtWalletContract();
            await contract?.methods[methodName](...params).send({ from, gas });
        } else if (Klip.connected === true) {
            await Klip.runContractMethod(this.address, this.findMethodABI(methodName), params);
        } else {
            return new Promise<void>((resolve) => new ConnectWalletPopup(resolve));
        }
    }

    protected async runWalletMethod(methodName: string, ...params: any[]) {
        return this.runWalletMethodWithGas(methodName, 1500000, ...params);
    }

    protected async runWalletMethodWithLargeGas(methodName: string, ...params: any[]) {
        return this.runWalletMethodWithGas(methodName, 20000000, ...params);
    }

    protected async runWalletMethodWithValue(value: BigNumber, methodName: string, ...params: any[]) {
        if (ExtWallet.installed === true) {
            const from = await KlaytnWallet.loadAddress();
            const contract = await this.loadExtWalletContract();
            await contract?.methods[methodName](...params).send({ from, gas: 1500000, value });
        } else if (Klip.connected === true) {
            await Klip.runContractMethod(this.address, this.findMethodABI(methodName), params, value.toString());
        } else {
            return new Promise<void>((resolve) => new ConnectWalletPopup(resolve));
        }
    }
}
