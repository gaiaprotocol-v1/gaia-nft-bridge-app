import { DomNode, el, Store } from "skydapp-browser";

export default class NftItem extends DomNode {

    public store = new Store("nft-store");

    private checkbox: DomNode<HTMLInputElement>;

    constructor(name: string, public id: number) {
        super(".nft-item");
        this.append(
            el(".content", { click: () => { this.checkbox.domElement.checked = !this.checkbox.domElement.checked; } },
                el("img", { src: `https://storage.googleapis.com/gaia-protocol/${name === "genesis" ? "kronos" : name}/${id}.png`, alt: `nft${id}` }),
                el(".checkbox-container",
                    this.checkbox = el("input", { type: "checkbox", id: `nft${id}` }, {
                        change: () => {
                            this.fireEvent(this.checkbox.domElement.checked === true ? "selected" : "deselected");
                        },
                    }),
                    el("label", { for: `nft${id}` }),
                    el("p", `#${id}`),
                ),
            ),
        );
    }

    public deselect() {
        this.checkbox.domElement.checked = false;
    }
}
