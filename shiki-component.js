import { codeToHtml } from 'https://esm.sh/shiki@1.3.0';

class ShikiWebComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const config = {};

		// lang attribute (required)
		const lang = this.getAttribute('lang');
		config.lang = lang;

		// theme attribute (we expect this or the themes below)
		const theme = this.getAttribute('theme');
		if (theme) {
			config.theme = theme;
		}

		// support multiple theme attributes
		const themeAttributes = [...this.attributes].filter((attr) => attr.name.match('-theme'));
		if (themeAttributes.length > 0) {
			config.themes = {};
			themeAttributes.forEach((attr) => {
				config.themes[attr.name.split('-')[0]] = attr.value;
			});
		}

		const code = this.children[0].innerHTML;
		const insertCode = async () => {
			this.shadowRoot.innerHTML = await codeToHtml(code, config);
		};

		insertCode();
	}
}

customElements.define('shiki-component', ShikiWebComponent);
