export function load() {

let counter = -1;
let componentName = 'component-topbar-navbar';
let id_prefix = componentName + '-';

class component_topbar_navbar extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<!-- Topbar Navbar -->
<ul class="navbar-nav ml-auto"></ul>
<!-- End Topbar Navbar -->
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
    this.rootElement = this.getElementsByTagName('ul')[0];
  }

  disconnectedCallback() {
    console.log('*** navbar component was removed!');
  }
}

window.customElements.define(componentName, component_topbar_navbar);

}
