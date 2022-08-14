"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Config_1 = __importDefault(require("../Config"));
const EthereumGaiaNFTBridgeContract_1 = __importDefault(require("../contract/EthereumGaiaNFTBridgeContract"));
const KlaytnGaiaNFTBridgeContract_1 = __importDefault(require("../contract/KlaytnGaiaNFTBridgeContract"));
const Contracts_1 = __importDefault(require("../Contracts"));
const EthereumWallet_1 = __importDefault(require("../ethereum/EthereumWallet"));
const KlaytnWallet_1 = __importDefault(require("../klaytn/KlaytnWallet"));
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
                this.getApprove(this.fromForm.chainId);
            },
        }), (0, skydapp_browser_1.el)("a.supernova", "Super nova", {
            click: () => {
                this.fromForm.changeNFT("SUPERNOVA");
                this.toForm.changeNFT("SUPERNOVA");
                this.loadHistory();
                this.store.set("nft", "SUPERNOVA");
                this.getApprove(this.fromForm.chainId);
            },
        }), (0, skydapp_browser_1.el)("a.stable", "Stable DAO", {
            click: () => {
                this.fromForm.changeNFT("STABLEDAO");
                this.toForm.changeNFT("STABLEDAO");
                this.loadHistory();
                this.store.set("nft", "STABLEDAO");
                this.getApprove(this.fromForm.chainId);
            },
        })), this.nftList = (0, skydapp_browser_1.el)(".nft-container")), (0, skydapp_browser_1.el)(".warning-container", (0, skydapp_browser_1.el)(".content", (0, skydapp_browser_1.el)("img", { src: "/images/shared/icn/warning.png", alt: "warning.svg" }), (0, skydapp_browser_1.el)("p", "브릿지 이용 시 양 체인에 가스비가 발생됩니다."))), (0, skydapp_browser_1.el)(".button-container", (0, skydapp_browser_1.el)(".content", this.approveButton = (0, skydapp_browser_1.el)("button", "Approve\nNFT 사용 허가", {
            click: async () => {
                const fromChainId = this.fromForm.chainId;
                if (fromChainId === 1) {
                    this.fromForm.nftContract.setApprovalForAll(EthereumGaiaNFTBridgeContract_1.default.address, true);
                }
                else if (fromChainId === 8217) {
                    this.fromForm.nftContract.setApprovalForAll(KlaytnGaiaNFTBridgeContract_1.default.address, true);
                }
                this.getApprove(fromChainId);
            }
        }), this.transferButton = (0, skydapp_browser_1.el)("button", "Transfer\n전송하기", {
            click: () => {
                if (this.selectedIds.length === 0) {
                    new Alert_1.default("오류", "선택된 NFT가 없습니다.");
                }
                else {
                    const nftName = this.store.get("nft") ?? "GENESIS";
                    this.send(nftName, this.fromForm.nftContract.address, this.selectedIds);
                }
            },
        })))), (0, skydapp_browser_1.el)("section.history-container", (0, skydapp_browser_1.el)(".title", "전송 이력"), (0, skydapp_browser_1.el)("p", "트랜잭션이 한번 시작되면 되돌릴 수 없습니다.\nTransfer후 Claim 까지 완료되어야 체인 간 전송이 완료됩니다"), (0, skydapp_browser_1.el)("table", (0, skydapp_browser_1.el)("thead", (0, skydapp_browser_1.el)("tr", (0, skydapp_browser_1.el)("td", "From Chain"), (0, skydapp_browser_1.el)("td", "To Chain"), (0, skydapp_browser_1.el)("td", "개수"), (0, skydapp_browser_1.el)("td", "Status"))), this.sendedList = (0, skydapp_browser_1.el)("tbody"))));
        this.getApprove(savedFromChainId === undefined ? 8217 : savedFromChainId);
        this.fromForm.on("changeChain", (chainId, originChainId) => {
            if (this.toForm.chainId === chainId) {
                this.toForm.changeChain(originChainId);
            }
            this.getApprove(chainId);
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
            const name = (this.store.get("nft") ?? "GENESIS").toLowerCase();
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
        this.fromForm.on("approved", () => this.getApprove(this.fromForm.chainId));
    }
    numberWithCommas(x, fixed = 3) {
        const parts = String(+(+x).toFixed(fixed)).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    async getApprove(chainId) {
        const nftName = this.store.get("nft") ?? "GENESIS";
        const contract = Contracts_1.default[chainId][nftName];
        if (chainId === 1) {
            const owner = await EthereumWallet_1.default.loadAddress();
            if (owner !== undefined) {
                if (await contract.isApprovedForAll(owner, EthereumGaiaNFTBridgeContract_1.default.address) !== true) {
                    this.approveButton.domElement.disabled = false;
                    this.transferButton.domElement.disabled = true;
                }
                else {
                    this.approveButton.domElement.disabled = true;
                    this.transferButton.domElement.disabled = false;
                }
            }
        }
        else if (chainId === 8217) {
            const owner = await KlaytnWallet_1.default.loadAddress();
            if (owner !== undefined) {
                if (await contract.isApprovedForAll(owner, KlaytnGaiaNFTBridgeContract_1.default.address) !== true) {
                    this.approveButton.domElement.disabled = false;
                    this.transferButton.domElement.disabled = true;
                }
                else {
                    this.approveButton.domElement.disabled = true;
                    this.transferButton.domElement.disabled = false;
                }
            }
        }
    }
    async loadHistory() {
        this.sendedList.empty();
        if (this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined) {
            const sender = await this.fromForm.sender.loadAddress();
            const receiver = await this.toForm.sender.loadAddress();
            if (sender !== undefined && receiver !== undefined) {
                const nftName = this.store.get("nft") ?? "GENESIS";
                const sended = await this.fromForm.sender.loadSended(sender, this.toForm.chainId, receiver, nftName, this.fromForm.nftContract.address);
                this.loadHistoryNonce += 1;
                const nonce = this.loadHistoryNonce;
                for (const data of sended) {
                    if (this.loadHistoryNonce === nonce) {
                        this.addSended(sender, receiver, data.sendingId, data.ids, data.block);
                    }
                }
            }
        }
    }
    addSended(sender, receiver, sendingId, ids, block) {
        if (this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined) {
            new Sended_1.default(this.fromForm.sender, this.toForm.sender, this.fromForm.chainId, this.toForm.chainId, sender, receiver, sendingId.toNumber(), ids, async () => {
                if (this.fromForm.sender !== undefined) {
                    this.receive(sender, ethers_1.BigNumber.from(this.toForm.chainId), receiver, ids, sendingId, block);
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
    async receive(sender, toChainId, _receiver, ids, sendingId, block) {
        if (this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined &&
            this.toForm.chainId.toString() === toChainId.toString()) {
            const receiver = await this.toForm.sender.loadAddress();
            if (receiver === _receiver) {
                try {
                    const nftName = this.store.get("nft") ?? "GENESIS";
                    const params = new URLSearchParams();
                    if (block !== undefined) {
                        params.set("block", String(block));
                    }
                    params.set("fromChainId", String(this.fromForm.chainId));
                    params.set("toChainId", String(this.toForm.chainId));
                    params.set("sender", sender);
                    params.set("receiver", receiver);
                    params.set("nftName", nftName);
                    params.set("nftAddress", this.toForm.nftContract.address);
                    params.set("ids", ids.join(","));
                    params.set("sendingId", String(sendingId));
                    const result = await fetch(`${Config_1.default.apiURI}/gaia-protocol-pfp/signsend?${params.toString()}`);
                    const data = await result.json();
                    if (data.confirming === true) {
                        alert("이더리움 Block Confirm을 기다리는 중입니다.");
                        return;
                    }
                    await this.toForm.sender.receiveNFTs(sender, this.fromForm.chainId, receiver, nftName, this.toForm.nftContract.address, ids, sendingId, data.signedMessage);
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