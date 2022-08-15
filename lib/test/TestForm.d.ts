import { DomNode } from "skydapp-browser";
import GaiaNFTBridgeInterface from "../contract/GaiaNFTBridgeInterface";
import TestSwaper from "./TestSwaper";
export default class TestForm extends DomNode {
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
    constructor(swaper: TestSwaper, chainId: number, nftName: string, isFrom?: boolean);
    changeChain(chainId: number): Promise<void>;
    changeNFT(nftName: string): Promise<void>;
    private loadBalance;
    private connectHandler;
    private transferHandler;
    private approvalHandler;
    private sendHandler;
    delete(): void;
}
//# sourceMappingURL=TestForm.d.ts.map