import { DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Layout from "../view/Layout";
import AdminSwaper from "./AdminSwaper";

export default class Admin implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "Gaia NFT Bridge";
        Layout.current.content.append(this.container = el(".home-view",
            new AdminSwaper(),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
