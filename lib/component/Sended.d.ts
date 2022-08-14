import { BigNumber } from "ethers";
import { DomNode } from "skydapp-browser";
import GaiaNFTBridgeInterface from "../contract/GaiaNFTBridgeInterface";
export default class Sended extends DomNode {
    private fromSender;
    private toSender;
    private fromChainId;
    private toChainId;
    private sender;
    private receiver;
    private sendingId;
    private ids;
    private retry;
    private fromImage;
    private toImage;
    private fromChainText;
    private toChainText;
    constructor(fromSender: GaiaNFTBridgeInterface, toSender: GaiaNFTBridgeInterface, fromChainId: number, toChainId: number, sender: string, receiver: string, sendingId: number, ids: BigNumber[], retry: () => void);
    private load;
    private loadChain;
    private getFormatting;
    private receiveTokenHandler;
    delete(): void;
}
//# sourceMappingURL=Sended.d.ts.map