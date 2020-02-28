export function load() {

let counter = -1;
let componentName = 'component-content-page-row';
let id_prefix = componentName + '-';

class component_content_page_row extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<div class="row"></div>
    `;

    this.html = `${html}`;

  }

  setState(state, callback) {
    if (state.webComponents) {
      this.webComponents = state.webComponents;
    }
    if (state.options) {
      this.options = state.options;
    }
    if (state.children) {
      this.webComponents.loadGroup(state.children, this.rootElement, this.options);
    }
    if (callback) callback();
  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('div')[0];
  }

  disconnectedCallback() {
    console.log('*** page row component was removed!');
  }
}

window.customElements.define(componentName, component_content_page_row);

}
