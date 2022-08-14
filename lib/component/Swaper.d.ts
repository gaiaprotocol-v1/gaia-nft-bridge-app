import { BigNumber, BigNumberish } from "ethers";
import { DomNode } from "skydapp-browser";
export default class Swaper extends DomNode {
    private fromForm;
    private toForm;
    private sendedList;
    private nftList;
    private approveButton;
    constructor();
    private loadHistoryNonce;
    numberWithCommas(x: string, fixed?: number): string;
    private getApprove;
    private loadHistory;
    addSended(sender: string, receiver: string, sendingId: BigNumber): void;
    send(nftName: string, nftAddress: string, ids: BigNumberish[]): Promise<void>;
    receive(sender: string, toChainId: BigNumberish, _receiver: string, sendingId: BigNumber, amount: BigNumberish): Promise<void>;
}
//# sourceMappingURL=Swaper.d.ts.map