import { BodyNode, DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";


export default class Layout implements View {

    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;
        BodyNode.append(
            (this.container = el(".layout",
                el("header",
                    el("h1", "Gaia Bridge"),
                ),
                el("main", (this.content = el(".content"))),
                el("footer",
                    el(".copyright", "ⓒ Gaia Protocol."),
                    el(".sns",
                        el("a.item", "Gaia Discord",
                            {
                                href: "https://discord.gg/gaia",
                                target: "_blank",
                            }
                        ),
                        el("a.item", "Gaia Twitter",
                            {
                                href: "https://twitter.com/gaia_protocol",
                                target: "_blank",
                            }
                        )
                    )
                ),
            )),
        );
    }

    public set title(title: string) {
        document.title = `${title} | Gaia Bridge`;
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}