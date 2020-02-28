export function load() {

let counter = -1;
let componentName = 'component-topbar-divider';
let id_prefix = componentName + '-';

class component_topbar_divider extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<div></div>
    `;

    this.html = `${html}`;

  }

  setState(state, callback) {
    if (callback) callback();
  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('div')[0];
    this.className = 'topbar-divider d-none d-sm-block';
  }

  disconnectedCallback() {
    console.log('*** topbar divider component was removed!');
  }
}

window.customElements.define(componentName, component_topbar_divider);

}
