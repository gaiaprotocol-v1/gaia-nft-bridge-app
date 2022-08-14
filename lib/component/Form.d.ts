import { DomNode } from "skydapp-browser";
import GaiaNFTBridgeInterface from "../contract/GaiaNFTBridgeInterface";
import Swaper from "./Swaper";
export default class Form extends DomNode {
    private swaper;
    chainId: number;
    private nftName;
    private nftAddress;
    private isFrom;
    sender: GaiaNFTBridgeInterface | undefined;
    private chainIcon;
    private chainSelect;
    private addressDisplay;
    private buttonContainer;
    constructor(swaper: Swaper, chainId: number, nftName: string, nftAddress: string, isFrom?: boolean);
    changeChain(chainId: number): Promise<void>;
    private loadBalance;
    private connectHandler;
    private transferHandler;
    private sendHandler;
    delete(): void;
}
//# sourceMappingURL=Form.d.ts.map