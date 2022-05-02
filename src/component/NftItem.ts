import { DomNode, el } from "skydapp-browser";

export default class NftItem extends DomNode {

    private checkbox: DomNode<HTMLInputElement>;

    constructor(public id: number) {
        super(".nft-item");
        this.append(
            el("img", { src: `https://storage.googleapis.com/gaia-protocol/stabledao/${id}.png`, alt: `nft${id}` }),
            el(".checkbox-container",
                this.checkbox = el("input", { type: "checkbox", id: `nft${id}` }, {
                    change: () => {
                        this.fireEvent(this.checkbox.domElement.checked === true ? "selected" : "deselected");
                    },
                }),
                el("label", { for: `nft${id}` }),
                el("p", `#${id}`),
            ),
        );
    }

    public deselect() {
        this.checkbox.domElement.checked = false;
    }
}
