export function load() {

let counter = -1;
let componentName = 'component-topbar-navbar-menu-divider';
let id_prefix = componentName + '-';

class component_topbar_navbar_menu_divider extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<div class="dropdown-divider"></div>
    `;

    this.html = `${html}`;

  }

  setState(state, callback) {
    if (callback) callback();
  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('div')[0];
  }

  disconnectedCallback() {
    console.log('*** menu divider component was removed!');
  }
}

window.customElements.define(componentName, component_topbar_navbar_menu_divider);

}
