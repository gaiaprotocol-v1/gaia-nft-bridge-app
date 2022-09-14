import { DomNode } from "skydapp-browser";
import GaiaNFTBridgeInterface from "../contract/GaiaNFTBridgeInterface";
import AdminSwaper from "./AdminSwaper";
export default class AdminForm extends DomNode {
    private swaper;
    chainId: number;
    private nftName;
    private isFrom;
    sender: GaiaNFTBridgeInterface | undefined;
    nftContract: any | undefined;
    private chainIcon;
    private chainSelect;
    private addressDisplay;
    private buttonContainer;
    constructor(swaper: AdminSwaper, chainId: number, nftName: string, isFrom?: boolean);
    changeChain(chainId: number): Promise<void>;
    changeNFT(nftName: string): Promise<void>;
    private loadBalance;
    private connectHandler;
    private transferHandler;
    private approvalHandler;
    private sendHandler;
    delete(): void;
}
//# sourceMappingURL=AdminForm.d.ts.map