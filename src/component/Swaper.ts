
import { BigNumber, BigNumberish } from "ethers";
import { DomNode, el, Store } from "skydapp-browser";
import { SkyUtil } from "skydapp-common";
import Config from "../Config";
import EthereumGaiaNFTBridgeContract from "../contract/EthereumGaiaNFTBridgeContract";
import KlaytnGaiaNFTBridgeContract from "../contract/KlaytnGaiaNFTBridgeContract";
import Contracts from "../Contracts";
import EthereumWallet from "../ethereum/EthereumWallet";
import KlaytnWallet from "../klaytn/KlaytnWallet";
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
    private transferButton: DomNode<HTMLButtonElement>;

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
                                this.getApprove(this.fromForm.chainId);
                            },
                        }),
                        el("a.supernova", "Super nova", {
                            click: () => {
                                this.fromForm.changeNFT("SUPERNOVA");
                                this.toForm.changeNFT("SUPERNOVA");
                                this.loadHistory();
                                this.store.set("nft", "SUPERNOVA");
                                this.getApprove(this.fromForm.chainId);
                            },
                        }),
                        el("a.stable", "Stable DAO", {
                            click: () => {
                                this.fromForm.changeNFT("STABLEDAO");
                                this.toForm.changeNFT("STABLEDAO");
                                this.loadHistory();
                                this.store.set("nft", "STABLEDAO");
                                this.getApprove(this.fromForm.chainId);
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
                        el("p", "브릿지 이용 시 양 체인에 가스비가 발생됩니다."/*"브릿지 이용 시 양 체인에 가스비가 발생됩니다.\n보내는 체인이 이더리움일 경우 32컨펌 후 Claim 서명이 필요합니다"*/),
                    ),
                ),
                el(".button-container",
                    el(".content",
                        this.approveButton = el("button", "Approve\nNFT 사용 허가", {
                            click: async () => {
                                const fromChainId = this.fromForm.chainId;
                                if (fromChainId === 1) {
                                    this.fromForm.nftContract.setApprovalForAll(EthereumGaiaNFTBridgeContract.address, true);
                                } else if (fromChainId === 8217) {
                                    this.fromForm.nftContract.setApprovalForAll(KlaytnGaiaNFTBridgeContract.address, true);
                                }
                                this.getApprove(fromChainId);
                            }
                        }),
                        this.transferButton = el("button", "Transfer\n전송하기", {
                            click: () => {
                                if (this.selectedIds.length === 0) {
                                    new Alert("오류", "선택된 NFT가 없습니다.");
                                } else {
                                    const nftName = this.store.get<string>("nft") ?? "GENESIS";
                                    this.send(
                                        nftName,
                                        this.fromForm.nftContract.address,
                                        this.selectedIds,
                                    );
                                }
                            },
                        }),
                    ),
                ),
            ),
            el("section.history-container",
                el(".title", "전송 이력"),
                el("p", "트랜잭션이 한번 시작되면 되돌릴 수 없습니다.\nTransfer후 Claim 까지 완료되어야 체인 간 전송이 완료됩니다"),
                el("table",
                    el("thead",
                        el("tr",
                            el("td", "From Chain"),
                            el("td", "To Chain"),
                            el("td", "개수"),
                            el("td", "Status"),
                        ),
                    ),
                    this.sendedList = el("tbody"),
                ),
            ),
        );

        this.getApprove(savedFromChainId === undefined ? 8217 : savedFromChainId);

        this.fromForm.on("changeChain", (chainId: number, originChainId: number) => {
            if (this.toForm.chainId === chainId) {
                this.toForm.changeChain(originChainId);
            }
            this.getApprove(chainId);
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
            const name = (this.store.get<string>("nft") ?? "GENESIS").toLowerCase();
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
        this.fromForm.on("connect", () => {
            this.getApprove(savedFromChainId === undefined ? 8217 : savedFromChainId);
            this.loadHistory();
        });
        this.toForm.on("connect", () => this.loadHistory());
        this.fromForm.on("approved", () => this.getApprove(this.fromForm.chainId));
    }

    private loadHistoryNonce = 0;

    numberWithCommas(x: string, fixed = 3) {
        const parts = String(+(+x).toFixed(fixed)).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    private async getApprove(chainId: number) {

        const nftName = this.store.get<string>("nft") ?? "GENESIS";
        const contract = Contracts[chainId][nftName];

        if (chainId === 1) {
            const owner = await EthereumWallet.loadAddress();
            if (owner !== undefined) {
                if (await contract.isApprovedForAll(owner, EthereumGaiaNFTBridgeContract.address) !== true) {
                    this.approveButton.domElement.disabled = false;
                    this.transferButton.domElement.disabled = true;
                } else {
                    this.approveButton.domElement.disabled = true;
                    this.transferButton.domElement.disabled = false;
                }
            }
        } else if (chainId === 8217) {
            const owner = await KlaytnWallet.loadAddress();
            if (owner !== undefined) {
                if (await contract.isApprovedForAll(owner, KlaytnGaiaNFTBridgeContract.address) !== true) {
                    this.approveButton.domElement.disabled = false;
                    this.transferButton.domElement.disabled = true;
                } else {
                    this.approveButton.domElement.disabled = true;
                    this.transferButton.domElement.disabled = false;
                }
            }
        }
    }

    private async loadHistory() {
        this.sendedList.empty();

        if (
            this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined
        ) {
            const sender = await this.fromForm.sender.loadAddress();
            const receiver = await this.toForm.sender.loadAddress();
            if (sender !== undefined && receiver !== undefined) {
                const nftName = this.store.get<string>("nft") ?? "GENESIS";
                const sended = await this.fromForm.sender.loadSended(
                    sender,
                    this.toForm.chainId,
                    receiver,
                    nftName,
                    this.fromForm.nftContract.address,
                );

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

    public addSended(sender: string, receiver: string, sendingId: BigNumber, ids: BigNumber[], block?: number) {
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
                ids,
                async () => {
                    if (this.fromForm.sender !== undefined) {
                        this.receive(
                            sender,
                            BigNumber.from(this.toForm.chainId),
                            receiver,
                            ids,
                            sendingId,
                            block,
                        );
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
        toChainId: BigNumber,
        _receiver: string,
        ids: BigNumber[],
        sendingId: BigNumber,
        block?: number,
    ) {
        if (
            this.fromForm.sender !== undefined &&
            this.toForm.sender !== undefined &&
            this.toForm.chainId.toString() === toChainId.toString()
        ) {
            const receiver = await this.toForm.sender.loadAddress();
            if (receiver === _receiver) {
                try {

                    const nftName = this.store.get<string>("nft") ?? "GENESIS";

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

                    const result = await fetch(`${Config.apiURI}/gaia-protocol-pfp/signsend?${params.toString()}`);
                    const data = await result.json();

                    if (data.confirming === true) {
                        alert("이더리움 Block Confirm을 기다리는 중입니다.");
                        return;
                    }

                    await this.toForm.sender.receiveNFTs(sender, this.fromForm.chainId, receiver, nftName, this.toForm.nftContract.address, ids, sendingId, data.signedMessage);

                } catch (error: any) {
                    alert(`Error: ${error.message}`);
                }
            }
        }
    }
}
