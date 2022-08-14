import { DomNode } from "skydapp-browser";
import GaiaNFTBridgeInterface from "../contract/GaiaNFTBridgeInterface";
import Swaper from "./Swaper";
export default class Form extends DomNode {
    private swaper;
    chainId: number;
    private nftName;
    private isFrom;
    sender: GaiaNFTBridgeInterface | undefined;
    private chainIcon;
    private chainSelect;
    private addressDisplay;
    private buttonContainer;
    constructor(swaper: Swaper, chainId: number, nftName: string, isFrom?: boolean);
    changeChain(chainId: number): Promise<void>;
    changeNFT(nftName: string): Promise<void>;
    private loadBalance;
    private connectHandler;
    private transferHandler;
    private sendHandler;
    delete(): void;
}
//# sourceMappingURL=Form.d.ts.map