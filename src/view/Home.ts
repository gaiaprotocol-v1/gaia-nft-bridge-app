import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Alert from "../component/shared/dialogue/Alert";
import Confirm from "../component/shared/dialogue/Confirm";
import Swaper from "../component/Swaper";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "Gaia NFT Bridge";
        Layout.current.content.append(this.container = el(".home-view",
            new Swaper(),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
