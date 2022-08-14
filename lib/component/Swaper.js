"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const EthereumWallet_1 = __importDefault(require("../ethereum/EthereumWallet"));
const Form_1 = __importDefault(require("./Form"));
const NftItem_1 = __importDefault(require("./NftItem"));
const Sended_1 = __importDefault(require("./Sended"));
const Alert_1 = __importDefault(require("./shared/dialogue/Alert"));
class Swaper extends skydapp_browser_1.DomNode {
    constructor() {
        super(".swaper");
        this.store = new skydapp_browser_1.Store("store");
        this.selectedIds = [];
        this.loadHistoryNonce = 0;
        const savedFromChainId = this.store.get("from");
        const savedToChainId = this.store.get("to");
        const savedNFTName = this.store.get("nft");
        this.append((0, skydapp_browser_1.el)("section.swap-container", (0, skydapp_browser_1.el)("header", (0, skydapp_browser_1.el)("h1", "GAIA BRIDGE"), (0, skydapp_browser_1.el)("p", "NFT SWAP")), (0, skydapp_browser_1.el)(".form-container", (this.fromForm = new Form_1.default(this, savedFromChainId === undefined ? 8217 : savedFromChainId, savedNFTName === undefined ? "GENESIS" : savedNFTName, true)), (0, skydapp_browser_1.el)("a", {
            click: () => {
                const fromChainId = this.fromForm.chainId;
                this.fromForm.changeChain(this.toForm.chainId);
                this.toForm.changeChain(fromChainId);
                this.getApprove(this.fromForm.chainId);
                this.loadHistory();
                this.store.set("from", this.fromForm.chainId);
                this.store.set("to", this.toForm.chainId);
            }
        }, (0, skydapp_browser_1.el)("img.arrow", { src: "/images/shared/icn/arrow-right.svg", height: "50", alt: "arrow-right" })), (this.toForm = new Form_1.default(this, savedToChainId === undefined ? 1 : savedToChainId, savedNFTName === undefined ? "GENESIS" : savedNFTName))), (0, skydapp_browser_1.el)(".amount-container", (0, skydapp_browser_1.el)(".title-container", (0, skydapp_browser_1.el)(".title", "NFTs")), (0, skydapp_browser_1.el)(".tab-container", (0, skydapp_browser_1.el)("a.genesis", "Genesis", {
            click: () => {
                this.fromForm.changeNFT("GENESIS");
                this.toForm.changeNFT("GENESIS");
                this.loadHistory();
                this.store.set("nft", "GENESIS");
            },
        }), (0, skydapp_browser_1.el)("a.supernova", "Super nova", {
            click: () => {
                this.fromForm.changeNFT("SUPERNOVA");
                this.toForm.changeNFT("SUPERNOVA");
                this.loadHistory();
                this.store.set("nft", "SUPERNOVA");
            },
        }), (0, skydapp_browser_1.el)("a.stable", "Stable DAO", {
            click: () => {
                this.fromForm.changeNFT("STABLEDAO");
                this.toForm.changeNFT("STABLEDAO");
                this.loadHistory();
                this.store.set("nft", "STABLEDAO");
            },
        })), this.nftList = (0, skydapp_browser_1.el)(".nft-container")), (0, skydapp_browser_1.el)(".warning-container", (0, skydapp_browser_1.el)(".content", (0, skydapp_browser_1.el)("img", { src: "/images/shared/icn/warning.png", alt: "warning.svg" }), (0, skydapp_browser_1.el)("p", "브릿지 이용 시 양 체인에 가스비가 발생됩니다.\n보내는 체인이 이더리움일 경우 32컨펌 후 Claim 서명이 필요합니다"))), (0, skydapp_browser_1.el)(".button-container", (0, skydapp_browser_1.el)(".content", this.approveButton = (0, skydapp_browser_1.el)("button", "Approve\nNFT 사용 허가", {
            "disabled": "",
            click: async () => {
            }
        }), (0, skydapp_browser_1.el)("button", "Transfer\n전송하기", {
            click: () => { }
        })))), (0, skydapp_browser_1.el)("section.history-container", (0, skydapp_browser_1.el)(".title", "전송 이력"), (0, skydapp_browser_1.el)("p", "트랜잭션이 한번 시작되면 되돌릴 수 없습니다.\nTransfer후 Claim 까지 완료되어야 체인 간 전송이 완료됩니다"), this.sendedList = (0, skydapp_browser_1.el)("table", (0, skydapp_browser_1.el)("thead", (0, skydapp_browser_1.el)("tr", (0, skydapp_browser_1.el)("td", "From Chain"), (0, skydapp_browser_1.el)("td", "To Chain"), (0, skydapp_browser_1.el)("td", "Name"), (0, skydapp_browser_1.el)("td", "Fee"), (0, skydapp_browser_1.el)("td", "Time"), (0, skydapp_browser_1.el)("td", "Status"))))));
        this.getApprove(1);
        this.fromForm.on("changeChain", (chainId, originChainId) => {
            if (this.toForm.chainId === chainId) {
                this.toForm.changeChain(originChainId);
            }
            this.loadHistory();
            this.store.set("from", this.fromForm.chainId);
            this.store.set("to", this.toForm.chainId);
        });
        this.toForm.on("changeChain", (chainId, originChainId) => {
            if (this.fromForm.chainId === chainId) {
                this.fromForm.changeChain(originChainId);
            }
            this.loadHistory();
            this.store.set("from", this.fromForm.chainId);
            this.store.set("to", this.toForm.chainId);
        });
        this.fromForm.on("load", (tokenIds) => {
            this.nftList.empty();
            this.selectedIds = [];
            const name = this.store.get("nft")?.toLowerCase();
            for (const tokenId of tokenIds) {
                const item = new NftItem_1.default(name === undefined ? "genesis" : name, tokenId).appendTo(this.nftList);
                item.on("selected", () => {
                    if (this.selectedIds.length === 10) {
                        new Alert_1.default("오류", "최대 10개까지 선택이 가능합니다.");
                        item.deselect();
                    }
                    else {
                        this.selectedIds.push(tokenId);
                    }
                });
                item.on("deselected", () => skydapp_common_1.SkyUtil.pull(this.selectedIds, tokenId));
            }
        });
        this.loadHistory();
        this.fromForm.on("connect", () => this.loadHistory());
        this.toForm.on("connect", () => this.loadHistory());
    }
    numberWithCommas(x, fixed = 3) {
        const parts = String(+(+x).toFixed(fixed)).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    async getApprove(amount) {
        const owner = await EthereumWallet_1.default.loadAddress();
    }
    async loadHistory() {
        const owner = await this.fromForm.sender.loadAddress();
        if (this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined) {
            const sender = await this.fromForm.sender.loadAddress();
            const receiver = await this.toForm.sender.loadAddress();
            if (sender !== undefined && receiver !== undefined) {
            }
        }
    }
    addSended(sender, receiver, sendingId) {
        if (this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined) {
            new Sended_1.default(this.fromForm.sender, this.toForm.sender, this.fromForm.chainId, this.toForm.chainId, sender, receiver, sendingId.toNumber(), async () => {
                if (this.fromForm.sender !== undefined) {
                }
            }).appendTo(this.sendedList, 0);
        }
    }
    async send(nftName, nftAddress, ids) {
        if (this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined) {
            const receiver = await this.toForm.sender.loadAddress();
            if (receiver !== undefined) {
                await this.fromForm.sender.sendNFTs(this.toForm.chainId, receiver, nftName, nftAddress, ids);
            }
        }
    }
    async receive(sender, toChainId, _receiver, sendingId, amount) {
        if (this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined &&
            this.toForm.chainId.toString() === toChainId.toString()) {
            const receiver = await this.toForm.sender.loadAddress();
            if (receiver === _receiver) {
                try {
                }
                catch (error) {
                    alert(`Error: ${error.message}`);
                }
            }
        }
    }
}
exports.default = Swaper;
//# sourceMappingURL=Swaper.js.map