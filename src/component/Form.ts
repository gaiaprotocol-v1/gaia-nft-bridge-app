import { BigNumber } from "ethers";
import { DomNode, el } from "skydapp-browser";
import CommonUtil from "../CommonUtil";
import Config from "../Config";
import EthereumGaiaNFTBridgeContract from "../contract/EthereumGaiaNFTBridgeContract";
import GaiaNFTBridgeInterface from "../contract/GaiaNFTBridgeInterface";
import KlaytnGaiaNFTBridgeContract from "../contract/KlaytnGaiaNFTBridgeContract";
import EthereumWallet from "../ethereum/EthereumWallet";
import KlaytnWallet from "../klaytn/KlaytnWallet";
import Swaper from "./Swaper";

export default class Form extends DomNode {
    public sender: GaiaNFTBridgeInterface | undefined;

    private chainIcon: DomNode<HTMLImageElement>;
    private chainSelect: DomNode<HTMLSelectElement>;
    private addressDisplay: DomNode;
    //private disconnectButton: DomNode;
    private buttonContainer: DomNode;

    private addresses: any = {
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

    constructor(
        private swaper: Swaper,
        public chainId: number,
        private nftName: string,
        private isFrom: boolean = false
    ) {
        super("form")
        this.append(
            this.chainIcon = el("img", { src: "/images/shared/icn/klaytn.svg", alt: "chain image" }),
            this.isFrom ? el(".caption-container", el("span", "from"), el("p", "보내는 체인")) :
                el(".caption-container", el("span", "to"), el("p", "받는 체인")),
            this.chainSelect = el("select",
                el("option", "Klaytn", { value: "8217" }),
                el("option", "Ethereum", { value: "1" }),
                //el("option", "Polygon", { value: "137" }),
                {
                    change: () => {
                        const originChainId = this.chainId;
                        this.changeChain(parseInt(this.chainSelect.domElement.value, 10));
                        this.fireEvent("changeChain", this.chainId, originChainId);
                    },
                }
            ),
            el(".address-container",
                (this.addressDisplay = el("p")),
                /*(this.disconnectButton = el("a.disconnect",
                    el("img", { src: "/images/shared/icn/disconnect.svg" })
                )),*/
            ),
            (this.buttonContainer = el(".button-container")),
        );
        this.changeChain(chainId);
    }

    public async changeChain(chainId: number) {
        this.chainId = chainId;
        this.chainSelect.domElement.value = String(chainId);

        this.sender?.off("connect", this.connectHandler);
        this.sender?.off("Transfer", this.transferHandler);
        this.sender?.off("SendToken", this.sendHandler);

        if (chainId === 8217) {
            this.sender = KlaytnGaiaNFTBridgeContract;
            this.chainIcon.domElement.src = "/images/shared/icn/klaytn.png";

            const address = await KlaytnWallet.loadAddress();
            if (address !== undefined) {
                this.addressDisplay.empty().appendText(CommonUtil.shortenAddress(address!));
            } else {
                this.addressDisplay.empty();
            }
        } else if (chainId === 1) {
            this.sender = EthereumGaiaNFTBridgeContract;
            this.chainIcon.domElement.src = "/images/shared/icn/ethereum.png";

            const address = await EthereumWallet.loadAddress();
            if (address !== undefined) {
                this.addressDisplay.empty().appendText(CommonUtil.shortenAddress(address!));
            } else {
                this.addressDisplay.empty();
            }
        }
        await this.loadBalance();

        this.sender?.on("connect", this.connectHandler);
        this.sender?.on("Transfer", this.transferHandler);
        this.sender?.on("SendToken", this.sendHandler);
    }

    public async changeNFT(nftName: string) {
        this.nftName = nftName;
        await this.loadBalance();
    }

    private async loadBalance() {
        this.buttonContainer.empty();

        if (this.sender !== undefined) {
            const owner = await this.sender.loadAddress();
            if (owner !== undefined) {
                //this.disconnectButton.empty().append(el("img", { src: "/images/shared/icn/disconnect.svg" }));
                this.addressDisplay.empty().appendText(CommonUtil.shortenAddress(owner));

                if (this.isFrom === true) {
                    let tokenIds: number[] = [];
                    if (this.chainId === 8217) {
                        const result = await fetch(`https://nft-holder-collector.webplusone.com/nfts/klaytn/${this.addresses[this.chainId][this.nftName]}/${owner}`);
                        const dataSet = await result.json();
                        for (const data of dataSet) {
                            tokenIds.push(data.tokenId);
                        }
                    } else if (this.chainId === 1) {
                        const result = await fetch(`${Config.apiURI}/gaia-protocol-pfp/ethereum/${this.nftName === "STABLEDAO" ? "stable-dao" : this.nftName.toLowerCase()}/${owner}`);
                        const data = await result.json();
                        for (const asset of data.assets) {
                            tokenIds.push(asset.token_id);
                        }
                    }
                    this.fireEvent("load", tokenIds);
                }

            } else {
                //this.disconnectButton.empty();
                this.buttonContainer.append(
                    el("a.connect-button", "지갑 연결", {
                        click: () => this.sender?.connect(),
                    }),
                );
            }
        }
    }

    private connectHandler = async () => {
        this.fireEvent("connect");
        this.loadBalance();
    };

    private transferHandler = async (from: string, to: string) => {
        const owner = await this.sender?.loadAddress();
        if (from === owner || to === owner) {
            this.loadBalance();
        }
    };

    private sendHandler = async (
        sender: string,
        toChainId: BigNumber,
        receiver: string,
        amount: BigNumber,
        sendingId: BigNumber,
    ) => {
        this.swaper.receive(sender, toChainId, receiver, sendingId, amount);
        const owner = await this.sender?.loadAddress();
        if (sender === owner) {
            this.swaper.addSended(sender, receiver, sendingId);
        }
    };

    public delete() {
        this.sender?.off("connect", this.connectHandler);
        this.sender?.off("Transfer", this.transferHandler);
        this.sender?.off("SendToken", this.sendHandler);
        super.delete();
    }
}