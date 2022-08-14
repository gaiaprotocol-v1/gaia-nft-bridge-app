"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class NftItem extends skydapp_browser_1.DomNode {
    constructor(id) {
        super(".nft-item");
        this.id = id;
        this.append((0, skydapp_browser_1.el)("img", { src: `https://storage.googleapis.com/gaia-protocol/stabledao/${id}.png`, alt: `nft${id}` }), (0, skydapp_browser_1.el)(".checkbox-container", this.checkbox = (0, skydapp_browser_1.el)("input", { type: "checkbox", id: `nft${id}` }, {
            change: () => {
                this.fireEvent(this.checkbox.domElement.checked === true ? "selected" : "deselected");
            },
        }), (0, skydapp_browser_1.el)("label", { for: `nft${id}` }), (0, skydapp_browser_1.el)("p", `#${id}`)));
    }
    deselect() {
        this.checkbox.domElement.checked = false;
    }
}
exports.default = NftItem;
//# sourceMappingURL=NftItem%20copy.js.map