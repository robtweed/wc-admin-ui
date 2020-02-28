export function load() {

let counter = -1;
let componentName = 'component-content-page-header';
let id_prefix = componentName + '-';

class component_content_page_header extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<div class="d-sm-flex align-items-center justify-content-between mb-4">
  <h1 class="h3 mb-0 text-gray-800">Undefined Header</h1>
  <span></span>
</div>
    `;

    this.html = `${html}`;

  }

  setState(params, callback) {
    if (params.title) {
      this.headerElement.textContent = params.title;
    }
    if (params.children) {
      EWD.webComponents.loadGroup(params.children, this.childTarget);
    }
    if (callback) callback();
  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('div')[0];
    this.headerElement = this.rootElement.querySelector('h1');
    this.childTarget = this.rootElement.querySelector('span');
  }

  disconnectedCallback() {
    console.log('*** page header component was removed!');
  }
}

window.customElements.define(componentName, component_content_page_header);

}
