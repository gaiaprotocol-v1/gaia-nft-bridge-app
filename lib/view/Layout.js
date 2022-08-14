"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class Layout {
    constructor() {
        Layout.current = this;
        skydapp_browser_1.BodyNode.append((this.container = (0, skydapp_browser_1.el)(".layout", (0, skydapp_browser_1.el)("main", (this.content = (0, skydapp_browser_1.el)(".content"))), (0, skydapp_browser_1.el)("footer", (0, skydapp_browser_1.el)(".copyright", "ⓒ Gaia Protocol"), (0, skydapp_browser_1.el)(".sns", (0, skydapp_browser_1.el)("a.item", "Gaia Discord", {
            href: "https://discord.gg/gaiaprotocol",
            target: "_blank",
        }), (0, skydapp_browser_1.el)("a.item", "Gaia Twitter", {
            href: "https://twitter.com/gaia_protocol",
            target: "_blank",
        }))))));
    }
    set title(title) {
        document.title = `${title} | Gaia Bridge`;
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map