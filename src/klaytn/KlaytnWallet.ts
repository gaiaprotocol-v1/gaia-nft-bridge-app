import { EventContainer } from "skydapp-common";
import ConnectWalletPopup from "../component/shared/ConnectWalletPopup";
import Kaikas from "./Kaikas";
import Klip from "./Klip";

class KlaytnWallet extends EventContainer {

    constructor() {
        super();
        this.checkConnected();

        Kaikas.toss("connect", this);
        Klip.toss("connect", this);
    }

    private async checkConnected() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }

    public async loadAddress(): Promise<string | undefined> {
        if (Kaikas.installed === true) {
            return await Kaikas.loadAddress();
        } else {
            return Klip.address;
        }
    }

    public async connected() {
        return await this.loadAddress() !== undefined;
    }

    public async connect() {
        if (Kaikas.installed === true) {
            return await Kaikas.connect();
        } else {
            return new Promise<void>((resolve) => new ConnectWalletPopup(resolve));
        }
    }

    public async disconnect() {
    }

    public async loadChainId() {
        if (Kaikas.installed === true) {
            return await Kaikas.loadChainId();
        } else {
            return 8127;
        }
    }

    public async addToken(
        address: string,
        symbol: string,
        decimals: number,
        image: string,
    ) {
        if (await this.loadChainId() !== 8217) {
            this.fireEvent("wrongNetwork");
            console.error("Wrong Network");
        } else {
            Kaikas.addToken(address, symbol, decimals, image);
        }
    }
}

export default new KlaytnWallet();
