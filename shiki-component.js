import { codeToHtml } from "https://esm.sh/shiki@1.0.0";

class ShikiWebComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const lang = this.getAttribute("lang");
    const theme = this.getAttribute("theme");
    const config = { lang, theme };

    // pull slot content
    const slots = this.shadowRoot.querySelectorAll("slot");
    const code = this.children[0].innerHTML;
    const insertCode = async () => {
      this.shadowRoot.innerHTML = await codeToHtml(code, config);
    };

    insertCode();
  }
}

customElements.define("shiki-component", ShikiWebComponent);
