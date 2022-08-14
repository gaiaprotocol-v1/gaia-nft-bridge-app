"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_browser_1 = require("skydapp-browser");
class Sended extends skydapp_browser_1.DomNode {
    constructor(fromSender, toSender, fromChainId, toChainId, sender, receiver, sendingId, retry) {
        super("tbody");
        this.fromSender = fromSender;
        this.toSender = toSender;
        this.fromChainId = fromChainId;
        this.toChainId = toChainId;
        this.sender = sender;
        this.receiver = receiver;
        this.sendingId = sendingId;
        this.retry = retry;
        this.receiveTokenHandler = async (receiver, fromChain, sender, sendId) => {
            if (receiver === this.receiver && fromChain.toNumber() === this.fromChainId && sender === this.sender && sendId.toNumber() === this.sendingId) {
                this.load();
            }
        };
        this.load();
        this.toSender.on("ReceiveToken", this.receiveTokenHandler);
    }
    async load() {
    }
    async loadChain() {
        if (this.fromChainId === 8217) {
            if (this.fromImage !== undefined) {
                this.fromImage.domElement.src = "/images/shared/icn/klaytn.svg";
            }
            this.fromChainText?.empty().appendText("Klaytn");
        }
        else if (this.fromChainId === 1) {
            if (this.fromImage !== undefined) {
                this.fromImage.domElement.src = "/images/shared/icn/ethereum.svg";
            }
            this.fromChainText?.empty().appendText("Ethereum");
        }
        if (this.toChainId === 8217) {
            if (this.toImage !== undefined) {
                this.toImage.domElement.src = "/images/shared/icn/klaytn.svg";
            }
            this.toChainText?.empty().appendText("Klaytn");
        }
        else if (this.toChainId === 1) {
            if (this.toImage !== undefined) {
                this.toImage.domElement.src = "/images/shared/icn/ethereum.svg";
            }
            this.toChainText?.empty().appendText("Ethereum");
        }
    }
    async getFormatting(balance) {
        let balanceDisplay = ethers_1.utils.formatEther(balance);
        balanceDisplay = (+balanceDisplay).toFixed(4);
        return balanceDisplay;
    }
    delete() {
        this.toSender.off("ReceiveToken", this.receiveTokenHandler);
        super.delete();
    }
}
exports.default = Sended;
//# sourceMappingURL=Sended.js.map