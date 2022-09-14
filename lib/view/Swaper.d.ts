import { BigNumber, BigNumberish } from "ethers";
import { DomNode } from "skydapp-browser";
export default class Swaper extends DomNode {
    private fromForm;
    private toForm;
    private sendedList;
    private nftList;
    private approveButton;
    private transferButton;
    private store;
    private selectedIds;
    constructor();
    private loadHistoryNonce;
    numberWithCommas(x: string, fixed?: number): string;
    private getApprove;
    private loadHistory;
    addSended(sender: string, receiver: string, sendingId: BigNumber, ids: BigNumber[], block?: number): void;
    send(nftName: string, nftAddress: string, ids: BigNumberish[]): Promise<void>;
    receive(sender: string, toChainId: BigNumber, _receiver: string, ids: BigNumber[], sendingId: BigNumber, block?: number): Promise<void>;
}
//# sourceMappingURL=Swaper.d.ts.map