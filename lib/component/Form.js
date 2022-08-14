"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const Config_1 = __importDefault(require("../Config"));
const EthereumGaiaNFTBridgeContract_1 = __importDefault(require("../contract/EthereumGaiaNFTBridgeContract"));
const KlaytnGaiaNFTBridgeContract_1 = __importDefault(require("../contract/KlaytnGaiaNFTBridgeContract"));
const EthereumWallet_1 = __importDefault(require("../ethereum/EthereumWallet"));
const KlaytnWallet_1 = __importDefault(require("../klaytn/KlaytnWallet"));
class Form extends skydapp_browser_1.DomNode {
    constructor(swaper, chainId, nftName, isFrom = false) {
        super("form");
        this.swaper = swaper;
        this.chainId = chainId;
        this.nftName = nftName;
        this.isFrom = isFrom;
        this.addresses = {
            8217: {
                GENESIS: "0xe9A10bB97DDb4bCD7677393405B4b769273CeF3c",
                SUPERNOVA: "0x20a33C651373cde978daE404760e853fAE877588",
                STABLEDAO: "0x5428dB8Fd0063390b3357D78d56f183D6755A446",
            },
            1: {
                GENESIS: "0xb48E526d935BEe3891222f6aC10A253e31CCaBE1",
                SUPERNOVA: "0xe7df0DcA32eb23F4182055dC6a2053A3fF239315",
                STABLEDAO: "0xFfFd676Bffd8797f34C2Adc3E808F374CAEe49D8",
            },
            137: {
                GENESIS: "0x9f69C2a06c97fCAAc1E586b30Ea681c43975F052",
                SUPERNOVA: "0xECFFc91149b8B702dEa6905Ae304A9D36527060F",
                STABLEDAO: "0xa5f5b6C05a6d48a56E95E4Ce15078008a18BC79B",
            },
        };
        this.connectHandler = async () => {
            this.fireEvent("connect");
            this.loadBalance();
        };
        this.transferHandler = async (from, to) => {
            const owner = await this.sender?.loadAddress();
            if (from === owner || to === owner) {
                this.loadBalance();
            }
        };
        this.sendHandler = async (sender, toChainId, receiver, amount, sendingId) => {
            this.swaper.receive(sender, toChainId, receiver, sendingId, amount);
            const owner = await this.sender?.loadAddress();
            if (sender === owner) {
                this.swaper.addSended(sender, receiver, sendingId);
            }
        };
        this.append(this.chainIcon = (0, skydapp_browser_1.el)("img", { src: "/images/shared/icn/klaytn.svg", alt: "chain image" }), this.isFrom ? (0, skydapp_browser_1.el)(".caption-container", (0, skydapp_browser_1.el)("span", "from"), (0, skydapp_browser_1.el)("p", "보내는 체인")) :
            (0, skydapp_browser_1.el)(".caption-container", (0, skydapp_browser_1.el)("span", "to"), (0, skydapp_browser_1.el)("p", "받는 체인")), this.chainSelect = (0, skydapp_browser_1.el)("select", (0, skydapp_browser_1.el)("option", "Klaytn", { value: "8217" }), (0, skydapp_browser_1.el)("option", "Ethereum", { value: "1" }), {
            change: () => {
                const originChainId = this.chainId;
                this.changeChain(parseInt(this.chainSelect.domElement.value, 10));
                this.fireEvent("changeChain", this.chainId, originChainId);
            },
        }), (0, skydapp_browser_1.el)(".address-container", (this.addressDisplay = (0, skydapp_browser_1.el)("p"))), (this.buttonContainer = (0, skydapp_browser_1.el)(".button-container")));
        this.changeChain(chainId);
    }
    async changeChain(chainId) {
        this.chainId = chainId;
        this.chainSelect.domElement.value = String(chainId);
        this.sender?.off("connect", this.connectHandler);
        this.sender?.off("Transfer", this.transferHandler);
        this.sender?.off("SendToken", this.sendHandler);
        if (chainId === 8217) {
            this.sender = KlaytnGaiaNFTBridgeContract_1.default;
            this.chainIcon.domElement.src = "/images/shared/icn/klaytn.png";
            const address = await KlaytnWallet_1.default.loadAddress();
            if (address !== undefined) {
                this.addressDisplay.empty().appendText(CommonUtil_1.default.shortenAddress(address));
            }
            else {
                this.addressDisplay.empty();
            }
        }
        else if (chainId === 1) {
            this.sender = EthereumGaiaNFTBridgeContract_1.default;
            this.chainIcon.domElement.src = "/images/shared/icn/ethereum.png";
            const address = await EthereumWallet_1.default.loadAddress();
            if (address !== undefined) {
                this.addressDisplay.empty().appendText(CommonUtil_1.default.shortenAddress(address));
            }
            else {
                this.addressDisplay.empty();
            }
        }
        await this.loadBalance();
        this.sender?.on("connect", this.connectHandler);
        this.sender?.on("Transfer", this.transferHandler);
        this.sender?.on("SendToken", this.sendHandler);
    }
    async changeNFT(nftName) {
        this.nftName = nftName;
        await this.loadBalance();
    }
    async loadBalance() {
        this.buttonContainer.empty();
        if (this.sender !== undefined) {
            const owner = await this.sender.loadAddress();
            if (owner !== undefined) {
                this.addressDisplay.empty().appendText(CommonUtil_1.default.shortenAddress(owner));
                if (this.isFrom === true) {
                    let tokenIds = [];
                    if (this.chainId === 8217) {
                        const result = await fetch(`https://nft-holder-collector.webplusone.com/nfts/klaytn/${this.addresses[this.chainId][this.nftName]}/${owner}`);
                        const dataSet = await result.json();
                        for (const data of dataSet) {
                            tokenIds.push(data.tokenId);
                        }
                    }
                    else if (this.chainId === 1) {
                        const result = await fetch(`${Config_1.default.apiURI}/gaia-protocol-pfp/ethereum/${this.nftName === "STABLEDAO" ? "stable-dao" : this.nftName.toLowerCase()}/${owner}`);
                        const data = await result.json();
                        for (const asset of data.assets) {
                            tokenIds.push(asset.token_id);
                        }
                    }
                    this.fireEvent("load", tokenIds);
                }
            }
            else {
                this.buttonContainer.append((0, skydapp_browser_1.el)("a.connect-button", "지갑 연결", {
                    click: () => this.sender?.connect(),
                }));
            }
        }
    }
    delete() {
        this.sender?.off("connect", this.connectHandler);
        this.sender?.off("Transfer", this.transferHandler);
        this.sender?.off("SendToken", this.sendHandler);
        super.delete();
    }
}
exports.default = Form;
//# sourceMappingURL=Form.js.map