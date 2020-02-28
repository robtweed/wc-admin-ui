export function load() {

let counter = -1;
let componentName = 'component-content-page';
let id_prefix = componentName + '-';

class component_content_page extends HTMLElement {
  constructor() {
    super();

    counter++;
    let id = id_prefix + counter;

    const html = `
<div class="collapse multi-collapse" id="${id}"></div>
    `;

    this.html = `${html}`;

  }

  onLoaded() {
    console.log(this.name + ' page loaded!');
    var root = document.getElementsByTagName('component-root')[0];
    root.setPageActive(this.name);
  }

  setState(state, callback) {
    if (state.webComponents) {
      this.webComponents = state.webComponents;
    }
    if (state.options) {
      this.options = state.options;
    }
    if (state.name) {
      this.name = state.name;
    }
    if (state.show && !this.rootElement.classList.contains('show')) {
      let children = [...this.parentNode.childNodes];
      children.forEach(function(child) {
        console.log('tagName: ' + child.tagName);
        if (child.tagName === 'COMPONENT-CONTENT-PAGE') {
          child.rootElement.classList.remove('show');
        }
      });
      this.rootElement.classList.add('show');
    }
    if (state.children) {
      this.webComponents.loadGroup(state.children, this.rootElement, this.options);
    }
    if (callback) callback();
  }

  connectedCallback() {
    this.innerHTML = this.html;
    this.rootElement = this.getElementsByTagName('div')[0];
    this.name = 'undefined-name-' + counter;
  }

  disconnectedCallback() {
    console.log('*** page component was removed!');
  }
}

window.customElements.define(componentName, component_content_page);

}

