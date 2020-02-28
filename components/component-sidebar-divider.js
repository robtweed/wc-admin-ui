export function load() {

let counter = -1;
let componentName = 'component-sidebar-divider';
let id_prefix = componentName + '-';

class component_sidebar_divider extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<!-- Divider -->
<hr id="${id}" class="sidebar-divider">
<!-- End of Divider -->
    `;

    this.html = `${html}`;
  }

  setState(params, callback) {
    let hr = this.rootElement;
    var topClass = 'my-0';
    if (params.isTop && !hr.classList.contains(topClass)) {
      hr.classList.add(topClass);
    }
    if (callback) callback();
  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('hr')[0];
    this.style = 'display: inline';
  }

  disconnectedCallback() {
    console.log('*** divider was removed!');
    console.log(element);
  }
}

window.customElements.define(componentName, component_sidebar_divider);

}
