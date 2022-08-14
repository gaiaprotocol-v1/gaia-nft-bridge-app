
import { BigNumber, BigNumberish } from "ethers";
import { DomNode, el, Store } from "skydapp-browser";
import { SkyUtil } from "skydapp-common";
import EthereumWallet from "../ethereum/EthereumWallet";
import Form from "./Form";
import NftItem from "./NftItem";
import Sended from "./Sended";
import Alert from "./shared/dialogue/Alert";

export default class Swaper extends DomNode {
    private fromForm: Form;
    private toForm: Form;

    //private feeDisplay: DomNode;
    private sendedList: DomNode;
    private nftList: DomNode;
    //private receivedDisplay: DomNode;
    private approveButton: DomNode<HTMLButtonElement>;

    private store: Store = new Store("store");
    private selectedIds: number[] = [];

    constructor() {
        super(".swaper");

        const savedFromChainId = this.store.get<number>("from");
        const savedToChainId = this.store.get<number>("to");
        const savedNFTName = this.store.get<string>("nft");

        this.append(
            el("section.swap-container",
                el("header",
                    el("h1", "GAIA BRIDGE"),
                    el("p", "NFT SWAP")
                ),
                el(".form-container",
                    (this.fromForm = new Form(this, savedFromChainId === undefined ? 8217 : savedFromChainId, savedNFTName === undefined ? "GENESIS" : savedNFTName, true)),
                    el("a", {
                        click: () => {
                            const fromChainId = this.fromForm.chainId;
                            this.fromForm.changeChain(this.toForm.chainId);
                            this.toForm.changeChain(fromChainId);
                            this.getApprove(this.fromForm.chainId);

                            this.loadHistory();

                            this.store.set("from", this.fromForm.chainId);
                            this.store.set("to", this.toForm.chainId);
                        }
                    },
                        el("img.arrow", { src: "/images/shared/icn/arrow-right.svg", height: "50", alt: "arrow-right" })
                    ),
                    (this.toForm = new Form(this, savedToChainId === undefined ? 1 : savedToChainId, savedNFTName === undefined ? "GENESIS" : savedNFTName))
                ),
                el(".amount-container",
                    el(".title-container",
                        el(".title", "NFTs"),
                    ),
                    el(".tab-container",
                        el("a.genesis", "Genesis", {
                            click: () => {
                                this.fromForm.changeNFT("GENESIS");
                                this.toForm.changeNFT("GENESIS");
                                this.loadHistory();
                                this.store.set("nft", "GENESIS");
                            },
                        }),
                        el("a.supernova", "Super nova", {
                            click: () => {
                                this.fromForm.changeNFT("SUPERNOVA");
                                this.toForm.changeNFT("SUPERNOVA");
                                this.loadHistory();
                                this.store.set("nft", "SUPERNOVA");
                            },
                        }),
                        el("a.stable", "Stable DAO", {
                            click: () => {
                                this.fromForm.changeNFT("STABLEDAO");
                                this.toForm.changeNFT("STABLEDAO");
                                this.loadHistory();
                                this.store.set("nft", "STABLEDAO");
                            },
                        }),
                    ),
                    this.nftList = el(".nft-container"),
                ),
                /*el(".fee-container",
                    el(".text-container",
                        el(".title", "Fees"),
                        el(".caption", "0.3% (Charged by Gaia Protocol)"),
                    ),
                    el(".text-container",
                        this.feeDisplay = el(".amount", this.numberWithCommas("0", 3)),
                        el(".amount-caption", ""),
                    ),
                ),
                el(".received-container",
                    el(".text-container",
                        el(".title", "Estimated Received"),
                    ),
                    el(".text-container",
                        this.receivedDisplay = el(".amount", this.numberWithCommas("0", 3)),
                        el(".amount-caption", ""),
                    )
                ),*/
                el(".warning-container",
                    el(".content",
                        el("img", { src: "/images/shared/icn/warning.png", alt: "warning.svg" }),
                        el("p", "브릿지 이용 시 양 체인에 가스비가 발생됩니다.\n보내는 체인이 이더리움일 경우 32컨펌 후 Claim 서명이 필요합니다"),
                    ),
                ),
                el(".button-container",
                    el(".content",
                        this.approveButton = el("button", "Approve\nNFT 사용 허가", {
                            "disabled": "",
                            click: async () => {
                            }
                        }),
                        el("button", "Transfer\n전송하기", {
                            click: () => { }
                        }),
                    ),
                ),
            ),
            el("section.history-container",
                el(".title", "전송 이력"),
                el("p", "트랜잭션이 한번 시작되면 되돌릴 수 없습니다.\nTransfer후 Claim 까지 완료되어야 체인 간 전송이 완료됩니다"),
                this.sendedList = el("table",
                    el("thead",
                        el("tr",
                            el("td", "From Chain"),
                            el("td", "To Chain"),
                            el("td", "Name"),
                            el("td", "Fee"),
                            el("td", "Time"),
                            el("td", "Status"),
                        ),
                    ),
                ),
            ),
        );

        this.getApprove(1);

        this.fromForm.on("changeChain", (chainId: number, originChainId: number) => {
            if (this.toForm.chainId === chainId) {
                this.toForm.changeChain(originChainId);
            }
            this.loadHistory();

            this.store.set("from", this.fromForm.chainId);
            this.store.set("to", this.toForm.chainId);
        });

        this.toForm.on("changeChain", (chainId: number, originChainId: number) => {
            if (this.fromForm.chainId === chainId) {
                this.fromForm.changeChain(originChainId);
            }
            this.loadHistory();

            this.store.set("from", this.fromForm.chainId);
            this.store.set("to", this.toForm.chainId);
        });

        this.fromForm.on("load", (tokenIds: number[]) => {
            this.nftList.empty();
            this.selectedIds = [];
            const name = this.store.get<string>("nft")?.toLowerCase();
            for (const tokenId of tokenIds) {
                const item = new NftItem(name === undefined ? "genesis" : name, tokenId).appendTo(this.nftList);
                item.on("selected", () => {
                    if (this.selectedIds.length === 10) {
                        new Alert("오류", "최대 10개까지 선택이 가능합니다.");
                        item.deselect();
                    } else {
                        this.selectedIds.push(tokenId);
                    }
                });
                item.on("deselected", () => SkyUtil.pull(this.selectedIds, tokenId));
            }
        });

        this.loadHistory();
        this.fromForm.on("connect", () => this.loadHistory());
        this.toForm.on("connect", () => this.loadHistory());
    }

