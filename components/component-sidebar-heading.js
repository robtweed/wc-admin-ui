export function load() {

let counter = -1;
let componentName = 'component-sidebar-heading';
let id_prefix = componentName + '-';

class component_sidebar_heading extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<!-- Heading -->
<div id="${id}" class="sidebar-heading">Undefined Heading</div>
<!-- End of Heading -->
    `;

    this.html = `${html}`;
  }

  setState(params, callback) {
    let div = this.rootElement;
    if (params.title) div.textContent = params.title;
    if (callback) callback();
  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('div')[0];
    this.style = 'display: inline';
  }

  disconnectedCallback() {
    console.log('*** heading was removed!');
  }
}

window.customElements.define(componentName, component_sidebar_heading);

}

