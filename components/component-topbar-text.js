export function load() {

let counter = -1;
let componentName = 'component-topbar-text';
let id_prefix = componentName + '-';

class component_topbar_text extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<style>
.center-text {
  display: flex;
  align-items: center;
  height: 4.375rem;
  padding: 0.75rem;
}
</style>
<div class="center-text text-gray-900 font-weight-bold">Undefined Text</div>
    `;

    this.html = `${html}`;

  }

  setState(state, callback) {
    if (state.text) {
      this.rootElement.textContent = state.text;
    }
    if (state.colour) {
      let oldColor = this.rootElement.classList.item(1);
      this.rootElement.classList.remove(oldColor);
      this.rootElement.classList.add('text-' + state.colour);
    }
    if (callback) callback();
  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('div')[0];
  }

  disconnectedCallback() {
    console.log('*** topbar text component was removed!');
  }
}

window.customElements.define(componentName, component_topbar_text);

}
