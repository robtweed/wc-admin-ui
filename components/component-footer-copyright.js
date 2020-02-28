export function load() {

let counter = -1;
let componentName = 'component-footer-copyright';
let id_prefix = componentName + '-';

class component_footer_copyright extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<div class="copyright text-center my-auto">
  <span>Undefined Text</span>
</div>
    `;

    this.html = `${html}`;

  }

  setState(state, callback) {
    if (state.text) {
      this.rootElement.textContent = state.text;
    }
    if (state.copyright_text) {
      this.rootElement.textContent = 'Copyright \u00A9 ' + state.copyright_text + ' ' + new Date().getFullYear();
    }
    if (state.colour) {
      let oldColor = this.rootElement.classList.item(3);
      if (oldColor) this.rootElement.classList.remove(oldColor);
      this.rootElement.classList.add('text-' + state.colour);
    }
    if (callback) callback();
  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('span')[0];
  }

  disconnectedCallback() {
    console.log('*** footer component was removed!');
  }
}

window.customElements.define(componentName, component_footer_copyright);

}
