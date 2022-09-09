import { BigNumber } from "ethers";
import { DomNode, el } from "skydapp-browser";
import CommonUtil from "../CommonUtil";
import Config from "../Config";
import EthereumGaiaNFTBridgeContract from "../contract/EthereumGaiaNFTBridgeContract";
import GaiaNFTBridgeInterface from "../contract/GaiaNFTBridgeInterface";
import KlaytnGaiaNFTBridgeContract from "../contract/KlaytnGaiaNFTBridgeContract";
import PolygonGaiaNFTBridgeContract from "../contract/PolygonGaiaNFTBridgeContract";
import Contracts from "../Contracts";
import EthereumWallet from "../ethereum/EthereumWallet";
import KlaytnWallet from "../klaytn/KlaytnWallet";
import PolygonWallet from "../polygon/PolygonWallet";
import Swaper from "./Swaper";

export default class Form extends DomNode {
    public sender: GaiaNFTBridgeInterface | undefined;
    public nftContract: any | undefined;

    private chainIcon: DomNode<HTMLImageElement>;
    private chainSelect: DomNode<HTMLSelectElement>;
    private addressDisplay: DomNode;
    //private disconnectButton: DomNode;
    private buttonContainer: DomNode;

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
                el("option", "Polygon", { value: "137" }),
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
        this.sender?.off("SendNFTs", this.sendHandler);

        this.nftContract?.off("Transfer", this.transferHandler);
        this.nftContract?.off("ApprovalForAll", this.approvalHandler);
        this.nftContract = Contracts[this.chainId][this.nftName];

        if (chainId === 8217) {
            this.sender = KlaytnGaiaNFTBridgeContract;
            this.chainIcon.domElement.src = "/images/shared/icn/klaytn.png";

            const address = await KlaytnWallet.loadAddress();
            if (address !== undefined) {
                this.addressDisplay.empty().appendText(CommonUtil.shortenAddress(address!));
            } else {
                this.addressDisplay.empty();
            }
        } else if (chainId === 137) {
            this.sender = PolygonGaiaNFTBridgeContract;
            this.chainIcon.domElement.src = "/images/shared/icn/polygon.png";

            const address = await PolygonWallet.loadAddress();
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
        this.sender?.on("SendNFTs", this.sendHandler);

        this.nftContract?.on("Transfer", this.transferHandler);
        this.nftContract?.on("ApprovalForAll", this.approvalHandler);
    }

    public async changeNFT(nftName: string) {
        this.nftName = nftName;
        this.nftContract?.off("Transfer", this.transferHandler);
        this.nftContract?.off("ApprovalForAll", this.approvalHandler);
        this.nftContract = Contracts[this.chainId][nftName];
        this.nftContract?.on("Transfer", this.transferHandler);
        this.nftContract?.on("ApprovalForAll", this.approvalHandler);
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
                        const result = await fetch(`https://nft-holder-collector.webplusone.com/nfts/klaytn/${Contracts[this.chainId][this.nftName].address}/${owner}`);
                        const dataSet = await result.json();
                        for (const data of dataSet) {
                            tokenIds.push(data.tokenId);
                        }
                    } else if (this.chainId === 137) {
                        const result = await fetch(`${Config.apiURI}/gaia-protocol-pfp/polygon/${Contracts[this.chainId][this.nftName].address}/${owner}`);
                        const data = await result.json();
                        for (const nft of data.nfts) {
                            tokenIds.push(nft.token_id);
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
            setTimeout(() => this.loadBalance(), 3000);
        }
    };

    private approvalHandler = async (from: string, to: string) => {
        const owner = await this.sender?.loadAddress();
        if (from === owner && to === this.sender?.address) {
            this.fireEvent("approved");
        }
    };

    private sendHandler = async (
        sender: string,
        toChainId: BigNumber,
        receiver: string,
        nftName: string,
        nftAddress: string,
        ids: BigNumber[],
        sendingId: BigNumber,
    ) => {
        this.swaper.receive(sender, toChainId, receiver, ids, sendingId);
        const owner = await this.sender?.loadAddress();
        if (sender === owner) {
            this.swaper.addSended(sender, receiver, sendingId, ids);
        }
    };

    public delete() {
        this.sender?.off("connect", this.connectHandler);
        this.sender?.off("SendNFTs", this.sendHandler);
        this.nftContract?.off("Transfer", this.transferHandler);
        this.nftContract?.off("ApprovalForAll", this.approvalHandler);
        super.delete();
    }
}