import { BigNumber, utils } from "ethers";
import { DomNode, el } from "skydapp-browser";
import Alert from "../component/shared/dialogue/Alert";
import GaiaNFTBridgeInterface from "../contract/GaiaNFTBridgeInterface";

export default class AdminSended extends DomNode {

    private fromImage: DomNode<HTMLImageElement> | undefined;
    private toImage: DomNode<HTMLImageElement> | undefined;

    private fromChainText: DomNode | undefined;
    private toChainText: DomNode<HTMLImageElement> | undefined;

    constructor(
        private fromSender: GaiaNFTBridgeInterface,
        private toSender: GaiaNFTBridgeInterface,

        private fromChainId: number,
        private toChainId: number,

        private sender: string,
        private receiver: string,

        private sendingId: number,
        private ids: BigNumber[],

        private retry: () => void,
    ) {
        super("tr");
        this.load();
        this.toSender.on("ReceiveNFTs", this.receiveTokenHandler);
    }

    private async load() {
        const received = await this.toSender.isNFTsReceived(this.sender, this.fromChainId, this.sendingId);

        this.empty().append(
            el("td",
                el(".chain-container",
                    this.fromImage = el("img", { src: "/images/shared/icn/ethereum.svg", alt: "ethereum" }),
                    this.fromChainText = el("p", this.fromChainId === 1 ? "Ethereum" : (this.fromChainId === 137 ? "Polygon" : "Klaytn")),
                ),

            ),
            el("td",
                el(".chain-container",
                    this.toImage = el("img", { src: "/images/shared/icn/klaytn.svg", alt: "klaytn" }),
                    this.toChainText = el("p", this.toChainId === 1 ? "Ethereum" : (this.toChainId === 137 ? "Polygon" : "Klaytn")),
                ),
            ),
            el("td",
                el("p", `${this.ids.length} 개`),
            ),
            el("td",
                (received as any) === true ? el("button", "Done", { "disabled": "" }) : el("button", "Retry", {
                    click: () => this.retry(),
                }),
            ),
        );
        this.loadChain();
    }

    private async loadChain(): Promise<void> {
        if (this.fromChainId === 8217) {
            if (this.fromImage !== undefined) {
                this.fromImage.domElement.src = "/images/shared/icn/klaytn.svg";
            }
            this.fromChainText?.empty().appendText("Klaytn");
        } else if (this.fromChainId === 137) {
            if (this.fromImage !== undefined) {
                this.fromImage.domElement.src = "/images/shared/icn/polygon.svg";
            }
            this.fromChainText?.empty().appendText("Polygon");
        } else if (this.fromChainId === 1) {
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
        } else if (this.toChainId === 137) {
            if (this.toImage !== undefined) {
                this.toImage.domElement.src = "/images/shared/icn/polygon.svg";
            }
            this.toChainText?.empty().appendText("Polygon");
        } else if (this.toChainId === 1) {
            if (this.toImage !== undefined) {
                this.toImage.domElement.src = "/images/shared/icn/ethereum.svg";
            }
            this.toChainText?.empty().appendText("Ethereum");
        }
    }

    private receiveTokenHandler = async (sender: string, fromChainId: BigNumber, receiver: string, nftName: string, nftAddress: string, ids: BigNumber[], sendingId: BigNumber) => {
        if (sender === this.sender && fromChainId.toNumber() === this.fromChainId && receiver === this.receiver && sendingId.toNumber() === this.sendingId) {
            new Alert("전송 완료", "전송이 완료됐습니다.");
            this.load();
        }
    }

    public delete() {
        this.toSender.off("ReceiveNFTs", this.receiveTokenHandler);
        super.delete();
    }
}