    private loadHistoryNonce = 0;

    numberWithCommas(x: string, fixed = 3) {
        const parts = String(+(+x).toFixed(fixed)).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    private async getApprove(amount: BigNumberish) {
        const owner = await EthereumWallet.loadAddress();
    }

    private async loadHistory() {
        const owner = await this.fromForm.sender!.loadAddress();
        //const balance = await this.fromForm.sender!.balanceOf(owner!);

        if (
            this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined
        ) {
            const sender = await this.fromForm.sender.loadAddress();
            const receiver = await this.toForm.sender.loadAddress();
            if (sender !== undefined && receiver !== undefined) {
                /*const count = await this.fromForm.sender.sendingCounts(
                    sender,
                    this.toForm.chainId,
                    receiver,
                );
                this.loadHistoryNonce += 1;
                const nonce = this.loadHistoryNonce;

                SkyUtil.repeatResultAsync(count.toNumber(), async (sendingId) => {
                    if (this.loadHistoryNonce === nonce) {
                        this.addSended(sender, receiver, BigNumber.from(sendingId));
                    }
                });*/
            }
        }
    }

    public addSended(sender: string, receiver: string, sendingId: BigNumber) {
        if (
            this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined
        ) {
            new Sended(
                this.fromForm.sender,
                this.toForm.sender,
                this.fromForm.chainId,
                this.toForm.chainId,
                sender,
                receiver,
                sendingId.toNumber(),
                async () => {
                    if (this.fromForm.sender !== undefined) {
                        /*const sended = await this.fromForm.sender.sendedAmounts(
                            sender,
                            this.toForm.chainId,
                            receiver,
                            sendingId,
                        );
                        this.receive(
                            sender,
                            this.toForm.chainId,
                            receiver,
                            sendingId,
                            sended,
                        );*/
                    }
                }
            ).appendTo(this.sendedList, 0);
        }
    }

    public async send(nftName: string, nftAddress: string, ids: BigNumberish[]) {
        if (
            this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined
        ) {
            const receiver = await this.toForm.sender.loadAddress();
            if (receiver !== undefined) {
                await this.fromForm.sender.sendNFTs(
                    this.toForm.chainId,
                    receiver,
                    nftName,
                    nftAddress,
                    ids,
                );
            }
        }
    }

    public async receive(
        sender: string,
        toChainId: BigNumberish,
        _receiver: string,
        sendingId: BigNumber,
        amount: BigNumberish
    ) {
        if (
            this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined &&
            this.toForm.chainId.toString() === toChainId.toString()
        ) {
            const receiver = await this.toForm.sender.loadAddress();
            if (receiver === _receiver) {
                try {
                } catch (error: any) {
                    alert(`Error: ${error.message}`);
                }
            }
        }
    }
}
