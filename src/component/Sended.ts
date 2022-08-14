import { BigNumber, utils } from "ethers";
import { DomNode, el } from "skydapp-browser";
import GaiaNFTBridgeInterface from "../contract/GaiaNFTBridgeInterface";

export default class Sended extends DomNode {

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
        //this.toSender.on("ReceiveToken", this.receiveTokenHandler);
    }

    private async load() {
        //const received = await this.toSender.isTokenReceived(this.sender, this.fromChainId, this.receiver, this.sendingId);
        const received: boolean = false;

        this.empty().append(
            el("td",
                el(".chain-container",
                    this.fromImage = el("img", { src: "/images/shared/icn/ethereum.svg", alt: "ethereum" }),
                    this.fromChainText = el("p", `${console.log(this.fromSender)}`),
                ),

            ),
            el("td",
                el(".chain-container",
                    this.toImage = el("img", { src: "/images/shared/icn/klaytn.svg", alt: "klaytn" }),
                    this.toChainText = el("p", "Klaytn"),
                ),
            ),
            el("td",
                el("p", ""),
            ),
            el("td",
                el("p", ""),
            ),
            el("td",
                el("p", "00:00"),
            ),
            el("td",
                (received as any) === true ? el("button", "Done") : el("button", "Retry", {
                    // "disabled": "",
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
        } else if (this.toChainId === 1) {
            if (this.toImage !== undefined) {
                this.toImage.domElement.src = "/images/shared/icn/ethereum.svg";
            }
            this.toChainText?.empty().appendText("Ethereum");
        }
    }

    private async getFormatting(balance: BigNumber) {
        let balanceDisplay = utils.formatEther(balance!)
        balanceDisplay = (+balanceDisplay).toFixed(4);
        return balanceDisplay;
    }

    private receiveTokenHandler = async (receiver: string, fromChain: BigNumber, sender: string, sendId: BigNumber) => {
        if (receiver === this.receiver && fromChain.toNumber() === this.fromChainId && sender === this.sender && sendId.toNumber() === this.sendingId) {
            this.load();
        }
    }

    public delete() {
        this.toSender.off("ReceiveToken", this.receiveTokenHandler);
        super.delete();
    }
}
