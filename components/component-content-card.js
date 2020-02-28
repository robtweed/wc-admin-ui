export function load() {

let counter = -1;
let componentName = 'component-content-card';
let id_prefix = componentName + '-';

class component_content_card extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<div class="card shadow mb-4">
  <div class="card-header py-3">
    <h6 class="m-0 font-weight-bold text-primary">Undefined Title</h6>
  </div>
  <div class="card-body">
    Content goes here
  </div>
</div>
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
    if (state.title) {
      this.titleElement.textContent = state.title;
    }
    if (state.name) {
      this.id = 'component-content-card-' + state.name;
      this.name = state.name
    }
    if (state.title_colour) {
      let oldColour = this.titleElement.classList.item(2);
      this.titleElement.classList.remove(oldColour);
      this.titleElement.classList.add('text-' + state.title_colour);
    }
    if (state.children) {
      this.childTarget.textContent = '';
      this.webComponents.loadGroup(state.children, this.childTarget, this.options);
    }
    if (callback) callback();
  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('div')[0];
    this.titleElement = this.rootElement.querySelector('h6');
    this.childTarget = this.rootElement.querySelector('.card-body');
  }

  disconnectedCallback() {
    console.log('*** card component was removed!');
  }
}

window.customElements.define(componentName, component_content_card);

}
