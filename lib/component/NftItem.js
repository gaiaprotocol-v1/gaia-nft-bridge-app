"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class NftItem extends skydapp_browser_1.DomNode {
    constructor(name, id) {
        super(".nft-item");
        this.id = id;
        this.store = new skydapp_browser_1.Store("nft-store");
        this.append((0, skydapp_browser_1.el)(".content", (0, skydapp_browser_1.el)("img", {
            src: name === "supernova" ? `https://storage.googleapis.com/gaia-protocol/supernova/results-gifs/video-${id}.gif` :
                `https://storage.googleapis.com/gaia-protocol/${name === "genesis" ? "kronos" : name}/${id}.png`,
            alt: `nft${id}`,
            click: () => {
                this.checkbox.domElement.checked = !this.checkbox.domElement.checked;
                this.fireEvent(this.checkbox.domElement.checked === true ? "selected" : "deselected");
            },
        }), (0, skydapp_browser_1.el)(".checkbox-container", this.checkbox = (0, skydapp_browser_1.el)("input", { type: "checkbox", id: `nft${id}` }, {
            change: (event) => {
                this.fireEvent(this.checkbox.domElement.checked === true ? "selected" : "deselected");
            },
        }), (0, skydapp_browser_1.el)("label", { for: `nft${id}` }), (0, skydapp_browser_1.el)("p", `#${id}`))));
    }
    deselect() {
        this.checkbox.domElement.checked = false;
    }
}
exports.default = NftItem;
//# sourceMappingURL=NftItem.js.map