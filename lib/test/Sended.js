"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_browser_1 = require("skydapp-browser");
const Alert_1 = __importDefault(require("./shared/dialogue/Alert"));
class Sended extends skydapp_browser_1.DomNode {
    constructor(fromSender, toSender, fromChainId, toChainId, sender, receiver, sendingId, ids, retry) {
        super("tr");
        this.fromSender = fromSender;
        this.toSender = toSender;
        this.fromChainId = fromChainId;
        this.toChainId = toChainId;
        this.sender = sender;
        this.receiver = receiver;
        this.sendingId = sendingId;
        this.ids = ids;
        this.retry = retry;
        this.receiveTokenHandler = async (sender, fromChainId, receiver, nftName, nftAddress, ids, sendingId) => {
            if (sender === this.sender && fromChainId.toNumber() === this.fromChainId && receiver === this.receiver && sendingId.toNumber() === this.sendingId) {
                new Alert_1.default("전송 완료", "전송이 완료됐습니다.");
                this.load();
            }
        };
        this.load();
        this.toSender.on("ReceiveNFTs", this.receiveTokenHandler);
    }
    async load() {
        const received = await this.toSender.isNFTsReceived(this.sender, this.fromChainId, this.sendingId);
        this.empty().append((0, skydapp_browser_1.el)("td", (0, skydapp_browser_1.el)(".chain-container", this.fromImage = (0, skydapp_browser_1.el)("img", { src: "/images/shared/icn/ethereum.svg", alt: "ethereum" }), this.fromChainText = (0, skydapp_browser_1.el)("p", this.fromChainId === 1 ? "Ethereum" : "Klaytn"))), (0, skydapp_browser_1.el)("td", (0, skydapp_browser_1.el)(".chain-container", this.toImage = (0, skydapp_browser_1.el)("img", { src: "/images/shared/icn/klaytn.svg", alt: "klaytn" }), this.toChainText = (0, skydapp_browser_1.el)("p", this.fromChainId === 1 ? "Klaytn" : "Ethereum"))), (0, skydapp_browser_1.el)("td", (0, skydapp_browser_1.el)("p", `${this.ids.length} 개`)), (0, skydapp_browser_1.el)("td", received === true ? (0, skydapp_browser_1.el)("button", "Done", { "disabled": "" }) : (0, skydapp_browser_1.el)("button", "Retry", {
            click: () => this.retry(),
        })));
        this.loadChain();
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
        this.toSender.off("ReceiveNFTs", this.receiveTokenHandler);
        super.delete();
    }
}
exports.default = Sended;
//# sourceMappingURL=Sended.js.map